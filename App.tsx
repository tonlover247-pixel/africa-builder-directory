
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Crown, ArrowUpRight, ShieldCheck, Zap, 
  Settings, DollarSign, Users, CheckCircle2, 
  ArrowLeft, Lock, Sparkles, CreditCard, Layout,
  Code, Download, Rocket, Terminal, Copy, Check
} from 'lucide-react';
import { Builder, Role, Ecosystem, Investor, SubscriptionTier } from './types';
import { getBuilders } from './services/storage';
import { getInvestors } from './services/investors';
import { BuilderCard } from './components/BuilderCard';
import { ProfileModal } from './components/ProfileModal';
import { InvestorCard } from './components/InvestorCard';
import { generateStartupPitch } from './services/ai';

// --- Subscription Context ---
interface SubContextType {
  tier: SubscriptionTier;
  setTier: (t: SubscriptionTier) => void;
  isPaid: boolean;
}
const SubContext = createContext<SubContextType>({ 
  tier: SubscriptionTier.FREE, 
  setTier: () => {},
  isPaid: false
});

// --- Components ---

const Pricing = () => {
  const { setTier } = useContext(SubContext);
  const navigate = useNavigate();

  const handleSubscribe = (tier: SubscriptionTier) => {
    // Simulated Stripe/Paystack Checkout Flow
    console.log(`Initiating checkout for ${tier}...`);
    setTier(tier);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-20 space-y-6">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter">VIBE <span className="text-orange-500">PRICING</span></h1>
        <p className="text-zinc-500 text-xl font-bold max-w-2xl mx-auto">Scale your vision with production-ready AI tools.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-zinc-900/50 border border-white/5 p-10 rounded-[3rem] flex flex-col">
          <h3 className="text-2xl font-black mb-2 uppercase italic">Explorer</h3>
          <p className="text-zinc-500 font-bold mb-8">Experiment with the engine.</p>
          <div className="text-4xl font-black mb-10">$0<span className="text-lg text-zinc-600">/mo</span></div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-center gap-3 text-zinc-400 font-bold"><CheckCircle2 size={18} className="text-zinc-700" /> Directory Browsing</li>
            <li className="flex items-center gap-3 text-zinc-400 font-bold"><CheckCircle2 size={18} className="text-zinc-700" /> Basic AI Prompts</li>
            <li className="flex items-center gap-3 text-zinc-700 font-bold line-through"><Lock size={16} /> Code Export</li>
          </ul>
          <button onClick={() => handleSubscribe(SubscriptionTier.FREE)} className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black hover:bg-white/10 transition-all">Current Plan</button>
        </div>

        {/* Starter Plan */}
        <div className="bg-orange-600/5 border-2 border-orange-500/20 p-10 rounded-[3rem] flex flex-col relative overflow-hidden">
          <div className="absolute top-6 right-6 bg-orange-500 text-black text-[10px] font-black px-3 py-1 rounded-full">MOST POPULAR</div>
          <h3 className="text-2xl font-black mb-2 uppercase italic text-orange-500">Starter</h3>
          <p className="text-zinc-500 font-bold mb-8">For serious builders shipping MVP.</p>
          <div className="text-4xl font-black mb-10">$10<span className="text-lg text-zinc-600">/mo</span></div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-center gap-3 text-zinc-300 font-bold"><CheckCircle2 size={18} className="text-orange-500" /> Preview Generated Code</li>
            <li className="flex items-center gap-3 text-zinc-300 font-bold"><CheckCircle2 size={18} className="text-orange-500" /> Investor Directory Access</li>
            <li className="flex items-center gap-3 text-zinc-300 font-bold"><CheckCircle2 size={18} className="text-orange-500" /> Priority Generation</li>
          </ul>
          <button onClick={() => handleSubscribe(SubscriptionTier.STARTER)} className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black shadow-xl shadow-orange-600/20 hover:bg-orange-500 transition-all">Get Started (Stripe)</button>
        </div>

        {/* Pro Plan */}
        <div className="bg-emerald-500/5 border-2 border-emerald-500/20 p-10 rounded-[3rem] flex flex-col relative overflow-hidden">
          <h3 className="text-2xl font-black mb-2 uppercase italic text-emerald-500">Whale / Pro</h3>
          <p className="text-zinc-500 font-bold mb-8">Unlimited power & deployment.</p>
          <div className="text-4xl font-black mb-10">$30<span className="text-lg text-zinc-600">/mo</span></div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-center gap-3 text-zinc-300 font-bold"><CheckCircle2 size={18} className="text-emerald-500" /> Unlock Full Pitch Builder</li>
            <li className="flex items-center gap-3 text-zinc-300 font-bold"><CheckCircle2 size={18} className="text-emerald-500" /> Direct One-Click Deployment</li>
            <li className="flex items-center gap-3 text-zinc-300 font-bold"><CheckCircle2 size={18} className="text-emerald-500" /> Download Production Code</li>
          </ul>
          <button onClick={() => handleSubscribe(SubscriptionTier.PRO)} className="w-full py-5 bg-emerald-600 text-black rounded-2xl font-black shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all">Go Unlimited</button>
        </div>
      </div>
    </div>
  );
};

