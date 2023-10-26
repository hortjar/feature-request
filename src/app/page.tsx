import { api } from "~/trpc/server";
import ProjectList from "./_components/projects/project-list";

export default async function Home() {
  const projects = await api.project.getAll.query();
  return (
    <main className="flex flex-col">
      Hello, World
      <ProjectList projects={projects} />
    </main>
  );
}
