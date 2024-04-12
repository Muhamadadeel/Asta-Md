let maher_api = "https://api.maher-zubair.tech/";
const axios = require("axios");
const fetch = require("node-fetch");
const { smd } = require("../lib");

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

      // Use axios to fetch data from the API
      let response = await axios.get(
        `${maher_api}download/tiktok2?url=${encodeURIComponent(videoUrl)}`
      );
      const data = response.data;
      const video = data.result.url.nowm;

      await message.send("*_Downloading Your Video Without WaterMark..._*");

      // Use node-fetch to download the video
      const res = await fetch(video);
      const buffer = await res.buffer();

      // Send the downloaded video to the chat
      await bot.send(
        message.chat,
        buffer,
        { quoted: message },
        { mimetype: "video/mp4" }
      );
    } catch (error) {
      message.sent(
        `\n*_Error Occured While Downloading Your Media_*\n_${error}_`
      );
      console.log(error);
    }
  }
);
