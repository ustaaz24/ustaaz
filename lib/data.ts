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
  categorySlug: string;
  city: string;
  district?: string;
  phone: string;
  rating: number;
  reviewCount: number;
  experience: number;
  description: string;
  avatar: string;
  verified: boolean;
  isVip?: boolean;
  status?: 'active' | 'busy' | 'inactive';
  price?: string;
  reviews: Review[];
  skills: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

// 1. BÜTÜN AZƏRBAYCAN ŞƏHƏR VƏ RAYONLARI (A-Z ƏLİFBA SIRASI İLƏ)
export const CITIES = [
  'Abşeron',
  'Ağcabədi',
  'Ağdam',
  'Ağdaş',
  'Ağstafa',
  'Ağsu',
  'Astara',
  'Babək',
  'Bakı',
  'Balakən',
  'Bərdə',
  'Beyləqan',
  'Biləsuvar',
  'Cəbrayıl',
  'Cəlilabad',
  'Culfa',
  'Daşkəsən',
  'Füzuli',
  'Gədəbəy',
  'Gəncə',
  'Goranboy',
  'Göyçay',
  'Göygöl',
  'Hacıqabul',
  'Xaçmaz',
  'Xankəndi',
  'Xızı',
  'Xocalı',
  'Xocavənd',
  'Xırdalan',
  'İmişli',
  'İsmayıllı',
  'Kəlbəcər',
  'Kəngərli',
  'Kürdəmir',
  'Laçın',
  'Lənkəran',
  'Lerik',
  'Masallı',
  'Mingəçevir',
  'Naftalan',
  'Naxçıvan',
  'Neftçala',
  'Oğuz',
  'Ordubad',
  'Qax',
  'Qazax',
  'Qəbələ',
  'Qobustan',
  'Quba',
  'Qubadlı',
  'Qusar',
  'Saatlı',
  'Sabirabad',
  'Salyan',
  'Samux',
  'Sədərək',
  'Siyəzən',
  'Sumqayıt',
  'Şabran',
  'Şahbuz',
  'Şamaxı',
  'Şəki',
  'Şəmkir',
  'Şərur',
  'Şirvan',
  'Şuşa',
  'Tərtər',
  'Tovuz',
  'Ucar',
  'Yardımlı',
  'Yevlax',
  'Zaqatala',
  'Zəngilan',
  'Zərdab',
];

// 2. YALNIZ BAKI SEÇİLDİKDƏ ALT PANELDƏ ÇIXAN QƏSƏBƏLƏR
export const BAKI_DISTRICTS = [
  'Bütün Bakı (şəhər və qəsəbələr)',
  'Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)',
  'Nərimanov (Gənclik / Nərimanov / Montin)',
  'Nəsimi (28 May / Memar Əcəmi / Kubinka)',
  'Xətai (Əhmədli / Həzi Aslanov / Ağ Şəhər / Köhnə Günəşli)',
  'Səbail (İçərişəhər / Sahil / Badamdar / Bayıl)',
  'Binəqədi (Dərnəgül / Azadlıq / Biləcəri / Rəsulzadə / Binəqədi qəs.)',
  'Nizami (Neftçilər / Qara Qarayev / Xalqlar Dostluğu / Keşlə)',
  'Sabunçu (Bakıxanov / Zabrat / Sabunçu qəs. / Maştağa / Nardaran / Bilgəh / Pirşağı)',
  'Suraxanı (Qaraçuxur / Əmircan / Hövsan / Zığ / Bülbülə / Yeni Günəşli)',
  'Xəzər (Mərdəkan / Şüvəlan / Buzovna / Qala / Binə / Türkan / Zirə)',
  'Qaradağ (Lökbatan / Səngəçal / Sahil / Qobustan / Puta)',
  'Pirallahı (Pirallahı / Gürgən / Çilov adası)',
  'Xırdalan (Xırdalan şəhəri / Heydər Əliyev pr. / Quşçuluq)',
  'Masazır (Masazır qəs. / Duz gölü / Yeni Bakı)',
  'Saray / Mehdiabad / Digah / Novxanı',
];

