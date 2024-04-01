const Config = require("../config");
let { prefix, smd } = require("../lib");
const appName = Config.HEROKU_APP_NAME
  ? Config.HEROKU_APP_NAME.toLowerCase()
  : false;
const authToken = Config.HEROKU_API_KEY;
const HEROKU = authToken && appName ? true : false;
const fetch = require("node-fetch");
let updateConfig = () => {
  try {
    let _0x20dd27 = "../config";
    delete require.cache[_0x20dd27];
    require(_0x20dd27);
    return true;
  } catch (_0x1b8ea4) {
    console.log(_0x1b8ea4);
  }
};
const heroku = {};
heroku.addvar = async (_0x2f20ae, _0x30f607) => {
  try {
    const _0x297932 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    const _0xaf0f6d = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        method: "PATCH",
        headers: _0x297932,
        body: JSON.stringify({
          [_0x2f20ae]: _0x30f607,
        }),
      }
    );
    const _0x37a622 = await _0xaf0f6d.json();
    return {
      status: true,
      data: _0x37a622,
    };
  } catch (_0x13b380) {
    return {
      status: false,
      data: _0x13b380,
    };
  }
};
heroku.getallvar = async () => {
  try {
    const _0x9fadf4 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };
    const _0x1ec958 = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        headers: _0x9fadf4,
      }
    );
    const _0x371a88 = await _0x1ec958.json();
    let _0x179c08 =
      "   『 *" +
      appName +
      " VARS* 』 \n*________________________________________*\n";
    Object.keys(_0x371a88).forEach((_0x5b27f6) => {
      _0x179c08 +=
        "*" + _0x5b27f6 + " :*  ```" + _0x371a88[_0x5b27f6] + "```\n";
    });
    return {
      status: true,
      data: _0x179c08,
    };
  } catch (_0x2e08c2) {
    return {
      status: false,
      data: _0x2e08c2,
    };
  }
};
heroku.getvar = async (_0x2081b9) => {
  try {
    const _0x8543d5 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };
    const _0x56de66 = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        headers: _0x8543d5,
      }
    );
    const _0x242ed7 = await _0x56de66.json();
    return {
      status: true,
      data: _0x242ed7[_0x2081b9],
    };
  } catch (_0x456812) {
    return {
      status: false,
      data: _0x456812,
    };
  }
};
heroku.setvar = async (_0x27001d, _0x3bd020) => {
  try {
    const _0xd2500f = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    fetch("https://api.heroku.com/apps/" + appName + "/config-vars", {
      method: "GET",
      headers: _0xd2500f,
    })
      .then((_0x2b273f) => {
        if (_0x2b273f.ok) {
          return _0x2b273f.json();
        } else {
          return {
            status: false,
            data: "Failed to fetch app variables. Status: " + _0x2b273f.status,
          };
        }
      })
      .then((_0x57274a) => {
        if (_0x57274a.hasOwnProperty(_0x27001d)) {
          const _0x291a98 = {
            ..._0x57274a,
          };
          _0x291a98[_0x27001d] = _0x3bd020;
          return fetch(
            "https://api.heroku.com/apps/" + appName + "/config-vars",
            {
              method: "PATCH",
              headers: _0xd2500f,
              body: JSON.stringify(_0x291a98),
            }
          );
        } else {
          return {
            status: false,
            data: "Variable not found in app",
          };
        }
      })
      .then((_0x39f2f0) => {
        if (_0x39f2f0.ok) {
          return {
            status: true,
            data: _0x39f2f0,
          };
        }
      })
      .catch((_0xfe9fa7) => {
        return {
          status: false,
          data: _0xfe9fa7,
        };
      });
  } catch (_0x3d9eac) {
    return {
      status: false,
      data: _0x3d9eac,
    };
  }
};
heroku.setvar = async (_0x5cf1b9, _0x3f3574) => {
  try {
    const _0x2e2d44 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    const _0x5ee9a4 = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        method: "GET",
        headers: _0x2e2d44,
      }
    );
    if (!_0x5ee9a4.ok) {
      return {
        status: false,
        data: "Variable not found in heroku app",
      };
    }
    const _0x1f50a3 = await _0x5ee9a4.json();
    if (_0x1f50a3.hasOwnProperty(_0x5cf1b9)) {
      const _0x5e416c = {
        ..._0x1f50a3,
      };
      _0x5e416c[_0x5cf1b9] = _0x3f3574;
      const _0x5235a6 = await fetch(
        "https://api.heroku.com/apps/" + appName + "/config-vars",
        {
          method: "PATCH",
          headers: _0x2e2d44,
          body: JSON.stringify(_0x5e416c),
        }
      );
      if (_0x5235a6.ok) {
        return {
          status: true,
          data: _0x5235a6,
        };
      } else {
        return {
          status: false,
          data: "Failed to update app variable. Status: " + _0x5235a6.status,
        };
      }
    } else {
      return {
        status: false,
        data: "Variable not found in app",
      };
    }
  } catch (_0x42dc72) {
    return {
      status: false,
      data: _0x42dc72.message,
    };
  }
};
smd(
  {
    cmdname: "getsudo",
    info: "get sudo users list.",
    fromMe: true,
    type: "tools",
    filename: __filename,
  },
  async (_0x3862b7) => {
    return await _0x3862b7.reply(global.sudo);
  }
);
smd(
  {
    pattern: "setsudo",
    alias: ["ssudo"],
    fromMe: true,
    desc: "Make sudo to a user",
    category: "tools",
    filename: __filename,
  },
  async (_0x4b0869) => {
    try {
      let _0x25aa75 = _0x4b0869.reply_message
        ? _0x4b0869.reply_message.sender
        : _0x4b0869.mentionedJid[0]
        ? _0x4b0869.mentionedJid[0]
        : "";
      if (!_0x25aa75 || !_0x25aa75.includes("@s.whatsapp.net")) {
        return await _0x4b0869.reply("*Uhh dear, reply/mention an User*");
      }
      let _0xbaec63 = _0x25aa75.split("@")[0];
      if (global.sudo.includes(_0xbaec63)) {
        return _0x4b0869.reply("*Number Already Exist In Sudo!*");
      }
      global.sudo += "," + _0xbaec63;
      let _0x492c4f = HEROKU
        ? await heroku.addvar("SUDO", global.sudo)
        : {
            status: false,
          };
      if (_0x492c4f && _0x492c4f.status) {
        return _0x4b0869.reply(
          "*" +
            _0xbaec63 +
            " Added Succesfully.*\nSudo Numbers : ```" +
            global.sudo +
            "```"
        );
      } else if (!_0x492c4f || !_0x492c4f?.status) {
        if (HEROKU) {
          await _0x4b0869.reply(
            "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_"
          );
        }
        await _0x4b0869.reply("*User temporary added in sudo.*");
      }
    } catch (_0x1f9c03) {
      await _0x4b0869.error(_0x1f9c03 + "\n\ncommand: setsudo", _0x1f9c03);
    }
  }
);
smd(
  {
    pattern: "delsudo",
    alias: ["dsudo"],
    fromMe: true,
    desc: "Makes wa me of quoted or mentioned user.",
    category: "tools",
    filename: __filename,
  },
  async (_0x1a0332) => {
    try {
      let _0x1213f4 = _0x1a0332.reply_message
        ? _0x1a0332.reply_message.sender
        : _0x1a0332.mentionedJid[0]
        ? _0x1a0332.mentionedJid[0]
        : "";
      if (!_0x1213f4 || !_0x1213f4.includes("@s.whatsapp.net")) {
        return await _0x1a0332.reply("*Uhh dear, reply/mention an User*");
      }
      let _0x19ed46 = _0x1213f4.split("@")[0];
      let _0x5d3e9c = "," + _0x19ed46;
      if (global.sudo.includes(_0x5d3e9c)) {
        global.sudo = global.sudo.replace(_0x5d3e9c, "");
      } else {
        return await _0x1a0332.reply("*_User not found in the Sudo List!_*");
      }
      let _0x1041d7 = HEROKU
        ? await heroku.addvar("SUDO", global.sudo)
        : {
            status: false,
          };
      if (_0x1041d7 && _0x1041d7.status) {
        return _0x1a0332.reply(
          "*" +
            _0x19ed46 +
            " Deleted Succesfully.*\nSudo Numbers : ```" +
            global.sudo +
            "```"
        );
      } else if (!_0x1041d7 || !_0x1041d7?.status) {
        if (HEROKU) {
          await _0x1a0332.reply(
            "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_"
          );
        }
        await _0x1a0332.reply("*User removed from sudo.*");
      }
    } catch (_0xfb942e) {
      await _0x1a0332.error(_0xfb942e + "\n\ncommand: delsudo", _0xfb942e);
    }
  }
);
if (Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY) {
  smd(
    {
      pattern: "allvar",
      alias: ["getallvar", "allvars"],
      desc: "To get All  Heroku Vars",
      fromMe: true,
      category: "tools",
      filename: __filename,
    },
    async (_0x14cfe1) => {
      try {
        let _0x5d8eb3 = await heroku.getallvar();
        if (_0x5d8eb3.status) {
          return _0x14cfe1.send(_0x5d8eb3.data);
        } else {
          console.error(_0x5d8eb3.data);
          _0x14cfe1.reply(
            "*_There's no responce from HEROKU_*, \n  please check that you put valid\n  _HEROKU_APP_NAME_ & _HEROKU_API_KEY_\n``` See Console to check whats the err```"
          );
        }
      } catch (_0x5b9bee) {
        await _0x14cfe1.error(_0x5b9bee + "\n\ncommand: delsudo", _0x5b9bee);
      }
    }
  );
}
smd(
  {
    pattern: "newvar",
    alias: ["addvar", "avar"],
    desc: "To Set Heroku Vars",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (_0x1a88d8, _0x2f41aa, { cmdName: _0x7bc1af }) => {
    try {
      if (!_0x2f41aa) {
        return _0x1a88d8.reply(
          "give me Variable Name\n*E.x : " +
            (prefix + smd) +
            " CAPTION: Powered By Suhail Tech*"
        );
      }
      const _0x420bcf = _0x2f41aa.indexOf(":");
      const _0x107205 = _0x2f41aa.slice(0, _0x420bcf).toUpperCase().trim();
      const _0x158e63 = _0x2f41aa.slice(_0x420bcf + 1).trim();
      process.env[_0x107205] = _0x158e63;
      updateConfig();
      if (!_0x158e63) {
        return msg.reply(
          "*Uhh Please, Provide Value After ':' !*\n*Example : " +
            (prefix + smd) +
            " AUTO_SAVE_STATUS:true*"
        );
      }
      let _0x3f7923 = await heroku.addvar(_0x107205, _0x158e63);
      if (_0x3f7923 && _0x3f7923.status) {
        return _0x1a88d8.reply(
          "*" +
            _0x107205 +
            " updated Succesfully.*\n*" +
            _0x107205 +
            ":*  " +
            _0x158e63
        );
      } else if (!_0x3f7923 || !_0x3f7923.status) {
        console.error(result.data);
        await _0x1a88d8.reply(
          "*_Can't add " +
            _0x7bc1af +
            " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_"
        );
      }
    } catch (_0x3a0b79) {
      await _0x1a88d8.error(_0x3a0b79 + "\n\ncommand: " + _0x7bc1af, _0x3a0b79);
    }
  }
);
smd(
  {
    pattern: "getvar",
    desc: "To Get A Heroku Var",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (_0x362049, _0x3ab1af, { cmdName: _0x4997e3 }) => {
    try {
      if (!_0x3ab1af) {
        return _0x362049.reply(
          "give me Variable Name\nExample : " +
            (prefix + _0x4997e3) +
            " AUTO_READ_STATUS"
        );
      }
      const _0x2c5405 = _0x3ab1af.split(" ").toUpperCase();
      let _0x1de259 = await heroku.getvar(_0x2c5405);
      if (_0x1de259.status) {
        if (_0x1de259.data) {
          return _0x362049.reply("*" + _0x2c5405 + " :* " + _0x1de259.data);
        } else {
          return _0x362049.reply(
            "*" + _0x2c5405 + "* does not exist in *" + appName + "* app."
          );
        }
      } else if (!_0x1de259 || !_0x1de259.status) {
        console.error(result.data);
        await _0x362049.reply(
          "*_There's no responce from HEROKU_*, \n  _please check that you put valid_\n  _*HEROKU_APP_NAME* & *HEROKU_API_KEY*_"
        );
      }
    } catch (_0x50ae62) {
      await _0x362049.error(_0x50ae62 + "\n\ncommand: " + _0x4997e3, _0x50ae62);
    }
  }
);
smd(
  {
    pattern: "setvar",
    desc: "To Set Heroku Vars",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (_0x1b1e4b, _0x637804, { smd: _0x34b16b }) => {
    try {
      if (!_0x637804) {
        return _0x1b1e4b.reply(
          "*Uhh dear, Give me variable name*\n*Example : " +
            prefix +
            "setvar AUTO_READ_STATUS:true*"
        );
      }
      const _0x1128d8 = _0x637804.indexOf(":");
      const _0x26c311 = _0x637804.slice(0, _0x1128d8).toUpperCase().trim();
      const _0x3548e5 = _0x637804.slice(_0x1128d8 + 1).trim();
      if (!_0x3548e5) {
        return msg.reply(
          "*Uhh Please, Provide value after ':' !*\n*Example : " +
            (prefix + _0x34b16b) +
            " AUTO_READ_STATUS:true*"
        );
      }
      process.env[_0x26c311] = _0x3548e5;
      updateConfig();
      let _0x42cd07 = await heroku.setvar(_0x26c311, _0x3548e5);
      console.log("addvar : ", _0x42cd07);
      if (_0x42cd07.status) {
        await _0x1b1e4b.reply(
          "*" +
            _0x26c311 +
            " updated successfully.*\n*" +
            _0x26c311 +
            ":* " +
            _0x3548e5
        );
      } else if (!_0x42cd07 || !_0x42cd07.status) {
        console.error(_0x42cd07.data);
        await _0x1b1e4b.reply(_0x42cd07.data);
      }
    } catch (_0x312a01) {
      await _0x1b1e4b.error(_0x312a01 + "\n\ncommand: " + _0x34b16b, _0x312a01);
    }
  }
);
