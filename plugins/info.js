const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  runtime,
  formatp,
  prefix,
  smd,
} = require("../lib");
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
//
// Command: menus
smd(
  {
    pattern: "info",
    type: "MENU list",
    info: "user",
    react: "ℹ️",
    dontAddCommandList: true,
  },
  async (message) => {
    try {
      const response = `
*🕒 ᴜᴘ ᴛɪᴍᴇ :* ${runtime(process.uptime())}
*🔉 ᴛᴏᴅᴀʏ ɪs :* ${message.date}
*⌚ ɴᴏᴡ ᴛɪᴍᴇ :* ${message.time}
 ➮  Fᴏᴜɴᴅᴇʀ- ᴀsᴛʀᴏᴘᴇᴅᴀ ᴛᴇᴀᴍ
 ➮  Oᴡɴᴇʀ - ${Config.ownername}
 ➮  Nᴜᴍ - ${owner.split(",")[0]}
 ➮  Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
 👉🏼 *sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
${readmore}
╭──❰ *RECOMMEDED* ❱
│🎗 Lɪꜱᴛ
│🎗 Cᴀᴛᴇɢᴏʀʏ
│🎗 Hᴇʟᴘ
│🎗 Aʟɪᴠᴇ
│🎗 Uᴘᴛɪᴍᴇ
│🎗 Wᴇᴀᴛʜᴇʀ
│🎗 Lɪɴᴋ
│🎗 Cᴘᴜ
│🎗 Rᴇᴘᴏꜱɪᴛᴏʀʏ
╰─────────────⦁`.trim();
      return await message.bot.sendUi(message.from, { caption: response });
    } catch (error) {
      await message.error(`${error}\nCommand:menus`, error);
    }
  },
);
astro_patch.cmd(
  {
    pattern: "newcmd",
    desc: "To add cmd",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, match, { Void }) => {
    try {
      if (!match) {
        return await message.send(
          "`Please provide cmd name by replying a Sticker`",
        );
      }

      let [cmdName, cmdPattern] = match.split(",");
      let isSticker = false;
      let stickerHash;

      if (message.quoted) {
        const quotedMessageType = message.quoted.mtype;
        if (quotedMessageType === "stickerMessage" && match) {
          isSticker = true;
          cmdPattern = match.split(" ")[0];
          stickerHash = "sticker-" + message.quoted.msg.fileSha256;
        }
      }

      if (!isSticker && cmdName && cmdPattern) {
        cmdName = cmdName.trim().toLowerCase();
        cmdPattern = cmdPattern.trim().toLowerCase();
      } else if (!isSticker) {
        return await message.send(
          "`Uhh Dear, Give Cmd With New Name\nEg: .setcmd New Name, CmdName`",
        );
      }

      if (cmdName.length < 1) {
        return await message.reply(
          "`Uhh Please, Provide NewCmd Name First`",
        );
      }

      if (global.setCmdAlias[cmdName]) {
        return await message.send(
          `*_"${isSticker ? "Given Sticker" : cmdName}" Already set for "${global.setCmdAlias[cmdName]}" Cmd, Please try another ${isSticker ? "Sticker" : "Name"}_*`,
        );
      }

      const command =
        astro_patch.commands.find((cmd) => cmd.pattern === cmdPattern) ||
        astro_patch.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(cmdPattern),
        );

      if (command) {
        global.setCmdAlias[cmdName] = command.pattern;
        return await message.send(
          `*_Cmd "${global.setCmdAlias[cmdName]}" Succesfully set to "${isSticker ? "Sticker" : cmdName}"._*\n*_These all names are reset, If bot restart_*`,
        );
      } else {
        return await message.send(
          `*_Provided Cmd( ${cmdPattern}) not found in bot cmds. Please Provide Valid cmd Name_*`,
        );
      }
    } catch (error) {
      await message.error(`${error}\nCommand:setcmd`, error);
    }
  },
);
smd(
    { on: "text" },
    async (
      msg,
      text,
      {
        mek,
        body,
        args,
        botNumber,
        isCreator,
        icmd,
        store,
        budy,
        Asta,
        Void,
        proto,
      },
    ) => {
      try {
        if (!cronStart) {
          cron.schedule("0 0 * * *", () => {
            cronStart = true;
            fs.readdir("./temp", (err, files) => {
              if (err) return;
              files.forEach((file) => {
                try {
                  fs.unlinkSync(`./temp/${file}`);
                } catch {}
              });
            });
          });
        }
  
        if (!msg.reply_message || !text || !msg.message) return;
  
        const lines = msg.message.text.split("\n");
        let lineNumber = parseInt(text.split(" ")[0]);
        if (!isNaN(lineNumber)) {
          if (lines.length > 30 && lines[1].includes("ASTA-MD_FANCY_TEXT")) {
            const matchingLine = lines.find((line) =>
              line.startsWith(`${lineNumber} `),
            );
            try {
              if (matchingLine) {
                await msg.reply(
                  matchingLine.replace(`${lineNumber} `, "").trim(),
                  {},
                  "",
                  msg,
                );
              }
            } catch {}
          }
        }
  
        let commandNumber = parseFloat(text.split(" ")[0]);
        if (isNaN(commandNumber)) return;
  
        let shortCommand = commandNumber.toString(1);
        const matchingCommand = lines.find((line) =>
          line.includes(`*${shortCommand} `),
        );
        if (
          matchingCommand &&
          (matchingCommand.includes("*COMMANDS*") ||
            matchingCommand.includes("*MENU*"))
        ) {
          const commandInfo = matchingCommand
            .replace(`*${shortCommand}`, "")
            .split("|")[0]
            .replace(/COMMANDS\*/gi, "")
            .replace(/MENU\*/gi, "")
            .trim();
          if (commandInfo.length > 0 && commandInfo.length < 20) {
            const categoryInfo = {};
            commands.forEach((cmd) => {
              if (!cmd.isPrivate && cmd.pattern !== undefined) {
                if (!categoryInfo[cmd.category]) {
                  categoryInfo[cmd.category] = [];
                }
                categoryInfo[cmd.category].push({
                  command: cmd.pattern,
                  info: cmd.info,
                  help: `${Config.prefix}${cmd.usage} ${cmd.options || ""}`,
                });
              }
            });
  
            let result = false;
            for (const category in categoryInfo) {
              const categoryName = category.toLowerCase();
              if (commandInfo.includes(categoryName)) {
                result = `*${category.toUpperCase()} CATEGORY*\n\n`;
                categoryInfo[category].forEach((cmdInfo) => {
                  result += `*🔉Command:* \`\`\`${cmdInfo.command}\`\`\` ${cmdInfo.info ? `\n*📝Info:* ${cmdInfo.info}\n` : ""}\n*〽️Help:* \`\`\`${cmdInfo.help}\`\`\`\n\n`;
                });
                result += `\n${Config.caption}`;
                break;
              }
            }
            if (result) {
              return await msg.reply(msg.reply_message, { caption: result });
            }
          }
        }
      } catch (err) {
        console.log("ERROR:", err);
      }
    },
  );
  
  /**MASTER */
  smd(
    { on: "text" },
    async (
      msg,
      text,
      {
        mek,
        body,
        args,
        botNumber,
        isCreator,
        icmd,
        store,
        budy,
        Asta,
        Void,
        proto,
      },
    ) => {
      const { send, reply, react, sendMessage } = msg;
      let $ = "";
      if (msg.isCreator) {
        if (!Config.HANDLERS.includes(">") && citel.text.startsWith(">")) {
          let code = budy.slice(1);
          if (!code) {
            return citel.reply("Provide me with a query to run Master!");
          }
          try {
            let resultTest = eval(code);
            if (resultTest) {
              return citel.reply(util.format(resultTest));
            }
          } catch (err) {
            return citel.reply(util.format(err));
          }
        } else if (!Config.HANDLERS.includes("$") && citel.text.startsWith("$")) {
          let code = budy.slice(1);
          if (!code) {
            return citel.reply("Provide me with a query to run Master!");
          }
          try {
            let resultTest = await eval(`const a = async()=>{\n${code}\n};\na()`);
            await citel.react("🔉");
            if (resultTest) {
              return await citel.reply(util.format(resultTest));
            }
          } catch (err) {
            console.log("ERROR FROM RUNNING QUERY WITH MASTER $\n", err);
            return await citel.reply(util.format(err));
          }
        }
      }
    },
  );
  
  const readDirectory = (dir) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject("Error reading directory");
        } else {
          resolve(files);
        }
      });
    });
  };
  
  smd(
    { on: "text" },
    async (
      msg,
      text,
      {
        mek,
        body,
        args,
        botNumber,
        isCreator,
        icmd,
        store,
        budy,
        Asta,
        Void,
        proto,
      },
    ) => {
      try {
        if (!cronStart) {
          cron.schedule("*/15 * * * *", () => {
            cronStart = true;
            readDirectory("./temp")
              .then((files) => {
                files.forEach((file) => {
                  try {
                    fs.unlinkSync(`./temp/${file}`);
                  } catch (err) {
                    console.error(`ERROR : ${err}`);
                  }
                });
              })
              .catch((err) => {
                console.error(err);
              });
          });
        }
  
        if (!msg.reply_message || !text || !msg.message) {
          return;
        }
  
        const lines = msg.message.text.split("\n");
        let lineNumber = parseInt(text.split(" ")[0]);
        if (!isNaN(lineNumber)) {
          if (lines.length > 30 && lines[1].includes("ASTA-MD_FANCY_TEXT")) {
            const matchingLine = lines.find((line) =>
              line.startsWith(`${lineNumber} `),
            );
            try {
              if (matchingLine) {
                await msg.reply(
                  matchingLine.replace(`${lineNumber} `, "").trim(),
                  {},
                  "",
                  msg,
                );
              }
            } catch (err) {
              console.error(`ERROR : ${err}`);
            }
          }
        }
  
        let commandNumber = parseFloat(text.split(" ")[0]);
        if (isNaN(commandNumber)) {
          return;
        }
  
        let shortCommand = commandNumber.toFixed(1);
        const matchingCommand = lines.find((line) =>
          line.includes(`*${shortCommand} `),
        );
        if (
          matchingCommand &&
          (matchingCommand.includes("*COMMANDS*") ||
            matchingCommand.includes("*MENU*"))
        ) {
          const commandInfo = matchingCommand
            .replace(`*${shortCommand}`, "")
            .split("|")[0]
            .replace(/COMMANDS\*/gi, "")
            .replace(/MENU\*/gi, "")
            .trim();
          if (commandInfo.length > 0 && commandInfo.length < 20) {
            const { commands } = require("../lib");
            const categoryInfo = {};
            commands.forEach((cmd) => {
              if (!cmd.dontAddCommandList && cmd.pattern !== undefined) {
                if (!categoryInfo[cmd.category]) {
                  categoryInfo[cmd.category] = [];
                }
                categoryInfo[cmd.category].push({
                  command: cmd.pattern,
                  info: cmd.info,
                  help: `${Config.prefix}${cmd.use} ${cmd.options || ""}`,
                });
              }
            });
  
            let result = false;
            for (const category in categoryInfo) {
              const categoryName = category.toLowerCase();
              if (commandInfo.includes(categoryName)) {
                result = `┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*ASTA-MD_${category.toUpperCase()} CATEGORY*\n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n`;
                categoryInfo[category].forEach((cmdInfo) => {
                  result += `*${cmdInfo.command}*\n${cmdInfo.info ? `\n*💁Info:* \`\`\`${cmdInfo.info}\`\`\`\n` : ""}\n*📝Desc:* \`\`\`${cmdInfo.help}\`\`\`\n\n`;
                });
                result += Config.caption;
                break;
              }
            }
            if (result) {
              return await msg.sendUi(msg.reply_message, { caption: result });
            }
          }
        }
      } catch (err) {
        console.error(`ERROR : ${err}`);
      }
    },
  );