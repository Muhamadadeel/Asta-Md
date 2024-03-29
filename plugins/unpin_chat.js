let {smd , prefix,Config} = require("../lib")

smd({
	pattern: 'unpin',
  alias :["unpinchat","chatunpin"],
	fromMe: true,
	desc: 'unpin a msg',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	await message.bot.chatModify({
		pin: false
	}, message.jid);
	await message.send('_Unpined_')
}catch(e){ message.error(`${e}\n\nCommand : unpin` , e, false) }
})