const VibeGenerator = () => {
  const { tier } = useContext(SubContext);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    // Simulate AI generation lag
    setTimeout(() => {
      setResult(`// Vibe Generated App: ${prompt}\n\nimport React from 'react';\n\nexport const App = () => {\n  return (\n    <div className="p-10 bg-black text-white">\n      <h1 className="text-4xl font-bold">Welcome to your MVP</h1>\n      <p className="mt-4 text-zinc-400">Generated for an Africa-first ecosystem.</p>\n    </div>\n  );\n};`);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest border border-orange-500/20 mb-4">
          <Sparkles size={12} fill="currentColor" /> Powered by Gemini 3 Pro
        </div>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter">VIBE <span className="text-emerald-500">CODING</span></h1>
        <p className="text-zinc-500 text-xl font-bold">Describe your app. We'll build the full-stack architecture.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] p-10 space-y-8">
        <textarea 
          className="w-full bg-black/40 border-2 border-white/5 rounded-2xl p-6 text-xl font-bold text-white outline-none focus:border-orange-500/50 transition-all min-h-[200px]"
          placeholder="e.g. A DeFi dashboard for smallholder farmers in Kenya with SMS alerts..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        
        <button 
          onClick={handleGenerate}
          disabled={generating || !prompt}
          className="w-full py-6 bg-orange-600 hover:bg-orange-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
        >
          {generating ? "VIBING YOUR CODE..." : <>GENERATE APP MVP <Zap size={20} fill="white" /></>}
        </button>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-emerald-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-black rounded-[2rem] p-8 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">generated_preview.tsx</span>
                  </div>
                  <pre className={`font-mono text-sm leading-relaxed ${tier === SubscriptionTier.FREE ? 'blur-sm select-none' : ''}`}>
                    <code className="text-emerald-400">{result}</code>
                  </pre>
                  {tier === SubscriptionTier.FREE && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-[2rem]">
                      <Link to="/pricing" className="px-8 py-4 bg-white text-black font-black rounded-xl shadow-2xl">Upgrade to Preview Code</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  disabled={tier === SubscriptionTier.FREE}
                  className="py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl font-black text-zinc-400 hover:text-white flex items-center justify-center gap-3 disabled:opacity-30"
                >
                  <Download size={20} /> Download Source
                </button>
                <button 
                  disabled={tier !== SubscriptionTier.PRO}
                  className="py-5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 rounded-2xl font-black text-emerald-500 flex items-center justify-center gap-3 disabled:opacity-30"
                >
                  <Rocket size={20} /> One-Click Deploy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { tier } = useContext(SubContext);
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-black italic">BUILDER <span className="text-orange-500">PORTAL</span></h1>
        <div className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-2xl font-black text-orange-500 uppercase tracking-widest text-xs">Active Tier: {tier}</div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Link to="/vibe" className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] hover:border-orange-500/30 group transition-all">
          <Zap className="text-orange-500 mb-6 group-hover:scale-110 transition-transform" size={40} fill="currentColor" />
          <h3 className="text-2xl font-black mb-2 italic">Vibe Generator</h3>
          <p className="text-zinc-500 font-bold">Generate your next MVP with pure intent prompts.</p>
        </Link>
        <Link to="/pitch-builder" className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] hover:border-emerald-500/30 group transition-all">
          <Sparkles className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
          <h3 className="text-2xl font-black mb-2 italic">AI Pitch Builder</h3>
          <p className="text-zinc-500 font-bold">Investment-ready assets generated by Gemini 3 Pro.</p>
        </Link>
        <Link to="/directory" className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] hover:border-blue-500/30 group transition-all">
          <Layout className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
          <h3 className="text-2xl font-black mb-2 italic">Project Directory</h3>
          <p className="text-zinc-500 font-bold">Showcase your Vibe-built app to the community.</p>
        </Link>
      </div>
    </div>
  );
};

