import { NativeAPIHandler } from "../types";
import * as fs from "fs";

const readdir: NativeAPIHandler = (event, path) => {
  return fs.readdirSync(path);
};

export default readdir;
