import { Heading, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { AsigneeList } from "~/app/_components/features/asignee-list";
import { CommentList } from "~/app/_components/features/comment-list";
import { FeatureRating } from "~/app/_components/features/feature-rating";
import { StatusBadge } from "~/app/_components/features/status-badge";
import { SubmitComment } from "~/app/_components/features/submit-comment";
import { UserSimple } from "~/app/_components/layout/user-simple";
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

  if (!feature) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3">
      <FeatureRating
        featureId={isValid.data}
        userId={session?.user.id}
        ratings={feature.ratings}
        className="col-start-1"
      />
      <div className="col-start-2 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Heading as="h1">{feature.name}</Heading>
          <div className="flex flex-row items-center gap-2">
            <Text className="text-gray-300">Created by</Text>
            <UserSimple user={feature.createdBy} className="font-bold" />
          </div>
          <Text>{feature?.content}</Text>
        </div>
        <div className="flex flex-col gap-5">
          <Heading as="h2" size={"5"}>
            Comments
          </Heading>
          {session?.user && (
            <SubmitComment userId={session.user.id} featureId={feature.id} />
          )}
          <CommentList comments={feature.comments} />
        </div>
      </div>
      <div className="col-start-3 grid grid-cols-[auto_1fr] grid-rows-[auto_100%] gap-4">
        <Heading className="col-start-1" as="h3" size="3">
          Status
        </Heading>
        <StatusBadge
          status={feature.status}
          className="col-start-2 row-start-1 text-center"
        />
        <Heading className="col-start-1 row-start-2" as="h3" size="3">
          Asignee{feature.asignees.length > 1 ? "s" : ""}
        </Heading>
        <AsigneeList
          asignees={feature.asignees}
          className="col-start-2 row-start-2"
        />
      </div>
    </div>
  );
}
