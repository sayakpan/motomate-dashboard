'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Package, Search, ShoppingCart, Plus, Minus, AlertTriangle, Box } from 'lucide-react';

const categories = ['All', 'Engine', 'Brakes', 'Chain & Sprocket', 'Electrical', 'Filters', 'Suspension'];

const parts = [
  { id: 1, name: 'NGK Spark Plug CPR8EA-9', category: 'Engine', price: 285, stock: 142, sku: 'SP-NGK-8EA9', compatible: 'RE Classic / Meteor', image: '🔌', status: 'In Stock' },
  { id: 2, name: 'Brembo Brake Pad Set (Front)', category: 'Brakes', price: 1850, stock: 38, sku: 'BP-BRM-F01', compatible: 'KTM Duke 390 / RC', image: '🛑', status: 'In Stock' },
  { id: 3, name: 'DID 520 O-Ring Chain (120L)', category: 'Chain & Sprocket', price: 2400, stock: 24, sku: 'CH-DID-520', compatible: 'Universal 300-500cc', image: '⛓️', status: 'In Stock' },
  { id: 4, name: 'Denso Ignition Coil', category: 'Electrical', price: 1200, stock: 56, sku: 'EC-DNS-IC01', compatible: 'Honda CB/CBR Series', image: '⚡', status: 'In Stock' },
  { id: 5, name: 'K&N Air Filter (HA-3502)', category: 'Filters', price: 1650, stock: 8, sku: 'FL-KN-3502', compatible: "Honda CB350 / H'ness", image: '🌀', status: 'Low Stock' },
  { id: 6, name: 'Kayaba Front Fork Oil Seal', category: 'Suspension', price: 750, stock: 67, sku: 'SU-KYB-FS1', compatible: 'Yamaha FZ / R15', image: '🔧', status: 'In Stock' },
  { id: 7, name: 'HiFlo Oil Filter HF155', category: 'Filters', price: 420, stock: 0, sku: 'FL-HF-155', compatible: 'KTM Duke / RC Series', image: '🛢️', status: 'Out of Stock' },
  { id: 8, name: 'Clutch Plate Kit (6pc)', category: 'Engine', price: 1950, stock: 31, sku: 'EN-CP-6PK', compatible: 'Bajaj Pulsar NS200/RS', image: '⚙️', status: 'In Stock' },
  { id: 9, name: 'RK Gold Chain 428 (132L)', category: 'Chain & Sprocket', price: 1100, stock: 45, sku: 'CH-RK-428G', compatible: 'Universal 125-200cc', image: '⛓️', status: 'In Stock' },
];

const statusMap = { 'In Stock': 'badge-green', 'Low Stock': 'badge-amber', 'Out of Stock': 'badge-red' };

export default function SparePartsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});

  const filtered = parts.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.compatible.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((prev) => { const n = { ...prev }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 uppercase tracking-widest font-semibold" style={{ fontSize: 11 }}>Inventory</span>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Spare Parts</h1>
          <p className="text-zinc-500 text-sm mt-1">Browse and order genuine spare parts for all bike brands.</p>
        </div>
        {cartCount > 0 && (
          <motion.button initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-black rounded-xl font-semibold cursor-pointer" style={{ fontSize: 13 }}>
            <ShoppingCart className="w-4 h-4" />Cart ({cartCount})
          </motion.button>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 space-y-4">
        <div className="relative" style={{ maxWidth: 400 }}>
          <Search className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search parts by name or compatibility..."
            className="input-field w-full pl-11 pr-4 py-3" style={{ fontSize: 14 }} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${selectedCategory === cat ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              style={selectedCategory === cat
                ? { fontSize: 12, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }
                : { fontSize: 12, background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}>
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((part, i) => (
          <motion.div key={part.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.03 }} className="card p-5 group" style={{ borderRadius: 16 }}>
            <div className="flex items-start justify-between mb-3">
              <div className="elevated w-12 h-12 rounded-xl flex items-center justify-center text-2xl">{part.image}</div>
              <span className={`${statusMap[part.status]} font-medium rounded-md`} style={{ fontSize: 10, padding: '2px 8px' }}>{part.status}</span>
            </div>
            <h3 className="font-semibold text-zinc-200 mb-1 group-hover:text-white transition-colors" style={{ fontSize: 14 }}>{part.name}</h3>
            <p className="text-zinc-600 mb-1 font-mono" style={{ fontSize: 11 }}>{part.sku}</p>
            <p className="text-zinc-500 mb-3" style={{ fontSize: 12 }}>{part.compatible}</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>₹{part.price.toLocaleString()}</span>
              <span className="text-zinc-500 flex items-center gap-1" style={{ fontSize: 12 }}>
                <Box className="w-3 h-3" />{part.stock} in stock
              </span>
            </div>

            {part.stock > 0 ? (
              cart[part.id] ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => removeFromCart(part.id)}
                    className="elevated w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    style={{ border: '1px solid var(--border-secondary)' }}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center text-sm font-semibold text-white">{cart[part.id]}</span>
                  <button onClick={() => addToCart(part.id)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-amber-400 cursor-pointer"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => addToCart(part.id)}
                  className="elevated w-full py-2.5 rounded-xl font-medium text-zinc-300 hover:text-amber-400 transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontSize: 13, border: '1px solid var(--border-secondary)' }}>
                  <Plus className="w-4 h-4" /> Add to Order
                </motion.button>
              )
            ) : (
              <button className="elevated w-full py-2.5 rounded-xl font-medium text-zinc-600 cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontSize: 13, border: '1px solid var(--border-secondary)' }}>
                <AlertTriangle className="w-4 h-4" /> Notify when available
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
