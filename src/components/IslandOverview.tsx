import React, { useState } from 'react';
import { 
  MapPin, 
  Anchor, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { IslandProfile } from '../types/wakatobi';

interface IslandOverviewProps {
  islands: IslandProfile[];
  onSelectIslandFilter: (islandName: string) => void;
}

export const IslandOverview: React.FC<IslandOverviewProps> = ({
  islands,
  onSelectIslandFilter
}) => {
  const [selectedId, setSelectedId] = useState(islands[0].id);
  const currentIsland = islands.find((i) => i.id === selectedId) || islands[0];

  return (
    <section id="wilayah" className="py-20 bg-[#060d19] border-t border-b border-cyan-500/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
            <Compass className="w-4 h-4" />
            <span>Gugusan 4 Wilayah Kepulauan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Eksplorasi Gugusan{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
              WA-KA-TO-BI
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Akronim Wakatobi berasal dari nama empat pulau utama yang saling melengkapi 
            dengan karakteristik ekosistem, sejarah, dan daya pikat selam yang berbeda-beda.
          </p>
        </div>

        {/* 4 Interactive Island Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-8">
          {islands.map((island) => {
            const isSelected = island.id === selectedId;
            return (
              <button
                key={island.id}
                onClick={() => setSelectedId(island.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-2 border-cyan-400 shadow-lg shadow-cyan-950/70'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl font-black font-mono ${isSelected ? 'text-cyan-300' : 'text-slate-600'}`}>
                    {island.code}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {island.diveSites} Spot Selam
                  </span>
                </div>
                <h3 className={`text-base font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {island.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {island.character}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Island Detail Showcase Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/20 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Content & Island Identity */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Pulau {currentIsland.name}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-300">{currentIsland.coralCount}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {currentIsland.title}
                </h3>

                <p className="text-cyan-300 text-sm font-medium mb-4 italic">
                  "{currentIsland.tagline}"
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {currentIsland.description}
                </p>

                {/* Spot Highlights */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Titik Daya Tarik & Spot Populer:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentIsland.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onSelectIslandFilter(currentIsland.name)}
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Filter Destinasi di {currentIsland.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-slate-400">
                  <span className="text-cyan-400 font-semibold">{currentIsland.diveSites}</span> titik selam resmi terdaftar
                </div>
              </div>
            </div>

            {/* Right: Rich Island Image Display */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-cyan-500/30 group">
                <img
                  src={currentIsland.image}
                  alt={currentIsland.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white font-medium border border-white/10">
                    Karakter: {currentIsland.character}
                  </span>
                  <span className="bg-cyan-950/80 backdrop-blur-md px-3 py-1 rounded-full text-cyan-300 font-semibold border border-cyan-500/30">
                    {currentIsland.coralCount}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
