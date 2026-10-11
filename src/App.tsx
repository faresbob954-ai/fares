import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { ProductCategory } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ComparisonBar } from './components/ComparisonBar';
import { PolicyModal, PolicyModalType } from './components/Modals/PolicyModal';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ComparisonView } from './views/ComparisonView';
import { ProductDetailView } from './views/ProductDetailView';
import { ArticlesView } from './views/ArticlesView';
import { SingleArticleView } from './views/SingleArticleView';
import { PremiumView } from './views/PremiumView';
import { ContactView } from './views/ContactView';
import { CustomPageView } from './views/CustomPageView';
import { AdminView } from './views/AdminView';
import { Article, CustomPage } from '../server/db';

type AppView = 
  | 'home' 
  | 'catalog' 
  | 'compare' 
  | 'articles' 
  | 'article' 
  | 'premium' 
  | 'about' 
  | 'contact' 
  | 'detail' 
  | 'page' 
  | 'admin';

function MainApp() {
  const { direction, language } = useLanguage();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [catalogCategory, setCatalogCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>('iphone-16-pro-max');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>('how-to-choose-a-smartphone-for-your-needs');
  const [selectedPageSlug, setSelectedPageSlug] = useState<string>('about-us');
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyModalType>(null);

  // Dynamic CMS data from server
  const [articles, setArticles] = useState<Article[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);

  // Synchronize browser history and path
  const navigateTo = (view: AppView, param?: string) => {
    setCurrentView(view);

    let path = '/';
    if (view === 'compare') path = '/compare';
    else if (view === 'catalog') path = param ? `/catalog?category=${param}` : '/catalog';
    else if (view === 'articles') path = '/articles';
    else if (view === 'article' && param) path = `/articles/${param}`;
    else if (view === 'premium') path = '/premium';
    else if (view === 'about') path = '/about';
    else if (view === 'contact') path = '/contact';
    else if (view === 'admin') path = '/admin';
    else if (view === 'detail' && param) path = `/product/${param}`;
    else if (view === 'page' && param) path = `/page/${param}`;

    if (typeof window !== 'undefined') {
      window.history.pushState({ view, param }, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Initial load: parse window.location.pathname and load bootstrap data
  useEffect(() => {
    // 1. Initial path inspection
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname === '/admin') {
        setCurrentView('admin');
      } else if (pathname === '/premium') {
        setCurrentView('premium');
      } else if (pathname === '/articles') {
        setCurrentView('articles');
      } else if (pathname.startsWith('/articles/')) {
        const slug = pathname.replace('/articles/', '');
        setSelectedArticleSlug(slug);
        setCurrentView('article');
      } else if (pathname === '/about') {
        setCurrentView('about');
      } else if (pathname === '/contact') {
        setCurrentView('contact');
      } else if (pathname === '/compare') {
        setCurrentView('compare');
      } else if (pathname === '/catalog') {
        setCurrentView('catalog');
      }

      // Handle popstate (browser back/forward button)
      window.onpopstate = (event) => {
        if (event.state && event.state.view) {
          setCurrentView(event.state.view);
          if (event.state.param) {
            if (event.state.view === 'article') setSelectedArticleSlug(event.state.param);
            if (event.state.view === 'detail') setSelectedProductId(event.state.param);
          }
        } else {
          // Fallback parsing from pathname
          const p = window.location.pathname;
          if (p === '/admin') setCurrentView('admin');
          else if (p === '/premium') setCurrentView('premium');
          else if (p === '/articles') setCurrentView('articles');
          else if (p === '/about') setCurrentView('about');
          else if (p === '/contact') setCurrentView('contact');
          else if (p === '/compare') setCurrentView('compare');
          else setCurrentView('home');
        }
      };
    }

    // 2. Fetch public bootstrap content (articles & published pages)
    fetch('/api/public/bootstrap')
      .then(res => res.json())
      .then(data => {
        if (data.publishedArticles) {
          setArticles(data.publishedArticles);
        }
        if (data.publishedPages) {
          setCustomPages(data.publishedPages);
        }
      })
      .catch(err => console.error('[BOOTSTRAP FETCH]', err));
  }, []);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('detail', productId);
  };

  const handleSelectArticleBySlug = (slug: string) => {
    setSelectedArticleSlug(slug);
    navigateTo('article', slug);
  };

  const activeArticle = articles.find(a => a.slug === selectedArticleSlug) || articles[0];
  const relatedArticles = articles.filter(a => a.id !== activeArticle?.id && a.isPublished).slice(0, 3);

  const aboutPage = customPages.find(p => p.slug === 'about-us') || {
    id: 'default-about',
    slug: 'about-us',
    titleEn: 'About Nexora',
    titleAr: 'عن منصة نيكسورا (Nexora)',
    contentEn: `## Independent Engineering Comparisons\n\nNexora was founded on a singular premise: consumer technology purchasing should be grounded in empirical engineering disclosures, not marketing slogans.\n\nOur editorial team compiles, normalizes, and verifies technical documentation across global electronics manufacturers. Whether you are comparing neural engine throughput or display pixel architectures, Nexora delivers unbiased side-by-side clarity.`,
    contentAr: `## مقارنات عتادية هندسية مستقلة\n\nتأسست منصة نيكسورا (Nexora) على مبدأ واحد: قرارات شراء الإلكترونيات الاستهلاكية يجب أن تستند إلى حقائق هندسية موثقة وليس إلى شعارات تسويقية مضللة.\n\nيقوم فريقنا بتجميع وتوحيد وتدقيق الوثائق التقنية الصادرة عن كبرى الشركات المصنعة عالمياً لنقدم للمستخدم العربي والعالمي أدوات مقارنة شفافة وحيادية.`,
    isPublished: true,
    showInHeader: true,
    showInFooter: true,
    navOrder: 1,
    language: 'all',
    updatedAt: new Date().toISOString()
  };

  // If in /admin route, render self-contained protected AdminView without public header/footer
  if (currentView === 'admin') {
    return <AdminView />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#111318] text-[#171923] dark:text-[#F5F7FF] transition-colors duration-200" dir={direction}>
      {/* Global Public Header */}
      <Header
        currentView={currentView}
        onNavigate={(v, p) => navigateTo(v as AppView, p)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Public Content Area */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <HomeView
            onNavigate={(v, cat) => navigateTo(v as AppView, cat)}
            onSelectProduct={handleSelectProduct}
            onSelectArticle={(artId) => {
              const matched = articles.find(a => a.id === artId);
              if (matched) handleSelectArticleBySlug(matched.slug);
              else handleSelectArticleBySlug(artId);
            }}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogView
            initialCategory={catalogCategory}
            onSelectProduct={handleSelectProduct}
            onNavigateCompare={() => navigateTo('compare')}
          />
        )}

        {currentView === 'compare' && (
          <ComparisonView
            onNavigateCatalog={() => navigateTo('catalog', 'all')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'articles' && (
          <ArticlesView
            articles={articles}
            onSelectArticle={handleSelectArticleBySlug}
          />
        )}

        {currentView === 'article' && activeArticle && (
          <SingleArticleView
            article={activeArticle}
            relatedArticles={relatedArticles}
            onBack={() => navigateTo('articles')}
            onSelectArticle={handleSelectArticleBySlug}
          />
        )}

        {currentView === 'premium' && (
          <PremiumView
            onNavigateHome={() => navigateTo('home')}
            onNavigateCompare={() => navigateTo('compare')}
          />
        )}

        {currentView === 'about' && (
          <CustomPageView
            page={aboutPage}
            onBack={() => navigateTo('home')}
          />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}

        {currentView === 'detail' && (
          <ProductDetailView
            productId={selectedProductId}
            onBack={() => navigateTo('catalog', catalogCategory)}
            onSelectProduct={handleSelectProduct}
            onNavigateCompare={() => navigateTo('compare')}
          />
        )}
      </main>

      {/* Floating Comparison Drawer (visible when devices are in queue and user isn't on comparison page) */}
      {currentView !== 'compare' && (
        <ComparisonBar
          onOpenCompare={() => navigateTo('compare')}
        />
      )}

      {/* Global Public Footer */}
      <Footer
        onNavigate={(v, p) => navigateTo(v as AppView, p)}
        onOpenPolicyModal={(type) => setActivePolicyModal(type)}
      />

      {/* Legal & Policy Modals */}
      <PolicyModal
        type={activePolicyModal}
        onClose={() => setActivePolicyModal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ComparisonProvider>
          <MainApp />
        </ComparisonProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
