'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

type Props = {
  language?: string;
  value: string;
  filename?: string;
};

export default function CodeBlock({ language = 'text', value, filename }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error('Failed to copy code', e);
    }
  };

  return (
    <div className="not-prose relative group overflow-hidden rounded-xl">
      {/* Header (filename + copy) */}
      <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
        {filename && (
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
            {filename}
          </span>
        )}
        <button
          onClick={handleCopy}
          onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
          aria-label="Copy code"
          className="
            rounded-md px-2 py-1 text-xs font-medium
            bg-secondary text-primary hover:opacity-80
            transition flex items-center gap-1 opacity-0 group-hover:opacity-100
            focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50
          "
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Scrollable Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language || 'text'}
          style={oneDark}
          showLineNumbers
          lineNumberStyle={{ color: '#555', paddingRight: '1em', userSelect: 'none' }}
          customStyle={{
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
            fontSize: '0.9rem',
            lineHeight: '1.45',
            background: '#1e1e1e',
            margin: 0,
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}