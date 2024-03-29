let {smd , prefix,Config} = require("../lib")

smd({
	pattern: 'pin',
  alias :["pinchat"],
	fromMe: true,
	desc: 'pin a chat',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	await message.bot.chatModify({
		pin: true
	}, message.jid);
	await message.send('_Pined_')
}catch(e){ message.error(`${e}\n\nCommand : chatpin` , e, false) }
})