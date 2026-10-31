"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { USTALAR, CITIES } from "@/lib/data";

interface OperatorTicket {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  serviceNeeded: string;
  status: "pending" | "active" | "resolved";
  time: string;
  messages: {
    id: string;
    sender: "customer" | "operator";
    text: string;
    timestamp: string;
  }[];
}

const INITIAL_TICKETS: OperatorTicket[] = [
  {
    id: "TK-1084",
    customerName: "Rəşad Quliyev",
    customerPhone: "+994 50 712 34 56",
    city: "Bakı (Yasamal)",
    serviceNeeded: "Santexnik (Kran sızması)",
    status: "pending",
    time: "10:14",
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Salam, mətbəxdə su borusu sızır, təcili usta lazımdır. Kömək edə bilərsiniz?",
        timestamp: "10:14",
      },
    ],
  },
  {
    id: "TK-1083",
    customerName: "Günel Məmmədova",
    customerPhone: "+994 55 334 11 22",
    city: "Xırdalan",
    serviceNeeded: "Kombi ustası (İstilik vermir)",
    status: "active",
    time: "09:58",
    messages: [
      {
        id: "m2",
        sender: "customer",
        text: "Kombi F4 xətası verir və sönür. Xırdalana usta göndərə bilərsiniz?",
        timestamp: "09:58",
      },
      {
        id: "m3",
        sender: "operator",
        text: "Salam Günel xanım. Xırdalan üzrə növbətçi kombi ustamız var. Nömrənizə əlaqə yönləndiririk.",
        timestamp: "10:01",
      },
    ],
  },
  {
    id: "TK-1082",
    customerName: "Samir Ələkbərov",
    customerPhone: "+994 70 889 00 11",
    city: "Gəncə",
    serviceNeeded: "Elektrik ustası",
    status: "resolved",
    time: "09:30",
    messages: [
      {
        id: "m4",
        sender: "customer",
        text: "Avtomat qoruyucu tez-tez atır.",
        timestamp: "09:30",
      },
      {
        id: "m5",
        sender: "operator",
        text: "Usta Vüqar bəy təyin olundu və problem həll edildi. Təşəkkür edirik!",
        timestamp: "09:45",
      },
    ],
  },
];