// KATEQORİYALAR
export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Santexnik',
    slug: 'santexnik',
    icon: '🔧',
    description: 'Su boru, kran, kanalizasiya təmiri',
    count: 24,
  },
  {
    id: '2',
    name: 'Elektrik ustası',
    slug: 'elektrik',
    icon: '⚡',
    description: 'Elektrik naqili, rozet, işıqlandırma',
    count: 31,
  },
  {
    id: '3',
    name: 'Qaynaqçı',
    slug: 'qaynaqci',
    icon: '👨‍🏭',
    description: 'Dəmir qapı, barmaqlıq, metal konstruksiya',
    count: 18,
  },
  {
    id: '4',
    name: 'Dülgər / Mebel',
    slug: 'dulger',
    icon: '🪑',
    description: 'Mebel yığımı, qapı, döşəmə, təmir',
    count: 22,
  },
  {
    id: '5',
    name: 'Rəngsaz / Malyar',
    slug: 'rengsaz',
    icon: '🎨',
    description: 'Divar kağızı, boya, alçıpan, suvaq',
    count: 29,
  },
  {
    id: '6',
    name: 'Kafel / Metlax',
    slug: 'kafel-metlax',
    icon: '🧱',
    description: 'Hovuz, vanna otağı kafel-metlax döşəmə',
    count: 15,
  },
  {
    id: '7',
    name: 'Kombi ustası',
    slug: 'kombi',
    icon: '🔥',
    description: 'Kombi quraşdırma, radiator yuma, təmir',
    count: 26,
  },
  {
    id: '8',
    name: 'Kondisioner',
    slug: 'kondisioner',
    icon: '❄️',
    description: 'Freon vurulması, yuyulması, montaj',
    count: 19,
  },
  {
    id: '9',
    name: 'Ev təmizliyi',
    slug: 'temizlik',
    icon: '🧹',
    description: 'Təmirdən sonra təmizlik, xalça yuma',
    count: 35,
  },
];

// NÜMUNƏVİ USTALAR
export const CRAFTSMEN: Craftsman[] = [
  {
    id: '1',
    name: 'Rəşad Əliyev',
    category: 'Santexnik',
    categorySlug: 'santexnik',
    city: 'Bakı',
    district: 'Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)',
    phone: '+994 50 123 45 67',
    rating: 4.9,
    reviewCount: 42,
    experience: 12,
    description:
      '12 illik təcrübəli santexnikəm. Boru sızması, kran dəyişimi, kanalizasiya xətlərinin açılması, isti döşəmə və duş kabin montajı.',
    avatar:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
    verified: true,
    isVip: true,
    status: 'active',
    skills: [
      'Boru təmiri',
      'Kran dəyişimi',
      'Kanalizasiya',
      'Su sayğacı',
      'Vanna quraşdırılması',
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Nigar Əliyeva',
        rating: 5,
        comment:
          'Çox peşəkar və vaxtında gələn ustadır. İşi keyfiyyətlə gördü.',
        date: '2025-01-14',
      },
    ],
  },
  {
    id: '2',
    name: 'Vüqar Məmmədov',
    category: 'Elektrik ustası',
    categorySlug: 'elektrik',
    city: 'Gəncə',
    phone: '+994 55 987 65 43',
    rating: 4.8,
    reviewCount: 28,
    experience: 9,
    description:
      'Hər növ elektrik naqillərinin çəkilməsi, avtomat quraşdırılması, lüstr və gizli işıq sistemləri.',
    avatar:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
    verified: true,
    isVip: false,
    status: 'active',
    skills: [
      'Elektrik xətləri',
      'Avtomat qutusu',
      'Lüstr montajı',
      'Qısaqapanma təmiri',
    ],
    reviews: [],
  },
  {
    id: '3',
    name: 'Kamran Həsənov',
    category: 'Kombi ustası',
    categorySlug: 'kombi',
    city: 'Bakı',
    district: 'Nərimanov (Gənclik / Nərimanov / Montin)',
    phone: '+994 70 333 44 55',
    rating: 5.0,
    reviewCount: 56,
    experience: 14,
    description:
      'Bütün marka kombilərin təmiri, radiatorların xüsusi aparatla dərmanla yuyulması və qışa hazırlıq.',
    avatar:
      'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    verified: true,
    isVip: true,
    status: 'active',
    skills: [
      'Kombi təmiri',
      'Radiator yuyulması',
      'Plata təmiri',
      'Qaz sızması yoxlanışı',
    ],
    reviews: [],
  },
];

export const USTALAR = CRAFTSMEN;
