"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAccounts, saveAccount, saveUsta, normalizePhone } from "@/lib/db";

// DAXİLİ TƏRCÜMƏ LÜĞƏTİ
type LangType = "az" | "ru" | "en";

const LOCAL_TEXTS = {
  az: {
    reg_header_title: "Hesab Yarat",
    reg_header_subtitle: "Müştəri və ya usta kimi platformaya qoşulun",
    tab_customer: "Müştəri Hesabı",
    tab_usta: "Usta Hesabı",
    avatar_upload_label: "Profil Şəkli (Usta üçün məcburidir)",
    select_photo: "Şəkil Seçin",
    change_photo: "Şəkli Dəyiş",
    photo_hint: "Aydın və keyfiyyətli profil şəkli yükləyin (JPG, PNG)",
    name_label: "Ad və Soyad",
    name_placeholder_customer: "Məs: Əli Məmmədov",
    name_placeholder_usta: "Məs: Elşən Cavadov",
    phone_label: "Telefon Nömrəsi",
    category_select_label: "Sənət / Xidmət Növü",
    city_select_label: "Şəhər / Rayon",
    district_select_label: "Bakı üzrə Qəsəbə (istəyə görə)",
    all_baku: "Bütün Bakı (qəsəbə göstərilməsin)",
    experience_input_label: "Təcrübə (il)",
    pass_label: "Şifrə",
    desc_input_label: "Haqqınızda məlumat və görülən xidmətlər",
    desc_placeholder: "Hansı xidmətləri görürsünüz, zəmanət verirsinizmi...",
    customer_submit_btn: "Müştəri Kimi Qeydiyyatdan Keç",
    usta_submit_btn: "Usta Kimi Qeydiyyatdan Keç",
    avatar_required_error: "Usta qeydiyyatı üçün profil şəkli mütləqdir!",
    upload_error: "Şəkil yüklənərkən xəta baş verdi.",
    success_title: "Qeydiyyat Uğurla Tamamlandı!",
    customer_success_desc: "Müştəri hesabınız aktivləşdirildi. İndi istədiyiniz ustanı axtarıb birbaşa əlaqə saxlaya bilərsiniz.",
    usta_success_desc: "Usta hesabınız aktivləşdirildi! Profiliniz usta kataloqunda yerləşdirildi və müştərilər sizinlə əlaqə saxlaya bilərlər.",
    go_home: "Əsas Səhifəyə Get",
    view_catalog: "Usta Kataloquna Bax"
  },
  ru: {
    reg_header_title: "Создать аккаунт",
    reg_header_subtitle: "Зарегистрируйтесь как клиент или мастер",
    tab_customer: "Клиентский аккаунт",
    tab_usta: "Аккаунт мастера",
    avatar_upload_label: "Фото профиля (обязательно для мастера)",
    select_photo: "Выбрать фото",
    change_photo: "Изменить фото",
    photo_hint: "Загрузите четкое фото профиля (JPG, PNG)",
    name_label: "Имя и Фамилия",
    name_placeholder_customer: "Напр: Али Мамедов",
    name_placeholder_usta: "Напр: Эльшан Джавадов",
    phone_label: "Номер телефона",
    category_select_label: "Специальность / Услуга",
    city_select_label: "Город / Район",
    district_select_label: "Поселок в Баку (по желанию)",
    all_baku: "Весь Баку (без указания поселка)",
    experience_input_label: "Опыт (лет)",
    pass_label: "Пароль",
    desc_input_label: "О себе и оказываемых услугах",
    desc_placeholder: "Какие услуги вы оказываете, даете ли гарантию...",
    customer_submit_btn: "Зарегистрироваться как клиент",
    usta_submit_btn: "Зарегистрироваться как мастер",
    avatar_required_error: "Для регистрации мастера фото обязательно!",
    upload_error: "Ошибка при загрузке фото.",
    success_title: "Регистрация успешно завершена!",
    customer_success_desc: "Ваш клиентский аккаунт активен. Теперь вы можете находить мастеров.",
    usta_success_desc: "Ваш аккаунт мастера активен! Вы добавлены в каталог мастеров.",
    go_home: "На главную",
    view_catalog: "В каталог мастеров"
  },
  en: {
    reg_header_title: "Create Account",
    reg_header_subtitle: "Sign up as a customer or craftsman",
    tab_customer: "Customer Account",
    tab_usta: "Craftsman Account",
    avatar_upload_label: "Profile Photo (Required for craftsman)",
    select_photo: "Select Photo",
    change_photo: "Change Photo",
    photo_hint: "Upload a clear profile photo (JPG, PNG)",
    name_label: "Full Name",
    name_placeholder_customer: "E.g. Ali Mammadov",
    name_placeholder_usta: "E.g. Elshan Javadov",
    phone_label: "Phone Number",
    category_select_label: "Service / Trade",
    city_select_label: "City / Region",
    district_select_label: "Baku Settlement (optional)",
    all_baku: "All Baku (no settlement)",
    experience_input_label: "Experience (years)",
    pass_label: "Password",
    desc_input_label: "About you and provided services",
    desc_placeholder: "What services do you provide, do you offer warranty...",
    customer_submit_btn: "Register as Customer",
    usta_submit_btn: "Register as Craftsman",
    avatar_required_error: "Profile photo is required for craftsman registration!",
    upload_error: "Error uploading image.",
    success_title: "Registration Completed!",
    customer_success_desc: "Your customer account is now active. You can find craftsmen now.",
    usta_success_desc: "Your craftsman account is now active! You are listed in the catalog.",
    go_home: "Go to Home",
    view_catalog: "View Craftsmen Catalog"
  }
};

