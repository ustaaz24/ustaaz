import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Üst Loqo və Zəmanət Bölməsi */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brend Haqqında */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <span className="text-3xl">🔧</span>
              <span className="text-2xl font-black text-white tracking-tight">
                Usta<span className="text-blue-500">Az</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Azərbaycanın vahid ev və təmir xidmətləri platforması. Şəxsiyyəti və peşəkarlığı yoxlanılmış ustalarla təhlükəsiz və zəmanətli xidmət.
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              24/7 Operativ Xidmət Şəbəkəsi
            </div>
          </div>

          {/* Xidmətlər */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Populyar Xidmətlər</h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/ustalar?cat=Santexnik" className="hover:text-blue-400 transition">Santexnik Usta Xidməti</Link></li>
              <li><Link href="/ustalar?cat=Elektrik" className="hover:text-blue-400 transition">Elektrik Montaj və Təmiri</Link></li>
              <li><Link href="/ustalar?cat=Kondisioner" className="hover:text-blue-400 transition">Kondisioner Təmiri və Yuyulması</Link></li>
              <li><Link href="/ustalar?cat=Təmizlik" className="hover:text-blue-400 transition">Mənzil və Ofis Təmizliyi</Link></li>
              <li><Link href="/ustalar?cat=Mebel" className="hover:text-blue-400 transition">Mebel Yığılması və Restavrasiyası</Link></li>
            </ul>
          </div>

          {/* Müştərilər və Ustalar üçün */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Platforma</h4>
            <ul className="text-xs space-y-2">
              <li><Link href="/ustalar" className="hover:text-blue-400 transition">Usta Kataloqu</Link></li>
              <li><Link href="/qeydiyyat" className="hover:text-blue-400 transition">Usta Kimi Əməkdaşlıq</Link></li>
              <li><Link href="/giris" className="hover:text-blue-400 transition">Şəxsi Kabinetə Giriş</Link></li>
              <li><span className="text-slate-500">🛡️ Təhlükəsizlik və Keyfiyyət Zəmanəti</span></li>
              <li><span className="text-slate-500">📋 İki Tərəfli Razılaşma Qaydaları</span></li>
            </ul>
          </div>

          {/* Əlaqə və Dəstək */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Müştəri Dəstəyi</h4>
            <p className="text-xs text-slate-300 font-medium mb-1">🇦🇿 Bütün Azərbaycan üzrə</p>
            <p className="text-xs text-slate-400 mb-3">Həftənin 7 günü operativ dəstək</p>
            <div className="space-y-1.5 text-xs">
              <p><span className="text-slate-500">E-poçt:</span> <span className="text-white font-semibold">destek@ustaaz.az</span></p>
              <p><span className="text-slate-500">Ünvan:</span> <span className="text-slate-300">Bakı şəhəri, Azərbaycan</span></p>
            </div>
          </div>
        </div>

        {/* Alt Müəllif Hüquqları */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UstaAz MMC. Bütün hüquqlar qorunur.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">İstifadəçi Razılaşması</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Məxfilik Siyasəti</span>
          </div>
        </div>
      </div>
    </footer>
  );
}