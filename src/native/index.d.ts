declare namespace nativeAPI {
  function invokeNativeAPI(channel: string, ...message: any[]): Promise<any>;
  function nativeAPICallback(channel: string, cb: (event: Electron.IpcRendererEvent, ...args: any[]) => void): () => void;
}
