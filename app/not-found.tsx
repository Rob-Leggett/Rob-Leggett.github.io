import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-extrabold tracking-tight text-primary mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Sorry, the page you are looking for does not exist or may have been
        moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
        >
          Go Home
        </Link>
        <Link
          href="/blog/"
          className="inline-flex items-center justify-center rounded-md border border-border px-6 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
        >
          Browse Blog
        </Link>
      </div>
    </div>
  );
}
