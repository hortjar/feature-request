import { z } from "zod";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Feature from "~/app/_components/features/feature";
import { Heading } from "@radix-ui/themes";

export default async function Project({ params }: { params: { id: string } }) {
  const isValid = z.string().min(1).max(31).safeParse(params.id);
  if (!isValid.success) {
    redirect("/");
  }
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
