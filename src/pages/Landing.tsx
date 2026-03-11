import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, BookOpen, GraduationCap, Users, Target, ArrowRight, Send, Mail, Library } from "lucide-react";
import logo from "@/assets/rankers-star-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, hsl(48 96% 53% / 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(48 96% 53% / 0.1) 0%, transparent 50%)" }} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.img
            src={logo}
            alt="Rankers Star Logo"
            className="w-28 h-28 mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          />
          <motion.h1
            className="text-5xl md:text-7xl font-heading font-bold mb-4 text-secondary-foreground tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Rankers <span className="gradient-text">Star</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Free Study Resources for <strong>JEE</strong> & <strong>NEET</strong> Aspirants.
            Books, lectures, PDFs, PYQs — everything you need to crack your exams.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => navigate("/enter")}
              className="btn-gold text-lg px-10 py-4 rounded-xl inline-flex items-center justify-center gap-2 animate-pulse-gold"
            >
              Start Studying <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary text-lg px-10 py-4 rounded-xl inline-flex items-center justify-center gap-2"
            >
              <Library className="w-5 h-5" /> Explore Materials
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold text-center mb-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            Everything You Need to <span className="gradient-text">Excel</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-center mb-14 max-w-xl mx-auto text-base"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            We curate and provide the best study resources so you can focus on what matters — learning.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Free Books & PDFs", desc: "Access high-quality textbooks, lecture notes, and study guides at zero cost." },
              { icon: GraduationCap, title: "JEE & NEET Ready", desc: "Materials specifically curated for JEE, NEET, and Board exam preparation." },
              { icon: Star, title: "Community Rated", desc: "Materials are rated by students so you can find the best resources quickly." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="card-elevated p-8 text-center"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <f.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold mb-6 text-secondary-foreground"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            About <span className="gradient-text">Us</span>
          </motion.h2>
          <motion.p
            className="text-secondary-foreground/80 text-lg leading-relaxed mb-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            Rankers Star was born from a simple belief: quality education should be accessible to everyone.
            We are a passionate team of students and educators who understand the financial burden of expensive study materials.
            Our mission is to bridge the gap by providing free, high-quality resources for JEE, NEET, and Board examinations.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2 text-primary"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold text-secondary-foreground">Built by students, for students</span>
          </motion.div>
        </div>
      </section>

      {/* Our Goal */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold mb-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            Our <span className="gradient-text">Goal</span>
          </motion.h2>
          <motion.div
            className="card-elevated p-10"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            <Target className="w-14 h-14 text-primary mx-auto mb-5" />
            <p className="text-foreground/80 text-lg leading-relaxed">
              To become India's most trusted free study platform where every aspiring student — regardless of their financial background —
              can access world-class study materials. We aim to build a community-driven library that covers every topic,
              every subject, and every exam. Together, we rise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-heading font-bold mb-4 text-secondary-foreground"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            Join Our <span className="gradient-text">Community</span>
          </motion.h2>
          <motion.p
            className="text-secondary-foreground/70 mb-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            All announcements, requests, and discussions happen on our Telegram channel. Join now to stay updated!
          </motion.p>
          <motion.a
            href="https://t.me/freematerialjeeneet"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
          >
            <Send className="w-5 h-5" /> Join Telegram Channel
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 px-4" style={{ background: "var(--gradient-navy)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src={logo} alt="Rankers Star" className="w-8 h-8" />
                <span className="font-heading font-bold text-lg text-secondary-foreground">Rankers Star</span>
              </div>
              <p className="text-secondary-foreground/60 text-sm">
                Free study materials for JEE, NEET & Board exams.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-secondary-foreground mb-3">Links</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/60">
                <li>
                  <a href="https://t.me/freematerialjeeneet" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                    <Send className="w-3 h-3" /> Telegram Channel
                  </a>
                </li>
                <li>
                  <a href="mailto:studyspacerankers@gmail.com" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                    <Mail className="w-3 h-3" /> studyspacerankers@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-secondary-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/60">
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/adsense-disclaimer" className="hover:text-primary transition-colors">AdSense Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/10 pt-6 text-center text-sm text-secondary-foreground/40">
            © {new Date().getFullYear()} Rankers Star. All rights reserved. Education should be free.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
