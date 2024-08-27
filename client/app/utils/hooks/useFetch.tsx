import { useState, useEffect, useRef, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import api from '../api';

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null | any;
};

export function useFetch<T>(url: string, options?: AxiosRequestConfig, shouldFetch: boolean = true): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  // Use useRef for mutable options to avoid unnecessary re-renders
  const optionsRef = useRef<AxiosRequestConfig | undefined>(options);
  optionsRef.current = options;

  // Use useRef for abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort(); // Abort any ongoing request
    abortControllerRef.current = new AbortController();
    setLoading(true)
    try {
      const response: AxiosResponse<T> = await api(url, {
        ...optionsRef.current,
        signal: abortControllerRef.current.signal,
      });
      console.log(response)
      setData(response.data);
      setError(null);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else if (error instanceof Error) {
        console.error('Fetch error:', error);
        setError(error as AxiosError);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    console.log(shouldFetch)
    if (shouldFetch) {
      setLoading(true);
      fetchData();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, fetchData, shouldFetch]);

  return { data, loading, error };
}