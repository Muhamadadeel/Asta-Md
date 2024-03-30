const moment = require("moment-timezone");
const Config = require("../config");
let {
  smd,
  prefix
} = require("../lib");
const {cmd} = require("../lib/plugins");
smd({
  pattern: "listgroups",
  category: "whatsapp",
  alias: "listgc",
  desc: "Finds info about all active groups",
  filename: __filename
}, async (_0x281fb2, _0x20e08d, {
  store: _0x7945b9,
  Void: _0x274b4e
}) => {
  try {
    _0x281fb2.react("🫡");
    let _0x2c5ea1 = await _0x7945b9.chats.all().filter(_0x82e0b2 => _0x82e0b2.id.endsWith("@g.us")).map(_0xd85092 => _0xd85092);
    let _0x21f6f4 = " 「  " + Config.botname + "'s group user list  」\n\nTotal " + _0x2c5ea1.length + " active Groups found!";
    for (let _0xd36fa of _0x2c5ea1) {
      let _0x433157 = await _0x274b4e.groupMetadata(_0xd36fa.id);
      _0x21f6f4 += "\n\nName : " + _0x433157.subject + " " + (_0x433157.owner ? "\nOwner : @" + _0x433157.owner.split("@")[0] : "") + "\nID : " + _0xd36fa.id + "\nMade : " + (_0x433157.creation ? moment(_0x433157.creation * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss") : _0x433157.creation) + "\nMember : " + (_0x433157.participants.length || 0) + "\n\nMessages : " + _0xd36fa.unreadCount + "\nLastchat : " + moment(_0xd36fa.conversationTimestamp * 1000).tz(timezone).format("DD/MM/YYYY HH:mm:ss");
    }
    _0x281fb2.send(_0x21f6f4, {}, "asta", _0x281fb2);
  } catch (_0x5633d6) {
    return await _0x281fb2.error(_0x5633d6 + "\n\n command: listpc", _0x5633d6, "*_Didn't get any results, Sorry!_*");
  }
});