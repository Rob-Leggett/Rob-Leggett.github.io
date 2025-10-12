import Image from "next/image";
import React from 'react';

type BlogLayoutProps = {
  title: string;
  date: string;
  feature_image?: string;
  children: React.ReactNode;
}

export default function BlogLayout({title, date, feature_image, children}: BlogLayoutProps) {
  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      {feature_image && (
        <div className="relative w-full h-64 sm:h-80 mb-8 rounded-xl overflow-hidden shadow">
          <Image
            src={feature_image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h1>

      <p className="text-sm text-gray-500 mb-10">
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="prose dark:prose-invert prose-lg prose-headings:font-semibold prose-img:rounded-xl prose-a:text-blue-600 dark:prose-a:text-blue-400">
        {children}
      </div>
    </article>
  );
}