let { smd } = require("../lib");

smd(
  {
    cmdname: "character",
    category: "fun",
    use: "[@user]",
    filename: __filename,
    info: "Check character of replied USER!",
  },
  async (_0x2a677e) => {
    const _0x32c078 = _0x2a677e.reply_message
      ? _0x2a677e.reply_message.sender
      : _0x2a677e.mentionedJid && _0x2a677e.mentionedJid[0]
        ? _0x2a677e.mentionedJid[0]
        : "";
    if (!_0x32c078 || !_0x32c078.includes("@")) {
      return await _0x2a677e.reply(
        "*Mention/reply user to check its character!*",
      );
    }
    const _0x5845d4 = [
      "Sigma",
      "Generous",
      "Grumpy",
      "Overconfident",
      "Obedient",
      "Good",
      "Simple",
      "Kind",
      "Patient",
      "Pervert",
      "Cool",
      "Helpful",
      "Brilliant",
      "Sexy",
      "Hot",
      "Gorgeous",
      "Cute",
      "Fabolous",
      "Funny",
    ];
    const _0x2f5d93 = _0x5845d4[Math.floor(Math.random() * _0x5845d4.length)];
    let _0x3b31ed =
      "Character of @" +
      _0x32c078.split("@")[0] +
      "  is *" +
      _0x2f5d93 +
      "* 🔥⚡";
    _0x2a677e.send(
      _0x3b31ed,
      {
        mentions: [_0x32c078],
      },
      "asta",
      _0x2a677e,
    );
  },
);