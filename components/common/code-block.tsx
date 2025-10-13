'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

type Props = { language?: string; value: string };

export default function CodeBlock({ language = 'text', value }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error('Failed to copy code', e);
    }
  };

  return (
    <div className="not-prose relative group overflow-hidden rounded-xl">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
        aria-label="Copy code"
        className="
          absolute top-2 right-2 rounded-md px-2 py-1 text-xs font-medium
          bg-gray-800/90 text-blue-400 hover:text-blue-300 hover:bg-gray-700
          transition flex items-center gap-1 opacity-0 group-hover:opacity-100
          focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50
        "
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>

      {/* Scrollable Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
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
          {value.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}