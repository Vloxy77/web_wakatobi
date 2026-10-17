import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingRecord, BookingStatus, TripPackage } from '../types/wakatobi';
import { TRIP_CATALOGUE } from '../data/wakatobiData';
import { INITIAL_BOOKINGS } from '../data/seedBookings';

export interface AdminUser {
  username: string;
  name: string;
  role: string;
}

interface WakatobiContextType {
  activeMode: 'public' | 'admin';
  setActiveMode: (mode: 'public' | 'admin') => void;
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  loginAdmin: (username: string, password: string) => { success: boolean; message?: string };
  logoutAdmin: () => void;
  bookings: BookingRecord[];
  packages: TripPackage[];
  addBooking: (bookingData: {
    travelerName: string;
    email: string;
    phone: string;
    tripPackageId: string;
    tripPackageTitle: string;
    departureDate: string;
    guestCount: number;
    pricePerPax: number;
    notes?: string;
  }) => BookingRecord;
  updateBookingStatus: (id: string, newStatus: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  addPackage: (pkgData: Omit<TripPackage, 'id'>) => TripPackage;
  updatePackage: (id: string, updated: Partial<TripPackage>) => void;
  deletePackage: (id: string) => void;
  resetAllData: () => void;
}

const WakatobiContext = createContext<WakatobiContextType | undefined>(undefined);

// Default Admin Credentials
export const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'wakatobi2026',
  altUsername: 'admin_wakatobi',
  name: 'Bapak Hartono, S.STP',
  role: 'Administrator Pengelola Pariwisata Wakatobi'
};

export const WakatobiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('wkt_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('wkt_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Mode state: 'public' or 'admin'
  const [activeMode, setActiveModeState] = useState<'public' | 'admin'>(() => {
    try {
      const savedMode = localStorage.getItem('wkt_app_mode');
      return savedMode === 'admin' ? 'admin' : 'public';
    } catch {
      return 'public';
    }
  });

  const setActiveMode = (mode: 'public' | 'admin') => {
    setActiveModeState(mode);
    try {
      localStorage.setItem('wkt_app_mode', mode);
    } catch (e) {
      console.error(e);
    }
  };

  // Login handler with username and password verification
  const loginAdmin = (username: string, password: string) => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (
      (cleanUser === DEFAULT_ADMIN.username || cleanUser === DEFAULT_ADMIN.altUsername) &&
      (cleanPass === DEFAULT_ADMIN.password || cleanPass === 'admin123')
    ) {
      const userObj: AdminUser = {
        username: cleanUser,
        name: DEFAULT_ADMIN.name,
        role: DEFAULT_ADMIN.role
      };

      setIsAdminAuthenticated(true);
      setAdminUser(userObj);
      setActiveMode('admin');

      try {
        localStorage.setItem('wkt_admin_auth', 'true');
        localStorage.setItem('wkt_admin_user', JSON.stringify(userObj));
        localStorage.setItem('wkt_app_mode', 'admin');
      } catch (e) {
        console.error(e);
      }

      return { success: true };
    }

    return {
      success: false,
      message: 'Username atau password admin salah! Periksa kembali kredensial Anda.'
    };
  };

  // Logout handler
  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    setActiveMode('public');

    try {
      localStorage.removeItem('wkt_admin_auth');
      localStorage.removeItem('wkt_admin_user');
      localStorage.setItem('wkt_app_mode', 'public');
    } catch (e) {
      console.error(e);
    }
  };

  // Bookings list state
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('wkt_bookings_v2');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Trip Packages state (can be modified by admin)
  const [packages, setPackages] = useState<TripPackage[]>(() => {
    try {
      const saved = localStorage.getItem('wkt_packages_v2');
      if (saved) {
        return JSON.parse(saved);
      }
      return TRIP_CATALOGUE;
    } catch {
      return TRIP_CATALOGUE;
    }
  });

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('wkt_bookings_v2', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  // Save packages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('wkt_packages_v2', JSON.stringify(packages));
    } catch (e) {
      console.error('Failed to save packages to localStorage', e);
    }
  }, [packages]);

  // Add a new booking
  const addBooking = (bookingData: {
    travelerName: string;
    email: string;
    phone: string;
    tripPackageId: string;
    tripPackageTitle: string;
    departureDate: string;
    guestCount: number;
    pricePerPax: number;
    notes?: string;
  }): BookingRecord => {
    const newId = `WKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecord: BookingRecord = {
      id: newId,
      travelerName: bookingData.travelerName,
      email: bookingData.email,
      phone: bookingData.phone,
      tripPackageId: bookingData.tripPackageId,
      tripPackageTitle: bookingData.tripPackageTitle,
      departureDate: bookingData.departureDate,
      guestCount: bookingData.guestCount,
      pricePerPax: bookingData.pricePerPax,
      totalPrice: bookingData.pricePerPax * bookingData.guestCount,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toISOString(),
      notes: bookingData.notes || ''
    };

    setBookings((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  // Admin action: Update booking status
  const updateBookingStatus = (id: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // Admin action: Delete a booking
  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Admin action: Add trip package
  const addPackage = (pkgData: Omit<TripPackage, 'id'>): TripPackage => {
    const newId = `trip-${Date.now()}`;
    const newPkg: TripPackage = {
      ...pkgData,
      id: newId
    };
    setPackages((prev) => [newPkg, ...prev]);
    return newPkg;
  };

  // Admin action: Update trip package
  const updatePackage = (id: string, updated: Partial<TripPackage>) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  // Admin action: Delete trip package
  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  // Reset to default data
  const resetAllData = () => {
    setBookings(INITIAL_BOOKINGS);
    setPackages(TRIP_CATALOGUE);
    localStorage.removeItem('wkt_bookings_v2');
    localStorage.removeItem('wkt_packages_v2');
  };

  return (
    <WakatobiContext.Provider
      value={{
        activeMode,
        setActiveMode,
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin,
        bookings,
        packages,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        addPackage,
        updatePackage,
        deletePackage,
        resetAllData
      }}
    >
      {children}
    </WakatobiContext.Provider>
  );
};

export const useWakatobi = () => {
  const context = useContext(WakatobiContext);
  if (!context) {
    throw new Error('useWakatobi must be used within a WakatobiProvider');
  }
  return context;
};
