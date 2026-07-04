import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Calendar, Check, Sparkles, Flame, Clock, Award, Zap } from 'lucide-react';

interface DailyCheckInProps {
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  streakDays: number;
  setStreakDays: React.Dispatch<React.SetStateAction<number>>;
  moneySaved: number;
  setMoneySaved: React.Dispatch<React.SetStateAction<number>>;
  experience: number;
  setExperience: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  triggerToast: (msg: string) => void;
  playSynthesizerChime: (freq: number, type?: 'sine' | 'triangle' | 'sawtooth', dur?: number) => void;
}

interface CheckInReward {
  day: number;
  credits: number;
  xp: number;
  moneySavedBonus?: number;
  isEpic?: boolean;
  itemRewardName?: string;
}

const REWARDS: CheckInReward[] = [
  { day: 1, credits: 150, xp: 15, isEpic: false },
  { day: 2, credits: 250, xp: 20, moneySavedBonus: 5, isEpic: false },
  { day: 3, credits: 350, xp: 25, isEpic: false },
  { day: 4, credits: 500, xp: 35, moneySavedBonus: 10, isEpic: false },
  { day: 5, credits: 650, xp: 40, isEpic: false },
  { day: 6, credits: 800, xp: 50, moneySavedBonus: 15, isEpic: false },
  { day: 7, credits: 1500, xp: 100, moneySavedBonus: 25, isEpic: true, itemRewardName: "Titanium Airway Badge" }
];

