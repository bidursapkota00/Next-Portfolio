"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({
  language,
  value,
  ...props
}: {
  language: string;
  value: string;
  [key: string]: any;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mb-10 mt-3">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded bg-gray-700 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        style={coldarkCold}
        language={language}
        PreTag="div"
        {...props}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
