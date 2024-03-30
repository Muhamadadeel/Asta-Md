const { smd, Config } = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "repo",
    alias: ["git", "sc", "script"],
    desc: "Sends info about repo",
    category: "tools",
    filename: __filename,
  },
  async (_0x45da98) => {
    try {
      let { data: _0x44f98c } = await axios.get(
        "https://api.github.com/repos/Astropeda/Asta-Md"
      );
      let _0x1c73f9 = (
        "\nA Simpled WhatsAppp Bot Made by Astro to give you easy whatsapp use. *" +
        Config.ownername +
        "*. \n  *❲❒❳ Stars:* " +
        (_0x44f98c?.stargazers_count || "120+") +
        " stars\n  *❲❒❳ Forks:* " +
        (_0x44f98c?.forks_count || "1000+") +
        " forks\n  *❲❒❳ Auther:* Astropeda" +
        (Config.caption ? "\n\n" + Config.caption : "")
      ).trim();
      return await _0x45da98.sendUi(_0x45da98.jid, {
        caption: _0x1c73f9,
      });
    } catch (_0x5816fe) {
      await _0x45da98.error(_0x5816fe + "\n\ncommand: repo", _0x5816fe);
    }
  }
);
