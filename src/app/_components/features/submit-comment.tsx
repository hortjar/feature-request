"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, TextArea } from "@radix-ui/themes";
import { type HTMLAttributes, type FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { merge } from "~/lib/utils";
import * as Form from "@radix-ui/react-form";
import { schemas } from "~/lib/zod-schemas";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SubmitCommentProps extends HTMLAttributes<HTMLFormElement> {
  featureId: string;
  userId: string;
}

const submitCommentInput = z.object({
  content: schemas.content,
});
type FormData = z.infer<typeof submitCommentInput>;

export const SubmitComment: FC<SubmitCommentProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({ resolver: zodResolver(submitCommentInput) });
  const router = useRouter();

  const submitComment = api.feature.submitComment.useMutation({
    onSuccess: (id) => {
      router.refresh();
    },
  });

  async function onSubmit(data: FormData) {
    await submitComment.mutateAsync({
      featureId: props.featureId,
      userId: props.userId,
      content: data.content,
    });
  }

  return (
    <Form.Root
      className={merge("flex flex-col gap-3", props.className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Field name="content">
        <Form.Control asChild>
          <TextArea
            placeholder="Add a comment..."
            {...register("content", { required: true })}
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <Button
          className={merge(
            isValid ? "cursor-pointer" : "cursor-default",
            "w-32 self-end",
          )}
          variant="outline"
          disabled={!isValid || isSubmitting}
        >
          <PlusIcon />
          Submit
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};
