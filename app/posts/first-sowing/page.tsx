import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostFooter } from "@/components/post-footer";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { SeasonBadge } from "@/components/season-badge";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "first-sowing";

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
          src="/illustrations/first-sowing.svg"
          alt="Seedling trays of young shoots lined up on a bright windowsill in March, the third tray only just sown"
          width={1200}
          height={800}
          unoptimized
          className="h-auto w-full"
        />
      </figure>

      <Prose>
        <p>
          The windowsill over the radiator is the only heated propagation space this garden has,
          and on the 14th of March it went from bookshelf to nursery in one afternoon. Twelve
          modules of tomatoes ('Gardener's Delight', every year, non-negotiable), six of the
          chillies that overwintered so badly last winter that only two survived, and a full
          tray of leeks sown thick as cress to be pricked out later. Seed compost, a pencil as a
          dibber, and the small ritual of labelling every single module, learned the hard way in
          the year I grew an entire tray of unidentified brassicas.
        </p>
        <p>
          Tomatoes were up in five days on the warm sill, which is faster than the packet
          promised and exactly as eager as they always are. The chillies took eleven days and
          then arrived all at once, eight of ten germinating, which for home-saved seed from a
          supermarket pepper's more respectable cousin is a result worth writing down. The
          leeks took nineteen days and looked like nothing at all for most of them — leeks are
          the crop that teaches patience by being boring.
        </p>
        <h2>The pricking-out reckoning</h2>
        <p>
          By the third week of April the tomato seedlings were 8 centimetres tall and leaning
          hard at the glass, which is the windowsill's way of telling you the system is at
          capacity. Pricking out day is a production line: a yoghurt pot of seed compost, a
          dibber, and 18 tomato seedlings lifted by a leaf — never the stem — and dropped into
          their own deep pots up to the seed leaves, which burying makes them root along the
          buried stem. The chillies, more delicate and far less forgiving of rough handling,
          got the gentlest of the two treatments.
        </p>
        <p>
          They spent the next fortnight hardening off on the step — out in the morning sun, in
          by dusk — because the last frost here is not safely past until mid-May, and the year
          I lost a whole tray of French beans to a late April frost is still fresh enough to
          keep me honest. The beds under their cardboard from December were opened up on the
          same weekend, and the soil underneath was dark, crumbly and full of worms, which is
          the whole argument for the lazy winter method in a single look.
        </p>
      </Prose>

      <SharePost title={post.title} />
      <PostFooter />
    </article>
  );
}
