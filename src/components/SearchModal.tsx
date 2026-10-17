import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  ArrowRight, 
  Star, 
  Clock, 
  Waves,
  Compass
} from 'lucide-react';
import { Destination, TripPackage } from '../types/wakatobi';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  packages: TripPackage[];
  onSelectDestination: (dest: Destination) => void;
  onSelectPackage: (pkg: TripPackage) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  destinations,
  packages,
  onSelectDestination,
  onSelectPackage
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.island.toLowerCase().includes(query.toLowerCase()) ||
    d.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    d.highlightTags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredPackages = packages.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.islandFocus.toLowerCase().includes(query.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#091322] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col text-slate-100 max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik nama spot (contoh: Hoga, Mari Mabuk, Bajo Mola, Tomia)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Hapus
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400">
          <span className="text-slate-500 shrink-0">Populer:</span>
          {['Taman Nasional', 'Pulau Hoga', 'Mari Mabuk', 'Suku Bajo', 'Puncak Kahianga', 'Binongko'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-slate-300 transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6">
          
          {/* Destinasi Section */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
              Destinasi & Spot ({filteredDestinations.length})
            </span>
            {filteredDestinations.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">Tidak ada destinasi yang cocok.</p>
            ) : (
              <div className="space-y-1.5">
                {filteredDestinations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onClose();
                      onSelectDestination(d);
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-cyan-500/30 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={d.heroImage}
                        alt={d.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                            {d.name}
                          </h4>
                          <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-500/20">
                            {d.island}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{d.shortDesc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Paket Trip Section */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
              Paket Trip ({filteredPackages.length})
            </span>
            {filteredPackages.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">Tidak ada paket trip yang cocok.</p>
            ) : (
              <div className="space-y-1.5">
                {filteredPackages.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectPackage(p);
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-cyan-500/30 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>{p.duration}</span>
                          <span>·</span>
                          <span className="text-cyan-400">{p.islandFocus}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
