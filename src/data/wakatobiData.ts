import { Destination, TripPackage, IslandProfile } from '../types/wakatobi';

export const ISLANDS_DATA: IslandProfile[] = [
  {
    id: 'wangi-wangi',
    code: 'WA',
    name: 'Wangi-Wangi',
    title: 'Gerbang Utama & Pesona Bahari',
    tagline: 'Pintu masuk surga karang dengan budaya maritim Suku Bajo Mola.',
    description: 'Sebagai pulau ibu kota Kabupaten Wakatobi, Wangi-Wangi memiliki akses Bandara Matahora serta dermaga kapal penyeberangan antarpulau. Menyajikan spot selam tepi pantai Sombu, perjumpaan lumba-lumba liar di Tanjung Kapota, dan perkampungan terapung Suku Bajo Mola.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    coralCount: '280+ Varietas Karang',
    diveSites: 24,
    highlights: ['Sombu Dive Pier', 'Kampung Bajo Mola', 'Benteng Liya Togo', 'Dolphin Watch Kapota'],
    character: 'Akses Utama & Interaksi Budaya'
  },
  {
    id: 'kaledupa',
    code: 'KA',
    name: 'Kaledupa',
    title: 'Keheningan Mistis & Pulau Hoga',
    tagline: 'Lumbung penelitian terumbu karang dunia berpasir putih selembut tepung.',
    description: 'Kaledupa memancarkan aura ketenangan dengan hutan mangrove alami terluas di Wakatobi. Tepat di depannya terhampar Pulau Hoga, surga kecil tanpa kendaraan bermotor yang menjadi pusat riset biologi kelautan internasional (Operation Wallacea) selama puluhan tahun.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
    coralCount: '320+ Varietas Karang',
    diveSites: 18,
    highlights: ['Pulau Hoga', 'Danau Sombano (Udang Merah)', 'Hutan Mangrove Kaledupa', 'Tari Tradisional Lariangi'],
    character: 'Ekowisata & Riset Biodiversitas'
  },
  {
    id: 'tomia',
    code: 'TO',
    name: 'Tomia',
    title: 'Episentrum Penyelaman Dunia',
    tagline: 'Surga karang atol terbaik dengan panorama perbukitan savana spektakuler.',
    description: 'Tomia diakui penyelam internasional sebagai salah satu tempat dengan terumbu karang tersehat dan terpadat di bumi. Dihiasi titik selam legendaris seperti Mari Mabuk, Roma, dan Pinnacle, serta bentang lanskap Puncak Kahianga yang memesona saat matahari terbenam.',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
    coralCount: '450+ Varietas Karang',
    diveSites: 35,
    highlights: ['Karang Mari Mabuk', 'Roma Dive Reef', 'Puncak Kahianga', 'Desa Wisata Kulati'],
    character: 'World-Class Reef & Sunset Vista'
  },
  {
    id: 'binongko',
    code: 'BI',
    name: 'Binongko',
    title: 'Benteng Karang Purba & Pandai Besi',
    tagline: 'Pulau pembuat bilah baja pusaka di tepi tebing atol terdalam nusantara.',
    description: 'Pulau paling ujung selatan yang historis dengan tradisi pandai besi tempa tangan turun-temurun sejak era Kesultanan Buton. Karang tepi tebing curamnya menawarkan pengalaman wall diving spektakuler dengan jarak pandang air laut sebening kristal.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    coralCount: '310+ Varietas Karang',
    diveSites: 17,
    highlights: ['Bengkel Pandai Besi Tradisional', 'Pantai Yawa', 'Tebing Fatu Atu', 'Batu Karang Purba We’e'],
    character: 'Warisan Kriya Besi & Wall Diving'
  }
];

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: 'taman-nasional-wakatobi',
    name: 'Taman Nasional Wakatobi',
    subtitle: 'The Heart of Coral Triangle',
    island: 'Taman Nasional',
    category: 'diving',
    shortDesc: 'Kawasan konservasi laut seluas 1,39 juta hektar dengan keanekaragaman 750 spesies terumbu karang hidup.',
    fullDesc: 'Taman Nasional Wakatobi adalah cagar biosfer dunia yang ditetapkan oleh UNESCO pada tahun 2012. Merupakan jantung dari Segitiga Terumbu Karang Dunia (Coral Triangle) dengan formasi atol terpanjang di dunia tanpa celah. Memiliki 942 jenis ikan karang dan beragam biota laut eksotis termasuk penyu sisik, ikan pari manta, kima raksasa, dan lumba-lumba spinner.',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.95,
    reviewsCount: 384,
    diveLevel: 'Semua Tingkatan',
    depthRange: '3 - 40 meter',
    visibility: '30 - 40 meter',
    currentType: 'Ringan hingga Sedang',
    coordinates: '5°19\'0" S, 123°36\'0" E',
    estimatedPrice: 650000,
    suggestedDuration: 'Seharian Penuh (1 - 3 Hari)',
    bestTimeToVisit: 'April - Desember (Musim Tenang)',
    highlightTags: ['UNESCO Biosphere', '750 Spesies Karang', 'Penyu Sisik', 'Manta Ray'],
    facilities: ['Kapal Dive Boat Berlisensi', 'Pemandu Divemaster Lokal', 'Peralatan SCUBA Lengkap', 'Makan Siang di Kapal'],
    rundown: [
      { title: '08:00 - Morning Departure', description: 'Briefing konservasi dan pelayaran menuju titik terumbu karang terluar.' },
      { title: '09:30 - First Dive / Snorkel Session', description: 'Menjelajahi dinding karang curam dengan sea fan raksasa dan kawanan schooling fish.' },
      { title: '12:00 - Island Lunch & Rest', description: 'Istirahat makan siang bento khas Wakatobi di atas kapal atol tenang.' },
      { title: '14:00 - Second Dive Session', description: 'Menyusuri taman koral dangkal untuk melihat penyu sisik dan kima raksasa.' }
    ]
  },
  {
    id: 'pulau-hoga',
    name: 'Pulau Hoga Kaledupa',
    subtitle: 'Pure Serenity & Marine Research Haven',
    island: 'Kaledupa',
    category: 'island_hopping',
    shortDesc: 'Pulau berpasir putih sehalus sutra tanpa kendaraan bermotor, pusat riset terumbu karang dunia.',
    fullDesc: 'Pulau Hoga adalah permata tersembunyi di timur Kaledupa. Bebas dari kebisingan kendaraan bermotor dan polusi cahaya malam. Pulau ini memiliki pohon cemara laut rindang, pasir putih pantai yang sangat lembut, dan terumbu karang yang bisa langsung dijangkau beberapa meter dari bibir pantai. Menjadi markas penelitian organisasi biologi kelautan internasional Operation Wallacea.',
    heroImage: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.92,
    reviewsCount: 265,
    diveLevel: 'Pemula / Snorkel',
    depthRange: '1 - 25 meter',
    visibility: '25 - 35 meter',
    currentType: 'Sangat Tenang',
    coordinates: '5°28\'12" S, 123°45\'20" E',
    estimatedPrice: 350000,
    suggestedDuration: '1 - 2 Hari Menginap',
    bestTimeToVisit: 'Maret - November',
    highlightTags: ['Pasir Putih Bedak', 'Bebas Polusi', 'House Reef Snorkel', 'Sunset Syahdu'],
    facilities: ['Cottage Kayu Tradisional', 'Warung Kelapa Segar', 'Penyewaan Kano & Fin', 'Spot Hammock Tepi Laut'],
    rundown: [
      { title: '09:00 - Penyeberangan Tradisional', description: 'Menyeberang dengan perahu bodi batang kayu dari pelabuhan Kaledupa (15 menit).' },
      { title: '10:30 - Beach Walk & House Reef Snorkeling', description: 'Snorkeling langsung di terumbu karang warna-warni yang berjarak 10 meter dari pantai.' },
      { title: '13:00 - Kelapa Muda & Kuliner Ikan Bakar', description: 'Menikmati kuliner pesisir segar dengan sambal dabu-dabu dan kasuami.' },
      { title: '17:30 - Golden Sunset Hoga', description: 'Menyaksikan langit keemasan tanpa hambatan gedung atau polusi cahaya.' }
    ]
  },
  {
    id: 'karang-mari-mabuk',
    name: 'Karang Mari Mabuk Tomia',
    subtitle: 'The Pinnacle of World Wall Diving',
    island: 'Tomia',
    category: 'diving',
    shortDesc: 'Spot selam spektakuler dengan drop-off dramatis, sea fan berukuran raksasa, dan pygmy seahorse.',
    fullDesc: 'Dinamakan "Mari Mabuk" bukan karena minuman, melainkan karena penyelam dibuat mabuk kepayang oleh kerapatan koral lunak (soft corals), kipas laut (gorgonian fan) berdiameter hingga 3 meter, dan keanekaragaman ikan tropis yang berenang tanpa jeda. Dinding karang (vertical wall) ini turun dari kedalaman 5 meter hingga jurang biru lebih dari 40 meter.',
    heroImage: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.98,
    reviewsCount: 412,
    diveLevel: 'Open Water',
    depthRange: '5 - 35 meter',
    visibility: '30 - 45 meter',
    currentType: 'Arus Drifting Ringan',
    coordinates: '5°45\'30" S, 123°55\'10" E',
    estimatedPrice: 750000,
    suggestedDuration: 'Setengah Hari (2 Dives)',
    bestTimeToVisit: 'Sepanjang Tahun (Puncak: Sept - Des)',
    highlightTags: ['Wall Diving', 'Giant Sea Fan', 'Pygmy Seahorse', 'Drift Dive'],
    facilities: ['Dive Guide PADI/SSI', 'Tank & Weight', 'Nitrox Tersedia', 'Safety Buoy & Radio'],
    rundown: [
      { title: '07:30 - Speedboat ke Spot Tomia', description: 'Meluncur di atas perairan toska jernih menuju atol lepas pantai Tomia.' },
      { title: '08:30 - Dive 1: The Wall & Gorgonian', description: 'Drift diving mengikuti arus lembut di sepanjang dinding karang purba.' },
      { title: '11:00 - Surface Interval', description: 'Teh jahe hangat, pisang goreng, dan sharing logbook penyelaman.' },
      { title: '12:30 - Dive 2: Coral Garden Plateau', description: 'Eksplorasi puncak terumbu karang dangkal penuh kima raksasa dan anemon clownfish.' }
    ]
  },
  {
    id: 'kampung-bajo-mola',
    name: 'Kampung Bajo Mola',
    subtitle: 'Living on the Coral Reef',
    island: 'Wangi-Wangi',
    category: 'culture',
    shortDesc: 'Permukiman suku laut (Sea Nomads) legendaris yang hidup berbaur dengan samudera di atas tiang pancang karang.',
    fullDesc: 'Kampung Bajo Mola adalah pemukiman Suku Bajo terbesar di Wakatobi. Seluruh rumah didirikan di atas karang laut tanpa menyentuh daratan pulau. Generasi pelaut ulung ini memiliki tradisi maritim yang mendalam, keahlian menyelam bebas (free diving) tanpa alat bantu hingga puluhan meter, serta bahasa dan kearifan ekologi laut yang telah diwariskan berabad-abad lamanya.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.88,
    reviewsCount: 198,
    diveLevel: 'Semua Tingkatan',
    depthRange: '0 - 5 meter',
    coordinates: '5°20\'18" S, 123°33\'50" E',
    estimatedPrice: 200000,
    suggestedDuration: '3 - 4 Jam',
    bestTimeToVisit: 'Sore Hari (15:00 - 18:00)',
    highlightTags: ['Suku Laut Bajo', 'Kearifan Lokal', 'Kano Tradisional', 'Sunset di Kanal'],
    facilities: ['Pemandu Lokal Warga Bajo', 'Kano Kayu Tradisional', 'Sentra Kerajinan Laut', 'Icip Kuliner Kasuami'],
    rundown: [
      { title: '15:00 - Menyusuri Lorong Kanal Air', description: 'Naik kano kayu di antara lorong jembatan rumah panggung terapung.' },
      { title: '16:00 - Kisah Kearifan Laut & Free Diving', description: 'Dialog dengan tetua suku Bajo mengenai kosmologi laut dan teknik navigasi bintang.' },
      { title: '17:15 - Melihat Anak-Anak Bajo Berenang Bebas', description: 'Menyaksikan anak-anak lincah menyelam dan perahu kano pulang melaut saat senja.' }
    ]
  },
  {
    id: 'puncak-kahianga',
    name: 'Puncak Kahianga & Savana Tomia',
    subtitle: 'Golden Sunset Above the Atoll',
    island: 'Tomia',
    category: 'eco_nature',
    shortDesc: 'Puncak bukit savana hijau dengan lanskap 360 derajat menghadap gugusan pulau dan atol karang Wakatobi.',
    fullDesc: 'Puncak Kahianga adalah dataran tinggi di Pulau Tomia yang menyajikan salah satu lanskap matahari terbenam paling magis di nusantara. Dari puncaknya, Anda dapat melihat garis batas terumbu karang (barrier reef) yang melingkari pulau serta warna gradasi laut dari toska muda hingga biru tua kobalt yang menakjubkan.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.94,
    reviewsCount: 310,
    coordinates: '5°43\'15" S, 123°56\'22" E',
    estimatedPrice: 50000,
    suggestedDuration: '2 - 3 Jam (Saat Senja)',
    bestTimeToVisit: '16:30 - 18:30 WITA',
    highlightTags: ['Sunset Spektakuler', 'Savana Rumput', '360 View Atol', 'Fotografi Lanskap'],
    facilities: ['Gazebo Sunset', 'Area Parkir Motor & Mobil', 'Spot Foto Panorama', 'Warung Kopi Hangat'],
    rundown: [
      { title: '16:00 - Perjalanan dari Pusat Desa Tomia', description: 'Menyusuri jalan aspal mulus melewati perkebunan kelapa dan bebatuan kapur.' },
      { title: '16:45 - Tiba di Puncak Kahianga', description: 'Menikmati angin laut sepoi-sepoi dan panorama kontur perbukitan savana.' },
      { title: '17:45 - Sunset Viewing', description: 'Cahaya emas lembayung memantul di hamparan karang tepi laut Wakatobi.' }
    ]
  },
  {
    id: 'sombu-dive-pier',
    name: 'Sombu Dive & Tanjung Wangi-Wangi',
    subtitle: 'Accessible World-Class House Reef',
    island: 'Wangi-Wangi',
    category: 'diving',
    shortDesc: 'Dermaga laut ikonik dengan terumbu karang sehat tepat di ujung jembatan, rumah bagi penyu dan barracuda.',
    fullDesc: 'Dermaga Sombu merupakan ikon penyelaman tepi pantai di Wangi-Wangi. Cukup melangkah turun dari tangga dermaga beton, penyelam langsung dihadapkan pada dinding karang vertikal yang dipenuhi anemon, schooling trevally, kura-kura laut, dan koral meja berukuran raksasa. Tempat favorit fotografer underwater untuk macro dive maupun wide angle.',
    heroImage: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.89,
    reviewsCount: 228,
    diveLevel: 'Semua Tingkatan',
    depthRange: '3 - 30 meter',
    visibility: '25 - 35 meter',
    currentType: 'Tenang',
    coordinates: '5°17\'40" S, 123°31\'15" E',
    estimatedPrice: 400000,
    suggestedDuration: 'Setengah Hari',
    bestTimeToVisit: 'Pagi Hari (08:00 - 11:00)',
    highlightTags: ['Shore Dive Mudah', 'Dermaga Ikonik', 'Turtle Spot', 'Macro Photography'],
    facilities: ['Tangga Akses Air Nyaman', 'Gazebo Istirahat', 'Kamar Bilas Air Tawar', 'Kafe Santai Tepi Dermaga'],
    rundown: [
      { title: '08:30 - Briefing & Gear Up', description: 'Persiapan peralatan selam di area dermaga beratap teduh.' },
      { title: '09:00 - Giant Stride Entry', description: 'Turun ke air jernih dan menyusuri kontur karang di bawah dermaga.' },
      { title: '10:30 - Bilas Air Tawar & Kuliner Khas', description: 'Menikmati kelapa muda dan kue karasi di gazebo tepi laut.' }
    ]
  },
  {
    id: 'benteng-liya-togo',
    name: 'Benteng Keraton Liya Togo',
    subtitle: 'The 16th Century Royal Fortress',
    island: 'Wangi-Wangi',
    category: 'culture',
    shortDesc: 'Benteng batu karang peninggalan Kesultanan Buton abad ke-16 dengan masjid kuno bersejarah.',
    fullDesc: 'Terletak di perbukitan Liya Togo, benteng seluas puluhan hektar ini disusun dari batu karang tanpa semen menggunakan perekat putih telur dan kapur sirih. Di dalamnya berdiri Masjid Tua Mubarok yang berusia lebih dari 400 tahun dan makam para panglima perang Buton. Tempat sakral digelarnya upacara adat Karia dan tarian perang tradisional Honari Mosega.',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.85,
    reviewsCount: 142,
    coordinates: '5°23\'48" S, 123°35\'12" E',
    estimatedPrice: 35000,
    suggestedDuration: '2 Jam',
    bestTimeToVisit: 'Pagi atau Sore Hari',
    highlightTags: ['Sejarah Kesultanan', 'Benteng Batu Karang', 'Masjid 400 Tahun', 'Tenun Asli Liya'],
    facilities: ['Pemandu Budaya Adat', 'Penyewaan Sarung Tenun', 'Galeri Tenun Tradisional', 'Balai Pertemuan Adat'],
    rundown: [
      { title: '09:00 - Memasuki Gerbang Lawa', description: 'Menapaki gerbang benteng kuno berpahat ukiran maritim Buton kuno.' },
      { title: '09:45 - Mengunjungi Masjid Mubarok', description: 'Mengamati tiang kayu ulin penyangga masjid berusia ratusan tahun.' },
      { title: '10:30 - Bertemu Pengrajin Tenun', description: 'Melihat ibu-ibu menenun motif khas Wakatobi dengan alat tenun gedogan.' }
    ]
  },
  {
    id: 'binongko-blacksmith-reef',
    name: 'Sentra Pandai Besi & Tebing Binongko',
    subtitle: 'The Legend of Iron Craftsmen',
    island: 'Binongko',
    category: 'culture',
    shortDesc: 'Warisan pandai besi tertua di timur nusantara yang menempa baja di bibir tebing karang samudra.',
    fullDesc: 'Binongko adalah pulau yang memberi nama gugusan kepulauan ini sebagai "Tukang Besi Eilanden" di peta kolonial Belanda. Denting palu pandai besi masih berkobar setiap hari dari bengkel-bengkel tradisional yang menggunakan arang tempurung kelapa. Hasil tempaan parang dan bilah baja Binongko termasyhur akan ketajaman dan kekuatannya di seantero kawasan Indonesia Timur.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.87,
    reviewsCount: 116,
    coordinates: '5°55\'0" S, 124°0\'0" E',
    estimatedPrice: 75000,
    suggestedDuration: 'Seharian',
    bestTimeToVisit: 'Pagi Hari (Melihat Proses Tempa)',
    highlightTags: ['Pandai Besi Kuno', 'Tebing Karang Fatu Boga', 'Pantai Yawa', 'Kriya Nusantara'],
    facilities: ['Pemandu Tradisi', 'Showroom Produk Bilah Besi', 'Spot Foto Tebing Laut'],
    rundown: [
      { title: '08:30 - Kunjungan Bengkel Tempa Tradisional', description: 'Menyaksikan proses peleburan baja dan penempaan parang pusaka.' },
      { title: '11:00 - Menjelajah Tebing Fatu Boga', description: 'Melihat tebing batu karang hitam purba yang berbatasan langsung dengan laut dalam Banda.' },
      { title: '14:00 - Santai di Pantai Pasir Putih Yawa', description: 'Menikmati suasana pantai eksotis yang sangat hening dan alami.' }
    ]
  }
];

