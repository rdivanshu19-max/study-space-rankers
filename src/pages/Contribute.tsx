import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Send, BookOpen, DollarSign, Sparkles, QrCode } from "lucide-react";
import upiQrImage from "@/assets/upi-qr-placeholder.png";

const Contribute = () => {
  const [tab, setTab] = useState<"materials" | "money">("materials");

  return (
    <div className="space-y-6 max-w-lg">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold"><span className="gradient-text">Contribute</span></h1>
            <p className="text-muted-foreground text-sm">Help us grow and make education free for all</p>
          </div>
        </div>
      </motion.div>

      {/* Tab selector */}
      <motion.div className="flex gap-2 p-1 bg-muted rounded-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <button
          onClick={() => setTab("materials")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === "materials" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="w-4 h-4" /> Materials
        </button>
        <button
          onClick={() => setTab("money")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === "money" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <DollarSign className="w-4 h-4" /> Donate
        </button>
      </motion.div>

      {tab === "materials" ? (
        <motion.div className="card-elevated p-6 space-y-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="materials">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold">
            <Sparkles className="w-4 h-4 text-primary" /> Contribute Study Materials
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Want to contribute study materials to Rankers Star? We welcome contributions from students and educators!
            If you have books, notes, PYQs, or any study materials that can help fellow students, reach out to us.
          </p>

          <div className="space-y-3 p-4 rounded-xl bg-muted/50">
            <h3 className="font-heading font-semibold text-sm">How to Contribute:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Prepare the material link (Google Drive, Mega, etc.)</li>
              <li>Include material name, type (Books/PYQs/Lectures etc.)</li>
              <li>Contact us via email or Telegram with the details</li>
              <li>Our team will review and add it to the library</li>
            </ol>
          </div>

          <div className="space-y-3">
            <motion.a
              href="mailto:studyspacerankers@gmail.com?subject=Material Contribution"
              className="btn-gold text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 w-full"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" /> Email Us to Contribute
            </motion.a>
            <motion.a
              href="https://t.me/freematerialjeeneet"
              target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl border hover:bg-muted transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" /> Or message on Telegram
            </motion.a>
          </div>
        </motion.div>
      ) : (
        <motion.div className="card-elevated p-6 space-y-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="money">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold">
            <Heart className="w-4 h-4 text-primary" /> Support Us Financially
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Rankers Star is 100% free and always will be. But running the platform costs money — hosting, storage, and more.
            Your donations help us keep the lights on and add more resources for students across India.
          </p>

          {/* UPI QR Code Section */}
          <div className="p-5 rounded-xl bg-muted/50 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm font-heading font-semibold">
              <QrCode className="w-4 h-4 text-primary" /> Pay via UPI
            </div>
            <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden border-2 border-primary/20 bg-card p-2">
              <img src={upiQrImage} alt="UPI QR Code - Scan to donate" className="w-full h-full object-contain" />
            </div>
            <p className="text-xs text-muted-foreground">Scan QR code with any UPI app to donate</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="font-mono text-foreground/80 bg-card px-3 py-1.5 rounded-lg border text-xs">studyspacerankers@upi</span>
            </div>
          </div>

          <div className="space-y-4 p-4 rounded-xl bg-muted/50">
            <p className="text-sm font-heading font-semibold">Every contribution matters!</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Helps maintain servers and storage
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Supports adding more study materials
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Keeps education free for everyone
              </div>
            </div>
          </div>

          <div className="border-t pt-5 space-y-4">
            <p className="text-sm font-heading font-semibold text-center">Or contact us directly:</p>
            <motion.a
              href="mailto:studyspacerankers@gmail.com?subject=Donation Inquiry"
              className="btn-gold text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 w-full"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" /> Email Us to Donate
            </motion.a>
            <motion.a
              href="https://t.me/freematerialjeeneet"
              target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl border hover:bg-muted transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" /> Message on Telegram
            </motion.a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Contribute;
