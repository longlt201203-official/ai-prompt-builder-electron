import readdir from "./apis/readdir";
import sayHi from "./apis/say-hi";
import { NATIVE_API_READDIR, NATIVE_API_SAY_HI } from "./constants";
import { NativeAPIHandler } from "./types";

const nativeAPI: Record<string, NativeAPIHandler> = {
  [NATIVE_API_SAY_HI]: sayHi,
  [NATIVE_API_READDIR]: readdir,
};

export default nativeAPI;
