import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { TIME_OUT } from "../config";
import IResponse from "./type";
import { useState, useCallback } from "react";

const useHttpRequest = () => {
  const [service] = useState<AxiosInstance>(() =>
    axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      timeout: TIME_OUT,
    }),
  );

  service.interceptors.request.use(
    (config) => {
      /**
       * Set your config
       */
      return config;
    },
    (error: AxiosError) => {
      console.log("requestError: ", error);
      return Promise.reject(error);
    },
  );

  service.interceptors.response.use(
    (response: AxiosResponse<IResponse>): AxiosResponse["data"] => {
      const { data } = response;
      const { code } = data;

      if (code) {
        return response;
      } else {
        return Promise.reject("Error! code missing!");
      }
    },
    (error) => Promise.reject(error),
  );

  const request = useCallback(
    async <T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> => {
      const response = await service.request<IResponse<T>>(config);
      return response.data;
    },
    [service],
  );

  const get = useCallback(
    <T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> => {
      return request({ method: "GET", ...config });
    },
    [request],
  );

  const post = useCallback(
    <T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> => {
      return request({ method: "POST", ...config });
    },
    [request],
  );

  const put = useCallback(
    <T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> => {
      return request({ method: "PUT", ...config });
    },
    [request],
  );

  const deleteRequest = useCallback(
    <T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> => {
      return request({ method: "DELETE", ...config });
    },
    [request],
  );

  return { request, get, post, put, delete: deleteRequest };
};

export default useHttpRequest;
