const bot = require(__dirname + "/lib/runner");
const { VERSION } = require(__dirname + "/config");

const start = async () => {
  Debug.info(`sᴛᴀᴛʀɪɴɢ ᴀsᴛᴀ${VERSION}`);
  try {
    await bot.init();
    bot.logger.info("sʏɴᴄɪɴɢ ᴀsᴛᴀ ᴅʙ");
    await bot.DATABASE.sync();
    await bot.connect();
  } catch (error) {
    Debug.error(error);
    start();
  }
};
start();
