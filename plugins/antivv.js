const { smd, tlang, botpic, prefix, Config, bot_ } = require("../lib");

let antiViewOnceEnabled = false;

smd({
 cmdname: "antivv",
 alias: ["antivv","antiviewonce"],
 desc: "turn On/Off auto viewOnce Downloader",
 fromMe: true,
 type: "general",
 use: "<on/off>",
 filename: __filename
}, async (context, query) => {
 try {
   let botData = (await bot_.findOne({ id: "bot_" + context.user })) || (await bot_.new({ id: "bot_" + context.user }));
   let action = query.toLowerCase().split(" ")[0].trim();

   if (action === "on" || action === "enable" || action === "act") {
     if (botData.antiviewonce === "true") {
       return await context.reply("`AntiViewOnce already enabled!`");
     }
     await bot_.updateOne({ id: "bot_" + context.user }, { antiviewonce: "true" });
     return await context.reply("`AntiViewOnce Successfully enabled`");
   } else if (action === "off" || action === "disable" || action === "deact") {
     if (botData.antiviewonce === "false") {
       return await context.reply("`AntiViewOnce already disabled`");
     }
     await bot_.updateOne({ id: "bot_" + context.user }, { antiviewonce: "false" });
     return await context.reply("`AntiViewOnce Successfully deactivated`");
   } else {
     return await context.send("`_Use on/off to enable/disable antiViewOnce!_`");
   }
 } catch (error) {
   await context.error(error + "\n\nCommand: AntiViewOnce ", error);
 }
});

smd({
 on: "viewonce"
}, async (context, messageData) => {
 try {
   if (!antiViewOnceEnabled) {
     antiViewOnceEnabled = await bot_.findOne({ id: "bot_" + context.user });
   }

   if (antiViewOnceEnabled && antiViewOnceEnabled.antiviewonce && antiViewOnceEnabled.antiviewonce === "true") {
     let quotedMessage = {
       key: { ...context.key },
       message: { conversation: "`[VIEWONCE DETECTED] downloading!`" }
     };

     let downloadedMedia = await context.bot.downloadAndSaveMediaMessage(context.msg);
     await context.bot.sendMessage(context.from, {
       [context.mtype2.split("Message")[0]]: { url: downloadedMedia },
       caption: context.body
     }, { quoted: quotedMessage });
   }
 } catch (error) {
   console.log("error while getting antiviewOnce media\n, ", error);
 }
});