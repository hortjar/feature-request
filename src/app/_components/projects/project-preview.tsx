import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Card, Heading, Inset, Text, Box } from "@radix-ui/themes";
import Link from "next/link";
import { type Project } from "~/server/db/types";

export default function ProjectPreview({
  project,
  fullWidth = false,
}: {
  project: Project;
  fullWidth?: boolean;
}) {
  const iconSize = 25;

  return (
    <Link
      href={`/project/${project.id}`}
      className={`${
        fullWidth ? "w-full" : "w-[30%]"
      } rounded-lg ring-slate-700 transition duration-100 hover:ring`}
    >
      <Card>
        <Inset clip="padding-box" side="top" pb="current">
          <Box width={"100%"} className="h-[150px]"></Box>
        </Inset>
        <div className="flex flex-row">
          <div className="flex flex-grow flex-col">
            <Heading as="h1">{project.name}</Heading>
            <Text as="p" className="text-slate-500">
              {project.createdBy.name}
            </Text>
          </div>
          <div className="flex w-6 items-center justify-center">
            <ChevronRightIcon width={iconSize} height={iconSize} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
