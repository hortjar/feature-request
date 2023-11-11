import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { FeaturePreview } from "~/app/_components/features/feature-preview";
import { Button, Heading } from "@radix-ui/themes";
import { schemas } from "~/lib/zod-schemas";
import { getServerAuthSession } from "~/server/auth";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Project({
  params,
}: {
  params: { projectId: string };
}) {
  const isValid = schemas.id.safeParse(params.projectId);
  if (!isValid.success) {
    redirect("/");
  }

  const session = await getServerAuthSession();
  const features = await api.feature.getForProject.query(isValid.data);
  const project = await api.project.getById.query(isValid.data);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Heading>{project?.name}</Heading>
          {features.length <= 0 ? (
            <span>
              This project currently has no feature requests, be the first to
              add one!
            </span>
          ) : (
            <span>{features.length} feature requests</span>
          )}
        </div>
        {session?.user && (
          <div>
            <Link href={`${isValid.data}/feature/create`}>
              <Button variant="outline" className="cursor-pointer" size={"3"}>
                <PlusIcon />
                Request a feature
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {features.map((feature) => (
          <FeaturePreview
            key={feature.id}
            feature={feature}
            projectId={isValid.data}
          />
        ))}
      </div>
    </div>
  );
}
