"use client";

import { useState, useEffect } from 'react';
import { BannerSlide } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BannerProps {
  slides: BannerSlide[];
}

export default function Banner({ slides }: BannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
          </div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8 z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl transition-all duration-500 ease-in-out transform translate-y-0 opacity-100 delay-100">
                {slide.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all z-20"
        aria-label="Previous slide"
      >
        <ArrowLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all z-20"
        aria-label="Next slide"
      >
        <ArrowRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}