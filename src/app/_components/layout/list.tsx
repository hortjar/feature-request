import { Heading } from "@radix-ui/themes";
import { type FC, type PropsWithChildren, Suspense } from "react";
import { ListAlignments } from "./list-alignments";
import { Pagination } from "./pagination";

interface ListProps extends PropsWithChildren {
  title: string;
  page: number;
  limit: number;
  allCount: number;
}

export const List: FC<ListProps> = (props) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3">
        <Heading as="h2" size={"5"}>
          {props.title}
        </Heading>
        <ListAlignments />
      </div>
      <Suspense fallback={<div>Loading!</div>}>{props.children}</Suspense>
      <Pagination
        allCount={props.allCount}
        currentPage={props.page}
        currentLimit={props.limit}
      />
    </>
  );
};
