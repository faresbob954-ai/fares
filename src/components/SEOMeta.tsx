import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOMetaProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'product' | 'article';
  schemaData?: object;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  schemaData,
}) => {
  const { language } = useLanguage();

  const siteName = language === 'ar' ? 'Nexora | نيكسورا' : 'Nexora';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - ${language === 'ar' ? 'قارن بذكاء. اشترِ باختيار أفضل.' : 'Compare Smarter. Buy Better.'}`;
  const defaultDesc = language === 'ar'
    ? 'منصة مستقلة لمقارنة المواصفات التقنية للأجهزة الإلكترونية بدقة وحيادية.'
    : 'Nexora: Objective side-by-side technical specification comparisons for smartphones, laptops, tablets, headphones, and monitors.';
  const finalDesc = description || defaultDesc;

  useEffect(() => {
    // Document title
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDesc);

    // Open Graph Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', type);

    // Schema.org JSON-LD
    const existingScript = document.getElementById('nexora-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (schemaData) {
      const script = document.createElement('script');
      script.id = 'nexora-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    return () => {
      const cleanupScript = document.getElementById('nexora-jsonld');
      if (cleanupScript) cleanupScript.remove();
    };
  }, [fullTitle, finalDesc, type, schemaData, canonicalPath]);

  return null;
};
