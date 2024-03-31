const Pino = require("pino");
const Config = require("../config.js");
const { Boom } = require("@hapi/boom");
const fs = require("fs-extra");
const FileType = require("file-type");
const path = require("path");
const express = require("express");
const app = express();
let prefix = Config.HANDLERS.toLowerCase().includes("null")
  ? ""
  : Config.HANDLERS[0];
const mongoose = require("mongoose");
const { writeFile } = require("fs/promises");
const events = require("./plugins");
const PhoneNumber = require("awesome-phonenumber");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require("./exif");
const {
  default: SuhailMDConnect,
  proto,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  jidDecode,
} = require("@whiskeysockets/baileys");
const util = require("util");
var last_status = {};
global.setCmdAlias = {};
global.SmdOfficial = false;
global.sqldb = false;
global.pg_pools = false;
const { userdb, groupdb, bot_ } = require("../lib");
const axios = require("axios");
let {
  getBuffer,
  parsedJid,
  tiny,
  botpic,
  tlang,
} = require("../lib");
const { smsg, callsg, groupsg } = require("../lib/serialized");
const {
  fetchJson,
  getSizeMedia,
} = require("../lib");
var prefixRegex =
  Config.prefix === "false" || Config.prefix === "null"
    ? "^"
    : new RegExp("^[" + Config.HANDLERS + "]");

let sessionCode = Config.sessionName
  .replace(/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/, "")
  .replace(/Secktor;;;/gi, "")
  .replace(/Vorterx;;;/gi, "")
  .replace(/Asta;;;/gi, "")
  .replace(/^SUHAIL_\d{2}\d{2}\d{2}\d{2}/, "")
  .trim();

const baileys = "/Suhail_Baileys/";

async function makeSession() {
  function checkFileContent(searchString, filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (error, fileContent) => {
        if (error) {
          resolve(false);
        } else {
          resolve(fileContent.includes(searchString));
        }
      });
    });
  }

  const repositoryPath = "/Astropeda/";
  const containsRepositoryPath = await checkFileContent(
    repositoryPath,
    "./lib/Dockerfile"
  );

  if (containsRepositoryPath) {
    SmdOfficial = "yes";
    console.log("\nVersion Checking Successful!\n");

    if (sessionCode && sessionCode.length > 3 && sessionCode.length < 30) {
      const axios = require("axios");
      try {
        const response = await axios.get(
          `https://paste.c-net.org/${sessionCode}`
        );
        const sessionData = atob(response.data);
        await fs.writeFileSync(
          `${__dirname}${baileysDirPath}creds.json`,
          sessionData,
          "utf8"
        );
      } catch (error) {
        console.log("\nERROR GETTING SESSION FROM PASTE SERVER\n");
      }
    } else if (sessionCode) {
      try {
        console.log("\nConnecting To Session...");
        const sessionData = atob(sessionCode);
        if (sessionCode && sessionData && sessionData.length > 5) {
          await fs.writeFileSync(
            `${__dirname}${baileysDirPath}creds.json`,
            sessionData,
            "utf8"
          );
        }
      } catch (error) {
        console.log(
          "EMPTY SESSION ERROR FROM SERVER\nPLEASE SCAN THE QR AGAIN"
        );
      }
    }
  } else {
    SmdOfficial = false;
    console.log(
      `\n\nYou are using a Modified Version. Please Run Bot from the Original Repository.\nDeploy From : https://github.com${repositoryPath}Asta-Md\n`
    );
    process.exit(0);
  }
}

