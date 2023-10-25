import { api } from "~/trpc/server";
import ProjectPreview from "./_components/projects/project-preview";

export default async function Home() {
  const projects = await api.project.getAll.query();
  return (
    <main className="flex flex-col">
      Hello, World
      {projects.map((x) => (
        <ProjectPreview key={x.id} project={x} />
      ))}
    </main>
  );
}
