import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, TrendingDown, BarChart3, CheckCircle2, XCircle, MinusCircle, Clock, ArrowLeft, Sparkles, BookOpen, Flame } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import type { TestResult } from "@/lib/test-types";

interface Props {
  result: TestResult;
  onBackToConfig: () => void;
}

const TestAnalysis = ({ result, onBackToConfig }: Props) => {
  const { config, score, maxScore, correct, incorrect, unanswered, negativeMarks, subjectWise, timeTaken } = result;
  const percentage = Math.round((Math.max(score, 0) / maxScore) * 100);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  // Performance message
  const getMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! 🏆 You're exam-ready!", color: "text-emerald-500" };
    if (percentage >= 70) return { text: "Great job! 💪 Keep pushing forward!", color: "text-primary" };
    if (percentage >= 50) return { text: "Good effort! 📈 Focus on weak areas.", color: "text-blue-500" };
    if (percentage >= 30) return { text: "Keep practicing! 🔥 You'll get there.", color: "text-orange-500" };
    return { text: "Don't give up! 💪 Every attempt makes you stronger.", color: "text-destructive" };
  };
  const message = getMessage();

  // Subject bar chart data
  const subjectBarData = Object.entries(subjectWise).map(([subject, data]) => ({
    subject: subject.length > 5 ? subject.slice(0, 4) + "." : subject,
    fullName: subject,
    Score: data.score,
    "Max Score": data.maxScore,
    Percentage: Math.round((Math.max(data.score, 0) / data.maxScore) * 100),
  }));

  // Pie chart data
  const pieData = [
    { name: "Correct", value: correct, color: "hsl(142, 71%, 45%)" },
    { name: "Incorrect", value: incorrect, color: "hsl(0, 84%, 60%)" },
    { name: "Unanswered", value: unanswered, color: "hsl(215, 16%, 47%)" },
  ].filter(d => d.value > 0);

  // Radar chart for subject performance
  const radarData = Object.entries(subjectWise).map(([subject, data]) => ({
    subject,
    accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    attempted: data.total > 0 ? Math.round(((data.correct + data.incorrect) / data.total) * 100) : 0,
  }));

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-heading font-bold">Test <span className="gradient-text">Analysis</span></h1>
          <p className={`text-lg mt-2 font-semibold ${message.color}`}>{message.text}</p>
        </motion.div>

        {/* Score Card */}
        <motion.div className="card-elevated p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Score Circle */}
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" strokeWidth="8" fill="none" className="stroke-muted" />
                <circle
                  cx="50" cy="50" r="42" strokeWidth="8" fill="none"
                  className="stroke-primary"
                  strokeDasharray={`${percentage * 2.64} ${264 - percentage * 2.64}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-heading font-bold">{score}</p>
                <p className="text-xs text-muted-foreground">/ {maxScore}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              <div className="text-center p-3 rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-xl font-bold text-emerald-600">{correct}</p>
                <p className="text-[10px] text-muted-foreground">Correct</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-destructive/10">
                <XCircle className="w-5 h-5 text-destructive mx-auto mb-1" />
                <p className="text-xl font-bold text-destructive">{incorrect}</p>
                <p className="text-[10px] text-muted-foreground">Incorrect</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted">
                <MinusCircle className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xl font-bold">{unanswered}</p>
                <p className="text-[10px] text-muted-foreground">Unanswered</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-destructive/10">
                <TrendingDown className="w-5 h-5 text-destructive mx-auto mb-1" />
                <p className="text-xl font-bold text-destructive">-{negativeMarks}</p>
                <p className="text-[10px] text-muted-foreground">Negative Marks</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Time: {formatTime(timeTaken)}</span>
            <span className="flex items-center gap-1"><Target className="w-3 h-3" /> Accuracy: {correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0}%</span>
            <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> Percentile: {percentage}%</span>
          </div>
        </motion.div>

        {/* Subject-wise Breakdown */}
        <motion.div className="card-elevated p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Subject-wise Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(subjectWise).map(([subject, data]) => {
              const pct = Math.round((Math.max(data.score, 0) / data.maxScore) * 100);
              return (
                <div key={subject} className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-semibold text-sm">{subject}</span>
                    <span className="text-sm font-bold">{data.score} / {data.maxScore}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                    <div className="h-2.5 rounded-full bg-primary transition-all" style={{ width: `${Math.max(pct, 0)}%` }} />
                  </div>
                  <div className="flex gap-4 text-[10px] text-muted-foreground">
                    <span>✅ {data.correct} correct</span>
                    <span>❌ {data.incorrect} wrong</span>
                    <span>⏭️ {data.unanswered} skipped</span>
                    <span className="text-destructive">-{data.negativeMarks} negative</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Subject Score Chart */}
          <motion.div className="card-elevated p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Subject Scores
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={subjectBarData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: number, name: string) => [value, name]}
                  labelFormatter={(label) => subjectBarData.find(d => d.subject === label)?.fullName || label}
                />
                <Bar dataKey="Score" fill="hsl(48, 96%, 53%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Max Score" fill="hsl(215, 16%, 80%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div className="card-elevated p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> Question Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Radar Chart */}
        {Object.keys(subjectWise).length > 2 && (
          <motion.div className="card-elevated p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Performance Radar
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Accuracy" dataKey="accuracy" stroke="hsl(48, 96%, 53%)" fill="hsl(48, 96%, 53%)" fillOpacity={0.3} />
                <Radar name="Attempt Rate" dataKey="attempted" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Motivation & Tips */}
        <motion.div className="card-elevated p-6 border-l-4 border-primary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" /> Analysis & Improvement Tips
          </h3>
          <div className="space-y-2 text-sm text-foreground/80">
            {percentage >= 70 ? (
              <>
                <p>🌟 Excellent performance! You have a strong understanding of the concepts.</p>
                <p>📌 Focus on the {Math.round(incorrect / (correct + incorrect) * 100) || 0}% questions you got wrong — review those chapters.</p>
              </>
            ) : percentage >= 40 ? (
              <>
                <p>📈 You're on the right track. Identify your weakest subject and dedicate extra time to it.</p>
                {Object.entries(subjectWise).map(([s, d]) => {
                  const acc = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
                  if (acc < 50) return <p key={s}>⚠️ <strong>{s}</strong> needs more practice — only {acc}% accuracy.</p>;
                  return null;
                })}
              </>
            ) : (
              <>
                <p>💪 Don't be discouraged! Every test is a learning opportunity.</p>
                <p>📖 Start by revising the basics of each subject before attempting more tests.</p>
                <p>🎯 Try chapter-wise tests first to build confidence in individual topics.</p>
              </>
            )}
            {negativeMarks > 3 && (
              <p>🚫 You lost <strong>{negativeMarks}</strong> marks to negative marking. Consider leaving unsure questions unanswered.</p>
            )}
            {unanswered > result.questions.length * 0.3 && (
              <p>⏱️ You left {unanswered} questions unanswered. Try to manage time better — practice with timed tests.</p>
            )}
          </div>
        </motion.div>

        {/* Question Review */}
        <motion.div className="card-elevated p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Question Review
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {result.questions.map((q, i) => {
              const userAns = result.answers[i];
              const isCorrect = userAns === q.correctAnswer;
              const isUnanswered = userAns === null;

              return (
                <div key={i} className={`p-4 rounded-xl border-l-4 ${isUnanswered ? "border-muted-foreground bg-muted/30" : isCorrect ? "border-emerald-500 bg-emerald-500/5" : "border-destructive bg-destructive/5"}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded">Q{i + 1}</span>
                    <span className="text-xs text-muted-foreground">{q.subject} • {q.chapter}</span>
                  </div>
                  <p className="text-sm font-medium mb-2">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs mb-2">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`px-3 py-1.5 rounded-lg ${
                          oi === q.correctAnswer ? "bg-emerald-500/20 text-emerald-700 font-medium" :
                          oi === userAns && !isCorrect ? "bg-destructive/20 text-destructive font-medium" :
                          "bg-muted/50"
                        }`}
                      >
                        {String.fromCharCode(65 + oi)}. {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground italic">💡 {q.explanation}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.button
          onClick={onBackToConfig}
          className="btn-gold w-full py-4 rounded-xl text-base flex items-center justify-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-5 h-5" /> Take Another Test
        </motion.button>
      </div>
    </div>
  );
};

export default TestAnalysis;
