import { Heading } from "@radix-ui/themes";
import { getServerAuthSession } from "~/server/auth";
import { FeatureRating } from "./feature-rating";
import { type FC } from "react";
import { type Feature } from "~/server/db/types";

interface FeatureProps {
  feature: Feature;
}

export const FeaturePreview: FC<FeatureProps> = async (props) => {
  const session = await getServerAuthSession();

  return (
    <div
      key={props.feature.id}
      className="grid grid-cols-[auto_1fr] grid-rows-[2rem_1fr] gap-1"
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
    </div>
  );
};
