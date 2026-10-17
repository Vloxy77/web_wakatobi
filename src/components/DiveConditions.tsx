import React from 'react';
import { 
  Droplets, 
  Eye, 
  Wind, 
  Sun, 
  Compass, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { LIVE_DIVE_CONDITIONS } from '../data/wakatobiData';

export const DiveConditions: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-y border-cyan-500/20 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-wider font-bold text-white">
            Kondisi Selam & Cuaca Laut Wakatobi
          </span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="text-xs text-cyan-400 font-medium">
            {LIVE_DIVE_CONDITIONS.lastUpdated}
          </span>
        </div>

        {/* Metric Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Suhu Air:</span>
            <span className="font-bold text-white">{LIVE_DIVE_CONDITIONS.waterTemp}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Visibilitas:</span>
            <span className="font-bold text-white">{LIVE_DIVE_CONDITIONS.visibility}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Arus:</span>
            <span className="font-bold text-white">{LIVE_DIVE_CONDITIONS.surfaceCondition}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Musim Terbaik:</span>
            <span className="font-bold text-emerald-400">{LIVE_DIVE_CONDITIONS.bestDivingSeason}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
