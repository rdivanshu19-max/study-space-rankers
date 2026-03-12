import { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, Star, Pin, Quote, TrendingUp, ExternalLink, Flame, Timer, Play, Pause, RotateCcw, Bookmark, BarChart3 } from "lucide-react";
import { getProfile, getVault, getBookmarkedMaterials, getStreak, updateStreak, getStudyTimer, saveStudyTimer, addStudyTimeToday, getWeeklyStudyStats, MOTIVATIONAL_QUOTES } from "@/lib/store";
import { fetchMaterials, type Material } from "@/lib/supabase-materials";
import WeeklyChart from "@/components/WeeklyChart";

const Dashboard = () => {
  const profile = getProfile();
  const vault = getVault();
  const bookmarkedMaterials = getBookmarkedMaterials();

  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    fetchMaterials().then(setMaterials);
  }, []);

  const quote = useMemo(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)], []);
  const pinnedMaterials = materials.filter((m) => m.pinned);
  const totalRatings = materials.reduce((acc, m) => acc + m.ratings.length, 0);

  useEffect(() => { updateStreak(); }, []);
  const streak = getStreak();

  const [timerSeconds, setTimerSeconds] = useState(getStudyTimer());
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev + 1;
          saveStudyTimer(next);
          addStudyTimeToday(1);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = useCallback((s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }, []);

  const resetTimer = () => {
    setTimerSeconds(0);
    setTimerRunning(false);
    saveStudyTimer(0);
  };

  const weeklyStats = getWeeklyStudyStats();

  const stats = [
    { label: "Library Materials", value: materials.length, icon: BookOpen, color: "text-primary" },
    { label: "Your Downloads", value: profile.downloads, icon: Download, color: "text-emerald-500" },
    { label: "Vault Items", value: vault.length, icon: Star, color: "text-blue-500" },
    { label: "Total Ratings", value: totalRatings, icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          Welcome back, <span className="gradient-text">{profile.name}</span>!
        </h1>
        <p className="text-muted-foreground mt-1">Let's keep the momentum going.</p>
      </motion.div>

      {/* Streak & Timer Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div className="card-elevated p-5 flex items-center gap-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Flame className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-heading font-bold">{streak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </motion.div>

        <motion.div className="card-elevated p-5 flex items-center gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Timer className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-heading font-bold font-mono">{formatTime(timerSeconds)}</p>
            <p className="text-sm text-muted-foreground">Study Timer</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTimerRunning(!timerRunning)} className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={resetTimer} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Motivational Quote */}
      <motion.div className="card-elevated p-5 border-l-4 border-primary" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-start gap-3">
          <Quote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-foreground/80 italic">{quote}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} className="card-elevated p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-3xl font-heading font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly Study Stats Chart */}
      <motion.div className="card-elevated p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-primary" /> Weekly Study Stats
        </h3>
        <WeeklyChart data={weeklyStats} />
      </motion.div>

      {/* Progress */}
      <motion.div className="card-elevated p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h3 className="font-heading font-semibold mb-3 flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" /> Your Progress
        </h3>
        <div className="w-full bg-muted rounded-full h-3">
          <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${Math.min((profile.downloads / Math.max(materials.length, 1)) * 100, 100)}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{profile.downloads} of {materials.length} materials explored</p>
      </motion.div>

      {/* Bookmarked Materials */}
      {bookmarkedMaterials.length > 0 && (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
          <h3 className="font-heading font-semibold flex items-center gap-2 text-lg">
            <Bookmark className="w-5 h-5 text-primary" /> Bookmarked Materials
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {bookmarkedMaterials.map((m) => (
              <div key={m.id} className="card-elevated p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.types.join(", ")}</p>
                </div>
                <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Pinned Materials */}
      {pinnedMaterials.length > 0 && (
        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <h3 className="font-heading font-semibold flex items-center gap-2 text-lg">
            <Pin className="w-5 h-5 text-primary" /> Pinned Materials
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {pinnedMaterials.map((m) => (
              <div key={m.id} className="card-elevated p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.types.join(", ")}</p>
                </div>
                <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
