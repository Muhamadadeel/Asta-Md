const astro_patch  = require("../lib/plugins")
let {cmd,prefix,smd,} = require("../lib");
astro_patch.cmd(
  {
    pattern: "query",
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs js code on node server.",
    use: "< run code >",
    dontAddCommandList: true,
  },
  async (message, input, { isCreator, cmdName, Void }) => {
    try {
      if (!input) {
        return message.reply("`Give me Command To Excute Sir`");
      }

      let result = eval(`const a = async()=>{\n${input}\n}\na()`);
      if (typeof result === "object") {
        await message.reply(JSON.stringify(result));
      } else {
        await message.reply(result.toString());
      }
    } catch (error) {
      return await message.reply(error.toString());
    }
  },
);