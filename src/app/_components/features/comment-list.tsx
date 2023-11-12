import { type FC } from "react";
import { type FeatureComment } from "~/server/db/types";
import { UserSimple } from "../layout/user-simple";
import { Text } from "@radix-ui/themes";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CommentListProps {
  comments: Array<FeatureComment>;
}

export const CommentList: FC<CommentListProps> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      {props.comments.map((x) => (
        <div key={x.id} className="flex flex-col gap-3">
          <UserSimple user={x.user} />
          <Text>{x.content}</Text>
        </div>
      ))}
    </div>
  );
};
