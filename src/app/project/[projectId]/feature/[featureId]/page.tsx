import { redirect } from "next/navigation";
import { schemas } from "~/lib/zod-schemas";
import { getServerAuthSession } from "~/server/auth";

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

  return (
    <div className="flex flex-col gap-3">Feature Page {params.featureId}</div>
  );
}
