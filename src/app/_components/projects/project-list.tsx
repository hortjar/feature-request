"use client";

import { type Project } from "~/server/db/types";
import { BoxIcon, DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createUrlFromObject } from "~/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import ProjectPreview from "./project-preview";
import { Heading, IconButton } from "@radix-ui/themes";

const alignments = [
  { align: "col", icon: <BoxIcon /> },
  { align: "row", icon: <DashboardIcon /> },
];

export default function ProjectList({
  projects,
  headingText,
}: {
  projects: Project[];
  headingText: string;
}) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const defaultAlign = localStorage.getItem("align");
  const alignment = searchParams.get("align") ?? defaultAlign ?? "row";
  localStorage.setItem("align", alignment);

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3">
        <Heading as="h2" size={"5"}>
          {headingText}
        </Heading>
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
