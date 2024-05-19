const { amd } = require("../lib");

amd(
  {
    pattern: "wiki2 <query>",
    desc: "Downloads wikimedia images.",
    category: "downloader",
    filename: __filename,
    use: "<text|search.>",
  },
  async (message, query) => {
    try {
      if (!query) {
        return await message.send("*_Please Give me search query!_*");
      }
      let { wikimedia: _0x168a95 } = require("../lib");
      let result = (await _0x168a95(query)) || [];
      if (!result || !result[0]) {
        return await message.send("*_No Results Found!_*");
      }
      let getData =
        message.iscreator && query.split("|")[1] === "all"
          ? result.length
          : result.length > 5
          ? 5
          : result.length;
      for (let data = 0; data < getData; data++) {
        try {
          message.bot.sendFromUrl(
            message.from,
            result[data].image,
            "Title: " +
              result[data].title +
              "\n*Source:* " +
              result[data].source,
            message,
            {},
            "image"
          );
        } catch {}
      }
    } catch (error) {
      await message.error(error + "\n\ncommand: insta", error);
    }
  }
);
