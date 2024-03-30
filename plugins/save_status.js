const { 
    smd,
    } = require('../lib')
 
 smd(
    {  pattern: "save",
       alias : ["ssaver"],         
       desc: "Save whatsapp status",
       category: "whatsapp settings",         
       filename: __filename,
       use:"< status >",
    },
    async(message) => {
       try{
          let mm = message.reply_message && message.reply_message.status? message.reply_message : false;
          if(mm ){ message.bot.forwardOrBroadCast(message.user, mm, { quoted :{key : mm.key, message:mm.message} })  } 
          else message.send("*reply to whatsapp status*")
       }catch(e){await message.error(`${e}\n\ncommand : #(Status Saver)`, e ,false )}
 })
 const regexSend = new RegExp(`\\b(?:${["send", "share", "snd", "give","save", "sendme","forward"].join('|')})\\b`, 'i');
smd(
   { on: "quoted"  },
   async(message,text) => {
      try{
         let mm =  message.reply_message.status? message.reply_message : false;
         if(mm && regexSend.test(text.toLowerCase()) ){
            message.bot.forwardOrBroadCast(message.fromMe? message.user : message.from, mm,{ quoted :{key : mm.key, message:mm.message} })
         }
      }catch(e){console.log(e)}
})