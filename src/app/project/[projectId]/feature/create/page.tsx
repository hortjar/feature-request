import { redirect } from "next/navigation";
import { schemas } from "~/lib/zod-schemas";
import { getServerAuthSession } from "~/server/auth";

export default async function Feature() {
  const session = await getServerAuthSession();

  return <div className="flex flex-col gap-3">Create feature</div>;
}
