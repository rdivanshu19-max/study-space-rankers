import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { getProfile, saveProfile } from "@/lib/store";
import logo from "@/assets/rankers-star-logo.png";

const EnterName = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const profile = getProfile();
    profile.name = name.trim();
    saveProfile(profile);
    navigate("/app");
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <motion.div
        className="card-elevated p-8 w-full max-w-md text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} alt="Rankers Star" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-heading font-bold mb-2">Welcome to Rankers Star</h1>
        <p className="text-muted-foreground text-sm mb-6">What should we call you?</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            maxLength={30}
            className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star className="w-4 h-4" /> Enter App <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EnterName;
