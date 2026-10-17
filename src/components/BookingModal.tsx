import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight,
  Phone,
  Mail,
  User,
  Package,
  Sparkles
} from 'lucide-react';
import { TripPackage, Destination, BookingRecord } from '../types/wakatobi';
import { useWakatobi } from '../context/WakatobiContext';

interface BookingModalProps {
  item: TripPackage | Destination | null;
  onClose: () => void;
  onSuccessBooking?: (booking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  item,
  onClose,
  onSuccessBooking
}) => {
  const { packages, addBooking } = useWakatobi();

  // Find if item is package or destination
  const initialPackage = item 
    ? ('groupType' in item ? item : packages.find(p => p.id === item.id) || packages[0])
    : packages[0];

  const [selectedPackageId, setSelectedPackageId] = useState(initialPackage?.id || packages[0]?.id || '');
  const activePackage = packages.find(p => p.id === selectedPackageId) || initialPackage || packages[0];

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [paxCount, setPaxCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<BookingRecord | null>(null);

  const pricePerPax = activePackage?.price || 3500000;
  const totalPrice = pricePerPax * paxCount;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Save directly to LocalStorage via Context
      const newBooking = addBooking({
        travelerName: contactName,
        email: contactEmail,
        phone: contactPhone,
        tripPackageId: activePackage.id,
        tripPackageTitle: activePackage.title,
        departureDate: selectedDate,
        guestCount: paxCount,
        pricePerPax: pricePerPax,
        notes: notes
      });

      setIsSubmitting(false);
      setCreatedBooking(newBooking);

      if (onSuccessBooking) {
        onSuccessBooking(newBooking);
      }
    }, 700);
  };

  if (!item && !activePackage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#091322] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <h3 className="text-base font-bold text-white">
              {createdBooking ? 'Reservasi Berhasil' : 'Form Pemesanan Tiket & Trip Wisata'}
            </h3>
            <span className="text-xs text-cyan-400 font-medium">
              Wakatobi Travel · LocalStorage Terintegrasi
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {createdBooking ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Nomor ID Pesanan Anda:
                </span>
                <span className="text-3xl font-black font-mono text-cyan-300">
                  {createdBooking.id}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Nama Wisatawan:</span>
                  <span className="font-semibold text-white">{createdBooking.travelerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Paket Wisata:</span>
                  <span className="font-semibold text-white text-right">{createdBooking.tripPackageTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Jumlah Peserta:</span>
                  <span className="font-semibold text-white">{createdBooking.guestCount} Orang</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Tanggal Keberangkatan:</span>
                  <span className="font-semibold text-white">{createdBooking.departureDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-bold">Total Biaya:</span>
                  <span className="font-extrabold text-cyan-400 text-sm">{formatPrice(createdBooking.totalPrice)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 max-w-md mx-auto">
                ✓ Pesanan telah tersimpan secara otomatis di LocalStorage dan diteruskan ke <strong>Admin Dashboard</strong> pengelola wisata.
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              
              {/* 1. Pilihan Paket Trip */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pilihan Paket Trip *</span>
                </label>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-medium"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} ({pkg.duration}) - {formatPrice(pkg.price)} / pax
                    </option>
                  ))}
                </select>
              </div>

              {/* Package Summary Box */}
              {activePackage && (
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/25 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activePackage.image}
                      alt={activePackage.title}
                      className="w-14 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {activePackage.title}
                      </h4>
                      <span className="text-[11px] text-cyan-300">
                        {formatPrice(activePackage.price)} per orang · {activePackage.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Total ({paxCount} Pax):</span>
                    <span className="text-sm font-black text-cyan-300">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              )}

              {/* 2. Jumlah Peserta & Tanggal Keberangkatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Jumlah Peserta */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Jumlah Peserta *</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-white w-10 text-center font-mono">
                      {paxCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPaxCount(paxCount + 1)}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-xs text-slate-400">Orang</span>
                  </div>
                </div>

                {/* Tanggal Keberangkatan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Tanggal Keberangkatan *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* 3. Data Wisatawan (Nama, WhatsApp, Email) */}
              <div className="space-y-3 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Data Identitas Wisatawan:
                </span>

                {/* Nama Lengkap Wisatawan */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nama Lengkap Wisatawan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Ilham"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Nomor WhatsApp */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>

                {/* Catatan / Kebutuhan Khusus */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Catatan Tambahan (Opsional)</label>
                  <textarea
                    rows={2}
                    placeholder="Permintaan khusus: ukuran kaki/fin, preferensi makanan, atau penjemputan bandara..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan ke Sistem Reservasi...</span>
                    </div>
                  ) : (
                    <>
                      <span>Pesan Sekarang ({formatPrice(totalPrice)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Data pesanan tersimpan langsung ke LocalStorage & Admin Panel</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
