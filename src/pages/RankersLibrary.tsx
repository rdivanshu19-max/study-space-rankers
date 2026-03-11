import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, Star, Filter, Pin, Bookmark, BookmarkCheck } from "lucide-react";
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
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Rankers <span className="gradient-text">Library</span></h1>
        <p className="text-muted-foreground mt-1">Browse free study materials</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none text-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="All">All Types</option>
            {MATERIAL_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials */}
      {filtered.length === 0 ? (
        <div className="card-elevated p-12 text-center">
          <p className="text-muted-foreground">No materials found.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              className="card-elevated p-4 flex flex-col sm:flex-row sm:items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {m.pinned && <Pin className="w-3 h-3 text-primary shrink-0" />}
                  <p className="font-medium text-sm truncate">{m.name}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {m.types.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {settings.ratingEnabled && m.ratingEnabled && (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRate(m.id, r)}
                        className="text-primary/30 hover:text-primary transition-colors"
                      >
                        <Star className="w-4 h-4" fill={r <= Math.round(Number(avgRating(m.ratings)) || 0) ? "currentColor" : "none"} />
                      </button>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({avgRating(m.ratings)})</span>
                  </div>
                )}
                <button
                  onClick={() => handleBookmark(m.id)}
                  className="text-primary/50 hover:text-primary transition-colors"
                  title={isBookmarked(m.id) ? "Remove bookmark" : "Bookmark"}
                >
                  {isBookmarked(m.id) ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleOpen(m.link)}
                  className="btn-gold text-xs px-3 py-1.5 rounded-md flex items-center gap-1"
                >
                  Open <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RankersLibrary;
