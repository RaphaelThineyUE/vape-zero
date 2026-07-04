import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, Award, ShoppingCart, Users, CheckSquare, User, 
  ChevronRight, ArrowLeft, Send, Sparkles, AlertTriangle, 
  Play, Pause, LogOut, CheckCircle, MessageSquare, 
  Plus, DollarSign, Brain, Heart, Wind, Zap, RefreshCw, Star, Info, Bell, TrendingUp, ShieldAlert, Check, Gamepad2, Volume2, VolumeX,
  Edit2, Target
} from 'lucide-react';
import { Quest, BlackMarketItem, SquadPost, Operative, ChatMessage } from './types';
import { 
  AVATARS, 
  INITIAL_QUESTS, 
  INITIAL_MARKET_ITEMS, 
  INITIAL_SQUAD_POSTS, 
  INITIAL_OPERATIVES, 
  INITIAL_CHAT_MESSAGES 
} from './data';

export default function App() {
  // Global States
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fxEnabled, setFxEnabled] = useState<boolean>(true);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  // Sync fx with document element
  useEffect(() => {
    const root = document.documentElement;
    if (fxEnabled) {
      root.classList.remove('fx-disabled');
    } else {
      root.classList.add('fx-disabled');
    }
  }, [fxEnabled]);

  const [activeTab, setActiveTab] = useState<string>('dashboard'); // dashboard, game, quests, squad, mysquad, tapout_detail
  const [credits, setCredits] = useState<number>(12450);
  const [streakDays, setStreakDays] = useState<number>(24);
  const [experience, setExperience] = useState<number>(75); // percent to next level
  const [level, setLevel] = useState<number>(14);
  const [lungCapacity, setLungCapacity] = useState<number>(65);
  const [moneySaved, setMoneySaved] = useState<number>(140);
  const [savingsGoalName, setSavingsGoalName] = useState<string>('New Laptop');
  const [savingsGoalAmount, setSavingsGoalAmount] = useState<number>(400);
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);
  const [editGoalNameInput, setEditGoalNameInput] = useState<string>('New Laptop');
  const [editGoalAmountInput, setEditGoalAmountInput] = useState<number>(400);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Lists States
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [marketItems, setMarketItems] = useState<BlackMarketItem[]>(INITIAL_MARKET_ITEMS);
  const [posts, setPosts] = useState<SquadPost[]>(INITIAL_SQUAD_POSTS);
  const [operatives, setOperatives] = useState<Operative[]>(INITIAL_OPERATIVES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  
  // Voting States for Viper_9
  const [votedStay, setVotedStay] = useState<boolean>(false);
  const [votedExit, setVotedExit] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(8);

  // Chat input
  const [chatInput, setChatInput] = useState<string>('');

  // Crave Crusher Arcade Game State
  const [gameScore, setGameScore] = useState<number>(48250);
  const [gameCombo, setGameCombo] = useState<number>(12);
  const [gameTime, setGameTime] = useState<number>(42.5);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [gameOrbs, setGameOrbs] = useState<Array<{ id: number; x: number; y: number; type: 'lime' | 'cyan' | 'pink'; size: number; delay: number; icon: string }>>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  // Emergency Breathing Shield Override Modal State
  const [craveOverrideActive, setCraveOverrideActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'In' | 'Hold' | 'Out'>('In');
  const [breathTimer, setBreathTimer] = useState<number>(4);

  // Selected Operative Detail Modal (Command Screen)
  const [selectedOperative, setSelectedOperative] = useState<Operative | null>(null);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synthesizer Audio Pop Effect
  const playSynthesizerChime = (frequency: number, type: 'sine' | 'triangle' | 'sawtooth' = 'sine', duration: number = 0.15) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Sweep frequency slightly down for dynamic feedback
      osc.frequency.exponentialRampToValueAtTime(frequency / 2, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Web Audio API not supported or blocked by browser policies.', e);
    }
  };

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Breathing counts effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (craveOverrideActive) {
      timer = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            if (breathPhase === 'In') {
              setBreathPhase('Hold');
              playSynthesizerChime(520, 'sine', 0.4);
              return 4;
            } else if (breathPhase === 'Hold') {
              setBreathPhase('Out');
              playSynthesizerChime(440, 'sine', 0.4);
              return 4;
            } else {
              setBreathPhase('In');
              playSynthesizerChime(660, 'sine', 0.4);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [craveOverrideActive, breathPhase]);

  // Crave Crusher clock incrementer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive) {
      timer = setInterval(() => {
        setGameTime((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  // Spawns game orbs initially or periodically
  useEffect(() => {
    if (isGameActive && gameOrbs.length < 4) {
      const interval = setInterval(() => {
        spawnOrb();
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isGameActive, gameOrbs]);

  const spawnOrb = () => {
    const types: Array<'lime' | 'cyan' | 'pink'> = ['lime', 'cyan', 'pink'];
    const icons = ['⚡', '💎', '🔥', '🧬', '⚙️'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const newOrb = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // percentage x-coord
      y: Math.random() * 70 + 15, // percentage y-coord
      type: randomType,
      size: Math.floor(Math.random() * 30) + 60, // size in pixels
      delay: Math.random() * 2,
      icon: randomIcon
    };
    setGameOrbs((prev) => [...prev, newOrb]);
  };

  const handleOrbClick = (orbId: number, x: number, y: number, type: string) => {
    // Synth audio pop feed
    const pitch = type === 'lime' ? 660 : type === 'cyan' ? 880 : 1100;
    playSynthesizerChime(pitch, 'triangle', 0.15);

    // Score & Multiplier calculation
    const pointsGained = 250 * gameCombo;
    setGameScore((prev) => prev + pointsGained);
    setGameCombo((prev) => prev + 1);
    
    // Spark particles
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() - 0.5) * 50,
      y: y + (Math.random() - 0.5) * 50,
      color: type === 'lime' ? '#c3f400' : type === 'cyan' ? '#00eefc' : '#ffb1c3'
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 600);

    setGameOrbs((prev) => prev.filter((orb) => orb.id !== orbId));
    triggerToast(`+${pointsGained.toLocaleString()} Score & Combo Up!`);
  };

  // Zen / Quest Action Handler
  const incrementQuestProgress = (questId: string) => {
    setQuests((prevQuests) => 
      prevQuests.map((q) => {
        if (q.id === questId && !q.claimed) {
          const nextVal = Math.min(q.progressCurrent + 1, q.progressTarget);
          if (nextVal === q.progressTarget) {
            playSynthesizerChime(987.77, 'sine', 0.3); // High-pitched success
            triggerToast(`Quest "${q.title}" complete! Ready to claim.`);
          } else {
            playSynthesizerChime(440, 'sine', 0.1);
          }
          return { ...q, progressCurrent: nextVal };
        }
        return q;
      })
    );
  };

  const claimQuestReward = (questId: string, rewardCoins: number) => {
    setQuests((prevQuests) =>
      prevQuests.map((q) => {
        if (q.id === questId) {
          return { ...q, claimed: true };
        }
        return q;
      })
    );
    setCredits((prev) => prev + rewardCoins);
    playSynthesizerChime(1318.51, 'sine', 0.4); // Sparkling coin sound
    triggerToast(`Claimed +${rewardCoins} V-Coins! Balance updated.`);
  };

  // Black Market Store purchase handler
  const purchaseStoreItem = (item: BlackMarketItem) => {
    if (item.owned) {
      triggerToast("You already own this digital gear.");
      return;
    }
    if (credits < item.price) {
      playSynthesizerChime(220, 'sawtooth', 0.3); // Low buzzer error sound
      triggerToast(`Insufficient credits! Requires ${item.price} V-Coins.`);
      return;
    }

    setCredits((prev) => prev - item.price);
    setMarketItems((prevItems) => 
      prevItems.map((i) => (i.id === item.id ? { ...i, owned: true } : i))
    );
    playSynthesizerChime(880, 'sine', 0.35);
    triggerToast(`Successfully equipped ${item.name}! Check your profile.`);
  };

  // Chat message submit handler
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      author: 'CyberPhantom_01',
      avatar: AVATARS.cyberPhantom,
      content: chatInput.trim(),
      timeAgo: 'JUST NOW',
      isYou: true,
      borderColor: 'border-primary-container shadow-[0_0_8px_rgba(195,244,0,0.5)]'
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    playSynthesizerChime(784, 'sine', 0.08); // Mechanical chime click
    
    // Simulate real-time automated crew response 2 seconds later!
    setTimeout(() => {
      const cannedResponses = [
        "Vanguard crew is holding the line. Keep deep breathing!",
        "Stay strong leader! 🦾 Cravings don't stand a chance.",
        "Just checked the stats, our squad power is peak today!",
        "Excellent vibe check. Let's maintain the streak."
      ];
      const botMsg: ChatMessage = {
        id: `chat-bot-${Date.now()}`,
        author: 'Neon_Rider',
        avatar: AVATARS.neonRider,
        content: cannedResponses[Math.floor(Math.random() * cannedResponses.length)],
        timeAgo: '1 MIN AGO',
        borderColor: 'border-surface-variant'
      };
      setChatMessages((prev) => [...prev, botMsg]);
      playSynthesizerChime(659.25, 'sine', 0.1);
    }, 2000);
  };

  // Squad Feed interaction handlers
  const handleCongratulatePost = (postId: string) => {
    setPosts((prev) => 
      prev.map((p) => {
        if (p.id === postId) {
          const nextVal = p.hasCongratulated ? p.congratsCount - 1 : p.congratsCount + 1;
          if (!p.hasCongratulated) {
            playSynthesizerChime(587, 'sine', 0.15);
            triggerToast(`Congratulated ${p.author}!`);
          }
          return { ...p, congratsCount: nextVal, hasCongratulated: !p.hasCongratulated };
        }
        return p;
      })
    );
  };

  const handleSupportPost = (postId: string) => {
    setPosts((prev) => 
      prev.map((p) => {
        if (p.id === postId) {
          const nextVal = p.hasSupported ? p.supportsCount - 1 : p.supportsCount + 1;
          if (!p.hasSupported) {
            playSynthesizerChime(698, 'sine', 0.15);
            triggerToast(`Supported ${p.author}!`);
          }
          return { ...p, supportsCount: nextVal, hasSupported: !p.hasSupported };
        }
        return p;
      })
    );
  };

  // Voting handlers for Viper_9 Tap out
  const castStayVote = () => {
    if (votedStay) return;
    setVotedStay(true);
    setVotedExit(false);
    setVoteCount((prev) => (votedExit ? prev + 2 : prev + 1));
    playSynthesizerChime(1046, 'sine', 0.25);
    triggerToast("Stay vote registered. Support sent to Viper_9!");
  };

  const castExitVote = () => {
    if (votedExit) return;
    setVotedExit(true);
    setVotedStay(false);
    setVoteCount((prev) => (votedStay ? prev - 2 : prev - 1));
    playSynthesizerChime(330, 'sawtooth', 0.2);
    triggerToast("Approved exit request. Viper_9 cohort reassignment recorded.");
  };

  // Quick Action Emergency Crave Override
  const launchBreathingShield = () => {
    setBreathPhase('In');
    setBreathTimer(4);
    setCraveOverrideActive(true);
    playSynthesizerChime(440, 'sine', 0.5);
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-sans flex flex-col relative antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      
      {/* Top Controller Bar - Allows switching between viewport previews dynamically */}
      <div className="bg-surface-container-lowest border-b border-border px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4 z-50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary-container animate-pulse neon-glow-lime"></div>
          <span className="font-mono text-xs font-bold text-primary tracking-widest">
            VAPEZERO DIGITAL PORTAL // ARCHITECTURAL DEPLOYMENT
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {/* Theme Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant text-xs font-mono">STYLE:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-surface-container-high border border-border">
              <button
                onClick={() => {
                  setTheme('dark');
                  playSynthesizerChime(440, 'sine', 0.1);
                }}
                className={`px-2.5 py-1 text-[10px] rounded-md font-mono font-bold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-primary-container text-on-primary-container font-black'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                COSMIC (DARK)
              </button>
              <button
                onClick={() => {
                  setTheme('light');
                  setFxEnabled(false); // Default to clean, flat style when moving to light mode
                  playSynthesizerChime(554.37, 'sine', 0.1);
                }}
                className={`px-2.5 py-1 text-[10px] rounded-md font-mono font-bold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-primary-container text-on-primary-container font-black'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                ALPINE (LIGHT)
              </button>
            </div>
          </div>

          {/* Ambient FX Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant text-xs font-mono">AMBIENT FX:</span>
            <button
              onClick={() => {
                setFxEnabled(!fxEnabled);
                playSynthesizerChime(fxEnabled ? 330 : 660, 'sine', 0.1);
              }}
              className={`px-3 py-1 text-[10px] rounded-lg border font-mono transition-all flex items-center gap-1 cursor-pointer ${
                fxEnabled
                  ? 'border-primary-container bg-primary-container/10 text-primary-container font-bold'
                  : 'border-border text-on-surface-variant hover:text-primary'
              }`}
            >
              {fxEnabled ? 'GLOWS ACTIVE' : 'FLAT MINIMAL'}
            </button>
          </div>

          {/* Audio toggle */}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg border border-border hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-all flex items-center gap-1 text-xs cursor-pointer"
            title="Toggle Web Audio Synths"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-primary-container" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            <span className="font-mono">{soundEnabled ? 'Synth ON' : 'Synth OFF'}</span>
          </button>

          <span className="text-on-surface-variant text-xs font-mono mr-1">PREVIEW LAYOUT:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-surface-container-high border border-border">
            <button
              onClick={() => {
                setDeviceMode('mobile');
                playSynthesizerChime(523.25, 'sine', 0.1);
              }}
              className={`px-3 py-1 text-xs rounded-md font-mono transition-all cursor-pointer ${
                deviceMode === 'mobile' 
                  ? 'bg-primary-container text-on-primary-container font-black neon-glow-lime' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              MOBILE HANDSET
            </button>
            <button
              onClick={() => {
                setDeviceMode('desktop');
                playSynthesizerChime(587.33, 'sine', 0.1);
              }}
              className={`px-3 py-1 text-xs rounded-md font-mono transition-all cursor-pointer ${
                deviceMode === 'desktop' 
                  ? 'bg-primary-container text-on-primary-container font-black neon-glow-lime' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              COMMAND CONSOLE
            </button>
          </div>
        </div>
      </div>

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-surface-container-high border-2 border-primary-container text-primary-container px-6 py-3 rounded-full font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(195,244,0,0.4)] animate-bounce z-50">
          <Sparkles className="w-4 h-4 animate-spin text-primary-container" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Active Device Frame Layout Wrapper */}
      {deviceMode === 'mobile' ? (
        
        // ==========================================
        //  MOBILE PORTAL VIEWER (Screens 1 to 6)
        // ==========================================
        <div className="flex-1 w-full max-w-md mx-auto bg-background relative flex flex-col shadow-2xl border-x border-border pb-28">
          
          {/* MOBILE HEADER */}
          <header className="sticky top-0 bg-background/90 border-b border-border backdrop-blur-md flex justify-between items-center px-6 py-4 z-40">
            <div className="flex items-center gap-3">
              {activeTab === 'tapout_detail' ? (
                <button 
                  onClick={() => {
                    setActiveTab('mysquad');
                    playSynthesizerChime(440, 'sine', 0.08);
                  }}
                  className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-primary-container p-0.5 overflow-hidden shadow-[0_0_10px_rgba(195,244,0,0.3)]">
                  <img 
                    className="w-full h-full object-cover rounded-full" 
                    alt="Cyberpunk Character" 
                    src={activeTab === 'game' ? AVATARS.craveProfile : activeTab === 'quests' ? AVATARS.questProfile : AVATARS.mainProfile} 
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-bold text-surface-tint tracking-widest">LEVEL {level}</span>
                <span className="font-display text-sm font-extrabold text-primary tracking-tight">
                  {activeTab === 'game' ? 'CRAVE CRUSHER' : activeTab === 'quests' ? 'BLACK MARKET' : activeTab === 'tapout_detail' ? 'TAP OUT PLEA' : 'VAPEZERO'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Z-Credits Wallet indicator in Header */}
              {(activeTab === 'quests' || activeTab === 'mysquad') && (
                <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full border border-white/5 font-mono text-[11px] font-bold text-secondary-container">
                  <Zap className="w-3 h-3 text-secondary-container animate-pulse" />
                  <span>{credits.toLocaleString()} ZC</span>
                </div>
              )}

              {/* Fire streak dynamic counter */}
              <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full border border-white/5">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-black text-amber-300">{streakDays}D</span>
              </div>
            </div>
          </header>

          {/* MOBILE MAIN VIEW SWITCHER */}
          <main className="flex-grow px-5 py-6 flex flex-col gap-8">
            <AnimatePresence mode="wait">
              {/* 1. DASHBOARD VIEW */}
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col gap-6"
                >
                {/* Hero Lung Recovery */}
                <section className="flex flex-col items-center py-4 relative">
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* SVG Circular Ring */}
                    <svg className="w-full h-full -rotate-90">
                      <circle 
                        className="text-surface-container-highest" 
                        cx="128" 
                        cy="128" 
                        fill="transparent" 
                        r="110" 
                        stroke="currentColor" 
                        strokeWidth="10"
                      />
                      <circle 
                        className="text-secondary-container transition-all duration-1000" 
                        cx="128" 
                        cy="128" 
                        fill="transparent" 
                        r="110" 
                        stroke="currentColor" 
                        strokeDasharray="691" 
                        strokeDashoffset={691 - (691 * lungCapacity) / 100} 
                        strokeLinecap="round" 
                        strokeWidth="11"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(0,238,252,0.6))' }}
                      />
                    </svg>
                    {/* Inner Metrics */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <span className="font-display text-5xl font-extrabold text-primary tracking-tighter mb-1">{lungCapacity}%</span>
                      <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-widest">LUNG CAPACITY RESTORED</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setLungCapacity(Math.min(lungCapacity + 1, 100));
                      playSynthesizerChime(587.33, 'triangle', 0.1);
                      triggerToast("Exercised Lungs! +1% Recovered.");
                    }}
                    className="absolute -bottom-1 bg-surface-container-high hover:bg-surface-container-highest px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Wind className="text-secondary-fixed-dim w-4 h-4 animate-bounce" />
                    <span className="font-mono text-[10px] font-bold text-secondary-fixed-dim">HEALTH RECOVERY</span>
                  </button>
                </section>

                {/* Stats Bento Grid */}
                <section className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-2xl flex flex-col gap-2 relative overflow-hidden group hover:border-primary-container/30 transition-all">
                    <span className="font-mono text-[10px] font-bold text-on-surface-variant tracking-wider">DAYS SMOKE FREE</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold text-primary-fixed">{streakDays}</span>
                      <CheckCircle className="text-primary-container w-5 h-5 animate-pulse" />
                    </div>
                    <div className="flex gap-1 mt-1">
                      <button 
                        onClick={() => {
                          setStreakDays(prev => prev + 1);
                          playSynthesizerChime(659, 'sine', 0.1);
                          triggerToast("+1 Smoke Free Day added!");
                        }}
                        className="text-[9px] font-mono text-primary-container bg-primary-container/10 px-2 py-0.5 rounded hover:bg-primary-container/20"
                      >
                        LOG DAY
                      </button>
                    </div>
                  </div>

                  <div className="glass-card p-4 rounded-2xl flex flex-col gap-2 hover:border-secondary-container/30 transition-all">
                    <span className="font-mono text-[10px] font-bold text-on-surface-variant tracking-wider">MONEY SAVED</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-extrabold text-secondary-fixed">${moneySaved}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <button 
                        onClick={() => {
                          setMoneySaved(prev => prev + 15);
                          setCredits(prev => prev + 100);
                          playSynthesizerChime(880, 'sine', 0.1);
                          triggerToast("Saved $15 pack expense! +100 ZC gained.");
                        }}
                        className="text-[9px] font-mono text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded hover:bg-secondary-container/20"
                      >
                        ADD $15 SAVED
                      </button>
                    </div>
                  </div>
                </section>

                {/* SAVINGS GOAL PROGRESS TRACKER */}
                <section className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col gap-4 relative overflow-hidden">
                  {fxEnabled && <div className="scanning-line"></div>}
                  
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                        <Target className="w-4 h-4" />
                        <span className="font-mono text-[10px] font-bold tracking-wider uppercase">SAVINGS TARGET</span>
                      </div>
                      <h3 className="font-display text-lg font-black text-primary tracking-tight">
                        {savingsGoalName}
                      </h3>
                    </div>
                    
                    <button
                      onClick={() => {
                        setEditGoalNameInput(savingsGoalName);
                        setEditGoalAmountInput(savingsGoalAmount);
                        setIsEditingGoal(!isEditingGoal);
                        playSynthesizerChime(523.25, 'sine', 0.1);
                      }}
                      className="p-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-border text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                      title="Edit Savings Goal"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isEditingGoal ? (
                    <div className="bg-surface-container-low/60 p-4 rounded-2xl border border-border flex flex-col gap-4 animate-fade-in">
                      <span className="font-mono text-[10px] font-bold text-on-surface-variant">EDIT GOAL CRITERIA</span>
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] text-on-surface-variant font-bold">GOAL NAME / OBJECTIVE</label>
                          <input 
                            type="text" 
                            value={editGoalNameInput}
                            onChange={(e) => setEditGoalNameInput(e.target.value)}
                            maxLength={30}
                            placeholder="e.g. New Laptop, Concert Tickets"
                            className="bg-surface-container-lowest border border-border rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:border-secondary-container transition-all"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] text-on-surface-variant font-bold">TARGET BUDGET ($)</label>
                          <input 
                            type="number" 
                            min={1}
                            max={10000}
                            value={editGoalAmountInput || ''}
                            onChange={(e) => setEditGoalAmountInput(Number(e.target.value))}
                            placeholder="e.g. 400"
                            className="bg-surface-container-lowest border border-border rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:border-secondary-container transition-all"
                          />
                        </div>
                      </div>

                      {/* Goal Quick Presets */}
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[9px] text-on-surface-variant font-bold">POPULAR PRESETS</span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: 'Concert Tickets', amt: 150 },
                            { name: 'New Laptop', amt: 800 },
                            { name: 'Weekend Trip', amt: 350 },
                            { name: 'Gamer Console', amt: 500 }
                          ].map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setEditGoalNameInput(preset.name);
                                setEditGoalAmountInput(preset.amt);
                                playSynthesizerChime(587.33, 'triangle', 0.08);
                              }}
                              className="text-[9px] font-mono bg-surface-container-highest hover:bg-secondary-container/20 hover:text-secondary-fixed-dim px-2.5 py-1 rounded-lg border border-border cursor-pointer transition-all"
                            >
                              {preset.name} (${preset.amt})
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Form Action Buttons */}
                      <div className="flex gap-2 justify-end mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingGoal(false);
                            playSynthesizerChime(349.23, 'sine', 0.1);
                          }}
                          className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!editGoalNameInput.trim()) {
                              triggerToast("Goal name cannot be empty!");
                              return;
                            }
                            if (editGoalAmountInput <= 0) {
                              triggerToast("Target amount must be greater than $0!");
                              return;
                            }
                            setSavingsGoalName(editGoalNameInput);
                            setSavingsGoalAmount(editGoalAmountInput);
                            setIsEditingGoal(false);
                            playSynthesizerChime(659.25, 'sine', 0.15);
                            triggerToast(`Target updated to ${editGoalNameInput} ($${editGoalAmountInput})`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-mono text-[10px] font-black cursor-pointer transition-all active:scale-95"
                        >
                          SAVE CHANGES
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Current vs Target values */}
                      <div className="flex justify-between items-baseline">
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-2xl font-black text-primary">${moneySaved}</span>
                          <span className="text-on-surface-variant text-xs">/ ${savingsGoalAmount}</span>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-mono text-sm font-black text-secondary-fixed-dim">
                            {savingsGoalAmount > 0 ? Math.round((moneySaved / savingsGoalAmount) * 100) : 0}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="relative w-full h-3 bg-surface-container-highest rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary-container to-surface-tint rounded-full transition-all duration-700 relative"
                          style={{ 
                            width: `${Math.min(100, savingsGoalAmount > 0 ? Math.round((moneySaved / savingsGoalAmount) * 100) : 0)}%`,
                            boxShadow: fxEnabled ? '0 0 10px rgba(0, 238, 252, 0.4)' : 'none'
                          }}
                        >
                          {fxEnabled && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          )}
                        </div>
                      </div>

                      {/* Goal Achievement Celebration */}
                      {moneySaved >= savingsGoalAmount ? (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-primary-container/10 to-secondary-container/10 border border-primary-container/30 rounded-2xl p-3 animate-pulse-glow">
                          <Sparkles className="text-primary-container w-5 h-5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] font-black text-primary-container tracking-wider uppercase">GOAL COMPLETED!</span>
                            <span className="text-[10px] text-on-surface-variant">
                              You've saved enough to afford your <strong>{savingsGoalName}</strong>! 🎉
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-mono">
                          <span>
                            Need <strong>${Math.max(0, savingsGoalAmount - moneySaved)}</strong> more to unlock!
                          </span>
                          <span>
                            Approx. <strong>{Math.ceil(Math.max(0, savingsGoalAmount - moneySaved) / 15)} packs</strong> avoided
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </section>

                {/* Next Ranks Preview */}
                <section className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display text-sm font-black text-primary tracking-tight">Next Rank Ups</h3>
                    <span className="font-mono text-[10px] text-surface-tint font-bold tracking-wider hover:underline cursor-pointer">VIEW ALL</span>
                  </div>
                  
                  <div className="flex justify-between gap-2 mt-1">
                    <div className="flex-1 flex flex-col items-center gap-1.5 opacity-50 grayscale">
                      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10">
                        <Award className="text-on-surface-variant w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9px] font-extrabold text-center text-on-surface-variant">Day 15 Badge</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center gap-1.5 animate-pulse-glow">
                      <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center border border-primary-container/40 neon-glow-lime">
                        <DollarSign className="text-primary-container w-5 h-5 animate-bounce" />
                      </div>
                      <span className="font-mono text-[9px] font-black text-center text-primary-container">$200 Saved</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-1.5 opacity-50 grayscale">
                      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10">
                        <Wind className="text-on-surface-variant w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9px] font-extrabold text-center text-on-surface-variant">Marathoner</span>
                    </div>
                  </div>
                </section>

                {/* Main Action Start Game */}
                <section className="mt-4 flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setActiveTab('game');
                      setIsGameActive(true);
                      setGameScore(14250);
                      setGameCombo(8);
                      playSynthesizerChime(523, 'sawtooth', 0.2);
                    }}
                    className="w-full py-4 px-6 bg-primary-container text-on-primary-container font-display font-extrabold text-sm rounded-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-transform shadow-[0_0_20px_rgba(195,244,0,0.4)] cursor-pointer"
                  >
                    <Zap className="w-5 h-5 animate-pulse text-on-primary-container" />
                    <span>START CRAVE CRUSHER</span>
                  </button>
                  <p className="text-center font-mono text-[10px] text-on-surface-variant mt-1 opacity-60">
                    QUICK SESSION: 3 MINS TO DEFEAT URGE
                  </p>
                </section>
              </motion.div>
            )}

            {/* 2. ARCADE GAME: CRAVE CRUSHER */}
            {activeTab === 'game' && (
              <motion.div
                key="game"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-5 flex-grow relative min-h-[460px]"
              >
                
                {/* HUD Panel Overlay */}
                <div className="flex justify-between items-start gap-4 z-10">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-container"></span>
                      </span>
                      <span className="font-mono text-xs font-black tracking-widest">{Math.floor(gameTime / 60).toString().padStart(2, '0')}:{(gameTime % 60).toFixed(1).padStart(4, '0')}</span>
                    </div>

                    <div className="bg-surface-container-high/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex flex-col">
                      <span className="font-mono text-[8px] text-on-surface-variant font-bold tracking-widest uppercase">SCORE</span>
                      <span className="font-display text-2xl font-black text-primary-container">{gameScore.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col gap-2">
                    <div className="bg-surface-container-high/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex flex-col items-end">
                      <span className="font-mono text-[8px] text-on-surface-variant font-bold tracking-widest uppercase">COMBO</span>
                      <span className="font-display text-2xl font-black text-tertiary-fixed-dim animate-pulse">x{gameCombo}</span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-[9px] text-on-surface font-bold">+250 XP</span>
                      <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-primary-container shadow-[0_0_10px_#abd600] transition-all" style={{ width: `${Math.min(gameCombo * 5, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GAME PLAY ARENA CONTAINER */}
                <div className="flex-1 rounded-2xl bg-gradient-to-b from-surface-container-low to-surface-container-lowest border border-white/10 relative overflow-hidden h-[300px]" id="mobile-game-arena">
                  <div className="scanning-line"></div>
                  
                  {gameOrbs.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <Gamepad2 className="w-12 h-12 text-primary-container animate-pulse mb-2" />
                      <p className="font-mono text-xs font-bold text-primary mb-1">CRAVING INBOUND</p>
                      <button 
                        onClick={() => {
                          setGameOrbs([]);
                          setGameCombo(8);
                          setGameScore(14250);
                          spawnOrb();
                          spawnOrb();
                          spawnOrb();
                        }}
                        className="mt-3 px-4 py-1.5 bg-primary-container text-on-primary-container font-mono text-xs font-black rounded-lg"
                      >
                        RE-INITIALIZE ORBS
                      </button>
                    </div>
                  )}

                  {/* Dynamic absolute game orbs */}
                  {gameOrbs.map((orb) => {
                    const styleClass = 
                      orb.type === 'lime' 
                        ? 'border-primary-container bg-primary-container/20 text-primary-container' 
                        : orb.type === 'cyan' 
                        ? 'border-secondary-container bg-secondary-container/20 text-secondary-container' 
                        : 'border-tertiary-fixed-dim bg-tertiary-fixed-dim/20 text-tertiary-fixed-dim';

                    return (
                      <button
                        key={orb.id}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          handleOrbClick(orb.id, rect.left + rect.width/2, rect.top + rect.height/2, orb.type);
                        }}
                        className={`absolute rounded-full border-2 p-1 font-display font-extrabold text-xl flex items-center justify-center animate-pulse-glow hover:scale-110 active:scale-95 transition-all cursor-pointer z-20`}
                        style={{
                          left: `${orb.x}%`,
                          top: `${orb.y}%`,
                          width: `${orb.size}px`,
                          height: `${orb.size}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span className="text-xl">{orb.icon}</span>
                      </button>
                    );
                  })}

                  {/* Render Pop Particles */}
                  {particles.map((p) => (
                    <div 
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full animate-ping pointer-events-none"
                      style={{
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        backgroundColor: p.color
                      }}
                    />
                  ))}
                </div>

                {/* Bottom Pause or Emergency Controls */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      setIsGameActive(!isGameActive);
                      playSynthesizerChime(440, 'sine', 0.1);
                    }}
                    className="flex-1 py-3 bg-surface-container-high border border-white/10 text-on-surface hover:text-primary font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    {isGameActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isGameActive ? 'PAUSE GAME' : 'RESUME GAME'}</span>
                  </button>

                  <button 
                    onClick={() => {
                      setActiveTab('dashboard');
                      setIsGameActive(false);
                      playSynthesizerChime(330, 'sine', 0.1);
                    }}
                    className="py-3 px-5 bg-red-950/40 border border-red-500/20 text-red-400 font-mono text-xs font-bold rounded-xl"
                  >
                    QUIT
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. DAILY QUESTS & BLACK MARKET */}
            {activeTab === 'quests' && (
              <motion.div
                key="quests"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Daily quests listing */}
                <section className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <h2 className="font-display text-lg font-extrabold text-primary tracking-tight">Daily Quests</h2>
                    <span className="font-mono text-[9px] text-on-surface-variant font-bold">RESET IN 14H 22M</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {quests.map((q) => {
                      const colorClass = 
                        q.claimed ? 'border-l-on-surface-variant opacity-60 bg-surface-container-low' :
                        q.statusType === 'lime' ? 'border-l-primary-container' : 
                        q.statusType === 'cyan' ? 'border-l-secondary-container' : 
                        q.statusType === 'pink' ? 'border-l-tertiary-fixed-dim' : 'border-l-surface-variant';
                      
                      const barColor = 
                        q.claimed ? 'bg-on-surface-variant/40' :
                        q.statusType === 'lime' ? 'bg-primary-container shadow-[0_0_10px_#abd600]' : 
                        q.statusType === 'cyan' ? 'bg-secondary-container shadow-[0_0_10px_rgba(0,238,252,0.5)]' : 
                        q.statusType === 'pink' ? 'bg-tertiary-fixed-dim shadow-[0_0_10px_rgba(255,0,150,0.5)]' : 'bg-surface-variant';

                      return (
                        <div key={q.id} className={`glass-card p-4 rounded-xl border-l-4 ${colorClass} flex flex-col gap-2`}>
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col">
                              <h4 className={`font-display text-sm font-bold text-primary ${q.claimed ? 'line-through opacity-70' : ''}`}>{q.title}</h4>
                              <p className="text-xs text-on-surface-variant mt-0.5">{q.description}</p>
                            </div>
                            {q.claimed ? (
                              <span className="font-mono text-[9px] font-black text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded">CLAIMED</span>
                            ) : (
                              <span className="font-mono text-[9px] font-black text-primary bg-white/5 border border-white/10 px-2 py-0.5 rounded">+{q.reward} ZC</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-4 mt-1">
                            <div className="flex-1 flex flex-col gap-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-on-surface-variant">PROGRESS</span>
                                <span className="text-primary font-bold">{q.progressCurrent} / {q.progressTarget}</span>
                              </div>
                              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${(q.progressCurrent / q.progressTarget) * 100}%` }}></div>
                              </div>
                            </div>

                            {/* Trigger buttons for simple user-driven progress demonstration */}
                            {!q.claimed && (
                              <div className="flex shrink-0">
                                {q.progressCurrent >= q.progressTarget ? (
                                  <button 
                                    onClick={() => claimQuestReward(q.id, q.reward)}
                                    className="px-2.5 py-1 bg-primary-container text-on-primary-container font-mono text-[10px] font-extrabold rounded-lg hover:neon-glow-lime active:scale-95 transition-all"
                                  >
                                    CLAIM
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => incrementQuestProgress(q.id)}
                                    className="px-2.5 py-1 bg-surface-container border border-white/10 text-on-surface-variant hover:text-primary font-mono text-[10px] font-bold rounded-lg hover:bg-surface-container-high"
                                  >
                                    DO
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Black Market Store section */}
                <section className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <h2 className="font-display text-lg font-extrabold text-primary tracking-tight">Black Market</h2>
                    <span className="font-mono text-[10px] text-surface-tint font-bold hover:underline cursor-pointer">VIEW ALL</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {marketItems.slice(0, 2).map((item) => (
                      <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-white/5">
                        <div className="relative h-32 bg-surface-container-high overflow-hidden">
                          <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} alt={item.name} />
                          <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-mono font-black ${item.badgeStyle}`}>
                            {item.rarity}
                          </div>
                        </div>

                        <div className="p-3 flex flex-col gap-2">
                          <h4 className="font-display text-xs font-extrabold text-primary tracking-tight truncate">{item.name}</h4>
                          <button 
                            onClick={() => purchaseStoreItem(item)}
                            className={`w-full py-2 rounded-xl font-mono text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                              item.owned 
                                ? 'bg-surface-container text-on-surface-variant cursor-not-allowed' 
                                : 'bg-primary-container text-on-primary-container hover:brightness-110 shadow-[0_0_10px_rgba(195,244,0,0.3)]'
                            }`}
                          >
                            <Zap className="w-3 h-3" />
                            <span>{item.owned ? 'OWNED' : `${item.price} ZC`}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* 4. SQUAD RANK & GLOBAL FEED */}
            {activeTab === 'squad' && (
              <motion.div
                key="squad"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Leaderboard Card */}
                <section className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <h2 className="font-display text-lg font-extrabold text-primary tracking-tight">SQUAD RANK</h2>
                    <span className="font-mono text-xs text-surface-tint font-extrabold tracking-widest">PHANTOM_CORP</span>
                  </div>

                  <div className="glass-card rounded-2xl p-4 flex items-center justify-between border-l-4 border-l-primary-container relative overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="flex flex-col items-center">
                        <span className="font-mono text-[8px] text-surface-tint uppercase font-black">Rank</span>
                        <span className="font-display text-3xl font-black text-primary leading-none">#04</span>
                      </div>
                      <div className="h-10 w-[1px] bg-white/10"></div>
                      <div>
                        <p className="font-display text-sm font-extrabold text-primary leading-tight">CyberPhantom_01</p>
                        <p className="text-xs text-on-surface-variant">Ahead of 12 squadmates</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] text-on-surface-variant font-bold block">POINTS</span>
                      <span className="font-mono text-sm font-black text-primary tracking-widest">12,480</span>
                    </div>
                  </div>

                  {/* Top 4 rows */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="glass-card p-2 rounded-xl text-center border-t border-white/5">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest mx-auto mb-1 flex items-center justify-center font-mono text-[10px] font-black text-primary">1</div>
                      <span className="font-mono text-[8px] text-on-surface-variant block truncate">Viper_9</span>
                    </div>
                    <div className="glass-card p-2 rounded-xl text-center border-t border-white/5">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest mx-auto mb-1 flex items-center justify-center font-mono text-[10px] font-black text-primary">2</div>
                      <span className="font-mono text-[8px] text-on-surface-variant block truncate">NeonCat</span>
                    </div>
                    <div className="glass-card p-2 rounded-xl text-center border-t border-white/5">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest mx-auto mb-1 flex items-center justify-center font-mono text-[10px] font-black text-primary">3</div>
                      <span className="font-mono text-[8px] text-on-surface-variant block truncate">ZeroG</span>
                    </div>
                    <div className="bg-primary-container/10 p-2 rounded-xl text-center border border-primary-container/30">
                      <div className="w-7 h-7 rounded-full bg-primary-container mx-auto mb-1 flex items-center justify-center font-mono text-[10px] font-black text-on-primary-container">4</div>
                      <span className="font-mono text-[8px] text-primary font-extrabold block truncate">You</span>
                    </div>
                  </div>
                </section>

                {/* Global activity feed */}
                <section className="flex flex-col gap-4">
                  <h2 className="font-mono text-xs font-black text-on-surface-variant uppercase tracking-widest">Global Activity</h2>
                  
                  {posts.map((post) => (
                    <div key={post.id} className="glass-card rounded-2xl p-4 flex flex-col gap-3 hover:border-white/10 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img className="w-10 h-10 rounded-lg object-cover border border-white/10" src={post.avatar} alt={post.author} />
                          <div>
                            <p className="font-display text-sm font-extrabold text-primary">{post.author}</p>
                            <p className="text-[10px] text-on-surface-variant font-mono">{post.timeAgo}</p>
                          </div>
                        </div>

                        {post.type === 'streak' && (
                          <div className="flex items-center gap-1 bg-surface-container px-2.5 py-0.5 rounded-full border border-white/5">
                            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                            <span className="font-mono text-[9px] font-black text-primary">{post.streakDays} DAY STREAK</span>
                          </div>
                        )}
                        {post.type === 'badge' && (
                          <span className="font-mono text-[8px] text-secondary-container border border-secondary-container/30 px-2 py-0.5 rounded uppercase font-black">
                            ACHIEVEMENT UNLOCKED
                          </span>
                        )}
                      </div>

                      {/* Content block */}
                      {post.type === 'streak' && (
                        <div className="py-2.5 px-4 bg-primary-container/5 rounded-lg border-l-2 border-primary-container">
                          <p className="text-xs text-primary italic font-serif leading-relaxed">{post.content}</p>
                        </div>
                      )}
                      
                      {post.type === 'badge' && (
                        <div className="flex items-center gap-4 bg-surface-container-highest/20 p-3 rounded-xl border border-white/5 relative overflow-hidden">
                          <div className="w-12 h-12 rounded-full bg-secondary-container/10 flex items-center justify-center border border-secondary-container/20 shrink-0">
                            <Heart className="w-6 h-6 text-secondary-container animate-pulse" />
                          </div>
                          <div>
                            <h4 className="font-display text-xs font-extrabold text-primary leading-tight">{post.badgeTitle}</h4>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">{post.badgeDetail}</p>
                          </div>
                        </div>
                      )}

                      {post.type === 'progress' && (
                        <div className="space-y-2">
                          <div className="flex justify-between font-mono text-[9px] text-on-surface-variant font-black">
                            <span>{post.progressLabel}</span>
                            <span>{post.progressPercent}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden p-0.5">
                            <div className="h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full" style={{ width: `${post.progressPercent}%` }}></div>
                          </div>
                          <p className="text-xs text-primary mt-1">{post.content}</p>
                        </div>
                      )}

                      {/* Action buttons footer */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-on-surface-variant font-mono">
                            {post.congratsCount} Congrats • {post.supportsCount} Supports
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleCongratulatePost(post.id)}
                            className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-black flex items-center gap-1 transition-all ${
                              post.hasCongratulated 
                                ? 'bg-primary-container text-on-primary-container' 
                                : 'bg-surface-container text-on-surface-variant hover:text-primary'
                            }`}
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>CONGRATS</span>
                          </button>
                          <button 
                            onClick={() => handleSupportPost(post.id)}
                            className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-black flex items-center gap-1 transition-all ${
                              post.hasSupported 
                                ? 'bg-secondary-container text-on-secondary-container' 
                                : 'bg-surface-container text-on-surface-variant hover:text-primary'
                            }`}
                          >
                            <Zap className="w-3 h-3" />
                            <span>HYPED</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </motion.div>
            )}

            {/* 5. SQUAD VIBE & CHAT & OPERATIVES */}
            {activeTab === 'mysquad' && (
              <motion.div
                key="mysquad"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Squad header */}
                <section className="mt-2">
                  <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-[10px] font-black text-surface-tint tracking-widest mb-1">CURRENT SQUAD</p>
                        <h2 className="font-display text-xl font-black text-primary tracking-tight">PHANTOM_CORP</h2>
                      </div>
                      <div className="bg-surface-container px-3 py-1 rounded-full border border-white/10">
                        <span className="font-mono text-xs text-primary font-bold">18/25 members</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1 bg-white/5 p-2.5 rounded-xl border border-white/5">
                        <p className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Squad Power</p>
                        <p className="font-display text-sm font-black text-primary-container">4.2k</p>
                      </div>
                      <div className="flex-1 bg-white/5 p-2.5 rounded-xl border border-white/5">
                        <p className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Global Rank</p>
                        <p className="font-display text-sm font-black text-secondary-fixed">#142</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Squad Chat Section */}
                <section className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-extrabold text-primary flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-primary-container" />
                      <span>Squad Vibe</span>
                    </h3>
                    <span className="font-mono text-[9px] text-surface-tint font-bold">3 NEW UPDATES</span>
                  </div>

                  <div className="glass-card rounded-2xl p-4 flex flex-col gap-4">
                    <div className="max-h-48 overflow-y-auto flex flex-col gap-3 pr-1">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 items-start border-l-2 pl-3 py-0.5 ${msg.isYou ? 'border-primary-container' : 'border-surface-variant'}`}>
                          <div className="flex-1">
                            <p className="text-xs text-primary leading-relaxed">
                              <span className={`font-black mr-1 ${msg.isYou ? 'text-primary-container' : 'text-on-surface'}`}>{msg.author}:</span>
                              {msg.content}
                            </p>
                            <p className="text-[8px] text-on-surface-variant font-mono mt-0.5">{msg.timeAgo}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat messaging form */}
                    <div className="flex gap-2 border-t border-white/5 pt-3">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                        className="flex-1 bg-surface-container-lowest border border-white/10 rounded-lg text-xs px-3.5 py-2 text-primary placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary-container"
                        placeholder="Drop a vibe check..."
                      />
                      <button 
                        onClick={sendChatMessage}
                        className="bg-primary-container text-on-primary-container p-2 rounded-lg neon-glow-lime active:scale-95 transition-transform shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Operatives List Preview */}
                <section className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-extrabold text-primary">Operatives</h3>
                    <span className="font-mono text-[10px] text-on-surface-variant hover:text-primary transition-colors cursor-pointer">FILTER</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Viper_9 Alert tap out link card */}
                    <div 
                      onClick={() => {
                        setActiveTab('tapout_detail');
                        playSynthesizerChime(587, 'sine', 0.2);
                      }}
                      className="glass-card bg-red-950/20 border-red-500/20 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-red-950/40 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-red-500/20 overflow-hidden shrink-0">
                          <img className="w-full h-full object-cover" src={AVATARS.viper9} alt="Viper_9" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-red-400 group-hover:underline flex items-center gap-1.5">
                            <span>Viper_9</span> 
                            <span className="bg-red-900/40 text-red-300 text-[8px] px-1.5 py-0.5 rounded font-mono font-black">TAP OUT INBOUND</span>
                          </p>
                          <p className="text-[10px] text-on-surface-variant font-mono">CRITICAL CRISIS</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Standard squad members */}
                    {operatives.slice(0, 3).map((op) => (
                      <div key={op.id} className="glass-card rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-high overflow-hidden shrink-0 border border-white/5">
                            <img className="w-full h-full object-cover" src={op.avatar} alt={op.name} />
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-primary flex items-center gap-1.5">
                              {op.name}
                              {op.id === 'op-1' && (
                                <span className="bg-primary-container text-on-primary-container text-[8px] px-1.5 py-0.2 rounded font-mono font-black">YOU</span>
                              )}
                            </p>
                            <p className="font-mono text-[9px] text-surface-tint uppercase font-bold">{op.rank}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end text-primary-container font-mono font-black">
                            {op.status === 'vulnerable' ? (
                              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                            ) : (
                              <Flame className="w-4 h-4 text-primary-container" />
                            )}
                            <span className={op.status === 'vulnerable' ? 'text-red-400' : 'text-primary'}>{op.streak}D</span>
                          </div>
                          <span className="font-mono text-[8px] text-on-surface-variant font-bold uppercase">{op.status === 'vulnerable' ? 'CRITICAL PHASE' : 'CLEAN STREAK'}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setDeviceMode('desktop');
                      setActiveTab('command');
                      playSynthesizerChime(523, 'sine', 0.2);
                    }}
                    className="w-full py-3.5 glass-card rounded-2xl border-dashed border-white/20 text-on-surface-variant font-mono text-[11px] font-black hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>EXPAND FULL 25 SQUAD COHORT</span>
                  </button>
                </section>

                {/* Mobile Tap Out Warning Card */}
                <section className="glass-card border-red-500/20 bg-red-950/10 p-5 rounded-3xl text-center flex flex-col gap-3">
                  <h4 className="font-display text-sm font-extrabold text-primary">Feeling Defeated?</h4>
                  <p className="text-xs text-on-surface-variant">
                    Tapping out resets your global rank and affects the squad's total multiplier. Reach out to the squad first.
                  </p>
                  <button 
                    onClick={launchBreathingShield}
                    className="w-full py-3 bg-red-900 text-white font-mono text-xs font-black rounded-xl hover:bg-red-800 transition-all tracking-widest active:scale-95 uppercase"
                  >
                    TAP OUT OVERRIDE
                  </button>
                </section>
              </motion.div>
            )}

            {/* 6. VIPER_9 TAP OUT REQUEST SCREEN */}
            {activeTab === 'tapout_detail' && (
              <motion.div
                key="tapout_detail"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Profile detail header */}
                <div className="flex flex-col items-center gap-3 text-center mt-2">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-red-500 to-amber-400">
                      <img className="w-full h-full rounded-full object-cover border-2 border-[#020617]" src={AVATARS.viper9} alt="Viper_9" />
                    </div>
                    <div className="absolute -bottom-1 -right-2 bg-red-950 text-red-400 px-2 py-0.5 rounded-full text-[8px] font-mono font-black border border-red-500/20 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-400" /> TAP OUT
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-black text-white leading-tight">Viper_9</h2>
                    <p className="font-mono text-[10px] text-on-surface-variant tracking-widest font-black uppercase">SQUAD: PHANTOM ZERO</p>
                  </div>
                </div>

                {/* Plea description card */}
                <section className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col gap-4">
                  <div className="scanning-line"></div>
                  <h3 className="font-mono text-xs text-surface-tint font-black">INCOMING TRANSMISSION</h3>
                  <p className="text-xs text-on-surface leading-relaxed italic">
                    "I'm hitting a wall, team. The cravings have been brutal for 48 hours straight. I don't think I can keep the streak alive without dragging you all down. This level is too high for me right now. Maybe I need to reset alone."
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="bg-surface-container p-3 rounded-xl border border-white/5 flex flex-col gap-1">
                      <span className="font-mono text-[9px] text-on-surface-variant font-bold block">STREAK</span>
                      <span className="font-display text-base font-extrabold text-primary">24 DAYS</span>
                    </div>
                    <div className="bg-surface-container p-3 rounded-xl border border-white/5 flex flex-col gap-1">
                      <span className="font-mono text-[9px] text-on-surface-variant font-bold block">RANK</span>
                      <span className="font-display text-base font-extrabold text-primary">ELITE IV</span>
                    </div>
                  </div>
                </section>

                {/* Majority vote progress bar */}
                <section className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <h4 className="font-mono text-[10px] text-white font-bold uppercase">MAJORITY VOTE STATUS</h4>
                    <span className="font-mono text-xs font-black text-primary-container">{voteCount} / 13 VOTES</span>
                  </div>

                  <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden border border-white/5 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-surface-tint to-primary-container rounded-full relative transition-all duration-500" 
                      style={{ width: `${(voteCount / 13) * 100}%` }}
                    />
                  </div>
                  <p className="text-on-surface-variant text-center font-mono text-[10px] mt-1">
                    {13 - voteCount} more approvals needed for Viper_9 to exit the cohort.
                  </p>
                </section>

                {/* Interactive buttons */}
                <section className="flex flex-col gap-3">
                  <button 
                    onClick={castStayVote}
                    disabled={votedStay}
                    className={`w-full py-4 rounded-xl font-display font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      votedStay 
                        ? 'bg-surface-container text-on-surface-variant cursor-not-allowed' 
                        : 'bg-primary-container text-on-primary-container hover:brightness-110 shadow-[0_0_15px_rgba(195,244,0,0.3)] active:scale-95'
                    }`}
                  >
                    <Heart className="w-5 h-5 animate-pulse" />
                    <span>{votedStay ? 'URGED VIPER_9 TO STAY' : 'CONVINCE TO STAY'}</span>
                  </button>

                  <button 
                    onClick={castExitVote}
                    disabled={votedExit}
                    className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition-all ${
                      votedExit 
                        ? 'bg-surface-container text-on-surface-variant cursor-not-allowed' 
                        : 'bg-surface-container-high hover:bg-surface-container-highest border border-white/10 text-on-surface'
                    }`}
                  >
                    {votedExit ? 'APPROVED TRANSITION' : 'APPROVE EXIT'}
                  </button>
                </section>

                {/* Activity Feed log */}
                <section className="flex flex-col gap-3">
                  <h4 className="font-mono text-[10px] text-on-surface-variant font-bold">SQUAD ACTIVITY</h4>
                  <div className="flex flex-col gap-2.5 opacity-80">
                    <div className="flex items-center gap-3">
                      <img className="w-7 h-7 rounded-full border border-white/10" src={AVATARS.ghostOps} alt="Ghost Ops" />
                      <p className="text-xs text-on-surface">
                        <span className="font-bold text-primary mr-1">Ghost_Ops</span> voted to <span className="text-primary-container font-bold">CONVINCE</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <img className="w-7 h-7 rounded-full border border-white/10" src={AVATARS.netRunner} alt="Net Runner" />
                      <p className="text-xs text-on-surface">
                        <span className="font-bold text-primary mr-1">Net_Runner</span> voted to <span className="text-on-surface-variant font-bold">APPROVE EXIT</span>
                      </p>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          </main>

          {/* MOBILE PULSING EMERGENCY FLOAT ACTION BUTTON */}
          {activeTab !== 'game' && activeTab !== 'tapout_detail' && (
            <button 
              onClick={launchBreathingShield}
              className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,0,110,0.6)] animate-pulse-glow z-40 group hover:scale-110 active:scale-95 cursor-pointer"
              title="EMERGENCY CRAVE MITIGATOR"
            >
              <AlertTriangle className="w-7 h-7 animate-bounce text-white" />
            </button>
          )}

          {/* MOBILE BOTTOM NAVIGATION BAR */}
          <nav className="fixed bottom-0 w-full max-w-md z-40 bg-surface-container-lowest/90 border-t border-white/10 backdrop-blur-xl rounded-t-2xl flex justify-around items-center px-4 py-3 pb-6 shadow-[0_-4px_20px_rgba(195,244,0,0.15)]">
            <button 
              onClick={() => {
                setActiveTab('dashboard');
                playSynthesizerChime(392, 'sine', 0.08);
              }}
              className={`flex items-center justify-center w-12 h-12 transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-primary-container text-on-primary-container rounded-full shadow-[0_0_15px_rgba(195,244,0,0.5)] scale-110' 
                  : 'text-on-surface-variant hover:text-primary hover:scale-110'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
            </button>

            <button 
              onClick={() => {
                setActiveTab('game');
                setIsGameActive(true);
                playSynthesizerChime(440, 'sine', 0.08);
              }}
              className={`flex items-center justify-center w-12 h-12 transition-all duration-200 ${
                activeTab === 'game' 
                  ? 'bg-primary-container text-on-primary-container rounded-full shadow-[0_0_15px_rgba(195,244,0,0.5)] scale-110' 
                  : 'text-on-surface-variant hover:text-primary hover:scale-110'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
            </button>

            <button 
              onClick={() => {
                setActiveTab('squad');
                playSynthesizerChime(494, 'sine', 0.08);
              }}
              className={`flex items-center justify-center w-12 h-12 transition-all duration-200 ${
                activeTab === 'squad' 
                  ? 'bg-primary-container text-on-primary-container rounded-full shadow-[0_0_15px_rgba(195,244,0,0.5)] scale-110' 
                  : 'text-on-surface-variant hover:text-primary hover:scale-110'
              }`}
            >
              <Users className="w-5 h-5" />
            </button>

            <button 
              onClick={() => {
                setActiveTab('quests');
                playSynthesizerChime(523, 'sine', 0.08);
              }}
              className={`flex items-center justify-center w-12 h-12 transition-all duration-200 ${
                activeTab === 'quests' 
                  ? 'bg-primary-container text-on-primary-container rounded-full shadow-[0_0_15px_rgba(195,244,0,0.5)] scale-110' 
                  : 'text-on-surface-variant hover:text-primary hover:scale-110'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            <button 
              onClick={() => {
                setActiveTab('mysquad');
                playSynthesizerChime(587, 'sine', 0.08);
              }}
              className={`flex items-center justify-center w-12 h-12 transition-all duration-200 ${
                activeTab === 'mysquad' 
                  ? 'bg-primary-container text-on-primary-container rounded-full shadow-[0_0_15px_rgba(195,244,0,0.5)] scale-110' 
                  : 'text-on-surface-variant hover:text-primary hover:scale-110'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </nav>

        </div>
      ) : (

        // ==========================================
        //  DESKTOP VANGUARD COMMAND CONSOLE (Screen 7 & 8)
        // ==========================================
        <div className="flex-grow flex w-full relative min-h-[calc(100vh-60px)]">
          
          {/* DESKTOP SIDEBAR NAVIGATION */}
          <aside className="fixed left-0 top-[53px] h-[calc(100vh-53px)] w-80 bg-surface-container-low border-r border-white/10 z-30 flex flex-col p-6 gap-6">
            <div className="mb-4">
              <h1 className="font-display text-4xl font-black text-surface-tint tracking-tighter leading-none">LEVEL {level}</h1>
              <p className="font-mono text-[10px] text-on-surface-variant tracking-widest mt-1">CYBER-STREET VANGUARD</p>
            </div>

            {/* Profile Brief panel */}
            <div className="flex items-center gap-4 p-3.5 bg-surface-container rounded-xl border border-white/5 shadow-inner">
              <div className="relative w-14 h-14 rounded-full border-2 border-primary-container p-0.5 overflow-hidden shrink-0">
                <img className="w-full h-full object-cover rounded-full" src={AVATARS.vanguardProfile} alt="CyberPhantom" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-primary">CyberPhantom_01</span>
                <span className="font-mono text-[9px] text-on-surface-variant tracking-widest uppercase">MASTER RANK</span>
                <div className="flex items-center gap-1 mt-1 font-mono text-xs font-extrabold text-primary-container">
                  <Flame className="w-3.5 h-3.5" />
                  <span>24 Day Streak</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="flex flex-col gap-2.5 flex-grow">
              <button 
                onClick={() => {
                  setActiveTab('dashboard');
                  playSynthesizerChime(523, 'sine', 0.08);
                }}
                className={`flex items-center gap-4 px-4 py-3 font-display text-sm font-extrabold rounded-xl transition-all hover:translate-x-1 cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(195,244,0,0.2)] font-black'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <CheckSquare className="w-5 h-5" />
                <span>Dashboard</span>
              </button>

              <button 
                onClick={() => {
                  setActiveTab('game');
                  setIsGameActive(true);
                  playSynthesizerChime(587, 'sine', 0.08);
                }}
                className={`flex items-center gap-4 px-4 py-3 font-display text-sm font-extrabold rounded-xl transition-all hover:translate-x-1 cursor-pointer ${
                  activeTab === 'game'
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(195,244,0,0.2)] font-black'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Gamepad2 className="w-5 h-5" />
                <span>Game Center</span>
              </button>

              <button 
                onClick={() => {
                  setActiveTab('quests');
                  playSynthesizerChime(659, 'sine', 0.08);
                }}
                className={`flex items-center gap-4 px-4 py-3 font-display text-sm font-extrabold rounded-xl transition-all hover:translate-x-1 cursor-pointer ${
                  activeTab === 'quests'
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(195,244,0,0.2)] font-black'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Black Market Gear</span>
              </button>

              <button 
                onClick={() => {
                  setActiveTab('command');
                  playSynthesizerChime(698, 'sine', 0.08);
                }}
                className={`flex items-center gap-4 px-4 py-3 font-display text-sm font-extrabold rounded-xl transition-all hover:translate-x-1 cursor-pointer ${
                  activeTab === 'command'
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(195,244,0,0.2)] font-black'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Squad Command</span>
              </button>
            </nav>

            {/* Sidebar bottom ranking block */}
            <div className="glass-card p-4 rounded-xl border border-white/5 relative overflow-hidden flex flex-col gap-2 mt-auto">
              <div className="scanning-line"></div>
              <span className="font-mono text-[9px] text-primary-container font-black tracking-widest uppercase">SQUAD GLOBAL RANK</span>
              <span className="font-display text-2xl font-black text-primary">#402</span>
              <div className="w-full bg-white/5 h-1 mt-1 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full w-3/4 rounded-full shadow-[0_0_8px_rgba(195,244,0,0.5)]"></div>
              </div>
            </div>
          </aside>

          {/* DESKTOP MIDDLE MAIN AREA */}
          <main className="flex-1 ml-80 mr-80 p-10 min-h-screen">
            
            {/* Header Area */}
            <header className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-3xl font-extrabold text-primary tracking-tight">Vanguard Command</h2>
                <p className="text-on-surface-variant font-mono text-xs italic opacity-70">
                  {activeTab === 'command' ? 'Phantom Cohort Operational Grid Matrix' : 'The air is cleaner on the edge of tomorrow.'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-surface-container px-4 py-2 rounded-full border border-white/5 flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-secondary-fixed-dim" />
                  <span className="font-mono text-xs font-black text-secondary-fixed-dim uppercase">${moneySaved + 272} SAVED EXPENSES</span>
                </div>
                <div className="bg-surface-container px-4 py-2 rounded-full border border-white/5 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-primary-container animate-pulse" />
                  <span className="font-mono text-xs font-black text-primary-container uppercase">{credits.toLocaleString()} Z-CREDITS</span>
                </div>
              </div>
            </header>

            {/* COMMAND ACTIVE SUB-TABS */}
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="desktop-dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col gap-8"
                >
                {/* Metrics top cards */}
                <section className="grid grid-cols-12 gap-6">
                  {/* Lung Capacity ring card */}
                  <div className="col-span-7 glass-card p-6 rounded-3xl flex flex-col gap-6 relative overflow-hidden h-72">
                    <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                      <Wind className="w-full h-full text-primary-container animate-pulse" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-5">
                      <div>
                        <h3 className="font-mono text-[10px] text-primary-container font-black tracking-widest uppercase">SYSTEM RECOVERY STATUS</h3>
                        <h4 className="font-display text-xl font-extrabold text-primary">Biometric Airway Restoration</h4>
                      </div>

                      <div className="flex items-center gap-10">
                        {/* Dynamic Ring */}
                        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full -rotate-90">
                            <circle className="text-surface-container-highest" cx="72" cy="72" fill="transparent" r="62" stroke="currentColor" strokeWidth="8" />
                            <circle 
                              className="text-secondary-container" 
                              cx="72" 
                              cy="72" 
                              fill="transparent" 
                              r="62" 
                              stroke="currentColor" 
                              strokeDasharray="390" 
                              strokeDashoffset={390 - (390 * 82) / 100} 
                              strokeLinecap="round" 
                              strokeWidth="9"
                              style={{ filter: 'drop-shadow(0 0 8px rgba(0,238,252,0.6))' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-display text-2xl font-black text-primary">82%</span>
                            <span className="font-mono text-[8px] text-on-surface-variant font-bold uppercase">RESTORED</span>
                          </div>
                        </div>

                        {/* Extra descriptors */}
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start gap-2.5">
                            <Wind className="w-4 h-4 text-primary-container mt-1 shrink-0" />
                            <div>
                              <p className="text-[10px] text-on-surface-variant font-mono font-bold">OXYGEN EFFICIENCY</p>
                              <p className="text-sm font-extrabold text-primary">+18% vs LAST WEEK</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Heart className="w-4 h-4 text-secondary-container mt-1 shrink-0" />
                            <div>
                              <p className="text-[10px] text-on-surface-variant font-mono font-bold">RESTING HEART RATE</p>
                              <p className="text-sm font-extrabold text-primary">64 BPM (OPTIMIZED)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* High level info blocks */}
                  <div className="col-span-5 flex flex-col gap-6">
                    <div className="glass-card p-6 rounded-3xl flex-1 flex flex-col justify-between border-l-4 border-l-primary-container hover:border-l-secondary-container transition-all">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] font-bold text-on-surface-variant">DAYS SMOKE FREE</span>
                        <Check className="text-primary-container w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="font-display text-4xl font-extrabold text-primary leading-tight">42</span>
                        <span className="text-on-surface-variant ml-2 font-mono text-xs">Clean Cycles completed</span>
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-3xl flex-1 flex flex-col justify-between border-l-4 border-l-secondary-container">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] font-bold text-on-surface-variant">TOTAL WEALTH GAIN</span>
                        <DollarSign className="text-secondary-container w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-display text-4xl font-extrabold text-primary leading-tight">$412</span>
                        <p className="text-on-surface-variant text-[11px] mt-1">Enough for equipping: <span className="text-primary font-bold">CyberDeck MK-II</span></p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Sub row components: Rank ups & Upcoming quests */}
                <section className="grid grid-cols-2 gap-6">
                  {/* Next Ranks Card */}
                  <div className="glass-card p-6 rounded-3xl flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-extrabold text-primary flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-surface-tint" />
                        <span>Next Rank Ups</span>
                      </h3>
                      <button className="text-primary-container font-mono text-xs hover:underline">VIEW ALL</button>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="bg-surface-container p-3 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary-container font-mono font-black text-sm">15</div>
                          <div>
                            <p className="text-xs font-bold text-primary">Shadow Runner</p>
                            <p className="text-[10px] text-on-surface-variant">Reach 45 Days Free</p>
                          </div>
                        </div>
                        <div className="w-24 h-1.5 bg-surface-container-lowest rounded-full overflow-hidden p-0.5">
                          <div className="bg-primary-container h-full w-[93%]"></div>
                        </div>
                      </div>

                      <div className="bg-surface-container p-3 rounded-xl flex items-center justify-between opacity-60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center text-surface-tint font-mono font-black text-sm">16</div>
                          <div>
                            <p className="text-xs font-bold text-primary">Neon Spectre</p>
                            <p className="text-[10px] text-on-surface-variant">Earn 'Breath of Life' Achievement</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Quests block */}
                  <div className="glass-card p-6 rounded-3xl flex flex-col gap-4">
                    <h3 className="font-display text-sm font-extrabold text-primary flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-on-tertiary-container" />
                      <span>Upcoming Quests</span>
                    </h3>

                    <div className="flex flex-col gap-3">
                      <div className="p-3 bg-surface-container border border-white/5 rounded-xl flex items-center justify-between gap-4 relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-on-tertiary-container"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs text-primary">The 48-Hour Blackout</span>
                            <span className="bg-on-tertiary-container/20 text-on-tertiary-container text-[8px] font-mono font-black px-1.5 py-0.2 rounded">HIGH XP</span>
                          </div>
                          <p className="text-[10px] text-on-surface-variant mt-0.5">Survive two days without a single craving trigger.</p>
                        </div>
                        <button 
                          onClick={() => {
                            playSynthesizerChime(880, 'sine', 0.1);
                            triggerToast("Quest 'The 48-Hour Blackout' accepted! Added to logs.");
                          }}
                          className="bg-on-tertiary-container text-white px-2.5 py-1 rounded-lg font-mono text-[9px] font-black hover:brightness-110 shrink-0"
                        >
                          ACCEPT
                        </button>
                      </div>

                      <div className="p-3 bg-surface-container border border-white/5 rounded-xl flex items-center justify-between gap-4 relative overflow-hidden opacity-80">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs text-primary">Squad Synergy</span>
                            <span className="bg-secondary-container/20 text-on-secondary-container text-[8px] font-mono font-black px-1.5 py-0.2 rounded">SQUAD</span>
                          </div>
                          <p className="text-[10px] text-on-surface-variant mt-0.5">Encourage 3 squad members in the live feed.</p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-secondary-container shrink-0" />
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* CRAVE CRUSHER GAME - DESKTOP HUD PORTAL */}
            {activeTab === 'game' && (
              <motion.div
                key="desktop-game"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Render game inside the desktop layout */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-secondary-container font-black tracking-widest uppercase">CRAVE CRUSHER // ARCADE INBOUND</span>
                      <h3 className="font-display text-xl font-extrabold text-primary">Cyber-Active Reflex Deflector</h3>
                    </div>
                    <div className="bg-surface-container px-4 py-1.5 rounded-full border border-white/5 text-xs font-mono font-black text-secondary">
                      Multipliers active: {gameCombo}x
                    </div>
                  </div>

                  <div className="relative w-full aspect-video bg-gradient-to-b from-surface-container-low to-surface-container-lowest border border-white/10 rounded-2xl overflow-hidden h-[360px]" id="desktop-game-arena">
                    <div className="scanning-line"></div>
                    
                    {/* Score/Combo HUD */}
                    <div className="absolute top-6 left-6 z-20">
                      <p className="font-mono text-[9px] text-on-surface-variant font-bold tracking-widest uppercase">SCORE</p>
                      <p className="font-display text-3xl font-black text-primary tracking-tight">{gameScore.toLocaleString()}</p>
                    </div>

                    <div className="absolute top-6 right-6 z-20 text-right">
                      <p className="font-mono text-[9px] text-on-surface-variant font-bold tracking-widest uppercase">COMBO STREAK</p>
                      <p className="font-display text-3xl font-black text-secondary-container tracking-tight">x{gameCombo}</p>
                    </div>

                    {gameOrbs.length === 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <Gamepad2 className="w-16 h-16 text-primary-container animate-bounce mb-3" />
                        <p className="font-mono text-sm font-black text-primary">INITIALIZING RETINAL ORB REFLECTORS...</p>
                        <button 
                          onClick={() => {
                            setGameOrbs([]);
                            setGameCombo(12);
                            setGameScore(48250);
                            spawnOrb();
                            spawnOrb();
                            spawnOrb();
                            spawnOrb();
                          }}
                          className="mt-4 px-5 py-2 bg-primary-container text-on-primary-container font-mono text-xs font-black rounded-xl"
                        >
                          SPAWN TARGETS
                        </button>
                      </div>
                    )}

                    {/* Orbs loops */}
                    {gameOrbs.map((orb) => (
                      <button
                        key={orb.id}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          handleOrbClick(orb.id, rect.left + rect.width/2, rect.top + rect.height/2, orb.type);
                        }}
                        className={`absolute rounded-full border-2 p-1 flex items-center justify-center animate-pulse-glow hover:scale-110 active:scale-95 transition-all cursor-pointer z-20`}
                        style={{
                          left: `${orb.x}%`,
                          top: `${orb.y}%`,
                          width: `${orb.size * 1.2}px`,
                          height: `${orb.size * 1.2}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span className="text-2xl">{orb.icon}</span>
                      </button>
                    ))}

                    {/* Desktop Pop particles */}
                    {particles.map((p) => (
                      <div 
                        key={p.id}
                        className="absolute w-2.5 h-2.5 rounded-full animate-ping pointer-events-none"
                        style={{
                          left: `${p.x}px`,
                          top: `${p.y}px`,
                          backgroundColor: p.color
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-on-surface-variant font-mono">
                      Click the floating neon orbs to pop them. Boost your focus & deflect craving signals instantly.
                    </p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setIsGameActive(!isGameActive);
                          playSynthesizerChime(440, 'sine', 0.1);
                        }}
                        className="px-4 py-2 bg-surface-container hover:bg-surface-container-high border border-white/5 rounded-xl font-mono text-xs font-bold"
                      >
                        {isGameActive ? 'PAUSE CLOCK' : 'START CLOCK'}
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('dashboard');
                          setIsGameActive(false);
                        }}
                        className="px-4 py-2 bg-red-950/20 text-red-400 border border-red-500/10 rounded-xl font-mono text-xs font-bold"
                      >
                        QUIT GAME
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BLACK MARKET GEAR STORE - DESKTOP LAYOUT */}
            {activeTab === 'quests' && (
              <motion.div
                key="desktop-quests"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Store layout */}
                <section className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                      <h3 className="font-display text-xl font-extrabold text-primary">Cybernetic Augmentation Repository</h3>
                      <p className="text-xs text-on-surface-variant font-mono mt-1">Unlock rare street overlays, digital avatars, and automated pets.</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button className="px-3.5 py-1.5 bg-surface-container border border-white/5 rounded-lg text-xs font-mono font-bold hover:bg-surface-container-high">
                        RARITY FILTER
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {marketItems.map((item) => (
                      <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-white/5 relative">
                        <div className="h-44 bg-surface-container-high relative overflow-hidden">
                          <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} alt={item.name} />
                          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase ${item.badgeStyle}`}>
                            {item.rarity}
                          </div>
                        </div>

                        <div className="p-4 flex flex-col gap-3 justify-between flex-1">
                          <div>
                            <h4 className="font-display text-sm font-extrabold text-primary leading-tight">{item.name}</h4>
                            <p className="text-[11px] text-on-surface-variant mt-0.5">{item.category}</p>
                          </div>

                          <div className="flex justify-between items-center gap-4">
                            <span className="font-mono text-xs text-on-surface-variant">{item.unlockedAt}</span>
                            <button 
                              onClick={() => purchaseStoreItem(item)}
                              className={`px-4 py-2 rounded-xl font-mono text-xs font-black flex items-center gap-2 transition-all active:scale-95 ${
                                item.owned 
                                  ? 'bg-surface-container text-on-surface-variant cursor-not-allowed' 
                                  : 'bg-primary-container text-on-primary-container hover:brightness-110 shadow-[0_0_10px_rgba(195,244,0,0.3)]'
                              }`}
                            >
                              <Zap className="w-3.5 h-3.5" />
                              <span>{item.owned ? 'EQUIPPED // OWNED' : `${item.price} Z-CREDITS`}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* SQUAD COMMAND MATRIX (Full Screen Dynamic View of 25 cohort members - SCREEN 8) */}
            {activeTab === 'command' && (
              <motion.div
                key="desktop-command"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Cohort header details */}
                <section className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 glass-card p-6 rounded-3xl flex flex-col justify-between border-l-4 border-l-primary-container relative h-44">
                    <div>
                      <h3 className="font-display text-2xl font-black text-primary">PHANTOM COHORT MATRIX</h3>
                      <p className="text-xs text-on-surface-variant font-mono mt-0.5">25 active nodes monitoring real-time bio-clean telemetry status.</p>
                    </div>
                    <div className="flex gap-8 pt-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-on-surface-variant font-black">TOTAL DAYS CLEAN</span>
                        <span className="font-display text-2xl font-extrabold text-primary">842</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-on-surface-variant font-black">SQUAD Telemetry HP</span>
                        <span className="font-display text-2xl font-extrabold text-secondary-container">100% SECURE</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-3xl flex flex-col justify-between bg-primary-container/5 relative overflow-hidden h-44 border border-primary-container/20">
                    <span className="font-mono text-[9px] text-primary-container font-black tracking-widest uppercase">ACTIVE COHORT DRILL</span>
                    <div>
                      <h4 className="font-display text-lg font-extrabold text-primary leading-tight">Deep Breathe Overdrive</h4>
                      <p className="text-[10px] text-on-surface-variant mt-1">Join synchronised lung cycles.</p>
                    </div>
                    <button 
                      onClick={() => {
                        launchBreathingShield();
                      }}
                      className="w-full py-2 bg-primary-container text-on-primary-container font-display font-black text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all"
                    >
                      JOIN SESSION
                    </button>
                  </div>
                </section>

                {/* 25 Operatives GRID! Extremely high fidelity, clicking an operative displays status details */}
                <section className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono text-xs font-black text-on-surface-variant uppercase tracking-widest">PHANTOM_CORP OPERATIVES TELEMETRY</h3>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-mono text-on-surface-variant">CLICK AN OPERATIVE TO EMIT REINFORCEMENTS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {operatives.map((op) => {
                      const vulnerableClass = op.status === 'vulnerable' ? 'border-t-red-400 bg-red-950/10' : 'border-t-primary-container hover:bg-white/5';
                      return (
                        <div 
                          key={op.id}
                          onClick={() => {
                            setSelectedOperative(op);
                            playSynthesizerChime(op.status === 'vulnerable' ? 330 : 660, 'sine', 0.15);
                          }}
                          className={`glass-card p-3 rounded-xl border-t-2 ${vulnerableClass} relative flex flex-col gap-2 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-white/10 shrink-0">
                              <img className="w-full h-full object-cover" src={op.avatar} alt={op.name} />
                            </div>
                            <span className="font-mono text-[8px] font-black bg-white/5 text-on-surface-variant px-1.5 py-0.2 rounded uppercase">{op.rank}</span>
                          </div>

                          <p className="font-display text-xs font-extrabold text-primary truncate tracking-tight">{op.name}</p>
                          
                          <div className="flex items-center gap-1 mt-0.5">
                            <Flame className={`w-3.5 h-3.5 ${op.status === 'vulnerable' ? 'text-red-400 animate-pulse' : 'text-primary-container'}`} />
                            <span className={`font-mono text-xs font-black ${op.status === 'vulnerable' ? 'text-red-400' : 'text-primary'}`}>{op.streak}D</span>
                          </div>

                          {op.status === 'vulnerable' && (
                            <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-xl pointer-events-none"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          </main>

          {/* DESKTOP RIGHT-SIDE CONSOLE PANEL: LIVE SQUAD TELEMETRY CHAT & COMMAND TRANSMISSIONS */}
          <aside className="fixed right-0 top-[53px] h-[calc(100vh-53px)] w-80 bg-surface-container-low border-l border-white/10 z-30 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col gap-4">
              <h3 className="font-mono text-xs font-black text-primary tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-container animate-pulse" />
                <span>SQUAD TRANSMISSION LOGS</span>
              </h3>

              <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[8px] text-on-surface-variant font-bold uppercase mb-1">COHORT COMBAT POWER</p>
                  <p className="font-display text-xl font-black text-primary-container">14,820</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center border border-primary-container/20">
                  <Zap className="w-5 h-5 text-primary-container animate-pulse" />
                </div>
              </div>
            </div>

            {/* Scrollable messages log */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              
              {/* Viper_9 Critical plea request block inside sidebar */}
              <div 
                onClick={() => {
                  setActiveTab('tapout_detail');
                  playSynthesizerChime(587, 'sine', 0.2);
                }}
                className="bg-red-950/20 border border-red-500/20 rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden cursor-pointer hover:bg-red-950/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high overflow-hidden shrink-0 border border-red-500/10">
                    <img className="w-full h-full object-cover" src={AVATARS.viper9} alt="Viper_9" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-red-400 group-hover:underline">Viper_9 Tap-Out Plea</p>
                    <p className="font-mono text-[9px] text-on-surface-variant font-bold">SIGNAL STRENGTH: 12%</p>
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant italic font-serif leading-relaxed mt-1">
                  "The cravings are hitting hard tonight. I don't know if I can hold..."
                </p>
                <div className="flex justify-between items-center gap-2 pt-1">
                  <span className="font-mono text-[9px] text-red-400 font-bold uppercase">13 VOTE MATRIX</span>
                  <span className="text-red-400 text-xs font-black group-hover:translate-x-1 transition-transform">VOTE NOW →</span>
                </div>
              </div>

              {/* Chat threads */}
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-[9px] text-on-surface-variant font-black tracking-widest uppercase">CREW LIVE VIBE CHECK</h4>
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-2.5">
                    <img className="w-8 h-8 rounded-full border border-white/20 shrink-0 object-cover" src={msg.avatar} alt={msg.author} />
                    <div className="bg-surface-container-highest/40 p-3 rounded-2xl rounded-tl-none border border-white/5 flex-1">
                      <p className={`text-[10px] font-mono font-black mb-0.5 ${msg.isYou ? 'text-primary-container' : 'text-surface-tint'}`}>{msg.author}</p>
                      <p className="text-xs text-primary leading-normal">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Chat entry panel */}
            <div className="p-4 border-t border-white/5 bg-surface-container-low">
              <div className="relative flex items-center bg-surface-container-lowest rounded-xl px-3.5 py-1.5 border border-white/10 focus-within:border-secondary-container transition-all">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="bg-transparent border-none focus:outline-none text-xs text-primary flex-grow placeholder:text-on-surface-variant/40" 
                  placeholder="Transmit to squad..." 
                />
                <button 
                  onClick={sendChatMessage}
                  className="text-primary-container hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                >
                  <Send className="w-4 h-4 text-primary-container" />
                </button>
              </div>
            </div>
          </aside>

          {/* DESKTOP PULSING EMBEDDED EMERGENCY FLOAT BUTTON */}
          <button 
            onClick={launchBreathingShield}
            className="fixed bottom-8 right-88 w-20 h-20 bg-red-600 rounded-full flex flex-col items-center justify-center z-[100] shadow-[0_0_30px_rgba(255,0,110,0.6)] animate-pulse-glow border-4 border-background hover:scale-110 active:scale-95 transition-all cursor-pointer"
            id="desktop-emergency-crave-btn"
          >
            <AlertTriangle className="w-8 h-8 text-white animate-bounce" />
            <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest mt-0.5">CRAVE</span>
          </button>

        </div>
      )}

      {/* ========================================================
           GLOBAL PORTAL MODAL 1: EMERGENCY LUNG RECOVERY SHIELD
         ======================================================== */}
      {craveOverrideActive && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 z-[999] animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-low rounded-3xl p-6 border-2 border-red-500/20 shadow-[0_0_50px_rgba(255,0,110,0.4)] flex flex-col gap-6 relative">
            <div className="scanning-line"></div>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="font-mono text-xs font-black text-red-400 uppercase tracking-widest">EMERGENCY CRAVE MITIGATOR</span>
              </div>
              <button 
                onClick={() => {
                  setCraveOverrideActive(false);
                  playSynthesizerChime(220, 'sine', 0.1);
                  triggerToast("Active override terminated. Stay strong.");
                }}
                className="text-on-surface-variant hover:text-primary font-mono text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg"
              >
                CLOSE
              </button>
            </div>

            <div className="text-center flex flex-col items-center gap-6 my-4">
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-black text-white">Vanguard Breath Shield</h3>
                <p className="text-xs text-on-surface-variant">The urge peaks for only 90 seconds. We deflect it now.</p>
              </div>

              {/* Glowing expand/contract breath circle */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div 
                  className={`absolute rounded-full bg-primary-container/10 border-4 border-primary-container shadow-[0_0_30px_rgba(195,244,0,0.5)] transition-all duration-1000 flex items-center justify-center ${
                    breathPhase === 'In' ? 'w-48 h-48' : breathPhase === 'Hold' ? 'w-48 h-48 opacity-80' : 'w-24 h-24'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-display text-2xl font-black text-white tracking-tight uppercase">{breathPhase}</span>
                    <span className="font-mono text-3xl font-black text-primary-container">{breathTimer}s</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between gap-2 max-w-xs font-mono text-[10px] text-on-surface-variant">
                <span className={breathPhase === 'In' ? 'text-primary-container font-black' : ''}>1. INHALE COLD AIR (4s)</span>
                <span className={breathPhase === 'Hold' ? 'text-primary-container font-black' : ''}>2. HOLD APEX (4s)</span>
                <span className={breathPhase === 'Out' ? 'text-primary-container font-black' : ''}>3. EXHALE WARMLY (4s)</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  setCraveOverrideActive(false);
                  setLungCapacity(Math.min(lungCapacity + 3, 100));
                  setCredits(prev => prev + 50);
                  playSynthesizerChime(1046, 'sine', 0.3);
                  triggerToast("Crave crushed! Saved +3% Lung Capacity & +50 ZC.");
                }}
                className="w-full py-4 bg-primary-container text-on-primary-container font-display font-extrabold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all text-center uppercase tracking-widest"
              >
                URGE OVERCOME // DISMISS SHIELD
              </button>
              <p className="text-center font-mono text-[9px] text-on-surface-variant opacity-60">
                DISMISSING CREDITS YOU WITH +50 V-COINS SECURED BIOMETRICALLY
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
           GLOBAL PORTAL MODAL 2: COHORT BIOMETRICS DETAIL LOGS
         ======================================================== */}
      {selectedOperative && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-[999] animate-fade-in">
          <div className="w-full max-w-md bg-surface-container rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col gap-5 relative">
            <div className="scanning-line"></div>

            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-primary-container font-black tracking-widest">OPERATIVE BIOMETRIC LOGS</span>
              <button 
                onClick={() => setSelectedOperative(null)}
                className="text-on-surface-variant hover:text-white font-mono text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg"
              >
                DISMISS
              </button>
            </div>

            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <img className="w-16 h-16 rounded-xl object-cover border border-white/10" src={selectedOperative.avatar} alt={selectedOperative.name} />
              <div>
                <h4 className="font-display text-lg font-extrabold text-primary leading-tight">{selectedOperative.name}</h4>
                <p className="font-mono text-xs text-primary-container font-bold">{selectedOperative.rank.toUpperCase()} TELEMETRY NODE</p>
                <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">STATUS: {selectedOperative.status === 'vulnerable' ? '🚨 CRITICAL CRAVING STRESS' : '🛡️ SECURE BIOSTATE'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-high p-3 rounded-xl flex flex-col gap-1">
                <span className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Current Clean Streak</span>
                <span className="font-display text-base font-extrabold text-primary">{selectedOperative.streak} Days</span>
              </div>
              <div className="bg-surface-container-high p-3 rounded-xl flex flex-col gap-1">
                <span className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Biometric Multiplier</span>
                <span className="font-display text-base font-extrabold text-secondary-container">1.2x Active</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => {
                  playSynthesizerChime(880, 'sine', 0.2);
                  triggerToast(`Dispatched reinforcement signal to ${selectedOperative.name}!`);
                  setSelectedOperative(null);
                }}
                className="w-full py-3 bg-primary-container text-on-primary-container font-display font-black text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all text-center"
              >
                DISPATCH BIO-REINFORCEMENT PING
              </button>
              <button 
                onClick={() => setSelectedOperative(null)}
                className="w-full py-3 bg-surface-container-high text-on-surface font-mono text-xs font-bold rounded-xl text-center"
              >
                CANCEL COMMAND
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
