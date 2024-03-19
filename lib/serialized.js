const {
    proto,
    delay,
    getContentType
  } = require("@whiskeysockets/baileys");
  const fs = require("fs-extra");
  const {
    unlink
  } = require("fs").promises;
  const axios = require("axios");
  const {
    writeExifWebp
  } = require("./exif");
  const moment = require("moment-timezone");
  const {
    sizeFormatter
  } = require("human-readable");
  const Config = require("../config");
  const util = require("util");
  const jimp = require("jimp");
  const {
    defaultMaxListeners
  } = require("stream");
  const child_process = require("child_process");
  const ffmpeg = require("fluent-ffmpeg");
  const unixTimestampSeconds = (_0x319805 = new Date()) => Math.floor(_0x319805.getTime() / 1000);
  exports.unixTimestampSeconds = unixTimestampSeconds;
  const sleep = _0x222f68 => {
    return new Promise(_0x3e44f9 => {
      setTimeout(_0x3e44f9, _0x222f68);
    });
  };
  exports.sleep = sleep;
  exports.delay = sleep;
  const isUrl = _0x2536a3 => {
    return _0x2536a3.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, "gi"));
  };
  exports.isUrl = isUrl;
  exports.generateMessageTag = _0x175b96 => {
    let _0x143a87 = (0, exports.unixTimestampSeconds)().toString();
    if (_0x175b96) {
      _0x143a87 += ".--" + _0x175b96;
    }
    return _0x143a87;
  };
  exports.processTime = (_0x2ac35e, _0x55a31c) => {
    return moment.duration(_0x55a31c - moment(_0x2ac35e * 1000)).asSeconds();
  };
  const getBuffer = async (_0x6f9031, _0x3ca18e = {}, _0x5a517e = "get") => {
    try {
      if (Buffer.isBuffer(_0x6f9031)) {
        return _0x6f9031;
      }
      if (/http/gi.test(_0x6f9031)) {
        const _0xf71ebe = await axios({
          method: _0x5a517e,
          url: _0x6f9031,
          headers: {
            DNT: 1,
            "Upgrade-Insecure-Request": 1
          },
          ..._0x3ca18e,
          responseType: "arraybuffer"
        });
        return _0xf71ebe.data;
      } else if (fs.existsSync(_0x6f9031)) {
        return fs.readFileSync(_0x6f9031);
      } else {
        return _0x6f9031;
      }
    } catch (_0x3c659a) {
      console.log("error while getting data in buffer : ", _0x3c659a);
      return false;
    }
  };
  exports.getBuffer = getBuffer;
  exports.smdBuffer = getBuffer;
  const fetchJson = async (_0xea7743, _0xf8668e = {}, _0x383ee3 = "GET") => {
    try {
      const _0x1b2366 = await axios({
        method: _0x383ee3,
        url: _0xea7743,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        },
        ..._0xf8668e
      });
      return _0x1b2366.data;
    } catch (_0xaeed1b) {
      console.log("error while fething data in json \n ", _0xaeed1b);
      return false;
    }
  };
  exports.fetchJson = fetchJson;
  exports.smdJson = fetchJson;
  exports.runtime = function (_0x33a8a6, _0x28cbb5 = " d", _0x18d6bc = " h", _0xddc883 = " m", _0x42deaf = " s") {
    _0x33a8a6 = Number(_0x33a8a6);
    var _0x690f35 = Math.floor(_0x33a8a6 / 86400);
    var _0xbacd1c = Math.floor(_0x33a8a6 % 86400 / 3600);
    var _0x246490 = Math.floor(_0x33a8a6 % 3600 / 60);
    var _0x3516ec = Math.floor(_0x33a8a6 % 60);
    var _0x2feb49 = _0x690f35 > 0 ? _0x690f35 + _0x28cbb5 + ", " : "";
    var _0x1c55b1 = _0xbacd1c > 0 ? _0xbacd1c + _0x18d6bc + ", " : "";
    var _0x5a0b8e = _0x246490 > 0 ? _0x246490 + _0xddc883 + ", " : "";
    var _0x2430ef = _0x3516ec > 0 ? _0x3516ec + _0x42deaf : "";
    return _0x2feb49 + _0x1c55b1 + _0x5a0b8e + _0x2430ef;
  };
  exports.clockString = function (_0x4546e6) {
    let _0xa94088 = isNaN(_0x4546e6) ? "--" : Math.floor(_0x4546e6 % 86400 / 3600);
    let _0x4b412a = isNaN(_0x4546e6) ? "--" : Math.floor(_0x4546e6 % 3600 / 60);
    let _0x2e07a8 = isNaN(_0x4546e6) ? "--" : Math.floor(_0x4546e6 % 60);
    return [_0xa94088, _0x4b412a, _0x2e07a8].map(_0x57019e => _0x57019e.toString().padStart(2, 0)).join(":");
  };
  const getTime = (_0x8b4853, _0x10cc28) => {
    const _0x4f1df7 = global.timezone || "Asia/Karachi";
    if (_0x10cc28) {
      return moment.tz(_0x10cc28, _0x4f1df7).format(_0x8b4853);
    } else {
      return moment.tz(_0x4f1df7).format(_0x8b4853);
    }
  };
  exports.getTime = getTime;
  exports.formatDate = (_0x2b3164, _0x340552 = "id") => {
    let _0x45a46d = new Date(_0x2b3164);
    return _0x45a46d.toLocaleDateString(_0x340552, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  };
  exports.formatp = sizeFormatter({
    std: "JEDEC",
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (_0x5ab357, _0xcc9809) => _0x5ab357 + " " + _0xcc9809 + "B"
  });
  exports.jsonformat = _0x7060fe => {
    return JSON.stringify(_0x7060fe, null, 2);
  };
  const format = (..._0x55966c) => {
    return util.format(..._0x55966c);
  };
  exports.format = format;
  exports.logic = (_0x4aafe2, _0x1fb390, _0x532c87) => {
    if (_0x1fb390.length !== _0x532c87.length) {
      throw new Error("Input and Output must have same length");
    }
    for (let _0x2650db in _0x1fb390) {
      if (util.isDeepStrictEqual(_0x4aafe2, _0x1fb390[_0x2650db])) {
        return _0x532c87[_0x2650db];
      }
    }
    return null;
  };
  exports.generateProfilePicture = async _0x486292 => {
    const _0x378027 = await jimp_1.read(_0x486292);
    const _0x4fd294 = _0x378027.getWidth();
    const _0x208081 = _0x378027.getHeight();
    const _0x351b84 = _0x378027.crop(0, 0, _0x4fd294, _0x208081);
    return {
      img: await _0x351b84.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
      preview: await _0x351b84.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG)
    };
  };
  exports.bytesToSize = (_0x175c8e, _0x41a99d = 2) => {
    if (_0x175c8e === 0) {
      return "0 Bytes";
    }
    const _0xe8ad = 1024;
    const _0x13a8af = _0x41a99d < 0 ? 0 : _0x41a99d;
    const _0x3ce749 = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const _0x318c57 = Math.floor(Math.log(_0x175c8e) / Math.log(_0xe8ad));
    return parseFloat((_0x175c8e / Math.pow(_0xe8ad, _0x318c57)).toFixed(_0x13a8af)) + " " + _0x3ce749[_0x318c57];
  };
  exports.getSizeMedia = _0x455ff9 => {
    try {
      if (!_0x455ff9) {
        return 0;
      }
      if (typeof _0x455ff9 == "string" && (_0x455ff9.startsWith("http") || _0x455ff9.startsWith("Http"))) {
        try {
          let _0x2cf92e = axios.get(_0x455ff9);
          let _0x3a23e5 = parseInt(_0x2cf92e.headers["content-length"]);
          let _0x53e2f6 = exports.bytesToSize(_0x3a23e5, 3);
          if (!isNaN(_0x3a23e5)) {
            return _0x53e2f6;
          }
        } catch (_0x4ce3f9) {
          console.log(_0x4ce3f9);
          return 0;
        }
      } else if (Buffer.isBuffer(_0x455ff9)) {
        let _0x39c0cb = Buffer.byteLength(_0x455ff9);
        let _0x59611a = exports.bytesToSize(_0x39c0cb, 3);
        if (!isNaN(_0x39c0cb)) {
          return _0x59611a;
        } else {
          return _0x39c0cb;
        }
      } else {
        throw "Erorr: coudln't fetch size of file";
      }
    } catch (_0x4babd7) {
      console.log(_0x4babd7);
      return 0;
    }
  };
  exports.parseMention = (_0x150b18 = "") => {
    return [..._0x150b18.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x25a0ec => _0x25a0ec[1] + "@s.whatsapp.net");
  };
  exports.GIFBufferToVideoBuffer = async _0x512a23 => {
    const _0x3a35b9 = "" + Math.random().toString(36);
    await fs.writeFileSync("./" + _0x3a35b9 + ".gif", _0x512a23);
    child_process.exec("ffmpeg -i ./" + _0x3a35b9 + ".gif -movflags faststart -pix_fmt yuv420p -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" ./" + _0x3a35b9 + ".mp4");
    await sleep(6000);
    var _0x426ad2 = await fs.readFileSync("./" + _0x3a35b9 + ".mp4");
    Promise.all([unlink("./" + _0x3a35b9 + ".mp4"), unlink("./" + _0x3a35b9 + ".gif")]);
    return _0x426ad2;
  };
  const Suhail = ["923184474176", "923004591719", "17863688449"];
  const {
    getDevice,
    extractMessageContent,
    getAggregateVotesInPollMessage,
    areJidsSameUser
  } = require("@whiskeysockets/baileys");
  exports.pollsg = async (_0x564022, _0x527b2a, _0x47c059, _0x51b406 = false) => {
    try {
      if (global.SmdOfficial && global.SmdOfficial === "yes") {
        let _0x2e2d78 = _0x527b2a;
        if (_0x527b2a.key) {
          _0x2e2d78.key = _0x527b2a.key;
          _0x2e2d78.id = _0x2e2d78.key.id;
          _0x2e2d78.chat = _0x2e2d78.key.remoteJid;
          _0x2e2d78.fromMe = _0x2e2d78.key.fromMe;
          _0x2e2d78.device = getDevice(_0x2e2d78.id);
          _0x2e2d78.isBot = _0x2e2d78.id.startsWith("BAE5");
          _0x2e2d78.isBaileys = _0x2e2d78.id.startsWith("BAE5");
          _0x2e2d78.isGroup = _0x2e2d78.chat.endsWith("@g.us");
          _0x2e2d78.sender = _0x2e2d78.participant = _0x564022.decodeJid(_0x2e2d78.fromMe ? _0x564022.user.id : _0x2e2d78.isGroup ? _0x564022.decodeJid(_0x2e2d78.key.participant) : _0x2e2d78.chat);
          _0x2e2d78.senderNum = _0x2e2d78.sender.split("@")[0];
        }
        _0x2e2d78.timestamp = _0x527b2a.update.pollUpdates[0].senderTimestampMs;
        _0x2e2d78.pollUpdates = _0x527b2a.update.pollUpdates[0];
        console.log("\n 'getAggregateVotesInPollMessage'  POLL MESSAGE");
        return _0x2e2d78;
      }
    } catch (_0x369abb) {
      console.log(_0x369abb);
    }
  };
  exports.callsg = async (_0x1b2fd9, _0x197b5f) => {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      let _0x2b2c1d = _0x1b2fd9.decodeJid(_0x1b2fd9.user?.id);
      let _0x14543e = _0x2b2c1d?.split("@")[0];
      let _0x46c418 = {
        ..._0x197b5f
      };
      _0x46c418.id = _0x197b5f.id;
      _0x46c418.from = _0x197b5f.from;
      _0x46c418.chat = _0x197b5f.chatId;
      _0x46c418.isVideo = _0x197b5f.isVideo;
      _0x46c418.isGroup = _0x197b5f.isGroup;
      _0x46c418.time = await getTime("h:mm:ss a");
      _0x46c418.date = _0x197b5f.date;
      _0x46c418.status = _0x197b5f.status;
      _0x46c418.sender = _0x46c418.from;
      _0x46c418.senderName = await _0x1b2fd9.getName(_0x46c418.from);
      _0x46c418.isCreator = [_0x14543e, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x43ccea => _0x43ccea.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x46c418.from);
      _0x46c418.isSuhail = [...Suhail].map(_0xc3a777 => _0xc3a777.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x46c418.from);
      _0x46c418.fromMe = _0x46c418.isSuhail ? true : areJidsSameUser(_0x46c418.from, _0x2b2c1d);
      _0x46c418.isBaileys = _0x46c418.isBot = _0x46c418.id.startsWith("BAE5");
      _0x46c418.groupCall = _0x46c418.chat.endsWith("@g.us");
      _0x46c418.user = _0x2b2c1d;
      _0x46c418.decline = _0x46c418.reject = () => _0x1b2fd9.rejectCall(_0x46c418.id, _0x46c418.from);
      _0x46c418.block = () => _0x1b2fd9.updateBlockStatus(_0x46c418.from, "block");
      _0x46c418.send = async (_0x3a75c5, _0x2d76f6 = {
        author: "Suhail-Md"
      }, _0x16aa9b = "suhail", _0x15e9e9 = "", _0x4ae31a = _0x46c418.from) => {
        _0x4ae31a = _0x4ae31a ? _0x4ae31a : _0x46c418.from;
        switch (_0x16aa9b.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "txt":
          case "":
            {
              return await _0x1b2fd9.sendMessage(_0x4ae31a, {
                text: _0x3a75c5,
                ..._0x2d76f6
              }, {
                quoted: _0x15e9e9
              });
            }
            break;
          case "smdimage":
          case "smdimg":
          case "image":
          case "img":
            {
              if (Buffer.isBuffer(_0x3a75c5)) {
                return await _0x1b2fd9.sendMessage(_0x4ae31a, {
                  image: _0x3a75c5,
                  ..._0x2d76f6,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0x15e9e9
                });
              } else if (isUrl(_0x3a75c5)) {
                return _0x1b2fd9.sendMessage(_0x4ae31a, {
                  image: {
                    url: _0x3a75c5
                  },
                  ..._0x2d76f6,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0x15e9e9
                });
              }
            }
            break;
          case "smdvideo":
          case "smdvid":
          case "video":
          case "vid":
          case "mp4":
            {
              if (Buffer.isBuffer(_0x3a75c5)) {
                return await _0x1b2fd9.sendMessage(_0x4ae31a, {
                  video: _0x3a75c5,
                  ..._0x2d76f6,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x15e9e9
                });
              } else if (isUrl(_0x3a75c5)) {
                return await _0x1b2fd9.sendMessage(_0x4ae31a, {
                  video: {
                    url: _0x3a75c5
                  },
                  ..._0x2d76f6,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x15e9e9
                });
              }
            }
            break;
          case "mp3":
          case "audio":
            {
              if (Buffer.isBuffer(_0x3a75c5)) {
                return await _0x1b2fd9.sendMessage(_0x4ae31a, {
                  audio: _0x3a75c5,
                  ..._0x2d76f6,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x15e9e9
                });
              } else if (isUrl(_0x3a75c5)) {
                return await _0x1b2fd9.sendMessage(_0x4ae31a, {
                  audio: {
                    url: _0x3a75c5
                  },
                  ..._0x2d76f6,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x15e9e9
                });
              }
            }
            break;
          case "poll":
          case "pool":
            {
              return await _0x1b2fd9.sendMessage(_0x4ae31a, {
                poll: {
                  name: _0x3a75c5,
                  values: [..._0x2d76f6.values],
                  selectableCount: 1,
                  ..._0x2d76f6
                },
                ..._0x2d76f6
              }, {
                quoted: _0x15e9e9,
                messageId: _0x1b2fd9.messageId()
              });
            }
            break;
          case "smdsticker":
          case "smdstc":
          case "stc":
          case "sticker":
            {
              let {
                data: _0x522dc0,
                mime: _0x4aff87
              } = await _0x1b2fd9.getFile(_0x3a75c5);
              if (_0x4aff87 == "image/webp") {
                let _0x5a92bd = await writeExifWebp(_0x522dc0, _0x2d76f6);
                await _0x1b2fd9.sendMessage(_0x4ae31a, {
                  sticker: {
                    url: _0x5a92bd
                  },
                  ..._0x2d76f6
                }, {
                  quoted: _0x15e9e9
                });
              } else {
                _0x4aff87 = await _0x4aff87.split("/")[0];
                if (_0x4aff87 === "video" || _0x4aff87 === "image") {
                  await _0x1b2fd9.sendImageAsSticker(_0x4ae31a, _0x3a75c5, _0x2d76f6);
                }
              }
            }
            break;
        }
      };
      _0x46c418.checkBot = (_0x3222c8 = _0x46c418.sender) => [...Suhail, _0x14543e].map(_0x1c4f24 => _0x1c4f24.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x3222c8);
      _0x46c418.sendPoll = async (_0xd772cf, _0x437964 = ["option 1", "option 2"], _0x3b0bed = 1, _0x1ef99f = "", _0x414a0f = _0x46c418.chat) => {
        return await _0x46c418.send(_0xd772cf, {
          values: _0x437964,
          selectableCount: _0x3b0bed
        }, "poll", _0x1ef99f, _0x414a0f);
      };
      _0x46c418.bot = _0x1b2fd9;
      return _0x46c418;
    }
  };
  let gcs = {};
  let cntr = {};
  exports.groupsg = async (_0x13f771, _0x3e9000, _0x4a61e3 = false, _0xc44e2b = false) => {
    try {
      if (gcs[_0x3e9000.id] && _0x3e9000.id) {
        gcs[_0x3e9000.id] = false;
      }
      if (_0xc44e2b) {
        return;
      }
      let _0x466e8b = _0x13f771.decodeJid(_0x13f771.user.id);
      let _0x14ebe4 = _0x466e8b.split("@")[0];
      let _0x58a3b4 = {
        ..._0x3e9000
      };
      _0x58a3b4.chat = _0x58a3b4.jid = _0x58a3b4.from = _0x3e9000.id;
      _0x58a3b4.user = _0x58a3b4.sender = Array.isArray(_0x3e9000.participants) ? _0x3e9000.participants[0] : "xxx";
      _0x58a3b4.name = await _0x13f771.getName(_0x58a3b4.user);
      _0x58a3b4.userNum = _0x58a3b4.senderNum = _0x58a3b4.user.split("@")[0];
      _0x58a3b4.time = getTime("h:mm:ss a");
      _0x58a3b4.date = getTime("dddd, MMMM Do YYYY");
      _0x58a3b4.action = _0x58a3b4.status = _0x3e9000.action;
      _0x58a3b4.isCreator = [_0x14ebe4, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x35b98c => _0x35b98c.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x58a3b4.user);
      _0x58a3b4.isSuhail = [...Suhail].map(_0x34a744 => _0x34a744.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x58a3b4.user);
      _0x58a3b4.fromMe = _0x58a3b4.isSuhail ? true : areJidsSameUser(_0x58a3b4.user, _0x466e8b);
      if (_0x58a3b4.action === "remove" && _0x58a3b4.fromMe) {
        return;
      }
      _0x58a3b4.suhailBot = [...Suhail].map(_0x2cc9e7 => _0x2cc9e7.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x466e8b);
      _0x58a3b4.blockJid = ["120363023983262391@g.us", "120363025246125888@g.us", ...global.blockJids?.split(",")].includes(_0x58a3b4.chat);
      _0x58a3b4.isGroup = _0x58a3b4.chat.endsWith("@g.us");
      if (_0x58a3b4.isGroup) {
        _0x58a3b4.metadata = await _0x13f771.groupMetadata(_0x58a3b4.chat);
        gcs[_0x58a3b4.chat] = _0x58a3b4.metadata;
        _0x58a3b4.admins = _0x58a3b4.metadata.participants.reduce((_0x94f397, _0x376659) => (_0x376659.admin ? _0x94f397.push({
          id: _0x376659.id,
          admin: _0x376659.admin
        }) : [..._0x94f397]) && _0x94f397, []);
        _0x58a3b4.isAdmin = !!_0x58a3b4.admins.find(_0x2c9e4f => _0x2c9e4f.id === _0x58a3b4.user);
        _0x58a3b4.isBotAdmin = !!_0x58a3b4.admins.find(_0x4713b0 => _0x4713b0.id === _0x466e8b);
      }
      _0x58a3b4.kick = _0x58a3b4.remove = (_0x444291 = _0x58a3b4.user) => _0x13f771.groupParticipantsUpdate(_0x58a3b4.chat, [_0x444291], "remove");
      _0x58a3b4.add = (_0x257082 = _0x58a3b4.user) => _0x13f771.groupParticipantsUpdate(_0x58a3b4.chat, [_0x257082], "add");
      _0x58a3b4.promote = (_0xac9bb6 = _0x58a3b4.user) => _0x13f771.groupParticipantsUpdate(_0x58a3b4.chat, [_0xac9bb6], "promote");
      _0x58a3b4.demote = (_0x1dea51 = _0x58a3b4.user) => _0x13f771.groupParticipantsUpdate(_0x58a3b4.chat, [_0x1dea51], "demote");
      _0x58a3b4.getpp = async (_0x13328c = _0x58a3b4.user) => {
        try {
          return await _0x13f771.profilePictureUrl(_0x13328c, "image");
        } catch {
          return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
        }
      };
      _0x58a3b4.sendMessage = async (_0x373dde = _0x58a3b4.chat, _0x12e411 = {}, _0x9b30e7 = {
        quoted: ""
      }) => {
        return await _0x13f771.sendMessage(_0x373dde, _0x12e411, _0x9b30e7);
      };
      _0x58a3b4.sendUi = async (_0x1e2ab3 = _0x58a3b4.chat, _0x3265bd = {}, _0x1ec715 = "", _0x5ed82f = false, _0x129e12 = false, _0x14c338 = false) => {
        return await _0x13f771.sendUi(_0x1e2ab3, _0x3265bd, _0x1ec715, _0x5ed82f, _0x129e12, _0x14c338);
      };
      _0x58a3b4.error = async (_0x146680, _0x51fa9c = false, _0x5ab5b6 = "*_Request failed due to error!!_*", _0x2ce6d6 = {
        author: "Suhail-Md"
      }, _0x16a243 = false) => {
        let _0x205216 = _0x16a243 ? _0x16a243 : Config.errorChat === "chat" ? _0x58a3b4.chat : _0x58a3b4.botNumber;
        let _0x12114d = "*SUHAIL-Md ERROR MESSAGE!!!*\n```\nUSER: @" + _0x58a3b4.user.split("@")[0] + "\n    NOTE: Use .report to send alert about Err.\n\nERR_Message: " + _0x146680 + "\n```";
        if (_0x5ab5b6 && Config.errorChat !== "chat" && _0x58a3b4.chat !== _0x58a3b4.botNumber) {
          await _0x13f771.sendMessage(_0x58a3b4.jid, {
            text: _0x5ab5b6
          });
        }
        console.log(_0x51fa9c ? _0x51fa9c : _0x146680);
        try {
          return await _0x13f771.sendMessage(_0x205216, {
            text: _0x12114d,
            ..._0x2ce6d6,
            mentions: [_0x58a3b4.user]
          }, {
            ephemeralExpiration: 259200
          });
        } catch {}
      };
      _0x58a3b4.send = async (_0x532a7f, _0x528b1d = {
        mentions: [_0x58a3b4.user]
      }, _0x249a78 = "suhail", _0x1f6b9b = "", _0x441c93 = _0x58a3b4.chat) => {
        _0x441c93 = _0x441c93 ? _0x441c93 : _0x58a3b4.chat;
        switch (_0x249a78.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "txt":
          case "":
            {
              return await _0x13f771.sendMessage(_0x441c93, {
                text: _0x532a7f,
                ..._0x528b1d,
                mentions: [_0x58a3b4.user]
              }, {
                quoted: _0x1f6b9b
              });
            }
            break;
          case "react":
            {
              return await _0x13f771.sendMessage(_0x441c93, {
                react: {
                  text: _0x532a7f,
                  key: _0x1f6b9b?.key
                }
              });
            }
            break;
          case "smdimage":
          case "smdimg":
          case "image":
          case "img":
            {
              if (Buffer.isBuffer(_0x532a7f)) {
                return await _0x13f771.sendMessage(_0x441c93, {
                  image: _0x532a7f,
                  ..._0x528b1d,
                  mimetype: "image/jpeg",
                  mentions: [_0x58a3b4.user]
                }, {
                  quoted: _0x1f6b9b
                });
              } else if (isUrl(_0x532a7f)) {
                return _0x13f771.sendMessage(_0x441c93, {
                  image: {
                    url: _0x532a7f
                  },
                  ..._0x528b1d,
                  mimetype: "image/jpeg",
                  mentions: [_0x58a3b4.user]
                }, {
                  quoted: _0x1f6b9b
                });
              }
            }
            break;
          case "smdvideo":
          case "smdvid":
          case "video":
          case "vid":
          case "mp4":
            {
              if (Buffer.isBuffer(_0x532a7f)) {
                return await _0x13f771.sendMessage(_0x441c93, {
                  video: _0x532a7f,
                  ..._0x528b1d,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x1f6b9b
                });
              } else if (isUrl(_0x532a7f)) {
                return await _0x13f771.sendMessage(_0x441c93, {
                  video: {
                    url: _0x532a7f
                  },
                  ..._0x528b1d,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x1f6b9b
                });
              }
            }
          case "mp3":
          case "audio":
            {
              if (Buffer.isBuffer(_0x532a7f)) {
                return await _0x13f771.sendMessage(_0x441c93, {
                  audio: _0x532a7f,
                  ..._0x528b1d,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x1f6b9b
                });
              } else if (isUrl(_0x532a7f)) {
                return await _0x13f771.sendMessage(_0x441c93, {
                  audio: {
                    url: _0x532a7f
                  },
                  ..._0x528b1d,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x1f6b9b
                });
              }
            }
            break;
          case "poll":
          case "pool":
            {
              return await _0x13f771.sendMessage(_0x441c93, {
                poll: {
                  name: _0x532a7f,
                  values: [..._0x528b1d.values],
                  selectableCount: 1,
                  ..._0x528b1d
                },
                ..._0x528b1d
              }, {
                quoted: _0x1f6b9b,
                messageId: _0x13f771.messageId()
              });
            }
            break;
          case "smdsticker":
          case "smdstc":
          case "stc":
          case "sticker":
            {
              let {
                data: _0x208307,
                mime: _0x371152
              } = await _0x13f771.getFile(_0x532a7f);
              if (_0x371152 == "image/webp") {
                let _0xe837f5 = await writeExifWebp(_0x208307, _0x528b1d);
                await _0x13f771.sendMessage(_0x441c93, {
                  sticker: {
                    url: _0xe837f5
                  },
                  ..._0x528b1d
                });
              } else if (_0x371152.split("/")[0] === "video" || _0x371152.split("/")[0] === "image") {
                await _0x13f771.sendImageAsSticker(_0x441c93, _0x532a7f, _0x528b1d);
              }
            }
            break;
        }
      };
      _0x58a3b4.sendPoll = async (_0x495b05, _0x69452e = ["option 1", "option 2"], _0xc1bf2b = 1, _0x5b6b1c = "", _0x4996f7 = _0x58a3b4.jid) => {
        return await _0x58a3b4.send(_0x495b05, {
          values: _0x69452e,
          selectableCount: _0xc1bf2b
        }, "poll", _0x5b6b1c, _0x4996f7);
      };
      _0x58a3b4.checkBot = (_0x18f7a2 = _0x58a3b4.sender) => [...Suhail, _0x14ebe4].map(_0x51d77a => _0x51d77a.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x18f7a2);
      _0x58a3b4.botNumber = _0x466e8b;
      _0x58a3b4.bot = _0x4a61e3 ? _0x13f771 : {};
      if (global.SmdOfficial && global.SmdOfficial === "yes") {
        return _0x58a3b4;
      } else {
        return {};
      }
    } catch (_0x14c7a7) {
      console.log(_0x14c7a7);
    }
  };
  let botNumber = "";
  exports.smsg = async (_0x55f6f7, _0x59e045, _0x51c711, _0x466aa5 = false) => {
    if (!_0x59e045) {
      return _0x59e045;
    }
    let _0x370df0 = proto.WebMessageInfo;
    botNumber = botNumber ? botNumber : _0x55f6f7.decodeJid(_0x55f6f7.user?.id);
    let _0x4ce983 = botNumber.split("@")[0];
    let _0x890361 = {
      ..._0x59e045
    };
    _0x890361.data = {
      ..._0x59e045
    };
    if (_0x59e045.key) {
      _0x890361.key = _0x59e045.key;
      _0x890361.id = _0x890361.key.id;
      _0x890361.chat = _0x890361.key.remoteJid;
      _0x890361.fromMe = _0x890361.key.fromMe;
      _0x890361.device = getDevice(_0x890361.id);
      _0x890361.isBot = _0x890361.id.startsWith("BAE5") || _0x890361.id.startsWith("SUHAILMD");
      _0x890361.isBaileys = _0x890361.id.startsWith("BAE5") || _0x890361.id.startsWith("SUHAILMD");
      _0x890361.isGroup = _0x890361.chat.endsWith("@g.us");
      _0x890361.sender = _0x890361.participant = _0x890361.fromMe ? botNumber : _0x55f6f7.decodeJid(_0x890361.chat === "status@broadcast" || _0x890361.isGroup ? _0x890361.key.participant : _0x890361.chat);
      _0x890361.senderNum = _0x890361.sender?.split("@")[0] || _0x890361.sender;
    }
    _0x890361.senderName = _0x890361.pushName || "sir";
    if (_0x890361.isGroup) {
      _0x890361.metadata = gcs[_0x890361.chat] || (await _0x55f6f7.groupMetadata(_0x890361.chat));
      gcs[_0x890361.chat] = _0x890361.metadata;
      _0x890361.admins = _0x890361.metadata.participants.reduce((_0x2eddff, _0x1b961c) => (_0x1b961c.admin ? _0x2eddff.push({
        id: _0x1b961c.id,
        admin: _0x1b961c.admin
      }) : [..._0x2eddff]) && _0x2eddff, []);
      _0x890361.isAdmin = !!_0x890361.admins.find(_0x304f30 => _0x304f30.id === _0x890361.sender);
      _0x890361.isBotAdmin = !!_0x890361.admins.find(_0x2b38a2 => _0x2b38a2.id === botNumber);
    }
    _0x890361.isCreator = [_0x4ce983, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x546a0f => _0x546a0f.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x890361.sender);
    _0x890361.isSuhail = [...Suhail].map(_0x1edd44 => _0x1edd44.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x59e045.sender);
    _0x890361.blockJid = ["120363023983262391@g.us", "120363025246125888@g.us", ...global.blockJids?.split(",")].includes(_0x890361.chat);
    _0x890361.allowJid = ["null", ...global.allowJids?.split(",")].includes(_0x890361.chat);
    _0x890361.isPublic = Config.WORKTYPE === "public" ? true : _0x890361.allowJid || _0x890361.isCreator || _0x890361.isSuhail;
    if (_0x59e045.message) {
      _0x890361.mtype = getContentType(_0x59e045.message) || Object.keys(_0x59e045.message)[0] || "";
      _0x890361[_0x890361.mtype.split("Message")[0]] = true;
      _0x890361.message = extractMessageContent(_0x59e045.message);
      _0x890361.mtype2 = getContentType(_0x890361.message) || Object.keys(_0x890361.message)[0];
      _0x890361.msg = extractMessageContent(_0x890361.message[_0x890361.mtype2]) || _0x890361.message[_0x890361.mtype2];
      _0x890361.msg.mtype = _0x890361.mtype2;
      _0x890361.mentionedJid = _0x890361.msg?.contextInfo?.mentionedJid || [];
      _0x890361.body = _0x890361.msg?.text || _0x890361.msg?.conversation || _0x890361.msg?.caption || _0x890361.message?.conversation || _0x890361.msg?.selectedButtonId || _0x890361.msg?.singleSelectReply?.selectedRowId || _0x890361.msg?.selectedId || _0x890361.msg?.contentText || _0x890361.msg?.selectedDisplayText || _0x890361.msg?.title || _0x890361.msg?.name || "";
      _0x890361.timestamp = typeof _0x59e045.messageTimestamp === "number" ? _0x59e045.messageTimestamp : _0x59e045.messageTimestamp?.low ? _0x59e045.messageTimestamp.low : _0x59e045.messageTimestamp?.high || _0x59e045.messageTimestamp;
      _0x890361.time = getTime("h:mm:ss a");
      _0x890361.date = getTime("DD/MM/YYYY");
      _0x890361.mimetype = _0x890361.msg.mimetype || "";
      if (/webp/i.test(_0x890361.mimetype)) {
        _0x890361.isAnimated = _0x890361.msg.isAnimated;
      }
      let _0x4a850f = _0x890361.msg.contextInfo ? _0x890361.msg.contextInfo.quotedMessage : null;
      _0x890361.data.reply_message = _0x4a850f;
      _0x890361.quoted = _0x4a850f ? {} : null;
      _0x890361.reply_text = "";
      if (_0x4a850f) {
        _0x890361.quoted.message = extractMessageContent(_0x4a850f);
        if (_0x890361.quoted.message) {
          _0x890361.quoted.key = {
            remoteJid: _0x890361.msg.contextInfo.remoteJid || _0x890361.chat,
            participant: _0x55f6f7.decodeJid(_0x890361.msg.contextInfo.participant) || false,
            fromMe: areJidsSameUser(_0x55f6f7.decodeJid(_0x890361.msg.contextInfo.participant), botNumber) || false,
            id: _0x890361.msg.contextInfo.stanzaId || ""
          };
          _0x890361.quoted.mtype = getContentType(_0x4a850f) || Object.keys(_0x4a850f)[0];
          _0x890361.quoted.mtype2 = getContentType(_0x890361.quoted.message) || Object.keys(_0x890361.quoted.message)[0];
          _0x890361.quoted[_0x890361.quoted.mtype.split("Message")[0]] = true;
          _0x890361.quoted.msg = extractMessageContent(_0x890361.quoted.message[_0x890361.quoted.mtype2]) || _0x890361.quoted.message[_0x890361.quoted.mtype2] || {};
          _0x890361.quoted.msg.mtype = _0x890361.quoted.mtype2;
          _0x890361.expiration = _0x890361.msg.contextInfo.expiration || 0;
          _0x890361.quoted.chat = _0x890361.quoted.key.remoteJid;
          _0x890361.quoted.fromMe = _0x890361.quoted.key.fromMe;
          _0x890361.quoted.id = _0x890361.quoted.key.id;
          _0x890361.quoted.device = getDevice(_0x890361.quoted.id || _0x890361.id);
          _0x890361.quoted.isBaileys = _0x890361.quoted.isBot = _0x890361.quoted.id?.startsWith("BAE5") || _0x890361.quoted.id?.startsWith("SUHAILMD") || _0x890361.quoted.id?.length == 16;
          _0x890361.quoted.isGroup = _0x890361.quoted.chat.endsWith("@g.us");
          _0x890361.quoted.sender = _0x890361.quoted.participant = _0x890361.quoted.key.participant;
          _0x890361.quoted.senderNum = _0x890361.quoted.sender.split("@")[0];
          _0x890361.quoted.text = _0x890361.quoted.body = _0x890361.quoted.msg.text || _0x890361.quoted.msg.caption || _0x890361.quoted.message.conversation || _0x890361.quoted.msg?.selectedButtonId || _0x890361.quoted.msg?.singleSelectReply?.selectedRowId || _0x890361.quoted.msg?.selectedId || _0x890361.quoted.msg?.contentText || _0x890361.quoted.msg?.selectedDisplayText || _0x890361.quoted.msg?.title || _0x890361.quoted?.msg?.name || "";
          _0x890361.quoted.mimetype = _0x890361.quoted.msg?.mimetype || "";
          if (/webp/i.test(_0x890361.quoted.mimetype)) {
            _0x890361.quoted.isAnimated = _0x890361.quoted.msg?.isAnimated || false;
          }
          _0x890361.quoted.mentionedJid = _0x890361.quoted.msg.contextInfo?.mentionedJid || [];
          _0x890361.getQuotedObj = _0x890361.getQuotedMessage = async (_0x5847c5 = _0x890361.chat, _0x37d438 = _0x890361.quoted.id, _0x2005ba = false) => {
            if (!_0x37d438) {
              return false;
            }
            let _0x3a23bc = await _0x51c711.loadMessage(_0x5847c5, _0x37d438, _0x55f6f7);
            return exports.smsg(_0x55f6f7, _0x3a23bc, _0x51c711, _0x2005ba);
          };
          _0x890361.quoted.fakeObj = _0x370df0.fromObject({
            key: _0x890361.quoted.key,
            message: _0x890361.data.quoted,
            ...(_0x890361.isGroup ? {
              participant: _0x890361.quoted.sender
            } : {})
          });
          _0x890361.quoted.delete = async () => await _0x55f6f7.sendMessage(_0x890361.chat, {
            delete: _0x890361.quoted.key
          });
          _0x890361.quoted.download = async () => await _0x55f6f7.downloadMediaMessage(_0x890361.quoted);
          _0x890361.quoted.from = _0x890361.quoted.jid = _0x890361.quoted.key.remoteJid;
          if (_0x890361.quoted.jid === "status@broadcast") {
            _0x890361.quoted.status = true;
          }
          _0x890361.reply_text = _0x890361.quoted.text;
          _0x890361.forwardMessage = (_0x14336d = _0x890361.jid, _0x2ad1b9 = _0x890361.quoted.fakeObj, _0x50adca = false, _0x4bacb6 = {}) => _0x55f6f7.copyNForward(_0x14336d, _0x2ad1b9, _0x50adca, {
            contextInfo: {
              isForwarded: false
            }
          }, _0x4bacb6);
        }
      }
    }
    _0x890361.getMessage = async (_0x28526b = _0x890361.key, _0x940b38 = false) => {
      if (!_0x28526b || !_0x28526b.id) {
        return false;
      }
      let _0x52034d = await _0x51c711.loadMessage(_0x28526b.remoteJid || _0x890361.chat, _0x28526b.id);
      return await exports.smsg(_0x55f6f7, _0x52034d, _0x51c711, _0x940b38);
    };
    _0x890361.Suhail = _0x323068 => [...Suhail].map(_0x2612e0 => _0x2612e0.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x323068);
    _0x890361.checkBot = (_0x477bed = _0x890361.sender) => [...Suhail, _0x4ce983].map(_0x38c34b => _0x38c34b.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x477bed);
    _0x890361.download = () => _0x55f6f7.downloadMediaMessage(_0x890361.msg);
    _0x890361.text = _0x890361.body;
    _0x890361.quoted_text = _0x890361.reply_text;
    _0x890361.from = _0x890361.jid = _0x890361.chat;
    _0x890361.copy = (_0x512ce4 = _0x890361, _0x82934e = false) => {
      return exports.smsg(_0x55f6f7, _0x370df0.fromObject(_0x370df0.toObject(_0x512ce4)), _0x51c711, _0x82934e);
    };
    _0x890361.getpp = async (_0xe297d9 = _0x890361.sender) => {
      try {
        return await _0x55f6f7.profilePictureUrl(_0xe297d9, "image");
      } catch {
        return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
      }
    };
    _0x890361.removepp = (_0x91192f = botNumber) => _0x55f6f7.removeProfilePicture(_0x91192f);
    _0x890361.sendMessage = (_0x575493 = _0x890361.chat, _0xdd2117 = {}, _0x2eda74 = {
      quoted: ""
    }) => _0x55f6f7.sendMessage(_0x575493, _0xdd2117, _0x2eda74);
    _0x890361.delete = async (_0x39bc1c = _0x890361) => await _0x55f6f7.sendMessage(_0x890361.chat, {
      delete: _0x39bc1c.key
    });
    _0x890361.copyNForward = (_0x16d960 = _0x890361.chat, _0x47cb86 = _0x890361.quoted || _0x890361, _0x42bd6f = false, _0x4a9cc0 = {}) => _0x55f6f7.copyNForward(_0x16d960, _0x47cb86, _0x42bd6f, _0x4a9cc0);
    _0x890361.sticker = (_0x1f51ce, _0x4f2949 = _0x890361.chat, _0x32989d = {
      mentions: [_0x890361.sender]
    }) => _0x55f6f7.sendMessage(_0x4f2949, {
      sticker: _0x1f51ce,
      contextInfo: {
        mentionedJid: _0x32989d.mentions
      }
    }, {
      quoted: _0x890361,
      messageId: _0x55f6f7.messageId()
    });
    _0x890361.replyimg = (_0x4f4737, _0x3ad0d6, _0x14bce4 = _0x890361.chat, _0x46c8ff = {
      mentions: [_0x890361.sender]
    }) => _0x55f6f7.sendMessage(_0x14bce4, {
      image: _0x4f4737,
      caption: _0x3ad0d6,
      contextInfo: {
        mentionedJid: _0x46c8ff.mentions
      }
    }, {
      quoted: _0x890361,
      messageId: _0x55f6f7.messageId()
    });
    _0x890361.imgurl = (_0x37d925, _0x49af2d, _0x40994f = _0x890361.chat, _0x543e81 = {
      mentions: [_0x890361.sender]
    }) => _0x55f6f7.sendMessage(_0x40994f, {
      image: {
        url: _0x37d925
      },
      caption: _0x49af2d,
      ..._0x543e81
    }, {
      quoted: _0x890361,
      messageId: _0x55f6f7.messageId()
    });
    _0x890361.sendUi = async (_0x31e656 = _0x890361.chat, _0x399fdf, _0x3cfa79 = "", _0x216b1f = "", _0x4aa9fc = "") => {
      await _0x55f6f7.sendUi(_0x31e656, _0x399fdf, _0x3cfa79, _0x216b1f, _0x4aa9fc);
    };
    _0x890361.error = async (_0x43fdae, _0x2c8064 = false, _0x32618d = "*_Request not be Proceed!!_*", _0x40e33d = {
      author: "Suhail-Md"
    }, _0x518008 = false) => {
      let _0x251e2e = _0x518008 ? _0x518008 : Config.errorChat === "chat" ? _0x890361.chat : _0x890361.user;
      let _0x262772 = "*SUHAIL-Md ERROR MESSAGE!!!*\n```\nUSER: @" + _0x890361.sender.split("@")[0] + "\nNOTE: See Console for more info.\n\nERR_Message: " + _0x43fdae + "\n```";
      if (_0x32618d && Config.errorChat !== "chat" && _0x890361.chat !== botNumber) {
        await _0x55f6f7.sendMessage(_0x890361.jid, {
          text: _0x32618d
        }, {
          quoted: _0x890361,
          messageId: _0x55f6f7.messageId()
        });
      }
      console.log(_0x2c8064 ? _0x2c8064 : _0x43fdae);
      try {
        if (_0x43fdae) {
          return await _0x55f6f7.sendMessage(_0x251e2e, {
            text: _0x262772,
            ..._0x40e33d,
            mentions: [_0x890361.sender]
          }, {
            quoted: _0x890361,
            ephemeralExpiration: 259200,
            messageId: _0x55f6f7.messageId()
          });
        }
      } catch {}
    };
    _0x890361.user = botNumber;
    _0x890361.send = async (_0x55cecc, _0x17527b = {
      author: "Suhail-Md"
    }, _0x59c61e = "suhail", _0xae885b = "", _0x333952 = _0x890361.chat) => {
      if (!_0x55cecc) {
        return {};
      }
      try {
        _0x333952 = _0x333952 ? _0x333952 : _0x890361.chat;
        switch (_0x59c61e.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "txt":
          case "":
            {
              return await _0x55f6f7.sendMessage(_0x333952, {
                text: _0x55cecc,
                ..._0x17527b
              }, {
                quoted: _0xae885b,
                messageId: _0x55f6f7.messageId()
              });
            }
            break;
          case "react":
            {
              return await _0x55f6f7.sendMessage(_0x333952, {
                react: {
                  text: _0x55cecc,
                  key: (typeof _0xae885b === "object" ? _0xae885b : _0x890361).key
                }
              }, {
                messageId: _0x55f6f7.messageId()
              });
            }
            break;
          case "smdimage":
          case "smdimg":
          case "image":
          case "img":
            {
              if (Buffer.isBuffer(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  image: _0x55cecc,
                  ..._0x17527b,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              } else if (isUrl(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  image: {
                    url: _0x55cecc
                  },
                  ..._0x17527b,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              }
            }
            break;
          case "smdvideo":
          case "smdvid":
          case "video":
          case "vid":
          case "mp4":
            {
              if (Buffer.isBuffer(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  video: _0x55cecc,
                  ..._0x17527b,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              } else if (isUrl(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  video: {
                    url: _0x55cecc
                  },
                  ..._0x17527b,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              }
            }
          case "mp3":
          case "audio":
            {
              if (Buffer.isBuffer(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  audio: _0x55cecc,
                  ..._0x17527b,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              } else if (isUrl(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  audio: {
                    url: _0x55cecc
                  },
                  ..._0x17527b,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              }
            }
            break;
          case "doc":
          case "smddocument":
          case "document":
            {
              if (Buffer.isBuffer(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  document: _0x55cecc,
                  ..._0x17527b
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              } else if (isUrl(_0x55cecc)) {
                return await _0x55f6f7.sendMessage(_0x333952, {
                  document: {
                    url: _0x55cecc
                  },
                  ..._0x17527b
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              }
            }
            break;
          case "poll":
          case "pool":
            {
              return await _0x55f6f7.sendMessage(_0x333952, {
                poll: {
                  name: _0x55cecc,
                  values: [..._0x17527b.values],
                  selectableCount: 1,
                  ..._0x17527b
                },
                ..._0x17527b
              }, {
                quoted: _0xae885b,
                messageId: _0x55f6f7.messageId()
              });
            }
            break;
          case "template":
            {
              let _0x2991f2 = await generateWAMessage(_0x890361.chat, _0x55cecc, _0x17527b);
              let _0x2af975 = {
                viewOnceMessage: {
                  message: {
                    ..._0x2991f2.message
                  }
                }
              };
              return await _0x55f6f7.relayMessage(_0x890361.chat, _0x2af975, {
                messageId: _0x55f6f7.messageId()
              });
            }
            break;
          case "smdsticker":
          case "smdstc":
          case "stc":
          case "sticker":
            {
              try {
                let {
                  data: _0x831516,
                  mime: _0x5a94ec
                } = await _0x55f6f7.getFile(_0x55cecc);
                if (_0x5a94ec == "image/webp") {
                  let _0x5f3897 = await writeExifWebp(_0x831516, _0x17527b);
                  await _0x55f6f7.sendMessage(_0x333952, {
                    sticker: {
                      url: _0x5f3897
                    },
                    ..._0x17527b
                  }, {
                    quoted: _0xae885b,
                    messageId: _0x55f6f7.messageId()
                  });
                } else {
                  _0x5a94ec = await _0x5a94ec.split("/")[0];
                  if (_0x5a94ec === "video" || _0x5a94ec === "image") {
                    await _0x55f6f7.sendImageAsSticker(_0x333952, _0x55cecc, _0x17527b);
                  }
                }
              } catch (_0x42ec3b) {
                console.log("ERROR FROM SMGS SEND FUNC AS STICKER\n\t", _0x42ec3b);
                if (!Buffer.isBuffer(_0x55cecc)) {
                  _0x55cecc = await getBuffer(_0x55cecc);
                }
                const {
                  Sticker: _0x366618
                } = require("wa-sticker-formatter");
                let _0x429ecb = {
                  pack: Config.packname,
                  author: Config.author,
                  type: "full",
                  quality: 2,
                  ..._0x17527b
                };
                let _0x2e8f3f = new _0x366618(_0x55cecc, {
                  ..._0x429ecb
                });
                return await _0x55f6f7.sendMessage(_0x333952, {
                  sticker: await _0x2e8f3f.toBuffer()
                }, {
                  quoted: _0xae885b,
                  messageId: _0x55f6f7.messageId()
                });
              }
            }
            break;
        }
      } catch (_0x307c39) {
        console.log("\n\nERROR IN SMSG MESSAGE>SEND FROM SERIALIZE.JS\n\t", _0x307c39);
      }
    };
    _0x890361.sendPoll = async (_0x67616b, _0xdda882 = ["option 1", "option 2"], _0x312d9d = 1, _0x9f2fcc = _0x890361, _0x5bfec3 = _0x890361.chat) => {
      return await _0x890361.send(_0x67616b, {
        values: _0xdda882,
        selectableCount: _0x312d9d
      }, "poll", _0x9f2fcc, _0x5bfec3);
    };
    _0x890361.reply = async (_0x426876, _0x2061c8 = {}, _0x3c2b68 = "", _0xda7c44 = _0x890361, _0x52acbb = _0x890361.chat) => {
      return await _0x890361.send(_0x426876, _0x2061c8, _0x3c2b68, _0xda7c44, _0x52acbb);
    };
    _0x890361.react = (_0x43d7f8 = "🍂", _0xd713c1 = _0x890361) => {
      _0x55f6f7.sendMessage(_0x890361.chat, {
        react: {
          text: _0x43d7f8,
          key: (_0xd713c1 ? _0xd713c1 : _0x890361).key
        }
      }, {
        messageId: _0x55f6f7.messageId()
      });
    };
    _0x890361.edit = async (_0x55eb4d, _0x1fa9c5 = {}, _0x1cddb1 = "", _0x20a914 = _0x890361.chat) => {
      if (_0x1fa9c5 && !_0x1fa9c5.edit) {
        _0x1fa9c5 = {
          ..._0x1fa9c5,
          edit: (_0x890361.quoted || _0x890361).key
        };
      }
      return await _0x890361.send(_0x55eb4d, _0x1fa9c5, _0x1cddb1, "", _0x20a914);
    };
    _0x890361.senddoc = (_0x180378, _0x62664, _0x34971a = _0x890361.chat, _0xdfddfd = {
      mentions: [_0x890361.sender],
      filename: Config.ownername,
      mimetype: _0x62664,
      externalAdRepl: {
        title: Config.ownername,
        thumbnailUrl: "",
        thumbnail: log0,
        mediaType: 1,
        mediaUrl: gurl,
        sourceUrl: gurl
      }
    }) => _0x55f6f7.sendMessage(_0x34971a, {
      document: _0x180378,
      mimetype: _0xdfddfd.mimetype,
      fileName: _0xdfddfd.filename,
      contextInfo: {
        externalAdReply: _0xdfddfd.externalAdRepl,
        mentionedJid: _0xdfddfd.mentions
      }
    }, {
      quoted: _0x890361,
      messageId: _0x55f6f7.messageId()
    });
    _0x890361.sendcontact = (_0x14a936, _0x2988c5, _0x284a73) => {
      var _0x2bbbf2 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x14a936 + "\nORG:" + _0x2988c5 + ";\nTEL;type=CELL;type=VOICE;waid=" + _0x284a73 + ":+" + _0x284a73 + "\nEND:VCARD";
      return _0x55f6f7.sendMessage(_0x890361.chat, {
        contacts: {
          displayName: _0x14a936,
          contacts: [{
            vcard: _0x2bbbf2
          }]
        }
      }, {
        quoted: _0x890361,
        messageId: _0x55f6f7.messageId()
      });
    };
    _0x890361.loadMessage = async (_0x132c59 = _0x890361.key) => {
      if (!_0x132c59) {
        return false;
      }
      let _0x5ab557 = await _0x51c711.loadMessage(_0x890361.chat, _0x132c59.id, _0x55f6f7);
      return await exports.smsg(_0x55f6f7, _0x5ab557, _0x51c711, false);
    };
    if (_0x890361.mtype == "protocolMessage" && _0x890361.msg.type === "REVOKE") {
      _0x890361.getDeleted = async () => {
        let _0x3327e3 = await _0x51c711.loadMessage(_0x890361.chat, _0x890361.msg.key.id, _0x55f6f7);
        return await exports.smsg(_0x55f6f7, _0x3327e3, _0x51c711, false);
      };
    }
    _0x890361.reply_message = _0x890361.quoted;
    _0x890361.bot = _0x466aa5 ? _0x55f6f7 : {};
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      return _0x890361;
    } else {
      return {};
    }
  };
  let file = require.resolve(__filename);
  fs.watchFile(file, () => {
    console.log("Update " + __filename);
  });