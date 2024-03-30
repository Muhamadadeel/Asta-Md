let { smd} = require("../lib");
const axios = require("axios");
smd(
    {
      cmdname: "myip",
      alias: ["ip"],
      type: "tools",
      info: "Get IP address",
    },
    async (_0x446c27) => {
      try {
        let { data: _0x58d504 } = await axios.get("https://api.ipify.org/");
        _0x446c27.send(
          _0x58d504
            ? "ɪᴘ ᴀᴅᴅʀᴇss ɪs : _" + _0x58d504 + "_*"
            : "_No responce from server!_",
        );
      } catch (_0x2976b7) {
        await _0x446c27.error(_0x2976b7 + "\n\ncommand : myip", _0x2976b7, false);
      }
    },
  );
  let ssweb = (_0x55d18b, _0x2b24ca = "desktop") => {
    return new Promise((_0x3e38ef, _0x5b6da8) => {
      const _0x3eb2a3 = "https://www.screenshotmachine.com";
      const _0x3bbdf7 = {
        url: _0x55d18b,
        device: _0x2b24ca,
        cacheLimit: 0,
      };
      axios({
        url: _0x3eb2a3 + "/capture.php",
        method: "POST",
        data: new URLSearchParams(Object.entries(_0x3bbdf7)),
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
        .then((_0xc3c6b3) => {
          const _0x5ba45c = _0xc3c6b3.headers["set-cookie"];
          if (_0xc3c6b3.data.status == "success") {
            axios
              .get(_0x3eb2a3 + "/" + _0xc3c6b3.data.link, {
                headers: {
                  cookie: _0x5ba45c.join(""),
                },
                responseType: "arraybuffer",
              })
              .then(({ data: _0x257890 }) => {
                result = {
                  status: 200,
                  result: _0x257890,
                };
                _0x3e38ef(result);
              });
          } else {
            _0x5b6da8({
              status: 404,
              statuses: "Link Error",
              message: _0xc3c6b3.data,
            });
          }
        })
        .catch(_0x5b6da8);
    });
  };