'use client';

import { motion } from 'framer-motion';
import { Phone, PhoneCall, Clock, Star, Headphones, Search, User } from 'lucide-react';
import { useState } from 'react';

const callLogs = [
  { id: 1, customer: 'Rahul Sharma', phone: '+91 98765 43210', bike: 'Honda CB350', issue: 'Engine overheating query', duration: '8:42', time: '10:30 AM', status: 'Resolved', rating: 5 },
  { id: 2, customer: 'Ankit Patel', phone: '+91 87654 32109', bike: 'RE Himalayan', issue: 'Booking for 10K service', duration: '3:15', time: '10:05 AM', status: 'Resolved', rating: 4 },
  { id: 3, customer: 'Priya Nair', phone: '+91 76543 21098', bike: 'Yamaha FZ-S', issue: 'Brake noise complaint', duration: '5:28', time: '9:48 AM', status: 'Escalated', rating: 3 },
  { id: 4, customer: 'Deepak Kumar', phone: '+91 65432 10987', bike: 'Suzuki Gixxer', issue: 'Battery replacement query', duration: '4:10', time: '9:20 AM', status: 'Resolved', rating: 5 },
  { id: 5, customer: 'Meera Joshi', phone: '+91 54321 09876', bike: 'TVS Apache RTR', issue: 'Warranty claim inquiry', duration: '12:05', time: '9:00 AM', status: 'Pending', rating: null },
];

const statusMap = { Resolved: 'badge-green', Escalated: 'badge-red', Pending: 'badge-amber' };

const agents = [
  { name: 'Amit R.', status: 'On Call', calls: 12, avatar: 'A' },
  { name: 'Sneha K.', status: 'Available', calls: 9, avatar: 'S' },
  { name: 'Vijay M.', status: 'On Call', calls: 15, avatar: 'V' },
  { name: 'Pooja S.', status: 'Break', calls: 7, avatar: 'P' },
];

const agentStatusMap = { 'On Call': 'badge-amber', Available: 'badge-green', Break: 'badge-red' };

export default function CallAssistancePage() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Headphones className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 uppercase tracking-widest font-semibold" style={{ fontSize: 11 }}>Call Center</span>
        </div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Call Assistance</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage customer support calls and track agent performance.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Calls Today', value: '43', icon: Phone },
          { label: 'Active Calls', value: '3', icon: PhoneCall },
          { label: 'Avg. Duration', value: '6:32', icon: Clock },
          { label: 'Avg. Rating', value: '4.6★', icon: Star },
        ].map((s) => (
          <div key={s.label} className="card p-5" style={{ borderRadius: 16 }}>
            <s.icon className="w-5 h-5 text-zinc-500 mb-3" />
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</p>
            <p className="text-zinc-500 mt-1" style={{ fontSize: 13 }}>{s.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-500 uppercase tracking-wider font-semibold" style={{ fontSize: 11 }}>Recent Calls</h3>
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search calls..."
                className="input-field pl-9 pr-4 py-2" style={{ fontSize: 13, width: 192 }} />
            </div>
          </div>
          <div className="card overflow-hidden" style={{ borderRadius: 16 }}>
            {callLogs.map((call, i) => (
              <motion.div key={call.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.05 }}
                className="p-4 cursor-pointer group" style={{ borderBottom: i < callLogs.length - 1 ? '1px solid var(--border-primary)' : 'none', transition: 'background 0.15s' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="elevated w-9 h-9 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-200" style={{ fontSize: 13 }}>{call.customer}</p>
                      <p className="text-zinc-600" style={{ fontSize: 11 }}>{call.phone} · {call.bike}</p>
                    </div>
                  </div>
                  <span className={`${statusMap[call.status]} font-medium rounded-md`} style={{ fontSize: 10, padding: '2px 8px' }}>{call.status}</span>
                </div>
                <p className="text-zinc-400 ml-12 mb-2" style={{ fontSize: 13 }}>{call.issue}</p>
                <div className="flex items-center gap-4 ml-12 text-zinc-600" style={{ fontSize: 11 }}>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{call.duration}</span>
                  <span>{call.time}</span>
                  {call.rating && <span className="flex items-center gap-1 text-amber-400"><Star className="w-3 h-3 fill-amber-400" />{call.rating}.0</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-zinc-500 uppercase tracking-wider font-semibold mb-4" style={{ fontSize: 11 }}>Support Agents</h3>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.name} className="card p-4 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,88,12,0.1))' }}>
                    <span className="text-sm font-bold text-amber-400">{agent.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-zinc-200" style={{ fontSize: 13 }}>{agent.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`${agentStatusMap[agent.status]} font-medium rounded-md`} style={{ fontSize: 10, padding: '2px 8px' }}>{agent.status}</span>
                      <span className="text-zinc-600" style={{ fontSize: 11 }}>{agent.calls} calls today</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
