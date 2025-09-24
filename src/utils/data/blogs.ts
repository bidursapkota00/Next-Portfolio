export interface IBlogs {
  baseUrl: string;
  url: string;
  title: string;
  slug: string;
  github: string;
  description: string;
}

export const blogs: IBlogs[] = [
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/Design-Patterns/refs/heads/main",
    url: "README.md",
    title: "Design Patterns Complete Guide",
    slug: "design-patterns-complete-guide",
    github: "https://github.com/bidursapkota00/Design-Patterns",
    description: "",
  },
  {
    baseUrl:
      "https://raw.githubusercontent.com/bidursapkota00/NestJS/refs/heads/main",
    url: "README.md",
    title: "NestJs Complete Guide",
    slug: "nestjs-complete-guide",
    github: "https://github.com/bidursapkota00/NestJS",
    description: "",
  },
];
