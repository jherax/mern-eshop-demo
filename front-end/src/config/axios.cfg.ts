import axios, {AxiosRequestConfig, type AxiosError} from 'axios';
import logger from './logger';

const defaultPostConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

/** @see https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-get-requests-with-axios-in-typescript */
export async function axiosGet<T = JSONObject>(url: string) {
  try {
    const response = (await axios.get<T>(url)).data;
    return response;
  } catch (error) {
    const e = error as AxiosError<T>;
    if (axios.isAxiosError(e)) {
      logger.error(`${e.name}: ${e.code}: ${e.message}`);
    }
    return e.response?.data;
  }
}

/** @see https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-post-requests-with-axios-in-typescript */
export async function axiosPost<T = JSONObject>(
  url: string,
  body: unknown,
  config?: AxiosRequestConfig,
) {
  try {
    const newConfig = {...defaultPostConfig, ...config};
    const response = (await axios.post<T>(url, body, newConfig)).data;
    return response;
  } catch (error) {
    const e = error as AxiosError<T>;
    if (axios.isAxiosError(e)) {
      logger.error(`${e.name}: ${e.code}: ${e.message}`);
    }
    return e.response?.data;
  }
}