const PitchBuilder = () => {
  const { tier } = useContext(SubContext);
  const [loading, setLoading] = useState(false);
  const [pitch, setPitch] = useState("");
  const [builders] = useState<Builder[]>(getBuilders());
  
  const generate = async () => {
    if (tier !== SubscriptionTier.PRO) return;
    setLoading(true);
    const result = await generateStartupPitch(builders[0]);
    setPitch(result || "");
    setLoading(false);
  };

  if (tier !== SubscriptionTier.PRO) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5">
          <Lock size={40} className="text-zinc-700" />
        </div>
        <h2 className="text-4xl font-black mb-4 italic">PRO FEATURE LOCKED</h2>
        <p className="text-zinc-500 text-lg font-bold mb-10">AI Pitch Generation is exclusive to Whale / Pro members.</p>
        <Link to="/pricing" className="px-12 py-5 bg-emerald-600 text-black font-black rounded-2xl">Upgrade to Pro</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 space-y-4">
        <h1 className="text-5xl font-black italic tracking-tighter">AI <span className="text-emerald-500">PITCH BUILDER</span></h1>
        <p className="text-zinc-500 font-bold text-xl">Investment-ready assets powered by Gemini 3 Pro.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 space-y-8">
        <button 
          onClick={generate}
          disabled={loading}
          className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-black font-black text-xl rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? "GEMINI IS THINKING..." : <>GENERATE PITCH PACKAGE <Sparkles size={24} fill="black" /></>}
        </button>

        {pitch && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert max-w-none bg-black/40 p-8 rounded-3xl border border-white/5 font-medium leading-relaxed whitespace-pre-wrap text-zinc-300"
          >
            {pitch}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Home = ({ builders, onBuilderClick }: any) => {
  const spotlights = useMemo(() => builders.filter((b: any) => b.approved && b.featured).slice(0, 3), [builders]);
  
  return (
    <div className="space-y-24 sm:space-y-32 pb-32 overflow-hidden">
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 px-6">
        <div className="absolute top-0 right-0 -z-10 w-[60%] h-full bg-orange-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
        <div className="max-w-6xl mx-auto text-center space-y-10 sm:space-y-12">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] border border-orange-500/20">
            Vibe Coding for Africa
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.95] tracking-tighter italic uppercase">BUILD <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-400">ANYTHING</span></h1>
          <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto font-bold">The AI engine designed for African founders. Vibe your app into existence, then showcase it to the world's top VCs.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Link to="/vibe" className="px-12 py-6 bg-orange-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-3">Start Vibe Coding <Zap size={24} fill="white" /></Link>
            <Link to="/directory" className="px-12 py-6 bg-zinc-900 text-white border-2 border-zinc-800 rounded-[2rem] font-black text-xl hover:bg-zinc-800 transition-all">Explore Builders</Link>
          </div>
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div className="space-y-4">
            <div className="w-20 h-2 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display italic">Elite Founders</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {spotlights.map((b: any) => (
            <BuilderCard key={b.id} builder={b} onClick={onBuilderClick} />
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [selected, setSelected] = useState<Builder | null>(null);
  const [tier, setTier] = useState<SubscriptionTier>(SubscriptionTier.FREE);

  useEffect(() => { setBuilders(getBuilders()); }, []);

  const isPaid = tier !== SubscriptionTier.FREE;

  return (
    <SubContext.Provider value={{ tier, setTier, isPaid }}>
      <div className="min-h-screen flex flex-col bg-[#050505] selection:bg-orange-500/30">
        <nav className="h-28 border-b sticky top-0 z-40 px-12 flex items-center justify-between bg-[#050505]/80 border-white/5 backdrop-blur-3xl">
          <Link to="/" className="flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-[1.45rem] bg-orange-600 flex items-center justify-center text-white font-black text-3xl shadow-2xl transition-all group-hover:rotate-12">A</div>
            <span className="font-black text-3xl tracking-tighter text-white font-display italic">AfricaBuilders</span>
          </Link>
          <div className="hidden lg:flex gap-12 font-black text-sm items-center uppercase tracking-widest">
            <Link to="/vibe" className="text-zinc-500 hover:text-orange-600 flex items-center gap-2"><Zap size={16} /> Vibe</Link>
            <Link to="/directory" className="text-zinc-500 hover:text-white">Builders</Link>
            <Link to="/investors" className="text-zinc-500 hover:text-emerald-500">Investors</Link>
            <Link to="/pricing" className="text-zinc-500 hover:text-white">Pricing</Link>
            <Link to={isPaid ? "/dashboard" : "/pricing"} className="px-8 py-4 bg-white text-black rounded-[1.25rem] shadow-2xl hover:bg-zinc-200 transition-all">
              {isPaid ? "Dashboard" : "Go Premium"}
            </Link>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home builders={builders} onBuilderClick={setSelected} />} />
            <Route path="/vibe" element={<VibeGenerator />} />
            <Route path="/directory" element={<Directory builders={builders} onBuilderClick={setSelected} />} />
            <Route path="/investors" element={<InvestorDirectory />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pitch-builder" element={<PitchBuilder />} />
          </Routes>
        </main>
        
        <ProfileModal builder={selected} onClose={() => setSelected(null)} />
      </div>
    </SubContext.Provider>
  );
}

function Directory({ builders, onBuilderClick }: any) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => builders.filter((b: any) => b.name.toLowerCase().includes(q.toLowerCase()) || b.projectName.toLowerCase().includes(q.toLowerCase())), [builders, q]);
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <div className="mb-20 space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-6xl font-black text-white italic tracking-tighter">THE <span className="text-orange-500">NETWORK</span></h1>
        <p className="text-zinc-500 font-bold text-xl">Verified builders shipping from Africa to the world.</p>
      </div>
      <div className="max-w-4xl mx-auto mb-20 relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={24} />
        <input className="w-full pl-16 pr-8 py-6 bg-white/5 border-2 border-zinc-900 rounded-[2rem] focus:border-orange-500 transition-all outline-none text-white font-black text-xl" placeholder="Search talent..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-10">{filtered.map((b: any) => <BuilderCard key={b.id} builder={b} onClick={onBuilderClick} />)}</div>
    </div>
  );
}

function InvestorDirectory() {
  const [investors] = useState<Investor[]>(getInvestors());
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
       <div className="mb-20 space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-6xl font-black text-white italic tracking-tighter">CAPITAL <span className="text-emerald-500">GATEWAY</span></h1>
        <p className="text-zinc-500 font-bold text-xl">Connecting Vibe-built projects to institutional capital.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">{investors.map(i => <InvestorCard key={i.id} investor={i} />)}</div>
    </div>
  );
}
