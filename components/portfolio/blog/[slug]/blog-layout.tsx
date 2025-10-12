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
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      {/* Feature image */}
      {feature_image && (
        <div className="relative w-full h-56 sm:h-72 mb-10 overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm">
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
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-3 leading-tight">
        {title}
      </h1>

      {/* Date */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 border-b border-gray-200 dark:border-neutral-800 pb-4">
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Body */}
      <div
        className="prose dark:prose-invert prose-lg prose-pre:bg-neutral-900 prose-pre:text-gray-100
                   prose-code:text-blue-500 dark:prose-code:text-blue-400
                   prose-headings:font-semibold prose-img:rounded-lg
                   prose-a:text-blue-600 dark:prose-a:text-blue-400
                   prose-hr:border-gray-200 dark:prose-hr:border-neutral-800
                   prose-blockquote:border-l-blue-400/70 dark:prose-blockquote:border-l-blue-500/50
                   prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                   transition-colors duration-300"
      >
        {children}
      </div>
    </article>
  );
}