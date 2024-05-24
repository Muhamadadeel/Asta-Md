try {
  let { Config, prefix, SysFunction } = require(lib_dir);
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
      SESSION_ID: global.SESSION_ID,
      ...(global.newvar || {}),
    };
  };
  global.allvar = loadvar();
  let restart_bot = () => {
    try {
      require("pm2").restart("index.js");
    } catch (err) {
      console.log(err);
    }
    const { exec: Restarter } = require("child_process");
    Restarter("pm2 restart all");
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
      let AllSudoData = SudoData.map(
        (Sudoed, SudoPP) => "  " + (SudoPP + 1) + " 〄 @" + Sudoed + "\n\n"
      ).join("");
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
          result = "   『 *ALL VARIABLES OF YOUR BOT* 』 \n";
          Object.keys(variables).forEach((results) => {
            result +=
              "*" +
              results +
              " :*  " +
              (variables[results] ? "```" + variables[results] + "```" : "") +
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
            "*Use " + (prefix + HerokuNewVar) + " CAPTION:Asta Md*"
          );
        }
        const match = input.includes(":")
          ? input.indexOf(":")
          : input.indexOf("=");
        const InputedData = input.slice(0, match).toUpperCase().trim();
        const excepted = input.slice(match + 1).trim();
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
        await message.error(error + "\n\ncommand: " + HerokuNewVar, error);
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
        let get = process.env[input] || process.env[match] || false;
        if (!get) {
          return message.reply("*" + input + "* variable not exist in BOT!");
        }
        let expected = (await heroku.addvar(input, false)) || {};
        if (expected.status) {
          message.reply("```{} successfully deleted```".replace("{}", input));
          restart_bot();
        } else if (!expected || !expected.status) {
          console.log(expected.data);
          await message.reply(
            "*_Can't add " +
              cmdName +
              " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_"
          );
        }
      } catch (error) {
        message.error(error + "\n\ncommand: delvar", error, false);
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
    async (message, match, { cmdName: getvar }) => {
      try {
        require(config_dir);
        if (!match) {
          return message.reply(
            "*Please give me Variable Name*\n*Example : " +
              (prefix + getvar) +
              " CAPTION*"
          );
        }
        const Data = match.toUpperCase();
        let proccesor = process.env[Data] || process.env[match] || false;
        if (proccesor) {
          return message.reply(Data + ":" + proccesor);
        } else {
          return message.reply(
            "*" +
              Data +
              "* variable not exist in BOT!\nUse *" +
              prefix +
              "newvar* to add variables!"
          );
        }
      } catch (error) {
        await message.error(error + "\n\ncommand: " + getvar, error);
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
    async (message, match, { amd: setvar }) => {
      try {
        if (!match) {
          return message.reply(
            "*Uhh dear, Give me variable name*\n*Example : " +
              prefix +
              "setvar PREFIX:null*"
          );
        }
        const Data = match.includes(":")
          ? match.indexOf(":")
          : match.indexOf("=");
        const input = match.slice(0, Data).toUpperCase().trim();
        const excpected = match.slice(Data + 1).trim();
        if (!excpected) {
          return msg.reply(
            "*Uhh Please, Provide value after ':' !*\n*Example : " +
              (prefix + setvar) +
              " AUTO_READ_STATUS:true*"
          );
        }
        let VarSetor = await heroku.setvar(input, excpected);
        if (VarSetor.status) {
          await message.reply(
            "*" + input + ":* [ " + excpected + " ]  *updated successfully.*"
          );
          restart_bot();
        } else if (!VarSetor || !VarSetor.status) {
          await message.reply(VarSetor.data);
        }
      } catch (error) {
        await message.error(error + "\n\ncommand: " + setvar, error);
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
      async (action) => {
        try {
          await action.reply("_Rebooting Heroku App..._");
          const _0x535e75 = require("heroku-client");
          const _0x5eab3b = new _0x535e75({
            token: HEROKU_API_KEY,
          });
          await _0x5eab3b
            .delete("/apps/" + HEROKU_APP_NAME + "/dynos")
            .catch(async (error) => {
              return await action.send(
                "ERROR HEROKU : " + (error.message || error.body.message)
              );
            });
        } catch (err) {
          action.error(err + "\n\ncommand: reboot", err, false);
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
      async (message, formation) => {
        try {
          const ControlRemote = require("heroku-client");
          const AccessApi = new ControlRemote({
            token: HEROKU_API_KEY,
          });
          let result = "/apps/" + HEROKU_APP_NAME;
          await AccessApi.get(result + "/formation")
            .then(async (ondyno) => {
              log({
                formation: ondyno,
              });
              forID = ondyno[0].id;
              let OnTime = Math.floor(Math.random() * 15) + 5;
              let { key: OffMsg } = await message.send(
                "_Shutting down in next " + OnTime + "s.._"
              );
              await require(lib_dir).sleep(OnTime * 1000);
              await AccessApi.patch(result + "/formation/" + forID, {
                body: {
                  quantity: formation === "on" ? 1 : 0,
                },
              });
              await message.edit("bye bye!", {
                edit: OffMsg,
              });
            })
            .catch(async (_0x4ca293) => {
              await message.send(
                "HEROKU ERROR : " + (_0x4ca293.message || _0x4ca293)
              );
            });
        } catch (error) {
          message.error(error + "\n\ncommand: shutdown", error, false);
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
      async (message, match) => {
        try {
          if (!match) {
            return message.reply(
              "*Provide stopped heroku app name to restart it*\n*Example : " +
                prefix +
                "turnon APP_NAME:" +
                HEROKU_APP_NAME.slice(1, 5) +
                "*"
            );
          }
          const data = match.includes(":")
            ? match.indexOf(":")
            : match.indexOf("=");
          const query = match.slice(0, data).toUpperCase().trim();
          const input = match
            .slice(data + 1)
            .trim()
            .split(" ")[0];
          if (!/HEROKU|APP|NAME/gi.test(query)) {
            return message.reply(
              "```Either Key or value Missing```\n ```Example : " +
                prefix +
                "turnon NAME:heroku_app```"
            );
          }
          if (!input) {
            return msg.reply(
              "*Uhh Please, Provide value after ':' !*\n*Example : " +
                prefix +
                "turnon HEROKU:app_name*"
            );
          }
          const APiAccess = require("heroku-client");
          const ConRemote = new APiAccess({
            token: HEROKU_API_KEY,
          });
          let HerokuApi = "/apps/" + input;
          await ConRemote.get(HerokuApi + "/formation")
            .then(async (Result) => {
              log({
                formation: Result,
              });
              forID = Result[0].id;
              let Regulator = Math.floor(Math.random() * 5) + 5;
              let { key: SentResultMsg } = await message.send(
                "_Turning On in next " + Regulator + "s.._"
              );
              await require(lib_dir).sleep(Regulator * 1000);
              await ConRemote.patch(HerokuApi + "/formation/" + forID, {
                body: {
                  quantity: 1,
                },
              });
              await message.edit("HURRAY TURNED ON!", {
                edit: SentResultMsg,
              });
            })
            .catch(async (HeroErr) => {
              await message.send(
                "HEROKU ERROR : " + (HeroErr.message || HeroErr)
              );
            });
        } catch (error) {
          message.error(error + "\n\ncommand: turnon", error, false);
        }
      }
    );
    SysFunction(
      {
        pattern: "heroku",
        fromMe: true,
        desc: "Heroku ACCOUNT Infomation!",
        type: "tools",
      },
      async (message, query) => {
        try {
          const APiAccess = require("heroku-client");
          const Remote = new APiAccess({
            token: HEROKU_API_KEY,
          });
          let Ab = "";
          let Cd = "";
          let Ef = "/apps/" + HEROKU_APP_NAME;
          await Remote.get(Ef + "/formation")
            .then(async (inicase) => {
              let Jointdata = inicase[0] || {};
              if (Jointdata && Jointdata.id) {
                Jointdata.name = HEROKU_APP_NAME;
                for (const [obj, subj] of Object.entries(Jointdata)) {
                  Cd +=
                    typeof subj == "object"
                      ? ""
                      : "- *" + obj + ":* ```" + subj + "```\n";
                }
                Cd = Cd
                  ? "*HEROKU APP(`" + HEROKU_APP_NAME + "`) INFORMATION*\n" + Cd
                  : "";
                if (/app|bot|suhail|amd/gi.test(query) && Cd) {
                  return await message.send(Cd);
                }
              }
            })
            .catch(async (_0x3608e6) => {});
          Remote.get("/account")
            .then(async (resulted) => {
              if (resulted && resulted.id) {
                for (const [AccData, InfoAcc] of Object.entries(resulted)) {
                  Ab += "- *" + AccData + ":* ```" + InfoAcc + "```\n";
                }
                await message.send(
                  ("*HEROKU ACCOUNT INFORMATION*\n\n" + Ab + "\n\n" + Cd).trim()
                );
              } else {
                throw "_Acc Not found, please check valid `HEROKU_API_KEY`_";
              }
            })
            .catch(async (logData) => {
              console.log(logData.message || logData.data || data);
              await message.send(logData.message);
            });
        } catch (error) {
          message.error(error + "\n\ncommand: heroku", error, false);
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
} catch (error) {
  log("HEROKU UPDATE ERROR : ", error);
}
