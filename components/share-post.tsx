"use client";

import { useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * The Share control every post ends with.
 *
 * Opens a dialog with the post's full URL, a Copy link button and a visible "Copied"
 * confirmation. The URL stays in a selectable read-only field either way, so if the clipboard is
 * unavailable or refuses permission the link can still be selected and copied by hand. Where the
 * browser offers it, the native share sheet is offered too — that button only renders when
 * `navigator.share` exists. Escape closes the dialog (Radix), the Close button closes it, and
 * focus is handed back to the Share button on the way out.
 */
export function SharePost({ title }: Readonly<{ title: string }>) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [shareFailed, setShareFailed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleOpenChange(next: boolean) {
    if (next) {
      // Read the browser's idea of the address here rather than during render, so the
      // server HTML and the first client render still agree.
      setUrl(window.location.href);
      setCanNativeShare(typeof navigator.share === "function");
      setCopied(false);
      setCopyFailed(false);
      setShareFailed(false);
    }
    setOpen(next);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      // Clipboard permission denied, or the API is missing: the URL stays selectable below.
      setCopied(false);
      setCopyFailed(true);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
      setShareFailed(false);
    } catch (error) {
      // Cancelling the share sheet is normal and not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareFailed(true);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button ref={triggerRef} variant="outline" onClick={() => handleOpenChange(true)}>
          <Share2 aria-hidden="true" />
          Share this post
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Link2 aria-hidden="true" className="size-4" />
            Share this post
          </DialogTitle>
          <DialogDescription>Send someone the link to “{title}”.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="share-url">Post link</Label>
          <Input
            id="share-url"
            readOnly
            value={url}
            onFocus={(event) => event.target.select()}
            className="font-mono text-xs"
          />
          {copied && (
            <p className="flex items-center gap-1.5 text-sm text-primary" role="status">
              <Check aria-hidden="true" className="size-4" />
              Copied — the link is on your clipboard.
            </p>
          )}
          {copyFailed && (
            <p className="text-sm text-destructive" role="status">
              Copying did not work in this browser. Select the link above and copy it yourself.
            </p>
          )}
          {shareFailed && (
            <p className="text-sm text-destructive" role="status">
              Sharing did not go through. You can still copy the link above.
            </p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          {canNativeShare && (
            <Button variant="secondary" onClick={nativeShare}>
              <Share2 aria-hidden="true" />
              Share…
            </Button>
          )}
          <Button onClick={copyLink} disabled={copied}>
            {copied ? (
              <>
                <Check aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Link2 aria-hidden="true" />
                Copy link
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}