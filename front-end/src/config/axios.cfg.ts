import axios, {type AxiosError} from 'axios';

/** @see https://bobbyhadz.com/blog/typescript-http-request-axios */
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