export default function OperatorDashboard() {
  const [operatorStatus, setOperatorStatus] = useState<"online" | "busy" | "offline">("online");
  const [tickets, setTickets] = useState<OperatorTicket[]>(INITIAL_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("TK-1084");
  const [replyText, setReplyText] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "active" | "resolved">("all");
  const [assignedUsta, setAssignedUsta] = useState("");
  const [assignSuccess, setAssignSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("operator_tickets");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTickets(parsed);
        }
      }
    } catch {}
  }, []);

  const saveTickets = (updated: OperatorTicket[]) => {
    setTickets(updated);
    try {
      localStorage.setItem("operator_tickets", JSON.stringify(updated));
    } catch {}
  };

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleSendReply = (textToSend?: string) => {
    const text = (textToSend || replyText).trim();
    if (!text || !selectedTicket) return;

    const newMsg = {
      id: "op_" + Date.now(),
      sender: "operator" as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: "active" as const,
          messages: [...t.messages, newMsg],
        };
      }
      return t;
    });

    saveTickets(updated);
    setReplyText("");
  };

  const handleMarkResolved = () => {
    if (!selectedTicket) return;
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id ? { ...t, status: "resolved" as const } : t
    );
    saveTickets(updated);
  };

  const handleAssignUsta = () => {
    if (!assignedUsta || !selectedTicket) return;
    handleSendReply(`Sizə peşəkar usta (${assignedUsta}) təyin edildi. Usta ən qısa zamanda sizinlə əlaqə saxlayacaq.`);
    setAssignSuccess(true);
    setTimeout(() => setAssignSuccess(false), 3000);
  };

  const filteredTickets = tickets.filter((t) => {
    if (filterTab !== "all" && t.status !== filterTab) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        t.customerName.toLowerCase().includes(q) ||
        t.customerPhone.includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.serviceNeeded.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = tickets.filter((t) => t.status === "pending").length;
  const activeCount = tickets.filter((t) => t.status === "active").length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;

  return (
    <div className="bg-[#080d1a] text-white min-h-screen flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-[#0f172a] border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
          >
            <span>← Əsas Sayta Qayıt</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg">
              🎧
            </div>
            <div>
              <h1 className="text-base font-black text-white flex items-center gap-2">
                <span>UstaAz Operator İdarəetmə Mərkəzi</span>
                <span className="text-[10px] bg-blue-600/30 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                  Sırf Operator Masası
                </span>
              </h1>
              <p className="text-xs text-slate-400">Canlı zəng və çat müraciətlərinin idarəsi</p>
            </div>
          </div>
        </div>

        {/* Operator Rejimləri */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-700 p-1 rounded-2xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setOperatorStatus("online")}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                operatorStatus === "online"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Onlayn</span>
            </button>
            <button
              onClick={() => setOperatorStatus("busy")}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                operatorStatus === "busy"
                  ? "bg-amber-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Məşğul</span>
            </button>
            <button
              onClick={() => setOperatorStatus("offline")}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                operatorStatus === "offline"
                  ? "bg-rose-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Oflayn</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3.5 py-2 rounded-2xl border border-slate-700">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span>Operator: <strong>Aysel Qasımova</strong></span>
          </div>
        </div>
      </header>

      {/* STATİSTİKA PANORAMASI */}
      <div className="px-6 py-4 bg-[#0c1322] border-b border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#131c2e] p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold">Gözləyən Müraciətlər</span>
            <div className="text-xl font-black text-amber-400">{pendingCount}</div>
          </div>
          <span className="text-2xl">⏳</span>
        </div>
        <div className="bg-[#131c2e] p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold">Aktiv Yazışmalar</span>
            <div className="text-xl font-black text-blue-400">{activeCount}</div>
          </div>
          <span className="text-2xl">💬</span>
        </div>
        <div className="bg-[#131c2e] p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold">Həll Olunmuş</span>
            <div className="text-xl font-black text-emerald-400">{resolvedCount}</div>
          </div>
          <span className="text-2xl">✅</span>
        </div>
        <div className="bg-[#131c2e] p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold">Orta Cavab Müddəti</span>
            <div className="text-xl font-black text-purple-400">1.2 dəq</div>
          </div>
          <span className="text-2xl">⚡</span>
        </div>
      </div>

      {/* ƏSAS OPERATOR İŞ MASASI */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* SOL: MÜRACİƏT SİYAHISI */}
        <div className="lg:col-span-4 border-r border-slate-800 flex flex-col bg-[#0b1220] overflow-hidden">
          <div className="p-3.5 border-b border-slate-800 space-y-2.5">
            <input
              type="text"
              placeholder="🔍 Müştəri adı, nömrəsi və ya xidmət..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
            />
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={() => setFilterTab("all")}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  filterTab === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Hamısı ({tickets.length})
              </button>
              <button
                onClick={() => setFilterTab("pending")}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  filterTab === "pending" ? "bg-amber-500 text-slate-950 font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                Gözləyən ({pendingCount})
              </button>
              <button
                onClick={() => setFilterTab("active")}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  filterTab === "active" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Aktiv ({activeCount})
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filteredTickets.map((t) => {
              const isSelected = t.id === selectedTicketId;
              const lastMsg = t.messages[t.messages.length - 1];

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 cursor-pointer transition flex items-start gap-3 ${
                    isSelected ? "bg-slate-800/80 border-l-4 border-amber-400" : "hover:bg-slate-800/40"
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm font-black text-amber-400 flex-shrink-0 border border-slate-700">
                    {t.customerName.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="font-bold text-xs text-white truncate">{t.customerName}</h4>
                      <span className="text-[10px] text-slate-500">{t.time}</span>
                    </div>
                    <p className="text-[11px] text-amber-400 font-semibold truncate">{t.serviceNeeded}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : "Mesaj yoxdur"}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-slate-400">📍 {t.city}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                          t.status === "pending"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : t.status === "active"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {t.status === "pending" ? "Gözləyir" : t.status === "active" ? "Aktiv" : "Həll olundu"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORTA: CANLI YAZIŞMA PƏNCƏRƏSİ */}
        <div className="lg:col-span-5 flex flex-col bg-[#0f172a] overflow-hidden border-r border-slate-800">
          {selectedTicket ? (
            <>
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm text-white">{selectedTicket.customerName}</h3>
                    <span className="text-xs text-slate-400">({selectedTicket.customerPhone})</span>
                  </div>
                  <p className="text-xs text-amber-400 mt-0.5 font-bold">
                    Tələb: {selectedTicket.serviceNeeded} • 📍 {selectedTicket.city}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedTicket.customerPhone.replace(/\s+/g, "")}`}
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow"
                    title="Müştəriyə zəng et"
                  >
                    <span>📞 Zəng Et</span>
                  </a>
                  <button
                    onClick={handleMarkResolved}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                    title="Müraciəti həll olunmuş kimi bağla"
                  >
                    ✓ Həll edildi
                  </button>
                </div>
              </div>

              {/* Sürətli Şablon Cavablar */}
              <div className="p-2 bg-slate-900 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
                <button
                  onClick={() => handleSendReply("Salam! UstaAz Dəstək Xidməti. Sizə necə kömək edə bilərəm?")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap transition border border-slate-700"
                >
                  👋 Xoş gəlmisiniz
                </button>
                <button
                  onClick={() => handleSendReply("Ünvanınızı dəqiq qeyd edin, sizə ən yaxın növbətçi ustanı yönləndirək.")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition"
                >
                  📍 Ünvan istə
                </button>
                <button
                  onClick={() => handleSendReply("Müraciətiniz qeydə alındı. Usta 10 dəqiqə ərzində sizinlə əlaqə saxlayacaq.")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap transition"
                >
                  ⏱️ 10 dəqiqəyə zəng
                </button>
              </div>

              {/* Mesaj Axını */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0f1d]">
                {selectedTicket.messages.map((m) => {
                  const isOp = m.sender === "operator";

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isOp ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                        <span>{isOp ? "Operator (Siz)" : selectedTicket.customerName}</span>
                        <span>•</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          isOp
                            ? "bg-blue-600 text-white rounded-br-none shadow"
                            : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mesaj Göndərmə */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendReply();
                }}
                className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Müştəriyə cavab yazın..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-1"
                >
                  <span>Göndər</span>
                  <span>➤</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Müraciət seçilməyib
            </div>
          )}
        </div>

        {/* SAĞ: MÜŞTƏRİ MƏLUMATI VƏ USTA TƏYİN ET */}
        <div className="lg:col-span-3 p-4 bg-[#0c1322] overflow-y-auto space-y-4">
          <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">
            👤 Müştəri Profili
          </h3>

          {selectedTicket && (
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Ad və Soyad</span>
                <span className="font-bold text-white text-sm">{selectedTicket.customerName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Əlaqə Telefonu</span>
                <span className="font-semibold text-emerald-400">{selectedTicket.customerPhone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Məkan / Ünvan</span>
                <span className="text-slate-300">{selectedTicket.city}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Müraciət Nömrəsi</span>
                <span className="font-mono text-amber-400 font-bold">{selectedTicket.id}</span>
              </div>
            </div>
          )}

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-black uppercase text-blue-400 tracking-wider">
              🔧 Usta Yönləndir
            </h4>
            <p className="text-[11px] text-slate-400 leading-tight">
              Müştərinin ünvanına və tələbinə uyğun usta seçin və sifarişi yönləndirin:
            </p>

            <select
              value={assignedUsta}
              onChange={(e) => setAssignedUsta(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-blue-400"
            >
              <option value="">Usta seçin...</option>
              {USTALAR.map((u) => (
                <option key={u.id} value={`${u.name} (${u.category})`}>
                  {u.name} — {u.category} ({u.city})
                </option>
              ))}
            </select>

            <button
              onClick={handleAssignUsta}
              disabled={!assignedUsta}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-1.5"
            >
              <span>Ustanı Müştəriyə Təyin Et</span>
            </button>

            {assignSuccess && (
              <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold text-center">
                ✓ Usta uğurla yönləndirildi və bildiriş göndərildi!
              </div>
            )}
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-[11px] text-amber-300 space-y-1">
            <strong>⚠️ Təcili Xətt Qeydi:</strong>
            <p>Qaz sızması və ya güclü su borusu partlaması olduqda dərhal FHN (112) və ya Azəriqaz (104) xidmətini xəbərdar edin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}