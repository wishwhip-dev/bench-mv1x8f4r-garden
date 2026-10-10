import type { Metadata } from "next";
import Link from "next/link";
import { PostFooter } from "@/components/post-footer";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { listPosts } from "@/lib/posts";
import { SEASONS, seasonOfPost, type Season } from "@/lib/seasons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who writes The Kitchen Garden, where the plot is, and what is in the beds season by season.",
};

const SEASON_IN_BEDS: Record<Season, string> = {
  spring: "Seedlings hardening off on the step, early potatoes going in, the first radishes and salads under fleece, and last year's garlic showing its first green spikes.",
  summer: "Climbing beans at the top of their poles, courgettes at maximum menace, tomatoes and chillies ripening in the sunniest bed, and lettuce successionally going to seed on schedule.",
  autumn: "Kale and beetroot standing into the first frosts, squash curing on the fence, apples off the neighbour's tree, and the beds emptying one by one.",
  winter: "Beds under cardboard and straw, two rows of garlic braving the frost, and nothing else but worms doing the year's quiet work underneath.",
};

const SEASON_BLURB: Record<Season, string> = {
  spring: "Seed orders, first sowings and the rush to get everything in",
  summer: "Watering triage, pests and the first proper harvests",
  autumn: "The main harvest, blight watch, and everything becoming jars",
  winter: "Putting the beds to bed, and planning next year's plan",
};

export default function AboutPage() {
  const posts = listPosts();
  const bySeason = new Map<Season, typeof posts>(SEASONS.map((season) => [season, []]));
  for (const post of posts) bySeason.get(seasonOfPost(post))?.push(post);

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          About the kitchen garden
        </h1>
        <p className="text-sm text-muted-foreground">
          Who writes this, where the plot is, and what gets written when.
        </p>
      </header>

      <Prose>
        <p>
          This is a small seasonal diary kept by me, Jo — one person, one garden, one notebook
          that is gradually falling apart. I am not a professional grower and nothing here is
          advice; it is a record of what was sown, what failed, what got picked and when, kept
          mainly so that next year's planning starts from facts instead of from memory, which
          (see the post on last year's courgettes) is not to be trusted.
        </p>
        <h2>The plot</h2>
        <p>
          The garden is a back plot in Sheffield, about six by nine metres of usable ground,
          holding four raised beds of roughly 1.2 by 3 metres plus a compost corner, a
          greenhouse that is really a large cold frame with delusions, and two water butts
          against the shed. The soil is heavy clay that three years of compost has turned into
          something approaching loam; it drains badly until it abruptly drains well. The long
          axis runs east–west, with a fence on the south side, which means the bed nearest that
          fence loses half its light from August onwards — the fact that rewrote this year's
          rotation plan.
        </p>
        <h2>What gets written through the year</h2>
        <p>
          The diary runs on the seasons rather than the calendar, roughly two entries per
          season: planning and first sowings in spring, the watering and pest battles in
          summer, the harvest and its preserving in autumn, and the closing-down and
          seed-tin accounting in winter. Each entry is short, dated honestly, and carries one
          drawing made on the day rather than a photograph, because the camera is always
          somewhere else when the interesting thing happens.
        </p>
      </Prose>

      <section aria-labelledby="in-the-beds" className="space-y-4">
        <h2 id="in-the-beds" className="text-2xl font-semibold tracking-tight">
          What is in the beds, season by season
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SEASONS.map((season) => {
            const seasonPosts = bySeason.get(season) ?? [];
            return (
              <Card key={season}>
                <CardHeader className="gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg capitalize">{season}</CardTitle>
                    <SeasonBadge season={season} />
                  </div>
                  <p className="text-sm text-muted-foreground">{SEASON_BLURB[season]}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-[var(--prose-body)]">{SEASON_IN_BEDS[season]}</p>
                  {seasonPosts.length > 0 ? (
                    <ul className="space-y-1.5">
                      {seasonPosts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/posts/${post.slug}`}
                            className="text-sm text-primary no-underline hover:underline"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No entries yet this season.</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <nav aria-label="Back to the diary" className="border-t border-border pt-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-primary no-underline hover:underline"
        >
          ← All posts
        </Link>
      </nav>
