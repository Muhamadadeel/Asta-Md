const Config = require("../config");
let {
  fancytext,
  sendGImages,
  lang,
  tiny,
  runtime,
  formatp,
  botpic,
  prefix,
  sck1,
  smd
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const {
  fetchJson,
  getBuffer
} = require("../lib/");
async function sendAnime(_0x55a475, _0x509539, _0x4e419e, _0x835b9a = "") {
  function _0xf3e051() {
    const _0x58922f = ["Naruto", "\n*More on✨:* ", "map", "1736295xNxVMd", "get", "json", "\n*Created On☘️:* ", "https://api.waifu.pics/sfw/", "articles", "sendMessage", "https://api.waifu.pics/nsfw/", "split", "animenews", "foxgirl", "12896280WdEPAA", "chat", "log", "url", "publishedAt", "/video.json", "https://nekos.life/api/v2/img/fox_girl", "floor", "result", "waifu", "nsfw", "\n\n*Content🧩:* ", "trap", "author", "neko", "loli", "length", "4267560Bkglyi", "2301172sMBiSS", "demon", "12uzEKTO", "title", "naruto", "data", "./commands/Anime.js/sendAnime()\n", "source", "102969imHSeo", "bot", "1786770BYzQsB", "megumin", "*Title🔰:* ", ",Here we go😊!!!!*", "10vterwW", "1894515XGwMrc", "https://newsapi.org/v2/everything?q=", "error", "\n*Author📌:* "];
    _0xf3e051 = function () {
      return _0x58922f;
    };
    return _0xf3e051();
  }
  const _0x2d1f22 = _0x2f0bdf;
  (function (_0x62479, _0x27d9b1) {
    const _0x384220 = _0x2f0bdf;
    const _0x1ce537 = _0x62479();
    while (true) {
      try {
        const _0x9dcce7 = -parseInt(_0x384220(332)) / 1 * (-parseInt(_0x384220(338)) / 2) + -parseInt(_0x384220(346)) / 3 + parseInt(_0x384220(324)) / 4 + parseInt(_0x384220(334)) / 5 * (-parseInt(_0x384220(326)) / 6) + -parseInt(_0x384220(339)) / 7 + -parseInt(_0x384220(323)) / 8 + parseInt(_0x384220(357)) / 9;
        if (_0x9dcce7 === _0x27d9b1) {
          break;
        } else {
          _0x1ce537.push(_0x1ce537.shift());
        }
      } catch (_0x58dc6a) {
        _0x1ce537.push(_0x1ce537.shift());
      }
    }
  })(_0xf3e051, 425495);
  function _0x2f0bdf(_0x12f513, _0x42e578) {
    const _0x36af85 = _0xf3e051();
    _0x2f0bdf = function (_0x362f95, _0x29060b) {
      _0x362f95 = _0x362f95 - 323;
      let _0x43aa24 = _0x36af85[_0x362f95];
      return _0x43aa24;
    };
    return _0x2f0bdf(_0x12f513, _0x42e578);
  }
  try {
    if (_0x4e419e === _0x2d1f22(366) || _0x4e419e === _0x2d1f22(371) || _0x4e419e === _0x2d1f22(335)) {
      let _0x379467 = _0x835b9a.split("|")[0] || "";
      let _0x4c4376 = _0x835b9a[_0x2d1f22(354)]("|")[1] || "1";
      let _0x117530 = _0x835b9a[_0x2d1f22(354)]("|")[1] ? "" : " *" + _0x4e419e + _0x2d1f22(337);
      let _0x43e16d = _0x379467 == _0x2d1f22(367) ? _0x2d1f22(353) + (_0x4e419e === "megumin" ? _0x2d1f22(369) : _0x2d1f22(366)) : _0x2d1f22(350) + _0x4e419e;
      for (let _0x4e7334 = 0; _0x4e7334 < _0x4c4376; _0x4e7334++) {
        let _0x576105 = await (await fetch(_0x43e16d))[_0x2d1f22(348)]();
        await _0x55a475.bot.sendMessage(_0x509539[_0x2d1f22(358)], {
          image: {
            url: _0x576105.url
          },
          caption: _0x117530
        }, {
          quoted: _0x509539
        });
      }
    } else if (_0x4e419e === _0x2d1f22(372) || _0x4e419e === _0x2d1f22(356)) {
      let _0x385596 = _0x4e419e === _0x2d1f22(372) ? "https://waifu.pics/api/sfw/shinobu" : _0x2d1f22(363);
      let _0x3e303e = await axios[_0x2d1f22(347)](_0x385596);
      await _0x55a475[_0x2d1f22(333)][_0x2d1f22(352)](_0x509539[_0x2d1f22(358)], {
        image: {
          url: _0x3e303e[_0x2d1f22(329)][_0x2d1f22(360)]
        }
      }, {
        quoted: _0x509539
      });
    } else if (_0x4e419e === _0x2d1f22(325) || _0x4e419e === _0x2d1f22(328)) {
      let _0x3a01f7 = "https://raw.githubusercontent.com/Astropeda/Asta-Md-Media/main/" + (_0x4e419e === "demon" ? "Demonslayer" : _0x2d1f22(343)) + _0x2d1f22(362);
      const _0x37dffc = await fetchJson(_0x3a01f7);
      const _0x51dced = _0x37dffc.result[Math[_0x2d1f22(364)](Math.random() * _0x37dffc[_0x2d1f22(365)][_0x2d1f22(373)])].url;
      await _0x55a475[_0x2d1f22(333)][_0x2d1f22(352)](_0x509539[_0x2d1f22(358)], {
        video: {
          url: _0x51dced
        },
        caption: "*Here we go😊!!!!*"
      });
    } else if (_0x4e419e === _0x2d1f22(355)) {
      let _0x509613 = await axios.get(_0x2d1f22(340) + _0x835b9a + "&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com&language=en&sortby=publishedat&apikey=cd4116be09ef4a0caceedf21b6258460&pageSize=8");
      let _0x7f6c91 = _0x509613[_0x2d1f22(329)][_0x2d1f22(351)];
      _0x7f6c91[_0x2d1f22(345)](async (_0x3a0939, _0x38234d) => {
        const _0x4a7def = _0x2d1f22;
        try {
          _0x55a475.bot.sendMessage(_0x509539[_0x4a7def(358)], {
            image: {
              url: _0x3a0939.urlToImage
            },
            caption: _0x4a7def(336) + _0x3a0939[_0x4a7def(327)] + _0x4a7def(368) + _0x3a0939.content + _0x4a7def(342) + _0x3a0939[_0x4a7def(370)] + "\n*Source♦️:* " + _0x3a0939[_0x4a7def(331)].name + _0x4a7def(349) + _0x3a0939[_0x4a7def(361)] + _0x4a7def(344) + _0x3a0939[_0x4a7def(360)] + "\n\n" + Config.caption + "*"
          }, {
            quoted: _0x509539
          });
        } catch (_0x120a1d) {}
      });
    }
  } catch (_0x29e730) {
    console[_0x2d1f22(359)](_0x2d1f22(330), _0x29e730);
    await _0x509539[_0x2d1f22(341)](_0x29e730);
  }
}
smd({
  pattern: "waifu",
  desc: "To get Waifu Random Pics",
  category: "Anime Pics",
  filename: __filename
}, async (_0x3f90ca, _0x18c6e6, {
  cmdName: _0x44f36d
}) => {
  try {
    return await sendAnime(_0x3f90ca, _0x3f90ca, "waifu", _0x18c6e6);
  } catch {}
});
smd({
  pattern: "neko",
  category: "Anime Pics",
  desc: "Sends a Neko Image in chat",
  filename: __filename
}, async (_0x1cd273, _0xb77fec, {
  cmdName: _0x3c6957
}) => {
  try {
    return await sendAnime(_0x1cd273, _0x1cd273, "neko", _0xb77fec);
  } catch {}
});
smd({
  pattern: "megumin",
  desc: "To get Waifu Random Pics",
  category: "Anime Pics",
  filename: __filename
}, async (_0x5a7e62, _0x8aed59, {
  cmdName: _0x3d1dd2
}) => {
  try {
    return await sendAnime(_0x5a7e62, _0x5a7e62, "megumin", _0x8aed59);
  } catch {}
});
smd({
  pattern: "loli",
  category: "Anime Pics",
  filename: __filename,
  desc: "Sends image of loli."
}, async _0x11eae1 => {
  try {
    return await sendAnime(_0x11eae1, _0x11eae1, "loli");
  } catch {}
});
smd({
  pattern: "foxgirl",
  category: "Anime Pics",
  desc: "Sends image of Fox Girl Anime.",
  filename: __filename
}, async _0x545d0f => {
  try {
    return await sendAnime(_0x545d0f, _0x545d0f, "foxgirl");
  } catch {}
});
smd({
  pattern: "demon",
  alias: ["ds"],
  desc: "To get Naruto Random Videos",
  category: "Anime Pics",
  filename: __filename
}, async _0x88a702 => {
  try {
    return await sendAnime(_0x88a702, _0x88a702, "demon");
  } catch {}
});
smd({
  pattern: "naruto",
  desc: "To get Naruto Random Videos",
  category: "Anime Pics",
  filename: __filename
}, async _0x5ded99 => {
  try {
    return await sendAnime(_0x5ded99, _0x5ded99, "naruto");
  } catch {}
});
smd({
  pattern: "pokepic",
  category: "Anime Pics",
  filename: __filename,
  desc: "Sends image of pokemon."
}, async (_0x583a8f, _0x26e084) => {
  try {
    return await sendGImages(_0x583a8f, _0x26e084 + "Pokemon Pics only HD ", "*---「 Poke Pic 」---*", _0x26e084);
  } catch {}
});
smd({
  pattern: "animepic",
  category: "Anime Pics",
  filename: __filename,
  desc: "Anime images"
}, async (_0x446e94, _0xff2591) => {
  try {
    return await sendGImages(_0x446e94, _0xff2591 + "Anime Pics HD", "*-----「 Anime Image 」-----*", _0xff2591);
  } catch {}
});
smd({
  pattern: "animewall",
  category: "Anime Pics",
  desc: "Anime Wallpaper Random",
  filename: __filename
}, async (_0x1be31e, _0x45a934) => {
  try {
    return await sendGImages(_0x1be31e, _0x45a934 + "anime wallpaper for desktop full hd", "*---「 Anime Wallpaper 」---*", _0x45a934);
  } catch {}
});
let qq = ["Anime News Today", "New Anime", "Uocoming Anime News", "New Anime Info", "Whats news in Anime", "Anime Series", "Manga News today", "Anime New News", "Anime News today"];
smd({
  pattern: "animenews",
  category: "Anime Pics",
  desc: "Sends Anime News in chat",
  filename: __filename
}, async (_0x119ada, _0x37095e, {
  cmdName: _0x3a6817
}) => {
  try {
    let _0x1f2ab3 = qq[Math.floor(Math.random() * qq.length)] + _0x37095e;
    return await sendAnime(message, message, _0x3a6817, _0x1f2ab3);
  } catch {}
});
smd({
  pattern: "pokemon",
  category: "Anime Pics",
  filename: __filename,
  desc: "Sends info of pokemon in current chat."
}, async (_0x127028, _0x60d63) => {
  try {
    if (!_0x60d63) {
      return _0x127028.reply("*Uhh Please Give Me Poki Name/num*");
    }
    try {
      let {
        data: _0x4e5976
      } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + _0x60d63);
      if (!_0x4e5976.name) {
        return _0x127028.reply("❌ Could not found any pokemon with that name");
      }
      let _0x8d1690 = "*•Name: " + _0x4e5976.name + "*\n*•Pokedex ID: " + _0x4e5976.id + "*\n*•Height: " + _0x4e5976.height + "*\n*•Weight: " + _0x4e5976.weight + "*\n*•Abilities: " + _0x4e5976.abilities[0].ability.name + ", " + _0x4e5976.abilities[1].ability.name + "*\n*•Base Experience: " + _0x4e5976.base_experience + "*\n*•Type: " + _0x4e5976.types[0].type.name + "*\n*•Base Stat: " + _0x4e5976.stats[0].base_stat + "*\n*•Attack: " + _0x4e5976.stats[1].base_stat + "*\n*•Defense: " + _0x4e5976.stats[2].base_stat + "*\n*•Special Attack: " + _0x4e5976.stats[3].base_stat + "*\n*•Special Defense:" + _0x4e5976.stats[4].base_stat + "*\n*•Speed: " + _0x4e5976.stats[5].base_stat + "*\n";
      return await Suhail.bot.sendMessage(_0x127028.jid, {
        image: {
          url: _0x4e5976.sprites.front_default
        },
        caption: _0x8d1690
      }, {
        quoted: _0x127028
      });
    } catch (_0x2fa93f) {
      _0x127028.reply("*_Ahh,Couldn't found any pokemon._*");
    }
  } catch {}
});