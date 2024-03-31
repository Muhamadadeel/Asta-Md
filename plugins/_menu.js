const os = require("os");
const Config = require("../config");
let { fancytext, tlang, tiny, runtime, formatp, prefix } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");

sᴜʜᴀɪʟ_ᴍᴅ.cmd(
  {
    cmdname: "menu",
    desc: "Help list",
    type: "user",
    filename: __filename,
  },
  async (_0xd2266a, _0x54954a) => {
    try {
      const { commands: _0x4f1da9 } = require("../lib");
      if (_0x54954a.split(" ")[0]) {
        let _0x35206d = [];
        const _0xd17d83 = _0x4f1da9.find(
          (_0x3cf852) =>
            _0x3cf852.pattern === _0x54954a.split(" ")[0].toLowerCase()
        );
        if (_0xd17d83) {
          _0x35206d.push("*🍁Command:* " + _0xd17d83.pattern);
          if (_0xd17d83.category) {
            _0x35206d.push("*🧩Category:* " + _0xd17d83.category);
          }
          if (_0xd17d83.alias && _0xd17d83.alias[0]) {
            _0x35206d.push("*🧩Alias:* " + _0xd17d83.alias.join(", "));
          }
          if (_0xd17d83.desc) {
            _0x35206d.push("*🧩Description:* " + _0xd17d83.desc);
          }
          if (_0xd17d83.use) {
            _0x35206d.push(
              "*〽️Usa:*\n ```" +
                prefix +
                _0xd17d83.pattern +
                " " +
                _0xd17d83.use +
                "```"
            );
          }
          if (_0xd17d83.usage) {
            _0x35206d.push("*〽️Usage:*\n ```" + _0xd17d83.usage + "```");
          }
          await _0xd2266a.reply(_0x35206d.join("\n"));
        }
      }
      var _0x2a8461;
      var _0x2c3e5e;
      var _0x44b88b;
      var _0x10e1a7;
      var _0x8fdfd;
      var _0x1a5728;
      var _0x50e224;
      let _0x43d142 = 0;
      if (Config.menu === "") {
        _0x43d142 = Math.floor(Math.random() * 4) + 1;
      }
      if (
        _0x43d142 == 1 ||
        Config.menu.trim().startsWith("1") ||
        Config.menu.toLowerCase().includes("aztec")
      ) {
        _0x2a8461 = "┏━━⟪ *" + Config.botname + "* ⟫━━⦿";
        _0x2c3e5e = "┃ ✗";
        _0x44b88b = "┗━━━━━━━━━━━━━━━⦿";
        _0x10e1a7 = "┌──『";
        _0x8fdfd = "』──❖\n";
        _0x1a5728 = " | ";
        _0x50e224 = "\n└──────────────◉";
      } else if (
        _0x43d142 == 2 ||
        Config.menu.trim().startsWith("2") ||
        Config.menu.toLowerCase().includes("a17")
      ) {
        _0x2a8461 =
          "┌───═[ *" + Config.botname + "* ]═──▸\n│╭────────────···▸\n┴│▸";
        _0x2c3e5e = "⬡│▸";
        _0x44b88b = "┬│▸\n│╰─────────────···▸\n└───────────────···▸";
        _0x10e1a7 = "┌───〈";
        _0x8fdfd = "〉───◆\n│╭─────────────···▸\n┴│▸";
        _0x1a5728 = "⬡│▸ ";
        _0x50e224 = "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
      } else {
        _0x2a8461 =
          "╭────《  " + Config.botname + "  》────⊷\n│ ╭──────✧❁✧──────◆";
        _0x2c3e5e = "│ │";
        _0x44b88b = "│ ╰──────✧❁✧──────◆\n╰══════════════════⊷";
        _0x10e1a7 = "╭────❏";
        _0x8fdfd = "❏";
        _0x1a5728 = "│";
        _0x50e224 = "╰━━━━━━━━━━━━━━──⊷";
      }
      const _0x376e27 = {};
      _0x4f1da9.map(async (_0x3b0442, _0x3e603e) => {
        if (
          _0x3b0442.dontAddCommandList === false &&
          _0x3b0442.pattern !== undefined
        ) {
          if (!_0x376e27[_0x3b0442.category]) {
            _0x376e27[_0x3b0442.category] = [];
          }
          _0x376e27[_0x3b0442.category].push(_0x3b0442.pattern);
        }
      });
      const _0x1b2e30 = _0xd2266a.time;
      const _0x35bd69 = _0xd2266a.date;
      let _0x192602 =
        _0x2a8461 +
        "\n" +
        _0x2c3e5e +
        " Theme:- " +
        tlang().title +
        "\n" +
        _0x2c3e5e +
        " Owner:- " +
        Config.ownername +
        "\n" +
        _0x2c3e5e +
        " Plugins:- " +
        _0x4f1da9.length +
        "\n" +
        _0x2c3e5e +
        " Uptime:- " +
        runtime(process.uptime()) +
        "\n" +
        _0x2c3e5e +
        " Mem:- " +
        formatp(os.totalmem() - os.freemem()) +
        "/" +
        formatp(os.totalmem()) +
        "\n" +
        _0x2c3e5e +
        " Time:- " +
        _0x1b2e30 +
        "\n" +
        _0x2c3e5e +
        " Date:- " +
        _0x35bd69 +
        "\n" +
        _0x44b88b +
        "\n\n";
      for (const _0x2745af in _0x376e27) {
        _0x192602 +=
          _0x10e1a7 + " *" + tiny(_0x2745af) + "* " + _0x8fdfd + "\n";
        if (_0x54954a.toLowerCase() == _0x2745af.toLowerCase()) {
          _0x192602 =
            _0x10e1a7 + " *" + tiny(_0x2745af) + "* " + _0x8fdfd + "\n";
          for (const _0x375619 of _0x376e27[_0x2745af]) {
            _0x192602 += _0x1a5728 + " " + fancytext(_0x375619, 1) + "\n";
          }
          _0x192602 += _0x50e224 + "\n";
          break;
        } else {
          for (const _0x3d11d4 of _0x376e27[_0x2745af]) {
            _0x192602 += _0x1a5728 + " " + fancytext(_0x3d11d4, 1) + "\n";
          }
          _0x192602 += _0x50e224 + "\n";
        }
      }
      _0x192602 += Config.caption;
      let _0x2ca50e = {
        caption: _0x192602,
      };
      return await _0xd2266a.sendUi(_0xd2266a.chat, _0x2ca50e, _0xd2266a);
    } catch (_0x323e96) {
      await _0xd2266a.error(_0x323e96 + "\nCommand:menu", _0x323e96);
    }
  }
);
