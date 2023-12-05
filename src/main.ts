import fs from "node:fs";

import { mtcuteNode, MemoryStorage } from "@/deps.ts";
import { env } from "@/env.ts";

async function do_work(tg: mtcuteNode.TelegramClient) {
  const dialogs = [] as string[];
  for await (const dlg of tg.iterDialogs({ archived: "keep" })) {
    dialogs.push(dlg.chat.username ?? "");
  }
  console.log(`Dialogs: ${dialogs.length}`);
}

function main() {
  const tg = new mtcuteNode.NodeTelegramClient({
    apiId: env.TLG_API_ID,
    apiHash: env.TLG_API_HASH,
    storage: new MemoryStorage(),
  });

  const session = fs.existsSync("session")
    ? fs.readFileSync("session").toString()
    : "";

  if (session) {
    tg.importSession(session);
  }

  tg.run(
    {
      phone: () => tg.input("phone > "),
      code: () => tg.input("code > "),
      password: () => tg.input("password > "),
    },
    async (self) => {
      console.log(`logged in as ${self.displayName}`);

      await do_work(tg);

      console.log("Done. Closing...");

      if (!fs.existsSync("session")) {
        const session = await tg.exportSession();
        if (session) {
          fs.writeFileSync("session", session);
        }
      }

      await tg.close();
    }
  );

  const _shutdown = async () => {
    console.log("Closing...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    tg.close();
  };

  const _uncaughtException = (err: unknown) => {
    console.log(err);
    tg.close();
  };
}

await main();
