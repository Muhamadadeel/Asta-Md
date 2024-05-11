const bot = require(__dirname + '/lib/amd')

const start = async () => {
  try {
    await bot.init()
    await bot.DATABASE.sync()
    await bot.connect()
  } catch (error) {
    Debug.error(error);
    start();
  }
}
start();
