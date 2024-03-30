const moment = require("moment-timezone");
const Config = require("../config");
let {
  smd,
  prefix,
} = require("../lib");
const {cmd} = require("../lib/plugins");
smd({
  pattern: "listchats",
  category: "whatsapp",
  alias: ["listc", "listpc"],
  desc: "Finds info about personal chats",
  filename: __filename
}, async (_0xc7dd0, _0x22efeb, {
  store: _0x1c364d
}) => {
  try {
    _0xc7dd0.react("🫡");
    let _0x5c8d61 = await _0x1c364d.chats.all().filter(_0x3b06a8 => _0x3b06a8.id.endsWith(".net")).map(_0x21d01f => _0x21d01f);
    let _0x9ec34d = " 「  " + Config.botname + "'s pm user list  」\n\nTotal " + _0x5c8d61.length + " users are text in personal chat.";
    for (let _0x4d6030 of _0x5c8d61) {
      _0x9ec34d += "\n\nUser: @" + _0x4d6030.id.split("@")[0] + "\nMessages : " + _0x4d6030.unreadCount + "\nLastchat : " + moment(_0x4d6030.conversationTimestamp * 1000).tz(timezone).format("DD/MM/YYYY HH:mm:ss");
    }
    _0xc7dd0.bot.sendTextWithMentions(_0xc7dd0.chat, _0x9ec34d, _0xc7dd0);
  } catch (_0x5752f9) {
    return await _0xc7dd0.error(_0x5752f9 + "\n\n command: listpc", _0x5752f9, "*_Didn't get any results, Sorry!_*");
  }
});