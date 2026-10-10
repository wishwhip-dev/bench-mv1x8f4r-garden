import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "pests";

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
        <SeasonBadge season="summer" />
        <PostHeader title={post.title} published={post.published} tags={post.tags} />
      </div>

      <figure className="overflow-hidden rounded-xl border border-border">
        <Image
          src="/illustrations/pests.svg"
          alt="Blackfly aphids clustered along a broad bean stem and leaves, with a ladybird climbing up to eat them"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          It began, as it always does, with a single shiny patch on one bean stem that I
          noticed on the 8th of July and did nothing about, because there were only a dozen
          blackfly and surely the ladybirds were coming. Ten days later there were colonies on
          every stem of the forty plants, the growing tips curled and black and glistening, and
          ants running up and down the row farming the thing like a livestock enterprise. This
          is the pest calendar's most reliable appointment and I keep failing to be ready for
          it, every single year.
        </p>
        <p>
          The first response was the one every book recommends and nobody enjoys: pinching out
          the growing tips once the beans have set, which removes the blackfly's favourite
          feeding ground. It works, and it is disgusting. The tips come off soft and wet and
          the blackfly come with them, on the fingers, under the nails. Forty plants later both
          hands smelled of crushed aphids and I had renewed respect for whoever first wrote
          this advice down. The tips went into the compost heap in a sealed bag rather than
          loose, because a bag of loose aphid tips is less of a sacrifice to the garden gods
          than a free transfer service.
        </p>
        <h2>The ladybird delay</h2>
        <p>
          The ladybirds did come, and they were worth the wait, but the timing is the lesson.
          For about a week the garden held two populations: one exploding, one arriving. By the
          22nd there were ladybirds on most stems, and by the 25th the colonies on the lower
          leaves had been reduced to husks and shed skins. Doing nothing, on top of the
          pinching-out, was the correct policy — but I will admit that on the 18th, at the
          worst point, I nearly drove to the garden centre for a spray. Waiting feels
          negligent right up until the moment it works.
        </p>
        <p>
          The slug front was quieter but not quiet. Beer traps in the carrot bed caught nine
          slugs on the first night and three a night thereafter, a decay curve that suggests
          the local population learned something or simply ran out. The real change for this
          year was the copper tape around the lettuce containers, which seems to work about
          two-thirds of the time — good enough that the third of the crop the slugs still reach
          can be called a share, rather than a loss.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
