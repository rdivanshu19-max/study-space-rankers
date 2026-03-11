import { motion } from "framer-motion";
import { Star, Users, Target, Send, Mail, Heart, Shield, BookOpen, GraduationCap, Sparkles, Trophy, Clock } from "lucide-react";
import logo from "@/assets/rankers-star-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const AppAbout = () => (
  <div className="space-y-6 max-w-2xl">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-heading font-bold">About <span className="gradient-text">Rankers Star</span></h1>
      <p className="text-muted-foreground text-sm mt-1">Learn more about our mission and vision</p>
    </motion.div>

    {/* Hero card */}
    <motion.div
      className="card-elevated p-8 text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary/10 to-transparent" />
      <div className="relative z-10">
        <motion.img
          src={logo}
          alt="Rankers Star"
          className="w-24 h-24 mx-auto mb-4"
          whileHover={{ rotate: 10, scale: 1.1 }}
        />
        <h2 className="text-2xl font-heading font-bold mb-1">Rankers <span className="gradient-text">Star</span></h2>
        <p className="text-xs text-primary font-semibold mb-4">India's #1 Free Study Platform</p>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          A community-driven platform providing free, high-quality study materials for JEE, NEET, and Board exam aspirants.
          We believe quality education is a right, not a privilege.
        </p>
      </div>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { icon: BookOpen, label: "Materials", value: "500+" },
        { icon: Users, label: "Students", value: "10K+" },
        { icon: Clock, label: "Hours", value: "1000+" },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          className="card-elevated p-4 text-center"
          initial="hidden" animate="visible" variants={fadeUp} custom={i + 2}
        >
          <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xl font-heading font-bold">{s.value}</p>
          <p className="text-[10px] text-muted-foreground">{s.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Mission */}
    <motion.div className="card-elevated p-6" initial="hidden" animate="visible" variants={fadeUp} custom={5}>
      <h3 className="font-heading font-semibold flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-primary" /> Our Mission
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        To become India's most trusted free study resource platform, empowering students with curated books,
        lectures, PDFs, PYQs, and practice tests — all at zero cost. We want every aspiring student, regardless of their
        financial background, to have access to world-class materials.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Heart, text: "100% Free Forever" },
          { icon: Shield, text: "Verified Materials" },
          { icon: GraduationCap, text: "Exam Focused" },
          { icon: Trophy, text: "Community Driven" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-muted/50">
            <item.icon className="w-3.5 h-3.5 text-primary" />
            {item.text}
          </div>
        ))}
      </div>
    </motion.div>

    {/* Story */}
    <motion.div className="card-elevated p-6" initial="hidden" animate="visible" variants={fadeUp} custom={6}>
      <h3 className="font-heading font-semibold flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-primary" /> Our Story
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Rankers Star was born from a simple frustration — the cost of study materials. As students ourselves,
        we spent hours searching for affordable resources, sharing notes, and wishing someone would just make everything free.
        So we decided to be that "someone." What started as a small Telegram group sharing PDFs has now grown into
        a full-fledged platform trusted by thousands of aspirants across India.
      </p>
    </motion.div>

    {/* What We Offer */}
    <motion.div className="card-elevated p-6" initial="hidden" animate="visible" variants={fadeUp} custom={7}>
      <h3 className="font-heading font-semibold flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-primary" /> What We Offer
      </h3>
      <div className="space-y-2">
        {[
          "Complete JEE Mains & Advanced study materials",
          "NEET Biology, Physics & Chemistry resources",
          "CBSE & State Board exam preparation",
          "Previous Year Question Papers with solutions",
          "Video lecture notes and PDFs",
          "Practice tests and mock exams",
          "Personal study vault for your own materials",
          "Study timer with streak tracking",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>

    {/* Connect */}
    <motion.div className="card-elevated p-6" initial="hidden" animate="visible" variants={fadeUp} custom={8}>
      <h3 className="font-heading font-semibold flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" /> Connect With Us
      </h3>
      <div className="space-y-3">
        <a
          href="mailto:studyspacerankers@gmail.com"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-primary/5"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">Email Us</p>
            <p className="text-xs">studyspacerankers@gmail.com</p>
          </div>
        </a>
        <a
          href="https://t.me/freematerialjeeneet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-primary/5"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">Telegram Channel</p>
            <p className="text-xs">Join 10,000+ aspirants</p>
          </div>
        </a>
      </div>
    </motion.div>
  </div>
);

export default AppAbout;
