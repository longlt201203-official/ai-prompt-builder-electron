// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("nativeAPI", {
  invokeNativeAPI: (channel: string, ...message: any[]) =>
    ipcRenderer.invoke(channel, ...message),
  nativeAPICallback: (channel: string, cb: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on(channel, (event, ...args) => cb(event, ...args)),
});
