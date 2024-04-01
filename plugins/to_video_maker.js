const fs = require("fs-extra");
const { smd, Config } = require("../lib/");
let audtypes = ["audioMessage", "videoMessage"];
smd(
  {
    pattern: "toaudio",
    alias: ["mp3", "tomp3"],
    desc: "changes type to audio.",
    category: "converter",
    use: "<reply to any Video>",
    filename: __filename,
  },
  async (_0x50ed1f) => {
    try {
      let _0x149bc9 = audtypes.includes(_0x50ed1f.mtype)
        ? _0x50ed1f
        : _0x50ed1f.reply_message;
      if (!_0x149bc9 || !audtypes.includes(_0x149bc9?.mtype)) {
        return _0x50ed1f.reply("*_Uhh Dear, Reply to Any Video.!!_*");
      }
      let _0x5b7c1e = await _0x50ed1f.bot.downloadAndSaveMediaMessage(
        _0x149bc9
      );
      const { toAudio: _0x3667e6 } = require("../lib");
      let _0x294315 = fs.readFileSync(_0x5b7c1e);
      let _0x133462 = await _0x3667e6(_0x294315);
      try {
        fs.unlink(_0x5b7c1e);
      } catch {}
      return await _0x50ed1f.bot.sendMessage(_0x50ed1f.jid, {
        audio: _0x133462,
        mimetype: "audio/mpeg",
      });
    } catch (_0x234184) {
      return await _0x50ed1f.error(
        _0x234184 + "\n\ncmdName: toaudio",
        _0x234184
      );
    }
  }
);
smd(
  {
    pattern: "voice",
    alias: ["ptt", "toptt"],
    desc: "adds bass in given sound",
    category: "audio",
    use: "<reply to any audio>",
  },
  async (_0x53ce0b) => {
    try {
      let _0x758f42 = audtypes.includes(_0x53ce0b.mtype)
        ? _0x53ce0b
        : _0x53ce0b.reply_message;
      if (!_0x758f42 || !audtypes.includes(_0x758f42?.mtype)) {
        return _0x53ce0b.reply("*_Uhh Please, Reply to audio/video_*");
      }
      let _0x47558f = await _0x758f42.download();
      return await _0x53ce0b.bot.sendMessage(
        _0x53ce0b.jid,
        {
          audio: _0x47558f,
          mimetype: "audio/mpeg",
          ptt: true,
        },
        {
          quoted: _0x53ce0b,
        }
      );
    } catch (_0x4fc603) {
      return await _0x53ce0b.error(_0x4fc603 + "\n\ncmdName: voice", _0x4fc603);
    }
  }
);
smd(
  {
    pattern: "tomp4",
    alias: ["mp4", "tovideo"],
    desc: "convert sticker to mp4.",
    category: "converter",
    use: "<reply to any Video>",
    filename: __filename,
  },
  async (_0x53f8fc) => {
    let _0x1a2aba =
      _0x53f8fc.mtype === "videoMessage" ? _0x53f8fc : _0x53f8fc.reply_message;
    if (!_0x1a2aba) {
      return _0x53f8fc.reply(
        "*_Uhh Dear, Reply To Animated Sticker or Gif!!_*"
      );
    }
    const { webp2mp4File: _0x1f5101 } = require("../lib");
    let _0x3b3186 = _0x1a2aba?.mimetype || "";
    if (_0x1a2aba?.mtype != "videoMessage" && !/webp/.test(_0x3b3186)) {
      return await _0x53f8fc.send(
        "*Damn... Reply To An Animated Sticker or Gif *"
      );
    }
    let _0x30fbb9 = await _0x53f8fc.bot.downloadAndSaveMediaMessage(_0x1a2aba);
    try {
      try {
        if (/webp/.test(_0x3b3186)) {
          let _0x281bfb = await _0x1f5101(_0x30fbb9);
          _0x30fbb9 = _0x281bfb.result;
        }
      } catch (_0x3b605b) {
        console.log("error while converting sticker to mp4\n", _0x3b605b);
      }
      await _0x53f8fc.bot.sendMessage(_0x53f8fc.jid, {
        video: {
          url: _0x30fbb9,
        },
        caption: Config.caption,
      });
      try {
        return await fs.unlink(_0x30fbb9);
      } catch {}
    } catch (_0x1f3309) {
      return await _0x53f8fc.error(_0x1f3309 + "\n\ncmdName: tomp4", _0x1f3309);
    }
  }
);
