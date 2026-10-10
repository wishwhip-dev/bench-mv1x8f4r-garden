import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "preserving";

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
          src="/illustrations/preserving.svg"
          alt="Three labelled jars of chutney cooling on a kitchen counter beside a big preserving pan, with a bowl of chopped tomatoes"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          The first weekend of October is the preserving weekend, fixed by tradition rather
          than by any authority, and it exists because the harvest has no patience. Two
          kilograms of the riper tomatoes would have gone soft within the week, so on Saturday
          they became sauce: halved, roasted for forty minutes with a head of garlic and a
          slosh of olive oil, then pushed through a sieve until the kitchen smelled like a
          good restaurant's back door. Four jars of passata went into the cupboard, and the
          skins and seeds went to the compost with the satisfaction of waste avoided.
        </p>
        <p>
          Sunday was chutney day, which is less a recipe than a controlled argument between
          fruit, sugar and vinegar. Two kilos of green tomatoes — the ones the September sun
          never convinced — with cooking apples from the tree in the neighbour's garden, brown
          sugar, sultanas, and more malt vinegar than seemed wise. It simmered for two and a
          half hours, during which stirring is not optional unless you enjoy the smell of
          burnt sugar, and filled six jars. The rule of thumb that a spoonful drawn across the
          pan's base should leave a trail that closes slowly is one of the few pieces of
          kitchen folklore I have found to be exactly true.
        </p>
        <h2>The freezer ledger</h2>
        <p>
          The freezer is the third method and the most honest. Runner beans, sliced and
          blanched for two minutes, filled eight bags; broad beans from the July row that got
          past us, shelled, filled two more; and the last of the chillies went in whole, to be
          thrown into winter stews straight from frozen. Everything is labelled with the month
          because January-me does not trust October-me to remember what the unlabeled bags
          are, and January-me is right.
        </p>
        <p>
          By Sunday evening the cupboard had nine new jars, the freezer had ten new bags, and
          the beds were nearly empty of anything worth picking — just the kale and the last
          beetroot standing. The season's accounting closes the way it always does: more jars
          than we will strictly need of the things we grew too much of, just enough of the
          things we eat weekly, and the first frost forecast already on the news. The next
          entry in this diary will be written in woolly gloves.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
