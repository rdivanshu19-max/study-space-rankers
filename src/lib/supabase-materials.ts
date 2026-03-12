import { supabase } from "@/integrations/supabase/client";

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

export interface AppSettings {
  ratingEnabled: boolean;
}

// Convert DB row to app Material
function toMaterial(row: any): Material {
  return {
    id: row.id,
    name: row.name,
    link: row.link,
    types: row.types || [],
    pinned: row.pinned,
    ratings: row.ratings || [],
    ratingEnabled: row.rating_enabled,
    createdAt: row.created_at,
  };
}

export async function fetchMaterials(): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
  return (data || []).map(toMaterial);
}

export async function addMaterialDB(material: {
  name: string;
  link: string;
  types: string[];
  pinned: boolean;
  ratingEnabled: boolean;
}) {
  const { error } = await supabase.from("materials").insert({
    name: material.name,
    link: material.link,
    types: material.types,
    pinned: material.pinned,
    rating_enabled: material.ratingEnabled,
  });
  if (error) console.error("Error adding material:", error);
}

export async function deleteMaterialDB(id: string) {
  const { error } = await supabase.from("materials").delete().eq("id", id);
  if (error) console.error("Error deleting material:", error);
}

export async function togglePinDB(id: string, currentPinned: boolean) {
  const { error } = await supabase
    .from("materials")
    .update({ pinned: !currentPinned })
    .eq("id", id);
  if (error) console.error("Error toggling pin:", error);
}

export async function rateMaterialDB(id: string, currentRatings: number[], rating: number) {
  const newRatings = [...currentRatings, rating];
  const { error } = await supabase
    .from("materials")
    .update({ ratings: newRatings })
    .eq("id", id);
  if (error) console.error("Error rating material:", error);
}

export async function toggleMaterialRatingDB(id: string, currentEnabled: boolean) {
  const { error } = await supabase
    .from("materials")
    .update({ rating_enabled: !currentEnabled })
    .eq("id", id);
  if (error) console.error("Error toggling rating:", error);
}

export async function fetchSettings(): Promise<AppSettings> {
  const { data, error } = await supabase
    .from("app_settings")
    .select("*")
    .eq("key", "ratingEnabled")
    .single();
  if (error || !data) return { ratingEnabled: true };
  return { ratingEnabled: data.value === true || data.value === "true" };
}

export async function toggleGlobalRatingDB(currentEnabled: boolean) {
  const newVal = !currentEnabled;
  const { error } = await supabase
    .from("app_settings")
    .update({ value: newVal as any })
    .eq("key", "ratingEnabled");
  if (error) console.error("Error toggling global rating:", error);
}
