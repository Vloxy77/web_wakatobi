import { BookingRecord } from '../types/wakatobi';

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'WKT-74829',
    travelerName: 'Bima Satria Nugraha',
    email: 'bima.satria@gmail.com',
    phone: '+62 812-9843-1120',
    tripPackageId: 'wakatobi-dive-safari-4d3n',
    tripPackageTitle: 'Wakatobi Grand Coral Dive Safari',
    departureDate: '2026-11-05',
    guestCount: 2,
    pricePerPax: 5850000,
    totalPrice: 11700000,
    status: 'Terkonfirmasi',
    createdAt: '2026-10-15T09:30:00Z',
    notes: 'Kebutuhan sewa wet suit ukuran L dan M, membawa kamera underwater sendiri.'
  },
  {
    id: 'WKT-63910',
    travelerName: 'dr. Sarah Amanda',
    email: 'sarah.amanda@fk-ui.ac.id',
    phone: '+62 813-7722-9011',
    tripPackageId: 'island-hopping-hoga-kaledupa-3d2n',
    tripPackageTitle: 'Surga Pasir Putih & Eksplorasi Pulau Hoga',
    departureDate: '2026-11-12',
    guestCount: 4,
    pricePerPax: 3450000,
    totalPrice: 13800000,
    status: 'Menunggu Konfirmasi',
    createdAt: '2026-10-16T14:15:00Z',
    notes: 'Keluarga dengan 2 anak remaja. Memerlukan kamar cottage bersebelahan di tepi pantai Hoga.'
  },
  {
    id: 'WKT-51204',
    travelerName: 'Rendra Prasetyo',
    email: 'rendra.lens@gmail.com',
    phone: '+62 856-4310-8822',
    tripPackageId: 'wakatobi-heritage-culture-trip-3d2n',
    tripPackageTitle: 'Jejak Maritim Suku Bajo & Kesultanan Buton',
    departureDate: '2026-10-28',
    guestCount: 3,
    pricePerPax: 2850000,
    totalPrice: 8550000,
    status: 'Terkonfirmasi',
    createdAt: '2026-10-14T11:00:00Z',
    notes: 'Fokus fotografi budaya Bajo Mola dan video drone di Benteng Liya Togo.'
  },
  {
    id: 'WKT-42891',
    travelerName: 'Jessica Tanuwijaya',
    email: 'jess.tan@singapore-invest.sg',
    phone: '+65 9123-4567',
    tripPackageId: 'ultimate-4-islands-expedition-5d4n',
    tripPackageTitle: 'Ekspedisi Penjelajah 4 Pulau (Wa-Ka-To-Bi)',
    departureDate: '2026-11-20',
    guestCount: 2,
    pricePerPax: 7650000,
    totalPrice: 15300000,
    status: 'Menunggu Konfirmasi',
    createdAt: '2026-10-17T08:20:00Z',
    notes: 'Penjemputan private dari Bandara Matahora. Ingin diving guide berbahasa Inggris.'
  },
  {
    id: 'WKT-31902',
    travelerName: 'Fajar Maulana',
    email: 'fajar.m@pertamina.com',
    phone: '+62 821-5544-0199',
    tripPackageId: 'wakatobi-dive-safari-4d3n',
    tripPackageTitle: 'Wakatobi Grand Coral Dive Safari',
    departureDate: '2026-10-10',
    guestCount: 1,
    pricePerPax: 5850000,
    totalPrice: 5850000,
    status: 'Selesai',
    createdAt: '2026-10-02T16:45:00Z',
    notes: 'Perjalanan solo menyelam di Tomia Mari Mabuk dan Sombu. Ulasan bintang 5.'
  }
];
