// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("nativeAPI", {
  invokeNativeAPI: (channel: string, message: any) =>
    ipcRenderer.invoke(channel, message),
});
