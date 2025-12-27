export interface IProject {
  title: string;
  for: string;
  expertise: string;
  summary: string;
  description: string[];
  link: string;
  image: string;
  slug: string;
  techCategory: string[];
  serviceCategory: string[];
  githubLink: string;
  liveWebLink: string;
  courseLink: string;
}
export const projects = [
  {
    title: "Dallotech",
    for: "Website",
    expertise: "Company Website",
    summary: "Fully dynamic fullStack development of a company landing page",
    description: [
      "Fully dynamic fullStack development of a company landing page",
    ],
    link: "https://dallotech.com/",
    image: "/images/dallotech.webp",
    slug: "dallotech",
    techCategory: ["nextjs", "reactjs"],
    serviceCategory: ["full-stack"],
    githubLink: "",
    liveWebLink: "https://dallotech.com/",
    courseLink: "",
  },
  {
    title: "Online Job App",
    for: "Website",
    expertise: "Entire Frontend",
    summary: "Job application website",
    description: [
      "Created overall frontend for job application website",
      "Implemented user friendly Forms for job posting and applying",
      "API integration with backend",
    ],
    link: "https://www.evereuser.co.uk/",
    image: "/images/everest.webp",
    slug: "online-job-app",
    techCategory: ["nextjs", "reactjs"],
    serviceCategory: ["frontend"],
    githubLink: "",
    liveWebLink: "https://www.evereuser.co.uk/",
    courseLink: "",
  },
  {
    title: "Codeyalaya",
    for: "Website",
    expertise: "Online coding institute",
    summary: "Online coding institute",
    description: [
      "Create video lessons and start / end code files for each lessons",
      "Students can buy and watch courses through website or mobile app",
      "Integrated payment system",
    ],
    link: "https://github.com/bidursapkota00/codeyalaya-web-frontend",
    image: "/images/codeyalaya1.webp",
    slug: "codeyalaya",
    techCategory: ["nextjs", "nodejs", "system design"],
    serviceCategory: ["full-stack"],
    githubLink: "https://github.com/bidursapkota00/codeyalaya-web-frontend",
    liveWebLink: "https://codeyalaya.bidursapkota.com.np/courses/nodejs-basics",
    courseLink: "",
  },
  {
    title: "Smart Water Meter",
    for: "Website | Android | IoT",
    expertise: "College Major Project",
    summary:
      "IoT projects for measuring household drinking water consumption along with mobile app and web app integration",
    description: [
      "Circuit design and implementation for measuring household drinking water consumption",
      "Apk Development with integrated khalti payment gateway for clients",
      "Web Development with dashboard for water service providers",
    ],
    link: "https://github.com/bidursapkota00/Major-Project",
    image: "/images/dallotech.webp",
    slug: "smart-water-meter",
    techCategory: ["nextjs", "react native"],
    serviceCategory: ["full-stack"],
    githubLink: "#",
    liveWebLink: "",
    courseLink: "",
  },

  {
    title: "UrbanSpace",
    for: "Website",
    expertise: "Animations",
    summary: "Landing page for a Hotel",
    description: [
      "Developed a landing page for a Hotel",
      "Animation with GSAP",
    ],
    link: "https://urbanspace.com.np/",
    image: "/images/dallotech.webp",
    slug: "urbanspace",
    techCategory: ["nextjs", "reactjs"],
    serviceCategory: ["frontend"],
    githubLink: "",
    liveWebLink: "https://urbanspace.com.np/",
    courseLink: "",
  },
];

export const threeProjects = projects.slice(0, 3);
