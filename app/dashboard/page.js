'use client';

import { motion } from 'framer-motion';
import {
  Wrench, Users, Clock, CheckCircle2, TrendingUp,
  ArrowUpRight, CalendarDays, BarChart3, Activity, Zap, AlertTriangle
} from 'lucide-react';

const stats = [
  { label: 'Active Repairs', value: '24', change: '+3 today', icon: Wrench, colorClass: 'icon-box-amber', iconClass: 'text-amber-400' },
  { label: 'Mechanics Online', value: '18', change: '2 on break', icon: Users, colorClass: 'icon-box-blue', iconClass: 'text-blue-400' },
  { label: 'Avg. Turnaround', value: '2.4h', change: '-18 min', icon: Clock, colorClass: 'icon-box-green', iconClass: 'text-green-400' },
  { label: 'Completed Today', value: '31', change: '+12%', icon: CheckCircle2, colorClass: 'icon-box-cyan', iconClass: 'text-cyan-400' },
];

const recentRepairs = [
  { id: '#MR-2481', bike: 'Honda CB350', issue: 'Chain adjustment + Oil change', mechanic: 'Ravi K.', status: 'In Progress', priority: 'Normal' },
  { id: '#MR-2480', bike: 'Royal Enfield Classic 350', issue: 'Brake pad replacement', mechanic: 'Anil S.', status: 'Waiting Parts', priority: 'High' },
  { id: '#MR-2479', bike: 'Yamaha R15 V4', issue: 'ECU diagnostics + Throttle', mechanic: 'Pradeep M.', status: 'In Progress', priority: 'Normal' },
  { id: '#MR-2478', bike: 'KTM Duke 390', issue: 'Fork oil seal replacement', mechanic: 'Suresh T.', status: 'Completed', priority: 'Low' },
  { id: '#MR-2477', bike: 'Bajaj Pulsar NS200', issue: 'Clutch cable + Carburetor tune', mechanic: 'Ravi K.', status: 'In Progress', priority: 'Normal' },
];

const statusMap = { 'In Progress': 'badge-amber', 'Waiting Parts': 'badge-orange', 'Completed': 'badge-green' };
const priorityMap = { High: 'text-red-400', Normal: 'text-zinc-400', Low: 'text-zinc-600' };

const quickActions = [
  { label: 'New Repair', icon: Wrench, desc: 'Log a new repair job' },
  { label: 'AI Diagnose', icon: Zap, desc: 'Quick AI diagnostics' },
  { label: 'Schedule', icon: CalendarDays, desc: 'View appointments' },
  { label: 'Reports', icon: BarChart3, desc: 'View analytics' },
];

export default function DashboardPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 uppercase tracking-widest font-semibold" style={{ fontSize: 11 }}>Live Dashboard</span>
        </div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Good afternoon, Demo</h1>
        <p className="text-zinc-500 text-sm mt-1">Here&apos;s what&apos;s happening across your service centers today.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item} className="card p-5 cursor-pointer group" style={{ borderRadius: 16 }}>
            <div className="flex items-center justify-between mb-4">
              <div className={`icon-box ${stat.colorClass}`} style={{ width: 40, height: 40 }}>
                <stat.icon className={`w-5 h-5 ${stat.iconClass}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
            </div>
            <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500" style={{ fontSize: 13 }}>{stat.label}</span>
              <span className="text-green-400 font-medium" style={{ fontSize: 11 }}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
        <h3 className="text-zinc-500 uppercase tracking-wider font-semibold mb-3" style={{ fontSize: 11 }}>Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <motion.button key={action.label} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
              className="card-sm flex items-center gap-3 p-4 cursor-pointer group" style={{ transition: 'all 0.2s' }}>
              <div className="elevated w-9 h-9 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                <action.icon style={{ width: 18, height: 18 }} className="text-zinc-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="text-left">
                <p className="font-medium text-zinc-200 group-hover:text-white transition-colors" style={{ fontSize: 13 }}>{action.label}</p>
                <p className="text-zinc-600" style={{ fontSize: 11 }}>{action.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Repairs Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-500 uppercase tracking-wider font-semibold" style={{ fontSize: 11 }}>Active Repair Jobs</h3>
          <button className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer" style={{ fontSize: 12 }}>View All</button>
        </div>
        <div className="card overflow-hidden" style={{ borderRadius: 16 }}>
          <table className="w-full">
            <thead>
              <tr className="table-header">
                {['Job ID', 'Bike', 'Issue', 'Mechanic', 'Status', 'Priority'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-zinc-500 uppercase tracking-wider font-semibold" style={{ fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRepairs.map((repair, i) => (
                <motion.tr key={repair.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }} className="table-row cursor-pointer">
                  <td className="px-5 py-3.5 text-amber-400 font-mono font-medium" style={{ fontSize: 13 }}>{repair.id}</td>
                  <td className="px-5 py-3.5 text-zinc-200 font-medium" style={{ fontSize: 13 }}>{repair.bike}</td>
                  <td className="px-5 py-3.5 text-zinc-400" style={{ fontSize: 13, maxWidth: 200 }}>{repair.issue}</td>
                  <td className="px-5 py-3.5 text-zinc-300" style={{ fontSize: 13 }}>{repair.mechanic}</td>
                  <td className="px-5 py-3.5">
                    <span className={`${statusMap[repair.status]} font-medium rounded-lg`} style={{ fontSize: 11, padding: '4px 10px' }}>{repair.status}</span>
                  </td>
                  <td className={`px-5 py-3.5 font-medium ${priorityMap[repair.priority]}`} style={{ fontSize: 13 }}>
                    {repair.priority === 'High' && <AlertTriangle className="inline mr-1 mb-0.5" style={{ width: 14, height: 14 }} />}
                    {repair.priority}
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
