import {
  ChatBubbleIcon,
  ChevronRightIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Card, Heading, Inset, Text, Box } from "@radix-ui/themes";
import Link from "next/link";
import { type FC } from "react";
import { type Project } from "~/server/db/types";

interface ProjectPreviewProps {
  project: Project;
  fullWidth?: boolean;
}

export const ProjectPreview: FC<ProjectPreviewProps> = (props) => {
  const iconSize = 25;

  return (
    <Link
      href={`/project/${props.project.id}`}
      className={`${
        props.fullWidth ? "w-full" : "w-[32.6%]"
      } rounded-lg ring-slate-700 transition duration-100 hover:ring`}
    >
      <Card>
        <Inset clip="padding-box" side="top" pb="current">
          <Box width={"100%"} className="h-[150px]"></Box>
        </Inset>
        <div className="flex flex-row">
          <div className="gap flex flex-grow flex-col">
            <Heading as="h1" className="pb-1">
              {props.project.name}
            </Heading>
            <div className="flex flex-row gap-3 text-slate-300">
              <div className="flex flex-row items-center gap-2">
                <PersonIcon />
                <Text as="p">{props.project.createdBy.name}</Text>
              </div>
              <div className="flex flex-row items-center gap-2">
                <ChatBubbleIcon />
                <Text as="p">5</Text>
              </div>
            </div>
          </div>
          <div className="flex w-6 items-center justify-center">
            <ChevronRightIcon width={iconSize} height={iconSize} />
          </div>
        </div>
      </Card>
    </Link>
  );
};
