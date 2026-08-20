"use client";

import { DependencyList, useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api-client";

interface UseApiOptions<T> {
  deps?: DependencyList;
  enabled?: boolean;
  initialData?: T | null;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const { deps = [], enabled = true, initialData = null } = options;
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<ApiError | Error | null>(null);
  const [isLoading, setIsLoading] = useState(enabled && initialData === null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (caughtError) {
      const normalizedError =
        caughtError instanceof Error
          ? caughtError
          : new Error("Unexpected request failure");

      setError(normalizedError);
      throw normalizedError;
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    void execute();
  }, [enabled, execute, ...deps]);

  return {
    data,
    error,
    isLoading,
    refetch: execute,
    setData,
  };
}
