"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { api } from "~/trpc/react";

export default function CreateProject() {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        createProject.mutate({
          name: nameRef.current!.value,
        });
      }}
    >
      <input type="text" ref={nameRef} />
      <Button type="submit">Create</Button>
    </form>
  );
}
