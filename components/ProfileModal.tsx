
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
      // Focus modal for screen readers
      modalRef.current?.focus();
      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [builder]);

  if (!builder) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 outline-none"
      >
        <button 
          onClick={onClose}
          aria-label="Close profile modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <Icons.X />
        </button>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8 text-left">
            <img 
              src={builder.avatarUrl} 
              alt="" 
              aria-hidden="true"
              className="w-32 h-32 rounded-3xl object-cover bg-slate-100 ring-4 ring-slate-50"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 id="modal-title" className="text-3xl font-bold text-slate-900">{builder.name}</h2>
                {builder.featured && (
                  <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">Spotlight</span>
                )}
              </div>
              <p className="text-emerald-600 font-semibold text-lg mb-4">{builder.role} @ {builder.projectName}</p>
              
              <div className="grid grid-cols-2 gap-4 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <Icons.MapPin />
                  {builder.city ? `${builder.city}, ` : ''}{builder.country}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {builder.ecosystem} Ecosystem
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Biography</h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                {builder.bio}
              </p>
            </section>

            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tech Stack & Skills</h4>
              <div className="flex flex-wrap gap-2">
                {builder.skills.map(skill => (
                  <span key={skill} className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-4">
              <a 
                href={builder.website} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 focus:ring-2 focus:ring-slate-500 outline-none"
              >
                <Icons.Globe />
                View Website
              </a>
              <a 
                href={`https://x.com/${builder.twitter}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold text-sm hover:bg-emerald-100 transition-colors focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <Icons.Twitter />
                @{builder.twitter}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
