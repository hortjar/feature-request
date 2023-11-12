import { Heading, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { FeatureRating } from "~/app/_components/features/feature-rating";
import { schemas } from "~/lib/zod-schemas";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Feature({
  params,
}: {
  params: { featureId: string };
}) {
  const isValid = schemas.id.safeParse(params.featureId);
  if (!isValid.success) {
    redirect("/");
  }

  const session = await getServerAuthSession();
  const feature = await api.feature.getById.query(isValid.data);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-3">
      <FeatureRating
        featureId={isValid.data}
        userId={session?.user.id}
        ratings={feature!.ratings}
        className="col-start-1"
      />
      <div className="col-start-2 flex flex-col gap-3">
        <Heading as="h1">{feature?.name}</Heading>
        <Text>{feature?.content}</Text>
      </div>
    </div>
  );
}
