import { amd } from "../lib";
amd(
  {
    pattern: "rpp",
    desc: "remove profile picture",
    category: "whatsapp",
    use: "<chat>",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    try {
      await message.removepp();
      message.send("*_Profile picture removed successfully!_*");
    } catch (error) {
      await message.error(error + "\n\ncommand : rpp", error);
    }
  }
);
