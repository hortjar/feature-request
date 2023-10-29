import { api } from "~/trpc/server";
import ProjectList from "./_components/projects/project-list";
import { Suspense } from "react";

export default async function Home() {
  const projects = await api.project.getAll.query();
  return (
    <main className="flex flex-col gap-5">
      <Suspense fallback={<div>Loading!</div>}>
        <ProjectList headingText="All projects" projects={projects} />
      </Suspense>
    </main>
  );
}
