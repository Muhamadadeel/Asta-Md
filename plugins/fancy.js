const {
  fancytext,
  listall,
  prefix,
  smd,
  Config,
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;

smd(
  {
    pattern: "fancy",
    desc: "Makes stylish/fancy given text",
    category: "converter",
    use: "56 Asta",
    filename: __filename,
  },
  async (_0x5156f4, _0x42b67c) => {
    try {
      let _0x389140 =
        "┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*💬ASTA-MD_FANCY_TEXT💬* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n " +
        (_0x42b67c
          ? "```🔢Reply the number you wants to select``` \n\n"
          : "```\t\t" +
            prefix +
            "fancy Asta(For all text)\n\t\t" +
            prefix +
            "fancy 25 Asta(For specific text)```\n\n");
      let _0x39f329 = parseInt(_0x42b67c);
      if (isNaN(_0x39f329)) {
        let _0x18c791 = _0x42b67c ? _0x42b67c : "Asta";
        listall(_0x18c791).forEach((_0x1ba2e0, _0x54474b) => {
          _0x389140 += "\n" + (_0x54474b += 1) + " " + _0x1ba2e0 + "\n";
        });
        try {
          return await _0x5156f4.send(
            _0x389140,
            {
              caption: _0x389140,
            },
            "",
            msg
          );
        } catch {
          return await _0x5156f4.reply(_0x389140);
        }
      }
      let _0x414749 = await fancytext("" + _0x42b67c.slice(2), _0x39f329);
      return await _0x5156f4.send(_0x414749, {}, "", _0x5156f4);
    } catch (_0x54f659) {
      return await _0x5156f4.error(_0x54f659 + "\n\ncmdName: fancy", _0x54f659);
    }
  }
);