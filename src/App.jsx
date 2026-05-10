import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw, Crown, Star, Zap, Trophy, Medal } from 'lucide-react';

const Spotlight = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-700"
      style={{
        background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.15), transparent 80%)`
      }}
    />
  );
};

const GodRays = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, rotate: -30 + i * 12 }}
        animate={{ opacity: [0, 0.1, 0], x: [0, 80, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[10%] w-[15vw] h-[160vh] bg-gradient-to-b from-gold/20 to-transparent blur-[120px]"
        style={{ transformOrigin: "top" }}
      />
    ))}
  </div>
);

const AchievementPremium = ({ count, label, delay, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ 
      opacity: 1, 
      y: [0, -12, 0],
    }}
    transition={{ 
      opacity: { delay, duration: 1 },
      y: { repeat: Infinity, duration: 6 + Math.random() * 2, ease: "easeInOut" }
    }}
    className="relative flex flex-col items-center group cursor-default"
  >
    <div className="relative overflow-hidden px-4">
      <span className="text-6xl md:text-8xl font-heading gold-gradient tracking-tighter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
        {count}
      </span>
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg] pointer-events-none"
      />
    </div>
    
    <div className="mt-2 flex flex-col items-center gap-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="flex items-center gap-2">
        {Icon && <Icon size={12} className="text-gold/60" />}
        <span className="text-[11px] tracking-[0.5em] uppercase text-gold/60 font-light italic">
          {label}
        </span>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [phase, setPhase] = useState('landing'); 
  const [heroStep, setHeroStep] = useState(0); // 0: CKQG, 1: Team
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const startExperience = () => {
    setPhase('intro');
    if (audioRef.current) {
      audioRef.current.play();
    }
    setTimeout(() => {
      setPhase('main');
      setTimeout(() => setHeroStep(1), 5000);
    }, 6000);
  };

  const resetExperience = () => {
    setPhase('intro');
    setHeroStep(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTimeout(() => {
      setPhase('main');
      setTimeout(() => setHeroStep(1), 5000);
    }, 6000);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#000000] text-white">
      <audio ref={audioRef} src="/music.mp3" loop />
      <Spotlight />
      <GodRays />
      
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div 
            key="landing"
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={startExperience}
            >
              <div className="absolute -inset-10 bg-gold/15 blur-[100px] group-hover:bg-gold/30 transition-all duration-1000" />
              <img src="/user_logo.jpg" className="w-44 h-44 rounded-2xl border border-gold/20 relative z-10 object-cover" />
              <div className="mt-10 text-gold tracking-[0.8em] text-xs uppercase font-bold animate-pulse">
                Click to enter the legacy
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'intro' && (
          <motion.div 
            key="intro"
            className="relative w-full h-screen flex flex-col items-center justify-center bg-black z-50 p-0"
            exit={{ opacity: 0, filter: "brightness(2) blur(40px)" }}
            transition={{ duration: 1.2 }}
          >
            <div className="absolute inset-0 opacity-40">
              <img src="/user_logo.jpg" className="w-full h-full object-cover blur-3xl scale-110" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute -inset-20 bg-gold/25 blur-[120px] animate-pulse" />
              <img 
                src="/user_logo.jpg" 
                className="max-w-[85vw] max-h-[75vh] object-contain rounded-3xl shadow-[0_0_150px_rgba(212,175,55,0.5)] border-2 border-gold/20" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="absolute bottom-[10vh] w-full text-center flex justify-center left-0"
            >
              <h1 className="text-3xl md:text-5xl font-heading text-gold uppercase tracking-[1.5em] ml-[1.5em]">
                LEGACY
              </h1>
            </motion.div>
          </motion.div>
        )}

        {phase === 'main' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-screen flex flex-col items-center p-4 md:p-6 overflow-hidden"
          >
            {/* Background Slogan */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
              <h1 className="text-[20vw] font-heading leading-none tracking-tighter">SGP</h1>
            </div>

            {/* Top Toolbar */}
            <div className="relative z-[100] w-full flex justify-between items-center mb-2 px-8">
              <div className="flex items-center gap-4">
                <img src="/user_logo.jpg" className="w-10 h-10 rounded-lg border border-gold/20 object-cover" />
                <div className="h-px w-12 bg-gold/20" />
                <span className="text-gold tracking-[0.4em] text-[10px] uppercase font-bold drop-shadow-gold italic">Est. 2026 Sovereign</span>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="p-1.5 px-3 rounded-full border border-white/10 bg-white/5 hover:border-gold/50 transition-all flex items-center gap-2 group"
                >
                  {isMuted ? <VolumeX className="text-gold/50" size={14} /> : <Volume2 className="text-gold" size={14} />}
                  <span className="text-[8px] uppercase tracking-widest font-bold">Sound</span>
                </button>
                <button 
                  onClick={resetExperience} 
                  className="p-1.5 px-3 rounded-full border border-white/10 bg-white/5 hover:border-gold/50 transition-all flex items-center gap-2 group"
                >
                  <RotateCcw className="group-hover:rotate-[-180deg] transition-transform duration-500" size={14} />
                  <span className="text-[8px] uppercase tracking-widest font-bold">Reset</span>
                </button>
              </div>
            </div>

            {/* Title Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-2"
            >
              <h1 className="text-4xl md:text-[6rem] font-heading tracking-[0.2em] leading-none text-white drop-shadow-[0_0_40px_rgba(212,175,55,0.5)]">
                SUNDAY THE <span className="gold-gradient italic">KING</span> PLAYS
              </h1>
            </motion.div>

            {/* Main Content Layout */}
            <div className="relative z-10 w-full max-w-[98vw] flex-1 flex items-center justify-between gap-4 overflow-hidden">
              
              {/* LEFT COLUMN: SGP LADIES */}
              <div className="w-[22%] flex flex-col items-center justify-center gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-gold/40 text-[10px] tracking-[0.5em] uppercase font-bold">The Sovereign</span>
                  <div className="flex items-center gap-2 text-gold">
                    <Star size={18} className="animate-pulse" />
                    <span className="font-heading text-3xl tracking-widest">LADIES</span>
                  </div>
                </motion.div>
                
                <AchievementPremium count="01" label="QOGS26 CHAMP" delay={0.6} icon={Trophy} />
              </div>

              {/* CENTER: HERO IMAGE (MASSIVE) */}
              <div className="relative flex-1 h-full flex flex-col items-center justify-center">
                <div className="absolute -inset-20 bg-gold/5 blur-[150px] rounded-full animate-pulse-slow" />
                
                <AnimatePresence mode="wait">
                  {heroStep === 0 ? (
                    <motion.div
                      key="ckqg"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                      transition={{ duration: 1.2 }}
                      className="relative w-full h-full flex items-center justify-center p-4"
                    >
                      <img 
                        src="/ckqg.jpg" 
                        className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_120px_rgba(0,0,0,1)] border border-gold/10" 
                      />
                      <div className="absolute bottom-10 px-10 py-3 bg-black/80 backdrop-blur-3xl border border-gold/40 rounded-full shadow-2xl">
                        <span className="text-gold font-heading text-4xl tracking-[0.4em] drop-shadow-gold">SUPREMACY</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="team"
                      initial={{ opacity: 0, filter: "blur(30px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.5 }}
                      className="relative w-full h-full flex flex-col items-center justify-center"
                    >
                      <div className="relative w-full h-[95%] flex items-center justify-center group overflow-hidden">
                        <div className="relative w-full h-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-gold/30 shadow-[0_0_150px_rgba(0,0,0,1)] flex items-center justify-center bg-black/40">
                          <motion.img 
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 25, repeat: Infinity }}
                            src="/user_team.jpg" 
                            className="max-w-full max-h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT COLUMN: SGP KING */}
              <div className="w-[22%] flex flex-col items-center justify-center gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-gold/40 text-[10px] tracking-[0.5em] uppercase font-bold">The Absolute</span>
                  <div className="flex items-center gap-2 text-gold">
                    <Crown size={18} className="animate-pulse" />
                    <span className="font-heading text-3xl tracking-widest">KING</span>
                  </div>
                </motion.div>
                
                <div className="flex flex-col gap-12">
                  <AchievementPremium count="10" label="AOG CHAMP" delay={0.8} icon={Trophy} />
                  <AchievementPremium count="01" label="APL23 CHAMP" delay={1.0} icon={Medal} />
                </div>

                <motion.div 
                   animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="mt-4 flex items-center gap-3 text-gold font-bold text-sm tracking-[0.3em]"
                >
                  <Zap size={16} />
                  AOGS26 CHAMPION
                </motion.div>
              </div>

            </div>

            {/* Bottom Title: SAIGON PHANTOM */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="mt-4 text-center"
            >
              <h2 className="text-5xl md:text-[8rem] font-heading tracking-[1.2em] gold-gradient uppercase drop-shadow-[0_0_50px_rgba(212,175,55,0.4)] ml-[1.2em]">
                SAIGON PHANTOM
              </h2>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gold-gradient {
          background: linear-gradient(180deg, #ffffff 0%, #f9e29a 40%, #d4af37 70%, #8a6d1d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .drop-shadow-gold {
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6));
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite;
        }
      `}</style>
    </main>
  );
}
