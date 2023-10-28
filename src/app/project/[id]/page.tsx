import { z } from "zod";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Project({ params }: { params: { id: string } }) {
  const isValid = z.number().finite().safe().safeParse(Number(params.id));
  if (!isValid.success) {
    redirect("/");
  }
  const features = await api.feature.getForProject.query(isValid.data);
  return (
    <div className="flex flex-col gap-3">
      <span>This is a project page with {features.length} features</span>
      <div className="flex flex-col gap-3">
        {features.map((feature) => {
          return <span key={feature.id}>{feature.name}</span>;
        })}
      </div>
    </div>
  );
}
