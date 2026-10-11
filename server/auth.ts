import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDb, saveDb, logAdminAction, User } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'comparenest-super-secure-production-jwt-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// In-memory sliding rate-limiter for login attempts to prevent brute-force attacks
interface RateLimitRecord {
  attempts: number;
  lockedUntil?: number;
}
const loginRateLimitMap = new Map<string, RateLimitRecord>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);

  if (!record) {
    loginRateLimitMap.set(ip, { attempts: 1 });
    return { allowed: true };
  }

  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingSec = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds: remainingSec };
  }

  if (record.lockedUntil && now >= record.lockedUntil) {
    // Lock period expired, reset counter
    record.attempts = 1;
    record.lockedUntil = undefined;
    return { allowed: true };
  }

  record.attempts += 1;
  // If > 5 attempts within a 5-minute window, lock for 10 minutes
  if (record.attempts > 5) {
    record.lockedUntil = now + 10 * 60 * 1000;
    return { allowed: false, retryAfterSeconds: 600 };
  }

  return { allowed: true };
}

export function resetLoginRateLimit(ip: string): void {
  loginRateLimitMap.delete(ip);
}

// Middleware: Authenticate JWT Token
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Authentication token is required.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    const db = getDb();
    const user = db.users.find(u => u.id === decoded.id);

    if (!user) {
      res.status(401).json({ error: 'Unauthorized: User account no longer exists.' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    next();
  } catch (err) {
    res.status(403).json({ error: 'Forbidden: Invalid or expired authentication token.' });
  }
}

// Middleware: Require Admin Role
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Administrator privileges required.' });
    return;
  }
  next();
}

// Generate signed JWT token
export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
