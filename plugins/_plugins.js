let Asta_Md = "Asta";
const axios = require("axios");
const fs = require("fs-extra");
const {
  exec
} = require("child_process");
const {
  plugins,
  isUrl,
  smd,
  tlang,
  Config,
  smdJson,
  smdBuffer
} = require("../lib");
let s_ser = true;

smd({
 cmdname: "restart",
 info: "To restart bot",
 type: "tools",
 fromMe: s_ser,
 filename: __filename
}, async (context) => {
 const { exec } = require("child_process");
 context.reply("`Restarting`");
 exec("pm2 restart all");
});

smd({
 cmdname: "shutdown",
 info: "To shutdown bot",
 type: "tools",
 fromMe: s_ser,
 filename: __filename
}, async (context) => {
 const { exec } = require("child_process");
 context.reply("`shutting down`");
 exec("pm2 stop all");
});

smd({
 cmdname: "plugins",
 alias: ["plugin"],
 type: "owner",
 info: "Shows list of all externally installed modules",
 fromMe: s_ser,
 filename: __filename,
 use: "<name>"
}, async (context, query) => {
 try {
   let pluginsList = await plugins(context, "plugins", query);
   return await context.send(!pluginsList ? `*There's no plugin install in ${Config.botname}*` : !query ? `*All Installed Plugins are:-*\n\n${pluginsList}` : pluginsList);
 } catch (error) {
   context.error(error + " \n\ncmdName plugins\n");
 }
});

smd({
 pattern: "remove",
 alias: ["uninstall"],
 type: "owner",
 info: "removes external modules.",
 fromMe: s_ser,
 filename: __filename,
 use: "<plugin name>"
}, async (context, query) => {
 if (!query) {
   return await context.reply("`Provide A Plugin Name`");
 }
 if (query === "alls") {
   return await context.reply(await plugins("remove", "all", __dirname));
 }
 try {
   await context.send(await plugins(context, "remove", query, __dirname), {}, "", context);
 } catch {}
});

smd({
 cmdname: "install",
 type: "owner",
 info: "Installs external modules..",
 fromMe: s_ser,
 filename: __filename,
 use: "<gist url>"
}, async (context, query) => {
 let url = query ? query : context.quoted ? context.quoted.text : "";
 if (!url.toLowerCase().includes("https")) {
   return await context.send("`Provide A Plugin Url`");
 }
 await context.reply(await plugins(context, "install", url, __dirname));
});