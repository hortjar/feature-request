import { Heading } from "@radix-ui/themes";
import { getServerAuthSession } from "~/server/auth";
import { FeatureRating } from "./feature-rating";
import { type FC } from "react";
import { type Feature } from "~/server/db/types";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface FeatureProps {
  feature: Feature;
}

export const FeaturePreview: FC<FeatureProps> = async (props) => {
  const session = await getServerAuthSession();
  const iconSize = 25;

  return (
    <Link
      href={"feature/" + props.feature.id}
      className="rounded-lg py-3 pr-3 ring-slate-700 transition duration-100 hover:ring"
    >
      <div
        key={props.feature.id}
        className="grid grid-cols-[auto_1fr_auto] grid-rows-[2rem_1fr] gap-1"
      >
        <div className="col-start-1 row-span-2 row-start-1 items-center justify-center">
          <FeatureRating
            featureId={props.feature.id}
            ratings={props.feature.ratings}
            userId={session?.user.id}
          />
        </div>
        <Heading className="col-start-2 row-start-1">
          {props.feature.name}
        </Heading>
        <div className="col-start-2 row-start-2">{props.feature.content}</div>
        <div className="col-start-3 row-span-2 row-start-1 items-center justify-center">
          <div className="flex h-full items-center justify-center">
            <ChevronRightIcon width={iconSize} height={iconSize} />
          </div>
        </div>
      </div>
    </Link>
  );
};
