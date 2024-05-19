import { TelegraPh } from "../lib";
import { smd } from "../lib";
import { bot_ } from "../lib";
smd(
  {
    pattern: "bgm",
    desc: "Toggle On/Off to enable/disable bgm",
    fromMe: true,
    category: "user",
  },
  async (message, match) => {
    try {
      let incase =
        (await bot_.findOne({
          id: "bot_" + message.user,
        })) ||
        (await bot_.new({
          id: "bot_" + message.user,
        }));
      let label = match.toLowerCase().split()[0];
      if (label === "on" || label === "enable" || label === "act") {
        await bot_.updateOne(
          {
            id: "bot_" + message.user,
          },
          {
            bgm: true,
          }
        );
        return await message.reply("*Bgm Succesfully enabled*");
      } else if (label === "off" || label === "disable" || label === "deact") {
        await bot_.updateOne(
          {
            id: "bot_" + message.user,
          },
          {
            bgm: false,
          }
        );
        return await message.reply("*Bgm Succesfully deactivated*");
      } else {
        return await message.send(
          "*_Use on/off to enable/disable Bgm sounds_*"
        );
      }
    } catch (error) {
      await message.error(error + "\n\nCommand: bgm ", error);
    }
  }
);
smd(
  {
    pattern: "delbgm",
    fromMe: true,
    desc: "remove a song from bgm",
    category: "user",
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.reply("*Give Me Song Name to Delete From BGM*");
      }
      let input =
        (await bot_.findOne({
          id: "bot_" + message.user,
        })) ||
        (await bot_.new({
          id: "bot_" + message.user,
        }));
      let select = input.bgmarray;
      if (select[match]) {
        delete select[match];
        await bot_.updateOne(
          {
            id: "bot_" + message.user,
          },
          {
            bgmarray: select,
          }
        );
        return await message.reply("*Song _" + match + "_ removed from BGM.*");
      } else {
        return await message.reply(
          "*Name _'" + match + "'_ does not exist in BGM.*"
        );
      }
    } catch (error) {
      await message.error(error + "\n\nCommand: delbgm ", error);
    }
  }
);
smd(
  {
    pattern: "allbgm",
    alias: ["getbgm", "listbgm"],
    fromMe: true,
    desc: "get list of bgm",
    category: "user",
  },
  async (label) => {
    try {
      let info = " *BGM SONG INFORMATION*\n";
      let find =
        (await bot_.findOne({
          id: "bot_" + label.user,
        })) ||
        (await bot_.new({
          id: "bot_" + label.user,
        }));
      let imput = find.bgmarray;
      console.log("sounds: ", imput);
      for (const files in imput) {
        info += "*" + files + ":* " + imput[files] + " \n";
      }
      return await label.reply(
        info === " *BGM SONG INFORMATION*\n"
          ? "*_You didn't set any song in bgm yet!!_*"
          : info
      );
    } catch (error) {
      await label.error(error + "\n\nCommand: allbgm", error);
    }
  }
);
smd(
  {
    pattern: "addbgm",
    alias: ["abgm", "newbgm"],
    fromMe: true,
    desc: "add song in bgm",
    category: "user",
  },
  async (message, match) => {
    try {
      if (!message.quoted) {
        return await message.reply(
          "Uhh Please, Reply to Audio/Video To Add In Bgm"
        );
      }
      if (!match) {
        return await message.reply("Uhh Please give Bgm Song NAme");
      }
      let input = false;
      let output = "";
      if (message.quoted.mtype == "videoMessage") {
        output = await message.bot.downloadAndSaveMediaMessage(message.quoted);
        input = true;
      } else if (message.quoted.mtype == "audioMessage") {
        input = false;
        let result = await message.bot.downloadAndSaveMediaMessage(
          message.quoted,
          "audio"
        );
        let data = await convertAudioToBlackScreenVideo(
          result,
          "./convertedVideo.mp4"
        );
        if (data.result) {
          output = "./convertedVideo.mp4";
        }
      } else {
        return await message.reply(
          "Uhh Please, Reply to Audio/Video To Add In Bgm"
        );
      }
      if (!output) {
        return await message.reply("There's an Error While Adding Bgm Song");
      }
      let upload = await TelegraPh(output);
      let incase =
        (await bot_.findOne({
          id: "bot_" + message.user,
        })) ||
        (await bot_.new({
          id: "bot_" + message.user,
        }));
      try {
        let data = incase.bgmarray;
        data[match] = upload;
        await bot_.updateOne(
          {
            id: "bot_" + message.user,
          },
          {
            bgmarray: data,
          }
        );
        return await message.reply(
          "*New Song Added in BGM with Name : " + match + "*"
        );
      } catch (error) {
        return await message.error(error);
      }
    } catch (error) {
      await message.error(error + "\n\nCommand: addbgm", error);
    }
  }
);
