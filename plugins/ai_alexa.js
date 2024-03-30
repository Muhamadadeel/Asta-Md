let { smd} = require("../lib");
const fetch = require("node-fetch");
smd(
    {
      cmdname: "alexa",
      category: "ai",
      use: "[text]",
      filename: __filename,
      info: "chat with simsimi alexa ai!",
    },
    async (_0xe6d6e, _0x23f786) => {
      try {
        if (!_0x23f786) {
          return await _0xe6d6e.reply(
            "Hi *" + _0xe6d6e.senderName + "*, do you want to talk?",
          );
        }
        const _0x55bb61 = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "text=" + encodeURIComponent(_0x23f786) + "&lc=en&key=",
        };
        const _0x5099c8 = await fetch(
          "https://api.simsimi.vn/v2/simtalk",
          _0x55bb61,
        );
        const _0x2c3e12 = await _0x5099c8.json();
        if (_0x2c3e12.status === "200" && _0x2c3e12.message) {
          _0xe6d6e.reply(_0x2c3e12.message);
        } else {
          _0xe6d6e.reply("*No Responce!*");
        }
      } catch (_0xfee6e3) {
        await _0xe6d6e.error(
          _0xfee6e3 + "\n\ncommand : poetry",
          _0xfee6e3,
          false,
        );
      }
    },
  );