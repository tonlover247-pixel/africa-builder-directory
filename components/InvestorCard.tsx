
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ArrowUpRight, Zap, ShieldCheck, Globe } from 'lucide-react';
// Added missing import for Link from react-router-dom
import { Link } from 'react-router-dom';
import { Investor } from '../types';

interface Props {
  investor: Investor;
}

export const InvestorCard: React.FC<Props> = ({ investor }) => {
  const [showPremiumOverlay, setShowPremiumOverlay] = useState(false);

  // Extract domain for unavatar logo
  const domain = investor.website.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
  const logoUrl = `https://unavatar.io/${domain}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(investor.name)}&background=10b981&color=fff&bold=true`;
  
  // High-quality architectural/professional images
  const unsplashPhotoIds = [
    "1486406146926-c627a92ad1ab", "1497366216548-37526070297c", "1504384308090-c894fdcc538d",
    "1556761175-4b46a572b786", "1497366811353-6870744d04b2", "1554469384-e58fac16e23a",
    "1524758631624-e2822e304c36", "1531973576160-7125cd663d86", "1491897554428-130a60dd4757",
    "1577412647305-991150c7d163"
  ];
  
  // Robust hash for string IDs to ensure variety
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const photoIndex = getHash(investor.id) % unsplashPhotoIds.length;
  const coverImageUrl = `https://images.unsplash.com/photo-${unsplashPhotoIds[photoIndex]}?auto=format&fit=crop&q=80&w=800`;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative overflow-hidden group bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] shadow-2xl flex flex-col h-full"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img src={coverImageUrl} alt="" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
        <div className="absolute -bottom-6 left-7 p-1 bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <img src={logoUrl} alt={investor.name} className="w-12 h-12 object-contain" onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(investor.name)}&background=10b981&color=fff`)} />
          </div>
        </div>
        <div className="absolute top-6 right-6 bg-emerald-500 text-black px-5 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] z-10 border-2 border-emerald-400">
          <p className="text-[9px] font-black uppercase tracking-widest opacity-70 leading-none mb-1">Max Check</p>
          <p className="font-mono font-black text-lg leading-none">{investor.checkSize}</p>
        </div>
      </div>
      
      <div className="p-7 pt-12 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-3xl font-black tracking-tighter group-hover:text-emerald-400 transition-colors duration-300 leading-tight italic">{investor.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">{investor.type}</span>
              {investor.isPremium && <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-300"><Crown size={10} className="fill-emerald-300" /> TOP TIER</span>}
            </div>
          </div>
        </div>
        
        <p className="text-zinc-500 text-xs font-bold mb-8 line-clamp-2 leading-relaxed italic opacity-80">Focus: {investor.sectors.join(" • ")}</p>

        <div className="mt-auto space-y-4">
          <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-2">Footprint</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {investor.regions.slice(0, 3).map(r => (
                <span key={r} className="text-zinc-300 font-bold text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setShowPremiumOverlay(true)} className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-black font-black rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-emerald-500/10">UNLOCK PITCH <ArrowUpRight size={18} /></button>
            <a href={investor.website} target="_blank" rel="noreferrer" className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all"><Globe size={20} /></a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPremiumOverlay && (
          <motion.div initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(24px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }} className="absolute inset-0 z-20 bg-black/95 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mb-8 border border-emerald-500/20 rotate-12 shadow-2xl shadow-emerald-500/20"><ShieldCheck size={40} /></div>
            <h3 className="text-white text-2xl font-black mb-4 tracking-tighter uppercase italic">Capital Intro</h3>
            <p className="text-zinc-500 text-sm font-bold leading-relaxed mb-10 px-4">Direct connection to <span className="text-emerald-400">{investor.name}</span> requires a verified Builder profile.</p>
            <div className="flex flex-col w-full gap-4">
              <Link to="/submit" className="py-4.5 bg-emerald-600 text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl text-center">Start Verification</Link>
              <button onClick={() => setShowPremiumOverlay(false)} className="py-3 text-zinc-600 font-black text-xs uppercase tracking-widest hover:text-white transition-all">Dismiss</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
