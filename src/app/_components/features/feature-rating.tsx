"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type Rating } from "~/server/db/types";
import { api } from "~/trpc/react";

export default function ExportRating({
  ratings,
  userId,
  featureId,
}: {
  ratings: Array<Rating>;
  userId: string | undefined;
  featureId: string;
}) {
  const router = useRouter();

  const iconSize = 26;

  function hasUserRated(value: number) {
    return (
      ratings.find(
        (rating) => rating.value == value && rating.createdById == userId,
      ) != undefined
    );
  }

  const createRating = api.rating.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const updateRating = api.rating.update.useMutation({
    onSuccess: (data, { id, value, featureId }) => {
      const existingRating = ratings.find((rating) => rating.id == id);
      if (existingRating) {
        existingRating.value = value;
      }
    },
  });

  async function submitRating(value: number) {
    if (!userId) {
      return;
    }

    const existingRating = ratings.find(
      (rating) => rating.createdById == userId,
    );

    if (existingRating) {
      await updateRating.mutateAsync({
        id: existingRating.id,
        value: existingRating?.value == value ? 0 : value,
        createdById: userId,
        featureId: featureId,
      });
    } else {
      await createRating.mutateAsync({
        value: value,
        createdById: userId,
        featureId: featureId,
      });
    }
  }

  return (
    <div className="mx-8 flex h-28 flex-col items-center justify-center gap-3">
      <IconButton
        variant="ghost"
        radius="full"
        color="orange"
        className={userId ? "cursor-pointer" : "cursor-default"}
        disabled={userId == undefined}
        onClick={() => submitRating(1)}
      >
        <ChevronUpIcon
          width={iconSize}
          height={iconSize}
          className={`${userId ? "cursor-pointer" : "cursor-default"} ${
            hasUserRated(1) ? "text-orange-300" : "text-slate-200"
          }`}
        />
      </IconButton>
      <span className="font-semibold">
        {ratings.reduce((sum, rating) => sum + rating.value, 0)}
      </span>
      <IconButton
        variant="ghost"
        radius="full"
        color="indigo"
        className={userId ? "cursor-pointer" : "cursor-default"}
        disabled={userId == undefined}
        onClick={() => submitRating(-1)}
      >
        <ChevronDownIcon
          width={iconSize}
          height={iconSize}
          className={`${userId ? "cursor-pointer" : "cursor-default"} ${
            hasUserRated(-1) ? "text-blue-300" : "text-slate-300"
          }`}
        />
      </IconButton>
    </div>
  );
}
