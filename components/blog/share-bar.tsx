"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";

type ShareBarProps = {
  title: string;
};

export default function ShareBar({ title }: ShareBarProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Share on X",
      icon: Twitter,
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!url) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-muted-foreground mr-1">
        Share
      </span>
      {shareLinks.map(({ label, icon: Icon, href }) => (
        <Button
          key={label}
          variant="outline"
          size="icon-sm"
          asChild
          title={label}
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Icon className="size-4" />
          </a>
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Link2 className="size-4" />
        )}
      </Button>
    </div>
  );
}
