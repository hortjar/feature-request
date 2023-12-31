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
    <div className="flex flex-col gap-7">
      {props.comments.map((x) => (
        <div key={x.id} className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-1">
            <UserSimple user={x.user} className="font-bold" />
            <Text className="text-gray-300">on</Text>
            <Text weight={"bold"}>{x.createdAt.toLocaleDateString()}</Text>
            <Text className="text-gray-300">at</Text>
            <Text className="text-gray-300">
              {x.createdAt.toLocaleTimeString()}
            </Text>
          </div>
          <Text>{x.content}</Text>
        </div>
      ))}
    </div>
  );
};
