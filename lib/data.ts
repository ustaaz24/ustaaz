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
  price: string;
  reviews: Review[];
  skills: string[];
  portfolio?: string[];
  services?: string[];
  isEmergency247?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

export interface SponsorAd {
  id: string;
  title: string;
  category: string;
  discount: string;
  description: string;
  phone: string;
  badge: string;
  linkText: string;
}

// BÜTÜN AZƏRBAYCAN ŞƏHƏR VƏ RAYONLARI (A-Z ƏLİFBA SIRASI İLƏ)
export const CITIES = [
  "Abşeron",
  "Ağcabədi",
  "Ağdam",
  "Ağdaş",
  "Ağstafa",
  "Ağsu",
  "Astara",
  "Babək",
  "Bakı",
  "Balakən",
  "Bərdə",
  "Beyləqan",
  "Biləsuvar",
  "Cəbrayıl",
  "Cəlilabad",
  "Culfa",
  "Daşkəsən",
  "Füzuli",
  "Gədəbəy",
  "Gəncə",
  "Goranboy",
  "Göyçay",
  "Göygöl",
  "Hacıqabul",
  "Xaçmaz",
  "Xankəndi",
  "Xızı",
  "Xocalı",
  "Xocavənd",
  "Xırdalan",
  "İmişli",
  "İsmayıllı",
  "Kəlbəcər",
  "Kəngərli",
  "Kürdəmir",
  "Qax",
  "Qazax",
  "Qəbələ",
  "Qobustan",
  "Quba",
  "Qubadlı",
  "Qusar",
  "Laçın",
  "Lerik",
  "Lənkəran",
  "Masallı",
  "Mingəçevir",
  "Naftalan",
  "Naxçıvan",
  "Neftçala",
  "Oğuz",
  "Ordubad",
  "Saatlı",
  "Sabirabad",
  "Salyan",
  "Samux",
  "Sədərək",
  "Siyəzən",
  "Sumqayıt",
  "Şabran",
  "Şahbuz",
  "Şamaxı",
  "Şəki",
  "Şəmkir",
  "Şərur",
  "Şirvan",
  "Şuşa",
  "Tərtər",
  "Tovuz",
  "Ucar",
  "Yardımlı",
  "Yevlax",
  "Zaqatala",
  "Zəngilan",
  "Zərdab"
];

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
    icon: '🔥',
    description: 'Dəmir qapı, barmaqlıq, metal konstruksiya',
    count: 18,
  },
  {
    id: '4',
    name: 'Dülgər / Mebel',
    slug: 'dulger',
    icon: '🪚',
    description: 'Mebel yığımı, qapı, döşəmə, təmir',
    count: 22,
  },
  {
    id: '5',
    name: 'Rəngsaz / Malyar',
    slug: 'rengsaz',
    icon: '🎨',
    description: 'Divar kağızı, boya, alçipan, suvaq',
    count: 27,
  },
  {
    id: '6',
    name: 'Kafel ustası',
    slug: 'kafel',
    icon: '🧱',
    description: 'Kafel, metlax, mozaika, qranit',
    count: 19,
  },
  {
    id: '7',
    name: 'Ev təmizliyi',
    slug: 'temizlik',
    icon: '🧹',
    description: 'Ev, ofis, pəncərə və dərin təmizlik',
    count: 35,
  },
  {
    id: '8',
    name: 'Kombi & Kondisioner',
    slug: 'kondisioner',
    icon: '❄️',
    description: 'Kombi və kondisioner quraşdırma, təmir, yuma',
    count: 29,
  },
];

export const SPONSOR_ADS: SponsorAd[] = [];

