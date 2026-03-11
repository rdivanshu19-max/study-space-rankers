import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, Star, Filter, Pin, Bookmark, BookmarkCheck, BookOpen, Sparkles } from "lucide-react";
import { getMaterials, rateMaterial, incrementDownloads, getSettings, isBookmarked, toggleBookmark, MATERIAL_TYPES } from "@/lib/store";

const RankersLibrary = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [materials, setMaterials] = useState(getMaterials());
  const [, setTick] = useState(0);
  const settings = getSettings();

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedType === "All" || m.types.includes(selectedType);
      return matchSearch && matchType;
    });
  }, [materials, search, selectedType]);

  const avgRating = (ratings: number[]) =>
    ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "—";

  const handleRate = (id: string, rating: number) => {
    rateMaterial(id, rating);
    setMaterials(getMaterials());
  };

  const handleOpen = (link: string) => {
    incrementDownloads();
    window.open(link, "_blank");
  };

  const handleBookmark = (id: string) => {
    toggleBookmark(id);
    setTick((t) => t + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">Rankers <span className="gradient-text">Library</span></h1>
            <p className="text-muted-foreground text-sm">Browse free study materials curated for your success</p>
          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-3 h-3" /> {materials.length} Materials
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
          <Pin className="w-3 h-3" /> {materials.filter(m => m.pinned).length} Pinned
        </span>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none text-sm shadow-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-10 pr-10 py-3 rounded-xl border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer shadow-sm"
          >
            <option value="All">All Types</option>
            {MATERIAL_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Type pills */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {["All", ...MATERIAL_TYPES].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
              selectedType === t
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      {/* Materials */}
      {filtered.length === 0 ? (
        <motion.div
          className="card-elevated p-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No materials found</p>
          <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your search or filters</p>
        </motion.div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              className="card-elevated p-5 flex flex-col sm:flex-row sm:items-center gap-4 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {m.pinned && <Pin className="w-3 h-3 text-primary shrink-0" />}
                    <p className="font-semibold text-sm truncate">{m.name}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {m.types.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {settings.ratingEnabled && m.ratingEnabled && (
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRate(m.id, r)}
                        className="text-primary/30 hover:text-primary transition-colors hover:scale-110"
                      >
                        <Star className="w-4 h-4" fill={r <= Math.round(Number(avgRating(m.ratings)) || 0) ? "currentColor" : "none"} />
                      </button>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1.5 font-medium">({avgRating(m.ratings)})</span>
                  </div>
                )}
                <button
                  onClick={() => handleBookmark(m.id)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-primary/50 hover:text-primary hover:bg-primary/10 transition-all"
                  title={isBookmarked(m.id) ? "Remove bookmark" : "Bookmark"}
                >
                  {isBookmarked(m.id) ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <motion.button
                  onClick={() => handleOpen(m.link)}
                  className="btn-gold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open <ExternalLink className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RankersLibrary;
