"use client";

import { Text } from "@radix-ui/themes";
import { PuffLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-36 w-full items-end justify-center">
      <div className="flex flex-col gap-4">
        <Text className=" text-gray-300">Loading</Text>
        <PuffLoader key="loader" color={"#fff"} speedMultiplier={0.5} />
      </div>
    </div>
  );
}
