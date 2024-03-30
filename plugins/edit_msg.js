let {
  smd,
  prefix,
} = require("../lib");
const {cmd} = require("../lib/plugins");
smd({
  pattern: "edit",
  fromMe: true,
  desc: "edit message that sended by bot",
  type: "whatsapp"
}, async (_0x1afa64, _0x539d95) => {
  try {
    let _0x329b9f = _0x1afa64.reply_message && _0x1afa64.reply_message.fromMe ? _0x1afa64.reply_message : false;
    if (!_0x329b9f) {
      return await _0x1afa64.reply("_Reply to a message that sent by you!_");
    }
    if (!_0x539d95) {
      return await _0x1afa64.reply("_Need text, Example: edit hi_");
    }
    return await _0x1afa64.edit(_0x539d95, {
      edit: _0x329b9f
    });
  } catch (_0x294464) {
    await _0x1afa64.error(_0x294464 + "\n\ncommand : edit", _0x294464);
  }
});