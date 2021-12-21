import Discord, { Message } from "discord.js";
import { readFileSync } from "fs";
import translate from "deepl";

const client: any = new Discord.Client();
const API_KEY: string = readFileSync("./DEEPL_API_KEY", "utf8");
const TOKEN: string = readFileSync("./BOT_TOKEN", "utf8");
const prefix: string = "!";
client.on("message", async (message) => {
  if (!message.content.startsWith(prefix)) return
  const [cmd, ...args] = message.content.slice(prefix.length).split(' ')
  if (cmd == 'translate') {
    onTranslate(args, message);
  }
});
async function onTranslate(targetMsg: string, message) {
  translate({
    free_api: true,
    text: targetMsg,
    target_lang: 'JA',
    auth_key: API_KEY
  })
    .then(result => {
      message.channel.send(result.data.translations[0].text);
    });
}


client.login(TOKEN);