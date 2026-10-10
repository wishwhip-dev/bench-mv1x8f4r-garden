import { Badge } from "@/components/ui/badge";
import { SEASON_COLOURS, type Season } from "@/lib/seasons";

/**
 * A season badge. Each season gets its own colour, on the index cards and above each post, so
 * the year is visible at a glance as the seasons pass.
 */
export function SeasonBadge({ season }: Readonly<{ season: Season }>) {
  const colours = SEASON_COLOURS[season];
  return (
    <Badge
      variant="outline"
      className="capitalize"
      style={{
        backgroundColor: colours.background,
        color: colours.foreground,
        borderColor: colours.border,
      }}
    >
      {season}
    </Badge>
  );
}
