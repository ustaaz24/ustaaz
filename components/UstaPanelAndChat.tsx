"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CITIES as DATA_CITIES, BAKI_DISTRICTS as DATA_DISTRICTS } from "@/lib/data";

// Qəza-davamlı ehtiyat massivlər
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

// Daxili SVG İkonlar
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

const Send = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const Settings = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const Crown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18h18M4 14l3-8 5 5 5-5 3 8H4z" />
  </svg>
);

const ShieldCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
  </svg>
);

const QrCode = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const Check = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface ChatMessage {
  id: string;
  sender: "customer" | "usta" | "operator";
  text: string;
  timestamp: string;
  read: boolean;
}

interface ChatConversation {
  id: string;
  customerName: string;
  customerPhone: string;
  ustaId: string;
  ustaName: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export default function UstaPanelAndChat() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isOperatorModalOpen, setIsOperatorModalOpen] = useState(false);

  // VIP / Mavi Tik Ödəniş Modalı
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    type: "vip" | "verified";
    title: string;
    cost: number;
    period: string;
  }>({
    isOpen: false,
    type: "vip",
    title: "",
    cost: 5,
    period: "həftə",
  });

  // Operator Chat State
  const [operatorMessages, setOperatorMessages] = useState<ChatMessage[]>([
    {
      id: "op_init",
      sender: "operator",
      text: "Salam! UstaAz Onlayn Dəstək Xidmətinə xoş gəlmisiniz. Sizə necə kömək edə bilərəm?",
      timestamp: "İndi",
      read: true,
    },
  ]);
  const [operatorInput, setOperatorInput] = useState("");
  const [isOperatorTyping, setIsOperatorTyping] = useState(false);

  // Ustanın Çatları
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeChat, setActiveChat] = useState<ChatConversation | null>(null);
  const [replyText, setReplyText] = useState("");

  // Usta İdarəetmə Paneli State-ləri
  const [ustaStatus, setUstaStatus] = useState<"active" | "busy" | "inactive">("active");
  const [isVipActive, setIsVipActive] = useState(false);
  const [isVerifiedActive, setIsVerifiedActive] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number>(15.0);

  // Usta Profil Redaktə Sahələri (ŞƏKİLDƏKİ "USTA HAQQINDA" VƏ "BACARIQLAR" TEQLƏRİ)
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("Bakı");
  const [editDistrict, setEditDistrict] = useState("Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)");
  const [editDescription, setEditDescription] = useState(
    "12 illik təcrübəli santexnikəm. Boru sızması, kran dəyişimi, kanalizasiya xətlərinin açılması, isti döşəmə və duş kabin montajı."
  );
  const [editSkills, setEditSkills] = useState<string[]>([
    "Boru təmiri",
    "Kran dəyişimi",
    "Kanalizasiya",
    "Su sayğacı",
    "Vanna quraşdırılması"
  ]);
  const [newSkillText, setNewSkillText] = useState("");

  const [editPassword, setEditPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [panelMessage, setPanelMessage] = useState("");

  // İstifadəçini oxu
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("current_user");
        if (stored) {
          const u = JSON.parse(stored);
          setCurrentUser(u);
          if (u.role === "usta") {
            setEditName(u.name || "");
            setEditPhone(u.phone || "");
            setEditCity(u.city || "Bakı");
            setEditDistrict(u.district || "Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)");
            if (u.description) {
              setEditDescription(u.description);
            }
            if (Array.isArray(u.skills) && u.skills.length > 0) {
              setEditSkills(u.skills);
            }
            setAvatarUrl(u.avatar || "");
            setUstaStatus(u.status || "active");
            setIsVipActive(!!u.isVip);
            setIsVerifiedActive(!!u.verified);
            setWalletBalance(u.balance !== undefined ? Number(u.balance) : 25.0);
          }
        } else {
          setCurrentUser(null);
        }
      } catch {}
    };

    loadUser();
    window.addEventListener("authChange", loadUser);
    return () => window.removeEventListener("authChange", loadUser);
  }, []);

  // Mesajları yüklə
  useEffect(() => {
    if (!currentUser || currentUser.role !== "usta") return;

    try {
      const stored = localStorage.getItem(`usta_chats_${currentUser.id || currentUser.phone}`);
      if (stored) {
        setConversations(JSON.parse(stored));
      } else {
        const dummy: ChatConversation[] = [
          {
            id: "chat_demo_1",
            customerName: "Rəşad Quliyev",
            customerPhone: "+994502223344",
            ustaId: currentUser.id || "1",
            ustaName: currentUser.name || "Usta",
            lastMessage: "Salam usta, boru sızır, bu gün gələ bilərsiniz?",
            lastTimestamp: "14:20",
            unreadCount: 1,
            messages: [
              {
                id: "m1",
                sender: "customer",
                text: "Salam usta, boru sızır, bu gün gələ bilərsiniz?",
                timestamp: "14:20",
                read: false,
              },
            ],
          },
        ];
        setConversations(dummy);
        localStorage.setItem(`usta_chats_${currentUser.id || currentUser.phone}`, JSON.stringify(dummy));
      }
    } catch {}
  }, [currentUser]);

  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const openConversation = (conv: ChatConversation) => {
    const updated = conversations.map((c) => {
      if (c.id === conv.id) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map((m) => ({ ...m, read: true })),
        };
      }
      return c;
    });
    setConversations(updated);
    setActiveChat({ ...conv, unreadCount: 0 });
    try {
      localStorage.setItem(`usta_chats_${currentUser.id || currentUser.phone}`, JSON.stringify(updated));
    } catch {}
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChat) return;

    const newMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      sender: "usta",
      text: replyText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };

    const updated = conversations.map((c) => {
      if (c.id === activeChat.id) {
        return {
          ...c,
          lastMessage: newMsg.text,
          lastTimestamp: newMsg.timestamp,
          messages: [...c.messages, newMsg],
        };
      }
      return c;
    });

    setConversations(updated);
    setActiveChat({ ...activeChat, messages: [...activeChat.messages, newMsg], lastMessage: newMsg.text });
    setReplyText("");

    try {
      localStorage.setItem(`usta_chats_${currentUser.id || currentUser.phone}`, JSON.stringify(updated));
    } catch {}
  };

  const handleSendOperatorMessage = (textToSend?: string) => {
    const text = (textToSend || operatorInput).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: "op_" + Date.now(),
      sender: "customer",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };

    setOperatorMessages((prev) => [...prev, userMsg]);
    setOperatorInput("");
    setIsOperatorTyping(true);

    setTimeout(() => {
      let botReply = "Müraciətiniz qeydə alındı. Dəstək komandamız dərhal köməklik göstərəcək.";
      const lower = text.toLowerCase();

      if (lower.includes("usta tap") || lower.includes("axtar")) {
        botReply = "Kataloq səhifəmizdə 'Xidmət' və 'Şəhər' seçərək peşəkar ustaları dərhal tapa və zəng vura bilərsiniz.";
      } else if (lower.includes("qeydiyyat") || lower.includes("usta olmaq")) {
        botReply = "Usta olmaq üçün 'Qeydiyyatdan Keç' menyusundan 'Usta Hesabı' bölməsini doldurub profil şəklinizi əlavə edərək qeydiyyatdan keçə bilərsiniz.";
      } else if (lower.includes("vip") || lower.includes("mavi tik") || lower.includes("ödəniş")) {
        botReply = "VIP status profilinizi kataloqun ən üst pilləsinə qaldırır. Usta Panelinizdən bir kliklə təsdiqləyib aktivləşdirə bilərsiniz.";
      } else if (lower.includes("qiymət") || lower.includes("pul")) {
        botReply = "UstaAz platformasında qiymətlər görüləcək işin həcminə görə birbaşa usta ilə razılaşdırılır.";
      }

      const replyMsg: ChatMessage = {
        id: "op_" + Date.now(),
        sender: "operator",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      };

      setOperatorMessages((prev) => [...prev, replyMsg]);
      setIsOperatorTyping(false);
    }, 1000);
  };

  // Usta Məlumatlarını və Bacarıqlarını Yadda Saxla
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated = {
      ...currentUser,
      name: editName,
      phone: editPhone,
      city: editCity,
      district: editCity === "Bakı" ? editDistrict : "",
      description: editDescription,
      skills: editSkills,
      avatar: avatarUrl || currentUser.avatar,
      status: ustaStatus,
      isVip: isVipActive,
      verified: isVerifiedActive,
      balance: walletBalance,
    };

    if (editPassword) {
      updated.password = editPassword;
    }

    setCurrentUser(updated);

    try {
      localStorage.setItem("current_user", JSON.stringify(updated));

      // Kataloqdakı usta siyahısında da yenilə
      const custom = localStorage.getItem("custom_ustalar");
      let list = custom ? JSON.parse(custom) : [];
      if (Array.isArray(list)) {
        const idx = list.findIndex(
          (u: any) => String(u.id) === String(updated.id) || String(u.phone) === String(updated.phone)
        );
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...updated };
        } else {
          list.push(updated);
        }
        localStorage.setItem("custom_ustalar", JSON.stringify(list));
      }

      window.dispatchEvent(new CustomEvent("authChange"));
    } catch {}

    setPanelMessage("Məlumatlar, haqqında mətni və bacarıqlar uğurla yeniləndi!");
    setTimeout(() => setPanelMessage(""), 3500);
  };

  const handleAddSkill = () => {
    const trimmed = newSkillText.trim();
    if (trimmed && !editSkills.includes(trimmed)) {
      setEditSkills([...editSkills, trimmed]);
      setNewSkillText("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditSkills(editSkills.filter((s) => s !== skillToRemove));
  };

  const handleOpenVipModal = () => {
    if (isVipActive) {
      if (confirm("VIP statusu ləğv etmək istədiyinizə əminsiniz?")) {
        setIsVipActive(false);
        if (currentUser) {
          const updated = { ...currentUser, isVip: false };
          setCurrentUser(updated);
          localStorage.setItem("current_user", JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("authChange"));
        }
        setPanelMessage("VIP status ləğv edildi.");
        setTimeout(() => setPanelMessage(""), 3000);
      }
      return;
    }

    setPaymentModal({
      isOpen: true,
      type: "vip",
      title: "👑 VIP Usta Statusu",
      cost: 5.0,
      period: "həftə",
    });
  };

  const handleOpenVerifiedModal = () => {
    if (isVerifiedActive) {
      if (confirm("Mavi Tik təsdiq nişanını deaktiv etmək istədiyinizə əminsiniz?")) {
        setIsVerifiedActive(false);
        if (currentUser) {
          const updated = { ...currentUser, verified: false };
          setCurrentUser(updated);
          localStorage.setItem("current_user", JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("authChange"));
        }
        setPanelMessage("Mavi Tik deaktiv edildi.");
        setTimeout(() => setPanelMessage(""), 3000);
      }
      return;
    }

    setPaymentModal({
      isOpen: true,
      type: "verified",
      title: "🛡️ Rəsmi Təsdiq (Mavi Tik)",
      cost: 15.0,
      period: "ay",
    });
  };

  const handleConfirmPayment = () => {
    if (walletBalance < paymentModal.cost) {
      alert("Balansınızda kifayət qədər vəsait yoxdur. Zəhmət olmasa balansı artırın.");
      return;
    }

    const newBalance = Number((walletBalance - paymentModal.cost).toFixed(2));
    setWalletBalance(newBalance);

    let updated = { ...currentUser, balance: newBalance };

    if (paymentModal.type === "vip") {
      setIsVipActive(true);
      updated.isVip = true;
      setPanelMessage(`Təbriklər! 👑 VIP Status aktivləşdirildi! Balansdan ${paymentModal.cost} AZN çıxıldı.`);
    } else {
      setIsVerifiedActive(true);
      updated.verified = true;
      setPanelMessage(`Təbriklər! 🛡️ Mavi Tik aktivləşdirildi! Balansdan ${paymentModal.cost} AZN çıxıldı.`);
    }

    setCurrentUser(updated);
    try {
      localStorage.setItem("current_user", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("authChange"));
    } catch {}

    setPaymentModal({ ...paymentModal, isOpen: false });
    setTimeout(() => setPanelMessage(""), 4000);
  };

  const ustaProfileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/ustalar/${currentUser?.id || "1"}`
    : `https://usta.az/ustalar/${currentUser?.id || "1"}`;

  return (
    <>
      {/* 1. SAĞ AŞAĞI DÜYMƏLƏR */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {currentUser?.isLoggedIn && currentUser?.role === "usta" && (
          <button
            onClick={() => setIsPanelOpen(true)}
            className="p-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-400/40 rounded-full shadow-2xl transition hover:scale-110 flex items-center justify-center group"
            title="Usta İdarəetmə Paneli (Status və Parametrlər)"
          >
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </button>
        )}

        {/* Canlı Operator Düyməsi */}
        <button
          onClick={() => setIsOperatorModalOpen(true)}
          className="p-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-full shadow-2xl transition hover:scale-105 flex items-center justify-center"
          title="Qaynar Xətt / Canlı Operator Dəstəyi"
        >
          <span className="text-xl leading-none">🎧</span>
        </button>

        {/* Ustanın Müştəri Çat Düyməsi */}
        {currentUser?.isLoggedIn && currentUser?.role === "usta" && (
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="relative p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl transition hover:scale-105 flex items-center justify-center"
            title="Müştəri Mesajları (Çat)"
          >
            <MessageSquare className="w-6 h-6" />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900 animate-bounce">
                {totalUnread}
              </span>
            )}
          </button>
        )}
      </div>

      {/* 2. ONLAYN OPERATOR ÇAT MODALI */}
      {isOperatorModalOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-full sm:max-w-md bg-[#121c2e] border border-slate-800 rounded-none sm:rounded-3xl shadow-2xl flex flex-col text-white overflow-hidden h-full sm:h-[550px] animate-scaleUp">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow">
                🎧
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-2">
                  <span>UstaAz Dəstək Operatoru</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </h3>
                <p className="text-[11px] text-emerald-400 font-bold">● Canlı və Onlayn</p>
              </div>
            </div>
            <button
              onClick={() => setIsOperatorModalOpen(false)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendOperatorMessage("Usta necə tapım?")}
              className="text-[11px] font-semibold bg-[#1a263d] hover:bg-blue-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition"
            >
              🔍 Usta necə tapım?
            </button>
            <button
              onClick={() => handleSendOperatorMessage("Usta qeydiyyatı necə aparılır?")}
              className="text-[11px] font-semibold bg-[#1a263d] hover:bg-blue-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition"
            >
              📋 Usta qeydiyyatı
            </button>
            <button
              onClick={() => handleSendOperatorMessage("VIP status və Mavi Tik")}
              className="text-[11px] font-semibold bg-[#1a263d] hover:bg-blue-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition"
            >
              👑 VIP Status
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b1120]/60">
            {operatorMessages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "customer" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    m.sender === "customer"
                      ? "bg-blue-600 text-white rounded-br-none shadow"
                      : "bg-[#1a263d] text-slate-200 border border-slate-800 rounded-bl-none shadow"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isOperatorTyping && (
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
              handleSendOperatorMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Operatora sualınızı yazın..."
              value={operatorInput}
              onChange={(e) => setOperatorInput(e.target.value)}
              className="flex-1 bg-[#1a263d] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 3. USTA ÇAT PƏNCƏRƏSİ */}
      {isChatOpen && currentUser?.role === "usta" && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-full sm:max-w-md bg-[#121c2e] border border-slate-800 rounded-none sm:rounded-3xl shadow-2xl flex flex-col text-white overflow-hidden h-full sm:h-[550px]">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-sm">Müştəri Mesajları ({conversations.length})</h3>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeChat ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900/50">
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{activeChat.customerName}</h4>
                  <a href={`tel:${activeChat.customerPhone}`} className="text-[11px] text-blue-400 hover:underline">
                    {activeChat.customerPhone}
                  </a>
                </div>
                <button
                  onClick={() => setActiveChat(null)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  ← Siyahı
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeChat.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === "usta" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs ${
                        m.sender === "usta"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-slate-800 text-slate-200 rounded-bl-none"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">{m.timestamp}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendReply} className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Müştəriyə cavab yazın..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="h-80 overflow-y-auto p-2 divide-y divide-slate-800/60">
              {conversations.length > 0 ? (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => openConversation(conv)}
                    className="p-3 rounded-2xl hover:bg-slate-800/50 cursor-pointer transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-amber-400 flex-shrink-0">
                        {conv.customerName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{conv.customerName}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{conv.lastMessage}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] text-slate-500">{conv.lastTimestamp}</span>
                      {conv.unreadCount > 0 && (
                        <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Hələ ki heç bir müştəri yazışması yoxdur.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. USTA İDARƏETMƏ PANELİ (YALNIZ USTA HESABLARINDA AÇILIR) */}
      {isPanelOpen && currentUser?.role === "usta" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121c2e] border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 text-white relative shadow-2xl">
            <button
              onClick={() => setIsPanelOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-5">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-400/30">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Usta İdarəetmə Paneli</h3>
                <p className="text-xs text-slate-400">Profil, İş Statusu, Balans və VIP Nizamlamalar</p>
              </div>
            </div>

            {/* USTANIN BALANSI */}
            <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 p-4 rounded-2xl border border-blue-500/30 mb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Usta Hesab Balansınız</span>
                <span className="text-2xl font-black text-white">{walletBalance.toFixed(2)} AZN</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const add = prompt("Balansınızı nə qədər artırmaq istəyirsiniz? (AZN):", "20");
                  if (add && !isNaN(Number(add)) && Number(add) > 0) {
                    const next = Number((walletBalance + Number(add)).toFixed(2));
                    setWalletBalance(next);
                    if (currentUser) {
                      const updated = { ...currentUser, balance: next };
                      setCurrentUser(updated);
                      localStorage.setItem("current_user", JSON.stringify(updated));
                      window.dispatchEvent(new CustomEvent("authChange"));
                    }
                    alert(`Balansınız uğurla ${add} AZN artırıldı!`);
                  }
                }}
                className="py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow"
              >
                + Balansı Artır
              </button>
            </div>

            {panelMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{panelMessage}</span>
              </div>
            )}

            {/* İŞ STATUSU (AKTİV / MƏŞĞUL / GİZLƏT) */}
            <div className="bg-[#1a263d] p-4 rounded-2xl border border-slate-700/80 mb-6">
              <label className="block text-xs font-black uppercase text-amber-400 mb-2">
                İş Rejimi & Görünmə Statusu:
              </label>
              <p className="text-[11px] text-slate-400 mb-3">
                Qeyri-aktiv (Gizlət) etsəniz, profiliniz kataloqda axtarışdan gizlədiləcəkdir.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUstaStatus("active")}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    ustaStatus === "active"
                      ? "bg-emerald-600 text-white border-emerald-500 shadow"
                      : "bg-[#121c2e] text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Aktiv</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUstaStatus("busy")}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    ustaStatus === "busy"
                      ? "bg-amber-500 text-slate-950 font-black border-amber-400 shadow"
                      : "bg-[#121c2e] text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Məşğul</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUstaStatus("inactive")}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    ustaStatus === "inactive"
                      ? "bg-rose-600 text-white border-rose-500 shadow"
                      : "bg-[#121c2e] text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <span>Gizlət</span>
                </button>
              </div>
            </div>

            {/* VIP və MAVİ TİK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-[#121c2e] border border-amber-400/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-amber-400 flex items-center gap-1">
                      <Crown className="w-4 h-4" /> 👑 VIP Status
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold">5 AZN / həftə</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Kataloqda ən üst sırada görün və qızılı çərçivə qazan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenVipModal}
                  className={`mt-3 py-1.5 px-3 rounded-xl text-xs font-bold transition ${
                    isVipActive
                      ? "bg-amber-500 text-slate-950 font-black"
                      : "bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-400/30"
                  }`}
                >
                  {isVipActive ? "VIP Aktivdir (Ləğv et)" : "👑 VIP Aktivləşdir"}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-[#121c2e] border border-blue-400/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-blue-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> 🛡️ Mavi Tik
                    </span>
                    <span className="text-[10px] text-blue-300 font-bold">15 AZN / ay</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Rəsmi təsdiq olunmuş və zəmanətli usta statusu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenVerifiedModal}
                  className={`mt-3 py-1.5 px-3 rounded-xl text-xs font-bold transition ${
                    isVerifiedActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-400/30"
                  }`}
                >
                  {isVerifiedActive ? "Mavi Tik Aktivdir (Ləğv et)" : "🛡️ Mavi Tik Al"}
                </button>
              </div>
            </div>

            {/* QR Vizitka Düyməsi */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-xs font-bold text-amber-400 flex items-center justify-center gap-2 transition"
              >
                <QrCode className="w-4 h-4" />
                <span>📱 Fərdi QR Vizitkamı Göstər</span>
              </button>
            </div>

            {/* PROFİL REDAKTƏ FORMASI */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Ad və Soyad:</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Əlaqə Telefonu:</label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              {/* BÜTÜN AZƏRBAYCAN ŞƏHƏR VƏ RAYONLARI (A-Z) */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Şəhər / Rayon:</label>
                <select
                  value={editCity}
                  onChange={(e) => {
                    setEditCity(e.target.value);
                    if (e.target.value !== "Bakı") setEditDistrict("");
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bakı seçildikdə alt qəsəbələr paneli */}
              {editCity === "Bakı" && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Bakı üzrə Rayon / Qəsəbə (istəyə görə):</label>
                  <select
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
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

              {/* 📝 1. USTA HAQQINDA (ŞƏKİLDƏ GÖSTƏRDİYİNİZ HİSSƏ) */}
              <div className="bg-[#1a263d]/80 p-3.5 rounded-2xl border border-slate-700/80">
                <label className="text-xs text-amber-400 font-bold mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                  <span>📝</span> Usta Haqqında (Məlumat və Təcrübə):
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="12 illik təcrübəli santexnikəm. Boru sızması, kran dəyişimi, kanalizasiya xətlərinin açılması..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              {/* 🔧 2. GÖSTƏRİLƏN XİDMƏTLƏR VƏ BACARIQLAR (ŞƏKİLDƏ GÖSTƏRDİYİNİZ TEQLƏR) */}
              <div className="bg-[#1a263d]/80 p-3.5 rounded-2xl border border-slate-700/80">
                <label className="text-xs text-amber-400 font-bold mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                  <span>🔧</span> Göstərilən Xidmətlər və Bacarıqlar:
                </label>
                
                {/* Mövcud bacarıq teqləri */}
                <div className="flex flex-wrap gap-2 mb-2.5">
                  {editSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-[#121c2e] text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700 shadow-sm"
                    >
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-rose-400 ml-1 text-xs font-bold"
                        title="Sil"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {editSkills.length === 0 && (
                    <span className="text-[11px] text-slate-500 italic">Heç bir xidmət əlavə edilməyib.</span>
                  )}
                </div>

                {/* Yeni bacarıq yazma və əlavə etmə yeri */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Məs: Su sayğacı, Kran təmiri..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow"
                  >
                    + Əlavə et
                  </button>
                </div>
              </div>

              {/* Şifrə Dəyişmə */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Yeni Şifrə (dəyişmək istəmirsinizsə boş saxlayın):</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-sm rounded-xl transition shadow-lg mt-2 cursor-pointer"
              >
                💾 Məlumatları Yadda Saxla
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. VIP / MAVİ TİK ÖDƏNİŞ TƏSDİQ MODALI */}
      {paymentModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121c2e] border border-amber-400/40 rounded-3xl max-w-sm w-full p-6 text-white text-center shadow-2xl relative">
            <button
              onClick={() => setPaymentModal({ ...paymentModal, isOpen: false })}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-2xl mb-3">
              {paymentModal.type === "vip" ? "👑" : "🛡️"}
            </div>

            <h3 className="text-lg font-black text-white mb-1">{paymentModal.title}</h3>
            <p className="text-xs text-slate-400 mb-4">
              {paymentModal.type === "vip"
                ? "Profiliniz 7 gün ərzində kataloqun ən başında və qızılı çərçivədə nümayiş olunacaq."
                : "Profiliniz 30 gün ərzində rəsmi təsdiqlənmiş mavi tik nişanı daşıyacaq."}
            </p>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 mb-5 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Cari Balansınız:</span>
                <span className="font-bold text-white">{walletBalance.toFixed(2)} AZN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Xidmət Qiyməti:</span>
                <span className="font-bold text-amber-400">{paymentModal.cost.toFixed(2)} AZN / {paymentModal.period}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between font-bold">
                <span className="text-slate-300">Ödənişdən Sonra Qalıq:</span>
                <span className={walletBalance >= paymentModal.cost ? "text-emerald-400" : "text-rose-400"}>
                  {(walletBalance - paymentModal.cost).toFixed(2)} AZN
                </span>
              </div>
            </div>

            {walletBalance < paymentModal.cost ? (
              <div className="space-y-2">
                <p className="text-xs text-rose-400 font-bold mb-2">Balansınız kifayət etmir!</p>
                <button
                  type="button"
                  onClick={() => {
                    const add = prompt("Balansınızı nə qədər artırmaq istəyirsiniz? (AZN):", "20");
                    if (add && !isNaN(Number(add)) && Number(add) > 0) {
                      const next = Number((walletBalance + Number(add)).toFixed(2));
                      setWalletBalance(next);
                      if (currentUser) {
                        const updated = { ...currentUser, balance: next };
                        setCurrentUser(updated);
                        localStorage.setItem("current_user", JSON.stringify(updated));
                        window.dispatchEvent(new CustomEvent("authChange"));
                      }
                      alert(`Balansınız uğurla ${add} AZN artırıldı! İndi təsdiq edə bilərsiniz.`);
                    }
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition"
                >
                  + Balansı Artır
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentModal({ ...paymentModal, isOpen: false })}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
                >
                  İmtina
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl transition shadow"
                >
                  Təsdiq Et və Aktivləşdir
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. QR VİZİTKA MODALI */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="bg-[#121c2e] border border-slate-800 rounded-3xl max-w-xs w-full p-6 text-white text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-black text-sm text-amber-400 mb-1">📱 Rəqəmsal QR Vizitkanız</h4>
            <p className="text-[11px] text-slate-400 mb-4">
              Müştəriləriniz bu QR kodu kamerası ilə oxudaraq profilinizə daxil ola bilərlər.
            </p>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(
                  ustaProfileUrl
                )}`}
                alt="Usta QR Kodu"
                className="w-40 h-40 mx-auto"
              />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(ustaProfileUrl);
                  alert("Profil linkiniz kopyalandı!");
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow"
              >
                📋 Linki Kopyala
              </button>
              <Link
                href={`/ustalar/${currentUser?.id || "1"}`}
                className="block w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
              >
                👁️ Profilimə Bax
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}