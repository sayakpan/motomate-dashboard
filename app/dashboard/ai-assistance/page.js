'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Wrench, Sparkles, AlertTriangle, Settings2, Bike, Plus, Copy, Check } from 'lucide-react';

const suggestedPrompts = [
  { icon: Wrench, text: 'How to adjust chain tension on a Honda CB350?', category: 'Repair' },
  { icon: AlertTriangle, text: 'Diagnose engine misfiring on Royal Enfield Classic', category: 'Diagnose' },
  { icon: Settings2, text: 'Carburetor tuning steps for Bajaj Pulsar NS200', category: 'Tuning' },
  { icon: Bike, text: 'What oil grade is recommended for KTM Duke 390?', category: 'Specs' },
];

const staticResponses = {
  chain: `## Chain Tension Adjustment — Honda CB350\n\nHere's the step-by-step procedure:\n\n**Tools Required:**\n• 12mm & 14mm spanners\n• Chain tension gauge (or ruler)\n• Rear paddock stand\n\n**Steps:**\n\n1. **Place the bike on a paddock stand** so the rear wheel is off the ground and can spin freely.\n\n2. **Loosen the rear axle nut** using the 14mm spanner — don't remove it completely, just loosen enough to allow wheel movement.\n\n3. **Locate the chain adjusters** on both sides of the swingarm. Turn both adjusters equally using the 12mm spanner.\n\n4. **Check slack:** Push the chain at the midpoint between sprockets. The CB350 spec calls for **20-30mm of free play**.\n\n5. **Tighten the axle nut** to the torque spec of **59 N·m** once the correct tension is achieved.\n\n6. **Verify wheel alignment** using the markings on both sides of the swingarm — both should match.\n\n⚠️ **Pro Tip:** Always check chain tension with the bike on the ground (rider weight applied) for final verification. Over-tightening causes premature sprocket wear.`,
  misfire: `## Engine Misfire Diagnosis — Royal Enfield Classic\n\nLet me walk you through a systematic diagnosis:\n\n**Step 1: Check Spark**\n• Remove the spark plug and inspect for fouling\n• RE Classic uses **NGK CPR8EA-9** — check gap is 0.8-0.9mm\n• Ground the plug against the engine and kick — look for consistent blue spark\n\n**Step 2: Check Fuel Delivery**\n• Ensure fuel tap is ON and fuel flows freely\n• Inspect fuel filter for blockage\n• For FI models: Listen for fuel pump priming (2-second whine on ignition)\n\n**Step 3: Compression Test**\n• Expected reading: **140-160 PSI** for the Classic 350\n• Below 120 PSI suggests valve or ring issues\n\n**Step 4: Common Culprits**\n• **Ignition coil** — Check resistance: Primary 2-3Ω, Secondary 10-15kΩ\n• **Vacuum leak** — Spray carb cleaner around intake boot; RPM change = leak found\n• **Clogged pilot jet** — Very common after storage\n\n🔧 **Most likely cause for intermittent misfire:** Loose ignition coil connector or degraded spark plug cap. Start there — it resolves ~60% of RE Classic misfire cases.`,
  carburetor: `## Carburetor Tuning — Bajaj Pulsar NS200\n\nThe Pulsar NS200 uses a **Mikuni BS26** carburetor. Here's how to tune it:\n\n**Idle Speed Adjustment:**\n1. Warm up the engine to operating temperature (~5 mins)\n2. Locate the **idle speed screw** on the right side of the carb\n3. Set idle to **1300 ± 100 RPM** using a tachometer\n\n**Air-Fuel Mixture:**\n1. Locate the **pilot air screw** (bottom of carb body)\n2. Turn it fully clockwise (gently!), then back out **2.5 turns** as baseline\n3. Fine-tune in 1/4 turn increments for smoothest idle\n4. The sweet spot is usually between **2.0 - 3.0 turns out**\n\n**Float Level:**\n• Should be set to **14mm** measured from the gasket surface\n• Incorrect float level = rich/lean issues at all RPMs\n\n💡 **Quick Test:** Ride at steady 40km/h and do a snap throttle — if the bike hesitates or bogs, it's lean on the pilot circuit. Richen by turning the air screw in by 1/4 turn.`,
  oil: `## Recommended Oil — KTM Duke 390\n\n**Factory Specification:**\n• **Motorex Power Synt 4T 10W-50** (fully synthetic)\n• API: **SN** or higher, JASO: **MA2**\n• Capacity: **1.8 liters** (with filter change)\n\n**Alternative Compatible Oils:**\n• Motul 7100 — 10W-50 — Full Synthetic\n• Shell Advance Ultra — 10W-40 — Full Synthetic\n• Castrol Power1 Racing — 10W-50 — Full Synthetic\n\n**Oil Change Interval:**\n• Every **5,000 km** or **6 months**, whichever comes first\n• For harsh conditions (city riding, high temp): **3,500 km**\n\n**Important Notes:**\n• Always replace the **oil filter** with every change (use KTM OEM or HiFlo HF155)\n• Drain bolt torque: **20 N·m**\n• Filter cover bolts: **10 N·m**\n\n⚠️ **Never use car engine oil** — motorcycles need JASO MA/MA2 rated oils for wet clutch compatibility. Car oils with friction modifiers will cause clutch slip.`,
};

