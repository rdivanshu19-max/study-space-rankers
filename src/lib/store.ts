export interface Material {
  id: string;
  name: string;
  link: string;
  types: string[];
  pinned: boolean;
  ratings: number[];
  ratingEnabled: boolean;
  createdAt: string;
}

export interface VaultItem {
  id: string;
  name: string;
  link: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  downloads: number;
  isAdmin: boolean;
  bookmarks: string[]; // material IDs
  streak: number;
  lastStudyDate: string; // ISO date string
}

export interface AppSettings {
  ratingEnabled: boolean;
}

const MATERIALS_KEY = "rankers_materials";
const VAULT_KEY = "rankers_vault";
const PROFILE_KEY = "rankers_profile";
const SETTINGS_KEY = "rankers_settings";
const THEME_KEY = "rankers_theme";
const TIMER_KEY = "rankers_timer";
const WEEKLY_STATS_KEY = "rankers_weekly_stats";

export interface DailyStudyTime {
  date: string; // ISO date YYYY-MM-DD
  seconds: number;
}

export function getWeeklyStudyStats(): DailyStudyTime[] {
  const data = localStorage.getItem(WEEKLY_STATS_KEY);
  const stats: DailyStudyTime[] = data ? JSON.parse(data) : [];
  const today = new Date();
  const days: DailyStudyTime[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const existing = stats.find((s) => s.date === dateStr);
    days.push({ date: dateStr, seconds: existing?.seconds || 0 });
  }
  return days;
}

export function addStudyTimeToday(seconds: number) {
  const data = localStorage.getItem(WEEKLY_STATS_KEY);
  const stats: DailyStudyTime[] = data ? JSON.parse(data) : [];
  const today = new Date().toISOString().split("T")[0];
  const existing = stats.find((s) => s.date === today);
  if (existing) {
    existing.seconds += seconds;
  } else {
    stats.push({ date: today, seconds });
  }
  // keep only last 30 days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = cutoff.toISOString().split("T")[0];
  const filtered = stats.filter((s) => s.date >= cutoffStr);
  localStorage.setItem(WEEKLY_STATS_KEY, JSON.stringify(filtered));
}

export function getMaterials(): Material[] {
  const data = localStorage.getItem(MATERIALS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveMaterials(materials: Material[]) {
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials));
}

export function addMaterial(material: Omit<Material, "id" | "ratings" | "createdAt">) {
  const materials = getMaterials();
  materials.push({
    ...material,
    id: crypto.randomUUID(),
    ratings: [],
    createdAt: new Date().toISOString(),
  });
  saveMaterials(materials);
}

export function deleteMaterial(id: string) {
  saveMaterials(getMaterials().filter((m) => m.id !== id));
}

export function togglePin(id: string) {
  const materials = getMaterials();
  const m = materials.find((x) => x.id === id);
  if (m) m.pinned = !m.pinned;
  saveMaterials(materials);
}

export function rateMaterial(id: string, rating: number) {
  const materials = getMaterials();
  const m = materials.find((x) => x.id === id);
  if (m) m.ratings.push(rating);
  saveMaterials(materials);
}

// Bookmarks
export function toggleBookmark(materialId: string) {
  const p = getProfile();
  if (!p.bookmarks) p.bookmarks = [];
  const idx = p.bookmarks.indexOf(materialId);
  if (idx >= 0) p.bookmarks.splice(idx, 1);
  else p.bookmarks.push(materialId);
  saveProfile(p);
}

export function isBookmarked(materialId: string): boolean {
  const p = getProfile();
  return (p.bookmarks || []).includes(materialId);
}

export function getBookmarkedMaterials(): Material[] {
  const p = getProfile();
  const ids = p.bookmarks || [];
  const materials = getMaterials();
  return materials.filter((m) => ids.includes(m.id));
}

// Study streak
export function updateStreak() {
  const p = getProfile();
  const today = new Date().toISOString().split("T")[0];
  if (p.lastStudyDate === today) return; // already updated today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (p.lastStudyDate === yesterday) {
    p.streak = (p.streak || 0) + 1;
  } else {
    p.streak = 1;
  }
  p.lastStudyDate = today;
  saveProfile(p);
}

export function getStreak(): number {
  const p = getProfile();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (p.lastStudyDate === today || p.lastStudyDate === yesterday) return p.streak || 0;
  return 0;
}

// Study timer
export function getStudyTimer(): number {
  return Number(localStorage.getItem(TIMER_KEY) || "0");
}

export function saveStudyTimer(seconds: number) {
  localStorage.setItem(TIMER_KEY, String(seconds));
}

export function getVault(): VaultItem[] {
  const data = localStorage.getItem(VAULT_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveVault(vault: VaultItem[]) {
  localStorage.setItem(VAULT_KEY, JSON.stringify(vault));
}

export function addVaultItem(name: string, link: string) {
  const vault = getVault();
  vault.push({ id: crypto.randomUUID(), name, link, createdAt: new Date().toISOString() });
  saveVault(vault);
}

export function deleteVaultItem(id: string) {
  saveVault(getVault().filter((v) => v.id !== id));
}

export function getProfile(): UserProfile {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : { name: "", bio: "", downloads: 0, isAdmin: false, bookmarks: [], streak: 0, lastStudyDate: "" };
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function incrementDownloads() {
  const p = getProfile();
  p.downloads++;
  saveProfile(p);
}

export function getSettings(): AppSettings {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : { ratingEnabled: true };
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getTheme(): "light" | "dark" {
  return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
}

export function saveTheme(theme: "light" | "dark") {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function initTheme() {
  const theme = getTheme();
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export const MATERIAL_TYPES = [
  "Lectures",
  "Lecture PDF",
  "Books",
  "PYQs",
  "JEE",
  "NEET",
  "Other Material",
  "Tests",
] as const;

export const MOTIVATIONAL_QUOTES = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Education is the most powerful weapon which you can use to change the world.",
  "Don't watch the clock; do what it does. Keep going.",
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Hard work beats talent when talent doesn't work hard.",
  "Dream it. Wish it. Do it.",
];
