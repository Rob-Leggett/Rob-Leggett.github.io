"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { motion } from "framer-motion";

type TerminalLine = {
  type: "prompt" | "output" | "error" | "info" | "ascii";
  content: string;
};

const PROMPT_USER = "rob@dev";
const PROMPT_FULL = `${PROMPT_USER}:~$ `;

const WELCOME_LINES: TerminalLine[] = [
  {
    type: "info",
    content: "Welcome to Rob's terminal! Type 'help' for available commands.",
  },
];

const HELP_OUTPUT = [
  "Available commands:",
  "",
  "  whoami        Who is Rob?",
  "  about         Professional summary",
  "  skills        Technical skills",
  "  experience    Career highlights",
  "  certs         Certifications",
  "  blog          Recent blog posts",
  "  contact       Get in touch",
  "  neofetch      System info",
  "  ls [dir]      List files",
  "  cat <file>    Read a file",
  "  pwd           Current directory",
  "  date          Current date/time",
  "  echo <msg>    Echo a message",
  "  clear         Clear terminal",
  "  history       Command history",
  "  exit          Close terminal",
  "",
  "  Tip: ↑/↓ for history, Esc to close, Ctrl+L to clear",
];

const COMMANDS: Record<string, (args: string[]) => string[]> = {
  help: () => HELP_OUTPUT,

  whoami: () => [
    "Robert Leggett",
    "Technology Leader & Cloud Architect",
    "Melbourne, Australia",
  ],

  about: () => [
    "Hands-on technology and strategy leader with 20+ years experience",
    "building cloud-native platforms, leading high-performing engineering",
    "teams, and driving AI/ML adoption across enterprise organisations.",
    "",
    "Currently focused on intelligent cloud platforms, edge AI, and",
    "developer infrastructure at scale.",
  ],

  skills: () => [
    "─── Languages ──────────────────────────────────",
    "  TypeScript · Java · Python · Go · C#",
    "",
    "─── Cloud & Infrastructure ─────────────────────",
    "  AWS · Azure · GCP · Terraform · CDK · Docker · K8s",
    "",
    "─── AI & ML ────────────────────────────────────",
    "  LLMs · RAG · AI Agents · Prompt Engineering · MLOps",
    "",
    "─── Architecture ───────────────────────────────",
    "  Microservices · Event-Driven · Serverless · Edge",
    "",
    "─── Leadership ─────────────────────────────────",
    "  Team Building · Agile · DevOps · Platform Engineering",
  ],

  experience: () => [
    "─── Career Timeline ────────────────────────────",
    "",
    "  Senior Engineering Manager    2020 — Present",
    "  Engineering Manager           2018 — 2020",
    "  Lead Software Engineer        2015 — 2018",
    "  Senior Software Engineer      2012 — 2015",
    "  Software Engineer             2009 — 2012",
    "",
    "  Specialising in cloud platforms, AI/ML systems,",
    "  and high-performing engineering teams.",
  ],

  certs: () => [
    "─── AWS Certifications ─────────────────────────",
    "  ✓ Solutions Architect — Professional",
    "  ✓ DevOps Engineer — Professional",
    "  ✓ Solutions Architect — Associate",
    "  ✓ Developer — Associate",
    "  ✓ Security — Specialty",
    "",
    "─── Azure Certifications ───────────────────────",
    "  ✓ Solutions Architect Expert",
  ],

  blog: () => [
    "─── Recent Posts ───────────────────────────────",
    "",
    "  demystifying-large-language-models.mdx",
    "  building-ai-powered-applications-in-the-cloud.mdx",
    "  the-rise-of-ai-agents.mdx",
    "  retrieval-augmented-generation-rag.mdx",
    "  responsible-ai-building-trust.mdx",
    "  ai-at-the-edge-bringing-intelligence-closer.mdx",
    "  prompt-engineering-art-and-science.mdx",
    "",
    "  Visit robertleggett.com.au/blog for all 37 posts",
  ],

  contact: () => [
    "─── Get in Touch ───────────────────────────────",
    "",
    "  ✉  contact@robertleggett.com.au",
    "  🔗 linkedin.com/in/rob-leggett",
    "  🔗 github.com/Rob-Leggett",
    "  🌐 robertleggett.com.au",
  ],

  pwd: () => ["/home/rob/portfolio"],

  date: () => [
    new Date().toLocaleString("en-AU", {
      dateStyle: "full",
      timeStyle: "short",
    }),
  ],

  echo: (args) => [args.join(" ") || ""],

  neofetch: () => [
    "",
    "  ██████╗   ██████╗  ██████╗ ",
    "  ██╔══██╗ ██╔═══██╗ ██╔══██╗",
    "  ██████╔╝ ██║   ██║ ██████╔╝",
    "  ██╔══██╗ ██║   ██║ ██╔══██╝",
    "  ██║  ██║ ╚██████╔╝ ██████║ ",
    "  ╚═╝  ╚═╝  ╚═════╝  ╚═════╝",
    "",
    "  rob@dev",
    "  ─────────────────────────────",
    "  Role      Technology Leader",
    "  Cloud     AWS · Azure · GCP",
    "  Stack     TypeScript · Java · Python · Go",
    "  AI/ML     LLMs · RAG · Agents · Edge AI",
    "  Certs     AWS ×5 · Azure ×1",
    "  Blog      37 posts",
    "  Site      robertleggett.com.au",
    "",
  ],

  ls: (args) => {
    const dir = args[0];
    if (!dir)
      return ["about.txt  skills.txt  certs.txt  contact.txt  blog/"];
    if (dir === "blog" || dir === "blog/") return COMMANDS.blog([]);
    return [`ls: cannot access '${dir}': No such file or directory`];
  },

  cat: (args) => {
    const file = args[0];
    if (!file)
      return [
        "Usage: cat <filename>",
        "Try: cat about.txt, cat skills.txt, cat certs.txt",
      ];
    const files: Record<string, () => string[]> = {
      "about.txt": () => COMMANDS.about([]),
      "skills.txt": () => COMMANDS.skills([]),
      "certs.txt": () => COMMANDS.certs([]),
      "contact.txt": () => COMMANDS.contact([]),
    };
    const handler = files[file];
    if (handler) return handler();
    return [
      `cat: ${file}: No such file or directory`,
      "Available: about.txt, skills.txt, certs.txt, contact.txt",
    ];
  },

  sudo: () => [
    "Nice try! 🔒 Access denied — this is a read-only terminal.",
  ],

  rm: () => [
    "Nice try! 🗑️  Nothing to delete — everything is statically generated.",
  ],

  // Placeholders for specially handled commands
  clear: () => [],
  exit: () => [],
  history: () => [],
};

