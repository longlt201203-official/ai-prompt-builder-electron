import { NativeAPIHandler } from "../types";

const sayHi: NativeAPIHandler = (event, name) => {
  console.log(`Hi ${name}!`);
};

export default sayHi;
