let {
  smd,
  prefix,
  cmd,
  parsedJid
} = require("../lib");
smd({
  pattern: "blocked",
  desc: "Get list of all Blocked Numbers",
  category: "whatsapp settings",
  fromMe: true,
  filename: __filename,
  use: "<text>"
}, async (msg) => {
  try {
    const blocklist = await msg.bot.fetchBlocklist();
    if (blocklist.length === 0) {
      return await msg.reply("Uhh Dear, You don't have any Blocked Numbers.");
    }
    let blocklistText = "\n*≡ List*\n\n*_Total Numbers:* " + blocklist.length + "_\n\n┌─⊷ \t*BLOCKED NUMBERS*\n";
    for (let i = 0; i < blocklist.length; i++) {
      blocklistText += "▢ " + (i + 1) + ":- wa.me/" + blocklist[i].split("@")[0] + "\n";
    }
    blocklistText += "└───────────";
    return await msg.bot.sendMessage(msg.chat, { text: blocklistText });
  } catch (error) {
    await msg.error(`${error}\n\ncommand : blocklist`, error);
  }
});