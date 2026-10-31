// lib/db.ts - Canlı Bulud Bazası və Sinxronizasiya Sistemi (Google Firebase Realtime Database)

export function normalizePhone(phone: string): string {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, ""); // Yalnız rəqəmləri saxlayır
  if (digits.startsWith("994")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits; // Məsələn: "501234567"
}

// Sizin şəxsi Google Firebase Realtime Database Linkiniz:
export const FIREBASE_URL = "https://ustaaz-24-default-rtdb.firebaseio.com";

// 1. BÜTÜN HESABLARI OXU (Kompüter + Telefon Canlı Sinxronizasiya)
export async function getAccounts(): Promise<any[]> {
  try {
    const res = await fetch(`${FIREBASE_URL}/accounts.json`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        const list = Array.isArray(data) ? data.filter(Boolean) : Object.values(data);
        try {
          localStorage.setItem("all_accounts", JSON.stringify(list));
        } catch {}
        return list;
      }
    }
  } catch (err) {}

  try {
    const raw = localStorage.getItem("all_accounts");
    if (raw) return JSON.parse(raw);
  } catch {}

  return [];
}

// 2. YENİ HESABI YADDA SAXLA (Google Firebase Buluduna və Brauzerə)
export async function saveAccount(newAccount: any): Promise<boolean> {
  const norm = normalizePhone(newAccount.phone);
  const key = `${norm}_${newAccount.role || "user"}`;

  // 1. Firebase Buluduna yaz (Bütün cihazlar dərhal görsün)
  try {
    await fetch(`${FIREBASE_URL}/accounts/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    });
  } catch (err) {}

  // 2. Lokal yaddaşı da yenilə
  try {
    const raw = localStorage.getItem("all_accounts");
    let accounts: any[] = raw ? JSON.parse(raw) : [];
    const idx = accounts.findIndex(
      (a) => normalizePhone(a.phone) === norm && a.role === newAccount.role
    );
    if (idx >= 0) accounts[idx] = newAccount;
    else accounts.push(newAccount);
    localStorage.setItem("all_accounts", JSON.stringify(accounts));
  } catch {}

  return true;
}

// 3. BÜTÜN REAL USTALARI OXU (Kompüter və Telefonda Canlı Görünüş)
export async function getUstalar(): Promise<any[]> {
  try {
    const res = await fetch(`${FIREBASE_URL}/ustalar.json`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        const list = Array.isArray(data) ? data.filter(Boolean) : Object.values(data);
        try {
          localStorage.setItem("custom_ustalar", JSON.stringify(list));
        } catch {}
        return list;
      }
    }
  } catch (err) {}

  try {
    const raw = localStorage.getItem("custom_ustalar");
    if (raw) return JSON.parse(raw);
  } catch {}

  return [];
}

// 4. YENİ USTANI YADDA SAXLA (Buluda Canlı Göndər)
export async function saveUsta(newUsta: any): Promise<boolean> {
  const norm = normalizePhone(newUsta.phone);

  // 1. Firebase Buluduna yaz
  try {
    await fetch(`${FIREBASE_URL}/ustalar/${norm}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUsta),
    });
  } catch (err) {}

  // 2. Lokal yaddaşı yenilə
  try {
    const raw = localStorage.getItem("custom_ustalar");
    let ustalar: any[] = raw ? JSON.parse(raw) : [];
    const idx = ustalar.findIndex((u) => normalizePhone(u.phone) === norm);
    if (idx >= 0) ustalar[idx] = newUsta;
    else ustalar.unshift(newUsta);
    localStorage.setItem("custom_ustalar", JSON.stringify(ustalar));
  } catch {}

  return true;
}

// 5. NÖMRƏNİN BAZADA OLUB-OLMADIĞINI YOXLAYIR
export async function checkPhoneExists(phone: string): Promise<boolean> {
  const norm = normalizePhone(phone);
  if (!norm) return false;
  const accounts = await getAccounts();
  return accounts.some((a) => normalizePhone(a.phone) === norm);
}
