"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type FC } from "react";
import { createUrlFromObject } from "~/lib/utils";

interface PaginationProps {
  allCount: number;
  currentPage: number;
  currentLimit: number;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const pagecount = Math.ceil(props.allCount / props.currentLimit);
  const limitOptions = [10, 25, 50, 100];

  function getNextPageNumber(offset: number) {
    const nextPage = props.currentPage + offset;
    if (nextPage < 1) {
      return 1;
    } else if (nextPage > pagecount) {
      return pagecount;
    }
    return nextPage;
  }

  return (
    <div className="grid grid-cols-[10%_1fr_10%] items-start justify-center">
      <div className="col-start-2 flex flex-row items-center justify-center gap-5">
        <Link
          href={createUrlFromObject(pathname, params, {
            page: getNextPageNumber(-1).toString(),
          })}
          className="mt-1 cursor-pointer"
        >
          <IconButton variant="ghost" color="gray">
            <ChevronLeftIcon />
          </IconButton>
        </Link>
        <div className="flex flex-row gap-4">
          {Array.from(Array(pagecount).keys()).map((page) => (
            <Link
              href={createUrlFromObject(pathname, params, {
                page: (page + 1).toString(),
              })}
              key={"page_" + page + 1}
              className="cursor-pointer"
            >
              <Button
                variant="ghost"
                color={page + 1 == props.currentPage ? "iris" : "gray"}
              >
                {page + 1}
              </Button>
            </Link>
          ))}
        </div>
        <Link
          href={createUrlFromObject(pathname, params, {
            page: getNextPageNumber(1).toString(),
          })}
          className="mt-1 cursor-pointer"
        >
          <IconButton variant="ghost" color="gray">
            <ChevronRightIcon />
          </IconButton>
        </Link>
      </div>
      <div className="col-start-3 flex flex-row justify-end gap-4">
        {limitOptions.map((limit) => (
          <Link
            key={"limit_" + limit}
            href={createUrlFromObject(pathname, params, {
              limit: limit.toString(),
            })}
            className="cursor-pointer"
          >
            <Button
              variant="ghost"
              color={limit == props.currentLimit ? "iris" : "gray"}
            >
              {limit}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
