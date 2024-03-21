const os = require('os')
let menus = false
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../config')
let { fancytext, tlang, tiny,bot_,alive, runtime, formatp, smsg ,getAdmin , send , react ,botpic,sleep, getBuffer ,prefix, sck1,smd,sck ,getTime ,formatDate  , groupdb,smdJson,smdBuffer, isAdmin  } = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
const astro_patch = require('../lib/plugins')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const axios = require('axios')
const fetch = require("node-fetch");
const util = require("util");
const events = astro_patch;
const { commands } = require('../lib');
const { exec } = require("child_process")
const translatte = require("translatte");
const cheerio = require('cheerio');
const path = require('path');
const cron = require('node-cron');
var cronStart = false
smd({
    cmdname: "help",
    alias: ["categories", "ctgry", "category"],
    desc: "category list",
    category: "general"
  }, async (message, query) => {
    try {
      if (query.split(" ")[0]) {
        let response = [];
        const command = commands.find(cmd => cmd.pattern === query.split(" ")[0].toLowerCase());
        if (command) {
          response.push(`*🍁Command:* ${command.pattern}`);
          if (command.category) {
            response.push(`*🧩Category:* ${command.category}`);
          }
          if (command.alias && command.alias[0]) {
            response.push(`*🧩Alias:* ${command.alias.join(", ")}`);
          }
          if (command.desc) {
            response.push(`*🧩Description:* ${command.desc}`);
          }
          if (command.use) {
            response.push(`*〽️Usage:*\n \`\`\`${prefix}${command.pattern} ${command.use}\`\`\``);
          }
          await message.reply(response.join("\n"));
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
      let menuType = randomNumber === 0 ? "MENU" : "COMMANDS";
      let menuList = `┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t *ASTA-MD_${menuType}_LIST* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n\t\`\`\`Reply the number you wants to select\`\`\`\n\n`;
      let counter = 1;
      let categoryCounter = 0;
      for (const category in categories) {
        categoryCounter += 1;
        if (query.toLowerCase() == category.toLowerCase()) {
          menuList = `┏━━⟪ *${category.toUpperCase()}* ⟫━━⦿\n\n`;
          for (const pattern of categories[category]) {
            menuList += `┃ ✗ ${fancytext(pattern, 1)}\n`;
          }
          menuList += "\n┗━━━━━━━━━━━━━━⦿";
          break;
        }
        if (categoryCounter >= 10) {
          counter += 1;
          categoryCounter = 0;
        }
        menuList += `\n*${counter}.${categoryCounter} |${category.toUpperCase()} ${menuType}*\n`;
      }
      menuList += `\n\n${Config.caption}`;
      return await message.sendUi(message.jid, {
        caption: menuList
      });
    } catch (error) {
      await message.error(`${error}\nCommand:help`, error);
    }
  });
  smd({
    pattern: "menus",
    type: "MENU list",
    info: "general",
    dontAddCommandList: true
  }, async message => {
    try {
      let menuText = `
   *🦄 ᴜᴘ ᴛɪᴍᴇ :* ${runtime(process.uptime())}
   *🍁 ᴛᴏᴅᴀʏ ɪs :* ${message.date}
   *🎗 ɴᴏᴡ ᴛɪᴍᴇ :* ${message.time}
   
   ➮Fᴏᴜɴᴅᴇʀ- Asta𝛁
   ➮Oᴡɴᴇʀ - ${Config.ownername}
   ➮Nᴜᴍ - ${owner.split(",")[0]}
   ➮Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
   
   *🧑‍💻 :*  Sᴜʜᴀɪʟ-Mᴜʟᴛɪᴅᴇᴠɪᴄᴇ ɪꜱ ɴᴏᴡ Aᴠᴀɪʟᴀʙʟᴇ
   
   ${readmore}
   ╭──❰ *ALL MENU* ❱
   │🏮 Lɪꜱᴛ
   │🏮 Cᴀᴛᴇɢᴏʀʏ
   │🏮 Hᴇʟᴘ
   │🏮 Aʟɪᴠᴇ
   │🏮 Uᴘᴛɪᴍᴇ
   │🏮 Wᴇᴀᴛʜᴇʀ
   │🏮 Lɪɴᴋ
   │🏮 Cᴘᴜ
   │🏮 Rᴇᴘᴏꜱɪᴛᴏʀʏ
   ╰─────────────⦁
   `.trim();
      return await message.bot.sendUi(message.from, {
        caption: menuText
      });
    } catch (error) {
      await message.error(`${error}\nCommand:menus`, error);
    }
  });
  astro_patch.cmd({
    pattern: "setcmd",
    desc: "To set a custom command alias",
    category: "general",
    fromMe: true,
    filename: __filename
  }, async (message, query, {
    Void
  }) => {
    try {
      if (!query) {
        return await message.send("*_Please provide cmd name by replying to a sticker or providing a new name and command name separated by a comma_*");
      }
      let [newCmdName, cmdName] = query.split(",");
      let isSticker = false;
      let stickerHash;
      if (message.quoted) {
        let quotedType = message.quoted.mtype;
        if (quotedType === "stickerMessage" && query) {
          isSticker = true;
          cmdName = query.split(" ")[0];
          stickerHash = "sticker-" + message.quoted.msg.fileSha256;
        }
      }
      if (!isSticker && query.includes(",")) {
        newCmdName = newCmdName.trim().toLowerCase();
        cmdName = cmdName.trim().toLowerCase();
      } else if (!isSticker) {
        return await message.send("*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*");
      }
      if (newCmdName.length < 1) {
        return await message.reply("*_Uhh Please, Provide New_Cmd Name First_*");
      }
      if (global.setCmdAlias[newCmdName]) {
        return await message.send(`*_"${isSticker ? "Given Sticker" : newCmdName}" Already set for "${global.setCmdAlias[newCmdName]}" Cmd, Please try another ${isSticker ? "Sticker" : "Name"}_*`);
      }
      const command = astro_patch.commands.find(cmd => cmd.pattern === cmdName) || astro_patch.commands.find(cmd => cmd.alias && cmd.alias.includes(cmdName));
      if (command) {
        global.setCmdAlias[newCmdName] = command.pattern;
        return await message.send(`*_Cmd "${global.setCmdAlias[newCmdName]}" Succesfully set to "${isSticker ? "Sticker" : newCmdName}"._*\n*_These all names are reset, If bot restart_*`);
      } else {
        return await message.send(`*_Provided Cmd( ${cmdName}) not found in bot cmds. Please Provide Valid cmd Name_*`);
      }
    } catch (error) {
      await message.error(`${error}\nCommand:setcmd`, error);
    }
  });
  astro_patch.cmd({
    pattern: "delcmd",
    desc: "To delete a custom command alias",
    category: "general",
    fromMe: true,
    filename: __filename
  }, async (message, query, {
    Void
  }) => {
    try {
      let cmdAlias = query ? query.split(" ")[0].trim().toLowerCase() : "";
      let isSticker = false;
      if (message.quoted) {
        if (message.quoted.mtype === "stickerMessage") {
          isSticker = true;
          cmdAlias = "sticker-" + message.quoted.msg.fileSha256;
        } else if (!query) {
          return await message.send("*_Please reply to a Sticker that set for a Cmd_*");
        }
      } else if (!query) {
        return await message.send("*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*");
      }
      if (global.setCmdAlias[cmdAlias]) {
        await message.send(`*_"${isSticker ? "Given Sticker" : cmdAlias}" deleted Succesfully at "${global.setCmdAlias[cmdAlias]}" cmd_*`);
        delete global.setCmdAlias[cmdAlias];
        return;
      } else {
        return await message.send(`*_"${isSticker ? "Given Sticker" : cmdAlias}" not Set for any cmd._*\n *_Please Provide Valid ${isSticker ? "Sticker" : "cmd Name"} to delete_*`);
      }
    } catch (error) {
      await message.error(`${error}\nCommand:delcmd`, error);
    }
  });
  astro_patch.smd({
    pattern: "ping",
    desc: "To check ping",
    category: "general",
    filename: __filename
  }, async message => {
    const startTime = new Date().getTime();
    const {
      key
    } = await message.reply("*Testing Ping!!!*");
    const endTime = new Date().getTime();
    return await message.send(`*Bot Speed*\n *${endTime - startTime} ms*`, {
      edit: key
    }, "", message);
  });
  astro_patch.cmd({
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Tells runtime/uptime of bot.",
    category: "misc",
    filename: __filename
  }, async message => {
    try {
      message.reply(`*_Uptime of ${tlang().title}: ${runtime(process.uptime())}_*`);
    } catch (error) {
      await message.error(`${error}\n\ncommand : uptime`, error, false);
    }
  });
  astro_patch.cmd({
    cmdname: "menu",
    desc: "Help list",
    type: "general",
    filename: __filename
  }, async (message, query) => {
    try {
      const {
        commands
      } = require("../lib");
      if (query.split(" ")[0]) {
        let response = [];
        const command = commands.find(cmd => cmd.pattern === query.split(" ")[0].toLowerCase());
        if (command) {
          response.push(`*🍁Command:* ${command.pattern}`);
          if (command.category) {
            response.push(`*🧩Category:* ${command.category}`);
          }
          if (command.alias && command.alias[0]) {
            response.push(`*🧩Alias:* ${command.alias.join(", ")}`);
          }
          if (command.desc) {
            response.push(`*🧩Description:* ${command.desc}`);
          }
          if (command.use) {
            response.push(`*〽️Usa:*\n \`\`\`${prefix}${command.pattern} ${command.use}\`\`\``);
          }
          if (command.usage) {
            response.push(`*〽️Usage:*\n \`\`\`${command.usage}\`\`\``);
          }
          await message.reply(response.join("\n"));
        }
      }
      let header, cmdListIcon, footer, categoryHeader, categoryFooter, cmdIcon, cmdFooter;
      let menuType = 0;
      if (Config.menu === "") {
        menuType = Math.floor(Math.random() * 4) + 1;
      }
      if (menuType === 1 || Config.menu.trim().startsWith("1") || Config.menu.toLowerCase().includes("aztec")) {
        header = "┏━━⟪ *" + Config.botname + "* ⟫━━⦿";
        cmdListIcon = "┃ ✗";
        footer = "┗━━━━━━━━━━━━━━━⦿";
        categoryHeader = "┌──『";
        categoryFooter = "』──❖\n";
        cmdIcon = " | ";
        cmdFooter = "\n└──────────────◉";
      } else if (menuType === 2 || Config.menu.trim().startsWith("2") || Config.menu.toLowerCase().includes("a17")) {
        header = "┌───═[ *" + Config.botname + "* ]═──▸\n│╭────────────···▸\n┴│▸";
        cmdListIcon = "⬡│▸";
        footer = "┬│▸\n│╰─────────────···▸\n└───────────────···▸";
        categoryHeader = "┌───〈";
        categoryFooter = "〉───◆\n│╭─────────────···▸\n┴│▸";
        cmdIcon = "⬡│▸ ";
        cmdFooter = "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
      } else {
        header = "╭────《  " + Config.botname + "  》────⊷\n│ ╭──────✧❁✧──────◆";
        cmdListIcon = "│ │";
        footer = "│ ╰──────✧❁✧──────◆\n╰══════════════════⊷";
        categoryHeader = "╭────❏";
        categoryFooter = "❏";
        cmdIcon = "│";
        cmdFooter = "╰━━━━━━━━━━━━━━──⊷";
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
      const currentTime = message.time;
      const currentDate = message.date;
      let menuText = `${header}\n${cmdListIcon} Theme:- ${tlang().title}\n${cmdListIcon} Owner:- ${Config.ownername}\n${cmdListIcon} Plugins:- ${commands.length}\n${cmdListIcon} Uptime:- ${runtime(process.uptime())}\n${cmdListIcon} Mem:- ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}\n${cmdListIcon} Time:- ${currentTime}\n${cmdListIcon} Date:- ${currentDate}\n${footer}\n\n`;
      for (const category in categories) {
        menuText += `${categoryHeader} *${tiny(category)}* ${categoryFooter}\n`;
        if (query.toLowerCase() === category.toLowerCase()) {
          menuText = `${categoryHeader} *${tiny(category)}* ${categoryFooter}\n`;
          for (const pattern of categories[category]) {
            menuText += `${cmdIcon} ${fancytext(pattern, 1)}\n`;
          }
          menuText += `${cmdFooter}\n`;
          break;
        } else {
          for (const pattern of categories[category]) {
            menuText += `${cmdIcon} ${fancytext(pattern, 1)}\n`;
          }
          menuText += `${cmdFooter}\n`;
        }
      }
      menuText += Config.caption;
      let menuOptions = {
        caption: menuText
      };
      return await message.sendUi(message.chat, menuOptions, message);
    } catch (error) {
      await message.error(`${error}\nCommand:menu`, error);
    }
  });
  astro_patch.cmd({
    pattern: "list",
    desc: "list menu",
    category: "general",
    react: "🥀"
  }, async message => {
    try {
      const {
        commands
      } = require("../lib");
      let listText = `
    ╭━━〘 *${Config.botname}* 〙────⊷     
    ┃ ✭ Theme: ${tlang().title}
    ┃ ✭ Prefix: ${prefix}
    ┃ ✭ Owner: ${Config.ownername}
    ┃ ✭ Commands: ${commands.length}
    ┃ ✭ Uptime: ${runtime(process.uptime())}
    ┃ ✭ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
    ╰━━━━━━━━━━━━━━⊷
   `;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern === undefined) {
          continue;
        }
        listText += `*${i + 1} ${fancytext(commands[i].pattern, 1)}*\n`;
        listText += `  ${fancytext(commands[i].desc, 1)}\n`;
      }
      return await message.sendUi(message.chat, {
        caption: listText + Config.caption
      });
    } catch (error) {
      await message.error(`${error}\nCommand:list`, error);
    }
  });
  astro_patch.smd({
    pattern: "owner",
    desc: "To check ping",
    category: "general",
    filename: __filename
  }, async message => {
    try {
      const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${Config.ownername}\nORG:;\nTEL;type=CELL;type=VOICE;waid=${global.owner?.split(",")[0]}:+${global.owner?.split(",")[0]}\nEND:VCARD`;
      let ownerMessage = {
        contacts: {
          displayName: Config.ownername,
          contacts: [{
            vcard
          }]
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
            sourceUrl: `https://wa.me/${global.owner?.split(",")[0]}?text=Hii+${Config.ownername}`
          }
        }
      };
      return await message.sendMessage(message.jid, ownerMessage, {
        quoted: message
      });
    } catch (error) {
      await message.error(`${error}\nCommand:owner`, error);
    }
  });
  astro_patch.smd({
    pattern: "creator",
    desc: "To check ping",
    category: "general",
    filename: __filename
  }, async message => {
    try {
      const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${Config.creator}\nORG:;\nTEL;type=CELL;type=VOICE;waid=${global.creator?.split(",")[0]}:+${global.creator?.split(",")[0]}\nEND:VCARD`;
      let ownerMessage = {
        contacts: {
          displayName: Config.creator,
          contacts: [{
            vcard
          }]
        },
        contextInfo: {
          externalAdReply: {
            title: Config.creator,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl: `https://wa.me/${global.creator?.split(",")[0]}?text=Hii+${Config.creator}`
          }
        }
      };
      return await message.sendMessage(message.jid, ownerMessage, {
        quoted: message
      });
    } catch (error) {
      await message.error(`${error}\nCommand:owner`, error);
    }
  });
  astro_patch.cmd({
    pattern: "trt",
    alias: ["translate"],
    category: "general",
    filename: __filename,
    use: "< text >",
    desc: "Translate's given text in desired language."
  }, async (message, query) => {
    try {
      let targetLanguage = query ? query.split(" ")[0].toLowerCase() : "en";
      let text = !message.reply_text ? query.replace(targetLanguage, "")?.trim() || false : message.reply_text;
      if (!text) {
        return await message.reply(`*Please Give Me Text. Example: _${prefix}trt en Who are you_*`);
      }
      const translation = await translatte(text, {
        from: "auto",
        to: targetLanguage
      });
      if ("text" in translation) {
        return await message.reply(translation.text);
      }
    } catch (error) {
      await message.error(`${error}\n\ncommand trt`, error);
    }
  });
  const readDirectory = (directory) => {
    return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
        if (err) {
          reject("Error reading directory");
        } else {
          resolve(files);
        }
      });
    });
  };
  astro_patch.cmd({
    pattern: "file",
    desc: "to get the exact filename and location where a command is defined in the repository. This allows the user to edit the command's code.",
    category: "general",
    fromMe: true,
    filename: __filename
  }, async (message, query) => {
    try {
      if (!query) {
        return message.reply("*Uhh Please, Provide A Command/Directory*");
      }
      if (query.startsWith(".")) {
        let fileList = "*------------- FILE MANAGER -------------*\n";
        try {
          const files = await readDirectory(query);
          files.forEach(file => {
            fileList += file + "\n";
          });
          await message.reply(fileList.toString());
        } catch (error) {
          message.reply(error);
        }
        return;
      }
      const {
        commands
      } = require("../lib");
      let response = [];
      let cmdPattern = query.split(" ")[0].toLowerCase().trim();
      let command = events.commands.find(cmd => cmd.pattern === cmdPattern) || events.commands.find(cmd => cmd.alias && cmd.alias.includes(cmdPattern));
      if (!command) {
        return await message.reply("*❌No Such commands.*");
      }
      response.push(`*🍁Command:* ${command.pattern}`);
      if (command.category) {
        response.push(`*🧩Type:* ${command.category}`);
      }
      if (command.alias && command.alias[0]) {
        response.push(`*🧩Alias:* ${command.alias.join(", ")}`);
      }
      if (command.desc) {
        response.push(`*✨Description:* ${command.desc}`);
      }
      if (command.use) {
        response.push(`*〽️Usa:*\n \`\`\`${prefix}${command.pattern} ${command.use}\`\`\``);
      }
      if (command.usage) {
        response.push(`*〽️Usage:*\n \`\`\`${command.usage}\`\`\``);
      }
      if (command.filename) {
        response.push(`*✨FileName:* ${command.filename}`);
      }
      try {
        if (query.includes("function") && command.function && message.isSuhail && command.pattern !== "file") {
          response.push(`*🧩Function:* ${command.function.toString()}`);
        }
      } catch {}
      await message.reply(response.join("\n"));
    } catch (error) {
      await message.error(`${error}\nCommand:file`, error);
    }
  });
  astro_patch.cmd({
    pattern: "eval",
    alias: ["$"],
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs js code on node server.",
    use: "< run code >",
    dontAddCommandList: true
  }, async (message, query, {
    isCreator,
    cmdName,
    Void
  }) => {
    try {
      if (!query) {
        return message.reply("*Provide A Query To Run Master*");
      }
      let result = eval(`const a = async()=>{\n${query}\n}\na()`);
      if (typeof result === "object") {
        await message.reply(JSON.stringify(result));
      } else {
        await message.reply(result.toString());
      }
    } catch (error) {
      return await message.reply(error.toString());
    }
  });
  astro_patch.cmd({
    pattern: "shell",
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs command in Heroku(server) shell.",
    use: "<shell cmds | ls,cd >",
    dontAddCommandList: true
  }, async (msg, input) => {
    try {
      if (!msg.isCreator) {
        return msg.reply(tlang().owner);
      }
      if (!input) {
        return msg.reply("*Uhh PLease, Provide A Command to Run Heroku*");
      }
      exec(input, (error, stdout) => {
        if (error) {
          return msg.reply("----" + tlang().title + "----\n\n" + error);
        }
        if (stdout) {
          return msg.reply("----" + tlang().title + "----\n\n" + stdout);
        }
      });
    } catch (err) {
      await msg.error(err + "\n\ncommand shell", err);
    }
  });













