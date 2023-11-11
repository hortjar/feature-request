import { Heading } from "@radix-ui/themes";
import { getServerAuthSession } from "~/server/auth";
import { FeatureRating } from "./feature-rating";
import { type FC } from "react";
import { type Feature } from "~/server/db/types";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface FeatureProps {
  feature: Feature;
  projectId: string;
}

export const FeaturePreview: FC<FeatureProps> = async (props) => {
  const session = await getServerAuthSession();
  const iconSize = 25;

  return (
    <div
      key={props.feature.id}
      className="hoverable-card grid grid-cols-[auto_1fr] grid-rows-[1fr] gap-1 py-3 pr-5"
    >
      <div className="col-start-1 row-start-1 items-center justify-center">
        <FeatureRating
          featureId={props.feature.id}
          ratings={props.feature.ratings}
          userId={session?.user.id}
        />
      </div>
      <Link
        href={`${props.projectId}/feature/${props.feature.id}`}
        className="gap1 grid grid-cols-[1fr_auto] grid-rows-[2em_1fr]"
      >
        <Heading className="col-start-1 row-start-1 pt-1">
          {props.feature.name}
        </Heading>
        <div className="col-start-1 row-start-2 pt-2">
          {props.feature.content}
        </div>
        <div className="col-start-2 row-span-2 row-start-1 items-center justify-center">
          <div className="flex h-full items-center justify-center">
            <ChevronRightIcon width={iconSize} height={iconSize} />
          </div>
        </div>
      </Link>
    </div>
  );
};