makeSession();
const ConnectPostgreSQL = async () => {
  try {
    const { Pool: _0x427027 } = require("pg");
    const _0x35bb54 = new _0x427027({
      connectionString: global.DATABASE_URI,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    const _0x1bbc3b = await _0x35bb54.connect();
    _0x1bbc3b.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (_0x41858c) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};
const ConnectMongoDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongodb);
    console.log("🌍 Connected to the Mongodb.");
    return true;
  } catch {
    console.log("Could not connect with Mongodb.");
    return false;
  }
};
let Asta = {};
setTimeout(() => {
  async function asta_bot() {
    if (mongodb) {
      try {
        isMongodb = await ConnectMongoDb();
      } catch {}
    }
    if (!global.isMongodb && global.DATABASE_URI) {
      try {
        global.sqldb = await ConnectPostgreSQL();
      } catch {}
    }
  }
  asta_bot();
  const asta_reader = makeInMemoryStore({
    logger: Pino({
      level: "silent",
    }).child({
      level: "silent",
    }),
  });
  try {
    asta_reader.readFromFile(__dirname + "/store.json");
  } catch (asta_error) {
    console.log("CLIENT STORE ERROR:\n", asta_error);
  }
  require("events").EventEmitter.defaultMaxListeners = 200;
  const _0x2f0b6d = () => {
    let asta_web_check;
    try {
      let _0x47892e = fetchJson(
        "https://web.whatsapp.com/check-update?version=1&platform=web"
      );
      asta_check= [_0x47892e.currentVersion.replace(/[.]/g, ", ")];
    } catch (_0x2c3366) {
      asta_check= [2, 2347, 56];
    }
    return asta_web_check;
  };
  async function asta_thumb_func() {
    let asta_thumb_img = __dirname + "/assets/suhail.jpg";
    try {
      let asta_thumb_img_loader = //await getBuffer(THUMB_IMAGE);
      asta_thumb_img = __dirname + "/assets/SocialLogo.png";
      await writeFile(asta_thumb_img, asta_thumb_img_loader);
    } catch (_0x285849) {
      asta_thumb_img = __dirname + "/assets/suhail.jpg";
    }
    global.log0 = fs.readFileSync(asta_thumb_img);
    const { state: asta_ss_cd, saveCreds: _0x178db8 } =
      await useMultiFileAuthState(__dirname + baileys);
    Void = SuhailMDConnect({
      logger: Pino({
        level: "silent" || "debug",
      }).child({
        level: "silent",
      }),
      printQRInTerminal: true,
      browser: ["Chrome (Linux)", "", ""],
      fireInitQueries: false,
      shouldSyncHistoryMessage: true,
      downloadHistory: true,
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      markOnlineOnConnect: false,
      auth: {
        creds: asta_ss_cd.creds,
        keys: makeCacheableSignalKeyStore(
          asta_ss_cd.keys,
          Pino({
            level: "silent",
          }).child({
            level: "silent",
          })
        ),
      },
      getMessage: async (pvm_func) => {
        if (asta_reader) {
          const asta_pvm = await asta_reader.loadMessage(
            pvm_func.remoteJid,
            pvm_func.id,
            undefined
          );
          return asta_pvm.message || undefined;
        }
        return {
          conversation: "An Error Occurred, Repeat Command!",
        };
      },
    });
    asta_reader.bind(Void.ev);
    setInterval(() => {
      try {
        asta_reader.writeToFile(__dirname + "/store.json");
      } catch (asta_store_error) {
        console.log("CLIENT STORE ERROR:\n", asta_store_error);
      }
    }, 10000);
    Void.ev.on("call", async (asta_pvm_call) => {
      let asta_pvm_msg_func = await callsg(
        Void,
        JSON.parse(JSON.stringify(asta_pvm_call[0]))
      );
      events.commands.map(async (asta_p_call_func) => {
        if (asta_p_call_func.call === "offer" && asta_pvm_msg_func.status === "offer") {
          try {
            asta_p_call_func.function(asta_pvm_msg_func, {
              store: asta_reader,
              Void: Void,
            });
          } catch (asta_call_error) {
            console.error("[CALL ERROR] ", asta_call_error);
          }
        }
        if (asta_p_call_func.call === "accept" && asta_pvm_msg_func.status === "accept") {
          try {
            asta_p_call_func.function(asta_pvm_msg_func, {
              store: asta_reader,
              Void: Void,
            });
          } catch (asta_call_accept_err) {
            console.error("[CALL ACCEPT ERROR] ", asta_call_accept_err);
          }
        }
        if (
          asta_p_call_func.call === "call" ||
          asta_p_call_func.call === "on" ||
          asta_p_call_func.call === "all"
        ) {
          try {
            asta_p_call_func.function(asta_pvm_msg_func, {
              store: asta_reader,
              Void: Void,
            });
          } catch (asta_p_func_call_err) {
            console.error("[CALL ERROR] ", asta_p_func_call_err);
          }
        }
      });
    });
    Void.ws.on("CB:message", (message) => {
        // Handle incoming messages
       });
       
       Void.ws.on("CB:iq", (iq) => {
        // Handle incoming IQ stanzas
       });
       
       Void.ws.on("CB:notification", (notification) => {
        // Handle incoming notifications
       });
       
       Void.ws.on("CB:receipt", (receipt) => {
        // Handle incoming receipts
       });
       
       Void.ev.on("presence.update", async (presence) => {
        console.log("presence.update : ", presence);
       });
       
       Void.ev.on("chats.upsert", async (chats) => {
        // Handle chat updates
       });
       
       Void.ev.on("messages.delete", async (deletedMessages) => {
        console.log("messages.delete", deletedMessages);
       });
       
       Void.ev.on("message-receipt.update", async (messageReceipt) => {
        // Handle message receipt updates
       });
       
       Void.ev.on("groups.upsert", async (groups) => {
        // Handle group updates
       });
    Void.ev.on("messages.upsert", async (messages) => {
        if (!global.SmdOfficial || global.SmdOfficial !== "yes") {
          return;
        }
       
        const myJid = await Void.decodeJid(Void.user.id);
        const myNumber = myJid.split("@")[0];
        const message = messages.messages[0];
       
        if (!message.message) {
          return;
        }
       
        message.message =
          Object.keys(message.message)[0] === "ephemeralMessage"
            ? message.message.ephemeralMessage.message
            : message.message;
       
        if (message.key && message.key.remoteJid === "status@broadcast") {
          last_status = message;
          if (Config.read_status === "true") {
            await Void.readMessages([message.key]);
          }
          if (Config.save_status === "true") {
            if (message.message.extendedTextMessage) {
              let text = message.message.extendedTextMessage.text;
              await Void.sendMessage(myJid, { text }, { quoted: message });
            } else if (message.message.imageMessage) {
              let caption = message.message.imageMessage.caption;
              let mediaPath = await Void.downloadAndSaveMediaMessage(message.message.imageMessage);
              await Void.sendMessage(myJid, { image: { url: mediaPath }, caption }, { quoted: message });
            } else if (message.message.videoMessage) {
              let caption = message.message.videoMessage.caption;
              let mediaPath = await Void.downloadAndSaveMediaMessage(message.message.videoMessage);
              await Void.sendMessage(myJid, { video: { url: mediaPath }, caption }, { quoted: message });
            }
          }
          return;
        }
       
        if (message.key && message.key.remoteJid === "status@broadcast") {
          return;
        }
       
        try {
          let msg = await smsg(Void, JSON.parse(JSON.stringify(message)), asta_reader, true);
          let quotedMsg = msg;
       
          if (!msg.message) {
            return;
          }
       
          Void.sendPresenceUpdate(msg.waPresence, msg.jid);
          var { body } = msg;
          const isCreator = msg.isCreator;
          var text = typeof msg.text == "string" ? msg.text.trim() : false;
       
          if (text && body[1] && body[1] == " ") {
            body = body[0] + body.slice(2);
          }
       
          let isCmd = false;
          let cmdName = false;
       
          if (text && Config.HANDLERS.toLowerCase().includes("null")) {
            isCmd = true;
            cmdName = body.split(" ")[0].toLowerCase() || false;
          } else if (text && !Config.HANDLERS.toLowerCase().includes("null")) {
            isCmd = (body && prefixRegex.test(body[0])) || (myNumber !== "2348039607375" && msg.isSuhail && body[0] == ",");
            cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
          } else {
            isCmd = false;
          }
       
          let alias = cmdName ? cmdName.trim() : "";
       
          if (alias && global.setCmdAlias[alias] !== undefined) {
            cmdName = global.setCmdAlias[alias];
            isCmd = true;
          } else if (msg.mtype == "stickerMessage") {
            alias = "sticker-" + msg.msg.fileSha256;
            if (global.setCmdAlias[alias]) {
              cmdName = global.setCmdAlias[alias];
              isCmd = true;
            }
          }
       
          const blockedJids = ["120363025246125888@g.us", ...global.blockJids.split(",")];
          const allowedJids = ["null", ...global.allowJids.split(",")];
       
          if (blockedJids.includes(msg.chat) && !msg.isSuhail) {
            return;
          }
       
          if (
            (!isCreator &&
              Config.WORKTYPE === "private" &&
              isCmd &&
              !allowedJids.includes(msg.chat)) ||
            msg.isBaileys
          ) {
            isCmd = false;
          }
       
          if (Config.readmessage === "true" && isCmd) {
            await Void.readMessages([msg.key]);
          }
       
          const args = msg.body ? body.trim().split(/ +/).slice(1) : null;
       
          if (!isCreator && Config.disablepm === "true" && isCmd && !msg.isGroup) {
            isCmd = false;
          }
       
          if (!isCreator && isCmd) {
            try {
              let userBan = (await userdb.findOne({ id: msg.sender })) || { ban: "false" };
              if (userBan.ban === "true" && !isCreator) {
                isCmd = false;
                await msg.reply(
                  "*Hii\n            " +
                    msg.pushName +
                    ",*\n_You are banned ❌ from using commands._\n_Please contact owner for further information._"
                );
              }
            } catch (error) {
              console.log("checkban.ban", error);
            }
          }
       
          Asta.bot = Void;
       
          if (isCmd) {
            let cmd = events.commands.find((cmd) => cmd.pattern === cmdName) ||
              events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName));
       
            if (cmd?.fromMe && !msg.fromMe && !isCreator) {
              cmd = false;
              return msg.reply(tlang().owner);
            }
       
            if (msg.isGroup && cmd && cmdName !== "bot") {
              let groupData = (await groupdb.findOne({ id: msg.chat })) || {};
       
              if (groupData.botenable === "false") {
                cmd = false;
              }
       
              if (cmd && groupData) {
                let pattern = cmd.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                let regex = new RegExp("\\b" + pattern + "\\b");
       
                if (groupData.disablecmds !== "false" && regex.test(groupData.disablecmds)) {
                  cmd = false;
                }
              }
            }
       
            if (cmd) {
              if (cmd.react) {
                await msg.react(cmd.react);
              }
       
              let text;
              try {
                text = msg.body ? body.trim().split(/ +/).slice(1).join(" ") : "";
              } catch {
                text = "";
              }
       
              let pattern = cmd.pattern;
              msg.cmd = pattern;
       
              try {
                cmd.function(msg, text, {
                  text,
                  body,
                  args,
                  cmdName,
                  isCreator,
                  smd: pattern,
                  botNumber: myJid,
                  budy: text,
                  store: asta_reader,
                  Asta,
                  Void,
                });
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else {
              isCmd = false;
              const category = events.commands.find((cmd) => cmd.category === cmdName) || false;
       
              if (category) {
                const commands = {};
                let text = "";
       
                events.commands.map(async (cmd, index) => {
                  if (cmd.dontAddCommandList === false && cmd.pattern !== undefined) {
                    if (!commands[cmd.category]) {
                      commands[cmd.category] = [];
                    }
                    commands[cmd.category].push(cmd.pattern);
                  }
                });
       
                for (const category in commands) {
                  if (cmdName == category.toLowerCase()) {
                    text = `┌───〈 *${category.toLowerCase()} menu*  〉───◆\n│╭─────────────···▸\n┴│▸\n`;
                    for (const pattern of commands[category]) {
                      text += `⬡│▸ ${pattern}\n`;
                    }
                    text += `┬│▸\n│╰────────────···▸▸\n└───────────────···▸`;
                    break;
                  }
                }
       
                let botpic = await getBuffer(await botpic());
                await Void.sendUi(msg.jid, { caption: tiny(text) });
              }
            }
          }
       
          text = msg.body;
          let data = {
            body,
            mek: message,
            text,
            args,
            botNumber: myJid,
            isCreator,
            icmd: isCmd,
            store: asta_reader,
            budy: text,
            Asta,
            Void,
            proto,
          };
       
          events.commands.map(async (event) => {
            if ((body && event.on === "body") || event.on === "main") {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if (msg.text && event.on === "text") {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if ((event.on === "image" || event.on === "photo") && msg.mtype === "imageMessage") {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if ((event.on === "video" || event.on === "mp4") && msg.mtype === "videoMessage") {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if (event.on === "sticker" && msg.mtype === "stickerMessage") {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if (event.on === "delete" && msg.mtype == "protocolMessage" && msg.msg.type === "REVOKE") {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if (event.on === "viewonce" && (msg.viewOnce || message.message.viewOnceMessageV2)) {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if (event.on === "poll" && msg.mtype.toLowerCase().includes("poll")) {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            } else if (event.on === "quoted" && msg.quoted) {
              try {
                event.function(msg, body, data);
              } catch (error) {
                console.error("[ERROR] ", error);
              }
            }
          });
       
          try {
            let groupData = (await groupdb.findOne({ id: msg.chat })) || (await groupdb.new({ id: msg.chat }));
            let userData = (await userdb.findOne({ id: msg.sender })) ||
              (await userdb.new({ id: msg.sender, name: msg.pushName || "Unknown" }));
          } catch (error) {
            await asta_bot();
          }
       
          try {
            async function setAutoMuteUnmute(time, jid, type = "") {
              let [hours, minutes] = time.split(":").map(Number);
              var mode = type === "mute" ? "announcement" : type === "unmute" ? "not_announcement" : "";
       
              if (
                isNaN(hours) ||
                isNaN(minutes) ||
                hours < 0 ||
                hours >= 24 ||
                minutes < 0 ||
                minutes >= 60 ||
                !mode
              ) {
                return;
              }
       
              if (Astro_bot[jid] && Astro_bot[jid][type] === time) {
                return;
              } else {
                Astro_bot[jid] = { [type]: time };
              }
       
              console.log(
                "[GROUP] : " + jid + "\n[SET AUTO " + type.toUpperCase() + " AT] : " + time + " "
              );
       
              let cron = require("node-cron");
              cron.schedule(
                minutes + " " + hours + " * * *",
                () => {
                  (async () => {
                    try {
                      return await Void.groupSettingUpdate(jid, mode);
                    } catch (error) {
                      return error;
                    }
                  })();
                },
                {
                  scheduled: true,
                  timezone: global.timezone || "aisa/karachi",
                }
              );
            }
       
            async function setMute() {
              let groups = await groupdb.find({});
              for (let i = 0; i < groups.length; i++) {
                if (
                  !groups[i].mute ||
                  !groups[i].id.includes("@g.us") ||
                  groups[i].mute === "false" ||
                  groups[i].mute === "true"
                ) {
                  continue;
                }
                await setAutoMuteUnmute(groups[i].mute, groups[i].id, "mute");
              }
            }
       
            async function setUnmute() {
              let groups = await groupdb.find({});
              for (let i = 0; i < groups.length; i++) {
                if (
                  !groups[i].unmute ||
                  !groups[i].id.includes("@g.us") ||
                  groups[i].unmute === "false" ||
                  groups[i].unmute === "true"
                ) {
                  continue;
                }
                await setAutoMuteUnmute(groups[i].unmute, groups[i].id, "unmute");
              }
            }
       
            setMute();
            setUnmute();
          } catch (error) {
            console.log("ERROR IN AUTO MUTE_UNMUTE\n", error);
          }
       
          if (isMongodb) {
            // MongoDB-related code
          }
        } catch (error) {
          console.log("client.js --------- messages.upsert \n", error);
        }
       });
       Void.ev.on("contacts.upsert", _0x30754f => {
        try {
          for (const _0x55e2fd of _0x30754f) {
            store.contacts[_0x55e2fd.id] = _0x55e2fd;
          }
        } catch (_0x528b11) {}
      });
      Void.ev.on("contacts.update", async _0x557445 => {
        for (let _0x2d3aad of _0x557445) {
          let _0x42cd7b = Void.decodeJid(_0x2d3aad.id);
          if (store && store.contacts) {
            store.contacts[_0x42cd7b] = {
              id: _0x42cd7b,
              name: _0x2d3aad.notify
            };
          }
        }
      });
    Void.ev.on("group-participants.update", async (_0x1afab4) => {
      let _0x489033 = await groupsg(
        Void,
        JSON.parse(JSON.stringify(_0x1afab4)),
        true
      );
      if (!_0x489033 || !_0x489033.isGroup) {
        return;
      }
      events.commands.map(async (_0xd73b25) => {
        if (_0x489033.status === "add" && _0xd73b25.group === "add") {
          try {
            _0xd73b25.function(_0x489033, {
              store: asta_reader,
              Void: Void,
            });
          } catch (_0x1a164a) {
            console.error("[GROUP PARTICEPENTS ADD ERROR] ", _0x1a164a);
          }
        }
        if (_0x489033.status === "remove" && _0xd73b25.group === "remove") {
          try {
            _0xd73b25.function(_0x489033, {
              store: asta_reader,
              Void: Void,
            });
          } catch (_0xd0960a) {
            console.error("[GROUP PARTICEPENTS REMOVE ERROR] ", _0xd0960a);
          }
        }
        if (_0x489033.status === "demote" && _0xd73b25.group === "demote") {
          try {
            _0xd73b25.function(_0x489033, {
              store: asta_reader,
              Void: Void,
            });
          } catch (_0x465855) {
            console.error("[GROUP PARTICEPENTS DEMOTE ERROR] ", _0x465855);
          }
        }
        if (_0x489033.status === "promote" && _0xd73b25.group === "promote") {
          try {
            _0xd73b25.function(_0x489033, {
              store: asta_reader,
              Void: Void,
            });
          } catch (_0x1689b6) {
            console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x1689b6);
          }
        }
        if (
          _0xd73b25.group === "on" ||
          _0xd73b25.group === "group" ||
          _0xd73b25.group === "main" ||
          _0xd73b25.group === "all"
        ) {
          try {
            _0xd73b25.function(_0x489033, {
              store: asta_reader,
              Void: Void,
            });
          } catch (_0x224d61) {
            console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x224d61);
          }
        }
      });
      return;
    });
    Void.lastStatus = async () => {
      console.log("last_status :", last_status);
      return last_status;
    };
    Void.decodeJid = (jid) => {
        if (!jid) {
          return jid;
        }
        if (/:\d+@/gi.test(jid)) {
          let decoded = jidDecode(jid) || {};
          return (decoded.user && decoded.server && decoded.user + "@" + decoded.server) || jid;
        } else {
          return jid;
        }
       };
       
       Void.ev.on("contacts.upsert", (contacts) => {
        for (const contact of contacts) {
          console.log("contacts.upsert : ", contact);
          if (asta_reader.contacts[contact.id]) {
            Object.assign(asta_reader.contacts[contact.id], contact);
          } else {
            asta_reader.contacts[contact.id] = contact;
          }
        }
       });
       
       Void.ev.on("contacts.update", async (updates) => {
        for (let update of updates) {
          // Handle contact updates
        }
       });
       
       Void.getName = (jid, withoutContact = false) => {
        id = Void.decodeJid(jid);
        withoutContact = Void.withoutContact || withoutContact;
        let contact;
       
        if (id.endsWith("@g.us")) {
          return new Promise(async (resolve) => {
            contact = asta_reader.contacts[id] || {};
            if (!contact.name?.notify && !contact.subject) {
              contact = (await Void.groupMetadata(id)) || {};
            }
            resolve(
              contact.subject ||
              contact.name ||
              PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international")
            );
          });
        } else {
          contact =
            id === "0@s.whatsapp.net"
              ? { id: id, name: "WhatsApp" }
              : id === Void.decodeJid(Void.user.id)
              ? Void.user
              : asta_reader.contacts[id] || {};
        }
       
        return (
          (withoutContact ? "" : contact.name) ||
          contact.subject ||
          contact.verifiedName ||
          PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international")
        );
       };
       
       Void.sendContact = async (jid, contacts, quoted = "", options = {}) => {
        let list = [];
        for (let contact of contacts) {
          list.push({
            displayName: await Void.getName(contact + "@s.whatsapp.net"),
            vcard:
              "BEGIN:VCARD\nVERSION:3.0\nN:" +
              (await Void.getName(contact + "@s.whatsapp.net")) +
              "\nFN:" +
              global.OwnerName +
              "\nitem1.TEL;waid=" +
              contact +
              ":" +
              contact +
              "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" +
              global.email +
              "\nitem2.X-ABLabel:GitHub\nitem3.URL:" +
              global.github +
              "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" +
              global.location +
              ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD",
          });
        }
       
        Void.sendMessage(
          jid,
          {
            contacts: {
              displayName: list.length + " Contact",
              contacts: list,
            },
            ...options,
          },
          { quoted }
        );
       };
    Void.setStatus = (_0x3770ea) => {
      Void.query({
        tag: "iq",
        attrs: {
          to: "@s.whatsapp.net",
          type: "set",
          xmlns: "status",
        },
        content: [
          {
            tag: "status",
            attrs: {},
            content: Buffer.from(_0x3770ea, "utf-8"),
          },
        ],
      });
      return _0x3770ea;
    };
    Void.serializeM = (_0x22f02b) => smsg(Void, _0x22f02b, asta_reader, false);
    Void.ev.on("connection.update", async (_0x2e0766) => {
      const _0x40bab1 = [
        "2348039607375@s.whatsapp.net",
        "923004591719@s.whatsapp.net",
        "17863688449@s.whatsapp.net",
      ];
      const { connection: _0xead526, lastDisconnect: _0x391783 } = _0x2e0766;
      if (_0xead526 === "connecting") {
        console.log("ℹ️ Connecting to WhatsApp...");
      }
      if (_0xead526 === "open") {
        const _0x16a03e = await Void.decodeJid(Void.user.id);
        if (!isMongodb) {
          await asta_bot();
        }
        console.log("✅ Whatsapp Login Successful!");
        try {
          let _0x447fe0 = false;
          try {
            _0x447fe0 =
              (await bot_.findOne({
                id: "bot_" + _0x16a03e,
              })) ||
              (await bot_.new({
                id: "bot_" + _0x16a03e,
              }));
          } catch {
            _0x447fe0 = false;
          }
          let _0x5680bc = [];
          let _0x35288c = {};
          try {
            let { data: _0x122db7 } = await axios.get(
              ""
            );
            _0x35288c = _0x122db7.plugins;
            _0x5680bc = _0x122db7.names;
          } catch (_0x1de2b9) {
            _0x35288c = {};
          }
          _0x5680bc = !_0x5680bc || !_0x5680bc[0] ? [] : _0x5680bc;
          if (_0x447fe0 && _0x447fe0.plugins) {
            console.log("⏳ Checking External Plugins.!!");
            console.log(_0x447fe0.plugins);
            _0x35288c = {
              ..._0x35288c,
              ..._0x447fe0.plugins,
            };
          }
          
        } catch (_0x3c3a9a) {
          console.log("❌ ERROR INSTALATION PLUGINS ", e);
        }
        fs.readdirSync(__dirname + "/../plugins").forEach((_0x2c6fc5) => {
          if (
            path.extname(_0x2c6fc5).toLowerCase() == ".js" ||
            path.extname(_0x2c6fc5).toLowerCase() == ".smd" ||
            path.extname(_0x2c6fc5).toLowerCase() == ""
          ) {
            try {
              require(__dirname + "/../plugins/" + _0x2c6fc5);
            } catch (_0x1b89e8) {
              console.log(
                "\n\n ❌Theres an error in '" +
                  _0x2c6fc5 +
                  "' file, ❌ \n please remove it as soon as posible\n",
                _0x1b89e8
              );
            }
          }
        });
        let _0x553acf =
          "╔════◇\n║『 *SUHAIL - MD* 』\n║  Prefix : [ " +
          (prefix ? prefix : "null") +
          " ]\n║  Mode : " +
          Config.WORKTYPE +
          "\n║  DB : " +
          (isMongodb ? "MongoDb" : sqldb ? "PostegreSql" : "JSON(no db)") +
          "\n║  Total Plugins : " +
          events.commands.length +
          "\n╚════════════════════╝\n\n╔═════◇\n║『𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗯𝘆 𝗦𝘂𝗯𝘀𝗰𝗿𝗶𝗯𝗶𝗻𝗴』\n║ youtube.com/@suhailtechinfo\n║ https://whatsapp.com/channel/0029Va9thusJP20yWxQ6N643\n╚════════════════════╝\n     ";
        try {
          const _0x259a9a = require("../lib/scraper");
          let _0x2e09b7 = await _0x259a9a.syncgit();
          if (
            _0x2e09b7.total !== 0 &&
            Config.HEROKU_APP_NAME &&
            Config.HEROKU_API_KEY
          ) {
            _0x553acf +=
              "╔═════◇                \n║ 『 𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 』\n║ _You Have New Update For Bot!_\n║ _Update Bot as Soon as Possible!_\n║ *To Update:-  _" +
              prefix +
              "Update start_*\n╚════════════════════╝\n     ";
          }
        } catch {}
        console.log(_0x553acf);
        let _0x3e37f9 = ["true", "log", "smd"];
        if (!_0x3e37f9.includes(Config.MsgsInLog)) {
          console.log = function () {};
        }
        await Void.sendMessage(
          _0x16a03e,
          {
            text: ("" + _0x553acf).trim(),
          },
          {
            disappearingMessagesInChat: true,
            ephemeralExpiration: 259200,
          }
        );
      }
      if (_0xead526 === "close") {
        let _0x5a1a0f = new Boom(_0x391783?.error)?.output.statusCode;
        if (_0x5a1a0f === DisconnectReason.badSession) {
          console.log("Bad Session File, Please Delete Session and Scan Again");
        } else if (_0x5a1a0f === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
        } else if (_0x5a1a0f === DisconnectReason.connectionLost) {
          console.log("Connection Lost from Server, reconnecting...");
          asta_thumb_func().catch((_0x230d2b) => console.log(_0x230d2b));
        } else if (_0x5a1a0f === DisconnectReason.connectionReplaced) {
          console.log(
            "Connection Replaced, Another New Session Opened, Please Close Current Session First"
          );
        } else if (_0x5a1a0f === DisconnectReason.loggedOut) {
          console.log("Device Logged Out, Please Scan Again And Run.");
          process.exit(1);
        } else if (_0x5a1a0f === DisconnectReason.restartRequired) {
          console.log("Restart Required, Restarting...");
          asta_thumb_func().catch((_0x3f58b7) => console.log(_0x3f58b7));
        } else if (_0x5a1a0f === DisconnectReason.timedOut) {
          console.log("Connection TimedOut, Reconnecting...");
        } else if (_0x5a1a0f === DisconnectReason.multideviceMismatch) {
          console.log("Multi device mismatch, please scan again");
          process.exit(0);
        } else {
          console.log(
            "Connection closed with bot. Please put New Session ID again."
          );
          console.log(_0x5a1a0f);
        }
      }
    });
    Void.ev.on("creds.update", _0x178db8);
    Void.send5ButImg = async (jid, text = "", footer = "", image, buttons = [], thumbnail, options = {}) => {
        let media = await prepareWAMessageMedia({ image, jpegThumbnail: thumbnail }, { upload: Void.waUploadToServer });
        var message = generateWAMessageFromContent(jid, proto.Message.fromObject({
          templateMessage: {
            hydratedTemplate: {
              imageMessage: media.imageMessage,
              hydratedContentText: text,
              hydratedFooterText: footer,
              hydratedButtons: buttons,
            },
          },
        }), options);
        Void.relayMessage(jid, message.message, { messageId: message.key.id });
       };
       
       Void.sendButtonText = (jid, buttons = [], text, footer, quoted = "", options = {}) => {
        let buttonMessage = {
          text,
          footer,
          buttons,
          headerType: 2,
          ...options,
        };
        Void.sendMessage(jid, buttonMessage, { quoted, ...options });
       };
       
       Void.sendText = (jid, text, quoted = "", options) =>
        Void.sendMessage(jid, { text, ...options }, { quoted });
       
       Void.sendImage = async (jid, path, caption = "", quoted = "", options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        return await Void.sendMessage(jid, { image: buffer, caption, ...options }, { quoted });
       };
Void.sendTextWithMentions = async (
      _0x580b81,
      _0x52578b,
      _0x77c722,
      _0x567445 = {}
    ) =>
      Void.sendMessage(
        _0x580b81,
        {
          text: _0x52578b,
          contextInfo: {
            mentionedJid: [..._0x52578b.matchAll(/@(\d{0,16})/g)].map(
              (_0x5005cc) => _0x5005cc[1] + "@s.whatsapp.net"
            ),
          },
          ..._0x567445,
        },
        {
          quoted: _0x77c722,
        }
      );
    Void.sendImageAsSticker = async (_0x166a58, _0x39a07c, _0x29fc74 = {}) => {
      let _0x9ca248;
      if (_0x29fc74 && (_0x29fc74.packname || _0x29fc74.author)) {
        _0x9ca248 = await writeExifImg(_0x39a07c, _0x29fc74);
      } else {
        _0x9ca248 = await imageToWebp(_0x39a07c);
      }
      await Void.sendMessage(
        _0x166a58,
        {
          sticker: {
            url: _0x9ca248,
          },
          ..._0x29fc74,
        },
        _0x29fc74
      );
    };
    Void.sendVideoAsSticker = async (_0x3a308a, _0x4fffd1, _0x1a4dd2 = {}) => {
      let _0x265b96;
      if (_0x1a4dd2 && (_0x1a4dd2.packname || _0x1a4dd2.author)) {
        _0x265b96 = await writeExifVid(_0x4fffd1, _0x1a4dd2);
      } else {
        _0x265b96 = await videoToWebp(_0x4fffd1);
      }
      await Void.sendMessage(
        _0x3a308a,
        {
          sticker: {
            url: _0x265b96,
          },
          ..._0x1a4dd2,
        },
        _0x1a4dd2
      );
    };
    Void.sendMedia = async (
      _0x5b2da1,
      _0x916127,
      _0x3dcd26 = "",
      _0x3cb43d = "",
      _0x2445e8 = "",
      _0x2f2dad = {}
    ) => {
      let _0x1322ee = await Void.getFile(_0x916127, true);
      let {
        mime: _0x137fff,
        ext: _0xbbf55d,
        res: _0x229ae0,
        data: _0x5c36d9,
        filename: _0x487ebd,
      } = _0x1322ee;
      if ((_0x229ae0 && _0x229ae0.status !== 200) || file.length <= 65536) {
        try {
          throw {
            json: JSON.parse(file.toString()),
          };
        } catch (_0x7a3aab) {
          if (_0x7a3aab.json) {
            throw _0x7a3aab.json;
          }
        }
      }
      let _0x450891 = "";
      let _0x4c3101 = _0x137fff;
      let _0x2f76ea = _0x487ebd;
      if (_0x2f2dad.asDocument) {
        _0x450891 = "document";
      }
      if (_0x2f2dad.asSticker || /webp/.test(_0x137fff)) {
        let { writeExif: _0x47d19b } = require("./exif");
        let _0x4aa19d = {
          mimetype: _0x137fff,
          data: _0x5c36d9,
        };
        _0x2f76ea = await _0x47d19b(_0x4aa19d, {
          packname: _0x2f2dad.packname ? _0x2f2dad.packname : Config.packname,
          author: _0x2f2dad.author ? _0x2f2dad.author : Config.author,
          categories: _0x2f2dad.categories ? _0x2f2dad.categories : [],
        });
        await fs.promises.unlink(_0x487ebd);
        _0x450891 = "sticker";
        _0x4c3101 = "image/webp";
      } else if (/image/.test(_0x137fff)) {
        _0x450891 = "image";
      } else if (/video/.test(_0x137fff)) {
        _0x450891 = "video";
      } else if (/audio/.test(_0x137fff)) {
        _0x450891 = "audio";
      } else {
        _0x450891 = "document";
      }
      await Void.sendMessage(
        _0x5b2da1,
        {
          [_0x450891]: {
            url: _0x2f76ea,
          },
          caption: _0x3cb43d,
          mimetype: _0x4c3101,
          fileName: _0x3dcd26,
          ..._0x2f2dad,
        },
        {
          quoted: _0x2445e8,
          ..._0x2f2dad,
        }
      );
      return fs.promises.unlink(_0x2f76ea);
    };
    Void.downloadAndSaveMediaMessage = async (
      _0x54eddc,
      _0x5b6451 = "null",
      _0x9b5dfe = true
    ) => {
      let _0x3c676f = _0x54eddc.msg ? _0x54eddc.msg : _0x54eddc;
      let _0x47fa26 = (_0x54eddc.msg || _0x54eddc).mimetype || "";
      let _0x16cef4 = _0x54eddc.mtype
        ? _0x54eddc.mtype.replace(/Message/gi, "")
        : _0x47fa26.split("/")[0];
      const _0x3d73a2 = await downloadContentFromMessage(_0x3c676f, _0x16cef4);
      let _0x5ba642 = Buffer.from([]);
      for await (const _0x3885af of _0x3d73a2) {
        _0x5ba642 = Buffer.concat([_0x5ba642, _0x3885af]);
      }
      let _0xd165bb = await FileType.fromBuffer(_0x5ba642);
      let _0x2d9918 = "./temp/" + _0x5b6451 + "." + _0xd165bb.ext;
      await fs.writeFileSync(_0x2d9918, _0x5ba642);
      return _0x2d9918;
    };
    Void.forward = async (
      _0x41e49d,
      _0x2c3f88,
      _0x5377d0,
      _0x10204d,
      _0x598b4e = true
    ) => {
      let _0x106c93 = _0x2c3f88.mtype;
      let _0x239b4e = {};
      console.log("Forward function Called and Type is : ", _0x106c93);
      if (_0x106c93 == "conversation") {
        _0x239b4e = {
          text: _0x2c3f88.text,
          contextInfo: _0x5377d0,
        };
        for (let _0x3f4fef of parsedJid(_0x41e49d)) {
          await Void.sendMessage(_0x3f4fef, _0x239b4e, {
            quoted: _0x10204d,
          });
        }
        return;
      }
      const _0xc2fc5e = (_0x7b8104) => {
        return "" + Math.floor(Math.random() * 10000) + _0x7b8104;
      };
      let _0x12e4e8 = _0x2c3f88.msg ? _0x2c3f88.msg : _0x2c3f88;
      let _0x2f714b = (_0x2c3f88.msg || _0x2c3f88).mimetype || "";
      let _0x5209d3 = _0x2c3f88.mtype
        ? _0x2c3f88.mtype.replace(/Message/gi, "")
        : _0x2f714b.split("/")[0];
      const _0x16da41 = await downloadContentFromMessage(_0x12e4e8, _0x5209d3);
      let _0x370f19 = Buffer.from([]);
      for await (const _0x349387 of _0x16da41) {
        _0x370f19 = Buffer.concat([_0x370f19, _0x349387]);
      }
      let _0x4a8f24 = await FileType.fromBuffer(_0x370f19);
      let _0x2a6898 = await _0xc2fc5e(_0x4a8f24.ext);
      let _0x1dc948 = "./temp/" + _0x2a6898;
      await fs.writeFileSync(_0x1dc948, _0x370f19);
      if (_0x106c93 == "videoMessage") {
        _0x239b4e = {
          video: fs.readFileSync(_0x1dc948),
          mimetype: _0x2c3f88.mimetype,
          caption: _0x2c3f88.text,
          contextInfo: _0x5377d0,
        };
      } else if (_0x106c93 == "imageMessage") {
        _0x239b4e = {
          image: fs.readFileSync(_0x1dc948),
          mimetype: _0x2c3f88.mimetype,
          caption: _0x2c3f88.text,
          contextInfo: _0x5377d0,
        };
      } else if (_0x106c93 == "audioMessage") {
        _0x239b4e = {
          audio: fs.readFileSync(_0x1dc948),
          mimetype: _0x2c3f88.mimetype,
          seconds: 200001355,
          ptt: true,
          contextInfo: _0x5377d0,
        };
      } else if (
        _0x106c93 == "documentWithCaptionMessage" ||
        _0x4a8f24 == "documentMessage"
      ) {
        _0x239b4e = {
          document: fs.readFileSync(_0x1dc948),
          mimetype: _0x2c3f88.mimetype,
          caption: _0x2c3f88.text,
          contextInfo: _0x5377d0,
        };
      } else {
        fs.unlink(_0x1dc948, (_0x3ffbab) => {
          if (_0x3ffbab) {
            console.error("Error deleting file:", _0x3ffbab);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      for (let _0x1ae2cd of parsedJid(_0x41e49d)) {
        try {
          await Void.sendMessage(_0x1ae2cd, _0x239b4e, {
            quoted: _0x10204d,
          });
        } catch (_0x5bd0ff) {}
      }
      return fs.unlink(_0x1dc948, (_0x36d1ff) => {
        if (_0x36d1ff) {
          console.error("Error deleting file:", _0x36d1ff);
        } else {
          console.log("File deleted successfully");
        }
      });
    };
    Void.downloadMediaMessage = async (_0x9b3727) => {
      let _0x63a752 = _0x9b3727.msg ? _0x9b3727.msg : _0x9b3727;
      let _0x43c2a3 = (_0x9b3727.msg || _0x9b3727).mimetype || "";
      let _0x3e1f16 = _0x9b3727.mtype
        ? _0x9b3727.mtype.replace(/Message/gi, "")
        : _0x43c2a3.split("/")[0];
      const _0x5c361d = await downloadContentFromMessage(_0x63a752, _0x3e1f16);
      let _0x3643fa = Buffer.from([]);
      for await (const _0x4613c9 of _0x5c361d) {
        _0x3643fa = Buffer.concat([_0x3643fa, _0x4613c9]);
      }
      return _0x3643fa;
    };
    Void.forwardOrBroadCast2 = async (
      _0x1c2143,
      _0x2aa761,
      _0x305dac = {},
      _0x5f3913 = ""
    ) => {
      try {
        let _0xc87148 = _0x2aa761.mtype;
        if (_0xc87148 === "videoMessage" && _0x5f3913 === "ptv") {
          _0x2aa761 = {
            ptvMessage: {
              ..._0x2aa761.msg,
            },
          };
        }
        let _0xf9fc61 = {
          ..._0x305dac,
          contextInfo: {
            ...(_0x305dac.contextInfo ? _0x305dac.contextInfo : {}),
            ...(_0x305dac.linkPreview
              ? {
                  linkPreview: {
                    ..._0x305dac.linkPreview,
                  },
                }
              : {}),
            ...(_0x305dac.quoted && _0x305dac.quoted.message
              ? {
                  quotedMessage: {
                    ...(_0x305dac.quoted?.message || {}),
                  },
                }
              : {}),
          },
        };
        console.log("\n\nopts : ", _0xf9fc61, "\n\n");
        var _0x43a89d = _0x2aa761.message ? _0x2aa761.message : _0x2aa761;
        let _0x85454b = _0xc87148 ? _0xc87148 : Object.keys(_0x43a89d)[0];
        _0x43a89d = {
          ..._0xf9fc61,
          ..._0x43a89d,
        };
        const _0x12c380 = await generateWAMessageFromContent(
          _0x1c2143,
          _0x43a89d,
          _0x305dac
            ? {
                ...(_0x85454b == "conversation"
                  ? {
                      conversation: _0x43a89d[_0x85454b],
                    }
                  : _0x43a89d[_0x85454b]),
                ..._0xf9fc61,
                contextInfo: {
                  ...(_0x43a89d[_0x85454b]?.contextInfo || {}),
                  ..._0xf9fc61.contextInfo,
                },
              }
            : {}
        );
        await Void.relayMessage(_0x1c2143, _0x12c380.message, {
          messageId: _0x12c380.key.id,
        });
        console.log("\n\n waMessage : ", _0x12c380, "\n\n");
        return _0x12c380;
      } catch {}
    };
    Void.forwardOrBroadCast = async (
      _0x24fe5e,
      _0x4db435,
      _0x15f8ff = {},
      _0xbafa8 = ""
    ) => {
      let _0x496679 = _0x4db435.mtype;
      if (_0x496679 === "videoMessage" && _0xbafa8 === "ptv") {
        _0x4db435 = {
          ptvMessage: {
            ..._0x4db435.msg,
          },
        };
      }
      let _0x3bc662 = {
        ..._0x15f8ff,
      };
      _0x15f8ff.contextInfo =
        {
          ..._0x15f8ff.contextInfo,
        } || {};
      let _0x104ff7 = {
        ..._0x15f8ff,
      };
      var _0x4fb9a0 = _0x4db435.message ? _0x4db435.message : _0x4db435;
      let _0x2c6803 = _0x496679 ? _0x496679 : Object.keys(_0x4fb9a0)[0];
      console.log("template: ", _0x4fb9a0);
      const _0x356b9d = await generateWAMessageFromContent(
        _0x24fe5e,
        _0x4fb9a0,
        _0x15f8ff
          ? {
              ..._0x4fb9a0[_0x2c6803],
              ..._0x15f8ff,
              ...(_0x15f8ff.contextInfo
                ? {
                    contextInfo: {
                      ..._0x4fb9a0[_0x2c6803].contextInfo,
                      ..._0x15f8ff.contextInfo,
                      ...(_0x15f8ff.quoted
                        ? {
                            quotedMessage: {
                              ..._0x15f8ff.quoted,
                            },
                          }
                        : {}),
                    },
                  }
                : {}),
            }
          : {}
      );
      await Void.relayMessage(_0x24fe5e, _0x356b9d.message, {
        messageId: _0x356b9d.key.id,
      });
      return _0x356b9d;
    };
    Void.copyNForward = async (
      _0x220577,
      _0x3beeaa,
      _0x31f95b = false,
      _0x3be747 = {}
    ) => {
      let _0x280c6b;
      if (_0x3be747.readViewOnce) {
        _0x3beeaa.message =
          _0x3beeaa.message &&
          _0x3beeaa.message.ephemeralMessage &&
          _0x3beeaa.message.ephemeralMessage.message
            ? _0x3beeaa.message.ephemeralMessage.message
            : _0x3beeaa.message || undefined;
        _0x280c6b = Object.keys(_0x3beeaa.message.viewOnceMessage.message)[0];
        delete (_0x3beeaa.message && _0x3beeaa.message.ignore
          ? _0x3beeaa.message.ignore
          : _0x3beeaa.message || undefined);
        delete _0x3beeaa.message.viewOnceMessage.message[_0x280c6b].viewOnce;
        _0x3beeaa.message = {
          ..._0x3beeaa.message.viewOnceMessage.message,
        };
      }
      let _0x26ba6a = Object.keys(_0x3beeaa.message)[0];
      let _0x3dd92b = await generateForwardMessageContent(_0x3beeaa, _0x31f95b);
      let _0x315f5a = Object.keys(_0x3dd92b)[0];
      let _0x52825e = {};
      if (_0x26ba6a != "conversation") {
        _0x52825e = _0x3beeaa.message[_0x26ba6a].contextInfo;
      }
      _0x3dd92b[_0x315f5a].contextInfo = {
        ..._0x52825e,
        ..._0x3dd92b[_0x315f5a].contextInfo,
      };
      const _0x2fd89e = await generateWAMessageFromContent(
        _0x220577,
        _0x3dd92b,
        _0x3be747
          ? {
              ..._0x3dd92b[_0x315f5a],
              ..._0x3be747,
              ...(_0x3be747.contextInfo
                ? {
                    contextInfo: {
                      ..._0x3dd92b[_0x315f5a].contextInfo,
                      ..._0x3be747.contextInfo,
                    },
                  }
                : {}),
            }
          : {}
      );
      await Void.relayMessage(_0x220577, _0x2fd89e.message, {
        messageId: _0x2fd89e.key.id,
      });
      return _0x2fd89e;
    };
    Void.sendFileUrl = async (
      _0x486113,
      _0x40b88e,
      _0x5098b7 = "",
      _0x36a347 = "",
      _0x358ed0 = {
        author: "Asta-Md",
      },
      _0x57c245 = ""
    ) => {
      try {
        let _0x4d6d53 = await axios.head(_0x40b88e);
        let _0x325b4a = _0x4d6d53?.headers["content-type"] || "";
        let _0x1807c4 = _0x325b4a.split("/")[0];
        let _0x2a7850 = false;
        if (_0x325b4a.split("/")[1] === "gif" || _0x57c245 === "gif") {
          _0x2a7850 = {
            video: {
              url: _0x40b88e,
            },
            caption: _0x5098b7,
            gifPlayback: true,
            ..._0x358ed0,
          };
        } else if (
          _0x325b4a.split("/")[1] === "webp" ||
          _0x57c245 === "sticker"
        ) {
          _0x2a7850 = {
            sticker: {
              url: _0x40b88e,
            },
            ..._0x358ed0,
          };
        } else if (_0x1807c4 === "image" || _0x57c245 === "image") {
          _0x2a7850 = {
            image: {
              url: _0x40b88e,
            },
            caption: _0x5098b7,
            ..._0x358ed0,
            mimetype: "image/jpeg",
          };
        } else if (_0x1807c4 === "video" || _0x57c245 === "video") {
          _0x2a7850 = {
            video: {
              url: _0x40b88e,
            },
            caption: _0x5098b7,
            mimetype: "video/mp4",
            ..._0x358ed0,
          };
        } else if (_0x1807c4 === "audio" || _0x57c245 === "audio") {
          _0x2a7850 = {
            audio: {
              url: _0x40b88e,
            },
            mimetype: "audio/mpeg",
            ..._0x358ed0,
          };
        } else if (_0x325b4a == "application/pdf") {
          _0x2a7850 = {
            document: {
              url: _0x40b88e,
            },
            mimetype: "application/pdf",
            caption: _0x5098b7,
            ..._0x358ed0,
          };
        }
        if (_0x2a7850) {
          try {
            return await Void.sendMessage(_0x486113, _0x2a7850, {
              quoted: _0x36a347,
            });
          } catch {}
        }
        let _0x932faa =
          _0x4d6d53?.headers["content-disposition"]
            ?.split('="')[1]
            ?.split('"')[0] || "";
        if (_0x932faa) {
          const _0x1d8bc0 = [".jpg", ".jpeg", ".png"];
          const _0x766114 = [
            ".mp4",
            ".avi",
            ".mov",
            ".mkv",
            ".gif",
            ".m4v",
            ".webp",
          ];
          var _0x196452 =
            _0x932faa.substring(_0x932faa.lastIndexOf("."))?.toLowerCase() ||
            "nillll";
          var _0x1be1bc;
          if (_0x1d8bc0.includes(_0x196452)) {
            _0x1be1bc = "image/jpeg";
          } else if (_0x766114.includes(_0x196452)) {
            _0x1be1bc = "video/mp4";
          }
          _0x325b4a = _0x1be1bc ? _0x1be1bc : _0x325b4a;
        }
        let _0x44bb77 = {
          fileName: _0x932faa ? _0x932faa : "file",
          caption: _0x5098b7,
          ..._0x358ed0,
          mimetype: _0x325b4a,
        };
        return Void.sendMessage(
          _0x486113,
          {
            document: {
              url: _0x40b88e,
            },
            ..._0x44bb77,
          },
          {
            quoted: _0x36a347,
          }
        );
      } catch (_0x5c19f5) {
        console.log("Erorr in client.sendFileUrl() : ", _0x5c19f5);
        return;
      }
    };
    Void.sendFromUrl = Void.sendFileUrl;
    const _0x46edc = {};
    let _0x52cca7 = [];
    Void.sendUi = async (
      _0x33d5e5,
      _0x3e3da = {},
      _0x385b69 = "",
      _0x1609b4 = "",
      _0x34cd1c = ""
    ) => {
      let _0x44b77c = {};
      try {
        const _0x1a5ad9 = /(https?:\/\/\S+)/gi;
        const _0x1652e1 = [".jpg", ".jpeg", ".png"];
        const _0x255cf9 = [
          ".mp4",
          ".avi",
          ".mov",
          ".mkv",
          ".gif",
          ".m4v",
          ".webp",
        ];
        let _0x4f7fcc = (video = false);
        if (!_0x52cca7 || !_0x52cca7[0]) {
          _0x52cca7 = Config.userImages
            ? Config.userImages.split(",")
            : [await botpic()];
          _0x52cca7 = _0x52cca7.filter((_0xbd8a60) => _0xbd8a60.trim() !== "");
        }
        let _0x30b0f6 =
          _0x1609b4 && _0x34cd1c
            ? _0x34cd1c
            : _0x52cca7[Math.floor(Math.random() * _0x52cca7.length)];
        if (!_0x46edc[_0x30b0f6]) {
          const _0x594036 = _0x30b0f6
            .substring(_0x30b0f6.lastIndexOf("."))
            .toLowerCase();
          if (_0x1652e1.includes(_0x594036)) {
            _0x4f7fcc = true;
          }
          if (_0x255cf9.includes(_0x594036)) {
            video = true;
          }
          _0x46edc[_0x30b0f6] = {
            image: _0x4f7fcc,
            video: video,
          };
        }
        _0x385b69 =
          _0x385b69 && _0x385b69.quoted?.key
            ? _0x385b69.quoted
            : _0x385b69 || "";
        let _0x538a48;
        let _0x4b1623;
        if (
          (!_0x34cd1c && Config.userImages === "text") ||
          _0x1609b4 == "text"
        ) {
          _0x538a48 = {
            text: _0x3e3da.caption,
            ..._0x3e3da,
          };
        } else if (_0x1609b4 == "image" || _0x46edc[_0x30b0f6]?.image) {
          _0x538a48 = {
            image: {
              url: _0x30b0f6,
            },
            ..._0x3e3da,
            mimetype: "image/jpeg",
          };
          _0x4b1623 = await getBuffer(_0x30b0f6);
        } else if (_0x1609b4 == "video" || _0x46edc[_0x30b0f6]?.video) {
          _0x538a48 = {
            video: {
              url: _0x30b0f6,
            },
            ..._0x3e3da,
            mimetype: "video/mp4",
            gifPlayback: true,
            height: 274,
            width: 540,
          };
        }
        _0x44b77c = {
          ...(await Void.contextInfo(
            "𝗦𝗨𝗛𝗔𝗜𝗟-𝗠𝗗",
            Config.ownername,
            _0x4b1623 ? _0x4b1623 : log0
          )),
        };
        if (_0x538a48) {
          return Void.sendMessage(
            _0x33d5e5,
            {
              contextInfo: _0x44b77c,
              ..._0x538a48,
            },
            {
              quoted: _0x385b69,
            }
          );
        }
      } catch (_0x3ae4ae) {
        console.log("erorr in userImages() : ", _0x3ae4ae);
      }
      try {
        return Void.sendMessage(_0x33d5e5, {
          image: {
            url: await botpic(),
          },
          contextInfo: _0x44b77c,
          ..._0x3e3da,
        });
      } catch {
        return Void.sendMessage(_0x33d5e5, {
          text: _0x3e3da.caption,
          contextInfo: _0x44b77c,
          ..._0x3e3da,
        });
      }
    };
    Void.contextInfo = async (
        title = "𝗔𝗦𝗧𝗔-𝗠𝗗",
        body = "𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗕𝗢𝗧",
        thumbnail = log0,
        mediaType = 1,
        url = gurl,
        style = false
       ) => {
        try {
          let externalStyle = style ? style : Config.style;
          if (externalStyle >= 2) {
            return {
              forwardingScore: 999,
              isForwarded: true,
              externalAdReply: {
                title,
                body,
                renderLargerThumbnail: true,
                thumbnail,
                mediaType: mediaType || 1,
                mediaUrl: "",
                sourceUrl: url,
              },
            };
          } else if (externalStyle == 1) {
            return {
              isForwarded: true,
              externalAdReply: {
                title,
                body,
                thumbnail,
                mediaType: 1,
                mediaUrl: url,
                sourceUrl: url,
              },
            };
          } else {
            return {};
          }
        } catch (error) {
          console.log("error in client.contextInfo() : ", error);
          return {};
        }
       };
       
       Void.cMod = (jid, message, text = "", sender = Void.user.id, options = {}) => {
        let type = Object.keys(message.message)[0];
        let isEphemeralMsg = type === "ephemeralMessage";
        if (isEphemeralMsg) {
          type = Object.keys(message.message.ephemeralMessage.message)[0];
        }
        let content = isEphemeralMsg ? message.message.ephemeralMessage.message : message.message;
        let data = content[type];
        if (typeof data === "string") {
          content[type] = text || data;
        } else if (data.caption) {
          data.caption = text || data.caption;
        } else if (data.text) {
          data.text = text || data.text;
        }
        if (typeof data !== "string") {
          content[type] = {
            ...data,
            ...options,
          };
        }
        if (message.key.participant) {
          sender = message.key.participant = sender || message.key.participant;
        } else if (message.key.participant) {
          sender = message.key.participant = sender || message.key.participant;
        }
        if (message.key.remoteJid.includes("@s.whatsapp.net")) {
          sender = sender || message.key.remoteJid;
        } else if (message.key.remoteJid.includes("@broadcast")) {
          sender = sender || message.key.remoteJid;
        }
        message.key.remoteJid = jid;
        message.key.fromMe = sender === Void.user.id;
        return proto.WebMessageInfo.fromObject(message);
       };
       
       Void.getFile = async (path, saveToFile) => {
        let res;
        let buffer = Buffer.isBuffer(path)
          ? path
          : /^data:.*?\/.*?;base64,/i.test(path)
          ? Buffer.from(path.split`,`[1], "base64")
          : /^https?:\/\//.test(path)
          ? await (res = await getBuffer(path))
          : fs.existsSync(path)
          ? (filePath = path, fs.readFileSync(path))
          : typeof path === "string"
          ? path
          : Buffer.alloc(0);
       
        let type = (await FileType.fromBuffer(buffer)) || {
          mime: "application/octet-stream",
          ext: ".bin",
        };
        let filePath = "./temp/null." + type.ext;
        if (buffer && saveToFile) {
          fs.promises.writeFile(filePath, buffer);
        }
        return {
          res,
          filename: filePath,
          size: await getSizeMedia(buffer),
          ...type,
          data: buffer,
        };
       };
       
       Void.sendFile = async (jid, path, filename, quoted = { quoted: "" }, options = {}) => {
        let file = await Void.getFile(path, true);
        let { filename: realFilename, size, ext, mime, data } = file;
        let type = "";
        let mimeType = mime;
        let pathFile = realFilename;
       
        if (options.asDocument) {
          type = "document";
        }
        if (options.asSticker || /webp/.test(mime)) {
          let { writeExif } = require("./exif.js");
          let media = { mimetype: mime, data };
          pathFile = await writeExif(media, {
            packname: Config.packname,
            author: Config.packname,
            categories: options.categories ? options.categories : [],
          });
          await fs.promises.unlink(realFilename);
          type = "sticker";
          mimeType = "image/webp";
        } else if (/image/.test(mime)) {
          type = "image";
        } else if (/video/.test(mime)) {
          type = "video";
        } else if (/audio/.test(mime)) {
          type = "audio";
        } else {
          type = "document";
        }
       
        await Void.sendMessage(
          jid,
          {
            [type]: { url: pathFile },
            mimetype: mimeType,
            fileName: filename,
            ...options,
          },
          {
            quoted: "",
            ...quoted,
          }
        );
       
        return fs.promises.unlink(pathFile);
       };
       
       Void.fakeMessage = async (type = "order", options = {}, text = "➬ Asta SER") => {
        const orderIds = [777, 0, 100, 500, 1000, 999, 2021];
        let message = {
          id: "Asta_Md",
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
          ...options,
        };
        let content = {};
       
        if (type == "text" || type == "conservation") {
          content = {
            conversation: text,
          };
        } else if (type == "order") {
          content = {
            orderMessage: {
              itemCount: orderIds[Math.floor(Math.random() * 8)],
              status: 1,
              surface: 1,
              message: "❏ " + Config.botname + " " + text,
              orderTitle: "live",
              sellerJid: "2348039607375@s.whatsapp.net",
            },
          };
        } else if (type == "contact") {
          content = {
            contactMessage: {
              displayName: "" + text,
            },
          };
        }
       
        return {
          key: {
            ...message,
          },
          message: {
            ...content,
          },
        };
       };
       
       Void.parseMention = async (text) => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net");
       };
       Void.awaitForMessage = async (_0x3f601c = {}) => {
        return new Promise((_0x42ef72, _0x15fbb5) => {
          if (typeof _0x3f601c !== "object") {
            _0x15fbb5(new Error("Options must be an object"));
          }
          if (typeof _0x3f601c.sender !== "string") {
            _0x15fbb5(new Error("Sender must be a string"));
          }
          if (typeof _0x3f601c.remoteJid !== "string") {
            _0x15fbb5(new Error("ChatJid must be a string"));
          }
          if (_0x3f601c.timeout && typeof _0x3f601c.timeout !== "number") {
            _0x15fbb5(new Error("Timeout must be a number"));
          }
          if (_0x3f601c.filter && typeof _0x3f601c.filter !== "function") {
            _0x15fbb5(new Error("Filter must be a function"));
          }
          const _0x358393 = _0x3f601c?.timeout || undefined;
          const _0x1919d8 = _0x3f601c?.filter || (() => true);
          let _0x112e7d = undefined;
          let _0x4fedac = _0x54d8e0 => {
            let {
              type: _0x4bad66,
              messages: _0x5bf6f0
            } = _0x54d8e0;
            if (_0x4bad66 == "notify") {
              for (let _0xa0c0c6 of _0x5bf6f0) {
                const _0x3f5f64 = _0xa0c0c6.key.fromMe;
                const _0x43fd3f = _0xa0c0c6.key.remoteJid;
                const _0x36ea4b = _0x43fd3f.endsWith("@g.us");
                const _0x27529b = _0x43fd3f == "status@broadcast";
                const _0x5447cd = _0x5447f8.decodeJid(_0x3f5f64 ? _0x5447f8.user.id : _0x36ea4b || _0x27529b ? _0xa0c0c6.key.participant : _0x43fd3f);
                if (_0x5447cd == _0x3f601c.sender && _0x43fd3f == _0x3f601c.remoteJid && _0x1919d8(_0xa0c0c6)) {
                  _0x5447f8.ev.off("messages.upsert", _0x4fedac);
                  clearTimeout(_0x112e7d);
                  _0x42ef72(_0xa0c0c6);
                }
              }
            }
          };
          _0x5447f8.ev.on("messages.upsert", _0x4fedac);
          if (_0x358393) {
            _0x112e7d = setTimeout(() => {
              _0x5447f8.ev.off("messages.upsert", _0x4fedac);
              _0x15fbb5(new Error("Timeout"));
            }, _0x358393);
          }
        });
      };
    return Void;
  }
  asta_thumb_func().catch((_0x200ba4) => console.log(_0x200ba4));
  const _0x1ec2af =
    '\n     <!DOCTYPE html>\n     <html>\n       <head>\n         <title>Asta-Md</title>\n         <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>\n         <script>\n           setTimeout(() => {\n             confetti({\n               particleCount: 100,\n               spread: 70,\n               origin: { y: 0.6 },\n               disableForReducedMotion: true\n             });\n           }, 500);\n         </script>\n         <style>\n           @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");\n           @font-face {\n             font-family: "neo-sans";\n             src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");\n             font-style: normal;\n             font-weight: 700;\n           }\n           html {\n             font-family: neo-sans;\n             font-weight: 700;\n             font-size: calc(62rem / 16);\n           }\n           body {\n             background: white;\n           }\n           section {\n             border-radius: 1em;\n             padding: 1em;\n             position: absolute;\n             top: 50%;\n             left: 50%;\n             margin-right: -50%;\n             transform: translate(-50%, -50%);\n           }\n         </style>\n       </head>\n       <body>\n         <section>\n           Hello from "Asta Tech Info"!\n         </section>\n       </body> \n     </html>\n     ';
  try {
    app.get("/", (_0x5da902, _0x858c97) =>
      _0x858c97.type("html").send(_0x1ec2af)
    );
    let app_url_asta = global.port
      ? global.port
      : Math.floor(Math.random() * 9000) + 1000;
    app.listen(app_url_asta, () => console.log("Asta-Md Server listening..."));
  } catch (_0x198314) {
    console.log("Server conncting error : ", _0x198314);
  }
}, 8000);
function atob(_0xf38f71) {
  return Buffer.from(_0xf38f71, "base64").toString("binary");
}
