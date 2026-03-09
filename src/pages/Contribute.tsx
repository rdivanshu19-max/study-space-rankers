import { motion } from "framer-motion";
import { Heart, Mail, Send } from "lucide-react";

const Contribute = () => (
  <div className="space-y-6 max-w-lg">
    <div>
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
        <Heart className="w-6 h-6 text-primary" /> <span className="gradient-text">Contribute</span>
      </h1>
      <p className="text-muted-foreground text-sm mt-1">Help us grow the library</p>
    </div>

    <motion.div className="card-elevated p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-foreground/80 text-sm leading-relaxed">
        Want to contribute study materials to Rankers Star? We welcome contributions from students and educators!
        If you have books, notes, PYQs, or any study materials that can help fellow students, reach out to us.
      </p>

      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-sm">How to Contribute:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Prepare the material link (Google Drive, Mega, etc.)</li>
          <li>Contact us via email with the material details</li>
          <li>Our team will review and add it to the library</li>
        </ol>
      </div>

      <div className="border-t pt-4 space-y-3">
        <a
          href="mailto:studyspacerankers@gmail.com?subject=Material Contribution"
          className="btn-gold text-sm px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 w-full"
        >
          <Mail className="w-4 h-4" /> Email Us to Contribute
        </a>
        <a
          href="https://t.me/freematerialjeeneet"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-lg border hover:bg-muted transition-colors"
        >
          <Send className="w-4 h-4" /> Or message on Telegram
        </a>
      </div>
    </motion.div>
  </div>
);

export default Contribute;
