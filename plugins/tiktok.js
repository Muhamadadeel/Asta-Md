let maher_api = "https://api.maher-zubair.tech/";
let baseApi =
  process.env.API_SMD || global.api_smd || "https://api-smd-1.vercel.app";
const { smd, smdJson, prefix, Config } = require("../lib");
smd(
  {
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Downloads Tiktok Videos Via Url.",
    category: "downloader",
    filename: __filename,
    use: "<add tiktok url.>",
  },
  async (message, url) => {
    try {
      var format = url.toLowerCase().includes("doc")
        ? "document"
        : url.toLowerCase().includes("mp3")
        ? "audio"
        : "video";
      if (!url) {
        return await message.reply(
          `*Uhh Please, Provide me tiktok Video Url*\n*_Ex ${prefix}tiktok https://vm.tiktok.com/ZMMxTk5qr/_*`
        );
      }
      let videoUrl = url ? url.split(" ")[0] : "";
      if (!/tiktok/.test(videoUrl)) {
        return await message.reply(
          "*Uhh Please, Give me Valid Tiktok Video Url!*"
        );
      }
      var isVideoFound = false;
      try {
        let response = await smdJson(
          `${maher_api}download/tiktok2?url=${videoUrl}`
        );
        isVideoFound = (response && response?.video?.noWatermark) || false;
      } catch (error) {
        let response = await smdJson(
          `${baseApi}/api/musically?url=${videoUrl}`
        );
        isVideoFound = (response && response?.result?.video) || false;
      }
      if (isVideoFound) {
        return await message.send(
          isVideoFound,
          { caption: Config.caption },
          format,
          message
        );
      } else {
        return await message.reply("Error While Downloading Your Video");
      }
    } catch (error) {
      return message.error(`${error}\n\ncommand: tiktok`, error);
    }
  }
);
