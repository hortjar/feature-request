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
      <List
        title="Your Projects"
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
