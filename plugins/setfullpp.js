let mtypes = ["imageMessage"];
let { amd } = require ("../lib");
let { updateProfilePicture } = require ("../lib");
amd(
  {
    pattern: "fullpp",
    desc: "Set full screen profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (photo) => {
    try {
      let match = mtypes.includes(photo.mtype)
        ? photo
        : photo.reply_message;
      if (!match || !mtypes.includes(match?.mtype || "need_Media")) {
        return await photo.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(
        photo,
        photo.user,
        match,
        "fullpp"
      );
    } catch (error) {
      await photo.error(error + "\n\ncommand : fullpp", error);
    }
    {
    }
  }
);