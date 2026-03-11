import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, BookOpen, GraduationCap, Users, Target, ArrowRight, Send, Mail, Library, Sparkles, Trophy, Clock, Shield, Heart, Zap, CheckCircle2 } from "lucide-react";
import logo from "@/assets/rankers-star-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Landing = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const stats = [
    { label: "Study Materials", value: "500+", icon: BookOpen },
    { label: "Active Students", value: "10K+", icon: Users },
    { label: "Hours of Content", value: "1000+", icon: Clock },
    { label: "Success Rate", value: "95%", icon: Trophy },
  ];

  const features = [
    { icon: BookOpen, title: "Free Books & PDFs", desc: "Access high-quality textbooks, lecture notes, and study guides at zero cost. Updated regularly with the latest editions.", color: "from-blue-500/20 to-blue-600/10" },
    { icon: GraduationCap, title: "JEE & NEET Ready", desc: "Materials specifically curated for JEE, NEET, and Board exam preparation by top educators and rankers.", color: "from-emerald-500/20 to-emerald-600/10" },
    { icon: Star, title: "Community Rated", desc: "Materials are rated by students so you can find the best resources quickly. Only the best survive.", color: "from-amber-500/20 to-amber-600/10" },
    { icon: Zap, title: "Study Timer & Streaks", desc: "Track your daily study time, maintain streaks, and build consistent habits that lead to success.", color: "from-purple-500/20 to-purple-600/10" },
    { icon: Shield, title: "Personal Study Vault", desc: "Save your own study materials privately. Your personal collection, accessible anytime, anywhere.", color: "from-rose-500/20 to-rose-600/10" },
    { icon: Heart, title: "100% Free Forever", desc: "No hidden charges, no premium tiers. Every resource is free because education is a right, not a privilege.", color: "from-cyan-500/20 to-cyan-600/10" },
  ];

  const testimonials = [
    { name: "Rahul S.", exam: "JEE Advanced 2025", text: "Rankers Star gave me access to materials I couldn't afford. Forever grateful!" },
    { name: "Priya M.", exam: "NEET 2025", text: "The PYQ collection here is unmatched. It helped me understand the exam pattern completely." },
    { name: "Arjun K.", exam: "Board Exams", text: "Study timer and streaks kept me consistent. Best study companion app!" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          {/* Gradient orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: "hsl(48 96% 53%)", top: "10%", right: "10%" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-10"
            style={{ background: "hsl(48 96% 53%)", bottom: "20%", left: "5%" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2, duration: 0.8 }}
            className="relative inline-block mb-8"
          >
            <img src={logo} alt="Rankers Star Logo" className="w-32 h-32 mx-auto" />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 40px 10px hsl(48 96% 53% / 0.2)" }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
              <Sparkles className="w-4 h-4" /> India's #1 Free Study Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 text-secondary-foreground tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Rankers{" "}
            <motion.span
              className="gradient-text inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Star
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-secondary-foreground/80 mb-4 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Free Study Resources for <strong className="text-primary">JEE</strong> & <strong className="text-primary">NEET</strong> Aspirants
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-secondary-foreground/60 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Books, lectures, PDFs, PYQs, practice tests — everything you need to crack your exams. 100% free, forever.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => navigate("/enter")}
              className="btn-gold text-lg px-12 py-5 rounded-2xl inline-flex items-center justify-center gap-3 relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px -4px hsl(48 96% 53% / 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Studying
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.button>
            <motion.button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary text-lg px-12 py-5 rounded-2xl inline-flex items-center justify-center gap-3 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Library className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Explore Materials
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 rounded-2xl p-4 text-center"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-heading font-bold text-secondary-foreground">{stat.value}</p>
                <p className="text-xs text-secondary-foreground/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-secondary-foreground/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-28 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
              <Sparkles className="w-4 h-4" /> Features
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl font-heading font-bold mb-4"
              variants={fadeUp} custom={1}
            >
              Everything You Need to <span className="gradient-text">Excel</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg"
              variants={fadeUp} custom={2}
            >
              We curate and provide the best study resources so you can focus on what matters — learning and cracking your exams.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="card-elevated p-8 group relative overflow-hidden"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -8 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <f.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 px-4 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute w-64 h-64 rounded-full blur-3xl opacity-5" style={{ background: "hsl(48 96% 53%)", top: "20%", left: "10%" }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-secondary-foreground" variants={fadeUp} custom={0}>
              What You <span className="gradient-text">Get</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Complete JEE & NEET study materials",
              "Previous year question papers with solutions",
              "Video lecture PDFs and notes",
              "Practice tests and mock exams",
              "Board exam preparation resources",
              "Community-rated best resources",
              "Personal study vault for your materials",
              "Study timer with streak tracking",
            ].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                whileHover={{ x: 5 }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-secondary-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-28 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 className="text-3xl md:text-5xl font-heading font-bold mb-6" variants={fadeUp} custom={0}>
              About <span className="gradient-text">Us</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Rankers Star was born from a simple belief: <strong>quality education should be accessible to everyone.</strong>
              </p>
              <p className="text-foreground/60 leading-relaxed mb-6">
                We are a passionate team of students and educators who understand the financial burden of expensive study materials. 
                We've been through the same journey — searching for affordable resources, sharing notes with friends, and wishing someone would just make it all free.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                That's exactly what we did. Rankers Star is our way of giving back to the community that helped us succeed.
                Every material on our platform is carefully curated and verified by top students and educators.
              </p>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              {[
                { icon: Users, label: "Built by students, for students" },
                { icon: Heart, label: "100% free, no hidden charges" },
                { icon: Shield, label: "Curated & verified materials" },
                { icon: Trophy, label: "Trusted by 10,000+ aspirants" },
              ].map((item) => (
                <motion.div key={item.label} variants={scaleIn} className="card-elevated p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Goal */}
      <section className="py-24 px-4 bg-secondary relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-bold mb-8 text-secondary-foreground"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            Our <span className="gradient-text">Goal</span>
          </motion.h2>
          <motion.div
            className="card-elevated p-10 md:p-14 relative overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              To become India's most trusted free study platform where every aspiring student — regardless of their financial background —
              can access world-class study materials. We aim to build a community-driven library that covers every topic,
              every subject, and every exam. <strong className="text-primary">Together, we rise.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 className="text-3xl md:text-5xl font-heading font-bold mb-4" variants={fadeUp} custom={0}>
              What Students <span className="gradient-text">Say</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="card-elevated p-8 relative"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl text-primary/20 font-serif absolute top-4 left-6">"</div>
                <p className="text-foreground/70 italic mb-6 mt-6 leading-relaxed">{t.text}</p>
                <div>
                  <p className="font-heading font-semibold">{t.name}</p>
                  <p className="text-xs text-primary">{t.exam}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="py-24 px-4 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background: "hsl(48 96% 53%)" }} animate={{ x: ["-20%", "120%"], y: ["-20%", "50%"] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span
            className="inline-flex items-center gap-2 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            <Send className="w-4 h-4" /> Join the Community
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-bold mb-6 text-secondary-foreground"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            Join Our <span className="gradient-text">Telegram</span>
          </motion.h2>
          <motion.p
            className="text-secondary-foreground/70 mb-8 text-lg"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
          >
            All announcements, new material uploads, requests, and discussions happen on our Telegram channel. Be part of a community of 10,000+ aspirants!
          </motion.p>
          <motion.a
            href="https://t.me/freematerialjeeneet"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 text-lg px-10 py-4 rounded-2xl"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-5 h-5" /> Join Telegram Channel
          </motion.a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-bold mb-6 text-secondary-foreground"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            Ready to Start Your <span className="gradient-text">Journey</span>?
          </motion.h2>
          <motion.p
            className="text-secondary-foreground/70 mb-10 text-lg"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            Join thousands of students who are already using Rankers Star to prepare for their exams. It's completely free!
          </motion.p>
          <motion.button
            onClick={() => navigate("/enter")}
            className="btn-gold text-xl px-14 py-5 rounded-2xl inline-flex items-center gap-3 relative overflow-hidden group"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px -4px hsl(48 96% 53% / 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Start Studying Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-4" style={{ background: "var(--gradient-navy)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Rankers Star" className="w-10 h-10" />
                <span className="font-heading font-bold text-xl text-secondary-foreground">Rankers Star</span>
              </div>
              <p className="text-secondary-foreground/60 text-sm leading-relaxed">
                India's most trusted free study platform. Quality education for all — books, lectures, PYQs, and more.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-secondary-foreground mb-4">Connect</h4>
              <ul className="space-y-3 text-sm text-secondary-foreground/60">
                <li>
                  <a href="https://t.me/freematerialjeeneet" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                    <Send className="w-4 h-4" /> Telegram Channel
                  </a>
                </li>
                <li>
                  <a href="mailto:studyspacerankers@gmail.com" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" /> studyspacerankers@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-secondary-foreground mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-secondary-foreground/60">
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/adsense-disclaimer" className="hover:text-primary transition-colors">AdSense Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/10 pt-8 text-center text-sm text-secondary-foreground/40">
            © {new Date().getFullYear()} Rankers Star. All rights reserved. Education should be free. ✨
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
