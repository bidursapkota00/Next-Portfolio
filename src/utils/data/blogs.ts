export interface IBlogs {
  baseUrl: string;
  url: string;
  title: string;
  shortTitle: string;
  slug: string;
  github: string;
  description: string;
  category: string[];
  image: string;
}

export const blogs: IBlogs[] = [
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/Design-Patterns/refs/heads/main",
    url: "README.md",
    title: "Design Patterns Complete Guide",
    shortTitle: "Design Patterns",
    slug: "design-patterns-complete-guide",
    github: "https://github.com/bidursapkota00/Design-Patterns",
    description: "",
    image: "/images/design-patterns.png",
    category: ["OOP", "Java", "Design Patterns"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/NestJS/refs/heads/main",
    url: "README.md",
    title: "NestJs Complete Guide",
    shortTitle: "NestJs",
    slug: "nestjs-complete-guide",
    github: "https://github.com/bidursapkota00/NestJS",
    description: "",
    image: "/images/nestjs.png",
    category: ["Node", "JavaScript", "Nest"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/Mastering-TypeScript/refs/heads/main",
    url: "README.md",
    title: "TypeScript Complete Guide",
    shortTitle: "Javascript",
    slug: "typescript-complete-guide",
    github: "https://github.com/bidursapkota00/Mastering-TypeScript",
    description: "",
    image: "/images/ts.png",
    category: ["TypeScript", "JavaScript"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/react-next/refs/heads/main",
    url: "README.md",
    title: "React.js with Next.js Complete Guide",
    shortTitle: "React with Next",
    slug: "react-next-complete-guide",
    github: "https://github.com/bidursapkota00/react-next",
    description: "",
    image: "/images/react-next.jpg",
    category: ["React", "Next", "TypeScript"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/MEN-Stack-API-Development/refs/heads/main",
    url: "README.md",
    title: "MongoDB, Express and Node Complete Guide",
    shortTitle: "Express with Node",
    slug: "mongodb-express-node-complete-guide",
    github: "https://github.com/bidursapkota00/MEN-Stack-API-Development",
    description: "",
    image: "/images/men.jpg",
    category: ["Express", "Node", "MongoDB"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/Git/refs/heads/main",
    url: "README.md",
    title: "Git and GitHub Complete Guide",
    shortTitle: "Git and GitHub",
    slug: "git-github-complete-guide",
    github: "https://github.com/bidursapkota00/Git",
    description: "",
    image: "/images/git.webp",
    category: ["Git", "GitHub"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/Complete-JavaScript-Course/refs/heads/basic",
    url: "README.md",
    title: "JavaScript Complete Guide",
    shortTitle: "JavaScript",
    slug: "javascript-complete-guide",
    github: "https://github.com/bidursapkota00/Complete-JavaScript-Course",
    description: "",
    image: "/images/js.jpg",
    category: ["JavaScript", "HTML", "CSS"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/tailwind/refs/heads/main",
    url: "README.md",
    title: "TailwindCSS Complete Guide",
    shortTitle: "TailwindCSS",
    slug: "tailwind-css-complete-guide",
    github: "https://github.com/bidursapkota00/tailwind",
    description: "",
    image: "/images/tailwind.webp",
    category: ["TailwindCSS", "CSS"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/Readme/refs/heads/main",
    url: "README.md",
    title: "Markdown Syntax Complete Guide",
    shortTitle: "Markdown",
    slug: "markdown-syntax-complete-guide",
    github: "https://github.com/bidursapkota00/Readme",
    description: "",
    image: "/images/md.png",
    category: ["Markdown"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/HTML-and-CSS/refs/heads/main",
    url: "README.md",
    title: "HTML and CSS Complete Guide",
    shortTitle: "HTML CSS",
    slug: "html-css-complete-guide",
    github: "https://github.com/bidursapkota00/HTML-and-CSS",
    description: "",
    image: "/images/html-css.png",
    category: ["HTML", "CSS"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/System-Design-for-Beginners/refs/heads/main",
    url: "README.md",
    title: "System Design Complete Guide",
    shortTitle: "System Design",
    slug: "system-design-complete-guide",
    github: "https://github.com/bidursapkota00/System-Design-for-Beginners",
    description: "",
    image: "/images/system-design.webp",
    category: ["System Design"],
  },
];

export const threeBlogs = blogs.slice(0, 3);
