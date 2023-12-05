import { loadSync } from "$std/dotenv/mod.ts";
import { schema } from "@/env.schema.ts";

loadSync({ export: true });

export const loadedEnv = Deno.env.toObject();

export const env = schema.parse(loadedEnv);

export const denoRun = true;
export const denoRemoteRun =
  env.DENO_REGION == null && env.DENO_DEPLOYMENT_ID == null;
export const prod = denoRemoteRun;
