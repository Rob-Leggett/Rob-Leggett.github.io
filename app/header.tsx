"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, FileText, Linkedin } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Header() {
  return (
    <header className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-neutral-900/5 dark:via-neutral-100/5 to-transparent" />
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-blue-500/10 blur-3xl rounded-full opacity-25" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative mx-auto sm:mx-0 w-32 h-32 sm:w-40 sm:h-40"
        >
          <Image
            src="/avatar/headshot.png"
            alt="Rob Leggett"
            fill
            priority
            className="rounded-full object-cover border border-blue-400/40 shadow-[0_0_25px_-6px_rgba(59,130,246,0.5)]"
          />
        </motion.div>

        {/* Right side: text + actions */}
        <div className="mt-6 sm:mt-0 flex-1 text-center sm:text-left">
          <motion.h1
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100"
          >
            Rob Leggett
          </motion.h1>

          {/* Executive tagline */}
          <motion.p
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="mt-2 text-[0.95rem] sm:text-base text-gray-700 dark:text-gray-300"
          >
            Hands-on technology and strategy leader shaping the future of{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              cloud and AI.
            </span>
          </motion.p>

          {/* Technical tagline */}
          <motion.p
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="mt-2 text-[0.95rem] text-gray-600 dark:text-gray-400 leading-snug"
          >
            <span className="font-mono text-blue-500 dark:text-blue-400">{`>`}</span>{" "}
            Delivering intelligent cloud platforms, edge AI systems, and modern developer
            infrastructure.
          </motion.p>

          <motion.p
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="mt-2 text-[0.95rem] text-gray-600 dark:text-gray-400 leading-snug"
          >
            <span className="font-mono text-blue-500 dark:text-blue-400">{`>`}</span>{" "}
            Building intelligent cloud platforms, delivering edge AI systems, and the next generation of{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              developer infrastructure.
            </span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.25 }}
            className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2.5"
          >
            {/* Contact */}
            <Button
              asChild
              className="h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4"
            >
              <a href="mailto:contact@robertleggett.com.au">
                <Mail className="mr-2 h-4 w-4" /> Contact
              </a>
            </Button>

            {/* Resume */}
            <Button
              asChild
              variant="outline"
              className="h-9 rounded-full px-4 border-blue-500/30 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <a
                href="/resume/robert-leggett-resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <FileText className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                Resume
              </a>
            </Button>

            {/* LinkedIn */}
            <Button
              variant="outline"
              asChild
              className="h-9 rounded-full px-4 border-blue-500/30"
            >
              <a
                href="https://www.linkedin.com/in/rob-leggett/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                LinkedIn
              </a>
            </Button>

            {/* GitHub */}
            <Button
              variant="outline"
              asChild
              className="h-9 rounded-full px-4 border-gray-400/30"
            >
              <a
                href="https://github.com/Rob-Leggett"
                target="_blank"
                rel="noreferrer"
              >
                <SiGithub className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          </motion.div>

          {/* Terminal line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.25 }}
            className="mt-3 font-mono text-[12px] sm:text-[13px] text-gray-500 dark:text-gray-400"
          >
            <span className="text-green-500">rob@dev</span>:~$
            <span className="ml-2 text-blue-500">building-next-gen-cloud</span>
            <span className="ml-1 inline-block animate-[blink_1.2s_steps(2,start)_infinite]">
              ▌
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}