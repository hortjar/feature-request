"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { type Rating } from "~/server/db/types";
import { api } from "~/trpc/react";

interface FeatureRating {
  ratings: Array<Rating>;
  userId: string | undefined;
  featureId: string;
}

export const FeatureRating: FC<FeatureRating> = (props) => {
  const router = useRouter();

  const iconSize = 26;

  function hasUserRated(value: number) {
    return (
      props.ratings.find(
        (rating) => rating.value == value && rating.createdById == props.userId,
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
      const existingRating = props.ratings.find((rating) => rating.id == id);
      if (existingRating) {
        existingRating.value = value;
      }
    },
  });

  async function submitRating(value: number) {
    if (!props.userId) {
      return;
    }

    const existingRating = props.ratings.find(
      (rating) => rating.createdById == props.userId,
    );

    if (existingRating) {
      await updateRating.mutateAsync({
        id: existingRating.id,
        value: existingRating?.value == value ? 0 : value,
        createdById: props.userId,
        featureId: props.featureId,
      });
    } else {
      await createRating.mutateAsync({
        value: value,
        createdById: props.userId,
        featureId: props.featureId,
      });
    }
  }

  return (
    <div className="mx-8 flex h-28 flex-col items-center justify-center gap-3">
      <IconButton
        variant="ghost"
        radius="full"
        color="orange"
        className={props.userId ? "cursor-pointer" : "cursor-default"}
        disabled={props.userId == undefined}
        onClick={() => submitRating(1)}
      >
        <ChevronUpIcon
          width={iconSize}
          height={iconSize}
          className={`${props.userId ? "cursor-pointer" : "cursor-default"} ${
            hasUserRated(1) ? "text-orange-300" : "text-slate-200"
          }`}
        />
      </IconButton>
      <span className="font-semibold">
        {props.ratings.reduce((sum, rating) => sum + rating.value, 0)}
      </span>
      <IconButton
        variant="ghost"
        radius="full"
        color="indigo"
        className={props.userId ? "cursor-pointer" : "cursor-default"}
        disabled={props.userId == undefined}
        onClick={() => submitRating(-1)}
      >
        <ChevronDownIcon
          width={iconSize}
          height={iconSize}
          className={`${props.userId ? "cursor-pointer" : "cursor-default"} ${
            hasUserRated(-1) ? "text-blue-300" : "text-slate-300"
          }`}
        />
      </IconButton>
    </div>
  );
};
