const fs = require("fs");
const path = require("path");
const Config = require(__dirname + "/../config.js");
const blockJid = [
  "" + (process.env.BLOCKJIDS || "120363023983262391@g.us"),
  ...(typeof global.blockJids === "string" ? global.blockJids.split(",") : []),
];
const allowJid = [
  "null",
  ...(typeof global.allowJids === "string" ? global.allowJids.split(",") : []),
];
const Pino = require("pino");
const { Boom } = require("@hapi/boom");
const FileType = require("file-type");
const express = require("express");
const app = express();
const events = require("./plugins");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require("./exif");
let {
  default: BotConnect,
  proto,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  makeInMemoryStore,
  jidDecode,
} = require("@whiskeysockets/baileys");
var last_status = {};
global.setCmdAlias = {};
global.AmdOfficial = false;
global.sqldb = false;
global.pg_pools = false;
const { userdb, groupdb, bot_, amdBuffer } = require("../lib");
const fetch = require("node-fetch");
const axios = require("axios");
let { sleep, getBuffer, parsedJid, tiny, botpic, tlang } = require("../lib");
const { smsg, callsg, groupsg } = require("./serialized.js");
const { runtime, getSizeMedia } = require("../lib");
var prefa =
  !Config.HANDLERS ||
    ["false", "null", " ", "", "nothing", "not", "empty"].includes(
      !Config.HANDLERS
    )
    ? true
    : false;
global.prefix = prefa ? "" : Config.HANDLERS[0];
global.prefixRegex =
  prefa || ["all"].includes(Config.HANDLERS)
    ? new RegExp("^")
    : new RegExp("^[" + Config.HANDLERS + "]");
