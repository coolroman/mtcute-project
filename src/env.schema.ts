import { z } from "@/deps.ts";

export const schema = z.object({
  NODE_ENV: z.string(),

  DENO_REGION: z.string().optional(),
  DENO_DEPLOYMENT_ID: z.string().optional(),

  TLG_API_ID: z.string(),
  TLG_API_HASH: z.string(),

  TLG_SESSION: z.string(),
});
