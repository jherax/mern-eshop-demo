import {IProduct, ProductFormValues} from './Product';

declare global {
  export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | {[key: string]: JSONValue};

  export interface JSONObject {
    [k: string]: JSONValue;
  }

  export type JSONArray = Array<JSONValue>;

  export interface ServerResponse<T = JSONObject> {
    code: number;
    message: string;
    success: boolean;
    data?: T;
    error?: {
      message: string;
      stack: string;
    };
  }

  export {IProduct, ProductFormValues};
}

// THIS IS NECESSARY
export {};
