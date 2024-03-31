const fs = require("fs");
let { prefix } = require("../lib");
const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");
const events = sᴜʜᴀɪʟ_ᴍᴅ;

const readDirectory = (_0x2ccc1f) => {
  return new Promise((_0x23d4da, _0x41ae43) => {
    fs.readdir(_0x2ccc1f, (_0x4adeb4, _0x1ec69) => {
      if (_0x4adeb4) {
        _0x41ae43("Error reading directory");
      } else {
        _0x23d4da(_0x1ec69);
      }
    });
  });
};
sᴜʜᴀɪʟ_ᴍᴅ.cmd(
  {
    pattern: "file",
    desc: "to get extact name where that command is in repo.\nSo user can edit that.",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (_0x1ec907, _0x3f7dbe) => {
    try {
      if (!_0x3f7dbe) {
        return _0x1ec907.reply("*Uhh PLease, Provide A Command/Directory*");
      }
      if (_0x3f7dbe.startsWith(".")) {
        let _0x4680aa = "*------------- FILE MANAGER -------------*\n";
        try {
          const _0x297689 = await readDirectory(_0x3f7dbe);
          _0x297689.forEach((_0x1709d6) => {
            _0x4680aa += _0x1709d6 + "\n";
          });
          await _0x1ec907.reply(_0x4680aa.toString());
        } catch (_0x311055) {
          _0x1ec907.reply(_0x311055);
        }
        return;
      }
      const { commands: _0x4f7532 } = require("../lib");
      let _0x2c8ec8 = [];
      let _0x4984d5 = _0x3f7dbe.split(" ")[0].toLowerCase().trim();
      let _0x1df566 =
        events.commands.find((_0x3d28be) => _0x3d28be.pattern === _0x4984d5) ||
        events.commands.find(
          (_0x14526a) => _0x14526a.alias && _0x14526a.alias.includes(_0x4984d5)
        );
      if (!_0x1df566) {
        return await _0x1ec907.reply("*❌No Such commands.*");
      }
      _0x2c8ec8.push("*🍁Command:* " + _0x1df566.pattern);
      if (_0x1df566.category) {
        _0x2c8ec8.push("*🧩Type:* " + _0x1df566.category);
      }
      if (_0x1df566.alias && _0x1df566.alias[0]) {
        _0x2c8ec8.push("*🧩Alias:* " + _0x1df566.alias.join(", "));
      }
      if (_0x1df566.desc) {
        _0x2c8ec8.push("*✨Description:* " + _0x1df566.desc);
      }
      if (_0x1df566.use) {
        _0x2c8ec8.push(
          "*〽️Usa:*\n ```" +
            prefix +
            _0x1df566.pattern +
            " " +
            _0x1df566.use +
            "```"
        );
      }
      if (_0x1df566.usage) {
        _0x2c8ec8.push("*〽️Usage:*\n ```" + _0x1df566.usage + "```");
      }
      if (_0x1df566.filename) {
        _0x2c8ec8.push("*✨FileName:* " + _0x1df566.filename);
      }
      try {
        if (
          _0x3f7dbe.includes("function") &&
          _0x1df566.function &&
          _0x1ec907.isSuhail &&
          _0x1df566.pattern !== "file"
        ) {
          _0x2c8ec8.push("*🧩Function:* " + _0x1df566.function.toString());
        }
      } catch {}
      await _0x1ec907.reply(_0x2c8ec8.join("\n"));
    } catch (_0xe61d1f) {
      await _0x1ec907.error(_0xe61d1f + "\nCommand:file", _0xe61d1f);
    }
  }
);
