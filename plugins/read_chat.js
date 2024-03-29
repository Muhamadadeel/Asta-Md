let {smd , prefix,Config} = require("../lib")

smd({
	pattern: 'read',
	fromMe: true,
	desc: 'mark as readed',
	type: 'whatsapp'
}, async (message, match) => {

    try{
  let msg = await message.react("🔉")
	await message.bot.chatModify(
		{ markRead: true, lastMessages: [message] }, 
    message.jid
    );
    }catch(e){ message.error(`${e}\n\nCommand : markread` , e, false) }
})
