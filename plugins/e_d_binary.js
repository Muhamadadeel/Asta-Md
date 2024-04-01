const { smd } = require("../lib/");

smd(
  {
    pattern: "ebinary",
    desc: "encode binary",
    category: "converter",
    use: "<query>",
    filename: __filename,
  },
  async (_0xf07286, _0x55ad99) => {
    try {
      let _0x567086 = _0x55ad99 ? _0x55ad99 : _0xf07286.reply_text;
      if (!_0x567086) {
        return _0xf07286.reply("*_Send text to be encoded.!_*");
      }
      let _0x3b4a39 = _0x567086
        .split("")
        .map((_0x95e2ea) => {
          return _0x95e2ea.charCodeAt(0).toString(2);
        })
        .join(" ");
      await _0xf07286.reply(_0x3b4a39);
    } catch (_0xa21c11) {
      await _0xf07286.error(_0xa21c11 + "\n\ncommand : ebinary", _0xa21c11);
    }
  }
);
smd(
  {
    pattern: "dbinary",
    desc: "decode binary",
    category: "converter",
    use: "<query>",
    filename: __filename,
  },
  async (_0x5590f0, _0x38275f) => {
    try {
      let _0xf56c22 = _0x38275f ? _0x38275f : _0x5590f0.reply_text;
      if (!_0xf56c22) {
        return _0x5590f0.reply("Send text to be decoded.");
      }
      var _0x2c621d = _0xf56c22.split(" ");
      var _0x5bbf9c = [];
      for (i = 0; i < _0x2c621d.length; i++) {
        _0x5bbf9c.push(String.fromCharCode(parseInt(_0x2c621d[i], 2)));
      }
      await _0x5590f0.reply(_0x5bbf9c.join(""));
    } catch (_0x593e2e) {
      await _0x5590f0.error(_0x593e2e + "\n\ncommand : dbinary", _0x593e2e);
    }
  }
);
