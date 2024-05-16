const { proto, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const { unlink } = require("fs").promises;
const axios = require("axios");
const { writeExifWebp } = require("./exif");
const moment = require("moment-timezone");
const { sizeFormatter } = require("human-readable");
const Config = require("../config");
const util = require("util");
const child_process = require("child_process");
const unixTimestampSeconds = (_0xcd7700 = new Date()) =>
  Math.floor(_0xcd7700.getTime() / 1000);
exports.unixTimestampSeconds = unixTimestampSeconds;
// Function to pause execution for a given amount of time
const sleep = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
exports.sleep = sleep;
exports.delay = sleep;

// Function to check if a string is a URL
const isUrl = (string) => {
  return string.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      "gi"
    )
  );
};
exports.isUrl = isUrl;

// Function to generate a message tag
exports.generateMessageTag = (label) => {
  let messageTag = exports.unixTimestampSeconds().toString();
  if (label) {
    messageTag += ".--" + label;
  }
  return messageTag;
};

// Function to calculate the time difference between two timestamps
exports.processTime = (startTime, endTime) => {
  return moment.duration(endTime - moment(startTime * 1000)).asSeconds();
};

// Function to get a buffer from a URL, file path, or string
const getBuffer = async (input, options = {}, method = "get") => {
  try {
    if (Buffer.isBuffer(input)) {
      return input;
    } else if (/http/gi.test(input)) {
      const response = await axios({
        method: method,
        url: input,
        headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
        ...options,
        responseType: "arraybuffer",
      });
      return response.data;
    } else if (fs.existsSync(input)) {
      return fs.readFileSync(input);
    } else {
      return input;
    }
  } catch (error) {
    console.log("error while getting data in buffer : ", error);
    return false;
  }
};
exports.getBuffer = getBuffer;
exports.smdBuffer = getBuffer;
// Function to fetch JSON data from a URL
const fetchJson = async (url, options = {}, method = "GET") => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ...options,
    });
    return response.data;
  } catch (error) {
    console.log("error while fetching data in json \n ", error);
    return false;
  }
};
exports.fetchJson = fetchJson;
exports.smdJson = fetchJson;

// Function to format time duration
exports.runtime = function (
  seconds,
  daysLabel = " d",
  hoursLabel = " h",
  minutesLabel = " m",
  secondsLabel = " s"
) {
  seconds = Number(seconds);
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor((seconds % 86400) / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var secs = Math.floor(seconds % 60);
  var daysPart = days > 0 ? days + daysLabel + ", " : "";
  var hoursPart = hours > 0 ? hours + hoursLabel + ", " : "";
  var minutesPart = minutes > 0 ? minutes + minutesLabel + ", " : "";
  var secondsPart = secs > 0 ? secs + secondsLabel : "";
  return daysPart + hoursPart + minutesPart + secondsPart;
};

// Function to format a timestamp into a clock string
exports.clockString = function (seconds) {
  let hours = isNaN(seconds) ? "--" : Math.floor((seconds % 86400) / 3600);
  let minutes = isNaN(seconds) ? "--" : Math.floor((seconds % 3600) / 60);
  let secs = isNaN(seconds) ? "--" : Math.floor(seconds % 60);
  return [hours, minutes, secs]
    .map((v) => v.toString().padStart(2, 0))
    .join(":");
};

// Function to get the current time based on a timezone
const getTime = (format, unixTimestamp) => {
  const timezone = global.timezone || "Asia/Karachi";
  if (unixTimestamp) {
    return moment.tz(unixTimestamp, timezone).format(format);
  } else {
    return moment.tz(timezone).format(format);
  }
};
exports.getTime = getTime;

// Function to format a date
exports.formatDate = (dateString, locale = "id") => {
  let date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

// Function to format file size
exports.formatp = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (value, unitName) => `${value} ${unitName}B`,
});

// Function to format JSON data
exports.jsonformat = (json) => {
  return JSON.stringify(json, null, 2);
};

