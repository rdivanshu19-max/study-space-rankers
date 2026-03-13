export type ExamType = "JEE" | "NEET";
export type ClassLevel = "11" | "12";

export interface Chapter {
  id: string;
  name: string;
  class: ClassLevel;
}

export interface SubjectData {
  name: string;
  chapters: Chapter[];
}

export interface ExamSyllabus {
  subjects: Record<string, SubjectData>;
}

// JEE Syllabus
const jeePhysics11: Chapter[] = [
  { id: "jp11_1", name: "Physical World", class: "11" },
  { id: "jp11_2", name: "Units and Measurements", class: "11" },
  { id: "jp11_3", name: "Motion in a Straight Line", class: "11" },
  { id: "jp11_4", name: "Motion in a Plane", class: "11" },
  { id: "jp11_5", name: "Laws of Motion", class: "11" },
  { id: "jp11_6", name: "Work, Energy and Power", class: "11" },
  { id: "jp11_7", name: "System of Particles and Rotational Motion", class: "11" },
  { id: "jp11_8", name: "Gravitation", class: "11" },
  { id: "jp11_9", name: "Mechanical Properties of Solids", class: "11" },
  { id: "jp11_10", name: "Mechanical Properties of Fluids", class: "11" },
  { id: "jp11_11", name: "Thermal Properties of Matter", class: "11" },
  { id: "jp11_12", name: "Thermodynamics", class: "11" },
  { id: "jp11_13", name: "Kinetic Theory", class: "11" },
  { id: "jp11_14", name: "Oscillations", class: "11" },
  { id: "jp11_15", name: "Waves", class: "11" },
];

const jeePhysics12: Chapter[] = [
  { id: "jp12_1", name: "Electric Charges and Fields", class: "12" },
  { id: "jp12_2", name: "Electrostatic Potential and Capacitance", class: "12" },
  { id: "jp12_3", name: "Current Electricity", class: "12" },
  { id: "jp12_4", name: "Moving Charges and Magnetism", class: "12" },
  { id: "jp12_5", name: "Magnetism and Matter", class: "12" },
  { id: "jp12_6", name: "Electromagnetic Induction", class: "12" },
  { id: "jp12_7", name: "Alternating Current", class: "12" },
  { id: "jp12_8", name: "Electromagnetic Waves", class: "12" },
  { id: "jp12_9", name: "Ray Optics and Optical Instruments", class: "12" },
  { id: "jp12_10", name: "Wave Optics", class: "12" },
  { id: "jp12_11", name: "Dual Nature of Radiation and Matter", class: "12" },
  { id: "jp12_12", name: "Atoms", class: "12" },
  { id: "jp12_13", name: "Nuclei", class: "12" },
  { id: "jp12_14", name: "Semiconductor Electronics", class: "12" },
];

const jeeChemistry11: Chapter[] = [
  { id: "jc11_1", name: "Some Basic Concepts of Chemistry", class: "11" },
  { id: "jc11_2", name: "Structure of Atom", class: "11" },
  { id: "jc11_3", name: "Classification of Elements and Periodicity", class: "11" },
  { id: "jc11_4", name: "Chemical Bonding and Molecular Structure", class: "11" },
  { id: "jc11_5", name: "Thermodynamics", class: "11" },
  { id: "jc11_6", name: "Equilibrium", class: "11" },
  { id: "jc11_7", name: "Redox Reactions", class: "11" },
  { id: "jc11_8", name: "Organic Chemistry: Basic Principles", class: "11" },
  { id: "jc11_9", name: "Hydrocarbons", class: "11" },
  { id: "jc11_10", name: "States of Matter", class: "11" },
  { id: "jc11_11", name: "Hydrogen", class: "11" },
  { id: "jc11_12", name: "s-Block Elements", class: "11" },
  { id: "jc11_13", name: "p-Block Elements", class: "11" },
  { id: "jc11_14", name: "Environmental Chemistry", class: "11" },
];

