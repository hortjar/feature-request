import { type ReadonlyURLSearchParams } from "next/navigation";

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
  params: Record<string, string>,
) => {
  const urlParams = new URLSearchParams();
  for (const key in params) {
    if (!Object.hasOwn(params, key)) {
      continue;
    }
    const value = params[key]!;
    urlParams.set(key, value);
  }
  return createUrl(pathname, urlParams);
};

export const getAndSetDefaultAlignment = (
  searchParams: ReadonlyURLSearchParams,
) => {
  let defaultAlign = "row";
  if (typeof window !== "undefined") {
    defaultAlign = localStorage.getItem("align") ?? "row";
  }

  const alignment = searchParams.get("align") ?? defaultAlign ?? "row";

  if (typeof window !== "undefined") {
    localStorage.setItem("align", alignment);
  }

  return alignment;
};

export const getCurrentPage = (searchParams: ReadonlyURLSearchParams) => {
  const page = searchParams.get("page") ?? "0";
  return Number(page);
};

export const getCurrentLimit = (searchParams: ReadonlyURLSearchParams) => {
  const limit = searchParams.get("limit") ?? "10";
  return Number(limit);
};

export const getPageAndLimit = (searchParams: ReadonlyURLSearchParams) => {
  return [getCurrentPage(searchParams), getCurrentLimit(searchParams)];
};
