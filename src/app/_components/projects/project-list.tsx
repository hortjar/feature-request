"use client";

import { type Project } from "~/server/db/types";
import ProjectPreview from "./project-preview";
import { useSearchParams } from "next/navigation";
import { getAndSetDefaultAlignment } from "~/lib/utils";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const alignment = getAndSetDefaultAlignment(searchParams);

  console.log("project list alignment", alignment);
  return (
    <>
      <div className={`flex flex-${alignment} flex-wrap gap-3 pb-5`}>
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
