import { motion } from "framer-motion";
import { MonitorSpeaker, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdSenseDisclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
              <MonitorSpeaker className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary-foreground">AdSense <span className="gradient-text">Disclaimer</span></h1>
              <p className="text-secondary-foreground/50 text-sm mt-1">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <motion.div className="card-elevated p-6 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-foreground/80 text-sm leading-relaxed">Rankers Star may display advertisements through Google AdSense to help sustain our free service.</p>
          </motion.div>

          {[
            { title: "About Ads", text: "Google AdSense uses cookies to serve ads based on your interests. You can opt out of personalized advertising by visiting Google's Ads Settings." },
            { title: "Revenue Usage", text: "Any revenue generated through advertisements goes directly towards maintaining the platform and expanding our free material library." },
            { title: "Disclaimer", text: "We do not endorse or guarantee the products/services advertised. Users should exercise their own judgment." },
            { title: "Contact", text: "" },
          ].map((section, i) => (
            <motion.div key={section.title} className="card-elevated p-6 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
              <h3 className="font-heading font-semibold text-lg text-foreground">{section.title}</h3>
              {section.text ? (
                <p className="text-foreground/70 text-sm leading-relaxed">{section.text}</p>
              ) : (
                <p className="text-foreground/70 text-sm">For ad-related concerns: <a href="mailto:studyspacerankers@gmail.com" className="text-primary hover:underline font-medium">studyspacerankers@gmail.com</a></p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AdSenseDisclaimer;
