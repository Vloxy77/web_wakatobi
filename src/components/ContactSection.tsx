import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Shield,
  LifeBuoy
} from 'lucide-react';
import { ContactInquiry } from '../types/wakatobi';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    phone: '',
    islandInterest: 'Wangi-Wangi',
    packageType: 'Katalog Trip Umum',
    travelDate: '',
    guestCount: 2,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(`Terima kasih Bapak/Ibu ${formData.name}! Pesan dan konsultasi perjalanan Anda telah kami terima. Tim Konsultan Wisata Wakatobi akan menghubungi Anda melalui WhatsApp/Email dalam 1x24 jam.`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        islandInterest: 'Wangi-Wangi',
        packageType: 'Katalog Trip Umum',
        travelDate: '',
        guestCount: 2,
        message: ''
      });
    }, 900);
  };

  return (
    <section id="kontak" className="py-24 bg-[#040911] relative overflow-hidden border-t border-slate-800">
      {/* Ocean background aura */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Pusat Informasi & Layanan Wisatawan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Hubungi Kami &{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Rencanakan Perjalanan
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Dapatkan rekomendasi rute penyeberangan, panduan musim penyelaman, izin konservasi, 
            serta paket perjalanan resmi dari Dinas Pariwisata Kabupaten Wakatobi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Kolom Kiri: Informasi Kantor Pariwisata & Kontak Resmi */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/20 p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Kantor Resmi Pariwisata Wakatobi
              </h3>

              <div className="space-y-6">
                
                {/* Alamat */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Alamat Kantor Resmi
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      Dinas Pariwisata dan Ekonomi Kreatif Kabupaten Wakatobi<br />
                      Jl. Samburaka No. 12, Kel. Mandati III, Wangi-Wangi Selatan, 
                      Kabupaten Wakatobi, Sulawesi Tenggara 93791, Indonesia.
                    </p>
                  </div>
                </div>

                {/* Telepon & WhatsApp Hotline */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Telepon & WhatsApp TIC
                    </h4>
                    <p className="text-sm font-semibold text-white">
                      +62 (0404) 21234 (Telepon Kantor)
                    </p>
                    <p className="text-xs text-cyan-400 font-mono mt-0.5">
                      Hotline 24 Jam: +62 812-4040-9988 (WhatsApp)
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Email Resmi
                    </h4>
                    <p className="text-sm text-slate-200">
                      info@pariwisatawakatobi.id
                    </p>
                    <p className="text-xs text-slate-400">
                      visit@wakatobitourism.go.id
                    </p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Jam Layanan Informasi (TIC)
                    </h4>
                    <p className="text-sm text-slate-200">
                      Senin – Minggu: 08:00 – 17:00 WITA
                    </p>
                    <p className="text-xs text-slate-400">
                      Siaga Tim Evakuasi Laut Selam 24/7
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Emergency & Dive Support Info Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/20 flex items-center gap-3">
              <LifeBuoy className="w-6 h-6 text-cyan-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white block">Hyperbaric Chamber Support:</span>
                Tersedia fasilitas penanganan dekompresi selam darurat dan koordinasi cepat tim SAR laut Wakatobi.
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Formulir Pesan & Konsultasi ("Tinggalkan Pesan Anda") */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/25 p-6 sm:p-10 shadow-2xl relative">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Tinggalkan Pesan Anda
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Konsultasikan jadwal kedatangan, permintaan khusus grup/privat, 
                  atau pertanyaan seputar penyelaman terumbu karang.
                </p>
              </div>

              {submittedMessage ? (
                <div className="p-6 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 text-center animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Pesan Berhasil Terkirim!</h4>
                  <p className="text-xs sm:text-sm text-slate-200 mb-6 leading-relaxed">
                    {submittedMessage}
                  </p>
                  <button
                    onClick={() => setSubmittedMessage(null)}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama Lengkap */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Rian Pratama"
                        className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    {/* Email Resmi */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@email.com"
                        className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Nomor WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="081234567890"
                        className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    {/* Minat Wilayah */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Fokus Pulau
                      </label>
                      <select
                        value={formData.islandInterest}
                        onChange={(e) => setFormData({ ...formData, islandInterest: e.target.value })}
                        className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-3 py-2.5 text-sm text-white outline-none transition-all"
                      >
                        <option value="Wangi-Wangi">Wangi-Wangi</option>
                        <option value="Kaledupa & Hoga">Kaledupa & Hoga</option>
                        <option value="Tomia">Tomia</option>
                        <option value="Binongko">Binongko</option>
                        <option value="Semua 4 Pulau (Ekspedisi)">Semua 4 Pulau (WKTB)</option>
                      </select>
                    </div>

                    {/* Estimasi Peserta */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Jumlah Peserta
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                        className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Isi Pesan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Pesan atau Pertanyaan Anda *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Jelaskan kebutuhan perjalanan Anda, tanggal rencana kunjungan, apakah memerlukan dive guide / peralatan selam, atau paket keluarga..."
                      className="w-full bg-slate-800/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 disabled:opacity-60 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Mengirimkan Pesan...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Kirim Pesan & Konsultasi Wisata</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-slate-300">
                    Data Anda aman dan hanya digunakan oleh Dinas Pariwisata Wakatobi untuk keperluan informasi wisata.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
