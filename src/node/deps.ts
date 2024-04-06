export * as mtcuteCore from "@mtcute/core";
export * as mtcuteDispatcher from "@mtcute/dispatcher";
export * as mtcuteNode from "@mtcute/node";

export { z } from "zod";

import { MemoryStorage } from "@mtcute/core";
import { TcpTransport } from "@mtcute/node";

export const clientOptions = {
  storage: new MemoryStorage(),
  transport: () => new TcpTransport(),
};
