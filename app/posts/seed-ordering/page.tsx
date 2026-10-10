import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "seed-ordering";

export function generateMetadata(): Metadata {
  const post = getPost(SLUG);
  return { title: post?.title, description: post?.blurb };
}

export default function Page() {
  const post = getPost(SLUG);
  if (!post) notFound();

  return (
    <article className="space-y-8">
      <div className="space-y-3">
        <SeasonBadge season="spring" />
        <PostHeader title={post.title} published={post.published} tags={post.tags} />
      </div>

      <figure className="overflow-hidden rounded-xl border border-border">
        <Image
          src="/illustrations/seed-ordering.svg"
          alt="Seed catalogues, a pencil and a mug of tea spread across the kitchen table, two items circled in the order form"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          The seed catalogues arrive in the bleakest week of the year and are engineered, I am
          sure, by people who know exactly what they are doing. By lamplight in February, every
          tomato is a jewel and every squash a promise. This year three of them stacked up on
          the kitchen table at once, and the tea went cold twice while I went through them with
          the pencil, circling things and then, an hour later, un-circling them.
        </p>
        <p>
          The hard rule I keep failing is that the order must be governed by the kitchen, not
          the catalogue. We eat onions, carrots, beans and salads every week; we eat celeriac
          approximately never, whatever the photographs imply. So the final list was dull and
          correct: two onion varieties for different sowing times, one maincrop carrot, climbing
          beans, a row of beetroot, and the one extravagance — a second early potato in a
          different colour from last year's, purely because we liked them so much roasted.
        </p>
        <h2>Where the money actually goes</h2>
        <p>
          The interesting line on the order was not the vegetables at all. The seed total came
          to a little over thirty pounds; the sundries came to nearly as much. New fleece, after
          last year's version disintegrated into confetti in the April wind. Compost for the
          modules, because the beds under their cardboard will not be open in time for the first
          sowings. And a proper dial gauge for the water butt, because three years of peering
          into it and guessing has never once told me the truth. It is a reminder that the
          "cheap" hobby quietly spends its money on the plumbing rather than the plants.
        </p>
        <p>
          Everything arrived in nine days, in a box with a hand-stamped label and a free packet
          of something called micro-celery that nobody ordered and nobody will grow. The packets
          went into the tin, sorted by sowing month — a five-minute job that saves the whole
          spring — and the catalogues went to the recycling, un-circled for another year. The
          next entry in this diary will be written on a windowsill, with compost under the
          fingernails.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
