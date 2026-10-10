import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "putting-the-beds-to-bed";

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
        <SeasonBadge season="winter" />
        <PostHeader title={post.title} published={post.published} tags={post.tags} />
      </div>

      <figure className="overflow-hidden rounded-xl border border-border">
        <Image
          src="/illustrations/beds-to-bed.svg"
          alt="Raised beds tucked under cardboard and straw on a frosty December morning, a bare tree and a parked wheelbarrow behind"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          The first proper frost came on the 14th of November this year, a week later than last
          winter but twice as sharp — the black tarp over the water butt had a skin of ice thick
          enough to lift off whole. That was the signal I had been putting off. The dahlias came
          out, the bean skeletons came down, and by the end of that weekend the plot looked
          strangely empty: four raised beds, two of them still holding the stumps of the
          late carrots, everything else scraped back to bare soil.
        </p>
        <p>
          I have settled on the laziest version of putting a bed to bed, and I stand by it. Any
          bed that is finished gets a layer of plain cardboard — the bike shop on the corner
          saves me its flat boxes, which are the perfect width for a 1.2 metre bed — wetted
          down, then covered with whatever organic matter is to hand. This year that was two
          full barrow-loads of half-rotted compost from the heap and a bale of straw left over
          from the allotment bonfire night. Cardboard smothers the winter annuals, the worms
          pull the wet underside down into the soil over the next three months, and by March
          the bed lifts up like a lid to reveal soil that is darker and crumblier than the soil
          I covered.
        </p>
        <h2>The one thing that goes in, not under</h2>
        <p>
          Garlic is the exception, because garlic does not care about frost. I planted two rows
          into the third bed on the 21st of November — fifteen cloves of a hardneck variety
          called 'Carcassonne Wight', fifteen centimetres apart, pushed a knuckle deep into soil
          that was so cold it hurt through the gloves. By the first week of December three of
          them had already thrown up a green spike, which feels like a taunt and is entirely
          normal. They sit under a light straw mulch now, just enough to stop the frost heaving
          them out of the ground.
        </p>
        <p>
          The last bed I deliberately left alone. It had the carrots in it this year, and I am
          trying to convince myself that leaving the root beds unimproved is the right call —
          carrots in fresh manure fork for themselves, literally. That bed gets its compost in
          February, right before the early sowings, and the cardboard can wait.
        </p>
        <h2>What winter is actually for</h2>
        <p>
          There is a temptation to think of December as the garden's full stop, but the beds
          under their covers are quietly doing the year's most important work, and so is the
          gardener. Frost breaks down the clods the October digging left behind. Worms take the
          cardboard down. And I get the one chore that makes spring bearable done early: the
          seed tin has been tipped out onto the kitchen table, the notebook is open, and the
          arguments about what goes where next year have already started.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
