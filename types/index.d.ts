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
}

// THIS IS NECESSARY
export {};
