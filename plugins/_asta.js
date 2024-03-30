const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,
  tlang,
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
smd(
  {
    cmdname: "help",
    alias: ["categories", "ctgry", "category"],
    desc: "category list",
    category: "general",
  },
  async (message, args) => {
    try {
      if (args.split(" ")[0]) {
        let reply = [];
        const command = commands.find(
          (cmd) => cmd.pattern === args.split(" ")[0].toLowerCase()
        );
        if (command) {
          reply.push("*🍁Command:* " + command.pattern);
          if (command.category) {
            reply.push("*🧩Category:* " + command.category);
          }
          if (command.alias && command.alias[0]) {
            reply.push("*🧩Alias:* " + command.alias.join(", "));
          }
          if (command.desc) {
            reply.push("*🧩Description:* " + command.desc);
          }
          if (command.use) {
            reply.push(
              "*〽️Usage:*\n ```" +
                prefix +
                command.pattern +
                " " +
                command.use +
                "```"
            );
          }
          await message.reply(reply.join("\n"));
        }
      }
      const categories = {};
      commands.map(async (cmd, index) => {
        if (cmd.dontAddCommandList === false && cmd.pattern !== undefined) {
          if (!categories[cmd.category]) {
            categories[cmd.category] = [];
          }
          categories[cmd.category].push(cmd.pattern);
        }
      });
      let randomNumber = Math.round(Math.random());
      let title = randomNumber === 0 ? "MENU" : "COMMANDS";
      let reply =
        "┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t *SUHAIL-MD_" +
        title +
        "_LIST* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n\t```Reply the number you wants to select```\n\n";
      let category = 1;
      let count = 0;
      for (const cat in categories) {
        count += 1;
        if (args.toLowerCase() == cat.toLowerCase()) {
          reply = "┏━━⟪ *" + cat.toUpperCase() + "* ⟫━━⦿\n\n";
          for (const command of categories[cat]) {
            reply += "┃ ✗ " + fancytext(command, 1) + "\n";
          }
          reply += "\n┗━━━━━━━━━━━━━━⦿";
          break;
        }
        if (count >= 10) {
          category += 1;
          count = 0;
        }
        reply +=
          "\n*" +
          category +
          "." +
          count +
          " |" +
          cat.toUpperCase() +
          " " +
          title +
          "*\n";
      }
      reply += "\n\n" + Config.caption;
      return await message.sendUi(message.jid, {
        caption: reply,
      });
    } catch (error) {
      await message.error(error + "\nCommand:help", error);
    }
  }
 );
 
 smd(
  {
    pattern: "menus",
    type: "MENU list",
    info: "general",
    dontAddCommandList: true,
  },
  async (message) => {
    try {
      let reply = (
        "\n*🦄 ᴜᴘ ᴛɪᴍᴇ :* " +
        runtime(process.uptime()) +
        "\n*🍁 ᴛᴏᴅᴀʏ ɪs :* " +
        message.date +
        "\n*🎗 ɴᴏᴡ ᴛɪᴍᴇ :* " +
        message.time +
        "\n\n➮Fᴏᴜɴᴅᴇʀ- SuhailTechInfo𝛁\n➮Oᴡɴᴇʀ - " +
        Config.ownername +
        "\n➮Nᴜᴍ - " +
        owner.split(",")[0] +
        "\n➮Mᴇᴍᴏ - " +
        formatp(os.totalmem() - os.freemem()) +
        "/" +
        formatp(os.totalmem()) +
        "\n\n *🧑‍💻 :*  Sᴜʜᴀɪʟ-Mᴜʟᴛɪᴅᴇᴠɪᴄᴇ ɪꜱ ɴᴏᴡ Aᴠᴀɪʟᴀʙʟᴇ\n\n" +
        readmore +
        "\n╭──❰ *ALL MENU* ❱\n│🏮 Lɪꜱᴛ\n│🏮 Cᴀᴛᴇɢᴏʀʏ\n│🏮 Hᴇʟᴘ\n│🏮 Aʟɪᴠᴇ\n│🏮 Uᴘᴛɪᴍᴇ\n│🏮 Wᴇᴀᴛʜᴇʀ\n│🏮 Lɪɴᴋ\n│🏮 Cᴘᴜ\n│🏮 Rᴇᴘᴏꜱɪᴛᴏʀʏ\n╰─────────────⦁"
      ).trim();
      return await message.bot.sendUi(message.from, {
        caption: reply,
      });
    } catch (error) {
      await message.error(error + "\nCommand:menus", error);
    }
  }
 );
 
 astro_patch.cmd(
  {
    pattern: "setcmd",
    desc: "To check ping",
    category: "general",
    fromMe: true,
    filename: __filename,
  },
  async (message, args, { Void }) => {
    try {
      if (!args) {
        return await message.send(
          "*_Please provide cmd name by replying a Sticker_*"
        );
      }
      let cmdArgs = args.split(",");
      var cmdName;
      var cmdPattern;
      let isSticker = false;
      if (message.quoted) {
        let quotedType = message.quoted.mtype;
        if (quotedType == "stickerMessage" && args) {
          isSticker = true;
          cmdName = args.split(" ")[0];
          cmdPattern = "sticker-" + message.quoted.msg.fileSha256;
        }
      }
      if (!isSticker && cmdArgs.length > 1) {
        cmdPattern = cmdArgs[0].trim().toLowerCase();
        cmdName = cmdArgs[1].trim().toLowerCase();
      } else if (!isSticker) {
        return await message.send(
          "*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*"
        );
      }
      if (cmdPattern.length < 1) {
        return await message.reply(
          "*_Uhh Please, Provide New_Cmd Name First_*"
        );
      }
      if (global.setCmdAlias[cmdPattern]) {
        return await message.send(
          '*_"' +
            (isSticker ? "Given Sticker" : cmdPattern) +
            '" Already set for "' +
            global.setCmdAlias[cmdPattern] +
            '" Cmd, Please try another ' +
            (isSticker ? "Sticker" : "Name") +
            "_*"
        );
      }
      const command =
        astro_patch.commands.find((cmd) => cmd.pattern === cmdName) ||
        astro_patch.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(cmdName)
        );
      if (command) {
        global.setCmdAlias[cmdPattern] = command.pattern;
        return await message.send(
          '*_Cmd "' +
            global.setCmdAlias[cmdPattern] +
            '" Succesfully set to "' +
            (isSticker ? "Sticker" : cmdPattern) +
            '"._*\n*_These all names are reset, If bot restart_*'
        );
      } else {
        return await message.send(
          "*_Provided Cmd( " +
            cmdName +
            ") not found in bot cmds. Please Provide Valid cmd Name_*"
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:setcmd", error);
    }
  }
 );
 astro_patch.cmd(
  {
    pattern: "delcmd",
    desc: "To delete a command alias",
    category: "general",
    fromMe: true,
    filename: __filename,
  },
  async (message, args, { Void }) => {
    try {
      let cmdName = args ? args.split(" ")[0].trim().toLowerCase() : "";
      let isSticker = false;
      if (message.quoted) {
        if (message.quoted.mtype == "stickerMessage") {
          isSticker = true;
          cmdName = "sticker-" + message.quoted.msg.fileSha256;
        } else if (!args) {
          return await message.send(
            "*_Please reply to a Sticker that set for a Cmd_*"
          );
        }
      } else if (!args) {
        return await message.send(
          "*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*"
        );
      }
      if (global.setCmdAlias[cmdName]) {
        await message.send(
          '*_"' +
            (isSticker ? "Given Sticker" : cmdName) +
            '" deleted Succesfully at "' +
            global.setCmdAlias[cmdName] +
            '" cmd_*'
        );
        delete global.setCmdAlias[cmdName];
        return;
      } else {
        return await message.send(
          '*_"' +
            (isSticker ? "Given Sticker" : cmdName) +
            '" not Set for any cmd._*\n *_Please Provide Valid ' +
            (isSticker ? "Sticker" : "cmd Name") +
            " to delete_*"
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:delcmd", error);
    }
  }
);

astro_patch.smd(
  {
    pattern: "ping",
    desc: "To check ping",
    category: "general",
    filename: __filename,
  },
  async (message) => {
    var startTime = new Date().getTime();
    const { key } = await message.reply("*Testing Ping!!!*");
    var endTime = new Date().getTime();
    return await message.send(
      "*Pong*\n *" + (endTime - startTime) + " ms* ",
      { edit: key },
      "",
      message
    );
  }
);

 astro_patch.cmd(
  {
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Tells runtime/uptime of bot.",
    category: "misc",
    filename: __filename,
  },
  async (message) => {
    try {
      message.reply(
        "*_Uptime of " + tlang().title + ": " + runtime(process.uptime()) + "_*"
      );
    } catch (error) {
      await message.error(
        error + "\n\ncommand : uptime",
        error,
        false
      );
    }
  }
);
astro_patch.cmd(
  {
    pattern: "list",
    desc: "list menu",
    category: "general",
    react: "🥀",
  },
  async (message) => {
    try {
      const { commands } = require("../lib");
      let reply = `\n 
╭━━〘 *${Config.botname}* 〙────⊷
┃ ✭ Theme: ${tlang().title}
┃ ✭ Prefix: ${prefix}
┃ ✭ Owner: ${Config.ownername}
┃ ✭ Commands: ${commands.length}
┃ ✭ Uptime: ${runtime(process.uptime())}
┃ ✭ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
╰━━━━━━━━━━━━━━⊷\n`;

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern == undefined) {
          continue;
        }
        reply += `*${i + 1} ${fancytext(commands[i].pattern, 1)}*\n`;
        reply += ` ${fancytext(commands[i].desc, 1)}\n`;
      }

      return await message.sendUi(message.chat, {
        caption: reply + Config.caption,
      });
    } catch (error) {
      await message.error(error + "\nCommand:list", error);
    }
  }
);

astro_patch.smd(
  {
    pattern: "owner",
    desc: "To display owner's contact info",
    category: "general",
    filename: __filename,
  },
  async (message) => {
    try {
      const vcard =
        `BEGIN:VCARD\nVERSION:3.0\nFN:${Config.ownername}\nORG:;\nTEL;type=CELL;type=VOICE;waid=${global.owner?.split(",")[0]}:+${global.owner?.split(",")[0]}\nEND:VCARD`;

      let contactInfo = {
        contacts: {
          displayName: Config.ownername,
          contacts: [
            {
              vcard,
            },
          ],
        },
        contextInfo: {
          externalAdReply: {
            title: Config.ownername,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl: `https://wa.me/+${global.owner?.split(",")[0]}?text=Hii+${Config.ownername}`,
          },
        },
      };

      return await message.sendMessage(message.jid, contactInfo, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\nCommand:owner", error);
    }
  }
);

astro_patch.cmd(
  {
    pattern: "trt",
    alias: ["translate"],
    category: "general",
    filename: __filename,
    use: "< text >",
    desc: "Translate's given text in desired language.",
  },
  async (message, args) => {
    try {
      let lang = args ? args.split(" ")[0].toLowerCase() : "en";
      if (!message.reply_text) {
        var text = args.replace(lang, "")?.trim() || false;
      } else {
        var text = message.reply_text;
      }
      if (!text) {
        return await message.reply(
          `*Please Give Me Text. Example: _${prefix}trt en Who are you_*`
        );
      }
      var translation = await translatte(text, { from: "auto", to: lang });
      if ("text" in translation) {
        return await message.reply(translation.text);
      }
    } catch (error) {
      await message.error(error + "\n\ncommand trt", error);
    }
  }
);
astro_patch.cmd(
  {
    pattern: "file",
    desc: "Get the exact name and location of a command in the repository. This allows users to edit the command.",
    category: "general",
    fromMe: true,
    filename: __filename,
  },
  async (msg, query) => {
    try {
      if (!query) {
        return msg.reply("*Please provide a command or directory path.*");
      }

      if (query.startsWith(".")) {
        let fileListStr = "*------------- FILE MANAGER -------------*\n";
        try {
          const files = await readDirectory(query);
          files.forEach((file) => {
            fileListStr += file + "\n";
          });
          await msg.reply(fileListStr.toString());
        } catch (err) {
          msg.reply(err);
        }
        return;
      }

      const { commands } = require("../lib");
      let responseLines = [];
      let commandName = query.split(" ")[0].toLowerCase().trim();
      let command =
        events.commands.find((cmd) => cmd.pattern === commandName) ||
        events.commands.find((cmd) => cmd.alias && cmd.alias.includes(commandName));

      if (!command) {
        return await msg.reply("*❌No such command.*");
      }

      responseLines.push("*🍁Command:* " + command.pattern);
      if (command.category) {
        responseLines.push("*🧩Type:* " + command.category);
      }
      if (command.alias && command.alias[0]) {
        responseLines.push("*🧩Alias:* " + command.alias.join(", "));
      }
      if (command.desc) {
        responseLines.push("*✨Description:* " + command.desc);
      }
      if (command.use) {
        responseLines.push(
          "*〽️Usage:*\n ```" +
            prefix +
            command.pattern +
            " " +
            command.use +
            "```"
        );
      }
      if (command.usage) {
        responseLines.push("*〽️Usage:*\n ```" + command.usage + "```");
      }
      if (command.filename) {
        responseLines.push("*✨FileName:* " + command.filename);
      }

      try {
        if (
          query.includes("function") &&
          command.function &&
          msg.isSuhail &&
          command.pattern !== "file"
        ) {
          responseLines.push("*🧩Function:* " + command.function.toString());
        }
      } catch {}

      await msg.reply(responseLines.join("\n"));
    } catch (err) {
      await msg.error(err + "\nCommand:file", err);
    }
  }
);

astro_patch.cmd(
  {
    pattern: "eval",
    alias: ["$"],
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs JavaScript code on the Node server.",
    use: "< run code >",
    dontAddCommandList: true,
  },
  async (msg, code, { isCreator, cmdName, Void }) => {
    try {
      if (!code) {
        return msg.reply("*Provide code to run, Master*");
      }

      let result = eval(`const a = async()=>{\n${code}\n}\na()`);
      if (typeof result === "object") {
        await msg.reply(JSON.stringify(result));
      } else {
        await msg.reply(result.toString());
      }
    } catch (err) {
      return await msg.reply(err.toString());
    }
  }
);

astro_patch.cmd(
  {
    pattern: "shell",
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs command in the Heroku (server) shell.",
    use: "<shell cmds | ls, cd >",
    dontAddCommandList: true,
  },
  async (msg, command) => {
    try {
      if (!msg.isCreator) {
        return msg.reply(tlang().owner);
      }

      if (!command) {
        return msg.reply("*Please provide a command to run on Heroku.*");
      }

      exec(command, (error, stdout) => {
        if (error) {
          return msg.reply(
            "----" + tlang().title + "----\n\n" + error
          );
        }

        if (stdout) {
          return msg.reply(
            "----" + tlang().title + "----\n\n" + stdout
          );
        }
      });
    } catch (err) {
      await msg.error(err + "\n\ncommand shell", err);
    }
  }
);