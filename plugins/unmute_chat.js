let {smd , prefix,Config} = require("../lib")
smd({
	pattern: 'unmute',
	fromMe: true,
	desc: 'unmute a chat',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	await message.bot.chatModify( { mute: null }, message.jid );
	await message.send('_Chat Unmuted!_')
}catch(e){ message.error(`${e}\n\nCommand : unmutechat` , e, false) }

})