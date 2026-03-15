import React from "react";

type ScrollableSectionProps = {
  title: string;
  viewAllHref: string;
  viewAllLabel?: string;
  external?: boolean;
  children: React.ReactNode;
};

export default function ScrollableSection({
  title,
  viewAllHref,
  viewAllLabel = "View all →",
  external = false,
  children,
}: ScrollableSectionProps) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <section className="container mx-auto py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
        <a
          href={viewAllHref}
          className="text-sm font-medium text-primary hover:underline"
          {...linkProps}
        >
          {viewAllLabel}
        </a>
      </div>

      <div className="relative rounded-lg border border-border bg-muted/30">
        <div className="max-h-[420px] sm:max-h-[520px] xl:max-h-[680px] overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/90 to-transparent rounded-b-lg" />
      </div>
    </section>
  );
}
