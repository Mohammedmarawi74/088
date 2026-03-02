import React, { forwardRef } from 'react';
import { Slide, ThemeConfig } from '../types';
import { IconDisplay } from './IconDisplay';

interface CanvasProps {
  slide: Slide;
  theme: ThemeConfig;
  logoUrl: string | null;
  totalSlides: number;
  currentIndex: number;
  customCSS: string;
  scale?: number;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({
  slide,
  theme,
  logoUrl,
  totalSlides,
  currentIndex,
  customCSS,
  scale = 1
}, ref) => {
  
  // Inline styles for dynamic theming
  const containerStyle: React.CSSProperties = {
    backgroundColor: theme.backgroundColor,
    backgroundImage: theme.gradient || 'none',
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.cardBackground,
    borderColor: theme.accentColor,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };

  return (
    <div className="canvas-wrapper">
      {/* CSS Injection */}
      <style>{customCSS}</style>

      {/* The Exportable Area (1080x1350 Portrait/Carousel Ratio or 1080x1080) */}
      {/* We use a fixed aspect ratio container for the canvas */}
      <div 
        ref={ref}
        id="canvas-node"
        className="slide-container"
        style={containerStyle}
      >
        {/* Header / Logo Area */}
        <div className="brand-header">
           {logoUrl ? (
             <div className="w-full flex justify-end">
               <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
             </div>
           ) : (
             <>
               {/* Left Side: Arabic Brand */}
               <div className="brand-name brand-name-ar">
                  <span style={{ color: theme.textColor }}>المستثمر</span>
               </div>

               {/* Right Side: English Brand */}
               <div className="brand-name brand-name-en">
                 <span style={{ color: theme.textColor }}>AL-INVESTOR</span>
               </div>
             </>
           )}
        </div>

        {/* Top Decorative Element / Pattern */}
        <div 
          className="decorative-overlay"
          style={{ 
            backgroundImage: `radial-gradient(${theme.accentColor} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            opacity: theme.patternOpacity || 0.1
          }}
        />

        <div 
          className="glow-blur"
          style={{ backgroundColor: theme.accentColor }}
        />

        {/* Main Content Area */}
        <div className="main-content">
            
            {/* Image Container */}
            {/* Changed structure: Wrapper allows icon to overflow without being clipped by rounded corners of image */}
            <div className="image-wrapper group">
                <div className="image-inner">
                    <img 
                        src={slide.imageUrl} 
                        alt={slide.title} 
                        className="slide-image group-hover:scale-105"
                        crossOrigin="anonymous"
                    />
                    {/* Overlay Gradient */}
                    <div className="image-gradient"></div>
                </div>
                
                {/* Floating Icon - Raised slightly (-bottom-5 instead of -bottom-6) and unclipped */}
                <div 
                    className="floating-icon"
                    style={{ ...cardStyle, borderColor: theme.backgroundColor }}
                >
                    <IconDisplay name={slide.iconName} className="w-8 h-8" color={theme.accentColor} />
                </div>
            </div>

            {/* Text Content */}
            <div className="text-wrapper">
                <h2 
                    className="slide-title"
                    style={{ color: theme.textColor }}
                >
                    {slide.title}
                </h2>
                <p 
                    className="slide-description"
                    style={{ color: theme.textColor }}
                >
                    {slide.description}
                </p>
            </div>
        </div>

        {/* Carousel Indicators & Footer */}
        <div className="footer-container">
            
            {/* Dots */}
            <div className="indicator-dots">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <div 
                        key={idx}
                        className={`indicator-dot ${idx === currentIndex ? 'w-8' : 'w-2'}`}
                        style={{ 
                            height: '8px', 
                            backgroundColor: idx === currentIndex ? theme.accentColor : theme.textColor,
                            opacity: idx === currentIndex ? 1 : 0.3 
                        }}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';