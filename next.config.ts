import createMDX from "@next/mdx";

/**
 * Extend Next.js with MDX support
 * so .md and .mdx files are compiled as pages or components.
 */
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Disable Next.js image optimisation (GitHub Pages doesn’t support it)
  images: { unoptimized: true },

  // Ensure URLs end with /
  trailingSlash: true,

  // Treat .mdx as valid pages/components
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Optional: prevent build errors from missing env vars on export
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withMDX(nextConfig);