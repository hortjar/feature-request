"use client";

import { BoxIcon, DashboardIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type FC, useState } from "react";
import { createUrlFromObject, getAndSetDefaultAlignment } from "~/lib/utils";

const alignments = [
  { align: "col", icon: <BoxIcon /> },
  { align: "row", icon: <DashboardIcon /> },
];

interface ListAlignmentProps {
  searchParams: URLSearchParams;
}

export const ListAlignments: FC<ListAlignmentProps> = (props) => {
  const pathname = usePathname();

  const [alignment, setAlignment] = useState<string>("row");

  useEffect(() => {
    setAlignment(getAndSetDefaultAlignment(props.searchParams));
  }, [alignment, props.searchParams]);

  return (
    <div className="flex flex-row">
      {alignments.map((x) => {
        return (
          <Link
            key={x.align}
            href={createUrlFromObject(pathname, props.searchParams, {
              align: x.align,
            })}
          >
            <IconButton
              radius="none"
              variant={alignment == x.align ? "soft" : "surface"}
              className="border"
              highContrast
              size={"3"}
            >
              {x.icon}
            </IconButton>
          </Link>
        );
      })}
    </div>
  );
};
