const Config = require("../config");
let { prefix, smd } = require("../lib");
const astro_patch = require("../lib/plugins");
const events = astro_patch;
astro_patch.smd(
  {
    pattern: "owner",
    desc: "To check ping",
    category: "owner",
    filename: __filename,
  },
  async (message) => {
    try {
      const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${Config.ownername}
ORG:;
TEL;type=CELL;type=VOICE;waid=${global.owner?.split(",")[0]}:+${global.owner?.split(",")[0]}
END:VCARD`;

      const messageOptions = {
        contacts: {
          displayName: Config.ownername,
          contacts: [
            {
              vcard: vcard,
            },
          ],
        },
        contextInfo: {
          externalAdReply: {
            title: Config.ownername,
            body: "Tap Me",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl: `https://wa.me/+${global.owner?.split(",")[0]}?text=Hello+${Config.ownername}`,
          },
        },
      };

      return await message.sendMessage(message.jid, messageOptions, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\nCommand: owner", error);
    }
  },
);
