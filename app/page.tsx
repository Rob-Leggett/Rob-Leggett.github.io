import BlogFeed from "@/components/portfolio/blog/blog-feed";
import GitHubProjects from "@/components/portfolio/github/github-projects";
import Header from "@/app/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      {/* Hero / Header */}
      <Header />

      <main className="flex flex-col gap-16 sm:gap-20">
        {/* Blog Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-semibold">Latest Posts</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2 sm:mt-0"
            >
              View all →
            </a>
          </div>

          {/* Grid Preview (auto wraps on mobile) */}
          <div className="max-h-[550px] overflow-y-auto pb-2">
            <BlogFeed />
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-neutral-800 mx-auto w-11/12" />

        {/* Projects Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <a
              href="https://github.com/Rob-Leggett?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2 sm:mt-0"
            >
              View all →
            </a>
          </div>

          <div className="max-h-[550px] overflow-y-auto pb-2">
            <GitHubProjects username="Rob-Leggett" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-800">
        © {new Date().getFullYear()} Rob Leggett
      </footer>
    </div>
  );
}