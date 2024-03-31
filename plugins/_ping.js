const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");
sᴜʜᴀɪʟ_ᴍᴅ.smd(
  {
    pattern: "ping",
    desc: "To check ping",
    category: "tools",
    filename: __filename,
  },
  async (_0x2c4176) => {
    var _0x2d08de = new Date().getTime();
    const { key: _0x598979 } = await _0x2c4176.reply("*Testing Ping!!!*");
    var _0x41515f = new Date().getTime();
    return await _0x2c4176.send(
      "*Pong*\n *" + (_0x41515f - _0x2d08de) + " ms* ",
      {
        edit: _0x598979,
      },
      "",
      _0x2c4176
    );
  }
);