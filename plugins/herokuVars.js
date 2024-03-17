const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  botpic,
  prefix,
  sck1,
  smd
} = require("../lib");
const axios = require("axios");
const appName = Config.HEROKU_APP_NAME ? Config.HEROKU_APP_NAME.toLowerCase() : false;
const authToken = Config.HEROKU_API_KEY;
const HEROKU = authToken && appName ? true : false;
const fetch = require("node-fetch");
const heroku = {};
heroku.addvar = async (_0x42e642, _0x3ec20a) => {
  try {
    const _0x507c7f = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json"
    };
    const _0x346c1a = await fetch("https://api.heroku.com/apps/" + appName + "/config-vars", {
      method: "PATCH",
      headers: _0x507c7f,
      body: JSON.stringify({
        [_0x42e642]: _0x3ec20a
      })
    });
    const _0x21e07d = await _0x346c1a.json();
    return {
      status: true,
      data: _0x21e07d
    };
  } catch (_0x1825d5) {
    return {
      status: false,
      data: _0x1825d5
    };
  }
};
heroku.getallvar = async () => {
  try {
    const _0x3c9dc4 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken
    };
    const _0x229439 = await fetch("https://api.heroku.com/apps/" + appName + "/config-vars", {
      headers: _0x3c9dc4
    });
    const _0x2af167 = await _0x229439.json();
    let _0x4e19fd = "   『 *" + appName + " VARS* 』 \n*________________________________________*\n";
    Object.keys(_0x2af167).forEach(_0x14885d => {
      _0x4e19fd += "*" + _0x14885d + " :*  ```" + _0x2af167[_0x14885d] + "```\n";
    });
    return {
      status: true,
      data: _0x4e19fd
    };
  } catch (_0x3c86dc) {
    return {
      status: false,
      data: _0x3c86dc
    };
  }
};
heroku.getvar = async _0x432eb1 => {
  try {
    const _0x5e21e4 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken
    };
    const _0x252bc2 = await fetch("https://api.heroku.com/apps/" + appName + "/config-vars", {
      headers: _0x5e21e4
    });
    const _0x121ddf = await _0x252bc2.json();
    return {
      status: true,
      data: _0x121ddf[_0x432eb1]
    };
  } catch (_0x4fc74) {
    return {
      status: false,
      data: _0x4fc74
    };
  }
};
heroku.setvar = async (_0x15a4c4, _0x518f94) => {
  try {
    const _0x5ec051 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json"
    };
    fetch("https://api.heroku.com/apps/" + appName + "/config-vars", {
      method: "GET",
      headers: _0x5ec051
    }).then(_0x1d2ce5 => {
      if (_0x1d2ce5.ok) {
        return _0x1d2ce5.json();
      } else {
        throw new Error("Failed to fetch app variables. Status: " + _0x1d2ce5.status);
      }
    }).then(_0x3ed87d => {
      if (_0x3ed87d.hasOwnProperty(_0x15a4c4)) {
        const _0x3a4ea1 = {
          ..._0x3ed87d
        };
        _0x3a4ea1[_0x15a4c4] = _0x518f94;
        return fetch("https://api.heroku.com/apps/" + appName + "/config-vars", {
          method: "PATCH",
          headers: _0x5ec051,
          body: JSON.stringify(_0x3a4ea1)
        });
      } else {
        throw new Error("Variable not found in app");
      }
    }).then(_0x30c1ce => {
      if (_0x30c1ce.ok) {
        return {
          status: true,
          data: _0x30c1ce
        };
      }
    }).catch(_0x986c55 => {
      return {
        status: false,
        data: _0x986c55
      };
    });
  } catch (_0x37b4c2) {
    return {
      status: false,
      data: _0x37b4c2
    };
  }
};
smd({
  cmdname: "getsudo",
  info: "get sudo users list.",
  fromMe: true,
  type: "tools",
  filename: __filename
}, async _0x2fbeaa => {
  return await _0x2fbeaa.reply(global.sudo);
});
smd({
  pattern: "setsudo",
  alias: ["ssudo"],
  fromMe: true,
  desc: "Make sudo to a user",
  category: "tools",
  filename: __filename
}, async _0x4a7a1a => {
  try {
    let _0x175630 = _0x4a7a1a.reply_message ? _0x4a7a1a.reply_message.sender : _0x4a7a1a.mentionedJid[0] ? _0x4a7a1a.mentionedJid[0] : "";
    if (!_0x175630 || !_0x175630.includes("@s.whatsapp.net")) {
      return await _0x4a7a1a.reply("*Uhh dear, reply/mention an User*");
    }
    let _0x375100 = _0x175630.split("@")[0];
    if (global.sudo.includes(_0x375100)) {
      return _0x4a7a1a.reply("*Number Already Exist In Sudo!*");
    }
    global.sudo += "," + _0x375100;
    let _0x358da3 = HEROKU ? await heroku.addvar("SUDO", global.sudo) : {
      status: false
    };
    if (_0x358da3 && _0x358da3.status) {
      return _0x4a7a1a.reply("*" + _0x375100 + " Added Succesfully.*\nSudo Numbers : ```" + global.sudo + "```");
    } else if (!_0x358da3 || !_0x358da3?.status) {
      if (HEROKU) {
        await _0x4a7a1a.reply("*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_");
      }
      await _0x4a7a1a.reply("*User temporary added in sudo.*");
    }
  } catch (_0xe33487) {
    await _0x4a7a1a.error(_0xe33487 + "\n\ncommand: setsudo", _0xe33487);
  }
});
smd({
  pattern: "delsudo",
  alias: ["dsudo"],
  fromMe: true,
  desc: "Makes wa me of quoted or mentioned user.",
  category: "tools",
  filename: __filename
}, async _0x1b2e06 => {
  try {
    let _0x1cc37b = _0x1b2e06.reply_message ? _0x1b2e06.reply_message.sender : _0x1b2e06.mentionedJid[0] ? _0x1b2e06.mentionedJid[0] : "";
    if (!_0x1cc37b || !_0x1cc37b.includes("@s.whatsapp.net")) {
      return await _0x1b2e06.reply("*Uhh dear, reply/mention an User*");
    }
    let _0x59e3da = _0x1cc37b.split("@")[0];
    let _0x129220 = "," + _0x59e3da;
    if (global.sudo.includes(_0x129220)) {
      global.sudo = global.sudo.replace(_0x129220, "");
    } else {
      return await _0x1b2e06.reply("*_User not found in the Sudo List!_*");
    }
    let _0x282648 = HEROKU ? await heroku.addvar("SUDO", global.sudo) : {
      status: false
    };
    if (_0x282648 && _0x282648.status) {
      return _0x1b2e06.reply("*" + _0x59e3da + " Deleted Succesfully.*\nSudo Numbers : ```" + global.sudo + "```");
    } else if (!_0x282648 || !_0x282648?.status) {
      if (HEROKU) {
        await _0x1b2e06.reply("*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_");
      }
      await _0x1b2e06.reply("*User temporary removed from sudo.*");
    }
  } catch (_0x323cd6) {
    await _0x1b2e06.error(_0x323cd6 + "\n\ncommand: delsudo", _0x323cd6);
  }
});
if (Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY) {
  smd({
    pattern: "allvar",
    alias: ["getallvar", "allvars"],
    desc: "To get All  Heroku Vars",
    fromMe: true,
    category: "tools",
    filename: __filename
  }, async _0x5bfbaf => {
    try {
      let _0x5eded8 = await heroku.getallvar();
      if (_0x5eded8.status) {
        return _0x5bfbaf.send(_0x5eded8.data);
      } else {
        console.error(_0x5eded8.data);
        _0x5bfbaf.reply("*_There's no responce from HEROKU_*, \n  please check that you put valid\n  _HEROKU_APP_NAME_ & _HEROKU_API_KEY_\n``` See Console to check whats the err```");
      }
    } catch (_0x4a5882) {
      await _0x5bfbaf.error(_0x4a5882 + "\n\ncommand: delsudo", _0x4a5882);
    }
  });
}
smd({
  pattern: "newvar",
  alias: ["addvar", "avar"],
  desc: "To Set Heroku Vars",
  category: "tools",
  fromMe: true,
  filename: __filename
}, async (_0x46bcc4, _0x415ff6, {
  cmdName: _0xbbedc9
}) => {
  try {
    if (!_0x415ff6) {
      return _0x46bcc4.reply("give me Variable Name\n*E.x : " + (prefix + smd) + " CAPTION: Powered By Suhail Tech*");
    }
    const _0xf3caef = _0x415ff6.indexOf(":");
    const _0x3ff64c = _0x415ff6.slice(0, _0xf3caef).toUpperCase().trim();
    const _0x23ea5b = _0x415ff6.slice(_0xf3caef + 1).trim();
    process.env[_0x3ff64c] = _0x23ea5b;
    if (!_0x23ea5b) {
      return msg.reply("*Uhh Please, Provide Value After ':' !*\n*Example : " + (prefix + smd) + " AUTO_SAVE_STATUS:true*");
    }
    let _0x118c88 = await heroku.addvar(_0x3ff64c, _0x23ea5b);
    if (_0x118c88 && _0x118c88.status) {
      return _0x46bcc4.reply("*" + _0x3ff64c + " updated Succesfully.*\n*" + _0x3ff64c + ":*  " + _0x23ea5b);
    } else if (!_0x118c88 || !_0x118c88.status) {
      console.error(result.data);
      await _0x46bcc4.reply("*_Can't add " + _0xbbedc9 + " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_");
    }
  } catch (_0x4446ee) {
    await _0x46bcc4.error(_0x4446ee + "\n\ncommand: " + _0xbbedc9, _0x4446ee);
  }
});
smd({
  pattern: "getvar",
  desc: "To Get A Heroku Var",
  category: "tools",
  fromMe: true,
  filename: __filename
}, async (_0x547f19, _0x87cb20, {
  cmdName: _0xd2cd3f
}) => {
  try {
    if (!_0x87cb20) {
      return _0x547f19.reply("give me Variable Name\nExample : " + (prefix + _0xd2cd3f) + " AUTO_READ_STATUS");
    }
    const _0x4c30cf = _0x87cb20.split(" ").toUpperCase();
    let _0x344d72 = await heroku.getvar(_0x4c30cf);
    if (_0x344d72.status) {
      if (_0x344d72.data) {
        return _0x547f19.reply("*" + _0x4c30cf + " :* " + _0x344d72.data);
      } else {
        return _0x547f19.reply("*" + _0x4c30cf + "* does not exist in *" + appName + "* app.");
      }
    } else if (!_0x344d72 || !_0x344d72.status) {
      console.error(result.data);
      await _0x547f19.reply("*_There's no responce from HEROKU_*, \n  _please check that you put valid_\n  _*HEROKU_APP_NAME* & *HEROKU_API_KEY*_");
    }
  } catch (_0x35993f) {
    await _0x547f19.error(_0x35993f + "\n\ncommand: " + _0xd2cd3f, _0x35993f);
  }
});
smd({
  pattern: "setvar",
  desc: "To Set Heroku Vars",
  category: "tools",
  fromMe: true,
  filename: __filename
}, async (_0x67c126, _0x3ddf11, {
  smd: _0x574239
}) => {
  try {
    if (!_0x3ddf11) {
      return _0x67c126.reply("*Uhh dear, Give me variable name*\n*Example : " + prefix + "setvar AUTO_READ_STATUS:true*");
    }
    const _0x59363b = _0x3ddf11.indexOf(":");
    const _0x542c92 = _0x3ddf11.slice(0, _0x59363b).toUpperCase().trim();
    const _0x57b7dd = _0x3ddf11.slice(_0x59363b + 1).trim();
    if (!_0x57b7dd) {
      return msg.reply("*Uhh Please, Provide value after ':' !*\n*Example : " + (prefix + _0x574239) + " AUTO_READ_STATUS:true*");
    }
    process.env[_0x542c92] = _0x57b7dd;
    let _0x3466fb = await heroku.setvar(_0x542c92, _0x57b7dd);
    if (_0x3466fb.status) {
      await _0x67c126.reply("*" + _0x542c92 + " updated successfully.*\n*" + _0x542c92 + ":* " + _0x57b7dd);
    } else if (!_0x3466fb || !_0x3466fb.status) {
      console.error(result.data);
      await _0x67c126.reply("*_Uhh Please, Give me Valid Variable Name_*");
    }
  } catch (_0x9fd563) {
    await _0x67c126.error(_0x9fd563 + "\n\ncommand: " + _0x574239, _0x9fd563);
  }
});