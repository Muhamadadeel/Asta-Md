let { smd, prefix, Config } = require("../lib");

smd(
  {
    pattern: "wasettings",
    fromMe: true,
    desc: "get your privacy settings",
    type: "whatsapp settings",
  },
  async (message, match) => {
    const { readreceipts, profile, status, online, last, groupadd, calladd } =
      await message.bot.fetchPrivacySettings(true);
    const msg = `*ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ sᴇᴛᴛɪɴɢs*

*ɴᴀᴍᴇ:* ${(message.fromMe && message.pushName
      ? message.pushName
      : message.bot.user.name
    )
      .split("\n")
      .join("  ")}
*ɴᴜᴍʙᴇʀ:* ${message.user.split("@")[0]}
*ᴏɴʟɪɴᴇ:* ${online}
*ᴘʀᴏғɪʟᴇ:* ${profile}
*ʟᴀsᴛ sᴇᴇɴ:* ${last}
*sᴛᴀᴛᴜs:* ${status}
*ʀᴇᴀᴅ ʀᴇᴄᴇɪᴘᴛ:* ${readreceipts}
*ᴡʜᴏ ᴄᴀɴ ᴀᴅᴅ ʏᴏᴜ ᴛᴏ ɢʀᴏᴜᴘ:* ${groupadd}
*ᴡʜᴏ ᴄᴀɴ ᴄᴀʟʟ ʏᴏᴜ:* ${calladd}`;
    let img = await message.getpp(message.user);
    await message.send(
      img,
      {
        caption: msg,
      },
      "img"
    );
  }
);
