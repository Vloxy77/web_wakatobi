/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WakatobiProvider, useWakatobi } from './context/WakatobiContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DiveConditions } from './components/DiveConditions';
import { IslandOverview } from './components/IslandOverview';
import { TripCatalogue } from './components/TripCatalogue';
import { WhyWakatobi } from './components/WhyWakatobi';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DestinationModal } from './components/DestinationModal';
import { BookingModal } from './components/BookingModal';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';

import { 
  FEATURED_DESTINATIONS, 
  ISLANDS_DATA 
} from './data/wakatobiData';
import { Destination, TripPackage, BookingRecord } from './types/wakatobi';
import { Shield, Eye, ArrowLeftRight, CheckCircle2, Lock } from 'lucide-react';

function WakatobiAppContent() {
  const { 
    activeMode, 
    setActiveMode, 
    isAdminAuthenticated, 
    packages, 
    bookings 
  } = useWakatobi();

  // Admin login modal state
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Favorites persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wkt_favorites');
      return saved ? JSON.parse(saved) : ['taman-nasional-wakatobi', 'karang-mari-mabuk'];
    } catch {
      return ['taman-nasional-wakatobi', 'karang-mari-mabuk'];
    }
  });

  // Modals state
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [bookingItem, setBookingItem] = useState<TripPackage | Destination | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [islandFilter, setIslandFilter] = useState('all');

  // Floating toast notification when a booking is created
  const [bookingSuccessToast, setBookingSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wkt_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Global key listener for ⌘K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleIslandOverviewFilter = (islandName: string) => {
    setIslandFilter(islandName);
    const destEl = document.getElementById('destinasi');
    if (destEl) {
      destEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTrips = () => {
    const catEl = document.getElementById('destinasi');
    if (catEl) {
      catEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuccessBooking = (newBooking: BookingRecord) => {
    setBookingSuccessToast(`Pesanan #${newBooking.id} berhasil disimpan ke LocalStorage! Anda dapat memeriksanya di Admin Dashboard.`);
    setTimeout(() => setBookingSuccessToast(null), 5000);
  };

  // Secure trigger for accessing admin mode:
  // Requires username and password if not authenticated!
  const handleRequestAdminAccess = () => {
    if (isAdminAuthenticated) {
      setActiveMode('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // If active mode is 'admin' and user is authenticated, render Admin Dashboard
  if (activeMode === 'admin' && isAdminAuthenticated) {
    return <AdminDashboard />;
  }

  // Otherwise, render Public Mode (Untuk Wisatawan/Pengunjung)
  return (
    <div className="min-h-screen bg-[#040911] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* 1. Navigasi Bar (Navbar) dengan Switch Masuk sebagai Admin */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSwitchToAdmin={handleRequestAdminAccess}
        favoritesCount={favorites.length}
      />

      <main className="flex-grow">
        {/* 2. Halaman Utama (Home / Hero Section) dengan Slider Cuplikan 5 Destinasi */}
        <HeroSection
          destinations={FEATURED_DESTINATIONS}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          onExploreTrips={handleExploreTrips}
        />

        {/* Live Marine & Dive Conditions Bar */}
        <DiveConditions />

        {/* 3. Wilayah (WA-KA-TO-BI) Interactive 4 Islands Showcase */}
        <IslandOverview
          islands={ISLANDS_DATA}
          onSelectIslandFilter={handleIslandOverviewFilter}
        />

        {/* 4. Bagian Katalog Trip & Destinasi Unggulan (dengan sinkronisasi data paket dari Context) */}
        <TripCatalogue
          destinations={FEATURED_DESTINATIONS}
          packages={packages}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          onBookPackage={(pkg) => setBookingItem(pkg)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          islandFilter={islandFilter}
          setIslandFilter={setIslandFilter}
        />

        {/* 5. Bagian "Mengapa Wakatobi?" (Why Us / Keunggulan) */}
        <WhyWakatobi />

        {/* 6. Halaman Kontak & Formulir Feedback */}
        <ContactSection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* FLOATING ADMIN ACCESS PILL (Quick Access with Password Protection) */}
      <aside aria-label="Mode Switcher" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={handleRequestAdminAccess}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 shadow-2xl backdrop-blur-md text-xs font-bold transition-all hover:scale-105 cursor-pointer group"
          title="Login ke Admin Dashboard Wisata Wakatobi"
        >
          {isAdminAuthenticated ? (
            <Shield className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          ) : (
            <Lock className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          )}
          <span>{isAdminAuthenticated ? 'Buka Admin Dashboard' : 'Admin Login'}</span>
          <span className={`w-2 h-2 rounded-full ${isAdminAuthenticated ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`}></span>
        </button>
      </aside>

      {/* SUCCESS BOOKING TOAST */}
      {bookingSuccessToast && (
        <div className="fixed top-24 right-6 z-50 max-w-md bg-cyan-950/95 border border-cyan-400/80 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-cyan-300 block mb-0.5">Reservasi Berhasil Terkirim!</span>
            <p className="text-slate-200">{bookingSuccessToast}</p>
            <button
              onClick={handleRequestAdminAccess}
              className="mt-2 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline"
            >
              Lihat di Admin Dashboard →
            </button>
          </div>
        </div>
      )}

      {/* ADMIN AUTHENTICATION LOGIN MODAL (Requires Username & Password) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen || (activeMode === 'admin' && !isAdminAuthenticated)}
        onClose={() => {
          setIsAdminLoginOpen(false);
          if (activeMode === 'admin' && !isAdminAuthenticated) {
            setActiveMode('public');
          }
        }}
        onSuccessLogin={() => {
          setIsAdminLoginOpen(false);
          setActiveMode('admin');
        }}
      />

      {/* Interactive Modals */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onBookNow={(dest) => setBookingItem(dest)}
          isFavorited={favorites.includes(selectedDestination.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {bookingItem && (
        <BookingModal
          item={bookingItem}
          onClose={() => setBookingItem(null)}
          onSuccessBooking={handleSuccessBooking}
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        destinations={FEATURED_DESTINATIONS}
        packages={packages}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onSelectPackage={(pkg) => setBookingItem(pkg)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        favorites={favorites}
        destinations={FEATURED_DESTINATIONS}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onRemoveFavorite={handleToggleFavorite}
        recentBookings={bookings}
      />

    </div>
  );
}

export default function App() {
  return (
    <WakatobiProvider>
      <WakatobiAppContent />
    </WakatobiProvider>
  );
}
