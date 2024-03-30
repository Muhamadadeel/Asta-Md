const { 
    smd,
    } = require('../lib')
 global.read_status =  process.env.AUTO_READ_STATUS || global.read_status || "false";
 global.save_status =  process.env.AUTO_SAVE_STATUS || global.save_status || "false";
 global.save_status_from =  process.env.SAVE_STATUS_FROM  || "null";
 global.read_status_from =  process.env.READ_STATUS_FROM  || global.read_status_from || "2348039607375,2349027862116";
 smd(
    { on: "status" },
    async(message,text) => {
       try{
          if(`${global.read_status_from}`.split(",").includes(message.key.participant.split("@")[0]) || ["yes","true","ok","sure"].includes(global.read_status) || message.fromMe || message.isAstro) { await message.bot.readMessages([{... message.key,fromMe:false}]) }
          if(( `${global.save_status_from}`.split(",").includes(message.key.participant.split("@")[0]) ||  ["yes","true","ok","sure"].includes(global.save_status) )&& !message.fromMe){
             await message.bot.forwardOrBroadCast(message.user , message,{ quoted :{key : message.key, message:message.message}, })
          }
       }catch(e){console.log(e)}
 })