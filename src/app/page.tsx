import { api } from "~/trpc/server";
import { ProjectList } from "./_components/projects/project-list";
import { cache } from "react";
import { getPageAndLimit } from "~/lib/utils";
import { List } from "./_components/layout/list";
import { CreateProjectButtonButton } from "./_components/projects/create-project-button";
import { getServerAuthSession } from "~/server/auth";

const getPaged = cache(async (limit: number, offset: number) => {
  const projects = await api.project.getPaged.query({
    limit,
    offset,
  });
  return projects;
});

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const [page, limit] = getPageAndLimit(new URLSearchParams(searchParams));
  const projects = await getPaged(limit!, page!);
  const allCount = (await api.project.getAllCount.query()) as Array<
    Record<string, number>
  >;
  const session = await getServerAuthSession();
  return (
    <main className="flex flex-col gap-5 pb-7">
      <List
        title="All Projects"
        page={page ?? 1}
        limit={limit ?? 10}
        allCount={allCount[0]!.count ?? 1}
        createButton={session?.user ? <CreateProjectButtonButton /> : <></>}
      >
        <ProjectList projects={projects} />
      </List>
    </main>
  );
}
