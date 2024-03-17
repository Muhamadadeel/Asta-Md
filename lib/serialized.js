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
  } = require("../lib/exif");
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
  const unixTimestampSeconds = (_0x376ecb = new Date()) => Math.floor(_0x376ecb.getTime() / 1000);
  exports.unixTimestampSeconds = unixTimestampSeconds;
  const sleep = _0x262d8c => {
    return new Promise(_0x7d4102 => {
      setTimeout(_0x7d4102, _0x262d8c);
    });
  };
  exports.sleep = sleep;
  exports.delay = sleep;
  const isUrl = _0x25ee32 => {
    return _0x25ee32.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, "gi"));
  };
  exports.isUrl = isUrl;
  exports.generateMessageTag = _0x23552a => {
    let _0x5d54f7 = (0, exports.unixTimestampSeconds)().toString();
    if (_0x23552a) {
      _0x5d54f7 += ".--" + _0x23552a;
    }
    return _0x5d54f7;
  };
  exports.processTime = (_0x3fe89e, _0x4d0f29) => {
    return moment.duration(_0x4d0f29 - moment(_0x3fe89e * 1000)).asSeconds();
  };
  const getBuffer = async (_0x5d5040, _0x3e48f7 = {}) => {
    try {
      const _0x26be71 = await axios({
        method: "get",
        url: _0x5d5040,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1
        },
        ..._0x3e48f7,
        responseType: "arraybuffer"
      });
      return _0x26be71.data;
    } catch (_0x98d8cb) {
      console.log("error while getting data in buffer : ", _0x98d8cb);
      return false;
    }
  };
  exports.getBuffer = getBuffer;
  exports.smdBuffer = getBuffer;
  const fetchJson = async (_0xb33916, _0x3b3ea2 = {}) => {
    try {
      const _0x447516 = await axios({
        method: "GET",
        url: _0xb33916,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        },
        ..._0x3b3ea2
      });
      return _0x447516.data;
    } catch (_0x2e8c64) {
      console.log("error while fething data in json \n ", _0x2e8c64);
      return false;
    }
  };
  exports.fetchJson = fetchJson;
  exports.smdJson = fetchJson;
  exports.runtime = function (_0x457d17) {
    _0x457d17 = Number(_0x457d17);
    var _0x3d0c4e = Math.floor(_0x457d17 / 86400);
    var _0x42901c = Math.floor(_0x457d17 % 86400 / 3600);
    var _0x2a7a90 = Math.floor(_0x457d17 % 3600 / 60);
    var _0x11177a = Math.floor(_0x457d17 % 60);
    var _0x3e68d2 = _0x3d0c4e > 0 ? _0x3d0c4e + (_0x3d0c4e == 1 ? " d, " : " d, ") : "";
    var _0x295553 = _0x42901c > 0 ? _0x42901c + (_0x42901c == 1 ? " h, " : " h, ") : "";
    var _0x439bd0 = _0x2a7a90 > 0 ? _0x2a7a90 + (_0x2a7a90 == 1 ? " m, " : " m, ") : "";
    var _0x2cc3e9 = _0x11177a > 0 ? _0x11177a + (_0x11177a == 1 ? " s" : " s") : "";
    return _0x3e68d2 + _0x295553 + _0x439bd0 + _0x2cc3e9;
  };
  exports.clockString = function (_0x4f63b4) {
    let _0x29bd1f = isNaN(_0x4f63b4) ? "--" : Math.floor(_0x4f63b4 % 86400 / 3600);
    let _0x381331 = isNaN(_0x4f63b4) ? "--" : Math.floor(_0x4f63b4 % 3600 / 60);
    let _0x33d6aa = isNaN(_0x4f63b4) ? "--" : Math.floor(_0x4f63b4 % 60);
    return [_0x29bd1f, _0x381331, _0x33d6aa].map(_0x34a80e => _0x34a80e.toString().padStart(2, 0)).join(":");
  };
  const getTime = (_0x4cd3f8, _0x5d9b4a) => {
    const _0x4c3513 = global.timezone || "Africa/Lagos";
    if (_0x5d9b4a) {
      return moment.tz(_0x5d9b4a, _0x4c3513).format(_0x4cd3f8);
    } else {
      return moment.tz(_0x4c3513).format(_0x4cd3f8);
    }
  };
  exports.getTime = getTime;
  exports.formatDate = (_0x236857, _0x39c2b8 = "id") => {
    let _0x52fc17 = new Date(_0x236857);
    return _0x52fc17.toLocaleDateString(_0x39c2b8, {
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
    render: (_0x212696, _0x5285ce) => _0x212696 + " " + _0x5285ce + "B"
  });
  exports.jsonformat = _0x506469 => {
    return JSON.stringify(_0x506469, null, 2);
  };
  const format = (..._0x15e6bd) => {
    return util.format(..._0x15e6bd);
  };
  exports.format = format;
  exports.logic = (_0x44e117, _0x2e77b2, _0x313c87) => {
    if (_0x2e77b2.length !== _0x313c87.length) {
      throw new Error("Input and Output must have same length");
    }
    for (let _0x3af931 in _0x2e77b2) {
      if (util.isDeepStrictEqual(_0x44e117, _0x2e77b2[_0x3af931])) {
        return _0x313c87[_0x3af931];
      }
    }
    return null;
  };
  exports.generateProfilePicture = async _0x4653e2 => {
    const _0x584b56 = await jimp_1.read(_0x4653e2);
    const _0x325030 = _0x584b56.getWidth();
    const _0x2ec53f = _0x584b56.getHeight();
    const _0x13e5df = _0x584b56.crop(0, 0, _0x325030, _0x2ec53f);
    return {
      img: await _0x13e5df.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
      preview: await _0x13e5df.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG)
    };
  };
  exports.bytesToSize = (_0x549fcd, _0x1053bc = 2) => {
    if (_0x549fcd === 0) {
      return "0 Bytes";
    }
    const _0xb93dd8 = 1024;
    const _0x2cb3ee = _0x1053bc < 0 ? 0 : _0x1053bc;
    const _0x29416a = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const _0x5ae093 = Math.floor(Math.log(_0x549fcd) / Math.log(_0xb93dd8));
    return parseFloat((_0x549fcd / Math.pow(_0xb93dd8, _0x5ae093)).toFixed(_0x2cb3ee)) + " " + _0x29416a[_0x5ae093];
  };
  exports.getSizeMedia = _0x238163 => {
    return new Promise((_0x16f474, _0x18dd92) => {
      if (/http/.test(_0x238163)) {
        axios.get(_0x238163).then(_0x3a06d6 => {
          let _0x5f1810 = parseInt(_0x3a06d6.headers["content-length"]);
          let _0x58272f = exports.bytesToSize(_0x5f1810, 3);
          if (!isNaN(_0x5f1810)) {
            _0x16f474(_0x58272f);
          }
        });
      } else if (Buffer.isBuffer(_0x238163)) {
        let _0x53c77d = Buffer.byteLength(_0x238163);
        let _0x24b76f = exports.bytesToSize(_0x53c77d, 3);
        if (!isNaN(_0x53c77d)) {
          _0x16f474(_0x24b76f);
        }
      } else {
        _0x18dd92("Erorr: coudln't fetch size of file");
      }
    });
  };
  exports.parseMention = (_0x46213d = "") => {
    return [..._0x46213d.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x4642c0 => _0x4642c0[1] + "@s.whatsapp.net");
  };
  exports.GIFBufferToVideoBuffer = async _0x457d1e => {
    const _0x57f002 = "" + Math.random().toString(36);
    await fs.writeFileSync("./" + _0x57f002 + ".gif", _0x457d1e);
    child_process.exec("ffmpeg -i ./" + _0x57f002 + ".gif -movflags faststart -pix_fmt yuv420p -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" ./" + _0x57f002 + ".mp4");
    await sleep(6000);
    var _0x5dbd10 = await fs.readFileSync("./" + _0x57f002 + ".mp4");
    Promise.all([unlink("./" + _0x57f002 + ".mp4"), unlink("./" + _0x57f002 + ".gif")]);
    return _0x5dbd10;
  };
  const Suhail = ["2348039607375", "923004591719", "17863688449"];
  const {
    getDevice,
    extractMessageContent,
    areJidsSameUser
  } = require("@whiskeysockets/baileys");
  exports.callsg = async (_0x139ae2, _0x1dba4) => {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      let _0x5c8b9e = _0x139ae2.decodeJid(_0x139ae2.user?.id);
      let _0x5e6e57 = _0x5c8b9e?.split("@")[0];
      let _0x47dad9 = _0x1dba4;
      _0x47dad9.id = _0x1dba4.id;
      _0x47dad9.from = _0x1dba4.from;
      _0x47dad9.chat = _0x1dba4.chatId;
      _0x47dad9.isVideo = _0x1dba4.isVideo;
      _0x47dad9.isGroup = _0x1dba4.isGroup;
      _0x47dad9.time = await getTime("h:mm:ss a");
      _0x47dad9.date = _0x1dba4.date;
      _0x47dad9.status = _0x1dba4.status;
      _0x47dad9.sender = _0x47dad9.from;
      _0x47dad9.senderName = await _0x139ae2.getName(_0x47dad9.from);
      _0x47dad9.isCreator = [_0x5e6e57, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0xd10545 => _0xd10545.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x47dad9.from);
      _0x47dad9.isSuhail = [...Suhail].map(_0x538392 => _0x538392.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x47dad9.from);
      _0x47dad9.fromMe = _0x47dad9.isSuhail ? true : areJidsSameUser(_0x47dad9.from, _0x5c8b9e);
      _0x47dad9.isBaileys = _0x47dad9.id.startsWith("BAE5");
      _0x47dad9.groupCall = _0x47dad9.chat.endsWith("@g.us");
      _0x47dad9.isBot = _0x47dad9.id.startsWith("BAE5");
      _0x47dad9.user = _0x5c8b9e;
      _0x47dad9.decline = () => _0x139ae2.rejectCall(_0x47dad9.id, _0x47dad9.from);
      _0x47dad9.reject = () => _0x139ae2.rejectCall(_0x47dad9.id, _0x47dad9.from);
      _0x47dad9.block = () => _0x139ae2.updateBlockStatus(_0x47dad9.from, "block");
      _0x47dad9.send = async (_0x3c1ce2, _0x1a4e67 = {
        author: "Suhail-Md"
      }, _0x288736 = "suhail", _0x15ace7 = "", _0x28ad5c = _0x47dad9.from) => {
        _0x28ad5c = _0x28ad5c ? _0x28ad5c : _0x47dad9.from;
        switch (_0x288736.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "":
            {
              return await _0x139ae2.sendMessage(_0x28ad5c, {
                text: _0x3c1ce2,
                ..._0x1a4e67
              }, {
                quoted: _0x15ace7
              });
            }
            break;
          case "image":
            {
              if (Buffer.isBuffer(_0x3c1ce2)) {
                return await _0x139ae2.sendMessage(_0x28ad5c, {
                  image: _0x3c1ce2,
                  ..._0x1a4e67,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0x15ace7
                });
              } else if (isUrl(_0x3c1ce2)) {
                return _0x139ae2.sendMessage(_0x28ad5c, {
                  image: {
                    url: _0x3c1ce2
                  },
                  ..._0x1a4e67,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0x15ace7
                });
              }
            }
            break;
          case "video":
            {
              if (Buffer.isBuffer(_0x3c1ce2)) {
                return await _0x139ae2.sendMessage(_0x28ad5c, {
                  video: _0x3c1ce2,
                  ..._0x1a4e67,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x15ace7
                });
              } else if (isUrl(_0x3c1ce2)) {
                return await _0x139ae2.sendMessage(_0x28ad5c, {
                  video: {
                    url: _0x3c1ce2
                  },
                  ..._0x1a4e67,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x15ace7
                });
              }
            }
          case "audio":
            {
              if (Buffer.isBuffer(_0x3c1ce2)) {
                return await _0x139ae2.sendMessage(_0x28ad5c, {
                  audio: _0x3c1ce2,
                  ..._0x1a4e67,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x15ace7
                });
              } else if (isUrl(_0x3c1ce2)) {
                return await _0x139ae2.sendMessage(_0x28ad5c, {
                  audio: {
                    url: _0x3c1ce2
                  },
                  ..._0x1a4e67,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x15ace7
                });
              }
            }
            break;
          case "sticker":
            {
              let {
                data: _0x40be0f,
                mime: _0x29d99a
              } = await _0x139ae2.getFile(_0x3c1ce2);
              if (_0x29d99a == "image/webp") {
                let _0xc4ea06 = await writeExifWebp(_0x40be0f, _0x1a4e67);
                await _0x139ae2.sendMessage(_0x28ad5c, {
                  sticker: {
                    url: _0xc4ea06
                  },
                  ..._0x1a4e67
                }, {
                  quoted: _0x15ace7
                });
              } else {
                _0x29d99a = await _0x29d99a.split("/")[0];
                if (_0x29d99a === "video" || _0x29d99a === "image") {
                  await _0x139ae2.sendImageAsSticker(_0x28ad5c, _0x3c1ce2, _0x1a4e67);
                }
              }
            }
            break;
        }
      };
      _0x47dad9.checkBot = (_0x5a1e70 = _0x47dad9.sender) => [...Suhail, _0x5e6e57].map(_0x12b0b5 => _0x12b0b5.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x5a1e70);
      _0x47dad9.bot = _0x139ae2;
      return _0x47dad9;
    }
  };
  exports.groupsg = async (_0x22e33f, _0x25d176, _0x56b856 = false) => {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      let _0xafaade = _0x22e33f.decodeJid(_0x22e33f.user?.id);
      let _0x5b3e1e = _0xafaade.split("@")[0];
      let _0x7519f5 = _0x25d176;
      _0x7519f5.chat = _0x7519f5.jid = _0x7519f5.from = _0x25d176.id;
      _0x7519f5.user = _0x7519f5.sender = _0x25d176.participants[0];
      _0x7519f5.name = await _0x22e33f.getName(_0x7519f5.user);
      _0x7519f5.userNum = _0x7519f5.senderNum = _0x7519f5.user.split("@")[0];
      _0x7519f5.time = await getTime("h:mm:ss a");
      _0x7519f5.date = await getTime("dddd, MMMM Do YYYY");
      _0x7519f5.action = _0x7519f5.status = _0x25d176.action;
      _0x7519f5.isCreator = [_0x5b3e1e, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x18dace => _0x18dace.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x7519f5.user);
      _0x7519f5.isSuhail = [...Suhail].map(_0xc7fe35 => _0xc7fe35.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x7519f5.user);
      _0x7519f5.fromMe = _0x7519f5.isSuhail ? true : areJidsSameUser(_0x7519f5.user, _0xafaade);
      _0x7519f5.suhailBot = [...Suhail].map(_0x269b5c => _0x269b5c.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0xafaade);
      _0x7519f5.blockJid = _0x7519f5.suhailBot ? false : ["120363023983262391@g.us", "120363025246125888@g.us", ...global.blockJids?.split(",")].includes(_0x7519f5.chat);
      _0x7519f5.isGroup = _0x7519f5.chat.endsWith("@g.us");
      if (_0x7519f5.isGroup) {
        _0x7519f5.metadata = await _0x22e33f.groupMetadata(_0x7519f5.chat);
        _0x7519f5.admins = _0x7519f5.metadata.participants.reduce((_0x477888, _0x5112be) => (_0x5112be.admin ? _0x477888.push({
          id: _0x5112be.id,
          admin: _0x5112be.admin
        }) : [..._0x477888]) && _0x477888, []);
        _0x7519f5.isAdmin = !!_0x7519f5.admins.find(_0x2ac893 => _0x2ac893.id === _0x7519f5.user);
        _0x7519f5.isBotAdmin = !!_0x7519f5.admins.find(_0x14d8c5 => _0x14d8c5.id === _0xafaade);
      }
      _0x7519f5.kick = _0x7519f5.remove = (_0x5d3aa3 = _0x7519f5.user) => _0x22e33f.groupParticipantsUpdate(_0x7519f5.chat, [_0x5d3aa3], "remove");
      _0x7519f5.add = (_0x1be045 = _0x7519f5.user) => _0x22e33f.groupParticipantsUpdate(_0x7519f5.chat, [_0x1be045], "add");
      _0x7519f5.promote = (_0x4752b7 = _0x7519f5.user) => _0x22e33f.groupParticipantsUpdate(_0x7519f5.chat, [_0x4752b7], "promote");
      _0x7519f5.demote = (_0x559d9b = _0x7519f5.user) => _0x22e33f.groupParticipantsUpdate(_0x7519f5.chat, [_0x559d9b], "demote");
      _0x7519f5.getpp = async (_0x359e8a = _0x7519f5.user) => {
        try {
          return await _0x22e33f.profilePictureUrl(_0x359e8a, "image");
        } catch {
          return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
        }
      };
      _0x7519f5.sendMessage = async (_0x3d5ee4 = _0x7519f5.chat, _0x5bb48b = {}, _0x4b8f80 = {
        quoted: ""
      }) => {
        return await _0x22e33f.sendMessage(_0x3d5ee4, _0x5bb48b, _0x4b8f80);
      };
      _0x7519f5.sendUi = async (_0x28fb4f = _0x7519f5.chat, _0x429649, _0x315afd = "", _0x3e748c = "", _0x55ebdf = "") => {
        return await _0x22e33f.sendUi(_0x28fb4f, _0x429649, _0x315afd, _0x3e748c, _0x55ebdf);
      };
      _0x7519f5.error = async (_0x3f2b4e, _0x37dd2f = false, _0x4abf0e = "*_Request failed due to error!!_*", _0x3f23bf = {
        author: "Suhail-Md"
      }, _0x2312f1 = false) => {
        let _0x493cfa = _0x2312f1 ? _0x2312f1 : Config.errorChat === "chat" ? _0x7519f5.chat : _0x7519f5.botNumber;
        let _0x256d11 = "*SUHAIL-Md ERROR MESSAGE!!!*\n```\nUSER: @" + _0x7519f5.user.split("@")[0] + "\n    NOTE: See Console for more info.\n\nERR_Message: " + _0x3f2b4e + "\n```";
        if (_0x4abf0e && Config.errorChat !== "chat" && _0x7519f5.chat !== _0x7519f5.botNumber) {
          await _0x22e33f.sendMessage(_0x7519f5.jid, {
            text: _0x4abf0e
          });
        }
        console.log(_0x37dd2f ? _0x37dd2f : _0x3f2b4e);
        try {
          return await _0x22e33f.sendMessage(_0x493cfa, {
            text: _0x256d11,
            ..._0x3f23bf,
            mentions: [_0x7519f5.user]
          }, {
            ephemeralExpiration: 259200
          });
        } catch {}
      };
      _0x7519f5.send = async (_0x599a67, _0x2f5599 = {
        mentions: [_0x7519f5.user]
      }, _0x1416bd = "suhail", _0x4168d9 = "", _0x18476d = _0x7519f5.chat) => {
        _0x18476d = _0x18476d ? _0x18476d : _0x7519f5.chat;
        switch (_0x1416bd.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "":
            {
              return await _0x22e33f.sendMessage(_0x18476d, {
                text: _0x599a67,
                ..._0x2f5599,
                mentions: [_0x7519f5.user]
              }, {
                quoted: _0x4168d9
              });
            }
            break;
          case "react":
            {
              return await _0x22e33f.sendMessage(_0x18476d, {
                react: {
                  text: _0x599a67,
                  key: _0x4168d9?.key
                }
              });
            }
            break;
          case "image":
            {
              if (Buffer.isBuffer(_0x599a67)) {
                return await _0x22e33f.sendMessage(_0x18476d, {
                  image: _0x599a67,
                  ..._0x2f5599,
                  mimetype: "image/jpeg",
                  mentions: [_0x7519f5.user]
                }, {
                  quoted: _0x4168d9
                });
              } else if (isUrl(_0x599a67)) {
                return _0x22e33f.sendMessage(_0x18476d, {
                  image: {
                    url: _0x599a67
                  },
                  ..._0x2f5599,
                  mimetype: "image/jpeg",
                  mentions: [_0x7519f5.user]
                }, {
                  quoted: _0x4168d9
                });
              }
            }
            break;
          case "video":
            {
              if (Buffer.isBuffer(_0x599a67)) {
                return await _0x22e33f.sendMessage(_0x18476d, {
                  video: _0x599a67,
                  ..._0x2f5599,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x4168d9
                });
              } else if (isUrl(_0x599a67)) {
                return await _0x22e33f.sendMessage(_0x18476d, {
                  video: {
                    url: _0x599a67
                  },
                  ..._0x2f5599,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x4168d9
                });
              }
            }
          case "audio":
            {
              if (Buffer.isBuffer(_0x599a67)) {
                return await _0x22e33f.sendMessage(_0x18476d, {
                  audio: _0x599a67,
                  ..._0x2f5599,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x4168d9
                });
              } else if (isUrl(_0x599a67)) {
                return await _0x22e33f.sendMessage(_0x18476d, {
                  audio: {
                    url: _0x599a67
                  },
                  ..._0x2f5599,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x4168d9
                });
              }
            }
            break;
          case "sticker":
            {
              let {
                data: _0x4811f7,
                mime: _0x3be843
              } = await _0x22e33f.getFile(_0x599a67);
              if (_0x3be843 == "image/webp") {
                let _0x38d470 = await writeExifWebp(_0x4811f7, _0x2f5599);
                await _0x22e33f.sendMessage(_0x18476d, {
                  sticker: {
                    url: _0x38d470
                  },
                  ..._0x2f5599
                });
              } else if (_0x3be843.split("/")[0] === "video" || _0x3be843.split("/")[0] === "image") {
                await _0x22e33f.sendImageAsSticker(_0x18476d, _0x599a67, _0x2f5599);
              }
            }
            break;
        }
      };
      _0x7519f5.checkBot = (_0x402a96 = _0x7519f5.sender) => [...Suhail, _0x5b3e1e].map(_0x24c0d3 => _0x24c0d3.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x402a96);
      _0x7519f5.botNumber = _0xafaade;
      _0x7519f5.bot = _0x56b856 ? _0x22e33f : {};
      return _0x7519f5;
    }
  };
  exports.smsg = async (_0x26e1e3, _0x5203f6, _0x624406, _0xea1f73 = false) => {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      if (!_0x5203f6) {
        return _0x5203f6;
      }
      let _0x2179b0 = proto.WebMessageInfo;
      let _0x1a61f7 = _0x26e1e3.decodeJid(_0x26e1e3.user?.id);
      let _0x4e51aa = _0x1a61f7?.split("@")[0];
      let _0x3aae0f = _0x5203f6;
      if (_0x5203f6.key) {
        _0x3aae0f.key = _0x5203f6.key;
        _0x3aae0f.id = _0x3aae0f.key.id;
        _0x3aae0f.chat = _0x3aae0f.key.remoteJid;
        _0x3aae0f.fromMe = _0x3aae0f.key.fromMe;
        _0x3aae0f.device = getDevice(_0x3aae0f.id);
        _0x3aae0f.isBot = _0x3aae0f.id.startsWith("BAE5");
        _0x3aae0f.isBaileys = _0x3aae0f.id.startsWith("BAE5");
        _0x3aae0f.isGroup = _0x3aae0f.chat.endsWith("@g.us");
        _0x3aae0f.sender = _0x3aae0f.participant = _0x26e1e3.decodeJid(_0x3aae0f.fromMe ? _0x26e1e3.user.id : _0x3aae0f.isGroup ? _0x26e1e3.decodeJid(_0x3aae0f.key.participant) : _0x3aae0f.chat);
        _0x3aae0f.senderNum = _0x3aae0f.sender.split("@")[0];
      }
      _0x3aae0f.senderName = _0x3aae0f.pushName || "sir";
      if (_0x3aae0f.isGroup) {
        _0x3aae0f.metadata = await _0x26e1e3.groupMetadata(_0x3aae0f.chat);
        _0x3aae0f.admins = _0x3aae0f.metadata.participants.reduce((_0x4a1669, _0x34d18f) => (_0x34d18f.admin ? _0x4a1669.push({
          id: _0x34d18f.id,
          admin: _0x34d18f.admin
        }) : [..._0x4a1669]) && _0x4a1669, []);
        _0x3aae0f.isAdmin = !!_0x3aae0f.admins.find(_0x294c5f => _0x294c5f.id === _0x3aae0f.sender);
        _0x3aae0f.isBotAdmin = !!_0x3aae0f.admins.find(_0x578d03 => _0x578d03.id === _0x1a61f7);
      }
      _0x3aae0f.isCreator = [_0x4e51aa, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x4a454a => _0x4a454a.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x3aae0f.sender);
      _0x3aae0f.isSuhail = [...Suhail].map(_0x4f528c => _0x4f528c.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x5203f6.sender);
      _0x3aae0f.blockJid = ["120363023983262391@g.us", "120363025246125888@g.us", ...global.blockJids?.split(",")].includes(_0x3aae0f.chat);
      _0x3aae0f.allowJid = ["null", ...global.allowJids?.split(",")].includes(_0x3aae0f.chat);
      if (_0x5203f6.message) {
        _0x3aae0f.mtype = getContentType(_0x5203f6.message) || Object.keys(_0x5203f6.message)[0];
        _0x3aae0f[_0x3aae0f.mtype.split("Message")[0]] = true;
        _0x3aae0f.message = extractMessageContent(_0x5203f6.message);
        _0x3aae0f.mtype2 = getContentType(_0x3aae0f.message) || Object.keys(_0x3aae0f.message)[0];
        _0x3aae0f.msg = extractMessageContent(_0x3aae0f.message[_0x3aae0f.mtype2]) || _0x3aae0f.message[_0x3aae0f.mtype2];
        _0x3aae0f.msg.mtype = _0x3aae0f.mtype2;
        _0x3aae0f.mentionedJid = _0x3aae0f.msg?.contextInfo?.mentionedJid || [];
        _0x3aae0f.body = _0x3aae0f.msg?.text || _0x3aae0f.msg?.conversation || _0x3aae0f.msg?.caption || _0x3aae0f.message?.conversation || _0x3aae0f.msg?.selectedButtonId || _0x3aae0f.msg?.singleSelectReply?.selectedRowId || _0x3aae0f.msg?.selectedId || _0x3aae0f.msg?.contentText || _0x3aae0f.msg?.selectedDisplayText || _0x3aae0f.msg?.title || _0x3aae0f.msg?.name || "";
        _0x3aae0f.timestamp = typeof _0x5203f6.messageTimestamp === "number" ? _0x5203f6.messageTimestamp : _0x5203f6.messageTimestamp.low ? _0x5203f6.messageTimestamp.low : _0x5203f6.messageTimestamp.high || _0x5203f6.messageTimestamp;
        _0x3aae0f.time = await getTime("h:mm:ss a");
        _0x3aae0f.date = await getTime("DD/MM/YYYY");
        _0x3aae0f.mimetype = _0x3aae0f.msg?.mimetype || "";
        if (/webp/i.test(_0x3aae0f.mimetype)) {
          _0x3aae0f.isAnimated = _0x3aae0f.msg?.isAnimated;
        }
        _0x3aae0f.waPresence = "unavailable";
        if (Config.alwaysonline == "true" || Config.alwaysonline == "online") {
          _0x3aae0f.waPresence = "available";
        } else if (Config.alwaysonline == "composing" || Config.alwaysonline == "typing") {
          _0x3aae0f.waPresence = "composing";
        } else if (Config.alwaysonline == "recording") {
          _0x3aae0f.waPresence = "recording";
        } else if (Config.alwaysonline == "paused") {
          _0x3aae0f.waPresence = "paused";
        }
        let _0x58af30 = _0x3aae0f.msg?.contextInfo ? _0x3aae0f.msg.contextInfo.quotedMessage : null;
        _0x3aae0f.quoted = _0x58af30 ? {} : null;
        _0x3aae0f.reply_text = "";
        if (_0x58af30) {
          _0x3aae0f.quoted.message = extractMessageContent(_0x58af30);
          if (_0x3aae0f.quoted.message) {
            _0x3aae0f.quoted.key = {
              remoteJid: _0x3aae0f.msg?.contextInfo?.remoteJid || _0x3aae0f.chat,
              participant: _0x26e1e3.decodeJid(_0x3aae0f.msg.contextInfo?.participant) || false,
              fromMe: areJidsSameUser(_0x26e1e3.decodeJid(_0x3aae0f.msg?.contextInfo?.participant), _0x26e1e3.decodeJid(_0x26e1e3?.user?.id)),
              id: _0x3aae0f.msg?.contextInfo?.stanzaId
            };
            _0x3aae0f.quoted.mtype = getContentType(_0x58af30) || Object.keys(_0x58af30)[0];
            _0x3aae0f.quoted.mtype2 = getContentType(_0x3aae0f.quoted.message) || Object.keys(_0x3aae0f.quoted.message)[0];
            _0x3aae0f.quoted[_0x3aae0f.quoted.mtype.split("Message")[0]] = true;
            _0x3aae0f.quoted.msg = extractMessageContent(_0x3aae0f.quoted.message[_0x3aae0f.quoted.mtype2]) || _0x3aae0f.quoted.message[_0x3aae0f.quoted.mtype2];
            _0x3aae0f.quoted.msg.mtype = _0x3aae0f.quoted.mtype2;
            _0x3aae0f.expiration = _0x3aae0f.msg?.contextInfo?.expiration || 0;
            _0x3aae0f.quoted.chat = _0x3aae0f.quoted.key.remoteJid;
            _0x3aae0f.quoted.fromMe = _0x3aae0f.quoted.key.fromMe;
            _0x3aae0f.quoted.id = _0x3aae0f.quoted.key.id;
            _0x3aae0f.quoted.device = getDevice(_0x3aae0f.quoted.id || _0x3aae0f.id);
            _0x3aae0f.quoted.isBaileys = _0x3aae0f.quoted.id?.startsWith("BAE5");
            _0x3aae0f.quoted.isGroup = _0x3aae0f.quoted.chat.endsWith("@g.us");
            _0x3aae0f.quoted.isBot = _0x3aae0f.quoted.id?.startsWith("BAE5");
            _0x3aae0f.quoted.sender = _0x3aae0f.quoted.participant = _0x26e1e3.decodeJid(_0x3aae0f.msg?.contextInfo?.participant);
            _0x3aae0f.quoted.senderNum = _0x3aae0f.quoted.sender.split("@")[0];
            _0x3aae0f.quoted.text = _0x3aae0f.quoted?.text || _0x3aae0f.quoted.msg?.text || _0x3aae0f.quoted.msg?.caption || _0x3aae0f.quoted?.message?.conversation || _0x3aae0f.quoted.msg?.selectedButtonId || _0x3aae0f.quoted.msg?.singleSelectReply?.selectedRowId || _0x3aae0f.quoted.msg?.selectedId || _0x3aae0f.quoted.msg?.contentText || _0x3aae0f.quoted.msg?.selectedDisplayText || _0x3aae0f.quoted.msg?.title || _0x3aae0f.quoted?.msg?.name || "";
            _0x3aae0f.quoted.mimetype = _0x3aae0f.quoted.msg?.mimetype || "";
            if (/webp/i.test(_0x3aae0f.quoted.mimetype)) {
              _0x3aae0f.quoted.isAnimated = _0x3aae0f.quoted?.msg?.isAnimated || false;
            }
            _0x3aae0f.quoted.mentionedJid = _0x3aae0f.quoted.msg?.contextInfo?.mentionedJid || [];
            _0x3aae0f.quoted.body = _0x3aae0f.quoted.msg?.text || _0x3aae0f.quoted.msg?.caption || _0x3aae0f.quoted?.message?.conversation || _0x3aae0f.quoted.msg?.selectedButtonId || _0x3aae0f.quoted.msg?.singleSelectReply?.selectedRowId || _0x3aae0f.quoted.msg?.selectedId || _0x3aae0f.quoted.msg?.contentText || _0x3aae0f.quoted.msg?.selectedDisplayText || _0x3aae0f.quoted.msg?.title || _0x3aae0f.quoted?.msg?.name || "";
            _0x3aae0f.getQuotedObj = _0x3aae0f.getQuotedMessage = async () => {
              if (!_0x3aae0f.quoted.id) {
                return false;
              }
              let _0x53a489 = await _0x624406.loadMessage(_0x3aae0f.chat, _0x3aae0f.quoted.id, _0x26e1e3);
              return exports.smsg(_0x26e1e3, _0x53a489, _0x624406);
            };
            _0x3aae0f.quoted.fakeObj = _0x2179b0.fromObject({
              key: _0x3aae0f.quoted.key,
              message: _0x3aae0f.quoted.message,
              ...(_0x3aae0f.isGroup ? {
                participant: _0x3aae0f.quoted.sender
              } : {})
            });
            _0x3aae0f.quoted.delete = async () => await _0x26e1e3.sendMessage(_0x3aae0f.chat, {
              delete: _0x3aae0f.quoted.key
            });
            _0x3aae0f.quoted.download = async () => await _0x26e1e3.downloadMediaMessage(_0x3aae0f.quoted);
            _0x3aae0f.quoted.from = _0x3aae0f.quoted.jid = _0x3aae0f.quoted.key.remoteJid;
            if (_0x3aae0f.quoted.jid === "status@broadcast") {
              _0x3aae0f.quoted.status = true;
            }
            _0x3aae0f.reply_text = _0x3aae0f.quoted.text;
            _0x3aae0f.forwardMessage = (_0x51907f = _0x3aae0f.jid, _0x1cd3fb = _0x3aae0f.quoted.fakeObj, _0x1a32b9 = true, _0x2dda0b = {}) => _0x26e1e3.copyNForward(_0x51907f, _0x1cd3fb, _0x1a32b9, {
              contextInfo: {
                isForwarded: false
              }
            }, _0x2dda0b);
          }
        }
      }
      _0x3aae0f.Suhail = _0x2e17ee => [...Suhail].map(_0x2d592d => _0x2d592d.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x2e17ee);
      _0x3aae0f.checkBot = (_0x3697f1 = _0x3aae0f.sender) => [...Suhail, _0x4e51aa].map(_0x2332ce => _0x2332ce.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x3697f1);
      if (_0x3aae0f.msg?.url) {
        _0x3aae0f.download = () => _0x26e1e3.downloadMediaMessage(_0x3aae0f.msg);
      }
      _0x3aae0f.text = _0x3aae0f.body;
      _0x3aae0f.quoted_text = _0x3aae0f.reply_text;
      _0x3aae0f.from = _0x3aae0f.jid = _0x3aae0f.chat;
      _0x3aae0f.copy = (_0x39bbd2 = _0x3aae0f) => {
        return exports.smsg(_0x26e1e3, _0x2179b0.fromObject(_0x2179b0.toObject(_0x39bbd2)), _0x624406, false);
      };
      _0x3aae0f.getpp = async (_0x1b7996 = _0x3aae0f.sender) => {
        try {
          return await _0x26e1e3.profilePictureUrl(_0x1b7996, "image");
        } catch {
          return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
        }
      };
      _0x3aae0f.removepp = (_0x483ea8 = _0x1a61f7) => _0x26e1e3.removeProfilePicture(_0x483ea8);
      _0x3aae0f.sendMessage = (_0x432296 = _0x3aae0f.chat, _0xa22493 = {}, _0x2d60c0 = {
        quoted: ""
      }) => _0x26e1e3.sendMessage(_0x432296, _0xa22493, _0x2d60c0);
      _0x3aae0f.delete = async (_0x4aa235 = _0x3aae0f) => await _0x26e1e3.sendMessage(_0x3aae0f.chat, {
        delete: _0x4aa235.key
      });
      _0x3aae0f.copyNForward = (_0x34516b = _0x3aae0f.chat, _0xfa0ecb = _0x3aae0f.quoted || _0x3aae0f, _0x364f38 = false, _0x2c68fc = {}) => _0x26e1e3.copyNForward(_0x34516b, _0xfa0ecb, _0x364f38, _0x2c68fc);
      _0x3aae0f.sticker = (_0x1810e5, _0x4535b9 = _0x3aae0f.chat, _0x3f6a36 = {
        mentions: [_0x3aae0f.sender]
      }) => _0x26e1e3.sendMessage(_0x4535b9, {
        sticker: _0x1810e5,
        contextInfo: {
          mentionedJid: _0x3f6a36.mentions
        }
      }, {
        quoted: _0x3aae0f
      });
      _0x3aae0f.replyimg = (_0x583822, _0x32ca44, _0x45f93c = _0x3aae0f.chat, _0x1e6ec4 = {
        mentions: [_0x3aae0f.sender]
      }) => _0x26e1e3.sendMessage(_0x45f93c, {
        image: _0x583822,
        caption: _0x32ca44,
        contextInfo: {
          mentionedJid: _0x1e6ec4.mentions
        }
      }, {
        quoted: _0x3aae0f
      });
      _0x3aae0f.imgurl = (_0x3eb60a, _0x12f49a, _0x97e4c6 = _0x3aae0f.chat, _0x5c0e51 = {
        mentions: [_0x3aae0f.sender]
      }) => _0x26e1e3.sendMessage(_0x97e4c6, {
        image: {
          url: _0x3eb60a
        },
        caption: _0x12f49a,
        contextInfo: {
          mentionedJid: _0x5c0e51.mentions
        }
      }, {
        quoted: _0x3aae0f
      });
      _0x3aae0f.sendUi = async (_0x1df22c = _0x3aae0f.chat, _0x37de1e, _0x47edd7 = "", _0x558fb2 = "", _0x2689b9 = "") => {
        await _0x26e1e3.sendUi(_0x1df22c, _0x37de1e, _0x47edd7, _0x558fb2, _0x2689b9);
      };
      _0x3aae0f.error = async (_0x334e43, _0x3e3770 = false, _0x1a78c3 = "*_Uhh Dear, Request not be Proceed!!_*", _0x48182d = {
        author: "Suhail-Md"
      }, _0x493a7e = false) => {
        let _0x5a2025 = _0x493a7e ? _0x493a7e : Config.errorChat === "chat" ? _0x3aae0f.chat : _0x3aae0f.user;
        let _0x26f797 = "*SUHAIL-Md ERROR MESSAGE!!!*\n```\nUSER: @" + _0x3aae0f.sender.split("@")[0] + "\nNOTE: See Console for more info.\n\nERR_Message: " + _0x334e43 + "\n```";
        if (_0x1a78c3 && Config.errorChat !== "chat" && _0x3aae0f.chat !== _0x1a61f7) {
          await _0x26e1e3.sendMessage(_0x3aae0f.jid, {
            text: _0x1a78c3
          }, {
            quoted: _0x3aae0f
          });
        }
        console.log(_0x3e3770 ? _0x3e3770 : _0x334e43);
        try {
          return await _0x26e1e3.sendMessage(_0x5a2025, {
            text: _0x26f797,
            ..._0x48182d,
            mentions: [_0x3aae0f.sender]
          }, {
            quoted: _0x3aae0f,
            ephemeralExpiration: 259200
          });
        } catch {}
      };
      _0x3aae0f.user = _0x1a61f7;
      _0x3aae0f.send = async (_0x7e724b, _0x3ea99d = {
        author: "Suhail-Md"
      }, _0x452019 = "suhail", _0x310448 = "", _0x17908b = _0x3aae0f.chat) => {
        if (!_0x7e724b) {
          return {};
        }
        _0x17908b = _0x17908b ? _0x17908b : _0x3aae0f.chat;
        switch (_0x452019.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "":
            {
              return await _0x26e1e3.sendMessage(_0x17908b, {
                text: _0x7e724b,
                ..._0x3ea99d
              }, {
                quoted: _0x310448
              });
            }
            break;
          case "react":
            {
              return await _0x26e1e3.sendMessage(_0x17908b, {
                react: {
                  text: _0x7e724b,
                  key: (_0x310448 ? _0x310448 : _0x3aae0f).key
                }
              });
            }
            break;
          case "image":
            {
              if (Buffer.isBuffer(_0x7e724b)) {
                return await _0x26e1e3.sendMessage(_0x17908b, {
                  image: _0x7e724b,
                  ..._0x3ea99d,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0x310448
                });
              } else if (isUrl(_0x7e724b)) {
                return _0x26e1e3.sendMessage(_0x17908b, {
                  image: {
                    url: _0x7e724b
                  },
                  ..._0x3ea99d,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0x310448
                });
              }
            }
            break;
          case "video":
            {
              if (Buffer.isBuffer(_0x7e724b)) {
                return await _0x26e1e3.sendMessage(_0x17908b, {
                  video: _0x7e724b,
                  ..._0x3ea99d,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x310448
                });
              } else if (isUrl(_0x7e724b)) {
                return await _0x26e1e3.sendMessage(_0x17908b, {
                  video: {
                    url: _0x7e724b
                  },
                  ..._0x3ea99d,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x310448
                });
              }
            }
          case "audio":
            {
              if (Buffer.isBuffer(_0x7e724b)) {
                return await _0x26e1e3.sendMessage(_0x17908b, {
                  audio: _0x7e724b,
                  ..._0x3ea99d,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x310448
                });
              } else if (isUrl(_0x7e724b)) {
                return await _0x26e1e3.sendMessage(_0x17908b, {
                  audio: {
                    url: _0x7e724b
                  },
                  ..._0x3ea99d,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x310448
                });
              }
            }
            break;
          case "template":
            let _0x2c33b0 = await generateWAMessage(_0x3aae0f.chat, _0x7e724b, _0x3ea99d);
            let _0xcee625 = {
              viewOnceMessage: {
                message: {
                  ..._0x2c33b0.message
                }
              }
            };
            await _0x26e1e3.relayMessage(_0x3aae0f.chat, _0xcee625, {
              messageId: _0x2c33b0.key.id
            });
            break;
          case "sticker":
            {
              let {
                data: _0x4797b5,
                mime: _0x2d9637
              } = await _0x26e1e3.getFile(_0x7e724b);
              if (_0x2d9637 == "image/webp") {
                let _0x1103e0 = await writeExifWebp(_0x4797b5, _0x3ea99d);
                await _0x26e1e3.sendMessage(_0x17908b, {
                  sticker: {
                    url: _0x1103e0
                  },
                  ..._0x3ea99d
                }, {
                  quoted: _0x310448
                });
              } else {
                _0x2d9637 = await _0x2d9637.split("/")[0];
                if (_0x2d9637 === "video" || _0x2d9637 === "image") {
                  await _0x26e1e3.sendImageAsSticker(_0x17908b, _0x7e724b, _0x3ea99d);
                }
              }
            }
            break;
        }
      };
      _0x3aae0f.reply = async (_0x33da59, _0x386b95 = {}, _0x5b80f7 = "", _0x5dd214 = _0x3aae0f, _0x58328a = _0x3aae0f.chat) => {
        return await _0x3aae0f.send(_0x33da59, _0x386b95, _0x5b80f7, _0x5dd214, _0x58328a);
      };
      _0x3aae0f.react = (_0x2a31ec = "🍂", _0x3c854d = _0x3aae0f) => {
        _0x26e1e3.sendMessage(_0x3aae0f.chat, {
          react: {
            text: _0x2a31ec,
            key: (_0x3c854d ? _0x3c854d : _0x3aae0f).key
          }
        });
      };
      _0x3aae0f.edit = async (_0x356d89, _0x2c8826 = {}, _0x1cabbc = "", _0x1545b4 = _0x3aae0f.chat) => {
        if (!_0x2c8826?.edit) {
          _0x2c8826 = {
            ..._0x2c8826,
            edit: (_0x3aae0f.quoted ? _0x3aae0f.quoted : _0x3aae0f).key
          };
        }
        await _0x3aae0f.send(_0x356d89, _0x2c8826, _0x1cabbc, "", _0x1545b4);
      };
      _0x3aae0f.senddoc = (_0x3904a3, _0x3c9f19, _0x3f0907 = _0x3aae0f.chat, _0x2724d5 = {
        mentions: [_0x3aae0f.sender],
        filename: Config.ownername,
        mimetype: _0x3c9f19,
        externalAdRepl: {
          title: Config.ownername,
          body: " ",
          thumbnailUrl: "",
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: gurl
        }
      }) => _0x26e1e3.sendMessage(_0x3f0907, {
        document: _0x3904a3,
        mimetype: _0x2724d5.mimetype,
        fileName: _0x2724d5.filename,
        contextInfo: {
          externalAdReply: _0x2724d5.externalAdRepl,
          mentionedJid: _0x2724d5.mentions
        }
      }, {
        quoted: _0x3aae0f
      });
      _0x3aae0f.sendcontact = (_0x4fa3bd, _0xe43664, _0x2ff07a) => {
        var _0x44e332 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x4fa3bd + "\nORG:" + _0xe43664 + ";\nTEL;type=CELL;type=VOICE;waid=" + _0x2ff07a + ":+" + _0x2ff07a + "\nEND:VCARD";
        _0x26e1e3.sendMessage(_0x3aae0f.chat, {
          contacts: {
            displayName: _0x4fa3bd,
            contacts: [{
              vcard: _0x44e332
            }]
          }
        }, {
          quoted: _0x3aae0f
        });
      };
      _0x3aae0f.loadMessage = async (_0x10d327 = _0x3aae0f.key) => {
        if (!_0x10d327) {
          return false;
        }
        let _0x4dbd60 = await _0x624406.loadMessage(_0x3aae0f.chat, _0x10d327.id, _0x26e1e3);
        return exports.smsg(_0x26e1e3, _0x4dbd60, _0x624406, false);
      };
      if (_0x3aae0f.mtype == "protocolMessage" && _0x3aae0f.msg.type === "REVOKE") {
        _0x3aae0f.getDeleted = async () => {
          let _0x1e4841 = await _0x624406.loadMessage(_0x3aae0f.chat, _0x3aae0f.msg.key.id, _0x26e1e3);
          return exports.smsg(_0x26e1e3, _0x1e4841, _0x624406, false);
        };
      }
      _0x3aae0f.reply_message = _0x3aae0f.quoted;
      _0x3aae0f.bot = _0xea1f73 ? _0x26e1e3 : {};
      return _0x3aae0f;
    }
  };
  let file = require.resolve(__filename);
  fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log("Update " + __filename);
    delete require.cache[file];
    require(file);
  });