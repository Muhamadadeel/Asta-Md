let maher_api = "https://api.maher-zubair.tech/";
const { smd} = require("../lib");
const axios = require("axios")
smd(
  {
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Downloads Tiktok Videos Via Url.",
    category: "downloader",
    filename: __filename,
    use: "<add tiktok url.>",
  },
  async (bot, message, url) => {
    try {
      let videoUrl = url.split(" ")[0];
      if (!/tiktok/.test(videoUrl)) {
        return await message.send("*`Please Give Me Valid Tiktok Video Link`*");
      }
      let response = await axios.get(`${maher_api}download/tiktok2?url=${encodeURIComponent(videoUrl)}`);
      const data = response.data;
      const video = data.result.url.nowm;
      await message.send("*_Downloading Your Video Without WaterMark..._*");
      await bot.send(message.chat, (video = { url: video }), {
        quoted: message,
      });
    } catch (error) {
      message.sent(`\n*_Error Occured While Downloading Your Media_*\n_${error}_`);
      console.log(error);
    }
  }
);
