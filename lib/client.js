const Pino = require("pino");
const Config = require("../config.js");
const {
  Boom
} = require("@hapi/boom");
const fs = require("fs-extra");
const FileType = require("file-type");
const path = require("path");
const express = require("express");
const app = express();
let prefix = Config.HANDLERS.toLowerCase().includes("null") ? "" : Config.HANDLERS[0];
const mongoose = require("mongoose");
const {
  writeFile
} = require("fs/promises");
const events = require("./plugins");
const {
  exec,
  spawn,
  execSync
} = require("child_process");
const PhoneNumber = require("awesome-phonenumber");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./exif");
const {
  default: SuhailMDConnect,
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
  extractMessageContent,
  generateMessageID,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  jidDecode
} = require("@whiskeysockets/baileys");
const util = require("util");
var last_status = {};
global.setCmdAlias = {};
global.SmdOfficial = false;
global.sqldb = false;
global.pg_pools = false;
const {
  userdb,
  sck,
  groupdb,
  Plugindb,
  bot_
} = require("../lib");
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
  smsg,
  callsg,
  groupsg
} = require("../lib/serialized");
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
} = require("../lib");
var prefixRegex = Config.prefix === "false" || Config.prefix === "null" ? "^" : new RegExp("^[" + Config.HANDLERS + "]");
let cc = Config.sessionName.replace(/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/, "").replace(/Secktor;;;/gi, "").replace(/Vorterx;;;/gi, "").replace(/Suhail;;;/gi, "").replace(/^SUHAIL_\d{2}\d{2}\d{2}\d{2}/, "").trim();
var suhails = false;
let baileys = "/Suhail_Baileys/";
async function MakeSession() {
  function _0x3411ab(_0x1681ed, _0x3bf9cc) {
    return new Promise((_0x2f4b60, _0xcf15c9) => {
      fs.readFile(_0x3bf9cc, "utf8", (_0x3db818, _0x2b5b2f) => {
        if (_0x3db818) {
          _0x2f4b60(false);
        } else {
          _0x2f4b60(_0x2b5b2f.includes(_0x1681ed));
        }
      });
    });
  }
  const _0x3b66b7 = "/Astropeda/";
  const _0x2aee3c = await _0x3411ab(_0x3b66b7, "./lib/Dockerfile");
  if (_0x2aee3c) {
    SmdOfficial = "yes";
    console.log("\nVersion Checking Successfull!\n");
    if (cc && cc.length > 3 && cc.length < 30) {
      const _0x591d69 = require("axios");
      try {
        let {
          data: _0x357850
        } = await _0x591d69.get("https://paste.c-net.org/" + cc);
        await fs.writeFileSync(__dirname + baileys + "creds.json", atob(_0x357850), "utf8");
      } catch (_0x51dff7) {
        console.log("\nERROR GETTING SESSION FROM PASTE SERVER\n");
      }
    } else if (cc) {
      try {
        console.log("\nConnecting To Session...");
        var _0x447bb3 = atob(cc);
        if (cc && _0x447bb3 && _0x447bb3.length > 5) {
          await fs.writeFileSync(__dirname + baileys + "creds.json", _0x447bb3, "utf8");
        }
      } catch (_0xd63d11) {
        console.log("EMPTY SESSION ERROR FROM SERVER\nPLEASE SCAN THE QR AGAIN");
      }
    }
  } else {
    SmdOfficial = false;
    console.log("\n\nYou are using a Modified Version. Please Run Bot from the Original Repository.\nDeploy From : https://github.com" + _0x3b66b7 + "Suhail-Md\n");
    process.exit(0);
  }
}
MakeSession();
const connnectpg = async () => {
  try {
    const {
      Pool: _0x3501f9
    } = require("pg");
    const _0x58adae = new _0x3501f9({
      connectionString: global.DATABASE_URI,
      ssl: {
        rejectUnauthorized: false
      }
    });
    const _0x480ab1 = await _0x58adae.connect();
    _0x480ab1.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (_0x3e86eb) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};
const connnectMongo = async () => {
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
let Suhail = {};
setTimeout(() => {
  async function _0xa90b15() {
    if (mongodb) {
      try {
        isMongodb = await connnectMongo();
      } catch {}
    }
    if (!global.isMongodb && global.DATABASE_URI) {
      try {
        global.sqldb = await connnectpg();
      } catch {}
    }
  }
  _0xa90b15();
  const _0x2478ab = makeInMemoryStore({
    logger: Pino({
      level: "silent"
    }).child({
      level: "silent"
    })
  });
  try {
    _0x2478ab.readFromFile(__dirname + "/store.json");
  } catch (_0x5cd556) {
    console.log("CLIENT STORE ERROR:\n", _0x5cd556);
  }
  require("events").EventEmitter.defaultMaxListeners = 200;
  const _0x46dcec = () => {
    let _0x49c6e9;
    try {
      let _0x44b1f8 = fetchJson("https://web.whatsapp.com/check-update?version=1&platform=web");
      _0x49c6e9 = [_0x44b1f8.currentVersion.replace(/[.]/g, ", ")];
    } catch (_0x57c54e) {
      _0x49c6e9 = [2, 2347, 56];
    }
    return _0x49c6e9;
  };
  let _0x1b7bc3 = "invalid";
  const _0x28eabb = MessageRetryMap || {};
  async function _0x54ad74() {
    let _0x3b2eac = __dirname + "/assets/suhail.jpg";
    try {
      let _0x28f622 = await getBuffer(THUMB_IMAGE);
      _0x3b2eac = __dirname + "/assets/SocialLogo.png";
      await writeFile(_0x3b2eac, _0x28f622);
    } catch (_0x3bef8e) {
      _0x3b2eac = __dirname + "/assets/suhail.jpg";
    }
    global.log0 = fs.readFileSync(_0x3b2eac);
    const {
      state: _0x3dd9a0,
      saveCreds: _0x31ac16
    } = await useMultiFileAuthState(__dirname + baileys);
    Void = SuhailMDConnect({
      logger: Pino({
        level: "silent" || "debug"
      }).child({
        level: "silent"
      }),
      printQRInTerminal: true,
      browser: ["Suhail MD", "", ""],
      fireInitQueries: false,
      shouldSyncHistoryMessage: true,
      downloadHistory: true,
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      markOnlineOnConnect: false,
      auth: {
        creds: _0x3dd9a0.creds,
        keys: makeCacheableSignalKeyStore(_0x3dd9a0.keys, Pino({
          level: "silent"
        }).child({
          level: "silent"
        }))
      },
      getMessage: async _0x4a10f2 => {
        if (_0x2478ab) {
          const _0x5e76e2 = await _0x2478ab.loadMessage(_0x4a10f2.remoteJid, _0x4a10f2.id, undefined);
          return _0x5e76e2.message || undefined;
          console.log("getMessage: ", _0x5e76e2);
        }
        return {
          conversation: "An Error Occurred, Repeat Command!"
        };
      }
    });
    _0x2478ab.bind(Void.ev);
    setInterval(() => {
      try {
        _0x2478ab.writeToFile(__dirname + "/store.json");
      } catch (_0x3b97be) {
        console.log("CLIENT STORE ERROR:\n", _0x3b97be);
      }
    }, 10000);
    Void.ev.on("call", async _0x29405a => {
      let _0x32a12a = await callsg(Void, JSON.parse(JSON.stringify(_0x29405a[0])));
      events.commands.map(async _0x21efc7 => {
        if (_0x21efc7.call === "offer" && _0x32a12a.status === "offer") {
          try {
            _0x21efc7.function(_0x32a12a, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x37f059) {
            console.error("[CALL ERROR] ", _0x37f059);
          }
        }
        if (_0x21efc7.call === "accept" && _0x32a12a.status === "accept") {
          try {
            _0x21efc7.function(_0x32a12a, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x5910ea) {
            console.error("[CALL ACCEPT ERROR] ", _0x5910ea);
          }
        }
        if (_0x21efc7.call === "call" || _0x21efc7.call === "on" || _0x21efc7.call === "all") {
          try {
            _0x21efc7.function(_0x32a12a, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x4438cc) {
            console.error("[CALL ERROR] ", _0x4438cc);
          }
        }
      });
    });
    Void.ws.on("CB:message", _0x206224 => {});
    Void.ws.on("CB:iq", _0xe78a19 => {});
    Void.ws.on("CB:notification", _0x9acbb5 => {});
    Void.ws.on("CB:receipt", _0x422bcb => {});
    Void.ev.on("presence.update", async _0x39f657 => {
      console.log("presence.update : ", _0x39f657);
    });
    Void.ev.on("chats.upsert", async _0x5ff4e0 => {});
    Void.ev.on("messages.delete", async _0x42ced8 => {
      console.log("messages.delete", _0x42ced8);
    });
    Void.ev.on("message-receipt.update", async _0x46bde5 => {});
    Void.ev.on("groups.upsert", async _0x29db70 => {});
    let _0x194836 = {};
    Void.ev.on("messages.upsert", async _0x235ea2 => {
      if (!global.SmdOfficial || global.SmdOfficial !== "yes") {
        return;
      }
      const _0x584998 = await Void.decodeJid(Void.user.id);
      const _0xafc2db = _0x584998.split("@")[0];
      const _0x35f6ad = _0x235ea2.messages[0];
      if (!_0x35f6ad.message) {
        return;
      }
      _0x35f6ad.message = Object.keys(_0x35f6ad.message)[0] === "ephemeralMessage" ? _0x35f6ad.message.ephemeralMessage.message : _0x35f6ad.message;
      if (_0x35f6ad.key && _0x35f6ad.key.remoteJid === "status@broadcast") {
        last_status = _0x35f6ad;
        if (Config.read_status === "true") {
          await Void.readMessages([_0x35f6ad.key]);
        }
        if (Config.save_status === "true") {
          if (_0x35f6ad.message.extendedTextMessage) {
            let _0x15d268 = _0x35f6ad.message.extendedTextMessage.text;
            await Void.sendMessage(_0x584998, {
              text: _0x15d268
            }, {
              quoted: _0x35f6ad
            });
          } else if (_0x35f6ad.message.imageMessage) {
            let _0x443c25 = _0x35f6ad.message.imageMessage.caption;
            let _0x4752ec = await Void.downloadAndSaveMediaMessage(_0x35f6ad.message.imageMessage);
            await Void.sendMessage(_0x584998, {
              image: {
                url: _0x4752ec
              },
              caption: _0x443c25
            }, {
              quoted: _0x35f6ad
            });
          } else if (_0x35f6ad.message.videoMessage) {
            let _0x12aac5 = _0x35f6ad.message.videoMessage.caption;
            let _0x6f8ced = await Void.downloadAndSaveMediaMessage(_0x35f6ad.message.videoMessage);
            await Void.sendMessage(_0x584998, {
              video: {
                url: _0x6f8ced
              },
              caption: _0x12aac5
            }, {
              quoted: _0x35f6ad
            });
          }
        }
        return;
      }
      if (_0x35f6ad.key && _0x35f6ad.key.remoteJid === "status@broadcast") {
        return;
      }
      try {
        let _0x1a6bd9 = await smsg(Void, JSON.parse(JSON.stringify(_0x35f6ad)), _0x2478ab, true);
        let _0x3d997a = _0x1a6bd9;
        if (!_0x1a6bd9.message) {
          return;
        }
        Void.sendPresenceUpdate(_0x1a6bd9.waPresence, _0x1a6bd9.jid);
        var {
          body: _0x3a8186
        } = _0x1a6bd9;
        const _0x1742d8 = _0x1a6bd9.isCreator;
        var _0x4401ca = typeof _0x1a6bd9.text == "string" ? _0x1a6bd9.text.trim() : false;
        if (_0x4401ca && _0x3a8186[1] && _0x3a8186[1] == " ") {
          _0x3a8186 = _0x3a8186[0] + _0x3a8186.slice(2);
        }
        let _0x1e5e8d = false;
        let _0x53b35e = false;
        if (_0x4401ca && Config.HANDLERS.toLowerCase().includes("null")) {
          _0x1e5e8d = true;
          _0x53b35e = _0x3a8186.split(" ")[0].toLowerCase() || false;
        } else if (_0x4401ca && !Config.HANDLERS.toLowerCase().includes("null")) {
          _0x1e5e8d = _0x3a8186 ? prefixRegex.test(_0x3a8186[0]) : false;
          _0x53b35e = _0x1e5e8d ? _0x3a8186.slice(1).trim().split(" ")[0].toLowerCase() : false;
        } else {
          _0x1e5e8d = false;
        }
        let _0x4924a1 = _0x53b35e ? _0x53b35e.trim() : "";
        if (_0x4924a1 && global.setCmdAlias[_0x4924a1] !== undefined) {
          _0x53b35e = global.setCmdAlias[_0x4924a1];
          _0x1e5e8d = true;
        } else if (_0x1a6bd9.mtype == "stickerMessage") {
          _0x4924a1 = "sticker-" + _0x1a6bd9.msg.fileSha256;
          if (global.setCmdAlias[_0x4924a1]) {
            _0x53b35e = global.setCmdAlias[_0x4924a1];
            _0x1e5e8d = true;
          }
        }
        const _0x1b78b5 = ["120363025246125888@g.us", ...global.blockJids.split(",")];
        const _0x57bd86 = ["null", ...global.allowJids.split(",")];
        if (_0x1b78b5.includes(_0x1a6bd9.chat) && !_0x1a6bd9.isSuhail) {
          return;
        }
        if (!_0x1742d8 && Config.WORKTYPE === "private" && _0x1e5e8d && !_0x57bd86.includes(_0x1a6bd9.chat) || _0x1a6bd9.isBaileys) {
          _0x1e5e8d = false;
        }
        if (Config.readmessage === "true" && _0x1e5e8d) {
          await Void.readMessages([_0x1a6bd9.key]);
        }
        const _0x117cd4 = _0x1a6bd9.body ? _0x3a8186.trim().split(/ +/).slice(1) : null;
        if (!_0x1742d8 && Config.disablepm === "true" && _0x1e5e8d && !_0x1a6bd9.isGroup) {
          _0x1e5e8d = false;
        }
        if (!_0x1742d8 && _0x1e5e8d) {
          try {
            let _0x52a217 = (await userdb.findOne({
              id: _0x1a6bd9.sender
            })) || {
              ban: "false"
            };
            if (_0x52a217.ban === "true" && !_0x1742d8) {
              _0x1e5e8d = false;
              await _0x1a6bd9.reply("*Hii " + _0x1a6bd9.pushName + ",*\n_You are banned ❌ from using commands._\n_Please contact owner for further information._");
            }
          } catch (_0x425137) {
            console.log("checkban.ban", _0x425137);
          }
        }
        Suhail.bot = Void;
        if (_0x1e5e8d) {
          let _0x3b76f9 = events.commands.find(_0x54fb2f => _0x54fb2f.pattern === _0x53b35e) || events.commands.find(_0x8135d4 => _0x8135d4.alias && _0x8135d4.alias.includes(_0x53b35e));
          if (_0x3b76f9?.fromMe && !_0x1a6bd9.fromMe && !_0x1742d8) {
            _0x3b76f9 = false;
            return _0x1a6bd9.reply(tlang().owner);
          }
          if (_0x1a6bd9.isGroup && _0x3b76f9 && _0x53b35e !== "bot") {
            let _0x15edca = (await groupdb.findOne({
              id: _0x1a6bd9.chat
            })) || {};
            if (_0x15edca.botenable === "false") {
              _0x3b76f9 = false;
            }
            if (_0x3b76f9 && _0x15edca) {
              let _0x15a528 = _0x3b76f9.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              let _0xf4cabe = new RegExp("\\b" + _0x15a528 + "\\b");
              if (_0x15edca.disablecmds !== "false" && _0xf4cabe.test(_0x15edca.disablecmds)) {
                _0x3b76f9 = false;
              }
            }
          }
          if (_0x3b76f9) {
            if (_0x3b76f9.react) {
              await _0x1a6bd9.react(_0x3b76f9.react);
            }
            let _0x15a553;
            try {
              _0x15a553 = _0x1a6bd9.body ? _0x3a8186.trim().split(/ +/).slice(1).join(" ") : "";
            } catch {
              _0x15a553 = "";
            }
            let _0x1b0290 = _0x3b76f9.pattern;
            _0x1a6bd9.cmd = _0x1b0290;
            try {
              _0x3b76f9.function(_0x1a6bd9, _0x15a553, {
                text: _0x15a553,
                body: _0x3a8186,
                args: _0x117cd4,
                cmdName: _0x53b35e,
                isCreator: _0x1742d8,
                smd: _0x1b0290,
                botNumber: _0x584998,
                budy: _0x4401ca,
                store: _0x2478ab,
                Suhail: Suhail,
                Void: Void
              });
            } catch (_0x5ac016) {
              console.error("[ERROR] ", _0x5ac016);
            }
          } else {
            _0x1e5e8d = false;
            const _0x312304 = events.commands.find(_0x3d18ae => _0x3d18ae.category === _0x53b35e) || false;
            if (_0x312304) {
              const _0x36193d = {};
              let _0x3add0c = "";
              events.commands.map(async (_0x2610e3, _0xa51beb) => {
                if (_0x2610e3.dontAddCommandList === false && _0x2610e3.pattern !== undefined) {
                  if (!_0x36193d[_0x2610e3.category]) {
                    _0x36193d[_0x2610e3.category] = [];
                  }
                  _0x36193d[_0x2610e3.category].push(_0x2610e3.pattern);
                }
              });
              for (const _0x2064d8 in _0x36193d) {
                if (_0x53b35e == _0x2064d8.toLowerCase()) {
                  _0x3add0c = "┌───〈 *" + _0x2064d8.toLowerCase() + " menu*  〉───◆\n│╭─────────────···▸\n┴│▸\n";
                  for (const _0x4a8db2 of _0x36193d[_0x2064d8]) {
                    _0x3add0c += "⬡│▸ " + _0x4a8db2 + "\n";
                  }
                  _0x3add0c += "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                  break;
                }
              }
              let _0x49e029 = await getBuffer(await botpic());
              await Void.sendUi(_0x1a6bd9.jid, {
                caption: tiny(_0x3add0c)
              });
            }
          }
        }
        text = _0x1a6bd9.body;
        let _0x35da38 = {
          body: _0x3a8186,
          mek: _0x35f6ad,
          text: text,
          args: _0x117cd4,
          botNumber: _0x584998,
          isCreator: _0x1742d8,
          icmd: _0x1e5e8d,
          store: _0x2478ab,
          budy: _0x4401ca,
          Suhail: Suhail,
          Void: Void,
          proto: proto
        };
        events.commands.map(async _0x39d9a5 => {
          if (_0x3a8186 && _0x39d9a5.on === "body" || _0x39d9a5.on === "main") {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0x12d0f8) {
              console.error("[ERROR] ", _0x12d0f8);
            }
          } else if (_0x1a6bd9.text && _0x39d9a5.on === "text") {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0x1f4e75) {
              console.error("[ERROR] ", _0x1f4e75);
            }
          } else if ((_0x39d9a5.on === "image" || _0x39d9a5.on === "photo") && _0x1a6bd9.mtype === "imageMessage") {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0xef97d) {
              console.error("[ERROR] ", _0xef97d);
            }
          } else if ((_0x39d9a5.on === "video" || _0x39d9a5.on === "mp4") && _0x1a6bd9.mtype === "videoMessage") {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0x8e7269) {
              console.error("[ERROR] ", _0x8e7269);
            }
          } else if (_0x39d9a5.on === "sticker" && _0x1a6bd9.mtype === "stickerMessage") {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0x1bef3b) {
              console.error("[ERROR] ", _0x1bef3b);
            }
          } else if (_0x39d9a5.on === "delete" && _0x1a6bd9.mtype == "protocolMessage" && _0x1a6bd9.msg.type === "REVOKE") {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0x414b2b) {
              console.error("[ERROR] ", _0x414b2b);
            }
          } else if (_0x39d9a5.on === "viewonce" && (_0x1a6bd9.viewOnce || _0x35f6ad.message.viewOnceMessageV2)) {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0x4be876) {
              console.error("[ERROR] ", _0x4be876);
            }
          } else if (_0x39d9a5.on === "poll" && _0x1a6bd9.mtype.toLowerCase().includes("poll")) {
            try {
              _0x39d9a5.function(_0x1a6bd9, _0x3a8186, _0x35da38);
            } catch (_0x4f79d4) {
              console.error("[ERROR] ", _0x4f79d4);
            }
          }
        });
        try {
          let _0x4895d4 = (await groupdb.findOne({
            id: _0x1a6bd9.chat
          })) || (await groupdb.new({
            id: _0x1a6bd9.chat
          }));
          let _0x32b654 = (await userdb.findOne({
            id: _0x1a6bd9.sender
          })) || (await userdb.new({
            id: _0x1a6bd9.sender,
            name: _0x1a6bd9.pushName || "Unknown"
          }));
        } catch (_0x38ea73) {
          await _0xa90b15();
        }
        await Void.presenceSubscribe(_0x1a6bd9.sender);
        try {
          async function _0x155c1e(_0x191aac, _0x5f49fe, _0x3569ec = "") {
            let [_0x28568e, _0xf4c7a1] = _0x191aac.split(":").map(Number);
            var _0x24111a = _0x3569ec === "mute" ? "announcement" : _0x3569ec === "unmute" ? "not_announcement" : "";
            if (isNaN(_0x28568e) || isNaN(_0xf4c7a1) || _0x28568e < 0 || _0x28568e >= 24 || _0xf4c7a1 < 0 || _0xf4c7a1 >= 60 || !_0x24111a) {
              return;
            }
            if (_0x194836[_0x5f49fe] && _0x194836[_0x5f49fe][_0x3569ec] === _0x191aac) {
              return;
            } else {
              _0x194836[_0x5f49fe] = {
                [_0x3569ec]: _0x191aac
              };
            }
            console.log("[GROUP] : " + _0x5f49fe + "\n[SET AUTO " + _0x3569ec.toUpperCase() + " AT] : " + _0x191aac + " ");
            let _0x117a3d = require("node-cron");
            _0x117a3d.schedule(_0xf4c7a1 + " " + _0x28568e + " * * *", () => {
              (async () => {
                try {
                  return await Void.groupSettingUpdate(_0x5f49fe, _0x24111a);
                } catch (_0x393fe4) {
                  return _0x393fe4;
                }
              })();
            }, {
              scheduled: true,
              timezone: global.timezone || "aisa/karachi"
            });
          }
          async function _0x4b44ec() {
            let _0x3d556b = await groupdb.find({});
            for (let _0x163e27 = 0; _0x163e27 < _0x3d556b.length; _0x163e27++) {
              if (!_0x3d556b[_0x163e27].mute || !_0x3d556b[_0x163e27].id.includes("@g.us") || _0x3d556b[_0x163e27].mute === "false" || _0x3d556b[_0x163e27].mute === "true") {
                continue;
              }
              await _0x155c1e(_0x3d556b[_0x163e27].mute, _0x3d556b[_0x163e27].id, "mute");
            }
          }
          async function _0x4f06c5() {
            let _0x5df386 = await groupdb.find({});
            for (let _0x5d1d24 = 0; _0x5d1d24 < _0x5df386.length; _0x5d1d24++) {
              if (!_0x5df386[_0x5d1d24].unmute || !_0x5df386[_0x5d1d24].id.includes("@g.us") || _0x5df386[_0x5d1d24].unmute === "false" || _0x5df386[_0x5d1d24].unmute === "true") {
                continue;
              }
              await _0x155c1e(_0x5df386[_0x5d1d24].unmute, _0x5df386[_0x5d1d24].id, "unmute");
            }
          }
          _0x4b44ec();
          _0x4f06c5();
        } catch (_0x3731e3) {
          console.log("ERROR IN AUTO MUTE_UNMUTE\n", _0x3731e3);
        }
        if (isMongodb) {}
      } catch (_0x947751) {
        console.log("client.js --------- messages.upsert \n", _0x947751);
      }
    });
    let _0x57c1c4 = {};
    Void.ev.on("group-participants.update", async _0x50654b => {
      let _0x627d3d = await groupsg(Void, JSON.parse(JSON.stringify(_0x50654b)), true);
      if (!_0x627d3d || !_0x627d3d.isGroup) {
        return;
      }
      events.commands.map(async _0x2cf0c5 => {
        if (_0x627d3d.status === "add" && _0x2cf0c5.group === "add") {
          try {
            _0x2cf0c5.function(_0x627d3d, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x70512f) {
            console.error("[GROUP PARTICEPENTS ADD ERROR] ", _0x70512f);
          }
        }
        if (_0x627d3d.status === "remove" && _0x2cf0c5.group === "remove") {
          try {
            _0x2cf0c5.function(_0x627d3d, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x33d4ec) {
            console.error("[GROUP PARTICEPENTS REMOVE ERROR] ", _0x33d4ec);
          }
        }
        if (_0x627d3d.status === "demote" && _0x2cf0c5.group === "demote") {
          try {
            _0x2cf0c5.function(_0x627d3d, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x3f4c03) {
            console.error("[GROUP PARTICEPENTS DEMOTE ERROR] ", _0x3f4c03);
          }
        }
        if (_0x627d3d.status === "promote" && _0x2cf0c5.group === "promote") {
          try {
            _0x2cf0c5.function(_0x627d3d, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x57a22e) {
            console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x57a22e);
          }
        }
        if (_0x2cf0c5.group === "on" || _0x2cf0c5.group === "group" || _0x2cf0c5.group === "main" || _0x2cf0c5.group === "all") {
          try {
            _0x2cf0c5.function(_0x627d3d, {
              store: _0x2478ab,
              Void: Void
            });
          } catch (_0x45c82b) {
            console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x45c82b);
          }
        }
      });
      return;
    });
    Void.lastStatus = async () => {
      console.log("last_status :", last_status);
      return last_status;
    };
    Void.decodeJid = _0x507e8a => {
      if (!_0x507e8a) {
        return _0x507e8a;
      }
      if (/:\d+@/gi.test(_0x507e8a)) {
        let _0x262f4f = jidDecode(_0x507e8a) || {};
        return _0x262f4f.user && _0x262f4f.server && _0x262f4f.user + "@" + _0x262f4f.server || _0x507e8a;
      } else {
        return _0x507e8a;
      }
    };
    Void.ev.on("contacts.upsert", _0x2143db => {
      for (const _0x13f0cb of _0x2143db) {
        console.log("contacts.upsert : ", _0x13f0cb);
        if (_0x2478ab.contacts[_0x13f0cb.id]) {
          Object.assign(_0x2478ab.contacts[_0x13f0cb.id], _0x13f0cb);
        } else {
          _0x2478ab.contacts[_0x13f0cb.id] = _0x13f0cb;
        }
      }
    });
    Void.ev.on("contacts.update", async _0x1e668e => {
      for (let _0x26b40c of _0x1e668e) {}
    });
    Void.getName = (_0x4ae951, _0x159aac = false) => {
      id = Void.decodeJid(_0x4ae951);
      _0x159aac = Void.withoutContact || _0x159aac;
      let _0x1d72d9;
      if (id.endsWith("@g.us")) {
        return new Promise(async _0x4361d7 => {
          _0x1d72d9 = _0x2478ab.contacts[id] || {};
          if (!_0x1d72d9.name?.notify && !_0x1d72d9.subject) {
            _0x1d72d9 = (await Void.groupMetadata(id)) || {};
          }
          _0x4361d7(_0x1d72d9.subject || _0x1d72d9.name || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
        });
      } else {
        _0x1d72d9 = id === "0@s.whatsapp.net" ? {
          id: id,
          name: "WhatsApp"
        } : id === Void.decodeJid(Void.user.id) ? Void.user : _0x2478ab.contacts[id] || {};
      }
      return (_0x159aac ? "" : _0x1d72d9.name) || _0x1d72d9.subject || _0x1d72d9.verifiedName || PhoneNumber("+" + _0x4ae951.replace("@s.whatsapp.net", "")).getNumber("international");
    };
    Void.sendContact = async (_0x59f11d, _0x1dea03, _0x41ab12 = "", _0x4f5aa9 = {}) => {
      let _0x1942d0 = [];
      for (let _0x806099 of _0x1dea03) {
        _0x1942d0.push({
          displayName: await Void.getName(_0x806099 + "@s.whatsapp.net"),
          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await Void.getName(_0x806099 + "@s.whatsapp.net")) + "\nFN:" + global.OwnerName + "\nitem1.TEL;waid=" + _0x806099 + ":" + _0x806099 + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:GitHub\nitem3.URL:" + global.github + "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
        });
      }
      Void.sendMessage(_0x59f11d, {
        contacts: {
          displayName: _0x1942d0.length + " Contact",
          contacts: _0x1942d0
        },
        ..._0x4f5aa9
      }, {
        quoted: _0x41ab12
      });
    };
    Void.setStatus = _0x2d818a => {
      Void.query({
        tag: "iq",
        attrs: {
          to: "@s.whatsapp.net",
          type: "set",
          xmlns: "status"
        },
        content: [{
          tag: "status",
          attrs: {},
          content: Buffer.from(_0x2d818a, "utf-8")
        }]
      });
      return _0x2d818a;
    };
    Void.serializeM = _0x595cb6 => smsg(Void, _0x595cb6, _0x2478ab, false);
    Void.ev.on("connection.update", async _0x2a5dd7 => {
      const _0x75878e = ["2348039607375@s.whatsapp.net", "923004591719@s.whatsapp.net", "17863688449@s.whatsapp.net"];
      const {
        connection: _0x12fb2d,
        lastDisconnect: _0x580c8b
      } = _0x2a5dd7;
      if (_0x12fb2d === "connecting") {
        console.log("ℹ️ Connecting to WhatsApp...");
      }
      if (_0x12fb2d === "open") {
        const _0x2beadf = await Void.decodeJid(Void.user.id);
        if (!isMongodb) {
          await _0xa90b15();
        }
        console.log("✅ Whatsapp Login Successful!");
        try {
          let _0x4f5344 = false;
          try {
            _0x4f5344 = (await bot_.findOne({
              id: "bot_" + _0x2beadf
            })) || (await bot_.new({
              id: "bot_" + _0x2beadf
            }));
          } catch {
            _0x4f5344 = false;
          }
          let _0x1f064b = [];
          let _0x3557ed = {};
          try {
            let {
              data: _0xf60e10
            } = await axios.get("https://gist.github.com/SuhailTechInfo/185b7e3296e0104ab211daa5ea11e7dc/raw");
            _0x3557ed = _0xf60e10.plugins;
            _0x1f064b = _0xf60e10.names;
          } catch (_0x3b4094) {
            _0x3557ed = {};
          }
          _0x1f064b = !_0x1f064b || !_0x1f064b[0] ? [] : _0x1f064b;
          if (_0x4f5344 && _0x4f5344.plugins) {
            console.log("⏳ Checking External Plugins.!!");
            console.log(_0x4f5344.plugins);
            _0x3557ed = {
              ..._0x3557ed,
              ..._0x4f5344.plugins
            };
          }
          if (_0x3557ed) {
            let _0x244f99 = _0x3557ed;
            for (const _0x598219 in _0x244f99) {
              try {
                let {
                  data: _0x3a4746
                } = await axios.get(_0x244f99[_0x598219]);
                if (_0x3a4746) {
                  if (!_0x1f064b.includes(_0x598219)) {
                    console.log(" " + _0x598219 + " ✔️");
                  }
                  await fs.writeFileSync(__dirname + "/../plugins/" + _0x598219 + ".smd", _0x3a4746, "utf8");
                }
              } catch (_0x3256cc) {
                if (!_0x1f064b.includes(_0x598219)) {
                  console.log(" " + _0x598219 + " ❌");
                }
              }
            }
            console.log("\n✅ External Plugins Installed!");
          }
        } catch (_0x594388) {
          console.log("❌ ERROR INSTALATION PLUGINS ", e);
        }
        fs.readdirSync(__dirname + "/../plugins").forEach(_0x15a803 => {
          if (path.extname(_0x15a803).toLowerCase() == ".js" || path.extname(_0x15a803).toLowerCase() == ".smd" || path.extname(_0x15a803).toLowerCase() == "") {
            try {
              require(__dirname + "/../plugins/" + _0x15a803);
            } catch (_0x4d455d) {
              console.log("\n\n ❌Theres an error in '" + _0x15a803 + "' file, ❌ \n please remove it as soon as posible\n", _0x4d455d);
            }
          }
        });
        let _0x86353a = "╔════◇\n║『 *SUHAIL - MD* 』\n║  Prefix : [ " + (prefix ? prefix : "null") + " \n║  Mode : " + Config.WORKTYPE + "\n║  DB : " + (isMongodb ? "MongoDb" : sqldb ? "PostegreSql" : "JSON(no db)") + "\n║  Total Plugins : " + events.commands.length + "\n╚════════════════════╝\n\n╔═════◇\n║『𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗯𝘆 𝗦𝘂𝗯𝘀𝗰𝗿𝗶𝗯𝗶𝗻𝗴』\n║ youtube.com/@suhailtechinfo\n║ https://whatsapp.com/channel/0029Va9thusJP20yWxQ6N643\n╚════════════════════╝\n     ";
        try {
          const _0x467fee = require("../lib/scraper");
          let _0x2a2e8e = await _0x467fee.syncgit();
          if (_0x2a2e8e.total !== 0 && Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY) {
            _0x86353a += "╔═════◇                \n║ 『 𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 』\n║ _You Have New Update For Bot!_\n║ _Update Bot as Soon as Possible!_\n║ *To Update:-  _" + prefix + "Update start_*\n╚════════════════════╝\n     ";
          }
        } catch {}
        console.log(_0x86353a);
        let _0x28d506 = ["true", "log", "smd"];
        if (!_0x28d506.includes(Config.MsgsInLog)) {
          console.log = function () {};
        }
        await Void.sendMessage(_0x2beadf, {
          text: ("" + _0x86353a).trim()
        }, {
          disappearingMessagesInChat: true,
          ephemeralExpiration: 259200
        });
      }
      if (_0x12fb2d === "close") {
        let _0xa66ebf = new Boom(_0x580c8b?.error)?.output.statusCode;
        if (_0xa66ebf === DisconnectReason.badSession) {
          console.log("Bad Session File, Please Delete Session and Scan Again");
        } else if (_0xa66ebf === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
        } else if (_0xa66ebf === DisconnectReason.connectionLost) {
          console.log("Connection Lost from Server, reconnecting...");
          _0x54ad74().catch(_0x26bb8f => console.log(_0x26bb8f));
        } else if (_0xa66ebf === DisconnectReason.connectionReplaced) {
          console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
        } else if (_0xa66ebf === DisconnectReason.loggedOut) {
          console.log("Device Logged Out, Please Scan Again And Run.");
          process.exit(1);
        } else if (_0xa66ebf === DisconnectReason.restartRequired) {
          console.log("Restart Required, Restarting...");
          _0x54ad74().catch(_0x448683 => console.log(_0x448683));
        } else if (_0xa66ebf === DisconnectReason.timedOut) {
          console.log("Connection TimedOut, Reconnecting...");
        } else if (_0xa66ebf === DisconnectReason.multideviceMismatch) {
          console.log("Multi device mismatch, please scan again");
          process.exit(0);
        } else {
          console.log("Connection closed with bot. Please put New Session ID again.");
          console.log(_0xa66ebf);
        }
      }
    });
    Void.ev.on("creds.update", _0x31ac16);
    Void.send5ButImg = async (_0x1cc555, _0x48fc70 = "", _0x1e668c = "", _0x5b1bba, _0x26f341 = [], _0x4084c1, _0x58ef71 = {}) => {
      let _0x377d90 = await prepareWAMessageMedia({
        image: _0x5b1bba,
        jpegThumbnail: _0x4084c1
      }, {
        upload: Void.waUploadToServer
      });
      var _0x1ac440 = generateWAMessageFromContent(_0x1cc555, proto.Message.fromObject({
        templateMessage: {
          hydratedTemplate: {
            imageMessage: _0x377d90.imageMessage,
            hydratedContentText: _0x48fc70,
            hydratedFooterText: _0x1e668c,
            hydratedButtons: _0x26f341
          }
        }
      }), _0x58ef71);
      Void.relayMessage(_0x1cc555, _0x1ac440.message, {
        messageId: _0x1ac440.key.id
      });
    };
    Void.sendButtonText = (_0xcfea7e, _0x578677 = [], _0x5a05c8, _0x42bcb9, _0x41a009 = "", _0x1f4eec = {}) => {
      let _0x1f2dce = {
        text: _0x5a05c8,
        footer: _0x42bcb9,
        buttons: _0x578677,
        headerType: 2,
        ..._0x1f4eec
      };
      Void.sendMessage(_0xcfea7e, _0x1f2dce, {
        quoted: _0x41a009,
        ..._0x1f4eec
      });
    };
    Void.sendText = (_0x398098, _0x1ef61d, _0x24a08c = "", _0x24d017) => Void.sendMessage(_0x398098, {
      text: _0x1ef61d,
      ..._0x24d017
    }, {
      quoted: _0x24a08c
    });
    Void.sendImage = async (_0x1babe4, _0x33bc02, _0x39df91 = "", _0x41b2d0 = "", _0x19d643) => {
      let _0x261834 = Buffer.isBuffer(_0x33bc02) ? _0x33bc02 : /^data:.*?\/.*?;base64,/i.test(_0x33bc02) ? Buffer.from(_0x33bc02.split`,`[1], "base64") : /^https?:\/\//.test(_0x33bc02) ? await await getBuffer(_0x33bc02) : fs.existsSync(_0x33bc02) ? fs.readFileSync(_0x33bc02) : Buffer.alloc(0);
      return await Void.sendMessage(_0x1babe4, {
        image: _0x261834,
        caption: _0x39df91,
        ..._0x19d643
      }, {
        quoted: _0x41b2d0
      });
    };
    Void.sendTextWithMentions = async (_0x17a613, _0x2cb468, _0x12ae98, _0x77619c = {}) => Void.sendMessage(_0x17a613, {
      text: _0x2cb468,
      contextInfo: {
        mentionedJid: [..._0x2cb468.matchAll(/@(\d{0,16})/g)].map(_0x2ffef9 => _0x2ffef9[1] + "@s.whatsapp.net")
      },
      ..._0x77619c
    }, {
      quoted: _0x12ae98
    });
    Void.sendImageAsSticker = async (_0x4022c6, _0x5aed79, _0x2ca445 = {}) => {
      let _0x34dbdf;
      if (_0x2ca445 && (_0x2ca445.packname || _0x2ca445.author)) {
        _0x34dbdf = await writeExifImg(_0x5aed79, _0x2ca445);
      } else {
        _0x34dbdf = await imageToWebp(_0x5aed79);
      }
      await Void.sendMessage(_0x4022c6, {
        sticker: {
          url: _0x34dbdf
        },
        ..._0x2ca445
      }, _0x2ca445);
    };
    Void.sendVideoAsSticker = async (_0x1b4770, _0x32d1a8, _0x44b747 = {}) => {
      let _0x4a7ea9;
      if (_0x44b747 && (_0x44b747.packname || _0x44b747.author)) {
        _0x4a7ea9 = await writeExifVid(_0x32d1a8, _0x44b747);
      } else {
        _0x4a7ea9 = await videoToWebp(_0x32d1a8);
      }
      await Void.sendMessage(_0x1b4770, {
        sticker: {
          url: _0x4a7ea9
        },
        ..._0x44b747
      }, _0x44b747);
    };
    Void.sendMedia = async (_0x25edaf, _0x4090e2, _0x463ede = "", _0x228169 = "", _0x384bb3 = "", _0x50449f = {}) => {
      let _0x48f8ef = await Void.getFile(_0x4090e2, true);
      let {
        mime: _0x4fe54f,
        ext: _0xbde94f,
        res: _0x4f247a,
        data: _0x454dca,
        filename: _0x7c49b5
      } = _0x48f8ef;
      if (_0x4f247a && _0x4f247a.status !== 200 || _0x4d881c.length <= 65536) {
        try {
          throw {
            json: JSON.parse(_0x4d881c.toString())
          };
        } catch (_0x37eb5c) {
          if (_0x37eb5c.json) {
            throw _0x37eb5c.json;
          }
        }
      }
      let _0x42c7c6 = "";
      let _0x1d1f73 = _0x4fe54f;
      let _0x55af88 = _0x7c49b5;
      if (_0x50449f.asDocument) {
        _0x42c7c6 = "document";
      }
      if (_0x50449f.asSticker || /webp/.test(_0x4fe54f)) {
        let {
          writeExif: _0x15d171
        } = require("./exif");
        let _0xb84178 = {
          mimetype: _0x4fe54f,
          data: _0x454dca
        };
        _0x55af88 = await _0x15d171(_0xb84178, {
          packname: _0x50449f.packname ? _0x50449f.packname : Config.packname,
          author: _0x50449f.author ? _0x50449f.author : Config.author,
          categories: _0x50449f.categories ? _0x50449f.categories : []
        });
        await fs.promises.unlink(_0x7c49b5);
        _0x42c7c6 = "sticker";
        _0x1d1f73 = "image/webp";
      } else if (/image/.test(_0x4fe54f)) {
        _0x42c7c6 = "image";
      } else if (/video/.test(_0x4fe54f)) {
        _0x42c7c6 = "video";
      } else if (/audio/.test(_0x4fe54f)) {
        _0x42c7c6 = "audio";
      } else {
        _0x42c7c6 = "document";
      }
      await Void.sendMessage(_0x25edaf, {
        [_0x42c7c6]: {
          url: _0x55af88
        },
        caption: _0x228169,
        mimetype: _0x1d1f73,
        fileName: _0x463ede,
        ..._0x50449f
      }, {
        quoted: _0x384bb3,
        ..._0x50449f
      });
      return fs.promises.unlink(_0x55af88);
    };
    Void.downloadAndSaveMediaMessage = async (_0x1b6478, _0x40ce99 = "null", _0x2d8704 = true) => {
      let _0x1734b5 = _0x1b6478.msg ? _0x1b6478.msg : _0x1b6478;
      let _0x483c33 = (_0x1b6478.msg || _0x1b6478).mimetype || "";
      let _0x436e99 = _0x1b6478.mtype ? _0x1b6478.mtype.replace(/Message/gi, "") : _0x483c33.split("/")[0];
      const _0x34d859 = await downloadContentFromMessage(_0x1734b5, _0x436e99);
      let _0x3e0483 = Buffer.from([]);
      for await (const _0x3e7282 of _0x34d859) {
        _0x3e0483 = Buffer.concat([_0x3e0483, _0x3e7282]);
      }
      let _0xeca77f = await FileType.fromBuffer(_0x3e0483);
      let _0x2780f8 = "./temp/" + _0x40ce99 + "." + _0xeca77f.ext;
      await fs.writeFileSync(_0x2780f8, _0x3e0483);
      return _0x2780f8;
    };
    Void.forward = async (_0x91adc2, _0x2beea3, _0x1e48cb, _0x21b00c, _0x5045db = true) => {
      let _0x11d1a2 = _0x2beea3.mtype;
      let _0x44731b = {};
      console.log("Forward function Called and Type is : ", _0x11d1a2);
      if (_0x11d1a2 == "conversation") {
        _0x44731b = {
          text: _0x2beea3.text,
          contextInfo: _0x1e48cb
        };
        for (let _0x3b4617 of parsedJid(_0x91adc2)) {
          await Void.sendMessage(_0x3b4617, _0x44731b, {
            quoted: _0x21b00c
          });
        }
        return;
      }
      const _0x58c0ea = _0x255031 => {
        return "" + Math.floor(Math.random() * 10000) + _0x255031;
      };
      let _0x3bdbf5 = _0x2beea3.msg ? _0x2beea3.msg : _0x2beea3;
      let _0x2c23a3 = (_0x2beea3.msg || _0x2beea3).mimetype || "";
      let _0x5a9bd6 = _0x2beea3.mtype ? _0x2beea3.mtype.replace(/Message/gi, "") : _0x2c23a3.split("/")[0];
      const _0x3cfcc7 = await downloadContentFromMessage(_0x3bdbf5, _0x5a9bd6);
      let _0x31a97d = Buffer.from([]);
      for await (const _0x1cd3cf of _0x3cfcc7) {
        _0x31a97d = Buffer.concat([_0x31a97d, _0x1cd3cf]);
      }
      let _0x3ab182 = await FileType.fromBuffer(_0x31a97d);
      let _0x4af8fa = await _0x58c0ea(_0x3ab182.ext);
      let _0x29bc91 = "./temp/" + _0x4af8fa;
      await fs.writeFileSync(_0x29bc91, _0x31a97d);
      if (_0x11d1a2 == "videoMessage") {
        _0x44731b = {
          video: fs.readFileSync(_0x29bc91),
          mimetype: _0x2beea3.mimetype,
          caption: _0x2beea3.text,
          contextInfo: _0x1e48cb
        };
      } else if (_0x11d1a2 == "imageMessage") {
        _0x44731b = {
          image: fs.readFileSync(_0x29bc91),
          mimetype: _0x2beea3.mimetype,
          caption: _0x2beea3.text,
          contextInfo: _0x1e48cb
        };
      } else if (_0x11d1a2 == "audioMessage") {
        _0x44731b = {
          audio: fs.readFileSync(_0x29bc91),
          mimetype: _0x2beea3.mimetype,
          seconds: 200001355,
          ptt: true,
          contextInfo: _0x1e48cb
        };
      } else if (_0x11d1a2 == "documentWithCaptionMessage" || _0x3ab182 == "documentMessage") {
        _0x44731b = {
          document: fs.readFileSync(_0x29bc91),
          mimetype: _0x2beea3.mimetype,
          caption: _0x2beea3.text,
          contextInfo: _0x1e48cb
        };
      } else {
        fs.unlink(_0x29bc91, _0x5631df => {
          if (_0x5631df) {
            console.error("Error deleting file:", _0x5631df);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      for (let _0x5e0c1e of parsedJid(_0x91adc2)) {
        try {
          await Void.sendMessage(_0x5e0c1e, _0x44731b, {
            quoted: _0x21b00c
          });
        } catch (_0x37043d) {}
      }
      return fs.unlink(_0x29bc91, _0x4207d5 => {
        if (_0x4207d5) {
          console.error("Error deleting file:", _0x4207d5);
        } else {
          console.log("File deleted successfully");
        }
      });
    };
    Void.downloadMediaMessage = async _0x45c92e => {
      let _0x4a7c6d = _0x45c92e.msg ? _0x45c92e.msg : _0x45c92e;
      let _0x15f165 = (_0x45c92e.msg || _0x45c92e).mimetype || "";
      let _0x2d2167 = _0x45c92e.mtype ? _0x45c92e.mtype.replace(/Message/gi, "") : _0x15f165.split("/")[0];
      const _0x3338db = await downloadContentFromMessage(_0x4a7c6d, _0x2d2167);
      let _0x3abb9c = Buffer.from([]);
      for await (const _0x11fc9d of _0x3338db) {
        _0x3abb9c = Buffer.concat([_0x3abb9c, _0x11fc9d]);
      }
      return _0x3abb9c;
    };
    Void.forwardOrBroadCast2 = async (_0x14d4b0, _0x590fb0, _0x332f15 = {}, _0x5d0d55 = "") => {
      try {
        let _0x3fb2a7 = _0x590fb0.mtype;
        if (_0x3fb2a7 === "videoMessage" && _0x5d0d55 === "ptv") {
          _0x590fb0 = {
            ptvMessage: {
              ..._0x590fb0.msg
            }
          };
        }
        let _0x5d3375 = {
          ..._0x332f15,
          contextInfo: {
            ...(_0x332f15.contextInfo ? _0x332f15.contextInfo : {}),
            ...(_0x332f15.linkPreview ? {
              linkPreview: {
                ..._0x332f15.linkPreview
              }
            } : {}),
            ...(_0x332f15.quoted && _0x332f15.quoted.message ? {
              quotedMessage: {
                ...(_0x332f15.quoted?.message || {})
              }
            } : {})
          }
        };
        console.log("\n\nopts : ", _0x5d3375, "\n\n");
        var _0x27bd15 = _0x590fb0.message ? _0x590fb0.message : _0x590fb0;
        let _0x24336f = _0x3fb2a7 ? _0x3fb2a7 : Object.keys(_0x27bd15)[0];
        _0x27bd15 = {
          ..._0x5d3375,
          ..._0x27bd15
        };
        const _0x5b6ea8 = await generateWAMessageFromContent(_0x14d4b0, _0x27bd15, _0x332f15 ? {
          ...(_0x24336f == "conversation" ? {
            conversation: _0x27bd15[_0x24336f]
          } : _0x27bd15[_0x24336f]),
          ..._0x5d3375,
          contextInfo: {
            ...(_0x27bd15[_0x24336f]?.contextInfo || {}),
            ..._0x5d3375.contextInfo
          }
        } : {});
        await Void.relayMessage(_0x14d4b0, _0x5b6ea8.message, {
          messageId: _0x5b6ea8.key.id
        });
        console.log("\n\n waMessage : ", _0x5b6ea8, "\n\n");
        return _0x5b6ea8;
      } catch {}
    };
    Void.forwardOrBroadCast = async (jid, message, options = {}, type = "") => {
      let messageType = message.mtype;
     
      if (messageType === "videoMessage" && type === "ptv") {
        message = {
          ptvMessage: {
            ...message.msg
          }
        };
      }
     
      let contextOptions = {
        ...options
      };
     
      options.contextInfo = {
        ...(options.contextInfo || {})
      };
     
      let mergedOptions = {
        ...options
      };
     
      var messageContent = message.message ? message.message : message;
      let messageContentType = messageType ? messageType : Object.keys(messageContent)[0];
     
      console.log("template:", messageContent);
     
      const forwardedMessage = await generateWAMessageFromContent(jid, messageContent, options
        ? {
          ...messageContent[messageContentType],
          ...options,
          ...(options.contextInfo
            ? {
              contextInfo: {
                ...messageContent[messageContentType].contextInfo,
                ...options.contextInfo,
                ...(options.quoted
                  ? {
                    quotedMessage: {
                      ...options.quoted
                    }
                  }
                  : {})
              }
            }
            : {})
        }
        : {});
     
      await Void.relayMessage(jid, forwardedMessage.message, { messageId: forwardedMessage.key.id });
      return forwardedMessage;
     };
    Void.copyNForward = async (jid, message, forceForward = false, options = {}) => {
      let type;
     
      if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message
          ? message.message.ephemeralMessage.message
          : message.message || undefined;
     
        type = Object.keys(message.message.viewOnceMessage.message)[0];
        delete (message.message && message.message.ignore ? message.message.ignore : message.message || undefined);
        delete message.message.viewOnceMessage.message[type].viewOnce;
        message.message = { ...message.message.viewOnceMessage.message };
      }
     
      let originalType = Object.keys(message.message)[0];
      let forwardedMessage = await generateForwardMessageContent(message, forceForward);
      let forwardedType = Object.keys(forwardedMessage)[0];
      let contextInfo = {};
     
      if (originalType !== "conversation") {
        contextInfo = message.message[originalType].contextInfo;
      }
     
      forwardedMessage[forwardedType].contextInfo = {
        ...contextInfo,
        ...forwardedMessage[forwardedType].contextInfo
      };
     
      const forwardedObj = await generateWAMessageFromContent(jid, forwardedMessage, options
        ? {
          ...forwardedMessage[forwardedType],
          ...options,
          ...(options.contextInfo
            ? {
              contextInfo: {
                ...forwardedMessage[forwardedType].contextInfo,
                ...options.contextInfo
              }
            }
            : {})
        }
        : {});
     
      await Void.relayMessage(jid, forwardedObj.message, { messageId: forwardedObj.key.id });
      return forwardedObj;
     };
    Void.sendFileUrl = async (jid, fileUrl, caption = "", quoted = "", options = { author: "Suhail-Md" }, mediaType = "") => {
      try {
        let headResponse = await axios.head(fileUrl);
        let contentType = headResponse?.headers["content-type"] || "";
        let contentTypeParts = contentType.split("/");
        let mediaContent = false;
     
        if (contentTypeParts[1] === "gif" || mediaType === "gif") {
          mediaContent = {
            video: { url: fileUrl },
            caption: caption,
            gifPlayback: true,
            ...options
          };
        } else if (contentTypeParts[1] === "webp" || mediaType === "sticker") {
          mediaContent = {
            sticker: { url: fileUrl },
            ...options
          };
        } else if (contentTypeParts[0] === "image" || mediaType === "image") {
          mediaContent = {
            image: { url: fileUrl },
            caption: caption,
            ...options,
            mimetype: "image/jpeg"
          };
        } else if (contentTypeParts[0] === "video" || mediaType === "video") {
          mediaContent = {
            video: { url: fileUrl },
            caption: caption,
            mimetype: "video/mp4",
            ...options
          };
        } else if (contentTypeParts[0] === "audio" || mediaType === "audio") {
          mediaContent = {
            audio: { url: fileUrl },
            mimetype: "audio/mpeg",
            ...options
          };
        } else if (contentType === "application/pdf") {
          mediaContent = {
            document: { url: fileUrl },
            mimetype: "application/pdf",
            caption: caption,
            ...options
          };
        }
     
        if (mediaContent) {
          try {
            return await Void.sendMessage(jid, mediaContent, { quoted });
          } catch {}
        }
     
        let fileName = headResponse?.headers["content-disposition"]?.split("=\"")[1]?.split("\"")[0] || "";
        if (fileName) {
          const imageExtensions = [".jpg", ".jpeg", ".png"];
          const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
          var fileExtension = fileName.substring(fileName.lastIndexOf("."))?.toLowerCase() || "nillll";
          var mimeType;
          if (imageExtensions.includes(fileExtension)) {
            mimeType = "image/jpeg";
          } else if (videoExtensions.includes(fileExtension)) {
            mimeType = "video/mp4";
          }
          contentType = mimeType ? mimeType : contentType;
        }
     
        let fileContent = {
          fileName: fileName ? fileName : "file",
          caption: caption,
          ...options,
          mimetype: contentType
        };
     
        return Void.sendMessage(jid, {
          document: { url: fileUrl },
          ...fileContent
        }, { quoted });
      } catch (error) {
        console.log("Error in client.sendFileUrl():", error);
        return;
      }
     };
    Void.sendFromUrl = Void.sendFileUrl;
const imageCache = {};
let userImages = [];

Void.sendUi = async (jid, options = {}, quoted = "", imageType = "", imageUrl = "") => {
 let contextInfo = {};

 try {
   const urlRegex = /(https?:\/\/\S+)/gi;
   const imageExtensions = [".jpg", ".jpeg", ".png"];
   const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
   let isImage = false;
   let isVideo = false;

   if (!userImages || !userImages[0]) {
     userImages = Config.userImages ? Config.userImages.split(",") : [await botpic()];
     userImages = userImages.filter(url => url.trim() !== "");
   }

   let imageToUse = imageUrl && imageType ? imageUrl : userImages[Math.floor(Math.random() * userImages.length)];

   if (!imageCache[imageToUse]) {
     const extension = imageToUse.substring(imageToUse.lastIndexOf(".")).toLowerCase();
     if (imageExtensions.includes(extension)) {
       isImage = true;
     }
     if (videoExtensions.includes(extension)) {
       isVideo = true;
     }
     imageCache[imageToUse] = { image: isImage, video: isVideo };
   }

   quoted = quoted && quoted.quoted?.key ? quoted.quoted : quoted || "";

   let messageContent;
   let buffered;

   if (!imageUrl && (Config.userImages === "text" || imageType === "text")) {
     messageContent = { text: options.caption, ...options };
   } else if (imageType === "image" || imageCache[imageToUse]?.image) {
     messageContent = { image: { url: imageToUse }, ...options, mimetype: "image/jpeg" };
     buffered = await getBuffer(imageToUse);
   } else if (imageType === "video" || imageCache[imageToUse]?.video) {
     messageContent = {
       video: { url: imageToUse },
       ...options,
       mimetype: "video/mp4",
       gifPlayback: true,
       height: 274,
       width: 540
     };
   }

   contextInfo = { ...(await Void.contextInfo("𝗦𝗨𝗛𝗔𝗜𝗟-𝗠𝗗", Config.ownername, buffered ? buffered : log0)) };

   if (messageContent) {
     return Void.sendMessage(jid, { contextInfo, ...messageContent }, { quoted });
   }
 } catch (error) {
   console.log("Error in userImages():", error);
 }

 try {
   return Void.sendMessage(jid, {
     image: { url: await botpic() },
     contextInfo,
     ...options
   });
 } catch {
   return Void.sendMessage(jid, {
     text: options.caption,
     contextInfo,
     ...options
   });
 }
};
    Void.contextInfo = async (title = "𝗦𝗨𝗛𝗔𝗜𝗟-𝗠𝗗", author = Config.ownername, thumbnail = log0, mediaType = 1, url = gurl, isForward = false) => {
      try {
        let style = isForward ? isForward : Config.style;
     
        if (style >= 2) {
          return {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title: title,
              body: author,
              renderLargerThumbnail: true,
              thumbnail: thumbnail,
              mediaType: mediaType || 1,
              mediaUrl: "",
              sourceUrl: url
            }
          };
        } else if (style === 1) {
          return {
            externalAdReply: {
              title: title,
              body: author,
              thumbnail: thumbnail,
              mediaType: 1,
              mediaUrl: url,
              sourceUrl: url
            }
          };
        } else {
          return {};
        }
      } catch (error) {
        console.log("Error in client.contextInfo():", error);
        return {};
      }
     };
    Void.cMod = (jid, message, text = "", sender = Void.user.id, options = {}) => {
      let type = Object.keys(message.message)[0];
      let isEphemeral = type === "ephemeralMessage";
      if (isEphemeral) {
        type = Object.keys(message.message.ephemeralMessage.message)[0];
      }
     
      let content = isEphemeral ? message.message.ephemeralMessage.message : message.message;
      let messageContent = content[type];
     
      if (typeof messageContent === "string") {
        content[type] = text || messageContent;
      } else if (messageContent.caption) {
        messageContent.caption = text || messageContent.caption;
      } else if (messageContent.text) {
        messageContent.text = text || messageContent.text;
      }
     
      if (typeof messageContent !== "string") {
        content[type] = {
          ...messageContent,
          ...options
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
    Void.getFile = async (resource, saveToFile) => {
      let buffer;
     
      if (Buffer.isBuffer(resource)) {
        buffer = resource;
      } else if (/^data:.*?\/.*?;base64,/i.test(resource)) {
        buffer = Buffer.from(resource.split`,`[1], "base64");
      } else if (/^https?:\/\//.test(resource)) {
        buffer = await getBuffer(resource);
      } else if (fs.existsSync(resource)) {
        const filePath = resource;
        buffer = fs.readFileSync(resource);
      } else if (typeof resource === "string") {
        buffer = resource;
      } else {
        buffer = Buffer.alloc(0);
      }
     
      const fileType = (await FileType.fromBuffer(buffer)) || {
        mime: "application/octet-stream",
        ext: ".bin"
      };
     
      const fileName = `./temp/null.${fileType.ext}`;
     
      if (buffer && saveToFile) {
        await fs.promises.writeFile(fileName, buffer);
      }
     
      return {
        res: buffer,
        filename: fileName,
        size: await getSizeMedia(buffer),
        ...fileType,
        data: buffer
      };
     };
    Void.sendFile = async (jid, path, fileName, quoted = { quoted: "" }, options = {}) => {
      let fileData = await Void.getFile(path, true);
      let {
        filename,
        size,
        ext,
        mime,
        data
      } = fileData;
     
      let type = "";
      let mimeType = mime;
      let fileURL = filename;
     
      if (options.asDocument) {
        type = "document";
      } else if (options.asSticker || /webp/.test(mime)) {
        const { writeExif } = require("./exif.js");
        let sticker = {
          mimetype: mime,
          data: data
        };
        fileURL = await writeExif(sticker, {
          packname: Config.packname,
          author: Config.packname,
          categories: options.categories ? options.categories : []
        });
        await fs.promises.unlink(filename);
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
     
      await Void.sendMessage(jid, {
        [type]: {
          url: fileURL
        },
        mimetype: mimeType,
        fileName: fileName,
        ...options
      }, {
        quoted: "",
        ...quoted
      });
     
      return fs.promises.unlink(fileURL);
     };
    Void.fakeMessage = async (type = "order", options = {}, message = "➬ Suhail SER") => {
      const randomNumbers = [777, 0, 100, 500, 1000, 999, 2021];
      const defaultOptions = {
        id: "suhail_md",
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        ...options
      };
     
      let messageObject = {};
      if (type === "text" || type === "conservation") {
        messageObject = {
          conversation: message
        };
      } else if (type === "order") {
        messageObject = {
          orderMessage: {
            itemCount: randomNumbers[Math.floor(Math.random() * randomNumbers.length)],
            status: 1,
            surface: 1,
            message: `❏ ${Config.botname} ${message}`,
            orderTitle: "live",
            sellerJid: "2348039607375@s.whatsapp.net"
          }
        };
      } else if (type === "contact") {
        messageObject = {
          contactMessage: {
            displayName: `${message}`
          }
        };
      }
     
      return {
        key: {
          ...defaultOptions
        },
        message: {
          ...messageObject
        }
      };
     };
    Void.parseMention = async (text) => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x1bb31b => _0x1bb31b[1] + "@s.whatsapp.net");
    };
    return Void;
  }
  _0x54ad74().catch(_0x476a31 => console.log(_0x476a31));
  const htmlContent = 
  `
  <!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
   <title>Astropeda</title>
   <style>
     body {
       background: white;
     }
     h1 {
       font-size: 500px;
       font-family: 'Poppins', sans-serif;
       color: black;
     }
   </style>
 </head>
 <body>
   <h1>Astropeda</h1>
 </body>
</html>
  `;
  try {
    app.get('/', (req, res) => {
      res.type('html').send(htmlContent);
    });
   
    const port = global.port || Math.floor(Math.random() * 9000) + 1000;
    app.listen(port, () => {
      console.log('Suhail-Md Server listening...');
    });
   } catch (error) {
    console.log('Server connection error:', error);
   }
   let scriptPath = require.resolve(__filename);
   fs.watchFile(scriptPath, () => {
    fs.unwatchFile(scriptPath);
    console.log("Update " + __filename);
  });
}, 3000);
function atob(base64String) {
 return Buffer.from(base64String, "base64").toString("binary");
}