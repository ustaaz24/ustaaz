"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { USTALAR, CATEGORIES as DATA_CATEGORIES, CITIES as DATA_CITIES, BAKI_DISTRICTS as DATA_DISTRICTS } from "@/lib/data";
import UstaCard from "@/components/UstaCard";
import { TRANSLATIONS, Language } from "@/lib/translations";

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

function UstalarContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || searchParams.get("category") || "";
  const initialCity = searchParams.get("city") || "";
  const initialDistrict = searchParams.get("district") || "";

  // Canlı axtarış və filtrlər (Birbaşa seçilən kimi göstərir, 2-ci dəfə "Axtarış Et" vurmağa ehtiyac qalmır!)
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

  useEffect(() => {
    try {
      const stored = localStorage.getItem("custom_ustalar");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCustomUstalar(parsed);
      }
    } catch {}
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.az;

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
        const descMatch = (u.description || "").toLowerCase().includes(q);
        const skillsMatch = Array.isArray(u.skills) && u.skills.some((s: string) => (s || "").toLowerCase().includes(q));
        return nameMatch || catMatch || descMatch || skillsMatch;
      });
    }

    if (selectedCat) {
      list = list.filter((u) => {
        const cat = (u.category || "").toLowerCase();
        const catSlug = (u.categorySlug || "").toLowerCase();
        const query = selectedCat.toLowerCase();
        return cat.includes(query) || catSlug.includes(query);
      });
    }

    if (selectedCity) {
      const cityLow = (selectedCity || "").toLowerCase();
      if (cityLow === "bakı") {
        list = list.filter((u) => {
          const uCity = (u.city || "").toLowerCase();
          const uDist = (u.district || "").toLowerCase();
          return (
            uCity === "bakı" ||
            uDist.includes("bakı") ||
            uDist.includes("yasamal") ||
            uDist.includes("nəsimi") ||
            uDist.includes("nərimanov") ||
            uDist.includes("xətai") ||
            uDist.includes("səbail") ||
            uDist.includes("binəqədi") ||
            uDist.includes("sabunçu") ||
            uDist.includes("suraxanı") ||
            uDist.includes("xəzər") ||
            uDist.includes("qaradağ") ||
            uDist.includes("xırdalan") ||
            uDist.includes("masazır")
          );
        });
      } else {
        list = list.filter((u) => {
          const uCity = (u.city || "").toLowerCase();
          const uDist = (u.district || "").toLowerCase();
          return uCity.includes(cityLow) || uDist.includes(cityLow);
        });
      }
    }

    if (selectedDistrict && !selectedDistrict.includes("Bütün Bakı")) {
      const firstWord = (selectedDistrict || "").split(" ")[0].toLowerCase();
      list = list.filter((u) => {
        const uDist = (u.district || "").toLowerCase();
        const uCity = (u.city || "").toLowerCase();
        return uDist.includes(firstWord) || uCity.includes(firstWord);
      });
    }

    return list;
  }, [searchTerm, selectedCat, selectedCity, selectedDistrict, allUstalar]);

  const hasActiveFilters = !!(searchTerm || selectedCat || selectedCity || selectedDistrict);

  return (
    <div className="bg-[#0b1120] text-white min-h-screen py-10 px-4 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* BAŞLIQ VƏ SAY */}
        <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase mb-2 tracking-wider">
              🇦🇿 Bütün Azərbaycan üzrə peşəkar usta xidmətləri
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Usta Kataloqu
            </h1>
          </div>
          <div className="text-sm font-semibold text-slate-400">
            Tapılan ustalar: <span className="text-amber-400 font-black text-base">{filteredUstalar.length} nəfər</span>
          </div>
        </div>

        {/* CANLI FİLTER QUTUSU */}
        <div className="bg-[#121c2e] p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. MƏTN AXTARIŞI */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                USTA AXTAR
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Usta adı, xidmət və ya bacarıq..."
                className="w-full bg-[#1a263d] border border-slate-700/80 text-white placeholder-slate-500 rounded-2xl p-3.5 text-xs outline-none focus:border-blue-500 font-semibold transition"
              />
            </div>

            {/* 2. XİDMƏT / SƏNƏT */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                XİDMƏT / SƏNƏT
              </label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-[#1a263d] border border-slate-700/80 text-white rounded-2xl p-3.5 text-xs outline-none focus:border-blue-500 font-semibold transition cursor-pointer"
              >
                <option value="">Bütün Xidmətlər ({CATEGORIES.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. ŞƏHƏR / RAYON (A-Z) */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                ŞƏHƏR / RAYON
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  if (e.target.value !== "Bakı") setSelectedDistrict("");
                }}
                className="w-full bg-[#1a263d] border border-slate-700/80 text-white rounded-2xl p-3.5 text-xs outline-none focus:border-blue-500 font-semibold transition cursor-pointer"
              >
                <option value="">Bütün Şəhərlər (Bütün Azərbaycan)</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bakı seçilən zaman qəsəbə seçimi */}
          {selectedCity === "Bakı" && (
            <div className="bg-[#1a263d]/80 p-4 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs font-bold text-amber-400 whitespace-nowrap flex items-center gap-1.5">
                <span>📍</span> Bakı üzrə Qəsəbə (istəyə görə):
              </span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="flex-1 w-full bg-[#121c2e] border border-slate-700 text-white font-semibold rounded-xl p-2.5 text-xs outline-none focus:border-blue-500 cursor-pointer"
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

          {/* Aktiv Filtrlər */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Aktiv filterlər:</span>
                {searchTerm && (
                  <span className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-xl">
                    &ldquo;{searchTerm}&rdquo;
                  </span>
                )}
                {selectedCat && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-xl">
                    {selectedCat}
                  </span>
                )}
                {selectedCity && (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                    {selectedCity}
                  </span>
                )}
                {selectedDistrict && (
                  <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-xl">
                    {selectedDistrict.split(" ")[0]}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold hover:underline transition"
              >
                ✕ Filtrləri Sıfırla
              </button>
            </div>
          )}
        </div>

        {/* NƏTİCƏLƏR */}
        {filteredUstalar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUstalar.map((u) => (
              <UstaCard key={u.id} usta={u} craftsman={u} />
            ))}
          </div>
        ) : (
          <div className="bg-[#121c2e] border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-black text-white mb-2">Uyğun usta tapılmadı</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Axtarış meyarlarınıza uyğun heç bir usta qeydə alınmayıb. Başqa xidmət və ya şəhər seçə bilərsiniz.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow"
            >
              Bütün Ustaları Göstər
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UstalarPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0b1120] min-h-screen text-white flex items-center justify-center p-6">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <UstalarContent />
    </Suspense>
  );
}