const jeeChemistry12: Chapter[] = [
  { id: "jc12_1", name: "Solid State", class: "12" },
  { id: "jc12_2", name: "Solutions", class: "12" },
  { id: "jc12_3", name: "Electrochemistry", class: "12" },
  { id: "jc12_4", name: "Chemical Kinetics", class: "12" },
  { id: "jc12_5", name: "Surface Chemistry", class: "12" },
  { id: "jc12_6", name: "General Principles of Isolation of Elements", class: "12" },
  { id: "jc12_7", name: "p-Block Elements (Class 12)", class: "12" },
  { id: "jc12_8", name: "d and f Block Elements", class: "12" },
  { id: "jc12_9", name: "Coordination Compounds", class: "12" },
  { id: "jc12_10", name: "Haloalkanes and Haloarenes", class: "12" },
  { id: "jc12_11", name: "Alcohols, Phenols and Ethers", class: "12" },
  { id: "jc12_12", name: "Aldehydes, Ketones and Carboxylic Acids", class: "12" },
  { id: "jc12_13", name: "Amines", class: "12" },
  { id: "jc12_14", name: "Biomolecules", class: "12" },
  { id: "jc12_15", name: "Polymers", class: "12" },
  { id: "jc12_16", name: "Chemistry in Everyday Life", class: "12" },
];

const jeeMaths11: Chapter[] = [
  { id: "jm11_1", name: "Sets", class: "11" },
  { id: "jm11_2", name: "Relations and Functions", class: "11" },
  { id: "jm11_3", name: "Trigonometric Functions", class: "11" },
  { id: "jm11_4", name: "Complex Numbers and Quadratic Equations", class: "11" },
  { id: "jm11_5", name: "Linear Inequalities", class: "11" },
  { id: "jm11_6", name: "Permutations and Combinations", class: "11" },
  { id: "jm11_7", name: "Binomial Theorem", class: "11" },
  { id: "jm11_8", name: "Sequences and Series", class: "11" },
  { id: "jm11_9", name: "Straight Lines", class: "11" },
  { id: "jm11_10", name: "Conic Sections", class: "11" },
  { id: "jm11_11", name: "Introduction to Three Dimensional Geometry", class: "11" },
  { id: "jm11_12", name: "Limits and Derivatives", class: "11" },
  { id: "jm11_13", name: "Statistics", class: "11" },
  { id: "jm11_14", name: "Probability", class: "11" },
  { id: "jm11_15", name: "Mathematical Reasoning", class: "11" },
];

const jeeMaths12: Chapter[] = [
  { id: "jm12_1", name: "Relations and Functions", class: "12" },
  { id: "jm12_2", name: "Inverse Trigonometric Functions", class: "12" },
  { id: "jm12_3", name: "Matrices", class: "12" },
  { id: "jm12_4", name: "Determinants", class: "12" },
  { id: "jm12_5", name: "Continuity and Differentiability", class: "12" },
  { id: "jm12_6", name: "Application of Derivatives", class: "12" },
  { id: "jm12_7", name: "Integrals", class: "12" },
  { id: "jm12_8", name: "Application of Integrals", class: "12" },
  { id: "jm12_9", name: "Differential Equations", class: "12" },
  { id: "jm12_10", name: "Vector Algebra", class: "12" },
  { id: "jm12_11", name: "Three Dimensional Geometry", class: "12" },
  { id: "jm12_12", name: "Linear Programming", class: "12" },
  { id: "jm12_13", name: "Probability", class: "12" },
];

