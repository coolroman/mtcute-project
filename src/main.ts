import { runTgTask } from "@/lib/tg.ts";

async function main() {
  const res = await runTgTask(async (tg) => {
    const dialogs = [] as string[];
    for await (const dlg of tg.iterDialogs({ archived: "keep" })) {
      dialogs.push(dlg.chat.username ?? "");
    }
    return dialogs.length;
  });

  console.log(`Dialogs: ${res}`);
}

await main();
