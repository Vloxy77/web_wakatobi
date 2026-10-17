import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  KeyRound,
  Waves,
  AlertTriangle
} from 'lucide-react';
import { useWakatobi, DEFAULT_ADMIN } from '../../context/WakatobiContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const { loginAdmin } = useWakatobi();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);

      if (res.success) {
        setUsername('');
        setPassword('');
        if (onSuccessLogin) onSuccessLogin();
        onClose();
      } else {
        setErrorMessage(res.message || 'Username atau password salah!');
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setUsername(DEFAULT_ADMIN.username);
    setPassword(DEFAULT_ADMIN.password);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#070e1b] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 text-slate-100 animate-in fade-in zoom-in-95">
        
        {/* Top Header */}
        <div className="relative px-6 pt-7 pb-5 text-center border-b border-slate-800/80 bg-gradient-to-b from-cyan-950/40 via-slate-900 to-transparent">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-950">
            <Lock className="w-7 h-7 text-cyan-400" />
          </div>

          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Login Admin Wisata Wakatobi
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Akses portal khusus pengelola resmi untuk mengelola pemesanan & paket trip
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-in shake">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username Admin
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Masukkan username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password Admin
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan kata sandi admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 disabled:opacity-50 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Akses...</span>
                  </div>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Quick Demo Credentials Box */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kredensial Default Pengelola:</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
              >
                Isi Otomatis
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-500 block font-sans text-[10px]">Username:</span>
                <span className="text-cyan-300 font-bold">{DEFAULT_ADMIN.username}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-sans text-[10px]">Password:</span>
                <span className="text-cyan-300 font-bold">{DEFAULT_ADMIN.password}</span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Dilengkapi enkripsi sesi dan proteksi agar oknum pengunjung biasa tidak dapat mengakses data reservasi wisatawan.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