smd({
  on: "text"
}, async (_0x460b55, _0x2fcc6c, {
  mek: _0x376ae1,
  body: _0x6c25b0,
  args: _0x213257,
  botNumber: _0x615ced,
  isCreator: _0x44cb69,
  icmd: _0x52773f,
  store: _0x1d9a76,
  budy: _0x1e9bcf,
  Suhail: _0x6ee677,
  Void: _0x43102c,
  proto: _0x5f14ef
}) => {
  const _0x210c92 = _0x213c;
  let _0x3efef6 = _0x460b55;
  try {
    if (!cronStart) {
      cron[_0x210c92(372)](_0x210c92(394), () => {
        const _0x529045 = _0x210c92;
        cronStart = true;
        fs[_0x529045(391)]("./temp", (_0x13ab05, _0x5b39ed) => {
          const _0x57a393 = _0x529045;
          if (_0x13ab05) {
            return;
          }
          _0x5b39ed[_0x57a393(400)](_0x630e8 => {
            const _0x2da99b = _0x57a393;
            try {
              fs[_0x2da99b(393)]("./temp/" + _0x630e8);
            } catch {}
          });
        });
      });
    }
    if (!_0x460b55.reply_message || !_0x2fcc6c || !_0x460b55[_0x210c92(365)]) {
      return;
    }
    const _0x1eb88a = _0x460b55[_0x210c92(396)][_0x210c92(374)].split("\n");
    let _0x56b5d3 = parseInt(_0x2fcc6c[_0x210c92(383)](" ")[0]);
    if (!isNaN(_0x56b5d3)) {
      if (_0x1eb88a[_0x210c92(367)] > 30 && _0x1eb88a[1][_0x210c92(362)]("SUHAIL-MD_FANCY_TEXT")) {
        var _0x7b7a13 = _0x1eb88a[_0x210c92(379)](_0x4377cc => _0x4377cc.startsWith(_0x56b5d3 + " "));
        try {
          if (_0x7b7a13) {
            await _0x460b55[_0x210c92(380)](_0x7b7a13[_0x210c92(368)]("" + _0x56b5d3, "")[_0x210c92(397)](), {}, "", _0x460b55);
          } else {
            "";
          }
        } catch {}
      }
    }
    let _0x245187 = parseFloat(_0x2fcc6c.split(" ")[0]);
    if (isNaN(_0x245187)) {
      return;
    }
    let _0x5b0909 = _0x245187[_0x210c92(392)](1);
    var _0x42e09a = _0x1eb88a[_0x210c92(379)](_0x34ef22 => _0x34ef22[_0x210c92(398)]("*" + _0x5b0909 + " "));
    if (_0x42e09a && (_0x42e09a[_0x210c92(378)](_0x210c92(399)) || _0x42e09a[_0x210c92(378)](_0x210c92(386)))) {
      var _0x56c097 = _0x42e09a.replace("*" + _0x5b0909, "")[_0x210c92(368)]("|", "")[_0x210c92(368)](/COMMANDS\*/gi, "")[_0x210c92(368)](/MENU\*/gi, "")[_0x210c92(354)]();
      if (_0x56c097[_0x210c92(367)] > 0 && _0x56c097[_0x210c92(367)] < 20) {
        const {
          commands: _0x4f16cc
        } = require(_0x210c92(384));
        const _0x59e793 = {};
        _0x4f16cc[_0x210c92(400)](_0xc3d8cc => {
          const _0x20ed1a = _0x210c92;
          if (!_0xc3d8cc[_0x20ed1a(370)] && _0xc3d8cc.pattern !== undefined) {
            if (!_0x59e793[_0xc3d8cc[_0x20ed1a(395)]]) {
              _0x59e793[_0xc3d8cc.category] = [];
            }
            _0x59e793[_0xc3d8cc[_0x20ed1a(395)]].push({
              command: _0xc3d8cc.pattern,
              info: _0xc3d8cc[_0x20ed1a(366)],
              help: prefix + _0xc3d8cc[_0x20ed1a(382)] + " " + (_0xc3d8cc[_0x20ed1a(369)] ? _0xc3d8cc[_0x20ed1a(369)] : "")
            });
          }
        });
        let _0x5cca14 = false;
        for (const _0x1af79d in _0x59e793) {
          let _0x37f2ac = "" + _0x1af79d.toLowerCase();
          if (_0x56c097.includes(_0x37f2ac)) {
            _0x5cca14 = _0x210c92(375) + _0x1af79d[_0x210c92(385)]() + _0x210c92(373);
            _0x59e793[_0x1af79d][_0x210c92(400)](_0xf574fc => {
              const _0x4231a3 = _0x210c92;
              _0x5cca14 += "*🍁Command:* ```" + _0xf574fc.command + "``` " + (_0xf574fc[_0x4231a3(377)] ? _0x4231a3(371) + _0xf574fc[_0x4231a3(377)] + _0x4231a3(356) : "") + "\n*〽️Help:* ```" + _0xf574fc[_0x4231a3(355)] + _0x4231a3(353);
            });
            _0x5cca14 += "\n\n" + Config.caption;
            break;
          }
        }
        if (_0x5cca14) {
          return await _0x460b55[_0x210c92(363)](_0x460b55[_0x210c92(361)], {
            caption: _0x5cca14
          });
        }
      }
    }
  } catch (_0x3e9a32) {
    console.log(_0x210c92(388), _0x3e9a32);
  }
});
smd({
  on: "text"
}, async (msg, text, {
  mek,
  body,
  args,
  botNumber,
  isCreator,
  icmd,
  store,
  budy,
  Suhail,
  Void,
  proto
}) => {
  const _0xd6a12a = _0x1571;
  function _0x2edb() {
    const _0x667561 = ["62454JBmitF", "react", "isCreator", "reply", "Provide me with a query to run Master!", "2618667xpRQLH", "2022148AUDBwx", "text", "1398Krkwgm", "15pWevhh", "format", "log", "16457KBRIAc", "20604213meAmhj", "slice", "includes", "chat", "\n}\na()", "6414720cwIFyR", "1471072FUlQDN", "ERROR FROM RUNNING QUERY WITH MASTER $\n"];
    _0x2edb = function () {
      return _0x667561;
    };
    return _0x2edb();
  }
  (function (_0x3e0222, _0xfa3e8a) {
    const _0xe793f5 = _0x1571;
    const _0x1a4f58 = _0x3e0222();
    while (true) {
      try {
        const _0xf50973 = -parseInt(_0xe793f5(460)) / 1 + -parseInt(_0xe793f5(466)) / 2 + parseInt(_0xe793f5(465)) / 3 + -parseInt(_0xe793f5(458)) / 4 * (parseInt(_0xe793f5(469)) / 5) + -parseInt(_0xe793f5(468)) / 6 * (-parseInt(_0xe793f5(472)) / 7) + -parseInt(_0xe793f5(457)) / 8 + parseInt(_0xe793f5(473)) / 9;
        if (_0xf50973 === _0xfa3e8a) {
          break;
        } else {
          _0x1a4f58.push(_0x1a4f58.shift());
        }
      } catch (_0x556c40) {
        _0x1a4f58.push(_0x1a4f58.shift());
      }
    }
  })(_0x2edb, 731357);
  let conn = Void;
  let sock = Void;
  let citel = msg;
  let message = msg;
  let m = msg;
  let jid = msg[_0xd6a12a(455)];
  let client = Void;
  function _0x1571(_0x262039, _0x151011) {
    const _0x2edb64 = _0x2edb();
    _0x1571 = function (_0x15719d, _0x45ddb3) {
      _0x15719d = _0x15719d - 455;
      let _0x347d5c = _0x2edb64[_0x15719d];
      return _0x347d5c;
    };
    return _0x1571(_0x262039, _0x151011);
  }
  const {
    send,
    reply,
    react,
    sendMessage
  } = msg;
  let $ = "";
  if (msg[_0xd6a12a(462)]) {
    if (!Config.HANDLERS[_0xd6a12a(475)](">") && citel[_0xd6a12a(467)].startsWith(">")) {
      let code = budy[_0xd6a12a(474)](1);
      if (!code) {
        return citel[_0xd6a12a(463)](_0xd6a12a(464));
      }
      try {
        let resultTest = eval(code);
        if (resultTest) {
          return citel[_0xd6a12a(463)](util[_0xd6a12a(470)](resultTest));
        }
      } catch (_0x75dc0b) {
        return citel[_0xd6a12a(463)](util[_0xd6a12a(470)](_0x75dc0b));
      }
    } else if (!Config.HANDLERS[_0xd6a12a(475)]("$") && citel[_0xd6a12a(467)].startsWith("$")) {
      let code = budy[_0xd6a12a(474)](1);
      if (!code) {
        return citel[_0xd6a12a(463)](_0xd6a12a(464));
      }
      try {
        let resultTest = await eval("const a = async()=>{\n" + code + _0xd6a12a(456));
        await citel[_0xd6a12a(461)]("🍁");
        if (resultTest) {
          return await citel.reply(util[_0xd6a12a(470)](resultTest));
        }
      } catch (_0x467251) {
        console[_0xd6a12a(471)](_0xd6a12a(459), _0x467251);
        return await citel.reply(util[_0xd6a12a(470)](_0x467251));
      }
    }
  }
});
function _0x213c(_0x345a66, _0x1f74b8) {
    const _0x593b05 = _0x593b();
    _0x213c = function (_0x213cbe, _0x58c23c) {
      _0x213cbe = _0x213cbe - 353;
      let _0x3d37ed = _0x593b05[_0x213cbe];
      return _0x3d37ed;
    };
    return _0x213c(_0x345a66, _0x1f74b8);
  }
  function _0x593b() {
    const _0x579036 = ["6522QmnZgz", "readdir", "toFixed", "unlink", "*/15 * * * *", "category", "reply_message", "trim", "startsWith", "COMMANDS*", "forEach", "```\n\n", "toLowerCase", "help", "```", "57304VUSDcZ", "276864ouXpfJ", "7659558aRJrDI", "66413FlbkYf", "from", "includes", "sendUi", "28JDktra", "isPublic", "desc", "length", "replace", "use", "dontAddCommandList", "\n*🧩Info:* ```", "schedule", "_COMMANDS*  \n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n", "text", "┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*SUHAIL-MD_", "2716190HSgAcg", "info", "endsWith", "find", "send", "1072iiXGaj", "pattern", "split", "../lib", "toUpperCase", "MENU*", "19523750lqZXVD", "ERROR : ", "826LaJjSA"];
    _0x593b = function () {
      return _0x579036;
    };
    return _0x593b();
  }
  (function (_0x58691b, _0x4712be) {
    const _0x49221f = _0x213c;
    const _0x3831e3 = _0x58691b();
    while (true) {
      try {
        const _0x27411c = parseInt(_0x49221f(360)) / 1 * (parseInt(_0x49221f(364)) / 2) + -parseInt(_0x49221f(390)) / 3 * (-parseInt(_0x49221f(381)) / 4) + -parseInt(_0x49221f(376)) / 5 + -parseInt(_0x49221f(358)) / 6 + parseInt(_0x49221f(389)) / 7 * (parseInt(_0x49221f(357)) / 8) + parseInt(_0x49221f(359)) / 9 + -parseInt(_0x49221f(387)) / 10;
        if (_0x27411c === _0x4712be) {
          break;
        } else {
          _0x3831e3.push(_0x3831e3.shift());
        }
      } catch (_0x41bdec) {
        _0x3831e3.push(_0x3831e3.shift());
      }
    }
  })(_0x593b, 666953); 