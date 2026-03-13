import type { ExamType, ClassLevel } from "./test-syllabus";

export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0-3
  explanation: string;
  subject: string;
  chapter: string;
}

export type QuestionStatus = "not_visited" | "not_answered" | "answered" | "marked" | "answered_marked";

export interface TestConfig {
  exam: ExamType;
  testType: "chapter" | "subject" | "class" | "full";
  classLevel?: ClassLevel;
  subjects: string[];
  chapters: string[]; // chapter names
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  questionsPerSubject: Record<string, number>;
}

export interface TestResult {
  config: TestConfig;
  questions: Question[];
  answers: (number | null)[]; // user answers, null = unanswered
  markedForReview: boolean[];
  timeTaken: number; // seconds
  score: number;
  maxScore: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  negativeMarks: number;
  subjectWise: Record<string, {
    score: number;
    maxScore: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    total: number;
    negativeMarks: number;
  }>;
}

export function getTestDuration(testType: TestConfig["testType"]): number {
  switch (testType) {
    case "chapter": return 20;
    case "subject": return 60;
    case "class": return 120;
    case "full": return 180;
  }
}

export function getQuestionsPerSubject(
  exam: ExamType,
  testType: TestConfig["testType"],
  subjects: string[]
): Record<string, number> {
  if (testType === "chapter") {
    const perSubject: Record<string, number> = {};
    subjects.forEach(s => { perSubject[s] = 10; });
    return perSubject;
  }

  if (exam === "JEE") {
    const perSubject: Record<string, number> = {};
    subjects.forEach(s => { perSubject[s] = 25; });
    return perSubject;
  }

  // NEET
  const perSubject: Record<string, number> = {};
  subjects.forEach(s => {
    if (s === "Biology") perSubject[s] = testType === "subject" ? 45 : 90;
    else perSubject[s] = 45;
  });
  return perSubject;
}

export function calculateResult(
  config: TestConfig,
  questions: Question[],
  answers: (number | null)[],
  markedForReview: boolean[],
  timeTaken: number
): TestResult {
  let correct = 0, incorrect = 0, unanswered = 0, negativeMarks = 0;
  const subjectWise: TestResult["subjectWise"] = {};

  // Init subject stats
  for (const s of config.subjects) {
    subjectWise[s] = { score: 0, maxScore: 0, correct: 0, incorrect: 0, unanswered: 0, total: 0, negativeMarks: 0 };
  }

  questions.forEach((q, i) => {
    const subject = q.subject;
    if (!subjectWise[subject]) {
      subjectWise[subject] = { score: 0, maxScore: 0, correct: 0, incorrect: 0, unanswered: 0, total: 0, negativeMarks: 0 };
    }
    subjectWise[subject].total++;
    subjectWise[subject].maxScore += 4;

    if (answers[i] === null || answers[i] === undefined) {
      unanswered++;
      subjectWise[subject].unanswered++;
    } else if (answers[i] === q.correctAnswer) {
      correct++;
      subjectWise[subject].correct++;
      subjectWise[subject].score += 4;
    } else {
      incorrect++;
      negativeMarks++;
      subjectWise[subject].incorrect++;
      subjectWise[subject].score -= 1;
      subjectWise[subject].negativeMarks++;
    }
  });

  const score = correct * 4 - incorrect * 1;
  const maxScore = questions.length * 4;

  return {
    config, questions, answers, markedForReview, timeTaken,
    score, maxScore, correct, incorrect, unanswered, negativeMarks, subjectWise,
  };
}
