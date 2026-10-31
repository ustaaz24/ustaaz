'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GirisPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successUser, setSuccessUser] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Qeydiyyatdan keçmiş istifadəçiləri yoxlayırıq
    const savedUsers = JSON.parse(localStorage.getItem('ustaaz_users') || '[]');
    
    // Nömrəni təmizləyib müqayisə edirik
    const user = savedUsers.find((u: any) => u.phone.trim() === phone.trim());

    if (!user) {
      setError('Bu telefon nömrəsi ilə qeydiyyat tapılmadı! Zəhmət olmasa əvvəlcə qeydiyyatdan keçin.');
      return;
    }

    if (user.password !== password) {
      setError('Daxil etdiyiniz şifrə yanlışdır!');
      return;
    }

    // Uğurlu giriş
    localStorage.setItem('ustaaz_current_user', JSON.stringify(user));
    setSuccessUser(user);

    setTimeout(() => {
      router.push('/ustalar');
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🔐</div>
          <h1 className="text-2xl font-black text-slate-900">Hesaba Daxil Ol</h1>
          <p className="text-xs text-slate-500 mt-1">
            Qeydiyyatdan keçdiyiniz telefon və şifrəniz
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        {successUser ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center">
            <h3 className="font-bold text-sm mb-1">Xoş gəldiniz, {successUser.name}! 👋</h3>
            <p className="text-xs text-slate-600">Sistemə uğurla daxil oldunuz. Yönləndirilirsiniz...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Telefon Nömrəniz *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Məs: 0501234567"
                className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Şifrəniz *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrənizi daxil edin"
                className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3.5 rounded-xl text-xs transition shadow"
            >
              Daxil Ol
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
          Hesabınız yoxdur?{' '}
          <Link href="/qeydiyyat" className="text-blue-600 font-bold hover:underline">
            İndi Qeydiyyatdan Keçin
          </Link>
        </div>
      </div>
    </div>
  );
}