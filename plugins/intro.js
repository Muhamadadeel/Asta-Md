const { smd, Config,smdBuffer,  prefix } = require('../lib')


var surl = 'https://github.com/SuhailTechInfo/Secktor-bot' // Source URL
const number = '2348039607375'
var name = ' Suhail Tech'
var body = '𝑇𝛩𝑈𝐶𝛨 𝛨𝛯𝑅𝛯'
var image = 'https://telegra.ph/file/1e60489705c851f74b55e.jpg'
let text = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
│       「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
│ Name      : sυнαɪʟ ᴛᴇᴄʜ ɪиғօ
│ Place       : ʟαнᴏʀᴇ ᴘᴋ
│ Gender    :  ᴍᴀʟᴇ
│ Age          : 22_
│ Phone     : wa.me/2348039607375
│ Youtube   : Youtube.com/c/SuhailTechInfo
│ Status     : ɢᴀᴍᴇ ᴅᴇᴠᴇʟᴏᴘᴇʀ
╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄`



 //---------------------------------------------------------------------------
 smd({
             pattern: "intro",
             desc: "Show intro of user",
             category: "fun",
             filename: __filename,
             use: '<group link.>',
         },
         async(message) => {
    try{
          let media ;try{ media = await smdBuffer(image) }catch{media = log0}
           const q =await message.bot.fakeMessage("contact",{},name) 
           let contextInfo = {...(await message.bot.contextInfo(name,body,media,1,surl, 2) )}
           await message.send(text, {contextInfo : contextInfo },"suhail",  q )
    }catch(e){ await message.error(`${e}\n\ncommand: intro`,e,false)}


 })