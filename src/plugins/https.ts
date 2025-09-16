import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { fetchWithConfig } from "./fetch";

// Improved type definitions
interface BaseRequestConfig {
  [key: string]: any;
}

interface RequestConfig extends BaseRequestConfig {
  swr?: false;
}

interface SWRRequestConfig extends BaseRequestConfig {
  swr: true;
  swrConfig?: SWRConfiguration;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Union type for config parameter
type RequestConfigUnion = RequestConfig | SWRRequestConfig;

// Helper function to create SWR fetcher with proper error handling
const createFetcher = (method: HttpMethod, body?: any) => {
  return async (url: string) => {
    const config: any = { method };

    if (body !== undefined && (method === "POST" || method === "PUT")) {
      config.body = body;
    }

    return fetchWithConfig(url, config);
  };
};

// Helper to create a stable hash from FormData
const hashFormData = (formData: FormData): string => {
  const entries: string[] = [];

  // Sort entries by key for consistent hashing
  const sortedEntries = Array.from(formData.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  for (const [key, value] of sortedEntries) {
    if (value instanceof File) {
      // For files, use name, size, and lastModified for consistency
      entries.push(
        `${key}:file:${value.name}:${value.size}:${value.lastModified}`,
      );
    } else {
      entries.push(`${key}:${value}`);
    }
  }

  return entries.join("|");
};

// Improved cache key generation with better hashing for complex objects
const generateCacheKey = (
  url: string,
  method: HttpMethod,
  body?: any,
): string => {
  if (method === "GET") return url;

  // Handle different body types
  let bodyKey = "";
  if (body instanceof FormData) {
    // Create stable hash from FormData contents
    bodyKey = `formdata:${hashFormData(body)}`;
  } else if (body !== undefined) {
    try {
      bodyKey = JSON.stringify(body);
    } catch {
      bodyKey = String(body);
    }
  }

  return `${method}:${url}:${bodyKey}`;
};

// Generic request handler to reduce code duplication
const handleRequest = <T = any>(
  url: string,
  method: HttpMethod,
  body?: any,
  config: RequestConfigUnion = {},
): Promise<T> | SWRResponse<T> => {
  const { swr, swrConfig, ...fetchConfig } = config as SWRRequestConfig;

  if (swr) {
    const cacheKey = generateCacheKey(url, method, body);
    const fetcher = createFetcher(method, body);

    // Default SWR config for different methods
    const defaultSwrConfig: SWRConfiguration = {
      refreshInterval: 30000, // Default 30 seconds revalidation
    };

    if (method !== "GET") {
      // Non-GET requests typically shouldn't auto-revalidate
      defaultSwrConfig.revalidateOnFocus = false;
      defaultSwrConfig.revalidateOnReconnect = false;
      defaultSwrConfig.refreshInterval = 0; // Disable auto-refresh for non-GET
    }

    return useSWR<T>(cacheKey, fetcher, {
      ...defaultSwrConfig,
      ...swrConfig,
    });
  }

  return fetchWithConfig(url, { method, body, ...fetchConfig }) as Promise<T>;
};

// Simplified API functions
export const GetRequest = <T = any>(
  url: string,
  config: RequestConfigUnion = {},
): Promise<T> | SWRResponse<T> => {
  return handleRequest<T>(url, "GET", undefined, config);
};

export const PostRequest = <T = any>(
  url: string,
  body: any = {},
  config: RequestConfigUnion = {},
): Promise<T> | SWRResponse<T> => {
  return handleRequest<T>(url, "POST", body, config);
};

export const FormPostRequest = <T = any>(
  url: string,
  formData: FormData,
  config: RequestConfigUnion = {},
): Promise<T> | SWRResponse<T> => {
  // Ensure form posts don't cache by default due to file uploads
  const formConfig = config.swr
    ? {
        ...config,
        swrConfig: {
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          dedupingInterval: 0, // Disable deduplication for form posts
          ...((config as SWRRequestConfig).swrConfig || {}),
        },
      }
    : config;

  return handleRequest<T>(url, "POST", formData, formConfig);
};

export const PutRequest = <T = any>(
  url: string,
  body: any = {},
  config: RequestConfigUnion = {},
): Promise<T> | SWRResponse<T> => {
  return handleRequest<T>(url, "PUT", body, config);
};

export const DeleteRequest = <T = any>(
  url: string,
  config: RequestConfigUnion = {},
): Promise<T> | SWRResponse<T> => {
  return handleRequest<T>(url, "DELETE", undefined, config);
};

// Utility function for batch requests (bonus feature)
export const BatchRequest = <T = any>(
  requests: Array<{
    url: string;
    method: HttpMethod;
    body?: any;
    config?: RequestConfig;
  }>,
): Promise<T[]> => {
  return Promise.all(
    requests.map(({ url, method, body, config }) =>
      handleRequest<T>(url, method, body, { ...config, swr: false }),
    ),
  ) as Promise<T[]>;
};

// Hook for conditional SWR usage
export const useConditionalRequest = <T = any>(
  url: string | null,
  method: HttpMethod = "GET",
  body?: any,
  config: SWRConfiguration = {},
): SWRResponse<T> => {
  const cacheKey = url ? generateCacheKey(url, method, body) : null;
  const fetcher = url ? createFetcher(method, body) : null;

  return useSWR<T>(cacheKey, fetcher, config);
};
