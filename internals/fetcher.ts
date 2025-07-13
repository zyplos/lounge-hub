import type { ApiError } from "./apiTypes";

const GENERIC_API_ERROR =
  "Sorry, got an unexpected error trying to get the data for this page.";

export function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "errorMessage" in obj &&
    typeof (obj as ApiError).errorMessage === "string"
  );
}

// takes in FetcherError.response and returns errorMessage from api if there is one
export function getApiErrorMessage(obj: unknown): string {
  if (isApiError(obj)) {
    return obj.errorMessage;
  }

  return GENERIC_API_ERROR;
}

export class FetcherError extends Error {
  response?: unknown;
  status: number;

  constructor(message: string, status: number, response?: unknown) {
    super(message);
    this.name = "FetcherError";
    this.status = status;
    this.response = response;
  }
}

// custom fetcher that throws if response isn't ok
export default async function fetcher<T>(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    let errorResponse: unknown;

    try {
      errorResponse = await res.clone().json();
    } catch (_e) {
      // const textResponse = await res.text();
      // console.log("fetcher error, response isn't json", textResponse);
      errorResponse = { errorMessage: GENERIC_API_ERROR };
    }

    throw new FetcherError(
      "An error occurred while fetching the data.",
      res.status,
      errorResponse
    );
  }

  try {
    // response actually returns here
    return res.json() as Promise<T>;
  } catch (error) {
    // just in case
    console.error("api didn't return json for some reason", error);
    throw new FetcherError("Couldn't parse a valid API response.", res.status, {
      errorMessage: GENERIC_API_ERROR,
    });
  }
}
