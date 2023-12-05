import { schema } from "../env.schema.ts";
import dotenv from "dotenv-flow";

dotenv.config();

export const loadedEnv = process.env;

export const env = schema.parse(loadedEnv);

export const denoRun = false;
export const denoRemoteRun = false;
export const prod = process.env.NODE_ENV === "production";
