import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./readme.css";
import LoadMermaid from "./load-mermaid";
import CodeBlock from "./code-block";
import Image from "next/image";

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
      .replace(/\s+?/g, "-") // Replace spaces with hyphens
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
            className="bg-gray-100 px-1 py-0.5 rounded font-mono break-words"
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
        <CodeBlock
          language={language}
          PreTag="div"
          value={codeString}
          {...props}
        />
      );
    },
    h1: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h1
          id={id}
          className="text-5xl font-bold mb-4 mt-8 border-b pb-2 break-words"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h2 id={id} className="text-4xl font-bold mb-3 mt-6 break-words">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h3 id={id} className="text-3xl font-bold mb-2 mt-4 break-words">
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h4 id={id} className="text-2xl font-bold mb-2 mt-4 break-words">
          {children}
        </h4>
      );
    },
    h5: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h5 id={id} className="text-xl font-bold mb-2 mt-4 break-words">
          {children}
        </h5>
      );
    },
    h6: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h6 id={id} className="text-lg font-bold mb-2 mt-4 break-words">
          {children}
        </h6>
      );
    },
    p: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-lg">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc mb-4 ml-8 space-y-1 md-ul text-lg">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal mb-4 ml-8 space-y-1 md-ol text-lg">
        {children}
      </ol>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 bg-gray-50 py-2 text-lg">
        {children}
      </blockquote>
    ),
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline text-lg"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }: any) => {
      if (alt === "Bidur Sapkota") {
        return (
          <span className="relative inline-block">
            <Image
              src="/images/profile3.png"
              alt={alt}
              width={64}
              height={64}
              className="w-[48px] shadow-sm"
            />
          </span>
        );
      }

      const imgSrc = String(src).startsWith("http") ? src : `${baseUrl}/${src}`;
      return (
        <span
          className="relative block w-full my-4"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={imgSrc}
            alt={alt}
            fill
            className="object-contain shadow-sm"
          />
        </span>
      );
    },
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4 text-lg">
        <table className="min-w-full border-collapse border border-gray-300 text-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50 text-lg">{children}</thead>
    ),
    tbody: ({ children }: any) => <tbody className="text-lg">{children}</tbody>,
    tr: ({ children }: any) => (
      <tr className="hover:bg-gray-50 text-lg">{children}</tr>
    ),
    th: ({ children, style }: any) => (
      <th
        className="border border-gray-300 bg-gray-50 px-4 py-2 font-semibold text-lg"
        style={style}
      >
        {children}
      </th>
    ),
    td: ({ children, style }: any) => (
      <td className="border border-gray-300 px-4 py-2 text-lg" style={style}>
        {children}
      </td>
    ),
    hr: () => <hr className="my-10 border-t-4" />,
  };

  return (
    <div className="m-5">
      <ReactMarkdown
        components={customRenderers}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>
      <LoadMermaid />
    </div>
  );
};

export default ReadmeReader;
