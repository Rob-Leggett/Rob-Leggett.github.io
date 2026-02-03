import Image from "next/image";
import React from "react";

type BlogLayoutProps = {
  title: string;
  date: string;
  feature_image?: string;
  children: React.ReactNode;
};

export default function BlogLayout({
   title,
   date,
   feature_image,
   children,
 }: BlogLayoutProps) {
  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl min-h-screen bg-background text-foreground">
      {/* Feature image */}
      {feature_image && (
        <div className="relative w-full h-56 sm:h-72 mb-10 overflow-hidden rounded-xl border border-border shadow-sm">
          <Image
            src={feature_image}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3 leading-tight">
        {title}
      </h1>

      {/* Date */}
      <p className="text-sm text-muted-foreground mb-10 border-b border-border pb-4">
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Body */}
      <div
        className="prose dark:prose-invert prose-lg prose-pre:bg-card prose-pre:text-card-foreground
                   prose-code:text-primary
                   prose-headings:font-semibold prose-img:rounded-lg
                   prose-a:text-primary
                   prose-hr:border-border
                   prose-blockquote:border-l-primary/70
                   prose-blockquote:text-muted-foreground
                   transition-colors duration-300"
      >
        {children}
      </div>
    </article>
  );
}