function getResponse(message) {
  const l = message.toLowerCase();
  if (l.includes('chain') || l.includes('tension')) return staticResponses.chain;
  if (l.includes('misfire') || l.includes('diagnos')) return staticResponses.misfire;
  if (l.includes('carburetor') || l.includes('carb') || l.includes('tuning')) return staticResponses.carburetor;
  if (l.includes('oil') || l.includes('grade') || l.includes('ktm')) return staticResponses.oil;
  return `I can help you with that! Based on my database, here are some suggestions:\n\n1. **Check the service manual** for the specific model you're working on\n2. **Run a basic diagnostic** — check electrical connections, fluid levels, and visual inspection\n3. **Use the MotoMate diagnostic tool** for ECU readings if applicable\n\nCould you provide more details about the specific bike model and the exact symptoms you're observing? This will help me give you more targeted repair guidance.\n\n💡 *Tip: You can ask me about specific repair procedures, torque specs, part numbers, or diagnostic steps for any common motorcycle.*`;
}

function formatMessage(text) {
  let h = text;
  h = h.replace(/^## (.+)$/gm, '<h3 style="font-size:15px;font-weight:700;color:#fff;margin-bottom:12px;font-family:var(--font-heading)">$1</h3>');
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e4e4e7;font-weight:600">$1</strong>');
  h = h.replace(/\*(.+?)\*/g, '<em style="color:#a1a1aa;font-style:italic">$1</em>');
  h = h.replace(/^• (.+)$/gm, '<div style="display:flex;gap:8px;margin-left:4px;margin-bottom:4px"><span style="color:#fbbf24">•</span><span>$1</span></div>');
  h = h.replace(/^(\d+)\. (.+)$/gm, '<div style="display:flex;gap:10px;margin-left:4px;margin-bottom:6px"><span style="color:#fbbf24;font-family:monospace;font-size:12px;margin-top:3px;font-weight:700;min-width:18px">$1.</span><span>$2</span></div>');
  h = h.replace(/^⚠️ (.+)$/gm, '<div style="margin-top:12px;padding:12px;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.15);border-radius:8px;color:#fde68a;font-size:13px">⚠️ $1</div>');
  h = h.replace(/^💡 (.+)$/gm, '<div style="margin-top:12px;padding:12px;background:rgba(59,130,246,0.05);border:1px solid rgba(59,130,246,0.15);border-radius:8px;color:#93c5fd;font-size:13px">💡 $1</div>');
  h = h.replace(/^🔧 (.+)$/gm, '<div style="margin-top:12px;padding:12px;background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.15);border-radius:8px;color:#86efac;font-size:13px">🔧 $1</div>');
  h = h.replace(/\n\n/g, '<br/><br/>');
  h = h.replace(/\n/g, '<br/>');
  return h;
}

export default function AIAssistancePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: text, id: Date.now() }]);
    setInput('');
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    const response = getResponse(text);
    setIsTyping(false);
    setMessages((prev) => [...prev, { role: 'assistant', content: response, id: Date.now() + 1 }]);
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input); };
  const copyMessage = (id, content) => { navigator.clipboard.writeText(content); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="px-8 py-5 flex items-center justify-between flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border-primary)' }}>
        <div className="flex items-center gap-3">
          <div className="relative" style={{ width: 40, height: 40 }}>
            <div className="icon-box icon-box-amber w-full h-full" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,88,12,0.1))' }}>
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div className="absolute rounded-full" style={{ bottom: -2, right: -2, width: 12, height: 12, background: '#4ade80', border: '2px solid #09090b' }} />
          </div>
          <div>
            <h1 className="font-bold text-white flex items-center gap-2" style={{ fontSize: 15, fontFamily: 'var(--font-heading)' }}>
              MotoMate AI
              <span className="badge-amber rounded-full font-medium" style={{ fontSize: 10, padding: '2px 8px' }}>v2.4</span>
            </h1>
            <p className="text-zinc-500" style={{ fontSize: 12 }}>Bike repair & diagnostics assistant</p>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setMessages([]); setIsTyping(false); }}
          className="card-sm p-2.5 text-zinc-400 hover:text-white transition-all cursor-pointer" title="New Chat">
          <Plus className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {messages.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="h-full flex flex-col items-center justify-center" style={{ maxWidth: 640, margin: '0 auto' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="icon-box icon-box-amber mb-6" style={{ width: 64, height: 64, borderRadius: 16 }}>
              <Sparkles className="w-7 h-7 text-amber-400" />
            </motion.div>
            <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>How can I help you fix it?</h2>
            <p className="text-zinc-500 text-sm text-center mb-10" style={{ maxWidth: 400 }}>
              I&apos;m your AI mechanic assistant. Ask me about repair procedures, diagnostics, torque specs, part numbers, or troubleshooting steps.
            </p>
            <div className="grid grid-cols-2 gap-3 w-full" style={{ maxWidth: 520 }}>
              {suggestedPrompts.map((prompt, i) => (
                <motion.button key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                  onClick={() => sendMessage(prompt.text)}
                  className="card-sm text-left p-4 cursor-pointer group" style={{ transition: 'all 0.2s' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <prompt.icon className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                    <span className="text-zinc-600 uppercase tracking-wider font-semibold" style={{ fontSize: 10 }}>{prompt.category}</span>
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors leading-snug" style={{ fontSize: 13 }}>{prompt.text}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div style={{ maxWidth: 720, margin: '0 auto' }} className="space-y-6">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="icon-box icon-box-amber flex-shrink-0 mt-1" style={{ width: 32, height: 32 }}>
                      <Bot className="w-4 h-4 text-amber-400" />
                    </div>
                  )}
                  <div className={`relative group ${msg.role === 'user' ? 'max-w-[70%]' : 'max-w-[85%]'}`}>
                    <div className="px-4 py-3" style={msg.role === 'user'
                      ? { background: '#f59e0b', color: '#000', borderRadius: '16px 16px 4px 16px', fontWeight: 500, fontSize: 14 }
                      : { background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: '16px 16px 16px 4px', color: '#d4d4d8', fontSize: 14, lineHeight: 1.7 }}>
                      {msg.role === 'assistant'
                        ? <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                        : msg.content}
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => copyMessage(msg.id, msg.content)}
                          className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 transition-all cursor-pointer">
                          {copiedId === msg.id ? <Check className="text-green-400" style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex gap-3">
                  <div className="icon-box icon-box-amber flex-shrink-0" style={{ width: 32, height: 32 }}>
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="card-sm px-4 py-3" style={{ borderRadius: '16px 16px 16px 4px' }}>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(245,158,11,0.6)', animation: 'typing-dot 1.4s infinite', animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-8 py-5 flex-shrink-0" style={{ borderTop: '1px solid var(--border-primary)' }}>
        <form onSubmit={handleSubmit} className="relative" style={{ maxWidth: 720, margin: '0 auto' }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the issue or ask a repair question..."
            className="input-field w-full pr-14" style={{ padding: '16px 56px 16px 20px', fontSize: 14, borderRadius: 16 }} />
          <motion.button type="submit" disabled={!input.trim() || isTyping} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed">
            <Send style={{ width: 18, height: 18 }} />
          </motion.button>
        </form>
        <p className="text-center text-zinc-600 mt-2.5" style={{ fontSize: 11, maxWidth: 720, margin: '10px auto 0' }}>
          MotoMate AI provides repair guidance based on manufacturer specs. Always verify critical torque values and safety procedures.
        </p>
      </div>
    </div>
  );
}
