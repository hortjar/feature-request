"use client";

import {
  CaretDownIcon,
  ChatBubbleIcon,
  ExitIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { type FC } from "react";

interface UserPanelProps {
  userName: string;
}

export const UserPanel: FC<UserPanelProps> = (props) => {
  const linkClass = "flex flex-row items-center gap-3";

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
        <DropdownMenu.Item>
          <Link href="/profile" className={linkClass}>
            <PersonIcon />
            Profile
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href="/projects" className={linkClass}>
            <RocketIcon />
            Projects
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href="/features" className={linkClass}>
            <ChatBubbleIcon />
            Features
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Link href="/api/auth/signout" className={linkClass}>
            <ExitIcon />
            Sign Out
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