export default function DailyCheckIn({
  credits,
  setCredits,
  streakDays,
  setStreakDays,
  moneySaved,
  setMoneySaved,
  experience,
  setExperience,
  level,
  setLevel,
  triggerToast,
  playSynthesizerChime
}: DailyCheckInProps) {
  const [checkedDays, setCheckedDays] = useState<number[]>([]);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [isCheckInAvailable, setIsCheckInAvailable] = useState<boolean>(true);
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false);
  const [claimedReward, setClaimedReward] = useState<CheckInReward | null>(null);

  // Load check-in state on mount
  useEffect(() => {
    const savedCheckedDays = localStorage.getItem('vapezero_checked_days');
    const savedLastCheckIn = localStorage.getItem('vapezero_last_check_in');
    
    if (savedCheckedDays) {
      setCheckedDays(JSON.parse(savedCheckedDays));
    }
    if (savedLastCheckIn) {
      setLastCheckIn(savedLastCheckIn);
    }
  }, []);

  // Check if check-in is available today
  useEffect(() => {
    if (!lastCheckIn) {
      setIsCheckInAvailable(true);
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (lastCheckIn === todayStr) {
      setIsCheckInAvailable(false);
    } else {
      setIsCheckInAvailable(true);
    }
  }, [lastCheckIn]);

  const handleCheckIn = () => {
    if (!isCheckInAvailable) {
      triggerToast("Already checked in for today! Return tomorrow.");
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    
    // Calculate which day in the 7-day cycle we are claiming next
    // If we finished Day 7 previously, we reset back to Day 1
    let nextDayToClaim = checkedDays.length + 1;
    if (nextDayToClaim > 7) {
      nextDayToClaim = 1;
    }

    // Determine if streak is maintained or reset
    let isStreakMaintained = false;
    if (lastCheckIn) {
      const lastDate = new Date(lastCheckIn);
      const todayDate = new Date(todayStr);
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        isStreakMaintained = true;
      }
    } else {
      isStreakMaintained = true; // First check-in starts the streak
    }

    // Update streak in parent
    if (isStreakMaintained) {
      setStreakDays(prev => prev + 1);
    } else {
      setStreakDays(1); // Reset streak if missed a day
      triggerToast("Ah! Day missed, streak reset to 1 day. Keep it going!");
    }

    // Prepare new list of checked days
    let newCheckedDays = [];
    if (nextDayToClaim === 1) {
      newCheckedDays = [1];
    } else {
      newCheckedDays = [...checkedDays, nextDayToClaim];
    }

    // Save to state & localStorage
    setCheckedDays(newCheckedDays);
    setLastCheckIn(todayStr);
    setIsCheckInAvailable(false);
    
    localStorage.setItem('vapezero_checked_days', JSON.stringify(newCheckedDays));
    localStorage.setItem('vapezero_last_check_in', todayStr);

    // Get current reward
    const reward = REWARDS.find(r => r.day === nextDayToClaim) || REWARDS[0];
    setClaimedReward(reward);

    // Apply reward bonuses
    setCredits(prev => prev + reward.credits);
    if (reward.moneySavedBonus) {
      setMoneySaved(prev => prev + reward.moneySavedBonus);
    }
    
    // Experience update with Level Up check
    let newXp = experience + reward.xp;
    let newLevel = level;
    if (newXp >= 100) {
      newLevel += 1;
      newXp = newXp - 100;
      setTimeout(() => {
        playSynthesizerChime(880, 'sine', 0.4);
        triggerToast(`🎉 LEVEL UP! You reached Level ${newLevel}!`);
      }, 800);
    }
    setExperience(newXp);
    setLevel(newLevel);

    // Play rewards sound
    playSynthesizerChime(reward.isEpic ? 659.25 : 523.25, reward.isEpic ? 'sawtooth' : 'triangle', 0.3);
    
    // Show details modal
    setShowRewardModal(true);
    triggerToast(`Day ${reward.day} Check-In claimed! +${reward.credits} ZC.`);
  };

  const getDayStatus = (dayNum: number) => {
    // A day can be: 'claimed', 'active' (today's next target), or 'locked' (future)
    const isClaimed = checkedDays.includes(dayNum);
    if (isClaimed) return 'claimed';
    
    // Next day to claim
    const nextToClaim = checkedDays.length + 1 > 7 ? 1 : checkedDays.length + 1;
    if (dayNum === nextToClaim && isCheckInAvailable) return 'active';
    
    return 'locked';
  };

  return (
    <section className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col gap-4 relative overflow-hidden">
      {/* Visual background gradient accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full filter blur-xl pointer-events-none"></div>
      
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container border border-primary-container/30">
            <Calendar className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-primary-container font-black tracking-widest uppercase">ROUTINE TRACKER</span>
            <h3 className="font-display text-sm font-black text-primary tracking-tight">Daily Habit Check-In</h3>
          </div>
        </div>

        {/* Streak counter badge */}
        <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full border border-white/5">
          <Flame className="w-3.5 h-3.5 text-on-tertiary-container fill-on-tertiary-container animate-pulse" />
          <span className="font-mono text-[10px] font-black text-primary">STREAK: {streakDays}d</span>
        </div>
      </div>

      {/* Intro info */}
      <p className="text-[11px] text-on-surface-variant leading-relaxed">
        Building healthy habits requires continuous daily effort. Check in every single day to log your smoke-free commitment and claim premium rewards.
      </p>

      {/* 7-Day progress row */}
      <div className="grid grid-cols-7 gap-2 my-2">
        {REWARDS.map((rew) => {
          const status = getDayStatus(rew.day);
          return (
            <div 
              key={rew.day}
              className={`relative flex flex-col items-center justify-between py-2.5 px-1 rounded-2xl border text-center transition-all ${
                status === 'claimed' 
                  ? 'bg-primary-container/10 border-primary-container/30 text-primary-container' 
                  : status === 'active' 
                    ? 'bg-surface-container-highest border-primary-container/60 shadow-[0_0_12px_rgba(195,244,0,0.2)] text-primary font-bold scale-105 z-10' 
                    : 'bg-surface-container border-white/5 text-on-surface-variant/70'
              }`}
            >
              {/* Day indicator */}
              <span className="font-mono text-[9px] font-bold block mb-1">D{rew.day}</span>
              
              {/* Indicator icon */}
              <div className="my-1.5">
                {status === 'claimed' ? (
                  <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : status === 'active' ? (
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="w-6 h-6 rounded-full bg-surface-container-low border border-primary-container/40 flex items-center justify-center text-primary-container"
                  >
                    <Gift className="w-3.5 h-3.5 fill-primary-container/10 text-primary-container" />
                  </motion.div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-surface-container-low border border-white/5 flex items-center justify-center opacity-60">
                    <Clock className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Reward preview */}
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-mono text-[8px] font-extrabold text-on-surface">+{rew.credits} ZC</span>
                {rew.moneySavedBonus && (
                  <span className="font-mono text-[7px] text-secondary-fixed-dim font-black">+${rew.moneySavedBonus}</span>
                )}
                {rew.isEpic && (
                  <span className="text-[7px] bg-on-tertiary-container/20 text-on-tertiary-container font-mono font-black px-1 rounded uppercase tracking-tighter">EPIC</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <div className="mt-1">
        {isCheckInAvailable ? (
          <button
            onClick={handleCheckIn}
            className="w-full py-3 px-5 bg-primary-container text-on-primary-container font-display font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-transform shadow-[0_0_15px_rgba(195,244,0,0.35)] cursor-pointer"
          >
            <Sparkles className="w-4.5 h-4.5 animate-spin" />
            <span>CLAIM DAY {checkedDays.length + 1 > 7 ? 1 : checkedDays.length + 1} DAILY CHECK-IN REWARD</span>
          </button>
        ) : (
          <div className="w-full py-3 px-5 bg-surface-container-high border border-white/5 text-on-surface-variant font-mono text-xs rounded-xl flex items-center justify-center gap-2 opacity-80 select-none">
            <Check className="w-4 h-4 text-primary-container" />
            <span>CHECKED IN FOR TODAY! RETURN IN 16h 55m</span>
          </div>
        )}
      </div>

      {/* Rewards Claim Confirmation Modal */}
      <AnimatePresence>
        {showRewardModal && claimedReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm glass-card border-2 border-primary-container/40 p-6 rounded-3xl relative overflow-hidden text-center flex flex-col gap-5 shadow-[0_0_50px_rgba(195,244,0,0.15)]"
            >
              {/* Particle glow effects */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/10 rounded-full filter blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary-container/10 rounded-full filter blur-2xl pointer-events-none"></div>

              {/* Reward Big Icon */}
              <div className="flex justify-center relative my-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-container/20 to-secondary-container/20 border border-primary-container/40 flex items-center justify-center shadow-[0_0_20px_rgba(195,244,0,0.3)]">
                  {claimedReward.isEpic ? (
                    <Award className="w-10 h-10 text-primary-container animate-bounce" />
                  ) : (
                    <Gift className="w-10 h-10 text-secondary-fixed-dim animate-pulse" />
                  )}
                </div>
                <div className="absolute top-0 right-1/3">
                  <Sparkles className="w-6 h-6 text-primary-container animate-spin" />
                </div>
              </div>

              {/* Reward Header */}
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-primary-container font-black tracking-widest uppercase">DAILY REWARD SECURED</span>
                <h3 className="font-display text-xl font-black text-primary tracking-tight">Day {claimedReward.day} Loot Unlocked!</h3>
              </div>

              {/* Reward Breakdown List */}
              <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5 flex flex-col gap-2.5 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-on-surface-variant">Credits Earned:</span>
                  <span className="font-mono text-sm font-black text-primary-container">+{claimedReward.credits} ZC</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-on-surface-variant">Experience Gained:</span>
                  <span className="font-mono text-sm font-black text-secondary-fixed-dim">+{claimedReward.xp} XP</span>
                </div>

                {claimedReward.moneySavedBonus && (
                  <div className="flex justify-between items-center border-t border-white/5 pt-2">
                    <span className="font-mono text-xs text-on-surface-variant">Vaping Budget Saved:</span>
                    <span className="font-mono text-sm font-black text-on-tertiary-container">+${claimedReward.moneySavedBonus} USD</span>
                  </div>
                )}

                {claimedReward.itemRewardName && (
                  <div className="flex justify-between items-center border-t border-white/5 pt-2">
                    <span className="font-mono text-xs text-on-surface-variant">Special Achievement:</span>
                    <span className="font-mono text-xs font-black text-primary flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-primary-container" />
                      {claimedReward.itemRewardName}
                    </span>
                  </div>
                )}
              </div>

              {/* Motivational message */}
              <p className="text-[11px] text-on-surface-variant italic">
                {claimedReward.isEpic 
                  ? "Incredible work reaching Day 7! Your airway health index has sky-rocketed."
                  : "One more step away from nicotine dependency, and one step closer to your savings goal."}
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  setShowRewardModal(false);
                  playSynthesizerChime(440, 'sine', 0.1);
                }}
                className="w-full py-3 px-5 bg-surface-container-highest border border-white/10 hover:border-primary-container/50 text-primary font-display font-black text-xs rounded-xl cursor-pointer transition-colors"
              >
                DISMISS & SECURE LOOT
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
