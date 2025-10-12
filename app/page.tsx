import BlogFeed from "@/components/portfolio/blog/blog-feed";
import GitHubProjects from "@/components/portfolio/github/github-projects";
import Header from "@/app/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex flex-col gap-12 sm:gap-16 px-4 sm:px-6 lg:px-8">
        {/* Blog Section */}
        <section className="container mx-auto py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-neutral-800 pb-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Latest Posts</h2>
            <a href="/blog" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View all →
            </a>
          </div>

          <div className="relative rounded-lg border border-gray-100 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-800/30">
            {/* scroll area */}
            <div className="max-h-[420px] sm:max-h-[520px] overflow-y-auto p-4 sm:p-6">
              <BlogFeed />
            </div>
            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/90 dark:from-neutral-900/90 to-transparent rounded-b-lg" />
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-neutral-800 pb-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Projects</h2>
            <a
              href="https://github.com/Rob-Leggett?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all →
            </a>
          </div>

          <div className="relative rounded-lg border border-gray-100 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-800/30">
            <div className="max-h-[420px] sm:max-h-[520px] overflow-y-auto p-4 sm:p-6">
              <GitHubProjects username="Rob-Leggett" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/90 dark:from-neutral-900/90 to-transparent rounded-b-lg" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-800">
        © {new Date().getFullYear()} Rob Leggett
      </footer>
    </div>
  );
}