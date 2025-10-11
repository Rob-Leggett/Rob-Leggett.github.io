import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, FileText } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Header() {
  return (
    <header className="container mx-auto px-6 py-16 text-center flex flex-col items-center">
      {/* Avatar */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-6">
        <Image
          src="/avatar/headshot.png"
          alt="Rob Leggett"
          fill
          className="rounded-full object-cover border-4 border-gray-200 dark:border-neutral-800 shadow-md"
          priority
        />
      </div>

      {/* Name & Tagline */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
        Rob Leggett
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Building cloud platforms, AI/edge systems, and clean developer tooling.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
        <Button asChild className="rounded-full">
          <a href="mailto:contact@robertleggett.com.au">Contact</a>
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <a
            href="https://www.linkedin.com/in/rob-leggett/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button variant="secondary" asChild className="rounded-full">
          <a href="https://robertleggett.blog" target="_blank" rel="noreferrer">
            Blog <BookOpen className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
          <a
            href="https://resume.robertleggett.com.au"
            target="_blank"
            rel="noreferrer"
          >
            Resume App <FileText className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <a
            href="https://github.com/Rob-Leggett"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <SiGithub className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </header>
  );
}