export const TRIP_CATALOGUE: TripPackage[] = [
  {
    id: 'wakatobi-dive-safari-4d3n',
    title: 'Wakatobi Grand Coral Dive Safari',
    slug: 'grand-coral-dive-safari',
    islandFocus: 'Tomia & Wangi-Wangi',
    duration: '4 Hari 3 Malam',
    badge: 'Paling Populer',
    price: 5850000,
    originalPrice: 6500000,
    rating: 4.96,
    reviewCount: 148,
    groupType: 'Dive Safari',
    maxPax: 8,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Petualangan menyelam kelas dunia melintasi 9 spot legendaris termasuk Karang Mari Mabuk dan Sombu.',
    overview: 'Paket eksklusif penyelaman dirancang khusus untuk para penyelam berlisensi (Open Water ke atas). Menikmati 9 log dive terbaik di jantung Cagar Biosfer UNESCO Wakatobi dengan kapal diving khusus berstandar internasional, perlengkapan tangki & weight lengkap, serta bimbingan Divemaster lokal berpengalaman.',
    inclusions: [
      '9x Penyelaman Berpemandu (Termasuk Boat Dive & Night Dive)',
      'Akomodasi 3 Malam di Resort Tepi Pantai Tomia & Wangi-Wangi',
      'Makan Lengkap 3x Sehari & Refreshment di Kapal',
      'Tiket Masuk Konservasi Taman Nasional Wakatobi',
      'Antar Jemput Bandara Matahora (WNI) & Speedboat Antarpulau',
      'Asuransi Penyelaman Lokal & Logbook Validation'
    ],
    highlights: [
      'Mari Mabuk Wall Dive & Gorgonian Giant Sea Fan',
      'Sombu Pier Shark & Turtle Point',
      'Sunset Viewing di Puncak Kahianga Tomia',
      'Night Dive melihat Spanish Dancer & Mandarin Fish'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kedatangan di Wangi-Wangi - Check Dive Sombu',
        activities: [
          'Penjemputan di Bandara Matahora (WNI) Wangi-Wangi oleh tim kami',
          'Check-in resort dan pengenalan tim divemaster serta briefing keselamatan',
          'Check dive santai di Sombu Pier (Kedalaman 12-18 meter)',
          'Makan malam seafood bakar khas Wakatobi'
        ]
      },
      {
        day: 2,
        title: 'Speedboat ke Tomia - Eksplorasi Reef Mari Mabuk & Roma',
        activities: [
          'Sarapan pagi dan transfer speedboat khusus menuju Pulau Tomia',
          'Dive 1: Karang Mari Mabuk (Wall drop-off spektakuler)',
          'Makan siang di kapal di perairan tenang atol Tomia',
          'Dive 2: Roma Reef (Pinnacle karang lunak warna-warni)',
          'Sore hari menikmati sunset di savana Puncak Kahianga'
        ]
      },
      {
        day: 3,
        title: 'Tomia Coral Garden & Night Dive',
        activities: [
          'Dive 3: Ali Reef (Arus sepoi-sepoi dengan kawanan schooling barakuda)',
          'Dive 4: Table Coral Garden (Terumbu karang meja raksasa)',
          'Sunset relax di Desa Kulati',
          'Night Dive opsional: Berburu biota nokturnal & bio-luminescence'
        ]
      },
      {
        day: 4,
        title: 'Budaya Bajo Mola & Kepulangan',
        activities: [
          'Kembali ke Wangi-Wangi via speedboat pagi',
          'Kunjungan budaya ke Kampung Terapung Bajo Mola',
          'Belanja oleh-oleh tenun Wakatobi & Kasuami',
          'Pengantaran ke Bandara Matahora untuk penerbangan kembali'
        ]
      }
    ]
  },
  {
    id: 'island-hopping-hoga-kaledupa-3d2n',
    title: 'Surga Pasir Putih & Eksplorasi Pulau Hoga',
    slug: 'surga-pasir-putih-hoga',
    islandFocus: 'Kaledupa & Hoga',
    duration: '3 Hari 2 Malam',
    badge: 'Eco & Leisure',
    price: 3450000,
    originalPrice: 3900000,
    rating: 4.92,
    reviewCount: 96,
    groupType: 'Open Trip',
    maxPax: 12,
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Menikmati keheningan pulau tanpa kendaraan, pasir putih sehalus bedak, dan snorkeling karang dangkal.',
    overview: 'Pilihan sempurna untuk pasangan, keluarga, dan pecinta ketenangan alam yang ingin melepaskan penat dari hiruk pikuk kota besar. Tinggal di cottage kayu alami tepi pantai Pulau Hoga, berenang di air laut sejernih akuarium, dan menyusuri hutan mangrove misterius Kaledupa.',
    inclusions: [
      'Akomodasi 2 Malam di Wooden Eco-Cottage Pulau Hoga',
      'Boat Khusus Island Hopping Hoga - Kaledupa - Wangi-Wangi',
      'Peralatan Snorkeling Lengkap (Mask, Snorkel, Fin)',
      'Makan 3x Sehari menu lokal segar (Ikan bakar, sayur kelor, kasuami)',
      'Pemandu Lokal Wisata Ramah Lingkungan',
      'Kunjungan Danau Sombano & Hutan Mangrove Kaledupa'
    ],
    highlights: [
      'House reef snorkeling 10 meter dari bibir pantai Hoga',
      'Mengamati udang merah endemik di Danau Sombano',
      'Makan malam di bawah taburan jutaan bintang (Milky Way)',
      'Sunrise yoga & jalan santai di pasir putih selembut tepung'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Tiba di Wangi-Wangi - Berlayar ke Pulau Hoga',
        activities: [
          'Penjemputan di Wangi-Wangi dan menuju dermaga penyeberangan',
          'Berlayar melintasi selat tenang menuju Pulau Hoga (1,5 jam)',
          'Check-in cottage kayu di tepi pantai berpasir putih',
          'Snorkeling sesi sore di taman karang dangkal depan cottage',
          'Makan malam seafood di bawah gemerlap bintang'
        ]
      },
      {
        day: 2,
        title: 'Jelajah Kaledupa: Mangrove & Danau Sombano',
        activities: [
          'Sarapan santai dengan kelapa muda segar',
          'Menyeberang ke Pulau Kaledupa naik perahu kano kayu',
          'Eksplorasi jembatan kayu hutan mangrove alami terpanjang',
          'Kunjungan ke Danau Sombano untuk melihat udang merah unik',
          'Sore hari kembali ke Hoga untuk menikmati golden hour sunset'
        ]
      },
      {
        day: 3,
        title: 'Sunrise Magic & Kembali ke Wangi-Wangi',
        activities: [
          'Jalan pagi di bibir pantai menikmati udara murni tanpa polusi',
          'Snorkeling sesi terakhir menyapa ikan badut (clownfish)',
          'Pelayaran kembali ke Wangi-Wangi dan drop ke bandara'
        ]
      }
    ]
  },
  {
    id: 'wakatobi-heritage-culture-trip-3d2n',
    title: 'Jejak Maritim Suku Bajo & Kesultanan Buton',
    slug: 'wakatobi-heritage-culture',
    islandFocus: 'Wangi-Wangi & Liya',
    duration: '3 Hari 2 Malam',
    badge: 'Budaya & Heritage',
    price: 2850000,
    rating: 4.89,
    reviewCount: 64,
    groupType: 'Private Charter',
    maxPax: 10,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Menyelami filosofi manusia perahu Suku Bajo Mola dan kemegahan benteng karang kuno Kesultanan Buton.',
    overview: 'Trip edukatif dan kultural berbobot tinggi yang memadukan keindahan bahari dengan sejarah kerajaan maritim Buton. Bersua langsung dengan tetua Suku Bajo Mola, merasakan naik perahu dayung tradisional di kanal laut, serta memakai busana tenun adat Liya Togo di benteng bersejarah.',
    inclusions: [
      'Akomodasi 2 Malam di Hotel Berbintang Wangi-Wangi',
      'Transportasi Darat Ber-AC Selama Tour',
      'Pemandu Budaya & Sejarah Asli Daerah',
      'Donasi Budaya Desa Adat Liya & Komunitas Bajo',
      'Sewa Baju Adat Tenun Wakatobi untuk Sesi Foto',
      'Kuliner Tradisional Lengkap (Kasuami, Karasi, Parende)'
    ],
    highlights: [
      'Menyusuri kanal pemukiman terapung Suku Bajo Mola',
      'Melihat benteng karang 400 tahun Benteng Liya Togo',
      'Belajar menenun motif asli Wakatobi langsung dari maestronya',
      'Atraksi lumba-lumba liar di pagi hari di perairan Kapota'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Dolphin Watching Pagi & Kampung Bajo Mola',
        activities: [
          'Berangkat subuh dengan kapal cadik berburu lumba-lumba di Tanjung Kapota',
          'Sarapan bubur ikan tradisional di pelabuhan',
          'Kunjungan mendalam ke pemukiman Suku Bajo Mola',
          'Melihat demo pembuatan kasuami dari parutan ubi kayu'
        ]
      },
      {
        day: 2,
        title: 'Benteng Karang Liya Togo & Sentra Tenun',
        activities: [
          'Menuju Benteng Keraton Liya Togo peninggalan abad ke-16',
          'Berdoa di Masjid Mubarok yang bersejarah',
          'Workshop singkat menenun tenun khas Liya',
          'Makan siang kuliner sup ikan parende berkuah segar belimbing wuluh',
          'Sunset di Pantai Cemara Wangi-Wangi'
        ]
      },
      {
        day: 3,
        title: 'Pemandian Goa Kontamale & Kepulangan',
        activities: [
          'Berenang di goa mata air tawar bening kebiruan Kontamale',
          'Belanja suvenir kerajinan mutiara dan kerupuk ikan',
          'Drop bandara Matahora'
        ]
      }
    ]
  },
  {
    id: 'ultimate-4-islands-expedition-5d4n',
    title: 'Ekspedisi Penjelajah 4 Pulau (Wa-Ka-To-Bi)',
    slug: 'ultimate-4-islands-expedition',
    islandFocus: '4 Pulau Lengkap',
    duration: '5 Hari 4 Malam',
    badge: 'Petualangan Penuh',
    price: 7650000,
    originalPrice: 8500000,
    rating: 4.98,
    reviewCount: 112,
    groupType: 'Private Charter',
    maxPax: 8,
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Jelajahi keunikan keempat pulau legendaris Wakatobi dalam satu rangkaian perjalanan tak terlupakan.',
    overview: 'Paket terlengkap dari ujung barat hingga timur Kabupaten Wakatobi: Wangi-Wangi, Kaledupa, Tomia, dan Binongko. Rasakan perpaduan antara terumbu karang kelas dunia, hutan mangrove purba, bukit savana Tomia, hingga denting kriya pandai besi tertua di Binongko.',
    inclusions: [
      'Private Speedboat Eksklusif Antar 4 Pulau',
      '4 Malam Akomodasi Terbaik di Wangi-Wangi, Hoga, dan Tomia',
      'Paket Snorkeling / Fun Dive di 6 Titik Terpilih',
      'Tiket Konservasi & Izin Adat Semua Pulau',
      'Seluruh Makanan & Minuman Standar Premium',
      'Dokumentasi Foto & Video Drone Underwater Profesional'
    ],
    highlights: [
      'Mendatangi keempat pulau utama Wakatobi secara menyeluruh',
      'Snorkeling bersama penyu di Sombu & wall diving di Mari Mabuk',
      'Menyaksikan sunset Tomia di atas savana Puncak Kahianga',
      'Bertemu empu pandai besi tradisional tertua di Binongko'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Hari 1: Eksplorasi Wangi-Wangi & Sombu Pier',
        activities: ['Penjemputan bandara, check-in, dive/snorkeling di Sombu, sunset di dermaga.']
      },
      {
        day: 2,
        title: 'Hari 2: Menuju Kaledupa & Relaksasi Pulau Hoga',
        activities: ['Speedboat ke Kaledupa, jelajah mangrove, dan bermalam di Pulau Hoga yang tenang.']
      },
      {
        day: 3,
        title: 'Hari 3: Menuju Episentrum Selam Tomia & Puncak Kahianga',
        activities: ['Pelayaran ke Tomia, snorkeling di Roma Reef, sunset 360 derajat di Puncak Kahianga.']
      },
      {
        day: 4,
        title: 'Hari 4: Ekspedisi Ujung Karang & Pandai Besi Binongko',
        activities: ['Speedboat ke Binongko, melihat kriya tempa besi kuno, snorkeling di tebing karang purba.']
      },
      {
        day: 5,
        title: 'Hari 5: Kembali ke Wangi-Wangi & Perpisahan',
        activities: ['Speedboat kembali ke Wangi-Wangi, belanja oleh-oleh khas, dan pengantaran bandara.']
      }
    ]
  }
];