global.prefixboth = ["all"].includes(Config.HANDLERS);
let baileys = "/bot/";
const connnectpg = async () => {
  try {
    const { Pool: pool } = require("pg");
    const start = new pool({
      connectionString: global.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    const Operation = await start.connect();
    Operation.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (err) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};
const connnectMongo = async () => {
  const BotDatabase = require("mongoose");
  try {
    BotDatabase.set("strictQuery", true);
    await BotDatabase.connect(mongodb);
    console.log("🌍 Connected to the Mongodb.");
    return true;
  } catch {
    console.log("Could not connect with Mongodb.");
    return false;
  }
};
let Asta = {};
const store = makeInMemoryStore({
  logger: Pino({
    level: "silent",
  }).child({
    level: "silent",
  }),
});
try {
  if (fs.existsSync(__dirname + "/store.json")) {
    store.readFromFile(__dirname + "/store.json");
  }
} catch (error) {
  console.log("CLIENT STORE ERROR:\n", error);
}
require("events").EventEmitter.defaultMaxListeners = 2000;
async function syncdb() {
  let thumb_img = __dirname + "/assets/logo.jpeg";
  try {
    global.log0 =
      typeof THUMB_IMAGE === "string"
        ? await getBuffer(THUMB_IMAGE.split(",")[0])
        : fs.readFileSync(thumb_img);
  } catch (error) {
    thumb_img = __dirname + "/assets/logo.jpeg";
  }
  global.log0 = global.log0 || fs.readFileSync(thumb_img);
  const { state: onConnect, saveCreds: credsSaved } = await useMultiFileAuthState(__dirname + baileys);
let Sock = BotConnect({
  logger: Pino({
    level: "silent" || "debug" || "fatal",
  }),
  printQRInTerminal: false,
  browser: ["Windows", "chrome", ""],
  fireInitQueries: true,
  shouldSyncHistoryMessage: true,
  downloadHistory: true,
  syncFullHistory: true,
  generateHighQualityLinkPreview: true,
  markOnlineOnConnect: true,
  auth: onConnect,
  getMessage: async (CurrentChat) => {
    let Message = { conversation: "Bot" };
    if (store) {
      const SavedMessage = await store.loadMessage(CurrentChat.remoteJid, CurrentChat.id);
      return SavedMessage.message || Message;
    }
    return Message;
  },
});

store.bind(Sock.ev);
setInterval(() => {
  try {
    store.writeToFile(__dirname + "/store.json");
  } catch (error) {
    console.error("CLIENT STORE ERROR:\n", error);
  }
}, 10000);
  Sock.ev.on("call", async (CallMod) => {
    let onWa = await callsg(
      Sock,
      JSON.parse(JSON.stringify(CallMod[0]))
    );
    events.commands.map(async (CallOpt) => {
      if (CallOpt.call === "offer" && onWa.status === "offer") {
        try {
          CallOpt.function(onWa, {
            store: store,
            Void: Sock,
          });
        } catch (error) {
          console.error("[CALL ERROR] ", error);
        }
      }
      if (CallOpt.call === "accept" && onWa.status === "accept") {
        try {
          CallOpt.function(onWa, {
            store: store,
            Void: Sock,
          });
        } catch (error) {
          console.error("[CALL ACCEPT ERROR] ", error);
        }
      }
      if (
        CallOpt.call === "call" ||
        CallOpt.call === "on" ||
        CallOpt.call === "all"
      ) {
        try {
          CallOpt.function(onWa, {
            store: store,
            Void: Sock,
          });
        } catch (error) {
          console.error("[CALL ERROR] ", error);
        }
      }
    });
  });
  var WaBotNumber = false;
  let GcConfig = {};
  let UserConfig = {};
  Sock.ev.on("messages.upsert", async (messageEvent) => {
    try {
      if (!messageEvent.messages || !Array.isArray(messageEvent.messages)) return;
  
      WaBotNumber = WaBotNumber || Sock.decodeJid(Sock.user.id);
  
      for (let mek of messageEvent.messages) {
        mek.message = mek.message?.ephemeralMessage?.message || mek.message;
        if (!mek.message || !mek.key || !/broadcast/gi.test(mek.key.remoteJid)) continue;
  
        let messageObject = await smsg(Sock, JSON.parse(JSON.stringify(mek)), store, true);
        if (!messageObject.message) continue;
  
        let messageText = messageObject.body;
        let eventContext = {
          body: messageText,
          mek,
          text: messageText,
          args: messageText.split(" ") || [],
          botNumber: WaBotNumber,
          isCreator: messageObject.isCreator,
          store,
          budy: messageText,
          Asta: { bot: Sock },
          Void: Sock,
          proto,
        };
  
        events.commands.forEach(async (command) => {
          if (typeof command.on === "string") {
            let commandTrigger = command.on.trim();
            let validFromMe = !command.fromMe || (command.fromMe && messageObject.fromMe);
  
            if (/status|story/gi.test(commandTrigger) && (messageObject.jid === "status@broadcast" || mek.key.remoteJid === "status@broadcast") && validFromMe) {
              command.function(messageObject, messageText, eventContext);
            } else if (["broadcast"].includes(commandTrigger) && (/broadcast/gi.test(mek.key.remoteJid) || messageObject.broadcast || /broadcast/gi.test(messageObject.from)) && validFromMe) {
              command.function(messageObject, messageText, eventContext);
            }
          }
        });
      }
    } catch (error) {
      console.error("ERROR broadCast --------- messages.upsert \n", error);
    }
  });
  
  Sock.ev.on("messages.upsert", async (messageEvent) => {
    try {
      WaBotNumber = WaBotNumber || Sock.decodeJid(Sock.user.id);
      if (!global.isStart) return;
  
      for (let mek of messageEvent.messages) {
        if (!mek.message) continue;
  
        mek.message = mek.message?.ephemeralMessage?.message || mek.message;
        if (!mek.message || !mek.key || /broadcast/gi.test(mek.key.remoteJid)) continue;
  
        let messageObject = await smsg(Sock, JSON.parse(JSON.stringify(mek)), store, true);
        if (!messageObject.message || messageObject.chat.endsWith("broadcast")) continue;
  
        let messageText = messageObject.body;
        let isCreator = messageObject.isCreator;
        let parsedText = typeof messageObject.text === "string" ? messageObject.text.trim() : false;
  
        if (parsedText && messageText[1] && messageText[1] === " ") {
          messageText = messageText[0] + messageText.slice(2);
        }
  
        let commandTrigger = parsedText ? parsedText.split(" ")[0].toLowerCase() : false;
        let validCommand = commandTrigger && Config.HANDLERS.toLowerCase().includes("null");
  
        if (parsedText && !Config.HANDLERS.toLowerCase().includes("null")) {
          validCommand = prefixboth || (messageText && prefixRegex.test(messageText[0])) || (messageObject.isAstro && /2348039607375|2349027862116|2348052944641/g.test(WaBotNumber) && messageText[0] === ",");
          commandTrigger = validCommand ? prefa ? messageText.trim().split(" ")[0].toLowerCase() : messageText.slice(1).trim().split(" ")[0].toLowerCase() : false;
        }
  
        if (blockJid.includes(messageObject.chat) && !messageObject.isAstro) return;
  
        if (validCommand && (messageObject.isBaileys || (!isCreator && Config.WORKTYPE === "private" && !allowJid.includes(messageObject.chat)))) {
          validCommand = false;
        }
  
        const commandArgs = messageObject.body ? messageText.trim().split(/ +/).slice(1) : [];
  
        if (!isCreator && global.disablepm === "true" && validCommand && !messageObject.isGroup) {
          validCommand = false;
        }
  
        if (!isCreator && global.disablegroup === "true" && validCommand && messageObject.isGroup && !allowJid.includes(messageObject.chat)) {
          validCommand = false;
        }
  
        Asta.bot = Sock;
  
        if (validCommand) {
          let matchedCommand = events.commands.find(cmd => cmd.pattern === commandTrigger) ||
            events.commands.find(cmd => cmd.alias && cmd.alias.includes(commandTrigger));
  
          if (!matchedCommand && prefixboth && commandTrigger) {
            matchedCommand = events.commands.find(cmd => cmd.pattern === commandTrigger) ||
              events.commands.find(cmd => cmd.alias && cmd.alias.includes(commandTrigger));
          }
  
          if (matchedCommand && matchedCommand.fromMe && !messageObject.fromMe && !isCreator) {
            matchedCommand = false;
            return messageObject.reply(tlang().owner);
          }
  
          if (messageObject.isGroup && matchedCommand && commandTrigger !== "bot") {
            let groupConfig = GcConfig[messageObject.chat] || (await groupdb.findOne({ id: messageObject.chat })) || {
              botenable: toBool(messageObject.isAstro || !blockJid.includes(messageObject.chat)),
            };
  
            if (groupConfig && groupConfig.botenable === "false") {
              matchedCommand = false;
            }
  
            if (matchedCommand && groupConfig) {
              let commandRegex = new RegExp(`\\b${matchedCommand.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
              if (groupConfig.disablecmds !== "false" && commandRegex.test(groupConfig.disablecmds)) {
                matchedCommand = false;
              }
            }
          }
  
          if (!isCreator && matchedCommand) {
            try {
              let userConfig = UserConfig[messageObject.sender] || (await userdb.findOne({ id: messageObject.sender })) || { ban: "false" };
  
              if (userConfig.ban === "true") {
                matchedCommand = false;
                messageObject.reply(`*Hey ${messageObject.senderName.split("\n").join("  ")},*\n_You are banned from using commands._`);
              }
            } catch (error) {
              console.error("checkban.ban", error);
            }
          }
  
          if (matchedCommand) {
            if (matchedCommand.react) {
              messageObject.react(matchedCommand.react);
            }
  
            let commandBody = messageObject.body ? messageText.trim().split(/ +/).slice(1).join(" ") : "";
            let commandPattern = matchedCommand.pattern;
            messageObject.cmd = commandPattern;
  
            try {
              matchedCommand.function(messageObject, commandBody, {
                cmd: commandPattern,
                text: commandBody,
                body: messageText,
                args: commandArgs,
                cmdName: commandTrigger,
                isCreator,
                amd: commandPattern,
                botNumber: WaBotNumber,
                budy: parsedText,
                store,
                Asta,
                Void: Sock,
              });
            } catch (error) {
              console.error("[ERROR] ", error);
            }
          } else {
            validCommand = false;
            const categoryCommand = events.commands.find(cmd => cmd.category === commandTrigger) || false;
            if (categoryCommand) {
              const categoryCommands = {};
              let categoryMenu = "";
              events.commands.forEach(cmd => {
                if (!cmd.dontAddCommandList && cmd.pattern) {
                  if (!categoryCommands[cmd.category]) {
                    categoryCommands[cmd.category] = [];
                  }
                  categoryCommands[cmd.category].push(cmd.pattern);
                }
              });
  
              for (const category in categoryCommands) {
                if (commandTrigger === category.toLowerCase()) {
                  categoryMenu = `╭═══〘${category.toLowerCase()} menu  〙═══⊷❍\n┃✰╭──────────────\n`;
                  categoryCommands[category].forEach(cmdPattern => {
                    categoryMenu += `┃✰│    ⛩️ .${cmdPattern}\n`;
                  });
                  categoryMenu += `┃✰╰──────────────\n╰══════════⊷❍`;
                }
              }
  
              if (categoryMenu) {
                messageObject.reply(categoryMenu);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("broadcast", error);
    }
  });
  // Handle group participants updates
Sock.ev.on("group-participants.update", async (update) => {
  try {
    const groupUpdate = await processGroupParticipantsUpdate(update);
    if (!groupUpdate || !groupUpdate.isGroup) return;

    events.commands.map(async (command) => {
      if (groupUpdate.status === command.group || /on|true|main|all|asta|amd/gi.test(command.group)) {
        try {
          await command.function(groupUpdate, {
            store,
            Void: Sock,
          });
        } catch (error) {
          console.error("[GROUP PARTICIPANTS UPDATE ERROR] ", error);
        }
      }
    });
  } catch (error) {
    console.error("[GROUP PARTICIPANTS UPDATE ERROR] ", error);
  }
});

// Handle groups update
Sock.ev.on("groups.update", async (groups) => {
  try {
    for (const group of groups) {
      if (!store.allgroup) {
        store.allgroup = {};
      }
      store.allgroup[group.id] = group;
    }
  } catch (error) {
    console.error("[GROUPS UPDATE ERROR] ", error);
  }
});

// Handle groups upsert
Sock.ev.on("groups.upsert", async (groupData) => {
  try {
    const group = groupData[0];
    events.commands.map(async (command) => {
      if (/on|true|main|all|asta|amd/gi.test(command.groupsetting || command.upsertgroup || command.groupupsert)) {
        await command.function({
          ...group,
          bot: Sock,
        }, {
          store,
          Void: Sock,
          data: groupData,
        });
      }
    });
    await processGroupUpsert(groupData[0]);
  } catch (error) {
    console.error("[GROUPS UPSERT ERROR] ", error);
  }
});

// Function to process group participants update
async function processGroupParticipantsUpdate(update) {
  try {
    return await groupsg(Sock, JSON.parse(JSON.stringify(update)), true);
  } catch (error) {
    console.error("[PROCESS GROUP PARTICIPANTS UPDATE ERROR] ", error);
    throw error;
  }
}

// Function to process group upsert
async function processGroupUpsert(groupData) {
  try {
    return await groupsg(Sock, JSON.parse(JSON.stringify(groupData)), false, true);
  } catch (error) {
    console.error("[PROCESS GROUP UPSERT ERROR] ", error);
    throw error;
  }
}
// Handle contacts upsert
Sock.ev.on("contacts.upsert", (contacts) => {
  try {
    for (const contact of contacts) {
      store.contacts[contact.id] = contact;
    }
  } catch (error) {
    console.error("[CONTACTS UPSERT ERROR] ", error);
  }
});

// Handle contacts update
Sock.ev.on("contacts.update", async (updates) => {
  try {
    for (let update of updates) {
      let decodedId = Sock.decodeJid(update.id);
      if (store && store.contacts) {
        store.contacts[decodedId] = {
          id: decodedId,
          name: update.notify,
        };
      }
    }
  } catch (error) {
    console.error("[CONTACTS UPDATE ERROR] ", error);
  }
});

// Serialize message
Sock.serializeM = (message) => smsg(Sock, message, store, false);

// Handle connection update
Sock.ev.on("connection.update", async (update) => {
  const { connection, lastDisconnect, receivedPendingNotifications, qr } = update;
  global.qr = qr;

  // Generate QR code if available
  if (qr) {
    try {
      var qrcode = require("qrcode");
      qrcode.toString(qr, function (error, qrString) {
        if (error) {
          console.error(error);
        }
        log(qrString);
      });
    } catch (error) {}
  }

  // Handle different connection states
  if (connection === "connecting") {
    log("ℹ️ Connecting to WhatsApp!");
  }

  if (connection === "open") {
    let userId = Sock.decodeJid(Sock.user.id);
    let isAllowedUser = /2348039607375|2349027862116|2348052944641/g.test(userId);
    let isPluginInitialized = false;
    global.plugin_dir = path.join(__dirname, "../plugins/");

    // Initialize plugins if not using MongoDB or SQL database
    if (!isMongodb && !sqldb) {
      main();
    }

    log("✅ WhatsApp Login Successful!");

    try {
      try {
        isPluginInitialized =
          (await bot_.findOne({ id: "bot_" + userId })) ||
          (await bot_.new({ id: "bot_" + userId }));
      } catch {
        isPluginInitialized = false;
      }
    } catch (error) {
      log("❌ ERROR INSTALLING PLUGINS ", error);
    }

    // Load plugins
    await loadPlugins(plugin_dir);

    let statusMessage =
      "\nBot Running...\n\n  Prefix  : [ " +
      (prefix ? prefix : "null") +
      " ]\n  Commands : " +
      events.commands.length +
      "\n  Mode    : " +
      Config.WORKTYPE +
      "";

    try {
      const scraper = require("../lib/scraper");
      let gitSyncResult = await scraper.syncgit();
      if (gitSyncResult.total !== 0) {
        statusMessage +=
          "\n𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲\nRedeploy Bot as Soon as Possible!\n";
      }
    } catch (error) {}

    global.qr_message = {
      message: "BOT ALREADY CONNECTED!",
      bot_user: userId,
      connection: statusMessage.trim(),
    };

    print(statusMessage);

    // Send status message to user
    await Sock.sendMessage(
      userId,
      {
        text: "```" + ("" + statusMessage).trim() + "```",
      },
      {
        disappearingMessagesInChat: true,
        ephemeralExpiration: 86400,
      }
    );

    global.isStart = true;
    let isCreator = true;
    let connectionData = {
      bot: Sock,
      user: userId,
      isAstro: isAllowedUser,
      isCreator: isCreator,
    };
    let eventData = {
      dbbot: isPluginInitialized,
      botNumber: userId,
      isCreator: isCreator,
      isAstro: isAllowedUser,
      store: store,
      Asta: connectionData,
      Void: Sock,
      ...update,
    };

    // Execute commands
    events.commands.map(async (command) => {});

  }

  if (connection === "close") {
    await sleep(5000);
    global.isStart = false;
    global.qr_message = {
      message: "CONNECTION CLOSED WITH BOT!",
    };

    let statusCode = new Boom(lastDisconnect?.error)?.output.statusCode;

    // Handle different disconnection reasons
    switch (statusCode) {
      case DisconnectReason.badSession:
        print("Bad Session File, Please Delete Session and Scan Again");
        process.exit(0);
        break;
      case DisconnectReason.connectionClosed:
        print("Connection closed, reconnecting....");
        syncdb().catch((error) => console.log(error));
        break;
      case DisconnectReason.connectionLost:
        print("Connection Lost from Server, reconnecting...");
        syncdb().catch((error) => console.log(error));
        break;
      case DisconnectReason.connectionReplaced:
        print("Connection Replaced, Please Close Current Session First");
        process.exit(1);
        break;
      case DisconnectReason.loggedOut:
        print("Device Logged Out, Please Scan Again And Run.");
        process.exit(1);
        break;
      case DisconnectReason.restartRequired:
        print("Restart Required, Restarting...");
        syncdb().catch((error) => console.log(error));
        break;
      case DisconnectReason.timedOut:
        print("Connection TimedOut, Reconnecting...");
        syncdb().catch((error) => console.log(error));
        break;
      case DisconnectReason.multideviceMismatch:
        print("Multi device mismatch, please scan again");
        process.exit(0);
        break;
      default:
        print("Connection closed with bot. Please put New Session ID again.");
        print(statusCode);
        process.exit(0);
    }
  }
});

// Handle credentials update
Sock.ev.on("creds.update", credsSaved);

// Function to get last status
Sock.lastStatus = async () => {
  console.log("last_status :", last_status);
  return last_status;
};

  Sock.decodeJid = (_0x409cb8) => {
    if (!_0x409cb8) {
      return _0x409cb8;
    }
    if (/:\d+@/gi.test(_0x409cb8)) {
      let _0x1db567 = jidDecode(_0x409cb8) || {};
      return (
        (_0x1db567.user &&
          _0x1db567.server &&
          _0x1db567.user + "@" + _0x1db567.server) ||
        _0x409cb8
      );
    } else {
      return _0x409cb8;
    }
  };
  Sock.getName = (_0x1e19e3, _0xbde05d = false) => {
    let _0x4bacff = Sock.decodeJid(_0x1e19e3);
    let _0x3a374f;
    let _0x55d7b0 = "+" + _0x1e19e3.replace("@s.whatsapp.net", "");
    if (_0x4bacff.endsWith("@g.us")) {
      return new Promise(async (_0x49f5cb) => {
        _0x3a374f = store.contacts[_0x4bacff] || {};
        if (!_0x3a374f.name?.notify && !_0x3a374f.subject) {
          try {
            _0x3a374f = (await Sock.groupMetadata(_0x4bacff)) || {};
          } catch (_0xd44c16) { }
        }
        _0x49f5cb(_0x3a374f.subject || _0x3a374f.name || _0x55d7b0);
      });
    } else {
      _0x3a374f =
        _0x4bacff === "0@s.whatsapp.net"
          ? {
            id: _0x4bacff,
            name: "WhatsApp",
          }
          : _0x4bacff === Sock.decodeJid(Sock.user.id)
            ? Sock.user
            : store.contacts[_0x4bacff] || {};
    }
    if (_0x3a374f.name || _0x3a374f.subject || _0x3a374f.verifiedName) {
      return (
        _0x3a374f.name ||
        _0x3a374f.subject ||
        _0x3a374f.verifiedName ||
        _0x55d7b0
      );
    } else {
      return userdb
        .findOne({
          id: _0x4bacff,
        })
        .then((_0x3dcb8d) => _0x3dcb8d.name || _0x55d7b0)
        .catch((_0x519084) => {
          _0x55d7b0;
        });
    }
  };
  Sock.sendContact = async (
    _0xee3400,
    _0x1ba9aa,
    _0x460513 = "",
    _0x345014 = {}
  ) => {
    let _0x3b10d0 = [];
    for (let _0x11d953 of _0x1ba9aa) {
      _0x3b10d0.push({
        displayName: await Sock.getName(_0x11d953 + "@s.whatsapp.net"),
        vcard:
          "BEGIN:VCARD\nVERSION:3.0\nN:" +
          (await Sock.getName(_0x11d953 + "@s.whatsapp.net")) +
          "\nFN:" +
          global.OwnerName +
          "\nitem1.TEL;waid=" +
          _0x11d953 +
          ":" +
          _0x11d953 +
          "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" +
          global.email +
          "\nitem2.X-ABLabel:GitHub\nitem3.URL:" +
          global.github +
          "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" +
          global.location +
          ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD",
      });
    }
    return Sock.sendMessage(
      _0xee3400,
      {
        contacts: {
          displayName: _0x3b10d0.length + " Contact",
          contacts: _0x3b10d0,
        },
        ..._0x345014,
      },
      {
        quoted: _0x460513,
      }
    );
  };
  Sock.setStatus = (_0x4e1b1d) => {
    Sock.query({
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
          content: Buffer.from(_0x4e1b1d, "utf-8"),
        },
      ],
    });
    return _0x4e1b1d;
  };
  Sock.messageId = (_0x344ea2 = 8, _0x4bb246 = "ASTAMD") => {
    const _0xfe49e6 = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let _0x159a8c = 0; _0x159a8c < _0x344ea2; _0x159a8c++) {
      const _0x1bd7e5 = Math.floor(Math.random() * _0xfe49e6.length);
      _0x4bb246 += _0xfe49e6.charAt(_0x1bd7e5);
    }
    return _0x4bb246;
  };
  Sock.send5ButImg = async (
    _0x5014fe,
    _0x151c1b = "",
    _0x11eaa9 = "",
    _0x17f875,
    _0x1dc3ec = [],
    _0x148c68,
    _0x1b833a = {}
  ) => {
    let _0x14c1ba = await prepareWAMessageMedia(
      {
        image: _0x17f875,
        jpegThumbnail: _0x148c68,
      },
      {
        upload: Sock.waUploadToServer,
      }
    );
    var _0x35e5eb = generateWAMessageFromContent(
      _0x5014fe,
      proto.Message.fromObject({
        templateMessage: {
          hydratedTemplate: {
            imageMessage: _0x14c1ba.imageMessage,
            hydratedContentText: _0x151c1b,
            hydratedFooterText: _0x11eaa9,
            hydratedButtons: _0x1dc3ec,
          },
        },
      }),
      _0x1b833a
    );
    Sock.relayMessage(_0x5014fe, _0x35e5eb.message, {
      messageId: Sock.messageId(),
    });
  };
  Sock.sendButtonText = (
    _0x32e16b,
    _0x2e98df = [],
    _0x268834,
    _0x5dadfc,
    _0x3d9e07 = "",
    _0x40db80 = {}
  ) => {
    let _0x2d84f4 = {
      text: _0x268834,
      footer: _0x5dadfc,
      buttons: _0x2e98df,
      headerType: 2,
      ..._0x40db80,
    };
    Sock.sendMessage(_0x32e16b, _0x2d84f4, {
      quoted: _0x3d9e07,
      ..._0x40db80,
    });
  };
  Sock.sendText = (_0x1eade9, _0x1612ea, _0x57885f = "", _0x3dcc13) =>
    Sock.sendMessage(
      _0x1eade9,
      {
        text: _0x1612ea,
        ..._0x3dcc13,
      },
      {
        quoted: _0x57885f,
      }
    );
  Sock.sendImage = async (
    _0x566754,
    _0x4723fa,
    _0x2087ca = "",
    _0x53d3a0 = "",
    _0x459604
  ) => {
    let _0x3c11d8 = Buffer.isBuffer(_0x4723fa)
      ? _0x4723fa
      : /^data:.*?\/.*?;base64,/i.test(_0x4723fa)
        ? Buffer.from(_0x4723fa.split`,`[1], "base64")
        : /^https?:\/\//.test(_0x4723fa)
          ? await await getBuffer(_0x4723fa)
          : fs.existsSync(_0x4723fa)
            ? fs.readFileSync(_0x4723fa)
            : Buffer.alloc(0);
    return await Sock.sendMessage(
      _0x566754,
      {
        image: _0x3c11d8,
        caption: _0x2087ca,
        ..._0x459604,
      },
      {
        quoted: _0x53d3a0,
      }
    );
  };
  Sock.sendTextWithMentions = async (
    _0x54ea1e,
    _0x50c9ec,
    _0x2d2be2,
    _0x3a2080 = {}
  ) =>
    Sock.sendMessage(
      _0x54ea1e,
      {
        text: _0x50c9ec,
        contextInfo: {
          mentionedJid: [..._0x50c9ec.matchAll(/@(\d{0,16})/g)].map(
            (_0x1fe586) => _0x1fe586[1] + "@s.whatsapp.net"
          ),
        },
        ..._0x3a2080,
      },
      {
        quoted: _0x2d2be2,
      }
    );
  Sock.sendImageAsSticker = async (
    _0x3532c5,
    _0x527062,
    _0x3309ab = {}
  ) => {
    let _0x262184;
    if (_0x3309ab && (_0x3309ab.packname || _0x3309ab.author)) {
      _0x262184 = await writeExifImg(_0x527062, _0x3309ab);
    } else {
      _0x262184 = await imageToWebp(_0x527062);
    }
    await Sock.sendMessage(
      _0x3532c5,
      {
        sticker: {
          url: _0x262184,
        },
        ..._0x3309ab,
      },
      _0x3309ab
    );
  };
  Sock.sendVideoAsSticker = async (
    _0x10f5a6,
    _0x5c502f,
    _0x587709 = {}
  ) => {
    let _0x4c63fd;
    if (_0x587709 && (_0x587709.packname || _0x587709.author)) {
      _0x4c63fd = await writeExifVid(_0x5c502f, _0x587709);
    } else {
      _0x4c63fd = await videoToWebp(_0x5c502f);
    }
    await Sock.sendMessage(
      _0x10f5a6,
      {
        sticker: {
          url: _0x4c63fd,
        },
        ..._0x587709,
      },
      _0x587709
    );
  };
  Sock.sendMedia = async (
    _0x2c82eb,
    _0x3b6f24,
    _0x1faf03 = "",
    _0x265eee = "",
    _0x43689c = "",
    _0x5f0c19 = {}
  ) => {
    let _0x2a5dbc = await Sock.getFile(_0x3b6f24, true);
    let {
      mime: _0x50c8d4,
      ext: _0x249af9,
      res: _0x1d60dd,
      data: _0x59ee9f,
      filename: _0x4ec529,
    } = _0x2a5dbc;
    if ((_0x1d60dd && _0x1d60dd.status !== 200) || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString()),
        };
      } catch (_0x376081) {
        if (_0x376081.json) {
          throw _0x376081.json;
        }
      }
    }
    let _0x4e01e4 = "";
    let _0x1f052f = _0x50c8d4;
    let _0xc5f634 = _0x4ec529;
    if (_0x5f0c19.asDocument) {
      _0x4e01e4 = "document";
    }
    if (_0x5f0c19.asSticker || /webp/.test(_0x50c8d4)) {
      let { writeExif: _0x171797 } = require("./exif");
      let _0x39fa7e = {
        mimetype: _0x50c8d4,
        data: _0x59ee9f,
      };
      _0xc5f634 = await _0x171797(_0x39fa7e, {
        packname: _0x5f0c19.packname ? _0x5f0c19.packname : Config.packname,
        author: _0x5f0c19.author ? _0x5f0c19.author : Config.author,
        categories: _0x5f0c19.categories ? _0x5f0c19.categories : [],
      });
      await fs.promises.unlink(_0x4ec529);
      _0x4e01e4 = "sticker";
      _0x1f052f = "image/webp";
    } else if (/image/.test(_0x50c8d4)) {
      _0x4e01e4 = "image";
    } else if (/video/.test(_0x50c8d4)) {
      _0x4e01e4 = "video";
    } else if (/audio/.test(_0x50c8d4)) {
      _0x4e01e4 = "audio";
    } else {
      _0x4e01e4 = "document";
    }
    await Sock.sendMessage(
      _0x2c82eb,
      {
        [_0x4e01e4]: {
          url: _0xc5f634,
        },
        caption: _0x265eee,
        mimetype: _0x1f052f,
        fileName: _0x1faf03,
        ..._0x5f0c19,
      },
      {
        quoted: _0x43689c,
        ..._0x5f0c19,
      }
    );
    return fs.promises.unlink(_0xc5f634);
  };
  Sock.downloadAndSaveMediaMessage = async (
    _0x23227c,
    _0x37efaf = "null",
    _0x3e6b5f = false,
    _0x2c905e = true
  ) => {
    let _0x51c141 = _0x23227c.msg ? _0x23227c.msg : _0x23227c;
    let _0x1a1e90 = _0x51c141.mimetype || "";
    let _0x5b8c9d = _0x23227c.mtype
      ? _0x23227c.mtype.split(/Message/gi)[0]
      : _0x51c141.mtype
        ? _0x51c141.mtype.split(/Message/gi)[0]
        : _0x1a1e90.split("/")[0];
    const _0x240a0 = await downloadContentFromMessage(_0x51c141, _0x5b8c9d);
    let _0x39cba4 = Buffer.from([]);
    for await (const _0x2ced92 of _0x240a0) {
      _0x39cba4 = Buffer.concat([_0x39cba4, _0x2ced92]);
    }
    if (_0x3e6b5f) {
      return _0x39cba4;
    }
    let _0x2a7e6b = await FileType.fromBuffer(_0x39cba4);
    let _0x470182 = "./temp/" + _0x37efaf + "." + _0x2a7e6b.ext;
    fs.writeFileSync(_0x470182, _0x39cba4);
    return _0x470182;
  };
  Sock.forward = async (
    _0x5d4b74,
    _0x57d8d8,
    _0x15b451,
    _0x16bd40,
    _0x25719f = true
  ) => {
    try {
      let _0x1c08a7 = _0x57d8d8.mtype;
      let _0x248698 = {};
      console.log("Forward function Called and Type is : ", _0x1c08a7);
      if (_0x1c08a7 == "conversation") {
        _0x248698 = {
          text: _0x57d8d8.text,
          contextInfo: _0x15b451,
        };
        for (let _0x696424 of parsedJid(_0x5d4b74)) {
          await Sock.sendMessage(_0x696424, _0x248698, {
            quoted: _0x16bd40,
            messageId: Sock.messageId(),
          });
        }
        return;
      }
      const _0x28c0f4 = (_0x44514a) => {
        return "" + Math.floor(Math.random() * 10000) + _0x44514a;
      };
      let _0x3020cf = _0x57d8d8.msg ? _0x57d8d8.msg : _0x57d8d8;
      let _0x2d258b = (_0x57d8d8.msg || _0x57d8d8).mimetype || "";
      let _0x4ee4d0 = _0x57d8d8.mtype
        ? _0x57d8d8.mtype.replace(/Message/gi, "")
        : _0x2d258b.split("/")[0];
      const _0x20002c = await downloadContentFromMessage(_0x3020cf, _0x4ee4d0);
      let _0x2572bb = Buffer.from([]);
      for await (const _0x3df13e of _0x20002c) {
        _0x2572bb = Buffer.concat([_0x2572bb, _0x3df13e]);
      }
      let _0x20c880 = await FileType.fromBuffer(_0x2572bb);
      let _0x68b951 = await _0x28c0f4(_0x20c880.ext);
      let _0x5ab377 = "./temp/" + _0x68b951;
      fs.writeFileSync(_0x5ab377, _0x2572bb);
      if (_0x1c08a7 == "videoMessage") {
        _0x248698 = {
          video: fs.readFileSync(_0x5ab377),
          mimetype: _0x57d8d8.mimetype,
          caption: _0x57d8d8.text,
          contextInfo: _0x15b451,
        };
      } else if (_0x1c08a7 == "imageMessage") {
        _0x248698 = {
          image: fs.readFileSync(_0x5ab377),
          mimetype: _0x57d8d8.mimetype,
          caption: _0x57d8d8.text,
          contextInfo: _0x15b451,
        };
      } else if (_0x1c08a7 == "audioMessage") {
        _0x248698 = {
          audio: fs.readFileSync(_0x5ab377),
          mimetype: _0x57d8d8.mimetype,
          seconds: 200001355,
          ptt: true,
          contextInfo: _0x15b451,
        };
      } else if (
        _0x1c08a7 == "documentWithCaptionMessage" ||
        _0x20c880 == "documentMessage"
      ) {
        _0x248698 = {
          document: fs.readFileSync(_0x5ab377),
          mimetype: _0x57d8d8.mimetype,
          caption: _0x57d8d8.text,
          contextInfo: _0x15b451,
        };
      } else {
        fs.unlink(_0x5ab377, (_0x230b04) => {
          if (_0x230b04) {
            console.error("Error deleting file:", _0x230b04);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      for (let _0x29179c of parsedJid(_0x5d4b74)) {
        try {
          await Sock.sendMessage(_0x29179c, _0x248698, {
            quoted: _0x16bd40,
            messageId: Sock.messageId(),
          });
        } catch (_0x3b1e17) { }
      }
      return fs.unlink(_0x5ab377, (_0x83aea9) => {
        if (_0x83aea9) {
          console.error("Error deleting file:", _0x83aea9);
        } else {
          console.log("File deleted successfully");
        }
      });
    } catch (_0x5a3250) {
      console.log(_0x5a3250);
    }
  };
  Sock.downloadMediaMessage = async (_0x3d0953) => {
    let _0x1d3ed1 = _0x3d0953.msg ? _0x3d0953.msg : _0x3d0953;
    let _0x50cf98 = (_0x3d0953.msg || _0x3d0953).mimetype || "";
    let _0x557d4d = _0x3d0953.mtype
      ? _0x3d0953.mtype.replace(/Message/gi, "")
      : _0x50cf98.split("/")[0];
    const _0x350f41 = await downloadContentFromMessage(_0x1d3ed1, _0x557d4d);
    let _0x2ab63b = Buffer.from([]);
    for await (const _0x2ff5ef of _0x350f41) {
      _0x2ab63b = Buffer.concat([_0x2ab63b, _0x2ff5ef]);
    }
    return _0x2ab63b;
  };
  Sock.forwardOrBroadCast2 = async (
    _0x2565bd,
    _0x442828,
    _0x145dd4 = {},
    _0x23baf9 = ""
  ) => {
    try {
      let _0x1068f6 = _0x442828.mtype;
      if (_0x1068f6 === "videoMessage" && _0x23baf9 === "ptv") {
        _0x442828 = {
          ptvMessage: {
            ..._0x442828.msg,
          },
        };
      }
      let _0x28966a = {
        ..._0x145dd4,
        contextInfo: {
          ...(_0x145dd4.contextInfo ? _0x145dd4.contextInfo : {}),
          ...(_0x145dd4.linkPreview
            ? {
              linkPreview: {
                ..._0x145dd4.linkPreview,
              },
            }
            : {}),
          ...(_0x145dd4.quoted && _0x145dd4.quoted.message
            ? {
              quotedMessage: {
                ...(_0x145dd4.quoted?.message || {}),
              },
            }
            : {}),
        },
      };
      var _0x14aec7 = _0x442828.message ? _0x442828.message : _0x442828;
      let _0x5909f8 = _0x1068f6 ? _0x1068f6 : Object.keys(_0x14aec7)[0];
      _0x14aec7 = {
        ..._0x28966a,
        ..._0x14aec7,
      };
      const _0x5d8b14 = await generateWAMessageFromContent(
        _0x2565bd,
        _0x14aec7,
        _0x145dd4
          ? {
            ...(_0x5909f8 == "conversation"
              ? {
                extendedTextMessage: {
                  text: _0x14aec7[_0x5909f8],
                },
              }
              : _0x14aec7[_0x5909f8]),
            ..._0x28966a,
            contextInfo: {
              ...(_0x14aec7[_0x5909f8]?.contextInfo || {}),
              ..._0x28966a.contextInfo,
            },
          }
          : {}
      );
      await Sock.relayMessage(_0x2565bd, _0x5d8b14.message, {
        messageId: Sock.messageId(),
      });
      return _0x5d8b14;
    } catch { }
  };
  Sock.forwardOrBroadCast = async (
    _0x189e5c,
    _0x54c0d9,
    _0x18e0cf = {},
    _0x348d78 = ""
  ) => {
    try {
      if (!_0x18e0cf || typeof _0x18e0cf !== "object") {
        _0x18e0cf = {};
      }
      _0x18e0cf.messageId = _0x18e0cf.messageId || Sock.messageId();
      var _0x3ce975 = _0x54c0d9.message ? _0x54c0d9.message : _0x54c0d9;
      let _0x103f18 = _0x3ce975.mtype
        ? _0x3ce975.mtype
        : Object.keys(_0x3ce975)[0];
      if (_0x103f18 === "videoMessage" && _0x348d78 === "ptv") {
        _0x3ce975 = {
          ptvMessage: {
            ..._0x54c0d9.msg,
          },
        };
        _0x103f18 = "ptvMessage";
      } else if (_0x103f18 == "conversation") {
        _0x3ce975 = {
          extendedTextMessage: {
            text: _0x3ce975[_0x103f18],
          },
        };
        _0x103f18 = "extendedTextMessage";
      }
      _0x3ce975[_0x103f18] = {
        ...(_0x3ce975[_0x103f18] || _0x3ce975),
        ..._0x18e0cf,
      };
      const _0xf31bf3 = generateWAMessageFromContent(
        _0x189e5c,
        _0x3ce975,
        _0x18e0cf
      );
      await Sock.relayMessage(_0x189e5c, _0xf31bf3.message, {
        messageId: _0x18e0cf.messageId,
      });
      return _0xf31bf3;
    } catch (_0x534571) {
      console.log(_0x534571);
    }
  };
  Sock.forwardMessage = Sock.forwardOrBroadCast;
  Sock.copyNForward = async (
    _0x333b21,
    _0x4d04c0,
    _0x3c23fa = false,
    _0x4ed2c0 = {}
  ) => {
    try {
      let _0x92cb9d;
      if (_0x4ed2c0.readViewOnce) {
        _0x4d04c0.message =
          _0x4d04c0.message &&
            _0x4d04c0.message.ephemeralMessage &&
            _0x4d04c0.message.ephemeralMessage.message
            ? _0x4d04c0.message.ephemeralMessage.message
            : _0x4d04c0.message || undefined;
        _0x92cb9d = Object.keys(_0x4d04c0.message.viewOnceMessage.message)[0];
        delete (_0x4d04c0.message && _0x4d04c0.message.ignore
          ? _0x4d04c0.message.ignore
          : _0x4d04c0.message || undefined);
        delete _0x4d04c0.message.viewOnceMessage.message[_0x92cb9d].viewOnce;
        _0x4d04c0.message = {
          ..._0x4d04c0.message.viewOnceMessage.message,
        };
      }
      let _0x3481f4 = Object.keys(_0x4d04c0.message)[0];
      try {
        _0x4d04c0.key.fromMe = true;
      } catch (_0x40e615) { }
      let _0x536b6b = await generateForwardMessageContent(_0x4d04c0, _0x3c23fa);
      let _0x521a63 = Object.keys(_0x536b6b)[0];
      let _0x41c842 = {};
      if (_0x3481f4 != "conversation") {
        _0x41c842 = _0x4d04c0.message[_0x3481f4].contextInfo;
      }
      _0x536b6b[_0x521a63].contextInfo = {
        ..._0x41c842,
        ..._0x536b6b[_0x521a63].contextInfo,
      };
      const _0x3f7fe3 = await generateWAMessageFromContent(
        _0x333b21,
        _0x536b6b,
        _0x4ed2c0
      );
      await Sock.relayMessage(_0x333b21, _0x3f7fe3.message, {
        messageId: Sock.messageId(),
      });
      return _0x3f7fe3;
    } catch (_0x529a5c) {
      console.log(_0x529a5c);
    }
  };
  Sock.sendFileUrl = async (
    _0x245d2a,
    _0x1ddbcd,
    _0xd689ee = "",
    _0x2cf1f3 = "",
    _0x5b2d56 = {
      author: "Asta-Md",
    },
    _0x49581e = ""
  ) => {
    try {
      let _0x113f67 = await axios.head(_0x1ddbcd);
      let _0x141f60 = _0x113f67?.headers["content-type"] || "";
      let _0x4397c4 = _0x141f60.split("/")[0];
      let _0x5a6000 = false;
      if (_0x141f60.split("/")[1] === "gif" || _0x49581e === "gif") {
        _0x5a6000 = {
          video: {
            url: _0x1ddbcd,
          },
          caption: _0xd689ee,
          gifPlayback: true,
          ..._0x5b2d56,
        };
      } else if (
        _0x141f60.split("/")[1] === "webp" ||
        _0x49581e === "sticker"
      ) {
        _0x5a6000 = {
          sticker: {
            url: _0x1ddbcd,
          },
          ..._0x5b2d56,
        };
      } else if (_0x4397c4 === "image" || _0x49581e === "image") {
        _0x5a6000 = {
          image: {
            url: _0x1ddbcd,
          },
          caption: _0xd689ee,
          ..._0x5b2d56,
          mimetype: "image/jpeg",
        };
      } else if (_0x4397c4 === "video" || _0x49581e === "video") {
        _0x5a6000 = {
          video: {
            url: _0x1ddbcd,
          },
          caption: _0xd689ee,
          mimetype: "video/mp4",
          ..._0x5b2d56,
        };
      } else if (_0x4397c4 === "audio" || _0x49581e === "audio") {
        _0x5a6000 = {
          audio: {
            url: _0x1ddbcd,
          },
          mimetype: "audio/mpeg",
          ..._0x5b2d56,
        };
      } else if (_0x141f60 == "application/pdf") {
        _0x5a6000 = {
          document: {
            url: _0x1ddbcd,
          },
          mimetype: "application/pdf",
          caption: _0xd689ee,
          ..._0x5b2d56,
        };
      }
      if (_0x5a6000) {
        try {
          return await Sock.sendMessage(_0x245d2a, _0x5a6000, {
            quoted: _0x2cf1f3,
          });
        } catch { }
      }
      try {
        var _0x13eb84 =
          _0x113f67?.headers["content-disposition"]
            ?.split('="')[1]
            ?.split('"')[0] || "file";
        if (_0x13eb84) {
          const _0xf91516 = [".jpg", ".jpeg", ".png"];
          const _0x127659 = [
            ".mp4",
            ".avi",
            ".mov",
            ".mkv",
            ".gif",
            ".m4v",
            ".webp",
          ];
          var _0x2a9237 =
            _0x13eb84.substring(_0x13eb84.lastIndexOf("."))?.toLowerCase() ||
            "nillll";
          var _0x2af72a;
          if (_0xf91516.includes(_0x2a9237)) {
            _0x2af72a = "image/jpeg";
          } else if (_0x127659.includes(_0x2a9237)) {
            _0x2af72a = "video/mp4";
          }
          _0x141f60 = _0x2af72a ? _0x2af72a : _0x141f60;
          let _0x47de2c = {
            fileName: _0x13eb84 || "file",
            caption: _0xd689ee,
            ..._0x5b2d56,
            mimetype: _0x141f60,
          };
          return await Sock.sendMessage(
            _0x245d2a,
            {
              document: {
                url: _0x1ddbcd,
              },
              ..._0x47de2c,
            },
            {
              quoted: _0x2cf1f3,
            }
          );
        }
      } catch (_0x48a20b) { }
      let _0x37e1b0 = {
        fileName: _0x13eb84 ? _0x13eb84 : "file",
        caption: _0xd689ee,
        ..._0x5b2d56,
        mimetype: _0x141f60,
      };
      return await Sock.sendMessage(
        _0x245d2a,
        {
          document: {
            url: _0x1ddbcd,
          },
          ..._0x37e1b0,
        },
        {
          quoted: _0x2cf1f3,
        }
      );
    } catch (_0x48b298) {
      console.log("Erorr in client.sendFileUrl() : ", _0x48b298);
      throw _0x48b298;
    }
  };
  Sock.sendFromUrl = Sock.sendFileUrl;
  const _0x29f5c5 = {};
  let _0x51034c = [];
  Sock.sendUi = async (
    _0x264148,
    _0x4d42ab = {},
    _0x541cb3 = "",
    _0x2e5e1f = "",
    _0x3bceba = "",
    _0x171bcf = false
  ) => {
    let _0x28cdb7 = {};
    try {
      const _0x466fc2 = /(https?:\/\/\S+)/gi;
      const _0x5a103b = [".jpg", ".jpeg", ".png"];
      const _0x43d733 = [
        ".mp4",
        ".avi",
        ".mov",
        ".mkv",
        ".gif",
        ".m4v",
        ".webp",
      ];
      let _0x17e93e = (video = false);
      if (!_0x51034c || !_0x51034c[0]) {
        _0x51034c = global.userImages
          ? global.userImages.split(",")
          : [await botpic()];
        _0x51034c = _0x51034c.filter((_0xa03b8f) => _0xa03b8f.trim() !== "");
      }
      let _0x311f88 =
        _0x2e5e1f && _0x3bceba
          ? _0x3bceba
          : _0x51034c[Math.floor(Math.random() * _0x51034c.length)];
      if (!_0x29f5c5[_0x311f88]) {
        const _0x280f66 = _0x311f88
          .substring(_0x311f88.lastIndexOf("."))
          .toLowerCase();
        if (_0x5a103b.includes(_0x280f66)) {
          _0x17e93e = true;
        }
        if (_0x43d733.includes(_0x280f66)) {
          video = true;
        }
        _0x29f5c5[_0x311f88] = {
          image: _0x17e93e,
          video: video,
        };
      }
      _0x541cb3 =
        _0x541cb3 && _0x541cb3.quoted?.key ? _0x541cb3.quoted : _0x541cb3 || "";
      let _0x237b02;
      if (
        (((_0x171bcf && _0x3bceba && global.style > 0) || !_0x3bceba) &&
          /text|txt|nothing|amd|asta/.test(global.userImages)) ||
        _0x2e5e1f == "text"
      ) {
        _0x237b02 = {
          text: _0x4d42ab.text || _0x4d42ab.caption,
          ..._0x4d42ab,
        };
      } else if (_0x2e5e1f == "image" || _0x29f5c5[_0x311f88].image) {
        _0x237b02 = {
          image: {
            url: _0x311f88,
          },
          ..._0x4d42ab,
          mimetype: "image/jpeg",
        };
      } else if (_0x2e5e1f == "video" || _0x29f5c5[_0x311f88].video) {
        _0x237b02 = {
          video: {
            url: _0x311f88,
          },
          ..._0x4d42ab,
          mimetype: "video/mp4",
          gifPlayback: true,
          height: 274,
          width: 540,
        };
      }
      const _0x28e991 =
        _0x171bcf && _0x3bceba && global.style > 0
          ? await amdBuffer(_0x3bceba)
          : null;
      _0x28cdb7 = {
        ...(await Sock.contextInfo(
          Config.botname,
          _0x541cb3 && _0x541cb3.senderName
            ? _0x541cb3.senderName
            : Config.ownername,
          _0x28e991
        )),
      };
      if (_0x237b02) {
        return await Sock.sendMessage(
          _0x264148,
          {
            contextInfo: _0x28cdb7,
            ..._0x237b02,
          },
          {
            quoted: _0x541cb3,
          }
        );
      }
    } catch (_0x44bee5) {
      console.log("erorr in userImages() : ", _0x44bee5);
    }
    try {
      return await Sock.sendMessage(_0x264148, {
        image: {
          url: await botpic(),
        },
        contextInfo: _0x28cdb7,
        ..._0x4d42ab,
      });
    } catch {
      return Sock.sendMessage(_0x264148, {
        text: _0x4d42ab.text || _0x4d42ab.caption,
        ..._0x4d42ab,
      });
    }
  };
  Sock.contextInfo = async (
    _0x180918 = Config.botname,
    _0x4f8a10 = Config.ownername,
    _0x567995 = log0,
    _0x281a1c = 1,
    _0x3e314a = gurl,
    _0x1d19d2 = false
  ) => {
    try {
      let _0x2ab518 = _0x1d19d2 ? _0x1d19d2 : global.style;
      if (_0x2ab518 >= 5) {
        return {
          externalAdReply: {
            title: _0x180918,
            body: _0x4f8a10,
            renderLargerThumbnail: true,
            showAdAttribution: true,
            thumbnail: _0x567995 || log0,
            mediaType: _0x281a1c || 1,
            mediaUrl: _0x3e314a,
            sourceUrl: _0x3e314a,
          },
        };
      } else if (_0x2ab518 == 4) {
        return {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: _0x180918,
            body: _0x4f8a10,
            renderLargerThumbnail: true,
            thumbnail: _0x567995 || log0,
            mediaType: _0x281a1c || 1,
            mediaUrl: _0x3e314a,
            sourceUrl: _0x3e314a,
          },
        };
      } else if (_0x2ab518 == 3) {
        return {
          externalAdReply: {
            title: _0x180918,
            body: _0x4f8a10,
            renderLargerThumbnail: true,
            thumbnail: _0x567995 || log0,
            mediaType: _0x281a1c || 1,
            mediaUrl: _0x3e314a,
            sourceUrl: _0x3e314a,
          },
        };
      } else if (_0x2ab518 == 2) {
        return {
          externalAdReply: {
            title: _0x180918,
            body: _0x4f8a10,
            thumbnail: _0x567995 || log0,
            showAdAttribution: true,
            mediaType: 1,
            mediaUrl: _0x3e314a,
            sourceUrl: _0x3e314a,
          },
        };
      } else if (_0x2ab518 == 1) {
        return {
          externalAdReply: {
            title: _0x180918,
            body: _0x4f8a10,
            thumbnail: _0x567995 || log0,
            mediaType: 1,
            mediaUrl: _0x3e314a,
            sourceUrl: _0x3e314a,
          },
        };
      } else {
        return {};
      }
    } catch (_0x4205a1) {
      console.log("error in client.contextInfo() : ", _0x4205a1);
      return {};
    }
  };
  Sock.cMod = (
    _0x2fa8b5,
    _0x4510a5,
    _0xaaa44a = "",
    _0x2f32eb = Sock.user.id,
    _0x18c25b = {}
  ) => {
    let _0x449b96 = Object.keys(_0x4510a5.message)[0];
    let _0x255a68 = _0x449b96 === "ephemeralMessage";
    if (_0x255a68) {
      _0x449b96 = Object.keys(_0x4510a5.message.ephemeralMessage.message)[0];
    }
    let _0x16c7ec = _0x255a68
      ? _0x4510a5.message.ephemeralMessage.message
      : _0x4510a5.message;
    let _0x3de922 = _0x16c7ec[_0x449b96];
    if (typeof _0x3de922 === "string") {
      _0x16c7ec[_0x449b96] = _0xaaa44a || _0x3de922;
    } else if (_0x3de922.caption) {
      _0x3de922.caption = _0xaaa44a || _0x3de922.caption;
    } else if (_0x3de922.text) {
      _0x3de922.text = _0xaaa44a || _0x3de922.text;
    }
    if (typeof _0x3de922 !== "string") {
      _0x16c7ec[_0x449b96] = {
        ..._0x3de922,
        ..._0x18c25b,
      };
    }
    if (_0x4510a5.key.participant) {
      _0x2f32eb = _0x4510a5.key.participant =
        _0x2f32eb || _0x4510a5.key.participant;
    } else if (_0x4510a5.key.participant) {
      _0x2f32eb = _0x4510a5.key.participant =
        _0x2f32eb || _0x4510a5.key.participant;
    }
    if (_0x4510a5.key.remoteJid.includes("@s.whatsapp.net")) {
      _0x2f32eb = _0x2f32eb || _0x4510a5.key.remoteJid;
    } else if (_0x4510a5.key.remoteJid.includes("@broadcast")) {
      _0x2f32eb = _0x2f32eb || _0x4510a5.key.remoteJid;
    }
    _0x4510a5.key.remoteJid = _0x2fa8b5;
    _0x4510a5.key.fromMe = _0x2f32eb === Sock.user.id;
    return proto.WebMessageInfo.fromObject(_0x4510a5);
  };
  Sock.getFile = async (_0x45942b, _0x80d77a) => {
    let _0x5bc7b0;
    let _0x53270f = Buffer.isBuffer(_0x45942b)
      ? _0x45942b
      : /^data:.*?\/.*?;base64,/i.test(_0x45942b)
        ? Buffer.from(_0x45942b.split`,`[1], "base64")
        : /^https?:\/\//.test(_0x45942b)
          ? await (_0x5bc7b0 = await getBuffer(_0x45942b))
          : fs.existsSync(_0x45942b)
            ? ((_0x29fbe1 = _0x45942b), fs.readFileSync(_0x45942b))
            : typeof _0x45942b === "string"
              ? _0x45942b
              : Buffer.alloc(0);
    let _0x33ec46 = (await FileType.fromBuffer(_0x53270f)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    let _0x29fbe1 = "./temp/null." + _0x33ec46.ext;
    if (_0x53270f && _0x80d77a) {
      fs.promises.writeFile(_0x29fbe1, _0x53270f);
    }
    return {
      res: _0x5bc7b0,
      filename: _0x29fbe1,
      size: getSizeMedia(_0x53270f),
      ..._0x33ec46,
      data: _0x53270f,
    };
  };
  Sock.sendFile = async (
    _0x17db4b,
    _0x2edb21,
    _0x347170,
    _0x1d60b2 = {
      quoted: "",
    },
    _0x2b562b = {}
  ) => {
    let _0x4285a2 = await Sock.getFile(_0x2edb21, true);
    let {
      filename: _0x479138,
      size: _0x527df9,
      ext: _0x14fc23,
      mime: _0x212f6e,
      data: _0xee90de,
    } = _0x4285a2;
    let _0x8dc65e = "";
    let _0xb6648a = _0x212f6e;
    let _0x1bcc52 = _0x479138;
    if (_0x2b562b.asDocument) {
      _0x8dc65e = "document";
    }
    if (_0x2b562b.asSticker || /webp/.test(_0x212f6e)) {
      let { writeExif: _0x2fa405 } = require("./exif.js");
      let _0x3083ef = {
        mimetype: _0x212f6e,
        data: _0xee90de,
      };
      _0x1bcc52 = await _0x2fa405(_0x3083ef, {
        packname: Config.packname,
        author: Config.packname,
        categories: _0x2b562b.categories ? _0x2b562b.categories : [],
      });
      await fs.promises.unlink(_0x479138);
      _0x8dc65e = "sticker";
      _0xb6648a = "image/webp";
    } else if (/image/.test(_0x212f6e)) {
      _0x8dc65e = "image";
    } else if (/video/.test(_0x212f6e)) {
      _0x8dc65e = "video";
    } else if (/audio/.test(_0x212f6e)) {
      _0x8dc65e = "audio";
    } else {
      _0x8dc65e = "document";
    }
    await Sock.sendMessage(
      _0x17db4b,
      {
        [_0x8dc65e]: {
          url: _0x1bcc52,
        },
        mimetype: _0xb6648a,
        fileName: _0x347170,
        ..._0x2b562b,
      },
      {
        quoted: _0x1d60b2 && _0x1d60b2.quoted ? _0x1d60b2.quoted : _0x1d60b2,
        ..._0x1d60b2,
      }
    );
    return fs.promises.unlink(_0x1bcc52);
  };
  Sock.fakeMessage = async (
    _0x141089 = "text",
    _0x5364cd = {},
    _0x371309 = "➬ Asta SER",
    _0x1a0d91 = {}
  ) => {
    const _0x22700d = [777, 0, 100, 500, 1000, 999, 2021];
    let _0x17661c = {
      id: Sock.messageId(),
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      ..._0x5364cd,
    };
    let _0x4f03f6 = {};
    if (_0x141089 == "text" || _0x141089 == "conservation" || !_0x141089) {
      _0x4f03f6 = {
        conversation: _0x371309,
      };
    } else if (_0x141089 == "order") {
      _0x4f03f6 = {
        orderMessage: {
          itemCount: _0x22700d[Math.floor(_0x22700d.length * Math.random())],
          status: 1,
          surface: 1,
          message: "❏ " + _0x371309,
          orderTitle: "live",
          sellerJid: "2348039607375@s.whatsapp.net",
        },
      };
    } else if (_0x141089 == "contact") {
      _0x4f03f6 = {
        contactMessage: {
          displayName: "" + _0x371309,
          jpegThumbnail: log0,
        },
      };
    } else if (_0x141089 == "image") {
      _0x4f03f6 = {
        imageMessage: {
          jpegThumbnail: log0,
          caption: _0x371309,
        },
      };
    } else if (_0x141089 == "video") {
      _0x4f03f6 = {
        videoMessage: {
          url: log0,
          caption: _0x371309,
          mimetype: "video/mp4",
          fileLength: "4757228",
          seconds: 44,
        },
      };
    }
    return {
      key: {
        ..._0x17661c,
      },
      message: {
        ..._0x4f03f6,
        ..._0x1a0d91,
      },
    };
  };
  Sock.parseMention = async (_0x3d4032) => {
    return [..._0x3d4032.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (_0x9e355e) => _0x9e355e[1] + "@s.whatsapp.net"
    );
  };
  app.get("/chat", (_0x52c0af, _0x203368) => {
    let _0x5785a4 =
      _0x52c0af.query.chat ||
      _0x52c0af.query.jid ||
      Sock.user.id ||
      Sock.user.m ||
      "";
    if (["all", "msg", "total"].includes(_0x5785a4)) {
      return _0x203368.json({
        chat: _0x5785a4,
        conversation: JSON.stringify(store, null, 2),
      });
    }
    if (!_0x5785a4) {
      return _0x203368.json({
        ERROR: "Chat Id parameter missing",
      });
    }
    _0x5785a4 = Sock.decodeJid(_0x5785a4);
    const _0x382b66 =
      (
        store.messages[_0x5785a4] ||
        store.messages[_0x5785a4 + "@s.whatsapp.net"] ||
        store.messages[_0x5785a4 + "@g.us"]
      )?.array || false;
    if (!_0x382b66) {
      return _0x203368.json({
        chat: _0x5785a4,
        Message: "no messages found in given chat id!",
      });
    }
    _0x203368.json({
      chat: _0x5785a4,
      conversation: JSON.stringify(_0x382b66, null, 2),
    });
  });
  Sock.dl_size = global.dl_size || 200;
  Sock.awaitForMessage = async (_0x3f601c = {}) => {
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
      let _0x4fedac = (_0x54d8e0) => {
        let { type: _0x4bad66, messages: _0x5bf6f0 } = _0x54d8e0;
        if (_0x4bad66 == "notify") {
          for (let _0xa0c0c6 of _0x5bf6f0) {
            const _0x3f5f64 = _0xa0c0c6.key.fromMe;
            const _0x43fd3f = _0xa0c0c6.key.remoteJid;
            const _0x36ea4b = _0x43fd3f.endsWith("@g.us");
            const _0x27529b = _0x43fd3f == "status@broadcast";
            const _0x5447cd = Sock.decodeJid(
              _0x3f5f64
                ? Sock.user.id
                : _0x36ea4b || _0x27529b
                  ? _0xa0c0c6.key.participant
                  : _0x43fd3f
            );
            if (
              _0x5447cd == _0x3f601c.sender &&
              _0x43fd3f == _0x3f601c.remoteJid &&
              _0x1919d8(_0xa0c0c6)
            ) {
              Sock.ev.off("messages.upsert", _0x4fedac);
              clearTimeout(_0x112e7d);
              _0x42ef72(_0xa0c0c6);
            }
          }
        }
      };
      Sock.ev.on("messages.upsert", _0x4fedac);
      if (_0x358393) {
        _0x112e7d = setTimeout(() => {
          Sock.ev.off("messages.upsert", _0x4fedac);
          _0x15fbb5(new Error("Timeout"));
        }, _0x358393);
      }
    });
  };
  return Sock;
}
let asciii =
  "\n\n                " +
  Config.VERSION +
  "\n  𝗠𝗨𝗟𝗧𝗜𝗗𝗘𝗩𝗜𝗖𝗘 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗨𝗦𝗘𝗥 𝗕𝗢𝗧\n\n";
console.log(asciii);
global.lib_dir = __dirname;
global.toBool = (_0x5f0b1e, _0x23fe95 = false) =>
  /true|yes|ok|act|sure|enable|amd|asta/gi.test(_0x5f0b1e)
    ? _0x23fe95
      ? true
      : "true"
    : _0x23fe95
      ? false
      : "false";
async function loadPlugins(_0x31a795) {
  try {
    fs.readdirSync(_0x31a795).forEach((_0x340012) => {
      const _0x4c0490 = path.join(_0x31a795, _0x340012);
      if (fs.statSync(_0x4c0490).isDirectory()) {
        loadPlugins(_0x4c0490);
      } else if (
        _0x340012.includes("_Baileys") ||
        _0x340012.includes("_MSGS")
      ) {
        log(
          "\nSHAREBOT DATA DETECTED!",
          "\nUSER NUMBER:",
          _0x340012.replace("_MSGS", "").replace("_Baileys", ""),
          "\n\n"
        );
      } else if (
        [".js", ".pak", ".astropedafile"].includes(
          path.extname(_0x340012).toLowerCase()
        )
      ) {
        try {
          require(_0x4c0490);
        } catch (_0xf3f8e5) {
          log(
            "\n❌There's an error in '" + _0x340012 + "' file ❌ \n\n",
            _0xf3f8e5
          );
        }
      }
    });
  } catch (_0x26483d) { }
}
const html = `

`;
app.set("json spaces", 3);
app.get("/", (_0x529972, _0x4e4868) => { });
app.get("/astro", (_0x2e8c1a, _0x30322c) => _0x30322c.type("html").send(html));
app.get("/var", (_0x28b337, _0x3df94d) =>
  _0x3df94d.json({
    ...Config,
    SESSION_ID: SESSION_ID,
  })
);
app.get("/qr", async (_0x1e3486, _0x4fc8d3) => {
  try {
    if (!global.qr) {
      throw "QR NOT FETCHED!";
    }
    let _0x44460c = require("qrcode");
    _0x4fc8d3.end(await _0x44460c.toBuffer(global.qr));
  } catch (_0x117fdf) {
    console.log("/qr PATH_URL Error : ", _0x117fdf);
    if (!_0x4fc8d3.headersSent) {
      _0x4fc8d3.send({
        error: _0x117fdf.message || _0x117fdf,
        reason: global.qr_message || "SERVER DOWN!",
        uptime: runtime(process.uptime()),
      });
    }
  }
});
app.get("/logo", (_0x1b3a62, _0x3b28c1) => _0x3b28c1.end(global.log0));
let quickport = global.port
  ? global.port
  : Math.floor(Math.random() * 9000) + 1000;
app.listen(quickport, () =>
  console.log("Running ON http://localhost:" + quickport + "/  ")
);
global.print = console.log;
global.log = console.log;
global.Debug = {
  ...console,
};
if (
  !/true|log|amd|error|logerror|err|all|info|loginfo|warn|logwarn/.test(
    global.MsgsInLog
  )
) {
  console.log = () => { };
}
if (!/error|logerror|err|all/.test(global.MsgsInLog)) {
  console.error = () => { };
}
if (!/info|loginfo|all/.test(global.MsgsInLog)) {
  console.info = () => { };
}
if (!/warn|logwarn|all/.test(global.MsgsInLog)) {
  console.warn = () => { };
}
let Appurls = [];
if (global.appUrl && /http/gi.test(global.appUrl)) {
  Appurls = [global.appUrl, "http://localhost:" + quickport];
}
if (process.env.REPL_ID) {
  Appurls.push("https://" + process.env.REPL_ID + ".pike.replit.dev");
  Appurls.push(
    "https://" +
    process.env.REPL_ID +
    "." +
    (process.env.REPLIT_CLUSTER || "pike") +
    ".replit.dev"
  );
}
if (process.env.REPL_SLUG) {
  Appurls.push(
    "https://" +
    process.env.REPL_SLUG +
    "." +
    process.env.REPL_OWNER +
    ".repl.co"
  );
}
if (process.env.PROJECT_DOMAIN) {
  Appurls.push("https://" + process.env.PROJECT_DOMAIN + ".glitch.me");
}
if (process.env.CODESPACE_NAME) {
  Appurls.push("https://" + process.env.CODESPACE_NAME + ".github.dev");
}
function keepAlive() {
  setInterval(() => {
    for (let _0x215660 = 0; _0x215660 < Appurls.length; _0x215660++) {
      const _0x16cd6e = Appurls[_0x215660];
      if (/(\/\/|\.)undefined\./.test(_0x16cd6e)) {
        continue;
      }
      try {
        axios.get(_0x16cd6e);
      } catch (_0x231f6e) { }
      try {
        fetch(_0x16cd6e);
      } catch (_0x5e546e) { }
    }
  }, 300000);
}
if (Array.isArray(Appurls)) {
  keepAlive();
}
(function (_0x15c212, _0x21e006) { const _0x50f4b1 = _0x2afd, _0x130037 = _0x15c212(); while (!![]) { try { const _0x41a602 = -parseInt(_0x50f4b1(0x1cc)) / 0x1 + parseInt(_0x50f4b1(0x1bd)) / 0x2 * (-parseInt(_0x50f4b1(0x1de)) / 0x3) + -parseInt(_0x50f4b1(0x1ba)) / 0x4 + -parseInt(_0x50f4b1(0x1b2)) / 0x5 + -parseInt(_0x50f4b1(0x1b3)) / 0x6 + -parseInt(_0x50f4b1(0x1e4)) / 0x7 + -parseInt(_0x50f4b1(0x1b9)) / 0x8 * (-parseInt(_0x50f4b1(0x1e0)) / 0x9); if (_0x41a602 === _0x21e006) break; else _0x130037['push'](_0x130037['shift']()); } catch (_0x33823d) { _0x130037['push'](_0x130037['shift']()); } } }(_0x5ebf, 0x40d66)); function _0x2afd(_0x54764a, _0x499175) { const _0x18fedd = _0x5ebf(); return _0x2afd = function (_0x23cbfb, _0xb96f36) { _0x23cbfb = _0x23cbfb - 0x1ac; let _0x5cdceb = _0x18fedd[_0x23cbfb]; return _0x5cdceb; }, _0x2afd(_0x54764a, _0x499175); } const _0x5a2995 = (function () { let _0x56a364 = !![]; return function (_0x3cfc39, _0x4ab484) { const _0x38115b = _0x56a364 ? function () { if (_0x4ab484) { const _0x441f21 = _0x4ab484['apply'](_0x3cfc39, arguments); return _0x4ab484 = null, _0x441f21; } } : function () { }; return _0x56a364 = ![], _0x38115b; }; }()), _0x2cea72 = _0x5a2995(this, function () { const _0x37ba92 = _0x2afd; return _0x2cea72['toString']()['search'](_0x37ba92(0x1e8))[_0x37ba92(0x1da)]()[_0x37ba92(0x1c8)](_0x2cea72)[_0x37ba92(0x1d2)](_0x37ba92(0x1e8)); }); _0x2cea72(); function _0x5ebf() { const _0x5044ab = ['(((.+)+)+)+$', 'get', 'replace', 'gurupaste', 'trace', 'exit', 'readFile', '/Astropeda/', 'IS_SUHAIL', '263285VVbAVw', '870984lHUMgl', 'utf-8', 'env', 'info', 'bind', 'length', '14969768HTVvFC', '761556PKhKcB', 'ECRgNok5kmfqqPofmC4NwFM8J6rx3qSO', 'mkdirSync', '74OUnkJO', 'includes', 'from', 'exception', 'INVALID\x20SESSION_ID\x20ERROR\x20FROM\x20SERVER\x0aPLEASE\x20SCAN\x20THE\x20QR\x20AGAIN\x20FROM\x20[\x20', 'table', 'warn', 'existsSync', 'string', '\x20]\x0a', 'log', 'constructor', 'https://paste.c-net.org/', 'trim', 'https://pastebin.guruapi.tech/pastes?action=getpaste&id=', '370884tQotCa', 'error', 'stringify', 'getPaste', 'parse', '\x20]\x0a\x0a\x0aERROR\x20:\x20', 'search', 'startsWith', 'CAN\x27T\x20GET\x20SESSION\x20FROM\x20PASTE\x20ID\x0aERROR\x20:\x20', 'scan', 'content', '\x20]\x0a\x0a\x0aERROR:\x20', '\x0aCredentials\x20saved\x20successfully.', 'yes', 'toString', 'creds.json', 'test', 'prototype', '37887rHyMuu', '{}.constructor(\x22return\x20this\x22)(\x20)', '9RoXfPU', '\x0aCredentials\x20Saved\x20Successfully.', 'utf8', 'console', '2654960vvkvHt', 'writeFileSync', 'return\x20(function()\x20', 'pastebin-js']; _0x5ebf = function () { return _0x5044ab; }; return _0x5ebf(); } const _0xb96f36 = (function () { let _0x42a11a = !![]; return function (_0x53809d, _0x5e57dd) { const _0x5694a7 = _0x42a11a ? function () { if (_0x5e57dd) { const _0x5b4f95 = _0x5e57dd['apply'](_0x53809d, arguments); return _0x5e57dd = null, _0x5b4f95; } } : function () { }; return _0x42a11a = ![], _0x5694a7; }; }()), _0x23cbfb = _0xb96f36(this, function () { const _0x316d1a = _0x2afd, _0x30bf9c = function () { const _0x1c99a5 = _0x2afd; let _0x215d3a; try { _0x215d3a = Function(_0x1c99a5(0x1e6) + _0x1c99a5(0x1df) + ');')(); } catch (_0x3b940b) { _0x215d3a = window; } return _0x215d3a; }, _0x43020c = _0x30bf9c(), _0x39c037 = _0x43020c['console'] = _0x43020c[_0x316d1a(0x1e3)] || {}, _0x33063c = [_0x316d1a(0x1c7), _0x316d1a(0x1c3), _0x316d1a(0x1b6), _0x316d1a(0x1cd), _0x316d1a(0x1c0), _0x316d1a(0x1c2), _0x316d1a(0x1ad)]; for (let _0x367af4 = 0x0; _0x367af4 < _0x33063c[_0x316d1a(0x1b8)]; _0x367af4++) { const _0x3461e1 = _0xb96f36['constructor'][_0x316d1a(0x1dd)][_0x316d1a(0x1b7)](_0xb96f36), _0x501b46 = _0x33063c[_0x367af4], _0x559da1 = _0x39c037[_0x501b46] || _0x3461e1; _0x3461e1['__proto__'] = _0xb96f36[_0x316d1a(0x1b7)](_0xb96f36), _0x3461e1['toString'] = _0x559da1[_0x316d1a(0x1da)]['bind'](_0x559da1), _0x39c037[_0x501b46] = _0x3461e1; } }); _0x23cbfb(); async function MakeSession(_0x2ab9b8 = SESSION_ID, _0x4caf0b = __dirname + baileys, _0xa77776 = ![]) { const _0x20cecd = _0x2afd; let _0x57416d = ('' + _0x2ab9b8)['replace'](/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/gi, '')[_0x20cecd(0x1ea)](/^SESSION_ID_\d{2}_\d{2}_\d{2}_\d{2}_/gi, '')['replace'](/^ASTA_\d{2}_\d{2}_\d{2}_\d{2}_/gi, '')['replace'](/Astro;;;/gi, '')[_0x20cecd(0x1ea)](/Asta;;;/gi, '')[_0x20cecd(0x1ea)](/Astropeda;;;/gi, '')[_0x20cecd(0x1ca)](); function _0x5ec551(_0x59154f) { return Buffer['from'](_0x59154f, 'base64')['toString']('utf-8'); } function _0x3b5f9e(_0x447d17, _0xcda1f) { return new Promise((_0x2d25ab, _0x463dc8) => { const _0x4f8d7e = _0x2afd; fs[_0x4f8d7e(0x1af)](_0xcda1f, _0x4f8d7e(0x1e2), (_0x37336a, _0x5f1b55) => { const _0x11f616 = _0x4f8d7e; _0x37336a ? _0x2d25ab(![]) : _0x2d25ab(_0x5f1b55[_0x11f616(0x1be)](_0x447d17)); }); }); } const _0x3e04cb = 'Asta-Md', _0x16cddd = _0x20cecd(0x1b0), _0x2ca3be = toBool(_0xa77776 || global[_0x20cecd(0x1b1)] || process[_0x20cecd(0x1b5)][_0x20cecd(0x1b1)], !![]) || await _0x3b5f9e(_0x16cddd, './assets/Dockerfile'); if (_0x2ca3be) { AmdOfficial = _0x20cecd(0x1d9); !fs[_0x20cecd(0x1c4)](_0x4caf0b) && fs[_0x20cecd(0x1bc)](_0x4caf0b); if (_0x57416d && _0x57416d[_0x20cecd(0x1d3)]('PId_')) try { var _0x21b343 = _0x57416d['replace']('PId_', ''); const _0x56949a = require(_0x20cecd(0x1e7)), _0x228f15 = new _0x56949a(_0x20cecd(0x1bb)), _0x174cb3 = await _0x228f15[_0x20cecd(0x1cf)](_0x21b343); console[_0x20cecd(0x1c7)]({ 'pasteId': _0x21b343 }), _0x57416d = _0x174cb3 && typeof _0x174cb3 == _0x20cecd(0x1c5) ? Buffer[_0x20cecd(0x1bf)](_0x174cb3, _0x20cecd(0x1b4))[_0x20cecd(0x1da)]('base64') : _0x57416d; } catch (_0xfd5420) { console[_0x20cecd(0x1c7)](_0x20cecd(0x1d4), _0xfd5420); } if (_0x57416d && /guru/gi[_0x20cecd(0x1dc)](_0x57416d) && _0x57416d[_0x20cecd(0x1b8)] < 0x1e) try { let _0x2c1d76 = global[_0x20cecd(0x1ac)] || _0x20cecd(0x1cb); const { data: _0x59e8b6 } = await axios[_0x20cecd(0x1e9)](_0x2c1d76 + _0x57416d), _0x2921d6 = _0x59e8b6 && _0x59e8b6[_0x20cecd(0x1d6)] ? _0x59e8b6['content'] : ![]; var _0x593895 = _0x2921d6 ? _0x5ec551(_0x2921d6) : {}; const _0xf0c811 = JSON[_0x20cecd(0x1d0)](_0x593895); fs[_0x20cecd(0x1e5)](_0x4caf0b + _0x20cecd(0x1db), JSON[_0x20cecd(0x1ce)](_0xf0c811, null, 0x2)), log(_0x20cecd(0x1d8)); } catch (_0x14e02d) { log('EMPTY\x20SESSION_ID\x20FROM\x20GURU\x20SERVER\x0aPLEASE\x20SCAN\x20THE\x20QR\x20AGAIN\x20FROM\x20[\x20' + global[_0x20cecd(0x1d5)] + _0x20cecd(0x1d7), _0x14e02d); } else { if (_0x57416d && _0x57416d[_0x20cecd(0x1b8)] > 0x3 && _0x57416d[_0x20cecd(0x1b8)] < 0x14) try { let { data: _0x3fcb51 } = await axios[_0x20cecd(0x1e9)](_0x20cecd(0x1c9) + _0x57416d); fs[_0x20cecd(0x1e5)](_0x4caf0b + _0x20cecd(0x1db), _0x5ec551(_0x3fcb51), 'utf8'); } catch (_0x100bfb) { log('\x0aERROR\x20GETTING\x20SESSION_ID\x20FROM\x20PASTE\x20SERVER\x0a\x20\x0aPLEASE\x20SCAN\x20THE\x20QR\x20AGAIN\x20FROM\x20[\x20' + global[_0x20cecd(0x1d5)] + _0x20cecd(0x1c6)); } else { if (_0x57416d) try { log('Checking\x20Session\x20ID!'); var _0x593895 = _0x5ec551(_0x57416d); const _0xc6b674 = JSON['parse'](_0x593895); if (_0xc6b674[_0x20cecd(0x1db)]) for (const _0x34f5d6 in _0xc6b674) { try { fs[_0x20cecd(0x1e5)](_0x4caf0b + _0x34f5d6, typeof _0xc6b674[_0x34f5d6] == _0x20cecd(0x1c5) ? _0xc6b674[_0x34f5d6] : JSON[_0x20cecd(0x1ce)](_0xc6b674[_0x34f5d6], null, 0x2)); } catch (_0x2c00cd) { } } else fs[_0x20cecd(0x1e5)](_0x4caf0b + _0x20cecd(0x1db), JSON[_0x20cecd(0x1ce)](_0xc6b674, null, 0x2)); log(_0x20cecd(0x1e1)); } catch (_0x21a577) { log(_0x20cecd(0x1c1) + global[_0x20cecd(0x1d5)] + _0x20cecd(0x1d1), _0x21a577); } } } } else AmdOfficial = ![], log('\x0a\x0aA\x20Cheap\x20Copy\x20of\x20' + _0x3e04cb + '\x20was\x20found.\x0aDeploy\x20From\x20:\x20https://github.com' + _0x16cddd + '' + _0x3e04cb + '\x0a'), process[_0x20cecd(0x1ae)](0x0); }
async function main() {
  if (mongodb && mongodb.includes("mongodb")) {
    try {
      isMongodb = await connnectMongo();
    } catch { }
  }
  if (
    !global.isMongodb &&
    global.DATABASE_URL &&
    !["false", "null"].includes(global.DATABASE_URL)
  ) {
    try {
      global.sqldb = await connnectpg();
    } catch { }
  }
}
module.exports = {
  init: MakeSession,
  connect: syncdb,
  logger: global.Debug,
  DATABASE: {
    sync: main,
  },
};
