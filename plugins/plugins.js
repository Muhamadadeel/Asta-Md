const { plugins, smd, Config } = require("../lib");
let s_ser = true;
smd(
  {
    cmdname: "plugins",
    alias: ["plugin"],
    type: "owner",
    info: "Shows External Cmd.",
    fromMe: s_ser,
    filename: __filename,
    use: "<name>",
  },
  async (message, pluginName) => {
    try {
      let pluginList = await plugins(message, "plugins", pluginName);
      return await message.send(
        !pluginList
          ? `${Config.botname} Sir! I didn't see any plugins.`
          : !pluginName
            ? `${Config.owner}Sir here are the installed plugins.\n\n${pluginList}`
            : pluginList,
      );
    } catch (error) {
      message.error(`${error} \n\ncmdName plugins\n`);
    }
  },
);
