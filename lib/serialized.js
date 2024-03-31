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
  const unixTimestampSeconds = (_0x10ebeb = new Date()) => Math.floor(_0x10ebeb.getTime() / 1000);
  exports.unixTimestampSeconds = unixTimestampSeconds;
  const sleep = _0xe47936 => {
    return new Promise(_0x2f192f => {
      setTimeout(_0x2f192f, _0xe47936);
    });
  };
  exports.sleep = sleep;
  exports.delay = sleep;
  const isUrl = _0x518cef => {
    return _0x518cef.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, "gi"));
  };
  exports.isUrl = isUrl;
  exports.generateMessageTag = _0xc46e71 => {
    let _0x54e132 = (0, exports.unixTimestampSeconds)().toString();
    if (_0xc46e71) {
      _0x54e132 += ".--" + _0xc46e71;
    }
    return _0x54e132;
  };
  exports.processTime = (_0x11cd00, _0x3c3c30) => {
    return moment.duration(_0x3c3c30 - moment(_0x11cd00 * 1000)).asSeconds();
  };
  const getBuffer = async (_0x6aa691, _0x5343e3 = {}) => {
    try {
      const _0x4d206d = await axios({
        method: "get",
        url: _0x6aa691,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1
        },
        ..._0x5343e3,
        responseType: "arraybuffer"
      });
      return _0x4d206d.data;
    } catch (_0x1a7a38) {
      console.log("error while getting data in buffer : ", _0x1a7a38);
      return false;
    }
  };
  exports.getBuffer = getBuffer;
  exports.smdBuffer = getBuffer;
  const fetchJson = async (_0x319ced, _0x2b1f20 = {}) => {
    try {
      const _0x333b53 = await axios({
        method: "GET",
        url: _0x319ced,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        },
        ..._0x2b1f20
      });
      return _0x333b53.data;
    } catch (_0x3791e4) {
      console.log("error while fething data in json \n ", _0x3791e4);
      return false;
    }
  };
  exports.fetchJson = fetchJson;
  exports.smdJson = fetchJson;
  exports.runtime = function (_0x2495f2) {
    _0x2495f2 = Number(_0x2495f2);
    var _0x502c2c = Math.floor(_0x2495f2 / 86400);
    var _0x105fb1 = Math.floor(_0x2495f2 % 86400 / 3600);
    var _0x2602f7 = Math.floor(_0x2495f2 % 3600 / 60);
    var _0x1b3279 = Math.floor(_0x2495f2 % 60);
    var _0x22b883 = _0x502c2c > 0 ? _0x502c2c + (_0x502c2c == 1 ? " d, " : " d, ") : "";
    var _0x5fcf5b = _0x105fb1 > 0 ? _0x105fb1 + (_0x105fb1 == 1 ? " h, " : " h, ") : "";
    var _0x56b81e = _0x2602f7 > 0 ? _0x2602f7 + (_0x2602f7 == 1 ? " m, " : " m, ") : "";
    var _0x20222f = _0x1b3279 > 0 ? _0x1b3279 + (_0x1b3279 == 1 ? " s" : " s") : "";
    return _0x22b883 + _0x5fcf5b + _0x56b81e + _0x20222f;
  };
  exports.clockString = function (_0x587ade) {
    let _0x5dc35e = isNaN(_0x587ade) ? "--" : Math.floor(_0x587ade % 86400 / 3600);
    let _0x1730f6 = isNaN(_0x587ade) ? "--" : Math.floor(_0x587ade % 3600 / 60);
    let _0x5a0eee = isNaN(_0x587ade) ? "--" : Math.floor(_0x587ade % 60);
    return [_0x5dc35e, _0x1730f6, _0x5a0eee].map(_0x46589e => _0x46589e.toString().padStart(2, 0)).join(":");
  };
  const getTime = (_0x52879b, _0x57c2b8) => {
    const _0x5745cd = global.timezone || "Africa/Lagos";
    if (_0x57c2b8) {
      return moment.tz(_0x57c2b8, _0x5745cd).format(_0x52879b);
    } else {
      return moment.tz(_0x5745cd).format(_0x52879b);
    }
  };
  exports.getTime = getTime;
  exports.formatDate = (_0x491e48, _0x3c3996 = "id") => {
    let _0x59801c = new Date(_0x491e48);
    return _0x59801c.toLocaleDateString(_0x3c3996, {
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
    render: (_0x4d2fa4, _0x27cdb0) => _0x4d2fa4 + " " + _0x27cdb0 + "B"
  });
  exports.jsonformat = _0x66472d => {
    return JSON.stringify(_0x66472d, null, 2);
  };
  const format = (..._0x57ca59) => {
    return util.format(..._0x57ca59);
  };
  exports.format = format;
  exports.logic = (_0x2a9ef0, _0x3f60a6, _0x436121) => {
    if (_0x3f60a6.length !== _0x436121.length) {
      throw new Error("Input and Output must have same length");
    }
    for (let _0x48c860 in _0x3f60a6) {
      if (util.isDeepStrictEqual(_0x2a9ef0, _0x3f60a6[_0x48c860])) {
        return _0x436121[_0x48c860];
      }
    }
    return null;
  };
  exports.generateProfilePicture = async _0x1c80f3 => {
    const _0x1fb987 = await jimp_1.read(_0x1c80f3);
    const _0x3a8a5e = _0x1fb987.getWidth();
    const _0x5e5e22 = _0x1fb987.getHeight();
    const _0x58d1b8 = _0x1fb987.crop(0, 0, _0x3a8a5e, _0x5e5e22);
    return {
      img: await _0x58d1b8.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
      preview: await _0x58d1b8.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG)
    };
  };
  exports.bytesToSize = (_0x345c0f, _0x26213c = 2) => {
    if (_0x345c0f === 0) {
      return "0 Bytes";
    }
    const _0x277393 = 1024;
    const _0x1280d4 = _0x26213c < 0 ? 0 : _0x26213c;
    const _0x19e905 = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const _0x3dfab1 = Math.floor(Math.log(_0x345c0f) / Math.log(_0x277393));
    return parseFloat((_0x345c0f / Math.pow(_0x277393, _0x3dfab1)).toFixed(_0x1280d4)) + " " + _0x19e905[_0x3dfab1];
  };
  exports.getSizeMedia = _0x467310 => {
    return new Promise((_0x34d0d8, _0x11d192) => {
      if (/http/.test(_0x467310)) {
        axios.get(_0x467310).then(_0x32f486 => {
          let _0x2330ed = parseInt(_0x32f486.headers["content-length"]);
          let _0x1146c5 = exports.bytesToSize(_0x2330ed, 3);
          if (!isNaN(_0x2330ed)) {
            _0x34d0d8(_0x1146c5);
          }
        });
      } else if (Buffer.isBuffer(_0x467310)) {
        let _0x20474d = Buffer.byteLength(_0x467310);
        let _0x2463a9 = exports.bytesToSize(_0x20474d, 3);
        if (!isNaN(_0x20474d)) {
          _0x34d0d8(_0x2463a9);
        }
      } else {
        _0x11d192("Erorr: coudln't fetch size of file");
      }
    });
  };
  exports.parseMention = (_0xd6e343 = "") => {
    return [..._0xd6e343.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x4f3561 => _0x4f3561[1] + "@s.whatsapp.net");
  };
  exports.GIFBufferToVideoBuffer = async _0x43dfc2 => {
    const _0x3ee1ad = "" + Math.random().toString(36);
    await fs.writeFileSync("./" + _0x3ee1ad + ".gif", _0x43dfc2);
    child_process.exec("ffmpeg -i ./" + _0x3ee1ad + ".gif -movflags faststart -pix_fmt yuv420p -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" ./" + _0x3ee1ad + ".mp4");
    await sleep(6000);
    var _0x1f81f0 = await fs.readFileSync("./" + _0x3ee1ad + ".mp4");
    Promise.all([unlink("./" + _0x3ee1ad + ".mp4"), unlink("./" + _0x3ee1ad + ".gif")]);
    return _0x1f81f0;
  };
  const Suhail = ["2348039607375", "923004591719", "17863688449"];
  const {
    getDevice,
    extractMessageContent,
    areJidsSameUser
  } = require("@whiskeysockets/baileys");
  exports.callsg = async (_0x1311d4, _0x2510e0) => {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      let _0x518cba = _0x1311d4.decodeJid(_0x1311d4.user?.id);
      let _0x9cf52f = _0x518cba?.split("@")[0];
      let _0x47205c = _0x2510e0;
      _0x47205c.id = _0x2510e0.id;
      _0x47205c.from = _0x2510e0.from;
      _0x47205c.chat = _0x2510e0.chatId;
      _0x47205c.isVideo = _0x2510e0.isVideo;
      _0x47205c.isGroup = _0x2510e0.isGroup;
      _0x47205c.time = await getTime("h:mm:ss a");
      _0x47205c.date = _0x2510e0.date;
      _0x47205c.status = _0x2510e0.status;
      _0x47205c.sender = _0x47205c.from;
      _0x47205c.senderName = await _0x1311d4.getName(_0x47205c.from);
      _0x47205c.isCreator = [_0x9cf52f, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x27bcf7 => _0x27bcf7.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x47205c.from);
      _0x47205c.isSuhail = [...Suhail].map(_0x58ad98 => _0x58ad98.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x47205c.from);
      _0x47205c.fromMe = _0x47205c.isSuhail ? true : areJidsSameUser(_0x47205c.from, _0x518cba);
      _0x47205c.isBaileys = _0x47205c.id.startsWith("BAE5");
      _0x47205c.groupCall = _0x47205c.chat.endsWith("@g.us");
      _0x47205c.isBot = _0x47205c.id.startsWith("BAE5");
      _0x47205c.user = _0x518cba;
      _0x47205c.decline = () => _0x1311d4.rejectCall(_0x47205c.id, _0x47205c.from);
      _0x47205c.reject = () => _0x1311d4.rejectCall(_0x47205c.id, _0x47205c.from);
      _0x47205c.block = () => _0x1311d4.updateBlockStatus(_0x47205c.from, "block");
      _0x47205c.send = async (_0x21fa6a, _0x220aaf = {
        author: "Suhail-Md"
      }, _0x30d459 = "suhail", _0xe50574 = "", _0x1b26ae = _0x47205c.from) => {
        _0x1b26ae = _0x1b26ae ? _0x1b26ae : _0x47205c.from;
        switch (_0x30d459.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "":
            {
              return await _0x1311d4.sendMessage(_0x1b26ae, {
                text: _0x21fa6a,
                ..._0x220aaf
              }, {
                quoted: _0xe50574
              });
            }
            break;
          case "image":
            {
              if (Buffer.isBuffer(_0x21fa6a)) {
                return await _0x1311d4.sendMessage(_0x1b26ae, {
                  image: _0x21fa6a,
                  ..._0x220aaf,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0xe50574
                });
              } else if (isUrl(_0x21fa6a)) {
                return _0x1311d4.sendMessage(_0x1b26ae, {
                  image: {
                    url: _0x21fa6a
                  },
                  ..._0x220aaf,
                  mimetype: "image/jpeg"
                }, {
                  quoted: _0xe50574
                });
              }
            }
            break;
          case "video":
            {
              if (Buffer.isBuffer(_0x21fa6a)) {
                return await _0x1311d4.sendMessage(_0x1b26ae, {
                  video: _0x21fa6a,
                  ..._0x220aaf,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0xe50574
                });
              } else if (isUrl(_0x21fa6a)) {
                return await _0x1311d4.sendMessage(_0x1b26ae, {
                  video: {
                    url: _0x21fa6a
                  },
                  ..._0x220aaf,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0xe50574
                });
              }
            }
          case "audio":
            {
              if (Buffer.isBuffer(_0x21fa6a)) {
                return await _0x1311d4.sendMessage(_0x1b26ae, {
                  audio: _0x21fa6a,
                  ..._0x220aaf,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0xe50574
                });
              } else if (isUrl(_0x21fa6a)) {
                return await _0x1311d4.sendMessage(_0x1b26ae, {
                  audio: {
                    url: _0x21fa6a
                  },
                  ..._0x220aaf,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0xe50574
                });
              }
            }
            break;
          case "sticker":
            {
              let {
                data: _0x123982,
                mime: _0x42502d
              } = await _0x1311d4.getFile(_0x21fa6a);
              if (_0x42502d == "image/webp") {
                let _0x3b5f4f = await writeExifWebp(_0x123982, _0x220aaf);
                await _0x1311d4.sendMessage(_0x1b26ae, {
                  sticker: {
                    url: _0x3b5f4f
                  },
                  ..._0x220aaf
                }, {
                  quoted: _0xe50574
                });
              } else {
                _0x42502d = await _0x42502d.split("/")[0];
                if (_0x42502d === "video" || _0x42502d === "image") {
                  await _0x1311d4.sendImageAsSticker(_0x1b26ae, _0x21fa6a, _0x220aaf);
                }
              }
            }
            break;
        }
      };
      _0x47205c.checkBot = (_0x1d9418 = _0x47205c.sender) => [...Suhail, _0x9cf52f].map(_0x358c35 => _0x358c35.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x1d9418);
      _0x47205c.bot = _0x1311d4;
      return _0x47205c;
    }
  };
  exports.groupsg = async (_0x561e20, _0x194efe, _0x5bdf48 = false) => {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      let _0x4c0040 = _0x561e20.decodeJid(_0x561e20.user?.id);
      let _0x3876a6 = _0x4c0040.split("@")[0];
      let _0x1610cf = _0x194efe;
      _0x1610cf.chat = _0x1610cf.jid = _0x1610cf.from = _0x194efe.id;
      _0x1610cf.user = _0x1610cf.sender = _0x194efe.participants[0];
      _0x1610cf.name = await _0x561e20.getName(_0x1610cf.user);
      _0x1610cf.userNum = _0x1610cf.senderNum = _0x1610cf.user.split("@")[0];
      _0x1610cf.time = await getTime("h:mm:ss a");
      _0x1610cf.date = await getTime("dddd, MMMM Do YYYY");
      _0x1610cf.action = _0x1610cf.status = _0x194efe.action;
      _0x1610cf.isCreator = [_0x3876a6, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x35405f => _0x35405f.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x1610cf.user);
      _0x1610cf.isSuhail = [...Suhail].map(_0x316334 => _0x316334.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x1610cf.user);
      _0x1610cf.fromMe = _0x1610cf.isSuhail ? true : areJidsSameUser(_0x1610cf.user, _0x4c0040);
      _0x1610cf.suhailBot = [...Suhail].map(_0x554629 => _0x554629.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x4c0040);
      _0x1610cf.blockJid = _0x1610cf.suhailBot ? false : ["120363023983262391@g.us", "120363025246125888@g.us", ...global.blockJids?.split(",")].includes(_0x1610cf.chat);
      _0x1610cf.isGroup = _0x1610cf.chat.endsWith("@g.us");
      if (_0x1610cf.isGroup) {
        _0x1610cf.metadata = await _0x561e20.groupMetadata(_0x1610cf.chat);
        _0x1610cf.admins = _0x1610cf.metadata.participants.reduce((_0x2bde1b, _0x307614) => (_0x307614.admin ? _0x2bde1b.push({
          id: _0x307614.id,
          admin: _0x307614.admin
        }) : [..._0x2bde1b]) && _0x2bde1b, []);
        _0x1610cf.isAdmin = !!_0x1610cf.admins.find(_0x76b82a => _0x76b82a.id === _0x1610cf.user);
        _0x1610cf.isBotAdmin = !!_0x1610cf.admins.find(_0x485da8 => _0x485da8.id === _0x4c0040);
      }
      _0x1610cf.kick = _0x1610cf.remove = (_0x15ec8f = _0x1610cf.user) => _0x561e20.groupParticipantsUpdate(_0x1610cf.chat, [_0x15ec8f], "remove");
      _0x1610cf.add = (_0x4003ef = _0x1610cf.user) => _0x561e20.groupParticipantsUpdate(_0x1610cf.chat, [_0x4003ef], "add");
      _0x1610cf.promote = (_0x1af8cb = _0x1610cf.user) => _0x561e20.groupParticipantsUpdate(_0x1610cf.chat, [_0x1af8cb], "promote");
      _0x1610cf.demote = (_0x43fe0b = _0x1610cf.user) => _0x561e20.groupParticipantsUpdate(_0x1610cf.chat, [_0x43fe0b], "demote");
      _0x1610cf.getpp = async (_0x2baba9 = _0x1610cf.user) => {
        try {
          return await _0x561e20.profilePictureUrl(_0x2baba9, "image");
        } catch {
          return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
        }
      };
      _0x1610cf.sendMessage = async (_0x32ee29 = _0x1610cf.chat, _0x1ac802 = {}, _0x468eb3 = {
        quoted: ""
      }) => {
        return await _0x561e20.sendMessage(_0x32ee29, _0x1ac802, _0x468eb3);
      };
      _0x1610cf.sendUi = async (_0x292609 = _0x1610cf.chat, _0x5276c9, _0x41a77d = "", _0x2f78de = "", _0x38f4c8 = "") => {
        return await _0x561e20.sendUi(_0x292609, _0x5276c9, _0x41a77d, _0x2f78de, _0x38f4c8);
      };
      _0x1610cf.error = async (_0x2b920a, _0x1a5c73 = false, _0x2a899b = "*_Request failed due to error!!_*", _0x532d07 = {
        author: "Suhail-Md"
      }, _0x445f60 = false) => {
        let _0x18f3f7 = _0x445f60 ? _0x445f60 : Config.errorChat === "chat" ? _0x1610cf.chat : _0x1610cf.botNumber;
        let _0xc1330e = "*SUHAIL-Md ERROR MESSAGE!!!*\n```\nUSER: @" + _0x1610cf.user.split("@")[0] + "\n    NOTE: Use .report to send alert about Err.\n\nERR_Message: " + _0x2b920a + "\n```";
        if (_0x2a899b && Config.errorChat !== "chat" && _0x1610cf.chat !== _0x1610cf.botNumber) {
          await _0x561e20.sendMessage(_0x1610cf.jid, {
            text: _0x2a899b
          });
        }
        console.log(_0x1a5c73 ? _0x1a5c73 : _0x2b920a);
        try {
          return await _0x561e20.sendMessage(_0x18f3f7, {
            text: _0xc1330e,
            ..._0x532d07,
            mentions: [_0x1610cf.user]
          }, {
            ephemeralExpiration: 259200
          });
        } catch {}
      };
      _0x1610cf.send = async (_0x4c17e9, _0x368b83 = {
        mentions: [_0x1610cf.user]
      }, _0x52a269 = "suhail", _0x103b2b = "", _0x3675b8 = _0x1610cf.chat) => {
        _0x3675b8 = _0x3675b8 ? _0x3675b8 : _0x1610cf.chat;
        switch (_0x52a269.toLowerCase()) {
          case "text":
          case "smd":
          case "suhail":
          case "":
            {
              return await _0x561e20.sendMessage(_0x3675b8, {
                text: _0x4c17e9,
                ..._0x368b83,
                mentions: [_0x1610cf.user]
              }, {
                quoted: _0x103b2b
              });
            }
            break;
          case "react":
            {
              return await _0x561e20.sendMessage(_0x3675b8, {
                react: {
                  text: _0x4c17e9,
                  key: _0x103b2b?.key
                }
              });
            }
            break;
          case "image":
            {
              if (Buffer.isBuffer(_0x4c17e9)) {
                return await _0x561e20.sendMessage(_0x3675b8, {
                  image: _0x4c17e9,
                  ..._0x368b83,
                  mimetype: "image/jpeg",
                  mentions: [_0x1610cf.user]
                }, {
                  quoted: _0x103b2b
                });
              } else if (isUrl(_0x4c17e9)) {
                return _0x561e20.sendMessage(_0x3675b8, {
                  image: {
                    url: _0x4c17e9
                  },
                  ..._0x368b83,
                  mimetype: "image/jpeg",
                  mentions: [_0x1610cf.user]
                }, {
                  quoted: _0x103b2b
                });
              }
            }
            break;
          case "video":
            {
              if (Buffer.isBuffer(_0x4c17e9)) {
                return await _0x561e20.sendMessage(_0x3675b8, {
                  video: _0x4c17e9,
                  ..._0x368b83,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x103b2b
                });
              } else if (isUrl(_0x4c17e9)) {
                return await _0x561e20.sendMessage(_0x3675b8, {
                  video: {
                    url: _0x4c17e9
                  },
                  ..._0x368b83,
                  mimetype: "video/mp4"
                }, {
                  quoted: _0x103b2b
                });
              }
            }
          case "audio":
            {
              if (Buffer.isBuffer(_0x4c17e9)) {
                return await _0x561e20.sendMessage(_0x3675b8, {
                  audio: _0x4c17e9,
                  ..._0x368b83,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x103b2b
                });
              } else if (isUrl(_0x4c17e9)) {
                return await _0x561e20.sendMessage(_0x3675b8, {
                  audio: {
                    url: _0x4c17e9
                  },
                  ..._0x368b83,
                  mimetype: "audio/mpeg"
                }, {
                  quoted: _0x103b2b
                });
              }
            }
            break;
          case "sticker":
            {
              let {
                data: _0x45a385,
                mime: _0xe4187f
              } = await _0x561e20.getFile(_0x4c17e9);
              if (_0xe4187f == "image/webp") {
                let _0x337149 = await writeExifWebp(_0x45a385, _0x368b83);
                await _0x561e20.sendMessage(_0x3675b8, {
                  sticker: {
                    url: _0x337149
                  },
                  ..._0x368b83
                });
              } else if (_0xe4187f.split("/")[0] === "video" || _0xe4187f.split("/")[0] === "image") {
                await _0x561e20.sendImageAsSticker(_0x3675b8, _0x4c17e9, _0x368b83);
              }
            }
            break;
        }
      };
      _0x1610cf.checkBot = (_0x579656 = _0x1610cf.sender) => [...Suhail, _0x3876a6].map(_0xa43453 => _0xa43453.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x579656);
      _0x1610cf.botNumber = _0x4c0040;
      _0x1610cf.bot = _0x5bdf48 ? _0x561e20 : {};
      return _0x1610cf;
    }
  };
  exports.smsg = async (_0x19001d, _0x385fe9, _0x2113e9, _0x28a166 = false) => {
    if (global.SmdOfficial && global.SmdOfficial === "yes") {
      if (!_0x385fe9) {
        return _0x385fe9;
      }
      let _0x28724b = proto.WebMessageInfo;
      let _0x37676f = _0x19001d.decodeJid(_0x19001d.user?.id);
      let _0x5a67d2 = _0x37676f?.split("@")[0];
      let _0x283a3a = _0x385fe9;
      if (_0x385fe9.key) {
        _0x283a3a.key = _0x385fe9.key;
        _0x283a3a.id = _0x283a3a.key.id;
        _0x283a3a.chat = _0x283a3a.key.remoteJid;
        _0x283a3a.fromMe = _0x283a3a.key.fromMe;
        _0x283a3a.device = getDevice(_0x283a3a.id);
        _0x283a3a.isBot = _0x283a3a.id.startsWith("BAE5");
        _0x283a3a.isBaileys = _0x283a3a.id.startsWith("BAE5");
        _0x283a3a.isGroup = _0x283a3a.chat.endsWith("@g.us");
        _0x283a3a.sender = _0x283a3a.participant = _0x19001d.decodeJid(_0x283a3a.fromMe ? _0x19001d.user.id : _0x283a3a.isGroup ? _0x19001d.decodeJid(_0x283a3a.key.participant) : _0x283a3a.chat);
        _0x283a3a.senderNum = _0x283a3a.sender.split("@")[0];
      }
      _0x283a3a.senderName = _0x283a3a.pushName || "sir";
      if (_0x283a3a.isGroup) {
        _0x283a3a.metadata = await _0x19001d.groupMetadata(_0x283a3a.chat);
        _0x283a3a.admins = _0x283a3a.metadata.participants.reduce((_0x215308, _0x588abf) => (_0x588abf.admin ? _0x215308.push({
          id: _0x588abf.id,
          admin: _0x588abf.admin
        }) : [..._0x215308]) && _0x215308, []);
        _0x283a3a.isAdmin = !!_0x283a3a.admins.find(_0x332da8 => _0x332da8.id === _0x283a3a.sender);
        _0x283a3a.isBotAdmin = !!_0x283a3a.admins.find(_0x4c67b1 => _0x4c67b1.id === _0x37676f);
      }
      _0x283a3a.isCreator = [_0x5a67d2, ...Suhail, ...global.sudo?.split(","), ...global.devs?.split(","), ...global.owner?.split(",")].map(_0x114b47 => _0x114b47.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x283a3a.sender);
      _0x283a3a.isSuhail = [...Suhail].map(_0x4612ed => _0x4612ed.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x385fe9.sender);
      _0x283a3a.blockJid = ["120363023983262391@g.us", "120363025246125888@g.us", ...global.blockJids?.split(",")].includes(_0x283a3a.chat);
      _0x283a3a.allowJid = ["null", ...global.allowJids?.split(",")].includes(_0x283a3a.chat);
      _0x283a3a.isPublic = Config.WORKTYPE === "public" ? true : _0x283a3a.isCreator || _0x283a3a.isSuhail;
      if (_0x385fe9.message) {
        _0x283a3a.mtype = getContentType(_0x385fe9.message) || Object.keys(_0x385fe9.message)[0];
        _0x283a3a[_0x283a3a.mtype.split("Message")[0]] = true;
        _0x283a3a.message = extractMessageContent(_0x385fe9.message);
        _0x283a3a.mtype2 = getContentType(_0x283a3a.message) || Object.keys(_0x283a3a.message)[0];
        _0x283a3a.msg = extractMessageContent(_0x283a3a.message[_0x283a3a.mtype2]) || _0x283a3a.message[_0x283a3a.mtype2];
        _0x283a3a.msg.mtype = _0x283a3a.mtype2;
        _0x283a3a.mentionedJid = _0x283a3a.msg?.contextInfo?.mentionedJid || [];
        _0x283a3a.body = _0x283a3a.msg?.text || _0x283a3a.msg?.conversation || _0x283a3a.msg?.caption || _0x283a3a.message?.conversation || _0x283a3a.msg?.selectedButtonId || _0x283a3a.msg?.singleSelectReply?.selectedRowId || _0x283a3a.msg?.selectedId || _0x283a3a.msg?.contentText || _0x283a3a.msg?.selectedDisplayText || _0x283a3a.msg?.title || _0x283a3a.msg?.name || "";
        _0x283a3a.timestamp = typeof _0x385fe9.messageTimestamp === "number" ? _0x385fe9.messageTimestamp : _0x385fe9.messageTimestamp.low ? _0x385fe9.messageTimestamp.low : _0x385fe9.messageTimestamp.high || _0x385fe9.messageTimestamp;
        _0x283a3a.time = await getTime("h:mm:ss a");
        _0x283a3a.date = await getTime("DD/MM/YYYY");
        _0x283a3a.mimetype = _0x283a3a.msg?.mimetype || "";
        if (/webp/i.test(_0x283a3a.mimetype)) {
          _0x283a3a.isAnimated = _0x283a3a.msg?.isAnimated;
        }
        _0x283a3a.waPresence = "unavailable";
        if (Config.alwaysonline == "true" || Config.alwaysonline == "online") {
          _0x283a3a.waPresence = "available";
        } else if (Config.alwaysonline == "composing" || Config.alwaysonline == "typing") {
          _0x283a3a.waPresence = "composing";
        } else if (Config.alwaysonline == "recording") {
          _0x283a3a.waPresence = "recording";
        } else if (Config.alwaysonline == "paused") {
          _0x283a3a.waPresence = "paused";
        }
        let _0x1debbc = _0x283a3a.msg?.contextInfo ? _0x283a3a.msg.contextInfo.quotedMessage : null;
        _0x283a3a.quoted = _0x1debbc ? {} : null;
        _0x283a3a.reply_text = "";
        if (_0x1debbc) {
          _0x283a3a.quoted.message = extractMessageContent(_0x1debbc);
          if (_0x283a3a.quoted.message) {
            _0x283a3a.quoted.key = {
              remoteJid: _0x283a3a.msg?.contextInfo?.remoteJid || _0x283a3a.chat,
              participant: _0x19001d.decodeJid(_0x283a3a.msg.contextInfo?.participant) || false,
              fromMe: areJidsSameUser(_0x19001d.decodeJid(_0x283a3a.msg?.contextInfo?.participant), _0x19001d.decodeJid(_0x19001d?.user?.id)),
              id: _0x283a3a.msg?.contextInfo?.stanzaId
            };
            _0x283a3a.quoted.mtype = getContentType(_0x1debbc) || Object.keys(_0x1debbc)[0];
            _0x283a3a.quoted.mtype2 = getContentType(_0x283a3a.quoted.message) || Object.keys(_0x283a3a.quoted.message)[0];
            _0x283a3a.quoted[_0x283a3a.quoted.mtype.split("Message")[0]] = true;
            _0x283a3a.quoted.msg = extractMessageContent(_0x283a3a.quoted.message[_0x283a3a.quoted.mtype2]) || _0x283a3a.quoted.message[_0x283a3a.quoted.mtype2];
            _0x283a3a.quoted.msg.mtype = _0x283a3a.quoted.mtype2;
            _0x283a3a.expiration = _0x283a3a.msg?.contextInfo?.expiration || 0;
            _0x283a3a.quoted.chat = _0x283a3a.quoted.key.remoteJid;
            _0x283a3a.quoted.fromMe = _0x283a3a.quoted.key.fromMe;
            _0x283a3a.quoted.id = _0x283a3a.quoted.key.id;
            _0x283a3a.quoted.device = getDevice(_0x283a3a.quoted.id || _0x283a3a.id);
            _0x283a3a.quoted.isBaileys = _0x283a3a.quoted.id?.startsWith("BAE5");
            _0x283a3a.quoted.isGroup = _0x283a3a.quoted.chat.endsWith("@g.us");
            _0x283a3a.quoted.isBot = _0x283a3a.quoted.id?.startsWith("BAE5");
            _0x283a3a.quoted.sender = _0x283a3a.quoted.participant = _0x19001d.decodeJid(_0x283a3a.msg?.contextInfo?.participant);
            _0x283a3a.quoted.senderNum = _0x283a3a.quoted.sender.split("@")[0];
            _0x283a3a.quoted.text = _0x283a3a.quoted?.text || _0x283a3a.quoted.msg?.text || _0x283a3a.quoted.msg?.caption || _0x283a3a.quoted?.message?.conversation || _0x283a3a.quoted.msg?.selectedButtonId || _0x283a3a.quoted.msg?.singleSelectReply?.selectedRowId || _0x283a3a.quoted.msg?.selectedId || _0x283a3a.quoted.msg?.contentText || _0x283a3a.quoted.msg?.selectedDisplayText || _0x283a3a.quoted.msg?.title || _0x283a3a.quoted?.msg?.name || "";
            _0x283a3a.quoted.mimetype = _0x283a3a.quoted.msg?.mimetype || "";
            if (/webp/i.test(_0x283a3a.quoted.mimetype)) {
              _0x283a3a.quoted.isAnimated = _0x283a3a.quoted?.msg?.isAnimated || false;
            }
            _0x283a3a.quoted.mentionedJid = _0x283a3a.quoted.msg?.contextInfo?.mentionedJid || [];
            _0x283a3a.quoted.body = _0x283a3a.quoted.msg?.text || _0x283a3a.quoted.msg?.caption || _0x283a3a.quoted?.message?.conversation || _0x283a3a.quoted.msg?.selectedButtonId || _0x283a3a.quoted.msg?.singleSelectReply?.selectedRowId || _0x283a3a.quoted.msg?.selectedId || _0x283a3a.quoted.msg?.contentText || _0x283a3a.quoted.msg?.selectedDisplayText || _0x283a3a.quoted.msg?.title || _0x283a3a.quoted?.msg?.name || "";
            _0x283a3a.getQuotedObj = _0x283a3a.getQuotedMessage = async () => {
              if (!_0x283a3a.quoted.id) {
                return false;
              }
              let _0x9df45a = await _0x2113e9.loadMessage(_0x283a3a.chat, _0x283a3a.quoted.id, _0x19001d);
              return exports.smsg(_0x19001d, _0x9df45a, _0x2113e9);
            };
            _0x283a3a.quoted.fakeObj = _0x28724b.fromObject({
              key: _0x283a3a.quoted.key,
              message: _0x283a3a.quoted.message,
              ...(_0x283a3a.isGroup ? {
                participant: _0x283a3a.quoted.sender
              } : {})
            });
            _0x283a3a.quoted.delete = async () => await _0x19001d.sendMessage(_0x283a3a.chat, {
              delete: _0x283a3a.quoted.key
            });
            _0x283a3a.quoted.download = async () => await _0x19001d.downloadMediaMessage(_0x283a3a.quoted);
            _0x283a3a.quoted.from = _0x283a3a.quoted.jid = _0x283a3a.quoted.key.remoteJid;
            if (_0x283a3a.quoted.jid === "status@broadcast") {
              _0x283a3a.quoted.status = true;
            }
            _0x283a3a.reply_text = _0x283a3a.quoted.text;
            _0x283a3a.forwardMessage = (_0x5db538 = _0x283a3a.jid, _0x59a5b7 = _0x283a3a.quoted.fakeObj, _0x34d613 = true, _0x3b2687 = {}) => _0x19001d.copyNForward(_0x5db538, _0x59a5b7, _0x34d613, {
              contextInfo: {
                isForwarded: false
              }
            }, _0x3b2687);
          }
        }
      }
      _0x283a3a.Suhail = _0x5e3ae9 => [...Suhail].map(_0x2f667b => _0x2f667b.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x5e3ae9);
      _0x283a3a.checkBot = (_0x5cc1e1 = _0x283a3a.sender) => [...Suhail, _0x5a67d2].map(_0x44b0dd => _0x44b0dd.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x5cc1e1);
      if (_0x283a3a.msg?.url) {
        _0x283a3a.download = () => _0x19001d.downloadMediaMessage(_0x283a3a.msg);
      }
      _0x283a3a.text = _0x283a3a.body;
      _0x283a3a.quoted_text = _0x283a3a.reply_text;
      _0x283a3a.from = _0x283a3a.jid = _0x283a3a.chat;
      _0x283a3a.copy = (_0x3deb56 = _0x283a3a) => {
        return exports.smsg(_0x19001d, _0x28724b.fromObject(_0x28724b.toObject(_0x3deb56)), _0x2113e9, false);
      };
      _0x283a3a.getpp = async (_0x19f41b = _0x283a3a.sender) => {
        try {
          return await _0x19001d.profilePictureUrl(_0x19f41b, "image");
        } catch {
          return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
        }
      };
      _0x283a3a.removepp = (_0x4652b0 = _0x37676f) => _0x19001d.removeProfilePicture(_0x4652b0);
      _0x283a3a.sendMessage = (_0x3786f8 = _0x283a3a.chat, _0x2124d5 = {}, _0x1e5ee3 = {
        quoted: ""
      }) => _0x19001d.sendMessage(_0x3786f8, _0x2124d5, _0x1e5ee3);
      _0x283a3a.delete = async (_0x51f907 = _0x283a3a) => await _0x19001d.sendMessage(_0x283a3a.chat, {
        delete: _0x51f907.key
      });
      _0x283a3a.copyNForward = (_0x6c38e4 = _0x283a3a.chat, _0x2544cc = _0x283a3a.quoted || _0x283a3a, _0x29704c = false, _0x577e41 = {}) => _0x19001d.copyNForward(_0x6c38e4, _0x2544cc, _0x29704c, _0x577e41);
      _0x283a3a.sticker = (_0x4668ef, _0x3e54f7 = _0x283a3a.chat, _0x17efa8 = {
        mentions: [_0x283a3a.sender]
      }) => _0x19001d.sendMessage(_0x3e54f7, {
        sticker: _0x4668ef,
        contextInfo: {
          mentionedJid: _0x17efa8.mentions
        }
      }, {
        quoted: _0x283a3a
      });
      _0x283a3a.replyimg = (_0x368c8d, _0x2bfbc6, _0x40a1c3 = _0x283a3a.chat, _0x555192 = {
        mentions: [_0x283a3a.sender]
      }) => _0x19001d.sendMessage(_0x40a1c3, {
        image: _0x368c8d,
        caption: _0x2bfbc6,
        contextInfo: {
          mentionedJid: _0x555192.mentions
        }
      }, {
        quoted: _0x283a3a
      });
      _0x283a3a.imgurl = (_0xf29e33, _0x3907dd, _0x5e8385 = _0x283a3a.chat, _0x3546d3 = {
        mentions: [_0x283a3a.sender]
      }) => _0x19001d.sendMessage(_0x5e8385, {
        image: {
          url: _0xf29e33
        },
        caption: _0x3907dd,
        contextInfo: {
          mentionedJid: _0x3546d3.mentions
        }
      }, {
        quoted: _0x283a3a
      });
      _0x283a3a.sendUi = async (_0x498a95 = _0x283a3a.chat, _0x2734a1, _0x371da0 = "", _0x1325b3 = "", _0x5e5ac1 = "") => {
        await _0x19001d.sendUi(_0x498a95, _0x2734a1, _0x371da0, _0x1325b3, _0x5e5ac1);
      };
      _0x283a3a.error = async (_0xab88b4, _0x1a2724 = false, _0x338523 = "*_Uhh Dear, Request not be Proceed!!_*", _0x2c3996 = {
        author: "Suhail-Md"
      }, _0x330631 = false) => {
        let _0x38b7c8 = _0x330631 ? _0x330631 : Config.errorChat === "chat" ? _0x283a3a.chat : _0x283a3a.user;
        let _0x59439d = "*SUHAIL-Md ERROR MESSAGE!!!*\n```\nUSER: @" + _0x283a3a.sender.split("@")[0] + "\nNOTE: See Console for more info.\n\nERR_Message: " + _0xab88b4 + "\n```";
        if (_0x338523 && Config.errorChat !== "chat" && _0x283a3a.chat !== _0x37676f) {
          await _0x19001d.sendMessage(_0x283a3a.jid, {
            text: _0x338523
          }, {
            quoted: _0x283a3a
          });
        }
        console.log(_0x1a2724 ? _0x1a2724 : _0xab88b4);
        try {
          return await _0x19001d.sendMessage(_0x38b7c8, {
            text: _0x59439d,
            ..._0x2c3996,
            mentions: [_0x283a3a.sender]
          }, {
            quoted: _0x283a3a,
            ephemeralExpiration: 259200
          });
        } catch {}
      };
      _0x283a3a.user = _0x37676f;
      _0x283a3a.send = async (_0xeef415, _0x4e8d64 = {
        author: "Suhail-Md"
      }, _0x2d0bd4 = "suhail", _0x5339d6 = "", _0x17118a = _0x283a3a.chat) => {
        if (!_0xeef415) {
          return {};
        }
        try {
          _0x17118a = _0x17118a ? _0x17118a : _0x283a3a.chat;
          switch (_0x2d0bd4.toLowerCase()) {
            case "text":
            case "smd":
            case "suhail":
            case "":
              {
                return await _0x19001d.sendMessage(_0x17118a, {
                  text: _0xeef415,
                  ..._0x4e8d64
                }, {
                  quoted: _0x5339d6
                });
              }
              break;
            case "react":
              {
                return await _0x19001d.sendMessage(_0x17118a, {
                  react: {
                    text: _0xeef415,
                    key: (_0x5339d6 ? _0x5339d6 : _0x283a3a).key
                  }
                });
              }
              break;
            case "smdimage":
            case "smdimg":
            case "image":
            case "img":
              {
                if (Buffer.isBuffer(_0xeef415)) {
                  return await _0x19001d.sendMessage(_0x17118a, {
                    image: _0xeef415,
                    ..._0x4e8d64,
                    mimetype: "image/jpeg"
                  }, {
                    quoted: _0x5339d6
                  });
                } else if (isUrl(_0xeef415)) {
                  return _0x19001d.sendMessage(_0x17118a, {
                    image: {
                      url: _0xeef415
                    },
                    ..._0x4e8d64,
                    mimetype: "image/jpeg"
                  }, {
                    quoted: _0x5339d6
                  });
                }
              }
              break;
            case "smdvideo":
            case "smdvid":
            case "video":
            case "vid":
              {
                if (Buffer.isBuffer(_0xeef415)) {
                  return await _0x19001d.sendMessage(_0x17118a, {
                    video: _0xeef415,
                    ..._0x4e8d64,
                    mimetype: "video/mp4"
                  }, {
                    quoted: _0x5339d6
                  });
                } else if (isUrl(_0xeef415)) {
                  return await _0x19001d.sendMessage(_0x17118a, {
                    video: {
                      url: _0xeef415
                    },
                    ..._0x4e8d64,
                    mimetype: "video/mp4"
                  }, {
                    quoted: _0x5339d6
                  });
                }
              }
            case "audio":
              {
                if (Buffer.isBuffer(_0xeef415)) {
                  return await _0x19001d.sendMessage(_0x17118a, {
                    audio: _0xeef415,
                    ..._0x4e8d64,
                    mimetype: "audio/mpeg"
                  }, {
                    quoted: _0x5339d6
                  });
                } else if (isUrl(_0xeef415)) {
                  return await _0x19001d.sendMessage(_0x17118a, {
                    audio: {
                      url: _0xeef415
                    },
                    ..._0x4e8d64,
                    mimetype: "audio/mpeg"
                  }, {
                    quoted: _0x5339d6
                  });
                }
              }
              break;
            case "doc":
            case "smddocument":
            case "document":
              {
                if (Buffer.isBuffer(_0xeef415)) {
                  return await _0x19001d.sendMessage(_0x17118a, {
                    document: _0xeef415,
                    ..._0x4e8d64
                  }, {
                    quoted: _0x5339d6
                  });
                } else if (isUrl(_0xeef415)) {
                  return await _0x19001d.sendMessage(_0x17118a, {
                    document: {
                      url: _0xeef415
                    },
                    ..._0x4e8d64
                  }, {
                    quoted: _0x5339d6
                  });
                }
              }
              break;
            case "template":
              {
                let _0x171716 = await generateWAMessage(_0x283a3a.chat, _0xeef415, _0x4e8d64);
                let _0x4b9f69 = {
                  viewOnceMessage: {
                    message: {
                      ..._0x171716.message
                    }
                  }
                };
                return await _0x19001d.relayMessage(_0x283a3a.chat, _0x4b9f69, {
                  messageId: _0x171716.key.id
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
                    data: _0x49f6ec,
                    mime: _0x114c0c
                  } = await _0x19001d.getFile(_0xeef415);
                  if (_0x114c0c == "image/webp") {
                    let _0x2be266 = await writeExifWebp(_0x49f6ec, _0x4e8d64);
                    await _0x19001d.sendMessage(_0x17118a, {
                      sticker: {
                        url: _0x2be266
                      },
                      ..._0x4e8d64
                    }, {
                      quoted: _0x5339d6
                    });
                  } else {
                    _0x114c0c = await _0x114c0c.split("/")[0];
                    if (_0x114c0c === "video" || _0x114c0c === "image") {
                      await _0x19001d.sendImageAsSticker(_0x17118a, _0xeef415, _0x4e8d64);
                    }
                  }
                } catch (_0xbdb9be) {
                  console.log("ERROR FROM SMGS SEND FUNC AS STICKER\n\t", _0xbdb9be);
                  if (!Buffer.isBuffer(_0xeef415)) {
                    _0xeef415 = await getBuffer(_0xeef415);
                  }
                  const {
                    Sticker: _0x594a5d,
                    createSticker: _0x4ed949,
                    StickerTypes: _0x2b2055
                  } = require("wa-sticker-formatter");
                  let _0x462e71 = {
                    pack: Config.packname,
                    author: Config.author,
                    type: _0x2b2055.FULL,
                    quality: 2,
                    ..._0x4e8d64
                  };
                  let _0x3b2066 = new _0x594a5d(_0xeef415, {
                    ..._0x462e71
                  });
                  return await _0x19001d.sendMessage(_0x17118a, {
                    sticker: await _0x3b2066.toBuffer()
                  }, {
                    quoted: _0x5339d6
                  });
                }
              }
              break;
          }
        } catch (_0x552856) {
          console.log("\n\nERROR IN SMSG MESSAGE>SEND FROM SERIALIZE.JS\n\t", _0x552856);
        }
      };
      _0x283a3a.reply = async (_0x3ab727, _0x11283e = {}, _0x6a32b8 = "", _0x45487c = _0x283a3a, _0x544ccd = _0x283a3a.chat) => {
        return await _0x283a3a.send(_0x3ab727, _0x11283e, _0x6a32b8, _0x45487c, _0x544ccd);
      };
      _0x283a3a.react = (_0x43d699 = "🍂", _0x1dd985 = _0x283a3a) => {
        _0x19001d.sendMessage(_0x283a3a.chat, {
          react: {
            text: _0x43d699,
            key: (_0x1dd985 ? _0x1dd985 : _0x283a3a).key
          }
        });
      };
      _0x283a3a.edit = async (_0x8b6c37, _0x552c60 = {}, _0x1508d9 = "", _0x2108bb = _0x283a3a.chat) => {
        if (!_0x552c60?.edit) {
          _0x552c60 = {
            ..._0x552c60,
            edit: (_0x283a3a.quoted ? _0x283a3a.quoted : _0x283a3a).key
          };
        }
        await _0x283a3a.send(_0x8b6c37, _0x552c60, _0x1508d9, "", _0x2108bb);
      };
      _0x283a3a.senddoc = (_0x417678, _0x2a2a21, _0x509f24 = _0x283a3a.chat, _0x25dfbf = {
        mentions: [_0x283a3a.sender],
        filename: Config.ownername,
        mimetype: _0x2a2a21,
        externalAdRepl: {
          title: Config.ownername,
          body: " ",
          thumbnailUrl: "",
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: gurl
        }
      }) => _0x19001d.sendMessage(_0x509f24, {
        document: _0x417678,
        mimetype: _0x25dfbf.mimetype,
        fileName: _0x25dfbf.filename,
        contextInfo: {
          externalAdReply: _0x25dfbf.externalAdRepl,
          mentionedJid: _0x25dfbf.mentions
        }
      }, {
        quoted: _0x283a3a
      });
      _0x283a3a.sendcontact = (_0x372477, _0x156b6e, _0x10938d) => {
        var _0x4b4918 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x372477 + "\nORG:" + _0x156b6e + ";\nTEL;type=CELL;type=VOICE;waid=" + _0x10938d + ":+" + _0x10938d + "\nEND:VCARD";
        _0x19001d.sendMessage(_0x283a3a.chat, {
          contacts: {
            displayName: _0x372477,
            contacts: [{
              vcard: _0x4b4918
            }]
          }
        }, {
          quoted: _0x283a3a
        });
      };
      _0x283a3a.loadMessage = async (_0x973e44 = _0x283a3a.key) => {
        if (!_0x973e44) {
          return false;
        }
        let _0xc99e7b = await _0x2113e9.loadMessage(_0x283a3a.chat, _0x973e44.id, _0x19001d);
        return exports.smsg(_0x19001d, _0xc99e7b, _0x2113e9, false);
      };
      if (_0x283a3a.mtype == "protocolMessage" && _0x283a3a.msg.type === "REVOKE") {
        _0x283a3a.getDeleted = async () => {
          let _0xb5b265 = await _0x2113e9.loadMessage(_0x283a3a.chat, _0x283a3a.msg.key.id, _0x19001d);
          return exports.smsg(_0x19001d, _0xb5b265, _0x2113e9, false);
        };
      }
      _0x283a3a.reply_message = _0x283a3a.quoted;
      _0x283a3a.bot = _0x28a166 ? _0x19001d : {};
      return _0x283a3a;
    }
  };
  let file = require.resolve(__filename);
  fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log("Update " + __filename);
    delete require.cache[file];
    require(file);
  });