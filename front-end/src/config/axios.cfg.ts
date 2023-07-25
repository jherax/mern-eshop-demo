import axios, {AxiosRequestConfig, type AxiosError} from 'axios';

/*
const defaultPostConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data'
    Accept: 'application/json',
  },
};
*/

/** @see https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-get-requests-with-axios-in-typescript */
export async function axiosGet<T = JSONObject>(url: string) {
  try {
    const response = (await axios.get<T>(url)).data;
    return response;
  } catch (error) {
    const e = error as AxiosError<T>;
    if (axios.isAxiosError(e)) {
      console.error(`${e.name}: ${e.code}: ${e.message}`);
    }
    console.warn(e);
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
    const response = (await axios.post<T>(url, body, config)).data;
    return response;
  } catch (error) {
    const e = error as AxiosError<T>;
    if (axios.isAxiosError(e)) {
      console.error(`${e.name}: ${e.code}: ${e.message}`);
    }
    console.warn(e);
    return e.response?.data;
  }
}
