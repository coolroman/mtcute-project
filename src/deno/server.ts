import * as oak from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { runTgTask } from "@/lib/tg.ts";

export const app = new oak.Application();
export const router = new oak.Router();
export const controller = new AbortController();

// Logger
app.use(async (ctx, next) => {
  console.log(
    `${ctx.request.method} ${ctx.request.url.pathname} from ${ctx.request.ip} - started`
  );
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  const sz = ctx.response.headers.get("X-Response-Body-Length");
  console.log(
    `${ctx.request.method} ${ctx.request.url.pathname} from ${
      ctx.request.ip
    } - ${rt} - ${sz ?? "no data"}`
  );
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Error
app.use(async (_ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (oak.isHttpError(err)) {
      console.error(
        `Http error (status: ${err.status})\n${err.name}:${err.message}`
      );
      switch (err.status) {
        case oak.Status.NotFound:
          // handle NotFound
          break;
        default:
        // handle other statuses
      }
    } else {
      if (err instanceof Error) {
        console.error(`${err.name}: ${err.message}`);
      } else {
        console.error(err);
      }
    }
  }
});

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

app.addEventListener("listen", (evt) => {
  console.log(
    `App is listening on ${evt.secure ? "https" : "http"}://${evt.hostname}:${
      evt.port
    }`
  );
});

app.addEventListener("close", () => {
  console.log("App closed");
});

router.get("/", (ctx) => {
  ctx.response.body = "It works!";
});

router.get("/tg/dialogs", async (ctx) => {
  const res = await runTgTask(async (tg) => {
    const dialogs = [] as string[];
    for await (const dlg of tg.iterDialogs({ archived: "keep" })) {
      dialogs.push(dlg.chat.username ?? "");
    }
    return dialogs.length;
  });

  ctx.response.body = res;
});

app.use(router.routes());
app.use(router.allowedMethods());

if (import.meta.main) {
  const listenPromise = app.listen({ port: 3000, signal: controller.signal });

  Deno.addSignalListener("SIGTERM", () => controller.abort());
  Deno.addSignalListener("SIGINT", () => controller.abort());

  await listenPromise;
}
