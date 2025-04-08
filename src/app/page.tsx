import About from "@/components/about/about";
import Accomplishment from "@/components/accomplishment/accomplishment";
import Contact from "@/components/contact/contact";
import Education from "@/components/education/education";
import Experience from "@/components/experience/experience";
import Hero from "@/components/hero/hero";
import Project from "@/components/project/project";
import Sidebar from "@/components/sidebar/sidebar";
import Skills from "@/components/skills/skills";
import Training from "@/components/training/training";
import WorkCount from "@/components/work-count/work-count";

export default function Home() {
  return (
    <>
      <Sidebar />
      <Hero />
      <About />
      <WorkCount />
      <Education />
      <Skills />
      <Experience />
      <Project />
      <Accomplishment />
      <Training />
      <Contact />
    </>
  );
}
