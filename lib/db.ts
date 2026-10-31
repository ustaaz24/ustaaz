// lib/db.ts - Canlı Bulud Bazası və Sinxronizasiya Sistemi (Kompüter və Telefon üçün)

export function normalizePhone(phone: string): string {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, ""); // Yalnız rəqəmləri saxlayır
  if (digits.startsWith("994")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits; // Məsələn: "501234567"
}

// Baza üçün Pulsuz Bulud Serveri REST API (Kompüter və telefonlar canlı sinxronlaşır)
const CLOUD_API_URL = "https://kvdb.io/4y9pA2n9j8w7R6t5Y4u3/";

// 1. BÜTÜN HESABLARI OXU (Kompüter + Telefon)
export async function getAccounts(): Promise<any[]> {
  let localList: any[] = [];
  try {
    const raw = localStorage.getItem("all_accounts");
    if (raw) localList = JSON.parse(raw);
  } catch {}

  try {
    const res = await fetch(`${CLOUD_API_URL}ustaaz_accounts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (res.ok) {
      const cloudList = await res.json();
      if (Array.isArray(cloudList)) {
        const map = new Map();
        [...localList, ...cloudList].forEach((acc) => {
          const norm = normalizePhone(acc.phone);
          if (norm) map.set(norm + "_" + acc.role, acc);
        });
        const merged = Array.from(map.values());
        try {
          localStorage.setItem("all_accounts", JSON.stringify(merged));
        } catch {}
        return merged;
      }
    }
  } catch {}

  return localList;
}

// 2. YENİ HESABI YADDA SAXLA (Buluda və Lokala)
export async function saveAccount(newAccount: any): Promise<boolean> {
  let accounts = await getAccounts();
  const norm = normalizePhone(newAccount.phone);
  
  const index = accounts.findIndex(
    (a) => normalizePhone(a.phone) === norm && a.role === newAccount.role
  );
  if (index >= 0) {
    accounts[index] = { ...accounts[index], ...newAccount };
  } else {
    accounts.push(newAccount);
  }

  try {
    localStorage.setItem("all_accounts", JSON.stringify(accounts));
  } catch {}

  try {
    await fetch(`${CLOUD_API_URL}ustaaz_accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accounts),
    });
  } catch {}

  return true;
}

// 3. BÜTÜN USTALARI OXU (Canlı - Saxta ustalar yoxdur)
export async function getUstalar(): Promise<any[]> {
  let localList: any[] = [];
  try {
    const raw = localStorage.getItem("custom_ustalar");
    if (raw) localList = JSON.parse(raw);
  } catch {}

  try {
    const res = await fetch(`${CLOUD_API_URL}ustaaz_craftsmen`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (res.ok) {
      const cloudList = await res.json();
      if (Array.isArray(cloudList)) {
        const map = new Map();
        [...localList, ...cloudList].forEach((u) => {
          const norm = normalizePhone(u.phone);
          if (norm) map.set(norm, u);
          else if (u.id) map.set(u.id, u);
        });
        const merged = Array.from(map.values());
        try {
          localStorage.setItem("custom_ustalar", JSON.stringify(merged));
        } catch {}
        return merged;
      }
    }
  } catch {}

  return localList;
}

// 4. YENİ USTANI YADDA SAXLA (Buluda və Lokala)
export async function saveUsta(newUsta: any): Promise<boolean> {
  let ustalar = await getUstalar();
  const norm = normalizePhone(newUsta.phone);
  
  const index = ustalar.findIndex(
    (u) => normalizePhone(u.phone) === norm || (newUsta.id && u.id === newUsta.id)
  );
  if (index >= 0) {
    ustalar[index] = { ...ustalar[index], ...newUsta };
  } else {
    ustalar.unshift(newUsta);
  }

  try {
    localStorage.setItem("custom_ustalar", JSON.stringify(ustalar));
  } catch {}

  try {
    await fetch(`${CLOUD_API_URL}ustaaz_craftsmen`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ustalar),
    });
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
