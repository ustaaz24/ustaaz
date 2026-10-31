'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatModal({
  usta,
  onClose,
}: {
  usta: any;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [customerName, setCustomerName] = useState('Müştəri');
  const [customerPhone, setCustomerPhone] = useState('+994 50 123 45 67');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('ustaaz_current_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setCustomerName(u.name || 'Müştəri');
      setCustomerPhone(u.phone || '+994 50 123 45 67');
    }

    const savedChat = localStorage.getItem(`chat_${usta.id}`);
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  }, [usta.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      customerName,
      customerPhone,
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(`chat_${usta.id}`, JSON.stringify(updated));

    // 1. Ustanın qutusuna əlavə edirik
    const rawUstaConvs = localStorage.getItem(`usta_conversations_${usta.id}`);
    let ustaConvs = rawUstaConvs ? JSON.parse(rawUstaConvs) : [];
    const uIdx = ustaConvs.findIndex(
      (c: any) => c.customerPhone === customerPhone
    );
    if (uIdx !== -1) {
      ustaConvs[uIdx].lastMessage = inputText;
      ustaConvs[uIdx].lastTime = newMsg.time;
      ustaConvs[uIdx].hasUnread = true;
      ustaConvs[uIdx].messages.push(newMsg);
    } else {
      ustaConvs.unshift({
        id: `conv_${Date.now()}`,
        customerName: customerName,
        customerPhone: customerPhone,
        lastMessage: inputText,
        lastTime: newMsg.time,
        hasUnread: true,
        messages: [newMsg],
      });
    }
    localStorage.setItem(
      `usta_conversations_${usta.id}`,
      JSON.stringify(ustaConvs)
    );

    // 🌟 2. MÜŞTƏRİNİN DƏ ÖZ SAĞ ALT KÜNCDƏKİ ÇATINA ƏLAVƏ EDİRİK!
    const rawCustConvs = localStorage.getItem(
      `customer_conversations_${customerPhone}`
    );
    let custConvs = rawCustConvs ? JSON.parse(rawCustConvs) : [];
    const cIdx = custConvs.findIndex((c: any) => c.ustaId === usta.id);
    if (cIdx !== -1) {
      custConvs[cIdx].lastMessage = inputText;
      custConvs[cIdx].lastTime = newMsg.time;
      custConvs[cIdx].messages.push(newMsg);
    } else {
      custConvs.unshift({
        id: `conv_${Date.now()}`,
        ustaId: usta.id,
        ustaName: usta.name,
        ustaPhone: usta.phone,
        photo: usta.photo,
        category:
          typeof usta.category === 'object' ? usta.category.az : usta.category,
        lastMessage: inputText,
        lastTime: newMsg.time,
        hasUnread: false,
        messages: [newMsg],
      });
    }
    localStorage.setItem(
      `customer_conversations_${customerPhone}`,
      JSON.stringify(custConvs)
    );

    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#162032] rounded-3xl w-full max-w-md h-[520px] flex flex-col shadow-2xl border border-slate-200 dark:border-[#243247] overflow-hidden">
        {/* Başlıq */}
        <div className="p-4 bg-slate-50 dark:bg-[#0e1726] border-b border-slate-200 dark:border-[#243247] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={
                usta.photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  usta.name
                )}`
              }
              alt={usta.name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                {usta.name}
                {usta.isVerified && (
                  <span className="text-blue-500 text-xs">✓</span>
                )}
              </h4>
              <p className="text-[11px] text-emerald-500 font-semibold">
                Xəttədir
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#162032] text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold hover:bg-slate-300"
          >
            ✕
          </button>
        </div>

        {/* Mesaj Sahəsi */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-100/50 dark:bg-[#0b1120]">
          {messages.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-xs">
              Usta ilə birbaşa danışığa başlayın.
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-[#162032] text-slate-900 dark:text-white rounded-bl-none border border-slate-200 dark:border-[#243247]'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Mesaj Göndərmə */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white dark:bg-[#162032] border-t border-slate-200 dark:border-[#243247] flex gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 bg-slate-100 dark:bg-[#0e1726] border-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow"
          >
            Göndər
          </button>
        </form>
      </div>
    </div>
  );
}
