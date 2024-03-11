const os = require('os');
const moment = require("moment-timezone");
const fs = require("fs");
const Config = require('../config');
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  botpic,
  getBuffer,
  prefix,
  sck1
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require('../lib/commands');
  

astro_patch.cmd({
    pattern: "setcmd",
    desc: "To check ping",
    category: "general",
    filename: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return await citel.reply(tlang().owner);
    }
    if (!text) {
      return await citel.send("*_Please provide cmd name by replying a Sticker_*");
    }
    let a = text.split(",");
    var cmdName;
    var newAlias;
    let isSticker = false;
    if (citel.quoted) {
      let mime = citel.quoted.mtype;
      if (mime == "stickerMessage" && text) {
        isSticker = true;
        cmdName = text.split(" ")[0];
        newAlias = "sticker-" + citel.quoted.fileSha256;
      }
    }
    if (!isSticker && a.length > 1) {
      newAlias = a[0].trim().toLowerCase();
      cmdName = a[1].trim().toLowerCase();
    } else if (!isSticker) {
      return await citel.send("*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*");
    }
    if (newAlias.length < 1) {
      return await citel.reply("*_Uhh Please, Provide New_Cmd Name First_*");
    }
    if (global.setCmdAlias[newAlias]) {
      return await citel.send("*_\"" + (isSticker ? "Given Sticker" : newAlias) + "\" Already set for \"" + global.setCmdAlias[newAlias] + "\" Cmd, Please try another " + (isSticker ? "Sticker" : "Name") + "_*");
    }
    const cmd = astro_patch.commands.find(_0x258c2d => _0x258c2d.pattern === cmdName) || astro_patch.commands.find(_0x23f1c1 => _0x23f1c1.alias && _0x23f1c1.alias.includes(cmdName));
    if (cmd) {
      global.setCmdAlias[newAlias] = cmd.pattern;
      return await citel.send("*_Cmd \"" + global.setCmdAlias[newAlias] + "\" Succesfully set to \"" + (isSticker ? "Sticker" : newAlias) + "\"._*\n*_These all names are reset, If bot restart_*");
    } else {
      return await citel.send("*_Provided Cmd( " + cmdName + ") not found in bot cmds. Please Provide Valid cmd Name_*");
    }
  });
      //---------------------------------------------------------------------------
      astro_patch.cmd({
        pattern: "delcmd",
        desc: "To check ping",
        category: "general",
        filename: __filename
      }, async (Void, citel, text, {
        isCreator
      }) => {
        if (!isCreator) {
          return await citel.reply(tlang().owner);
        }
        let Alias = text ? text.split(" ").trim().toLowerCase() : "";
        let isSticker = false;
        if (citel.quoted) {
          if (citel.quoted.mtype == "stickerMessage") {
            isSticker = true;
            Alias = "sticker-" + citel.quoted.fileSha256;
          } else if (!text) {
            return await citel.send("*_Please reply to a Sticker that set for a Cmd_*");
          }
        } else if (!text) {
          return await citel.send("*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*");
        }
        if (global.setCmdAlias[Alias]) {
          await citel.send("*_\"" + (isSticker ? "Given Sticker" : Alias) + "\" deleted Succesfully at \"" + global.setCmdAlias[Alias] + "\" cmd_*");
          delete global.setCmdAlias[Alias];
          return;
        } else {
          return await citel.send("*_\"" + (isSticker ? "Given Sticker" : Alias) + "\" not Set for any cmd._*\n *_Please Provide Valid " + (isSticker ? "Sticker" : "cmd Name") + " to delete_*");
        }
      });
  
  //------------------------------------------------------------------------------------
  
  astro_patch.cmd({
          pattern: "ping",
          desc: "To check ping",
          category: "general",
          filename: __filename,
      },
      async(Void, citel) => {
          var inital = new Date().getTime();
          await citel.reply('*Testing Ping!!!*');
          var final = new Date().getTime();
          return await citel.reply('*Pong*\n *' + (final - inital) + ' ms* ');
      });
  
  
  //------------------------------------------------------------------------------------
  astro_patch.cmd({
    pattern: "help",
    alias: ["menu"],
    desc: "Help list",
    category: "general",
    // react: "👀",
    filename: __filename
  }, async (Void, citel, text) => {
    const {
      commands
    } = require("../lib");
    if (text.split(" ")[0]) {
      let arr = [];
      const cmd = commands.find(_0x522249 => _0x522249.pattern === text.split(" ")[0].toLowerCase());
      if (cmd) {
        arr.push("*🍁Command:* " + cmd.pattern);
        if (cmd.category) {
          arr.push("*🧩Category:* " + cmd.category);
        }
        if (cmd.alias) {
          arr.push("*🧩Alias:* " + cmd.alias);
        }
        if (cmd.desc) {
          arr.push("*🧩Description:* " + cmd.desc);
        }
        if (cmd.use) {
          arr.push("*〽️Usage:*\n ```" + prefix + cmd.pattern + " " + cmd.use + "```");
        }
        return await citel.reply(arr.join("\n"));
      }
    }
    var up_up;
    var up_mid;
    var up_btm;
    var ctgry_L;
    var ctgry_R;
    var cmd_L;
    var ctgry_end;
    let default_menu = 0;
    if (Config.menu === "") {
      default_menu = Math.floor(Math.random() * 3) + 1;
    }
    if (default_menu == 1 || Config.menu.trim().startsWith("1") || Config.menu.toLowerCase().includes("aztec")) {
      up_up = "┏━━⟪ *" + Config.botname + "* ⟫━━⦿";
      up_mid = "┃ ✗";
      up_btm = "┗━━━━━━━━━━━━━━━⦿";
      ctgry_L = "┌──『";
      ctgry_R = "』──❖\n";
      cmd_L = " | ";
      ctgry_end = "\n└──────────────◉";
    } else if (default_menu == 2 || Config.menu.trim().startsWith("2") || Config.menu.toLowerCase().includes("a17")) {
      up_up = "┌───═[ *" + Config.botname + "* ]═──▸\n│╭────────────···▸\n┴│▸";
      up_mid = "⬡│▸";
      up_btm = "┬│▸\n│╰─────────────···▸\n└───────────────···▸";
      ctgry_L = "┌───〈";
      ctgry_R = "〉───◆\n│╭─────────────···▸\n┴│▸";
      cmd_L = "⬡│▸ ";
      ctgry_end = "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
    } else {
      up_up = "╭────《  " + Config.botname + "  》────⊷\n│ ╭──────✧❁✧──────◆";
      up_mid = "│ │";
      up_btm = "│ ╰──────✧❁✧──────◆\n╰══════════════════⊷";
      ctgry_L = "╭────❏";
      ctgry_R = "❏";
      cmd_L = "│";
      ctgry_end = "╰━━━━━━━━━━━━━━──⊷";
    }
    const cmds = {};
    commands.map(async (_0x423f50, _0xb3d1e7) => {
      if (_0x423f50.dontAddCommandList === false && _0x423f50.pattern !== undefined) {
        if (!cmds[_0x423f50.category]) {
          cmds[_0x423f50.category] = [];
        }
        cmds[_0x423f50.category].push(_0x423f50.pattern);
      }
    });
    const time = moment(moment()).format("HH:mm:ss");
    moment.tz.setDefault("Africa/Lagos").locale("id");
    const date = moment.tz("Africa/Lagos").format("DD/MM/YYYY");
    let total = await sck1.countDocuments();
    let str = up_up + "\n" + up_mid + " Theme:- " + tlang().title + "\n" + up_mid + " Owner:- " + Config.ownername + "\n" + up_mid + " Plugins:- " + commands.length + "\n" + up_mid + " Uptime:- " + runtime(process.uptime()) + "\n" + up_mid + " Mem:- " + formatp(os.totalmem() - os.freemem()) + "/" + formatp(os.totalmem()) + "\n" + up_mid + " Time:- " + time + "\n" + up_mid + " Date:- " + date + "\n" + up_btm + "\n\n";
    for (const category in cmds) {
      str += ctgry_L + " *" + tiny(category) + "* " + ctgry_R + "\n";
      if (text.toLowerCase() == category.toLowerCase()) {
        str = ctgry_L + " *" + tiny(category) + "* " + ctgry_R + "\n";
        for (const plugins of cmds[category]) {
          str += cmd_L + " " + fancytext(plugins, 1) + "\n";
        }
        str += ctgry_end + "\n";
        break;
      } else {
        for (const plugins of cmds[category]) {
          str += cmd_L + " " + fancytext(plugins, 1) + "\n";
        }
        str += ctgry_end + "\n";
      }
    }
    str += Config.caption;
    let buttonMessaged = {
      image: {
        url: await botpic()
      },
      caption: str,
      footer: tlang().footer,
      headerType: 4
    };
    return await Void.sendMessage(citel.chat, buttonMessaged, {
      quoted: citel
    });
  });
