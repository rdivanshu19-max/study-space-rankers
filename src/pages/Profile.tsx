import { useState } from "react";
import { motion } from "framer-motion";
import { User, Save, Shield, Check, X, Download, BookOpen, Flame, Edit3, Camera } from "lucide-react";
import { getProfile, saveProfile, getMaterials, getVault, getStreak } from "@/lib/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(getProfile());
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [saved, setSaved] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const navigate = useNavigate();

  const materials = getMaterials();
  const vault = getVault();
  const streak = getStreak();

  const handleSave = () => {
    const updated = { ...profile, name: name.trim(), bio: bio.trim() };
    saveProfile(updated);
    setProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAdminAccess = () => {
    if (adminPassword === "2009") {
      const updated = { ...profile, name: name.trim(), bio: bio.trim(), isAdmin: true };
      saveProfile(updated);
      setProfile(updated);
      setShowAdminPrompt(false);
      setAdminPassword("");
      navigate("/app/admin");
    } else {
      setAdminError("Incorrect password");
      setTimeout(() => setAdminError(""), 2000);
    }
  };

  const profileStats = [
    { icon: Download, label: "Downloads", value: profile.downloads, color: "text-emerald-500" },
    { icon: BookOpen, label: "Materials", value: materials.length, color: "text-blue-500" },
    { icon: Flame, label: "Streak", value: `${streak} days`, color: "text-primary" },
  ];

  return (
    <div className="space-y-6 max-w-lg">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold">Your <span className="gradient-text">Profile</span></h1>
        <p className="text-muted-foreground text-sm mt-1">Personalize your experience</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        className="card-elevated p-8 space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary/10 to-primary/5" />

        <div className="relative flex flex-col items-center pt-4">
          <motion.div
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-card shadow-lg relative"
            whileHover={{ scale: 1.05 }}
          >
            <User className="w-12 h-12 text-primary" />
          </motion.div>
          <h2 className="text-xl font-heading font-bold mt-4">{profile.name || "Student"}</h2>
          <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary mt-2">
            {profile.isAdmin ? "✨ Admin" : "📚 Student"}
          </span>
          {profile.bio && (
            <p className="text-muted-foreground text-sm text-center mt-3 italic">"{profile.bio}"</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {profileStats.map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/50">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-heading font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5 flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-muted-foreground" /> Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={200}
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
            />
            <p className="text-[10px] text-muted-foreground text-right mt-1">{bio.length}/200</p>
          </div>
          <motion.button
            onClick={handleSave}
            className="btn-gold text-sm px-4 py-3 rounded-xl flex items-center gap-2 w-full justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Profile</>}
          </motion.button>
        </div>
      </motion.div>

      {/* Admin Access */}
      <motion.div
        className="card-elevated p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {!profile.isAdmin ? (
          <>
            {!showAdminPrompt ? (
              <motion.button
                onClick={() => setShowAdminPrompt(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2 rounded-xl hover:bg-muted/50"
                whileHover={{ scale: 1.01 }}
              >
                <Shield className="w-4 h-4" /> Access Admin Panel
              </motion.button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-heading font-semibold text-center">Enter admin password</p>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleAdminAccess()}
                />
                {adminError && <p className="text-xs text-destructive text-center">{adminError}</p>}
                <div className="flex gap-2">
                  <motion.button onClick={handleAdminAccess} className="btn-gold text-sm px-4 py-2.5 rounded-xl flex-1" whileTap={{ scale: 0.98 }}>
                    Submit
                  </motion.button>
                  <button onClick={() => { setShowAdminPrompt(false); setAdminPassword(""); }} className="text-sm px-4 py-2.5 rounded-xl border flex-1 hover:bg-muted transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <motion.button
            onClick={() => navigate("/app/admin")}
            className="w-full flex items-center justify-center gap-2 text-sm text-primary font-semibold py-3 rounded-xl hover:bg-primary/5 transition-colors"
            whileHover={{ scale: 1.01 }}
          >
            <Shield className="w-4 h-4" /> Go to Admin Panel
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
