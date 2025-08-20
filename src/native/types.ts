import { IpcMainInvokeEvent } from "electron";

export type NativeAPIHandler = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => any;
