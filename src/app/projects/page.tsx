import { api } from "~/trpc/server";
import { Suspense } from "react";
import ProjectList from "../_components/projects/project-list";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import ListAlignments from "../_components/layout/list-alignments";
import { Button, Heading, Link } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export default async function Projects() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const projects = await api.project.getAllForUser.query(session.user.id);
  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between gap-3">
        <Heading as="h2" size={"5"}>
          Your Projects
        </Heading>
        <div className="flex flex-row items-center gap-3">
          {session?.user && (
            <Link href="/projects/create">
              <Button size={"3"} variant="outline" className="cursor-pointer">
                <PlusIcon />
                Create
              </Button>
            </Link>
          )}
          <ListAlignments />
        </div>
      </div>
      <Suspense fallback={<div>Loading!</div>}>
        <ProjectList projects={projects} />
      </Suspense>
    </main>
  );
}
