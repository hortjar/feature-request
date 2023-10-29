import { api } from "~/trpc/server";
import ProjectList from "./_components/projects/project-list";
import { Suspense } from "react";
import { Heading } from "@radix-ui/themes";
import ListAlignments from "./_components/layout/list-alignments";

export default async function Home() {
  const projects = await api.project.getAll.query();
  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between gap-3">
        <Heading as="h2" size={"5"}>
          All Projects
        </Heading>
        <ListAlignments />
      </div>
      <Suspense fallback={<div>Loading!</div>}>
        <ProjectList projects={projects} />
      </Suspense>
    </main>
  );
}
