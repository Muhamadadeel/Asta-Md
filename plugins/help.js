const Config = require("../config");
let { fancytext, prefix, smd } = require("../lib");
const { commands } = require("../lib");
smd(
  {
    cmdname: "help",
    desc: "category list",
    category: "user",
    react: "💁🏼",
  },
  async (message, match) => {
    try {
      if (match.split(" ")[0]) {
        let response = [];
        const command = commands.find(
          (cmd) => cmd.pattern === match.split(" ")[0].toLowerCase(),
        );
        if (command) {
          response.push(`*ᴄᴏᴍᴍᴀɴᴅ:* ${command.pattern}`);
          if (command.category) {
            response.push(`*ᴄᴀᴛᴇɢᴏʀʏ:* ${command.category}`);
          }
          if (command.desc) {
            response.push(`*ᴄᴏᴍᴍᴀɴᴅ ɪɴғᴏ:* ${command.desc}`);
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

      let menuType = Math.round(Math.random()) === 0 ? "MENU" : "COMMANDS";
      let response = `\t*ASTA-MD_${menuType}_LIST*\n\n\t\`\`\`Reply this message with the Number\`\`\`\n\n`;
      let counter = 1;
      let categoryCounter = 0;

      for (const category in categories) {
        categoryCounter += 1;
        if (match.toLowerCase() === category.toLowerCase()) {
          response = `┏━━〘 *${category.toUpperCase()}* 〙━━〤\n\n`;
          for (const cmd of categories[category]) {
            response += `┃ ✗ ${fancytext(cmd, 1)}\n`;
          }
          response += "\n┗━━━━━━━━━━━━━━〤";
          break;
        }
        if (categoryCounter >= 10) {
          counter += 1;
          categoryCounter = 0;
        }
        response += `\n*${counter}.${categoryCounter} |${category.toUpperCase()} ${menuType}*\n`;
      }

      response += `\n\n${Config.caption}`;
      return await message.sendUi(message.jid, { caption: response });
    } catch (error) {
      await message.error(`${error}\nCommand:help`, error);
    }
  },
);
