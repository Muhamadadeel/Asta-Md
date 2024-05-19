const { plugins, Config } = require("../lib");
const {AdminFunction} = require("../lib")
AdminFunction(
  {
    cmdname: "restart",
    info: "To restart bot",
    type: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (action) => {
    const { exec: restarter } = require("child_process");
    action.reply("*`Restarting Bot`*");
    restarter("pm2 restart all");
  }
);
AdminFunction(
  {
    cmdname: "shutdown",
    info: "To Shutdown bot",
    type: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (action) => {
    const { exec: killer } = require("child_process");
    action.reply("*`Shutting Down Bot`*");
    killer("pm2 stop all");
  }
);
AdminFunction(
  {
    cmdname: "plugins",
    alias: ["plugin"],
    type: "owner",
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
          ? "*_There's no plugin install in " + Config.botname + "_*"
          : !InstalledPlugins
          ? "*All Installed Modules are:-*\n\n" + Installer
          : Installer
      );
    } catch (_0x21e335) {
      message.error(_0x21e335 + " \n\ncmdName plugins\n");
    }
  }
);
AdminFunction(
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
      return await message.reply("*`Sir I Need A Plugin Name, To Remove A Plugin`*");
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
AdminFunction(
  {
    cmdname: "install",
    type: "owner",
    info: "Installs external modules..",
    fromMe: true,
    filename: __filename,
    use: "<gist url>",
  },
  async (message, IsUrl) => {
    let Installer = IsUrl
      ? IsUrl
      : message.quoted
      ? message.quoted.text
      : "";
    if (!Installer.toLowerCase().includes("https")) {
      return await message.send("*`Sir Please Give A Vaild Plugin Url To Install From`*");
    }
    await message.reply(
      await plugins(message, "install", Installer, __dirname)
    );
  }
);
