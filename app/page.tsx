import Link from "next/link";
import { formatPublished, listPosts } from "@/lib/posts";
import { seasonOfPost } from "@/lib/seasons";
import { SeasonBadge } from "@/components/season-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * The index. Generated from the posts on disk — there is no list to maintain and nothing here to
 * edit when a post is added. See `lib/posts.ts`. Newest first, so a scroll down the page walks
 * back through the seasons; each card carries its season badge, one colour per season.
 */
export default function Home() {
  const posts = listPosts();

  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground">
        No posts yet. Add one at <code>app/posts/&lt;slug&gt;/page.tsx</code>.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`} className="group block rounded-xl no-underline">
            <Card className="transition-colors group-hover:border-primary/50">
              <CardHeader className="gap-2">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <CardTitle className="text-xl leading-snug tracking-tight group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                  <SeasonBadge season={seasonOfPost(post)} />
                </div>
                <p className="text-sm text-muted-foreground">
                  <time dateTime={post.published}>{formatPublished(post.published)}</time>
                </p>
              </CardHeader>
              {post.blurb && (
                <CardContent>
                  <p className="text-[var(--prose-body)]">{post.blurb}</p>
                </CardContent>
              )}
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}