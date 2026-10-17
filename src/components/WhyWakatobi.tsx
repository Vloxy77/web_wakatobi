import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Waves, 
  Globe, 
  Eye, 
  HeartHandshake, 
  Anchor,
  Fish,
  Award
} from 'lucide-react';
import { WHY_WAKATOBI_POINTS } from '../data/wakatobiData';

export const WhyWakatobi: React.FC = () => {
  const stats = [
    { label: 'Spesies Karang Hidup', value: '750+', sub: 'dari 850 spesies dunia' },
    { label: 'Kawasan Konservasi UNESCO', value: '1,39 Juta', sub: 'Hektar Cagar Biosfer' },
    { label: 'Spesies Ikan Karang', value: '942+', sub: 'Biota tropis terlindungi' },
    { label: 'Jarak Pandang Rata-rata', value: '35 Meter', sub: 'Kualitas air jernih kristal' },
  ];

  const iconMap = [
    <Waves className="w-5 h-5 text-cyan-400" />,
    <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    <Eye className="w-5 h-5 text-sky-400" />,
    <Anchor className="w-5 h-5 text-amber-400" />,
    <Globe className="w-5 h-5 text-teal-400" />,
    <HeartHandshake className="w-5 h-5 text-rose-400" />
  ];

  return (
    <section id="keunggulan" className="py-24 bg-[#050b14] border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle ocean decorative gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
            <Award className="w-4 h-4" />
            <span>Keunggulan Komparatif Dunia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Mengapa Memilih{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Kabupaten Wakatobi?
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Jacques Cousteau pernah menyebut Wakatobi sebagai "Underwater Nirvana". 
            Keasrian alam, status cagar biosfer dunia, dan harmoni maritim yang tak tertandingi di belahan bumi mana pun.
          </p>
        </div>

        {/* Global Statistics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/15 shadow-xl hover:border-cyan-400/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 font-mono mb-1">
                {stat.value}
              </div>
              <h4 className="text-sm font-bold text-white mb-0.5">
                {stat.label}
              </h4>
              <p className="text-xs text-slate-400">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_WAKATOBI_POINTS.map((point, index) => (
            <div
              key={point.number}
              className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black font-mono text-cyan-400/70 group-hover:text-cyan-300 transition-colors">
                    {point.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    {iconMap[index % iconMap.length]}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {point.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-cyan-400 font-medium">Standar Wisata Berkelanjutan</span>
                <span>Wakatobi Regency</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quote / Endorsement Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 mb-3 block">
              Pengakuan Warisan Alam Internasional
            </span>
            <blockquote className="text-lg sm:text-2xl font-medium text-white italic leading-relaxed mb-6">
              "Kekayaan spesies terumbu karang di Wakatobi melampaui seluruh lautan Karibia digabungkan. 
              Inilah episentrum terpenting bagi masa depan kelestarian hayati laut dunia."
            </blockquote>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-cyan-300">UNESCO Man and the Biosphere (MAB)</span>
              <span className="text-xs text-slate-400">Ditetapkan Secara Resmi di Paris, Perancis</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
