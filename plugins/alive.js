const {
    smd,
    botpic,
    send,
    Config,
    tlang,
    sleep,
    smdBuffer,
    prefix,
    bot_
  } = require("../lib");

var surl = 'https://github.com/Astropeda/whatsapp-bot'
const number = '2348039607375'
var name = 'ᴀꜱᴛʀᴏᴘᴇᴅᴀ'
var body = 'ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ'
var image = 'https://i.imgur.com/dMwGOUP.jpeg'
let text = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══
│       「 ᴀꜱᴛᴀ ᴍᴅ 2024 」
│ Name         : ᴀꜱᴛʀᴏᴘᴇᴅᴀ
│ Creator      : ᴀꜱᴛʀᴏ
│ Organisation : ɴᴏᴅᴇ ᴊꜱ ᴛᴇᴀᴍ
│ GitHub       : github.com/Astropeda
│ Phone        : wa.me/2348039607375
╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══`
 smd({
             pattern: "alive",
             desc: "Show intro of user",
             category: "tools",
             filename: __filename,
             use: '<group link.>',
         },
         async(message) => {
    try{
          let media ;try{ media = await smdBuffer(image) }catch{media = log0}
           const q =await message.bot.fakeMessage("contact",{},name) 
           let contextInfo = {...(await message.bot.contextInfo(name,body,media,1,surl, 2) )}
           await message.send(text, {contextInfo : contextInfo },"astro",  q )
    }catch(e){ await message.error(`${e}\n\ncommand: intro`,e,false)}


 })