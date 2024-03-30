const { smd } = require("../lib");
smd(
  {
    pattern: "wikimedia",
    desc: "Downloads wikimedia images.",
    category: "search",
    filename: __filename,
    use: "<text|search.>",
  },
  async (_0x47fb55, _0x5614e8) => {
    try {
      if (!_0x5614e8) {
        return await _0x47fb55.send("*_Please Give me search query!_*");
      }
      let { wikimedia: _0x168a95 } = require("../lib");
      let _0x6c377e = (await _0x168a95(_0x5614e8)) || [];
      if (!_0x6c377e || !_0x6c377e[0]) {
        return await _0x47fb55.send("*_No Results Found!_*");
      }
      let _0xc4fe0 =
        _0x47fb55.iscreator && _0x5614e8.split("|")[1] === "all"
          ? _0x6c377e.length
          : _0x6c377e.length > 5
          ? 5
          : _0x6c377e.length;
      for (let _0xfe1387 = 0; _0xfe1387 < _0xc4fe0; _0xfe1387++) {
        try {
          _0x47fb55.bot.sendFromUrl(
            _0x47fb55.from,
            _0x6c377e[_0xfe1387].image,
            "Title: " +
              _0x6c377e[_0xfe1387].title +
              "\n*Source:* " +
              _0x6c377e[_0xfe1387].source,
            _0x47fb55,
            {},
            "image"
          );
        } catch {}
      }
    } catch (_0x289d8e) {
      await _0x47fb55.error(_0x289d8e + "\n\ncommand: insta", _0x289d8e);
    }
  }
);
