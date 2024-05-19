const { amd, fetchJson, getBuffer, Config, prefix } = require("../lib");
amd(
  {
    pattern: "tgs <url>",
    alias: "tgs",
    desc: "Downloads telegram stickers.",
    category: "downloader",
    filename: __filename,
    use: "<add sticker url.>",
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.reply(
          "*`Hello Sir Please Give me a Vaild Telegram Sticker Link*`\n\n"+prefix+"tgs2 *`link`*"
        );
      }
      if (!match.includes("addstickers")) {
        return await message.reply(
          "*`Hello Sir Please Give me a Vaild Telegram Sticker Link*`\n\n"+prefix+"tgs2 *`link`*"
        );
      }
      let input = match.split("|")[0];
      let query = input.split("/addstickers/")[1];
      let { result: output } = await fetchJson(
        "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" +encodeURIComponent(query) + " "
      );
      let search = match.split("|")[1] || "";
      let result = "Total stickers: "+output.stickers.length +"";
      if (output.is_animated) {
        return await message.reply("Animated stickers are not supported");
      } else if (search.startsWith("info")) {
        return await message.reply(result);
      }
      let data = parseInt(search.split(",")[0]) || 10;
      let sent = parseInt(search.split(",")[1]) || 0;
      let results = search.split(";")[1] || "Sticker";
      let reg = true;
      if (results.includes("photo")) {
        reg = false;
        results = "Photo";
      }
      if (data > output.stickers.length) {
        data = output.stickers.length;
      }
      if (sent > output.stickers.length) {
        sent = output.stickers.length - 5;
      }
      if (sent > data) {
        let recived = data;
        data = sent;
        sent = recived;
      }
      await message.reply(
        result +
          "\n\n_Downloading as "+results +" From index *" +sent +"* to *" +data +"*._\nIf you wants more to download then use Like \n\n .tgs "+ input +" |  10 ,  20 ; photo"
      );
      for (sent; sent < data; sent++) {
        let _0x4de16f = await fetchJson(
          "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" +
            output.stickers[sent].file_id
        );
        let sticker =
          "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" +
          _0x4de16f.result.file_path;
        if (reg) {
          let pack = await getBuffer(sticker);
          await message.reply(
            pack,
            {
              packname: Config.packname,
              author: "Asta-Md",
            },
            "sticker"
          );
        } else {
          await message.bot.sendMessage(message.chat, {
            image: {
              url: sticker,
            },
            caption:
              "*_Telegram Sticker At Index " +
              (sent + 1) +
              " Downloaded_*",
          });
        }
      }
    } catch (error) {
      await message.error(
        error + "\n\ncommand: tgs",
        error,
        "*_Error Sending telegram stickers!!!_*"
      );
    }
  }
);
