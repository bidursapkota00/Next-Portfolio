import Sidebar from "@/components/sidebar/sidebar";
import ProjectDetail from "./projectDetail";
import { notFound } from "next/navigation";
import { projects } from "@/utils/data/projects";
import RecentWork from "@/components/ui/card";

export async function generateStaticParams() {
  return projects.map((project) => ({
    project: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { project: string };
}) {
  const project = projects.find((p) => p.slug === params.project);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${
      project.title
    } – Project by Bidur Sapkota | ${project.techCategory.join(", ")}`,
    description: `${project.expertise} Built using ${project.techCategory.join(
      ", "
    )}. Part of Bidur Sapkota's full-stack development portfolio.`,
  };
}

interface ProjectDetailPageProps {
  params: {
    project: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const slug = params.project;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Sidebar />
      <ProjectDetail project={project}>
        <OtherProjects slug={slug} />
      </ProjectDetail>
    </>
  );
}

function OtherProjects({ slug }: { slug: string }) {
  return (
    <div className="mb-8 mt-[80px] pt-12 border-t border-gray-400 hidden xs500:block">
      <h2 className="text-4xl font-semibold text-gray-900 mb-6">
        Other Projects
      </h2>
      <div className="mt-[50px] pb-8 grid gap-5 grid-cols-1 xs500:grid-cols-2 xl1200:grid-cols-3">
        {projects
          .filter((p) => p.slug !== slug)
          .slice(0, 3)
          .map((relatedProject, index) => (
            <RecentWork
              key={index}
              image={relatedProject.image}
              title={relatedProject.title}
              category={relatedProject.for}
              techCategory={relatedProject.techCategory}
              serviceCategory={relatedProject.serviceCategory}
              slug={relatedProject.slug}
            />
          ))}
      </div>
    </div>
  );
}
