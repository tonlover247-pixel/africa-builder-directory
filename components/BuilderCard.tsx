
import React from 'react';
import { Builder, Ecosystem } from '../types';
import { Icons } from '../constants';

interface Props {
  builder: Builder;
  onClick: (builder: Builder) => void;
}

export const BuilderCard: React.FC<Props> = ({ builder, onClick }) => {
  const getEcosystemColor = (eco: Ecosystem) => {
    switch(eco) {
      case Ecosystem.SOLANA: return 'bg-purple-100 text-purple-700 border-purple-200';
      case Ecosystem.ETHEREUM: return 'bg-blue-100 text-blue-700 border-blue-200';
      case Ecosystem.BITCOIN: return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(builder);
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={() => onClick(builder)}
      onKeyDown={handleKeyDown}
      aria-label={`View profile of ${builder.name}, ${builder.role} at ${builder.projectName}`}
      className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer relative outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      {builder.featured && (
        <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20">
          <Icons.Star />
          Spotlight
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={builder.avatarUrl} 
          alt="" 
          aria-hidden="true"
          className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-100 group-hover:scale-105 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 truncate group-hover:text-emerald-600 transition-colors">
            {builder.name}
          </h3>
          <p className="text-slate-500 text-sm font-medium">{builder.role}</p>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1">
            <Icons.MapPin />
            {builder.city ? `${builder.city}, ` : ''}{builder.country}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project</span>
          <span className="h-[1px] flex-1 bg-slate-100"></span>
        </div>
        <p className="text-slate-700 font-semibold text-sm truncate">{builder.projectName}</p>
        <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">
          {builder.bio}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-tight ${getEcosystemColor(builder.ecosystem)}`}>
          {builder.ecosystem}
        </span>
        {builder.skills.slice(0, 2).map(skill => (
          <span key={skill} className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 uppercase tracking-tight">
            {skill}
          </span>
        ))}
        {builder.skills.length > 2 && (
          <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-50 text-slate-400 border border-slate-100 uppercase tracking-tight">
            +{builder.skills.length - 2}
          </span>
        )}
      </div>
    </div>
  );
};
