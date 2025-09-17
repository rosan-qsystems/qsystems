import {BASE_URL} from "../config/baseURL.tsx";
import {isAuthenticated} from "../utils/helper/checkIfAuthenticated.ts";
import {getToken} from "../utils/helper/tokenStorage.helper.ts";

export const fetchWithConfig = async (url: string, options: any = {}) => {
  const { body, contentType = "application/json", ...otherOptions } = options;

  console.log(BASE_URL);
  const isFormData = body instanceof FormData;

  const headers: any = {
    ...(isFormData ? {} : { "Content-Type": contentType }),
    ...(isAuthenticated() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...(otherOptions.headers || {}),
  };

  const config = {
    ...otherOptions,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(
        `${url.includes("http") ? "" : BASE_URL}${url}`,
        config,
    );

    // Check for HTTP errors FIRST
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If response isn't JSON, use the default HTTP error message
      }

      throw new Error(errorMessage);
    }

    const resContentType = response.headers.get("content-type");
    if (!resContentType || !resContentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    console.log("This is api", `${BASE_URL}${url}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    throw error; // Use throw instead of Promise.reject for consistency
  }
};