// Function to format strings with placeholders
const format = (...args) => {
  return util.format(...args);
};
exports.format = format;
// Function to perform a logic operation
exports.logic = (input, inputArray, outputArray) => {
  if (inputArray.length !== outputArray.length) {
    throw new Error("Input and Output must have the same length");
  }
  for (let i in inputArray) {
    if (util.isDeepStrictEqual(input, inputArray[i])) {
      return outputArray[i];
    }
  }
  return null;
};

// Function to generate a profile picture from an image buffer
exports.generateProfilePicture = async (imageBuffer) => {
  const image = await jimp.read(imageBuffer);
  const width = image.getWidth();
  const height = image.getHeight();
  const croppedImage = image.crop(0, 0, width, height);
  return {
    img: await croppedImage.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
    preview: await croppedImage
      .scaleToFit(720, 720)
      .getBufferAsync(jimp.MIME_JPEG),
  };
};

// Function to convert bytes to a human-readable file size
exports.bytesToSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// Function to get the size of a media file
exports.getSizeMedia = (mediaUrl) => {
  try {
    if (!mediaUrl) {
      return 0;
    }
    if (
      typeof mediaUrl === "string" &&
      (mediaUrl.startsWith("http") || mediaUrl.startsWith("Http"))
    ) {
      try {
        let response = axios.get(mediaUrl);
        let size = parseInt(response.headers["content-length"]);
        let formattedSize = exports.bytesToSize(size, 3);
        if (!isNaN(size)) {
          return formattedSize;
        }
      } catch (error) {
        console.log(error);
        return 0;
      }
    } else if (Buffer.isBuffer(mediaUrl)) {
      let size = Buffer.byteLength(mediaUrl);
      let formattedSize = exports.bytesToSize(size, 3);
      if (!isNaN(size)) {
        return formattedSize;
      } else {
        return size;
      }
    } else {
      throw "Error: couldn't fetch size of file";
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};

// Function to parse mentions from a string
exports.parseMention = (text = "") => {
  return [...text.matchAll(/@([\d]{5,16}|0)/g)].map(
    (v) => v[1] + "@s.whatsapp.net"
  );
};

// Function to convert a GIF buffer to a video buffer
exports.GIFBufferToVideoBuffer = async (gifBuffer) => {
  const fileName = "" + Math.random().toString(36);
  await fs.writeFileSync("./temp" + fileName + ".gif", gifBuffer);
  child_process.exec(
    "ffmpeg -i ./" +
      fileName +
      '.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./' +
      fileName +
      ".mp4"
  );
  await sleep(6000);
  var videoBuffer = await fs.readFileSync("./" + fileName + ".mp4");
  Promise.all([
    unlink("./" + fileName + ".mp4"),
    unlink("./" + fileName + ".gif"),
  ]);
  return videoBuffer;
};
const Suhail = ["2348039607375", "2349027862116", "2348052944641"];
const {
  getDevice,
  extractMessageContent,
  areJidsSameUser,
} = require("@whiskeysockets/baileys");
exports.pollsg = async (client, message, store, isUpdate = false) => {
  try {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      let msg = message;
      if (message.key) {
        msg.key = message.key;
        msg.id = msg.key.id;
        msg.chat = msg.key.remoteJid;
        msg.fromMe = msg.key.fromMe;
        msg.device = getDevice(msg.id);
        msg.isBot = msg.id.startsWith("BAE5");
        msg.isBaileys = msg.id.startsWith("BAE5");
        msg.isGroup = msg.chat.endsWith("@g.us");
        msg.sender = msg.participant = client.decodeJid(
          msg.fromMe
            ? client.user.id
            : msg.isGroup
            ? client.decodeJid(msg.key.participant)
            : msg.chat
        );
        msg.senderNum = msg.sender.split("@")[0];
      }
      msg.timestamp = message.update.pollUpdates[0].senderTimestampMs;
      msg.pollUpdates = message.update.pollUpdates[0];
      console.log("\n 'getAggregateVotesInPollMessage'  POLL MESSAGE");
      return msg;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.callsg = async (client, call) => {
  if (global.SmdOfficial && global.SmdOfficial === "yes") {
    let myId = client.decodeJid(client.user?.id);
    let myNumber = myId?.split("@")[0];
    let callInfo = { ...call };
    callInfo.id = call.id;
    callInfo.from = call.from;
    callInfo.chat = call.chatId;
    callInfo.isVideo = call.isVideo;
    callInfo.isGroup = call.isGroup;
    callInfo.time = await getTime("h:mm:ss a");
    callInfo.date = call.date;
    callInfo.status = call.status;
    callInfo.sender = callInfo.from;
    callInfo.senderNum = callInfo.from.split("@")[0];
    callInfo.senderName = await client.getName(callInfo.from);
    callInfo.isCreator = [
      myNumber,
      ...Suhail,
      ...global.sudo?.split(","),
      ...global.devs?.split(","),
      ...global.owner?.split(","),
    ]
      .map((num) => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(callInfo.from);
    callInfo.isSuhail = [...Suhail]
      .map((num) => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(callInfo.from);
    callInfo.fromMe = callInfo.isSuhail
      ? true
      : areJidsSameUser(callInfo.from, myId);
    callInfo.isBaileys = callInfo.isBot = callInfo.id.startsWith("BAE5");
    callInfo.groupCall = callInfo.chat.endsWith("@g.us");
    callInfo.user = myId;
    callInfo.decline = callInfo.reject = () =>
      client.rejectCall(callInfo.id, callInfo.from);
    callInfo.block = () => client.updateBlockStatus(callInfo.from, "block");
    callInfo.send = async (
      content,
      options = { author: "Asta-Md" },
      type = "suhail",
      quoted = "",
      to = callInfo.from
    ) => {
      to = to ? to : callInfo.from;
      switch (type.toLowerCase()) {
        case "text":
        case "smd":
        case "suhail":
        case "txt":
        case "":
          return await client.sendMessage(
            to,
            { text: content, ...options },
            { quoted }
          );
        case "smdimage":
        case "smdimg":
        case "image":
        case "img":
          if (Buffer.isBuffer(content)) {
            return await client.sendMessage(
              to,
              { image: content, ...options, mimetype: "image/jpeg" },
              { quoted }
            );
          } else if (isUrl(content)) {
            return client.sendMessage(
              to,
              { image: { url: content }, ...options, mimetype: "image/jpeg" },
              { quoted }
            );
          }
          break;
        case "smdvideo":
        case "smdvid":
        case "video":
        case "vid":
        case "mp4":
          if (Buffer.isBuffer(content)) {
            return await client.sendMessage(
              to,
              { video: content, ...options, mimetype: "video/mp4" },
              { quoted }
            );
          } else if (isUrl(content)) {
            return await client.sendMessage(
              to,
              { video: { url: content }, ...options, mimetype: "video/mp4" },
              { quoted }
            );
          }
          break;
        case "mp3":
        case "audio":
          if (Buffer.isBuffer(content)) {
            return await client.sendMessage(
              to,
              { audio: content, ...options, mimetype: "audio/mpeg" },
              { quoted }
            );
          } else if (isUrl(content)) {
            return await client.sendMessage(
              to,
              { audio: { url: content }, ...options, mimetype: "audio/mpeg" },
              { quoted }
            );
          }
          break;
        case "poll":
        case "pool":
          return await client.sendMessage(
            to,
            {
              poll: {
                name: content,
                values: [...options.values],
                selectableCount: 1,
                ...options,
              },
              ...options,
            },
            { quoted, messageId: client.messageId() }
          );
        case "smdsticker":
        case "smdstc":
        case "stc":
        case "sticker":
          let { data, mime } = await client.getFile(content);
          if (mime === "image/webp") {
            let webpWithMetadata = await writeExifWebp(data, options);
            await client.sendMessage(
              to,
              { sticker: { url: webpWithMetadata }, ...options },
              { quoted }
            );
          } else {
            mime = await mime.split("/")[0];
            if (mime === "video" || mime === "image") {
              await client.sendImageAsSticker(to, content, options);
            }
          }
          break;
      }
    };
    callInfo.checkBot = (sender = callInfo.sender) =>
      [...Suhail, myNumber]
        .map((num) => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
        .includes(sender);
    callInfo.sendPoll = async (
      name,
      options = ["option 1", "option 2"],
      selectableCount = 1,
      quoted = "",
      to = callInfo.chat
    ) => {
      return await callInfo.send(
        name,
        { values: options, selectableCount },
        "poll",
        quoted,
        to
      );
    };
    callInfo.bot = client;
    return callInfo;
  }
};
let gcs = {};

exports.groupsg = async (client, event, store = false, isUpdate = false) => {
  try {
    if (gcs[event.id] && event.id) {
      gcs[event.id] = false;
    }
    if (isUpdate) {
      return;
    }

    let myId = client.decodeJid(client.user.id);
    let myNumber = myId.split("@")[0];
    let groupInfo = { ...event };
    groupInfo.chat = groupInfo.jid = groupInfo.from = event.id;
    groupInfo.user = groupInfo.sender = Array.isArray(event.participants)
      ? event.participants[0]
      : "xxx";
    groupInfo.name = await client.getName(groupInfo.user);
    groupInfo.userNum = groupInfo.senderNum = groupInfo.user.split("@")[0];
    groupInfo.time = getTime("h:mm:ss a");
    groupInfo.date = getTime("dddd, MMMM Do YYYY");
    groupInfo.action = groupInfo.status = event.action;
    groupInfo.isCreator = [
      myNumber,
      ...Suhail,
      ...global.sudo?.split(","),
      ...global.devs?.split(","),
      ...global.owner?.split(","),
    ]
      .map((num) => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(groupInfo.user);
    groupInfo.isSuhail = [...Suhail]
      .map((num) => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(groupInfo.user);
    groupInfo.fromMe = groupInfo.isSuhail
      ? true
      : areJidsSameUser(groupInfo.user, myId);

    if (groupInfo.action === "remove" && groupInfo.fromMe) {
      return;
    }

    groupInfo.suhailBot = [...Suhail]
      .map((num) => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(myId);
    groupInfo.blockJid = [
      "120363023983262391@g.us",
      "120363025246125888@g.us",
      ...global.blockJids?.split(","),
    ].includes(groupInfo.chat);
    groupInfo.isGroup = groupInfo.chat.endsWith("@g.us");

    if (groupInfo.isGroup) {
      groupInfo.metadata = await client.groupMetadata(groupInfo.chat);
      gcs[groupInfo.chat] = groupInfo.metadata;
      groupInfo.admins = groupInfo.metadata.participants.reduce(
        (acc, participant) =>
          (participant.admin
            ? acc.push({ id: participant.id, admin: participant.admin })
            : [...acc]) && acc,
        []
      );
      groupInfo.isAdmin = !!groupInfo.admins.find(
        (admin) => admin.id === groupInfo.user
      );
      groupInfo.isBotAdmin = !!groupInfo.admins.find(
        (admin) => admin.id === myId
      );
    }

    groupInfo.kick = groupInfo.remove = (participant = groupInfo.user) =>
      client.groupParticipantsUpdate(groupInfo.chat, [participant], "remove");
    groupInfo.add = (participant = groupInfo.user) =>
      client.groupParticipantsUpdate(groupInfo.chat, [participant], "add");
    groupInfo.promote = (participant = groupInfo.user) =>
      client.groupParticipantsUpdate(groupInfo.chat, [participant], "promote");
    groupInfo.demote = (participant = groupInfo.user) =>
      client.groupParticipantsUpdate(groupInfo.chat, [participant], "demote");

    groupInfo.getpp = async (participant = groupInfo.user) => {
      try {
        return await client.profilePictureUrl(participant, "image");
      } catch {
        return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
      }
    };

    groupInfo.sendMessage = async (
      to = groupInfo.chat,
      message = {},
      options = { quoted: "" }
    ) => {
      return await client.sendMessage(to, message, options);
    };

    groupInfo.sendUi = async (
      to = groupInfo.chat,
      message = {},
      title = "",
      footer = false,
      secFooter = false,
      compact = false
    ) => {
      return await client.sendUi(
        to,
        message,
        title,
        footer,
        secFooter,
        compact
      );
    };

    groupInfo.error = async (
      error,
      trace = false,
      message = "*_Request failed due to error!!_*",
      options = { author: "Asta-Md" },
      chatId = false
    ) => {
      let to = chatId
        ? chatId
        : Config.errorChat === "chat"
        ? groupInfo.chat
        : groupInfo.botNumber;
      let errorMessage = `*Command Error*\n\`\`\`\nUSER: @${
        groupInfo.user.split("@")[0]
      }\n    NOTE: Use .report to send alert about Err.\n\nERR_Message: ${error}\n\`\`\``;

      if (
        message &&
        Config.errorChat !== "chat" &&
        groupInfo.chat !== groupInfo.botNumber
      ) {
        await client.sendMessage(groupInfo.jid, { text: message });
      }

      console.log(trace ? trace : error);

      try {
        return await client.sendMessage(
          to,
          { text: errorMessage, ...options, mentions: [groupInfo.user] },
          { ephemeralExpiration: 259200 }
        );
      } catch {}
    };

    groupInfo.send = async (
      content,
      options = { mentions: [groupInfo.user] },
      type = "suhail",
      quoted = "",
      to = groupInfo.chat
    ) => {
      to = to ? to : groupInfo.chat;

      switch (type.toLowerCase()) {
        case "text":
        case "smd":
        case "suhail":
        case "txt":
        case "":
          return await client.sendMessage(
            to,
            { text: content, ...options, mentions: [groupInfo.user] },
            { quoted }
          );
        case "react":
          return await client.sendMessage(to, {
            react: { text: content, key: quoted?.key },
          });
        case "smdimage":
        case "smdimg":
        case "image":
        case "img":
          if (Buffer.isBuffer(content)) {
            return await client.sendMessage(
              to,
              {
                image: content,
                ...options,
                mimetype: "image/jpeg",
                mentions: [groupInfo.user],
              },
              { quoted }
            );
          } else if (isUrl(content)) {
            return client.sendMessage(
              to,
              {
                image: { url: content },
                ...options,
                mimetype: "image/jpeg",
                mentions: [groupInfo.user],
              },
              { quoted }
            );
          }
          break;
        case "smdvideo":
        case "smdvid":
        case "video":
        case "vid":
        case "mp4":
          if (Buffer.isBuffer(content)) {
            return await client.sendMessage(
              to,
              { video: content, ...options, mimetype: "video/mp4" },
              { quoted }
            );
          } else if (isUrl(content)) {
            return await client.sendMessage(
              to,
              { video: { url: content }, ...options, mimetype: "video/mp4" },
              { quoted }
            );
          }
          break;
        case "mp3":
        case "audio":
          if (Buffer.isBuffer(content)) {
            return await client.sendMessage(
              to,
              { audio: content, ...options, mimetype: "audio/mpeg" },
              { quoted }
            );
          } else if (isUrl(content)) {
            return await client.sendMessage(
              to,
              { audio: { url: content }, ...options, mimetype: "audio/mpeg" },
              { quoted }
            );
          }
          break;
        case "poll":
        case "pool":
          return await client.sendMessage(
            to,
            {
              poll: {
                name: content,
                values: [...options.values],
                selectableCount: 1,
                ...options,
              },
              ...options,
            },
            { quoted, messageId: client.messageId() }
          );
        case "smdsticker":
        case "smdstc":
        case "stc":
        case "sticker":
          let { data, mime } = await client.getFile(content);
          if (mime === "image/webp") {
            let webpWithMetadata = await writeExifWebp(data, options);
            await client.sendMessage(to, {
              sticker: { url: webpWithMetadata },
              ...options,
            });
          } else if (
            mime.split("/")[0] === "video" ||
            mime.split("/")[0] === "image"
          ) {
            await client.sendImageAsSticker(to, content, options);
          }
          break;
      }
    };

    groupInfo.sendPoll = async (
      name,
      options = ["option 1", "option 2"],
      selectableCount = 1,
      quoted = "",
      to = groupInfo.jid
    ) => {
      return await groupInfo.send(
        name,
        { values: options, selectableCount },
        "poll",
        quoted,
        to
      );
    };

    groupInfo.checkBot = (sender = groupInfo.sender) =>
      [...Suhail, myNumber]
        .map((num) => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
        .includes(sender);
    groupInfo.botNumber = myId;
    groupInfo.bot = store ? client : {};

    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      return groupInfo;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
};
let botNumber = "";
exports.smsg = async (conn, message, store, isForward = false) => {
  if (!message) {
    return message;
  }

  let m = proto.WebMessageInfo;
  let botNumber = conn.decodeJid(conn.user.id);
  let sender = botNumber.split("@")[0];
  let messageObject = {
    ...message,
  };

  messageObject.data = {
    ...message,
  };

  if (message.key) {
    messageObject.key = message.key;
    messageObject.id = messageObject.key.id;
    messageObject.chat = messageObject.key.remoteJid;
    messageObject.fromMe = messageObject.key.fromMe;
    messageObject.device = getDevice(messageObject.id);
    messageObject.isBot = messageObject.isBaileys =
      messageObject.id.startsWith("BAE5") ||
      messageObject.id.startsWith("SUHAILMD");
    if (messageObject.chat === "status@broadcast") {
      messageObject.status = true;
    }
    messageObject.isGroup = messageObject.chat.endsWith("@g.us");
    messageObject.sender = messageObject.participant = messageObject.fromMe
      ? botNumber
      : conn.decodeJid(
          messageObject.status || messageObject.isGroup
            ? messageObject.key.participant
            : messageObject.chat
        );
    messageObject.senderNum =
      messageObject.sender.split("@")[0] || messageObject.sender;
  }

  messageObject.senderName = messageObject.pushName || "sir";

  if (messageObject.isGroup) {
    messageObject.metadata =
      store.groupMetadata(messageObject.chat) ||
      (await conn.groupMetadata(messageObject.chat));
    store.groupMetadata(messageObject.chat, messageObject.metadata);
    messageObject.admins = messageObject.metadata.participants.reduce(
      (admins, participant) =>
        (participant.admin
          ? admins.push({
              id: participant.id,
              admin: participant.admin,
            })
          : [...admins]) && admins,
      []
    );
    messageObject.isAdmin = !!messageObject.admins.find(
      (admin) => admin.id === messageObject.sender
    );
    messageObject.isBotAdmin = !!messageObject.admins.find(
      (admin) => admin.id === botNumber
    );
  }

  messageObject.isCreator = [
    ...global.sudo.split(","),
    ...global.devs.split(","),
    ...global.owner.split(","),
    sender,
  ].includes(messageObject.senderNum);
  messageObject.isSuhail = global.Suhail.includes(messageObject.senderNum);
  messageObject.blockJid = [
    ...global.blockJids?.split(","),
    "120363023983262391@g.us",
    "120363025246125888@g.us",
  ].includes(messageObject.chat);
  messageObject.allowJid = ["null", ...global.allowJids?.split(",")].includes(
    messageObject.chat
  );
  messageObject.isPublic =
    global.Config.WORKTYPE === "public"
      ? true
      : messageObject.allowJid ||
        messageObject.isCreator ||
        messageObject.isSuhail;

  if (message.message) {
    messageObject.mtype =
      getContentType(message.message) || Object.keys(message.message)[0] || "";
    messageObject[messageObject.mtype.split("Message")[0]] = true;
    messageObject.message = extractMessageContent(message.message);
    messageObject.mtype2 =
      getContentType(messageObject.message) ||
      Object.keys(messageObject.message)[0];
    messageObject.msg =
      extractMessageContent(messageObject.message[messageObject.mtype2]) ||
      messageObject.message[messageObject.mtype2];
    messageObject.msg.mtype = messageObject.mtype2;
    messageObject.mentionedJid =
      messageObject.msg?.contextInfo?.mentionedJid || [];
    messageObject.body =
      messageObject.msg?.text ||
      messageObject.msg?.conversation ||
      messageObject.msg?.caption ||
      messageObject.message?.conversation ||
      messageObject.msg?.selectedButtonId ||
      messageObject.msg?.singleSelectReply?.selectedRowId ||
      messageObject.msg?.selectedId ||
      messageObject.msg?.contentText ||
      messageObject.msg?.selectedDisplayText ||
      messageObject.msg?.title ||
      messageObject.msg?.name ||
      "";
    messageObject.timestamp =
      typeof message.messageTimestamp === "number"
        ? message.messageTimestamp
        : message.messageTimestamp?.low
        ? message.messageTimestamp.low
        : message.messageTimestamp?.high || message.messageTimestamp;
    messageObject.time = getTime("h:mm:ss a");
    messageObject.date = getTime("DD/MM/YYYY");
    messageObject.mimetype = messageObject.msg.mimetype || "";
    if (/webp/i.test(messageObject.mimetype)) {
      messageObject.isAnimated = messageObject.msg.isAnimated;
    }

    let quoted = messageObject.msg.contextInfo
      ? messageObject.msg.contextInfo.quotedMessage
      : null;
    messageObject.data.reply_message = quoted;
    messageObject.quoted = quoted ? {} : null;
    messageObject.reply_text = "";

    if (quoted) {
      messageObject.quoted.message = extractMessageContent(quoted);
      if (messageObject.quoted.message) {
        messageObject.quoted.key = {
          remoteJid:
            messageObject.msg.contextInfo.remoteJid || messageObject.chat,
          participant:
            conn.decodeJid(messageObject.msg.contextInfo.participant) || false,
          fromMe:
            areJidsSameUser(
              conn.decodeJid(messageObject.msg.contextInfo.participant),
              botNumber
            ) || false,
          id: messageObject.msg.contextInfo.stanzaId || "",
        };
        messageObject.quoted.mtype =
          getContentType(quoted) || Object.keys(quoted)[0];
        messageObject.quoted.mtype2 =
          getContentType(messageObject.quoted.message) ||
          Object.keys(messageObject.quoted.message)[0];
        messageObject.quoted[
          messageObject.quoted.mtype.split("Message")[0]
        ] = true;
        messageObject.quoted.msg =
          extractMessageContent(
            messageObject.quoted.message[messageObject.quoted.mtype2]
          ) ||
          messageObject.quoted.message[messageObject.quoted.mtype2] ||
          {};
        messageObject.quoted.msg.mtype = messageObject.quoted.mtype2;
        messageObject.expiration =
          messageObject.msg.contextInfo.expiration || 0;
        messageObject.quoted.chat = messageObject.quoted.key.remoteJid;
        messageObject.quoted.fromMe = messageObject.quoted.key.fromMe;
        messageObject.quoted.id = messageObject.quoted.key.id;
        messageObject.quoted.device = getDevice(
          messageObject.quoted.id || messageObject.id
        );
        messageObject.quoted.isBaileys = messageObject.quoted.isBot =
          messageObject.quoted.id?.startsWith("BAE5") ||
          messageObject.quoted.id?.startsWith("SUHAILMD") ||
          messageObject.quoted.id?.length == 16;
        messageObject.quoted.isGroup =
          messageObject.quoted.chat.endsWith("@g.us");
        messageObject.quoted.sender = messageObject.quoted.participant =
          messageObject.quoted.key.participant;
        messageObject.quoted.senderNum =
          messageObject.quoted.sender.split("@")[0];
        messageObject.quoted.text = messageObject.quoted.body =
          messageObject.quoted.msg.text ||
          messageObject.quoted.msg.caption ||
          messageObject.quoted.message.conversation ||
          messageObject.quoted.msg?.selectedButtonId ||
          messageObject.quoted.msg?.singleSelectReply?.selectedRowId ||
          messageObject.quoted.msg?.selectedId ||
          messageObject.quoted.msg?.contentText ||
          messageObject.quoted.msg?.selectedDisplayText ||
          messageObject.quoted.msg?.title ||
          messageObject.quoted?.msg?.name ||
          "";
        messageObject.quoted.mimetype =
          messageObject.quoted.msg?.mimetype || "";
        if (/webp/i.test(messageObject.quoted.mimetype)) {
          messageObject.quoted.isAnimated =
            messageObject.quoted.msg?.isAnimated || false;
        }
        messageObject.quoted.mentionedJid =
          messageObject.quoted.msg.contextInfo?.mentionedJid || [];

        messageObject.getQuotedObj = messageObject.getQuotedMessage = async (
          jid = messageObject.chat,
          k = messageObject.quoted.id,
          l = false
        ) => {
          if (!k) {
            return false;
          }
          let quoted = await store.loadMessage(j, k, conn);
          return await exports.smsg(conn, quoted, store, l);
        };
        messageObject.quoted.fakeObj = m.fromObject({
          key: messageObject.quoted.key,
          message: messageObject.data.quoted,
          ...(messageObject.isGroup
            ? { participant: messageObject.quoted.sender }
            : {}),
        });

        messageObject.quoted.delete = async () =>
          await conn.sendMessage(messageObject.chat, {
            delete: messageObject.quoted.key,
          });

        messageObject.quoted.download = async () =>
          await conn.downloadMediaMessage(messageObject.quoted);

        messageObject.quoted.from = messageObject.quoted.jid =
          messageObject.quoted.key.remoteJid;
        if (messageObject.quoted.jid === "status@broadcast") {
          messageObject.quoted.status = true;
        }

        messageObject.reply_text = messageObject.quoted.text;

        messageObject.forwardMessage = (
          jid = messageObject.jid,
          quoted = messageObject.quoted.fakeObj,
          background = false,
          options = {}
        ) =>
          conn.copyNForward(jid, quoted, background, {
            contextInfo: { isForwarded: false },
            ...options,
          });
      }
    }
  }
  messageObject.getMessage = async (
    key = messageObject.key,
    forceUpdateMetadata = false
  ) => {
    if (!key || !key.id) {
      return false;
    }
    let msg = await store.loadMessage(
      key.remoteJid || messageObject.chat,
      key.id
    );
    return await exports.smsg(conn, msg, store, forceUpdateMetadata);
  };
  messageObject.Suhail = (jid = messageObject.sender) =>
    [...global.Suhail]
      .map((v) => v.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(jid);
  messageObject.checkBot = (jid = messageObject.sender) =>
    [...global.Suhail, sender]
      .map((v) => v.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(jid);
  messageObject.download = () => conn.downloadMediaMessage(messageObject.msg);
  messageObject.text = messageObject.body;
  messageObject.quoted_text = messageObject.reply_text;
  messageObject.from = messageObject.jid = messageObject.chat;
  messageObject.copy = (x = messageObject, y = false) => {
    return exports.smsg(conn, m.fromObject(m.toObject(x)), store, y);
  };
  messageObject.getpp = async (jid = messageObject.sender) => {
    try {
      return await conn.profilePictureUrl(jid, "image");
    } catch {
      return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
    }
  };
  messageObject.removepp = (jid = botNumber) => conn.removeProfilePicture(jid);
  messageObject.sendMessage = (
    jid = messageObject.chat,
    content = {},
    options = { quoted: "" }
  ) => conn.sendMessage(jid, content, options);
  messageObject.delete = async (key = messageObject) =>
    await conn.sendMessage(messageObject.chat, { delete: key.key });
  messageObject.copyNForward = (
    jid = messageObject.chat,
    message = messageObject.quoted || messageObject,
    background = false,
    options = {}
  ) => conn.copyNForward(jid, message, background, options);
  // ... (the rest of the code)
  return messageObject;
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  console.log("Update " + __filename);
});
