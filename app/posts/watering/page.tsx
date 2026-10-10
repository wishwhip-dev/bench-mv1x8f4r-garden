import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "watering";

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
          src="/illustrations/watering.svg"
          alt="A watering can sprinkling a raised bed of young seedlings under a June sun, the soil darkened where the water has landed"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          It did not rain between the 6th and the 27th of June, twenty-one days of it, and the
          garden turned from the colour of health to the colour of a school cricket pitch in
          about four. By the second week both water butts — 350 litres between them — were down
          to the dregs and the algae, and the daily round became a triage exercise: the
          tomatoes and the beans got the water, the established kale and the herbs got none at
          all, and everything in between was judged by the droop test at seven in the evening.
        </p>
        <p>
          The droop test is not as scientific as it sounds, but it is better than watering by
          the clock. Leaves that flag at four in the afternoon and recover by seven are
          handling it; leaves still flat the next morning are not. The great discovery of the
          dry spell was that the beds under last winter's straw mulch held on three or four
          days longer than the bare ones — the topsoil under the straw was still cool and damp
          when the exposed soil beside it had gone to dust. Mulching is one of those chores
          that feels optional right up until the month it is not.
        </p>
        <h2>Half of what I believed was wrong</h2>
        <p>
          The dry spell also falsified half of my own folklore. I had always believed a good
          soak every evening was the generous thing to do; in fact a nightly sprinkle keeps
          every root in the top centimetre of soil, exactly the zone that dries out first. The
          beds that coped best got one proper soak — a full can per plant, poured slow enough
          to sink in — twice a week, and the difference in the tomatoes was visible within
          days. Watering little and often, it turns out, is training the garden to be needy.
        </p>
        <p>
          The other half-truth was about the hose. On a small plot, a watering can is not a
          deprivation, it is a meter: four litres takes thirty seconds to pour and I know
          exactly where it went. The one exception is the runner beans, which turned out to
          drink like a row of marathon runners in flower — they got the hose, every other
          evening, and repaid it with so many flowers that the pollinators worked the row in
          shifts. The rain came back on the 27th, three hours after I refilled both butts from
          the tap out of caution, which felt less like prudence and more like a personal joke.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
