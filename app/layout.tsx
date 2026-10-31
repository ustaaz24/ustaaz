import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UstaPanelAndChat from '@/components/UstaPanelAndChat';

export const metadata: Metadata = {
  title: 'UstaAz — Eviniz üçün etibarlı ustalar',
  description:
    'Azərbaycan üzrə santexnik, elektrik, kondisioner və təmizlik ustalarını dərhal tapın.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className="bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-white min-h-screen flex flex-col antialiased transition-colors">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        {/* 🌟 Usta üçün Şəxsi Kabinet və Sağ Alt Küncdə Müştəri Mesajları Qutusu */}
        <UstaPanelAndChat />
      </body>
    </html>
  );
}
