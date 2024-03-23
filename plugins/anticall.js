let antiCallMessage = process.env.ANTICALL_MESSAGE || "`Hello this number has disabled calls, only texting is available`";

/*
{
  cmdname: "anticall",
  type: "user mode",
}
*/

const { smd, botpic, send, Config, tlang, sleep, smdBuffer, prefix, bot_ } = require("../lib");

let antiCallCountries = [];
let antiCallUsers = {};
let bots = false;

smd({
 pattern: "anticall",
 desc: "Detects calls and decline them.",
 category: "owner",
 use: "<on | off>",
 filename: __filename
}, async (context, query) => {
 let botData = (await bot_.findOne({ id: "anticall" + context.user })) || (await bot_.updateOne({ id: "anticall" + context.user }));
 let action = query ? query.toLowerCase().trim() : "";

 if (action.startsWith("off") || action.startsWith("false") || action.startsWith("disable")) {
   if (botData.anticall === "false") {
     return await context.send("`anticall Already Disabled In Current Chat!`");
   }
   await bot_.updateOne({ id: "anticall" + context.user }, { anticall: "false" });
   return await context.send("`anticall Disabled Succesfully!`");
 } else if (!query) {
   return await context.send(`*_anticall ${botData.anticall === "false" ? "Not set to any" : "set to \"" + botData.anticall + "\""}_*\n`);
 }

 let countryCodes = action.includes("all") ? "all" : query ? query.split(",").map(code => parseInt(code)).filter(code => !isNaN(code)).join(",") : false;

 if (!query || !countryCodes) {
   return await context.send(`*_Please provide country code to block calls_*\n*_eg: ${prefix}anticall all | 92_*`);
 } else if (countryCodes) {
   await bot_.updateOne({ id: "anticall" + context.user }, { anticall: "" + countryCodes });
   return await context.send(`*anticall Succesfully set to "${countryCodes}"!*`);
 } else {
   return await context.send(`*_Please provide a Valid country code_*\n*example: ${prefix}anticall all,212,91,231_*`);
 }
});

smd({
 call: "anticall"
}, async context => {
 try {
   if (!bots) {
     bots = await bot_.findOne({ id: "anticall" + context.user });
   }

   if (context.fromMe || !bots || !bots.anticall || bots.anticall === "false") {
     return;
   }

   if (!antiCallCountries || !antiCallCountries[0]) {
     antiCallCountries = bots.anticall?.split(",") || [];
     antiCallCountries = antiCallCountries.filter(code => code.trim() !== "");
   }

   let antiCallCode = ("" + bots.anticall).includes("all") ? "all" : "";
   let shouldDecline = antiCallCode == "all" ? true : antiCallCountries.some(code => context.from?.toString()?.startsWith(code));

   if (shouldDecline || context.isBot) {
     try {
       if (!antiCallUsers || !antiCallUsers[context.from]) {
         antiCallUsers[context.from] = { warn: 0 };
       }

       if (antiCallUsers[context.from].warn < 2) {
         await context.send(antiCallMessage);
       }

       antiCallUsers[context.from].warn++;
       await context.send(`*_${antiCallUsers[context.from].warn} Call rejected From User @${context.from.split("@")[0]}_*`, { mentions: [context.from] }, "warn", "", context.user);
       return await context.decline();
     } catch {}
   }
 } catch {}
});