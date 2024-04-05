const {
  smd,
  tlang,
  prefix,
  Config,
  sleep,
  getBuffer,
  smdJson,
  smdBuffer,
} = require("../lib");
smd(
  {
    cmdname: "gifsearch",
    alias: ["gify", "tenor"],
    category: "search",
    use: "[text]",
    info: "Searches gif",
  },
  async (_0x483f63, _0x5e7b36) => {
    try {
      if (!_0x5e7b36) {
        return _0x483f63.reply("Sorry you did not give any search term!");
      }
      const _0x4da793 = require("axios");
      const _0x1abfb4 = await _0x4da793
        .get(
          "https://g.tenor.com/v1/search?q=" +
            _0x5e7b36 +
            "&key=LIVDSRZULELA&limit=8"
        )
        .catch(() => {});
      if (
        !_0x1abfb4.data ||
        !_0x1abfb4.data.results ||
        !_0x1abfb4.data.results[0]
      ) {
        return _0x483f63.reply("*Could not find*");
      }
      let _0xf0dc5b =
        _0x1abfb4.data.results.length > 5 ? 5 : _0x1abfb4.data.results.length;
      for (let _0x344f87 = 0; _0x344f87 < _0xf0dc5b; _0x344f87++) {
        _0x483f63.send(
          _0x1abfb4.data.results?.[_0x344f87]?.media[0]?.mp4?.url,
          {
            caption: Config.caption,
            gifPlayback: true,
          },
          "smdvid",
          _0x483f63
        );
      }
    } catch (_0x3ae817) {
      _0x483f63.error(
        _0x3ae817 + "\n\nCommand: gifsearch",
        _0x3ae817,
        "*Could not find*"
      );
    }
  }
);