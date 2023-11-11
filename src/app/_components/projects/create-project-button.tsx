import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { type FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateProjectButtonProps {}

export const CreateProjectButtonButton: FC<CreateProjectButtonProps> = (
  props,
) => {
  return (
    <Link href={"/projects/create"}>
      <Button variant="outline" className="cursor-pointer" size={"3"}>
        <PlusIcon />
        Create Project
      </Button>
    </Link>
  );
};
