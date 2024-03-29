const axios = require("axios");
const fs = require("fs-extra");
const { exec } = require("child_process");
const {
  plugins,
  isUrl,
  smd,
  tlang,
  Config,
  smdJson,
  smdBuffer,
} = require("../lib");
let s_ser = true
smd(
  {
    pattern: "uninstall",
    alias: ["remove"],
    type: "owner",
    info: "removes external modules.",
    fromMe: s_ser,
    filename: __filename,
    use: "<plugin name>",
  },
  async (message, pluginName) => {
    if (!pluginName) {
      return await message.reply("`Provide Me Plugin Name!`");
    }
    if (pluginName === "alls") {
      return await message.reply(await plugins("remove", "all", __dirname));
    }
    try {
      await message.send(
        await plugins(message, "remove", pluginName, __dirname),
        {},
        "",
        message,
      );
    } catch {}
  },
);
