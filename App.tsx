import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Terminal, Zap, Activity, Globe, Lock, Cpu, AlertTriangle } from 'lucide-react';
import { LANGUAGES, VisualMode, LanguageName, CodeResponse } from './types';
import { generateLuxuryCode } from './services/geminiService';
import { OmniButton, GlassPanel, NeonText } from './components/LuxuryComponents';

const App: React.FC = () => {
  // State
  const [mode, setMode] = useState<VisualMode>(VisualMode.LUXURY);
  const [prompt, setPrompt] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageName>('Python');
  const [response, setResponse] = useState<CodeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [particleRef, setParticleRef] = useState<number>(0);

  // Refs for animations
  const bgRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    // Subtle background animation ticker
    const interval = setInterval(() => {
      setParticleRef(p => p + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse(null);
    
    try {
      const result = await generateLuxuryCode(prompt, selectedLanguage, mode === VisualMode.CHAOS);
      setResponse(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === VisualMode.LUXURY ? VisualMode.CHAOS : VisualMode.LUXURY);
  };

  const isChaos = mode === VisualMode.CHAOS;

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-1000 ${isChaos ? 'bg-zinc-950 text-green-500 font-mono' : 'bg-black text-slate-200 font-sans'}`}>
      
      {/* Dynamic Background */}
      <div ref={bgRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {isChaos ? (
          // Chaos Background
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#22c55e_10px,#22c55e_11px)]" />
             <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-red-900/10 mix-blend-overlay" />
          </div>
        ) : (
          // Luxury Background
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-900/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          </>
        )}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isChaos ? 'bg-red-600 rotate-12' : 'bg-white/5 border border-white/10'}`}>
              <Cpu className={isChaos ? "text-black w-8 h-8" : "text-amber-400 w-8 h-8"} />
            </div>
            <div>
              <h1 className={`text-3xl tracking-[0.2em] ${isChaos ? 'font-black uppercase line-through decoration-red-500' : 'font-serif font-bold'}`}>
                <NeonText color={isChaos ? 'red' : 'gold'}>OMNI-ARCHITECT</NeonText>
              </h1>
              <p className={`text-xs uppercase tracking-widest opacity-60 ${isChaos ? 'text-red-500' : 'text-amber-200/60'}`}>
                {isChaos ? 'SYSTEM COMPROMISED // UNLEASHED' : 'Artificial Intelligence • Ultra Exclusive'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={toggleMode}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
              isChaos 
                ? 'bg-red-600 text-black shadow-[4px_4px_0_white]' 
                : 'border border-amber-500/50 text-amber-500 hover:bg-amber-500/10 rounded-full'
            }`}
          >
            {isChaos ? <AlertTriangle size={14} /> : <Sparkles size={14} />}
            {isChaos ? 'Restore Order' : 'Initiate Chaos'}
          </button>
        </header>

        {/* Main Interface Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
          
          {/* Left Column: Controls & Input */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <GlassPanel mode={mode} className="flex-grow flex flex-col gap-6">
              
              {/* Language Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest opacity-70 flex items-center gap-2">
                  <Globe size={12} /> Target Syntax
                </label>
                <div className="relative group">
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as LanguageName)}
                    className={`w-full p-4 appearance-none outline-none transition-all cursor-pointer
                      ${isChaos 
                        ? 'bg-black text-green-500 border-2 border-green-500 font-mono rounded-none' 
                        : 'bg-black/20 text-white border border-white/10 rounded-sm focus:border-amber-500/50 font-sans'
                      }`}
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.name} value={lang.name} className="bg-black text-gray-300">
                        {lang.name} [{lang.difficulty}]
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                    ▼
                  </div>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider opacity-50">
                  <span>Easiest: Python</span>
                  <span>Hardest: Malbolge</span>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2 flex-grow">
                <label className="text-xs uppercase tracking-widest opacity-70 flex items-center gap-2">
                  <Terminal size={12} /> Directive
                </label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={isChaos ? "ENTER COMMAND..." : "Describe the algorithmic masterpiece you wish to conceive..."}
                  className={`w-full h-48 p-4 resize-none outline-none transition-all
                    ${isChaos 
                      ? 'bg-black text-red-500 border-2 border-red-500 font-mono placeholder-red-900' 
                      : 'bg-black/20 text-white border border-white/10 rounded-sm focus:border-blue-500/50 placeholder-gray-600 font-sans'
                    }`}
                />
              </div>

              {/* Action Button */}
              <OmniButton mode={mode} onClick={handleGenerate} disabled={loading} className="w-full">
                {loading ? 'Synthesizing...' : 'Generate Artifact'}
              </OmniButton>

            </GlassPanel>
            
            {/* Status Panel */}
            <GlassPanel mode={mode} className="h-full min-h-[150px] relative overflow-hidden">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xs uppercase tracking-widest opacity-70">System Status</h3>
                 <Activity size={14} className={isChaos ? "text-red-500 animate-pulse" : "text-green-500"} />
               </div>
               <div className="space-y-2 text-xs font-mono opacity-60">
                 <div className="flex justify-between">
                   <span>Core Temperature:</span>
                   <span>{isChaos ? 'CRITICAL (99°C)' : 'Nominal (34°C)'}</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Neural Link:</span>
                    <span className="text-blue-400">Connected</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Token Budget:</span>
                    <span>∞ Infinite</span>
                 </div>
               </div>
               {/* Decorative animated line */}
               <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent w-full animate-shimmer opacity-30" />
            </GlassPanel>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-[600px]">
            <GlassPanel mode={mode} className="flex-grow flex flex-col overflow-hidden relative">
              
              {/* Output Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    <NeonText color={isChaos ? 'red' : 'blue'}>
                      {response ? 'OUTPUT_STREAM_READY' : 'AWAITING_INPUT'}
                    </NeonText>
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest mt-1 opacity-50">
                    {selectedLanguage} Runtime Environment // {isChaos ? 'UNSAFE' : 'SECURE'}
                  </p>
                </div>
                {response && (
                  <div className={`px-3 py-1 text-[10px] font-bold uppercase border ${isChaos ? 'border-red-500 text-red-500' : 'border-amber-500 text-amber-500 rounded-full'}`}>
                    Complexity: {response.complexity}
                  </div>
                )}
              </div>

              {/* Code Display Area */}
              <div className="flex-grow relative overflow-hidden rounded bg-black/50 border border-white/5">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                    <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin ${isChaos ? 'border-red-600' : 'border-amber-500'}`} />
                    <span className="text-xs uppercase tracking-widest animate-pulse">Processing Logic Gates...</span>
                  </div>
                ) : response ? (
                  <div className="absolute inset-0 overflow-auto custom-scrollbar p-6">
                    <pre className={`font-mono text-sm leading-relaxed ${isChaos ? 'text-green-500' : 'text-blue-100'}`}>
                      <code>{response.code}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Lock size={64} />
                  </div>
                )}
              </div>

              {/* Explanation / Console */}
              <div className={`mt-6 p-4 border-t border-white/5 ${isChaos ? 'bg-red-900/10' : 'bg-white/5'}`}>
                <h4 className="text-[10px] uppercase tracking-widest mb-2 opacity-50 flex items-center gap-2">
                  <Zap size={10} /> Neural Analysis
                </h4>
                <p className={`text-sm ${isChaos ? 'font-mono text-red-400' : 'font-serif text-gray-300 italic'}`}>
                  {response ? response.explanation : "System idle. Initiate generation sequence to receive analysis."}
                </p>
              </div>

            </GlassPanel>
          </div>

        </main>
        
        {/* Footer */}
        <footer className="mt-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-opacity cursor-default">
              Omni-Architect v9.0.0 // Powered by Gemini 2.5 // <span className="text-amber-500">Luxury Edition</span>
            </p>
        </footer>

      </div>
    </div>
  );
};

export default App;