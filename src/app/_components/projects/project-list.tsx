"use client";

import { type Project } from "~/server/db/types";
import { ProjectPreview } from "./project-preview";
import { useSearchParams } from "next/navigation";
import { getAndSetDefaultAlignment } from "~/lib/utils";
import { useEffect, type FC, useState } from "react";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: FC<ProjectListProps> = (props) => {
  const searchParams = useSearchParams();
  const [alignment, setAlignment] = useState<string>("row");

  useEffect(() => {
    setAlignment(getAndSetDefaultAlignment(searchParams));
  }, [alignment, searchParams]);

  return (
    <>
      <div className={`flex flex-${alignment} flex-wrap gap-3 pb-5`}>
        {props.projects.map((x) => (
          <ProjectPreview
            key={x.id}
            project={x}
            fullWidth={alignment == "col"}
          />
        ))}
      </div>
    </>
  );
};
