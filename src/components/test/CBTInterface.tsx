import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Flag, ChevronLeft, ChevronRight, AlertTriangle, Eye } from "lucide-react";
import type { Question, QuestionStatus, TestConfig, TestResult } from "@/lib/test-types";
import { calculateResult } from "@/lib/test-types";

interface Props {
  config: TestConfig;
  questions: Question[];
  onSubmit: (result: TestResult) => void;
}

const CBTInterface = ({ config, questions, onSubmit }: Props) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [visited, setVisited] = useState<boolean[]>(() => {
    const v = new Array(questions.length).fill(false);
    v[0] = true;
    return v;
  });
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(config.durationMinutes * 60);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const startTimeRef = useRef(Date.now());

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const getStatus = useCallback((i: number): QuestionStatus => {
    const hasAnswer = answers[i] !== null;
    const isMarked = markedForReview[i];
    const isVisited = visited[i];

    if (hasAnswer && isMarked) return "answered_marked";
    if (isMarked) return "marked";
    if (hasAnswer) return "answered";
    if (isVisited) return "not_answered";
    return "not_visited";
  }, [answers, markedForReview, visited]);

  const statusColors: Record<QuestionStatus, string> = {
    not_visited: "bg-muted text-muted-foreground",
    not_answered: "bg-destructive/80 text-destructive-foreground",
    answered: "bg-emerald-500 text-white",
    marked: "bg-purple-500 text-white",
    answered_marked: "bg-purple-500 text-white ring-2 ring-emerald-400",
  };

  const statusLabels: Record<QuestionStatus, string> = {
    not_visited: "Not Visited",
    not_answered: "Not Answered",
    answered: "Answered",
    marked: "Marked for Review",
    answered_marked: "Answered & Marked",
  };

  const goToQuestion = (i: number) => {
    setCurrentQ(i);
    setVisited(prev => { const v = [...prev]; v[i] = true; return v; });
  };

  const selectOption = (optionIdx: number) => {
    setAnswers(prev => { const a = [...prev]; a[currentQ] = optionIdx; return a; });
  };

  const clearResponse = () => {
    setAnswers(prev => { const a = [...prev]; a[currentQ] = null; return a; });
  };

  const toggleMark = () => {
    setMarkedForReview(prev => { const m = [...prev]; m[currentQ] = !m[currentQ]; return m; });
  };

  const saveAndNext = () => {
    if (currentQ < questions.length - 1) goToQuestion(currentQ + 1);
  };

  const markAndNext = () => {
    setMarkedForReview(prev => { const m = [...prev]; m[currentQ] = true; return m; });
    if (currentQ < questions.length - 1) goToQuestion(currentQ + 1);
  };

  const handleSubmit = () => {
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const result = calculateResult(config, questions, answers, markedForReview, timeTaken);
    onSubmit(result);
  };

  const answered = answers.filter(a => a !== null).length;
  const unanswered = questions.length - answered;
  const marked = markedForReview.filter(Boolean).length;

  const q = questions[currentQ];
  const isTimeLow = timeLeft < 300; // less than 5 min

  // Group questions by subject for palette
  const subjectGroups: { subject: string; indices: number[] }[] = [];
  let lastSubject = "";
  questions.forEach((q, i) => {
    if (q.subject !== lastSubject) {
      subjectGroups.push({ subject: q.subject, indices: [i] });
      lastSubject = q.subject;
    } else {
      subjectGroups[subjectGroups.length - 1].indices.push(i);
    }
  });

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-sm">{config.exam} Test</span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground">{q.subject}</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${isTimeLow ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"}`}>
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
        <button
          onClick={() => setShowSubmitDialog(true)}
          className="btn-gold text-xs px-4 py-2 rounded-lg"
        >
          Submit Test
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Question Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Question */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  Q.{currentQ + 1} / {questions.length}
                </span>
                <span className="text-xs text-muted-foreground">{q.chapter}</span>
                {markedForReview[currentQ] && (
                  <span className="bg-purple-500/10 text-purple-500 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Flag className="w-3 h-3" /> Marked
                  </span>
                )}
              </div>

              <div className="card-elevated p-6 mb-6">
                <p className="text-base leading-relaxed font-medium">{q.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, oi) => (
                  <motion.button
                    key={oi}
                    onClick={() => selectOption(oi)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm flex items-start gap-3 ${
                      answers[currentQ] === oi
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/30 bg-card"
                    }`}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      answers[currentQ] === oi ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="pt-1">{opt}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="border-t bg-card p-3 flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => currentQ > 0 && goToQuestion(currentQ - 1)}
              disabled={currentQ === 0}
              className="px-3 py-2 rounded-lg text-xs font-medium border hover:bg-muted transition-colors disabled:opacity-30 flex items-center gap-1"
            >
              <ChevronLeft className="w-3 h-3" /> Previous
            </button>
            <button onClick={clearResponse} className="px-3 py-2 rounded-lg text-xs font-medium border hover:bg-muted transition-colors">
              Clear Response
            </button>
            <button
              onClick={toggleMark}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                markedForReview[currentQ] ? "bg-purple-500/10 border-purple-500/30 text-purple-600" : "hover:bg-muted"
              }`}
            >
              <Flag className="w-3 h-3" /> {markedForReview[currentQ] ? "Unmark" : "Mark for Review"}
            </button>
            <button
              onClick={markAndNext}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-600 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              Mark & Next
            </button>
            <div className="flex-1" />
            <button
              onClick={saveAndNext}
              className="btn-gold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1"
            >
              Save & Next <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Question Palette - Desktop */}
        <div className="hidden md:flex flex-col w-64 border-l bg-card shrink-0 overflow-y-auto">
          <div className="p-3 border-b">
            <p className="font-heading font-semibold text-xs mb-3">Question Palette</p>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-1.5 text-[9px]">
              {(["answered", "not_answered", "not_visited", "marked", "answered_marked"] as QuestionStatus[]).map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded text-[8px] flex items-center justify-center ${statusColors[s]}`}>1</span>
                  <span className="text-muted-foreground">{statusLabels[s]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {subjectGroups.map(g => (
              <div key={g.subject}>
                <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{g.subject}</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {g.indices.map(i => (
                    <button
                      key={i}
                      onClick={() => goToQuestion(i)}
                      className={`w-9 h-9 rounded-lg text-[11px] font-bold transition-all ${statusColors[getStatus(i)]} ${
                        currentQ === i ? "ring-2 ring-primary ring-offset-1" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t space-y-1 text-[10px] text-muted-foreground">
            <div className="flex justify-between"><span>Answered:</span><span className="font-bold text-emerald-500">{answered}</span></div>
            <div className="flex justify-between"><span>Unanswered:</span><span className="font-bold text-destructive">{unanswered}</span></div>
            <div className="flex justify-between"><span>Marked:</span><span className="font-bold text-purple-500">{marked}</span></div>
          </div>
        </div>
      </div>

      {/* Mobile Question Palette Toggle */}
      <div className="md:hidden fixed bottom-20 right-4">
        <details className="group">
          <summary className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer shadow-lg list-none">
            <Eye className="w-5 h-5" />
          </summary>
          <div className="absolute bottom-12 right-0 w-72 bg-card border rounded-xl shadow-xl p-3 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-1 text-[8px] mb-3">
              {(["answered", "not_answered", "not_visited", "marked"] as QuestionStatus[]).map(s => (
                <div key={s} className="flex items-center gap-1">
                  <span className={`w-3 h-3 rounded text-[7px] flex items-center justify-center ${statusColors[s]}`}>1</span>
                  <span className="text-muted-foreground">{statusLabels[s]}</span>
                </div>
              ))}
            </div>
            {subjectGroups.map(g => (
              <div key={g.subject} className="mb-3">
                <p className="text-[9px] font-semibold text-muted-foreground mb-1">{g.subject}</p>
                <div className="grid grid-cols-8 gap-1">
                  {g.indices.map(i => (
                    <button key={i} onClick={() => goToQuestion(i)}
                      className={`w-7 h-7 rounded text-[9px] font-bold ${statusColors[getStatus(i)]} ${currentQ === i ? "ring-2 ring-primary" : ""}`}
                    >{i + 1}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Submit Confirmation Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 z-[60] bg-foreground/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-sm w-full border shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h3 className="font-heading font-bold text-lg">Submit Test?</h3>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2.5 rounded-lg bg-emerald-500/10">
                <span>Attempted</span><span className="font-bold text-emerald-600">{answered}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-destructive/10">
                <span>Unanswered</span><span className="font-bold text-destructive">{unanswered}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-purple-500/10">
                <span>Marked for Review</span><span className="font-bold text-purple-600">{marked}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              {unanswered > 0 && `⚠️ You have ${unanswered} unanswered question${unanswered > 1 ? "s" : ""}. `}
              {marked > 0 && `${marked} question${marked > 1 ? "s are" : " is"} marked for review. `}
              Are you sure you want to submit?
            </p>

            <div className="flex gap-3">
              <button onClick={() => setShowSubmitDialog(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-muted transition-colors">
                Go Back
              </button>
              <button onClick={handleSubmit} className="flex-1 btn-gold py-2.5 rounded-xl text-sm">
                Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CBTInterface;
