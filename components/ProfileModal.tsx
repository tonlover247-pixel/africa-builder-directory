
import React, { useEffect, useRef } from 'react';
import { Builder } from '../types';
import { Icons } from '../constants';

interface Props {
  builder: Builder | null;
  onClose: () => void;
}

export const ProfileModal: React.FC<Props> = ({ builder, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (builder) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [builder]);

  if (!builder) return null;

  const twitterHandle = builder.twitter?.replace('@', '').trim();
  const avatarSrc = builder.avatarUrl && !builder.avatarUrl.includes('placeholder')
    ? builder.avatarUrl 
    : twitterHandle 
      ? `https://unavatar.io/twitter/${twitterHandle}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(builder.name)}&background=f97316&color=fff&size=256&bold=true`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-zinc-950 w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 border border-white/10 outline-none"
      >
        <button 
          onClick={onClose}
          aria-label="Close profile modal"
          className="absolute top-6 right-6 p-2.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300 z-10"
        >
          <Icons.X />
        </button>

        <div className="relative">
          {/* Header Banner */}
          <div className="h-40 bg-gradient-to-br from-orange-600/20 via-emerald-600/10 to-transparent absolute top-0 left-0 right-0"></div>
          
          <div className="p-8 md:p-12 relative pt-20">
            <div className="flex flex-col md:flex-row gap-8 mb-10 text-left items-start md:items-center">
              <div className="relative group">
                <img 
                  src={avatarSrc} 
                  alt="" 
                  aria-hidden="true"
                  className="w-40 h-40 rounded-[2rem] object-cover bg-zinc-900 ring-4 ring-white/5 shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(builder.name)}&background=f97316&color=fff&size=256&bold=true`;
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-zinc-950"></div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 id="modal-title" className="text-4xl font-black text-white tracking-tighter italic">{builder.name}</h2>
                  {builder.featured && (
                    <span className="bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">Spotlight</span>
                  )}
                </div>
                <p className="text-orange-500 font-black text-xl mb-5 flex items-center gap-2">
                  {builder.role} <span className="text-zinc-700">/</span> {builder.projectName}
                </p>
                
                <div className="flex flex-wrap gap-6 text-zinc-400 text-sm font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Icons.MapPin />
                    {builder.city ? `${builder.city}, ` : ''}{builder.country}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                    {builder.ecosystem}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h4 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Mission Statement</h4>
                  <p className="text-zinc-300 leading-relaxed text-lg font-bold italic">
                    "{builder.bio}"
                  </p>
                </section>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={builder.website} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2.5 px-8 py-5 rounded-[1.5rem] bg-white text-black font-black text-base hover:bg-zinc-200 transition-all shadow-xl"
                  >
                    <Icons.Globe />
                    Live Project
                  </a>
                  <a 
                    href={`https://x.com/${builder.twitter}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2.5 px-8 py-5 rounded-[1.5rem] bg-white/5 text-white border border-white/10 font-black text-base hover:bg-white/10 transition-all"
                  >
                    <Icons.Twitter />
                    @{builder.twitter}
                  </a>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {builder.skills.map(skill => (
                      <span key={skill} className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 font-black text-[10px] border border-white/5 uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
                
                <div className="p-6 bg-orange-500/5 rounded-[2rem] border border-orange-500/10">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">AfricaBuilders ID</p>
                  <p className="text-zinc-400 font-bold text-sm">
                    {new Date(builder.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
