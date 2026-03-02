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
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.cardBackground,
    borderColor: theme.accentColor,
  };

  return (
    <div className="relative w-full flex justify-center overflow-hidden py-8">
      {/* CSS Injection */}
      <style>{customCSS}</style>

      {/* The Exportable Area (1080x1350 Portrait/Carousel Ratio or 1080x1080) */}
      {/* We use a fixed aspect ratio container for the canvas */}
      <div 
        ref={ref}
        id="canvas-node"
        className="canvas-node relative w-[540px] h-[675px] shadow-2xl flex flex-col transition-colors duration-300"
        style={containerStyle}
      >
        {/* Header / Logo Area */}
        <div className="absolute top-6 left-6 z-10">
           {logoUrl ? (
             <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
           ) : (
             <div className="flex items-center gap-4 opacity-95 drop-shadow-md">
                <IconDisplay name="TrendingUp" className="w-8 h-8" color={theme.accentColor} />
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-2xl tracking-tight" style={{ color: theme.textColor }}>المستثمر</span>
                  <div className="w-px h-6 opacity-30" style={{ backgroundColor: theme.accentColor }}></div>
                  <span className="font-bold text-xs tracking-widest uppercase opacity-70" style={{ color: theme.textColor }}>AL-INVESTOR</span>
                </div>
             </div>
           )}
        </div>

        {/* Top Decorative Element */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-20 rounded-bl-full pointer-events-none"
          style={{ backgroundColor: theme.accentColor }}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 mt-10 z-0">
            
            {/* Image Container */}
            {/* Changed structure: Wrapper allows icon to overflow without being clipped by rounded corners of image */}
            <div className="relative w-full aspect-[4/3] mb-8 group">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg z-0">
                    <img 
                        src={slide.imageUrl} 
                        alt={slide.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        crossOrigin="anonymous"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>
                
                {/* Floating Icon - Raised slightly (-bottom-5 instead of -bottom-6) and unclipped */}
                <div 
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 z-10"
                    style={{ backgroundColor: theme.cardBackground, borderColor: theme.backgroundColor }}
                >
                    <IconDisplay name={slide.iconName} className="w-8 h-8" color={theme.accentColor} />
                </div>
            </div>

            {/* Text Content */}
            <div className="text-center w-full mt-2 px-4">
                <h2 
                    className="text-3xl font-bold mb-4 leading-tight"
                    style={{ color: theme.textColor }}
                >
                    {slide.title}
                </h2>
                <p 
                    className="text-lg opacity-90 leading-relaxed font-light"
                    style={{ color: theme.textColor }}
                >
                    {slide.description}
                </p>
            </div>
        </div>

        {/* Carousel Indicators & Footer */}
        <div className="pb-12 pt-4 w-full flex flex-col items-center justify-center gap-4 relative z-10">
            
            {/* Dots */}
            <div className="flex items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <div 
                        key={idx}
                        className={`transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8' : 'w-2'}`}
                        style={{ 
                            height: '8px', 
                            backgroundColor: idx === currentIndex ? theme.accentColor : theme.textColor,
                            opacity: idx === currentIndex ? 1 : 0.3 
                        }}
                    />
                ))}
            </div>

            {/* Swipe hint */}
            <div className="text-sm font-medium opacity-50 flex items-center gap-1">
                <span style={{color: theme.textColor}}>اسحب للمزيد</span>
                <IconDisplay name="ChevronLeft" className="w-4 h-4 animate-pulse" color={theme.textColor} />
            </div>
        </div>
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';