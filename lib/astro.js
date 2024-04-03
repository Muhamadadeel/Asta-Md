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
var {
  default: AstaConnectSock,
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
global.AstaOfficial = false;
global.sqldb = false;
global.pg_pools = false;
const {
  userdb,
  groupdb,
  sleep,
  getBuffer,
  parsedJid,
  tiny,
  botpic,
  tlang,
  runtime,
  getSizeMedia,
  bot_,
  smdBuffer,
} = require("../lib");
const fetch = require("node-fetch");
const axios = require("axios");
const { smsg, callsg, groupsg } = require("./serialized.js");
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
let baileys = "/Session/";
const connnectpg = async () => {
  try {
    const { Pool } = require("pg");
    const pool = new Pool({
      connectionString: global.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    const client = await pool.connect();
    client.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (error) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};

const connnectMongo = async () => {
  const mongoose = require("mongoose");
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongodb);
    console.log("🌍 Connected to the MongoDB.");
    return true;
  } catch {
    console.log("Could not connect with MongoDB.");
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
const storeFilePath = path.join(__dirname, "/store.json");
try {
  if (fs.existsSync(storeFilePath)) {
    store.readFromFile(storeFilePath);
  }
} catch (error) {
  console.log("CLIENT STORE ERROR:\n", error);
}
require("events").EventEmitter.defaultMaxListeners = 2000;
//
/**BELOW ABOUT BOT FUNCTIONALITY */
//
async function syncdb() {
  let thumbnailImagePath = __dirname + "/assets/asta.jpeg";

  try {
    global.thumbnailImage =
      typeof THUMB_IMAGE === "string"
        ? await getBuffer(THUMB_IMAGE.split(",")[0])
        : fs.readFileSync(thumbnailImagePath);
  } catch (error) {
    thumbnailImagePath = __dirname + "/assets/asta.jpeg";
  }
  global.thumbnailImage =
    global.thumbnailImage || fs.readFileSync(thumbnailImagePath);
  const { state: state, saveCreds: creds } = await useMultiFileAuthState(
    __dirname + baileys
  );
  let AstaConn = AstaConnectSock({
    logger: Pino({ level: "silent" || "debug" || "fatal" }),
    printQRInTerminal: false,
    browser: ["Windows", "chrome", "Asta"],
    fireInitQueries: true,
    shouldSyncHistoryMessage: true,
    downloadHistory: true,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: true,
    auth: state,
    getMessage: async (message) => {
      let defaultMessage = { conversation: "Hello World!" };
      if (store) {
        const storedMessage = await store.loadMessage(
          message.remoteJid,
          message.id
        );
        return storedMessage.message || defaultMessage;
      }
      return defaultMessage;
    },
  });
  store.bind(AstaConn.ev);
  setInterval(() => {
    try {
      const filePath = __dirname + "/store.json";
      store.writeToFile(filePath);
    } catch (error) {
      console.log("CLIENT STORE ERROR:\n", error);
    }
  }, 10000);
  AstaConn.ev.on("call", async (callData) => {
    let callResponse = await callsg(
      AstaConn,
      JSON.parse(JSON.stringify(callData[0]))
    );
    events.commands.map(async (command) => {
      if (command.call === "offer" && callResponse.status === "offer") {
        try {
          command.function(callResponse, { store: store, Void: AstaConn });
        } catch (error) {
          console.error("[CALL ERROR] ", error);
        }
      }
      if (command.call === "accept" && callResponse.status === "accept") {
        try {
          command.function(callResponse, { store: store, Void: AstaConn });
        } catch (error) {
          console.error("[CALL ACCEPT ERROR] ", error);
        }
      }
      if (
        command.call === "call" ||
        command.call === "on" ||
        command.call === "all"
      ) {
        try {
          command.function(callResponse, { store: store, Void: AstaConn });
        } catch (error) {
          console.error("[CALL ERROR] ", error);
        }
      }
    });
  });
  var botNumber = false;
  let dbgroup = {};
  let dbuser = {};
  AstaConn.ev.on("messages.upsert", async (callData) => {
    try {
      if (!callData.messages || !Array.isArray(callData.messages)) {
        return;
      }
      botNumber = botNumber || AstaConn.decodeJid(AstaConn.user.id);
      for (mek of callData.messages) {
        mek.message =
          Object.keys(mek.message || {})[0] === "ephemeralMessage"
            ? mek.message.ephemeralMessage.message
            : mek.message;
        if (
          !mek.message ||
          !mek.key ||
          !/broadcast/gi.test(mek.key.remoteJid)
        ) {
          continue;
        }
        let messageData = await smsg(
          AstaConn,
          JSON.parse(JSON.stringify(mek)),
          store,
          true
        );
        if (!messageData.message) {
          continue;
        }
        let messageBody = messageData.body;
        let eventData = {
          body: messageBody,
          mek: mek,
          text: messageBody,
          args: messageBody.split(" ") || [],
          botNumber: botNumber,
          isCreator: messageData.isCreator,
          store: store,
          budy: messageBody,
          Asta: {
            bot: AstaConn,
          },
          Void: AstaConn,
          proto: proto,
        };
        events.commands.map(async (command) => {
          if (typeof command.on === "string") {
            let commandName = command.on.trim();
            let shouldExecute =
              !command.fromMe || (command.fromMe && messageData.fromMe);
            if (
              /status|story/gi.test(commandName) &&
              (messageData.jid === "status@broadcast" ||
                mek.key.remoteJid === "status@broadcast") &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              ["broadcast"].includes(commandName) &&
              (/broadcast/gi.test(mek.key.remoteJid) ||
                messageData.broadcast ||
                /broadcast/gi.test(messageData.from)) &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            }
          }
        });
      }
    } catch (error) {
      console.log("ERROR broadCast --------- messages.upsert \n", error);
    }
  });

  AstaConn.ev.on("messages.upsert", async (callData) => {
    try {
      botNumber = botNumber || AstaConn.decodeJid(AstaConn.user.id);
      if (!global.isStart) {
        return;
      }
      for (mek of callData.messages) {
        if (!mek.message) {
          continue;
        }
        mek.message =
          Object.keys(mek.message || {})[0] === "ephemeralMessage"
            ? mek.message.ephemeralMessage.message
            : mek.message;
        if (!mek.message || !mek.key || /broadcast/gi.test(mek.key.remoteJid)) {
          continue;
        }
        let messageData = await smsg(
          AstaConn,
          JSON.parse(JSON.stringify(mek)),
          store,
          true
        );
        let message = messageData;
        if (!messageData.message || messageData.chat.endsWith("broadcast")) {
          continue;
        }
        var { body: messageBody } = messageData;
        var isCreator = messageData.isCreator;
        var rawText =
          typeof messageData.text == "string" ? messageData.text.trim() : false;
        if (rawText && messageBody[1] && messageBody[1] == " ") {
          messageBody = messageBody[0] + messageBody.slice(2);
        }
        let isCommand = false;
        let commandName = false;
        let commandPrefix = false;
        if (rawText && Config.HANDLERS.toLowerCase().includes("null")) {
          isCommand = true;
          commandName = messageBody.split(" ")[0].toLowerCase() || false;
        } else if (rawText && !Config.HANDLERS.toLowerCase().includes("null")) {
          isCommand =
            prefixboth ||
            (messageBody && prefixRegex.test(messageBody[0])) ||
            (messageData.isAsta &&
              /923184474176|923004591719|17863688449/g.test(botNumber) &&
              messageBody[0] == ",");
          commandName = isCommand
            ? prefa
              ? messageBody.trim().split(" ")[0].toLowerCase()
              : messageBody.slice(1).trim().split(" ")[0].toLowerCase()
            : false;
          commandPrefix = prefixboth
            ? messageBody.trim().split(" ")[0].toLowerCase()
            : "";
        } else {
          isCommand = false;
        }
        let command = commandName ? commandName.trim() : "";
        if (command && global.setCmdAlias[command] !== undefined) {
          commandName = global.setCmdAlias[command];
          isCommand = true;
        } else if (messageData.mtype == "stickerMessage") {
          command = "sticker-" + messageData.msg.fileSha256;
          if (global.setCmdAlias[command]) {
            commandName = global.setCmdAlias[command];
            isCommand = true;
          }
        }
        if (blockJid.includes(messageData.chat) && !messageData.isAsta) {
          return;
        }
        if (
          isCommand &&
          (messageData.isBaileys ||
            (!isCreator &&
              Config.WORKTYPE === "private" &&
              !allowJid.includes(messageData.chat)))
        ) {
          isCommand = false;
        }
        const args = messageData.body
          ? messageBody.trim().split(/ +/).slice(1)
          : [];
        if (
          !isCreator &&
          global.disablepm === "true" &&
          isCommand &&
          !messageData.isGroup
        ) {
          isCommand = false;
        }
        if (
          !isCreator &&
          global.disablegroup === "true" &&
          isCommand &&
          messageData.isGroup &&
          !allowJid.includes(messageData.chat)
        ) {
          isCommand = false;
        }
        Asta.bot = AstaConn;
        if (isCommand) {
          let command =
            events.commands.find(
              (command) => command.pattern === commandName
            ) ||
            events.commands.find(
              (command) => command.alias && command.alias.includes(commandName)
            );
          if (!command && prefixboth && commandPrefix) {
            command =
              events.commands.find(
                (command) => command.pattern === commandPrefix
              ) ||
              events.commands.find(
                (command) =>
                  command.alias && command.alias.includes(commandPrefix)
              );
          }
          if (command && command.fromMe && !messageData.fromMe && !isCreator) {
            command = false;
            return messageData.reply(tlang().owner);
          }
          if (messageData.isGroup && command && commandName !== "bot") {
            let groupData = dbgroup[messageData.chat] ||
              (await groupdb.findOne({
                id: messageData.chat,
              })) || {
                botenable: toBool(
                  messageData.isAsta || !blockJid.includes(messageData.chat)
                ),
              };
            if (groupData && groupData.botenable === "false") {
              command = false;
            }
            if (command && groupData) {
              let pattern = command.pattern.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
              );
              let regex = new RegExp("\\b" + pattern + "\b");
              if (
                groupData.disablecmds !== "false" &&
                regex.test(groupData.disablecmds)
              ) {
                command = false;
              }
            }
          }
          if (!isCreator && command) {
            try {
              let userData = dbuser[messageData.sender] ||
                (await userdb.findOne({
                  id: messageData.sender,
                })) || {
                  ban: "false",
                };
              if (userData.ban === "true") {
                command = false;
                messageData.reply(
                  "Hey " +
                    messageData.senderName.split("\n").join("  ") +
                    ",\n_You are banned from using commands._"
                );
              }
            } catch (error) {
              console.log("checkban.ban", error);
            }
          }
          if (command) {
            if (command.react) {
              messageData.react(command.react);
            }
            let text = messageData.body
              ? messageBody.trim().split(/ +/).slice(1).join(" ")
              : "";
            let pattern = command.pattern;
            messageData.cmd = pattern;
            try {
              command.function(messageData, text, {
                cmd: pattern,
                text: text,
                body: messageBody,
                args: args,
                cmdName: commandName,
                isCreator: isCreator,
                smd: pattern,
                botNumber: botNumber,
                budy: rawText,
                store: store,
                Asta: Asta,
                Void: AstaConn,
              });
            } catch (error) {
              console.log("[ERROR] ", error);
            }
          } else {
            isCommand = false;
            const category =
              events.commands.find(
                (command) => command.category === commandName
              ) || false;
            if (category) {
              const commands = {};
              let commandList = "";
              events.commands.map(async (command, index) => {
                if (
                  command.dontAddCommandList === false &&
                  command.pattern !== undefined
                ) {
                  if (!commands[command.category]) {
                    commands[command.category] = [];
                  }
                  commands[command.category].push(command.pattern);
                }
              });
              for (const category in commands) {
                if (commandName == category.toLowerCase()) {
                  commandList =
                    "┌───〈 " +
                    category.toLowerCase() +
                    " menu  〉───◆\n│╭─────────────···▸\n┴│▸\n";
                  for (const command of commands[category]) {
                    commandList += "⬡│▸ " + command + "\n";
                  }
                  commandList +=
                    "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                  break;
                }
              }
              AstaConn.sendUi(messageData.jid, {
                caption: tiny(commandList),
              });
            }
          }
        }
        try {
          dbgroup[messageData.chat] =
            (await groupdb.findOne({
              id: messageData.chat,
            })) ||
            (await groupdb.new({
              id: messageData.chat,
              botenable:
                messageData.chat === "120363023983262391@g.us"
                  ? "false"
                  : "true",
              goodbye: toBool(global.gdbye),
              welcome: toBool(global.wlcm),
            }));
          dbuser[messageData.sender] =
            (await userdb.findOne({
              id: messageData.sender,
            })) ||
            (await userdb.new({
              id: messageData.sender,
              name: messageData.pushName || "Unknown",
            }));
        } catch (error) {
          main();
        }
        text = messageData.body;
        let eventData = {
          dbuser: dbuser[messageData.sender],
          dbgroup: dbgroup[messageData.chat],
          body: messageBody,
          mek: mek,
          text: text,
          args: args,
          botNumber: botNumber,
          isCreator: isCreator,
          icmd: isCommand,
          store: store,
          budy: rawText,
          Asta: Asta,
          Void: AstaConn,
          proto: proto,
        };
        let dataTypes = {
          mp4: "video",
          mp3: "audio",
          webp: "sticker",
          photo: "image",
          picture: "image",
          vv: "viewonce",
        };
        events.commands.map(async (command) => {
          if (typeof command.on === "string") {
            let commandName = command.on.trim();
            let shouldExecute =
              !command.fromMe || (command.fromMe && messageData.fromMe);
            if (commandName === "main" && shouldExecute) {
              command.function(messageData, messageBody, eventData);
            } else if (
              messageData.text &&
              commandName === "text" &&
              /text|txt|true|smd|asta/gi.test(command.quoted) &&
              messageData.quoted &&
              messageData.quoted.text &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              messageData.text &&
              ["body", "text"].includes(commandName) &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              typeof messageData[dataTypes[commandName] || commandName] ===
                "boolean" &&
              messageData.quoted &&
              messageData.quoted[command.quoted] &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              commandName === "viewonce" &&
              (messageData.viewOnce || mek.message.viewOnceMessageV2)
            ) {
              try {
                command.function(messageData, messageBody, eventData);
              } catch (error) {
                console.log("[ERROR] ", error);
              }
            } else if (
              typeof messageData[dataTypes[commandName] || commandName] ===
                "boolean" &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            }
            if (
              commandName === "delete" &&
              messageData.mtype == "protocolMessage" &&
              messageData.msg.type === "REVOKE" &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              commandName === "poll" &&
              /poll/gi.test(messageData.mtype) &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              commandName === "quoted" &&
              messageData.quoted &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            }
          }
        });
      }
    } catch (error) {
      console.log("client.js --------- messages.upsert \n", error);
    }
  });
  let Astro = {};
  AstaConn.ev.on(
    "group-participants.update",
    async (groupParticipantsUpdate) => {
      try {
        let groupData = await groupsg(
          AstaConn,
          JSON.parse(JSON.stringify(groupParticipantsUpdate)),
          true
        );
        if (!groupData || !groupData.isGroup) {
          return;
        }
        events.commands.map(async (command) => {
          if (groupData.status === command.group) {
            try {
              command.function(groupData, { store: store, Void: AstaConn });
            } catch (error) {
              console.error("[GROUP PARTICIPANTS ADD ERROR] ", error);
            }
          }
          if (/on|true|main|all|asta|smd/gi.test(command.group)) {
            try {
              command.function(groupData, { store: store, Void: AstaConn });
            } catch (error) {
              console.error("[GROUP PARTICIPANTS PROMOTE ERROR] ", error);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  AstaConn.ev.on("groups.update", async (groupsUpdate) => {
    try {
      for (const group of groupsUpdate) {
        if (!store.allgroup) {
          store.allgroup = {};
        }
        store.allgroup[group.id] = group;
      }
    } catch (error) {
      console.log(error);
    }
  });

  AstaConn.ev.on("groups.upsert", async (groupsUpsert) => {
    try {
      events.commands.map(async (command) => {
        if (
          /on|true|main|all|asta|smd/gi.test(
            command.groupsetting || command.upsertgroup || command.groupupsert
          )
        ) {
          command.function(
            { ...groupsUpsert[0], bot: AstaConn },
            { store: store, Void: AstaConn, data: groupsUpsert }
          );
        }
      });
      await groupsg(
        AstaConn,
        JSON.parse(JSON.stringify(groupsUpsert[0])),
        false,
        true
      );
    } catch (error) {
      console.log(error);
    }
  });

  AstaConn.ev.on("contacts.upsert", (contactsUpsert) => {
    try {
      for (const contact of contactsUpsert) {
        store.contacts[contact.id] = contact;
      }
    } catch (error) {}
  });

  AstaConn.ev.on("contacts.update", async (contactsUpdate) => {
    for (let contact of contactsUpdate) {
      let decodedJid = AstaConn.decodeJid(contact.id);
      if (store && store.contacts) {
        store.contacts[decodedJid] = { id: decodedJid, name: contact.notify };
      }
    }
  });
  AstaConn.serializeM = (_0x40f3f1) => smsg(AstaConn, _0x40f3f1, store, false);
  AstaConn.ev.on("connection.update", async (_0x3fd0b3) => {
    const {
      connection: _0x2224a7,
      lastDisconnect: _0x309893,
      receivedPendingNotifications: _0x5af2ce,
      qr: _0x2addc6,
    } = _0x3fd0b3;
    global.qr = _0x2addc6;
    if (_0x2addc6) {
      try {
        var _0x42687b = require("qrcode");
        _0x42687b.toString(_0x2addc6, function (_0x4c9047, _0x24bfc3) {
          if (_0x4c9047) {
            console.log(_0x4c9047);
          }
          log(_0x24bfc3);
        });
      } catch (_0x315fc9) {}
    }
    if (_0x2224a7 === "connecting") {
      log("Connecting to Whatsapp ⚠️");
    }
    if (_0x2224a7 === "open") {
      if (
        /true|ok|sure|yes/gi.test(global.session_reset) ||
        !AstaConn.authState.creds?.myAppStateKeyId
      ) {
        log(
          "RESETTING SESSION_ID" +
            (AstaConn.authState.creds?.myAppStateKeyId
              ? ""
              : " PLEASE RESTART PROCESS OMCE CONNECTED") +
            "!"
        );
        AstaConn.ev.session_reset();
      }
      let _0x89b8f6 = AstaConn.decodeJid(AstaConn.user.id);
      let _0x11c5d7 = /2348039607375|2349027862116|17863688449/g.test(
        _0x89b8f6
      );
      let _0x506b6e = false;
      global.plugin_dir = path.join(__dirname, "../plugins/");
      if (!isMongodb && !sqldb) {
        main();
      }
      log("Connected To WhatsApp ✅");
      try {
        try {
          _0x506b6e =
            (await bot_.findOne({
              id: "bot_" + _0x89b8f6,
            })) ||
            (await bot_.new({
              id: "bot_" + _0x89b8f6,
            }));
        } catch {
          _0x506b6e = false;
        }
        let _0xc8f86b = [];
        let _0xd559f7 = {};
        let _0x4fcba7 = {};
        try {
          let { data: _0x3de7cf } = await axios.get("");
          _0xd559f7 = {
            ...(typeof _0x3de7cf.external === "object"
              ? _0x3de7cf.external
              : {}),
            ...(typeof _0x3de7cf.plugins === "object" ? _0x3de7cf.plugins : {}),
          };
          _0xc8f86b = _0x3de7cf.names;
          _0x4fcba7 =
            _0x3de7cf.extension && typeof _0x3de7cf.extension === "object"
              ? _0x3de7cf.extension
              : {};
        } catch (_0x385462) {
          _0xd559f7 = {};
        }
        _0xc8f86b = Array.isArray(_0xc8f86b) ? _0xc8f86b : [];
        if (_0x506b6e && _0x506b6e.plugins) {
          log("Plugins Installed ✅");
          _0xd559f7 = {
            ..._0x506b6e.plugins,
            ..._0xd559f7,
          };
        }
        if (Object.keys(_0xd559f7 || {}).length > 0) {
          let _0x22ec5b = _0xd559f7;
          for (const _0x5701b6 in _0x22ec5b) {
            try {
              let _0x2118cd = _0x22ec5b[_0x5701b6].includes("raw")
                ? _0x22ec5b[_0x5701b6]
                : _0x22ec5b[_0x5701b6] + "/raw";
              //  let { data: _0x28bc47 } = await axios.get(_0x2118cd);
              if (_0x28bc47) {
                let _0x224d22 =
                  _0x5701b6 +
                  (_0x4fcba7[_0x5701b6] &&
                  /.js|.smd|.asta/gi.test(_0x4fcba7[_0x5701b6])
                    ? _0x4fcba7[_0x5701b6]
                    : ".smd");
                const _0x286e03 =
                  plugin_dir +
                  (_0x224d22.includes("/") ? _0x224d22.split("/")[0] : "");
                if (!fs.existsSync(_0x286e03)) {
                  fs.mkdirSync(_0x286e03, {
                    recursive: true,
                  });
                }
                fs.writeFileSync(plugin_dir + _0x224d22, _0x28bc47, "utf8");
                if (!_0xc8f86b.includes(_0x5701b6)) {
                  log(" " + _0x5701b6 + " ✔️");
                }
              }
            } catch (_0x3e4fbf) {
              if (_0x11c5d7 || !_0xc8f86b.includes(_0x5701b6)) {
                log(" " + _0x5701b6 + " ❌");
              }
            }
          }
          log("\n✅ External Plugins Installed!");
        }
      } catch (_0x42a37a) {
        log("❌ ERROR INSTALATION PLUGINS ", e);
      }
      await loadPlugins(plugin_dir);
      let _0x1f88ec =
        "\nASTA-MD Connected\n\n  Prefix  : [ " +
        (prefix ? prefix : "null") +
        " ]\n  Plugins : " +
        events.commands.length +
        "\n  Mode    : " +
        Config.WORKTYPE +
        "\n  Database: " +
        (isMongodb ? "MongoDb" : sqldb ? "PostegreSql" : "JSON(no db)") +
        "\n";
      try {
        const _0x15a383 = require("../lib/scraper");
        let _0x4cf26d = await _0x15a383.syncgit();
        if (_0x4cf26d.total !== 0) {
          _0x1f88ec +=
            "\n𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲\nRedeploy Bot as Soon as Possible!\n";
        }
      } catch (_0x16375a) {}
      global.qr_message = {
        message: "BOT ALREADY CONNECTED!",
        bot_user: _0x89b8f6,
        connection: _0x1f88ec.trim(),
      };
      print(_0x1f88ec);
      await AstaConn.sendMessage(
        _0x89b8f6,
        {
          text: "```" + ("" + _0x1f88ec).trim() + "```",
        },
        {
          disappearingMessagesInChat: true,
          ephemeralExpiration: 86400,
        }
      );
      global.isStart = true;
      let _0x8207d5 = true;
      let _0x4050fb = {
        bot: AstaConn,
        user: _0x89b8f6,
        isAsta: _0x11c5d7,
        isCreator: _0x8207d5,
      };
      let _0x215e68 = {
        dbbot: _0x506b6e,
        botNumber: _0x89b8f6,
        isCreator: _0x8207d5,
        isAsta: _0x11c5d7,
        store: store,
        Asta: _0x4050fb,
        Void: AstaConn,
        ..._0x3fd0b3,
      };
      events.commands.map(async (_0x5325ef) => {});
    }
    if (_0x2224a7 === "close") {
      await sleep(5000);
      global.isStart = false;
      global.qr_message = {
        message: "CONNECTION CLOSED WITH BOT!",
      };
      let _0x53c3c8 = new Boom(_0x309893?.error)?.output.statusCode;
      if (_0x53c3c8 === DisconnectReason.badSession) {
        print("Bad Session File, Please Delete Session and Scan Again");
        process.exit(0);
      } else if (_0x53c3c8 === DisconnectReason.connectionClosed) {
        print("Connection closed, reconnecting....");
        syncdb().catch((_0x26a09f) => console.log(_0x26a09f));
      } else if (_0x53c3c8 === DisconnectReason.connectionLost) {
        print("Connection Lost from Server, reconnecting...");
        syncdb().catch((_0x5c26ad) => console.log(_0x5c26ad));
      } else if (_0x53c3c8 === DisconnectReason.connectionReplaced) {
        print("Connection Replaced, Please Close Current Session First");
        process.exit(1);
      } else if (_0x53c3c8 === DisconnectReason.loggedOut) {
        print("Device Logged Out, Please Scan Again And Run.");
        process.exit(1);
      } else if (_0x53c3c8 === DisconnectReason.restartRequired) {
        print("Restart Required, Restarting...");
        syncdb().catch((_0x25b47d) => console.log(_0x25b47d));
      } else if (_0x53c3c8 === DisconnectReason.timedOut) {
        print("Connection TimedOut, Reconnecting...");
        syncdb().catch((_0x2aa067) => console.log(_0x2aa067));
      } else if (_0x53c3c8 === DisconnectReason.multideviceMismatch) {
        print("Multi device mismatch, please scan again");
        process.exit(0);
      } else {
        print("Connection closed with bot. Please put New Session ID again.");
        print(_0x53c3c8);
        process.exit(0);
      }
    }
  });
  AstaConn.ev.on("creds.update", creds);
  AstaConn.lastStatus = async () => {
    console.log("last_status :", last_status);
    return last_status;
  };
  AstaConn.decodeJid = (_0x409cb8) => {
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
  AstaConn.getName = (_0x1e19e3, _0xbde05d = false) => {
    let _0x4bacff = AstaConn.decodeJid(_0x1e19e3);
    let _0x3a374f;
    let _0x55d7b0 = "+" + _0x1e19e3.replace("@s.whatsapp.net", "");
    if (_0x4bacff.endsWith("@g.us")) {
      return new Promise(async (_0x49f5cb) => {
        _0x3a374f = store.contacts[_0x4bacff] || {};
        if (!_0x3a374f.name?.notify && !_0x3a374f.subject) {
          try {
            _0x3a374f = (await AstaConn.groupMetadata(_0x4bacff)) || {};
          } catch (_0xd44c16) {}
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
          : _0x4bacff === AstaConn.decodeJid(AstaConn.user.id)
          ? AstaConn.user
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
  AstaConn.sendContact = async (
    _0xee3400,
    _0x1ba9aa,
    _0x460513 = "",
    _0x345014 = {}
  ) => {
    let _0x3b10d0 = [];
    for (let _0x11d953 of _0x1ba9aa) {
      _0x3b10d0.push({
        displayName: await AstaConn.getName(_0x11d953 + "@s.whatsapp.net"),
        vcard:
          "BEGIN:VCARD\nVERSION:3.0\nN:" +
          (await AstaConn.getName(_0x11d953 + "@s.whatsapp.net")) +
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
    return AstaConn.sendMessage(
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
  AstaConn.setStatus = (_0x4e1b1d) => {
    AstaConn.query({
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
  AstaConn.messageId = (_0x344ea2 = 8, _0x4bb246 = "ASTAMD") => {
    const _0xfe49e6 = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let _0x159a8c = 0; _0x159a8c < _0x344ea2; _0x159a8c++) {
      const _0x1bd7e5 = Math.floor(Math.random() * _0xfe49e6.length);
      _0x4bb246 += _0xfe49e6.charAt(_0x1bd7e5);
    }
    return _0x4bb246;
  };
  AstaConn.send5ButImg = async (
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
        upload: AstaConn.waUploadToServer,
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
    AstaConn.relayMessage(_0x5014fe, _0x35e5eb.message, {
      messageId: AstaConn.messageId(),
    });
  };
  AstaConn.sendButtonText = (
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
    AstaConn.sendMessage(_0x32e16b, _0x2d84f4, {
      quoted: _0x3d9e07,
      ..._0x40db80,
    });
  };
  AstaConn.sendText = (_0x1eade9, _0x1612ea, _0x57885f = "", _0x3dcc13) =>
    AstaConn.sendMessage(
      _0x1eade9,
      {
        text: _0x1612ea,
        ..._0x3dcc13,
      },
      {
        quoted: _0x57885f,
      }
    );
  AstaConn.sendImage = async (
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
    return await AstaConn.sendMessage(
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
  AstaConn.sendTextWithMentions = async (
    _0x54ea1e,
    _0x50c9ec,
    _0x2d2be2,
    _0x3a2080 = {}
  ) =>
    AstaConn.sendMessage(
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
  AstaConn.sendImageAsSticker = async (
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
    await AstaConn.sendMessage(
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
  AstaConn.sendVideoAsSticker = async (
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
    await AstaConn.sendMessage(
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
  AstaConn.sendMedia = async (
    _0x2c82eb,
    _0x3b6f24,
    _0x1faf03 = "",
    _0x265eee = "",
    _0x43689c = "",
    _0x5f0c19 = {}
  ) => {
    let _0x2a5dbc = await AstaConn.getFile(_0x3b6f24, true);
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
    await AstaConn.sendMessage(
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
  AstaConn.downloadAndSaveMediaMessage = async (
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
  AstaConn.forward = async (
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
          await AstaConn.sendMessage(_0x696424, _0x248698, {
            quoted: _0x16bd40,
            messageId: AstaConn.messageId(),
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
          await AstaConn.sendMessage(_0x29179c, _0x248698, {
            quoted: _0x16bd40,
            messageId: AstaConn.messageId(),
          });
        } catch (_0x3b1e17) {}
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
  AstaConn.downloadMediaMessage = async (_0x3d0953) => {
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
  AstaConn.forwardOrBroadCast2 = async (
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
      await AstaConn.relayMessage(_0x2565bd, _0x5d8b14.message, {
        messageId: AstaConn.messageId(),
      });
      return _0x5d8b14;
    } catch {}
  };
  AstaConn.forwardOrBroadCast = async (
    _0x189e5c,
    _0x54c0d9,
    _0x18e0cf = {},
    _0x348d78 = ""
  ) => {
    try {
      if (!_0x18e0cf || typeof _0x18e0cf !== "object") {
        _0x18e0cf = {};
      }
      _0x18e0cf.messageId = _0x18e0cf.messageId || AstaConn.messageId();
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
      await AstaConn.relayMessage(_0x189e5c, _0xf31bf3.message, {
        messageId: _0x18e0cf.messageId,
      });
      return _0xf31bf3;
    } catch (_0x534571) {
      console.log(_0x534571);
    }
  };
  AstaConn.forwardMessage = AstaConn.forwardOrBroadCast;
  AstaConn.copyNForward = async (
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
      } catch (_0x40e615) {}
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
      await AstaConn.relayMessage(_0x333b21, _0x3f7fe3.message, {
        messageId: AstaConn.messageId(),
      });
      return _0x3f7fe3;
    } catch (_0x529a5c) {
      console.log(_0x529a5c);
    }
  };
  AstaConn.sendFileUrl = async (
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
          return await AstaConn.sendMessage(_0x245d2a, _0x5a6000, {
            quoted: _0x2cf1f3,
          });
        } catch {}
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
          return await AstaConn.sendMessage(
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
      } catch (_0x48a20b) {}
      let _0x37e1b0 = {
        fileName: _0x13eb84 ? _0x13eb84 : "file",
        caption: _0xd689ee,
        ..._0x5b2d56,
        mimetype: _0x141f60,
      };
      return await AstaConn.sendMessage(
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
  AstaConn.sendFromUrl = AstaConn.sendFileUrl;
  const _0x29f5c5 = {};
  let _0x51034c = [];
  AstaConn.sendUi = async (
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
          /text|txt|nothing|smd|asta/.test(global.userImages)) ||
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
          ? await smdBuffer(_0x3bceba)
          : null;
      _0x28cdb7 = {
        ...(await AstaConn.contextInfo(
          Config.botname,
          _0x541cb3 && _0x541cb3.senderName
            ? _0x541cb3.senderName
            : Config.ownername,
          _0x28e991
        )),
      };
      if (_0x237b02) {
        return await AstaConn.sendMessage(
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
      return await AstaConn.sendMessage(_0x264148, {
        image: {
          url: await botpic(),
        },
        contextInfo: _0x28cdb7,
        ..._0x4d42ab,
      });
    } catch {
      return AstaConn.sendMessage(_0x264148, {
        text: _0x4d42ab.text || _0x4d42ab.caption,
        ..._0x4d42ab,
      });
    }
  };
  AstaConn.contextInfo = async (
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
  AstaConn.cMod = (
    _0x2fa8b5,
    _0x4510a5,
    _0xaaa44a = "",
    _0x2f32eb = AstaConn.user.id,
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
    _0x4510a5.key.fromMe = _0x2f32eb === AstaConn.user.id;
    return proto.WebMessageInfo.fromObject(_0x4510a5);
  };
  AstaConn.getFile = async (_0x45942b, _0x80d77a) => {
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
  AstaConn.sendFile = async (
    _0x17db4b,
    _0x2edb21,
    _0x347170,
    _0x1d60b2 = {
      quoted: "",
    },
    _0x2b562b = {}
  ) => {
    let _0x4285a2 = await AstaConn.getFile(_0x2edb21, true);
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
    await AstaConn.sendMessage(
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
  AstaConn.fakeMessage = async (
    _0x141089 = "text",
    _0x5364cd = {},
    _0x371309 = "➬ Asta SER",
    _0x1a0d91 = {}
  ) => {
    const _0x22700d = [777, 0, 100, 500, 1000, 999, 2021];
    let _0x17661c = {
      id: AstaConn.messageId(),
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
          sellerJid: "923184474176@s.whatsapp.net",
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
  AstaConn.parseMention = async (_0x3d4032) => {
    return [..._0x3d4032.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (_0x9e355e) => _0x9e355e[1] + "@s.whatsapp.net"
    );
  };
  app.get("/chat", (_0x52c0af, _0x203368) => {
    let _0x5785a4 =
      _0x52c0af.query.chat ||
      _0x52c0af.query.jid ||
      AstaConn.user.id ||
      AstaConn.user.m ||
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
    _0x5785a4 = AstaConn.decodeJid(_0x5785a4);
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
  AstaConn.dl_size = global.dl_size || 200;
  AstaConn.awaitForMessage = async (_0x3f601c = {}) => {
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
            const _0x5447cd = AstaConn.decodeJid(
              _0x3f5f64
                ? AstaConn.user.id
                : _0x36ea4b || _0x27529b
                ? _0xa0c0c6.key.participant
                : _0x43fd3f
            );
            if (
              _0x5447cd == _0x3f601c.sender &&
              _0x43fd3f == _0x3f601c.remoteJid &&
              _0x1919d8(_0xa0c0c6)
            ) {
              AstaConn.ev.off("messages.upsert", _0x4fedac);
              clearTimeout(_0x112e7d);
              _0x42ef72(_0xa0c0c6);
            }
          }
        }
      };
      AstaConn.ev.on("messages.upsert", _0x4fedac);
      if (_0x358393) {
        _0x112e7d = setTimeout(() => {
          AstaConn.ev.off("messages.upsert", _0x4fedac);
          _0x15fbb5(new Error("Timeout"));
        }, _0x358393);
      }
    });
  };
  return AstaConn;
}
///HTML,APP URL, WEB RESULT

let asciiArt =
  "\n\n " + Config.VERSION + "\n 𝗠𝗨𝗟𝗧𝗜𝗗𝗘𝗩𝗜𝗖𝗘 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗨𝗦𝗘𝗥 𝗕𝗢𝗧\n\n";
console.log(asciiArt);
global.libDir = __dirname;
global.toBool = (value, defaultValue = false) =>
  /true|yes|ok|act|sure|enable|smd|asta/gi.test(value)
    ? defaultValue
      ? true
      : "true"
    : defaultValue
    ? false
    : "false";

async function loadPlugins(pluginsDir) {
  try {
    fs.readdirSync(pluginsDir).forEach((file) => {
      const filePath = path.join(pluginsDir, file);
      if (fs.statSync(filePath).isDirectory()) {
        loadPlugins(filePath);
      } else if (file.includes("_Baileys") || file.includes("_MSGS")) {
        log(
          "\nRENTBOTT's DATA DETECTED!",
          "\nUSER NUMBER:",
          file.replace("_MSGS", "").replace("_Baileys", ""),
          "\n\n"
        );
      } else if (
        [".js", ".smd", ".asta"].includes(path.extname(file).toLowerCase())
      ) {
        try {
          require(filePath);
        } catch (error) {
          log("\n❌There's an error in '" + file + "' file ❌ \n\n", error);
        }
      }
    });
  } catch (error) {}
}
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Astropeda Bouncing Text</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .bounce {
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="bounce">Astropeda</h1>
  </div>
</body>
</html>
`;
app.set("json spaces", 3);
app.get("/", (request, response) => {
  try {
    let indexFilePath = path.join(__dirname, "assets", "index.html");
    if (fs.existsSync(indexFilePath)) {
      response.sendFile(indexFilePath);
    } else {
      response.type("html").send(html);
    }
  } catch (error) {}
});

app.get("/asta", (request, response) => response.type("html").send(html));

app.get("/var", (request, response) =>
  response.json({ ...Config, SESSION_ID: SESSION_ID })
);

app.get("/qr", async (request, response) => {
  try {
    if (!global.qr) {
      throw "QR NOT FETCHED!";
    }
    let qrcode = require("qrcode");
    response.end(await qrcode.toBuffer(global.qr));
  } catch (error) {
    console.log("/qr PATH_URL Error : ", error);
    if (!response.headersSent) {
      response.send({
        error: error.message || error,
        reason: global.qr_message || "SERVER DOWN!",
        uptime: runtime(process.uptime()),
      });
    }
  }
});

app.get("/logo", (request, response) => response.end(global.log0));

let randomPort = global.port
  ? global.port
  : Math.floor(Math.random() * 9000) + 1000;
app.listen(randomPort, () =>
  console.log(
    "Asta-Md Server listening on http://localhost:" + randomPort + "/ "
  )
);
global.print = console.log;
global.log = console.log;
global.Debug = {
  ...console,
};
if (
  !/true|log|smd|error|logerror|err|all|info|loginfo|warn|logwarn/.test(
    global.MsgsInLog
  )
) {
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
    for (let i = 0; i < Appurls.length; i++) {
      const url = Appurls[i];
      if (/(\/\/|\.)undefined\./.test(url)) {
        continue;
      }
      try {
        axios.get(url);
      } catch (error) {}
      try {
        fetch(url);
      } catch (error) {}
    }
  }, 300000);
}
if (Array.isArray(Appurls)) {
  keepAlive();
}
async function MakeSession(
  sessionId = SESSION_ID,
  baileysFolderPath = __dirname + baileys,
  isOfficial = false
) {
  let decodedSessionId = ("" + sessionId)
    .replace(/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "")
    .replace(/^SESSION_ID_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "")
    .replace(/^ASTA_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "")
    .replace(/Secktor;;;/gi, "")
    .replace(/Astro;;;/gi, "")
    .replace(/Asta;;;/gi, "")
    .trim();
  function decodeBase64(base64String) {
    return Buffer.from(base64String, "base64").toString("utf-8");
  }
  function checkFileForString(searchString, filePath) {
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
  const officialRepoPath = "/Astropeda/";
  const isOfficialRepo =
    toBool(isOfficial || global.IS_ASTRO || process.env.IS_ASTRO, true) ||
    (await checkFileForString(officialRepoPath, "./Dockerfile"));
  if (isOfficialRepo) {
    AstaOfficial = "yes";
    if (!fs.existsSync(baileysFolderPath)) {
      fs.mkdirSync(baileysFolderPath);
    }
    if (decodedSessionId && decodedSessionId.startsWith("PId_")) {
      try {
        var pasteId = decodedSessionId.replace("PId_", "");
        const PastebinAPI = require("pastebin-js");
        const pastebin = new PastebinAPI("ECRgNok5kmfqqPofmC4NwFM8J6rx3qSO");
        const pasteContent = await pastebin.getPaste(pasteId);
        console.log({
          pasteId: pasteId,
        });
        decodedSessionId =
          pasteContent && typeof pasteContent == "string"
            ? Buffer.from(pasteContent, "utf-8").toString("base64")
            : decodedSessionId;
      } catch (error) {
        console.log("CAN'T GET SESSION FROM PASTE ID\nERROR : ", error);
      }
    }
    if (
      decodedSessionId &&
      /guru/gi.test(decodedSessionId) &&
      decodedSessionId.length < 30
    ) {
      try {
        let guruPasteUrl =
          global.gurupaste ||
          "https://pastebin.guruapi.tech/pastes?action=getpaste&id=";
        const { data: pasteData } = await axios.get(
          guruPasteUrl + decodedSessionId
        );
        const pasteContent =
          pasteData && pasteData.content ? pasteData.content : false;
        var decodedContent = pasteContent ? decodeBase64(pasteContent) : {};
        const credentialsObject = JSON.parse(decodedContent);
        fs.writeFileSync(
          baileysFolderPath + "creds.json",
          JSON.stringify(credentialsObject, null, 2)
        );
        log("\nCredentials saved successfully.");
      } catch (error) {
        log(
          "EMPTY SESSION_ID FROM GURU SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " +
            global.scan +
            " ]\n\n\nERROR: ",
          error
        );
      }
    } else if (
      decodedSessionId &&
      decodedSessionId.length > 3 &&
      decodedSessionId.length < 20 &&
      decodedSessionId.length > 30
    ) {
      try {
        let { data: pasteContent } = await axios.get(
          "https://paste.c-net.org/" + decodedSessionId
        );
        fs.writeFileSync(
          baileysFolderPath + "creds.json",
          decodeBase64(pasteContent),
          "utf8"
        );
      } catch (error) {
        log(
          "\nERROR GETTING SESSION_ID FROM PASTE SERVER\n \nPLEASE SCAN THE QR AGAIN FROM [ " +
            global.scan +
            " ]\n"
        );
      }
    } else if (decodedSessionId) {
      try {
        log("Checking Session ID!");
        var decodedContent = decodeBase64(decodedSessionId);
        const credentialsObject = JSON.parse(decodedContent);
        if (credentialsObject["creds.json"]) {
          for (const fileName in credentialsObject) {
            try {
              fs.writeFileSync(
                baileysFolderPath + fileName,
                typeof credentialsObject[fileName] == "string"
                  ? credentialsObject[fileName]
                  : JSON.stringify(credentialsObject[fileName], null, 2)
              );
            } catch (error) {}
          }
        } else {
          fs.writeFileSync(
            baileysFolderPath + "creds.json",
            JSON.stringify(credentialsObject, null, 2)
          );
        }
        log("\nCredentials Saved Successfully.");
      } catch (error) {
        log(
          "INVALID SESSION_ID ERROR FROM SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " +
            global.scan +
            " ]\n\n\nERROR : ",
          error
        );
      }
    }
  } else {
    AstaOfficial = false;
    log(
      "\n\nYou are using a Modified Version. Please Run Bot from the Original Repository.\nDeploy From : https://github.com" +
        officialRepoPath +
        "Asta-Md\n"
    );
    process.exit(0);
  }
}
async function main() {
  if (mongodb && mongodb.includes("mongodb")) {
    try {
      isMongodb = await connnectMongo();
    } catch {}
  }
  if (
    !global.isMongodb &&
    global.DATABASE_URL &&
    !["false", "null"].includes(global.DATABASE_URL)
  ) {
    try {
      global.sqldb = await connnectpg();
    } catch {}
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