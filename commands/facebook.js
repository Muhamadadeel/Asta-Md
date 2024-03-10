const Config = require('../config');
const { tlang, ringtone, cmd,fetchJson, sleep, botpic, getBuffer, pinterest,Config, prefix } = require('../lib')
cmd ( {
    name: 'facebook',
    desc: 'Downloads fb videos.',
    category: 'downloader',
    use: '<add fb url.>',
    async async (Void, citel, text) {
        if (!text || !text.startsWith("https://")) {
            return await citel.reply('*_Please Give me Facebook Video Url_*\n*Example _' + Config.prefix + 'fb https://www.facebook.com/watch/?v=2018727118289093_*');
        }
        try {
            const response = await axios.get(`https://api.maher-zubair.tech/download/fb2?url=${text}`);
            if (response.data.status) {
                const { video, thumbnail, audio } = response.data;
                await citel.sendMessage(citel.chat, { video: { url: video }, caption: Config.caption }, { quoted: citel });
            } else {
                await citel.send('*_Error, Video Not Found_*');
            }
        } catch (error) {
            console.log("error while Fb Downloading : ", error);
            await citel.send('*_Error, Video Not Found_*');
        }
    }
}
)