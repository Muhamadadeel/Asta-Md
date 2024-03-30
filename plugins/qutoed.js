const moment = require("moment-timezone");
const Config = require("../config");
let {
  smd,
  prefix,
  cmd,
  parsedJid
} = require("../lib");

smd({
  pattern: "quoted",
  desc: "get reply Message from Replied Message",
  category: "user",
  filename: __filename
}, async _0x65da56 => {
  try {
    if (!_0x65da56.quoted) {
      return await _0x65da56.send("*_Uhh Dear, Reply to a Message_*");
    }
    var _0xaab596 = await _0x65da56.bot.serializeM(await _0x65da56.getQuotedObj());
    if (!_0xaab596 || !_0xaab596.quoted) {
      return await _0x65da56.replay("*Message you replied does not contain a reply Message*");
    }
    try {
      await _0x65da56.react("✨", _0x65da56);
      return await _0x65da56.bot.copyNForward(_0x65da56.chat, _0xaab596.quoted, false);
    } catch (_0x669d0c) {
      await _0x65da56.bot.forward(_0x65da56.chat, _0xaab596.quoted, {}, _0x65da56);
      console.log(_0x669d0c);
    }
  } catch (_0x358ded) {
    await _0x65da56.error(_0x358ded + "\n\ncommand : quoted", _0x358ded);
  }
});