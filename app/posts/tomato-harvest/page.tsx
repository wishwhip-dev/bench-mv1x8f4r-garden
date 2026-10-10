import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "tomato-harvest";

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
        <SeasonBadge season="autumn" />
        <PostHeader title={post.title} published={post.published} tags={post.tags} />
      </div>

      <figure className="overflow-hidden rounded-xl border border-border">
        <Image
          src="/illustrations/tomato-harvest.svg"
          alt="A trug heaped with ripe tomatoes in front of the bean fence, with a truss still hanging on the vine"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          The September round-up, weighed on the kitchen scales like all harvests here because
          guessing is how self-deception starts: eleven kilograms and four hundred grams off
          six plants of 'Gardener's Delight', picked between the 22nd of August and the 6th of
          September. The best single day was the 2nd, two kilos and change, most of it the
          three plants in the sunny bed that got the winter plan's one big promotion. The
          promoted plants out-yielded the others by roughly a third, which is the cleanest
          evidence yet for the great tomato relocation of 2026.
        </p>
        <p>
          The week was not all triumph. On the 30th of August the lowest leaves of the shadiest
          plant carried a brown patch I did not like at all — the right shape and the right
          smell for early blight, arriving on schedule with the first cold night. The whole
          lower third of that plant went into the council waste bin, not the compost, and the
          plants got a week of evening watering stopped entirely so the leaves went to bed
          dry. The patch did not spread past the pruned zone, and the plant sulked for a week
          and then went back to work. Whether that was the pruning or the luck, I could not
          tell you; the notebook just says "removed, watched, fine".
        </p>
        <h2>The counter situation</h2>
        <p>
          By the end of the first week of September the kitchen counter had stopped being a
          work surface and become a ripening rack — three bowls of fruit at various stages, the
          greenest ones next to the bananas to hurry them along. The rule in this house is
          that nothing goes in the fridge until it is fully red, because a half-ripe tomato
          refrigerated is a tomato that will never be interesting again. Two kilos went
          straight into the freezer whole, destined for sauce, because freezing is the one
          preservation method with no barrier to entry on a busy Tuesday.
        </p>
        <p>
          Six plants is still one more than we need, as the courgette lesson predicted it
          would be. Next year's notebook already says five, with the sixth slot given to
          tomatillos, a crop we have never grown, eaten once at a friend's table and thought
          about ever since. That is the balance the harvest exists to fund: one certainty,
          one experiment, and a kitchen that smells of tomato plants for a fortnight.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