// BÜTÜN AZƏRBAYCAN ŞƏHƏR VƏ RAYONLARI (A-Z)
export const CITIES = [
  "Abşeron", "Ağcabədi", "Ağdam", "Ağdaş", "Ağstafa", "Ağsu", "Astara",
  "Babək", "Bakı", "Balakən", "Bərdə", "Beyləqan", "Biləsuvar",
  "Cəbrayıl", "Cəlilabad", "Culfa", "Daşkəsən", "Füzuli",
  "Gədəbəy", "Gəncə", "Goranboy", "Göyçay", "Göygöl", "Hacıqabul",
  "Xaçmaz", "Xankəndi", "Xızı", "Xocalı", "Xocavənd", "Xırdalan",
  "İmişli", "İsmayıllı", "Kəlbəcər", "Kəngərli", "Kürdəmir",
  "Qax", "Qazax", "Qəbələ", "Qobustan", "Quba", "Qubadlı", "Qusar",
  "Laçın", "Lerik", "Lənkəran", "Masallı", "Mingəçevir",
  "Naftalan", "Naxçıvan", "Neftçala", "Oğuz", "Ordubad",
  "Saatlı", "Sabirabad", "Salyan", "Samux", "Sədərək", "Siyəzən", "Sumqayıt",
  "Şabran", "Şahbuz", "Şamaxı", "Şəki", "Şəmkir", "Şərur", "Şirvan", "Şuşa",
  "Tərtər", "Tovuz", "Ucar", "Yardımlı", "Yevlax",
  "Zaqatala", "Zəngilan", "Zərdab"
];

// BAKININ RAYON VƏ QƏSƏBƏLƏRİ
export const BAKI_DISTRICTS = [
  "Bütün Bakı (şəhər və qəsəbələr)",
  "Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)",
  "Nərimanov (Gənclik / Nərimanov / Montin)",
  "Nəsimi (28 May / Memar Əcəmi / Kubinka)",
  "Xətai (Əhmədli / Həzi Aslanov / Ağ Şəhər / Köhnə Günəşli)",
  "Səbail (İçərişəhər / Sahil / Badamdar / Bayıl)",
  "Binəqədi (Dərnəgül / Azadlıq / Biləcəri / Rəsulzadə / Binəqədi qəs.)",
  "Nizami (Neftçilər / Qara Qarayev / Xalqlar Dostluğu / Keşlə)",
  "Sabunçu (Bakıxanov / Zabrat / Sabunçu qəs. / Maştağa / Nardaran / Bilgəh / Pirşağı)",
  "Suraxanı (Qaraçuxur / Əmircan / Hövsan / Zığ / Bülbülə / Yeni Günəşli)",
  "Xəzər (Mərdəkan / Şüvəlan / Buzovna / Qala / Binə / Türkan / Zirə)",
  "Qaradağ (Lökbatan / Səngəçal / Sahil / Qobustan / Puta)",
  "Pirallahı (Pirallahı / Gürgən / Çilov adası)",
  "Xırdalan (Xırdalan şəhəri / Heydər Əliyev pr. / Quşçuluq)",
  "Masazır (Masazır qəs. / Duz gölü / Yeni Bakı)",
  "Saray / Mehdiabad / Digah / Novxanı"
];

// KATEQORİYALAR
export const CATEGORIES = [
  { id: "1", name: "Santexnik", icon: "🔧" },
  { id: "2", name: "Elektrik ustası", icon: "⚡" },
  { id: "3", name: "Kombi ustası", icon: "🔥" },
  { id: "4", name: "Kondisioner ustası", icon: "❄️" },
  { id: "5", name: "Mebel ustası", icon: "🪑" },
  { id: "6", name: "Kafel / Metlax", icon: "🧱" },
  { id: "7", name: "Ev təmizliyi", icon: "🧹" },
  { id: "8", name: "Qaynaqçı", icon: "👨‍🏭" },
  { id: "9", name: "Rəngsaz / Malyar", icon: "🎨" }
];

