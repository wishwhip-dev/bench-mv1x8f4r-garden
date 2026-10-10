import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "winter-planning";

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
          src="/illustrations/winter-planning.svg"
          alt="An open notebook with next year's four-bed rotation sketched out, beside a seed tin and a pencil on the kitchen table"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          Every January the seed tin comes into the kitchen and refuses to leave. It is an old
          biscuit tin, and tipping it out onto the table is the most sobering horticultural
          exercise I know: there are eleven half-empty packets of carrots, of which at least
          four are past their best, two squash packets from a friend who grows far too many, and
          a foil sachet of celery seed bought in a moment of 2024 optimism that has never once
          been opened. The planning session starts as an audit and becomes an intervention.
        </p>
        <p>
          This year's big argument with myself is about the rotation. I have four raised beds
          and for three years I have run them as potatoes, roots, brassicas, legumes, shifting
          one place each spring. The problem is that the beds are not equal: the bed nearest the
          fence gets half the sun of the others from August onwards, and every year the
          tomatoes have crept closer to it. So the notebook plan this winter has the tomatoes
          promoted to the sunniest bed and the potatoes demoted to the shady one, where they
          will be harvested before the light goes anyway. It is the first plan drawn in three
          years that has not been redrawn by June in a previous life — I am choosing to be
          optimistic about that.
        </p>
        <h2>Lessons written into the margins</h2>
        <p>
          The margins of the notebook page carry last year's post-mortems, because memory is a
          liar in February. "Courgettes: two plants is one too many," says one. "Sow beans
          direct, April, after the beans in the trays got leggy," says another. The one I am
          most determined to honour is about the winter squash, which rampaged over the
          strawberry bed last summer and got away with it because I had planted it at the wrong
          end with no room left. This year it gets the compost heap corner and a fence to climb,
          and if it ignores that too, at least the strawberries will not be surprised.
        </p>
        <p>
          The audit also settles what gets ordered and what does not. The seed tin has enough
          decent kale, beetroot and lettuce for this year, so none of those go on the list.
          The parsnip seed is three seasons old and parsnip does not forgive that, so fresh
          seed goes on. And there is one wild card, because every plan needs one: a dwarf
          French bean with purple pods that turn green in the pan, bought entirely for the
          look of it and defended in the plan with the words "no justification required".
        </p>
        <p>
          By the time the kettle had been filled three times, the plan was done: four beds
          mapped, the squash banished, the garlic already in from December, and a shortlist of
          seven packets to buy and four to forgive myself for not using. The tin went back on
          the shelf lighter than it came down. Now the only thing left to do in January is
          nothing at all — the beds are asleep under their cardboard, and the next move is the
          seed order in early March.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
