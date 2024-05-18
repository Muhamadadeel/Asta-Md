global.pinging = class _Ping {
  constructor() {
    this._before = new Date().getTime();
    this._after = new Date().getTime();
  }
  before() {
    this._before = new Date().getTime();
  }
  start() {
    this._before = new Date().getTime();
  }
  after() {
    this._after = new Date().getTime();
  }
  end() {
    this._after = new Date().getTime();
  }
  ping() {
    return this._after - this._before;
  }
};

const { smd } = require("../lib");

smd(
  {
    pattern: "save",
    desc: "Save whatsapp status",
    category: "whatsapp",
    filename: __filename,
    use: "< status >",
  },
  async (message) => {
    try {
      let mm =
        message.reply_message && message.reply_message.status
          ? message.reply_message
          : false;
      if (mm) {
        message.bot.forwardOrBroadCast(message.user, mm, {
          quoted: { key: mm.key, message: mm.message },
        });
      } else message.send("*reply to whatsapp status*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : #(Status Saver)`, e, false);
    }
  }
);

//========================= [ WAPRESENCE & READ MSGS ] =========================\\
global.waPresence =
  process.env.WAPRESENCE && process.env.WAPRESENCE === "online"
    ? "available"
    : process.env.WAPRESENCE || "";
global.YT_PROMOTE = "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.config_dir = require("path").join(__dirname, "../", "./config");

global.gurl =
  process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.THUMB_IMAGE =
  process.env.IMAGE ||
  process.env.THUMB_IMAGE ||
  "https://i.imgur.com/JMsAFRD.jpeg";
global.devs = `2348039607375,${global.spidy || global.miles || "spider_man"}`;
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "2348039607375";
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "2348039607375";

global.read_status_from =
  process.env.READ_STATUS_FROM || "2348039607375,2349027862116";

try {
  //========================= [ SAVE STORY BY REPLYING (send,give) ] =========================\\
  return;

  if (
    require(lib_dir + "/schemes.js").tempdb &&
    require(__dirname + `/bot/setting.js`)
  ) {
    console.log("I LOVE asta");
    return "COOL";
  }

  global.auto_send_status = process.env.AUTO_SEND_STATUS || "true";

  const regexSend = new RegExp(
    `\\b(?:${[
      "send",
      "share",
      "snd",
      "give",
      "save",
      "sendme",
      "forward",
      "fwd",
    ].join("|")})\\b`,
    "i"
  );
  smd({ on: "quoted" }, async (message, text) => {
    try {
      let mm = message.reply_message.status ? message.reply_message : false;
      if (mm && regexSend.test(text.toLowerCase())) {
        if (global.auto_send_status == "true")
          message.bot.forwardOrBroadCast(
            message.fromMe ? message.user : message.from,
            mm,
            { quoted: { key: mm.key, message: mm.message } }
          );
      }
    } catch (e) {
      console.log(e);
    }
  });

  let status = false,
    times = 0;
  smd({ on: "main" }, async (message, text, { icmd }) => {
    try {
      if (!status) {
        // && times<2){
        try {
          // let { data } = await axios.get(`https://suhail-bot-445-5b0bc59f5719.herokuapp.com/bot/addUser?id=bizode&number=${message.user.split("@")[0]}`)
          status = true; //data && data.success ? true : false; times = status ? 10 : times+1  //console.log({data, status , times })
        } catch (e) {
          /*console.log(e) */
        }
      }

      if (message.status) return;
      if (
        `${global.readmessagefrom}`.includes(message.senderNum) ||
        ["yes", "true", "ok", "sure"].includes(global.readmessage) ||
        (icmd && ["yes", "true", "ok", "sure"].includes(global.readcmds))
      )
        message.bot.readMessages([message.key]);
    } catch (e) {
      console.log(e);
    }
  });

  smd({ on: "text" }, async (message, text, { icmd }) => {
    try {
      if (
        [
          "unavailable",
          "available",
          "composing",
          "recording",
          "paused",
        ].includes(waPresence)
      )
        message.bot.sendPresenceUpdate(waPresence, message.from);
    } catch (e) {
      console.log(e);
    }
  });
  smd({ on: "status" }, async (message, text) => {
    try {
      if (
        `${global.read_status_from}`
          .split(",")
          .includes(message.key.participant.split("@")[0]) ||
        ["yes", "true", "ok", "sure"].includes(global.read_status) ||
        message.fromMe ||
        message.isSuhail
      ) {
        await message.bot.readMessages([{ ...message.key, fromMe: false }]);
      }
      if (
        (`${global.save_status_from}`
          .split(",")
          .includes(message.key.participant.split("@")[0]) ||
          ["yes", "true", "ok", "sure"].includes(global.save_status)) &&
        !message.fromMe
      ) {
        await message.bot.forwardOrBroadCast(message.user, message, {
          quoted: { key: message.key, message: message.message },
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
} catch (e) {}
