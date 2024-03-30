const {
    smd
  } = require("../lib");
  const cmd = smd;
  cmd({
    pattern: "jid",
    desc: "get jid of all user in a group.",
    category: "user",
    filename: __filename,
    use: "<@user>"
  }, async ({
    jid: _0x317d9b,
    reply: _0x355aae,
    quoted: _0x5256f4
  }) => {
    if (_0x5256f4) {
      return _0x355aae(_0x5256f4.sender);
    } else {
      return _0x355aae(_0x317d9b);
    }
  });