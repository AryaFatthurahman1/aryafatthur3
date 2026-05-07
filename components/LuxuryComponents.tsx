import React from 'react';
import { VisualMode } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: VisualMode;
  variant?: 'primary' | 'secondary';
}

export const OmniButton: React.FC<ButtonProps> = ({ mode, variant = 'primary', className, children, ...props }) => {
  const isChaos = mode === VisualMode.CHAOS;
  
  const baseStyles = "relative px-8 py-4 transition-all duration-500 uppercase tracking-widest text-xs font-bold overflow-hidden group";
  
  const luxuryStyles = variant === 'primary' 
    ? "bg-transparent border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10";

  const chaosStyles = variant === 'primary'
    ? "bg-red-600 text-black font-mono border-4 border-black hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
    : "bg-black text-green-500 font-mono border border-green-500 hover:bg-green-900/20";

  return (
    <button 
      className={`${baseStyles} ${isChaos ? chaosStyles : luxuryStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {!isChaos && (
        <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-amber-500/5" />
      )}
    </button>
  );
};

export const GlassPanel: React.FC<{ children: React.ReactNode; mode: VisualMode; className?: string }> = ({ children, mode, className = '' }) => {
  const isChaos = mode === VisualMode.CHAOS;

  const luxuryClass = "backdrop-blur-2xl bg-black/40 border border-white/10 shadow-2xl rounded-sm";
  const chaosClass = "bg-zinc-900 border-2 border-red-500 rotate-1 shadow-[8px_8px_0px_0px_rgba(255,0,0,1)]";

  return (
    <div className={`p-6 ${isChaos ? chaosClass : luxuryClass} ${className} transition-all duration-700`}>
      {children}
    </div>
  );
};

export const NeonText: React.FC<{ children: React.ReactNode; color?: 'gold' | 'blue' | 'red'; className?: string }> = ({ children, color = 'gold', className = '' }) => {
  const colors = {
    gold: "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]",
    blue: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    red: "text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,1)] font-mono",
  };

  return <span className={`${colors[color]} ${className}`}>{children}</span>;
};