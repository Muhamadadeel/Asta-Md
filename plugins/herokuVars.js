let Asta_Md = "Asta";
const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  botpic,
  prefix,
  sck1,
  smd
} = require("../lib");
const axios = require("axios");
const appName = Config.HEROKU_APP_NAME ? Config.HEROKU_APP_NAME.toLowerCase() : "";
const authToken = Config.HEROKU_API_KEY;
const HEROKU = authToken && appName ? true : false;
const fetch = require("node-fetch");
let updateConfig = () => {
  try {
    const configPath = "../config";
    delete require.cache[configPath];
    require(configPath);
    return true;
  } catch (error) {
    console.log(error);
  }
 };
 const heroku = {
  addvar: async (key, value) => {
    try {
      const headers = {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      };
      const response = await fetch(`https://api.heroku.com/apps/${appName}/config-vars`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ [key]: value })
      });
      const data = await response.json();
      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  },
 
  getallvar: async () => {
    try {
      const headers = {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer " + authToken
      };
      const response = await fetch(`https://api.heroku.com/apps/${appName}/config-vars`, {
        headers
      });
      const data = await response.json();
      let varsText = " 『 *" + appName + " VARS* 』 \n*________________________________________*\n";
      Object.keys(data).forEach(key => {
        varsText += `*${key} :*  ${data[key] ? `\`\`\`${data[key]}\`\`\`` : ""} \n`;
      });
      return { status: true, data: varsText };
    } catch (error) {
      return { status: false, data: error.message || error };
    }
  },
 
  getvar: async (key) => {
    try {
      const headers = {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer " + authToken
      };
      const response = await fetch(`https://api.heroku.com/apps/${appName}/config-vars`, {
        headers
      });
      const data = await response.json();
      return { status: true, data: data[key] };
    } catch (error) {
      return { status: false, data: error.message || error };
    }
  },
 
  setvar: async (key, value) => {
    try {
      const headers = {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      };
      const getResponse = await fetch(`https://api.heroku.com/apps/${appName}/config-vars`, {
        method: "GET",
        headers
      });
      if (!getResponse.ok) {
        return { status: false, data: "Variable not found in heroku app" };
      }
      const appVars = await getResponse.json();
      if (appVars.hasOwnProperty(key)) {
        const updatedVars = { ...appVars };
        updatedVars[key] = value;
        const patchResponse = await fetch(`https://api.heroku.com/apps/${appName}/config-vars`, {
          method: "PATCH",
          headers,
          body: JSON.stringify(updatedVars)
        });
        if (patchResponse.ok) {
          return { status: true, data: patchResponse };
        } else {
          return { status: false, data: `Failed to update app variable. Status: ${patchResponse.status}` };
        }
      } else {
        return { status: false, data: "Variable not found in app" };
      }
    } catch (error) {
      return { status: false, data: error.message || error };
    }
  }
 };
 smd({
  cmdname: "getsudo",
  alias: ["mods", "gsudo"],
  info: "get sudo users list.",
  fromMe: true,
  type: "tools",
  filename: __filename
 }, async context => {
  let sudoUsers = global.sudo.split(",").filter(user => user && user !== "null").map(user => user.trim());
  let usersList = sudoUsers.map((user, index) => ` ${index + 1} 〄 @${user}\n\n`).join("");
  let mentions = [context.sender, ...sudoUsers.map(user => `${user}@s.whatsapp.net`)];
 
  if (!usersList || !sudoUsers || !sudoUsers[0]) {
    return await context.reply("*There's no mods/sudo added for your bot!*");
  }
 
  let message = (`\n 👤 *${Config.botname || "SUHAIL-MD "} MODS* 👤\n \n${usersList}`).trim();
  return await context.reply("https://telegra.ph/file/5fd51597b0270b8cff15b.png", { caption: message, mentions }, "img", context);
 });
 
 smd({
  pattern: "setsudo",
  alias: ["ssudo", "setmod"],
  fromMe: true,
  desc: "Make sudo to a user",
  category: "tools",
  filename: __filename
 }, async context => {
  try {
    let userToAdd = context.replyMessage ? context.replyMessage.sender : context.mentionedJid[0] ? context.mentionedJid[0] : "";
 
    if (!userToAdd || !userToAdd.includes("@s.whatsapp.net")) {
      return await context.reply("*Uhh dear, reply/mention an User*");
    }
 
    let userId = userToAdd.split("@")[0];
 
    if (global.sudo.includes(userId)) {
      return context.reply("*Number Already Exist In Sudo!*");
    }
 
    global.sudo += `,${userId}`;
    let updateResponse = HEROKU ? await heroku.addvar("SUDO", global.sudo) : { status: false };
 
    if (updateResponse && updateResponse.status) {
      return context.reply(`*${userId} Added Succesfully.*\nSudo Numbers : \`\`\`${global.sudo}\`\`\``);
    } else if (!updateResponse || !updateResponse?.status) {
      if (HEROKU) {
        await context.reply("*_Request terminated due to error!_*\n\n There's no responce from _HEROKU_, \n please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_");
      }
      await context.reply("*User temporary added in sudo.*");
    }
  } catch (error) {
    await context.error(`${error}\n\ncommand: setsudo`, error);
  }
 });
 smd({
  pattern: "delsudo",
  alias: ["dsudo", "delmod"],
  fromMe: true,
  desc: "delete sudo user.",
  category: "tools",
  filename: __filename
 }, async (m) => {
  try {
    let user = m.reply_message ? m.reply_message.sender : m.mentionedJid[0] ? m.mentionedJid[0] : "";
    if (!user || !user.includes("@s.whatsapp.net")) {
      return await m.reply("*Uhh dear, reply/mention an User*");
    }
    let username = user.split("@")[0];
    let userEntry = "," + username;
    if (global.sudo.includes(userEntry)) {
      global.sudo = global.sudo.replace(userEntry, "");
    } else {
      return await m.reply("*User not found in the Sudo List!*");
    }
    let result = HEROKU ? await heroku.addvar("SUDO", global.sudo) : { status: false };
    if (result && result.status) {
      return m.reply(`*${username} Deleted Succesfully.*\nSudo Numbers : \`\`\`${global.sudo}\`\`\``);
    } else if (!result || !result?.status) {
      if (HEROKU) {
        await m.reply("*Request terminated due to error!*\n\n There's no responce from HEROKU, \n please check that you put valid HEROKU_APP_NAME and HEROKU_API_KEY");
      }
      await m.reply("*User removed from sudo.*");
    }
  } catch (err) {
    await m.error(err + "\n\ncommand: delsudo", err);
  }
 });
 
 smd({
  pattern: "allvar",
  alias: ["getallvar", "allvars"],
  desc: "To get All Heroku Vars",
  fromMe: true,
  category: "tools",
  filename: __filename
 }, async (m) => {
  try {
    let result = await heroku.getallvar();
    console.log({ result });
    if (result.status) {
      return m.send(result.data);
    } else {
      console.error(result.data);
      m.reply("*There's no responce from HEROKU*, \n please check that you put valid\n HEROKU_APP_NAME & HEROKU_API_KEY\n```See Console to check whats the err```");
    }
  } catch (err) {
    await m.error(err + "\n\ncommand: allvar", err);
  }
 });
 smd({
  pattern: "newvar",
  alias: ["addvar", "avar"],
  desc: "To Set Heroku Vars",
  category: "tools",
  fromMe: true,
  filename: __filename
 }, async (m, text, { cmdName }) => {
  try {
    if (!text) {
      return m.reply(`*Use ${prefix}${cmdName} CAPTION:Suhail Md*`);
    }
    const separator = text.indexOf(":");
    const varName = text.slice(0, separator).toUpperCase().trim();
    const varValue = text.slice(separator + 1).trim();
    process.env[varName] = varValue;
    updateConfig();
    if (!varValue) {
      return msg.reply(`*Uhh Please, Provide Value After ':' !*\n*Example : ${prefix}${cmdName} AUTO_SAVE_STATUS:true*`);
    }
    let result = await heroku.addvar(varName, varValue);
    if (result && result.status) {
      return m.reply(`*${varName}:* [ ${varValue} ] *Added successfully.*`);
    } else if (!result || !result.status) {
      console.error(result.data);
      await m.reply(`*Can't add ${cmdName} due to error!*\n\n please check that you put valid\n *HEROKU_APP_NAME* and *HEROKU_API_KEY*`);
    }
  } catch (err) {
    await m.error(err + "\n\ncommand: " + cmdName, err);
  }
 });
 
 smd({
  pattern: "getvar",
  desc: "To Get A Heroku Var",
  category: "tools",
  fromMe: true,
  filename: __filename
 }, async (m, text, { cmdName }) => {
  try {
    if (!text) {
      return m.reply(`*Please give me Variable Name*\n*Example : ${prefix}${cmdName} CAPTION*`);
    }
    const varName = text.split(" ")[0].toUpperCase();
    let result = await heroku.getvar(varName);
    if (result.status) {
      if (result.data) {
        return m.reply(`*${varName} :* ${result.data}`);
      } else {
        return m.reply(`*${varName}* does not exist in Heroku *${appName}* app.`);
      }
    } else if (!result || !result.status) {
      console.error(result.data);
      await m.reply("*There's no responce from HEROKU*, \n please check that you put valid\n *HEROKU_APP_NAME* & *HEROKU_API_KEY*");
    }
  } catch (err) {
    await m.error(err + "\n\ncommand: " + cmdName, err);
  }
 });
 smd({
  pattern: "setvar",
  desc: "To Set Heroku Vars",
  category: "tools",
  fromMe: true,
  filename: __filename
 }, async (m, text, { cmdName }) => {
  try {
    if (!text) {
      return m.reply(`*Uhh dear, Give me variable name*\n*Example : ${prefix}setvar PREFIX:null*`);
    }
    const separator = text.indexOf(":");
    const varName = text.slice(0, separator).toUpperCase().trim();
    const varValue = text.slice(separator + 1).trim();
    if (!varValue) {
      return msg.reply(`*Uhh Please, Provide value after ':' !*\n*Example : ${prefix}${cmdName} AUTO_READ_STATUS:true*`);
    }
    process.env[varName] = varValue;
    updateConfig();
    let result = await heroku.setvar(varName, varValue);
    if (result.status) {
      await m.reply(`*${varName}:* [ ${varValue} ] *updated successfully.*`);
    } else if (!result || !result.status) {
      console.error(result.data);
      await m.reply(result.data);
    }
  } catch (err) {
    await m.error(err + "\n\ncommand: " + cmdName, err);
  }
 });