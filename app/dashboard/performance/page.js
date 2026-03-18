'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Star, Wrench, Target, Award } from 'lucide-react';

const timeRanges = ['Today', 'This Week', 'This Month', 'This Quarter'];

const kpis = [
  { label: 'Total Jobs', value: '1,847', change: '+12.3%', positive: true, icon: Wrench, colorClass: 'icon-box-amber', iconClass: 'text-amber-400' },
  { label: 'Revenue', value: '₹24.8L', change: '+8.7%', positive: true, icon: TrendingUp, colorClass: 'icon-box-green', iconClass: 'text-green-400' },
  { label: 'Avg. Rating', value: '4.76', change: '+0.12', positive: true, icon: Star, colorClass: 'icon-box-amber', iconClass: 'text-amber-400' },
  { label: 'Efficiency', value: '91.2%', change: '+3.4%', positive: true, icon: Target, colorClass: 'icon-box-cyan', iconClass: 'text-cyan-400' },
];

const centerRankings = [
  { rank: 1, name: 'MotoMate Mumbai Central', jobs: 412, revenue: '₹6.2L', rating: 4.9, efficiency: 94 },
  { rank: 2, name: 'MotoMate Bangalore HSR', jobs: 389, revenue: '₹5.8L', rating: 4.85, efficiency: 93 },
  { rank: 3, name: 'MotoMate Delhi Karol Bagh', jobs: 356, revenue: '₹5.1L', rating: 4.8, efficiency: 91 },
  { rank: 4, name: 'MotoMate Chennai T. Nagar', jobs: 298, revenue: '₹4.4L', rating: 4.72, efficiency: 89 },
  { rank: 5, name: 'MotoMate Pune Kothrud', jobs: 245, revenue: '₹3.6L', rating: 4.65, efficiency: 88 },
  { rank: 6, name: 'MotoMate Hyderabad Madhapur', jobs: 231, revenue: '₹3.4L', rating: 4.6, efficiency: 87 },
];

const weeklyData = [
  { day: 'Mon', jobs: 62 }, { day: 'Tue', jobs: 78 }, { day: 'Wed', jobs: 85 },
  { day: 'Thu', jobs: 71 }, { day: 'Fri', jobs: 92 }, { day: 'Sat', jobs: 98 }, { day: 'Sun', jobs: 45 },
];

const topMechanics = [
  { name: 'Ravi Kumar', center: 'Mumbai Central', jobs: 89, rating: 4.95, specialty: 'Engine' },
  { name: 'Anil Singh', center: 'Bangalore HSR', jobs: 82, rating: 4.9, specialty: 'Electrical' },
  { name: 'Pradeep M.', center: 'Delhi Karol Bagh', jobs: 78, rating: 4.88, specialty: 'Suspension' },
  { name: 'Suresh T.', center: 'Chennai T. Nagar', jobs: 74, rating: 4.85, specialty: 'Brakes' },
];

export default function PerformancePage() {
  const [selectedRange, setSelectedRange] = useState('This Month');
  const maxJobs = Math.max(...weeklyData.map(d => d.jobs));

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 uppercase tracking-widest font-semibold" style={{ fontSize: 11 }}>Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Performance Overview</h1>
          <p className="text-zinc-500 text-sm mt-1">Track service center metrics and operational efficiency.</p>
        </div>
        <div className="card-sm flex items-center gap-1 p-1">
          {timeRanges.map((range) => (
            <button key={range} onClick={() => setSelectedRange(range)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${selectedRange === range ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              style={selectedRange === range ? { fontSize: 12, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' } : { fontSize: 12, border: '1px solid transparent' }}>
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPIs */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }} className="card p-5" style={{ borderRadius: 16 }}>
            <div className="flex items-center justify-between mb-4">
              <div className={`icon-box ${kpi.colorClass}`} style={{ width: 40, height: 40 }}>
                <kpi.icon className={`w-5 h-5 ${kpi.iconClass}`} />
              </div>
              <span className={`font-semibold flex items-center gap-1 ${kpi.positive ? 'text-green-400' : 'text-red-400'}`} style={{ fontSize: 12 }}>
                {kpi.positive ? <TrendingUp style={{ width: 14, height: 14 }} /> : <TrendingDown style={{ width: 14, height: 14 }} />}{kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{kpi.value}</p>
            <p className="text-zinc-500 mt-1" style={{ fontSize: 13 }}>{kpi.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-5 gap-6 mb-8">
        {/* Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="col-span-3 card p-6" style={{ borderRadius: 16 }}>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white">Weekly Job Volume</h3>
            <p className="text-zinc-500 mt-0.5" style={{ fontSize: 12 }}>Jobs completed per day this week</p>
          </div>
          <div className="flex items-end gap-3" style={{ height: 192 }}>
            {weeklyData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-zinc-400 font-medium" style={{ fontSize: 11 }}>{d.jobs}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(d.jobs / maxJobs) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-lg cursor-pointer"
                  style={{ background: 'linear-gradient(to top, rgba(245,158,11,0.3), rgba(245,158,11,0.1))', border: '1px solid rgba(245,158,11,0.2)' }} />
                <span className="text-zinc-600 font-medium" style={{ fontSize: 11 }}>{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Mechanics */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="col-span-2 card p-6" style={{ borderRadius: 16 }}>
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Top Mechanics</h3>
          </div>
          <div className="space-y-3">
            {topMechanics.map((mech, i) => (
              <motion.div key={mech.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,88,12,0.1))' }}>
                  <span className="text-xs font-bold text-amber-400">#{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-200 truncate" style={{ fontSize: 13 }}>{mech.name}</p>
                  <p className="text-zinc-600" style={{ fontSize: 11 }}>{mech.center} · {mech.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white" style={{ fontSize: 13 }}>{mech.jobs}</p>
                  <p className="text-amber-400 flex items-center gap-0.5 justify-end" style={{ fontSize: 10 }}>
                    <Star className="fill-amber-400" style={{ width: 10, height: 10 }} />{mech.rating}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Rankings */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-zinc-500 uppercase tracking-wider font-semibold mb-4" style={{ fontSize: 11 }}>Center Rankings</h3>
        <div className="card overflow-hidden" style={{ borderRadius: 16 }}>
          <table className="w-full">
            <thead>
              <tr className="table-header">
                {['Rank', 'Service Center', 'Jobs', 'Revenue', 'Rating', 'Efficiency'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-zinc-500 uppercase tracking-wider font-semibold" style={{ fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {centerRankings.map((center, i) => (
                <motion.tr key={center.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.04 }} className="table-row cursor-pointer">
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center"
                      style={center.rank <= 3 ? { background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }
                        : { background: 'var(--bg-elevated)', color: '#71717a' }}>
                      {center.rank}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-200 font-medium" style={{ fontSize: 13 }}>{center.name}</td>
                  <td className="px-5 py-3.5 text-zinc-300 font-mono" style={{ fontSize: 13 }}>{center.jobs}</td>
                  <td className="px-5 py-3.5 text-green-400 font-medium" style={{ fontSize: 13 }}>{center.revenue}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-amber-400" style={{ fontSize: 13 }}>
                      <Star className="fill-amber-400" style={{ width: 14, height: 14 }} />{center.rating}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, maxWidth: 80, background: 'var(--bg-elevated)' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${center.efficiency}%` }}
                          transition={{ delay: 0.6 + i * 0.06, duration: 0.6 }}
                          className="h-full rounded-full" style={{ background: 'linear-gradient(to right, #f59e0b, #fbbf24)' }} />
                      </div>
                      <span className="text-zinc-400 font-medium" style={{ fontSize: 12 }}>{center.efficiency}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
