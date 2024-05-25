const bot = require(__dirname + '/lib/amd');

const start = async () => {
  try {
    await bot.init();
    await bot.DATABASE.sync();
    await bot.connect();
    console.log('Bot started successfully!');
  } catch (error) {
    console.error('Error starting bot:', error);
    setTimeout(() => {
      console.log('Attempting to restart bot...');
      start();
    }, 5000);
  }
};

start();