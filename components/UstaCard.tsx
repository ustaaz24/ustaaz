"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TRANSLATIONS, Language } from "@/lib/translations";

// Daxili qəza-davamlı SVG ikonlar
const Phone = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MessageSquare = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const X = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Star = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckCircle = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

interface Props {
  craftsman?: any;
  usta?: any;
}

export default function UstaCard({ craftsman: propCraftsman, usta }: Props) {
  const currentUsta = propCraftsman || usta;

  // BÜTÜN HOOK-LAR HEÇ BİR İF ŞƏRTİ OLMADAN ƏN BAŞDA ÇAĞIRILMALIDIR! (React Qaydası)
  const [showFullProfileModal, setShowFullProfileModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [lang, setLang] = useState<Language>("az");
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  const initialReviews = currentUsta?.reviews || [
    { id: "r1", author: "Nigar Əliyeva", rating: 5, comment: "Çox peşəkar və vaxtında gələn ustadır. İşi keyfiyyətlə gördü.", date: "2025-01-14" },
  ];
  const [reviews, setReviews] = useState<any[]>(initialReviews);
  const [rating, setRating] = useState(currentUsta?.rating || 4.9);
  const [reviewCount, setReviewCount] = useState(currentUsta?.reviewCount || 35);

  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

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
    if (!currentUsta?.id) return;
    try {
      const saved = localStorage.getItem(`usta_reviews_${currentUsta.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const combined = [...parsed, ...initialReviews];
          setReviews(combined);
          const total = combined.reduce((acc: number, r: any) => acc + (r.rating || 5), 0);
          setRating(Number((total / combined.length).toFixed(1)));
          setReviewCount(combined.length);
        }
      }
    } catch {}
  }, [currentUsta?.id]);

  // Əgər usta məlumatı yoxdursa, yalnız bütün hook-lar təyin edildikdən sonra boş qaytarılır!
  if (!currentUsta) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.az;
  const ustaStatus = currentUsta.status || "active";

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev = {
      id: "rev_" + Date.now(),
      author: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    const total = updated.reduce((acc, r) => acc + r.rating, 0);
    setRating(Number((total / updated.length).toFixed(1)));
    setReviewCount(updated.length);

    try {
      const existingSaved = localStorage.getItem(`usta_reviews_${currentUsta.id}`);
      const list = existingSaved ? JSON.parse(existingSaved) : [];
      localStorage.setItem(`usta_reviews_${currentUsta.id}`, JSON.stringify([newRev, ...list]));
    } catch {}

    setNewAuthor("");
    setNewComment("");
    setNewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3500);
  };

  const rawPhone = currentUsta.phone || "+994501234567";
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, "");
  const whatsappNum = currentUsta.whatsapp || cleanPhone.replace("+", "");
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    `Salam ${currentUsta.name}! Sizi UstaAz saytında gördüm. Xidmətinizlə bağlı əlaqə saxlamaq istəyirəm.`
  )}`;

  const avatarUrl = currentUsta.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUsta.name)}&background=2563EB&color=fff&size=200`;

  return (
    <div className="bg-[#121c2e] dark:bg-[#121c2e] border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition flex flex-col justify-between relative group text-white">
      {/* 👑 VIP Usta Badge */}
      {currentUsta.isVip && (
        <span className="absolute -top-3.5 left-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 tracking-wide">
          👑 VIP Usta
        </span>
      )}

      <div>
        <div className="flex items-start gap-4 mb-4">
          <div className="relative cursor-pointer" onClick={() => setShowFullProfileModal(true)}>
            {!imgError ? (
              <img
                src={avatarUrl}
                alt={currentUsta.name}
                onError={() => setImgError(true)}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 bg-slate-800 shadow"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center border-2 border-slate-700 shadow">
                {currentUsta.name ? currentUsta.name.charAt(0) : "U"}
              </div>
            )}
            {currentUsta.verified !== false && (
              <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 border-2 border-[#121c2e]">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                onClick={() => setShowFullProfileModal(true)}
                className="font-black text-base text-white truncate cursor-pointer hover:text-blue-400 transition"
              >
                {currentUsta.name}
              </h3>
              {currentUsta.verified !== false && (
                <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                  ✓
                </span>
              )}
            </div>

            <p className="text-xs font-bold text-amber-400 mt-0.5 truncate">
              {currentUsta.category}
            </p>

            <p className="text-[11px] text-slate-400 mt-1 truncate">
              📍 {currentUsta.district ? `${currentUsta.city}, ${currentUsta.district}` : currentUsta.city}
            </p>
          </div>
        </div>

        {/* 2 Sütun: Reytinq və Status */}
        <div className="grid grid-cols-2 gap-2 bg-[#1a263d] p-2.5 rounded-2xl border border-slate-700/60 text-center mb-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t?.rating_col || "Reytinq"}</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-black text-white">{rating}</span>
              <span className="text-[10px] text-slate-400">({reviewCount})</span>
            </div>
          </div>

          <div className="border-l border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t?.status_label || "Status"}</span>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-bold">
              {ustaStatus === "busy" ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="text-amber-400 text-[11px]">{t?.status_busy || "Məşğul"}</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-400 text-[11px]">{t?.status_active || "Aktiv"}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Haqqında mətni */}
        {currentUsta.description && (
          <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {currentUsta.description}
          </p>
        )}

        {/* Bacarıq teqləri */}
        {Array.isArray(currentUsta.skills) && currentUsta.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {currentUsta.skills.slice(0, 3).map((skill: string, idx: number) => (
              <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                ✓ {skill}
              </span>
            ))}
            {currentUsta.skills.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">+{currentUsta.skills.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Əlaqə düymələri */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow"
          >
            <span>💬 WhatsApp</span>
          </a>

          <a
            href={`tel:${cleanPhone}`}
            className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Zəng Et</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setShowFullProfileModal(true)}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>👁️ Ətraflı Bax və Rəy Yaz</span>
        </button>
      </div>

      {/* MODAL: TAM PROFİL VƏ RƏYLƏR */}
      {showFullProfileModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowFullProfileModal(false)}
        >
          <div
            className="bg-[#121c2e] border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 text-white relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFullProfileModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-5 mb-5">
              <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center overflow-hidden border border-slate-700">
                {!imgError ? (
                  <img src={avatarUrl} alt={currentUsta.name} className="w-full h-full object-cover" />
                ) : (
                  currentUsta.name ? currentUsta.name.charAt(0) : "U"
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white">{currentUsta.name}</h3>
                  {currentUsta.isVip && (
                    <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                      👑 VIP
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-400 font-bold">{currentUsta.category}</p>
                <p className="text-xs text-slate-400 mt-1">📍 {currentUsta.city} {currentUsta.district ? `(${currentUsta.district})` : ""}</p>
              </div>
            </div>

            {/* USTA HAQQINDA */}
            <div className="mb-5 bg-[#1a263d] p-4 rounded-2xl border border-slate-700/80">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span>📝</span> USTA HAQQINDA
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentUsta.description || "12 illik təcrübəli santexnikəm. Boru sızması, kran dəyişimi, kanalizasiya xətlərinin açılması, isti döşəmə və duş kabin montajı."}
              </p>
            </div>

            {/* GÖSTƏRİLƏN XİDMƏTLƏR VƏ BACARIQLAR */}
            {Array.isArray(currentUsta.skills) && currentUsta.skills.length > 0 && (
              <div className="mb-5 bg-[#1a263d] p-4 rounded-2xl border border-slate-700/80">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                  <span>🔧</span> GÖSTƏRİLƏN XİDMƏTLƏR VƏ BACARIQLAR
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentUsta.skills.map((s: string, idx: number) => (
                    <span key={idx} className="bg-[#121c2e] text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700 shadow-sm flex items-center gap-1">
                      <span className="text-emerald-400 font-bold">✓</span> {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rəylər */}
            <div className="border-t border-slate-800 pt-5">
              <h4 className="text-sm font-bold text-white mb-3">Müştəri Rəyləri ({reviews.length})</h4>

              <form onSubmit={handleAddReview} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-4 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">Usta üçün rəy yazın:</span>
                {reviewSuccess && (
                  <p className="text-xs text-emerald-400 font-bold">✓ Rəyiniz uğurla əlavə olundu!</p>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Adınız və Soyadınız"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                  />
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 ulduz)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 ulduz)</option>
                    <option value={3}>⭐⭐⭐ (3 ulduz)</option>
                    <option value={2}>⭐⭐ (2 ulduz)</option>
                    <option value={1}>⭐ (1 ulduz)</option>
                  </select>
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Görülən iş və usta haqqında fikirləriniz..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs outline-none text-white focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow text-xs cursor-pointer"
                >
                  {t?.leave_review || "Rəy Bildir"}
                </button>
              </form>

              <div className="space-y-2.5 max-h-48 overflow-y-auto">
                {reviews.map((r: any, i: number) => (
                  <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">{r.author}</span>
                      <span className="text-amber-400">{"★".repeat(r.rating || 5)}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 text-center border-t border-slate-800 mt-4">
              <Link
                href={`/ustalar/${currentUsta.id}`}
                className="text-xs text-blue-400 hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>Ayrı səhifədə profilə bax (/ustalar/{currentUsta.id}) →</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
