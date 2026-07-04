import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Activity, TrendingDown, TrendingUp, Info, 
  ChevronRight, Calendar, Plus, RefreshCw, CheckCircle2 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

interface BiometricHealthProps {
  streakDays: number;
  playSynthesizerChime: (freq: number, type?: 'sine' | 'triangle' | 'sawtooth', dur?: number) => void;
  triggerToast: (msg: string) => void;
}

type MetricType = 'heartRate' | 'bloodPressure' | 'oxygen';

interface DataPoint {
  day: string;
  heartRate: number;
  bloodPressure: number;
  oxygen: number;
}

export default function BiometricHealth({
  streakDays,
  playSynthesizerChime,
  triggerToast
}: BiometricHealthProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('heartRate');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly'>('daily');
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [userLoggedToday, setUserLoggedToday] = useState(false);
  const [customHeartRate, setCustomHeartRate] = useState<string>('68');
  const [customSysBP, setCustomSysBP] = useState<string>('120');
  const [customO2, setCustomO2] = useState<string>('98');
  const [showLogModal, setShowLogModal] = useState(false);

  // Generate trend data based on streakDays
  useEffect(() => {
    // Generate simulated realistic recovery trend based on clean streak
    const days = timeframe === 'daily' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
      : ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'];
    
    // As streak increase, heart rate goes down, blood pressure goes down, oxygen goes up
    const baseData = days.map((day, idx) => {
      const progressFactor = idx / (days.length - 1); // 0 to 1
      
      // Calculate realistic biometrics settling down as time passes
      // Heart Rate: from high stress (~78 BPM) down to relaxed/clean (~62 BPM)
      const hrValue = Math.round(78 - (progressFactor * 14) + (Math.sin(idx) * 1.5));
      
      // Blood Pressure: from borderline hypertensive systolic (~136 mmHg) to optimal (~118 mmHg)
      const bpValue = Math.round(135 - (progressFactor * 16) + (Math.cos(idx) * 1.2));
      
      // Oxygen Saturation: from compromised smokers level (~94.5%) to standard lung level (~99%)
      const o2Value = Number((94.5 + (progressFactor * 4.2) + (Math.sin(idx * 2) * 0.2)).toFixed(1));
      
      return {
        day,
        heartRate: hrValue,
        bloodPressure: bpValue,
        oxygen: o2Value
      };
    });

    // Check if user has already logged a reading in local storage
    const todayStr = new Date().toISOString().split('T')[0];
    const loggedToday = localStorage.getItem(`vapezero_biometric_logged_${todayStr}`);
    if (loggedToday) {
      setUserLoggedToday(true);
      const parsed = JSON.parse(loggedToday);
      // Append or replace the last point (today) with user's reading
      const lastIndex = baseData.length - 1;
      baseData[lastIndex] = {
        ...baseData[lastIndex],
        heartRate: parsed.heartRate,
        bloodPressure: parsed.bloodPressure,
        oxygen: parsed.oxygen
      };
    }

    setChartData(baseData);
  }, [streakDays, timeframe, userLoggedToday]);

  const handleLogBiometrics = (e: React.FormEvent) => {
    e.preventDefault();
    const hr = parseInt(customHeartRate);
    const bp = parseInt(customSysBP);
    const o2 = parseFloat(customO2);

    if (isNaN(hr) || hr < 40 || hr > 180) {
      triggerToast("Please enter a valid heart rate (40 - 180 BPM).");
      return;
    }
    if (isNaN(bp) || bp < 80 || bp > 200) {
      triggerToast("Please enter a valid systolic blood pressure (80 - 200 mmHg).");
      return;
    }
    if (isNaN(o2) || o2 < 80 || o2 > 100) {
      triggerToast("Please enter a valid oxygen level (80% - 100%).");
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(`vapezero_biometric_logged_${todayStr}`, JSON.stringify({
      heartRate: hr,
      bloodPressure: bp,
      oxygen: o2
    }));

    setUserLoggedToday(true);
    setShowLogModal(false);
    playSynthesizerChime(659.25, 'sine', 0.25);
    triggerToast("Biometrics logged! Trend chart updated with active metrics.");
  };

  // Metric-specific config details
  const metricConfig = {
    heartRate: {
      title: "Resting Heart Rate",
      subtitle: "BPM Stabilization",
      icon: <Heart className="w-4 h-4 text-secondary-fixed-dim" />,
      color: "var(--color-secondary-container, #00eefc)",
      yDomain: [55, 85] as [number, number],
      unit: " BPM",
      desc: "Nicotine causes immediate cardiac stress. Within days of quitting, resting heart rate normalizes back to stable levels.",
      statText: `${chartData[chartData.length - 1]?.heartRate || 64} BPM`,
      trendIcon: <TrendingDown className="w-3.5 h-3.5 text-primary-container" />,
      trendText: "-14 BPM recovery"
    },
    bloodPressure: {
      title: "Systolic Blood Pressure",
      subtitle: "Cardiovascular Pressure mmHg",
      icon: <Activity className="w-4 h-4 text-primary-container" />,
      color: "var(--color-primary-container, #c3f400)",
      yDomain: [110, 140] as [number, number],
      unit: " mmHg",
      desc: "Vaping raises adrenaline levels and blood pressure. Continuous clean days remove pressure from arterial walls.",
      statText: `${chartData[chartData.length - 1]?.bloodPressure || 118} mmHg`,
      trendIcon: <TrendingDown className="w-3.5 h-3.5 text-primary-container" />,
      trendText: "-16 mmHg decrease"
    },
    oxygen: {
      title: "Oxygen Saturation",
      subtitle: "Arterial O2 Percentage",
      icon: <TrendingUp className="w-4 h-4 text-on-tertiary-container" />,
      color: "var(--color-tertiary-fixed, #ffb3ff)",
      yDomain: [92, 100] as [number, number],
      unit: "%",
      desc: "Eliminating carbon monoxide and aerosol toxicity allows red blood cells to carry optimal oxygen payload.",
      statText: `${chartData[chartData.length - 1]?.oxygen || 98.8}%`,
      trendIcon: <TrendingUp className="w-3.5 h-3.5 text-primary-container" />,
      trendText: "+4.3% oxygen boost"
    }
  };

  const currentConfig = metricConfig[selectedMetric];

  // Custom Tooltip component for Recharts styled as a retro Cyber HUD tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-container-highest/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl flex flex-col gap-1 min-w-[120px]">
          <p className="font-mono text-[9px] text-on-surface-variant font-bold tracking-widest">{payload[0].payload.day}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ backgroundColor: currentConfig.color }}
            ></span>
            <span className="font-display text-sm font-black text-primary">
              {payload[0].value}{currentConfig.unit}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="glass-card p-5 rounded-3xl border border-white/5 flex flex-col gap-5 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary-container/5 rounded-full filter blur-2xl pointer-events-none"></div>

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary-fixed-dim border border-secondary-container/30">
            <Activity className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-secondary-fixed-dim font-black tracking-widest uppercase">BIOMETRIC LOGS</span>
            <h3 className="font-display text-sm font-black text-primary tracking-tight">Biometric Health Trends</h3>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex bg-surface-container-low p-1 rounded-xl border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => { setTimeframe('daily'); playSynthesizerChime(523, 'sine', 0.08); }}
            className={`px-3 py-1 font-mono text-[9px] font-black tracking-wider uppercase rounded-lg transition-colors ${
              timeframe === 'daily' 
                ? 'bg-secondary-container text-on-secondary-container' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            DAILY TRENDS
          </button>
          <button
            onClick={() => { setTimeframe('weekly'); playSynthesizerChime(587, 'sine', 0.08); }}
            className={`px-3 py-1 font-mono text-[9px] font-black tracking-wider uppercase rounded-lg transition-colors ${
              timeframe === 'weekly' 
                ? 'bg-secondary-container text-on-secondary-container' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            6-WEEK STATS
          </button>
        </div>
      </div>

      {/* Metric selection Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(metricConfig) as MetricType[]).map((metricKey) => {
          const cfg = metricConfig[metricKey];
          const isActive = selectedMetric === metricKey;
          return (
            <button
              key={metricKey}
              onClick={() => {
                setSelectedMetric(metricKey);
                playSynthesizerChime(isActive ? 587 : 440, 'triangle', 0.08);
              }}
              className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all relative overflow-hidden ${
                isActive 
                  ? 'bg-surface-container border-secondary-container/40 shadow-inner' 
                  : 'bg-surface-container-low border-white/5 hover:border-white/10'
              }`}
            >
              {isActive && (
                <div className="absolute right-0 top-0 w-8 h-8 bg-gradient-to-bl from-secondary-container/10 to-transparent rounded-bl-xl pointer-events-none"></div>
              )}
              <div className="flex items-center justify-between">
                <span className="opacity-80">{cfg.icon}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></div>}
              </div>
              <span className="font-mono text-[8px] font-bold text-on-surface-variant tracking-wide mt-1 block truncate">
                {cfg.title.toUpperCase()}
              </span>
              <span className="font-display text-sm font-black text-primary tracking-tight">
                {cfg.statText}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recharts Graphical Display */}
      <div className="h-44 w-full bg-surface-container-low rounded-2xl border border-white/5 p-3.5 relative">
        <div className="absolute top-2 left-3 flex items-center gap-1.5 z-10">
          <span className="font-mono text-[8px] text-on-surface-variant uppercase font-bold tracking-widest flex items-center gap-1">
            {currentConfig.trendIcon}
            {currentConfig.trendText}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 25, right: 8, left: -22, bottom: -5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255, 255, 255, 0.03)" 
              vertical={false} 
            />
            <XAxis 
              dataKey="day" 
              stroke="rgba(255, 255, 255, 0.3)" 
              fontSize={9}
              fontFamily="monospace"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={currentConfig.yDomain} 
              stroke="rgba(255, 255, 255, 0.3)" 
              fontSize={9}
              fontFamily="monospace"
              tickLine={false}
              axisLine={false}
              tickCount={4}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }} />
            <Line 
              type="monotone" 
              dataKey={selectedMetric} 
              stroke={currentConfig.color} 
              strokeWidth={2}
              dot={{ r: 3, stroke: currentConfig.color, strokeWidth: 1, fill: '#0a0a0b' }}
              activeDot={{ r: 5, strokeWidth: 2, fill: currentConfig.color }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Info context block & Action Trigger */}
      <div className="flex flex-col gap-3">
        <div className="bg-surface-container p-3 rounded-2xl border border-white/5 flex gap-2.5 items-start">
          <Info className="w-4 h-4 text-secondary-fixed-dim mt-0.5 shrink-0" />
          <p className="text-[10px] text-on-surface-variant leading-relaxed">
            {currentConfig.desc}
          </p>
        </div>

        {/* Action Button to log reading */}
        {!userLoggedToday ? (
          <button
            onClick={() => {
              setShowLogModal(true);
              playSynthesizerChime(523.25, 'sine', 0.1);
            }}
            className="py-2.5 px-4 bg-surface-container-high hover:bg-surface-container-highest border border-white/10 hover:border-secondary-container/40 text-primary font-mono text-[10px] font-black uppercase rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
          >
            <Plus className="w-3.5 h-3.5 text-secondary-fixed-dim" />
            <span>Log Today's Biometric Reading</span>
          </button>
        ) : (
          <div className="py-2.5 px-4 bg-surface-container border border-white/5 text-primary-container font-mono text-[10px] font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 select-none">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Today's Reading Logged</span>
          </div>
        )}
      </div>

      {/* Simple Log Modal overlay */}
      <AnimatePresence>
        {showLogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm glass-card border border-white/10 p-5 rounded-3xl relative flex flex-col gap-4 text-center"
            >
              <div>
                <h4 className="font-display text-sm font-black text-primary tracking-tight">Log Today's Biometrics</h4>
                <p className="text-[10px] text-on-surface-variant font-mono uppercase mt-0.5">UPDATE YOUR ACTIVE HUD METRICS</p>
              </div>

              <form onSubmit={handleLogBiometrics} className="flex flex-col gap-3 text-left">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] text-on-surface-variant font-bold uppercase">Heart Rate (BPM)</label>
                  <input
                    type="number"
                    value={customHeartRate}
                    onChange={(e) => setCustomHeartRate(e.target.value)}
                    placeholder="e.g. 65"
                    className="bg-surface-container-low border border-white/10 rounded-xl px-3 py-2 text-primary font-mono text-xs focus:border-secondary-container/50 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] text-on-surface-variant font-bold uppercase">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    value={customSysBP}
                    onChange={(e) => setCustomSysBP(e.target.value)}
                    placeholder="e.g. 118"
                    className="bg-surface-container-low border border-white/10 rounded-xl px-3 py-2 text-primary font-mono text-xs focus:border-secondary-container/50 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] text-on-surface-variant font-bold uppercase">Oxygen Saturation (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={customO2}
                    onChange={(e) => setCustomO2(e.target.value)}
                    placeholder="e.g. 98.5"
                    className="bg-surface-container-low border border-white/10 rounded-xl px-3 py-2 text-primary font-mono text-xs focus:border-secondary-container/50 outline-none"
                  />
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="flex-1 py-2 px-3 bg-surface-container-high hover:bg-surface-container-highest font-mono text-[10px] font-bold rounded-xl text-on-surface-variant"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 bg-secondary-container text-on-secondary-container font-mono text-[10px] font-black rounded-xl cursor-pointer"
                  >
                    LOG VALUES
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
