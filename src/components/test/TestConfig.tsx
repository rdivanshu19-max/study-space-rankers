import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Calculator, Microscope, ChevronRight, Zap, Clock, Target, GraduationCap } from "lucide-react";
import type { ExamType, ClassLevel } from "@/lib/test-syllabus";
import { SYLLABUS, getChaptersForSubject, getSubjectsForExam } from "@/lib/test-syllabus";
import { getTestDuration, getQuestionsPerSubject, type TestConfig } from "@/lib/test-types";

interface Props {
  onStart: (config: TestConfig) => void;
}

const subjectIcons: Record<string, any> = {
  Physics: Zap,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
  Biology: Microscope,
};

const TestConfigComponent = ({ onStart }: Props) => {
  const [step, setStep] = useState<"exam" | "type" | "class" | "subject" | "chapters">("exam");
  const [exam, setExam] = useState<ExamType | null>(null);
  const [testType, setTestType] = useState<TestConfig["testType"] | null>(null);
  const [classLevel, setClassLevel] = useState<ClassLevel | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

  const handleExamSelect = (e: ExamType) => {
    setExam(e);
    setStep("type");
  };

  const handleTypeSelect = (t: TestConfig["testType"]) => {
    setTestType(t);
    if (t === "full") {
      // Full test includes all subjects and both classes
      const subjects = getSubjectsForExam(exam!);
      setSelectedSubjects(subjects);
      const allChapters: string[] = [];
      subjects.forEach(s => {
        getChaptersForSubject(exam!, s).forEach(c => allChapters.push(c.name));
      });
      setSelectedChapters(allChapters);
      buildAndStart(exam!, t, undefined, subjects, allChapters);
      return;
    }
    setStep("class");
  };

  const handleClassSelect = (c: ClassLevel) => {
    setClassLevel(c);
    if (testType === "class") {
      const subjects = getSubjectsForExam(exam!);
      setSelectedSubjects(subjects);
      const chapters: string[] = [];
      subjects.forEach(s => {
        getChaptersForSubject(exam!, s, c).forEach(ch => chapters.push(ch.name));
      });
      setSelectedChapters(chapters);
      buildAndStart(exam!, testType!, c, subjects, chapters);
      return;
    }
    setStep("subject");
  };

  const handleSubjectSelect = (s: string) => {
    if (testType === "chapter") {
      setSelectedSubjects([s]);
      setStep("chapters");
    } else {
      // Subject test
      setSelectedSubjects([s]);
      const chapters = getChaptersForSubject(exam!, s, classLevel || undefined).map(c => c.name);
      setSelectedChapters(chapters);
      buildAndStart(exam!, testType!, classLevel || undefined, [s], chapters);
    }
  };

  const handleStartChapterTest = () => {
    if (selectedChapters.length === 0) return;
    buildAndStart(exam!, "chapter", classLevel || undefined, selectedSubjects, selectedChapters);
  };

  const buildAndStart = (
    exam: ExamType,
    testType: TestConfig["testType"],
    classLevel: ClassLevel | undefined,
    subjects: string[],
    chapters: string[]
  ) => {
    const questionsPerSubject = getQuestionsPerSubject(exam, testType, subjects);
    const totalQuestions = Object.values(questionsPerSubject).reduce((a, b) => a + b, 0);

    onStart({
      exam,
      testType,
      classLevel,
      subjects,
      chapters,
      totalQuestions,
      totalMarks: totalQuestions * 4,
      durationMinutes: getTestDuration(testType),
      questionsPerSubject,
    });
  };

  const toggleChapter = (name: string) => {
    setSelectedChapters(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const availableChapters = exam && selectedSubjects[0]
    ? getChaptersForSubject(exam, selectedSubjects[0], classLevel || undefined)
    : [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          AI <span className="gradient-text">Test</span>
        </h1>
        <p className="text-muted-foreground mt-2">Generate practice tests with AI — just like the real exam</p>
      </motion.div>

      {/* Step: Exam Selection */}
      {step === "exam" && (
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-heading font-semibold text-lg text-center">Choose Your Exam</h2>
          <div className="grid grid-cols-2 gap-4">
            {(["JEE", "NEET"] as ExamType[]).map(e => (
              <motion.button
                key={e}
                onClick={() => handleExamSelect(e)}
                className="card-elevated p-8 text-center group"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  {e === "JEE" ? <Target className="w-8 h-8 text-primary" /> : <Microscope className="w-8 h-8 text-primary" />}
                </div>
                <p className="text-xl font-heading font-bold">{e}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {e === "JEE" ? "Physics, Chemistry, Maths" : "Physics, Chemistry, Biology"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">
                  {e === "JEE" ? "75Q • 300 Marks • 3 Hours" : "180Q • 720 Marks • 3 Hours"}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step: Test Type */}
      {step === "type" && (
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setStep("exam")} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button>
          <h2 className="font-heading font-semibold text-lg text-center">Select Test Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {([
              { type: "chapter" as const, label: "Chapter Test", desc: "10 questions per chapter", icon: BookOpen, time: "20 min" },
              { type: "subject" as const, label: "Subject Test", desc: "Full subject coverage", icon: FlaskConical, time: "1 hour" },
              { type: "class" as const, label: "Class Test", desc: "All subjects, one class", icon: GraduationCap, time: "2 hours" },
              { type: "full" as const, label: `Full ${exam} Test`, desc: "Complete exam simulation", icon: Target, time: "3 hours" },
            ]).map(t => (
              <motion.button
                key={t.type}
                onClick={() => handleTypeSelect(t.type)}
                className="card-elevated p-5 text-left group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <t.icon className="w-6 h-6 text-primary mb-2" />
                <p className="font-heading font-semibold text-sm">{t.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{t.desc}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-primary">
                  <Clock className="w-3 h-3" /> {t.time}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step: Class Selection */}
      {step === "class" && (
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setStep("type")} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button>
          <h2 className="font-heading font-semibold text-lg text-center">Select Class</h2>
          <div className="grid grid-cols-2 gap-4">
            {(["11", "12"] as ClassLevel[]).map(c => (
              <motion.button
                key={c}
                onClick={() => handleClassSelect(c)}
                className="card-elevated p-8 text-center group"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="text-4xl font-heading font-bold gradient-text">{c}th</p>
                <p className="text-sm text-muted-foreground mt-2">Class {c}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step: Subject Selection */}
      {step === "subject" && exam && (
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setStep("class")} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button>
          <h2 className="font-heading font-semibold text-lg text-center">Select Subject</h2>
          <div className="grid gap-3">
            {getSubjectsForExam(exam).map(s => {
              const Icon = subjectIcons[s] || BookOpen;
              const chapCount = getChaptersForSubject(exam, s, classLevel || undefined).length;
              return (
                <motion.button
                  key={s}
                  onClick={() => handleSubjectSelect(s)}
                  className="card-elevated p-5 flex items-center gap-4 group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-heading font-semibold">{s}</p>
                    <p className="text-xs text-muted-foreground">{chapCount} chapters</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Step: Chapter Selection */}
      {step === "chapters" && (
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setStep("subject")} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button>
          <h2 className="font-heading font-semibold text-lg text-center">Select Chapters — {selectedSubjects[0]}</h2>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setSelectedChapters(availableChapters.map(c => c.name))}
              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedChapters([])}
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {availableChapters.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => toggleChapter(c.name)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-sm ${
                  selectedChapters.includes(c.name)
                    ? "bg-primary/10 border-primary/30 text-foreground"
                    : "bg-card border-border hover:border-primary/20"
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <span className="font-medium">{i + 1}. {c.name}</span>
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={handleStartChapterTest}
            disabled={selectedChapters.length === 0}
            className="btn-gold w-full py-4 rounded-xl text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={{ scale: selectedChapters.length > 0 ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-5 h-5" />
            Generate Test ({selectedChapters.length} chapter{selectedChapters.length !== 1 ? "s" : ""})
          </motion.button>
        </motion.div>
      )}

      {/* Exam Info */}
      {step === "exam" && (
        <motion.div className="card-elevated p-5 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> How it works
          </h3>
          <ol className="space-y-2 text-xs text-muted-foreground">
            <li className="flex gap-2"><span className="font-bold text-primary">1.</span> Choose exam, test type, and chapters</li>
            <li className="flex gap-2"><span className="font-bold text-primary">2.</span> AI generates exam-quality MCQs instantly</li>
            <li className="flex gap-2"><span className="font-bold text-primary">3.</span> Take the test in real CBT mode (+4 / -1 marking)</li>
            <li className="flex gap-2"><span className="font-bold text-primary">4.</span> Get detailed analysis with subject-wise breakdown</li>
          </ol>
        </motion.div>
      )}
    </div>
  );
};

export default TestConfigComponent;
