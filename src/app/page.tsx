import About from "@/components/about/about";
import Experience from "@/components/experience/experience";
import Hero from "@/components/hero/hero";
import Sidebar from "@/components/sidebar/sidebar";
import Skills from "@/components/skills/skills";
import WorkCount from "@/components/work-count/work-count";

export default function Home() {
  return (
    <>
      <Sidebar />
      <Hero />
      <About />
      <WorkCount />
      <Skills />
      <Experience />
    </>
  );
}
