const bot = require(__dirname + '/lib/asta_patch')
const { VERSION } = require(__dirname + '/config')

const start = async () => {
    Debug.info(`Starting Asta ${VERSION}`)
  try {
    await bot.init()
    //bot.logger.info('⏳ Database syncing!')
    await bot.DATABASE.sync()
    await bot.connect()
  } catch (error) {
    Debug.error(error);
    start();
  }
}
start();
