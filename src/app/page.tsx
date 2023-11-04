import { api } from "~/trpc/server";
import ProjectList from "./_components/projects/project-list";
import { Suspense } from "react";
import { Heading } from "@radix-ui/themes";
import ListAlignments from "./_components/layout/list-alignments";
import { getPageAndLimit } from "~/lib/utils";
import Pagination from "./_components/layout/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const [page, limit] = getPageAndLimit(new URLSearchParams(searchParams));
  const projects = await api.project.getPaged.query({
    limit: limit!,
    offset: page!,
  });
  const allCount = (await api.project.getAllCount.query()) as Array<
    Record<string, number>
  >;
  return (
    <main className="flex flex-col gap-5 pb-7">
      <Suspense fallback={<div>Loading!</div>}>
        <div className="flex flex-row items-center justify-between gap-3">
          <Heading as="h2" size={"5"}>
            All Projects
          </Heading>
          <ListAlignments />
        </div>
        <ProjectList projects={projects} />
        <Pagination
          allCount={allCount[0]?.count ?? 0}
          currentPage={page ?? 1}
          currentLimit={limit ?? 10}
        />
      </Suspense>
    </main>
  );
}
