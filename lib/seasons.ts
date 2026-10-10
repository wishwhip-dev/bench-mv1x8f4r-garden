/**
 * Seasons for the diary.
 *
 * Each post tags itself with one of the four season names in its `meta.json`, so the season a
 * post belongs to is the writer's decision, not something inferred. The month fallback exists so
 * an untagged post still shows something honest rather than nothing. The four badge colours are
 * the diary's own accents — one per season, deliberately distinct so a scroll down the index
 * reads as the year passing.
 */
export const SEASONS = ["spring", "summer", "autumn", "winter"] as const;

export type Season = (typeof SEASONS)[number];

/** Meteorological seasons by month, 1–12: winter Dec–Feb, spring Mar–May, and so on. */
export function seasonOfMonth(month: number): Season {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

/** The season a post belongs to: its season tag if it has one, otherwise its month. */
export function seasonOfPost(post: { tags: string[]; published: string }): Season {
  const tagged = post.tags.find((tag): tag is Season => (SEASONS as readonly string[]).includes(tag));
  if (tagged) return tagged;
  const month = Number.parseInt(post.published.slice(5, 7), 10);
  if (month >= 1 && month <= 12) return seasonOfMonth(month);
  return "winter";
}

/** One distinct colour per season, for the badges on the index and the post pages. */
export const SEASON_COLOURS: Record<Season, { background: string; foreground: string; border: string }> = {
  spring: { background: "#2c401d", foreground: "#b8e07f", border: "#5a7a3a" },
  summer: { background: "#4a3a12", foreground: "#ecc96b", border: "#7a6830" },
  autumn: { background: "#4a2612", foreground: "#e8a468", border: "#7a4a28" },
  winter: { background: "#173242", foreground: "#8ecfe6", border: "#2f5a70" },
};