export function InteractiveTerminal() {
  const [phase, setPhase] = useState<"typing" | "idle" | "active">("typing");
  const [typedText, setTypedText] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fullText = "building-next-gen-cloud";

  // Typing animation
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("idle"), 600);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [phase]);

  // Auto-scroll terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when active
  useEffect(() => {
    if (phase === "active") {
      // Small delay to let the DOM render
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [phase, lines]);

  const activate = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("active");
    setLines([
      { type: "prompt", content: `${PROMPT_FULL}${fullText}` },
      ...WELCOME_LINES,
    ]);
  }, [phase]);

  const executeCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();

      if (!trimmed) {
        setLines((prev) => [...prev, { type: "prompt", content: PROMPT_FULL }]);
        return;
      }

      const [cmd, ...args] = trimmed.split(/\s+/);
      const lowerCmd = cmd.toLowerCase();

      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      // Prompt echo
      const newLines: TerminalLine[] = [
        { type: "prompt", content: `${PROMPT_FULL}${trimmed}` },
      ];

      // Special commands
      if (lowerCmd === "clear") {
        setLines([]);
        return;
      }
      if (lowerCmd === "exit") {
        setPhase("idle");
        setLines([]);
        return;
      }
      if (lowerCmd === "history") {
        const hist = [...commandHistory, trimmed];
        newLines.push(
          ...hist.map((c, i) => ({
            type: "output" as const,
            content: `  ${String(i + 1).padStart(3)}  ${c}`,
          }))
        );
        setLines((prev) => [...prev, ...newLines]);
        return;
      }

      // Standard commands
      const handler = COMMANDS[lowerCmd];
      if (handler) {
        const output = handler(args);
        const outputType = lowerCmd === "neofetch" ? "ascii" : "output";
        newLines.push(
          ...output.map((line) => ({
            type: outputType as TerminalLine["type"],
            content: line,
          }))
        );
      } else {
        newLines.push({
          type: "error",
          content: `command not found: ${cmd}. Type 'help' for available commands.`,
        });
      }

      setLines((prev) => [...prev, ...newLines]);
    },
    [commandHistory]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        executeCommand(currentInput);
        setCurrentInput("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIdx =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIdx);
          setCurrentInput(commandHistory[newIdx]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIdx = historyIndex + 1;
          if (newIdx >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentInput("");
          } else {
            setHistoryIndex(newIdx);
            setCurrentInput(commandHistory[newIdx]);
          }
        }
      } else if (e.key === "Escape") {
        setPhase("idle");
        setLines([]);
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      }
    },
    [currentInput, executeCommand, commandHistory, historyIndex]
  );

  // ─── Collapsed view (typing / idle) ──────────────────────────────
  if (phase !== "active") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: phase === "typing" ? 0.5 : 0, duration: 0.25 }}
        className="mt-3 font-mono text-[12px] sm:text-[13px] text-muted-foreground cursor-pointer group"
        onClick={activate}
        role={phase === "idle" ? "button" : undefined}
        tabIndex={phase === "idle" ? 0 : undefined}
        onKeyDown={
          phase === "idle"
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") activate();
              }
            : undefined
        }
        title={phase === "idle" ? "Click to open terminal" : undefined}
      >
        <span className="text-primary">{PROMPT_USER}</span>
        <span>:~$ </span>
        <span className="text-primary/80">
          {phase === "typing" ? typedText : fullText}
        </span>
        <span className="ml-0.5 inline-block animate-[blink_1.2s_steps(2,start)_infinite]">
          ▌
        </span>
        {phase === "idle" && (
          <span className="ml-3 text-[10px] text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
            click to interact
          </span>
        )}
      </motion.div>
    );
  }

  // ─── Expanded terminal ────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0.8, height: 28 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.2 }}
      className="mt-3 font-mono text-[12px] sm:text-[13px] rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted/50 border-b border-border/40 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.82_0.16_85)]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
        </div>
        <span className="text-[10px] text-muted-foreground/60">
          {PROMPT_USER} — bash
        </span>
        <button
          onClick={() => {
            setPhase("idle");
            setLines([]);
          }}
          className="text-muted-foreground/60 hover:text-foreground transition-colors text-xs leading-none"
          aria-label="Close terminal"
        >
          ✕
        </button>
      </div>

      {/* Scrollable output */}
      <div
        ref={scrollRef}
        className="max-h-[280px] overflow-y-auto px-3 py-2"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className={lineClass(line.type)}>
            {line.type === "prompt" ? (
              <PromptLine text={line.content} />
            ) : (
              <span>{line.content}</span>
            )}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center text-muted-foreground">
          <span className="text-primary shrink-0">{PROMPT_USER}</span>
          <span className="shrink-0">:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground caret-primary min-w-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────

function PromptLine({ text }: { text: string }) {
  // text looks like "rob@dev:~$ some-command"
  const afterPrompt = text.startsWith(PROMPT_FULL)
    ? text.slice(PROMPT_FULL.length)
    : text;
  return (
    <>
      <span className="text-primary">{PROMPT_USER}</span>
      <span>:~$ </span>
      <span className="text-foreground">{afterPrompt}</span>
    </>
  );
}

function lineClass(type: TerminalLine["type"]) {
  switch (type) {
    case "error":
      return "text-destructive";
    case "info":
      return "text-primary/80";
    case "ascii":
      return "text-primary whitespace-pre leading-tight";
    case "prompt":
      return "text-muted-foreground";
    default:
      return "text-foreground/90 whitespace-pre";
  }
}
