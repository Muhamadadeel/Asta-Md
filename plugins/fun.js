const axios = require("axios");
const {
  Config,
  randomeFunfacts,
  smd
} = require("../lib");
const fetch = require("node-fetch");
smd({
  cmdname: "question",
  info: "Random Question.",
  type: "pastime",
  filename: __filename
}, async (_0x526dda, _0x570e21, {
  smd: _0x59940a
}) => {
  try {
    await _0x526dda.reply(await randomeFunfacts(_0x59940a));
  } catch (_0x2763aa) {
    await _0x526dda.error(_0x2763aa + "\n\ncommand: " + _0x59940a, _0x2763aa);
  }
});
smd({
  cmdname: "truth",
  info: "truth and dare(truth game.).",
  type: "pastime",
  filename: __filename
}, async (_0xc2b276, _0x3b493e, {
  smd: _0x52be61
}) => {
  try {
    await _0xc2b276.reply(await randomeFunfacts(_0x52be61));
  } catch (_0x28b284) {
    await _0xc2b276.error(_0x28b284 + "\n\ncommand: " + _0x52be61, _0x28b284);
  }
});
smd({
  cmdname: "dare",
  info: "truth and dare(dare game.).",
  type: "pastime",
  filename: __filename
}, async (_0x330b72, _0x34d36a, {
  smd: _0x2a0858
}) => {
  try {
    await _0x330b72.reply(await randomeFunfacts(_0x2a0858));
  } catch (_0x27a0b8) {
    await _0x330b72.error(_0x27a0b8 + "\n\ncommand: " + _0x2a0858, _0x27a0b8);
  }
});
smd({
  cmdname: "joke",
  info: "Sends Joke in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x330ac0, _0x8b468d, {
  smd: _0x2e3522
}) => {
  try {
    await _0x330ac0.reply(await randomeFunfacts(_0x2e3522));
  } catch (_0x1817a2) {
    await _0x330ac0.error(_0x1817a2 + "\n\ncommand: " + _0x2e3522, _0x1817a2);
  }
});
smd({
  cmdname: "joke2",
  info: "Sends Joke in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x5c9c52, _0x6b6e25, {
  smd: _0x64ba
}) => {
  try {
    await _0x5c9c52.reply(await randomeFunfacts(_0x64ba));
  } catch (_0x35fd84) {
    await _0x5c9c52.error(_0x35fd84 + "\n\ncommand: " + _0x64ba, _0x35fd84);
  }
});
smd({
  cmdname: "fact",
  info: "Sends fact in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x1dc7e3, _0x16aaa1, {
  smd: _0x375b98
}) => {
  try {
    await _0x1dc7e3.reply(await randomeFunfacts(_0x375b98));
  } catch (_0x1e1a8b) {
    await _0x1dc7e3.error(_0x1e1a8b + "\n\ncommand: " + _0x375b98, _0x1e1a8b);
  }
});
smd({
  cmdname: "quotes",
  info: "Sends quotes in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x12963f, _0x4f30d2, {
  smd: _0x3462d1
}) => {
  try {
    await _0x12963f.reply(await randomeFunfacts(_0x3462d1));
  } catch (_0x18e714) {
    await _0x12963f.error(_0x18e714 + "\n\ncommand: " + _0x3462d1, _0x18e714);
  }
});
smd({
  cmdname: "define",
  info: "urban dictionary.",
  type: "pastime",
  filename: __filename
}, async (_0x460337, _0x614c0a) => {
  try {
    let _0x328d73 = _0x614c0a ? _0x614c0a : _0x460337.reply_text;
    if (!_0x328d73) {
      return await _0x460337.send("*_Hey " + _0x460337.senderName + ", please provide a text!_*");
    }
    let {
      data: _0x330600
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x328d73);
    var _0x27eb8f = _0x330600 ? "*Word:* ```" + _0x328d73 + "``` \n*Definition:* ```" + _0x330600.list[0].definition.replace(/\[/g, "").replace(/\]/g, "") + "``` \n*Example:* ```" + _0x330600.list[0].example.replace(/\[/g, "").replace(/\]/g, "") + "```" : "*_No results found for given word_*";
    return _0x460337.reply(_0x27eb8f);
  } catch (_0x1d0916) {
    await _0x460337.error(_0x1d0916 + "\n\ncommand: define", _0x1d0916, "*No result for:* ```" + text + "```");
  }
});