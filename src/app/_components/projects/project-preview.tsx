import { type Project } from "~/server/db/types";

export default function ProjectPreview({ project }: { project: Project }) {
  return <div>{project.name}</div>;
}