export const WHY_WAKATOBI_POINTS = [
  {
    number: '01',
    title: 'Ibu Kota Karang Dunia (Coral Capital)',
    desc: 'Memiliki 750 dari 850 spesies karang di seluruh dunia, menjadikannya salah satu kawasan laut dengan biodiversitas terpadat di bumi.'
  },
  {
    number: '02',
    title: 'Cagar Biosfer Dunia UNESCO',
    desc: 'Ditetapkan secara resmi oleh UNESCO sejak 2012, melindungi 1,39 juta hektar ekosistem laut, laguna atol, dan hutan bakau alami.'
  },
  {
    number: '03',
    title: 'Visibilitas Bawah Laut Spektakuler',
    desc: 'Jarak pandang air laut mencapai 25 hingga 40 meter dengan suhu air hangat konstan 27°C - 30°C sepanjang tahun.'
  },
  {
    number: '04',
    title: 'Kearifan Maritim Manusia Perahu Bajo',
    desc: 'Interaksi otentik dengan suku pengembara laut yang hidup rukun di atas karang selama ratusan generasi dengan kearifan konservasi alam.'
  },
  {
    number: '05',
    title: 'Gugusan 4 Pulau Eksotis Unik',
    desc: 'Akronim W-K-T-B mewakili Wangi-Wangi, Kaledupa, Tomia, dan Binongko yang masing-masing menyimpan karakter geografis dan pesona berbeda.'
  },
  {
    number: '06',
    title: 'Ketenangan Tanpa Hiruk Pikuk',
    desc: 'Destinasi yang masih sangat murni, jauh dari komersialisasi massal, dengan pantai pasir putih syahdu dan langit malam bertabur bintang.'
  }
];

export const LIVE_DIVE_CONDITIONS = {
  waterTemp: '28°C / 82°F',
  visibility: '30 - 40 Meter',
  surfaceCondition: 'Tenang & Bersahabat',
  bestDivingSeason: 'Maret - Desember',
  coralSpeciesCount: '750+ Jenis Karang',
  fishSpeciesCount: '942+ Jenis Ikan Karang',
  lastUpdated: 'Diperbarui Hari Ini (08:00 WITA)'
};
