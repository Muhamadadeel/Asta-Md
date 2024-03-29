let { prefix, smd } = require("../lib");
const astro_patch = require("../lib/plugins");
const events = astro_patch;
astro_patch.cmd(
  {
    pattern: "file",
    desc: "Show the Location of a Command.",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, input) => {
    try {
      if (!input) {
        return message.reply(
          "`Sir Please give me a command name to get it's location.`",
        );
      }

      if (input.startsWith(".")) {
        let fileList = "*FILE MANAGER*\n";
        try {
          const files = await readDirectory(input);
          files.forEach((file) => {
            fileList += file + "\n";
          });
          await message.reply(fileList.toString());
        } catch (error) {
          message.reply(error);
        }
        return;
      }

      const { commands } = require("../lib");
      let commandDetails = [];
      let commandPattern = input.split(" ")[0].toLowerCase().trim();
      let foundCommand =
        events.commands.find((cmd) => cmd.pattern === commandPattern) ||
        events.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(commandPattern),
        );

      if (!foundCommand) {
        return await message.reply("*❌No Such commands.*");
      }

      commandDetails.push("*ᴄᴏᴍᴍᴀɴᴅs:* " + foundCommand.pattern);
      if (foundCommand.category) {
        commandDetails.push("*ᴛʏᴘᴇ:* " + foundCommand.category);
      }
      if (foundCommand.desc) {
        commandDetails.push("*ᴄᴏᴍᴍᴀɴᴅ ɪɴғᴏ:* " + foundCommand.desc);
      }
      if (foundCommand.filename) {
        commandDetails.push("*ᴘᴀᴛʜ:* " + foundCommand.filename);
      }
      try {
        if (
          input.includes("function") &&
          foundCommand.function &&
          message.isAstro &&
          foundCommand.pattern !== "file"
        ) {
          commandDetails.push(
            "*💁Function:* " + foundCommand.function.toString(),
          );
        }
      } catch {}

      await message.reply(commandDetails.join("\n"));
    } catch (error) {
      await message.error(error + "\nCommand: file", error);
    }
  },
);
