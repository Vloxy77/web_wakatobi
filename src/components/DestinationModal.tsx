import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Droplets, 
  Eye, 
  Wind, 
  Clock, 
  Compass, 
  Check, 
  Bookmark, 
  BookmarkCheck,
  Calendar,
  Share2,
  Send
} from 'lucide-react';
import { Destination } from '../types/wakatobi';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookNow: (destination: Destination) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onBookNow,
  isFavorited,
  onToggleFavorite
}) => {
  if (!destination) return null;

  const [activeImage, setActiveImage] = useState(destination.heroImage);
  const [copiedLink, setCopiedLink] = useState(false);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#091322] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Detail Destinasi · {destination.island}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Salin tautan"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-[10px] text-cyan-400 font-semibold">Tersalin!</span>
            )}

            <button
              onClick={() => onToggleFavorite(destination.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorited ? 'text-cyan-400 bg-cyan-950/70' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isFavorited ? 'Hapus favorit' : 'Simpan favorit'}
            >
              {isFavorited ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-thin">
          
          {/* Main Hero Media Gallery */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <img
                src={activeImage}
                alt={destination.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider block">
                    {destination.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {destination.name}
                  </h2>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{destination.rating}</span>
                  <span className="text-slate-400 font-normal">({destination.reviewsCount} ulasan)</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            {destination.gallery && destination.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {destination.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImage === img ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metric Bar: Depth, Visibility, Current */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <Droplets className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Kedalaman</span>
                <span className="text-xs font-bold text-white">{destination.depthRange || '1 - 25m'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <Eye className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Visibilitas</span>
                <span className="text-xs font-bold text-white">{destination.visibility || '25 - 35m'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Durasi Trip</span>
                <span className="text-xs font-bold text-white">{destination.suggestedDuration}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Musim Ideal</span>
                <span className="text-xs font-bold text-emerald-400">{destination.bestTimeToVisit}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Tentang Destinasi</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {destination.fullDesc}
            </p>
          </div>

          {/* Rundown & Highlights */}
          {destination.rundown && destination.rundown.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-white mb-4">Contoh Jadwal / Rundown Aktivitas</h3>
              <div className="space-y-3">
                {destination.rundown.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facilities */}
          {destination.facilities && (
            <div>
              <h3 className="text-base font-bold text-white mb-3">Fasilitas & Perlengkapan yang Disediakan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location & Coordinates */}
          {destination.coordinates && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Titik Koordinat:</span>
                <span className="font-mono text-cyan-300">{destination.coordinates}</span>
              </div>
              <span className="text-slate-500">Kabupaten Wakatobi</span>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="px-6 py-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
              Estimasi Biaya Paket
            </span>
            <span className="text-lg font-black text-cyan-300">
              {destination.estimatedPrice === 0 ? 'Gratis Masuk' : formatPrice(destination.estimatedPrice)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(destination);
              }}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Rencanakan Kunjungan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
