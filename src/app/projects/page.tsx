import { api } from "~/trpc/server";
import { cache } from "react";
import { ProjectList } from "../_components/projects/project-list";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { getPageAndLimit } from "~/lib/utils";
import { List } from "../_components/layout/list";
import { CreateProjectButtonButton } from "../_components/projects/create-project-button";

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

const getPaged = cache(async (limit: number, offset: number) => {
  const projects = await api.project.getPaged.query({
    limit,
    offset,
  });
  return projects;
});

export default async function Projects({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = new URLSearchParams(searchParams);
  const session = await getServerAuthSession();
  const [page, limit] = getPageAndLimit(params);
  const shouldGetAll = !session?.user || searchParams.type == "all";

  let projects;
  let allCount;
  if (shouldGetAll) {
    projects = await getPaged(limit!, page!);
    allCount = (await api.project.getAllCount.query()) as Array<
      Record<string, number>
    >;
  } else {
    projects = await getPagedForUser(limit!, page!, session.user.id);
    allCount = (await api.project.getAllCountForUser.query(
      session.user.id,
    )) as Array<Record<string, number>>;
  }

  return (
    <main className="flex flex-col gap-3 pb-7">
      <List
        title={shouldGetAll ? "All Projects" : "Your Projects"}
        page={page ?? 1}
        limit={limit ?? 10}
        allCount={allCount[0]!.count ?? 1}
        createButton={session?.user ? <CreateProjectButtonButton /> : <></>}
        searchParams={params}
      >
        <ProjectList projects={projects} />
      </List>
    </main>
  );
}
