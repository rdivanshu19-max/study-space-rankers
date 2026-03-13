import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import TestConfigComponent from "@/components/test/TestConfig";
import CBTInterface from "@/components/test/CBTInterface";
import TestAnalysis from "@/components/test/TestAnalysis";
import type { TestConfig, TestResult, Question } from "@/lib/test-types";
import { getChaptersForSubject } from "@/lib/test-syllabus";
import { toast } from "sonner";

type Phase = "config" | "loading" | "test" | "analysis";

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-test`;

const AITest = () => {
  const [phase, setPhase] = useState<Phase>("config");
  const [config, setConfig] = useState<TestConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loadingProgress, setLoadingProgress] = useState("");

  const generateQuestions = async (cfg: TestConfig) => {
    setConfig(cfg);
    setPhase("loading");

    try {
      const allQuestions: Question[] = [];
      let globalId = 0;

      for (const subject of cfg.subjects) {
        const count = cfg.questionsPerSubject[subject];
        setLoadingProgress(`Generating ${subject} questions (${count})...`);

        // Get chapter names for this subject from the config
        const subjectChapters = getChaptersForSubject(cfg.exam, subject, cfg.classLevel)
          .filter(c => cfg.chapters.includes(c.name))
          .map(c => c.name);

        // If no specific chapters matched, use all for this subject
        const chaptersToUse = subjectChapters.length > 0 ? subjectChapters : 
          getChaptersForSubject(cfg.exam, subject, cfg.classLevel).map(c => c.name);

        // Split into batches of max 25
        const batchSize = 25;
        let remaining = count;

        while (remaining > 0) {
          const batchCount = Math.min(remaining, batchSize);

          const resp = await fetch(GENERATE_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              subject,
              chapters: chaptersToUse,
              count: batchCount,
              exam: cfg.exam,
            }),
          });

          if (!resp.ok) {
            const err = await resp.json().catch(() => ({}));
            throw new Error(err.error || `Failed to generate ${subject} questions`);
          }

          const data = await resp.json();
          const qs = (data.questions || []).map((q: Question) => ({
            ...q,
            id: globalId++,
            subject,
          }));
          allQuestions.push(...qs);
          remaining -= batchCount;
        }
      }

      if (allQuestions.length === 0) {
        throw new Error("No questions were generated. Please try again.");
      }

      setQuestions(allQuestions);
      setPhase("test");
    } catch (e: any) {
      console.error("Question generation error:", e);
      toast.error(e.message || "Failed to generate test. Please try again.");
      setPhase("config");
    }
  };

  const handleSubmit = (res: TestResult) => {
    setResult(res);
    setPhase("analysis");
  };

  const handleBackToConfig = () => {
    setPhase("config");
    setConfig(null);
    setQuestions([]);
    setResult(null);
  };

  if (phase === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center"
        >
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </motion.div>
        <div className="text-center">
          <h2 className="font-heading font-bold text-xl mb-2">Generating Your Test</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
            <Sparkles className="w-4 h-4 text-primary" /> {loadingProgress || "Preparing questions..."}
          </p>
          <p className="text-xs text-muted-foreground mt-2">This may take a minute for larger tests</p>
        </div>
      </div>
    );
  }

  if (phase === "test" && config) {
    return <CBTInterface config={config} questions={questions} onSubmit={handleSubmit} />;
  }

  if (phase === "analysis" && result) {
    return <TestAnalysis result={result} onBackToConfig={handleBackToConfig} />;
  }

  return <TestConfigComponent onStart={generateQuestions} />;
};

export default AITest;
