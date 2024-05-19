let mtypes = ["imageMessage"];
import { amd } from "../lib";
import { updateProfilePicture } from "../lib";
amd(
  {
    pattern: "setpp",
    desc: "Set profile picture",
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
        "pp"
      );
    } catch (error) {
      await photo.error(error + "\n\ncommand : pp", error);
    }
  }
);