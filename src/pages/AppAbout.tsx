import { motion } from "framer-motion";
import { Star, Users, Target, Send, Mail } from "lucide-react";
import logo from "@/assets/rankers-star-logo.png";

const AppAbout = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl font-heading font-bold">About <span className="gradient-text">Rankers Star</span></h1>
    </div>
    <motion.div className="card-elevated p-6 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <img src={logo} alt="Rankers Star" className="w-20 h-20 mx-auto mb-4" />
      <h2 className="text-xl font-heading font-bold mb-2">Rankers Star</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Rankers Star is a community-driven platform that provides free study materials for JEE, NEET, and Board exam aspirants.
        We believe that quality education should be accessible to every student regardless of their financial background.
      </p>
    </motion.div>

    <motion.div className="card-elevated p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      <h3 className="font-heading font-semibold flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-primary" /> Our Mission
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        To become the most trusted free study resource platform in India, empowering students with curated books,
        lectures, PDFs, PYQs, and practice tests — all at zero cost.
      </p>
    </motion.div>

    <motion.div className="card-elevated p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <h3 className="font-heading font-semibold flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-primary" /> Connect With Us
      </h3>
      <div className="space-y-2 text-sm">
        <a href="mailto:studyspacerankers@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Mail className="w-4 h-4" /> studyspacerankers@gmail.com
        </a>
        <a href="https://t.me/freematerialjeeneet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Send className="w-4 h-4" /> Telegram Channel
        </a>
      </div>
    </motion.div>
  </div>
);

export default AppAbout;
