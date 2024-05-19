const { bot, plugins, Config } = require("../lib");
bot(
  {
    cmdname: "restart",
    info: "To restart bot",
    type: "sys",
    fromMe: true,
    filename: __filename,
  },
  async (action) => {
    const { exec: restarter } = require("child_process");
    action.reply("*`Restarting Bot`*");
    restarter("pm2 restart all");
  }
);
bot(
  {
    cmdname: "shutdown",
    info: "To Shutdown bot",
    type: "sys",
    fromMe: true,
    filename: __filename,
  },
  async (action) => {
    const { exec: killer } = require("child_process");
    action.reply("*`Shutting Down Bot`*");
    killer("pm2 stop all");
  }
);
bot(
  {
    cmdname: "plugins",
    alias: ["plugin"],
    type: "sys",
    info: "Shows list of all externally installed modules",
    fromMe: true,
    filename: __filename,
    use: "<name>",
  },
  async (message, InstalledPlugins) => {
    try {
      let Installer = await plugins(message, "plugins", InstalledPlugins);
      return await message.send(
        !Installer
          ? "*`Sir " +
              Config.ownername +
              " I have Scanned and did not See Any Externally Installed Plugins`*"
          : !InstalledPlugins
          ? "*All Installed Modules are:-*\n\n" + Installer
          : Installer
      );
    } catch (error) {
      message.error(error + " \n\ncmdName plugins\n");
    }
  }
);
let external_cmds = "AntiDelete: [ ]\nAntiSpam: [ ]";
let footer = "" + Config.botname + "";

bot(
  {
    pattern: "extraplugins",
    alias: ["listplugins"],
    type: "sys",
    info: "shows the External Plugins you can Install",
    fromMe: true,
    filename: __filename,
    use: "<plugins>",
  },
  async (message) => {
    try {
      return await message.send(
        `*Here Are The External Plugins*\n ${external_cmds}\n \t${footer}`
      );
    } catch (error) {
      message.error(error + " \n\ncmdName extraplugins\n");
    }
  }
);
bot(
  {
    pattern: "remove",
    alias: ["uninstall"],
    type: "owner",
    info: "removes external modules.",
    fromMe: true,
    filename: __filename,
    use: "<plugin name>",
  },
  async (message, IsName) => {
    if (!IsName) {
      return await message.reply(
        "*`Sir I Need A Plugin Name, To Remove A Plugin`*"
      );
    }
    if (IsName === "alls") {
      return await message.reply(await plugins("remove", "all", __dirname));
    }
    try {
      await message.send(
        await plugins(message, "remove", IsName, __dirname),
        {},
        "",
        message
      );
    } catch {}
  }
);
bot(
  {
    cmdname: "install",
    type: "owner",
    info: "Installs external modules..",
    fromMe: true,
    filename: __filename,
    use: "<gist url>",
  },
  async (message, IsUrl) => {
    let Installer = IsUrl ? IsUrl : message.quoted ? message.quoted.text : "";
    if (!Installer.toLowerCase().includes("https")) {
      return await message.send(
        "*`Sir Please Give A Vaild Plugin Url To Install From`*"
      );
    }
    await message.reply(
      await plugins(message, "install", Installer, __dirname)
    );
  }
);
