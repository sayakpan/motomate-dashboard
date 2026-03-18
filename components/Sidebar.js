'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  LayoutDashboard, Bot, Phone, BarChart3, MapPin, Package,
  ShoppingBag, ChevronDown, Wrench, LogOut, User,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  {
    label: 'Assistance', icon: Bot,
    children: [
      { label: 'AI Assistance', icon: Bot, href: '/dashboard/ai-assistance' },
      { label: 'Call Assistance', icon: Phone, href: '/dashboard/call-assistance' },
    ],
  },
  {
    label: 'Service Centers', icon: MapPin,
    children: [
      { label: 'Performance', icon: BarChart3, href: '/dashboard/performance' },
      { label: 'All Centers', icon: MapPin, href: '/dashboard/all-centers' },
    ],
  },
  {
    label: 'Purchase', icon: ShoppingBag,
    children: [
      { label: 'Spare Parts', icon: Package, href: '/dashboard/spare-parts' },
      { label: 'Accessories', icon: ShoppingBag, href: '/dashboard/accessories' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedGroups, setExpandedGroups] = useState(['Assistance', 'Service Centers', 'Purchase']);

  const toggleGroup = (label) => {
    setExpandedGroups((prev) => prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]);
  };
  const isActive = (href) => pathname === href;
  const isGroupActive = (item) => item.children?.some((child) => pathname === child.href);

  return (
    <div className="h-screen flex flex-col fixed left-0 top-0 z-40"
      style={{ width: 260, background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-primary)' }}>

      {/* Logo */}
      <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--border-primary)' }}>
        <div className="flex items-center gap-3">
          <div className="icon-box icon-box-amber" style={{ width: 36, height: 36 }}>
            <Wrench style={{ width: 18, height: 18 }} className="text-amber-400" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight" style={{ fontSize: 15, fontFamily: 'var(--font-heading)' }}>MotoMate</h1>
            <p className="uppercase tracking-widest text-zinc-600" style={{ fontSize: 10 }}>Workshop Pro</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            if (!item.children) {
              const active = isActive(item.href);
              return (
                <motion.button key={item.label} onClick={() => router.push(item.href)} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group"
                  style={active
                    ? { background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.15)' }
                    : { color: '#a1a1aa', border: '1px solid transparent' }}>
                  <item.icon style={{ width: 18, height: 18 }} className={active ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'} />
                  {item.label}
                  {active && <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </motion.button>
              );
            }

            const expanded = expandedGroups.includes(item.label);
            const groupActive = isGroupActive(item);

            return (
              <div key={item.label} className="mt-1">
                <button onClick={() => toggleGroup(item.label)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group"
                  style={{ color: groupActive ? '#fbbf24' : '#a1a1aa' }}>
                  <item.icon style={{ width: 18, height: 18 }} className={groupActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'} />
                  {item.label}
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    style={{ color: groupActive ? '#fbbf24' : '#52525b' }} />
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden">
                      <div className="ml-4 pl-4 space-y-0.5 py-1" style={{ borderLeft: '1px solid var(--border-secondary)' }}>
                        {item.children.map((child) => {
                          const active = isActive(child.href);
                          return (
                            <motion.button key={child.label} onClick={() => router.push(child.href)} whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-all cursor-pointer group"
                              style={{ fontSize: 13, color: active ? '#fbbf24' : '#71717a', background: active ? 'rgba(245,158,11,0.1)' : 'transparent' }}>
                              <child.icon className="w-4 h-4" style={{ color: active ? '#fbbf24' : '#52525b' }} />
                              {child.label}
                              {active && <motion.div layoutId="activeChild" className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="p-3" style={{ borderTop: '1px solid var(--border-primary)' }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}>
            <User className="w-4 h-4 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">Demo User</p>
            <p className="text-zinc-600 truncate" style={{ fontSize: 11 }}>demo@gmail.com</p>
          </div>
          <button onClick={() => router.push('/')}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 transition-all cursor-pointer" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
