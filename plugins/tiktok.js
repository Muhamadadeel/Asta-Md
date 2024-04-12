let maher_api = "https://api.maher-zubair.tech/";
let baseApi =
  process.env.API_SMD || global.api_smd || "https://api-smd-1.vercel.app";
const { smd} = require("../lib");
smd(
  {
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Downloads Tiktok Videos Via Url.",
    category: "downloader",
    filename: __filename,
    use: "<add tiktok url.>",
  },
  async (bot, message, url, { cmdName }) => {
    try {
      let videoUrl = url.split(" ")[0];
      if (!/tiktok/.test(videoUrl)) {
        return await message.send(
          "*_Please Give Me Valid Tiktok Video Link..!_*"
        );
      }

      let response = await axios.get(
        `${maher_api}download/tiktok2?url=${encodeURIComponent(videoUrl)}`
      );
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
