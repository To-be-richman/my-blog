"use client";

import { useState } from "react";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  language,
  value,
}: {
  language: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="
          absolute
          top-3
          right-3
          z-10

          rounded-lg
          border border-white/10
          bg-white/10
          px-3
          py-1

          text-xs
          text-white/80

          backdrop-blur-md

          hover:bg-white/20
          transition
        "
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
      >
        {value}
      </SyntaxHighlighter>

    </div>
  );
}