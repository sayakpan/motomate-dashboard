'use client';

import Sidebar from '@/components/Sidebar';
import NewsPanel from '@/components/NewsPanel';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const hideNewsPanel = pathname === '/dashboard/ai-assistance';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />
      <main className="min-h-screen transition-all duration-300"
        style={{ marginLeft: 260, marginRight: hideNewsPanel ? 0 : 300 }}>
        {children}
      </main>
      {!hideNewsPanel && <NewsPanel />}
    </div>
  );
}
