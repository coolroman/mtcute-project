export * as mtcuteCore from "@mtcute/core";
export * as mtcuteDispatcher from "@mtcute/dispatcher";
export * as mtcuteNode from "@mtcute/node";

export { z } from "zod";

import { MemoryStorage } from "@mtcute/core/storage/memory.js";
import { TcpTransport } from "@mtcute/core/network/transports/tcp.js";

export const clientOptions = {
  storage: new MemoryStorage(),
  transport: () => new TcpTransport(),
};
