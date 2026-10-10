import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * The two links every post ends with, so no post is a dead end: back to the index, and on to the
 * About page.
 */
export function PostFooter() {
  return (
    <nav
      aria-label="More from the diary"
      className="flex flex-col gap-3 border-t border-border pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-primary no-underline hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        All posts
      </Link>
      <Link
        href="/about"
        className="inline-flex min-h-11 items-center gap-2 text-primary no-underline hover:underline"
      >
        About the kitchen garden
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </nav>
  );
}
