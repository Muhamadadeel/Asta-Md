const Config = require("../config");
let {
  smd,
  prefix
} = require("../lib");
const {cmd} = require("../lib/plugins");
cmd({
  pattern: "location",
  desc: "Adds *readmore* in given text.",
  category: "whatsapp settings",
  filename: __filename
}, async (_0x1de930, _0x4113fc) => {
  try {
    if (!_0x4113fc) {
      return await _0x1de930.reply("*Give Coordinates To Send Location!*\n *Ex: " + prefix + "location 24.121231,55.1121221*");
    }
    let _0x1622ee = parseFloat(_0x4113fc.split(",")[0]) || "";
    let _0x4c75f7 = parseFloat(_0x4113fc.split(",")[1]) || "";
    if (!_0x1622ee || isNaN(_0x1622ee) || !_0x4c75f7 || isNaN(_0x4c75f7)) {
      return await _0x1de930.reply("*_Cordinates Not In Format, Try Again_*");
    }
    await _0x1de930.reply("*----------LOCATION------------*\n```Sending Location Of Given Data:\n Latitude: " + _0x1622ee + "\n Longitude: " + _0x4c75f7 + "```\n\n" + Config.caption);
    return await _0x1de930.sendMessage(_0x1de930.jid, {
      location: {
        degreesLatitude: _0x1622ee,
        degreesLongitude: _0x4c75f7
      }
    }, {
      quoted: _0x1de930
    });
  } catch (_0x399d05) {
    await _0x1de930.error(_0x399d05 + "\n\ncommand : location", _0x399d05);
  }
});