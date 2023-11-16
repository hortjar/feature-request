import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { type HTMLAttributes, type FC } from "react";
import { type UserSimple as UserSimpleType } from "~/server/db/types";
import { Text } from "@radix-ui/themes";
import { merge } from "~/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserSimpleProps extends HTMLAttributes<HTMLDivElement> {
  user: UserSimpleType;
}

export const UserSimple: FC<UserSimpleProps> = (props) => {
  return (
    <div
      className={merge(
        "flex flex-row items-center gap-3 rounded-l-full rounded-r-lg",
        props.className,
      )}
    >
      {props.user.image ? (
        <Image
          className="rounded-full"
          src={props.user.image}
          alt={props.user.name ?? "Username"}
          width={"30"}
          height={"30"}
        />
      ) : (
        <div className="rounded-full">
          <PersonIcon />
        </div>
      )}
      <Text>{props.user.name}</Text>
    </div>
  );
};
