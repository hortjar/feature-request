import { api } from "~/trpc/server";
import { Suspense } from "react";
import ProjectList from "../_components/projects/project-list";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Projects() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const projects = await api.project.getAllForUser.query(session.user.id);
  return (
    <main className="flex flex-col gap-3">
      <Suspense fallback={<div>Loading!</div>}>
        <ProjectList headingText="Your projects" projects={projects} />
      </Suspense>
    </main>
  );
}
