const fs = require("fs");
const Config = require("../config");
let {
  prefix,
} = require("../lib");
const astro_patch = require("../lib/plugins");

astro_patch.smd(
  {
    pattern: "owner",
    desc: "To check ping",
    category: "owner",
    filename: __filename,
  },
  async (_0x563719) => {
    try {
      const _0x389599 =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        Config.ownername +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        global.owner?.split(",")[0] +
        ":+" +
        global.owner?.split(",")[0] +
        "\nEND:VCARD";
      let _0x140248 = {
        contacts: {
          displayName: Config.ownername,
          contacts: [
            {
              vcard: _0x389599,
            },
          ],
        },
        contextInfo: {
          externalAdReply: {
            title: Config.ownername,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl:
              "https://wa.me/+" +
              global.owner?.split(",")[0] +
              "?text=Hii+" +
              Config.ownername,
          },
        },
      };
      return await _0x563719.sendMessage(_0x563719.jid, _0x140248, {
        quoted: _0x563719,
      });
    } catch (_0x26ce8b) {
      await _0x563719.error(_0x26ce8b + "\nCommand:owner", _0x26ce8b);
    }
  }
);