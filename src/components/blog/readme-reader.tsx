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
    code({ node, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeString = String(children).replace(/\n$/, "");
      
      const hasLanguage = !!match;
      const hasNewlines = String(children).includes("\n");
      const spansMultipleLines = node?.position?.start?.line !== node?.position?.end?.line;
      
      const isBlock = hasLanguage || hasNewlines || spansMultipleLines;

      if (!isBlock) {
        return (
          <code
            className="bg-[rgba(175,184,193,0.2)] px-[0.4em] py-[0.2em] rounded-[6px] font-mono text-[85%] break-words"
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
          className="text-[2em] font-semibold my-[.67em] pb-[.3em] border-b border-[#d1d9e0b3] break-words"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h2 id={id} className="text-[1.5em] font-semibold mt-[24px] mb-[16px] pb-[.3em] border-b border-[#d1d9e0b3] break-words">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h3 id={id} className="text-[1.25em] font-semibold mt-[24px] mb-[16px] break-words">
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h4 id={id} className="text-[1em] font-semibold mt-[24px] mb-[16px] break-words">
          {children}
        </h4>
      );
    },
    h5: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h5 id={id} className="text-[.875em] font-semibold mt-[24px] mb-[16px] break-words">
          {children}
        </h5>
      );
    },
    h6: ({ children }: any) => {
      const id = generateId(children);
      return (
        <h6 id={id} className="text-[.85em] font-semibold text-[#656d76] mt-[24px] mb-[16px] break-words">
          {children}
        </h6>
      );
    },
    p: ({ children }: any) => (
      <p className="mt-0 mb-[16px]">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="mb-[16px] pl-[2em] md-ul ">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="mb-[16px] pl-[2em] md-ol ">
        {children}
      </ol>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-[.25em] border-[#d0d7de] pl-[1em] text-[#656d76] m-0 mb-[16px] ">
        {children}
      </blockquote>
    ),
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
    img: ({ src, alt, title }: any) => {
      if (alt === "Bidur Sapkota") {
        return (
          <span className="relative inline-block">
            <Image
              src="/images/gravatar.webp"
              alt={alt}
              title={title}
              width={64}
              height={64}
              sizes="64px"
              className="w-[48px] shadow-sm"
            />
          </span>
        );
      }

      const imgSrc = String(src).startsWith("http") ? src : `${baseUrl}/${src}`;
      return (
        <span
          className="relative block w-full mb-[16px]"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={imgSrc}
            alt={alt}
            title={title}
            fill
            sizes="1200px"
            className="object-contain shadow-sm"
          />
        </span>
      );
    },
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-[16px] ">
        <table className="w-full border-collapse ">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="">{children}</thead>
    ),
    tbody: ({ children }: any) => <tbody className="">{children}</tbody>,
    tr: ({ children }: any) => (
      <tr className="">{children}</tr>
    ),
    th: ({ children, style }: any) => (
      <th
        className="font-semibold "
        style={style}
      >
        {children}
      </th>
    ),
    td: ({ children, style }: any) => (
      <td className="" style={style}>
        {children}
      </td>
    ),
    hr: () => <hr className="h-[.25em] my-[24px] bg-[#d0d7de] border-0" />,
  };

  return (
    <div className="markdown-body px-5">
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
