const os = require('os')
let menus = false
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../config')
let {
  fancytext,
  tlang,
  tiny,
  bot_,
  alive,
  runtime,
  formatp,
  smsg,
  getAdmin,
  send,
  react,
  botpic,
  sleep,
  getBuffer,
  prefix,
  sck1,
  smd,
  sck,
  getTime,
  formatDate,
  groupdb,
  smdJson,
  smdBuffer,
  isAdmin
} = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
const astro_patch = require('../lib/plugins')
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const axios = require('axios')
const fetch = require("node-fetch");
const util = require("util");
const events = astro_patch;
const {
  commands
} = require('../lib');
const {
  exec
} = require("child_process")
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

function decodeString(encoded, key) {
  const lines = getLines();
  decodeString = function(str, keyStr) {
    str = str - 353;
    let decoded = lines[str];
    return decoded;
  };
  return decodeString(encoded, key);
}

function getLines() {
  const codeLines = ["6522QmnZgz", "readdir", "toFixed", "unlink", "*/15 * * * *", "category", "reply_message", "trim", "startsWith", "COMMANDS*", "forEach", "```\n\n", "toLowerCase", "help", "```", "57304VUSDcZ", "276864ouXpfJ", "7659558aRJrDI", "66413FlbkYf", "from", "includes", "sendUi", "28JDktra", "isPublic", "desc", "length", "replace", "use", "dontAddCommandList", "\n*🧩Info:* ```", "schedule", "_COMMANDS*  \n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n", "text", "┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*SUHAIL-MD_", "2716190HSgAcg", "info", "endsWith", "find", "send", "1072iiXGaj", "pattern", "split", "../lib", "toUpperCase", "MENU*", "19523750lqZXVD", "ERROR : ", "826LaJjSA"];
  getLines = function() {
    return codeLines;
  };
  return getLines();
}
(function obfuscateCode(codeLines, scrambleKey) {
  const scrambledLines = codeLines();
  while (true) {
    try {
      const value = parseInt(decodeString(360)) / 1 * (parseInt(decodeString(364)) / 2) + -parseInt(decodeString(390)) / 3 * (-parseInt(decodeString(381)) / 4) + -parseInt(decodeString(376)) / 5 + -parseInt(decodeString(358)) / 6 + parseInt(decodeString(389)) / 7 * (parseInt(decodeString(357)) / 8) + parseInt(decodeString(359)) / 9 + -parseInt(decodeString(387)) / 10;
      if (value === scrambleKey) {
        break;
      } else {
        scrambledLines.push(scrambledLines.shift());
      }
    } catch (err) {
      scrambledLines.push(scrambledLines.shift());
    }
  }
})(getLines, 666953);
smd({
  on: "text"
}, async (msg, text, {
  mek: msgObject,
  body: messageBody,
  args: commandArgs,
  botNumber: botNum,
  isCreator: isCreator,
  icmd: cmd,
  store: dataStore,
  budy: messageContent,
  Suhail: suhailLib,
  Void: voidLib,
  proto: protoLib
}) => {
  const util = require('util');
  try {
    if (!cronStart) {
      cron.schedule('0 0 * * *', () => {
        const schedule = require('node-schedule');
        cronStart = true;
        fs.readdir('./temp', (err, files) => {
          if (err) {
            return;
          }
          files.forEach(file => {
            try {
              fs.unlinkSync("./temp/" + file);
            } catch {}
          });
        });
      });
    }
    if (!msg.reply_message || !text || !msg.isCreator) {
      return;
    }
    const fancyLines = msg.reply_message.text.split("\n");
    let lineNumber = parseInt(text.split(" ")[0]);
    if (!isNaN(lineNumber)) {
      if (fancyLines.length > 30 && fancyLines[1].includes("SUHAIL-MD_FANCY_TEXT")) {
        var matchLine = fancyLines.find(line => line.startsWith(lineNumber + " "));
        try {
          if (matchLine) {
            await msg.reply(matchLine.replace("" + lineNumber, "").trim(), {}, "", msg);
          } else {
            "";
          }
        } catch {}
      }
    }
    let queryNumber = parseFloat(text.split(" ")[0]);
    if (isNaN(queryNumber)) {
      return;
    }
    let query = queryNumber.toString(1);
    var matchQuery = fancyLines.find(line => line.includes("*" + query + " "));
    if (matchQuery && (matchQuery.includes("COMMANDS*") || matchQuery.includes("MENU*"))) {
      var queryText = matchQuery.replace("*" + query, "").replace("|", "").replace(/COMMANDS\*/gi, "").replace(/MENU\*/gi, "").trim();
      if (queryText.length > 0 && queryText.length < 20) {
        const {
          commands
        } = require('./commands');
        const categorizedCommands = {};
        commands.forEach(cmd => {
          if (!cmd.isBanned && cmd.pattern !== undefined) {
            if (!categorizedCommands[cmd.category]) {
              categorizedCommands[cmd.category] = [];
            }
            categorizedCommands[cmd.category].push({
              command: cmd.pattern,
              info: cmd.desc,
              help: prefix + cmd.use + " " + (cmd.example ? cmd.example : "")
            });
          }
        });
        let cmdList = false;
        for (const category in categorizedCommands) {
          let searchTerm = "" + category.toLowerCase();
          if (queryText.includes(searchTerm)) {
            cmdList = "```📍Category:" + category.toUpperCase() + "```\n";
            categorizedCommands[category].forEach(cmd => {
              cmdList += "*🍁Command:* ```" + cmd.command + "``` " + (cmd.info ? "```" + cmd.info + "```" : "") + "\n*〽️Help:* ```" + cmd.help + "```\n\n";
            });
            cmdList += "\n\n" + Config.caption;
            break;
          }
        }
        if (cmdList) {
          return await msg.reply(msg.reply_message, {
            caption: cmdList
          });
        }
      }
    }
  } catch (err) {
    console.log("ERROR:", err);
  }
});
/**MASTER */
smd({
  on: "text"
}, async (msg, text, {
  mek: msgObject,
  body: messageBody,
  args: commandArgs,
  botNumber: botNum,
  isCreator: isCreator,
  icmd: cmd,
  store: dataStore,
  budy: messageContent,
  Suhail: suhailLib,
  Void: voidLib,
  proto: protoLib
}) => {
  const util = require('util');
  
  function getCode() {
    const codeLines = ["62454JBmitF", "react", "isCreator", "reply", "Provide me with a query to run Master!", "2618667xpRQLH", "2022148AUDBwx", "text", "1398Krkwgm", "15pWevhh", "format", "log", "16457KBRIAc", "20604213meAmhj", "slice", "includes", "chat", "\n}\na()", "6414720cwIFyR", "1471072FUlQDN", "ERROR FROM RUNNING QUERY WITH MASTER $\n"];
    getCode = function() {
      return codeLines;
    };
    return getCode();
  }
  (function(code, scramble) {
    const unscramble = getCode();
    while (true) {
      try {
        const value = -parseInt(unscramble(460)) / 1 + -parseInt(unscramble(466)) / 2 + parseInt(unscramble(465)) / 3 + -parseInt(unscramble(458)) / 4 * (parseInt(unscramble(469)) / 5) + -parseInt(unscramble(468)) / 6 * (-parseInt(unscramble(472)) / 7) + -parseInt(unscramble(457)) / 8 + parseInt(unscramble(473)) / 9;
        if (value === scramble) {
          break;
        } else {
          code.push(code.shift());
        }
      } catch (err) {
        code.push(code.shift());
      }
    }
  })(getCode(), 731357);
  let conn = voidLib;
  let sock = voidLib;
  let citel = msg;
  let message = msg;
  let m = msg;
  let jid = msg.chat;
  let client = voidLib;
  const {
    send,
    reply,
    react,
    sendMessage
  } = msg;
  let $ = "";
  if (msg.isCreator) {
    if (!Config.HANDLERS.includes(">") && citel.budy.startsWith(">")) {
      let code = messageContent.slice(1);
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
    } else if (!Config.HANDLERS.includes("$") && citel.budy.startsWith("$")) {
      let code = messageContent.slice(1);
      if (!code) {
        return citel.reply("Provide me with a query to run Master!");
      }
      try {
        let resultTest = await eval(`const a = async()=>{\n${code}\n}\na()`);
        await citel.react("🍁");
        if (resultTest) {
          return await citel.reply(util.format(resultTest));
        }
      } catch (err) {
        console.log("ERROR FROM RUNNING QUERY WITH MASTER $\n", err);
        return await citel.reply(util.format(err));
      }
    }
  }
});