import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  User, 
  Menu, 
  X, 
  Bookmark, 
  Waves,
  MapPin,
  Shield,
  LayoutDashboard,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onSwitchToAdmin: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSearch, 
  onOpenProfile,
  onSwitchToAdmin,
  favoritesCount 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current section for active highlight
      const sections = ['hero', 'destinasi', 'wilayah', 'katalog', 'keunggulan', 'kontak', 'tentang'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Destinasi', href: '#destinasi', id: 'destinasi' },
    { label: 'Paket Trip', href: '#katalog', id: 'katalog' },
    { label: 'Kontak', href: '#kontak', id: 'kontak' },
    { label: 'About', href: '#tentang', id: 'tentang' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#050b14]/90 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-xl shadow-black/40' 
          : 'bg-gradient-to-b from-[#040911]/85 via-[#040911]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Kiri: Wakatobi Travel */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <Waves className="w-5 h-5 text-white stroke-[2.5]" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#050b14]"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">
                  Wakatobi Travel
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  WKT
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-slate-300">
                Official Tourism & Dive Portal
              </span>
            </div>
          </a>

          {/* Menu Navigasi Tengah */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'text-cyan-300 font-bold bg-cyan-950/70 border border-cyan-500/30 shadow-sm shadow-cyan-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Bagian Kanan: Search & Profile & Switch Masuk sebagai Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-200 text-xs shadow-sm cursor-pointer"
              title="Cari destinasi atau paket trip"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline text-slate-300 pr-1">Cari...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">⌘K</kbd>
            </button>

            {/* Bookmark / Favorit Button */}
            <button
              onClick={onOpenProfile}
              type="button"
              className="relative p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer"
              title="Daftar Destinasi Tersimpan"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* TOMBOL SWITCH: "Masuk sebagai Admin" */}
            <button
              onClick={onSwitchToAdmin}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-cyan-950 via-slate-900 to-sky-950 hover:from-cyan-900 hover:to-sky-900 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all duration-200 cursor-pointer shadow-md shadow-cyan-950 group"
              title="Masuk ke Panel Admin Wisata Wakatobi"
            >
              <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold whitespace-nowrap">
                Masuk sebagai Admin
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-2 pb-5 bg-[#050b14]/95 border-b border-cyan-500/20 backdrop-blur-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5 max-w-md mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Switch to Admin in Mobile Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSwitchToAdmin();
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-bold text-xs"
            >
              <Shield className="w-4 h-4" />
              <span>Masuk sebagai Admin Dashboard</span>
            </button>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2 mt-2">
              <span>Wakatobi Travel · UNESCO Biosphere</span>
              <span className="text-cyan-400 font-semibold">Sultra</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
