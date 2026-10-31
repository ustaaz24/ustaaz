'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES as DATA_CATEGORIES, CITIES as DATA_CITIES, BAKI_DISTRICTS as DATA_DISTRICTS, USTALAR } from '@/lib/data';
import UstaCard from '@/components/UstaCard';
import { TRANSLATIONS, Language } from '@/lib/translations';

const FALLBACK_CITIES = [
  "Abşeron", "Ağcabədi", "Ağdam", "Ağdaş", "Ağstafa", "Ağsu", "Astara",
  "Babək", "Bakı", "Balakən", "Bərdə", "Beyləqan", "Biləsuvar",
  "Cəbrayıl", "Cəlilabad", "Culfa", "Daşkəsən", "Füzuli", "Gədəbəy",
  "Gəncə", "Goranboy", "Göyçay", "Göygöl", "Hacıqabul", "Xaçmaz",
  "Xankəndi", "Xocalı", "Xocavənd", "Xırdalan", "İmişli", "İsmayıllı",
  "Kəlbəcər", "Kürdəmir", "Laçın", "Lənkəran", "Lerik", "Masallı",
  "Mingəçevir", "Naftalan", "Naxçıvan", "Neftçala", "Oğuz", "Ordubad",
  "Qax", "Qazax", "Qəbələ", "Qobustan", "Quba", "Qubadlı", "Qusar",
  "Saatlı", "Sabirabad", "Salyan", "Şabran", "Şahbuz", "Şamaxı",
  "Şəki", "Şəmkir", "Şərur", "Şirvan", "Siyəzən", "Sumqayıt",
  "Şuşa", "Tərtər", "Tovuz", "Ucar", "Yardımlı", "Yevlax",
  "Zaqatala", "Zəngilan", "Zərdab"
];

const FALLBACK_BAKI_DISTRICTS = [
  "Binəqədi (M.Ə.Rəsulzadə / Biləcəri / Binəqədi)",
  "Xətai (Əhmədli / Həzi Aslanov / Köhnə Günəşli)",
  "Xəzər (Mərdəkan / Şüvəlan / Buzovna / Binə)",
  "Qaradağ (Lökbatan / Sahil / Qobustan)",
  "Nərimanov (Gənclik / Montin / N.Nərimanov)",
  "Nəsimi (28 May / Memar Əcəmi / Kubinka)",
  "Nizami (Neftçilər / Qara Qarayev / Keşlə)",
  "Pirallahı (Pirallahı / Çilov / Neft Daşları)",
  "Sabunçu (Bakıxanov / Zabrat / Maştağa / Kürdəxanı)",
  "Səbail (İçərişəhər / Badamdar / Bayıl / Sahil)",
  "Suraxanı (Qaraçuxur / Əmircan / Yeni Günəşli)",
  "Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)"
];

const CITIES = (DATA_CITIES && DATA_CITIES.length > 0) ? DATA_CITIES : FALLBACK_CITIES;
const BAKI_DISTRICTS = (DATA_DISTRICTS && DATA_DISTRICTS.length > 0) ? DATA_DISTRICTS : FALLBACK_BAKI_DISTRICTS;
const CATEGORIES = DATA_CATEGORIES || [];

export default function Home() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [lang, setLang] = useState<Language>('az');

  const ustalarList = USTALAR || [];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang") as Language;
      if (saved && ["az", "ru", "en"].includes(saved)) {
        setLang(saved);
      }
    } catch {}

    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };

    window.addEventListener("langChange", handleLangChange);
    return () => window.removeEventListener("langChange", handleLangChange);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.az;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCat) params.set('cat', selectedCat);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedDistrict) params.set('district', selectedDistrict);
    router.push(`/ustalar?${params.toString()}`);
  };

  return (
    <main className="bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
      {/* HERO BANNER (MƏNALI QARŞILAMA) */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-800/60 dark:to-[#0b1120] py-16 px-4 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 tracking-wider border border-blue-200 dark:border-blue-800">
            {t.hero_badge || "Azərbaycanın 1 Nömrəli Usta Platforması"}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            Evinizdə usta lazımdır? <br />
            <span className="text-blue-600 dark:text-amber-400">Bir kliklə əlaqə saxlayın!</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Peşəkar santexnik, elektrik, kombi və digər ustaları dərhal tapın, birbaşa zəng və ya WhatsApp ilə əlaqə saxlayın.
          </p>

          {/* AXTARIŞ FORMASI */}
          <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-3 text-left transition-colors">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase px-2 mb-1">
                {t.service_label || "SƏNƏT / XİDMƏT"}
              </label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="">{t.all_services || "Bütün Xidmətlər"}</option>
                {CATEGORIES.map((cat: any) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase px-2 mb-1">
                {t.city_label || "ŞƏHƏR / RAYON"}
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  if (e.target.value !== "Bakı") setSelectedDistrict("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="">{t.all_cities || "Bütün Şəhərlər (Bütün Azərbaycan)"}</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {/* TƏK 1 DƏNƏ LUPA İKONU */}
                <span>{t.search_btn || "🔍 Usta Tap"}</span>
              </button>
            </div>
          </form>

          {/* Bakı seçilən zaman qəsəbə paneli */}
          {selectedCity === "Bakı" && (
            <div className="mt-3 bg-blue-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-blue-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3 text-left">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300 whitespace-nowrap">
                📍 Bakının Rayon və Qəsəbələri (istəyə görə):
              </span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="flex-1 w-full bg-white dark:bg-slate-900 border border-blue-300 dark:border-slate-600 rounded-xl p-2.5 text-xs font-semibold outline-none text-slate-900 dark:text-white cursor-pointer"
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
        </div>
      </section>

      {/* POPULYAR XİDMƏTLƏR */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.popular_services || "Populyar Xidmətlər"}</h2>
          <Link href="/ustalar" className="text-sm font-semibold text-blue-600 dark:text-amber-400 hover:underline">
            {t.see_all || "Hamısına bax"} →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/ustalar?cat=${encodeURIComponent(cat.name)}`}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-amber-400 hover:shadow-md transition text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition duration-300">{cat.icon}</div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{cat.count || 12} usta</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEÇİLMİŞ USTALAR */}
      <section className="max-w-7xl mx-auto px-4 py-8 mb-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.featured_title || "VIP və Təcrübəli Ustalar"}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.featured_subtitle || "Müştərilərin ən çox etibar etdiyi və yüksək reytinqli ustalar"}</p>
          </div>
          <Link href="/ustalar" className="text-sm font-semibold text-blue-600 dark:text-amber-400 hover:underline">
            {t.all_craftsmen || "Bütün Ustalar"} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ustalarList.slice(0, 6).map((usta) => (
            <UstaCard key={usta.id} usta={usta} />
          ))}
        </div>
      </section>
    </main>
  );
}