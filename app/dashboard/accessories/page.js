'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShoppingBag, Search, Star, Heart, ShoppingCart, Plus, Check } from 'lucide-react';

const categories = ['All', 'Helmets', 'Riding Gear', 'Luggage', 'Protection', 'Accessories', 'Tools'];

const products = [
  { id: 1, name: 'MT Thunder 4 SV Helmet', category: 'Helmets', price: 8500, originalPrice: 9999, rating: 4.8, reviews: 234, image: '🪖', badge: 'Best Seller', badgeClass: 'badge-amber' },
  { id: 2, name: 'Rynox Storm Evo 2 Jacket', category: 'Riding Gear', price: 4950, originalPrice: 5500, rating: 4.7, reviews: 189, image: '🧥', badge: null },
  { id: 3, name: 'ViaTerra Claw Mini Saddlebag', category: 'Luggage', price: 3200, originalPrice: 3200, rating: 4.6, reviews: 87, image: '🎒', badge: 'New', badgeClass: 'badge-green' },
  { id: 4, name: 'Cramster Blaster Riding Gloves', category: 'Riding Gear', price: 2100, originalPrice: 2500, rating: 4.5, reviews: 156, image: '🧤', badge: '-16%', badgeClass: 'badge-red' },
  { id: 5, name: 'Solace CE Level 2 Knee Guard', category: 'Protection', price: 3800, originalPrice: 3800, rating: 4.9, reviews: 312, image: '🦿', badge: 'Top Rated', badgeClass: 'badge-amber' },
  { id: 6, name: 'Oxford Rainseal Over Suit', category: 'Riding Gear', price: 2850, originalPrice: 3200, rating: 4.4, reviews: 98, image: '🌧️', badge: null },
  { id: 7, name: 'RAM Mount X-Grip Phone Holder', category: 'Accessories', price: 1800, originalPrice: 1800, rating: 4.7, reviews: 445, image: '📱', badge: 'Popular', badgeClass: 'badge-blue' },
  { id: 8, name: 'Topeak Torque Wrench Set', category: 'Tools', price: 4200, originalPrice: 4900, rating: 4.8, reviews: 67, image: '🔧', badge: null },
  { id: 9, name: 'SMK Stellar Sports Helmet', category: 'Helmets', price: 5600, originalPrice: 6500, rating: 4.6, reviews: 178, image: '🪖', badge: '-14%', badgeClass: 'badge-red' },
  { id: 10, name: 'Barkbusters VPS Handguards', category: 'Protection', price: 4500, originalPrice: 4500, rating: 4.5, reviews: 89, image: '🛡️', badge: null },
  { id: 11, name: 'SHAD SH39 Top Case (39L)', category: 'Luggage', price: 7800, originalPrice: 8500, rating: 4.7, reviews: 56, image: '📦', badge: null },
  { id: 12, name: 'ProTaper Handlebar Grips', category: 'Accessories', price: 950, originalPrice: 1200, rating: 4.3, reviews: 203, image: '✊', badge: '-21%', badgeClass: 'badge-red' },
];

export default function AccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleWishlist = (id) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleAddToCart = (id) => { setAddedToCart((prev) => ({ ...prev, [id]: true })); setTimeout(() => setAddedToCart((prev) => ({ ...prev, [id]: false })), 2000); };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 uppercase tracking-widest font-semibold" style={{ fontSize: 11 }}>Shop</span>
        </div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Accessories</h1>
        <p className="text-zinc-500 text-sm mt-1">Riding gear, protection, and accessories for every rider.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 space-y-4">
        <div className="relative" style={{ maxWidth: 400 }}>
          <Search className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accessories..."
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
        {filtered.map((product, i) => {
          const hasDiscount = product.price < product.originalPrice;
          return (
            <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.03 }} whileHover={{ y: -3 }}
              className="card overflow-hidden group" style={{ borderRadius: 16 }}>
              {/* Image */}
              <div className="relative flex items-center justify-center" style={{ height: 160, background: 'var(--bg-sidebar)' }}>
                <span className="text-5xl">{product.image}</span>
                {product.badge && (
                  <span className={`${product.badgeClass} absolute top-3 left-3 font-semibold rounded-md`} style={{ fontSize: 10, padding: '2px 8px' }}>{product.badge}</span>
                )}
                <button onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all"
                  style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
                  <Heart className={`w-4 h-4 transition-colors ${wishlist[product.id] ? 'text-red-400 fill-red-400' : 'text-zinc-400'}`} />
                </button>
              </div>

              <div className="p-4">
                <p className="text-zinc-600 uppercase tracking-wider mb-1" style={{ fontSize: 11 }}>{product.category}</p>
                <h3 className="font-semibold text-zinc-200 mb-2 group-hover:text-white transition-colors leading-snug" style={{ fontSize: 14 }}>{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1" style={{ fontSize: 12 }}>
                    <Star className="text-amber-400 fill-amber-400" style={{ width: 14, height: 14 }} />
                    <span className="text-white font-medium">{product.rating}</span>
                  </span>
                  <span className="text-zinc-600" style={{ fontSize: 11 }}>({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>₹{product.price.toLocaleString()}</span>
                  {hasDiscount && <span className="text-zinc-600 line-through" style={{ fontSize: 13 }}>₹{product.originalPrice.toLocaleString()}</span>}
                </div>
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => handleAddToCart(product.id)}
                  className={`w-full py-2.5 rounded-xl font-medium transition-all cursor-pointer flex items-center justify-center gap-2`}
                  style={addedToCart[product.id]
                    ? { fontSize: 13, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }
                    : { fontSize: 13, background: 'var(--bg-elevated)', border: '1px solid var(--border-secondary)', color: '#d4d4d8' }}>
                  {addedToCart[product.id] ? (<><Check className="w-4 h-4" /> Added!</>) : (<><ShoppingCart className="w-4 h-4" /> Add to Cart</>)}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