const CheckCircle = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Upload = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const User = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const Briefcase = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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

export default function QeydiyyatPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"customer" | "usta">("customer");
  const [lang, setLang] = useState<LangType>("az");

  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("+994 ");
  const [custCity, setCustCity] = useState("Bakı");
  const [custPass, setCustPass] = useState("");
  const [showCustPass, setShowCustPass] = useState(false);

  const [ustaName, setUstaName] = useState("");
  const [ustaPhone, setUstaPhone] = useState("+994 ");
  const [ustaCity, setUstaCity] = useState("Bakı");
  const [ustaDistrict, setUstaDistrict] = useState("");
  const [ustaCategory, setUstaCategory] = useState("Santexnik");
  const [ustaExperience, setUstaExperience] = useState("5");
  const [ustaPass, setUstaPass] = useState("");
  const [showUstaPass, setShowUstaPass] = useState(false);
  const [ustaAvatar, setUstaAvatar] = useState("");
  const [ustaDesc, setUstaDesc] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [registeredRole, setRegisteredRole] = useState<"customer" | "usta">("customer");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("app_lang") as LangType;
      if (savedLang && ["az", "ru", "en"].includes(savedLang)) {
        setLang(savedLang);
      }
    } catch {}

    const handleLangChange = (e: any) => {
      if (e.detail && ["az", "ru", "en"].includes(e.detail)) {
        setLang(e.detail);
      }
    };

    window.addEventListener("langChange", handleLangChange);
    return () => window.removeEventListener("langChange", handleLangChange);
  }, []);

  const t = LOCAL_TEXTS[lang] || LOCAL_TEXTS.az;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUstaAvatar(reader.result as string);
        setAvatarError("");
      };
      reader.onerror = () => {
        setAvatarError(t.upload_error);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    const norm = normalizePhone(custPhone);
    if (!norm || norm.length < 7) {
      setPhoneError("Zəhmət olmasa düzgün telefon nömrəsi daxil edin.");
      return;
    }

    setIsSubmitting(true);

    try {
      const accounts = await getAccounts();
      const alreadyExists = accounts.some((a) => normalizePhone(a.phone) === norm);
      if (alreadyExists) {
        setPhoneError("⚠️ Bu telefon nömrəsi ilə artıq qeydiyyatdan keçilib! Zəhmət olmasa daxil olun və ya başqa nömrə yazın.");
        setIsSubmitting(false);
        return;
      }

      const newCustomer = {
        id: "cust_" + Date.now(),
        name: custName,
        phone: custPhone,
        city: custCity,
        password: custPass,
        role: "customer",
        isLoggedIn: true,
        balance: 0,
        createdAt: new Date().toISOString(),
      };

      await saveAccount(newCustomer);

      try {
        localStorage.setItem("current_user", JSON.stringify(newCustomer));
        window.dispatchEvent(new CustomEvent("authChange"));
      } catch {}

      setRegisteredRole("customer");
      setSubmitted(true);
    } catch (err) {
      setPhoneError("Qeydiyyat zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUstaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!ustaAvatar) {
      setAvatarError(t.avatar_required_error);
      return;
    }

    const norm = normalizePhone(ustaPhone);
    if (!norm || norm.length < 7) {
      setPhoneError("Zəhmət olmasa düzgün telefon nömrəsi daxil edin.");
      return;
    }

    setIsSubmitting(true);

    try {
      const accounts = await getAccounts();
      const alreadyExists = accounts.some((a) => normalizePhone(a.phone) === norm);
      if (alreadyExists) {
        setPhoneError("⚠️ Bu telefon nömrəsi ilə artıq qeydiyyatdan keçilib! Zəhmət olmasa daxil olun və ya başqa nömrə yazın.");
        setIsSubmitting(false);
        return;
      }

      const newUsta = {
        id: "usta_" + Date.now(),
        name: ustaName,
        phone: ustaPhone,
        city: ustaCity,
        district: ustaCity === "Bakı" ? ustaDistrict : "",
        category: ustaCategory,
        experienceYears: Number(ustaExperience) || 5,
        password: ustaPass,
        avatar: ustaAvatar,
        description: ustaDesc || "Peşəkar usta xidməti.",
        role: "usta",
        isLoggedIn: true,
        balance: 15.0,
        status: "active",
        isVip: false,
        verified: true,
        rating: 5.0,
        reviewCount: 1,
        skills: ["Sürətli xidmət", "Zəmanətli iş"],
        createdAt: new Date().toISOString(),
      };

      await saveAccount(newUsta);
      await saveUsta(newUsta);

      try {
        localStorage.setItem("current_user", JSON.stringify(newUsta));
        window.dispatchEvent(new CustomEvent("authChange"));
      } catch {}

      setRegisteredRole("usta");
      setSubmitted(true);
    } catch (err) {
      setPhoneError("Qeydiyyat zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-xl space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t.success_title}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {registeredRole === "usta" ? t.usta_success_desc : t.customer_success_desc}
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow"
            >
              {t.go_home}
            </Link>
            {registeredRole === "usta" && (
              <Link
                href="/ustalar"
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition"
              >
                {t.view_catalog}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] py-12 px-4 transition-colors">
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.reg_header_title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.reg_header_subtitle}
          </p>
        </div>

        {/* ROL SEÇİMİ */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setAccountType("customer")}
            className={`py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              accountType === "customer"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span className="font-bold">{t.tab_customer}</span>
          </button>

          <button
            type="button"
            onClick={() => setAccountType("usta")}
            className={`py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              accountType === "usta"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="font-bold">{t.tab_usta}</span>
          </button>
        </div>

        {/* 1. MÜŞTƏRİ QEYDİYYAT FORMASI */}
        {accountType === "customer" && (
          <form onSubmit={handleCustomerSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.name_label} *
              </label>
              <input
                type="text"
                required
                placeholder={t.name_placeholder_customer}
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
                type="tel"
                required
                value={custPhone}
                onChange={(e) => {
                  setCustPhone(e.target.value);
                  setPhoneError("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              />
              {phoneError && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs rounded-xl font-bold">
                  {phoneError}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.city_select_label} *
              </label>
              <select
                value={custCity}
                onChange={(e) => setCustCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white cursor-pointer"
              >
                {(CITIES || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.pass_label} *
              </label>
              <div className="relative">
                <input
                  type={showCustPass ? "text" : "password"}
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
                  {showCustPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow cursor-pointer"
            >
              {isSubmitting ? "Yadda saxlanılır..." : t.customer_submit_btn}
            </button>
          </form>
        )}

        {/* 2. USTA QEYDİYYAT FORMASI */}
        {accountType === "usta" && (
          <form onSubmit={handleUstaSubmit} className="space-y-4">
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-orange-900 dark:text-orange-300 mb-2">
                {t.avatar_upload_label} *
              </label>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-orange-300 dark:border-orange-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {ustaAvatar ? (
                    <img src={ustaAvatar} alt="Usta Profil" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-6 h-6 text-orange-400" />
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    id="usta-avatar-input"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="usta-avatar-input"
                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{ustaAvatar ? t.change_photo : t.select_photo}</span>
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {t.photo_hint}
                  </p>
                </div>
              </div>

              {avatarError && (
                <p className="text-xs text-rose-500 font-bold mt-2">{avatarError}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.name_label} *
              </label>
              <input
                type="text"
                required
                placeholder={t.name_placeholder_usta}
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
                type="tel"
                required
                value={ustaPhone}
                onChange={(e) => {
                  setUstaPhone(e.target.value);
                  setPhoneError("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
              />
              {phoneError && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs rounded-xl font-bold">
                  {phoneError}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.category_select_label} *
              </label>
              <select
                value={ustaCategory}
                onChange={(e) => setUstaCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white cursor-pointer"
              >
                {(CATEGORIES || []).map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.city_select_label} *
              </label>
              <select
                value={ustaCity}
                onChange={(e) => {
                  setUstaCity(e.target.value);
                  if (e.target.value !== "Bakı") setUstaDistrict("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white cursor-pointer"
              >
                {(CITIES || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {ustaCity === "Bakı" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.district_select_label}
                </label>
                <select
                  value={ustaDistrict}
                  onChange={(e) => setUstaDistrict(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="">{t.all_baku}</option>
                  {(BAKI_DISTRICTS || []).map((d) => (
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
                min="1"
                max="50"
                required
                value={ustaExperience}
                onChange={(e) => setUstaExperience(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.desc_input_label}
              </label>
              <textarea
                rows={3}
                placeholder={t.desc_placeholder}
                value={ustaDesc}
                onChange={(e) => setUstaDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs outline-none focus:border-orange-500 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t.pass_label} *
              </label>
              <div className="relative">
                <input
                  type={showUstaPass ? "text" : "password"}
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
                  {showUstaPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow cursor-pointer"
            >
              {isSubmitting ? "Qeydiyyat aparılır..." : t.usta_submit_btn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
