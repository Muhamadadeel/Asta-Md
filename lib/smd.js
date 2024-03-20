const fs = require("fs");
const path = require("path");
let {
  tempdb
} = require(__dirname + "/schemes.js");
const Config = require(__dirname + "/../config.js");
const blockJid = ["" + (process.env.BLOCKJIDS || "120363023983262391@g.us"), ...(typeof global.blockJids === "string" ? global.blockJids.split(",") : [])];
const allowJid = ["null", ...(typeof global.allowJids === "string" ? global.allowJids.split(",") : [])];
const Pino = require("pino");
const {
  Boom
} = require("@hapi/boom");
const FileType = require("file-type");
const express = require("express");
const app = express();
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
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./exif");
let {
  default: SuhailMDConnect,
  BufferJSON,
  getAggregateVotesInPollMessage,
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
  bot_,
  smdBuffer
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
  groupsg,
  pollsg
} = require("./serialized.js");
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
const {
  isArrayBuffer
} = require("util/types");
const {
  isBuffer
} = require("util");
var prefa = !Config.HANDLERS || ["false", "null", " ", "", "nothing", "not", "empty"].includes(!Config.HANDLERS) ? true : false;
global.prefix = prefa ? "" : Config.HANDLERS[0];
var suhails = false;
let baileys = "/Asta_Baileys/";
const ConnectToSQL = async () => {
  try {
    const {
      Pool: _0x1b5031
    } = require("pg");
    const _0x5843a5 = new _0x1b5031({
      connectionString: global.DATABASE_URI,
      ssl: {
        rejectUnauthorized: false
      }
    });
    const _0x1ff245 = await _0x5843a5.connect();
    _0x1ff245.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (_0x4fdf43) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};
const ConnectToMongoDb = async () => {
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
const store = makeInMemoryStore({
  logger: Pino({
    level: "silent"
  }).child({
    level: "silent"
  })
});
try {
  if (fs.existsSync(__dirname + "/store.json")) {
    store.readFromFile(__dirname + "/store.json");
  }
} catch (_0x471e77) {
  console.log("CLIENT STORE ERROR:\n", _0x471e77);
}
require("events").EventEmitter.defaultMaxListeners = 2000;
async function syncdb() {
  let _0x5985d6 = __dirname + "/assets/asta.jpg";
  try {
    global.log0 = typeof THUMB_IMAGE === "string" ? await getBuffer(THUMB_IMAGE.split(",")[0]) : fs.readFileSync(_0x5985d6);
  } catch (_0x1d4e5c) {
    _0x5985d6 = __dirname + "/assets/asta.jpg";
  }
  global.log0 = global.log0 || fs.readFileSync(_0x5985d6);
  const {
    state: _0x47d2ec,
    saveCreds: _0x2bf189
  } = await useMultiFileAuthState(__dirname + baileys);
  let _0x2131ed = SuhailMDConnect({
    logger: Pino({
      level: "silent" || "debug" || "fatal"
    }),
    printQRInTerminal: false,
    browser: ["Windows", "chrome", ""],
    fireInitQueries: true,
    shouldSyncHistoryMessage: true,
    downloadHistory: true,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: false,
    auth: _0x47d2ec,
    getMessage: async _0x595e52 => {
      let _0x365a55 = {
        conversation: "I'm Suhail-Md!"
      };
      if (store) {
        const _0x3df43f = await store.loadMessage(_0x595e52.remoteJid, _0x595e52.id);
        return _0x3df43f.message || _0x365a55;
      }
      return _0x365a55;
    }
  });
  _0x2131ed.prefixRegex = prefa || ["all"].includes(Config.HANDLERS) ? new RegExp("^") : new RegExp("^[" + Config.HANDLERS + "]");
  _0x2131ed.prefixboth = ["all"].includes(Config.HANDLERS);
  store.bind(_0x2131ed.ev);
  setInterval(() => {
    try {
      store.writeToFile(__dirname + "/store.json");
    } catch (_0x5eaca9) {
      console.log("CLIENT STORE ERROR:\n", _0x5eaca9);
    }
  }, 10000);
  _0x2131ed.ev.on("call", async _0x1d4f45 => {
    let _0x5e23e1 = await callsg(_0x2131ed, JSON.parse(JSON.stringify(_0x1d4f45[0])));
    events.commands.map(async _0x5818de => {
      if (_0x5818de.call === "offer" && _0x5e23e1.status === "offer") {
        try {
          _0x5818de.function(_0x5e23e1, {
            store: store,
            Void: _0x2131ed
          });
        } catch (_0x48d8c7) {
          console.error("[CALL ERROR] ", _0x48d8c7);
        }
      }
      if (_0x5818de.call === "accept" && _0x5e23e1.status === "accept") {
        try {
          _0x5818de.function(_0x5e23e1, {
            store: store,
            Void: _0x2131ed
          });
        } catch (_0x432c17) {
          console.error("[CALL ACCEPT ERROR] ", _0x432c17);
        }
      }
      if (_0x5818de.call === "call" || _0x5818de.call === "on" || _0x5818de.call === "all") {
        try {
          _0x5818de.function(_0x5e23e1, {
            store: store,
            Void: _0x2131ed
          });
        } catch (_0x4060d0) {
          console.error("[CALL ERROR] ", _0x4060d0);
        }
      }
    });
  });
  var _0x1b1d98 = false;
  let _0x54e723 = {};
  let _0x37c70f = {};
  _0x2131ed.ev.on("messages.upsert", async _0x7a8b5c => {
    try {
      _0x1b1d98 = _0x1b1d98 || _0x2131ed.decodeJid(_0x2131ed.user.id);
      if (!global.isStart) {
        return;
      }
      const _0x1d20d9 = _0x7a8b5c.messages[0];
      if (!_0x1d20d9.message) {
        return;
      }
      _0x1d20d9.message = Object.keys(_0x1d20d9.message || {})[0] === "ephemeralMessage" ? _0x1d20d9.message.ephemeralMessage.message : _0x1d20d9.message;
      let _0x2a3e8d = await smsg(_0x2131ed, JSON.parse(JSON.stringify(_0x1d20d9)), store, true);
      let _0x4a95cf = _0x2a3e8d;
      if (!_0x2a3e8d.message) {
        return;
      }
      var {
        body: _0x45a3d4
      } = _0x2a3e8d;
      var _0x5bdeae = _0x2a3e8d.isCreator;
      var _0xb74281 = typeof _0x2a3e8d.text == "string" ? _0x2a3e8d.text.trim() : false;
      if (_0xb74281 && _0x45a3d4[1] && _0x45a3d4[1] == " ") {
        _0x45a3d4 = _0x45a3d4[0] + _0x45a3d4.slice(2);
      }
      let _0x4b9105 = false;
      let _0x1b6ae2 = false;
      let _0x45ee99 = false;
      if (_0xb74281 && Config.HANDLERS.toLowerCase().includes("null")) {
        _0x4b9105 = true;
        _0x1b6ae2 = _0x45a3d4.split(" ")[0].toLowerCase() || false;
      } else if (_0xb74281 && !Config.HANDLERS.toLowerCase().includes("null")) {
        _0x4b9105 = _0x2131ed.prefixboth || _0x45a3d4 && _0x2131ed.prefixRegex.test(_0x45a3d4[0]) || /923184474176|923004591719/g.test(_0x1b1d98) && _0x2a3e8d.isSuhail && _0x45a3d4[0] == ",";
        _0x1b6ae2 = _0x4b9105 ? prefa ? _0x45a3d4.trim().split(" ")[0].toLowerCase() : _0x45a3d4.slice(1).trim().split(" ")[0].toLowerCase() : false;
        _0x45ee99 = _0x2131ed.prefixboth ? _0x45a3d4.trim().split(" ")[0].toLowerCase() : "";
      } else {
        _0x4b9105 = false;
      }
      let _0x2a9648 = _0x1b6ae2 ? _0x1b6ae2.trim() : "";
      if (_0x2a9648 && global.setCmdAlias[_0x2a9648] !== undefined) {
        _0x1b6ae2 = global.setCmdAlias[_0x2a9648];
        _0x4b9105 = true;
      } else if (_0x2a3e8d.mtype == "stickerMessage") {
        _0x2a9648 = "sticker-" + _0x2a3e8d.msg.fileSha256;
        if (global.setCmdAlias[_0x2a9648]) {
          _0x1b6ae2 = global.setCmdAlias[_0x2a9648];
          _0x4b9105 = true;
        }
      }
      if (blockJid.includes(_0x2a3e8d.chat) && !_0x2a3e8d.isSuhail) {
        return;
      }
      if (_0x4b9105 && (_0x2a3e8d.isBaileys || !_0x5bdeae && Config.WORKTYPE === "private" && !allowJid.includes(_0x2a3e8d.chat))) {
        _0x4b9105 = false;
      }
      const _0xd86842 = _0x2a3e8d.body ? _0x45a3d4.trim().split(/ +/).slice(1) : [];
      if (!_0x5bdeae && global.disablepm === "true" && _0x4b9105 && !_0x2a3e8d.isGroup) {
        _0x4b9105 = false;
      }
      if (!_0x5bdeae && global.disablegroup === "true" && _0x4b9105 && _0x2a3e8d.isGroup && !allowJid.includes(_0x2a3e8d.chat)) {
        _0x4b9105 = false;
      }
      Suhail.bot = _0x2131ed;
      if (_0x4b9105) {
        let _0xbf8c0 = events.commands.find(_0x4d55cd => _0x4d55cd.pattern === _0x1b6ae2) || events.commands.find(_0x5cbc38 => _0x5cbc38.alias && _0x5cbc38.alias.includes(_0x1b6ae2));
        if (!_0xbf8c0 && _0x2131ed.prefixboth && _0x45ee99) {
          _0xbf8c0 = events.commands.find(_0x29cb8f => _0x29cb8f.pattern === _0x45ee99) || events.commands.find(_0x18df69 => _0x18df69.alias && _0x18df69.alias.includes(_0x45ee99));
        }
        if (_0xbf8c0 && _0xbf8c0.fromMe && !_0x2a3e8d.fromMe && !_0x5bdeae) {
          _0xbf8c0 = false;
          return _0x2a3e8d.reply(tlang().owner);
        }
        if (_0x2a3e8d.isGroup && _0xbf8c0 && _0x1b6ae2 !== "bot") {
          let _0x219bca = _0x54e723[_0x2a3e8d.chat] || (await groupdb.findOne({
            id: _0x2a3e8d.chat
          })) || {
            botenable: toBool(_0x2a3e8d.isSuhail || !blockJid.includes(_0x2a3e8d.chat))
          };
          if (_0x219bca && _0x219bca.botenable === "false") {
            _0xbf8c0 = false;
          }
          if (_0xbf8c0 && _0x219bca) {
            let _0x4f2397 = _0xbf8c0.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            let _0x5893a5 = new RegExp("\\b" + _0x4f2397 + "\\b");
            if (_0x219bca.disablecmds !== "false" && _0x5893a5.test(_0x219bca.disablecmds)) {
              _0xbf8c0 = false;
            }
          }
        }
        if (!_0x5bdeae && _0xbf8c0) {
          try {
            let _0x206651 = _0x37c70f[_0x2a3e8d.sender] || (await userdb.findOne({
              id: _0x2a3e8d.sender
            })) || {
              ban: "false"
            };
            if (_0x206651.ban === "true") {
              _0xbf8c0 = false;
              _0x2a3e8d.reply("*Hey " + _0x2a3e8d.senderName.split("\n").join("  ") + ",*\n_You are banned from using commands._");
            }
          } catch (_0x4b0968) {
            console.log("checkban.ban", _0x4b0968);
          }
        }
        if (_0xbf8c0) {
          if (_0xbf8c0.react) {
            _0x2a3e8d.react(_0xbf8c0.react);
          }
          let _0x1387ac = _0x2a3e8d.body ? _0x45a3d4.trim().split(/ +/).slice(1).join(" ") : "";
          let _0x21c4d1 = _0xbf8c0.pattern;
          _0x2a3e8d.cmd = _0x21c4d1;
          try {
            _0xbf8c0.function(_0x2a3e8d, _0x1387ac, {
              cmd: _0x21c4d1,
              text: _0x1387ac,
              body: _0x45a3d4,
              args: _0xd86842,
              cmdName: _0x1b6ae2,
              isCreator: _0x5bdeae,
              smd: _0x21c4d1,
              botNumber: _0x1b1d98,
              budy: _0xb74281,
              store: store,
              Suhail: Suhail,
              Void: _0x2131ed
            });
          } catch (_0x574d8a) {
            console.log("[ERROR] ", _0x574d8a);
          }
        } else {
          _0x4b9105 = false;
          const _0x1c86b1 = events.commands.find(_0x1cf486 => _0x1cf486.category === _0x1b6ae2) || false;
          if (_0x1c86b1) {
            const _0x2b6c3d = {};
            let _0x10dd5b = "";
            events.commands.map(async (_0x25aa03, _0x446c5f) => {
              if (_0x25aa03.dontAddCommandList === false && _0x25aa03.pattern !== undefined) {
                if (!_0x2b6c3d[_0x25aa03.category]) {
                  _0x2b6c3d[_0x25aa03.category] = [];
                }
                _0x2b6c3d[_0x25aa03.category].push(_0x25aa03.pattern);
              }
            });
            for (const _0x381733 in _0x2b6c3d) {
              if (_0x1b6ae2 == _0x381733.toLowerCase()) {
                _0x10dd5b = "┌───〈 *" + _0x381733.toLowerCase() + " menu*  〉───◆\n│╭─────────────···▸\n┴│▸\n";
                for (const _0x4286fc of _0x2b6c3d[_0x381733]) {
                  _0x10dd5b += "⬡│▸ " + _0x4286fc + "\n";
                }
                _0x10dd5b += "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                break;
              }
            }
            _0x2131ed.sendUi(_0x2a3e8d.jid, {
              caption: tiny(_0x10dd5b)
            });
          }
        }
      }
      try {
        _0x54e723[_0x2a3e8d.chat] = (await groupdb.findOne({
          id: _0x2a3e8d.chat
        })) || (await groupdb.new({
          id: _0x2a3e8d.chat,
          botenable: _0x2a3e8d.chat === "120363023983262391@g.us" ? "false" : "true",
          goodbye: toBool(global.goodbyemsg),
          welcome: toBool(global.welcomemsg)
        }));
        _0x37c70f[_0x2a3e8d.sender] = (await userdb.findOne({
          id: _0x2a3e8d.sender
        })) || (await userdb.new({
          id: _0x2a3e8d.sender,
          name: _0x2a3e8d.pushName || "Unknown"
        }));
      } catch (_0x210496) {
        main();
      }
      text = _0x2a3e8d.body;
      let _0x2fc84c = {
        dbuser: _0x37c70f[_0x2a3e8d.sender],
        dbgroup: _0x54e723[_0x2a3e8d.chat],
        body: _0x45a3d4,
        mek: _0x1d20d9,
        text: text,
        args: _0xd86842,
        botNumber: _0x1b1d98,
        isCreator: _0x5bdeae,
        icmd: _0x4b9105,
        store: store,
        budy: _0xb74281,
        Suhail: Suhail,
        Void: _0x2131ed,
        proto: proto
      };
      let _0x577384 = {
        mp4: "video",
        mp3: "audio",
        webp: "sticker",
        photo: "image",
        picture: "image",
        vv: "viewonce"
      };
      events.commands.map(async _0x4202d2 => {
        if (typeof _0x4202d2.on === "string") {
          let _0x16f570 = _0x4202d2.on.trim();
          let _0x2fec49 = !_0x4202d2.fromMe || _0x4202d2.fromMe && _0x2a3e8d.fromMe;
          if (_0x16f570 === "main" && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          } else if (_0x2a3e8d.text && _0x16f570 === "text" && /text|txt|true|smd|suhail/gi.test(_0x4202d2.quoted) && _0x2a3e8d.quoted && _0x2a3e8d.quoted.text && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          } else if (_0x2a3e8d.text && ["body", "text"].includes(_0x16f570) && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          } else if (typeof _0x2a3e8d[_0x577384[_0x16f570] || _0x16f570] === "boolean" && _0x2a3e8d.quoted && _0x2a3e8d.quoted[_0x4202d2.quoted] && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          } else if (_0x16f570 === "viewonce" && (_0x2a3e8d.viewOnce || _0x1d20d9.message.viewOnceMessageV2)) {
            try {
              _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
            } catch (_0x551442) {
              console.log("[ERROR] ", _0x551442);
            }
          } else if (["status", "story"].includes(_0x16f570) && (_0x1d20d9.key.remoteJid === "status@broadcast" || _0x2a3e8d.jid === "status@broadcast") && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          } else if (typeof _0x2a3e8d[_0x577384[_0x16f570] || _0x16f570] === "boolean" && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          }
          if (_0x16f570 === "delete" && _0x2a3e8d.mtype == "protocolMessage" && _0x2a3e8d.msg.type === "REVOKE" && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          } else if (_0x16f570 === "poll" && /poll/gi.test(_0x2a3e8d.mtype) && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          } else if (_0x16f570 === "quoted" && _0x2a3e8d.quoted && _0x2fec49) {
            _0x4202d2.function(_0x2a3e8d, _0x45a3d4, _0x2fc84c);
          }
        }
      });
    } catch (_0x44ece4) {
      console.log("client.js --------- messages.upsert \n", _0x44ece4);
    }
  });
  let _0x30bde5 = {};
  _0x2131ed.ev.on("group-participants.update", async _0xf3fed7 => {
    try {
      let _0x250b7e = await groupsg(_0x2131ed, JSON.parse(JSON.stringify(_0xf3fed7)), true);
      if (!_0x250b7e || !_0x250b7e.isGroup) {
        return;
      }
      events.commands.map(async _0x51eba1 => {
        if (_0x250b7e.status === _0x51eba1.group) {
          try {
            _0x51eba1.function(_0x250b7e, {
              store: store,
              Void: _0x2131ed
            });
          } catch (_0x292106) {
            console.error("[GROUP PARTICEPENTS ADD ERROR] ", _0x292106);
          }
        }
        if (/on|true|main|all|suhail|smd/gi.test(_0x51eba1.group)) {
          try {
            _0x51eba1.function(_0x250b7e, {
              store: store,
              Void: _0x2131ed
            });
          } catch (_0xcfe4b7) {
            console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0xcfe4b7);
          }
        }
      });
    } catch (_0xc34e73) {
      console.log(_0xc34e73);
    }
  });
  _0x2131ed.ev.on("groups.update", async _0xf1e4e4 => {
    try {
      for (const _0x51e6a7 of _0xf1e4e4) {
        if (!store.allgroup) {
          store.allgroup = {};
        }
        ;
        store.allgroup[_0x51e6a7.id] = _0x51e6a7;
      }
    } catch (_0x1d9dcd) {
      console.log(_0x1d9dcd);
    }
  });
  _0x2131ed.ev.on("groups.upsert", async _0x18e6e5 => {
    try {
      events.commands.map(async _0x5b60a8 => {
        if (/on|true|main|all|suhail|smd/gi.test(_0x5b60a8.groupsetting || _0x5b60a8.upsertgroup || _0x5b60a8.groupupsert)) {
          _0x5b60a8.function({
            ..._0x18e6e5[0],
            bot: _0x2131ed
          }, {
            store: store,
            Void: _0x2131ed,
            data: _0x18e6e5
          });
        }
      });
      await groupsg(_0x2131ed, JSON.parse(JSON.stringify(_0x18e6e5[0])), false, true);
    } catch (_0x3d48e1) {
      console.log(_0x3d48e1);
    }
  });
  _0x2131ed.ev.on("contacts.upsert", _0x19c15b => {
    try {
      for (const _0x4046b8 of _0x19c15b) {
        store.contacts[_0x4046b8.id] = _0x4046b8;
      }
    } catch (_0x446743) {}
  });
  _0x2131ed.ev.on("contacts.update", async _0x5a7b52 => {
    for (let _0x32ef3d of _0x5a7b52) {
      let _0x51f107 = _0x2131ed.decodeJid(_0x32ef3d.id);
      if (store && store.contacts) {
        store.contacts[_0x51f107] = {
          id: _0x51f107,
          name: _0x32ef3d.notify
        };
      }
    }
  });
  _0x2131ed.serializeM = _0x1fd383 => smsg(_0x2131ed, _0x1fd383, store, false);
  _0x2131ed.ev.on("connection.update", async _0x4a4534 => {
    const {
      connection: _0x117006,
      lastDisconnect: _0x8aea49,
      receivedPendingNotifications: _0x3bd180,
      qr: _0x23e98e
    } = _0x4a4534;
    global.qr = _0x23e98e;
    if (_0x23e98e) {
      try {
        var _0x34c58b = require("qrcode");
        _0x34c58b.toString(_0x23e98e, function (_0x213237, _0x5e6b32) {
          if (_0x213237) {
            console.log(_0x213237);
          }
          log(_0x5e6b32);
        });
      } catch (_0x109125) {}
    }
    if (_0x117006 === "connecting") {
      log("ℹ️ Connecting to WhatsApp!");
    }
    if (_0x117006 === "open") {
      if (/true|ok|sure|yes/gi.test(global.ssreset) || !_0x2131ed.authState.creds?.myAppStateKeyId) {
        log("Resetting SESSION_ID" + (_0x2131ed.authState.creds?.myAppStateKeyId ? "" : " B'Coz *myAppStateKeyId Missing") + "!");
        _0x2131ed.ev.ssrest();
      }
      let _0x262d57 = _0x2131ed.decodeJid(_0x2131ed.user.id);
      let _0x1911ff = /923184474176|923004591719|17863688449/g.test(_0x262d57);
      let _0x3df532 = false;
      global.plugin_dir = path.join(__dirname, "../plugins/");
      if (!isMongodb && !sqldb) {
        main();
      }
      log("✅ Whatsapp Login Successful!");
      try {
        try {
          _0x3df532 = (await bot_.findOne({
            id: "bot_" + _0x262d57
          })) || (await bot_.new({
            id: "bot_" + _0x262d57
          }));
        } catch {
          _0x3df532 = false;
        }
        let _0x8f7f92 = [];
        let _0x2dc890 = {};
        let _0x574ef6 = {};
      /*  try {
          let {
            data: _0x963912
          } = await axios.get("https://gist.github.com/SuhailTechInfo/185b7e3296e0104ab211daa5ea11e7dc/raw");
          _0x2dc890 = {
            ...(typeof _0x963912.external === "object" ? _0x963912.external : {}),
            ...(typeof _0x963912.plugins === "object" ? _0x963912.plugins : {})
          };
          _0x8f7f92 = _0x963912.names;
          _0x574ef6 = _0x963912.extension && typeof _0x963912.extension === "object" ? _0x963912.extension : {};
        } catch (_0x1c3625) {
          _0x2dc890 = {};
        } */
        _0x8f7f92 = Array.isArray(_0x8f7f92) ? _0x8f7f92 : [];
        if (_0x3df532 && _0x3df532.plugins) {
          log("⏳ Checking External Plugins.!!");
          _0x2dc890 = {
            ..._0x3df532.plugins,
            ..._0x2dc890
          };
        }
        if (Object.keys(_0x2dc890 || {}).length > 0) {
          let _0x942548 = _0x2dc890;
          for (const _0x235bb0 in _0x942548) {
            try {
              let _0x1701c7 = _0x942548[_0x235bb0].includes("raw") ? _0x942548[_0x235bb0] : _0x942548[_0x235bb0] + "/raw";
              let {
                data: _0x3b4de2
              } = await axios.get(_0x1701c7);
              if (_0x3b4de2) {
                let _0x4e28ba = _0x235bb0 + (_0x574ef6[_0x235bb0] && /.js|.smd|.suhail/gi.test(_0x574ef6[_0x235bb0]) ? _0x574ef6[_0x235bb0] : ".smd");
                const _0x1adf14 = plugin_dir + (_0x4e28ba.includes("/") ? _0x4e28ba.split("/")[0] : "");
                if (!fs.existsSync(_0x1adf14)) {
                  fs.mkdirSync(_0x1adf14, {
                    recursive: true
                  });
                }
                fs.writeFileSync(plugin_dir + _0x4e28ba, _0x3b4de2, "utf8");
                if (!_0x8f7f92.includes(_0x235bb0)) {
                  log(" " + _0x235bb0 + " ✔️");
                }
              }
            } catch (_0x4f6e38) {
              if (_0x1911ff || !_0x8f7f92.includes(_0x235bb0)) {
                log(" " + _0x235bb0 + " ❌");
              }
            }
          }
          log("\n✅ External Plugins Installed!");
        }
      } catch (_0xd95311) {
        log("❌ ERROR INSTALATION PLUGINS ", e);
      }
      await loadPlugins(plugin_dir);
      let _0x42876d = "\nSUHAIL-MD Connected\n\n  Prefix  : [ " + (prefix ? prefix : "null") + " ]\n  Plugins : " + events.commands.length + "\n  Mode    : " + Config.WORKTYPE + "\n  Database: " + (isMongodb ? "MongoDb" : sqldb ? "PostegreSql" : "JSON(no db)") + "\n";
      _0x42876d += Math.floor(Math.random() * 5) == 1 ? "\n\nSUPPORT BY SUBSCRIBE\nyoutube.com/@suhailtechinfo\n" : "";
      try {
        const _0x7b3f27 = require("../lib/scraper");
        let _0x1d78d5 = await _0x7b3f27.syncgit();
        if (_0x1d78d5.total !== 0) {
          _0x42876d += "\n𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲\nRedeploy Bot as Soon as Possible!\n";
        }
      } catch (_0x3209eb) {}
      global.qr_message = {
        message: "BOT ALREADY CONNECTED!",
        bot_user: _0x262d57,
        connection: _0x42876d.trim()
      };
      print(_0x42876d);
      await _0x2131ed.sendMessage(_0x262d57, {
        text: "```" + ("" + _0x42876d).trim() + "```"
      }, {
        disappearingMessagesInChat: true,
        ephemeralExpiration: 86400
      });
      global.isStart = true;
      let _0x1f2e5c = true;
      let _0x81fa08 = {
        bot: _0x2131ed,
        user: _0x262d57,
        isSuhail: _0x1911ff,
        isCreator: _0x1f2e5c
      };
      let _0x1f8004 = {
        dbbot: _0x3df532,
        botNumber: _0x262d57,
        isCreator: _0x1f2e5c,
        isSuhail: _0x1911ff,
        store: store,
        Suhail: _0x81fa08,
        Void: _0x2131ed,
        ..._0x4a4534
      };
      events.commands.map(async _0xaccbb9 => {
        if (/true|main|ok|smd|suhail/gi.test(_0xaccbb9.connect || _0xaccbb9.open || _0xaccbb9.connection)) {
          try {
            await _0xaccbb9.function(_0x81fa08, _0x1f8004);
          } catch (_0xcadd73) {
            console.log("[ERROR] ", _0xcadd73);
          }
        }
      });
    }
    if (_0x117006 === "close") {
      await sleep(5000);
      global.isStart = false;
      global.qr_message = {
        message: "CONNECTION CLOSED WITH BOT!"
      };
      let _0x718846 = new Boom(_0x8aea49?.error)?.output.statusCode;
      if (_0x718846 === DisconnectReason.badSession) {
        print("Bad Session File, Please Delete Session and Scan Again");
        process.exit(0);
      } else if (_0x718846 === DisconnectReason.connectionClosed) {
        print("Connection closed, reconnecting....");
        syncdb().catch(_0x1379c4 => console.log(_0x1379c4));
      } else if (_0x718846 === DisconnectReason.connectionLost) {
        print("Connection Lost from Server, reconnecting...");
        syncdb().catch(_0x4cb9bc => console.log(_0x4cb9bc));
      } else if (_0x718846 === DisconnectReason.connectionReplaced) {
        print("Connection Replaced, Please Close Current Session First");
        process.exit(1);
      } else if (_0x718846 === DisconnectReason.loggedOut) {
        print("Device Logged Out, Please Scan Again And Run.");
        process.exit(1);
      } else if (_0x718846 === DisconnectReason.restartRequired) {
        print("Restart Required, Restarting...");
        syncdb().catch(_0x196814 => console.log(_0x196814));
      } else if (_0x718846 === DisconnectReason.timedOut) {
        print("Connection TimedOut, Reconnecting...");
        syncdb().catch(_0x1e7428 => console.log(_0x1e7428));
      } else if (_0x718846 === DisconnectReason.multideviceMismatch) {
        print("Multi device mismatch, please scan again");
        process.exit(0);
      } else {
        print("Connection closed with bot. Please put New Session ID again.");
        print(_0x718846);
        process.exit(0);
      }
    }
  });
  _0x2131ed.ev.on("creds.update", _0x2bf189);
  _0x2131ed.lastStatus = async () => {
    console.log("last_status :", last_status);
    return last_status;
  };
  _0x2131ed.decodeJid = _0x19fe5a => {
    if (!_0x19fe5a) {
      return _0x19fe5a;
    }
    if (/:\d+@/gi.test(_0x19fe5a)) {
      let _0x57c52a = jidDecode(_0x19fe5a) || {};
      return _0x57c52a.user && _0x57c52a.server && _0x57c52a.user + "@" + _0x57c52a.server || _0x19fe5a;
    } else {
      return _0x19fe5a;
    }
  };
  _0x2131ed.getName = (_0x477595, _0x40e822 = false) => {
    let _0x216b0d = _0x2131ed.decodeJid(_0x477595);
    let _0x19cdae;
    let _0x13ff8c = "+" + _0x477595.replace("@s.whatsapp.net", "");
    if (_0x216b0d.endsWith("@g.us")) {
      return new Promise(async _0x4c3a3e => {
        _0x19cdae = store.contacts[_0x216b0d] || {};
        if (!_0x19cdae.name?.notify && !_0x19cdae.subject) {
          try {
            _0x19cdae = (await _0x2131ed.groupMetadata(_0x216b0d)) || {};
          } catch (_0x29290d) {}
        }
        _0x4c3a3e(_0x19cdae.subject || _0x19cdae.name || _0x13ff8c);
      });
    } else {
      _0x19cdae = _0x216b0d === "0@s.whatsapp.net" ? {
        id: _0x216b0d,
        name: "WhatsApp"
      } : _0x216b0d === _0x2131ed.decodeJid(_0x2131ed.user.id) ? _0x2131ed.user : store.contacts[_0x216b0d] || {};
    }
    if (_0x19cdae.name || _0x19cdae.subject || _0x19cdae.verifiedName) {
      return _0x19cdae.name || _0x19cdae.subject || _0x19cdae.verifiedName || _0x13ff8c;
    } else {
      return userdb.findOne({
        id: _0x216b0d
      }).then(_0x23ba43 => _0x23ba43.name || _0x13ff8c).catch(_0x130dc9 => {
        _0x13ff8c;
      });
    }
  };
  _0x2131ed.sendContact = async (_0x5f26fc, _0x406162, _0x4fd303 = "", _0x552976 = {}) => {
    let _0x3efb3a = [];
    for (let _0x5ba6c8 of _0x406162) {
      _0x3efb3a.push({
        displayName: await _0x2131ed.getName(_0x5ba6c8 + "@s.whatsapp.net"),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x2131ed.getName(_0x5ba6c8 + "@s.whatsapp.net")) + "\nFN:" + global.OwnerName + "\nitem1.TEL;waid=" + _0x5ba6c8 + ":" + _0x5ba6c8 + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:GitHub\nitem3.URL:" + global.github + "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
      });
    }
    return _0x2131ed.sendMessage(_0x5f26fc, {
      contacts: {
        displayName: _0x3efb3a.length + " Contact",
        contacts: _0x3efb3a
      },
      ..._0x552976
    }, {
      quoted: _0x4fd303
    });
  };
  _0x2131ed.setStatus = _0x226a15 => {
    _0x2131ed.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status"
      },
      content: [{
        tag: "status",
        attrs: {},
        content: Buffer.from(_0x226a15, "utf-8")
      }]
    });
    return _0x226a15;
  };
  _0x2131ed.messageId = (_0x2f2656 = 8, _0x6b5572 = "SUHAILMD") => {
    const _0x42cf5d = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let _0x5cd7f9 = 0; _0x5cd7f9 < _0x2f2656; _0x5cd7f9++) {
      const _0x3a2693 = Math.floor(Math.random() * _0x42cf5d.length);
      _0x6b5572 += _0x42cf5d.charAt(_0x3a2693);
    }
    return _0x6b5572;
  };
  _0x2131ed.send5ButImg = async (_0x20cab5, _0x35390c = "", _0x1943d9 = "", _0x268c28, _0x452640 = [], _0x11033c, _0x1e2253 = {}) => {
    let _0x5a6b8a = await prepareWAMessageMedia({
      image: _0x268c28,
      jpegThumbnail: _0x11033c
    }, {
      upload: _0x2131ed.waUploadToServer
    });
    var _0x3f6d82 = generateWAMessageFromContent(_0x20cab5, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: _0x5a6b8a.imageMessage,
          hydratedContentText: _0x35390c,
          hydratedFooterText: _0x1943d9,
          hydratedButtons: _0x452640
        }
      }
    }), _0x1e2253);
    _0x2131ed.relayMessage(_0x20cab5, _0x3f6d82.message, {
      messageId: _0x2131ed.messageId()
    });
  };
  _0x2131ed.sendButtonText = (_0xf67c0e, _0x10744b = [], _0x557df0, _0x34ac30, _0x2d247b = "", _0x29f321 = {}) => {
    let _0x47cef4 = {
      text: _0x557df0,
      footer: _0x34ac30,
      buttons: _0x10744b,
      headerType: 2,
      ..._0x29f321
    };
    _0x2131ed.sendMessage(_0xf67c0e, _0x47cef4, {
      quoted: _0x2d247b,
      ..._0x29f321
    });
  };
  _0x2131ed.sendText = (_0xc424d5, _0x3989b0, _0x44af09 = "", _0x487bb8) => _0x2131ed.sendMessage(_0xc424d5, {
    text: _0x3989b0,
    ..._0x487bb8
  }, {
    quoted: _0x44af09
  });
  _0x2131ed.sendImage = async (_0xee1361, _0x17ab13, _0x5ccb6b = "", _0x3c15e4 = "", _0x5366f9) => {
    let _0x5617d2 = Buffer.isBuffer(_0x17ab13) ? _0x17ab13 : /^data:.*?\/.*?;base64,/i.test(_0x17ab13) ? Buffer.from(_0x17ab13.split`,`[1], "base64") : /^https?:\/\//.test(_0x17ab13) ? await await getBuffer(_0x17ab13) : fs.existsSync(_0x17ab13) ? fs.readFileSync(_0x17ab13) : Buffer.alloc(0);
    return await _0x2131ed.sendMessage(_0xee1361, {
      image: _0x5617d2,
      caption: _0x5ccb6b,
      ..._0x5366f9
    }, {
      quoted: _0x3c15e4
    });
  };
  _0x2131ed.sendTextWithMentions = async (_0x326a70, _0x341a96, _0x5b97b8, _0x146874 = {}) => _0x2131ed.sendMessage(_0x326a70, {
    text: _0x341a96,
    contextInfo: {
      mentionedJid: [..._0x341a96.matchAll(/@(\d{0,16})/g)].map(_0x57c473 => _0x57c473[1] + "@s.whatsapp.net")
    },
    ..._0x146874
  }, {
    quoted: _0x5b97b8
  });
  _0x2131ed.sendImageAsSticker = async (_0x84ccec, _0x36c19d, _0x217118 = {}) => {
    let _0x5a0db8;
    if (_0x217118 && (_0x217118.packname || _0x217118.author)) {
      _0x5a0db8 = await writeExifImg(_0x36c19d, _0x217118);
    } else {
      _0x5a0db8 = await imageToWebp(_0x36c19d);
    }
    await _0x2131ed.sendMessage(_0x84ccec, {
      sticker: {
        url: _0x5a0db8
      },
      ..._0x217118
    }, _0x217118);
  };
  _0x2131ed.sendVideoAsSticker = async (_0x4bf8ae, _0x3e2cf9, _0x5a63d1 = {}) => {
    let _0x5b1bf0;
    if (_0x5a63d1 && (_0x5a63d1.packname || _0x5a63d1.author)) {
      _0x5b1bf0 = await writeExifVid(_0x3e2cf9, _0x5a63d1);
    } else {
      _0x5b1bf0 = await videoToWebp(_0x3e2cf9);
    }
    await _0x2131ed.sendMessage(_0x4bf8ae, {
      sticker: {
        url: _0x5b1bf0
      },
      ..._0x5a63d1
    }, _0x5a63d1);
  };
  _0x2131ed.sendMedia = async (_0x5c5e96, _0x2a06b7, _0x4271ac = "", _0x54a380 = "", _0x58a615 = "", _0x474c73 = {}) => {
    let _0x551355 = await _0x2131ed.getFile(_0x2a06b7, true);
    let {
      mime: _0x15323d,
      ext: _0x1adbdb,
      res: _0x512ffb,
      data: _0x2f6bff,
      filename: _0x431d01
    } = _0x551355;
    if (_0x512ffb && _0x512ffb.status !== 200 || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString())
        };
      } catch (_0x35a9f0) {
        if (_0x35a9f0.json) {
          throw _0x35a9f0.json;
        }
      }
    }
    let _0x1ee361 = "";
    let _0x31d94a = _0x15323d;
    let _0x89b3d5 = _0x431d01;
    if (_0x474c73.asDocument) {
      _0x1ee361 = "document";
    }
    if (_0x474c73.asSticker || /webp/.test(_0x15323d)) {
      let {
        writeExif: _0x15a159
      } = require("./exif");
      let _0x46a306 = {
        mimetype: _0x15323d,
        data: _0x2f6bff
      };
      _0x89b3d5 = await _0x15a159(_0x46a306, {
        packname: _0x474c73.packname ? _0x474c73.packname : Config.packname,
        author: _0x474c73.author ? _0x474c73.author : Config.author,
        categories: _0x474c73.categories ? _0x474c73.categories : []
      });
      await fs.promises.unlink(_0x431d01);
      _0x1ee361 = "sticker";
      _0x31d94a = "image/webp";
    } else if (/image/.test(_0x15323d)) {
      _0x1ee361 = "image";
    } else if (/video/.test(_0x15323d)) {
      _0x1ee361 = "video";
    } else if (/audio/.test(_0x15323d)) {
      _0x1ee361 = "audio";
    } else {
      _0x1ee361 = "document";
    }
    await _0x2131ed.sendMessage(_0x5c5e96, {
      [_0x1ee361]: {
        url: _0x89b3d5
      },
      caption: _0x54a380,
      mimetype: _0x31d94a,
      fileName: _0x4271ac,
      ..._0x474c73
    }, {
      quoted: _0x58a615,
      ..._0x474c73
    });
    return fs.promises.unlink(_0x89b3d5);
  };
  _0x2131ed.downloadAndSaveMediaMessage = async (_0xd95d07, _0x5751f6 = "null", _0x1cb7fa = false, _0x14a887 = true) => {
    let _0x1e254 = _0xd95d07.msg ? _0xd95d07.msg : _0xd95d07;
    let _0x1746b1 = _0x1e254.mimetype || "";
    let _0x55480f = _0xd95d07.mtype ? _0xd95d07.mtype.split(/Message/gi)[0] : _0x1e254.mtype ? _0x1e254.mtype.split(/Message/gi)[0] : _0x1746b1.split("/")[0];
    const _0x142cb9 = await downloadContentFromMessage(_0x1e254, _0x55480f);
    let _0x87d298 = Buffer.from([]);
    for await (const _0x358d5d of _0x142cb9) {
      _0x87d298 = Buffer.concat([_0x87d298, _0x358d5d]);
    }
    if (_0x1cb7fa) {
      return _0x87d298;
    }
    let _0x4a5375 = await FileType.fromBuffer(_0x87d298);
    let _0x65c122 = "./temp/" + _0x5751f6 + "." + _0x4a5375.ext;
    fs.writeFileSync(_0x65c122, _0x87d298);
    return _0x65c122;
  };
  _0x2131ed.forward = async (_0x1a7a0b, _0x4764d4, _0xe88336, _0x5625bf, _0x302bf8 = true) => {
    try {
      let _0x46b2ef = _0x4764d4.mtype;
      let _0xeb99cb = {};
      console.log("Forward function Called and Type is : ", _0x46b2ef);
      if (_0x46b2ef == "conversation") {
        _0xeb99cb = {
          text: _0x4764d4.text,
          contextInfo: _0xe88336
        };
        for (let _0x3514c1 of parsedJid(_0x1a7a0b)) {
          await _0x2131ed.sendMessage(_0x3514c1, _0xeb99cb, {
            quoted: _0x5625bf,
            messageId: _0x2131ed.messageId()
          });
        }
        return;
      }
      const _0x407663 = _0x1565af => {
        return "" + Math.floor(Math.random() * 10000) + _0x1565af;
      };
      let _0x1ca122 = _0x4764d4.msg ? _0x4764d4.msg : _0x4764d4;
      let _0x263aa7 = (_0x4764d4.msg || _0x4764d4).mimetype || "";
      let _0x4f37e8 = _0x4764d4.mtype ? _0x4764d4.mtype.replace(/Message/gi, "") : _0x263aa7.split("/")[0];
      const _0x3eca90 = await downloadContentFromMessage(_0x1ca122, _0x4f37e8);
      let _0x475442 = Buffer.from([]);
      for await (const _0x3d9f47 of _0x3eca90) {
        _0x475442 = Buffer.concat([_0x475442, _0x3d9f47]);
      }
      let _0x574af6 = await FileType.fromBuffer(_0x475442);
      let _0x307023 = await _0x407663(_0x574af6.ext);
      let _0x202cb0 = "./temp/" + _0x307023;
      fs.writeFileSync(_0x202cb0, _0x475442);
      if (_0x46b2ef == "videoMessage") {
        _0xeb99cb = {
          video: fs.readFileSync(_0x202cb0),
          mimetype: _0x4764d4.mimetype,
          caption: _0x4764d4.text,
          contextInfo: _0xe88336
        };
      } else if (_0x46b2ef == "imageMessage") {
        _0xeb99cb = {
          image: fs.readFileSync(_0x202cb0),
          mimetype: _0x4764d4.mimetype,
          caption: _0x4764d4.text,
          contextInfo: _0xe88336
        };
      } else if (_0x46b2ef == "audioMessage") {
        _0xeb99cb = {
          audio: fs.readFileSync(_0x202cb0),
          mimetype: _0x4764d4.mimetype,
          seconds: 200001355,
          ptt: true,
          contextInfo: _0xe88336
        };
      } else if (_0x46b2ef == "documentWithCaptionMessage" || _0x574af6 == "documentMessage") {
        _0xeb99cb = {
          document: fs.readFileSync(_0x202cb0),
          mimetype: _0x4764d4.mimetype,
          caption: _0x4764d4.text,
          contextInfo: _0xe88336
        };
      } else {
        fs.unlink(_0x202cb0, _0x2e1df8 => {
          if (_0x2e1df8) {
            console.error("Error deleting file:", _0x2e1df8);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      for (let _0x4ddeeb of parsedJid(_0x1a7a0b)) {
        try {
          await _0x2131ed.sendMessage(_0x4ddeeb, _0xeb99cb, {
            quoted: _0x5625bf,
            messageId: _0x2131ed.messageId()
          });
        } catch (_0x9cd22c) {}
      }
      return fs.unlink(_0x202cb0, _0x183eef => {
        if (_0x183eef) {
          console.error("Error deleting file:", _0x183eef);
        } else {
          console.log("File deleted successfully");
        }
      });
    } catch (_0x1845b5) {
      console.log(_0x1845b5);
    }
  };
  _0x2131ed.downloadMediaMessage = async _0x9b0317 => {
    let _0x240ba3 = _0x9b0317.msg ? _0x9b0317.msg : _0x9b0317;
    let _0x5851e5 = (_0x9b0317.msg || _0x9b0317).mimetype || "";
    let _0x305bc2 = _0x9b0317.mtype ? _0x9b0317.mtype.replace(/Message/gi, "") : _0x5851e5.split("/")[0];
    const _0x955862 = await downloadContentFromMessage(_0x240ba3, _0x305bc2);
    let _0x5a6ffb = Buffer.from([]);
    for await (const _0x56a993 of _0x955862) {
      _0x5a6ffb = Buffer.concat([_0x5a6ffb, _0x56a993]);
    }
    return _0x5a6ffb;
  };
  _0x2131ed.forwardOrBroadCast2 = async (_0x3c7d6b, _0x33f962, _0x2ddcc2 = {}, _0x5820d2 = "") => {
    try {
      let _0xeb507b = _0x33f962.mtype;
      if (_0xeb507b === "videoMessage" && _0x5820d2 === "ptv") {
        _0x33f962 = {
          ptvMessage: {
            ..._0x33f962.msg
          }
        };
      }
      let _0x8b8f61 = {
        ..._0x2ddcc2,
        contextInfo: {
          ...(_0x2ddcc2.contextInfo ? _0x2ddcc2.contextInfo : {}),
          ...(_0x2ddcc2.linkPreview ? {
            linkPreview: {
              ..._0x2ddcc2.linkPreview
            }
          } : {}),
          ...(_0x2ddcc2.quoted && _0x2ddcc2.quoted.message ? {
            quotedMessage: {
              ...(_0x2ddcc2.quoted?.message || {})
            }
          } : {})
        }
      };
      var _0x1f21eb = _0x33f962.message ? _0x33f962.message : _0x33f962;
      let _0x3afe9a = _0xeb507b ? _0xeb507b : Object.keys(_0x1f21eb)[0];
      _0x1f21eb = {
        ..._0x8b8f61,
        ..._0x1f21eb
      };
      const _0xb13456 = await generateWAMessageFromContent(_0x3c7d6b, _0x1f21eb, _0x2ddcc2 ? {
        ...(_0x3afe9a == "conversation" ? {
          extendedTextMessage: {
            text: _0x1f21eb[_0x3afe9a]
          }
        } : _0x1f21eb[_0x3afe9a]),
        ..._0x8b8f61,
        contextInfo: {
          ...(_0x1f21eb[_0x3afe9a]?.contextInfo || {}),
          ..._0x8b8f61.contextInfo
        }
      } : {});
      await _0x2131ed.relayMessage(_0x3c7d6b, _0xb13456.message, {
        messageId: _0x2131ed.messageId()
      });
      return _0xb13456;
    } catch {}
  };
  _0x2131ed.forwardOrBroadCast = async (_0x2debea, _0x872f21, _0x5dc4a7 = {}, _0x56e1bf = "") => {
    try {
      if (!_0x5dc4a7 || typeof _0x5dc4a7 !== "object") {
        _0x5dc4a7 = {};
      }
      _0x5dc4a7.messageId = _0x5dc4a7.messageId || _0x2131ed.messageId();
      var _0x522ccc = _0x872f21.message ? _0x872f21.message : _0x872f21;
      let _0x5d1750 = _0x522ccc.mtype ? _0x522ccc.mtype : Object.keys(_0x522ccc)[0];
      if (_0x5d1750 === "videoMessage" && _0x56e1bf === "ptv") {
        _0x522ccc = {
          ptvMessage: {
            ..._0x872f21.msg
          }
        };
        _0x5d1750 = "ptvMessage";
      } else if (_0x5d1750 == "conversation") {
        _0x522ccc = {
          extendedTextMessage: {
            text: _0x522ccc[_0x5d1750]
          }
        };
        _0x5d1750 = "extendedTextMessage";
      }
      _0x522ccc[_0x5d1750] = {
        ...(_0x522ccc[_0x5d1750] || _0x522ccc),
        ..._0x5dc4a7
      };
      const _0x2e17e9 = generateWAMessageFromContent(_0x2debea, _0x522ccc, _0x5dc4a7);
      await _0x2131ed.relayMessage(_0x2debea, _0x2e17e9.message, {
        messageId: _0x5dc4a7.messageId
      });
      return _0x2e17e9;
    } catch (_0x237826) {
      console.log(_0x237826);
    }
  };
  _0x2131ed.forwardMessage = _0x2131ed.forwardOrBroadCast;
  _0x2131ed.copyNForward = async (_0x28b01c, _0x4133bb, _0x538fdb = false, _0x5b19ce = {}) => {
    try {
      let _0x2306b5;
      if (_0x5b19ce.readViewOnce) {
        _0x4133bb.message = _0x4133bb.message && _0x4133bb.message.ephemeralMessage && _0x4133bb.message.ephemeralMessage.message ? _0x4133bb.message.ephemeralMessage.message : _0x4133bb.message || undefined;
        _0x2306b5 = Object.keys(_0x4133bb.message.viewOnceMessage.message)[0];
        delete (_0x4133bb.message && _0x4133bb.message.ignore ? _0x4133bb.message.ignore : _0x4133bb.message || undefined);
        delete _0x4133bb.message.viewOnceMessage.message[_0x2306b5].viewOnce;
        _0x4133bb.message = {
          ..._0x4133bb.message.viewOnceMessage.message
        };
      }
      let _0x4f9662 = Object.keys(_0x4133bb.message)[0];
      try {
        _0x4133bb.key.fromMe = true;
      } catch (_0x39ddb4) {}
      let _0xd0b5eb = await generateForwardMessageContent(_0x4133bb, _0x538fdb);
      let _0xfdad2e = Object.keys(_0xd0b5eb)[0];
      let _0x717ee2 = {};
      if (_0x4f9662 != "conversation") {
        _0x717ee2 = _0x4133bb.message[_0x4f9662].contextInfo;
      }
      _0xd0b5eb[_0xfdad2e].contextInfo = {
        ..._0x717ee2,
        ..._0xd0b5eb[_0xfdad2e].contextInfo
      };
      const _0x4468b5 = await generateWAMessageFromContent(_0x28b01c, _0xd0b5eb, _0x5b19ce);
      await _0x2131ed.relayMessage(_0x28b01c, _0x4468b5.message, {
        messageId: _0x2131ed.messageId()
      });
      return _0x4468b5;
    } catch (_0x5aa5d3) {
      console.log(_0x5aa5d3);
    }
  };
  _0x2131ed.sendFileUrl = async (_0x59497d, _0x29b4f5, _0x4f15cf = "", _0x1ba4a3 = "", _0x4692ef = {
    author: "Suhail-Md"
  }, _0x381683 = "") => {
    try {
      let _0xddde5c = await axios.head(_0x29b4f5);
      let _0x592bbf = _0xddde5c?.headers["content-type"] || "";
      let _0x185d93 = _0x592bbf.split("/")[0];
      let _0x433877 = false;
      if (_0x592bbf.split("/")[1] === "gif" || _0x381683 === "gif") {
        _0x433877 = {
          video: {
            url: _0x29b4f5
          },
          caption: _0x4f15cf,
          gifPlayback: true,
          ..._0x4692ef
        };
      } else if (_0x592bbf.split("/")[1] === "webp" || _0x381683 === "sticker") {
        _0x433877 = {
          sticker: {
            url: _0x29b4f5
          },
          ..._0x4692ef
        };
      } else if (_0x185d93 === "image" || _0x381683 === "image") {
        _0x433877 = {
          image: {
            url: _0x29b4f5
          },
          caption: _0x4f15cf,
          ..._0x4692ef,
          mimetype: "image/jpeg"
        };
      } else if (_0x185d93 === "video" || _0x381683 === "video") {
        _0x433877 = {
          video: {
            url: _0x29b4f5
          },
          caption: _0x4f15cf,
          mimetype: "video/mp4",
          ..._0x4692ef
        };
      } else if (_0x185d93 === "audio" || _0x381683 === "audio") {
        _0x433877 = {
          audio: {
            url: _0x29b4f5
          },
          mimetype: "audio/mpeg",
          ..._0x4692ef
        };
      } else if (_0x592bbf == "application/pdf") {
        _0x433877 = {
          document: {
            url: _0x29b4f5
          },
          mimetype: "application/pdf",
          caption: _0x4f15cf,
          ..._0x4692ef
        };
      }
      if (_0x433877) {
        try {
          return await _0x2131ed.sendMessage(_0x59497d, _0x433877, {
            quoted: _0x1ba4a3
          });
        } catch {}
        ;
      }
      try {
        var _0x1c562a = _0xddde5c?.headers["content-disposition"]?.split("=\"")[1]?.split("\"")[0] || "file";
        if (_0x1c562a) {
          const _0x1c2946 = [".jpg", ".jpeg", ".png"];
          const _0x220d80 = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
          var _0x59350d = _0x1c562a.substring(_0x1c562a.lastIndexOf("."))?.toLowerCase() || "nillll";
          var _0x1f06b4;
          if (_0x1c2946.includes(_0x59350d)) {
            _0x1f06b4 = "image/jpeg";
          } else if (_0x220d80.includes(_0x59350d)) {
            _0x1f06b4 = "video/mp4";
          }
          _0x592bbf = _0x1f06b4 ? _0x1f06b4 : _0x592bbf;
          let _0x4a6a13 = {
            fileName: _0x1c562a || "file",
            caption: _0x4f15cf,
            ..._0x4692ef,
            mimetype: _0x592bbf
          };
          return await _0x2131ed.sendMessage(_0x59497d, {
            document: {
              url: _0x29b4f5
            },
            ..._0x4a6a13
          }, {
            quoted: _0x1ba4a3
          });
        }
      } catch (_0x29a465) {}
      let _0x16e069 = {
        fileName: _0x1c562a ? _0x1c562a : "file",
        caption: _0x4f15cf,
        ..._0x4692ef,
        mimetype: _0x592bbf
      };
      return await _0x2131ed.sendMessage(_0x59497d, {
        document: {
          url: _0x29b4f5
        },
        ..._0x16e069
      }, {
        quoted: _0x1ba4a3
      });
    } catch (_0x5b8638) {
      console.log("Erorr in client.sendFileUrl() : ", _0x5b8638);
      throw _0x5b8638;
    }
  };
  _0x2131ed.sendFromUrl = _0x2131ed.sendFileUrl;
  const _0x5d409c = {};
  let _0x2ead12 = [];
  _0x2131ed.sendUi = async (_0xa0a74f, _0x502e3a = {}, _0x356cb6 = "", _0x49add3 = "", _0x296671 = "", _0x182f83 = false) => {
    let _0x5ae67d = {};
    try {
      const _0x1c079c = /(https?:\/\/\S+)/gi;
      const _0x446421 = [".jpg", ".jpeg", ".png"];
      const _0x4aa550 = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
      let _0x3b4b60 = video = false;
      if (!_0x2ead12 || !_0x2ead12[0]) {
        _0x2ead12 = global.userImages ? global.userImages.split(",") : [await botpic()];
        _0x2ead12 = _0x2ead12.filter(_0x398230 => _0x398230.trim() !== "");
      }
      let _0x59c8f2 = _0x49add3 && _0x296671 ? _0x296671 : _0x2ead12[Math.floor(Math.random() * _0x2ead12.length)];
      if (!_0x5d409c[_0x59c8f2]) {
        const _0x349146 = _0x59c8f2.substring(_0x59c8f2.lastIndexOf(".")).toLowerCase();
        if (_0x446421.includes(_0x349146)) {
          _0x3b4b60 = true;
        }
        if (_0x4aa550.includes(_0x349146)) {
          video = true;
        }
        _0x5d409c[_0x59c8f2] = {
          image: _0x3b4b60,
          video: video
        };
      }
      _0x356cb6 = _0x356cb6 && _0x356cb6.quoted?.key ? _0x356cb6.quoted : _0x356cb6 || "";
      let _0xf3127b;
      if ((_0x182f83 && _0x296671 && global.custom > 0 || !_0x296671) && /text|txt|nothing|smd|suhail/.test(global.userImages) || _0x49add3 == "text") {
        _0xf3127b = {
          text: _0x502e3a.text || _0x502e3a.caption,
          ..._0x502e3a
        };
      } else if (_0x49add3 == "image" || _0x5d409c[_0x59c8f2].image) {
        _0xf3127b = {
          image: {
            url: _0x59c8f2
          },
          ..._0x502e3a,
          mimetype: "image/jpeg"
        };
      } else if (_0x49add3 == "video" || _0x5d409c[_0x59c8f2].video) {
        _0xf3127b = {
          video: {
            url: _0x59c8f2
          },
          ..._0x502e3a,
          mimetype: "video/mp4",
          gifPlayback: true,
          height: 274,
          width: 540
        };
      }
      const _0x311051 = _0x182f83 && _0x296671 && global.custom > 0 ? await smdBuffer(_0x296671) : null;
      _0x5ae67d = {
        ...(await _0x2131ed.contextInfo(Config.botname, _0x356cb6 && _0x356cb6.senderName ? _0x356cb6.senderName : Config.ownername, _0x311051))
      };
      if (_0xf3127b) {
        return await _0x2131ed.sendMessage(_0xa0a74f, {
          contextInfo: _0x5ae67d,
          ..._0xf3127b
        }, {
          quoted: _0x356cb6
        });
      }
    } catch (_0x34e774) {
      console.log("erorr in userImages() : ", _0x34e774);
    }
    try {
      return await _0x2131ed.sendMessage(_0xa0a74f, {
        image: {
          url: await botpic()
        },
        contextInfo: _0x5ae67d,
        ..._0x502e3a
      });
    } catch {
      return _0x2131ed.sendMessage(_0xa0a74f, {
        text: _0x502e3a.text || _0x502e3a.caption,
        ..._0x502e3a
      });
    }
  };
  _0x2131ed.contextInfo = async (_0x585d08 = Config.botname, _0x4b3529 = Config.ownername, _0x3d9548 = log0, _0xca9b7b = 1, _0x2390df = gurl, _0x2dbdcf = false) => {
    try {
      let _0x1af976 = _0x2dbdcf ? _0x2dbdcf : global.custom;
      if (_0x1af976 >= 5) {
        return {
          externalAdReply: {
            title: _0x585d08,
            body: _0x4b3529,
            renderLargerThumbnail: true,
            showAdAttribution: true,
            thumbnail: _0x3d9548 || log0,
            mediaType: _0xca9b7b || 1,
            mediaUrl: _0x2390df,
            sourceUrl: _0x2390df
          }
        };
      } else if (_0x1af976 == 4) {
        return {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: _0x585d08,
            body: _0x4b3529,
            renderLargerThumbnail: true,
            thumbnail: _0x3d9548 || log0,
            mediaType: _0xca9b7b || 1,
            mediaUrl: _0x2390df,
            sourceUrl: _0x2390df
          }
        };
      } else if (_0x1af976 == 3) {
        return {
          externalAdReply: {
            title: _0x585d08,
            body: _0x4b3529,
            renderLargerThumbnail: true,
            thumbnail: _0x3d9548 || log0,
            mediaType: _0xca9b7b || 1,
            mediaUrl: _0x2390df,
            sourceUrl: _0x2390df
          }
        };
      } else if (_0x1af976 == 2) {
        return {
          externalAdReply: {
            title: _0x585d08,
            body: _0x4b3529,
            thumbnail: _0x3d9548 || log0,
            showAdAttribution: true,
            mediaType: 1,
            mediaUrl: _0x2390df,
            sourceUrl: _0x2390df
          }
        };
      } else if (_0x1af976 == 1) {
        return {
          externalAdReply: {
            title: _0x585d08,
            body: _0x4b3529,
            thumbnail: _0x3d9548 || log0,
            mediaType: 1,
            mediaUrl: _0x2390df,
            sourceUrl: _0x2390df
          }
        };
      } else {
        return {};
      }
    } catch (_0x498462) {
      console.log("error in client.contextInfo() : ", _0x498462);
      return {};
    }
  };
  _0x2131ed.cMod = (_0x42ffd4, _0x15657f, _0xbb5d50 = "", _0x1603dc = _0x2131ed.user.id, _0xfdb774 = {}) => {
    let _0x3eb40a = Object.keys(_0x15657f.message)[0];
    let _0x3d9452 = _0x3eb40a === "ephemeralMessage";
    if (_0x3d9452) {
      _0x3eb40a = Object.keys(_0x15657f.message.ephemeralMessage.message)[0];
    }
    let _0x5a2931 = _0x3d9452 ? _0x15657f.message.ephemeralMessage.message : _0x15657f.message;
    let _0x5c588f = _0x5a2931[_0x3eb40a];
    if (typeof _0x5c588f === "string") {
      _0x5a2931[_0x3eb40a] = _0xbb5d50 || _0x5c588f;
    } else if (_0x5c588f.caption) {
      _0x5c588f.caption = _0xbb5d50 || _0x5c588f.caption;
    } else if (_0x5c588f.text) {
      _0x5c588f.text = _0xbb5d50 || _0x5c588f.text;
    }
    if (typeof _0x5c588f !== "string") {
      _0x5a2931[_0x3eb40a] = {
        ..._0x5c588f,
        ..._0xfdb774
      };
    }
    if (_0x15657f.key.participant) {
      _0x1603dc = _0x15657f.key.participant = _0x1603dc || _0x15657f.key.participant;
    } else if (_0x15657f.key.participant) {
      _0x1603dc = _0x15657f.key.participant = _0x1603dc || _0x15657f.key.participant;
    }
    if (_0x15657f.key.remoteJid.includes("@s.whatsapp.net")) {
      _0x1603dc = _0x1603dc || _0x15657f.key.remoteJid;
    } else if (_0x15657f.key.remoteJid.includes("@broadcast")) {
      _0x1603dc = _0x1603dc || _0x15657f.key.remoteJid;
    }
    _0x15657f.key.remoteJid = _0x42ffd4;
    _0x15657f.key.fromMe = _0x1603dc === _0x2131ed.user.id;
    return proto.WebMessageInfo.fromObject(_0x15657f);
  };
  _0x2131ed.getFile = async (_0x105f5e, _0x22d25c) => {
    let _0x4517b9;
    let _0x2642df = Buffer.isBuffer(_0x105f5e) ? _0x105f5e : /^data:.*?\/.*?;base64,/i.test(_0x105f5e) ? Buffer.from(_0x105f5e.split`,`[1], "base64") : /^https?:\/\//.test(_0x105f5e) ? await (_0x4517b9 = await getBuffer(_0x105f5e)) : fs.existsSync(_0x105f5e) ? (_0x115a6e = _0x105f5e, fs.readFileSync(_0x105f5e)) : typeof _0x105f5e === "string" ? _0x105f5e : Buffer.alloc(0);
    let _0x355af4 = (await FileType.fromBuffer(_0x2642df)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    let _0x115a6e = "./temp/null." + _0x355af4.ext;
    if (_0x2642df && _0x22d25c) {
      fs.promises.writeFile(_0x115a6e, _0x2642df);
    }
    return {
      res: _0x4517b9,
      filename: _0x115a6e,
      size: getSizeMedia(_0x2642df),
      ..._0x355af4,
      data: _0x2642df
    };
  };
  _0x2131ed.sendFile = async (_0x1da1b9, _0x330fca, _0x17df6b, _0x4448e7 = {
    quoted: ""
  }, _0x1f562c = {}) => {
    let _0x1840d3 = await _0x2131ed.getFile(_0x330fca, true);
    let {
      filename: _0x22f56a,
      size: _0x2f42f4,
      ext: _0x343d74,
      mime: _0xcb5eb1,
      data: _0x4c346d
    } = _0x1840d3;
    let _0x31b610 = "";
    let _0x3df1a2 = _0xcb5eb1;
    let _0x2927aa = _0x22f56a;
    if (_0x1f562c.asDocument) {
      _0x31b610 = "document";
    }
    if (_0x1f562c.asSticker || /webp/.test(_0xcb5eb1)) {
      let {
        writeExif: _0xa4f6a
      } = require("./exif.js");
      let _0x5b8555 = {
        mimetype: _0xcb5eb1,
        data: _0x4c346d
      };
      _0x2927aa = await _0xa4f6a(_0x5b8555, {
        packname: Config.packname,
        author: Config.packname,
        categories: _0x1f562c.categories ? _0x1f562c.categories : []
      });
      await fs.promises.unlink(_0x22f56a);
      _0x31b610 = "sticker";
      _0x3df1a2 = "image/webp";
    } else if (/image/.test(_0xcb5eb1)) {
      _0x31b610 = "image";
    } else if (/video/.test(_0xcb5eb1)) {
      _0x31b610 = "video";
    } else if (/audio/.test(_0xcb5eb1)) {
      _0x31b610 = "audio";
    } else {
      _0x31b610 = "document";
    }
    await _0x2131ed.sendMessage(_0x1da1b9, {
      [_0x31b610]: {
        url: _0x2927aa
      },
      mimetype: _0x3df1a2,
      fileName: _0x17df6b,
      ..._0x1f562c
    }, {
      quoted: _0x4448e7 && _0x4448e7.quoted ? _0x4448e7.quoted : _0x4448e7,
      ..._0x4448e7
    });
    return fs.promises.unlink(_0x2927aa);
  };
  _0x2131ed.fakeMessage = async (_0x2ca77a = "text", _0x91d47d = {}, _0x125a55 = "➬ Suhail SER", _0x946431 = {}) => {
    const _0x1c4f65 = [777, 0, 100, 500, 1000, 999, 2021];
    let _0x4572b8 = {
      id: _0x2131ed.messageId(),
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      ..._0x91d47d
    };
    let _0x26afb7 = {};
    if (_0x2ca77a == "text" || _0x2ca77a == "conservation" || !_0x2ca77a) {
      _0x26afb7 = {
        conversation: _0x125a55
      };
    } else if (_0x2ca77a == "order") {
      _0x26afb7 = {
        orderMessage: {
          itemCount: _0x1c4f65[Math.floor(_0x1c4f65.length * Math.random())],
          status: 1,
          surface: 1,
          message: "❏ " + _0x125a55,
          orderTitle: "live",
          sellerJid: "923184474176@s.whatsapp.net"
        }
      };
    } else if (_0x2ca77a == "contact") {
      _0x26afb7 = {
        contactMessage: {
          displayName: "" + _0x125a55,
          jpegThumbnail: log0
        }
      };
    } else if (_0x2ca77a == "image") {
      _0x26afb7 = {
        imageMessage: {
          jpegThumbnail: log0,
          caption: _0x125a55
        }
      };
    } else if (_0x2ca77a == "video") {
      _0x26afb7 = {
        videoMessage: {
          url: log0,
          caption: _0x125a55,
          mimetype: "video/mp4",
          fileLength: "4757228",
          seconds: 44
        }
      };
    }
    return {
      key: {
        ..._0x4572b8
      },
      message: {
        ..._0x26afb7,
        ..._0x946431
      }
    };
  };
  _0x2131ed.parseMention = async _0x4e8f23 => {
    return [..._0x4e8f23.matchAll(/@([0-9]{5,16}|0)/g)].map(_0xfdeec9 => _0xfdeec9[1] + "@s.whatsapp.net");
  };
  app.get("/chat", (_0x2393c0, _0x2258cd) => {
    let _0x58d9fa = _0x2393c0.query.chat || _0x2393c0.query.jid || _0x2131ed.user.id || _0x2131ed.user.m || "";
    if (["all", "msg", "total"].includes(_0x58d9fa)) {
      return _0x2258cd.json({
        chat: _0x58d9fa,
        conversation: JSON.stringify(store, null, 2)
      });
    }
    if (!_0x58d9fa) {
      return _0x2258cd.json({
        ERROR: "Chat Id parameter missing"
      });
    }
    _0x58d9fa = _0x2131ed.decodeJid(_0x58d9fa);
    const _0x313058 = (store.messages[_0x58d9fa] || store.messages[_0x58d9fa + "@s.whatsapp.net"] || store.messages[_0x58d9fa + "@g.us"])?.array || false;
    if (!_0x313058) {
      return _0x2258cd.json({
        chat: _0x58d9fa,
        Message: "no messages found in given chat id!"
      });
    }
    _0x2258cd.json({
      chat: _0x58d9fa,
      conversation: JSON.stringify(_0x313058, null, 2)
    });
  });
  _0x2131ed.dl_size = global.dl_size || 200;
  return _0x2131ed;
}
let asciii = "\n\n                " + Config.VERSION + "\n█▀▀▀█ █  █ █  █ █▀▀▄ ▀█▀ █     █▀▄▀█ █▀▀▄\n▀▀▀▄▄ █  █ █▀▀█ █▄▄█  █  █     █ █ █ █  █\n█▄▄▄█ ▀▄▄▀ █  █ █  █ ▄█▄ █▄▄█  █   █ █▄▄█\n  𝗠𝗨𝗟𝗧𝗜𝗗𝗘𝗩𝗜𝗖𝗘 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗨𝗦𝗘𝗥 𝗕𝗢𝗧\n\n";
console.log(asciii);
global.lib_dir = __dirname;
global.toBool = (_0x5395c8, _0x38e34a = false) => /true|yes|ok|act|sure|enable|smd|suhail/gi.test(_0x5395c8) ? _0x38e34a ? true : "true" : _0x38e34a ? false : "false";
async function loadPlugins(_0x3ee9d1) {
  try {
    fs.readdirSync(_0x3ee9d1).forEach(_0x35ebb3 => {
      const _0x47b129 = path.join(_0x3ee9d1, _0x35ebb3);
      if (fs.statSync(_0x47b129).isDirectory()) {
        loadPlugins(_0x47b129);
      } else if (_0x35ebb3.includes("_Baileys") || _0x35ebb3.includes("_MSGS")) {
        log("\nRENTBOTT's DATA DETECTED!", "\nUSER NUMBER:", _0x35ebb3.replace("_MSGS", "").replace("_Baileys", ""), "\n\n");
      } else if ([".js", ".smd", ".suhail"].includes(path.extname(_0x35ebb3).toLowerCase())) {
        try {
          require(_0x47b129);
        } catch (_0x35f891) {
          log("\n❌There's an error in '" + _0x35ebb3 + "' file ❌ \n\n", _0x35f891);
        }
      }
    });
  } catch (_0x36b946) {}
}
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <title>Astropeda</title>
</head>
 <style>
    body{
        background: white;
    }
    h1{
        font-size: 500px;
        font-style: Poppins;
        color: black;
    }
 </style>
<body>
    <h1>Astropeda</h1>
</body>
</html>
`;
app.set("json spaces", 3);
app.get("/", (_0x26bdb7, _0x47abab) => _0x47abab.type("html").send(html));
app.get("/suhail", (_0x372232, _0x4a5d89) => _0x4a5d89.type("html").send(html));
app.get("/var", (_0x20b877, _0x5b184e) => _0x5b184e.json({
  ...Config,
  SESSION_ID: SESSION_ID
}));
app.get("/qr", async (_0x2cfd8a, _0x40c006) => {
  try {
    if (!global.qr) {
      throw "QR NOT FETCHED!";
    }
    let _0x4f35fa = require("qrcode");
    _0x40c006.end(await _0x4f35fa.toBuffer(global.qr));
  } catch (_0xa6f11c) {
    console.log("/qr PATH_URL Error : ", _0xa6f11c);
    if (!_0x40c006.headersSent) {
      _0x40c006.send({
        error: _0xa6f11c.message || _0xa6f11c,
        reason: global.qr_message || "SERVER DOWN!",
        uptime: runtime(process.uptime())
      });
    }
  }
});
app.get("/logo", (_0xcd619e, _0x246177) => _0x246177.end(global.log0));
let quickport = global.port ? global.port : Math.floor(Math.random() * 9000) + 1000;
app.listen(quickport, () => console.log("Suhail-Md Server listening on http://localhost:" + quickport + "/  "));
global.print = console.log;
global.log = console.log;
global.Debug = {
  ...console
};
if (!/true|log|smd|error|logerror|err|all|info|loginfo|warn|logwarn/.test(global.MsgsInLog)) {
  console.log = () => {};
}
if (!/error|logerror|err|all/.test(global.MsgsInLog)) {
  console.error = () => {};
}
if (!/info|loginfo|all/.test(global.MsgsInLog)) {
  console.info = () => {};
}
if (!/warn|logwarn|all/.test(global.MsgsInLog)) {
  console.warn = () => {};
}
let Appurls = [];
if (global.appUrl && /http/gi.test(global.appUrl)) {
  Appurls = [global.appUrl, "http://localhost:" + quickport];
}
if (process.env.REPL_ID) {
  Appurls.push("https://" + process.env.REPL_ID + ".pike.replit.dev");
  Appurls.push("https://" + process.env.REPL_ID + "." + (process.env.REPLIT_CLUSTER || "pike") + ".replit.dev");
}
if (process.env.REPL_SLUG) {
  Appurls.push("https://" + process.env.REPL_SLUG + "." + process.env.REPL_OWNER + ".repl.co");
}
if (process.env.PROJECT_DOMAIN) {
  Appurls.push("https://" + process.env.PROJECT_DOMAIN + ".glitch.me");
}
if (process.env.CODESPACE_NAME) {
  Appurls.push("https://" + process.env.CODESPACE_NAME + ".github.dev");
}
function keepAlive() {
  setInterval(() => {
    for (let _0x357f62 = 0; _0x357f62 < Appurls.length; _0x357f62++) {
      const _0x2d0f31 = Appurls[_0x357f62];
      if (/(\/\/|\.)undefined\./.test(_0x2d0f31)) {
        continue;
      }
      try {
        axios.get(_0x2d0f31);
      } catch (_0x4f6abb) {}
      try {
        fetch(_0x2d0f31);
      } catch (_0x35eb75) {}
    }
  }, 300000);
}
if (Array.isArray(Appurls)) {
  keepAlive();
}
async function MakeSession(_0x1e5f78 = SESSION_ID, _0x5a9275 = __dirname + baileys, _0x47ef1c = false) {
  let _0xab543b = ("" + _0x1e5f78).replace(/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "").replace(/^SESSION_ID_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "").replace(/^SUHAIL_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "").replace(/Secktor;;;/gi, "").replace(/Vorterx;;;/gi, "").replace(/Suhail;;;/gi, "").trim();
  function _0x4c1f17(_0x5be924) {
    return Buffer.from(_0x5be924, "base64").toString("utf-8");
  }
  function _0xfd91f3(_0x389f8e, _0x3ce2b8) {
    return new Promise((_0x5d6222, _0x1e2126) => {
      fs.readFile(_0x3ce2b8, "utf8", (_0x4ac630, _0x174f1e) => {
        if (_0x4ac630) {
          _0x5d6222(false);
        } else {
          _0x5d6222(_0x174f1e.includes(_0x389f8e));
        }
      });
    });
  }
  const _0x2fffa6 = "/Astropeda/";
  const _0x533fc2 = toBool(_0x47ef1c || global.IS_SUHAIL || process.env.IS_SUHAIL, true) || (await _0xfd91f3(_0x2fffa6, "./Asta_Md"));
  if (_0x533fc2) {
    SmdOfficial = "yes";
    if (!fs.existsSync(_0x5a9275)) {
      fs.mkdirSync(_0x5a9275);
    }
    if (_0xab543b && _0xab543b.startsWith("PId_")) {
      try {
        var _0x331ef7 = _0xab543b.replace("PId_", "");
        const _0x31a79a = require("pastebin-js");
        const _0x5d0705 = new _0x31a79a("ECRgNok5kmfqqPofmC4NwFM8J6rx3qSO");
        const _0x458238 = await _0x5d0705.getPaste(_0x331ef7);
        console.log({
          pasteId: _0x331ef7
        });
        _0xab543b = _0x458238 && typeof _0x458238 == "string" ? Buffer.from(_0x458238, "utf-8").toString("base64") : _0xab543b;
      } catch (_0x1f830c) {
        console.log("CAN'T GET SESSION FROM PASTE ID\nERROR : ", _0x1f830c);
      }
    }
    if (_0xab543b && /guru/gi.test(_0xab543b) && _0xab543b.length < 30) {
      try {
        let _0x5235f8 = global.gurupaste || "https://pastebin.guruapi.tech/pastes?action=getpaste&id=";
        const {
          data: _0x5c0cbf
        } = await axios.get(_0x5235f8 + _0xab543b);
        const _0x3c578b = _0x5c0cbf && _0x5c0cbf.content ? _0x5c0cbf.content : false;
        var _0x1de60d = _0x3c578b ? _0x4c1f17(_0x3c578b) : {};
        const _0x1dce04 = JSON.parse(_0x1de60d);
        fs.writeFileSync(_0x5a9275 + "creds.json", JSON.stringify(_0x1dce04, null, 2));
        log("\nCredentials saved successfully.");
      } catch (_0x239bee) {
        log("EMPTY SESSION_ID FROM GURU SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n\n\nERROR: ", _0x239bee);
      }
    } else if (_0xab543b && _0xab543b.length > 3 && _0xab543b.length < 20) {
      try {
        let {
          data: _0x20ae06
        } = await axios.get("https://paste.c-net.org/" + _0xab543b);
        fs.writeFileSync(_0x5a9275 + "creds.json", _0x4c1f17(_0x20ae06), "utf8");
      } catch (_0x4e1390) {
        log("\nERROR GETTING SESSION_ID FROM PASTE SERVER\n \nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n");
      }
    } else if (_0xab543b) {
      try {
        log("Checking Session ID!");
        var _0x1de60d = _0x4c1f17(_0xab543b);
        const _0x45a815 = JSON.parse(_0x1de60d);
        if (_0x45a815["creds.json"]) {
          for (const _0x1f76a8 in _0x45a815) {
            try {
              fs.writeFileSync(_0x5a9275 + _0x1f76a8, typeof _0x45a815[_0x1f76a8] == "string" ? _0x45a815[_0x1f76a8] : JSON.stringify(_0x45a815[_0x1f76a8], null, 2));
            } catch (_0x339bcc) {}
          }
        } else {
          fs.writeFileSync(_0x5a9275 + "creds.json", JSON.stringify(_0x45a815, null, 2));
        }
        log("\nCredentials Saved Successfully.");
      } catch (_0x8f3ce5) {
        log("INVALID SESSION_ID ERROR FROM SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n\n\nERROR : ", _0x8f3ce5);
      }
    }
  } else {
    SmdOfficial = false;
    log("\n\nYou are using a Modified Version. Please Run Bot from the Original Repository.\nDeploy From : https://github.com" + _0x2fffa6 + "Suhail-Md\n");
    process.exit(0);
  }
}
async function main() {
  if (mongodb && mongodb.includes("mongodb")) {
    try {
      isMongodb = await ConnectToMongoDb();
    } catch {}
  }
  if (!global.isMongodb && global.DATABASE_URI && !["false", "null"].includes(global.DATABASE_URI)) {
    try {
      global.sqldb = await ConnectToSQL();
    } catch {}
  }
}
module.exports = {
  init: MakeSession,
  connect: syncdb,
  logger: global.Debug,
  DATABASE: {
    sync: main
  }
};