let {smd , prefix,Config} = require("../lib")

smd({
	pattern: 'unread',  
	fromMe: true,
	desc: 'mark as UnRead',
	type: 'whatsapp'
}, async (message, match) => {

    try{
  let msg = await message.send("🔉",{},"react")
  console.log({msg})
	await message.bot.chatModify(
		{ markRead: false, lastMessages: [message] }, 
    message.jid
    );
    }catch(e){ message.error(`${e}\n\nCommand : markunread` , e, false) }
})
