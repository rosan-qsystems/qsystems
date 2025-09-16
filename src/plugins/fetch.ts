import { BASE_URL } from "../config/baseURL";
import { getToken } from "../utils/helpers/tokenStorage.helper";
import { isAuthenticated } from "../utils/helpers/checkIfAuthenticated";

export const fetchWithConfig = async (url: string, options: any = {}) => {
  const { body, contentType = "application/json", ...otherOptions } = options;

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
      `${BASE_URL.includes("http") ? "" : BASE_URL}${url}`,
      config,
    );
    const resContentType = response.headers.get("content-type");

    if (!resContentType || !resContentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    console.log("This is api", `${BASE_URL}${url}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return Promise.reject(error);
  }
};
