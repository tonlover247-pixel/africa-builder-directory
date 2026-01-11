
import React from 'react';
import { motion } from 'framer-motion';
import { Builder, Ecosystem } from '../types';
import { Icons } from '../constants';

interface Props {
  builder: Builder;
  onClick: (builder: Builder) => void;
}

export const BuilderCard: React.FC<Props> = ({ builder, onClick }) => {
  const getEcosystemColor = (eco: Ecosystem) => {
    switch(eco) {
      case Ecosystem.SOLANA: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case Ecosystem.ETHEREUM: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case Ecosystem.BITCOIN: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case Ecosystem.SUI: return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case Ecosystem.BASE: return 'bg-blue-600/10 text-blue-400 border-blue-600/20';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  const twitterHandle = builder.twitter?.replace('@', '').trim();
  
  // Robust image sourcing:
  // 1. Explicit avatarUrl
  // 2. Unavatar for Twitter (X)
  // 3. Clear UI Avatars as fallback
  const avatarSrc = builder.avatarUrl && !builder.avatarUrl.includes('placeholder')
    ? builder.avatarUrl 
    : twitterHandle 
      ? `https://unavatar.io/twitter/${twitterHandle}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(builder.name)}&background=f97316&color=fff&size=256&bold=true`;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(builder)}
      className="group bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 hover:border-orange-500/40 hover:shadow-[0_40px_80px_rgba(249,115,22,0.1)] transition-all duration-500 cursor-pointer relative"
    >
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
      
      {builder.featured && (
        <div className="absolute -top-3 left-6 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.15em] px-4 py-2 rounded-full flex items-center gap-2 shadow-xl ring-4 ring-[#050505] z-10">
          <Icons.Star />
          ELITE
        </div>
      )}
      
      <div className="flex items-center gap-5 mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-white/5 group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
            <img 
              src={avatarSrc} 
              alt={builder.name} 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Final fallback if unavatar fails for a specific handle
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(builder.name)}&background=f97316&color=fff&size=256&bold=true`;
              }}
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-4 border-[#0a0a0a]"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-2xl text-white truncate group-hover:text-orange-500 transition-colors duration-300 tracking-tight">
            {builder.name}
          </h3>
          <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.2em] mt-1">{builder.role}</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-zinc-300 font-black text-lg truncate flex items-center gap-2 mb-2">
           {builder.projectName}
        </h4>
        <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed font-bold italic">
          "{builder.bio}"
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black border uppercase tracking-[0.1em] ${getEcosystemColor(builder.ecosystem)}`}>
          {builder.ecosystem}
        </span>
        {builder.skills.slice(0, 2).map(skill => (
          <span key={skill} className="px-4 py-1.5 rounded-xl text-[9px] font-black bg-zinc-900 text-zinc-500 border border-white/5 uppercase tracking-[0.1em]">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
