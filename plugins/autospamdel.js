const {
    smd,
    tlang,
    prefix,
    Config,
    sleep,
    getBuffer,
    smdJson,
    smdBuffer
  } = require("../lib");
  async function loadMessages(_0x29790e, _0x550013, _0x11f938 = "") {
    try {
      _0x11f938 = (_0x11f938 ? _0x11f938 : _0x550013).split("@")[0];
      let _0x3edb4f = await _0x29790e.loadMessages(_0x550013);
      let _0x438080 = [];
      for (let _0x10cec1 = 0; _0x10cec1 < _0x3edb4f.length; _0x10cec1++) {
        if (_0x3edb4f[_0x10cec1].key.participant?.includes(_0x11f938)) {
          _0x438080.push(_0x3edb4f[_0x10cec1]);
        }
      }
      return _0x438080;
    } catch (_0x5085fb) {
      console.log(_0x5085fb);
      return [];
    }
  }
  smd({
    pattern: "delspam",
    alias: ["dlspam"],
    category: "tech",
    desc: "delete messages of user from chat",
    use: "[ 4/ 6/ 10 ]",
    usage: "delete messages of replied/@mentioned user from chat by giving number of messages!",
    filename: __filename
  }, async (_0x4dc028, _0x422147, {
    store: _0x205c9c
  }) => {
    try {
      if (!_0x4dc028.isGroup) {
        return await _0x4dc028.send(tlang("group"));
      }
      if (!_0x4dc028.isBotAdmin) {
        return await _0x4dc028.send("I am Not Admin!");
      }
      if (!_0x4dc028.isAdmin && !_0x4dc028.isCreator) {
        return await _0x4dc028.send(tlang("admin"));
      }
      let _0x2505f5 = _0x4dc028.quoted ? _0x4dc028.quoted.senderNum : _0x4dc028.mentionedJid[0] ? _0x4dc028.mentionedJid[0] : false;
      if (!_0x2505f5) {
        return await _0x4dc028.send("*Please reply/@user to delete messages!*\n*Use '" + prefix + "delspam 5 @user' (delete 5 msgs)*");
      }
      let _0x49d301 = await loadMessages(_0x205c9c, _0x4dc028.chat, _0x2505f5);
      let _0x5b8854 = parseInt(_0x422147.split(" ")[0]) || 5;
      let _0x4e3941 = _0x49d301.length - _0x5b8854;
      for (let _0xdded2a = _0x49d301.length - 1; _0xdded2a >= _0x4e3941; _0xdded2a--) {
        try {
          if (_0x49d301[_0xdded2a]) {
            await _0x4dc028.delete(_0x49d301[_0xdded2a]);
          }
        } catch (_0x4bd6df) {}
      }
    } catch (_0x490288) {
      console.log(_0x490288);
    }
  });