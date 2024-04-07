const { plugins, smd, Config } = require("../lib");
let senderIsAdmin = true;

smd({
  cmdname: "restart",
  info: "To restart bot",
  type: "tools",
  fromMe: senderIsAdmin,
  filename: __filename,
}, async (message) => {
  const { exec } = require("child_process");
  message.reply("Restarting");
  exec("pm2 restart all");
});

smd({
  cmdname: "shutdown",
  info: "To restart bot",
  type: "tools",
  fromMe: senderIsAdmin,
  filename: __filename,
}, async (message) => {
  const { exec } = require("child_process");
  message.reply("Shutting Down");
  exec("pm2 stop all");
});

smd({
  cmdname: "plugins",
  alias: ["plugin"],
  type: "owner",
  info: "Shows list of all externally installed modules",
  fromMe: senderIsAdmin,
  filename: __filename,
  use: "<name>",
}, async (message, pluginName) => {
  try {
    let pluginsList = await plugins(message, "plugins", pluginName);
    return await message.send(
      !pluginsList
        ? `*_There's no plugin install in ${Config.botname}_*`
        : !pluginName
        ? `*All Installed Modules are:-*\n\n${pluginsList}`
        : pluginsList
    );
  } catch (error) {
    message.error(`${error} \n\ncmdName plugins\n`);
  }
});

smd({
  pattern: "remove",
  alias: ["uninstall"],
  type: "owner",
  info: "removes external modules.",
  fromMe: senderIsAdmin,
  filename: __filename,
  use: "<plugin name>",
}, async (message, pluginName) => {
  if (!pluginName) {
    return await message.reply("*_Uhh Please, Provide Me Plugin Name_*");
  }
  if (pluginName === "alls") {
    return await message.reply(await plugins("remove", "all", __dirname));
  }
  try {
    await message.send(
      await plugins(message, "remove", pluginName, __dirname),
      {},
      "",
      message
    );
  } catch {}
});

smd({
  cmdname: "install",
  type: "owner",
  info: "Installs external modules..",
  fromMe: senderIsAdmin,
  filename: __filename,
  use: "<gist url>",
}, async (message, pluginUrl) => {
  let url = pluginUrl
    ? pluginUrl
    : message.quoted
    ? message.quoted.text
    : "";
  if (!url.toLowerCase().includes("https")) {
    return await message.send("*_Uhh Please, Provide Me Plugin Url_*");
  }
  await message.reply(await plugins(message, "install", url, __dirname));
});