// ZƏNGİN SINAQ USTALARI SİYAHISI
export const CRAFTSMEN: Craftsman[] = [
  {
    id: '1',
    name: 'Əli Həsənov',
    category: 'Santexnik',
    categorySlug: 'santexnik',
    city: 'Bakı',
    district: 'Yasamal (Elmlər / İnşaatçılar / Yeni Yasamal)',
    phone: '+994 50 234 56 78',
    rating: 4.9,
    reviewCount: 87,
    experience: 12,
    isVip: true,
    verified: true,
    isEmergency247: true,
    description:
      '12 illik təcrübəli santexnikəm. Boru sızması, kran dəyişimi, kanalizasiya xətlərinin açılması, isti döşəmə və duş kabin montajı.',
    avatar:
      'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80',
    price: '20 ₼-dən',
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
        comment: 'Gecə boru sızmışdı, 20 dəqiqəyə gəlib həll etdi.',
        date: '2025-01-14',
      },
      {
        id: 'r2',
        author: 'Fuad Rəhimov',
        rating: 5,
        comment: 'Vaxtında gəldi, təmiz iş gördü.',
        date: '2024-12-28',
      },
    ],
  },
  {
    id: '2',
    name: 'Rauf Məmmədov',
    category: 'Elektrik ustası',
    categorySlug: 'elektrik',
    city: 'Bakı',
    district: 'Nərimanov (Gənclik / Nərimanov / Montin)',
    phone: '+994 55 345 67 89',
    rating: 4.8,
    reviewCount: 64,
    experience: 9,
    isVip: true,
    verified: true,
    isEmergency247: true,
    description:
      'Hər növ elektrik işləri: naqil çəkilişi, lüstr, spot və gizli LED işıqlar, avtomat şitlərin yığılması. Sertifikatlı və zəmanətli.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    price: '15 ₼-dən',
    skills: [
      'Rozet quraşdırma',
      'LED işıqlandırma',
      'Elektrik şiti',
      'Qısaqapanma təmiri',
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Elçin Quliyev',
        rating: 5,
        comment: 'Evimizin elektrik şitini səliqəli yığdı.',
        date: '2025-01-10',
      },
    ],
  },
  {
    id: '3',
    name: 'Kamran Sultanov',
    category: 'Qaynaqçı',
    categorySlug: 'qaynaqci',
    city: 'Sumqayıt',
    phone: '+994 70 456 78 90',
    rating: 4.7,
    reviewCount: 43,
    experience: 15,
    isVip: false,
    verified: true,
    description:
      'Dəmir darvaza, həyət hasarları, nərdivan pilləkənləri, məhəccər və barmaqlıq qaynağı. Sumqayıt və Abşeron üzrə.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    price: 'Razılaşma ilə',
    skills: ['Darvaza qaynağı', 'Hasar', 'Metal konstruksiya', 'Nərdivan'],
    reviews: [
      {
        id: 'r4',
        author: 'Vüsal İsmayılov',
        rating: 5,
        comment: 'Darvaza və çardaq qurdu, möhkəm və keyfiyyətlidir.',
        date: '2025-01-05',
      },
    ],
  },
  {
    id: '4',
    name: 'Tural Əsgərov',
    category: 'Dülgər / Mebel',
    categorySlug: 'dulger',
    city: 'Bakı',
    district: 'Xətai (Əhmədli / Həzi Aslanov / Ağ Şəhər / Köhnə Günəşli)',
    phone: '+994 51 567 89 01',
    rating: 4.9,
    reviewCount: 72,
    experience: 10,
    isVip: true,
    verified: true,
    description:
      'Mətbəx, yataq və dəhliz mebellərinin yığılması və təmiri. Otaq qapıları və laminat döşəmə montajı.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    price: '25 ₼-dən',
    skills: ['Mebel yığımı', 'Laminat', 'Qapı montajı', 'Mətbəx mebeli'],
    reviews: [
      {
        id: 'r5',
        author: 'Zəhra Nəcəfova',
        rating: 5,
        comment: 'Mətbəx mebelimizi çox səliqəli və cızıqsız yığdı.',
        date: '2025-01-18',
      },
    ],
  },
  {
    id: '5',
    name: 'Samir Hüseynov',
    category: 'Kafel ustası',
    categorySlug: 'kafel',
    city: 'Bakı',
    district: 'Nəsimi (28 May / Memar Əcəmi / Kubinka)',
    phone: '+994 50 789 01 23',
    rating: 4.8,
    reviewCount: 95,
    experience: 14,
    isVip: false,
    verified: true,
    description:
      'Kafel, metlax, qranit, kermoqranit və mərmər döşənməsi. Lazer tərəzi ilə 45 dərəcə künclərin dəqiq kəsimi.',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    price: '18 ₼/kv.m',
    skills: ['Kafel', 'Metlax', 'Kermoqranit', 'Lazer kəsim'],
    reviews: [
      {
        id: 'r6',
        author: 'Türkan Rəhmanova',
        rating: 5,
        comment: 'Hamam kafellərini vurdu, tikişlər milimetr dəqiqliyindədir.',
        date: '2025-01-02',
      },
    ],
  },
  {
    id: '6',
    name: 'Lalə Məhərrəmova',
    category: 'Ev təmizliyi',
    categorySlug: 'temizlik',
    city: 'Bakı',
    district: 'Səbail (İçərişəhər / Sahil / Badamdar / Bayıl)',
    phone: '+994 55 890 12 34',
    rating: 4.9,
    reviewCount: 120,
    experience: 6,
    isVip: false,
    verified: true,
    description:
      'Mənzillərin, villaların və ofislərin dərin təmizliyi. Təmirdən sonrakı təmizlik, pəncərələrin xüsusi aparatla yuyulması.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    price: '50 ₼-dən',
    skills: [
      'Dərin təmizlik',
      'Pəncərə yuma',
      'Təmirdən sonra təmizlik',
      'Mətbəx təmizliyi',
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Aynur Mustafayeva',
        rating: 5,
        comment: 'Evi elə təmizlədi ki, gözlərimə inana bilmədim.',
        date: '2025-01-12',
      },
    ],
  },
  {
    id: '7',
    name: 'Bəhruz Nəsirov',
    category: 'Kombi & Kondisioner',
    categorySlug: 'kondisioner',
    city: 'Bakı',
    district:
      'Binəqədi (Dərnəgül / Azadlıq / Biləcəri / Rəsulzadə / Binəqədi qəs.)',
    phone: '+994 70 901 23 45',
    rating: 4.8,
    reviewCount: 68,
    experience: 8,
    isVip: true,
    verified: true,
    isEmergency247: true,
    description:
      'Kombi yuyulması, plataların təmiri, radiatorların xüsusi aparatla təmizlənməsi. Kondisioner montajı və freon vurulması.',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    price: '25 ₼-dən',
    skills: ['Kombi təmiri', 'Radiator yuma', 'Freon doldurma', 'Plata təmiri'],
    reviews: [
      {
        id: 'r8',
        author: 'Rəna Həsənova',
        rating: 5,
        comment: 'Kombimizin nasosunu dərhal orijinalı ilə əvəz etdi.',
        date: '2025-01-20',
      },
    ],
  },
  {
    id: '8',
    name: 'İlqar Məmmədov',
    category: 'Dülgər / Mebel',
    categorySlug: 'dulger',
    city: 'Xırdalan',
    district: 'Xırdalan (Xırdalan şəhəri / Heydər Əliyev pr. / Quşçuluq)',
    phone: '+994 50 612 34 56',
    rating: 4.9,
    reviewCount: 54,
    experience: 11,
    isVip: true,
    verified: true,
    description:
      'Xırdalan, Masazır və Saray ərazisində mebel sökülməsi, yığılması və otaq qapılarının montajı.',
    avatar:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    price: '20 ₼-dən',
    skills: ['Mebel montajı', 'Qapı montajı', 'Dəhliz dolabı', 'Laminat'],
    reviews: [
      {
        id: 'r9',
        author: 'Rəşad Bəkirov',
        rating: 5,
        comment: 'Xırdalanda evimizə 15 dəqiqəyə çatdı. Peşəkardır.',
        date: '2025-01-22',
      },
    ],
  },
  {
    id: '9',
    name: 'Vüqar Əliyev',
    category: 'Santexnik',
    categorySlug: 'santexnik',
    city: 'Xırdalan',
    district: 'Masazır (Masazır qəs. / Duz gölü / Yeni Bakı)',
    phone: '+994 55 723 45 67',
    rating: 4.8,
    reviewCount: 48,
    experience: 9,
    isVip: false,
    verified: true,
    isEmergency247: true,
    description:
      'Masazır və Xırdalan üzrə santexnik xidmətləri: ariston, su filteri, gidrofor və kanalizasiya açılması.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    price: '15 ₼-dən',
    skills: ['Gidrofor montajı', 'Su filtri', 'Kanalizasiya', 'Boru lehimləmə'],
    reviews: [
      {
        id: 'r10',
        author: 'Sevda Qasımova',
        rating: 5,
        comment: 'Masazırda su nasosunu dərhal təmir etdi.',
        date: '2025-01-25',
      },
    ],
  },
  {
    id: '10',
    name: 'Murad Cəfərov',
    category: 'Kombi & Kondisioner',
    categorySlug: 'kondisioner',
    city: 'Gəncə',
    phone: '+994 70 834 56 78',
    rating: 4.9,
    reviewCount: 62,
    experience: 13,
    isVip: true,
    verified: true,
    description:
      'Gəncə şəhəri və ətraf rayonlar üzrə peşəkar kombi və kondisioner təmiri.',
    avatar:
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80',
    price: '20 ₼-dən',
    skills: ['Kombi diaqnostika', 'Kondisioner yuma', 'Qaz doldurma'],
    reviews: [
      {
        id: 'r11',
        author: 'Cavid Məmmədov',
        rating: 5,
        comment: 'Gəncədə ən etibarlı kombi ustasıdır.',
        date: '2025-01-19',
      },
    ],
  },
  {
    id: '11',
    name: 'Elnur Babayev',
    category: 'Rəngsaz / Malyar',
    categorySlug: 'rengsaz',
    city: 'Bakı',
    district:
      'Suraxanı (Qaraçuxur / Əmircan / Hövsan / Zığ / Bülbülə / Yeni Günəşli)',
    phone: '+994 50 945 67 89',
    rating: 4.8,
    reviewCount: 57,
    experience: 16,
    isVip: false,
    verified: true,
    description:
      'Malyar işləri, oboy vurulması, alçipan tavan və emulsiya boya. Qaraçuxur, Hövsan və Günəşli üzrə.',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    price: '4 ₼/kv.m',
    skills: ['Oboy', 'Alçipan', 'Boya', 'Suvaq', 'Şpatlyovka'],
    reviews: [
      {
        id: 'r12',
        author: 'Kənan Əzizov',
        rating: 5,
        comment: 'Oboyları mükəmməl vurdu, çox səliqəlidir.',
        date: '2025-01-11',
      },
    ],
  },
  {
    id: '12',
    name: 'Rəşad Qasımov',
    category: 'Elektrik ustası',
    categorySlug: 'elektrik',
    city: 'Bakı',
    district:
      'Sabunçu (Bakıxanov / Zabrat / Sabunçu qəs. / Maştağa / Nardaran / Bilgəh / Pirşağı)',
    phone: '+994 55 456 78 91',
    rating: 4.9,
    reviewCount: 49,
    experience: 10,
    isVip: true,
    verified: true,
    description:
      'Sabunçu, Bakıxanov və Maştağa üzrə bağ evlərində və mənzillərdə elektrik xətlərinin çəkilməsi və generator qoşulması.',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    price: '20 ₼-dən',
    skills: [
      'Generator montajı',
      'Bağ evi elektriki',
      'Avtomat şit',
      'Stabilizator',
    ],
    reviews: [
      {
        id: 'r13',
        author: 'Samirə Vəliyeva',
        rating: 5,
        comment: 'Bilgəhdə bağ evimizin elektrik işlərini əla gördü.',
        date: '2025-01-15',
      },
    ],
  },
  {
    id: '13',
    name: 'Cavid İsmayılov',
    category: 'Santexnik',
    categorySlug: 'santexnik',
    city: 'Lənkəran',
    phone: '+994 50 567 89 12',
    rating: 4.8,
    reviewCount: 41,
    experience: 11,
    isVip: false,
    verified: true,
    description:
      'Lənkəran və cənub bölgəsində su boruları, kranlar, istilik sistemləri və gidrofor montajı.',
    avatar:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    price: '15 ₼-dən',
    skills: ['Su xətti', 'Gidrofor', 'Kran montajı', 'İstilik sistemi'],
    reviews: [
      {
        id: 'r14',
        author: 'Natiq Bağırov',
        rating: 5,
        comment: 'Lənkəranda evimizə su təchizatını sıfırdan çəkdi.',
        date: '2025-01-08',
      },
    ],
  },
  {
    id: '14',
    name: 'Fərid Əhmədov',
    category: 'Kombi & Kondisioner',
    categorySlug: 'kondisioner',
    city: 'Sumqayıt',
    phone: '+994 70 678 90 23',
    rating: 4.9,
    reviewCount: 77,
    experience: 12,
    isVip: true,
    verified: true,
    description:
      'Sumqayıt şəhərində kombilərin təmiri, yuyulması və kondisionerlərin freon doldurulması.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    price: '20 ₼-dən',
    skills: ['Kombi yuma', 'Kondisioner', 'Plata təmiri', 'Təcili çağırış'],
    reviews: [
      {
        id: 'r15',
        author: 'Eldar Məlikov',
        rating: 5,
        comment: 'Sumqayıtda ən sürətli və dürüst usta.',
        date: '2025-01-26',
      },
    ],
  },
  {
    id: '15',
    name: 'Natiq Səfərov',
    category: 'Kafel ustası',
    categorySlug: 'kafel',
    city: 'Xırdalan',
    district: 'Xırdalan (Xırdalan şəhəri / Heydər Əliyev pr. / Quşçuluq)',
    phone: '+994 55 789 01 34',
    rating: 4.8,
    reviewCount: 39,
    experience: 15,
    isVip: false,
    verified: true,
    description:
      'Xırdalan, Masazır və Sarayda kafel, metlax və kermoqranit işləri. Mətbəx və hamamların təmiri.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    price: '16 ₼/kv.m',
    skills: ['Kafel', 'Metlax', 'Mətbəx önlüyü', 'Mozaika'],
    reviews: [
      {
        id: 'r16',
        author: 'Aytən Rzayeva',
        rating: 5,
        comment: 'Xırdalandakı evimizin hamamını kafel etdi, razı qaldıq.',
        date: '2025-01-17',
      },
    ],
  },
  {
    id: '16',
    name: 'Günel Əliyeva',
    category: 'Ev təmizliyi',
    categorySlug: 'temizlik',
    city: 'Bakı',
    district: 'Xətai (Əhmədli / Həzi Aslanov / Ağ Şəhər / Köhnə Günəşli)',
    phone: '+994 50 890 12 45',
    rating: 4.9,
    reviewCount: 88,
    experience: 7,
    isVip: true,
    verified: true,
    description:
      'Əhmədli, Həzi Aslanov və Ağ Şəhər ərazisində evlərin gündəlik və dərin təmizliyi.',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    price: '40 ₼-dən',
    skills: ['Ev təmizliyi', 'Dərin təmizlik', 'Mətbəx yuma', 'Ütüləmə'],
    reviews: [
      {
        id: 'r17',
        author: 'Ləman Əkbərova',
        rating: 5,
        comment: 'Çox təmizkar və dürüst xanımdır.',
        date: '2025-01-24',
      },
    ],
  },
];

export const USTALAR = CRAFTSMEN;
export type Usta = Craftsman;
