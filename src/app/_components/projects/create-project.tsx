"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

const schema = z.object({
  name: z.string().min(1).max(255),
});

type FormData = z.infer<typeof schema>;

export default function CreateProject() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const router = useRouter();

  const createProject = api.project.create.useMutation({
    onSuccess: (id) => {
      router.push("/project/" + id);
    },
  });

  async function onSubmit(data: FormData) {
    console.log(data);
    await createProject.mutateAsync({
      name: data.name,
    });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name", { required: true })} />
      {errors?.name && <p>Name cannot be null</p>}
      <Button type="submit">Create</Button>
    </form>
  );
}
