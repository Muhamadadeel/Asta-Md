let { TelegraPh } = require(lib_dir);
const { smd } = require(lib_dir);
const util = require("util");
const fs = require("fs-extra");
smd(
  {
    pattern: "audiourl",
    alias: ["black"],
    desc: "get url for audio and converted into black video",
    category: "converter",
  },
  async (message, input) => {
    try {
      if (!message.quoted) {
        return await message.reply("_Reply to Audio MEssage!_");
      }
      let result = "";
      if (message.quoted.mtype == "audioMessage") {
        let output = await message.bot.downloadAndSaveMediaMessage(
          message.quoted
        );
        let _0x555071 = await convertAudioToBlackScreenVideo(
          output,
          "./temp/convertedVideo.mp4"
        );
        if (_0x555071.result) {
          result = "./temp/convertedVideo.mp4";
          let _0x5efc27 = await TelegraPh(result);
          await message.send(
            result,
            {
              caption: util.format(_0x5efc27),
            },
            "smdvid",
            message
          );
          try {
            fs.unlinkSync(result);
          } catch (_0x147eea) {}
        } else {
          throw "Invalid Media Path";
        }
      }
    } catch (error) {
      await message.error(
        error + "\n\nCommand: audiourl",
        error,
        "_ERRORR!_"
      );
    }
  }
);
