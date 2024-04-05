const fs = require('fs');
const path = require('path');
const pluginsPath = path.join(__dirname,'plugins.js');
let pluginsCode;
try {
    pluginsCode = fs.readFileSync(pluginsPath, 'utf8');
} catch (error) {
    console.error('Error reading plugins file:', error);
    process.exit(1);
}
eval(pluginsCode);

const bot = require(__dirname + '/lib/astro');
const { VERSION } = require(__dirname + '/config');

const start = async () => {
    Debug.info(`Asta ${VERSION}`);
    try {
        await bot.init();
        bot.logger.info('ꜱᴛᴀʀᴛɪɴɢ ᴀᴘᴘ');
        await bot.DATABASE.sync();
        await bot.connect();
    } catch (error) {
        Debug.error(error);
        start();
    }
};
start();
