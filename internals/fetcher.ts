interface FetchError extends Error {
  info?: any;
  status?: number;
}

const fetcher = async <JSON = any>(
  url: string | URL,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(url, init);

  if (!res.ok) {
    const error: FetchError = new Error(
      "An error occurred while fetching the data."
    );

    try {
      error.info = await res.clone().json();
    } catch (e) {
      // If cloning and parsing as JSON fails, try to get plain text
      try {
        error.info = { message: await res.text() };
      } catch (textError) {
        error.info = { message: "Failed to retrieve error details." };
      }
    }

    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default fetcher;
