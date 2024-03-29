const os = require("os");
const fs = require("fs");
const Config = require("../config");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const util = require("util");
const events = astro_patch;
const { commands } = require("../lib");
const { exec } = require("child_process");
const translatte = require("translatte");
const cron = require("node-cron");
var cronStart = false;
astro_patch.cmd(
  {
    pattern: "removecmd",
    desc: "To removed cmd",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, match, { Void }) => {
    try {
      let cmdName = match ? match.split(" ")[0].trim().toLowerCase() : "";
      let isSticker = false;

      if (message.quoted) {
        if (message.quoted.mtype === "stickerMessage") {
          isSticker = true;
          cmdName = "sticker-" + message.quoted.msg.fileSha256;
        } else if (!match) {
          return await message.send(
            "*_Please reply to a Sticker that set for a Cmd_*",
          );
        }
      } else if (!match) {
        return await message.send(
          "*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*",
        );
      }

      if (global.setCmdAlias[cmdName]) {
        await message.send(
          `*_"${isSticker ? "Given Sticker" : cmdName}" deleted Succesfully at "${global.setCmdAlias[cmdName]}" cmd_*`,
        );
        delete global.setCmdAlias[cmdName];
        return;
      } else {
        return await message.send(
          `*_"${isSticker ? "Given Sticker" : cmdName}" not Set for any cmd._*\n *_Please Provide Valid ${isSticker ? "Sticker" : "cmd Name"} to delete_*`,
        );
      }
    } catch (error) {
      await message.error(`${error}\nCommand:delcmd`, error);
    }
  },
);