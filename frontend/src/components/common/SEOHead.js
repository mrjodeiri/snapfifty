import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "SnapFifty - Best Deals Over 50% Off",
  description = "Discover amazing deals with 50% or more discount. Save big on electronics, fashion, and more!",
  keywords = "deals, discounts, savings, 50% off, shopping",
  ogImage = "/og-image.jpg"
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    
    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
  </Helmet>
);

export default SEOHead;