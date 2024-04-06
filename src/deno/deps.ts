export * as mtcuteCore from "npm:@mtcute/core";
export * as mtcuteDispatcher from "npm:@mtcute/dispatcher";
export * as mtcuteNode from "npm:@mtcute/node";

export { z } from "https://deno.land/x/zod@v3.22.4/index.ts";

import {
  MemoryStorage,
  WebCryptoProvider,
  WebSocketTransport,
} from "npm:@mtcute/web";

export const clientOptions = {
  storage: new MemoryStorage(),
  crypto: new WebCryptoProvider({ crypto: self.crypto }),
  transport: () => new WebSocketTransport(),
};
