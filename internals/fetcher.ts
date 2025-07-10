import type { ApiError } from "./apiTypes";

export function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "errorMessage" in obj &&
    typeof (obj as ApiError).errorMessage === "string"
  );
}

export interface FetcherError extends Error {
  // response contains the api error, use isApiError for type guarding
  response?: unknown;
  status?: number;
}

// custom fetcher that throws if response isn't ok
export default async function fetcher<T>(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error: FetcherError = new Error(
      "An error occurred while fetching the data."
    );

    try {
      error.response = await res.clone().json();
    } catch (_e) {
      // const textResponse = await res.text();
      // console.log("fetcher error, response isn't json", textResponse);
      error.response = { errorMessage: "An unexpected error occurred." };
    }

    error.status = res.status;
    throw error;
  }

  return res.json() as Promise<T>;
}
