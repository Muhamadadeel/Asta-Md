const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,tiny,runtime,formatp,prefix,smd,} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const util = require("util");
const { commands } = require("../lib");
const cron = require("node-cron");
var cronStart = false;
const min = 1;
const max = 99;
const usage_trend = Math.floor(Math.random() * (max - min + 1)) + min;
const min_dat = 1;
const max_dat = 499;
const total_dat = Math.floor(Math.random() * (max_dat - min_dat + 1)) + min;

astro_patch.smd(
    {
      cmdname: "menu",
      desc: "Help list",
      react: "📃",
      type: "general",
      filename: __filename,
    },
    async (message, input) => {
      try {
        const { commands } = require("../lib");
        if (input.split(" ")[0]) {
          let commandDetails = [];
          const foundCommand = commands.find(
            (cmd) => cmd.pattern === input.split(" ")[0].toLowerCase(),
          );
          if (foundCommand) {
            commandDetails.push("*🔉Command:* " + foundCommand.pattern);
            if (foundCommand.category) {
              commandDetails.push("*💁Category:* " + foundCommand.category);
            }
            if (foundCommand.alias && foundCommand.alias[0]) {
              commandDetails.push("*💁Alias:* " + foundCommand.alias.join(", "));
            }
            if (foundCommand.desc) {
              commandDetails.push("*💁Description:* " + foundCommand.desc);
            }
            if (foundCommand.use) {
              commandDetails.push(
                "*〽️Usage:*\n ```" +
                  prefix +
                  foundCommand.pattern +
                  " " +
                  foundCommand.use +
                  "```",
              );
            }
            if (foundCommand.usage) {
              commandDetails.push(
                "*〽️Usage:*\n ```" + foundCommand.usage + "```",
              );
            }
            await message.reply(commandDetails.join("\n"));
          }
        }
  
        let menuThemeType;
        let menuThemeHeader;
        let menuThemeFooter;
        let menuThemeCategoryHeader;
        let menuThemeCategoryFooter;
        let menuThemeCommandPrefix;
        let menuThemeCommandFooter;
  
        if (Config.menu === "") {
          menuThemeType = Math.floor(Math.random() * 4) + 1;
        }
  
        if (
          menuThemeType === 1 ||
          Config.menu.trim().startsWith("1") ||
          Config.menu.toLowerCase().includes("menu1")
        ) {
          menuThemeHeader = "┏﹝ *" + Config.botname + "* ﹞";
          menuThemeCommandPrefix = "┃ ✗";
          menuThemeFooter = "┗═════════════〤";
          menuThemeCategoryHeader = "┌『";
          menuThemeCategoryFooter = "』";
          menuThemeCommandPrefix = " | ";
          menuThemeCommandFooter = "\n└═════════════〤";
        } else if (
          menuThemeType === 2 ||
          Config.menu.trim().startsWith("2") ||
          Config.menu.toLowerCase().includes("menu2")
        ) {
          menuThemeHeader = "┌═[ *" + Config.botname + "* ]";
          menuThemeCommandPrefix = "⬡│▸";
          menuThemeFooter = "╰════════════···▸";
          menuThemeCategoryHeader = "┌〈";
          menuThemeCategoryFooter = "〉";
          menuThemeCommandPrefix = "⬡│▸ ";
          menuThemeCommandFooter = "\n│╰══════════···▸▸";
        } else {
          menuThemeHeader = "╭〘  " + Config.botname + "  〙";
          menuThemeCommandPrefix = "│ │";
          menuThemeFooter = "╰═══════════════⊷";
          menuThemeCategoryHeader = "╭─❏";
          menuThemeCategoryFooter = "❏";
          menuThemeCommandPrefix = "│";
          menuThemeCommandFooter = "╰════════════─⊷";
        }
  
        const categorizedCommands = {};
        commands.map(async (command, index) => {
          if (
            command.dontAddCommandList === false &&
            command.pattern !== undefined
          ) {
            if (!categorizedCommands[command.category]) {
              categorizedCommands[command.category] = [];
            }
            categorizedCommands[command.category].push(command.pattern);
          }
        });
  
        const currentTime = message.time;
        const currentDate = message.date;
        let menuText = `
  ${menuThemeHeader}
  ${menuThemeCommandPrefix} *ᴏᴡɴᴇʀ:* ${Config.ownername}
  ${menuThemeCommandPrefix} *ᴜᴘᴛɪᴍᴇ:* ${runtime(process.uptime())}
  ${menuThemeCommandPrefix} *ʀᴀᴍ ᴜsᴀɢᴇ:* ${formatp(os.totalmem() - os.freemem())}
  ${menuThemeCommandPrefix} *ᴛɪᴍᴇ:* ${currentTime}
  ${menuThemeCommandPrefix} *ᴅᴀᴛᴇ:* ${currentDate}
  ${menuThemeCommandPrefix} *ᴄᴏᴍᴍᴀɴᴅs:* ${commands.length}
  ${menuThemeCommandPrefix} *ᴜsᴀɢᴇ ᴛʀᴇɴᴅ:* ${usage_trend}
  ${menuThemeCommandPrefix} *ᴅᴀᴛᴀʙᴀsᴇ:* ${total_dat}
  ${menuThemeFooter}\n                         
  ▄▀█ █▀ ▀█▀ ▄▀█
  █▀█ ▄█ ░█░ █▀█
  \n${readmore}\n`;
  
        for (const category in categorizedCommands) {
          menuText += `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
          if (input.toLowerCase() === category.toLowerCase()) {
            menuText = `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
            for (const command of categorizedCommands[category]) {
              menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
            }
            menuText += `${menuThemeCommandFooter}\n`;
            break;
          } else {
            for (const command of categorizedCommands[category]) {
              menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
            }
            menuText += `${menuThemeCommandFooter}\n`;
          }
        }
        menuText += Config.caption;
  
        const messageOptions = {
          caption: menuText,
        };
        return await message.sendUi(message.chat, messageOptions, message);
      } catch (error) {
        await message.error(error + "\nCommand: menu", error);
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