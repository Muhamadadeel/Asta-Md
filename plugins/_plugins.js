const axios = require("axios");
const fs = require("fs-extra");
const {
  exec
} = require("child_process");
const {
  plugins,
  isUrl,
  smd,
  tlang,
  Config,
  smdJson,
  smdBuffer
} = require("../lib");
let s_ser = true;
smd({
  cmdname: "restart",
  info: "To restart bot",
  type: "tools",
  fromMe: s_ser,
  filename: __filename
}, async _0x514d3c => {
  const {
    exec: _0x1912df
  } = require("child_process");
  _0x514d3c.reply("Restarting");
  _0x1912df("pm2 restart all");
});
smd({
  cmdname: "listplugin",
  type: "owner",
  info: "Shows list of all external modules",
  filename: __filename,
  use: "<name>"
}, async _0x8756ab => {
  try {
    let _0x1314ee = await smdJson("https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/plugins/listPlugin.json");
    if (_0x1314ee && _0x1314ee.result && _0x1314ee.result[0]) {
      let _0x11de04 = "";
      for (let _0x24bb13 = 0; _0x24bb13 < _0x1314ee.result.length; _0x24bb13++) {
        _0x11de04 += _0x1314ee.result[_0x24bb13].name + ": _" + _0x1314ee.result[_0x24bb13].url + "_\n\n";
      }
      let _0x296ab0 = await smdBuffer("https://telegra.ph/file/2fa8e0e24eea3f363d5f6.jpg");
      var _0x35be1d = {
        ...(await _0x8756ab.bot.contextInfo("ꜱᴜʜᴀɪʟ-ᴍᴅ", "Pʟᴜɢɪɴꜱ", _0x296ab0 ? _0x296ab0 : log0, 1, gurl, "1"))
      };
      await _0x8756ab.reply(_0x11de04, {
        contextInfo: _0x35be1d
      });
    }
    if (_0x1314ee && _0x1314ee.external && _0x1314ee.external[0]) {
      let _0x29d9e5 = "";
      let _0xeb34e7 = await smdBuffer("https://telegra.ph/file/369a41986ee5c49db251d.jpg");
      var _0x35be1d = {
        ...(await _0x8756ab.bot.contextInfo("ꜱᴜʜᴀɪʟ-ᴍᴅ", "ᴇxᴛᴇʀɴᴀʟ ᴍᴏᴅᴜʟᴇ", _0xeb34e7 ? _0xeb34e7 : log0, 1, gurl, "1"))
      };
      for (let _0x52c268 = 0; _0x52c268 < _0x1314ee.external.length; _0x52c268++) {
        _0x29d9e5 += _0x1314ee.external[_0x52c268].name + ": _" + _0x1314ee.external[_0x52c268].url + "_\n\n";
      }
      await _0x8756ab.reply(_0x29d9e5, {
        contextInfo: _0x35be1d
      });
    }
  } catch (_0x560f3d) {
    _0x8756ab.error(_0x560f3d + " \n\ncmdName listplugin", _0x560f3d);
  }
});
smd({
  cmdname: "plugins",
  alias: ["plugin"],
  type: "owner",
  info: "Shows list of all externally installed modules",
  fromMe: s_ser,
  filename: __filename,
  use: "<name>"
}, async (_0x2a10d6, _0x2420b0) => {
  try {
    let _0x4e5e2e = await plugins(_0x2a10d6, "plugins", _0x2420b0);
    return await _0x2a10d6.send(!_0x4e5e2e ? "*_There's no plugin install in " + Config.botname + "_*" : !_0x2420b0 ? "*All Installed Modules are:-*\n\n" + _0x4e5e2e : _0x4e5e2e);
  } catch (_0x21e335) {
    _0x2a10d6.error(_0x21e335 + " \n\ncmdName plugins\n");
  }
});
smd({
  pattern: "remove",
  alias: ["uninstall"],
  type: "owner",
  info: "removes external modules.",
  fromMe: s_ser,
  filename: __filename,
  use: "<plugin name>"
}, async (_0x1510c9, _0x40e763) => {
  if (!_0x40e763) {
    return await _0x1510c9.reply("*_Uhh Please, Provide Me Plugin Name_*");
  }
  if (_0x40e763 === "alls") {
    return await _0x1510c9.reply(await plugins("remove", "all", __dirname));
  }
  try {
    await _0x1510c9.send(await plugins(_0x1510c9, "remove", _0x40e763, __dirname), {}, "", _0x1510c9);
  } catch {}
});
smd({
  cmdname: "install",
  type: "owner",
  info: "Installs external modules..",
  fromMe: s_ser,
  filename: __filename,
  use: "<gist url>"
}, async (_0xf71b5c, _0x2bdd09) => {
  let _0x2b0828 = _0x2bdd09 ? _0x2bdd09 : _0xf71b5c.quoted ? _0xf71b5c.quoted.text : "";
  if (!_0x2b0828.toLowerCase().includes("https")) {
    return await _0xf71b5c.send("*_Uhh Please, Provide Me Plugin Url_*");
  }
  await _0xf71b5c.reply(await plugins(_0xf71b5c, "install", _0x2b0828, __dirname));
});