export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Craftsman {
  id: string;
  name: string;
  category: string;
  categorySlug?: string;
  city: string;
  district?: string;
  phone: string;
  rating: number;
  reviewCount: number;
  experience?: number;
  experienceYears?: number;
  description: string;
  avatar: string;
  verified: boolean;
  isVip?: boolean;
  status?: "active" | "busy" | "inactive";
  price?: string;
  reviews?: Review[];
  skills?: string[];
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

// BÜTÜN AZƏRBAYCAN ŞƏHƏR VƏ RAYONLARI (A-Z)
export const CITIES = [
  "Abşeron", "Ağcabədi", "Ağdam", "Ağdaş", "Ağstafa", "Ağsu", "Astara",
  "Babək", "Bakı", "Balakən", "Bərdə", "Beyləqan", "Biləsuvar",
  "Cəbrayıl", "Cəlilabad", "Culfa", "Daşkəsən", "Füzuli", "Gədəbəy",
  "Gəncə", "Goranboy", "Göyçay", "Göygöl", "Hacıqabul", "Xaçmaz",
  "Xankəndi", "Xızı", "Xocalı", "Xocavənd", "Xırdalan", "İmişli", "İsmayıllı",
  "Kəlbəcər", "Kəngərli", "Kürdəmir", "Laçın", "Lənkəran", "Lerik", "Masallı",
  "Mingəçevir", "Naftalan", "Naxçıvan", "Neftçala", "Oğuz", "Ordubad",
  "Qax", "Qazax", "Qəbələ", "Qobustan", "Quba", "Qubadlı", "Qusar",
  "Saatlı", "Sabirabad", "Salyan", "Samux", "Sədərək", "Siyəzən", "Sumqayıt",
  "Şabran", "Şahbuz", "Şamaxı", "Şəki", "Şəmkir", "Şərur", "Şirvan", "Şuşa",
  "Tərtər", "Tovuz", "Ucar", "Yardımlı", "Yevlax",
  "Zaqatala", "Zəngilan", "Zərdab"
];

// BAKI QƏSƏBƏLƏRİ
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
export const CATEGORIES: Category[] = [
  { id: "1", name: "Santexnik", slug: "santexnik", icon: "🔧", description: "Su boru, kran, kanalizasiya təmiri", count: 0 },
  { id: "2", name: "Elektrik ustası", slug: "elektrik", icon: "⚡", description: "Elektrik naqili, rozet, işıqlandırma", count: 0 },
  { id: "3", name: "Qaynaqçı", slug: "qaynaqci", icon: "👨‍🏭", description: "Dəmir qapı, barmaqlıq, metal konstruksiya", count: 0 },
  { id: "4", name: "Dülgər / Mebel", slug: "dulger", icon: "🪑", description: "Mebel yığımı, qapı, döşəmə, təmir", count: 0 },
  { id: "5", name: "Rəngsaz / Malyar", slug: "rengsaz", icon: "🎨", description: "Divar kağızı, boya, alçıpan, suvaq", count: 0 },
  { id: "6", name: "Kafel / Metlax", slug: "kafel-metlax", icon: "🧱", description: "Hovuz, vanna otağı kafel-metlax döşəmə", count: 0 },
  { id: "7", name: "Kombi ustası", slug: "kombi", icon: "🔥", description: "Kombi quraşdırma, radiator yuma, təmir", count: 0 },
  { id: "8", name: "Kondisioner", slug: "kondisioner", icon: "❄️", description: "Freon vurulması, yuyulması, montaj", count: 0 },
  { id: "9", name: "Ev təmizliyi", slug: "temizlik", icon: "🧹", description: "Təmirdən sonra təmizlik, xalça yuma", count: 0 }
];

// SAXTA USTALARIN HAMISI SİLİNDİ! YALNIZ CANLI BAZADAN GƏLƏN REAL USTALAR GÖRÜNƏCƏK.
export const CRAFTSMEN: Craftsman[] = [];
export const USTALAR = CRAFTSMEN;
