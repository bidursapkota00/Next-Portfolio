import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./readme.css";
import LoadMermaid from "./load-mermaid";

interface ReadmeReaderProps {
  baseUrl: string;
  markdown: string;
}

const ReadmeReader = ({ baseUrl, markdown }: ReadmeReaderProps) => {
  // Helper function to generate ID from heading text
  const generateId = (children: any): string => {
    return children
      .toString()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
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
            className="bg-gray-100 px-1 py-0.5 rounded font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      // Handle mermaid diagrams
      if (language === "mermaid") {
        return (
          <pre suppressHydrationWarning className="mermaid">
            {codeString.trim()}
          </pre>
        );
      }

      // Handle code blocks
      return (
        <SyntaxHighlighter
          style={coldarkCold}
          language={language}
          PreTag="div"
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      );
    },
    h1: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h1 id={id} className="text-5xl font-bold mb-4 border-b pb-2">
          {children}
        </h1>
      );
    },
    h2: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h2 id={id} className="text-4xl font-bold mb-3 mt-6">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h3 id={id} className="text-3xl font-bold mb-2 mt-4">
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h4 id={id} className="text-2xl font-bold mb-2 mt-4">
          {children}
        </h4>
      );
    },
    h5: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h5 id={id} className="text-xl font-bold mb-2 mt-4">
          {children}
        </h5>
      );
    },
    h6: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h6 id={id} className="text-lg font-bold mb-2 mt-4">
          {children}
        </h6>
      );
    },
    p: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1 md-ul">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 md-ol">
        {children}
      </ol>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 bg-gray-50 py-2">
        {children}
      </blockquote>
    ),
    a: ({ href, children }: any) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </a>
    ),
    img: ({ src, alt }: any) => (
      <img
        src={`${baseUrl}/${src}`}
        alt={alt}
        className="max-w-full h-auto shadow-sm my-4"
      />
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-gray-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50">{children}</thead>
    ),
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    tr: ({ children }: any) => <tr className="hover:bg-gray-50">{children}</tr>,
    th: ({ children }: any) => (
      <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-gray-300 px-4 py-2">{children}</td>
    ),
  };

  return (
    <div className="m-5">
      <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
      <LoadMermaid />
    </div>
  );
};

export default ReadmeReader;
