import { api } from "~/trpc/server";
import { Suspense, cache } from "react";
import ProjectList from "../_components/projects/project-list";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import ListAlignments from "../_components/layout/list-alignments";
import { Button, Heading, Link } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import Pagination from "../_components/layout/pagination";
import { getPageAndLimit } from "~/lib/utils";

const getPagedForUser = cache(
  async (limit: number, offset: number, userId: string) => {
    const projects = await api.project.getPagedForUser.query({
      limit,
      offset,
      userId,
    });
    return projects;
  },
);

export default async function Projects({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const [page, limit] = getPageAndLimit(new URLSearchParams(searchParams));
  const projects = await getPagedForUser(limit!, page!, session.user.id);
  const allCount = (await api.project.getAllCountForUser.query(
    session.user.id,
  )) as Array<Record<string, number>>;
  return (
    <main className="flex flex-col gap-3 pb-7">
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
      <Pagination
        allCount={allCount[0]?.count ?? 0}
        currentPage={page ?? 1}
        currentLimit={limit ?? 10}
      />
    </main>
  );
}
