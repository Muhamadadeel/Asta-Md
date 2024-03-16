const axios = require('axios');
const fs = require('fs-extra')
const {
  plugins,
  plugindb,
  remove,
  isUrl,
  cmd,
  tlang,
  Config
} = require('../lib')
cmd({
  pattern: "plugins",
  alias: ['plugin'],
  category: "owner",
  desc: "Shows list of all externally installed modules",
  filename: __filename
}, async (Void, citel, text, {
  isCreator
}) => {
  if (!isCreator) return citel.reply(tlang()
    .owner)
  let allmodtext = `*All Installed Modules are:-*\n\n`
  allmodtext += await plugins()
  return await citel.reply(allmodtext)
})
cmd({
  pattern: "remove",
  alias: ['uninstall'],
  category: "owner",
  desc: "removes external modules.",
  filename: __filename
}, async (Void, citel, text, {
  isCreator
}) => {
  if (!isCreator) return citel.reply(tlang()
    .owner)
  if (!text) return await citel.reply("*_Uhh Please, Provide Me Plugin Name_*")
  if (text === 'alls') {
    await plugindb.collection.drop();
    return citel.reply('Deleted all plugins from Secktor.');
  }
  try {
    let kill = await remove(text.split(" ")[0])
    delete require.cache[require.resolve(__dirname + "/" + text + ".js")];
    fs.unlinkSync(__dirname + "/" + text + ".js");
    await citel.reply(`*_${kill}_* \n*Please Wait _${Config.botname}_ Restarting_*`)
    const {
      exec
    } = require("child_process")
    exec('pm2 restart all')
  } catch (e) {
    return await citel.reply("*_Plugin Not Found In Mongodb Server_*")
  }
})
cmd({
  pattern: "install",
  category: "owner",
  desc: "Installs external modules..",
  filename: __filename
}, async (Void, client, text, {
  isCreator
}) => {
  if (!isCreator) {
    return client.reply(tlang()
      .owner);
  }
  if (!text) {
    return await client.reply("*_Uhh Please, Provide Me Plugin Name_*");
  }
  if (!isCreator) {
    return client.reply(tlang()
      .owner);
  }
  let inputText = text ? text : client.quoted && client.quoted.text ? client.quoted.text : client.text;
  for (let url of isUrl(inputText)) {
    try {
      url = new URL(url);
    } catch {
      client.reply("_Invalid Url_");
    }
    const {
      data
    } = await axios.get(url.href);
    const patternMatch = /pattern: ["'](.*)["'],/g.exec(data);
    const pluginName = patternMatch[0].split(" ")[1] || Math.random()
      .toString(36)
      .substring(8);
    const cleanedPluginName = pluginName.replace(/[^A-Za-z]/g, "");
    await fs.writeFileSync(`${__dirname}/${cleanedPluginName}.js`, data, "utf8");
    try {
      require(`${__dirname}/${cleanedPluginName}.js`);
    } catch (error) {
      fs.unlinkSync(`${__dirname}/${cleanedPluginName}.js`);
      return client.reply(`Invalid Plugin\n \`\`\`${error}\`\`\``);
    }
    const {
      plugindb
    } = require("../lib");
    const pluginData = {
      id: cleanedPluginName,
      url
    };
    await new plugindb(pluginData)
      .save();
    client.reply(`_Plugin_ *${cleanedPluginName}* _installed in Secktor._`);
  }
});