"use client";

import { BoxIcon, DashboardIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, type FC, useState } from "react";
import { createUrlFromObject, getAndSetDefaultAlignment } from "~/lib/utils";

const alignments = [
  { align: "col", icon: <BoxIcon /> },
  { align: "row", icon: <DashboardIcon /> },
];

export const ListAlignments: FC = () => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const [alignment, setAlignment] = useState<string>("row");

  useEffect(() => {
    setAlignment(getAndSetDefaultAlignment(searchParams));
  }, [alignment, searchParams]);

  return (
    <div className="flex flex-row">
      {alignments.map((x) => {
        return (
          <Link
            key={x.align}
            href={createUrlFromObject(pathname, searchParams, {
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
