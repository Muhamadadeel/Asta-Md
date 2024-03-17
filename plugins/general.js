const util = require("util");
const fs = require("fs-extra");
const {
  cmd
} = require("../lib/plugins");
const {
  formatp,
  formatDate,
  TelegraPh,
  aitts,
  tlang,
  botpic,
  smd,
  prefix,
  fetchJson,
  runtime,
  Config,
  parsedJid,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");
const API_KEY = "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";
function _0x2a0d(_0x2b07fd, _0x5a63c2) {
  const _0x18d192 = _0x2953();
  _0x2a0d = function (_0x2bfbef, _0x53a724) {
    _0x2bfbef = _0x2bfbef - 233;
    let _0x3b7d34 = _0x18d192[_0x2bfbef];
    return _0x3b7d34;
  };
  return _0x2a0d(_0x2b07fd, _0x5a63c2);
}
function _0x2953() {
  const _0x5389c2 = ["json", "choices", "2KTKIiW", "application/json", "chat", "http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[", "4017447FwUKbt", "2673069xtYnEg", "REMOVE_BG_KEY", "Bearer ", "image-alpha-001", "320668Kzvhym", "data", "then", "message", "1548910BYiCAA", "error in aiResponce : ", "119490ILpvcx", "system", "sender", "binary", "from", "log", "dalle", "https://api.remove.bg/v1.0/removebg", "567277OBjzQH", "length", "get", "POST", "stringify", "content", "512x512", "78qmNvDj", "https://api.openai.com/v1/images/generations", "Error While getting Ai responce ", "url", "catch", "]&msg=[", "split", "8yTiNwA", "You", "gpt", "1769427SEqioY"];
  _0x2953 = function () {
    return _0x5389c2;
  };
  return _0x2953();
}
(function (_0x553aa9, _0x37fe88) {
  const _0x5202dd = _0x2a0d;
  const _0x3eb523 = _0x553aa9();
  while (true) {
    try {
      const _0x1754c7 = parseInt(_0x5202dd(264)) / 1 * (-parseInt(_0x5202dd(241)) / 2) + parseInt(_0x5202dd(238)) / 3 + -parseInt(_0x5202dd(250)) / 4 + -parseInt(_0x5202dd(256)) / 5 * (parseInt(_0x5202dd(271)) / 6) + parseInt(_0x5202dd(246)) / 7 * (parseInt(_0x5202dd(235)) / 8) + parseInt(_0x5202dd(245)) / 9 + -parseInt(_0x5202dd(254)) / 10;
      if (_0x1754c7 === _0x37fe88) {
        break;
      } else {
        _0x3eb523.push(_0x3eb523.shift());
      }
    } catch (_0x5a37c0) {
      _0x3eb523.push(_0x3eb523.shift());
    }
  }
})(_0x2953, 305050);
async function aiResponce(_0x3ecab6, _0x54ec2e, _0x9975a = "") {
  const _0xe38ea1 = _0x2a0d;
  let _0x5e8c02 = "";
  try {
    if (_0x54ec2e === _0xe38ea1(243)) {
      _0x5e8c02 = await (await axios[_0xe38ea1(266)](_0xe38ea1(244) + _0x3ecab6[_0xe38ea1(258)][_0xe38ea1(234)]("@")[0] + _0xe38ea1(233) + _0x9975a + "]"))[_0xe38ea1(251)].cnt;
    } else if (_0x54ec2e === _0xe38ea1(237)) {
      const _0x1f65af = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: _0xe38ea1(248) + Config.OPENAI_API_KEY
        },
        body: JSON[_0xe38ea1(268)]({
          model: "gpt-3.5-turbo",
          messages: [{
            role: _0xe38ea1(257),
            content: _0xe38ea1(236)
          }, {
            role: "user",
            content: _0x9975a
          }]
        })
      });
      const _0x6a97b4 = await _0x1f65af[_0xe38ea1(239)]();
      if (!_0x6a97b4[_0xe38ea1(240)] || _0x6a97b4[_0xe38ea1(240)][_0xe38ea1(265)] === 0) {
        _0x5e8c02 = "*Invalid ChatGPT API Key, Please Put New Key*";
      } else {
        _0x5e8c02 = _0x6a97b4[_0xe38ea1(240)][0][_0xe38ea1(253)][_0xe38ea1(269)];
      }
    } else if (_0x54ec2e === _0xe38ea1(262)) {
      const _0x2d4193 = await fetch(_0xe38ea1(272), {
        method: _0xe38ea1(267),
        headers: {
          "Content-Type": _0xe38ea1(242),
          Authorization: _0xe38ea1(248) + Config.OPENAI_API_KEY
        },
        body: JSON[_0xe38ea1(268)]({
          model: _0xe38ea1(249),
          prompt: _0x9975a,
          size: _0xe38ea1(270),
          response_format: _0xe38ea1(274)
        })
      });
      const _0x34b28a = await _0x2d4193[_0xe38ea1(239)]();
      _0x5e8c02 = _0x34b28a[_0xe38ea1(251)][0][_0xe38ea1(274)];
    }
    if (_0x54ec2e === "rmbg") {
      const _0x2a998b = {
        image_url: _0x9975a,
        size: "auto"
      };
      axios.post(_0xe38ea1(263), _0x2a998b, {
        headers: {
          "X-Api-Key": Config[_0xe38ea1(247)]
        },
        responseType: "arraybuffer"
      })[_0xe38ea1(252)](_0x42e641 => {
        const _0xe58984 = _0xe38ea1;
        _0x5e8c02 = Buffer[_0xe58984(260)](_0x42e641[_0xe58984(251)], _0xe58984(259));
      })[_0xe38ea1(275)](_0x211811 => {
        _0x5e8c02 = false;
      });
    }
    return _0x5e8c02;
  } catch (_0x3f493b) {
    console[_0xe38ea1(261)](_0xe38ea1(255), _0x3f493b);
    return _0xe38ea1(273);
  }
}
;
smd({
  pattern: "chat",
  desc: "chat with an AI",
  category: "ai",
  use: "<Hii, Suhail Tech Info>",
  filename: __filename
}, async (_0x3980b3, _0x46b135) => {
  try {
    return _0x3980b3.reply(await aiResponce(_0x3980b3, "chat", _0x46b135));
  } catch (_0x428175) {
    await _0x3980b3.error(_0x428175 + "\n\ncommand: chat", _0x428175, "*_no responce from chatbot, sorry!!_*");
  }
});
smd({
  pattern: "gpt",
  desc: "chat with an AI",
  category: "ai",
  use: "<Hii, Suhail Tech Info>",
  filename: __filename
}, async (_0x56c30d, _0x227e8e) => {
  try {
    try {
      let _0x1fe9ac = _0x227e8e ? _0x227e8e : bot.reply_text;
      if (!_0x1fe9ac) {
        return man.reply("Provide me a query ex Who is Suhail");
      }
      const _0x2f3a98 = await fetch("https://aemt.me/openai?text=" + _0x1fe9ac);
      const _0x5b7eaf = await _0x2f3a98.json();
      if (_0x5b7eaf && _0x5b7eaf.status && _0x5b7eaf.result) {
        return await _0x56c30d.reply(_0x5b7eaf.result);
      }
    } catch {}
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return _0x56c30d.reply("```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```");
    }
    if (!_0x227e8e) {
      return _0x56c30d.reply("Hey there! " + _0x56c30d.senderName + ". How are you doing these days?");
    }
    return _0x56c30d.send(await aiResponce(_0x56c30d, "gpt", _0x227e8e));
  } catch (_0x35a6b3) {
    await _0x56c30d.error(_0x35a6b3 + "\n\ncommand: gpt", _0x35a6b3, "*_no responce from chatgpt, sorry!!_*");
  }
});
smd({
  pattern: "fgpt",
  desc: "chat with an AI",
  category: "ai",
  use: "<query>",
  filename: __filename
}, async (_0x3d612e, _0x7b040f) => {
  try {
    let _0x1bbdf2 = _0x7b040f ? _0x7b040f : _0x3d612e.reply_text;
    if (!_0x1bbdf2) {
      return _0x3d612e.reply("Provide me a query ex Who is Suhail");
    }
    const _0x41bcd0 = await fetch("https://aemt.me/openai?text=" + _0x1bbdf2);
    const _0x2f9bac = await _0x41bcd0.json();
    if (_0x2f9bac && _0x2f9bac.status && _0x2f9bac.result) {
      return await _0x3d612e.send(_0x2f9bac.result);
    } else {
      await _0x3d612e.send("*_Error while getting gpt responce!!_*");
    }
  } catch (_0x412dc0) {
    await _0x3d612e.error(_0x412dc0 + "\n\ncommand: fgpt", _0x412dc0, "*_no responce from chatgpt, sorry!!_*");
  }
});
smd({
  pattern: "dalle",
  alias: ["dall", "dall-e"],
  desc: "chat with an AI",
  category: "ai",
  use: "<Hii, Suhail Tech Info>",
  filename: __filename
}, async (_0x108a26, _0x418e28) => {
  try {
    if (!_0x418e28) {
      return await _0x108a26.reply("*Give Me A Query To Get Dall-E Reponce?*");
    }
    const _0x1fd40b = "https://gurugpt.cyclic.app/dalle?prompt=" + encodeURIComponent(_0x418e28);
    try {
      return await _0x108a26.bot.sendMessage(_0x108a26.chat, {
        image: {
          url: _0x1fd40b
        },
        caption: "[PROMPT]: ```" + _0x418e28 + " ```  \n " + Config.caption + " "
      });
    } catch (_0x349a0c) {
      console.log("ERROR IN DALLE RESPONCE FROM API GURUGPT\n", _0x349a0c);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return _0x108a26.reply("```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```");
    }
    return await _0x108a26.bot.sendMessage(_0x108a26.chat, {
      image: {
        url: await aiResponce(_0x108a26, "dalle", _0x418e28)
      },
      caption: "*---Your DALL-E Result---*\n" + Config.caption
    });
  } catch (_0x560430) {
    await _0x108a26.error(_0x560430 + "\n\ncommand: dalle", _0x560430, "*_No responce from Dall-E Ai, Sorry!!_*");
  }
});
smd({
  pattern: "imagine",
  alias: ["imagin"],
  desc: "chat with an AI",
  category: "ai",
  use: "<boy walking on street>",
  filename: __filename
}, async (_0x11b66e, _0x46adf0) => {
  try {
    if (!_0x46adf0) {
      return await _0x11b66e.reply("*Give Me A Query To Get imagination?*");
    }
    const _0x4d7db1 = "https://gurugpt.cyclic.app/dalle?prompt=" + encodeURIComponent(_0x46adf0 + " \nNOTE: Make sure to looks like imagination");
    let _0x1aa46b = false;
    try {
      const _0x12db7b = await fetch("https://aemt.me/openai?text=" + (_0x46adf0 + " \nNOTE: Make sure to looks like imagination, make it short and concise, also in english!"));
      const _0x277bc1 = await _0x12db7b.json();
      _0x1aa46b = _0x277bc1 && _0x277bc1.status && _0x277bc1.result ? _0x277bc1.result : "";
    } catch (_0x459e6f) {
      _0x1aa46b = false;
    }
    try {
      return await _0x11b66e.bot.sendMessage(_0x11b66e.chat, {
        image: {
          url: _0x4d7db1
        },
        caption: "*[IMAGININATION]:* ```" + _0x46adf0 + " ```" + (_0x1aa46b ? "\n\n*[RESPONCE]:* ```" + _0x1aa46b + "``` \n" : "") + "  \n " + Config.caption + " "
      });
    } catch (_0x5809a1) {
      console.log("ERROR IN IMAGINE RESPONCE FROM API GURUGPT\n", _0x5809a1);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return _0x11b66e.reply("```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```");
    }
    return await _0x11b66e.bot.sendMessage(_0x11b66e.chat, {
      image: {
        url: await aiResponce(_0x11b66e, "dalle", _0x46adf0)
      },
      caption: "*---Your DALL-E Result---*\n" + Config.caption
    });
  } catch (_0x3ab4aa) {
    await _0x11b66e.error(_0x3ab4aa + "\n\ncommand: imagine", _0x3ab4aa, "*_No responce from Server side, Sorry!!_*");
  }
});
smd({
  pattern: "rmbg",
  alias: ["removebg"],
  category: "ai",
  filename: __filename,
  desc: "Remove image Background."
}, async _0x2e61ea => {
  try {
    if (!Config.REMOVE_BG_KEY) {
      return _0x2e61ea.reply("```You Dont Have REMOVE_BG_KEY \nPlease Create RemoveBG KEY from Given Link \nhttps://www.remove.bg/\nAnd Set Key in REMOVE_BG_KEY Var```");
    }
    let _0x1dbec1 = ["imageMessage"];
    let _0x2cac3e = _0x1dbec1.includes(_0x2e61ea.mtype) ? _0x2e61ea : _0x2e61ea.reply_message;
    if (!_0x2cac3e || !_0x1dbec1.includes(_0x2cac3e?.mtype || "null")) {
      return await _0x2e61ea.send("*_Uhh Dear, Reply to an image_*");
    }
    let _0x145420 = await _0x2e61ea.bot.downloadAndSaveMediaMessage(_0x2cac3e);
    let _0x4592aa = await TelegraPh(_0x145420);
    try {
      fs.unlinkSync(_0x145420);
    } catch {}
    let _0x1f9866 = await aiResponce(_0x2e61ea, "rmbg", _0x4592aa);
    if (_0x1f9866) {
      await _0x2e61ea.send(_0x1f9866, {
        caption: Config.caption
      }, "image", _0x2e61ea);
    } else {
      await _0x2e61ea.send("*_Request not be preceed!!_*");
    }
  } catch (_0x5b520e) {
    await _0x2e61ea.error(_0x5b520e + "\n\ncommand: rmbg", _0x5b520e, "*_No responce from remove.bg, Sorry!!_*");
  }
});
smd({
  pattern: "readmore",
  alias: ["rmore", "readmor"],
  desc: "Adds *readmore* in given text.",
  category: "general",
  filename: __filename
}, async (_0x4de5bf, _0x5018a3) => {
  try {
    let _0x57fc1f = _0x5018a3 ? _0x5018a3 : _0x4de5bf.reply_text;
    if (!_0x57fc1f) {
      _0x57fc1f = "*Uhh Dear,Please provide text*\n*Eg:- _.readmor text1 readmore text2_*";
    } else {
      _0x57fc1f += " ";
    }
    if (_0x57fc1f.includes("readmore")) {
      await _0x4de5bf.reply(_0x57fc1f.replace(/readmore/, String.fromCharCode(8206).repeat(4001)));
    } else {
      await _0x4de5bf.reply(_0x57fc1f.replace(" ", String.fromCharCode(8206).repeat(4001)));
    }
  } catch (_0x21d8d9) {
    await _0x4de5bf.error(_0x21d8d9 + "\n\ncommand : readmore", _0x21d8d9, false);
  }
});
let pmtypes = ["videoMessage", "imageMessage"];
cmd({
  pattern: "url2",
  alias: ["createurl"],
  category: "general",
  filename: __filename,
  desc: "image to url.",
  use: "<video | image>"
}, async _0x9f7d31 => {
  try {
    let _0x4ddd0f = pmtypes.includes(_0x9f7d31.mtype) ? _0x9f7d31 : _0x9f7d31.reply_message;
    if (!_0x4ddd0f || !pmtypes.includes(_0x4ddd0f?.mtype)) {
      return _0x9f7d31.reply("*_Uhh Dear, Reply To An Image/Video!_*");
    }
    let _0x5344b3 = await _0x9f7d31.bot.downloadAndSaveMediaMessage(_0x4ddd0f);
    let _0x560b97 = await createUrl(_0x5344b3);
    if (!_0x560b97) {
      return _0x9f7d31.reply("*_Failed To Create Url!_*");
    }
    try {
      fs.unlink(_0x5344b3);
    } catch {}
    await _0x9f7d31.send(util.format(_0x560b97), {}, "suhail", _0x4ddd0f);
  } catch (_0x80caeb) {
    await _0x9f7d31.error(_0x80caeb + "\n\ncommand url", _0x80caeb);
  }
});
cmd({
  pattern: "url",
  category: "general",
  filename: __filename,
  desc: "image to url.",
  use: "<video | image>"
}, async _0x50c289 => {
  try {
    let _0x1d1201 = pmtypes.includes(_0x50c289.mtype) ? _0x50c289 : _0x50c289.reply_message;
    if (!_0x1d1201 || !pmtypes.includes(_0x1d1201?.mtype)) {
      return _0x50c289.reply("*_Uhh Dear, Reply To An Image/Video!_*");
    }
    let _0x23b526 = await _0x50c289.bot.downloadAndSaveMediaMessage(_0x1d1201);
    let _0x667ec = await createUrl(_0x23b526, "uguMashi");
    try {
      fs.unlink(_0x23b526);
    } catch {}
    if (!_0x667ec || !_0x667ec.url) {
      return _0x50c289.reply("*_Failed To Create Url!_*");
    }
    await _0x50c289.send(util.format(_0x667ec.url), {}, "suhail", _0x1d1201);
  } catch (_0x15267f) {
    await _0x50c289.error(_0x15267f + "\n\ncommand url", _0x15267f);
  }
});
smd({
  pattern: "calc",
  desc: "calculate an equation.",
  category: "general",
  use: "<equation>",
  filename: __filename
}, async (_0x3fd1e9, _0x349482) => {
  try {
    if (!_0x349482) {
      return await _0x3fd1e9.reply("*Please enter a math operation*\n*Example: .calc 22+12*");
    }
    let _0x3b50f0 = _0x349482.replace(/\s+/g, "");
    if (!/^(\d+([-+%*/]\d+)+)$/.test(_0x3b50f0)) {
      return await _0x3fd1e9.reply("Please enter a valid mathematical operation.");
    }
    const _0x5a8d59 = _0x57cdbd => {
      return new Function("return " + _0x57cdbd)();
    };
    const _0xa6c33b = _0x5a8d59(_0x3b50f0);
    if (_0x3b50f0.includes("/") && _0x3b50f0.split("/").some(_0x348ce2 => _0x348ce2 === "0")) {
      return _0x3fd1e9.reply("Cannot divide by zero.");
    }
    if (_0x3b50f0.split(/[-+%*/]/).length <= 2) {
      const [_0x24b376, _0x6207ee, _0x3fc23c] = _0x3b50f0.match(/\d+|[-+%*/]/g);
      return await _0x3fd1e9.reply(_0x24b376 + " " + _0x6207ee + " " + _0x3fc23c + " = " + _0xa6c33b);
    } else {
      return await _0x3fd1e9.reply("Result: " + _0xa6c33b);
    }
  } catch (_0x3d45a2) {
    return await _0x3fd1e9.error(_0x3d45a2 + "\n\ncommand: calc", _0x3d45a2);
  }
});
async function getDateTime() {
  const _0x2c6bec = new Date();
  const _0x273b92 = _0x2c6bec.toISOString().slice(0, 10);
  const _0x57bf22 = _0x2c6bec.toLocaleTimeString();
  return {
    date: _0x273b92,
    time: _0x57bf22
  };
}
smd({
  pattern: "repo",
  alias: ["git", "sc", "script"],
  desc: "Sends info about repo",
  category: "general",
  filename: __filename
}, async _0x332b1c => {
  try {
    let {
      data: _0x5d64c3
    } = await axios.get("https://api.github.com/repos/SuhailTechInfo/Suhail-Md");
    let _0x178fc8 = ("\nI'm Suhail-Md. A whatsApp chuddy buddy bot with rich features, Created By *" + Config.ownername + "*. 🔰\n\n  *❲❒❳ Stars:* " + (_0x5d64c3?.stargazers_count || "120+") + " stars\n  *❲❒❳ Forks:* " + (_0x5d64c3?.forks_count || "1000+") + " forks\n  *❲❒❳ Auther:* SuhailTechInfo\n  *❲❒❳ Create:* " + (_0x5d64c3?.created_at || "undefined") + "\n  *❲❒❳ Repo:* _https://github.com/SuhailTechInfo/Suhail-Md_\n  *❲❒❳ Scan:* _" + scan + "_\n\n  *❲❒❳ Visit For Tutorial* _https://www.Youtube.com/c/SuhailTechInfo_\n" + (Config.caption ? "\n\n" + Config.caption : "")).trim();
    return await _0x332b1c.sendUi(_0x332b1c.jid, {
      caption: _0x178fc8
    });
  } catch (_0x3e5493) {
    await _0x332b1c.error(_0x3e5493 + "\n\ncommand: dalle", _0x3e5493);
  }
});
smd({
  pattern: "status",
  alias: ["about", "info"],
  desc: "To check bot status",
  category: "general",
  filename: __filename
}, async _0x144393 => {
  const _0x374a39 = process.uptime();
  timestampe = speed();
  latensie = speed() - timestampe;
  let _0xa728d6 = (" 🔰 *I am " + Config.botname + "* 🔰\n  *❲❒❳ Description:* A WhatsApp bot with rich features, Created By *" + Config.ownername + "*.\n\n  *❲❒❳ Speed:* " + latensie.toFixed(4) + " ms\n  *❲❒❳ Uptime:* " + runtime(process.uptime()) + "\n  *❲❒❳ Version:* " + Config.VERSION + "\n  *❲❒❳ Owner:*  " + Config.ownername + "\n\n  *❲❒❳ Support:* _" + gurl + "_ \n" + (Config.caption ? "\n\n" + Config.caption : "")).trim();
  return await _0x144393.bot.sendUi(_0x144393.jid, {
    caption: _0xa728d6
  });
});
smd({
  pattern: "cpu",
  desc: "To check bot status",
  category: "general",
  filename: __filename
}, async _0x569045 => {
  try {
    const _0x4eaa78 = process.memoryUsage();
    const _0x24400 = os.cpus().map(_0x58081c => {
      _0x58081c.total = Object.keys(_0x58081c.times).reduce((_0x581099, _0x21adae) => _0x581099 + _0x58081c.times[_0x21adae], 0);
      return _0x58081c;
    });
    const _0x3fe751 = _0x24400.reduce((_0x46f6d3, _0x2ce492, _0x20c788, {
      length: _0xa39213
    }) => {
      _0x46f6d3.total += _0x2ce492.total;
      _0x46f6d3.speed += _0x2ce492.speed / _0xa39213;
      _0x46f6d3.times.user += _0x2ce492.times.user;
      _0x46f6d3.times.nice += _0x2ce492.times.nice;
      _0x46f6d3.times.sys += _0x2ce492.times.sys;
      _0x46f6d3.times.idle += _0x2ce492.times.idle;
      _0x46f6d3.times.irq += _0x2ce492.times.irq;
      return _0x46f6d3;
    }, {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0
      }
    });
    timestampe = speed();
    latensie = speed() - timestampe;
    var _0x37d66e = performance.now();
    var _0x2b976f = performance.now();
    respon = ("*❲❒❳ " + Config.botname + " Server Info ❲❒❳*\n\n  *❲❒❳ Runtime:* " + runtime(process.uptime()) + "\n  *❲❒❳ Speed:* " + latensie.toFixed(3) + "/" + (_0x2b976f - _0x37d66e).toFixed(3) + " ms\n  *❲❒❳ RAM:* " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n  *❲❒❳ Memory Usage:*\n      " + Object.keys(_0x4eaa78).map((_0x1d560e, _0x274920, _0x714ade) => _0x1d560e.padEnd(Math.max(..._0x714ade.map(_0x194d62 => _0x194d62.length)), " ") + ": " + formatp(_0x4eaa78[_0x1d560e])).join("\n      ") + "\n\n" + (_0x24400[0] ? "  *❲❒❳ Total CPU Usage:*\n  *" + _0x24400[0].model.trim() + " (" + _0x3fe751.speed + " MHZ)*\n      " + Object.keys(_0x3fe751.times).map(_0x3bc7af => "-" + (_0x3bc7af + "").padEnd(6) + ": " + (_0x3fe751.times[_0x3bc7af] * 100 / _0x3fe751.total).toFixed(2) + "%").join("\n      ") + "\n\n  *❲❒❳ CPU Core Usage (" + _0x24400.length + " Core CPU)*\n  " + _0x24400.map((_0x2d8be0, _0x48cac2) => "*Core " + (_0x48cac2 + 1) + ": " + _0x2d8be0.model.trim() + " (" + _0x2d8be0.speed + " MHZ)*\n      " + Object.keys(_0x2d8be0.times).map(_0x3e13af => "-" + (_0x3e13af + "").padEnd(6) + ": " + (_0x2d8be0.times[_0x3e13af] * 100 / _0x2d8be0.total).toFixed(2) + "%").join("\n      ")).join("\n\n") : "") + "\n").trim();
    return await _0x569045.send(respon, {}, "", _0x569045);
  } catch (_0x272406) {
    await _0x569045.error(_0x272406 + "\n\ncommand: cpu", _0x272406, "*_No responce from Server side, Sorry!!_*");
  }
});
smd({
  pattern: "advt",
  alias: ["advertisement"],
  category: "ai",
  desc: "Advertise of your Message, by sending it to provided nmbr range.",
  use: "9231844741xx,Your_text_here",
  fromMe: true,
  filename: __filename
}, async (_0xc22345, _0x54a4ca) => {
  try {
    let _0x8f5115 = _0x54a4ca ? _0x54a4ca : _0xc22345.reply_text;
    if (!_0x8f5115) {
      return await _0xc22345.reply("*Advertise of your Message*\n*by sending it to provided nmbr range.*\n" + prefix + "advt 9231844741xx,Your_text_here");
    }
    const _0x407ad1 = _0x8f5115.indexOf(",");
    if (_0x407ad1 === -1) {
      return await _0xc22345.send("*Invalid format. Please provide number and Message separated by a comma.*");
    }
    let _0x48e2fd = "" + _0x8f5115.slice(0, _0x407ad1).trim();
    let _0x2ea2e4 = _0x8f5115.slice(_0x407ad1 + 1).trim() + "\n\n\n" + Config.caption;
    if (!_0x48e2fd.includes("x")) {
      return _0xc22345.send("*You did not add x in number.*\n*Ex: " + prefix + "advt 9231844741xx,Your_Message_here*  \n " + Config.caption);
    }
    await _0xc22345.send("*Sending message to given number range.!*\n*It may take some time, so wait please*");
    function _0x31d37f(_0x5230f4, _0x344fa6) {
      return _0x5230f4.split(_0x344fa6).length - 1;
    }
    var _0xf8fbfa = _0x48e2fd.split("x")[0];
    var _0x1872aa = _0x48e2fd.split("x")[_0x31d37f(_0x48e2fd, "x")] ? _0x48e2fd.split("x")[_0x31d37f(_0x48e2fd, "x")] : "";
    var _0x1d53e1 = _0x31d37f(_0x48e2fd, "x");
    var _0x3ce215;
    if (_0x1d53e1 == 1) {
      _0x3ce215 = 10;
    } else if (_0x1d53e1 == 2) {
      _0x3ce215 = 100;
    } else if (_0x1d53e1 == 3) {
      _0x3ce215 = 1000;
    } else if (_0x1d53e1 > 3) {
      return await _0xc22345.send("*Only 3(x) are Allowed in number*");
    }
    let _0x116bfc = 0;
    let _0x109212 = "";
    var _0x457851 = "";
    for (let _0x5237d3 = 0; _0x5237d3 < _0x3ce215; _0x5237d3++) {
      var _0x307a54 = await _0xc22345.bot.onWhatsApp("" + _0xf8fbfa + _0x5237d3 + _0x1872aa + "@s.whatsapp.net");
      if (_0x307a54[0]) {
        _0x457851 = _0x307a54[0].jid;
        if (_0x109212.includes(_0x457851)) {
          continue;
        }
        await sleep(1500);
        await _0xc22345.bot.sendMessage(_0x457851, {
          text: _0x2ea2e4
        });
        _0x109212 = _0x109212 + "," + _0x457851;
        _0x116bfc += 1;
      }
    }
    return await _0xc22345.send("*_Advertisement of your Message is Done,_* \n\n*_Message Succesfully sent to " + _0x116bfc + " chats_*\nLast_User: " + _0x457851.split("@")[0] + "\nSearch_No: " + _0x3ce215 + " number searched\n\n\n" + Config.caption);
  } catch (_0x31c603) {
    await _0xc22345.error(_0x31c603 + "\n\ncommand: dalle", _0x31c603, "*_No responce from Server side, Sorry!!_*");
  }
});
const sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg = {};
let isAnnonyMsgAlive = "";
let cmdName = "rcg";
class AnonymousMsg {
  constructor() {
    this.id = "";
    this.sender = "";
    this.reciever = "";
    this.senderMsg = "";
    this.tellinfo = 0;
    this.howmanyreply = 0;
  }
}
smd({
  pattern: "anonymsg",
  alias: ["recognition", "anonychat"],
  desc: "Send message Annonymously",
  category: "ai",
  use: "<Hii, Suhail Tech Info>",
  filename: __filename
}, async (_0x3a369d, _0x354ce4, {
  smd: _0x55a438
}) => {
  try {
    let _0x490254 = _0x354ce4 ? _0x354ce4 : _0x3a369d.reply_text;
    if (!_0x490254) {
      return await _0x3a369d.send("*provide number with msg to send Anonymously.* \n*Example " + (prefix + _0x55a438) + " 2348039607375,your_Message*", {}, "", _0x3a369d);
    }
    if (_0x3a369d.isCreator && _0x490254 === "info") {
      return await _0x3a369d.reply(isAnnonyMsgAlive == "" ? "*Theres no Anonymous Chat created yet*" : "*Anonymous Chat Recivers*\n_" + isAnnonyMsgAlive + "_");
    }
    const _0x3c18a0 = _0x490254.indexOf(",");
    if (_0x3c18a0 === -1) {
      return await _0x3a369d.reply("*Invalid format. Please provide both number and Message separated by a comma.*");
    }
    let _0x32ce69 = _0x490254.slice(0, _0x3c18a0).trim() + "@s.whatsapp.net";
    let _0x114453 = _0x490254.slice(_0x3c18a0 + 1).trim();
    let _0x218aa3 = (await parsedJid(_0x32ce69)) || [];
    if (_0x218aa3[0]) {
      const {
        date: _0x3c4fb1,
        time: _0x39736e
      } = await getDateTime();
      const _0xc3fe9f = "anony-msg-" + Math.floor(100000 + Math.random() * 900000);
      sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0xc3fe9f] = new AnonymousMsg();
      let _0x42ed31 = sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0xc3fe9f];
      _0x42ed31.id = _0xc3fe9f;
      _0x42ed31.sender = _0x3a369d.sender;
      _0x42ed31.reciever = _0x218aa3[0];
      _0x42ed31.msgStatus = true;
      _0x42ed31.senderMsg = _0x3a369d;
      _0x114453 = "*sᴜʜᴀɪʟ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ*\n\n*Msg_Id:* " + _0x42ed31.id + "\n*Date:* _" + _0x3c4fb1 + "_\n*Time:* _" + _0x39736e + "_\n\n*Message:* " + _0x114453 + "\n\n\n" + Config.caption;
      isAnnonyMsgAlive = isAnnonyMsgAlive + "," + _0x42ed31.reciever;
      await _0x3a369d.bot.sendMessage(_0x42ed31.reciever, {
        text: _0x114453
      });
      return await _0x3a369d.reply("*_Anonymous message sent succesfully_*");
    } else {
      return await _0x3a369d.reply("*_Provided number is not valid!!!_*");
    }
  } catch (_0x2ce04c) {
    await _0x3a369d.error(_0x2ce04c + "\n\ncommand: " + _0x55a438, _0x2ce04c, "*_Can't send annonymously message yet, Sorry!!_*");
  }
});
smd({
  on: "text"
}, async _0x323de7 => {
  try {
    if (_0x323de7.quoted && isAnnonyMsgAlive.includes(_0x323de7.sender) && _0x323de7.text.length > 2) {
      const _0x4e34c0 = _0x323de7.reply_text.split("\n");
      if (_0x4e34c0.length < 3) {
        return;
      }
      if (_0x323de7.reply_text.includes("sᴜʜᴀɪʟ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x4e34c0[0].includes("sᴜʜᴀɪʟ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x4e34c0[2].includes("Msg_Id")) {
        let _0x3f8443 = "" + _0x4e34c0[2].replace("*Msg_Id:* ", "").trim();
        let _0x1d4a2b = sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3f8443];
        if (!_0x1d4a2b) {
          return;
        }
        try {
          if (_0x1d4a2b) {
            let _0x2099a4 = _0x323de7.text.split(",")[0].trim();
            if (_0x2099a4.toLowerCase().startsWith("reply")) {
              _0x1d4a2b.howmanyreply += 1;
              const _0x78df12 = _0x323de7.text.indexOf(",");
              let _0x552ebf = "*sᴜʜᴀɪʟ-ᴍᴅ • ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @" + _0x1d4a2b.reciever.split("@")[0] + "_*\n*_Msg_Id: " + _0x1d4a2b.id + "_*\n\n*Message:* " + _0x323de7.text.slice(_0x78df12 + 1).trim() + "\n\n\n\n" + Config.caption;
              if (_0x1d4a2b.howmanyreply >= 2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + _0x323de7.sender, "");
              }
              await _0x323de7.bot.sendMessage(_0x1d4a2b.sender, {
                text: _0x552ebf,
                mentions: [_0x1d4a2b.reciever]
              }, {
                quoted: _0x1d4a2b.senderMsg
              });
              if (_0x1d4a2b.howmanyreply >= 2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + _0x323de7.sender, "");
                delete sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3f8443];
              }
              return await _0x323de7.reply("*_Your Message succesfully deliver to User_* " + (_0x1d4a2b.howmanyreply == 1 ? "\n*you can reply 1 more time*" : "") + " ");
            } else if (_0x1d4a2b.tellinfo === 0) {
              _0x1d4a2b.tellinfo = 1;
              let _0x1c1373 = "*Basically, Its an Annonymous Message*\n\n_Msg_Id: " + _0x1d4a2b.id + "_\n_this message sended by a chatbot_\n_User not wants to expose itself to send that msg_\n\n\n*if you wanna reply to that user,*\n*Send msg by replying to above message*\n*Type like:* reply, Type_your_Message_Here\n*Example:* reply, Can you text me from your number\n\n\n" + Config.caption;
              _0x323de7.bot.sendMessage(_0x1d4a2b.reciever, {
                text: _0x1c1373
              }, {
                quoted: _0x323de7
              });
            } else if (_0x1d4a2b.tellinfo === 1) {
              _0x1d4a2b.tellinfo = 2;
              _0x323de7.reply("*Please follow the format if reply to msg*\n*Type like: _reply, Type_your_Message_Here_*");
            }
          }
        } catch (_0x59c255) {
          console.log("error : ", _0x59c255);
        }
      }
    }
  } catch {}
});
smd({
  pattern: "aitts",
  desc: "Text to Voice Using Eleven Lab Ai",
  category: "ai",
  use: "<Hii, Suhail Tech Info>",
  filename: __filename
}, async (_0x4d28b1, _0x31f559) => {
  await aitts(_0x4d28b1, _0x31f559);
});