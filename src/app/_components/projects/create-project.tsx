"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Button, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { createProjectInput } from "~/lib/inputs";
import { api } from "~/trpc/react";

type FormData = z.infer<typeof createProjectInput>;

export default function CreateProject() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({ resolver: zodResolver(createProjectInput) });
  const router = useRouter();

  const createProject = api.project.create.useMutation({
    onSuccess: (id) => {
      router.push("/project/" + id);
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
    // await createProject.mutateAsync({
    //   name: data.name,
    // });
  }

  return (
    <Form.Root
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-3">
        <Heading as="h1" size={"8"}>
          Basic
        </Heading>
        <div className="flex flex-col gap-4">
          <Form.Field className="flex flex-col gap-2" name="name">
            <div className="flex flex-row justify-between">
              <Form.Label>
                <Heading as="h2" size={"5"}>
                  Name
                </Heading>
              </Form.Label>
              <div>
                <Form.Message match={"badInput"}></Form.Message>
                <Form.Message match={"valueMissing"}></Form.Message>
              </div>
            </div>
            <Form.Control asChild>
              <input
                type="text"
                className="rounded-md p-2"
                {...register("name", { required: true })}
                required
              />
            </Form.Control>
          </Form.Field>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Heading as="h1" size={"8"}>
          Links
        </Heading>
        <div className="flex flex-col gap-4">
          <Form.Field className="flex flex-col gap-2" name="name">
            <div className="flex flex-row justify-between">
              <Form.Label>
                <Heading as="h2" size={"5"}>
                  GitHub URL
                </Heading>
              </Form.Label>
              <div>
                <Form.Message match={"badInput"}></Form.Message>
                <Form.Message match={"valueMissing"}></Form.Message>
              </div>
            </div>
            <Form.Control asChild>
              <input
                type="text"
                className="rounded-md p-2"
                {...register("websiteUrl", { required: true })}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="flex flex-col gap-2" name="name">
            <div className="flex flex-row justify-between">
              <Form.Label>
                <Heading as="h2" size={"5"}>
                  Website URL
                </Heading>
              </Form.Label>
              <div>
                <Form.Message match={"badInput"}></Form.Message>
                <Form.Message match={"valueMissing"}></Form.Message>
              </div>
            </div>
            <div className="w-full">
              <Form.Control asChild className="w-full">
                <input
                  type="text"
                  className="rounded-md p-2"
                  {...register("githubUrl", { required: true })}
                />
              </Form.Control>
            </div>
          </Form.Field>
        </div>
      </div>
      <Form.Submit asChild>
        <Button type="submit" variant="classic">
          Create
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}
