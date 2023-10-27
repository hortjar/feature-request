import { api } from "~/trpc/server";
import ProjectList from "./_components/projects/project-list";
import { Suspense } from "react";

export default async function Home() {
  const projects = await api.project.getAll.query();
  return (
    <main className="flex flex-col">
      Hello, World
      <Suspense fallback={<div>Loading!</div>}>
        <ProjectList projects={projects} />
      </Suspense>
    </main>
  );
}
