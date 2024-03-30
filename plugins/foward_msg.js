let {
  smd,
  prefix,
  parsedJid
} = require("../lib");
const {cmd} = require("../lib/plugins");
smd({
  pattern: "forward",
  alias: ["send"],
  desc: "forward your messages in jid",
  type: "whatsapp settings"
}, async (_0x402cfa, _0x122b17) => {
  try {
    if (!_0x402cfa.reply_message) {
      return _0x402cfa.reply("*_Reply to something!_*");
    }
    let _0x363cd7 = await parsedJid(_0x122b17);
    if (!_0x363cd7 || !_0x363cd7[0]) {
      return await _0x402cfa.send("*Provide jid to forward message*\n*use _" + prefix + "jid,_ to get jid of users!*");
    }
    for (let _0x4a5ab9 = 0; _0x4a5ab9 < _0x363cd7.length; _0x4a5ab9++) {
      _0x402cfa.bot.forwardOrBroadCast(_0x363cd7[_0x4a5ab9], _0x402cfa.reply_message);
    }
  } catch (_0x3721ac) {
    await _0x402cfa.error(_0x3721ac + "\n\ncommand : forward", _0x3721ac);
  }
});