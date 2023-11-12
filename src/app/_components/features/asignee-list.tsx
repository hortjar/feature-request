import { type FC } from "react";
import { type FeatureAsignee } from "~/server/db/types";
import { Text } from "@radix-ui/themes";
import { UserSimple } from "../layout/user-simple";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AsigneeListProps {
  asignees: Array<FeatureAsignee>;
}

export const AsigneeList: FC<AsigneeListProps> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      <Text weight={"bold"}>Asignees</Text>
      {props.asignees.map((x) => (
        <UserSimple key={x.id} user={x.user} />
      ))}
    </div>
  );
};
