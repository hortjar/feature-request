import { type HTMLAttributes, type FC } from "react";
import { Text } from "@radix-ui/themes";
import { type VariantProps, cva } from "class-variance-authority";
import { merge } from "~/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StatusBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadge> {}

const statusBadge = cva("StatusBadge", {
  variants: {
    status: {
      Pending: "bg-gray-500",
      "In Progress": "bg-indigo-500",
      Rejected: "bg-red-500",
      Completed: "bg-green-600",
    },
  },
  defaultVariants: {
    status: "Pending",
  },
});

export const StatusBadge: FC<StatusBadgeProps> = (props) => {
  return (
    <div
      className={merge(
        "py rounded-md px-3",
        statusBadge({ status: props.status }),
        props.className,
      )}
    >
      <Text>{props.status}</Text>
    </div>
  );
};
