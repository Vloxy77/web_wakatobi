import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Star, 
  Waves, 
  Eye, 
  Clock, 
  Users, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck,
  Check, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { Destination, TripPackage, SpotCategory } from '../types/wakatobi';

interface TripCatalogueProps {
  destinations: Destination[];
  packages: TripPackage[];
  onSelectDestination: (dest: Destination) => void;
  onBookPackage: (pkg: TripPackage) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  islandFilter: string;
  setIslandFilter: (island: string) => void;
}

export const TripCatalogue: React.FC<TripCatalogueProps> = ({
  destinations,
  packages,
  onSelectDestination,
  onBookPackage,
  favorites,
  onToggleFavorite,
  islandFilter,
  setIslandFilter
}) => {
  const [activeCategory, setActiveCategory] = useState<SpotCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionTab, setActiveSectionTab] = useState<'destinasi' | 'paket'>('destinasi');

  // Filter destinations
  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = activeCategory === 'all' || dest.category === activeCategory;
    const matchesIsland = islandFilter === 'all' || dest.island === islandFilter;
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.highlightTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesIsland && matchesSearch;
  });

  const categoryButtons: { id: SpotCategory; label: string }[] = [
    { id: 'all', label: 'Semua Spot' },
    { id: 'diving', label: 'Diving & Snorkeling' },
    { id: 'island_hopping', label: 'Island Hopping & Pantai' },
    { id: 'culture', label: 'Budaya Bajo & Sejarah' },
    { id: 'eco_nature', label: 'Sunset & Ekowisata' },
  ];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="destinasi" className="py-20 bg-[#040911] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>Katalog Wisata & Destinasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Destinasi Ikonik &{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Katalog Perjalanan
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pilihlah spot terumbu karang legendaris, desa terapung Bajo, atau paket trip terkurasi 
            dengan panduan instruktur bersertifikasi.
          </p>

          {/* Sub Navigation Switcher: Destinasi Spot vs Paket Trip */}
          <div className="mt-8 inline-flex p-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveSectionTab('destinasi')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSectionTab === 'destinasi'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Destinasi & Spot Populer ({destinations.length})
            </button>
            <button
              id="katalog"
              onClick={() => setActiveSectionTab('paket')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSectionTab === 'paket'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Paket Trip Eksklusif ({packages.length})
            </button>
          </div>
        </div>

        {/* View 1: DESTINASI UNGGULAN */}
        {activeSectionTab === 'destinasi' && (
          <div>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
              
              {/* Category Segmented Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {categoryButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setActiveCategory(btn.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === btn.id
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Island Filter & Search Bar */}
              <div className="flex items-center gap-2">
                <select
                  value={islandFilter}
                  onChange={(e) => setIslandFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <option value="all">Semua Pulau</option>
                  <option value="Wangi-Wangi">Wangi-Wangi</option>
                  <option value="Kaledupa">Kaledupa</option>
                  <option value="Tomia">Tomia</option>
                  <option value="Binongko">Binongko</option>
                </select>

                <div className="relative flex-1 md:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari spot..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Destination Cards Grid with Rounded Corners and Hover Effects */}
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
                <Compass className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-60" />
                <h4 className="text-lg font-bold text-white mb-1">Destinasi Tidak Ditemukan</h4>
                <p className="text-xs text-slate-400 mb-4">
                  Cobalah ubah kata kunci pencarian atau reset filter wilayah.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setIslandFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredDestinations.map((dest) => {
                  const isFavorited = favorites.includes(dest.id);
                  return (
                    <div
                      key={dest.id}
                      className="group relative rounded-3xl bg-[#091322] border border-cyan-500/15 overflow-hidden transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/50 flex flex-col justify-between"
                    >
                      {/* Image Thumbnail with Overlay */}
                      <div className="relative h-60 w-full overflow-hidden">
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#091322] via-[#091322]/20 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            {dest.island}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(dest.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                              isFavorited
                                ? 'bg-cyan-500 text-slate-950'
                                : 'bg-slate-950/70 text-white hover:text-cyan-400 border border-white/10'
                            }`}
                            title={isFavorited ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                          >
                            {isFavorited ? (
                              <BookmarkCheck className="w-4 h-4" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Floating Rating Pill */}
                        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-amber-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{dest.rating}</span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            ({dest.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Quiet Metadata Line */}
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                            <span className="text-cyan-400 font-medium">{dest.suggestedDuration}</span>
                            {dest.diveLevel && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{dest.diveLevel}</span>
                              </>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                            {dest.name}
                          </h3>

                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                            {dest.shortDesc}
                          </p>

                          {/* Highlight Tag list without pills */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400 mb-6">
                            {dest.highlightTags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="flex items-center gap-1">
                                <span className="text-cyan-400">#</span>
                                <span>{tag}</span>
                                {i < 2 && <span className="text-slate-600">·</span>}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: Action Button */}
                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                              Estimasi Biaya
                            </span>
                            <span className="text-sm font-bold text-white">
                              {dest.estimatedPrice === 0 ? 'Gratis' : `Mulai ${formatPrice(dest.estimatedPrice)}`}
                            </span>
                          </div>

                          <button
                            onClick={() => onSelectDestination(dest)}
                            className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 font-semibold text-xs border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-1.5 transition-all cursor-pointer group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-transparent"
                          >
                            <span>Lihat Detail</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* View 2: PAKET TRIP EKSKLUSIF */}
        {activeSectionTab === 'paket' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="group rounded-3xl bg-[#091322] border border-cyan-500/20 overflow-hidden flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-950/60 transition-all duration-300"
              >
                {/* Header Image with Tag */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091322] via-[#091322]/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {pkg.badge && (
                      <span className="bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="bg-slate-950/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Price Banner at bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] text-slate-300 block font-medium">Harga Paket / Pax:</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-cyan-300">
                          {formatPrice(pkg.price)}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(pkg.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-amber-300 bg-slate-950/90 px-2.5 py-1 rounded-lg border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{pkg.rating}</span>
                      <span className="text-slate-400">({pkg.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Fokus Wilayah: {pkg.islandFocus}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-300">{pkg.groupType}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {pkg.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {pkg.overview}
                    </p>

                    {/* Inclusions summary */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Fasilitas Termasuk dalam Paket:
                      </h4>
                      <div className="space-y-2">
                        {pkg.inclusions.slice(0, 4).map((inc, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
                    <button
                      onClick={() => onBookPackage(pkg)}
                      type="button"
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Pesan Sekarang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
