"use client";

import mermaid from "mermaid";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface ReadmeReaderProps {
  url?: string;
  content?: string;
  className?: string;
}

const ReadmeReader = ({ url, content, className = "" }: ReadmeReaderProps) => {
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const mermaidRef = useRef<number>(0);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "inherit",
      fontSize: 16,
      themeCSS: `
        foreignObject {
          overflow: visible;
        }
      `,
    });
  }, []);

  useEffect(() => {
    if (content) {
      setMarkdown(content);
      return;
    }

    if (url) {
      fetchReadme(url);
    }
  }, [url, content]);

  const fetchReadme = async (readmeUrl: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(readmeUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch README: ${response.statusText}`);
      }
      const text = await response.text();
      setMarkdown(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load README");
    } finally {
      setLoading(false);
    }
  };

  const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [diagramId] = useState(
      `mermaid-${Date.now()}-${++mermaidRef.current}`
    );

    useEffect(() => {
      if (elementRef.current) {
        try {
          mermaid
            .render(diagramId, chart)
            .then(({ svg }) => {
              if (elementRef.current) {
                elementRef.current.innerHTML = svg;
              }
            })
            .catch((error) => {
              // Error handling with fallback display
            });
        } catch (error) {
          console.error("Mermaid error:", error);
        }
      }
    }, [chart, diagramId]);

    return <div ref={elementRef} className="my-4 flex justify-center" />;
  };

  const customRenderers = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeString = String(children).replace(/\n$/, "");
      inline = !className;

      if (inline) {
        return (
          <code
            className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      // Handle mermaid diagrams
      if (language === "mermaid") {
        return <MermaidDiagram chart={codeString} />;
      }

      // Handle code blocks
      return (
        <SyntaxHighlighter
          style={tomorrow}
          language={language}
          PreTag="div"
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      );
    },
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4 border-b pb-2">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-medium mb-2 mt-4">{children}</h3>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 bg-gray-50 py-2">
        {children}
      </blockquote>
    ),
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-sm my-4"
      />
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-gray-300">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-gray-300 px-4 py-2">{children}</td>
    ),
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading README...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
      >
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-red-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-red-700 font-medium">Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`m-5 ${className}`}>
      <ReactMarkdown components={customRenderers}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default ReadmeReader;
