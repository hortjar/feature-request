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
