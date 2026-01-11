
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Builder, Role, Ecosystem } from './types';
import { getBuilders, saveBuilder, updateBuilderStatus, deleteBuilder } from './services/storage';
import { Icons, AFRICAN_COUNTRIES } from './constants';
import { BuilderCard } from './components/BuilderCard';
import { ProfileModal } from './components/ProfileModal';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin';

const Home = ({ builders, onBuilderClick }: any) => {
  const spotlights = useMemo(() => builders.filter((b: any) => b.approved && b.featured).slice(0, 3), [builders]);
  return (
    <div className="space-y-24 pb-24">
      <section className="pt-20 px-6 text-center max-w-4xl mx-auto space-y-8">
        <h1 className="text-6xl font-bold text-slate-900 leading-tight">
          Find the best <span className="text-emerald-600">African Talent</span>
        </h1>
        <p className="text-xl text-slate-500">The premier directory for founders and devs building the future.</p>
        <div className="flex justify-center gap-4">
          <Link to="/directory" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20">Explore</Link>
          <Link to="/submit" className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold">Join Now</Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Weekly Spotlight</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {spotlights.map((b: any) => <BuilderCard key={b.id} builder={b} onClick={onBuilderClick} />)}
        </div>
      </section>
    </div>
  );
};

const Directory = ({ builders, onBuilderClick }: any) => {
  const [q, setQ] = useState('');
  const filtered = builders.filter((b: any) => b.approved && b.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12">
      <aside className="w-64 space-y-6">
        <input className="w-full p-3 border rounded-xl" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
      </aside>
      <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b: any) => <BuilderCard key={b.id} builder={b} onClick={onBuilderClick} />)}
      </div>
    </div>
  );
};

const Submit = ({ onSubmit }: any) => {
  const [done, setDone] = useState(false);
  const [data, setData] = useState({ name: '', email: '', bio: '', role: Role.DEVELOPER, country: 'Nigeria', ecosystem: Ecosystem.SOLANA, projectName: '', skills: '', website: '', twitter: '' });

  if (done) return <div className="text-center py-32"><h2 className="text-3xl font-bold">Submitted!</h2><Link to="/" className="text-emerald-600">Home</Link></div>;

  return (
    <form className="max-w-2xl mx-auto py-16 px-6 space-y-6" onSubmit={e => { e.preventDefault(); onSubmit({...data, skills: data.skills.split(',')}); setDone(true); }}>
      <h2 className="text-3xl font-bold">Submit Profile</h2>
      <input className="w-full p-4 border rounded-2xl" placeholder="Full Name" required onChange={e => setData({...data, name: e.target.value})} />
      <input className="w-full p-4 border rounded-2xl" placeholder="Email" type="email" required onChange={e => setData({...data, email: e.target.value})} />
      <textarea className="w-full p-4 border rounded-2xl h-32" placeholder="Bio" required onChange={e => setData({...data, bio: e.target.value})} />
      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Submit for Review</button>
    </form>
  );
};

const Admin = ({ builders, auth, onAuth, onUpdate, onDelete }: any) => {
  const [pass, setPass] = useState('');
  if (!auth) return (
    <div className="max-w-md mx-auto py-32 px-6 space-y-4">
      <h2 className="text-2xl font-bold">Admin Portal</h2>
      <input type="password" placeholder="Secret Key" className="w-full p-4 border rounded-2xl" value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={() => onAuth(pass)} className="w-full py-4 bg-slate-900 text-white rounded-2xl">Login</button>
    </div>
  );
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
      <h2 className="text-3xl font-bold">Manage Submissions</h2>
      {builders.map((b: any) => (
        <div key={b.id} className="p-6 bg-white border rounded-2xl flex justify-between items-center">
          <div><p className="font-bold">{b.name}</p><p className="text-sm text-slate-500">{b.projectName} • {b.approved ? 'Live' : 'Pending'}</p></div>
          <div className="flex gap-2">
            {!b.approved && <button onClick={() => onUpdate(b.id, {approved: true})} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">Approve</button>}
            <button onClick={() => onDelete(b.id)} className="p-2 bg-rose-100 text-rose-600 rounded-lg">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [selected, setSelected] = useState<Builder | null>(null);
  const [auth, setAuth] = useState(false);
  const loc = useLocation();

  useEffect(() => { setBuilders(getBuilders()); }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 px-6 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Africa<span className="text-emerald-600">Builder</span></Link>
        <div className="flex gap-6 font-semibold">
          <Link to="/directory" className={loc.pathname === '/directory' ? 'text-emerald-600' : ''}>Directory</Link>
          <Link to="/submit" className={loc.pathname === '/submit' ? 'text-emerald-600' : ''}>Join</Link>
          <Link to="/admin" className="text-slate-400">Admin</Link>
        </div>
      </nav>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home builders={builders} onBuilderClick={setSelected} />} />
          <Route path="/directory" element={<Directory builders={builders} onBuilderClick={setSelected} />} />
          <Route path="/submit" element={<Submit onSubmit={(d: any) => setBuilders(prev => [...prev, saveBuilder(d)])} />} />
          <Route path="/admin" element={<Admin builders={builders} auth={auth} onAuth={(p: any) => p === ADMIN_SECRET ? setAuth(true) : alert('Wrong')} onUpdate={(id: any, up: any) => setBuilders(updateBuilderStatus(id, up))} onDelete={(id: any) => setBuilders(deleteBuilder(id))} />} />
        </Routes>
      </main>
      <ProfileModal builder={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
