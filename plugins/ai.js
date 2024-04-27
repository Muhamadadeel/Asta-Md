const fetch = require("node-fetch");
const { encodeURIComponent } = require('url');
const util = require("util");
const fs = require("fs-extra");
const {
  cmd
} = require("../lib/plugins");
const {
  formatp,
  TelegraPh,
  aitts,
  smd,
  send,
  prefix,
  runtime,
  Config,
  parsedJid,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");
smd(
  {
    pattern: "charaAi",
    category: "ai",
    desc: "Chat with a Character AI",
    use: "<text>",
    filename: __filename,
  },
  async (message, text, { cmdName }) => {
    if (!text)
      return message.reply(
        `*_Please provide a query_*\n*_Example ${prefix + cmdName} Hello_*`
      );

    try {
      const apiUrl = `https://api.maher-zubair.tech/ai/characterai?q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return message.send("*There's a problem, try again later!*");
      }

      const { result } = data;
      const { replies, src_char, is_final_chunk } = result;

      const characterName = src_char.participant.name;
      const characterAvatar = src_char.avatar_file_name;

      const replyText = replies.map((reply) => reply.text).join("\n\n");

      const astro = `ᴀsᴛᴀ ${characterName}\n`;
      const tbl = "```";
      const message1 = `${astro}${tbl}${replyText}${tbl}\n\n${
        is_final_chunk ? "" : "*Response is not complete...*"
      }`;

      // If character avatar URL is provided, send the message with the image
      if (characterAvatar) {
        const imageUrl = `https://api.maher-zubair.tech/${characterAvatar}`;
        await message.sendFromUrl(imageUrl, { caption: message1 });
      } else {
        await send(message, message1);
      }
    } catch (error) {
      return await message.error(
        `${error}\n\n command: ${cmdName}`,
        error,
        `*_An error occurred while processing your request_*`
      );
    }
  }
);
smd({ pattern: "gpt4", category: "ai", desc: "Chat with GPT-4 AI model", use: "<text>", filename: __filename, }, async (message, text, { cmdName }) => {
  if (!text) return message.reply(`*_Please provide a query_*\n*_Example ${prefix + cmdName} What is the meaning of life?_*`);

  try {
    const apiUrl = `https://api.maher-zubair.tech/ai/chatgptv4?q=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== 200) {
      return message.send("*There's a problem, try again later!*");
    }

    const { result } = data;
    const astro = "ᴀsᴛᴀ ɢᴘᴛ𝟺\n";
    const tbl = "```";
    await send(message, `${astro}${tbl}${result}${tbl}`);
  } catch (error) {
    return await message.error(`${error}\n\n command: ${cmdName}`, error, `*_An error occurred while processing your request_*`);
  }
});