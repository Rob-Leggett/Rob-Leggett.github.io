import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 text-center px-6">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={160}
        height={35}
        className="dark:invert mb-8"
        priority
      />

      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
        Coming Soon
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mb-10">
        Something exciting is on the way. Stay tuned for the launch of my new site.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="mailto:contact@robertleggett.com.au"
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Contact Me
        </a>
        <a
          href="https://www.linkedin.com/in/rob-leggett/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Connect on LinkedIn
        </a>
      </div>

      <footer className="absolute bottom-6 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Rob Leggett. All rights reserved.
      </footer>
    </div>
  );
}