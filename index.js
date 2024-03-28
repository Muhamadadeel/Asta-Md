const bot = require(__dirname + '/lib/runner')
const { VERSION } = require(__dirname + '/config')

const start = async () => {
    Debug.info(`𝘼𝙨𝙩𝙖... ${VERSION}`)
  try {
    await bot.init()
    bot.logger.info('𝙎𝙩𝙖𝙧𝙩𝙞𝙣𝙜 𝘼𝙨𝙩𝙖...')
    await bot.DATABASE.sync()
    await bot.connect()
  } catch (error) {
    Debug.error(error);
    start();
  }
}
start();
