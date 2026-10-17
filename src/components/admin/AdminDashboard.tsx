import React, { useState, useMemo } from 'react';
import { 
  Users, 
  CalendarCheck, 
  DollarSign, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  ExternalLink, 
  Plus, 
  Download, 
  Eye, 
  RefreshCw, 
  Check, 
  AlertCircle,
  FileText,
  MapPin,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpRight,
  Package,
  Layers,
  Edit,
  X,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useWakatobi } from '../../context/WakatobiContext';
import { BookingRecord, BookingStatus, TripPackage } from '../../types/wakatobi';

export const AdminDashboard: React.FC = () => {
  const { 
    bookings, 
    packages, 
    updateBookingStatus, 
    deleteBooking, 
    addPackage, 
    updatePackage, 
    deletePackage, 
    setActiveMode,
    adminUser,
    logoutAdmin,
    resetAllData 
  } = useWakatobi();

  // Active admin tab: 'bookings' or 'packages'
  const [activeTab, setActiveTab] = useState<'bookings' | 'packages'>('bookings');

  // Search & filter states for Bookings Table
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<BookingRecord | null>(null);

  // Package Form modal state
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [packageFormData, setPackageFormData] = useState({
    title: '',
    islandFocus: 'Tomia',
    duration: '3 Hari 2 Malam',
    price: 3500000,
    shortDesc: '',
    overview: '',
    groupType: 'Open Trip' as 'Open Trip' | 'Private Charter' | 'Dive Safari',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    badge: 'Paket Populer',
    inclusions: 'Kapal dive boat, makan 3x sehari, peralatan snorkel, pemandu lokal',
    highlights: 'Wall dive Mari Mabuk, sunset Puncak Kahianga, pasir putih Hoga'
  });

  // Feedback toast
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // 1. STATS CALCULATION
  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const totalTravelers = bookings.reduce((sum, b) => sum + (b.guestCount || 1), 0);
    
    // Revenue from confirmed and completed bookings
    const confirmedRevenue = bookings
      .filter(b => b.status === 'Terkonfirmasi' || b.status === 'Selesai')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const pendingCount = bookings.filter(b => b.status === 'Menunggu Konfirmasi').length;
    const confirmedCount = bookings.filter(b => b.status === 'Terkonfirmasi').length;
    const completedCount = bookings.filter(b => b.status === 'Selesai').length;
    const cancelledCount = bookings.filter(b => b.status === 'Dibatalkan').length;

    return {
      totalBookings,
      totalTravelers,
      confirmedRevenue,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount
    };
  }, [bookings]);

  // 2. FILTERED BOOKINGS TABLE
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch = 
        b.travelerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone.includes(searchQuery) ||
        b.tripPackageTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || b.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Terkonfirmasi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Terkonfirmasi
          </span>
        );
      case 'Menunggu Konfirmasi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Menunggu
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Selesai
          </span>
        );
      case 'Dibatalkan':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            Dibatalkan
          </span>
        );
    }
  };

  // Export to CSV function
  const handleExportCSV = () => {
    const headers = ['ID Pesanan', 'Nama Wisatawan', 'Email', 'WhatsApp', 'Paket Trip', 'Tanggal Keberangkatan', 'Peserta', 'Total Harga', 'Status'];
    const rows = filteredBookings.map(b => [
      b.id,
      `"${b.travelerName}"`,
      b.email,
      b.phone,
      `"${b.tripPackageTitle}"`,
      b.departureDate,
      b.guestCount,
      b.totalPrice,
      b.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wakatobi_Pemesanan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('Data pemesanan berhasil diekspor ke format CSV.');
  };

  // Open package form for create/edit
  const handleOpenPackageModal = (pkgToEdit?: TripPackage) => {
    if (pkgToEdit) {
      setEditingPackageId(pkgToEdit.id);
      setPackageFormData({
        title: pkgToEdit.title,
        islandFocus: pkgToEdit.islandFocus,
        duration: pkgToEdit.duration,
        price: pkgToEdit.price,
        shortDesc: pkgToEdit.shortDesc,
        overview: pkgToEdit.overview,
        groupType: pkgToEdit.groupType,
        image: pkgToEdit.image,
        badge: pkgToEdit.badge || 'Paket Populer',
        inclusions: pkgToEdit.inclusions.join(', '),
        highlights: pkgToEdit.highlights.join(', ')
      });
    } else {
      setEditingPackageId(null);
      setPackageFormData({
        title: '',
        islandFocus: 'Tomia',
        duration: '3 Hari 2 Malam',
        price: 3500000,
        shortDesc: '',
        overview: '',
        groupType: 'Open Trip',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
        badge: 'Paket Populer',
        inclusions: 'Kapal dive boat, makan 3x sehari, alat snorkel, pemandu lokal',
        highlights: 'Wall dive Mari Mabuk, sunset Puncak Kahianga, pasir putih Hoga'
      });
    }
    setIsPackageModalOpen(true);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const incArray = packageFormData.inclusions.split(',').map(s => s.trim()).filter(Boolean);
    const highArray = packageFormData.highlights.split(',').map(s => s.trim()).filter(Boolean);

    if (editingPackageId) {
      updatePackage(editingPackageId, {
        title: packageFormData.title,
        islandFocus: packageFormData.islandFocus,
        duration: packageFormData.duration,
        price: Number(packageFormData.price),
        shortDesc: packageFormData.shortDesc,
        overview: packageFormData.overview,
        groupType: packageFormData.groupType,
        image: packageFormData.image,
        badge: packageFormData.badge,
        inclusions: incArray,
        highlights: highArray
      });
      showNotice('Paket trip berhasil diperbarui.');
    } else {
      addPackage({
        title: packageFormData.title,
        slug: packageFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        islandFocus: packageFormData.islandFocus,
        duration: packageFormData.duration,
        price: Number(packageFormData.price),
        rating: 4.95,
        reviewCount: 1,
        shortDesc: packageFormData.shortDesc,
        overview: packageFormData.overview,
        groupType: packageFormData.groupType,
        maxPax: 10,
        image: packageFormData.image,
        badge: packageFormData.badge,
        inclusions: incArray,
        highlights: highArray,
        itinerary: [
          { day: 1, title: 'Kedatangan & Briefing Wisata', activities: ['Penjemputan dan check-in'] },
          { day: 2, title: 'Eksplorasi Spot Utama & Sunset', activities: ['Snorkel/diving dan kuliner khas'] }
        ]
      });
      showNotice('Paket trip baru berhasil ditambahkan.');
    }
    setIsPackageModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#040911] text-slate-100 flex flex-col font-sans">
      
      {/* Admin Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#060e1d]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & Admin Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 flex items-center justify-center text-white font-extrabold shadow-md shadow-cyan-500/20">
              AD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white tracking-wide">
                  Admin Dashboard Wisata Wakatobi
                </h1>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  Panel Pengelola
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Pusat Kontrol Pemesanan & Inventaris Paket Wisata
              </p>
            </div>
          </div>

          {/* Action buttons on right */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            {/* Tab switchers */}
            <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'bookings'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Kelola Pemesanan ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Kelola Paket Trip ({packages.length})
              </button>
            </div>

            {/* Admin identity badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-white text-[11px] leading-tight">
                  {adminUser?.name || 'Administrator Wakatobi'}
                </span>
                <span className="text-[10px] text-slate-400">Sesi Login Aktif</span>
              </div>
            </div>

            {/* Back to Public Mode Switcher */}
            <button
              onClick={() => setActiveMode('public')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Kembali ke tampilan pengunjung website"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Website</span>
            </button>

            {/* Logout Admin Button */}
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin keluar dari sesi Admin?')) {
                  logoutAdmin();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-rose-100 border border-rose-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Keluar dari sesi Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>

        </div>
      </header>

      {/* Action Notice Toast */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-cyan-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 1. RINGKASAN STATISTIK (STAT CARDS) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Ringkasan Statistik Pariwisata
              </h2>
              <p className="text-xs text-slate-400">
                Data aktivitas pemesanan wisatawan yang tersinkronisasi otomatis dengan LocalStorage
              </p>
            </div>

            <button
              onClick={() => {
                if (confirm('Kembalikan semua data ke pengaturan awal (seed data default)?')) {
                  resetAllData();
                  showNotice('Data berhasil di-reset ke default.');
                }
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-slate-900"
              title="Reset ke data awal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Data Awal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Wisatawan Terdaftar */}
            <div className="p-5 rounded-2xl bg-[#091322] border border-cyan-500/20 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Total Wisatawan
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {stats.totalTravelers} <span className="text-sm font-normal text-slate-400">Pax</span>
                </div>
                <span className="text-[11px] text-cyan-400 mt-1 inline-block">
                  Dari {stats.totalBookings} grup reservasi
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* Card 2: Total Pemesanan Paket */}
            <div className="p-5 rounded-2xl bg-[#091322] border border-cyan-500/20 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Total Pemesanan
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {stats.totalBookings} <span className="text-sm font-normal text-slate-400">Trip</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                  <span className="text-amber-400 font-semibold">{stats.pendingCount} Pending</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">{stats.confirmedCount} Acc</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <CalendarCheck className="w-6 h-6" />
              </div>
            </div>

            {/* Card 3: Total Pendapatan / Revenue */}
            <div className="p-5 rounded-2xl bg-[#091322] border border-cyan-500/20 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Estimasi Pendapatan
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  {formatPrice(stats.confirmedRevenue)}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 inline-block">
                  Dari pemesanan valid
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            {/* Card 4: Status Breakdown */}
            <div className="p-5 rounded-2xl bg-[#091322] border border-cyan-500/20 shadow-xl flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Distribusi Status
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-1.5 rounded-lg bg-amber-950/40 border border-amber-500/20 flex items-center justify-between">
                  <span className="text-amber-300">Menunggu:</span>
                  <span className="font-bold text-amber-400">{stats.pendingCount}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-between">
                  <span className="text-emerald-300">Terkonfirmasi:</span>
                  <span className="font-bold text-emerald-400">{stats.confirmedCount}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between">
                  <span className="text-cyan-300">Selesai:</span>
                  <span className="font-bold text-cyan-400">{stats.completedCount}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/20 flex items-center justify-between">
                  <span className="text-rose-300">Batal:</span>
                  <span className="font-bold text-rose-400">{stats.cancelledCount}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. TAB VIEW: KELOLA PEMESANAN WISATAWAN */}
        {activeTab === 'bookings' && (
          <section className="space-y-4">
            
            {/* Filter Bar & Export */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#091322] p-4 rounded-2xl border border-slate-800">
              
              {/* Search bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari ID pesanan, nama wisatawan, WA, paket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Status Filter buttons & Export button */}
              <div className="flex flex-wrap items-center gap-2">
                
                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'all'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Semua ({bookings.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Menunggu Konfirmasi')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'Menunggu Konfirmasi'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Menunggu ({stats.pendingCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Terkonfirmasi')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'Terkonfirmasi'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Acc ({stats.confirmedCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Selesai')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'Selesai'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Selesai ({stats.completedCount})
                  </button>
                </div>

                {/* Export button */}
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  title="Unduh data tabel ke file CSV"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ekspor CSV</span>
                </button>
              </div>

            </div>

            {/* Bookings Table */}
            <div className="bg-[#091322] rounded-2xl border border-cyan-500/15 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="py-3.5 px-4">ID Pesanan</th>
                      <th className="py-3.5 px-4">Nama Wisatawan</th>
                      <th className="py-3.5 px-4">Kontak (WA/Email)</th>
                      <th className="py-3.5 px-4">Paket Wisata</th>
                      <th className="py-3.5 px-4">Tgl Berangkat</th>
                      <th className="py-3.5 px-4 text-center">Pax</th>
                      <th className="py-3.5 px-4">Total Biaya</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-center">Aksi Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-slate-400">
                          <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="font-medium text-white">Tidak Ada Data Pemesanan</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Cobalah ubah kata kunci pencarian atau ganti filter status.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((booking) => (
                        <tr 
                          key={booking.id}
                          className="hover:bg-slate-800/40 transition-colors group"
                        >
                          {/* ID Pesanan */}
                          <td className="py-3 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedBookingForDetail(booking)}
                              className="hover:underline flex items-center gap-1"
                              title="Klik untuk detail"
                            >
                              {booking.id}
                            </button>
                            <span className="text-[10px] text-slate-300 font-sans block">
                              {new Date(booking.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          </td>

                          {/* Nama Wisatawan */}
                          <td className="py-3 px-4">
                            <span className="font-bold text-white block">
                              {booking.travelerName}
                            </span>
                            {booking.notes && (
                              <span className="text-[10px] text-slate-300 line-clamp-1 italic max-w-xs">
                                "{booking.notes}"
                              </span>
                            )}
                          </td>

                          {/* Kontak */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <a
                              href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 font-mono hover:underline flex items-center gap-1"
                              title="Chat WhatsApp"
                            >
                              <span>{booking.phone}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                            <span className="text-[10px] text-slate-300 block">
                              {booking.email}
                            </span>
                          </td>

                          {/* Paket Trip */}
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-200 line-clamp-1 max-w-[200px]" title={booking.tripPackageTitle}>
                              {booking.tripPackageTitle}
                            </span>
                          </td>

                          {/* Tanggal */}
                          <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                            {booking.departureDate || 'Belum dipilih'}
                          </td>

                          {/* Pax */}
                          <td className="py-3 px-4 text-center font-bold text-white whitespace-nowrap">
                            {booking.guestCount} Orang
                          </td>

                          {/* Total Biaya */}
                          <td className="py-3 px-4 font-bold text-cyan-300 whitespace-nowrap">
                            {formatPrice(booking.totalPrice)}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            {getStatusBadge(booking.status)}
                          </td>

                          {/* Aksi */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              
                              {/* Quick Approve / Konfirmasi */}
                              {booking.status !== 'Terkonfirmasi' && (
                                <button
                                  onClick={() => {
                                    updateBookingStatus(booking.id, 'Terkonfirmasi');
                                    showNotice(`Pesanan ${booking.id} berhasil disetujui/dikonfirmasi!`);
                                  }}
                                  className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/30 transition-colors"
                                  title="Konfirmasi Pesanan"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Mark as Selesai */}
                              {booking.status === 'Terkonfirmasi' && (
                                <button
                                  onClick={() => {
                                    updateBookingStatus(booking.id, 'Selesai');
                                    showNotice(`Pesanan ${booking.id} ditandai selesai.`);
                                  }}
                                  className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/30 transition-colors"
                                  title="Tandai Selesai"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Cancel */}
                              {booking.status !== 'Dibatalkan' && (
                                <button
                                  onClick={() => {
                                    updateBookingStatus(booking.id, 'Dibatalkan');
                                    showNotice(`Pesanan ${booking.id} dibatalkan.`);
                                  }}
                                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-500/30 transition-colors"
                                  title="Batalkan Pesanan"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Detail Modal trigger */}
                              <button
                                onClick={() => setSelectedBookingForDetail(booking)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                title="Lihat Rincian Pesanan"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus permanen pesanan ${booking.id} atas nama ${booking.travelerName}?`)) {
                                    deleteBooking(booking.id);
                                    showNotice(`Pesanan ${booking.id} berhasil dihapus.`);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                                title="Hapus Data Pesanan"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* 3. TAB VIEW: KELOLA PAKET TRIP (TRIP MANAGEMENT) */}
        {activeTab === 'packages' && (
          <section className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Kelola Inventaris Paket Wisata
                </h3>
                <p className="text-xs text-slate-400">
                  Tambah paket trip baru atau perbarui harga & fasilitas. Perubahan akan langsung tampil di Katalog Wisatawan.
                </p>
              </div>

              <button
                onClick={() => handleOpenPackageModal()}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Paket Trip Baru</span>
              </button>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl bg-[#091322] border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl"
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091322] via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                        {pkg.islandFocus}
                      </span>
                      <span className="text-xs bg-slate-950/80 text-white px-2 py-0.5 rounded-md font-mono">
                        {pkg.duration}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-4 right-4">
                      <span className="text-lg font-black text-white">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">/ pax</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white mb-1.5">
                        {pkg.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                        {pkg.shortDesc}
                      </p>

                      <div className="space-y-1 mb-4 text-[11px] text-slate-300">
                        <span className="font-semibold text-slate-300 block">Fasilitas Utama:</span>
                        {pkg.inclusions.slice(0, 2).map((inc, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-cyan-400">✓</span>
                            <span className="line-clamp-1">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenPackageModal(pkg)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Paket</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Hapus paket trip "${pkg.title}"?`)) {
                            deletePackage(pkg.id);
                            showNotice(`Paket "${pkg.title}" berhasil dihapus.`);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Hapus Paket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

      </main>

      {/* DETAIL MODAL FOR A SINGLE BOOKING */}
      {selectedBookingForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#091322] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  Rincian Pemesanan Wisatawan
                </span>
                <h3 className="text-xl font-bold text-white font-mono">
                  {selectedBookingForDetail.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingForDetail(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Wisatawan:</span>
                  <span className="font-bold text-white">{selectedBookingForDetail.travelerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nomor WhatsApp:</span>
                  <a
                    href={`https://wa.me/${selectedBookingForDetail.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {selectedBookingForDetail.phone}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Alamat Email:</span>
                  <span className="text-slate-200">{selectedBookingForDetail.email}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Paket Wisata:</span>
                  <span className="font-bold text-white text-right">{selectedBookingForDetail.tripPackageTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tanggal Berangkat:</span>
                  <span className="text-slate-200">{selectedBookingForDetail.departureDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jumlah Peserta:</span>
                  <span className="font-bold text-white">{selectedBookingForDetail.guestCount} Orang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Harga Per Pax:</span>
                  <span className="text-slate-200">{formatPrice(selectedBookingForDetail.pricePerPax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400 font-bold">Total Pembayaran:</span>
                  <span className="text-sm font-black text-cyan-300">{formatPrice(selectedBookingForDetail.totalPrice)}</span>
                </div>
              </div>

              {selectedBookingForDetail.notes && (
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-bold text-slate-400 block mb-1">Catatan Khusus Wisatawan:</span>
                  <p className="text-slate-300 italic">{selectedBookingForDetail.notes}</p>
                </div>
              )}

              {/* Status Change Selector inside Detail Modal */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Ubah Status Pemesanan Ini:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Menunggu Konfirmasi', 'Terkonfirmasi', 'Selesai', 'Dibatalkan'] as BookingStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        updateBookingStatus(selectedBookingForDetail.id, st);
                        setSelectedBookingForDetail({
                          ...selectedBookingForDetail,
                          status: st
                        });
                        showNotice(`Status pesanan ${selectedBookingForDetail.id} diubah menjadi "${st}".`);
                      }}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedBookingForDetail.status === st
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-cyan-500/40'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedBookingForDetail(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Tutup Rincian
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL FORM TAMBAH / EDIT PAKET TRIP */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#091322] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-white">
                {editingPackageId ? 'Edit Paket Trip Wisata' : 'Tambah Paket Trip Baru'}
              </h3>
              <button
                onClick={() => setIsPackageModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Paket Wisata *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Diving Explorer Tomia 3D2N"
                  value={packageFormData.title}
                  onChange={(e) => setPackageFormData({ ...packageFormData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Lokasi / Fokus Pulau *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Tomia & Wangi-Wangi"
                    value={packageFormData.islandFocus}
                    onChange={(e) => setPackageFormData({ ...packageFormData, islandFocus: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Durasi Trip *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 3 Hari 2 Malam"
                    value={packageFormData.duration}
                    onChange={(e) => setPackageFormData({ ...packageFormData, duration: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Harga Per Orang (IDR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="100000"
                    step="50000"
                    value={packageFormData.price}
                    onChange={(e) => setPackageFormData({ ...packageFormData, price: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Tipe Wisata
                  </label>
                  <select
                    value={packageFormData.groupType}
                    onChange={(e) => setPackageFormData({ ...packageFormData, groupType: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-white outline-none"
                  >
                    <option value="Open Trip">Open Trip</option>
                    <option value="Private Charter">Private Charter</option>
                    <option value="Dive Safari">Dive Safari</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Deskripsi Singkat *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ringkasan daya tarik paket..."
                  value={packageFormData.shortDesc}
                  onChange={(e) => setPackageFormData({ ...packageFormData, shortDesc: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  URL Gambar Banner
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={packageFormData.image}
                  onChange={(e) => setPackageFormData({ ...packageFormData, image: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Fasilitas Termasuk (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Boat dive, makan 3x, dive guide, tiket konservasi"
                  value={packageFormData.inclusions}
                  onChange={(e) => setPackageFormData({ ...packageFormData, inclusions: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2 text-white outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
                >
                  Simpan Paket Trip
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
