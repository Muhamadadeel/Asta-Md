try {
    let {
      fancytext,
      tlang,
      tiny,
      runtime,
      Config,
      formatp,
      botpic,
      prefix,
      sck1,
      amd,
      format
    } = require(lib_dir);
    const axios = require("axios");
    const fetch = require("node-fetch");
    const fs = require("fs");
    global.HEROKU_APP_NAME = (process.env.HEROKU_APP_NAME || "").toLowerCase();
    global.HEROKU_API_KEY = process.env.HEROKU_API_KEY;
    global.HEROKU = process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY ? true : false;
    global.loadvar = () => {
      const _0x3b1817 = require(global.config_dir || "../config");
      return {
        HEROKU_API_KEY: global.HEROKU_API_KEY,
        HEROKU_APP_NAME: global.HEROKU_APP_NAME,
        ALLOW_JID: global.allowJids,
        BLOCK_JID: global.blockJids,
        APP_URL: global.appUrl,
        TIME_ZONE: global.timezone,
        GOODBYE: global.gdbye,
        WELCOME: global.wlcm,
        FLUSH: global.flush,
        WARN_COUNT: global.warncount,
        STYLE: global.style,
        GURL: global.gurl,
        IMAGE: global.THUMB_IMAGE,
        USER_IMAGES: global.userImages,
        DISABLE_PM: global.disablepm,
        DISABLE_GROUPS: global.disablegroup,
        WAPRESENCE: global.waPresence,
        MSGS_IN_LOG: global.MsgsInLog,
        READ_COMMAND: global.readcmds,
        READ_MESSAGE: global.readmessage,
        READ_MESSAGE_FROM: global.readmessagefrom,
        AUTO_READ_STATUS: global.read_status,
        AUTO_SAVE_STATUS: global.save_status,
        SAVE_STATUS_FROM: global.save_status_from,
        READ_STATUS_FROM: global.read_status_from,
        SUDO: global.sudo,
        OWNER_NUMBER: global.owner,
        ELEVENLAB_API_KEY: global.ELEVENLAB_API_KEY,
        AITTS_ID: global.aitts_Voice_Id,
        MONGODB_URI: global.MONGODB_URI,
        DATABASE_URL: global.DATABASE_URL,
        MENU: _0x3b1817.menu || global.menu,
        PREFIX: _0x3b1817.HANDLERS,
        CAPTION: _0x3b1817.caption,
        PACK_AUTHER: _0x3b1817.author,
        PACK_NAME: _0x3b1817.packname,
        BOT_NAME: _0x3b1817.botname,
        OWNER_NAME: _0x3b1817.ownername,
        ERROR_CHAT: _0x3b1817.errorChat,
        KOYEB_API: _0x3b1817.KOYEB_API,
        REMOVE_BG_KEY: _0x3b1817.REMOVE_BG_KEY,
        OPENAI_API_KEY: _0x3b1817.OPENAI_API_KEY,
        ANTILINK_VALUES: _0x3b1817.antilink_values,
        MODE: _0x3b1817.WORKTYPE,
        THEME: _0x3b1817.LANG,
        SESSION_ID: global.SESSION_ID,
        ...(global.newvar || {})
      };
    };
    global.allvar = loadvar();
    let restart_bot = () => {
      try {
        require("pm2").restart("index.js");
      } catch (_0x3abf25) {
        console.log(_0x3abf25);
      }
      const {
        exec: _0x31294b
      } = require("child_process");
      _0x31294b("pm2 restart all");
    };
    let updateCache = (_0x4635b4 = "../config") => {
      try {
        delete require.cache[_0x4635b4];
        require(_0x4635b4);
        return true;
      } catch (_0x3340fe) {
        console.log(_0x3340fe);
      }
    };
    let save_env = async (_0x1674ef, _0x531b10, _0x49bcfa = ".env") => {
      try {
        const _0x29834f = fs.existsSync(_0x49bcfa) ? fs.readFileSync(_0x49bcfa, "utf8") : "";
        const _0x535317 = require("dotenv").parse(_0x29834f) || {};
        if (!_0x531b10 && _0x535317[_0x1674ef]) {
          delete _0x535317[_0x1674ef];
        } else if (_0x1674ef) {
          _0x535317[_0x1674ef] = _0x531b10;
        }
        const _0x11ccc9 = Object.entries(_0x535317).map(([_0x280e69, _0x10e143]) => _0x280e69 + "=" + _0x10e143).join("\n");
        fs.writeFileSync(_0x49bcfa, _0x11ccc9);
        return {
          status: true,
          data: _0x535317
        };
      } catch (_0x4b93a4) {
        return {
          status: false,
          data: _0x4b93a4.message || "_ERROR!_"
        };
      }
    };
    const heroku = {};
    heroku.addvar = async (_0x2473e2, _0x41a752) => {
      try {
        if (HEROKU) {
          const _0x5ba510 = {
            Accept: "application/vnd.heroku+json; version=3",
            Authorization: "Bearer " + HEROKU_API_KEY,
            "Content-Type": "application/json"
          };
          const _0x548bd3 = await fetch("https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars", {
            method: "PATCH",
            headers: _0x5ba510,
            body: JSON.stringify({
              [_0x2473e2]: _0x41a752
            })
          });
          const _0x293998 = await _0x548bd3.json();
          return {
            status: true,
            data: _0x293998
          };
        } else {
          return await save_env(_0x2473e2, _0x41a752);
        }
      } catch (_0xc703a3) {
        return {
          status: false,
          data: _0xc703a3
        };
      }
    };
    heroku.getallvar = async () => {
      try {
        const _0x1e9b2d = {
          Accept: "application/vnd.heroku+json; version=3",
          Authorization: "Bearer " + HEROKU_API_KEY
        };
        const _0x45d18e = await fetch("https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars", {
          headers: _0x1e9b2d
        });
        const _0x591084 = await _0x45d18e.json();
        let _0x49e747 = "   『 *" + HEROKU_APP_NAME + " VARS* 』 \n*________________________________________*\n";
        Object.keys(_0x591084).forEach(_0x1beb86 => {
          _0x49e747 += "*" + _0x1beb86 + " :*  " + (_0x591084[_0x1beb86] ? "```" + _0x591084[_0x1beb86] + "```" : "") + " \n";
        });
        return {
          status: true,
          data: _0x49e747,
          vars: _0x591084
        };
      } catch (_0x1088b4) {
        return {
          status: false,
          data: "HEROKU ERR: " + (_0x1088b4.message || _0x1088b4)
        };
      }
    };
    heroku.getvar = async _0x176946 => {
      try {
        const _0x6dddaa = {
          Accept: "application/vnd.heroku+json; version=3",
          Authorization: "Bearer " + HEROKU_API_KEY
        };
        const _0x3b0da7 = await fetch("https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars", {
          headers: _0x6dddaa
        });
        const _0x3bde1b = await _0x3b0da7.json();
        return {
          status: true,
          data: _0x3bde1b[_0x176946]
        };
      } catch (_0x501048) {
        return {
          status: false,
          data: _0x501048.message || _0x501048
        };
      }
    };
    heroku.setvar = async (_0x50188e, _0x524319) => {
      try {
        if (!HEROKU) {
          return await save_env(_0x50188e, value);
        }
        const _0x141a82 = {
          Accept: "application/vnd.heroku+json; version=3",
          Authorization: "Bearer " + HEROKU_API_KEY,
          "Content-Type": "application/json"
        };
        const _0x276413 = await fetch("https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars", {
          method: "GET",
          headers: _0x141a82
        });
        if (!_0x276413.ok) {
          return {
            status: false,
            data: "*Variable not found in bot*\n*Use `" + prefix + "newvar` to add new variable*"
          };
        }
        const _0x1a51d3 = await _0x276413.json();
        if (_0x1a51d3.hasOwnProperty(_0x50188e)) {
          const _0x13fbba = {
            ..._0x1a51d3
          };
          _0x13fbba[_0x50188e] = _0x524319;
          const _0x5046e4 = await fetch("https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars", {
            method: "PATCH",
            headers: _0x141a82,
            body: JSON.stringify(_0x13fbba)
          });
          if (_0x5046e4.ok) {
            return {
              status: true,
              data: _0x5046e4
            };
          } else {
            return {
              status: false,
              data: "Failed to update bot variable. Status: " + _0x5046e4.status
            };
          }
        } else {
          return {
            status: false,
            data: "*Variable not found in bot*\n*Use `" + prefix + "newvar` to add new variable*"
          };
        }
      } catch (_0xd30782) {
        return {
          status: false,
          data: _0xd30782.message || _0xd30782
        };
      }
    };
    amd({
      cmdname: "getsudo",
      alias: ["mods", "gsudo"],
      info: "get sudo users list.",
      fromMe: true,
      type: "tools",
      filename: __filename
    }, async _0x5abb61 => {
      let _0x54df7f = global.sudo.split(",").filter(_0x315ce7 => _0x315ce7 && _0x315ce7 !== "null").map(_0x52e617 => _0x52e617.trim());
      let _0x9a1eba = _0x54df7f.map((_0x26ed7e, _0x5d9083) => "  " + (_0x5d9083 + 1) + " 〄 @" + _0x26ed7e + "\n\n").join("");
      let _0x23332c = [_0x5abb61.sender, ..._0x54df7f.map(_0x112909 => _0x112909 + "@s.whatsapp.net")];
      if (!_0x9a1eba || !_0x54df7f || !_0x54df7f[0]) {
        return await _0x5abb61.reply("*There's no mods/sudo added for your bot!*");
      }
      let _0x1334f2 = ("\n   👤 *" + Config.botname + " MODS* 👤\n   \n" + _0x9a1eba).trim();
      return await _0x5abb61.reply("https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/318032894/original/580c288e976e685895f8519718cccc89ba4d887d/be-your-professional-discord-moderator.jpeg", {
        caption: _0x1334f2,
        mentions: _0x23332c
      }, "img", _0x5abb61);
    });
    amd({
      pattern: "setsudo",
      alias: ["ssudo", "setmod"],
      fromMe: true,
      desc: "Make sudo to a user",
      category: "tools",
      filename: __filename
    }, async _0x1cdf13 => {
      try {
        let _0x11677e = _0x1cdf13.reply_message ? _0x1cdf13.reply_message.sender : _0x1cdf13.mentionedJid[0] ? _0x1cdf13.mentionedJid[0] : "";
        if (!_0x11677e || !_0x11677e.includes("@s.whatsapp.net")) {
          return await _0x1cdf13.reply("*Uhh dear, reply/mention an User*");
        }
        let _0x33114c = _0x11677e.split("@")[0];
        if (global.sudo.includes(_0x33114c)) {
          return _0x1cdf13.reply("*Number Already Exist In Sudo!*");
        }
        global.sudo += "," + _0x33114c;
        let _0x1fca8c = HEROKU ? await heroku.addvar("SUDO", global.sudo) : {
          status: false
        };
        if (_0x1fca8c && _0x1fca8c.status) {
          return _0x1cdf13.reply("*" + _0x33114c + " Added Succesfully.*\nSudo Numbers : ```" + global.sudo + "```");
        } else if (!_0x1fca8c || !_0x1fca8c?.status) {
          if (HEROKU) {
            await _0x1cdf13.reply("*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_");
          }
          await _0x1cdf13.reply("*User temporary added in sudo.*");
        }
      } catch (_0x52a055) {
        await _0x1cdf13.error(_0x52a055 + "\n\ncommand: setsudo", _0x52a055);
      }
    });
    amd({
      pattern: "delsudo",
      alias: ["dsudo", "delmod"],
      fromMe: true,
      desc: "delete sudo user.",
      category: "tools",
      filename: __filename
    }, async _0x46e8a8 => {
      try {
        let _0xdaccc8 = _0x46e8a8.reply_message ? _0x46e8a8.reply_message.sender : _0x46e8a8.mentionedJid[0] ? _0x46e8a8.mentionedJid[0] : "";
        if (!_0xdaccc8 || !_0xdaccc8.includes("@s.whatsapp.net")) {
          return await _0x46e8a8.reply("*Uhh dear, reply/mention an User*");
        }
        let _0x30a69a = _0xdaccc8.split("@")[0];
        let _0x34207f = "," + _0x30a69a;
        if (global.sudo.includes(_0x34207f)) {
          global.sudo = global.sudo.replace(_0x34207f, "");
        } else {
          return await _0x46e8a8.reply("*_User not found in the Sudo List!_*");
        }
        let _0x267ac8 = HEROKU ? await heroku.addvar("SUDO", global.sudo) : {
          status: false
        };
        if (_0x267ac8 && _0x267ac8.status) {
          return _0x46e8a8.reply("*" + _0x30a69a + " Deleted Succesfully.*\nSudo Numbers : ```" + global.sudo + "```");
        } else if (!_0x267ac8 || !_0x267ac8?.status) {
          if (HEROKU) {
            await _0x46e8a8.reply("*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_");
          }
          await _0x46e8a8.reply("*User removed from sudo.*");
        }
      } catch (_0x290b92) {
        await _0x46e8a8.error(_0x290b92 + "\n\ncommand: delsudo", _0x290b92);
      }
    });
    amd({
      pattern: "allvar",
      alias: ["getallvar", "allvars"],
      desc: "To get All  Heroku Vars",
      fromMe: true,
      category: "tools",
      filename: __filename
    }, async (_0x25d85b, _0x24ee86) => {
      try {
        if (HEROKU && /all|bot|heroku/gi.test(_0x24ee86)) {
          return await _0x25d85b.reply("please provide type of variables\nUse " + prefix + "allvar heroku/all/bot");
        }
        let _0x144444 = "";
        try {
          global.allvar = loadvar();
          let _0x521620 = global.allvar || {};
          _0x144444 = "   『 *ALL VARIABLES OF YOUR BOT* 』 \n*________________________________________*\n";
          Object.keys(_0x521620).forEach(_0x57ee2b => {
            _0x144444 += "*" + _0x57ee2b + " :*  " + (_0x521620[_0x57ee2b] ? "```" + _0x521620[_0x57ee2b] + "```" : "") + " \n";
          });
        } catch (_0x1fbab0) {
          console.log(_0x1fbab0);
        }
        let _0x5bf7e3 = (await heroku.getallvar()) || {};
        let _0x554f1f = /heroku/gi.test(_0x24ee86) ? _0x5bf7e3.data : /bot/gi.test(_0x24ee86) ? _0x144444 : _0x144444 + (_0x5bf7e3.data ? "*UPDATED VARIABLES* \n" + _0x5bf7e3.data : "HEROKU NOT RESPONDING! PLEASE SET VALID `HEROKU_APP_NAME & `HEROKU_API_KEY`");
        return await _0x25d85b.send(_0x554f1f);
      } catch (_0x19ac3e) {
        await _0x25d85b.error(_0x19ac3e + "\n\ncommand: allvar", _0x19ac3e);
      }
    });
    amd({
      pattern: "newvar",
      alias: ["addvar", "avar"],
      desc: "To Set Heroku Vars",
      category: "tools",
      fromMe: true,
      filename: __filename
    }, async (_0x4f4031, _0x4e4817, {
      cmdName: _0x23e35e
    }) => {
      try {
        if (!_0x4e4817) {
          return _0x4f4031.reply("*Use " + (prefix + _0x23e35e) + " CAPTION:Suhail Md*");
        }
        const _0x4ddca6 = _0x4e4817.includes(":") ? _0x4e4817.indexOf(":") : _0x4e4817.indexOf("=");
        const _0xd9b269 = _0x4e4817.slice(0, _0x4ddca6).toUpperCase().trim();
        const _0x23a310 = _0x4e4817.slice(_0x4ddca6 + 1).trim();
        if (!_0x23a310) {
          return msg.reply("*Uhh Please, Provide Value After ':' !*\n*Example : " + (prefix + _0x23e35e) + " AUTO_SAVE_STATUS:true*");
        }
        let _0x4c58d8 = (await heroku.addvar(_0xd9b269, _0x23a310)) || {};
        if (_0x4c58d8.status) {
          _0x4f4031.reply("*" + _0xd9b269 + ":* [ " + _0x23a310 + " ]  *Added successfully.*");
          restart_bot();
        } else if (!_0x4c58d8 || !_0x4c58d8.status) {
          console.error(_0x4c58d8.data);
          await _0x4f4031.reply("*_Can't add " + _0x23e35e + " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_");
        }
      } catch (_0x5badd2) {
        await _0x4f4031.error(_0x5badd2 + "\n\ncommand: " + _0x23e35e, _0x5badd2);
      }
    });
    amd({
      pattern: "delvar",
      fromMe: true,
      desc: "Delete heroku config var",
      type: "tools"
    }, async (_0x558033, _0x56a240) => {
      try {
        if (!_0x56a240) {
          return await _0x558033.send("```Either Variable or Value is missing```");
        }
        const _0x15bfa8 = _0x56a240.toUpperCase();
        let _0x458bc0 = process.env[_0x15bfa8] || process.env[_0x56a240] || false;
        if (!_0x458bc0) {
          return _0x558033.reply("*" + _0x15bfa8 + "* variable not exist in BOT!");
        }
        let _0x399092 = (await heroku.addvar(_0x15bfa8, false)) || {};
        if (_0x399092.status) {
          _0x558033.reply("```{} successfully deleted```".replace("{}", _0x15bfa8));
          restart_bot();
        } else if (!_0x399092 || !_0x399092.status) {
          console.log(_0x399092.data);
          await _0x558033.reply("*_Can't add " + cmdName + " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_");
        }
      } catch (_0x223430) {
        _0x558033.error(_0x223430 + "\n\ncommand: delvar", _0x223430, false);
      }
    });
    amd({
      pattern: "getvar",
      desc: "To Get A Heroku Var",
      category: "tools",
      fromMe: true,
      filename: __filename
    }, async (_0x30c9b1, _0x1a330a, {
      cmdName: _0x30054
    }) => {
      try {
        require(config_dir);
        if (!_0x1a330a) {
          return _0x30c9b1.reply("*Please give me Variable Name*\n*Example : " + (prefix + _0x30054) + " CAPTION*");
        }
        const _0x357a91 = _0x1a330a.toUpperCase();
        let _0x3ce2dd = process.env[_0x357a91] || process.env[_0x1a330a] || false;
        if (_0x3ce2dd) {
          return _0x30c9b1.reply(_0x357a91 + ":" + _0x3ce2dd);
        } else {
          return _0x30c9b1.reply("*" + _0x357a91 + "* variable not exist in BOT!\nUse *" + prefix + "newvar* to add variables!");
        }
      } catch (_0x4aa2ff) {
        await _0x30c9b1.error(_0x4aa2ff + "\n\ncommand: " + _0x30054, _0x4aa2ff);
      }
    });
    amd({
      pattern: "setvar",
      alias: ["updatevar"],
      desc: "To Set Heroku Vars",
      category: "tools",
      fromMe: true,
      filename: __filename
    }, async (_0x30bb0e, _0x55d839, {
      amd: _0xbfe12a
    }) => {
      try {
        if (!_0x55d839) {
          return _0x30bb0e.reply("*Uhh dear, Give me variable name*\n*Example : " + prefix + "setvar PREFIX:null*");
        }
        const _0x5ccf72 = _0x55d839.includes(":") ? _0x55d839.indexOf(":") : _0x55d839.indexOf("=");
        const _0x572bfd = _0x55d839.slice(0, _0x5ccf72).toUpperCase().trim();
        const _0x3f57a8 = _0x55d839.slice(_0x5ccf72 + 1).trim();
        if (!_0x3f57a8) {
          return msg.reply("*Uhh Please, Provide value after ':' !*\n*Example : " + (prefix + _0xbfe12a) + " AUTO_READ_STATUS:true*");
        }
        let _0x114a64 = await heroku.setvar(_0x572bfd, _0x3f57a8);
        if (_0x114a64.status) {
          await _0x30bb0e.reply("*" + _0x572bfd + ":* [ " + _0x3f57a8 + " ]  *updated successfully.*");
          restart_bot();
        } else if (!_0x114a64 || !_0x114a64.status) {
          await _0x30bb0e.reply(_0x114a64.data);
        }
      } catch (_0x1d631d) {
        await _0x30bb0e.error(_0x1d631d + "\n\ncommand: " + _0xbfe12a, _0x1d631d);
      }
    });
    if (process.env.HEROKU_API_KEY || process.env.HEROKU_APP_NAME) {
      amd({
        pattern: "reboot",
        fromMe: true,
        desc: "reboot heroku bot.",
        type: "tools"
      }, async _0xb6ea23 => {
        try {
          await _0xb6ea23.reply("_Rebooting Heroku App..._");
          const _0x535e75 = require("heroku-client");
          const _0x5eab3b = new _0x535e75({
            token: HEROKU_API_KEY
          });
          await _0x5eab3b.delete("/apps/" + HEROKU_APP_NAME + "/dynos").catch(async _0x5aeb05 => {
            return await _0xb6ea23.send("ERROR HEROKU : " + (_0x5aeb05.message || _0x5aeb05.body.message));
          });
        } catch (_0x161056) {
          _0xb6ea23.error(_0x161056 + "\n\ncommand: reboot", _0x161056, false);
        }
      });
      amd({
        pattern: "shutdown",
        alias: ["turnoff"],
        fromMe: true,
        type: "tools"
      }, async (_0xee0308, _0x33b4c6) => {
        try {
          const _0x578d90 = require("heroku-client");
          const _0x10117f = new _0x578d90({
            token: HEROKU_API_KEY
          });
          let _0x543466 = "/apps/" + HEROKU_APP_NAME;
          await _0x10117f.get(_0x543466 + "/formation").then(async _0x945740 => {
            log({
              formation: _0x945740
            });
            forID = _0x945740[0].id;
            let _0x6e1cc1 = Math.floor(Math.random() * 15) + 5;
            let {
              key: _0xf74b3f
            } = await _0xee0308.send("_Shutting down in next " + _0x6e1cc1 + "s.._");
            await require(lib_dir).sleep(_0x6e1cc1 * 1000);
            await _0x10117f.patch(_0x543466 + "/formation/" + forID, {
              body: {
                quantity: _0x33b4c6 === "on" ? 1 : 0
              }
            });
            await _0xee0308.edit("bye bye!", {
              edit: _0xf74b3f
            });
          }).catch(async _0x4ca293 => {
            await _0xee0308.send("HEROKU ERROR : " + (_0x4ca293.message || _0x4ca293));
          });
        } catch (_0x304a1b) {
          _0xee0308.error(_0x304a1b + "\n\ncommand: shutdown", _0x304a1b, false);
        }
      });
      amd({
        pattern: "turnon",
        fromMe: true,
        type: "tools",
        dontAddCommandList: true
      }, async (_0x2a6748, _0x2701b3) => {
        try {
          if (!_0x2701b3) {
            return message.reply("*Provide stopped heroku app name to restart it*\n*Example : " + prefix + "turnon APP_NAME:" + HEROKU_APP_NAME.slice(1, 5) + "*");
          }
          const _0x1313df = _0x2701b3.includes(":") ? _0x2701b3.indexOf(":") : _0x2701b3.indexOf("=");
          const _0x4adc58 = _0x2701b3.slice(0, _0x1313df).toUpperCase().trim();
          const _0x19fcfe = _0x2701b3.slice(_0x1313df + 1).trim().split(" ")[0];
          if (!/HEROKU|APP|NAME/gi.test(_0x4adc58)) {
            return message.reply("```Either Key or value Missing```\n ```Example : " + prefix + "turnon NAME:heroku_app```");
          }
          if (!_0x19fcfe) {
            return msg.reply("*Uhh Please, Provide value after ':' !*\n*Example : " + prefix + "turnon HEROKU:app_name*");
          }
          const _0x1e29c9 = require("heroku-client");
          const _0x41815e = new _0x1e29c9({
            token: HEROKU_API_KEY
          });
          let _0x391c8d = "/apps/" + _0x19fcfe;
          await _0x41815e.get(_0x391c8d + "/formation").then(async _0x55d207 => {
            log({
              formation: _0x55d207
            });
            forID = _0x55d207[0].id;
            let _0x50c707 = Math.floor(Math.random() * 5) + 5;
            let {
              key: _0x5ba0c0
            } = await _0x2a6748.send("_Turning On in next " + _0x50c707 + "s.._");
            await require(lib_dir).sleep(_0x50c707 * 1000);
            await _0x41815e.patch(_0x391c8d + "/formation/" + forID, {
              body: {
                quantity: 1
              }
            });
            await _0x2a6748.edit("HURRAY TURNED ON!", {
              edit: _0x5ba0c0
            });
          }).catch(async _0x17c538 => {
            await _0x2a6748.send("HEROKU ERROR : " + (_0x17c538.message || _0x17c538));
          });
        } catch (_0x2a8ec6) {
          _0x2a6748.error(_0x2a8ec6 + "\n\ncommand: turnon", _0x2a8ec6, false);
        }
      });
      amd({
        pattern: "dyno",
        fromMe: true,
        desc: "Heroku DYNOS Infomation!",
        type: "tools"
      }, async (_0x554e38, _0x59535f) => {
        const _0x551cca = require("heroku-client");
        const _0x30dc40 = new _0x551cca({
          token: HEROKU_API_KEY
        });
        let _0x3affb2 = "/apps/" + HEROKU_APP_NAME;
        _0x30dc40.get("/account").then(async _0x5d0320 => {
          const _0x4243f0 = "https://api.heroku.com/accounts/" + _0x5d0320.id + "/actions/get-quota";
          const _0x4a40fa = {
            "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
            Authorization: "Bearer " + HEROKU_API_KEY,
            Accept: "application/vnd.heroku+json; version=3"
          };
          try {
            const _0x24019a = await axios.post(_0x4243f0, null, {
              headers: _0x4a40fa
            });
            const _0x5815f9 = _0x24019a.data;
            const _0x1d36e5 = Math.floor(_0x5815f9.account_quota);
            const _0x95f186 = Math.floor(_0x5815f9.quota_used);
            const _0x1ec20a = Math.round(_0x95f186 / _0x1d36e5 * 100);
            const _0x2329b0 = _0x1d36e5 - _0x95f186;
            await _0x554e38.send("*HEROKU DYNOS INFORMATION FOR " + HEROKU_APP_NAME.toUpperCase() + "_APP*\n      Total Dynos : " + _0x1d36e5 + "\n      Dyno Used : " + _0x95f186 + "\n      Percentage : " + _0x1ec20a + "\n      Dyno Left : " + _0x2329b0);
          } catch (_0x57325a) {
            console.error(_0x57325a);
            await _0x554e38.send(_0x57325a.message || "An error occurred while fetching Heroku dynos information.");
          }
        });
      });
      amd({
        pattern: "heroku",
        fromMe: true,
        desc: "Heroku ACCOUNT Infomation!",
        type: "tools"
      }, async (_0x2eadf9, _0x58756b) => {
        try {
          const _0x4360b5 = require("heroku-client");
          const _0xbb5b96 = new _0x4360b5({
            token: HEROKU_API_KEY
          });
          let _0x451470 = "";
          let _0x2f8ad6 = "";
          let _0x5498bc = "/apps/" + HEROKU_APP_NAME;
          await _0xbb5b96.get(_0x5498bc + "/formation").then(async _0xc980a2 => {
            let _0x4708cb = _0xc980a2[0] || {};
            if (_0x4708cb && _0x4708cb.id) {
              _0x4708cb.name = HEROKU_APP_NAME;
              for (const [_0x1eb472, _0x542aa1] of Object.entries(_0x4708cb)) {
                _0x2f8ad6 += typeof _0x542aa1 == "object" ? "" : "- *" + _0x1eb472 + ":* ```" + _0x542aa1 + "```\n";
              }
              _0x2f8ad6 = _0x2f8ad6 ? "*HEROKU APP(`" + HEROKU_APP_NAME + "`) INFORMATION*\n" + _0x2f8ad6 : "";
              if (/app|bot|suhail|amd/gi.test(_0x58756b) && _0x2f8ad6) {
                return await _0x2eadf9.send(_0x2f8ad6);
              }
            }
          }).catch(async _0x3608e6 => {});
          _0xbb5b96.get("/account").then(async _0x57a495 => {
            if (_0x57a495 && _0x57a495.id) {
              for (const [_0xbf171, _0x19c2d6] of Object.entries(_0x57a495)) {
                _0x451470 += "- *" + _0xbf171 + ":* ```" + _0x19c2d6 + "```\n";
              }
              await _0x2eadf9.send(("*HEROKU ACCOUNT INFORMATION*\n\n" + _0x451470 + "\n\n" + _0x2f8ad6).trim());
            } else {
              throw "_Acc Not found, please check valid `HEROKU_API_KEY`_";
            }
          }).catch(async _0x1e40ff => {
            console.log(_0x1e40ff.message || _0x1e40ff.data || data);
            await _0x2eadf9.send(_0x1e40ff.message);
          });
        } catch (_0x10dff5) {
          _0x2eadf9.error(_0x10dff5 + "\n\ncommand: heroku", _0x10dff5, false);
        }
      });
    }
    module.exports = {
      heroku: heroku,
      restart_bot: restart_bot,
      save_env: save_env,
      updateCache: updateCache
    };
  } catch (_0x56e126) {
    log("HEROKU UPDATE ERROR : ", _0x56e126);
  }