import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Heading } from "@radix-ui/themes";
import { getServerAuthSession } from "~/server/auth";
import { type Feature } from "~/server/db/types";
import FeatureRating from "./feature-rating";

export default async function Feature({ feature }: { feature: Feature }) {
  const session = await getServerAuthSession();

  console.log(feature.ratings);

  return (
    <div
      key={feature.id}
      className="grid grid-cols-[auto_1fr] grid-rows-[2rem_1fr] gap-1"
    >
      <div className="col-start-1 row-span-2 row-start-1 items-center justify-center">
        <FeatureRating
          featureId={feature.id}
          ratings={feature.ratings}
          userId={session?.user.id}
        />
      </div>
      <Heading className="col-start-2 row-start-1">{feature.name}</Heading>
      <div className="col-start-2 row-start-2">{feature.content}</div>
    </div>
  );
}
