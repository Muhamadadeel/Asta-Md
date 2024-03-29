let {
  tlang,
  prefix,
  smd,
} = require("../lib");
const astro_patch = require("../lib/plugins");
astro_patch.cmd(
  {
    pattern: "herokushell",
    category: "noderunner",
    filename: __filename,
    fromMe: true,
    desc: "Runs command in Heroku(server) shell.",
    use: "<shell cmds | ls,cd >",
    dontAddCommandList: true,
  },
  async (message, input) => {
    try {
      if (!message.isCreator) {
        return message.reply(tlang().owner);
      }

      if (!input) {
        return message.reply("`Sir! Please give me a command to run on heroku shell.`");
      }

      exec(input, (error, stdout) => {
        if (error) {
          return message.reply(`----${tlang().title}----\n\n${error}`);
        }

        if (stdout) {
          return message.reply(`----${tlang().title}----\n\n${stdout}`);
        }
      });
    } catch (error) {
      await message.error(`${error}\n\ncommand shell`, error);
    }
  },
);