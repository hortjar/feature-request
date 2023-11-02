"use client";

import { PuffLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-36 w-full items-end justify-center">
      <div className="flex flex-col gap-4">
        <span className="text-base text-gray-300">Loading</span>
        <PuffLoader key="loader" color={"#fff"} />
      </div>
    </div>
  );
}
