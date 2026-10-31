'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORIES, CITIES, BAKI_DISTRICTS } from '@/lib/data';
import { TRANSLATIONS, Language } from '@/lib/translations';

// Daxili SVG İkonlar (Xətasız)
const CheckCircle = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Upload = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const User = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Briefcase = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const Eye = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

export default function QeydiyyatPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'customer' | 'usta'>(
    'customer'
  );
  const [lang, setLang] = useState<Language>('az');

  // Müştəri forması
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('+994 ');
  const [custCity, setCustCity] = useState('Bakı');
  const [custPass, setCustPass] = useState('');
  const [showCustPass, setShowCustPass] = useState(false);

  // Usta forması - Bütün Azərbaycan Şəhər və Rayonları (A-Z)
  const [ustaName, setUstaName] = useState('');
  const [ustaPhone, setUstaPhone] = useState('+994 ');
  const [ustaCity, setUstaCity] = useState('Bakı');
  const [ustaDistrict, setUstaDistrict] = useState(''); // Könüllü qəsəbə
  const [ustaCategory, setUstaCategory] = useState('Santexnik');
  const [ustaExperience, setUstaExperience] = useState('5');
  const [ustaPass, setUstaPass] = useState('');
  const [showUstaPass, setShowUstaPass] = useState(false);
  const [ustaAvatar, setUstaAvatar] = useState('');
  const [ustaDesc, setUstaDesc] = useState('');
  const [avatarError, setAvatarError] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [registeredRole, setRegisteredRole] = useState<'customer' | 'usta'>(
    'customer'
  );

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('app_lang') as Language;
      if (savedLang && ['az', 'ru', 'en'].includes(savedLang)) {
        setLang(savedLang);
      }
    } catch {}

    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };

    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.az;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUstaAvatar(reader.result as string);
        setAvatarError('');
      };
      reader.onerror = () => {
        setAvatarError(
          lang === 'ru'
            ? 'Ошибка при загрузке фото.'
            : lang === 'en'
            ? 'Error uploading image.'
            : 'Şəkil yüklənərkən xəta baş verdi.'
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim() || !custPass.trim()) return;

    const user = {
      name: custName.trim(),
      phone: custPhone.trim(),
      city: custCity,
      role: 'customer',
      isLoggedIn: true,
      password: custPass.trim(),
    };

    try {
      localStorage.setItem('current_user', JSON.stringify(user));
      const existing = localStorage.getItem('all_accounts');
      const list = existing ? JSON.parse(existing) : [];
      list.push(user);
      localStorage.setItem('all_accounts', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('authChange'));
    } catch {}

    setRegisteredRole('customer');
    setSubmitted(true);
  };

  const handleUstaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ustaAvatar.trim()) {
      setAvatarError(
        lang === 'ru'
          ? 'Фото профиля обязательно для мастера!'
          : lang === 'en'
          ? 'Profile photo is required for craftsman!'
          : 'Usta qeydiyyatı üçün profil şəkli mütləqdir!'
      );
      return;
    }

    if (!ustaCity.trim()) {
      setAvatarError(
        lang === 'ru'
          ? 'Пожалуйста, выберите город или район!'
          : lang === 'en'
          ? 'Please select your city or district!'
          : 'Zəhmət olmasa şəhər və ya rayonunuzu seçin!'
      );
      return;
    }
    setAvatarError('');

    if (!ustaName.trim() || !ustaPhone.trim() || !ustaPass.trim()) return;

    const newUstaId = 'usta_' + Date.now();
    const user = {
      id: newUstaId,
      name: ustaName.trim(),
      phone: ustaPhone.trim(),
      city: ustaCity,
      district: ustaCity === 'Bakı' ? ustaDistrict || 'Bütün Bakı' : '',
      category: ustaCategory,
      experience: Number(ustaExperience) || 5,
      avatar: ustaAvatar,
      description: ustaDesc.trim() || 'Peşəkar usta xidmətləri.',
      role: 'usta',
      status: 'active',
      isLoggedIn: true,
      verified: true,
      reviews: [],
      rating: 5.0,
      reviewCount: 1,
      password: ustaPass.trim(),
    };

    try {
      localStorage.setItem('current_user', JSON.stringify(user));
      const existingUstalar = localStorage.getItem('custom_ustalar');
      const ustaList = existingUstalar ? JSON.parse(existingUstalar) : [];
      ustaList.unshift(user);
      localStorage.setItem('custom_ustalar', JSON.stringify(ustaList));

      const existingAccounts = localStorage.getItem('all_accounts');
      const accList = existingAccounts ? JSON.parse(existingAccounts) : [];
      accList.push(user);
      localStorage.setItem('all_accounts', JSON.stringify(accList));

      window.dispatchEvent(new CustomEvent('authChange'));
    } catch {}

    setRegisteredRole('usta');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black">{t.reg_success_title}</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {registeredRole === 'usta'
              ? lang === 'ru'
                ? 'Профиль мастера успешно создан и активирован. Вы уже можете принимать заказы!'
                : lang === 'en'
                ? 'Craftsman profile successfully created and activated. You can now accept client requests!'
                : 'Usta profiliniz uğurla yaradıldı və təsdiqləndi. Artıq sifarişləri qəbul edə bilərsiniz!'
              : lang === 'ru'
              ? 'Ваш аккаунт клиента успешно активирован. Теперь вы можете связываться с мастерами напрямую!'
              : lang === 'en'
              ? 'Customer account successfully activated. You can now directly contact craftsmen!'
              : 'Müştəri hesabınız uğurla aktivləşdirildi. Artıq peşəkar ustalarla birbaşa əlaqə saxlaya bilərsiniz!'}
          </p>
          <div className="pt-4 space-y-2">
            <Link
              href="/"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow"
            >
              {t.home_btn}
            </Link>
            <Link
              href="/ustalar"
              className="block w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition"
            >
              {t.catalog_btn}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-white py-12 px-4 transition-colors">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="text-3xl">🔧</span>
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              Usta<span className="text-orange-500">Az</span>
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {t.register_page_title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.register_page_desc}
          </p>
        </div>

        {/* REJİM SEÇİM TABLARI */}
        <div className="grid grid-cols-2 gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
          <button
            type="button"
            onClick={() => setAccountType('customer')}
            className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              accountType === 'customer'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.customer_account_tab}</span>
          </button>
          <button
            type="button"
            onClick={() => setAccountType('usta')}
            className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              accountType === 'usta'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{t.usta_account_tab}</span>
          </button>
        </div>

        {/* 1. MÜŞTƏRİ QEYDİYYATI */}
        {accountType === 'customer' && (
          <form
            onSubmit={handleCustomerSubmit}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.name_label} *
              </label>
              <input
                type="text"
                required
                placeholder={
                  lang === 'ru'
                    ? 'Например: Рашад Алиев'
                    : lang === 'en'
                    ? 'e.g. Rashad Aliyev'
                    : 'Məsələn: Rəşad Əliyev'
                }
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.phone_label} *
              </label>
              <input
                type="text"
                required
                placeholder="+994 50 123 45 67"
                value={custPhone}
                onChange={(e) => setCustPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.city_label}
              </label>
              <select
                value={custCity}
                onChange={(e) => setCustCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* ŞİFRƏ VƏ GÖZ İKONU */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.pass_label} *
              </label>
              <div className="relative">
                <input
                  type={showCustPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={custPass}
                  onChange={(e) => setCustPass(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCustPass(!showCustPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  {showCustPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow"
            >
              {t.customer_submit_btn}
            </button>
          </form>
        )}

        {/* 2. USTA QEYDİYYATI FORMASI */}
        {accountType === 'usta' && (
          <form
            onSubmit={handleUstaSubmit}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-4"
          >
            {/* ŞƏKİL YÜKLƏMƏ */}
            <div className="bg-orange-50/70 dark:bg-slate-800/80 p-4 rounded-2xl border border-orange-200 dark:border-slate-700">
              <label className="block text-xs font-bold text-orange-950 dark:text-orange-300 mb-2">
                📸 {t.photo_label} *
              </label>

              {ustaAvatar && (
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={ustaAvatar}
                    alt="Seçilmiş Şəkil"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow"
                  />
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                      {lang === 'ru'
                        ? '✓ Фото успешно выбрано'
                        : lang === 'en'
                        ? '✓ Photo selected'
                        : '✓ Şəkil uğurla əlavə olundu'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setUstaAvatar('')}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      {lang === 'ru'
                        ? 'Изменить фото'
                        : lang === 'en'
                        ? 'Change photo'
                        : 'Şəkli dəyişdir'}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="cursor-pointer block py-2.5 px-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-dashed border-orange-300 dark:border-orange-500/40 rounded-xl text-center font-bold text-xs text-orange-600 dark:text-orange-400 transition flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>{t.choose_from_gallery}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  placeholder={t.or_image_url}
                  value={ustaAvatar}
                  onChange={(e) => {
                    setUstaAvatar(e.target.value);
                    setAvatarError('');
                  }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs outline-none text-slate-900 dark:text-white"
                />
              </div>

              {avatarError && (
                <p className="text-red-600 dark:text-red-400 font-bold text-xs mt-2">
                  {avatarError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.name_label} *
              </label>
              <input
                type="text"
                required
                placeholder={
                  lang === 'ru'
                    ? 'Например: Эльмир Касымов'
                    : lang === 'en'
                    ? 'e.g. Elmir Gasimov'
                    : 'Məsələn: Elmir Qasımov'
                }
                value={ustaName}
                onChange={(e) => setUstaName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.phone_label} *
              </label>
              <input
                type="text"
                required
                placeholder="+994 50 234 56 78"
                value={ustaPhone}
                onChange={(e) => setUstaPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* BÜTÜN AZƏRBAYCAN ŞƏHƏR VƏ RAYONLARI (A-Z) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.city_label} (A-Z) *
                </label>
                <select
                  required
                  value={ustaCity}
                  onChange={(e) => {
                    setUstaCity(e.target.value);
                    setUstaDistrict('');
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white font-medium"
                >
                  <option value="">Şəhər və ya Rayon seçin...</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.service_label} *
                </label>
                <select
                  value={ustaCategory}
                  onChange={(e) => setUstaCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* YALNIZ BAKI SEÇİLDİKDƏ: İSTƏYƏ GÖRƏ QƏSƏBƏ SEÇİMİ */}
            {ustaCity === 'Bakı' && (
              <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/30">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-amber-500 dark:text-amber-400">
                    📍 Bakı üzrə Qəsəbə:
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    (İstəyə görə)
                  </span>
                </div>
                <select
                  value={ustaDistrict}
                  onChange={(e) => setUstaDistrict(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
                >
                  <option value="">Bütün Bakı (qəsəbə göstərilməsin)</option>
                  {BAKI_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.experience_input_label} *
              </label>
              <input
                type="number"
                min={1}
                max={50}
                required
                value={ustaExperience}
                onChange={(e) => setUstaExperience(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* ŞİFRƏ VƏ GÖZ İKONU */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.pass_label} *
              </label>
              <div className="relative">
                <input
                  type={showUstaPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={ustaPass}
                  onChange={(e) => setUstaPass(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowUstaPass(!showUstaPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  {showUstaPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.desc_input_label}
              </label>
              <textarea
                rows={3}
                placeholder={
                  lang === 'ru'
                    ? 'Какие услуги вы оказываете, даете ли гарантию...'
                    : lang === 'en'
                    ? 'What services do you provide, do you offer warranty...'
                    : 'Hansı xidmətləri görürsünüz, zəmanət verirsinizmi...'
                }
                value={ustaDesc}
                onChange={(e) => setUstaDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition shadow"
            >
              {t.usta_submit_btn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
