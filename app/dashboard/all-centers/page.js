'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Clock, Star, Users, Wrench, Search, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const centers = [
  { id: 1, name: 'MotoMate Mumbai Central', address: '47, Dr. Annie Besant Rd, Worli, Mumbai - 400018', phone: '+91 22 2495 1234', hours: '8:00 AM - 8:00 PM', rating: 4.9, reviews: 847, mechanics: 8, activeJobs: 12, status: 'Open', specialties: ['Engine', 'EV', 'Diagnostics'] },
  { id: 2, name: 'MotoMate Bangalore HSR', address: '12/A, 27th Main, HSR Layout, Sector 1, Bangalore - 560102', phone: '+91 80 4567 8901', hours: '8:00 AM - 9:00 PM', rating: 4.85, reviews: 612, mechanics: 6, activeJobs: 9, status: 'Open', specialties: ['Suspension', 'Brakes', 'Body'] },
  { id: 3, name: 'MotoMate Delhi Karol Bagh', address: '8, Pusa Road, Karol Bagh, New Delhi - 110005', phone: '+91 11 2345 6789', hours: '9:00 AM - 8:00 PM', rating: 4.8, reviews: 534, mechanics: 7, activeJobs: 11, status: 'Open', specialties: ['Engine', 'Electrical', 'Tuning'] },
  { id: 4, name: 'MotoMate Chennai T. Nagar', address: '23, Usman Road, T. Nagar, Chennai - 600017', phone: '+91 44 3456 7890', hours: '8:30 AM - 7:30 PM', rating: 4.72, reviews: 389, mechanics: 5, activeJobs: 7, status: 'Open', specialties: ['Brakes', 'Transmission', 'AC'] },
  { id: 5, name: 'MotoMate Pune Kothrud', address: '154, Paud Road, Kothrud, Pune - 411038', phone: '+91 20 5678 9012', hours: '9:00 AM - 8:00 PM', rating: 4.65, reviews: 267, mechanics: 5, activeJobs: 6, status: 'Open', specialties: ['Engine', 'Chain', 'General'] },
  { id: 6, name: 'MotoMate Hyderabad Madhapur', address: '88, Durgam Cheruvu Rd, Madhapur, Hyderabad - 500081', phone: '+91 40 6789 0123', hours: '8:00 AM - 8:00 PM', rating: 4.6, reviews: 198, mechanics: 4, activeJobs: 5, status: 'Open', specialties: ['EV', 'Diagnostics', 'Electrical'] },
  { id: 7, name: 'MotoMate Kolkata Salt Lake', address: 'Block AE, Sector 1, Salt Lake, Kolkata - 700064', phone: '+91 33 7890 1234', hours: '9:00 AM - 7:00 PM', rating: 4.55, reviews: 156, mechanics: 4, activeJobs: 4, status: 'Open', specialties: ['General', 'Brakes', 'Engine'] },
  { id: 8, name: 'MotoMate Jaipur MI Road', address: '31, MI Road, C Scheme, Jaipur - 302001', phone: '+91 141 890 1234', hours: '9:00 AM - 7:00 PM', rating: 4.5, reviews: 134, mechanics: 3, activeJobs: 3, status: 'Closed', specialties: ['Engine', 'General'] },
];

export default function AllCentersPage() {
  const [search, setSearch] = useState('');
  const filtered = centers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 uppercase tracking-widest font-semibold" style={{ fontSize: 11 }}>Network</span>
        </div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>All Service Centers</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage and monitor all MotoMate service center locations.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Centers', value: '12', icon: MapPin },
          { label: 'Open Now', value: '11', icon: CheckCircle2 },
          { label: 'Total Mechanics', value: '52', icon: Users },
          { label: 'Active Jobs', value: '57', icon: Wrench },
        ].map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <div className="icon-box icon-box-amber" style={{ width: 40, height: 40 }}>
              <s.icon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</p>
              <p className="text-zinc-500" style={{ fontSize: 12 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <div className="relative" style={{ maxWidth: 400 }}>
          <Search className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search centers by name or location..."
            className="input-field w-full pl-11 pr-4 py-3" style={{ fontSize: 14, borderRadius: 12 }} />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((center, i) => (
          <motion.div key={center.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }} whileHover={{ y: -2 }}
            className="card p-5 cursor-pointer group" style={{ borderRadius: 16 }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors" style={{ fontSize: 14 }}>{center.name}</h3>
                  <span className={center.status === 'Open' ? 'badge-green' : 'badge-red'} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 6 }}>{center.status}</span>
                </div>
                <p className="text-zinc-500 leading-relaxed" style={{ fontSize: 12 }}>{center.address}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-amber-400 transition-colors flex-shrink-0" />
            </div>

            <div className="flex items-center gap-4 mb-3 text-zinc-400" style={{ fontSize: 12 }}>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{center.phone}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{center.hours}</span>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {center.specialties.map((spec) => (
                <span key={spec} className="elevated text-zinc-400 font-medium rounded-md" style={{ fontSize: 10, padding: '2px 8px', border: '1px solid var(--border-secondary)' }}>{spec}</span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-primary)' }}>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1" style={{ fontSize: 12 }}>
                  <Star className="text-amber-400 fill-amber-400" style={{ width: 14, height: 14 }} />
                  <span className="text-white font-semibold">{center.rating}</span>
                  <span className="text-zinc-600">({center.reviews})</span>
                </span>
                <span className="flex items-center gap-1 text-zinc-400" style={{ fontSize: 12 }}>
                  <Users style={{ width: 14, height: 14 }} />{center.mechanics} mechanics
                </span>
              </div>
              <span className="flex items-center gap-1 text-amber-400 font-medium" style={{ fontSize: 12 }}>
                <Wrench style={{ width: 14, height: 14 }} />{center.activeJobs} active
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
