"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { USTALAR, CATEGORIES as DATA_CATEGORIES, CITIES as DATA_CITIES, BAKI_DISTRICTS as DATA_DISTRICTS } from "@/lib/data";
import UstaCard from "@/components/UstaCard";
import { TRANSLATIONS, Language } from "@/lib/translations";
import { getUstalar } from "@/lib/db";

const CITIES = DATA_CITIES || [];
const BAKI_DISTRICTS = DATA_DISTRICTS || [];
const CATEGORIES = DATA_CATEGORIES || [];

function UstalarContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || searchParams.get("category") || "";
  const initialCity = searchParams.get("city") || "";
  const initialDistrict = searchParams.get("district") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);

  const [lang, setLang] = useState<Language>("az");
  const [customUstalar, setCustomUstalar] = useState<any[]>([]);

  useEffect(() => {
    setSelectedCat(initialCat);
    setSelectedCity(initialCity);
    setSelectedDistrict(initialDistrict);
  }, [initialCat, initialCity, initialDistrict]);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("app_lang") as Language;
      if (savedLang && ["az", "ru", "en"].includes(savedLang)) {
        setLang(savedLang);
      }
    } catch {}

    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };

    window.addEventListener("langChange", handleLangChange);
    return () => window.removeEventListener("langChange", handleLangChange);
  }, []);

  // Yeni qeydiyyatdan keçən ustaları həm buluddan, həm lokaldan canlı oxu
  useEffect(() => {
    getUstalar().then((list) => {
      if (Array.isArray(list)) setCustomUstalar(list);
    });

    const handleSync = () => {
      getUstalar().then((list) => {
        if (Array.isArray(list)) setCustomUstalar(list);
      });
    };

    window.addEventListener("authChange", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("authChange", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const t: any = TRANSLATIONS[lang] || TRANSLATIONS.az;

  const allUstalar = useMemo(() => {
    const base = USTALAR || [];
    return [...customUstalar, ...base];
  }, [customUstalar]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCat("");
    setSelectedCity("");
    setSelectedDistrict("");
  };

  const filteredUstalar = useMemo(() => {
    let list = allUstalar.filter((u) => {
      if (!u || u.status === "inactive" || u.status === "offline" || u.isActive === false) {
        return false;
      }
      return true;
    });

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter((u) => {
        const nameMatch = (u.name || "").toLowerCase().includes(q);
        const catMatch = (u.category || "").toLowerCase().includes(q);
        const skillsMatch = Array.isArray(u.skills) && u.skills.some((s: string) => (s || "").toLowerCase().includes(q));
        const descMatch = (u.description || "").toLowerCase().includes(q);
        return nameMatch || catMatch || skillsMatch || descMatch;
      });
    }

    if (selectedCat) {
      list = list.filter((u) => u.category === selectedCat);
    }

    if (selectedCity) {
      list = list.filter((u) => u.city === selectedCity);
    }

    if (selectedCity === "Bakı" && selectedDistrict && !selectedDistrict.includes("Bütün Bakı")) {
      list = list.filter((u) => u.district === selectedDistrict);
    }

    return list;
  }, [allUstalar, searchTerm, selectedCat, selectedCity, selectedDistrict]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 py-8 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.catalog_title || "Usta Kataloqu"}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Azərbaycan üzrə peşəkar ustaları dərhal axtarın və əlaqə saxlayın
          </p>
        </div>

        {/* AXTARIŞ VƏ FİLTR PANORAMASI */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Açar Sözü ilə Axtar
              </label>
              <input
                type="text"
                placeholder="Usta adı, xidmət..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Xidmət Növü
              </label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="">Bütün Xidmətlər</option>
                {CATEGORIES.map((cat: any) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Şəhər / Rayon
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  if (e.target.value !== "Bakı") setSelectedDistrict("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="">Bütün Şəhərlər (Bütün Azərbaycan)</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {selectedCity === "Bakı" && (
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  Bakı Qəsəbəsi
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white cursor-pointer"
                >
                  {BAKI_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {(searchTerm || selectedCat || selectedCity || selectedDistrict) && (
            <div className="flex justify-end">
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-500 hover:underline font-bold"
              >
                Filtrləri Sıfırla ✕
              </button>
            </div>
          )}
        </div>

        {/* NƏTİCƏLƏR */}
        {filteredUstalar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUstalar.map((usta) => (
              <UstaCard key={usta.id} usta={usta} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              Axtarışınıza uyğun usta tapılmadı
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Filtrləri dəyişərək və ya sıfırlayaraq yenidən yoxlayın.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Bütün Ustalara Bax
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UstalarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Yüklənir...</div>}>
      <UstalarContent />
    </Suspense>
  );
}
