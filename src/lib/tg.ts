import { mtcuteNode, clientOptions } from "@/deps.ts";
import { env } from "@/env.ts";
import { DeferredPromise } from "@/lib/deferred.ts";

export function runTgTask<T = void>(
  task: (tg: mtcuteNode.NodeTelegramClient) => Promise<T>
) {
  const tg = new mtcuteNode.NodeTelegramClient({
    apiId: env.TLG_API_ID,
    apiHash: env.TLG_API_HASH,
    ...clientOptions,
  });

  if (env.TLG_SESSION) {
    tg.importSession(env.TLG_SESSION);
  }

  const deferred = new DeferredPromise<T>();

  tg.run(
    {
      phone: () => tg.input("phone > "),
      code: () => tg.input("code > "),
      password: () => tg.input("password > "),
    },
    async (self) => {
      console.log(`Logged in as ${self.displayName}`);

      if (!env.TLG_SESSION) {
        console.log("TLG_SESSION: " + (await tg.exportSession()));
      }

      const res = await task(tg);

      await tg.close();

      deferred.resolve(res);
    }
  );

  return deferred.promise;
}
