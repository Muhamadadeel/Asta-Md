const moment = require("moment-timezone");
const {
  fetchJson,
  smd,
  tlang,
  send,
  getBuffer,
  prefix,
  Config,
  groupdb
} = require("../lib");
let gis = require("async-g-i-s");
const axios = require("axios");
const fetch = require("node-fetch");
const {
  shazam
} = require("../lib");
let yts = require("secktor-pack");
smd({
  pattern: "find",
  category: "search",
  desc: "Finds info about song",
  filename: __filename
}, async _0x5d2046 => {
  try {
    let _0x289fd9 = _0x5d2046.reply_message ? _0x5d2046.reply_message.mtype : "";
    if (!/audio/.test(_0x289fd9)) {
      return _0x5d2046.reply("Reply audio " + prefix + "find");
    }
    let _0x3f239e = await _0x5d2046.reply_message.download();
    let _0x483172 = await shazam(_0x3f239e);
    if (!_0x483172 || !_0x483172.status) {
      return _0x5d2046.send(_0x483172);
    }
    let _0x46a4bd = "*𝚃𝚒𝚝𝚕𝚎: _" + _0x483172.title + "_* \n*𝙰𝚛𝚝𝚒𝚜𝚝: _" + _0x483172.artists + "_*\n *𝙰𝚕𝚋𝚞𝚖:* _" + _0x483172.album + "_ ";
    await _0x5d2046.bot.sendUi(_0x5d2046.jid, {
      caption: _0x46a4bd
    }, {
      quoted: _0x5d2046
    }, "text", "true");
  } catch (_0x5dfdb3) {
    return await _0x5d2046.error(_0x5dfdb3 + "\n\n command: find", _0x5dfdb3, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "github",
  category: "search",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x1c1358, _0x328442) => {
  try {
    _0x1c1358.react("🔍");
    if (!_0x328442) {
      return _0x1c1358.reply("Give me a user name like " + prefix + "github SuhailTechInfo");
    }
    const {
      data: _0x12944c
    } = await axios("https://api.github.com/users/" + _0x328442);
    if (!_0x12944c) {
      return await _0x1c1358.send("*_Didn't get any results, Provide valid user name!_*");
    }
    let _0x598357 = _0x12944c;
    _0x1c1358.sendMessage(_0x1c1358.jid, {
      image: {
        url: _0x598357.avatar_url
      },
      caption: "ㅤㅤㅤ*[ GITHUB USER INFO ]*\n\n🚩 Id : " + _0x598357.id + "\n🔖 Nickname : " + _0x598357.name + "\n🔖 Username : " + _0x598357.login + "\n✨ Bio : " + _0x598357.bio + "\n🏢 Company : " + _0x598357.company + "\n📍 Location : " + _0x598357.location + "\n📧 Email : " + _0x598357.email + "\n📰 Blog : " + _0x598357.blog + "\n🔓 Public Repo : " + _0x598357.repos_url + "\n🔐 Public Gists : " + _0x598357.gists_url + "\n💕 Followers : " + _0x598357.followers + "\n👉 Following : " + _0x598357.following + "\n🔄 Updated At : " + _0x598357.updated_at + "\n🧩 Created At : " + _0x598357.ceated_at
    }, {
      quoted: _0x1c1358
    });
  } catch (_0x221560) {
    return await _0x1c1358.error(_0x221560 + "\n\n command: github", _0x221560, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "coffe",
  alias: ["tea", "kofi"],
  category: "search",
  react: "🫡",
  desc: "send randome coffe",
  filename: __filename
}, async _0x59ac78 => {
  try {
    return await _0x59ac78.bot.sendMessage(_0x59ac78.chat, {
      image: {
        url: "https://coffee.alexflipnote.dev/random"
      },
      caption: "Here is your Coffee..."
    }, {
      quoted: _0x59ac78
    });
  } catch (_0x2b2a63) {
    return await _0x59ac78.error(_0x2b2a63 + "\n\n command: coffe", _0x2b2a63, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "ss",
  alias: ["webss", "fullss"],
  category: "search",
  desc: "Searches Image on Google",
  use: "<text>",
  filename: __filename
}, async (_0x5d1209, _0x47ba58) => {
  try {
    let _0x522b10 = _0x47ba58 ? _0x47ba58 : _0x5d1209.reply_text;
    var _0x289f96 = _0x522b10.match(/\bhttps?:\/\/\S+/gi) || _0x47ba58.match(/\bhttps?:\/\/\S+/gi) || false;
    if (!_0x289f96 || !_0x289f96[0]) {
      return send(_0x5d1209, "*_Uhh Please, provide Url to fetch SS!_*");
    }
    let _0x768ee0 = await getBuffer("https://s.vercel.app/api?url=" + _0x289f96[0] + "&width=1280&height=720");
    if (!_0x768ee0) {
      await _0x5d1209.reply("`*_Didn't get any snapshot, Sorry!_*`");
    } else {
      await send(_0x5d1209, _0x768ee0, {}, "image", _0x5d1209);
    }
  } catch (_0x3a6259) {
    return await _0x5d1209.error(_0x3a6259 + "\n\n command: ss", _0x3a6259, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "lyrics",
  alias: ["lyric"],
  category: "search",
  desc: "Searche lyrics of given song name",
  use: "<text | song>",
  filename: __filename
}, async (_0xd5c9e4, _0x462ca1, {
  cmdName: _0x264233
}) => {
  if (!_0x462ca1) {
    return _0xd5c9e4.reply("*_Uhh please, give me song name_*\n*_Example " + (prefix + _0x264233) + " blue eyes punjabi_*");
  }
  try {
    const _0x3ef361 = await (await fetch("https://inrl-web.onrender.com/api/lyrics?text=" + _0x462ca1)).json();
    if (!_0x3ef361.status) {
      return _0xd5c9e4.send("*Please Provide valid name!!!*");
    }
    if (!_0x3ef361.result) {
      return _0xd5c9e4.send("*There's a problem, try again later!*");
    }
    const {
      thumb: _0x3a2d35,
      lyrics: _0x1d5685,
      title: _0xc353e9,
      artist: _0x165989
    } = _0x3ef361.result;
    const _0x1fa52a = "```";
    const _0x542323 = "*";
    const _0x48c269 = "_*";
    const _0x3bb11c = {
      externalAdReply: {
        ...(await _0xd5c9e4.bot.contextInfo("𝗦𝗨𝗛𝗔𝗜𝗟-𝗠𝗗", "Lyrics-" + _0x462ca1))
      }
    };
    await send(_0xd5c9e4, "*𝚃𝚒𝚝𝚕𝚎:* " + _0xc353e9 + "\n*𝙰𝚛𝚝𝚒𝚜𝚝:* " + _0x165989 + " \n" + _0x1fa52a + _0x1d5685 + _0x1fa52a + " ", {
      contextInfo: _0x3bb11c
    }, "");
  } catch (_0x4cf671) {
    return await _0xd5c9e4.error(_0x4cf671 + "\n\n command: " + _0x264233, _0x4cf671, "*_Didn't get any lyrics, Sorry!_*");
  }
});
smd({
  pattern: "imdb",
  category: "search",
  desc: "sends info of asked movie/series.",
  use: "<text>",
  filename: __filename
}, async (_0x2ef588, _0x1308bf) => {
  try {
    if (!_0x1308bf) {
      return _0x2ef588.reply("_Name a Series or movie " + tlang().greet + "._");
    }
    let {
      data: _0x3395f1
    } = await axios.get("http://www.omdbapi.com/?apikey=742b2d09&t=" + _0x1308bf + "&plot=full");
    if (!_0x3395f1 || _0x3395f1.cod == "404") {
      return await _0x2ef588.reply("*_Please provide valid country name!_*");
    }
    let _0x3f9a2b = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    _0x3f9a2b += "🎬Title      : " + _0x3395f1.Title + "\n";
    _0x3f9a2b += "📅Year       : " + _0x3395f1.Year + "\n";
    _0x3f9a2b += "⭐Rated      : " + _0x3395f1.Rated + "\n";
    _0x3f9a2b += "📆Released   : " + _0x3395f1.Released + "\n";
    _0x3f9a2b += "⏳Runtime    : " + _0x3395f1.Runtime + "\n";
    _0x3f9a2b += "🌀Genre      : " + _0x3395f1.Genre + "\n";
    _0x3f9a2b += "👨🏻‍💻Director   : " + _0x3395f1.Director + "\n";
    _0x3f9a2b += "✍Writer     : " + _0x3395f1.Writer + "\n";
    _0x3f9a2b += "👨Actors     : " + _0x3395f1.Actors + "\n";
    _0x3f9a2b += "📃Plot       : " + _0x3395f1.Plot + "\n";
    _0x3f9a2b += "🌐Language   : " + _0x3395f1.Language + "\n";
    _0x3f9a2b += "🌍Country    : " + _0x3395f1.Country + "\n";
    _0x3f9a2b += "🎖️Awards     : " + _0x3395f1.Awards + "\n";
    _0x3f9a2b += "📦BoxOffice  : " + _0x3395f1.BoxOffice + "\n";
    _0x3f9a2b += "🏙️Production : " + _0x3395f1.Production + "\n";
    _0x3f9a2b += "🌟imdbRating : " + _0x3395f1.imdbRating + "\n";
    _0x3f9a2b += "❎imdbVotes  : " + _0x3395f1.imdbVotes + "\n\n";
    _0x3f9a2b += Config.caption;
    await _0x2ef588.bot.sendUi(_0x2ef588.jid, {
      caption: _0x3f9a2b
    }, {
      quoted: _0x2ef588
    }, "image", _0x3395f1.Poster);
  } catch (_0x3d4952) {
    return await _0x2ef588.error(_0x3d4952 + "\n\n command: " + cmdName, _0x3d4952, "*_Uhh dear, Didn't get any results!_*");
  }
});
smd({
  pattern: "weather",
  category: "search",
  desc: "Sends weather info about asked place.",
  use: "<location>",
  filename: __filename
}, async (_0x592384, _0x55b5a2) => {
  try {
    if (!_0x55b5a2) {
      return _0x592384.reply("*_Give me city name, " + (_0x592384.isCreator ? "Buddy" : "Idiot") + "!!_*");
    }
    let {
      data: _0x5db12e
    } = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + _0x55b5a2 + "&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en");
    if (!_0x5db12e || _0x5db12e.cod === "404") {
      return await _0x592384.reply("*_Please provide valid city name!_*");
    }
    let _0x41d162 = "*🌟Weather of  " + _0x55b5a2 + "*\n\n";
    _0x41d162 += "*Weather:-* " + _0x5db12e.weather[0].main + "\n";
    _0x41d162 += "*Description:-* " + _0x5db12e.weather[0].description + "\n";
    _0x41d162 += "*Avg Temp:-* " + _0x5db12e.main.temp + "\n";
    _0x41d162 += "*Feels Like:-* " + _0x5db12e.main.feels_like + "\n";
    _0x41d162 += "*Pressure:-* " + _0x5db12e.main.pressure + "\n";
    _0x41d162 += "*Humidity:-* " + _0x5db12e.main.humidity + "\n";
    _0x41d162 += "*Humidity:-* " + _0x5db12e.wind.speed + "\n";
    _0x41d162 += "*Latitude:-* " + _0x5db12e.coord.lat + "\n";
    _0x41d162 += "*Longitude:-* " + _0x5db12e.coord.lon + "\n";
    _0x41d162 += "*Country:-* " + _0x5db12e.sys.country + "\n\n";
    _0x41d162 += Config.caption;
    _0x592384.bot.sendUi(_0x592384.jid, {
      caption: _0x41d162
    }, {
      quoted: _0x592384
    }, "text", "true");
  } catch (_0x510150) {
    return await _0x592384.error(_0x510150 + "\n\n command: weather", _0x510150, "*_Please provide valid city name!_*");
  }
});
smd({
  pattern: "npm",
  desc: "download mp4 from url.",
  category: "search",
  use: "<package name>",
  filename: __filename
}, async (_0x25d94c, _0x139d66) => {
  try {
    if (!_0x139d66) {
      return _0x25d94c.reply("Please give me package name.📦");
    }
    const {
      data: _0x2ddaf2
    } = await axios.get("https://api.npms.io/v2/search?q=" + _0x139d66);
    let _0x435abf = _0x2ddaf2.results.map(({
      package: _0x108d72
    }) => "*" + _0x108d72.name + "* (v" + _0x108d72.version + ")\n_" + _0x108d72.links.npm + "_\n_" + _0x108d72.description + "_").join("\n\n")?.trim();
    if (_0x2ddaf2 && _0x435abf) {
      await _0x25d94c.reply(_0x435abf);
    } else {
      await _0x25d94c.reply("*No Result Found. Sorry!!*");
    }
  } catch (_0x297e68) {
    await _0x25d94c.error(_0x297e68 + "\n\ncommand : npm", _0x297e68);
  }
});
smd({
  pattern: "cric",
  alias: ["search", "gsearch"],
  category: "search",
  desc: "Sends info of given query from Google Search.",
  use: "<text>",
  filename: __filename
}, async (_0x5e36d8, _0x35dbb2) => {
  try {
    await _0x5e36d8.reply("*_Please Wait, Getting Cricket Info_*");
    const _0x47f70c = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78");
    const _0x3a70ba = await _0x47f70c.json();
    for (let _0x3d6cd1 = 0; _0x3d6cd1 < _0x3a70ba.data.length; _0x3d6cd1++) {
      let _0x2bbcfd = _0x3d6cd1 + 1;
      _0x35dbb2 += "\n*--------------------- MATCH " + _0x3d6cd1 + "-------------------*";
      _0x35dbb2 += "\n*Match Name:* " + _0x3a70ba.data[_0x3d6cd1].name;
      _0x35dbb2 += "\n*Match Status:* " + _0x3a70ba.data[_0x3d6cd1].status;
      _0x35dbb2 += "\n*Match Date:* " + _0x3a70ba.data[_0x3d6cd1].dateTimeGMT;
      _0x35dbb2 += "\n*Match Started:* " + _0x3a70ba.data[_0x3d6cd1].matchStarted;
      _0x35dbb2 += "\n*Match Ended:* " + _0x3a70ba.data[_0x3d6cd1].matchEnded;
    }
    return await _0x5e36d8.reply(_0x35dbb2);
  } catch (_0x60d371) {
    return await _0x5e36d8.error(_0x60d371 + "\n\n command: cric", _0x60d371, "*_Uhh dear, Didn't get any results!_*");
  }
});
smd({
  pattern: "google",
  alias: ["search", "gsearch"],
  category: "search",
  desc: "Sends info of given query from Google Search.",
  use: "<text>",
  filename: __filename
}, async (_0x5d6089, _0x4c2456) => {
  try {
    if (!_0x4c2456) {
      return _0x5d6089.reply("*_Uhh please, give me a query_*\n*_Example : " + prefix + "google Suhail Md._*");
    }
    let _0x2d97fd = require("google-it");
    _0x2d97fd({
      query: _0x4c2456
    }).then(_0x74fbb8 => {
      let _0x298c1e = "Google Search From : " + _0x4c2456 + " \n\n";
      for (let _0xc3cf4b of _0x74fbb8) {
        _0x298c1e += "*➣ Title :* " + _0xc3cf4b.title + "\n";
        _0x298c1e += "*➣ Description :* " + _0xc3cf4b.snippet + "\n";
        _0x298c1e += "_" + _0xc3cf4b.link + "_ \n\n────────────────────────\n\n";
      }
      return _0x5d6089.reply(_0x298c1e);
    });
  } catch (_0x2722cb) {
    return await _0x5d6089.error(_0x2722cb + "\n\n command: google", _0x2722cb, "*_Uhh dear, Didn't get any results!_*");
  }
});
smd({
  pattern: "image",
  alias: ["img", "pic"],
  category: "search",
  desc: "Searches Image on Google",
  use: "<text>",
  filename: __filename
}, async (_0x5e0ffc, _0xfe92a1) => {
  try {
    let _0x10dd24 = _0xfe92a1 ? _0xfe92a1 : _0x5e0ffc.reply_text;
    if (!_0x10dd24) {
      return _0x5e0ffc.reply("Provide me a query!\n*Ex : .image luffy |10*");
    }
    let _0x1e239b = _0x10dd24.split("|")[0] || _0x10dd24;
    let _0x405d75 = _0x10dd24.split("|")[1] || "5";
    let _0x557974 = parseInt(_0x405d75) || 5;
    let _0x9204a5 = await groupdb.findOne({
      id: _0x5e0ffc.chat
    });
    let _0x4f9a94 = _0x9204a5.nsfw == "true" ? "off" : "on";
    try {
      let _0x9132e8 = await gis(_0x1e239b, {
        query: {
          safe: _0x4f9a94
        },
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
      });
      if (_0x9132e8 && _0x9132e8[0]) {
        _0x557974 = _0x9132e8 && _0x9132e8.length > _0x557974 ? _0x557974 : _0x9132e8.length;
        _0x5e0ffc.reply("*_Sending " + _0x557974 + " images of '" + _0x1e239b + "' in chat!_*");
        for (let _0x1314ba = 0; _0x1314ba < _0x557974; _0x1314ba++) {
          try {
            let _0x410925 = Math.floor(Math.random() * _0x9132e8.length);
            _0x5e0ffc.bot.sendFromUrl(_0x5e0ffc.jid, _0x9132e8[_0x410925].url, "", _0x5e0ffc, {}, "image");
            _0x9132e8.splice(_0x410925, 1);
          } catch {}
        }
        return;
      }
    } catch (_0x1bdef1) {
      console.log("ERROR IN SYNC G>I>S IMAGE PACKAGE\n\t", _0x1bdef1);
    }
    let _0x1e6505 = {};
    let _0x3047ca = [];
    const _0x2a5cab = {
      q: _0x1e239b,
      tbm: "isch",
      hl: "en",
      gl: "in",
      ijn: "0"
    };
    const _0x457f94 = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
      "Accept-Encoding": "application/json"
    };
    const _0x4452c7 = await axios.get("https://www.google.com/search", {
      headers: _0x457f94,
      params: _0x2a5cab
    });
    let _0x5f3a30 = _0x4452c7.data;
    _0x5f3a30 = _0x5f3a30.slice(_0x5f3a30.lastIndexOf("AF_initDataCallback"));
    _0x5f3a30 = _0x5f3a30.slice(_0x5f3a30.indexOf("["));
    _0x5f3a30 = _0x5f3a30.slice(0, _0x5f3a30.indexOf("</script>") - 1);
    _0x5f3a30 = _0x5f3a30.slice(0, _0x5f3a30.lastIndexOf(","));
    const _0x527b58 = JSON.parse(_0x5f3a30);
    const _0x4060e4 = _0x527b58[56][1][0][0][1][0];
    for (let _0x1d8c8b = 0; _0x1d8c8b < _0x405d75; _0x1d8c8b++) {
      if (_0x4060e4[_0x1d8c8b] && _0x4060e4[_0x1d8c8b][0][0]["444383007"][1]) {
        let _0x43fb90 = _0x4060e4[_0x1d8c8b][0][0]["444383007"][1][3][0];
        _0x3047ca.push(_0x43fb90);
      }
    }
    for (let _0x2a782f of _0x3047ca) {
      try {
        _0x5e0ffc.bot.sendFromUrl(_0x5e0ffc.chat, _0x2a782f, "", _0x5e0ffc, {}, "image");
      } catch {}
    }
  } catch (_0x4da901) {
    return await _0x5e0ffc.error(_0x4da901 + "\n\n command: image", _0x4da901, "*_Uhh dear, Didn't get any results!_*");
  }
});
smd({
  pattern: "couplepp",
  category: "search",
  desc: "Sends two couples pics.",
  filename: __filename
}, async _0x2dc3a1 => {
  try {
    let _0x1a50aa = await fetchJson("https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json");
    let _0x1b3e65 = _0x1a50aa[Math.floor(Math.random() * _0x1a50aa.length)];
    _0x2dc3a1.reply(_0x1b3e65.male, {
      caption: "*✦Couple Male profile✦*"
    }, "image");
    _0x2dc3a1.reply(_0x1b3e65.female, {
      caption: "*✦Couple Female profile✦*"
    }, "image");
  } catch (_0x234a1a) {
    return await _0x2dc3a1.error(_0x234a1a + "\n\n command: couplepp", _0x234a1a, "*_Uhh dear, Didn't get any results!_*");
  }
});
smd({
  pattern: "iswa",
  alias: ["oldwa", "bio", "onwa"],
  category: "search",
  desc: "Searches in given rage about given number.",
  use: "9112345678xx",
  filename: __filename
}, async (_0x4f6de7, _0x5ec434) => {
  if (!_0x5ec434) {
    return await _0x4f6de7.reply("Give Me Number without + sign. Example: .iswa 9231844741xx");
  }
  var _0x1e447f = _0x5ec434.split(" ")[0];
  if (!_0x1e447f.includes("x")) {
    return _0x4f6de7.reply("*You did not add x*\nExample: iswa 9231844741xx  \n " + Config.caption);
  }
  _0x4f6de7.reply("*Searching for WhatsApp account in given range...* \n " + Config.caption);
  function _0x4e5ad9(_0x42908, _0xe0b514) {
    return _0x42908.split(_0xe0b514).length - 1;
  }
  var _0x445c21 = _0x1e447f.split("x")[0];
  var _0x1b2d4b = _0x1e447f.split("x")[_0x4e5ad9(_0x1e447f, "x")] ? _0x1e447f.split("x")[_0x4e5ad9(_0x1e447f, "x")] : "";
  var _0x1f1dca = _0x4e5ad9(_0x1e447f, "x");
  var _0x3b1585;
  if (_0x1f1dca == 1) {
    _0x3b1585 = 10;
  } else if (_0x1f1dca == 2) {
    _0x3b1585 = 100;
  } else if (_0x1f1dca == 3) {
    _0x3b1585 = 1000;
  }
  _0x5ec434 = "*--『 List of Whatsapp Numbers 』--*\n\n";
  var _0x4754da = "\n*Bio:* || \nHey there! I am using WhatsApp.\n";
  var _0x2faee1 = "\n*Numbers with no WhatsApp account within provided range.*\n";
  for (let _0x46188d = 0; _0x46188d < _0x3b1585; _0x46188d++) {
    var _0x5cfeac = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var _0x570d84 = _0x5cfeac[Math.floor(Math.random() * _0x5cfeac.length)];
    var _0x12fd94 = _0x5cfeac[Math.floor(Math.random() * _0x5cfeac.length)];
    var _0x2c166f = _0x5cfeac[Math.floor(Math.random() * _0x5cfeac.length)];
    var _0x5bd309 = _0x5cfeac[Math.floor(Math.random() * _0x5cfeac.length)];
    var _0x4907d9;
    if (_0x1f1dca == 1) {
      _0x4907d9 = "" + _0x570d84;
    } else if (_0x1f1dca == 2) {
      _0x4907d9 = "" + _0x570d84 + _0x12fd94;
    } else if (_0x1f1dca == 3) {
      _0x4907d9 = "" + _0x570d84 + _0x12fd94 + _0x2c166f;
    } else if (_0x1f1dca == 4) {
      _0x4907d9 = "" + _0x570d84 + _0x12fd94 + _0x2c166f + _0x5bd309;
    }
    var _0xa0ac1d = await _0x4f6de7.bot.onWhatsApp("" + _0x445c21 + _0x46188d + _0x1b2d4b + "@s.whatsapp.net");
    var _0x2933a2 = _0xa0ac1d.length !== 0 ? _0xa0ac1d : false;
    try {
      try {
        var _0x30fb99 = await _0x4f6de7.bot.fetchStatus(_0xa0ac1d[0].jid);
      } catch {
        var _0x30fb99 = "401";
      }
      if (_0x30fb99 == "401" || _0x30fb99.status.length == 0) {
        _0x4754da += "wa.me/" + _0xa0ac1d[0].jid.split("@")[0] + "\n";
      } else {
        _0x5ec434 += "🧐 *Number:* wa.me/" + _0xa0ac1d[0].jid.split("@")[0] + "\n ✨*Bio :* " + _0x30fb99.status + "\n🍁*Last update :* " + moment(_0x30fb99.setAt).tz("Africa/Lagos").format("HH:mm:ss DD/MM/YYYY") + "\n\n";
      }
    } catch {
      _0x2faee1 += " ≛ " + _0x445c21 + _0x46188d + _0x1b2d4b + "\n";
    }
  }
  return await _0x4f6de7.reply("" + _0x5ec434 + _0x4754da + _0x2faee1);
});
smd({
  pattern: "nowa",
  category: "search",
  desc: "Searches in given rage about given number.",
  use: "9112345678xx",
  filename: __filename
}, async (_0x2798cf, _0x2091af) => {
  if (!_0x2091af) {
    return await _0x2798cf.reply("Give Me Number without + sign. Example: .nowa 9231844741xx");
  }
  const _0x4ad93f = _0x2091af.split(" ")[0];
  if (!_0x4ad93f.includes("x")) {
    return _0x2798cf.reply("*You did not add x in number.*\nExample: " + prefix + "nowa 9231844741xx  \n " + Config.caption);
  }
  _0x2798cf.reply("*Searching for WhatsApp account in the given range...*\n" + Config.caption);
  function _0x4b51e6(_0x5ebe73, _0x3e39fb) {
    return _0x5ebe73.split(_0x3e39fb).length - 1;
  }
  const _0x4cd6e4 = _0x4ad93f.split("x")[0];
  const _0x3f1f9a = _0x4ad93f.split("x").slice(-1)[0] || "";
  const _0x14a8ce = _0x4b51e6(_0x4ad93f, "x");
  const _0x164526 = [10, 100, 1000][_0x14a8ce - 1] || 0;
  let _0x2e5130 = "\n*『 WhatsApp Account With No Bio』* \n";
  let _0x56b6d1 = "";
  let _0x588b09 = "*『 Numbers With No WhatsApp Account 』* \n\n";
  for (let _0x4a3b26 = 0; _0x4a3b26 < _0x164526; _0x4a3b26++) {
    const _0x314800 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const _0x52e8e1 = _0x314800.slice(0, _0x14a8ce).map(() => _0x314800[Math.floor(Math.random() * _0x314800.length)]).join("");
    const _0x5b244b = ("" + _0x52e8e1 + _0x314800[Math.floor(Math.random() * _0x314800.length)]).slice(0, _0x14a8ce);
    const _0x376053 = await _0x2798cf.bot.onWhatsApp("" + _0x4cd6e4 + _0x4a3b26 + _0x3f1f9a);
    const _0x2931c2 = _0x376053.length !== 0 ? _0x376053 : false;
    try {
      const _0x4c7b5b = await _0x2798cf.bot.fetchStatus(_0x376053[0].jid);
      if (_0x4c7b5b === "401" || _0x4c7b5b.status.length === 0) {
        _0x56b6d1 += "wa.me/" + _0x376053[0].jid.split("@")[0] + "\n";
      }
    } catch {
      _0x588b09 += " ≛ " + _0x4cd6e4 + _0x4a3b26 + _0x3f1f9a + "\n";
    }
  }
  if (!_0x56b6d1) {
    _0x2e5130 = "";
  } else {
    _0x2e5130 += _0x56b6d1 + "\n\n";
  }
  return await _0x2798cf.reply("" + _0x2e5130 + _0x588b09 + Config.caption);
});