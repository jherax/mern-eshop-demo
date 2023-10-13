import {IHealthCheck} from './HealthCheck';
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

  export type ServerMessage = {
    statusCode: number;
    message: string;
    success: boolean;
  };

  export interface ServerResponse<T = JSONObject> extends ServerMessage {
    data?: T;
    error?: {
      message: string;
      stack: string;
    };
  }

  export {IHealthCheck};
  export {IProduct, ProductFormValues};
}

// THIS IS NECESSARY
export {};
