import React from 'react';
import { 
  Waves, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp,
  ShieldCheck,
  Instagram,
  Youtube,
  Facebook,
  Twitter
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="tentang" className="bg-[#03060c] border-t border-cyan-500/15 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Kolom 1: Brand & UNESCO Accreditation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
                <Waves className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-wider text-white">WKT</span>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    Official
                  </span>
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  Pesona Wisata Kabupaten Wakatobi
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform promosi dan layanan pariwisata terintegrasi Kabupaten Wakatobi, 
              Provinsi Sulawesi Tenggara. Cagar Biosfer Dunia UNESCO dan surga terumbu karang terluas di jantung Segitiga Karang Dunia.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center transition-colors"
                aria-label="Instagram Wakatobi Tourism"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center transition-colors"
                aria-label="YouTube Wakatobi Tourism"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center transition-colors"
                aria-label="Facebook Wakatobi Tourism"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center transition-colors"
                aria-label="Twitter Wakatobi Tourism"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">Beranda (Home)</a>
              </li>
              <li>
                <a href="#destinasi" className="hover:text-cyan-400 transition-colors">Destinasi Spot</a>
              </li>
              <li>
                <a href="#wilayah" className="hover:text-cyan-400 transition-colors">Wilayah (WA-KA-TO-BI)</a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-cyan-400 transition-colors">Katalog Trip</a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-cyan-400 transition-colors">Mengapa Wakatobi</a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-cyan-400 transition-colors">Kontak & Reservasi</a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: 4 Pulau Utama (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Wilayah Pulau
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#wilayah" className="hover:text-cyan-400 transition-colors">Pulau Wangi-Wangi</a>
              </li>
              <li>
                <a href="#wilayah" className="hover:text-cyan-400 transition-colors">Pulau Kaledupa & Hoga</a>
              </li>
              <li>
                <a href="#wilayah" className="hover:text-cyan-400 transition-colors">Pulau Tomia</a>
              </li>
              <li>
                <a href="#wilayah" className="hover:text-cyan-400 transition-colors">Pulau Binongko</a>
              </li>
              <li>
                <a href="#destinasi" className="hover:text-cyan-400 transition-colors">Taman Nasional Wakatobi</a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sertifikasi & Partner (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kemitraan & Akreditasi
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>UNESCO Biosphere Reserve 2012</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kementerian Pariwisata & Ekraf RI</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Balai Taman Nasional Wakatobi</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300">
              Mendukung konservasi terumbu karang berkelanjutan dan pemberdayaan masyarakat adat maritim.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Dinas Pariwisata dan Ekonomi Kreatif Kabupaten Wakatobi. Seluruh hak cipta dilindungi.
          </p>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