//------------------------------------------
astro_patch.cmd({
    pattern: "betamenu",
    alias: ["bmenu"],
    desc: "Help list",
    category: "general",
    filename: __filename,
  }, async (Void, citel, text) => {
    const { commands } = require("../lib");
  
    if (text.split(" ")[0]) {
      const cmd = commands.find(
        (_0x522249) => _0x522249.pattern === text.split(" ")[0].toLowerCase()
      );
  
      if (cmd) {
        const arr = [];
  
        arr.push("*🍁Command:* " + cmd.pattern);
        if (cmd.category) {
          arr.push("*🧩Category:* " + cmd.category);
        }
        if (cmd.alias) {
          arr.push("*🧩Alias:* " + cmd.alias.join(", "));
        }
        if (cmd.desc) {
          arr.push("*🧩Description:* " + cmd.desc);
        }
        if (cmd.use) {
          arr.push(
            "*〽️Usage:*\n ```" + prefix + cmd.pattern + " " + cmd.use + "```"
          );
        }
  
        return await citel.reply(arr.join("\n"));
      }
    }
  
    let default_menu = 0;
    if (Config.menu === "") {
      default_menu = Math.floor(Math.random() * 3) + 1;
    }
  
    const categories = commands.reduce((acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = [];
      }
      acc[command.category].push(command.pattern);
      return acc;
    }, {});
  
    let str = "";
  
    for (const [category, patterns] of Object.entries(categories)) {
      str += `${"┌─────❏".padEnd(16)} *${tiny(category)}* ${"❏─────┐\n"}`;
      for (const pattern of patterns) {
        const cmd = commands.find((cmd) => cmd.pattern === pattern);
        str += `│ ${fancytext(pattern, 1)} ${
          cmd.alias ? `\n│  • ${cmd.alias.join(" • ")}` : ""
        }\n`;
      }
    }
  
    const time = moment(moment()).format("HH:mm:ss");
    moment.tz.setDefault("Africa/Lagos").locale("id");
    const date = moment.tz("Africa/Lagos").format("DD/MM/YYYY");
    let total = await sck1.countDocuments();
  
    str =
      `${up_up}\n${up_mid} Theme:- ${tlang().title}\n${up_mid} Owner:- ${Config.ownername}\n${up_mid} Plugins:- ${commands.length}\n${up_mid} Uptime:- ${runtime(process.uptime())}\n${up_mid} Mem:- ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}\n${up_mid} Time:- ${time}\n${up_mid} Date:- ${date}\n${up_btm}\n\n${str}` +
      Config.caption;
  
    const buttonMessaged = {
      image: {
        url: await botpic(),
      },
      caption: str,
      footer: tlang().footer,
      headerType: 4,
    };
  
    return await Void.sendMessage(citel.chat, buttonMessaged, {
      quoted: citel,
    });
  });
      //---------------------------------------------------------------------------
  astro_patch.cmd({
              pattern: "list",
              desc: "list menu",
              category: "general",
              react: "🥀"
           },
          async(Void, citel) => {
              const { commands } = require('../lib');
              let str = `
  ╭━━〘 *${Config.botname}* 〙────⊷     
  ┃ ✭ Theme: ${tlang().title}
  ┃ ✭ Prefix: ${prefix}
  ┃ ✭ Owner: ${Config.ownername}
  ┃ ✭ Commands: ${commands.length}
  ┃ ✭ Uptime: ${runtime(process.uptime())}
  ┃ ✭ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
  ╰━━━━━━━━━━━━━━⊷\n`
  
              for (let i = 0; i < commands.length; i++) 
              {
                   if(commands[i].pattern==undefined) continue
                   str +=       `╭ ${i+1} *${fancytext(commands[i].pattern,1)}*\n`                // ${i+1} 
                   str += `╰➛ ${fancytext(commands[i].desc,1)}\n`
              }
              return await Void.sendMessage(citel.chat, { image: { url: THUMB_IMAGE }, caption: str + Config.caption ,footer: tlang().footer, headerType: 4 })
          }
      )
      //---------------------------------------------------------------------------
  astro_patch.cmd({
          pattern: "owner",
          desc: "To check ping",
          category: "general",
          react: "💜",
          filename: __filename
      },
      async(Void, citel) => {
          const Config = require('../config')
          const thmb = await getBuffer(global.THUMB_IMAGE)
          const vcard = 'BEGIN:VCARD\n' +
              'VERSION:3.0\n' +
              'FN:' + Config.ownername + '\n' +
              'ORG:;\n' +
              'TEL;type=CELL;type=VOICE;waid=' + global.owner + ':+' + global.owner + '\n' +
              'END:VCARD'
          let buttonMessaged = {
              contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
              contextInfo: {
                  externalAdReply: {
                      title: Config.ownername,
                      body: 'Touch here.',
                      renderLargerThumbnail: true,
                      thumbnailUrl: ``,
                      thumbnail: thmb,
                      mediaType: 1,
                      mediaUrl: '',
                      sourceUrl: `https://wa.me/+` + owner + '?text=Hii+bro,I+am+' + citel.pushName,
                  },
              },
          };
          return await Void.sendMessage(citel.chat, buttonMessaged, {   quoted: citel, });
  
      }
  )
  //------------------------------------------------------------------------------------
  const readDirectory = (text) => {
    return new Promise((resolve, reject) => {
      fs.readdir(text, (err, files) => {
        if (err) {reject('Error reading directory'); }
        else {
          resolve(files);
        }
      });
    });
  };
  //------------------------------------------------------------------------------------
  astro_patch.cmd({
      pattern: "file",
      desc: "to get extact name where that command is in repo.\nSo user can edit that.",
      category: "general",
      filename: __filename
  },
  async(Void, citel, text ,{isCreator }) => {
   if(!isCreator) return citel.reply("*Ahh Sorry, Only Owner Can Use This Cmd*")
   if(!text) return citel.reply("*Uhh PLease, Provide A Command/Directory*")
   if(text.startsWith("."))
   {
      let res="*----- FILE MANAGER -----*\n"
      try {
            const files = await readDirectory(text);
            files.forEach(file => { res += file + '\n'; });
            await citel.reply(res.toString());
      } catch (error) {  citel.reply(error); }
        return;
   }
   const { commands } = require('../lib');
   let arr = [];
          const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
          if (!cmd) return await citel.reply("*❌No Such commands.*");
          else arr.push(`*🍁Command:* ${cmd.pattern}`);
          if (cmd.category) arr.push(`*🧩Type:* ${cmd.category}`);
          if(cmd.filename) arr.push(`✨FileName: ${cmd.filename}`)
          return await citel.reply(arr.join('\n'));})