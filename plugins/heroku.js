try {
  let { Config, prefix, SysFunction } = require(lib_dir);
  const axios = require("axios");
  const fetch = require("node-fetch");
  const fs = require("fs");
  global.HEROKU_APP_NAME = (process.env.HEROKU_APP_NAME || "").toLowerCase();
  global.HEROKU_API_KEY = process.env.HEROKU_API_KEY;
  global.HEROKU =
    process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY ? true : false;
  global.loadvar = () => {
    const modules = require(global.config_dir || "../config");
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
      MENU: modules.menu || global.menu,
      PREFIX: modules.HANDLERS,
      CAPTION: modules.caption,
      PACK_AUTHER: modules.author,
      PACK_NAME: modules.packname,
      BOT_NAME: modules.botname,
      OWNER_NAME: modules.ownername,
      ERROR_CHAT: modules.errorChat,
      KOYEB_API: modules.KOYEB_API,
      REMOVE_BG_KEY: modules.REMOVE_BG_KEY,
      OPENAI_API_KEY: modules.OPENAI_API_KEY,
      ANTILINK_VALUES: modules.antilink_values,
      MODE: modules.WORKTYPE,
      THEME: modules.LANG,
      SESSION_ID: global.SESSION_ID,
      ...(global.newvar || {}),
    };
  };
  global.allvar = loadvar();
  let restart_bot = () => {
    try {
      require("pm2").restart("index.js");
    } catch (_0x3abf25) {
      console.log(_0x3abf25);
    }
    const { exec: _0x31294b } = require("child_process");
    _0x31294b("pm2 restart all");
  };
  let updateCache = (dir = "../config") => {
    try {
      delete require.cache[dir];
      require(dir);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  let save_env = async (message, match, query = ".env") => {
    try {
      const _0x29834f = fs.existsSync(query)
        ? fs.readFileSync(query, "utf8")
        : "";
      const data = require("dotenv").parse(_0x29834f) || {};
      if (!match && data[message]) {
        delete data[message];
      } else if (message) {
        data[message] = match;
      }
      const db = Object.entries(data)
        .map(([init, before]) => init + "=" + before)
        .join("\n");
      fs.writeFileSync(query, db);
      return {
        status: true,
        data: data,
      };
    } catch (error) {
      return {
        status: false,
        data: error.message || "_ERROR!_",
      };
    }
  };
  const heroku = {};
  heroku.addvar = async (message, sys) => {
    try {
      if (HEROKU) {
        const _0x5ba510 = {
          Accept: "application/vnd.heroku+json; version=3",
          Authorization: "Bearer " + HEROKU_API_KEY,
          "Content-Type": "application/json",
        };
        const ReadFrom = await fetch(
          "https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars",
          {
            method: "PATCH",
            headers: _0x5ba510,
            body: JSON.stringify({
              [message]: sys,
            }),
          }
        );
        const vaildate = await ReadFrom.json();
        return {
          status: true,
          data: vaildate,
        };
      } else {
        return await save_env(message, sys);
      }
    } catch (error) {
      return {
        status: false,
        data: error,
      };
    }
  };
  heroku.getallvar = async () => {
    try {
      const DataVar = {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer " + HEROKU_API_KEY,
      };
      const ReadFrom = await fetch(
        "https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars",
        {
          headers: DataVar,
        }
      );
      const AccomData = await ReadFrom.json();
      let ReadResult =
        "   『 *" +
        HEROKU_APP_NAME +
        " VARS* 』 \n*________________________________________*\n";
      Object.keys(AccomData).forEach((VarData) => {
        ReadResult +=
          "*" +
          VarData +
          " :*  " +
          (AccomData[VarData] ? "```" + AccomData[VarData] + "```" : "") +
          " \n";
      });
      return {
        status: true,
        data: ReadResult,
        vars: AccomData,
      };
    } catch (error) {
      return {
        status: false,
        data: "HEROKU ERR: " + (error.message || error),
      };
    }
  };
  heroku.getvar = async (message) => {
    try {
      const ReadHeroku = {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer " + HEROKU_API_KEY,
      };
      const ReadFrom = await fetch(
        "https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars",
        {
          headers: ReadHeroku,
        }
      );
      const HerokuData = await ReadFrom.json();
      return {
        status: true,
        data: HerokuData[message],
      };
    } catch (error) {
      return {
        status: false,
        data: error.message || error,
      };
    }
  };
  heroku.setvar = async (message, match) => {
    try {
      if (!HEROKU) {
        return await save_env(message, value);
      }
      const ReadFrom = {
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: "Bearer " + HEROKU_API_KEY,
        "Content-Type": "application/json",
      };
      const ReadData = await fetch(
        "https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars",
        {
          method: "GET",
          headers: ReadFrom,
        }
      );
      if (!ReadData.ok) {
        return {
          status: false,
          data:
            "*Variable not found in bot*\n*Use `" +
            prefix +
            "newvar` to add new variable*",
        };
      }
      const result = await ReadData.json();
      if (result.hasOwnProperty(message)) {
        const extracted = {
          ...result,
        };
        extracted[message] = match;
        const HerokuData = await fetch(
          "https://api.heroku.com/apps/" + HEROKU_APP_NAME + "/config-vars",
          {
            method: "PATCH",
            headers: ReadFrom,
            body: JSON.stringify(extracted),
          }
        );
        if (HerokuData.ok) {
          return {
            status: true,
            data: HerokuData,
          };
        } else {
          return {
            status: false,
            data: "Failed to update bot variable. Status: " + HerokuData.status,
          };
        }
      } else {
        return {
          status: false,
          data:
            "*Variable not found in bot*\n*Use `" +
            prefix +
            "newvar` to add new variable*",
        };
      }
    } catch (error) {
      return {
        status: false,
        data: error.message || error,
      };
    }
  };
  SysFunction(
    {
      cmdname: "getsudo",
      alias: ["mods", "gsudo"],
      info: "get sudo users list.",
      fromMe: true,
      type: "heroku",
      filename: __filename,
    },
    async (message) => {
      let SudoData = global.sudo
        .split(",")
        .filter((YetSudo) => YetSudo && YetSudo !== "null")
        .map((FoundSudo) => FoundSudo.trim());
      let AllSudoData = SudoData
        .map(
          (Sudoed, SudoPP) =>
            "  " + (SudoPP + 1) + " 〄 @" + Sudoed + "\n\n"
        )
        .join("");
      let Tags = [
        message.sender,
        ...SudoData.map((SudoResult) => SudoResult + "@s.whatsapp.net"),
      ];
      if (!AllSudoData || !SudoData || !SudoData[0]) {
        return await message.reply(
          "*There's no mods/sudo added for your bot!*"
        );
      }
      let FullSudoResult = (
        "\n   👤 *" +
        Config.botname +
        " MODS* 👤\n   \n" +
        AllSudoData
      ).trim();
      return await message.reply(
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/318032894/original/580c288e976e685895f8519718cccc89ba4d887d/be-your-professional-discord-moderator.jpeg",
        {
          caption: FullSudoResult,
          mentions: Tags,
        },
        "img",
        message
      );
    }
  );
  SysFunction(
    {
      pattern: "setsudo",
      alias: ["ssudo", "setmod"],
      fromMe: true,
      desc: "Make sudo to a user",
      category: "tools",
      filename: __filename,
    },
    async (input) => {
      try {
        let match = input.reply_message
          ? input.reply_message.sender
          : input.mentionedJid[0]
          ? input.mentionedJid[0]
          : "";
        if (!match || !match.includes("@s.whatsapp.net")) {
          return await input.reply("*Uhh dear, reply/mention an User*");
        }
        let Matched = match.split("@")[0];
        if (global.sudo.includes(Matched)) {
          return input.reply("*Number Already Exist In Sudo!*");
        }
        global.sudo += "," + Matched;
        let NewSudo = HEROKU
          ? await heroku.addvar("SUDO", global.sudo)
          : {
              status: false,
            };
        if (NewSudo && NewSudo.status) {
          return input.reply(
            "*" +
              Matched +
              " Added Succesfully.*\nSudo Numbers : ```" +
              global.sudo +
              "```"
          );
        } else if (!NewSudo || !NewSudo?.status) {
          if (HEROKU) {
            await input.reply(
              "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_"
            );
          }
          await input.reply("*User temporary added in sudo.*");
        }
      } catch (error) {
        await input.error(error + "\n\ncommand: setsudo", error);
      }
    }
  );
  SysFunction(
    {
      pattern: "delsudo",
      alias: ["dsudo", "delmod"],
      fromMe: true,
      desc: "delete sudo user.",
      category: "tools",
      filename: __filename,
    },
    async (input) => {
      try {
        let match = input.reply_message
          ? input.reply_message.sender
          : input.mentionedJid[0]
          ? input.mentionedJid[0]
          : "";
        if (!match || !match.includes("@s.whatsapp.net")) {
          return await input.reply("*Uhh dear, reply/mention an User*");
        }
        let matched = match.split("@")[0];
        let data = "," + matched;
        if (global.sudo.includes(data)) {
          global.sudo = global.sudo.replace(data, "");
        } else {
          return await input.reply("*_User not found in the Sudo List!_*");
        }
        let rrg = HEROKU
          ? await heroku.addvar("SUDO", global.sudo)
          : {
              status: false,
            };
        if (rrg && rrg.status) {
          return input.reply(
            "*" +
              matched +
              " Deleted Succesfully.*\nSudo Numbers : ```" +
              global.sudo +
              "```"
          );
        } else if (!rrg || !rrg?.status) {
          if (HEROKU) {
            await input.reply(
              "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_"
            );
          }
          await input.reply("*User removed from sudo.*");
        }
      } catch (error) {
        await input.error(error + "\n\ncommand: delsudo", error);
      }
    }
  );
  SysFunction(
    {
      pattern: "allvar",
      alias: ["getallvar", "allvars"],
      desc: "To get All  Heroku Vars",
      fromMe: true,
      category: "tools",
      filename: __filename,
    },
    async (message, data) => {
      try {
        if (HEROKU && /all|bot|heroku/gi.test(data)) {
          return await message.reply(
            "please provide type of variables\nUse " +
              prefix +
              "allvar heroku/all/bot"
          );
        }
        let result = "";
        try {
          global.allvar = loadvar();
          let variables = global.allvar || {};
          result =
            "   『 *ALL VARIABLES OF YOUR BOT* 』 \n";
          Object.keys(variables).forEach((results) => {
            result +=
              "*" +
              results +
              " :*  " +
              (variables[results]
                ? "```" + variables[results] + "```"
                : "") +
              " \n";
          });
        } catch (error) {
          console.log(error);
        }
        let request = (await heroku.getallvar()) || {};
        let output = /heroku/gi.test(data)
          ? request.data
          : /bot/gi.test(data)
          ? result
          : result +
            (request.data
              ? "*UPDATED VARIABLES* \n" + request.data
              : "HEROKU NOT RESPONDING! PLEASE SET VALID `HEROKU_APP_NAME & `HEROKU_API_KEY`");
        return await message.send(output);
      } catch (error) {
        await message.error(error + "\n\ncommand: allvar", error);
      }
    }
  );
  SysFunction(
    {
      pattern: "newvar",
      alias: ["addvar", "avar"],
      desc: "To Set Heroku Vars",
      category: "tools",
      fromMe: true,
      filename: __filename,
    },
    async (message, input, { cmdName: HerokuNewVar }) => {
      try {
        if (!input) {
          return message.reply(
            "*Use " + (prefix + HerokuNewVar) + " CAPTION:Suhail Md*"
          );
        }
        const _0x4ddca6 = input.includes(":")
          ? input.indexOf(":")
          : input.indexOf("=");
        const InputedData = input.slice(0, _0x4ddca6).toUpperCase().trim();
        const excepted = input.slice(_0x4ddca6 + 1).trim();
        if (!excepted) {
          return msg.reply(
            "*Uhh Please, Provide Value After ':' !*\n*Example : " +
              (prefix + HerokuNewVar) +
              " AUTO_SAVE_STATUS:true*"
          );
        }
        let unormalized = (await heroku.addvar(InputedData, excepted)) || {};
        if (unormalized.status) {
          message.reply(
            "*" + InputedData + ":* [ " + excepted + " ]  *Added successfully.*"
          );
          restart_bot();
        } else if (!unormalized || !unormalized.status) {
          console.error(unormalized.data);
          await message.reply(
            "*_Can't add " +
              HerokuNewVar +
              " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_"
          );
        }
      } catch (error) {
        await message.error(
          error + "\n\ncommand: " + HerokuNewVar,
          error
        );
      }
    }
  );
  SysFunction(
    {
      pattern: "delvar",
      fromMe: true,
      desc: "Delete heroku config var",
      type: "tools",
    },
    async (message, match) => {
      try {
        if (!match) {
          return await message.send(
            "```Either Variable or Value is missing```"
          );
        }
        const input = match.toUpperCase();
        let get =
          process.env[input] || process.env[match] || false;
        if (!get) {
          return message.reply(
            "*" + input + "* variable not exist in BOT!"
          );
        }
        let expected = (await heroku.addvar(input, false)) || {};
        if (expected.status) {
          message.reply(
            "```{} successfully deleted```".replace("{}", input)
          );
          restart_bot();
        } else if (!expected || !expected.status) {
          console.log(expected.data);
          await message.reply(
            "*_Can't add " +
              cmdName +
              " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_"
          );
        }
      } catch (_0x223430) {
        message.error(_0x223430 + "\n\ncommand: delvar", _0x223430, false);
      }
    }
  );
  SysFunction(
    {
      pattern: "getvar",
      desc: "To Get A Heroku Var",
      category: "tools",
      fromMe: true,
      filename: __filename,
    },
    async (_0x30c9b1, _0x1a330a, { cmdName: _0x30054 }) => {
      try {
        require(config_dir);
        if (!_0x1a330a) {
          return _0x30c9b1.reply(
            "*Please give me Variable Name*\n*Example : " +
              (prefix + _0x30054) +
              " CAPTION*"
          );
        }
        const _0x357a91 = _0x1a330a.toUpperCase();
        let _0x3ce2dd =
          process.env[_0x357a91] || process.env[_0x1a330a] || false;
        if (_0x3ce2dd) {
          return _0x30c9b1.reply(_0x357a91 + ":" + _0x3ce2dd);
        } else {
          return _0x30c9b1.reply(
            "*" +
              _0x357a91 +
              "* variable not exist in BOT!\nUse *" +
              prefix +
              "newvar* to add variables!"
          );
        }
      } catch (_0x4aa2ff) {
        await _0x30c9b1.error(
          _0x4aa2ff + "\n\ncommand: " + _0x30054,
          _0x4aa2ff
        );
      }
    }
  );
  SysFunction(
    {
      pattern: "setvar",
      alias: ["updatevar"],
      desc: "To Set Heroku Vars",
      category: "tools",
      fromMe: true,
      filename: __filename,
    },
    async (_0x30bb0e, _0x55d839, { amd: _0xbfe12a }) => {
      try {
        if (!_0x55d839) {
          return _0x30bb0e.reply(
            "*Uhh dear, Give me variable name*\n*Example : " +
              prefix +
              "setvar PREFIX:null*"
          );
        }
        const _0x5ccf72 = _0x55d839.includes(":")
          ? _0x55d839.indexOf(":")
          : _0x55d839.indexOf("=");
        const _0x572bfd = _0x55d839.slice(0, _0x5ccf72).toUpperCase().trim();
        const _0x3f57a8 = _0x55d839.slice(_0x5ccf72 + 1).trim();
        if (!_0x3f57a8) {
          return msg.reply(
            "*Uhh Please, Provide value after ':' !*\n*Example : " +
              (prefix + _0xbfe12a) +
              " AUTO_READ_STATUS:true*"
          );
        }
        let _0x114a64 = await heroku.setvar(_0x572bfd, _0x3f57a8);
        if (_0x114a64.status) {
          await _0x30bb0e.reply(
            "*" +
              _0x572bfd +
              ":* [ " +
              _0x3f57a8 +
              " ]  *updated successfully.*"
          );
          restart_bot();
        } else if (!_0x114a64 || !_0x114a64.status) {
          await _0x30bb0e.reply(_0x114a64.data);
        }
      } catch (_0x1d631d) {
        await _0x30bb0e.error(
          _0x1d631d + "\n\ncommand: " + _0xbfe12a,
          _0x1d631d
        );
      }
    }
  );
  if (process.env.HEROKU_API_KEY || process.env.HEROKU_APP_NAME) {
    SysFunction(
      {
        pattern: "reboot",
        fromMe: true,
        desc: "reboot heroku bot.",
        type: "tools",
      },
      async (_0xb6ea23) => {
        try {
          await _0xb6ea23.reply("_Rebooting Heroku App..._");
          const _0x535e75 = require("heroku-client");
          const _0x5eab3b = new _0x535e75({
            token: HEROKU_API_KEY,
          });
          await _0x5eab3b
            .delete("/apps/" + HEROKU_APP_NAME + "/dynos")
            .catch(async (_0x5aeb05) => {
              return await _0xb6ea23.send(
                "ERROR HEROKU : " +
                  (_0x5aeb05.message || _0x5aeb05.body.message)
              );
            });
        } catch (_0x161056) {
          _0xb6ea23.error(_0x161056 + "\n\ncommand: reboot", _0x161056, false);
        }
      }
    );
    SysFunction(
      {
        pattern: "shutdown",
        alias: ["turnoff"],
        fromMe: true,
        type: "tools",
      },
      async (_0xee0308, _0x33b4c6) => {
        try {
          const _0x578d90 = require("heroku-client");
          const _0x10117f = new _0x578d90({
            token: HEROKU_API_KEY,
          });
          let _0x543466 = "/apps/" + HEROKU_APP_NAME;
          await _0x10117f
            .get(_0x543466 + "/formation")
            .then(async (_0x945740) => {
              log({
                formation: _0x945740,
              });
              forID = _0x945740[0].id;
              let _0x6e1cc1 = Math.floor(Math.random() * 15) + 5;
              let { key: _0xf74b3f } = await _0xee0308.send(
                "_Shutting down in next " + _0x6e1cc1 + "s.._"
              );
              await require(lib_dir).sleep(_0x6e1cc1 * 1000);
              await _0x10117f.patch(_0x543466 + "/formation/" + forID, {
                body: {
                  quantity: _0x33b4c6 === "on" ? 1 : 0,
                },
              });
              await _0xee0308.edit("bye bye!", {
                edit: _0xf74b3f,
              });
            })
            .catch(async (_0x4ca293) => {
              await _0xee0308.send(
                "HEROKU ERROR : " + (_0x4ca293.message || _0x4ca293)
              );
            });
        } catch (_0x304a1b) {
          _0xee0308.error(
            _0x304a1b + "\n\ncommand: shutdown",
            _0x304a1b,
            false
          );
        }
      }
    );
    SysFunction(
      {
        pattern: "turnon",
        fromMe: true,
        type: "tools",
        dontAddCommandList: true,
      },
      async (_0x2a6748, _0x2701b3) => {
        try {
          if (!_0x2701b3) {
            return message.reply(
              "*Provide stopped heroku app name to restart it*\n*Example : " +
                prefix +
                "turnon APP_NAME:" +
                HEROKU_APP_NAME.slice(1, 5) +
                "*"
            );
          }
          const _0x1313df = _0x2701b3.includes(":")
            ? _0x2701b3.indexOf(":")
            : _0x2701b3.indexOf("=");
          const _0x4adc58 = _0x2701b3.slice(0, _0x1313df).toUpperCase().trim();
          const _0x19fcfe = _0x2701b3
            .slice(_0x1313df + 1)
            .trim()
            .split(" ")[0];
          if (!/HEROKU|APP|NAME/gi.test(_0x4adc58)) {
            return message.reply(
              "```Either Key or value Missing```\n ```Example : " +
                prefix +
                "turnon NAME:heroku_app```"
            );
          }
          if (!_0x19fcfe) {
            return msg.reply(
              "*Uhh Please, Provide value after ':' !*\n*Example : " +
                prefix +
                "turnon HEROKU:app_name*"
            );
          }
          const _0x1e29c9 = require("heroku-client");
          const _0x41815e = new _0x1e29c9({
            token: HEROKU_API_KEY,
          });
          let _0x391c8d = "/apps/" + _0x19fcfe;
          await _0x41815e
            .get(_0x391c8d + "/formation")
            .then(async (_0x55d207) => {
              log({
                formation: _0x55d207,
              });
              forID = _0x55d207[0].id;
              let _0x50c707 = Math.floor(Math.random() * 5) + 5;
              let { key: _0x5ba0c0 } = await _0x2a6748.send(
                "_Turning On in next " + _0x50c707 + "s.._"
              );
              await require(lib_dir).sleep(_0x50c707 * 1000);
              await _0x41815e.patch(_0x391c8d + "/formation/" + forID, {
                body: {
                  quantity: 1,
                },
              });
              await _0x2a6748.edit("HURRAY TURNED ON!", {
                edit: _0x5ba0c0,
              });
            })
            .catch(async (_0x17c538) => {
              await _0x2a6748.send(
                "HEROKU ERROR : " + (_0x17c538.message || _0x17c538)
              );
            });
        } catch (_0x2a8ec6) {
          _0x2a6748.error(_0x2a8ec6 + "\n\ncommand: turnon", _0x2a8ec6, false);
        }
      }
    );
    SysFunction(
      {
        pattern: "dyno",
        fromMe: true,
        desc: "Heroku DYNOS Infomation!",
        type: "tools",
      },
      async (_0x554e38, _0x59535f) => {
        const _0x551cca = require("heroku-client");
        const _0x30dc40 = new _0x551cca({
          token: HEROKU_API_KEY,
        });
        let _0x3affb2 = "/apps/" + HEROKU_APP_NAME;
        _0x30dc40.get("/account").then(async (_0x5d0320) => {
          const _0x4243f0 =
            "https://api.heroku.com/accounts/" +
            _0x5d0320.id +
            "/actions/get-quota";
          const _0x4a40fa = {
            "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
            Authorization: "Bearer " + HEROKU_API_KEY,
            Accept: "application/vnd.heroku+json; version=3",
          };
          try {
            const _0x24019a = await axios.post(_0x4243f0, null, {
              headers: _0x4a40fa,
            });
            const _0x5815f9 = _0x24019a.data;
            const _0x1d36e5 = Math.floor(_0x5815f9.account_quota);
            const _0x95f186 = Math.floor(_0x5815f9.quota_used);
            const _0x1ec20a = Math.round((_0x95f186 / _0x1d36e5) * 100);
            const _0x2329b0 = _0x1d36e5 - _0x95f186;
            await _0x554e38.send(
              "*HEROKU DYNOS INFORMATION FOR " +
                HEROKU_APP_NAME.toUpperCase() +
                "_APP*\n      Total Dynos : " +
                _0x1d36e5 +
                "\n      Dyno Used : " +
                _0x95f186 +
                "\n      Percentage : " +
                _0x1ec20a +
                "\n      Dyno Left : " +
                _0x2329b0
            );
          } catch (_0x57325a) {
            console.error(_0x57325a);
            await _0x554e38.send(
              _0x57325a.message ||
                "An error occurred while fetching Heroku dynos information."
            );
          }
        });
      }
    );
    SysFunction(
      {
        pattern: "heroku",
        fromMe: true,
        desc: "Heroku ACCOUNT Infomation!",
        type: "tools",
      },
      async (_0x2eadf9, _0x58756b) => {
        try {
          const _0x4360b5 = require("heroku-client");
          const _0xbb5b96 = new _0x4360b5({
            token: HEROKU_API_KEY,
          });
          let _0x451470 = "";
          let _0x2f8ad6 = "";
          let _0x5498bc = "/apps/" + HEROKU_APP_NAME;
          await _0xbb5b96
            .get(_0x5498bc + "/formation")
            .then(async (_0xc980a2) => {
              let _0x4708cb = _0xc980a2[0] || {};
              if (_0x4708cb && _0x4708cb.id) {
                _0x4708cb.name = HEROKU_APP_NAME;
                for (const [_0x1eb472, _0x542aa1] of Object.entries(
                  _0x4708cb
                )) {
                  _0x2f8ad6 +=
                    typeof _0x542aa1 == "object"
                      ? ""
                      : "- *" + _0x1eb472 + ":* ```" + _0x542aa1 + "```\n";
                }
                _0x2f8ad6 = _0x2f8ad6
                  ? "*HEROKU APP(`" +
                    HEROKU_APP_NAME +
                    "`) INFORMATION*\n" +
                    _0x2f8ad6
                  : "";
                if (/app|bot|suhail|amd/gi.test(_0x58756b) && _0x2f8ad6) {
                  return await _0x2eadf9.send(_0x2f8ad6);
                }
              }
            })
            .catch(async (_0x3608e6) => {});
          _0xbb5b96
            .get("/account")
            .then(async (_0x57a495) => {
              if (_0x57a495 && _0x57a495.id) {
                for (const [_0xbf171, _0x19c2d6] of Object.entries(_0x57a495)) {
                  _0x451470 +=
                    "- *" + _0xbf171 + ":* ```" + _0x19c2d6 + "```\n";
                }
                await _0x2eadf9.send(
                  (
                    "*HEROKU ACCOUNT INFORMATION*\n\n" +
                    _0x451470 +
                    "\n\n" +
                    _0x2f8ad6
                  ).trim()
                );
              } else {
                throw "_Acc Not found, please check valid `HEROKU_API_KEY`_";
              }
            })
            .catch(async (_0x1e40ff) => {
              console.log(_0x1e40ff.message || _0x1e40ff.data || data);
              await _0x2eadf9.send(_0x1e40ff.message);
            });
        } catch (_0x10dff5) {
          _0x2eadf9.error(_0x10dff5 + "\n\ncommand: heroku", _0x10dff5, false);
        }
      }
    );
  }
  module.exports = {
    heroku: heroku,
    restart_bot: restart_bot,
    save_env: save_env,
    updateCache: updateCache,
  };
} catch (_0x56e126) {
  log("HEROKU UPDATE ERROR : ", _0x56e126);
}
