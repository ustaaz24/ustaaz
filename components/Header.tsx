"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CITIES, BAKI_DISTRICTS } from "@/lib/data";
import { TRANSLATIONS, Language } from "@/lib/translations";

const Menu = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const X = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Settings = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const User = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const Eye = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const Edit3 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const Upload = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const Send = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<Language>("az");

  // Modallar
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOperatorChatModal, setShowOperatorChatModal] = useState(false);

  // Operator Çatı State
  const [operatorMessages, setOperatorMessages] = useState<any[]>([
    {
      id: "op1",
      sender: "operator",
      text: "Salam! UstaAz Dəstək Xidmətinə xoş gəlmisiniz. Sizə necə kömək edə bilərəm?",
      time: "İndi",
    },
  ]);
  const [opInput, setOpInput] = useState("");
  const [isOpTyping, setIsOpTyping] = useState(false);

  // Giriş sahələri (Müştəri, Usta və Operator rolları ilə)
  const [loginPhone, setLoginPhone] = useState("+994 ");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginRole, setLoginRole] = useState<"customer" | "usta" | "operator">("customer");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Profil redaktə sahələri
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPass, setEditPass] = useState("");
  const [showEditPass, setShowEditPass] = useState(false);

  // Usta rejiminə keçid sahələri
  const [ustaCategory, setUstaCategory] = useState("Santexnik");
  const [ustaCity, setUstaCity] = useState("Bakı");
  const [ustaDistrict, setUstaDistrict] = useState("Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)");
  const [ustaPassword, setUstaPassword] = useState("");
  const [showUstaPass, setShowUstaPass] = useState(false);
  const [ustaAvatar, setUstaAvatar] = useState("");
  const [ustaAvatarError, setUstaAvatarError] = useState("");

  const t = TRANSLATIONS[lang] || TRANSLATIONS.az;

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("app_lang") as Language;
      if (savedLang && ["az", "ru", "en"].includes(savedLang)) {
        setLang(savedLang);
      }
    } catch {}

    try {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    } catch {}

    const syncUser = () => {
      try {
        const stored = localStorage.getItem("current_user");
        if (stored) {
          const user = JSON.parse(stored);
          if (user && user.isLoggedIn) {
            setCurrentUser(user);
            setEditName(user.name || "");
            setEditPhone(user.phone || "");
            return;
          }
        }
        setCurrentUser(null);
      } catch {
        setCurrentUser(null);
      }
    };

    syncUser();
    window.addEventListener("authChange", syncUser);
    window.addEventListener("storage", syncUser);

    const handleOpEvent = () => setShowOperatorChatModal(true);
    window.addEventListener("openOperatorChat", handleOpEvent);

    return () => {
      window.removeEventListener("authChange", syncUser);
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("openOperatorChat", handleOpEvent);
    };
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem("app_lang", newLang);
      window.dispatchEvent(new CustomEvent("langChange", { detail: newLang }));
    } catch {}
  };

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // CİDDİ HESAB GİRİŞİ (Yalnız doğru məlumat olduqda açır)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const phoneClean = loginPhone.trim().replace(/\s+/g, "");
    const pass = loginPass.trim();

    if (!phoneClean || !pass) {
      setLoginError("Zəhmət olmasa telefon və şifrəni daxil edin.");
      return;
    }

    let matchedUser: any = null;

    try {
      const stored = localStorage.getItem("all_accounts");
      if (stored) {
        const accounts: any[] = JSON.parse(stored);
        matchedUser = accounts.find(
          (acc) =>
            acc.phone.replace(/\s+/g, "") === phoneClean &&
            String(acc.password) === pass &&
            acc.role === loginRole
        );
      }
    } catch {}

    // Standart sınaq hesabları
    if (!matchedUser) {
      if (loginRole === "usta" && (phoneClean.includes("502345678") || phoneClean.includes("501234567")) && (pass === "123456" || pass === "123")) {
        matchedUser = {
          name: "Əli Həsənov",
          phone: "+994 50 234 56 78",
          role: "usta",
          category: "Santexnik",
          city: "Bakı",
          district: "Yasamal",
          status: "active",
          isVip: true,
          verified: true,
          isLoggedIn: true,
        };
      } else if (loginRole === "customer" && phoneClean.includes("501112233") && (pass === "123456" || pass === "123")) {
        matchedUser = {
          name: "Kamran Məmmədov",
          phone: "+994 50 111 22 33",
          role: "customer",
          city: "Bakı",
          isLoggedIn: true,
        };
      } else if (loginRole === "operator" && (phoneClean.includes("509990011") || phoneClean.includes("501230000") || phoneClean.includes("999")) && (pass === "123456" || pass === "123")) {
        matchedUser = {
          name: "Aysel Qasımova (Operator)",
          phone: "+994 50 999 00 11",
          role: "operator",
          isLoggedIn: true,
        };
      }
    }

    if (!matchedUser) {
      setLoginError("❌ Bu telefon nömrəsi və ya şifrə ilə hesab tapılmadı! Zəhmət olmasa düzgün məlumat yazın və ya qeydiyyatdan keçin.");
      return;
    }

    matchedUser.isLoggedIn = true;
    setCurrentUser(matchedUser);
    try {
      localStorage.setItem("current_user", JSON.stringify(matchedUser));
      window.dispatchEvent(new CustomEvent("authChange"));
    } catch {}

    setLoginSuccess(true);
    setTimeout(() => {
      setLoginSuccess(false);
      setShowLoginModal(false);
      setLoginPhone("+994 ");
      setLoginPass("");
    }, 800);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("current_user");
      setCurrentUser(null);
      window.dispatchEvent(new CustomEvent("authChange"));
    } catch {}
    setDrawerOpen(false);
  };

  const handleSwitchToUsta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ustaAvatar.trim()) {
      setUstaAvatarError("Usta profilinə keçmək üçün profil şəkli mütləqdir!");
      return;
    }
    setUstaAvatarError("");

    const updated = {
      ...currentUser,
      role: "usta",
      status: "active",
      category: ustaCategory,
      city: ustaCity,
      district: ustaCity === "Bakı" ? ustaDistrict : ustaCity,
      avatar: ustaAvatar,
      verified: true,
      rating: 5.0,
      reviewCount: 1,
      experience: 5,
    };
    setCurrentUser(updated);
    try {
      localStorage.setItem("current_user", JSON.stringify(updated));
      const existing = localStorage.getItem("custom_ustalar");
      const list = existing ? JSON.parse(existing) : [];
      const idx = list.findIndex((x: any) => (x.phone && x.phone === updated.phone) || (x.id && x.id === updated.id));
      if (idx >= 0) {
        list[idx] = updated;
      } else {
        list.unshift(updated);
      }
      localStorage.setItem("custom_ustalar", JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("authChange"));
    } catch {}

    setShowSwitchModal(false);
    alert("Təbriklər! Hesabınız Usta rejiminə keçirildi.");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUstaAvatar(reader.result as string);
        setUstaAvatarError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      name: editName,
      phone: editPhone,
    };
    if (editPass) updated.password = editPass;
    setCurrentUser(updated);
    try {
      localStorage.setItem("current_user", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("authChange"));
    } catch {}
    setShowEditModal(false);
    alert("Profil məlumatlarınız yeniləndi!");
  };

  const handleSendOperatorMsg = (quickText?: string) => {
    const text = (quickText || opInput).trim();
    if (!text) return;

    const userMsg = {
      id: "u_" + Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setOperatorMessages((prev) => [...prev, userMsg]);
    if (!quickText) setOpInput("");
    setIsOpTyping(true);

    setTimeout(() => {
      let bot = "Müraciətiniz qeydə alındı. Dəstək komandamız dərhal köməklik göstərəcək.";
      const low = text.toLowerCase();
      if (low.includes("usta tap") || low.includes("axtar")) {
        bot = "Kataloq səhifəmizdə 'Xidmət' və 'Şəhər' seçərək 'Axtarış Et' düyməsinə klikləməklə sizə ən yaxın ustanı dərhal tapa bilərsiniz.";
      } else if (low.includes("qeydiyyat") || low.includes("usta olmaq")) {
        bot = "Usta olmaq üçün menyudan 'Qeydiyyatdan Keç' seçib 'Usta Kimi Qeydiyyat' bölməsini doldura bilərsiniz. Şəkil əlavə etmək mütləqdir.";
      } else if (low.includes("vip") || low.includes("mavi tik")) {
        bot = "VIP status profilinizi kataloqun ən üst pilləsinə qaldırır. Usta Panelinizdən bir kliklə təsdiqləyib aktivləşdirə bilərsiniz.";
      }

      setOperatorMessages((prev) => [
        ...prev,
        {
          id: "op_" + Date.now(),
          sender: "operator",
          text: bot,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsOpTyping(false);
    }, 1000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0b1120] border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2">
          {/* Sol: Loqo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span className="text-2xl sm:text-3xl">🔧</span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight">
              Usta<span className="text-orange-500">Az</span>
            </span>
          </Link>

          {/* Orta: Desktop Naviqasiya (Yalnız Operatorlar Operator Masasını görür) */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-amber-400 transition">Ana Səhifə</Link>
            <Link href="/ustalar" className="hover:text-blue-600 dark:hover:text-amber-400 transition">{t?.all_ustas_link || "Bütün Ustalar"}</Link>
            {currentUser?.isLoggedIn && currentUser?.role === "operator" && (
              <Link href="/operator" className="text-amber-500 hover:text-amber-600 transition flex items-center gap-1 font-bold">
                <span>🎧</span>
                <span>Operator Masası</span>
              </Link>
            )}
          </nav>

          {/* Sağ Düymələr */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* DİL SEÇİMİ */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 sm:p-1 text-[11px] sm:text-xs font-bold">
              {(["az", "ru", "en"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg uppercase transition cursor-pointer ${
                    lang === l
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-amber-400 shadow-sm font-black"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* QARANLIQ REJİM */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition text-sm cursor-pointer"
              title={isDark ? "İşıqlı rejim" : "Qaranlıq rejim"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* Daxil olub / olmayıb idarəsi */}
            {currentUser?.isLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="max-w-[75px] sm:max-w-[120px] truncate">{currentUser.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 transition border border-red-200 dark:border-red-900 whitespace-nowrap cursor-pointer"
                  title="Hesabdan Çıxış"
                >
                  Çıxış
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => {
                    setLoginError("");
                    setShowLoginModal(true);
                  }}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-sm cursor-pointer"
                >
                  Daxil Ol
                </button>
                <Link
                  href="/qeydiyyat"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition shadow-sm whitespace-nowrap"
                >
                  Qeydiyyatdan Keç
                </Link>
              </div>
            )}

            {/* MENYU DÜYMƏSİ */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1 text-xs font-bold cursor-pointer"
              title="Parametrlər"
            >
              <Menu className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            </button>
          </div>
        </div>
      </header>

      {/* PARAMETRLƏR DRAWER */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-80 sm:w-96 bg-white dark:bg-slate-900 h-screen p-6 flex flex-col justify-between overflow-y-auto text-slate-900 dark:text-white shadow-2xl transition-colors border-l border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white">
                  <Settings className="w-5 h-5 text-blue-600 dark:text-amber-400" />
                  <span>Parametrlər</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!currentUser?.isLoggedIn ? (
                <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900 mb-5 text-center">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Xoş gəlmisiniz!</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    Usta xidmətlərindən tam istifadə etmək üçün hesabınıza daxil olun.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setDrawerOpen(false); setLoginError(""); setShowLoginModal(true); }}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
                    >
                      Daxil Ol
                    </button>
                    <Link
                      href="/qeydiyyat"
                      onClick={() => setDrawerOpen(false)}
                      className="block w-full py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600 dark:text-amber-400 border border-blue-200 dark:border-slate-700 font-bold text-xs rounded-xl shadow-sm transition text-center"
                    >
                      Qeydiyyatdan Keç
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-blue-500 shadow" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
                        {currentUser.name ? currentUser.name.charAt(0) : "U"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{currentUser.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.phone}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentUser.role === "usta"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
                        : currentUser.role === "operator"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                    }`}>
                      {currentUser.role === "usta" ? "Usta" : currentUser.role === "operator" ? "Operator" : "Müştəri"}
                    </span>
                  </div>

                  <button
                    onClick={() => { setShowEditModal(true); setDrawerOpen(false); }}
                    className="w-full py-2 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Profili Redaktə Et</span>
                  </button>
                </div>
              )}

              {/* Menyu Keçidləri */}
              <div className="space-y-2 text-xs">
                {currentUser?.isLoggedIn && currentUser?.role !== "usta" && currentUser?.role !== "operator" && (
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      setShowSwitchModal(true);
                    }}
                    className="w-full p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-between hover:bg-orange-100 dark:hover:bg-orange-900/40 transition cursor-pointer"
                  >
                    <span>👷 Usta Hesabına Keç</span>
                    <span>→</span>
                  </button>
                )}

                <Link
                  href="/ustalar"
                  onClick={() => setDrawerOpen(false)}
                  className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition"
                >
                  🔍 Bütün Ustalar Kataloqu
                </Link>

                {/* Qaynar Xətt */}
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    setShowOperatorChatModal(true);
                  }}
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/40 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-between hover:bg-amber-500/20 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎧</span>
                    <span>Qaynar Xətt (Canlı Operator)</span>
                  </div>
                  <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                    ONLAYN
                  </span>
                </button>

                {/* YALNIZ OPERATOR HESABLARINDA GÖRÜNÜR */}
                {currentUser?.isLoggedIn && currentUser?.role === "operator" && (
                  <Link
                    href="/operator"
                    onClick={() => setDrawerOpen(false)}
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold transition border border-dashed border-blue-400/40"
                  >
                    💻 Operator İdarəetmə Masası (/operator) →
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              {currentUser?.isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer"
                >
                  Hesabdan Çıxış
                </button>
              )}
              <div className="text-center text-xs text-slate-400">
                UstaAz MMC © 2026
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. CANLI OPERATOR ÇAT MODALI */}
      {showOperatorChatModal && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-md bg-[#121c2e] border border-slate-800 rounded-none sm:rounded-3xl shadow-2xl flex flex-col text-white overflow-hidden h-full sm:h-[550px] animate-scaleUp">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow">
                🎧
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-2">
                  <span>UstaAz Dəstək Xidməti</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </h3>
                <p className="text-[11px] text-emerald-400 font-bold">● Canlı Operator Xəttədir</p>
              </div>
            </div>
            <button
              onClick={() => setShowOperatorChatModal(false)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendOperatorMsg("Usta necə tapım?")}
              className="text-[11px] font-semibold bg-[#1a263d] hover:bg-blue-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              🔍 Usta tapmaq
            </button>
            <button
              onClick={() => handleSendOperatorMsg("Usta qeydiyyatı necə olur?")}
              className="text-[11px] font-semibold bg-[#1a263d] hover:bg-blue-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              📝 Usta qeydiyyatı
            </button>
            <button
              onClick={() => handleSendOperatorMsg("VIP və Mavi Tik")}
              className="text-[11px] font-semibold bg-[#1a263d] hover:bg-blue-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              👑 VIP və Mavi Tik
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0e1626]">
            {operatorMessages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none shadow"
                      : "bg-[#1a263d] text-slate-200 border border-slate-800 rounded-bl-none shadow"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isOpTyping && (
              <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-[#1a263d] px-3 py-2 rounded-2xl w-fit">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse delay-100">●</span>
                <span className="animate-pulse delay-200">●</span>
                <span className="text-[11px] ml-1">Operator yazır...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendOperatorMsg();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Operatora sualınızı yazın..."
              value={opInput}
              onChange={(e) => setOpInput(e.target.value)}
              className="flex-1 bg-[#1a263d] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition shadow cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 2. MODAL: DAXİL OL (Müştəri / Usta / Operator rolları) */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-slate-900 dark:text-white relative shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-1">Hesaba Daxil Ol</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Xidmətlərdən tam istifadə etmək üçün hesabınıza daxil olun.
            </p>

            {loginSuccess && (
              <div className="p-3 mb-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl border border-emerald-200 dark:border-emerald-800 font-bold">
                ✓ Uğurla daxil oldunuz!
              </div>
            )}

            {loginError && (
              <div className="p-3 mb-3 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs rounded-xl border border-rose-200 dark:border-rose-800 leading-relaxed font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3 text-xs">
              {/* Rol seçimi */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => { setLoginRole("customer"); setLoginError(""); }}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition text-center cursor-pointer ${
                    loginRole === "customer"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-amber-400 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Müştəri
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginRole("usta"); setLoginError(""); }}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition text-center cursor-pointer ${
                    loginRole === "usta"
                      ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-amber-400 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Usta
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginRole("operator"); setLoginError(""); }}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition text-center cursor-pointer ${
                    loginRole === "operator"
                      ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Operator
                </button>
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Telefon Nömrəsi</label>
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="+994 50 000 00 00"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Şifrə</label>
                <div className="relative">
                  <input
                    type={showLoginPass ? "text" : "password"}
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Şifrəniz"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow cursor-pointer"
              >
                Daxil Ol
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/qeydiyyat"
                  onClick={() => setShowLoginModal(false)}
                  className="text-xs text-blue-600 dark:text-amber-400 hover:underline font-bold"
                >
                  Hesabınız yoxdur? Qeydiyyatdan keçin →
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL: USTA REJİMİNƏ KEÇİD */}
      {showSwitchModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowSwitchModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-slate-900 dark:text-white relative shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSwitchModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold mb-1">Usta Hesabına Keçid</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Usta kimi xidmət göstərmək üçün profil şəkli, şəhər və məlumatlarınızı daxil edin.
            </p>

            <form onSubmit={handleSwitchToUsta} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                  Profil Şəkli (Məcburidir) *
                </label>
                {ustaAvatar && (
                  <div className="flex items-center gap-3 mb-2">
                    <img src={ustaAvatar} alt="Usta Şəkli" className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500 shadow" />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Şəkil seçildi</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-center font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5">
                    <Upload className="w-4 h-4 text-orange-500" />
                    <span>Qalereyadan Şəkil Seç</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="və ya Şəkil linki (URL)..."
                  value={ustaAvatar}
                  onChange={(e) => {
                    setUstaAvatar(e.target.value);
                    setUstaAvatarError("");
                  }}
                  className="w-full mt-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 outline-none text-slate-900 dark:text-white text-[11px]"
                />
                {ustaAvatarError && (
                  <p className="text-red-500 font-bold text-[11px] mt-1">{ustaAvatarError}</p>
                )}
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">İxtisas *</label>
                <select
                  value={ustaCategory}
                  onChange={(e) => setUstaCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white"
                >
                  <option value="Santexnik">Santexnik</option>
                  <option value="Elektrik ustası">Elektrik ustası</option>
                  <option value="Kombi ustası">Kombi ustası</option>
                  <option value="Mebel ustası">Mebel ustası</option>
                  <option value="Kafel / Metlax">Kafel / Metlax</option>
                  <option value="Ev təmizliyi">Ev təmizliyi</option>
                  <option value="Qaynaqçı">Qaynaqçı</option>
                  <option value="Rəngsaz / Malyar">Rəngsaz / Malyar</option>
                </select>
              </div>

              {/* BÜTÜN AZƏRBAYCAN ŞƏHƏR VƏ RAYONLARI (A-Z) */}
              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Şəhər / Rayon *</label>
                <select
                  value={ustaCity}
                  onChange={(e) => {
                    setUstaCity(e.target.value);
                    if (e.target.value !== "Bakı") setUstaDistrict("");
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {ustaCity === "Bakı" && (
                <div>
                  <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Bakı üzrə Rayon / Qəsəbə *</label>
                  <select
                    value={ustaDistrict}
                    onChange={(e) => setUstaDistrict(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white"
                  >
                    {BAKI_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Şifrəniz *</label>
                <div className="relative">
                  <input
                    type={showUstaPass ? "text" : "password"}
                    required
                    value={ustaPassword}
                    onChange={(e) => setUstaPassword(e.target.value)}
                    placeholder="Şifrəniz"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowUstaPass(!showUstaPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    {showUstaPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition shadow cursor-pointer"
              >
                Usta Hesabını Təsdiqlə və Aktiv Et
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: PROFİL REDAKTƏ */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-slate-900 dark:text-white relative shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold mb-3">Profili Redaktə Et</h3>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Ad və Soyad</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Telefon Nömrəsi</label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1 font-semibold">Yeni Şifrə</label>
                <div className="relative">
                  <input
                    type={showEditPass ? "text" : "password"}
                    value={editPass}
                    onChange={(e) => setEditPass(e.target.value)}
                    placeholder="Dəyişmək istəmirsinizsə boş buraxın"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none text-slate-900 dark:text-white pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPass(!showEditPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    {showEditPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow cursor-pointer"
              >
                Yadda Saxla
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}