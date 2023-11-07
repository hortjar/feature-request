import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Feature from "~/app/_components/features/feature";
import { Heading } from "@radix-ui/themes";
import { schemas } from "~/lib/zod-schemas";
import { getServerAuthSession } from "~/server/auth";

export default async function Project({ params }: { params: { id: string } }) {
  const isValid = schemas.id.safeParse(params.id);
  if (!isValid.success) {
    redirect("/");
  }

  const session = await getServerAuthSession();
  const features = await api.feature.getForProject.query(isValid.data);
  const project = await api.project.getById.query(isValid.data);
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Heading>{project?.name}</Heading>
        {features.length <= 0 ? (
          <span>
            This project currently has no feature requests, be the first to add
            one!
          </span>
        ) : (
          <span>{features.length} feature requests</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {features.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  );
}
