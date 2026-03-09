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
}

export interface AppSettings {
  ratingEnabled: boolean;
}

const MATERIALS_KEY = "rankers_materials";
const VAULT_KEY = "rankers_vault";
const PROFILE_KEY = "rankers_profile";
const SETTINGS_KEY = "rankers_settings";
const THEME_KEY = "rankers_theme";

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
  return data ? JSON.parse(data) : { name: "", bio: "", downloads: 0, isAdmin: false };
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
