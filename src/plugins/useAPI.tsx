import { useMemo } from 'react';
import type {SWRConfiguration, SWRResponse} from "swr";
import useSWR from 'swr';
import useSWRMutation, {type SWRMutationConfiguration, type SWRMutationResponse} from "swr/mutation";

// Types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface UseApiOptions<T = any> extends Omit<SWRConfiguration<T>, 'fetcher'> {
    // Override method detection
    method?: HttpMethod;

    // Auto-generate key options
    keyPrefix?: string;
    includeArgs?: boolean;

    // Transform response
    transform?: (data: any) => T;

    // For mutations
    options?: SWRMutationConfiguration<T, Error>;
}

interface UseApiQueryReturn<T> extends SWRResponse<T, Error> {
    loading: boolean;
    refresh: () => Promise<T | undefined>;
}

interface UseApiMutationReturn<T> extends SWRMutationResponse<T, Error> {
    loading: boolean;
    execute: (arg?: any, options?: { optimisticData?: T }) => Promise<T | undefined>;
}

// Default configurations by HTTP method
const DEFAULT_CONFIGS: Record<HttpMethod, UseApiOptions> = {
    GET: {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 1000,
    },
    POST: {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 0,
        errorRetryCount: 0,
    },
    PUT: {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 0,
        errorRetryCount: 0,
    },
    DELETE: {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 0,
        errorRetryCount: 0,
    },
};

// Detect HTTP method from function name or analyze function
function detectHttpMethod(fn: Function): HttpMethod {
    const fnString = fn.toString();
    const name = fn.name.toLowerCase();

    // Check function name patterns
    if (name.includes('get') || name.includes('fetch') || name.includes('load') || name.includes('find')) return 'GET';
    if (name.includes('post') || name.includes('create') || name.includes('add') || name.includes('login') || name.includes('register')) return 'POST';
    if (name.includes('put') || name.includes('update') || name.includes('edit') || name.includes('modify')) return 'PUT';
    if (name.includes('delete') || name.includes('remove') || name.includes('destroy')) return 'DELETE';

    // Analyze function body for method calls
    if (fnString.includes('GetRequest') || fnString.includes('method: "GET"')) return 'GET';
    if (fnString.includes('PostRequest') || fnString.includes('FormPostRequest') || fnString.includes('method: "POST"')) return 'POST';
    if (fnString.includes('PutRequest') || fnString.includes('method: "PUT"')) return 'PUT';
    if (fnString.includes('DeleteRequest') || fnString.includes('method: "DELETE"')) return 'DELETE';

    // Default to GET if can't determine
    return 'GET';
}

// Generate SWR key
function generateKey(fn: Function, args: any[], options: UseApiOptions): string | null {
    const prefix = options.keyPrefix || fn.name;

    if (options.includeArgs && args.length > 0) {
        // For functions with args, include them in the key
        return `${prefix}_${JSON.stringify(args)}`;
    }

    return prefix;
}

// Create fetcher function with transform
function createFetcher<T>(apiFunction: Function, transform?: (data: any) => T) {
    return async (...args: any[]): Promise<T> => {
        const result = await apiFunction(...args);
        return transform ? transform(result) : result;
    };
}

// Create mutation fetcher
function createMutationFetcher<T>(apiFunction: Function, transform?: (data: any) => T) {
    return async (key: string, { arg }: { arg?: any }): Promise<T> => {
        const result = await apiFunction(arg);
        return transform ? transform(result) : result;
    };
}

// Internal function for GET requests (queries)
function _useApiQuery<T = any>(
    apiFunction: (...args: any[]) => Promise<T>,
    args: any[] = [],
    options: UseApiOptions<T> = {}
): UseApiQueryReturn<T> {
    const httpMethod = options.method || detectHttpMethod(apiFunction);
    const defaultConfig = DEFAULT_CONFIGS[httpMethod];
    const config = { ...defaultConfig, ...options };

    const key = useMemo(() =>
            generateKey(apiFunction, args, config),
        [apiFunction, args, config]
    );

    const fetcher = useMemo(() =>
            createFetcher(apiFunction, config.transform),
        [apiFunction, config.transform]
    );

    const swrResult = useSWR<T, Error>(
        key ? [key, ...args] : null,
        () => fetcher(...args),
        config
    );

    return {
        ...swrResult,
        loading: swrResult.isLoading,
        refresh: swrResult.mutate,
    };
}

// Internal function for POST/PUT/DELETE requests (mutations)
function _useApiMutation<T = any>(
    apiFunction: (...args: any[]) => Promise<T>,
    options: UseApiOptions<T> = {}
): UseApiMutationReturn<T> {
    const httpMethod = options.method || detectHttpMethod(apiFunction);
    const defaultConfig = DEFAULT_CONFIGS[httpMethod];
    const config = { ...defaultConfig, ...options };

    const key = useMemo(() =>
            generateKey(apiFunction, [], config),
        [apiFunction, config]
    );

    const mutationFetcher = useMemo(() =>
            createMutationFetcher(apiFunction, config.transform),
        [apiFunction, config.transform]
    );

    const swrMutationResult = useSWRMutation<T, Error>(
        key,
        mutationFetcher,
        config.options
    );

    return {
        ...swrMutationResult,
        loading: swrMutationResult.isMutating,
        execute: swrMutationResult.trigger,
    };
}

// Universal useApi hook that auto-detects and chooses the right approach
export function useApi<T = any>(
    apiFunction: (...args: any[]) => Promise<T>,
    argsOrOptions?: any[] | UseApiOptions<T>,
    optionsParam?: UseApiOptions<T>
): UseApiQueryReturn<T> | UseApiMutationReturn<T> {
    // Parse arguments
    let args: any[] = [];
    let options: UseApiOptions<T> = {};

    if (Array.isArray(argsOrOptions)) {
        args = argsOrOptions;
        options = optionsParam || {};
    } else {
        options = argsOrOptions || {};
    }

    const httpMethod = options.method || detectHttpMethod(apiFunction);

    // For GET requests, use query approach
    if (httpMethod === 'GET') {
        return _useApiQuery(apiFunction, args, options);
    }

    // For POST/PUT/DELETE, use mutation approach
    return _useApiMutation(apiFunction, options) as UseApiMutationReturn<T>;
}
