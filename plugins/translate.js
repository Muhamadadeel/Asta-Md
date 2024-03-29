const os = require("os");
const fs = require("fs");
const Config = require("../config");
let { prefix, smd } = require("../lib");
const astro_patch = require("../lib/plugins");
const events = astro_patch;
const translatte = require("translatte");
astro_patch.smd(
  {
    pattern: "trt",
    alias: ["translate"],
    category: "tools",
    filename: __filename,
    use: "< text >",
    desc: "Translate's given text in desired language.",
  },
  async (message, input) => {
    try {
      let language = input ? input.split(" ")[0].toLowerCase() : "en";
      let text = !message.reply_text
        ? input.replace(language, "")?.trim() || false
        : message.reply_text;

      if (!text) {
        return await message.reply(
          `*Please Give Me Text. Example: _${prefix}trt en Who are you_*`,
        );
      }
      const translation = await translatte(text, {
        from: "auto",
        to: language,
      });

      if ("text" in translation) {
        return await message.reply(translation.text);
      }
    } catch (error) {
      await message.error(error + "\n\ncommand trt", error);
    }
  },
);
