import React from 'react';
import { 
  X, 
  User, 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Waves,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Destination } from '../types/wakatobi';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onRemoveFavorite: (id: string) => void;
  recentBookings?: any[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  favorites,
  destinations,
  onSelectDestination,
  onRemoveFavorite,
  recentBookings = []
}) => {
  if (!isOpen) return null;

  const favoritedDestinations = destinations.filter((d) => favorites.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#091322] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-100 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Profil Wisatawan & Favorit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* User Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/20 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-xl font-bold">
              <Waves className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Tamu Penjelajah Wakatobi</h4>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                  Member Aktif
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Cagar Biosfer Dunia UNESCO · Kepulauan Wakatobi
              </p>
              <div className="flex items-center gap-3 text-[11px] text-cyan-400 mt-2 font-medium">
                <span>{favorites.length} Destinasi Disimpan</span>
                <span>·</span>
                <span>{recentBookings.length} Reservasi Aktif</span>
              </div>
            </div>
          </div>

          {/* Favorited Destinations Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-cyan-400" />
                <span>Destinasi Tersimpan ({favoritedDestinations.length})</span>
              </span>
            </div>

            {favoritedDestinations.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  Belum ada destinasi yang Anda simpan. Klik ikon bookmark pada kartu destinasi untuk menyimpannya di sini.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {favoritedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 flex items-center justify-between transition-colors"
                  >
                    <div 
                      onClick={() => {
                        onClose();
                        onSelectDestination(dest);
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-white hover:text-cyan-300">
                          {dest.name}
                        </h5>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{dest.island}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onRemoveFavorite(dest.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Hapus dari tersimpan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectDestination(dest);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Reservations Section */}
          {recentBookings.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Riwayat Pemesanan Terakhir
              </span>
              <div className="space-y-2">
                {recentBookings.map((b, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-cyan-400 font-bold">{b.code}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">Terkonfirmasi</span>
                    </div>
                    <p className="text-white font-medium">{b.itemTitle}</p>
                    <div className="flex justify-between text-slate-400 text-[11px] mt-1">
                      <span>{b.pax} Peserta</span>
                      <span>Tanggal: {b.date || 'Sesuai Request'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Tourism Hotline */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300">
            <span className="font-bold text-white block mb-0.5">Pusat Layanan Cepat (TIC Wakatobi):</span>
            Jika membutuhkan bantuan rute feri cepat Bau-Bau / Kendari ke Wangi-Wangi, hubungi Hotline WhatsApp di <strong>+62 812-4040-9988</strong>.
          </div>

        </div>

      </div>
    </div>
  );
};
