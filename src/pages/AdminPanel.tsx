import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Pin, Star, Shield, Eye, EyeOff } from "lucide-react";
import {
  fetchMaterials, addMaterialDB, deleteMaterialDB, togglePinDB,
  toggleMaterialRatingDB, fetchSettings, toggleGlobalRatingDB,
  type Material, type AppSettings,
} from "@/lib/supabase-materials";
import { getProfile, MATERIAL_TYPES } from "@/lib/store";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const profile = getProfile();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [settings, setSettings] = useState<AppSettings>({ ratingEnabled: true });
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [ratingEnabled, setRatingEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [mats, sets] = await Promise.all([fetchMaterials(), fetchSettings()]);
    setMaterials(mats);
    setSettings(sets);
    setLoading(false);
  };

  if (!profile.isAdmin) {
    return (
      <div className="card-elevated p-12 text-center">
        <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">You need admin access. Go to Profile to unlock.</p>
        <button onClick={() => navigate("/app/profile")} className="btn-gold text-sm px-4 py-2 rounded-lg mt-4">
          Go to Profile
        </button>
      </div>
    );
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !link.trim() || selectedTypes.length === 0) return;
    await addMaterialDB({ name: name.trim(), link: link.trim(), types: selectedTypes, pinned: false, ratingEnabled });
    setName("");
    setLink("");
    setSelectedTypes([]);
    setRatingEnabled(true);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deleteMaterialDB(id);
    await loadData();
  };

  const handleTogglePin = async (m: Material) => {
    await togglePinDB(m.id, m.pinned);
    await loadData();
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleToggleGlobalRating = async () => {
    await toggleGlobalRatingDB(settings.ratingEnabled);
    setSettings((s) => ({ ...s, ratingEnabled: !s.ratingEnabled }));
  };

  const handleToggleMaterialRating = async (m: Material) => {
    await toggleMaterialRatingDB(m.id, m.ratingEnabled);
    await loadData();
  };

  if (loading) {
    return <div className="card-elevated p-12 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-heading font-bold">Admin <span className="gradient-text">Panel</span></h1>
      </div>

      {/* Global Settings */}
      <div className="card-elevated p-4 flex items-center justify-between">
        <span className="text-sm font-medium">Global Rating System</span>
        <button onClick={handleToggleGlobalRating} className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-colors ${settings.ratingEnabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
          {settings.ratingEnabled ? <><Eye className="w-4 h-4" /> Enabled</> : <><EyeOff className="w-4 h-4" /> Disabled</>}
        </button>
      </div>

      {/* Add Material */}
      <motion.form onSubmit={handleAdd} className="card-elevated p-5 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className="font-heading font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Upload Material
        </h3>
        <input
          type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Material name" maxLength={100}
          className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="url" value={link} onChange={(e) => setLink(e.target.value)}
          placeholder="Material link (URL)"
          className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <div>
          <p className="text-xs text-muted-foreground mb-2">Select type(s):</p>
          <div className="flex flex-wrap gap-2">
            {MATERIAL_TYPES.map((t) => (
              <button
                key={t} type="button" onClick={() => toggleType(t)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  selectedTypes.includes(t) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={ratingEnabled} onChange={(e) => setRatingEnabled(e.target.checked)} className="accent-primary" />
          Enable rating for this material
        </label>
        <button type="submit" disabled={!name.trim() || !link.trim() || selectedTypes.length === 0} className="btn-gold text-sm px-4 py-2 rounded-lg disabled:opacity-50">
          Upload Material
        </button>
      </motion.form>

      {/* Material List */}
      <div className="space-y-2">
        <h3 className="font-heading font-semibold">All Materials ({materials.length})</h3>
        {materials.map((m) => (
          <div key={m.id} className="card-elevated p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.types.join(", ")}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => handleToggleMaterialRating(m)} className={`p-1.5 rounded ${m.ratingEnabled ? "text-primary" : "text-muted-foreground"}`} title="Toggle rating">
                <Star className="w-4 h-4" />
              </button>
              <button onClick={() => handleTogglePin(m)} className={`p-1.5 rounded ${m.pinned ? "text-primary" : "text-muted-foreground"}`} title="Toggle pin">
                <Pin className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded text-destructive" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
