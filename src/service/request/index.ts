import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { TIME_OUT } from "../config";
import IResponse from "./type";
class HttpRequest {
  service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      timeout: TIME_OUT,
    });

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        /**
         * set your config
         */
        return config;
      },
      (error: AxiosError) => {
        console.log("requestError: ", error);
        return Promise.reject(error);
      },
      // {
      //   synchronous: false,
      //   runWhen: (config: InternalAxiosRequestConfig) => {
      //     // do something

      //     // if return true, axios will execution interceptor method
      //     return true;
      //   },
      // },
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse<IResponse>): AxiosResponse["data"] => {
        const { data } = response;
        const { code } = data;
        if (code) {
          if (code !== "00000") {
            switch (code) {
              case "C0001":
                // the method to handle this code
                break;
              case "C0002":
                // the method to handle this code
                break;
              default:
                break;
            }
            return Promise.reject(data.msg);
          } else {
            return data;
          }
        } else {
          return Promise.reject("Error! code missing!");
        }
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    /**
     * TODO: execute other methods according to config
     */
    return new Promise((resolve, reject) => {
      try {
        this.service
          .request<IResponse<T>>(config)
          .then((res: AxiosResponse["data"]) => {
            resolve(res as IResponse<T>);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }

  get<T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.request({ method: "GET", ...config });
  }
  post<T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.request({ method: "POST", ...config });
  }
  put<T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.request({ method: "PUT", ...config });
  }
  delete<T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.request({ method: "DELETE", ...config });
  }
}

export default HttpRequest;
