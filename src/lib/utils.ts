import clsx, { type ClassValue } from "clsx";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const merge = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const createUrlFromObject = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
  newParams: Record<string, string>,
) => {
  const searchParams = new URLSearchParams(params);
  for (const key in newParams) {
    if (!Object.hasOwn(newParams, key)) {
      continue;
    }
    const value = newParams[key]!;
    searchParams.set(key, value);
  }
  return createUrl(pathname, searchParams);
};

export const getAndSetDefaultAlignment = (
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
) => {
  // passing URLSearchParams from server component to client component causes it to be serialized as array
  // instead of retyping it in every component it is retyped in utils
  searchParams = new URLSearchParams(searchParams);

  let defaultAlign = "row";
  if (typeof window !== "undefined") {
    defaultAlign = localStorage.getItem("align") ?? "row";
  }

  const alignment = searchParams.get("align") ?? defaultAlign ?? "row";

  if (typeof window !== "undefined") {
    localStorage.setItem("align", alignment);
  }

  console.log("Alignment is", alignment);
  return alignment;
};

const getValueForKey = (obj: Record<string, string>, key: string) => {
  if (Object.keys(obj).find((key) => key == key) === undefined) {
    return null;
  }
  return obj[key];
};

export const getCurrentPage = (
  serverSearchParams: ReadonlyURLSearchParams | URLSearchParams,
) => {
  const page = serverSearchParams.get("page") ?? "1";
  return Number(page);
};

export const getCurrentLimit = (
  serverSearchParams: ReadonlyURLSearchParams | URLSearchParams,
) => {
  const limit = serverSearchParams.get("limit") ?? "10";
  return Number(limit);
};

export const getPageAndLimit = (
  serverSearchParams: ReadonlyURLSearchParams | URLSearchParams,
) => {
  return [
    getCurrentPage(serverSearchParams),
    getCurrentLimit(serverSearchParams),
  ];
};