// NEET Syllabus
const neetBiology11: Chapter[] = [
  { id: "nb11_1", name: "The Living World", class: "11" },
  { id: "nb11_2", name: "Biological Classification", class: "11" },
  { id: "nb11_3", name: "Plant Kingdom", class: "11" },
  { id: "nb11_4", name: "Animal Kingdom", class: "11" },
  { id: "nb11_5", name: "Morphology of Flowering Plants", class: "11" },
  { id: "nb11_6", name: "Anatomy of Flowering Plants", class: "11" },
  { id: "nb11_7", name: "Structural Organisation in Animals", class: "11" },
  { id: "nb11_8", name: "Cell: The Unit of Life", class: "11" },
  { id: "nb11_9", name: "Biomolecules", class: "11" },
  { id: "nb11_10", name: "Cell Cycle and Cell Division", class: "11" },
  { id: "nb11_11", name: "Photosynthesis in Higher Plants", class: "11" },
  { id: "nb11_12", name: "Respiration in Plants", class: "11" },
  { id: "nb11_13", name: "Plant Growth and Development", class: "11" },
  { id: "nb11_14", name: "Breathing and Exchange of Gases", class: "11" },
  { id: "nb11_15", name: "Body Fluids and Circulation", class: "11" },
  { id: "nb11_16", name: "Excretory Products and their Elimination", class: "11" },
  { id: "nb11_17", name: "Locomotion and Movement", class: "11" },
  { id: "nb11_18", name: "Neural Control and Coordination", class: "11" },
  { id: "nb11_19", name: "Chemical Coordination and Integration", class: "11" },
  { id: "nb11_20", name: "Digestion and Absorption", class: "11" },
  { id: "nb11_21", name: "Transport in Plants", class: "11" },
  { id: "nb11_22", name: "Mineral Nutrition", class: "11" },
];

const neetBiology12: Chapter[] = [
  { id: "nb12_1", name: "Reproduction in Organisms", class: "12" },
  { id: "nb12_2", name: "Sexual Reproduction in Flowering Plants", class: "12" },
  { id: "nb12_3", name: "Human Reproduction", class: "12" },
  { id: "nb12_4", name: "Reproductive Health", class: "12" },
  { id: "nb12_5", name: "Principles of Inheritance and Variation", class: "12" },
  { id: "nb12_6", name: "Molecular Basis of Inheritance", class: "12" },
  { id: "nb12_7", name: "Evolution", class: "12" },
  { id: "nb12_8", name: "Human Health and Disease", class: "12" },
  { id: "nb12_9", name: "Strategies for Enhancement in Food Production", class: "12" },
  { id: "nb12_10", name: "Microbes in Human Welfare", class: "12" },
  { id: "nb12_11", name: "Biotechnology: Principles and Processes", class: "12" },
  { id: "nb12_12", name: "Biotechnology and its Applications", class: "12" },
  { id: "nb12_13", name: "Organisms and Populations", class: "12" },
  { id: "nb12_14", name: "Ecosystem", class: "12" },
  { id: "nb12_15", name: "Biodiversity and Conservation", class: "12" },
  { id: "nb12_16", name: "Environmental Issues", class: "12" },
];

// Reuse physics/chemistry for NEET (same syllabus)
const neetPhysics11 = jeePhysics11.map(c => ({ ...c, id: c.id.replace("jp", "np") }));
const neetPhysics12 = jeePhysics12.map(c => ({ ...c, id: c.id.replace("jp", "np") }));
const neetChemistry11 = jeeChemistry11.map(c => ({ ...c, id: c.id.replace("jc", "nc") }));
const neetChemistry12 = jeeChemistry12.map(c => ({ ...c, id: c.id.replace("jc", "nc") }));

export const SYLLABUS: Record<ExamType, ExamSyllabus> = {
  JEE: {
    subjects: {
      Physics: { name: "Physics", chapters: [...jeePhysics11, ...jeePhysics12] },
      Chemistry: { name: "Chemistry", chapters: [...jeeChemistry11, ...jeeChemistry12] },
      Mathematics: { name: "Mathematics", chapters: [...jeeMaths11, ...jeeMaths12] },
    },
  },
  NEET: {
    subjects: {
      Physics: { name: "Physics", chapters: [...neetPhysics11, ...neetPhysics12] },
      Chemistry: { name: "Chemistry", chapters: [...neetChemistry11, ...neetChemistry12] },
      Biology: { name: "Biology", chapters: [...neetBiology11, ...neetBiology12] },
    },
  },
};

export function getSubjectsForExam(exam: ExamType): string[] {
  return Object.keys(SYLLABUS[exam].subjects);
}

export function getChaptersForSubject(exam: ExamType, subject: string, classLevel?: ClassLevel): Chapter[] {
  const chapters = SYLLABUS[exam].subjects[subject]?.chapters || [];
  if (classLevel) return chapters.filter(c => c.class === classLevel);
  return chapters;
}
