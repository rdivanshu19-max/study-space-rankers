import { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, Star, Pin, Quote, TrendingUp, ExternalLink } from "lucide-react";
import { getMaterials, getProfile, getVault, MOTIVATIONAL_QUOTES } from "@/lib/store";

const Dashboard = () => {
  const profile = getProfile();
  const materials = getMaterials();
  const vault = getVault();

  const quote = useMemo(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)], []);
  const pinnedMaterials = materials.filter((m) => m.pinned);
  const totalRatings = materials.reduce((acc, m) => acc + m.ratings.length, 0);

  const stats = [
    { label: "Library Materials", value: materials.length, icon: BookOpen, color: "text-primary" },
    { label: "Your Downloads", value: profile.downloads, icon: Download, color: "text-green-500" },
    { label: "Vault Items", value: vault.length, icon: Star, color: "text-blue-500" },
    { label: "Total Ratings", value: totalRatings, icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-heading font-bold">
          Welcome back, <span className="gradient-text">{profile.name}</span>!
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Let's keep the momentum going.</p>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        className="card-elevated p-5 border-l-4 border-primary"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-3">
          <Quote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-foreground/80 italic">{quote}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="card-elevated p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="text-2xl font-heading font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <motion.div
        className="card-elevated p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Your Progress
        </h3>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="h-3 rounded-full bg-primary transition-all"
            style={{ width: `${Math.min((profile.downloads / Math.max(materials.length, 1)) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {profile.downloads} of {materials.length} materials explored
        </p>
      </motion.div>

      {/* Pinned Materials */}
      {pinnedMaterials.length > 0 && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-heading font-semibold flex items-center gap-2">
            <Pin className="w-4 h-4 text-primary" /> Pinned Materials
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {pinnedMaterials.map((m) => (
              <div key={m.id} className="card-elevated p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.types.join(", ")}</p>
                </div>
                <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
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
