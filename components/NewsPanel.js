'use client';

import { motion } from 'framer-motion';
import { Newspaper, Calendar, TrendingUp, Sparkles, Clock, ArrowUpRight, Flame, Star } from 'lucide-react';

const news = [
  { tag: 'Update', tagClass: 'badge-amber', title: 'MotoMate AI v2.4 Released', desc: 'Enhanced diagnostics for Honda & Yamaha 2024 models now available.', time: '2 hours ago' },
  { tag: 'Alert', tagClass: 'badge-red', title: 'Supply Chain Notice', desc: 'Brake pad shipments delayed by 3-5 days for Eastern region.', time: '5 hours ago' },
  { tag: 'New', tagClass: 'badge-green', title: 'Pune Center Launched', desc: 'Our 12th service center is now operational in Pune West.', time: '1 day ago' },
];

const events = [
  { title: 'Monthly Safety Drill', date: 'Mar 22', type: 'Internal' },
  { title: 'EV Service Certification', date: 'Mar 28', type: 'Training' },
  { title: 'Q1 Review Meeting', date: 'Apr 2', type: 'Meeting' },
];

const insights = [
  { label: 'Avg. Repair Time', value: '2.4h', change: '-12%', positive: true },
  { label: 'Customer Rating', value: '4.8', change: '+0.3', positive: true },
  { label: 'Parts Used Today', value: '142', change: '+8%', positive: true },
];

export default function NewsPanel() {
  return (
    <div className="h-screen fixed right-0 top-0 overflow-y-auto py-6 px-5"
      style={{ width: 300, background: 'var(--bg-sidebar)', borderLeft: '1px solid var(--border-primary)' }}>

      <div className="flex items-center gap-2.5 mb-6">
        <div className="icon-box icon-box-amber" style={{ width: 32, height: 32 }}>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Feed</h2>
          <p className="uppercase tracking-widest text-zinc-600" style={{ fontSize: 10 }}>News & Insights</p>
        </div>
      </div>

      {/* Insights */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-zinc-500" style={{ width: 14, height: 14 }} />
          <span className="text-zinc-500 uppercase tracking-wider font-semibold" style={{ fontSize: 11 }}>Today&apos;s Pulse</span>
        </div>
        <div className="space-y-2">
          {insights.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="card-sm flex items-center justify-between p-3">
              <span className="text-zinc-400" style={{ fontSize: 12 }}>{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{item.value}</span>
                <span className={`font-medium ${item.positive ? 'text-green-400' : 'text-red-400'}`} style={{ fontSize: 11 }}>{item.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* News */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Newspaper className="text-zinc-500" style={{ width: 14, height: 14 }} />
          <span className="text-zinc-500 uppercase tracking-wider font-semibold" style={{ fontSize: 11 }}>Company News</span>
        </div>
        <div className="space-y-2.5">
          {news.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
              className="card-sm p-3.5 cursor-pointer group" style={{ transition: 'all 0.2s' }}>
              <div className="flex items-center justify-between mb-2">
                <span className={`${item.tagClass} uppercase tracking-wider font-semibold rounded-md`} style={{ fontSize: 10, padding: '2px 8px' }}>{item.tag}</span>
                <span className="text-zinc-600 flex items-center gap-1" style={{ fontSize: 10 }}>
                  <Clock className="w-3 h-3" />{item.time}
                </span>
              </div>
              <h3 className="font-semibold text-zinc-200 mb-1 group-hover:text-amber-400 transition-colors" style={{ fontSize: 13 }}>{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed" style={{ fontSize: 12 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="text-zinc-500" style={{ width: 14, height: 14 }} />
          <span className="text-zinc-500 uppercase tracking-wider font-semibold" style={{ fontSize: 11 }}>Upcoming Events</span>
        </div>
        <div className="space-y-2">
          {events.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + 0.1 * i, duration: 0.4 }}
              className="card-sm flex items-center gap-3 p-3 cursor-pointer group">
              <div className="elevated w-10 h-10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-zinc-500 uppercase leading-none" style={{ fontSize: 10 }}>{item.date.split(' ')[0]}</span>
                <span className="text-sm font-bold text-white leading-tight">{item.date.split(' ')[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-zinc-200 truncate group-hover:text-amber-400 transition-colors" style={{ fontSize: 13 }}>{item.title}</h4>
                <span className="text-zinc-600" style={{ fontSize: 11 }}>{item.type}</span>
              </div>
              <ArrowUpRight className="text-zinc-600 group-hover:text-amber-400 transition-colors" style={{ width: 14, height: 14 }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-6 p-4 rounded-xl"
        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(234,88,12,0.05))', border: '1px solid rgba(245,158,11,0.15)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Flame className="text-amber-400" style={{ width: 14, height: 14 }} />
          <span className="text-amber-400 font-semibold uppercase tracking-wider" style={{ fontSize: 11 }}>Pro Tip</span>
        </div>
        <p className="text-zinc-300 leading-relaxed" style={{ fontSize: 12 }}>
          Use the AI assistant to quickly diagnose chain tension issues. Just describe the symptoms and it will suggest adjustments.
        </p>
      </motion.div>
    </div>
  );
}
