import { z } from "zod";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Feature from "~/app/_components/features/feature";

export default async function Project({ params }: { params: { id: string } }) {
  const isValid = z.string().min(1).max(31).safeParse(params.id);
  if (!isValid.success) {
    redirect("/");
  }
  const features = await api.feature.getForProject.query(isValid.data);
  return (
    <div className="flex flex-col gap-3">
      <span>This is a project page with {features.length} features</span>
      <div className="flex flex-col gap-3">
        {features.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  );
}
