"use client";

import {
  CaretDownIcon,
  ChatBubbleIcon,
  ExitIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type FC } from "react";

interface UserPanelProps {
  userName: string;
}

export const UserPanel: FC<UserPanelProps> = (props) => {
  const linkClass =
    "flex flex-row items-center justify-start gap-3 w-full cursor-pointer";
  const router = useRouter();

  const navigateToItem = (link: string) => {
    router.push(link);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="ghost"
          highContrast
          color="gray"
          className="text-md flex cursor-pointer flex-row items-center justify-center gap-3 p-3"
        >
          <PersonIcon width={20} height={20} />
          <span className="text-[1.1em]">{props.userName}</span>
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          className={linkClass}
          onSelect={() => navigateToItem("/profile")}
        >
          <PersonIcon />
          <Text>Profile</Text>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className={linkClass}
          onSelect={() => navigateToItem("/projects")}
        >
          <RocketIcon />
          Projects
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className={linkClass}
          onSelect={() => navigateToItem("/features")}
        >
          <ChatBubbleIcon />
          Features
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          className={linkClass}
          onSelect={() => navigateToItem("/api/auth/signout")}
        >
          <ExitIcon />
          Sign Out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
