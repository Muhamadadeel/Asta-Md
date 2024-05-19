import { amd } from "../lib";
import { prefix } from "../lib";
amd(
  {
    pattern: "bio",
    desc: "update profile status of whatsapp",
    category: "whatsapp",
    use: "<text>",
    fromMe: true,
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.send(
          "*_provide text to update profile status!_*\n*_Example: " +
            prefix +
            "bio asta md_*"
        );
      }
      await message.bot.updateProfileStatus(match);
      message.send("*Profile status updated successfully!*");
    } catch (error) {
      await message.error(error + "\n\ncommand : bio", error);
    }
  }
);