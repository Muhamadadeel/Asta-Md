const axios = require("axios");
const fs = require("fs-extra");
const { exec } = require("child_process");
const { plugins, isUrl, smd, tlang, Config, smdJson, smdBuffer } = require("../lib");

// Set the s_ser variable to true (assuming it's a boolean flag)
let s_ser = true;

// Restart command
smd(
  {
    cmdname: "restart",
    info: "To restart bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename
  },
  async (message) => {
    const { exec: childExec } = require("child_process");
    message.reply("Restarting");
    childExec("pm2 restart all");
  }
);

// Shutdown command
smd(
  {
    cmdname: "shutdown",
    info: "To shutdown bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename
  },
  async (message) => {
    const { exec: childExec } = require("child_process");
    message.reply("Shutting Down...");
    childExec("pm2 stop");
  }
);

// Plugins command
smd(
  {
    cmdname: "plugins",
    alias: ["plugin"],
    type: "owner",
    info: "Shows list of all externally installed modules",
    fromMe: s_ser,
    filename: __filename,
    use: "<name>"
  },
  async (message, pluginName) => {
    try {
      let pluginList = await plugins(message, "plugins", pluginName);
      return await message.send(
        !pluginList
          ? `*_There's no plugin install in ${Config.botname}_*`
          : !pluginName
          ? `*All Installed Modules are:-*\n\n${pluginList}`
          : pluginList
      );
    } catch (error) {
      message.error(`${error} \n\ncmdName plugins\n`);
    }
  }
);

// Remove/Uninstall command
smd(
  {
    pattern: "remove",
    alias: ["uninstall"],
    type: "owner",
    info: "removes external modules.",
    fromMe: s_ser,
    filename: __filename,
    use: "<plugin name>"
  },
  async (message, pluginName) => {
    if (!pluginName) {
      return await message.reply("*_Uhh Please, Provide Me Plugin Name_*");
    }
    if (pluginName === "alls") {
      return await message.reply(await plugins("remove", "all", __dirname));
    }
    try {
      await message.send(await plugins(message, "remove", pluginName, __dirname), {}, "", message);
    } catch {}
  }
);

// Install command
smd(
  {
    cmdname: "install",
    type: "owner",
    info: "Installs external modules..",
    fromMe: s_ser,
    filename: __filename,
    use: "<gist url>"
  },
  async (message, pluginUrl) => {
    let url = pluginUrl ? pluginUrl : message.quoted ? message.quoted.text : "";
    if (!url.toLowerCase().includes("https")) {
      return await message.send("*_Uhh Please, Provide Me Plugin Url_*");
    }
    await message.reply(await plugins(message, "install", url, __dirname));
  }
);