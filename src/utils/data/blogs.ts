export interface IBlogs {
  baseUrl: string;
  url: string;
  title: string;
  shortTitle: string;
  slug: string;
  github: string;
  youtube?: string;
  description: string;
  category: string[];
  whatsNext?: string[];
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
    description:
      "Learn all major design patterns in Java with practical examples. Improve code reusability, scalability, and maintainability for real-world projects.",
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
    description:
      "Master NestJS with TypeScript to build scalable, modular, and production-ready backends. Learn REST APIs, testing, and deployment.",
    image: "/images/nestjs.png",
    category: ["Node", "JavaScript", "Nest"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/Mastering-TypeScript/refs/heads/main",
    url: "README.md",
    title: "TypeScript Complete Guide",
    shortTitle: "TypeScript",
    slug: "typescript-complete-guide",
    github: "https://github.com/bidursapkota00/Mastering-TypeScript",
    description:
      "Master TypeScript fundamentals, advanced types, generics, and how to integrate it seamlessly in modern JavaScript projects.",
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
    description:
      "Build powerful React apps with Next.js. Learn SSR, SSG, routes, authentication, and performance optimization step by step.",
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
    description:
      "Learn backend development using the MEN stack—MongoDB, Express, Node.js, jest for testing, documentation with swagger—to build robust RESTful APIs.",
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
    description:
      "Master Git version control and GitHub collaboration. Learn commits, branching, pull requests, workflows, and open-source contribution.",
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
    description:
      "Learn modern JavaScript from basics to advanced—DOM, ES6+, async, promises, OOP, and practical projects for real-world skills.",
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
    description:
      "Learn TailwindCSS from scratch. Create responsive, modern, and fast websites with utility-first CSS and best practices.",
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
    description:
      "Master Markdown for documentation, GitHub READMEs, blogging, and note-taking with syntax examples and formatting tricks.",
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
    description:
      "A complete guide to building websites with HTML and CSS. Learn layouts, flexbox, grid, responsive design, and best practices.",
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
    description:
      "Learn system design concepts—scalability, caching, load balancing, databases, and distributed systems for interviews and real-world apps.",
    image: "/images/system-design.webp",
    category: ["System Design"],
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/sl/refs/heads/main",
    url: "JS.md",
    title: "JavaScript of Scripting Language, BCA",
    shortTitle: "JavaScript: BCA",
    slug: "javaScript-of-scripting-language-bca",
    github: "https://github.com/bidursapkota00/sl/blob/main/JS.md",
    description:
      "A JavaScript guide tailored for BCA students, aligned with the Scripting Language syllabus, including examples and exercises.",
    image: "/images/js.jpg",
    category: ["JavaScript", "HTML", "CSS"],
  },
];

export const threeBlogs = blogs.slice(0, 3);
