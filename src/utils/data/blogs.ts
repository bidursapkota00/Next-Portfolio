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
    category: ["OOP", "Java", "Design"],
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
    category: ["Node", "Javascript", "Nest"],
  },
];

export const threeBlogs = blogs.slice(0, 3);
