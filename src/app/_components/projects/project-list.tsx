"use client";

import { type Project } from "~/server/db/types";
import { BoxIcon, DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createUrlFromObject } from "~/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import ProjectPreview from "./project-preview";
import { IconButton } from "@radix-ui/themes";

const alignments = [
  { align: "col", icon: <BoxIcon /> },
  { align: "row", icon: <DashboardIcon /> },
];

export default function ProjectList({ projects }: { projects: Project[] }) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const alignment = searchParams.get("align") ?? "row";

  return (
    <>
      <div className="flex flex-row gap-3">
        <div className="flex flex-row">
          {alignments.map((x) => {
            return (
              <Link
                key={x.align}
                href={createUrlFromObject(pathname, { align: x.align })}
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
      </div>
      <div className={`flex flex-${alignment} flex-wrap gap-3`}>
        {projects.map((x) => (
          <ProjectPreview
            key={x.id}
            project={x}
            fullWidth={alignment == "col"}
          />
        ))}
      </div>
    </>
  );
}
