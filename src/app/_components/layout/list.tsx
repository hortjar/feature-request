import { Heading } from "@radix-ui/themes";
import {
  type FC,
  type PropsWithChildren,
  Suspense,
  type ReactNode,
} from "react";
import { ListAlignments } from "./list-alignments";
import { Pagination } from "./pagination";

interface ListProps extends PropsWithChildren {
  title: string;
  page: number;
  limit: number;
  allCount: number;
  createButton?: ReactNode;
}

export const List: FC<ListProps> = (props) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3">
        <Heading as="h2" size={"5"}>
          {props.title}
        </Heading>
        <div className="flex flex-row items-center justify-end gap-3">
          {props.createButton}
          <ListAlignments />
        </div>
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
