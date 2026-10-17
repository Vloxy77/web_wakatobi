import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  Star, 
  MapPin, 
  Droplets, 
  Eye, 
  ShieldCheck,
  Calendar,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { Destination } from '../types/wakatobi';

interface HeroSectionProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onExploreTrips: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  destinations,
  onSelectDestination,
  onExploreTrips
}) => {
  // 5 key destination highlights representing Wangi-Wangi, Kaledupa/Hoga, Tomia, Binongko, & Taman Nasional
  const heroSliderItems = destinations.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeDestination = heroSliderItems[activeIndex] || destinations[0];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSliderItems.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSliderItems.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % heroSliderItems.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + heroSliderItems.length) % heroSliderItems.length);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#040911]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image Carousel with dynamic fade & dark overlay */}
      <div className="absolute inset-0 z-0">
        {heroSliderItems.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              transition: 'opacity 1s ease-in-out, transform 8s ease-out'
            }}
          >
            <img
              src={item.heroImage}
              alt={item.name}
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.1]"
            />
          </div>
        ))}

        {/* Multi-layered Dark Overlay for elegance & high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040911] via-[#040911]/70 to-[#040911]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040911]/90 via-[#040911]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#040911] to-transparent pointer-events-none" />

        {/* Ambient Oceanic Glow Accent */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-ocean-pulse" />
      </div>

      {/* Main Content: Heading & Story (Centered left) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 lg:py-16">
        <div className="max-w-3xl">
          
          {/* Quiet Metadata Kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4">
            <span className="flex items-center gap-1.5 text-white/90">
              <ShieldCheck className="w-4 h-4 text-cyan-400 inline" />
              UNESCO Biosphere Reserve
            </span>
            <span className="text-cyan-500/60" aria-hidden="true">·</span>
            <span>Coral Triangle Capital</span>
            <span className="text-cyan-500/60" aria-hidden="true">·</span>
            <span className="text-slate-300">Sulawesi Tenggara</span>
          </div>

          {/* Main Title: JELAJAHI KEINDAHAN WAKATOBI */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-md">
            JELAJAHI KEINDAHAN{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-200 bg-clip-text text-transparent">
              WAKATOBI
            </span>
          </h1>

          {/* Subtext Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8 drop-shadow">
            Surga bawah laut dunia dengan lebih dari 750 spesies terumbu karang hidup. 
            Saksikan kemurnian empat gugusan pulau eksotis — Wangi-Wangi, Kaledupa, Tomia, 
            dan Binongko — yang menyatu dengan tradisi maritim abadi Suku Bajo.
          </p>

          {/* Action Buttons: LIHAT DETAIL & PILIH TRIP */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={() => onSelectDestination(activeDestination)}
              type="button"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/35 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>LIHAT DETAIL</span>
              <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={onExploreTrips}
              type="button"
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 text-white font-semibold text-sm tracking-wide border border-cyan-500/30 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>Eksplorasi Katalog Trip</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quiet Quick Indicators */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 pt-2 border-t border-slate-700/40">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>Suhu Air 28°C</span>
            </div>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Visibilitas 30-40m</span>
            </div>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Musim Selam Ideal: Mar - Des</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Interactive Slider / Thumbnail Strip */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Destinasi Unggulan Terpilih:</span>
            <span className="text-cyan-400 font-bold">{activeDestination.name}</span>
          </div>

          {/* Slider Prev / Next controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 px-1 font-mono">
              0{activeIndex + 1} / 0{heroSliderItems.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              aria-label="Next destination"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Cards Grid Slider */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {heroSliderItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border text-left ${
                  isActive
                    ? 'ring-2 ring-cyan-400 border-transparent shadow-xl shadow-cyan-950/60 scale-[1.02] bg-slate-900/90'
                    : 'border-slate-800/80 hover:border-slate-700 bg-slate-950/70 opacity-75 hover:opacity-100 hover:scale-[1.01]'
                }`}
              >
                {/* Image Preview with overlay */}
                <div className="relative h-20 sm:h-24 w-full overflow-hidden">
                  <img
                    src={item.heroImage}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Island label */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] text-cyan-200 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-cyan-500/20">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{item.island}</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-amber-300 bg-slate-950/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{item.rating}</span>
                  </div>
                </div>

                {/* Card Title & Action */}
                <div className="p-2.5 sm:p-3 flex flex-col justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                    <span className="line-clamp-1">{item.highlightTags[0]}</span>
                    <span className={`text-[10px] font-semibold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {isActive ? 'Aktif' : 'Lihat'}
                    </span>
                  </div>
                </div>

                {/* Active bottom accent bar */}
                {isActive && (
                  <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-sky-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
