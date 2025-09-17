import { fetchWithConfig } from "./fetch";

// Base request config for promise-only functions
interface BaseRequestConfig {
  [key: string]: any;
}

// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Promise-only request functions
export const GetRequest = <T = any>(
    url: string,
    config: BaseRequestConfig = {},
): Promise<T> => {
  return fetchWithConfig(url, { method: "GET", ...config }) as Promise<T>;
};

export const PostRequest = <T = any>(
    url: string,
    body: any = {},
    config: BaseRequestConfig = {},
): Promise<T> => {
  return fetchWithConfig(url, { method: "POST", body, ...config }) as Promise<T>;
};

export const FormPostRequest = <T = any>(
    url: string,
    formData: FormData,
    config: BaseRequestConfig = {},
): Promise<T> => {
  return fetchWithConfig(url, { method: "POST", body: formData, ...config }) as Promise<T>;
};

export const PutRequest = <T = any>(
    url: string,
    body: any = {},
    config: BaseRequestConfig = {},
): Promise<T> => {
  return fetchWithConfig(url, { method: "PUT", body, ...config }) as Promise<T>;
};

export const DeleteRequest = <T = any>(
    url: string,
    config: BaseRequestConfig = {},
): Promise<T> => {
  return fetchWithConfig(url, { method: "DELETE", ...config }) as Promise<T>;
};