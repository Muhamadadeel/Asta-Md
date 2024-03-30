const moment = require("moment-timezone");
const Config = require("../config");
let {
  smd,
  prefix,
  cmd
} = require("../lib");
const {cmd} = require("../lib/plugins");

cmd({
  pattern: "vcard",
  desc: "Create Contact by given name.",
  category: "whatsapp",
  filename: __filename
}, async (_0xcffaeb, _0x4158fc) => {
  try {
    if (!_0xcffaeb.quoted) {
      return _0xcffaeb.reply("*Please Reply to User With Name*");
    }
    if (!_0x4158fc) {
      return _0xcffaeb.reply("Please Give Me User Name, \n *Example : " + prefix + "vcard Astropeda* ");
    }
    var _0x423556 = _0x4158fc.split(" ");
    if (_0x423556.length > 3) {
      _0x4158fc = _0x423556.slice(0, 3).join(" ");
    }
    const _0x11df4f = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x4158fc + "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" + _0xcffaeb.quoted.sender.split("@")[0] + ":+" + owner[0] + "\nEND:VCARD";
    let _0x50f316 = {
      contacts: {
        displayName: _0x4158fc,
        contacts: [{
          vcard: _0x11df4f
        }]
      }
    };
    return await _0xcffaeb.bot.sendMessage(_0xcffaeb.chat, _0x50f316, {
      quoted: _0xcffaeb
    });
  } catch (_0x429e69) {
    await _0xcffaeb.error(_0x429e69 + "\n\ncommand : vcard", _0x429e69);
  }
});