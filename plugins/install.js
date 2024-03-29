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
smd(
  {
    cmdname: "install",
    type: "owner",
    info: "Installs external modules..",
    fromMe: s_ser,
    filename: __filename,
    use: "<gist url>",
  },
  async (message, pluginUrl) => {
    let url = pluginUrl ? pluginUrl : message.quoted ? message.quoted.text : "";
    if (!url.toLowerCase().includes("https")) {
      return await message.send("*_Uhh Please, Provide Me Plugin Url_*");
    }
    await message.reply(await plugins(message, "install", url, __dirname));
  },
);
