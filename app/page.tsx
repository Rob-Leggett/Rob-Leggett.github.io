import Link from "next/link";
import BlogFeed from "@/components/portfolio/blog/blog-feed";
import GitHubProjects from "@/components/portfolio/github/github-projects";
import Header from "@/app/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex flex-col gap-12 sm:gap-16 px-4 sm:px-6 lg:px-8">
        {/* Blog Section */}
        <section className="container mx-auto py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Latest Posts</h2>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>

          <div className="relative rounded-lg border border-border bg-muted/30">
            {/* scroll area */}
            <div className="max-h-[420px] sm:max-h-[520px] overflow-y-auto p-4 sm:p-6">
              <BlogFeed />
            </div>
            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/90 to-transparent rounded-b-lg" />
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Projects</h2>
            <a
              href="https://github.com/Rob-Leggett?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all →
            </a>
          </div>

          <div className="relative rounded-lg border border-border bg-muted/30">
            <div className="max-h-[420px] sm:max-h-[520px] overflow-y-auto p-4 sm:p-6">
              <GitHubProjects username="Rob-Leggett" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/90 to-transparent rounded-b-lg" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-xs text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} Rob Leggett
      </footer>
    </div>
  );
}