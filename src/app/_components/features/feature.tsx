import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Heading } from "@radix-ui/themes";
import { getServerAuthSession } from "~/server/auth";
import { type Feature } from "~/server/db/types";

export default async function Feature({ feature }: { feature: Feature }) {
  const session = await getServerAuthSession();
  const iconSize = 26;

  function hasUserRated(value: number) {
    return (
      feature.ratings.find(
        (rating) =>
          rating.value == value && rating.createdById == session?.user.id,
      ) != undefined
    );
  }

  return (
    <div
      key={feature.id}
      className="grid grid-cols-[auto_1fr] grid-rows-[2rem_1fr] gap-1"
    >
      <div className="col-start-1 row-span-2 row-start-1 items-center justify-center">
        <div className="mx-8 flex h-28 flex-col items-center justify-center gap-3">
          <ChevronUpIcon
            width={iconSize}
            height={iconSize}
            className={`${
              session?.user ? "cursor-pointer" : "cursor-default"
            } ${hasUserRated(1) ? "text-orange-300" : "text-slate-200"}`}
          />
          <span className="font-semibold">
            {feature.ratings.reduce((sum, rating) => sum + rating.value, 0)}
          </span>
          <ChevronDownIcon
            width={iconSize}
            height={iconSize}
            className={`${
              session?.user ? "cursor-pointer" : "cursor-default"
            } ${hasUserRated(-1) ? "text-blue-300" : "text-slate-300"}`}
          />
        </div>
      </div>
      <Heading className="col-start-2 row-start-1">{feature.name}</Heading>
      <div className="col-start-2 row-start-2">{feature.content}</div>
    </div>
  );
}
