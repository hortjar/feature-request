import { type HTMLAttributes, type FC } from "react";
import { type FeatureAsignee } from "~/server/db/types";
import { UserSimple } from "../layout/user-simple";
import { merge } from "~/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsigneeListProps extends HTMLAttributes<HTMLDivElement> {
  asignees: Array<FeatureAsignee>;
}

export const AsigneeList: FC<AsigneeListProps> = (props) => {
  return (
    <div className={merge("flex flex-col gap-2", props.className)}>
      {props.asignees.map((x) => (
        <UserSimple key={x.id} user={x.user} />
      ))}
    </div>
  );
};
