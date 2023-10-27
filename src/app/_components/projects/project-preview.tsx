import { Card, Heading, Inset, Text, Box } from "@radix-ui/themes";
import { type Project } from "~/server/db/types";

export default function ProjectPreview({
  project,
  fullWidth = false,
}: {
  project: Project;
  fullWidth?: boolean;
}) {
  return (
    <Card
      className={`${
        fullWidth ? "w-full" : "w-[30%]"
      } ring-slate-700 transition duration-100 hover:ring`}
    >
      <Inset clip="padding-box" side="top" pb="current">
        <Box width={"100%"} className="h-[150px]"></Box>
      </Inset>
      <Heading as="h1">{project.name}</Heading>
      <Text as="p" className="text-slate-500">
        {project.createdBy.name}
      </Text>
    </Card>
  );
}
