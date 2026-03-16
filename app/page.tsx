import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ScrollableSection from "@/components/home/scrollable-section";
import BlogFeed from "@/components/blog/blog-feed";
import GitHubProjects from "@/components/github/github-projects";
import { WebSiteSchema, PersonSchema } from "@/components/seo/json-ld";
import JsonLd, { breadcrumbSchema } from "@/components/seo/json-ld";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <WebSiteSchema />
      <PersonSchema />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://robertleggett.com.au/" },
        ])}
      />
      <Header />

      <main className="flex flex-col gap-12 sm:gap-16 px-4 sm:px-6 lg:px-8">
        <ScrollableSection title="Latest Posts" viewAllHref="/blog">
          <BlogFeed />
        </ScrollableSection>

        <ScrollableSection
          title="Projects"
          viewAllHref="https://github.com/Rob-Leggett?tab=repositories"
          external
        >
          <GitHubProjects username="Rob-Leggett" />
        </ScrollableSection>
      </main>

      <Footer />
    </div>
  );
}