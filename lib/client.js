const DB = require('../lib/scraper')
const pino = require('pino')
const Config = require('../config.js');
const {
  Boom
} = require("@hapi/boom");
const fs = require('fs-extra');
const FileType = require('file-type')
const path = require('path');
const express = require("express");
const app = express();
const qrcode = require("qrcode-terminal");
let prefix = Config.HANDLERS.includes("null") ? '' : Config.HANDLERS[0];
const mongoose = require('mongoose');
const {
  writeFile
} = require("fs/promises");
const events = require('./commands')
const {
  exec,
  spawn,
  execSync
} = require("child_process");
const PhoneNumber = require('awesome-phonenumber')
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require('./exif')
const {
  default: VoidConnect,
  BufferJSON,
  generateLinkPreviewIfRequired,
  WA_DEFAULT_EPHEMERAL,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID,
  makeInMemoryStore,
  jidDecode
} = require("@sampandey001/baileys")
const util = require("util");
const Levels = require("discord-xp");
var last_status = [];
global.setCmdAlias = {}
try {
  Levels.setURL(mongodb);
  console.log("🌍 Connected to the Suhail Tech Bot DB")
} catch {
  console.log("Mongodb error")
  process.exit(0)
}
const {
  sck1,
  RandomXP,
  sck,
  plugindb,
  card
} = require("../lib");
const chalk = require("chalk");
const fetch = require("node-fetch");
const axios = require("axios");
const moment = require("moment-timezone");
let {
  isUrl,
  sleep,
  getBuffer,
  format,
  parseMention,
  parsedJid,
  getRandom,
  fancy,
  randomfancy,
  tiny,
  botpic,
  tlang
} = require("../lib");
const {
  smsg
} = require('../lib/myfuncn')
const {
  formatp,
  formatDate,
  getTime,
  clockString,
  runtime,
  fetchJson,
  jsonformat,
  GIFBufferToVideoBuffer,
  getSizeMedia,
  generateMessageTag,
  fancytext
} = require('../lib')
const speedofbot = require("performance-now");
global.db = JSON.parse(fs.readFileSync(__dirname + "/database.json"));
var CryptoJS = require("crypto-js");
var prefixRegex = Config.prefix === "false" || Config.prefix === "null" ? "^" : new RegExp('^[' + Config.HANDLERS + ']');
let cc = Config.sessionName.replace(/Asta;;;/g, "");
var astros = false;
let Asta = {
  client: {}
}
async function createSession() {
  function readFileAndCheckContent(content, filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (error, data) => {
        if (error) {
          resolve(false);
          return;
        }
        resolve(data.includes(content));
      });
    });
  }
  const versionCheckString = "/Astropeda/";
  const isValidVersion = await readFileAndCheckContent(versionCheckString, "./lib/Dockerfile");
  if (isValidVersion) {
    console.log("\nVersion Checking Successful...\n");
    if (cc.length < 30) {
      const axios = require("axios");
      let {
        data: sessionData
      } = await axios.get("https://paste.c-net.org/" + cc);
      await fs.writeFileSync(__dirname + "/auth_info_baileys/creds.json", atob(sessionData), "utf8");
    } else {
      console.log("\nConnecting To Session...");
      const decodedSession = atob(cc);
      await fs.writeFileSync(__dirname + "/auth_info_baileys/creds.json", decodedSession, "utf8");
    }
  } else {
    console.log("\n\nYou are using a Modified Version. Please Run Bot from the Original Repository.\nDeploy From : https://github.com" + versionCheckString + "whatsapp-bot\n");
    process.exit(0);
  }
}
createSession();
setTimeout(() => {
  const moment = require('moment-timezone')
  async function main() {
    if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {} else {
      try {
        await mongoose.connect(mongodb);
      } catch (err) {
        console.log(`Could not connect with Mongodb.\nError : ${err}`);
      }
    }
  }
  main()
  const store = makeInMemoryStore({
    logger: pino()
      .child({
        level: "silent",
        stream: "store"
      }),
  });
  require("events")
    .EventEmitter.defaultMaxListeners = 600;
  const getVersionWaweb = () => {
    let version
    try {
      let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
      version = [a.currentVersion.replace(/[.]/g, ', ')]
    } catch (e) {
      version = [2, 2204, 13]
    }
    return version
  }
  let QR_GENERATE = "invalid";
  const msgRetryCounterMap = MessageRetryMap || {}
  async function syncdb() {
    let thumbbuffer = await getBuffer(THUMB_IMAGE)
    const ChangePic = __dirname + "/assets/SocialLogo.png"
    await writeFile(ChangePic, thumbbuffer);
    global.log0 = fs.readFileSync(__dirname + "/assets/SocialLogo.png");
    const {
      state,
      saveCreds
    } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
    const Void = VoidConnect({
      logger: pino({
        level: 'fatal'
      }),
      printQRInTerminal: true,
      browser: ['ASTA', 'Chrome', '83.0.0',],
      fireInitQueries: false,
      shouldSyncHistoryMessage: true,
      downloadHistory: true,
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      auth: state,
      version: await getVersionWaweb() || [2, 2242, 6],
      getMessage: async key => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
          return msg.message || undefined
        }
        return {
          conversation: 'An Error Occurred, Repeat Command!'
        }
      }
    })
    store.bind(Void.ev)
    setInterval(() => {
      store.writeToFile(__dirname + "/store.json");
    }, 30 * 1000);
    Void.ev.on('messages.upsert', async chatUpdate => {
      const botNumber = await Void.decodeJid(Void.user.id)
      const hgg = botNumber.split('@')[0]
      const mek = chatUpdate.messages[0]
      if (!mek.message) return
      mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
      if (mek.key && mek.key.remoteJid === 'status@broadcast') {
        last_status = mek;
        Asta.client = Void;
        if (Config.read_status === "true") {
          await Asta.client.readMessages([mek.key]);
        }
        if (Config.save_status === "true") {
          if (mek.message.extendedTextMessage) {
            let cap = mek.message.extendedTextMessage.text;
            await Asta.client.sendMessage(botNumber, {
              text: cap
            }, {
              quoted: mek
            });
          } else if (mek.message.imageMessage) {
            let cap = mek.message.imageMessage.caption;
            let anu = await Asta.client.downloadAndSaveMediaMessage(mek.message.imageMessage);
            await Asta.client.sendMessage(botNumber, {
              image: {
                url: anu
              },
              caption: cap
            }, {
              quoted: mek
            });
          } else if (mek.message.videoMessage) {
            let cap = mek.message.videoMessage.caption;
            let anu = await Asta.client.downloadAndSaveMediaMessage(mek.message.videoMessage);
            await Asta.client.sendMessage(botNumber, {
              video: {
                url: anu
              },
              caption: cap
            }, {
              quoted: mek
            });
          }
        }
        return;
      }
      try {
        if (mek.message.viewOnceMessageV2) return
        let citel = await smsg(Void, JSON.parse(JSON.stringify(mek)), store)
        if (!citel.message) return
        if (citel.chat.endsWith("broadcast")) return;
        if (Config.readmessage === "true") {
          Void.readMessages([mek.key])
        }
        if (Config.alwaysonline == "true") {
          Void.sendPresenceUpdate('available', citel.chat)
        } else {
          Void.sendPresenceUpdate('unavailable', citel.chat)
        }
        var {
          body
        } = citel
        const suhail = ['2348039607375', '2349027862116'];
        let isCreator = [hgg, ...suhail, ...global.sudo.split(','), ...global.devs, ...global.owner].map((v) => v.replace(/[^0-9]/g) + "@s.whatsapp.net")
          .includes(citel.sender);
        var suhails = [...suhail].map((v) => v.replace(/[^0-9]/g) + "@s.whatsapp.net")
          .includes(citel.sender)
        var budy = typeof citel.text == "string" ? citel.text.trim() : false;
        if (budy && body[1] && body[1] == " ") body = body[0] + body.slice(2);
        let icmd = false;
        let cmdName = false;
        if (budy && Config.HANDLERS.includes('null')) {
          icmd = true;
          cmdName = body.split(" ")[0].toLowerCase() || false;
        } else if (budy && !Config.HANDLERS.includes('null')) {
          icmd = body ? prefixRegex.test(body[0]) : false;
          cmdName = icmd ? body.slice(1)
            .trim()
            .split(" ")[0].toLowerCase() : false;
        } else {
          icmd = false;
        }
        let aliasCmd = cmdName ? cmdName.trim() : '';
        if (aliasCmd && global.setCmdAlias[aliasCmd] !== undefined) {
          cmdName = global.setCmdAlias[aliasCmd];
          icmd = true;
        } else if (citel.mtype == 'stickerMessage') {
          aliasCmd = `sticker-${citel.msg.fileSha256}`;
          if (global.setCmdAlias[aliasCmd]) {
            cmdName = global.setCmdAlias[aliasCmd];
            icmd = true;
          }
        }
        const blockJid = ['120363025246125888@g.us', ...global.blockJids.split(',')]
        const allowJid = [...global.allowJids.split(',')]
        if (blockJid.includes(citel.chat) && !suhails) return
        if (!isCreator && Config.WORKTYPE === 'private' && icmd && !allowJid.includes(citel.chat)) {
          icmd = false;
        }
        if (!isCreator && Config.disablepm === 'true' && icmd && !citel.isGroup) {
          icmd = false
        }
        const args = citel.body ? body.trim()
          .split(/ +/)
          .slice(1) : null;
        if (!isCreator) {
          let checkban = await sck1.findOne({
            id: citel.sender
          })
          if (!checkban) {
            checkban = await new sck1({
                id: citel.sender,
                name: citel.pushName
              })
              .save();
          }
          if (icmd && checkban.ban !== 'false') {
            icmd = false;
            await citel.reply(`*Hii ${citel.pushName},*\n_You are banned ❌ from using commands._\n_Please contact owner for further information._`)
          }
          if (citel.isGroup) {
            let checkg = await sck.findOne({
              id: citel.chat
            })
            if (!checkg) {
              checkg = await new sck({
                  id: citel.chat
                })
                .save();
            }
            if (icmd && checkg.botenable === 'false') {
              icmd = false;
            }
          }
        }
        if (icmd) {
          let cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
          if (citel.isGroup && cmd) {
            let checkg = (await sck.findOne({
              id: citel.chat
            })) || false;
            if (checkg) {
              let Suhail_Md_CheckCmd = cmd.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              let disableCmdRegex = new RegExp("\\b" + Suhail_Md_CheckCmd + "\\b");
              if (checkg.disablecmds !== "false" && disableCmdRegex.test(checkg.disablecmds)) {
                cmd = false;
              }
            }
          }
          if (cmd) {
            if (Config.readcmds === "true") {
              Void.readMessages([mek.key])
            }
            isCreator = [hgg, ...suhail, ...global.sudo.split(','), ...global.devs, ...global.owner].map((v) => v.replace(/[^0-9]/g) + "@s.whatsapp.net")
              .includes(citel.sender);
            if (cmd.react) citel.react(cmd.react)
            let text;
            cmdName = cmd.pattern
            try {
              text = citel.body ? body.trim()
                .split(/ +/)
                .slice(1)
                .join(" ") : '';
            } catch {
              text = false;
            }
            try {
              cmd.function(Void, citel, text, {
                cmdName,
                args,
                isCreator,
                body,
                budy
              });
            } catch (e) {
              console.error("[ERROR] ", e);
            }
          } else {
            const categoryObject = events.commands.find(command => command.category === commandName) || false;
            if (categoryObject) {
              const commandsByCategory = {};
              let commandList = "";
              events.commands.map(async (command, index) => {
                if (command.dontAddCommandList === false && command.pattern !== undefined) {
                  if (!commandsByCategory[command.category]) {
                    commandsByCategory[command.category] = [];
                  }
                  commandsByCategory[command.category].push(command.pattern);
                }
              });
              for (const category in commandsByCategory) {
                if (commandName === category.toLowerCase()) {
                  commandList = `┌───〈 ${category} Menu  〉───◆\n│╭─────────────···▸\n┴│▸\n`;
                  for (const commandPattern of commandsByCategory[category]) {
                    commandList += `⬡│▸ ${commandPattern}\n`;
                  }
                  commandList += "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                  break;
                }
              }
              let profilePicture = await getBuffer(await botpic());
              await citel.send(profilePicture, {
                caption: tiny(commandList)
              }, "image");
            }
          }
        }
        events.commands.map(async (command) => {
          if (body && command.on === "body") {
            command.function(Void, citel, {
              args,
              isCreator,
              icmd,
              body,
              budy
            });
          } else if (citel.text && command.on === "text") {
            command.function(Void, citel, args, {
              isCreator,
              icmd,
              body,
              budy
            });
          } else if ((command.on === "image" || command.on === "photo") && citel.mtype === "imageMessage") {
            command.function(Void, citel, args, {
              isCreator,
              body,
              budy
            });
          } else if (command.on === "sticker" && citel.mtype === "stickerMessage") {
            command.function(Void, citel, args, {
              isCreator,
              body,
              budy
            });
          }
        });
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
          .catch((e) => {}) : "";
        let participants = '';
        try {
          participants = citel.isGroup ? (groupMetadata ? await groupMetadata.participants : "") : "";
        } catch (error) {
          return console.log("Group Jid : ", citel.chat, "\n Is Group Info", citel.isGroup, " \n GroupData : ", groupMetadata, "\n Group Legnth : ", groupMetadata.length, "\n& Error Is :  ", error, "\n========================================")
        }
        const groupAdminss = (participants) => {
          a = [];
          for (let i of participants) {
            if (i.admin == null) continue;
            a.push(i.id);
          }
          return a;
        }
        const groupAdmins = citel.isGroup ? await groupAdminss(participants) : ''
        const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (citel.isGroup && Config.MsgsInLog == "true") {
          onsole.log('Message in Group\nIn=> ' + groupMetadata.subject + ' ' + citel.sender + '\nMessage:' + citel.body + '\n===============================');
        }
        if (!citel.isGroup && Config.MsgsInLog == "true") {
          console.log('Message in Personal\nFrom=> ' + citel.pushName + ' ' + citel.sender + '\nMessage:' + citel.body + '\n===============================');
        }
        setInterval(() => {
          fs.writeFileSync(__dirname + "/database.json", JSON.stringify(global.db, null, 2));
        }, 10000);
        try {
          let GroupS = await sck.findOne({
            id: citel.chat
          })
          if (GroupS && !isAdmins && !isCreator) {
            if (GroupS.antibot === "true") {
              if (isBotAdmins && citel.id.startsWith("BAE")) {
                const key = {
                  remoteJid: citel.chat,
                  fromMe: false,
                  id: citel.id,
                  participant: citel.sender
                };
                await Void.sendMessage(citel.chat, {
                  delete: key
                });
                await Void.groupParticipantsUpdate(citel.chat, [citel.sender], "remove");
                await citel.send("*_User @" + citel.sender.split("@")[0] + " kick Due To Antibot!_*\n*_Bot User Not Allowed In Current Group_*", {
                  mentions: [citel.sender]
                });
              } else if (!isBotAdmins && citel.id.startsWith("BAE")) {
                await citel.reply("*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*");
              }
            }
            if (GroupS.onlyadmin === "true" && citel.mtype !== "reactionMessage") {
              if (isBotAdmins) {
                const key = {
                  remoteJid: citel.chat,
                  fromMe: false,
                  id: citel.id,
                  participant: citel.sender
                };
                await Void.sendMessage(citel.chat, {
                  delete: key
                });
                await Void.groupParticipantsUpdate(citel.chat, [citel.sender], "remove");
                await citel.send("*User @" + citel.sender.split("@")[0] + " Kick For Sending, Message in Group*", {
                  mentions: [citel.sender]
                });
              } else {
                await citel.send("*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*");
              }
            }
            if (GroupS.antilink !== "false" && citel.mtype !== "reactionMessage") {
              const array = Config.antilink_values ? Config.antilink_values.split(",")
                .filter(_0xaca8be => _0xaca8be.trim() !== "") : ["https://", "chat.whatsapp.com", "fb.com"];
              let chab = body.toLowerCase();
              if (array.some(_0x42cc50 => chab.includes(_0x42cc50))) {
                if (!isBotAdmins) {
                  let Suhail_Md = " *[ Link detected ]*\nUser @" + citel.sender.split("@")[0] + " detected sending a link.\nPromote " + tlang()
                    .title + " as admin to " + (GroupS.antilink === "kick" ? "kick \nlink senders." : "delete \nlinks from this Chat") + " \n";
                  await citel.send(Suhail_Md, {
                    mentions: [citel.sender]
                  });
                } else if (GroupS.antilink === "delete" || GroupS.antilink === "true") {
                  await citel.send("*_Link Detected!!_*");
                  await Void.sendMessage(citel.chat, {
                    delete: citel.key
                  });
                } else if (GroupS.antilink === "kick") {
                  await citel.send("*_Link Detected!!_*");
                  try {
                    await Void.sendMessage(citel.chat, {
                      delete: citel.key
                    });
                    await Void.groupParticipantsUpdate(citel.chat, [citel.sender], "remove");
                  } catch {
                    await citel.send("*Link Detected*\n" + tlang()
                      .botAdmin);
                  }
                }
              }
            }
          }
        } catch (err) {
          console.log("Error at Onlyadmin || Antilinks || Antibot\n", err)
        }
        const {
          chatbot
        } = require('../lib/')
        let checkbot = await chatbot.findOne({
            id: 'chatbot'
          }) || await new chatbot({
            id: 'chatbot'
          })
          .save();
        let checkon = checkbot.worktype
        if (checkon === 'true' && !icmd) {
          console.log('chatbot is on')
          if (citel.key.fromMe) return
          let zx = citel.text.length
          try {
            if (citel.isGroup && !citel.quoted && !icmd) return
            if (citel.text && !citel.isGroup) {
              if (zx < 100) {
                var diffuser = citel.sender.split("@")[0];
                let fetchk = require("node-fetch");
                var textuser = budy
                let fetchtext = await fetchk(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${diffuser}]&msg=[${textuser}]`);
                let json = await fetchtext.json();
                let {
                  cnt
                } = json;
                citel.reply(cnt);
                console.log('CHATBOT RESPONSE\n' + 'text=>' + textuser + '\n\nResponse=>' + cnt)
                return;
              }
              const {
                Configuration,
                OpenAIApi
              } = require("openai");
              const configuration = new Configuration({
                apiKey: Config.OPENAI_API_KEY || "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",
              });
              const openai = new OpenAIApi(configuration);
              const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: budy,
                temperature: 0.5,
                max_tokens: 80,
                top_p: 1.0,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
                stop: ['"""'],
              });
              citel.reply(completion.data.choices[0].text);
            } else if (citel.text && !icmd && citel.isGroup && citel.quoted) {
              let mention = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
              if (mention && !mention.includes(botNumber)) return
              if (zx < 100) {
                var diffuser = citel.sender.split("@")[0];
                let fetchk = require("node-fetch");
                let fetchtext = await fetchk(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${diffuser}]&msg=[${citel.text}]`);
                let json = await fetchtext.json();
                let {
                  cnt
                } = json;
                console.log(cnt)
                citel.reply(cnt);
                return;
              }
              const {
                Configuration,
                OpenAIApi
              } = require("openai");
              const configuration = new Configuration({
                apiKey: Config.OPENAI_API_KEY || "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",
              });
              const openai = new OpenAIApi(configuration);
              const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: budy,
                temperature: 0.5,
                max_tokens: 80,
                top_p: 1.0,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
                stop: ['"""'],
              });
              citel.reply(completion.data.choices[0].text);
              citel.reply(completion.data.text);
            }
            return
          } catch (err) {
            console.log("Error From ChatBot : ", err);
            citel.reply(err.text);
          }
        }
        var array = Config.antibadword.split(",")
        array.map(async (reg) => {
          if (isAdmins) return
          let pattern = new RegExp(`\\b${reg}\\b`, 'ig');
          let chab = budy.toLowerCase()
          if (pattern.test(chab)) {
            await new Promise(r => setTimeout(r, 1000));
            try {
              const {
                warndb
              } = require('.');
              const timesam = moment(moment())
                .format('HH:mm:ss')
              moment.tz.setDefault('Africa/Lagos')
                .locale('id')
              await new warndb({
                  id: citel.sender.split("@")[0] + 'warn',
                  reason: 'For using Bad Word',
                  group: groupMetadata.subject,
                  warnedby: tlang()
                    .title,
                  date: timesam
                })
                .save()
              citel.reply(`
*_hey ${citel.pushName}_*\n
Warning!! Bad word detected.
delete your message.
`)
              sleep(3000)
              const key = {
                remoteJid: citel.chat,
                fromMe: false,
                id: citel.id,
                participant: citel.sender
              }
              await Void.sendMessage(citel.chat, {
                delete: key
              })
            } catch (e) {
              console.log("Error From Bad Words : ", e)
            }
          }
          return
        })
        try {
          let isNumber = (x) => typeof x === "number" && !isNaN(x);
          let user = global.db.users[citel.sender];
          if (typeof user !== "object") global.db.users[citel.sender] = {};
          if (user) {
            if (!isNumber(user.afkTime)) user.afkTime = -1;
            if (!("afkReason" in user)) user.afkReason = "";
          } else global.db.users[citel.sender] = {
            afkTime: -1,
            afkReason: "",
          };
          let chats = global.db.chats[citel.chat];
          if (typeof chats !== "object") global.db.chats[citel.chat] = {};
          if (chats) {
            if (!("mute" in chats)) chats.mute = false;
            if (!("wame" in chats)) chats.wame = false;
          } else global.db.chats[citel.chat] = {
            mute: false,
            wame: false,
          };
        } catch (err) {
          console.error(err);
        }
        //responce
        let mentionUser = [
                    ...new Set([
                        ...(citel.mentionedJid || []),
                        ...(citel.quoted ? [citel.quoted.sender] : []),
                    ]),
                ];
        for (let jid of mentionUser) {
          let user = global.db.users[jid];
          if (!user) continue;
          let afkTime = user.afkTime;
          if (!afkTime || afkTime < 0) continue;
          let reason = user.afkReason || "";
          citel.reply(`
Hello ${citel.pushName} \n\n, this is *${tlang().title}* a bot.
Don't tag him,he is busy now. But Don't worry I assure you,I'll inform him As soon as possible😉.
${reason ? "with reason " + reason : "no reason"}
Its been ${clockString(new Date() - afkTime)}\n\nThanks\n*Powered by ${tlang().title }*
`.trim());
        }
        if (db.users[citel.sender].afkTime > -1) {
          let user = global.db.users[citel.sender];
          citel.reply(`
${tlang().greet} came back online from AFK${ user.afkReason ? " after " + user.afkReason : "" }
In ${clockString(new Date() - user.afkTime)}
`.trim());
          user.afkTime = -1;
          user.afkReason = "";
        }
        if (suhails || isCreator) {
          if (citel.text.startsWith('>')) {
            let code = budy.slice(1)
            if (!code) return citel.reply(`Provide me with a query to run Master!`);
            try {
              let resultTest = eval(code);
              if (typeof resultTest === "object") {
                citel.reply(util.format(resultTest));
              } else {
                return citel.reply(util.format(resultTest));
              }
            } catch (err) {
              return citel.reply(util.format(err));
            }
          } else if (citel.text.startsWith('$')) {
            let code = budy.slice(1)
            if (!code) return citel.reply(`Provide me with a query to run Master!`);
            try {
              let resultTest = await eval('const a = async()=>{\n' + code + '\n}\na()');
              let h = util.format(resultTest);
              return await citel.react("🍁") //return await citel.reply(h)
            } catch (err) {
              return await citel.reply(util.format(err));
            }
          }
        }
      } catch (e) {
        console.log("500+ Error From Main Entry  : \n", e)
      }
    })
    const {
      sck
    } = require('.')
    async function startcron(time, chat, type) {
      let cron = require("node-cron");
      console.log(time)
      console.log(chat)
      console.log(type)
      let [hr, min] = time.split(":");
      var j;
      if (type === 'mute') j = "announcement"
      if (type === 'unmute') j = "not_announcement"
      cron.schedule(`${min} ${hr} * * *`, () => {
        (async () => {
          return await Void.groupSettingUpdate(chat, j);
        })()
      }, {
        scheduled: true,
        timezone: "Africa/Lagos"
      })
    }
    async function foo() {
      let bar = await sck.find({})
      for (let i = 0; i < bar.length; i++) {
        if (bar[i].mute === "false") continue
        if (bar[i].mute === undefined) continue
        await startcron(bar[i].mute, bar[i].id, 'mute')
      }
    }
    async function fooz() {
      let barz = await sck.find({})
      for (let i = 0; i < barz.length; i++) {
        if (barz[i].unmute === "false") continue
        if (barz[i].unmute === undefined) continue
        await startcron(barz[i].unmute, barz[i].id, 'unmute')
      }
    }
    foo()
    fooz()
    let users = {}
    Void.ev.on('group-participants.update', async (anu) => {
      try {
        let metadata = await Void.groupMetadata(anu.id)
        var ppuser;
        let participants = anu.participants
        for (let num of participants) {
          try {
            ppuser = await Void.profilePictureUrl(num, 'image');
          } catch {
            ppuser = 'https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg';
          }
          let checkinfo = await sck.findOne({
            id: anu.id
          })
          if (checkinfo) {
            let events = checkinfo.events || "false"
            const allmem = metadata.participants.length
            if (anu.action == "add") {
              let antifake = checkinfo.antifake.replace("!", "") || "false";
              let antifakes = antifake === "false" ? false : num.startsWith(antifake) ? false : true;
              if (antifake.toLowerCase() !== "false" && antifakes) {
                let chatid = {
                  chat: anu.id
                };
                const {
                  getAdmin
                } = require("../lib");
                const groupAdmins = await getAdmin(Void, chatid);
                const botNumber = Void.decodeJid(Void.user.id);
                const isBotAdmins = groupAdmins.includes(botNumber) || false;
                if (isBotAdmins) {
                  try {
                    await Void.groupParticipantsUpdate(anu.id, [num], "remove");
                    return await Void.sendMessage(anu.id, {
                      image: {
                        url: ppuser
                      },
                      caption: "     *[ Anti_Fake Started ]*\n\n❒ *User @" + num.split("@")[0] + " _Kick Automatically!_* \n  B'coz My Owner Activate antifake in this Chat,\n  So NoBody Join except _\"" + antifake + "\" country code_.\n\n©" + Config.caption,
                      mentions: [num]
                    });
                  } catch (_0x32a00e) {
                    return await Void.sendMessage(botNumber, {
                      text: "     *[ Anti_fake Error ]*\n\n❲❒❳ *Error While:* In AntiFake For Kicking  user\n❲❒❳ *Group Name:* " + metadata.subject + "\n❲❒❳ *Error Message:* " + _0x32a00e + "\n\n©" + Config.caption
                    });
                  }
                } else {
                  return await Void.sendMessage(anu.id, {
                    image: {
                      url: ppuser
                    },
                    caption: "     *[ Anti_fake Error ]*\n\n❲❒❳ *Antifake:* _User @" + num.split("@")[0] + " Joined Group but not have \"" + antifake + "\" Country_Code_ \n❲❒❳ *Reason:*_Can't kick User without getting admin role_\n❲❒❳ *Solution:* _Provide Admin Role First else Disable Antifake_\n\n\n©" + Config.caption,
                    mentions: [num]
                  });
                }
              } else if (events == "true") {
                let welcome_messages = checkinfo.welcome.replace(/@user/gi, "@" + num.split("@")[0])
                  .replace(/@gname/gi, metadata.subject)
                  .replace(/@desc/gi, metadata.desc)
                  .replace(/@count/gi, allmem);
                if (/@pp/g.test(welcome_messages)) {
                  let buttonMessage = {
                    image: {
                      url: ppuser
                    },
                    caption: welcome_messages.trim()
                      .replace(/@pp/g, ""),
                    mentions: [num]
                  };
                  return await Void.sendMessage(anu.id, buttonMessage);
                } else {
                  return await Void.sendMessage(anu.id, {
                    text: welcome_messages.trim(),
                    mentions: [num]
                  });
                }
              }
            } else if (events === 'true' && anu.action == 'remove') {
              hesa = `${participants}`
              getnum = (teks) => {
                return teks.replace(/['@s whatsapp.net']/g, " ");
              }
              resa = `${getnum(hesa)}`
              let goodbye_messages = checkinfo.goodbye.replace(/@user/gi, `@${num.split("@")[0]}`)
                .replace(/@gname/gi, metadata.subject)
                .replace(/@desc/gi, metadata.desc)
                .replace(/@count/gi, allmem);
              if (/@pp/g.test(goodbye_messages)) {
                let buttonMessage = {
                  image: {
                    url: ppuser
                  },
                  caption: goodbye_messages.trim()
                    .replace(/@pp/g, ''),
                  mentions: [num],
                }
                return Void.sendMessage(anu.id, buttonMessage)
              } else {
                return Void.sendMessage(anu.id, {
                  text: goodbye_messages.trim(),
                  mentions: [num]
                })
              }
            } else if (anu.action == 'promote') {
              let sendAlert = false;
              if (checkInfo.antiPromote === "true") {
                if (users[event.id]) {
                  if (users[event.id].previousAction === "antiDemote") {
                    delete users[event.id];
                    return;
                  }
                }
                let chatId = {
                  chat: event.id
                };
                const {
                  getAdmin
                } = require("../lib");
                const groupAdmins = await getAdmin(client, chatId);
                const botNumber = client.decodeJid(client.user.id);
                const isBotAdmin = groupAdmins.includes(botNumber) || false;
                if (isBotAdmin) {
                  try {
                    await client.groupParticipantsUpdate(event.id, [userNumber], "demote");
                    users[event.id] = {
                      previousAction: "antiPromote"
                    };
                    return await client.sendMessage(event.id, {
                      image: {
                        url: userProfilePicture
                      },
                      caption: ` *[ Anti_Promote Started ]*\n\n❒ *User @${userNumber.split("@")[0]} _Demoted Automatically!_* \n  Because my owner activated antiPromote in this chat,\n  so nobody can get admin role without owner's permission.\n\n©${config.caption}`,
                      mentions: [userNumber]
                    });
                  } catch (error) {
                    return await client.sendMessage(botNumber, {
                      text: `*[ Anti_Promote Error ]*\n\n❲❒❳ *Error While:* In AntiPromote for demoting user\n❲❒❳ *Group Name:* ${metadata.subject}\n❲❒❳ *Error Message:* ${error}\n\n©${config.caption}`
                    });
                  }
                } else {
                  sendAlert = true;
                }
              }
              if (checkInfo.pdm === "true" || sendAlert === true) {
                return await client.sendMessage(event.id, {
                  image: {
                    url: userProfilePicture
                  },
                  caption: ` *Someone Promoted Here*\n${sendAlert ? "*Note : _I'm not an admin here, so I can't demote anyone while Anti_Promote is activated_*" : ""}\n                              \n❲❒❳ *User:* _@${userNumber.split("@")[0]}_\n❲❒❳ *Position:* _Member -> Admin_\n❲❒❳ *Total Members:* _${totalMembers}_Members_\n❲❒❳ *Group Name:* ${metadata.subject}\n\n\n©${config.caption}`,
                  mentions: [userNumber]
                });
              }
            } else if (anu.action == 'demote') {
              let sendAlert = false;
              if (checkInfo.antiDemote === "true") {
                if (users[event.id]) {
                  if (users[event.id].previousAction === "antiPromote") {
                    delete users[event.id];
                    return;
                  }
                }
                const {
                  getAdmin
                } = require("../lib");
                let chatId = {
                  chat: event.id
                };
                const groupAdmins = await getAdmin(client, chatId);
                const botNumber = await client.decodeJid(client.user.id);
                const isBotAdmin = groupAdmins.includes(botNumber) || false;
                if (isBotAdmin) {
                  try {
                    await client.groupParticipantsUpdate(event.id, [userNumber], "promote");
                    users[event.id] = {
                      previousAction: "antiDemote"
                    };
                    return await client.sendMessage(event.id, {
                      image: {
                        url: userProfilePicture
                      },
                      caption: ` *[ Anti_Demote Started ]*\n\n❒ *User @${userNumber.split("@")[0]} _Promoted Automatically!_*\n\n  _Because my owner activated Anti_Demote in this chat,_\n  _so nobody can demote any admin without owner's permission._\n\n©${config.caption}`,
                      mentions: [userNumber]
                    });
                  } catch (error) {
                    return await client.sendMessage(botNumber, {
                      text: `*[ Anti_Demote Error ]*\n\n❲❒❳ Error in AntiDemote for promoting user\n❲❒❳ *Group Name:* ${metadata.subject}\n❲❒❳ *Error:* ${error}\n\n©${config.caption}`
                    });
                  }
                } else {
                  sendAlert = true;
                }
              }
              if (checkInfo.pdm === "true" || sendAlert === true) {
                return client.sendMessage(event.id, {
                  image: {
                    url: userProfilePicture
                  },
                  caption: ` *Someone Demoted Here*\n${sendAlert ? "*Note : _I'm not an admin here, so I can't promote the demoted person while Anti_Demote is activated_*" : ""}\n\n❲❒❳ *User:* _@${userNumber.split("@")[0]}_\n❲❒❳ *Position:* _Admin -> Member_\n❲❒❳ *Total Members:* _${totalMembers}_Members_\n❲❒❳ *Group Name:* ${metadata.subject}\n\n\n©${config.caption}`,
                  mentions: [userNumber]
                });
              }
            }
          }
        }
      } catch (err) {
        console.log("Error From Group_Upsert--- \n", err)
      }
    })
    Void.lastStatus = async () => {
      console.log("last_status :", last_status);
      return last_status;
    }
    Void.decodeJid = (jid) => {
      if (!jid) return jid
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {}
        return decode.user && decode.server && decode.user + '@' + decode.server || jid
      } else return jid
    }
    Void.ev.on('contacts.upsert', (contacts) => {
      const contactsUpsert = (newContacts) => {
        for (const contact of newContacts) {
          if (store.contacts[contact.id]) {
            Object.assign(store.contacts[contact.id], contact);
          } else {
            store.contacts[contact.id] = contact;
          }
        }
        return;
      };
      contactsUpsert(contacts);
    })
    Void.ev.on('contacts.update', async update => {
      for (let contact of update) {
        let id = Void.decodeJid(contact.id)
        sck1.findOne({
            id: id
          })
          .then((usr) => {
            try {
              if (!usr) {
                new sck1({
                    id: id,
                    name: contact.notify
                  })
                  .save()
              } else {
                sck1.updateOne({
                  id: id
                }, {
                  name: contact.notify
                })
              }
            } catch (e) {
              console.log("Error From Antilinks : ", e);
            }
          })
        if (store && store.contacts) store.contacts[id] = {
          id,
          name: contact.notify
        }
      }
    })
    Void.getName = (jid, withoutContact = false) => {
      id = Void.decodeJid(jid)
      withoutContact = Void.withoutContact || withoutContact
      let v
      if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
        v = store.contacts[id] || {}
        if (!(v.name.notify || v.subject)) v = Void.groupMetadata(id) || {}
        resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', ''))
          .getNumber('international'))
      })
      else v = id === '0@s.whatsapp.net' ? {
        id,
        name: 'WhatsApp'
      } : id === Void.decodeJid(Void.user.id) ? Void.user : (store.contacts[id] || {})
      return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', ''))
        .getNumber('international')
    }
    Void.sendContact = async (jid, kon, quoted = '', opts = {}) => {
      let list = []
      for (let i of kon) {
        list.push({
          displayName: await Void.getName(i + '@s.whatsapp.net'),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Void.getName(i + '@s.whatsapp.net')}\nFN:${global.OwnerName}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${global.email}\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/${global.github}/Secktor-Md\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${global.location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
        })
      }
      Void.sendMessage(jid, {
        contacts: {
          displayName: `${list.length} Contact`,
          contacts: list
        },
        ...opts
      }, {
        quoted
      })
    }
    Void.setStatus = (status) => {
      Void.query({
        tag: 'iq',
        attrs: {
          to: '@s.whatsapp.net',
          type: 'set',
          xmlns: 'status',
        },
        content: [{
          tag: 'status',
          attrs: {},
          content: Buffer.from(status, 'utf-8')
                }]
      })
      return status
    }
    Void.serializeM = (citel) => smsg(Void, citel, store)
    Void.ev.on('connection.update', async (update) => {
      const {
        connection,
        lastDisconnect
      } = update
      if (connection === "connecting") {
        console.log(" ℹ️  Connecting to WhatsApp... Please Wait.");
      }
      if (connection === 'open') {
        const bot_user = await Void.decodeJid(Void.user.id)
        console.log("✅ Whatsapp Login Successful!");
        try {
          console.log("⬇️ Installing External Plugins...");
          let axios = require('axios')
          let check = await plugindb.find({})
          for (let i = 0; i < check.length; i++) {
            try {
              let AxiosData = await axios.get(check[i].url);
              let data = AxiosData.data;
              await fs.writeFileSync(__dirname + '/../commands/' + check[i].id + '.js', data, "utf8");
            } catch (error) {
              //await plugindb.findOneAndDelete({ id: check[i].id });
              console.log(` ℹ️ Plugin ${check[i].id} not InsTalled!\n  ℹ️ Error: ${error}`);
            }
          }
          console.log("✅  External Plugins Installed!");
        } catch (e) {
          console.log("Error In Mongodb Connection\n", e)
        }
        fs.readdirSync(__dirname + "/../commands")
          .forEach((plugin) => {
            if (path.extname(plugin)
              .toLowerCase() == ".js") {
              require(__dirname + "/../commands/" + plugin);
            }
          });
        let version = await getVersionWaweb()
        let commits = await DB.syncgit()
        let Msg = `
╔════◇
║ 『 *SUHAIL - MD* 』
║    Prefix : [ ${prefix===''?"null":prefix} ]
║    Mode : ${Config.WORKTYPE}
║    Total Plugins : ${events.commands.length}
║    Web Version : ${version}
╚════════════════════╝

╔═════◇
║『𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗯𝘆 𝗦𝘂𝗯𝘀𝗰𝗿𝗶𝗯𝗶𝗻𝗴』
║ youtube.com/suhailtechinfo
╚════════════════════╝
`;
        if (commits.total !== 0 && Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY) {
          Msg += `╔═════◇                
║ 『 𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 』
║ _You Have New Update For Bot!_
║ _Update Bot as Soon as Possible!_
║ *To Update:-  _,Update start_*
╚════════════════════╝
`
        };
        console.log(Msg);
        await Void.sendMessage(bot_user, {
          text: Msg
        });
      }
      if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
        console.log('Connection closed with bot. Please put New Session ID again.');
        await sleep(5000);
        syncdb()
          .catch(err => console.log(err));
      }
    })
    Void.ev.on('creds.update', saveCreds)
    /**  Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param {*}button
     * @param {*} options
     * @returns
     */
    Void.send5ButImg = async (jid, text = '', footer = '', img, but = [], thumb, options = {}) => {
      let message = await prepareWAMessageMedia({
        image: img,
        jpegThumbnail: thumb
      }, {
        upload: Void.waUploadToServer
      })
      var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
          hydratedTemplate: {
            imageMessage: message.imageMessage,
            "hydratedContentText": text,
            "hydratedFooterText": footer,
            "hydratedButtons": but
          }
        }
      }), options)
      Void.relayMessage(jid, template.message, {
        messageId: template.key.id
      })
    }
    /**
     *
     * @param {*} jid
     * @param {*} buttons
     * @param {*} caption
     * @param {*} footer
     * @param {*} quoted
     * @param {*} options
     */
    Void.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
      let buttonMessage = {
        text,
        footer,
        buttons,
        headerType: 2,
        ...options
      }
      Void.sendMessage(jid, buttonMessage, {
        quoted,
        ...options
      })
    }
    /**
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    Void.sendText = (jid, text, quoted = '', options) => Void.sendMessage(jid, {
      text: text,
      ...options
    }, {
      quoted
    })
    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} caption
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    Void.sendImage = async (jid, path, caption = '', quoted = '', options) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      return await Void.sendMessage(jid, {
        image: buffer,
        caption: caption,
        ...options
      }, {
        quoted
      })
    }
    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} caption
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    Void.sendTextWithMentions = async (jid, text, quoted, options = {}) => Void.sendMessage(jid, {
      text: text,
      contextInfo: {
        mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
      },
      ...options
    }, {
      quoted
    })
    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    Void.sendImageAsSticker = async (jid, buff, options = {}) => {
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options);
      } else {
        buffer = await imageToWebp(buff);
      }
      await Void.sendMessage(jid, {
        sticker: {
          url: buffer
        },
        ...options
      }, options);
    };
    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    Void.sendVideoAsSticker = async (jid, buff, options = {}) => {
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
      } else {
        buffer = await videoToWebp(buff);
      }
      await Void.sendMessage(jid, {
        sticker: {
          url: buffer
        },
        ...options
      }, options);
    };
    Void.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
      let types = await Void.getFile(path, true)
      let {
        mime,
        ext,
        res,
        data,
        filename
      } = types
      if (res && res.status !== 200 || file.length <= 65536) {
        try {
          throw {
            json: JSON.parse(file.toString())
          }
        } catch (e) {
          if (e.json) throw e.json
        }
      }
      let type = '',
        mimetype = mime,
        pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
        let {
          writeExif
        } = require('./exif')
        let media = {
          mimetype: mime,
          data
        }
        pathFile = await writeExif(media, {
          packname: options.packname ? options.packname : Config.packname,
          author: options.author ? options.author : Config.author,
          categories: options.categories ? options.categories : []
        })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
      } else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await Void.sendMessage(jid, {
                    [type]: {
          url: pathFile
        },
        caption,
        mimetype,
        fileName,
        ...options
      }, {
        quoted,
        ...options
      })
      return fs.promises.unlink(pathFile)
    }
    /**
     *
     * @param {*} message
     * @param {*} filename
     * @param {*} attachExtension
     * @returns
     */
    Void.downloadAndSaveMediaMessage = async (message, filename = 'null', attachExtension = true) => {
      let quoted = message.msg ? message.msg : message
      let mime = (message.msg || message)
        .mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(quoted, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }
      let type = await FileType.fromBuffer(buffer)
      let trueFileName = './' + filename + '.' + type.ext
      // save to file
      await fs.writeFileSync(trueFileName, buffer)
      return trueFileName
    }
    Void.forward = async (text, message, context, quote, attachExtension = true) => {
      let mtype = message.mtype;
      let buttonMessage = {};
      console.log("Forward function Called and Type is : ", mtype);
      if (mtype == "conversation") {
        buttonMessage = {
          text: message.text,
          contextInfo: context,
        }
        for (let jid of parsedJid(text)) {
          await Void.sendMessage(jid, buttonMessage, {
            quoted: quote
          })
        }
        return;
      }
      const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`
      }
      let quoted = message.msg ? message.msg : message
      let mime = (message.msg || message)
        .mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(quoted, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }
      let type = await FileType.fromBuffer(buffer)
      let filename = await getRandom(type.ext)
      let trueFileName = './' + filename
      await fs.writeFileSync(trueFileName, buffer)
      if (mtype == "videoMessage") {
        buttonMessage = {
          video: fs.readFileSync(trueFileName),
          mimetype: message.mimetype,
          caption: message.text,
          contextInfo: context,
        }
      } else if (mtype == "imageMessage") {
        buttonMessage = {
          image: fs.readFileSync(trueFileName),
          mimetype: message.mimetype,
          caption: message.text,
          contextInfo: context,
        }
      } else if (mtype == "audioMessage") {
        buttonMessage = {
          audio: fs.readFileSync(trueFileName),
          mimetype: message.mimetype,
          seconds: 200001355,
          ptt: true,
          contextInfo: context,
        }
      } else if (mtype == "documentWithCaptionMessage" || type == "documentMessage") {
        buttonMessage = {
          document: fs.readFileSync(trueFileName),
          mimetype: message.mimetype,
          caption: message.text,
          contextInfo: context,
        }
      } else {
        fs.unlink(trueFileName, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully');
          }
        });
      }
      for (let jid of parsedJid(text)) {
        try {
          await Void.sendMessage(jid, buttonMessage, {
            quoted: quote
          });
        } catch (e) {}
      }
      return fs.unlink(trueFileName, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    }
    Void.downloadMediaMessage = async (message) => {
      let mime = (message.msg || message)
        .mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }
      return buffer
    }
    /**
     *
     * @param {*} jid
     * @param {*} message
     * @param {*} forceForward
     * @param {*} options
     * @returns
     */
    Void.copyNForward = async (jid, message, forceForward = false, options = {}) => {
      let vtype
      if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        vtype = Object.keys(message.message.viewOnceMessage.message)[0]
        delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message.viewOnceMessage.message[vtype].viewOnce
        message.message = {
          ...message.message.viewOnceMessage.message
        }
      }
      let mtype = Object.keys(message.message)[0]
      let content = await generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != "conversation") context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
        ...context,
        ...content[ctype].contextInfo
      }
      const waMessage = await generateWAMessageFromContent(jid, content, options ? {
        ...content[ctype],
        ...options,
        ...(options.contextInfo ? {
          contextInfo: {
            ...content[ctype].contextInfo,
            ...options.contextInfo
          }
        } : {})
      } : {})
      await Void.relayMessage(jid, waMessage.message, {
        messageId: waMessage.key.id
      })
      return waMessage
    }
    Void.sendFileUrl = async (jid, url, caption = Config.caption, quoted = null, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
        return Void.sendMessage(jid, {
          video: await getBuffer(url),
          caption: caption,
          gifPlayback: true,
          ...options
        }, {
          quoted: quoted,
        })
      }
      if (mime === "application/pdf") {
        return Void.sendMessage(jid, {
          document: await getBuffer(url),
          mimetype: 'application/pdf',
          caption: caption,
          ...options
        }, {
          quoted: quoted,
        })
      }
      if (mime.split("/")[0] === "image") {
        return Void.sendMessage(jid, {
          image: await getBuffer(url),
          caption: caption,
          ...options
        }, {
          quoted: quoted,
        })
      }
      if (mime.split("/")[0] === "video") {
        return Void.sendMessage(jid, {
          video: await getBuffer(url),
          caption: caption,
          mimetype: 'video/mp4',
          ...options
        }, {
          quoted: quoted,
        })
      }
      if (mime.split("/")[0] === "audio") {
        return Void.sendMessage(jid, {
          audio: await getBuffer(url),
          caption: caption,
          mimetype: 'audio/mpeg',
          ...options
        }, {
          quoted: quoted,
        })
      }
      if (mime === "application/octet-stream") {
        return Void.sendMessage(citel.chat, {
          image: await getBuffer(url),
          caption: caption,
          ...options
        }, {
          quoted: quoted,
        })
      }
    }
    Void.cMod = (jid, copy, text = '', sender = Void.user.id, options = {}) => {
      let mtype = Object.keys(copy.message)[0]
      let isEphemeral = mtype === 'ephemeralMessage'
      if (isEphemeral) {
        mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
      }
      let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
      let content = msg[mtype]
      if (typeof content === 'string') msg[mtype] = text || content
      else if (content.caption) content.caption = text || content.caption
      else if (content.text) content.text = text || content.text
      if (typeof content !== 'string') msg[mtype] = {
        ...content,
        ...options
      }
      if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
      else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
      copy.key.remoteJid = jid
      copy.key.fromMe = sender === Void.user.id
      return proto.WebMessageInfo.fromObject(copy)
    }
    /**
     *
     * @param {*} path
     * @returns
     */
    Void.getFile = async (PATH, save) => {
      let res
      let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split `,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
      //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      let type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      }
      let filename = path.join(__filename, __dirname + new Date * 1 + '.' + type.ext)
      if (data && save) fs.promises.writeFile(filename, data)
      return {
        res,
        filename,
        size: await getSizeMedia(data),
        ...type,
        data
      }
    }
    Void.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
      let types = await Void.getFile(PATH, true)
      let {
        filename,
        size,
        ext,
        mime,
        data
      } = types
      let type = '',
        mimetype = mime,
        pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
        let {
          writeExif
        } = require('./exif.js')
        let media = {
          mimetype: mime,
          data
        }
        pathFile = await writeExif(media, {
          packname: Config.packname,
          author: Config.packname,
          categories: options.categories ? options.categories : []
        })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
      } else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await Void.sendMessage(jid, {
                    [type]: {
          url: pathFile
        },
        mimetype,
        fileName,
        ...options
      }, {
        quoted,
        ...options
      })
      return fs.promises.unlink(pathFile)
    }
    Void.parseMention = async (text) => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
    return Void
  }
  syncdb()
    .catch(err => console.log(err))
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Text Astro</title>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
  }
  
  .astro-text {
    color: #fff;
    font-size: 6rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    text-shadow: 0 5px 0 #ff8c00, 0 10px 0 #ff4500, 0 15px 0 #ff0000, 0 20px 10px rgba(0, 0, 0, 0.5);
    animation: glow 2s infinite alternate;
  }
  
  @keyframes glow {
    0% {
      text-shadow: 0 5px 0 #ff8c00, 0 10px 0 #ff4500, 0 15px 0 #ff0000, 0 20px 10px rgba(0, 0, 0, 0.5);
    }
    100% {
      text-shadow: 0 5px 10px #ff8c00, 0 10px 15px #ff4500, 0 15px 20px #ff0000, 0 20px 30px rgba(0, 0, 0, 0.8);
    }
  }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="astro">Astro</h1>
  </div>
</body>
</html>
`
  app.get("/", (req, res) => res.type('html')
    .send(html));
  app.listen(port, () => console.log(`Asta is connected http://localhost:${port} port`));
  //=============================[to get message of New Update of this file.]===================================================
  let file = require.resolve(__filename)
  fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update ${__filename}`)
    delete require.cache[file]
    require(file)
  })
}, 1500)

function atob(str) {
  return Buffer.from(str, 'base64')
    .toString('binary');
}