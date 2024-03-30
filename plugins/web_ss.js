let { prefix, smd } = require("../lib");
const Config = require("../config");
smd(
  {
    cmdname: "ss",
    alias: ["webss", "fullss"],
    type: "tools",
    info: "Get Screen Shot of webpages",
  },
  async (_0x4cdec8, _0x41dfb5) => {
    try {
      let _0x587b99 = _0x41dfb5.split(" ")[0].trim();
      if (!_0x587b99) {
        return await _0x4cdec8.reply(
          "*Need URL! Use " + prefix + "ss https://github.com/Astropeda/Asta-Md"
        );
      }
      let _0x358290 = await ssweb(_0x587b99);
      if (_0x358290 && _0x358290.status == "200") {
        return await _0x4cdec8.send(
          _0x358290.result,
          {
            caption: Config.caption,
          },
          "smdimg",
          _0x4cdec8
        );
      } else {
        _0x4cdec8.send("_No responce from server!_");
      }
    } catch (_0x126b07) {
      await _0x4cdec8.error(
        _0x126b07 + "\n\ncommand : myip",
        _0x126b07,
        "*Request Denied!*"
      );
    }
  }
);
