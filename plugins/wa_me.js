const {
    smd
  } = require("../lib");
  const cmd = smd;
  cmd({
    pattern: "wame",
    desc: "Makes wa me for user.",
    category: "user",
    filename: __filename
  }, async _0x12ac1b => {
    try {
      return await _0x12ac1b.reply("https://wa.me/" + _0x12ac1b.sender.split("@")[0]);
    } catch {}
  });