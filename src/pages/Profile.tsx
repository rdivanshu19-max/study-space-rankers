import { useState } from "react";
import { motion } from "framer-motion";
import { User, Save, Shield, Check, X } from "lucide-react";
import { getProfile, saveProfile } from "@/lib/store";
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

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-heading font-bold">Your <span className="gradient-text">Profile</span></h1>
        <p className="text-muted-foreground text-sm mt-1">Personalize your experience</p>
      </div>

      <motion.div className="card-elevated p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
            rows={3}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Downloads: {profile.downloads}</p>
          <p>Role: {profile.isAdmin ? "Admin ✨" : "Student"}</p>
        </div>
        <button onClick={handleSave} className="btn-gold text-sm px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center">
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Profile</>}
        </button>
      </motion.div>

      {/* Admin Access */}
      <motion.div className="card-elevated p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {!profile.isAdmin ? (
          <>
            {!showAdminPrompt ? (
              <button
                onClick={() => setShowAdminPrompt(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <Shield className="w-4 h-4" /> Access Admin Panel
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium text-center">Enter admin password</p>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleAdminAccess()}
                />
                {adminError && <p className="text-xs text-destructive text-center">{adminError}</p>}
                <div className="flex gap-2">
                  <button onClick={handleAdminAccess} className="btn-gold text-sm px-4 py-2 rounded-lg flex-1">
                    Submit
                  </button>
                  <button onClick={() => { setShowAdminPrompt(false); setAdminPassword(""); }} className="text-sm px-4 py-2 rounded-lg border flex-1">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/app/admin")}
            className="w-full flex items-center justify-center gap-2 text-sm text-primary font-semibold py-2"
          >
            <Shield className="w-4 h-4" /> Go to Admin Panel
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
