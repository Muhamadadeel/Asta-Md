const { formatp , formatDate , tlang, botpic,cmd, prefix, runtime,Config , parsedJid ,sleep } = require('../lib')
const axios = require('axios')
const fetch = require('node-fetch');
const speed = require('performance-now')
const API_KEY = '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'
let api_function

      async function getDateTime() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = now.toLocaleTimeString();
        return { date, time };
      }
cmd({
        pattern: "advt",
        alias : ["advertisement"],
        category: "Advertisements",
        desc: "Advertise of your Message, by sending it to provided nmbr range.",
        use: '9231844741xx,Your_text_here',
        filename: __filename,
  },
  async(Void, citel, text , { isCreator }) => {
    
    if (!isCreator) {
      return citel.reply(tlang().owner);
    }
    if (!text) {
      return await citel.reply("*Advertise of your Message*\n*by sending it to provided nmbr range.*\n" + prefix + "advt 9231844741xx,Your_text_here");
    }
    const commaIndex = text.indexOf(",");
    if (commaIndex === -1) {
      return await citel.send("*Invalid format. Please provide number and Message separated by a comma.*");
    }
    let inputnumber = "" + text.slice(0, commaIndex).trim();
    let msg = text.slice(commaIndex + 1).trim() + "\n\n\n" + Config.caption;
    if (!inputnumber.includes("x")) {
      return citel.send("*You did not add x in number.*\n*Ex: " + prefix + "advt 9231844741xx,Your_Message_here*  \n " + Config.caption);
    }
    await citel.send("*Sending message to given number range.!*\n*It may take some time, so wait please*\n\n" + Config.caption);
    function countInstances(_0x7c80f4, _0x1b4edc) {
      return _0x7c80f4.split(_0x1b4edc).length - 1;
    }
    var number0 = inputnumber.split("x")[0];
    var number1 = inputnumber.split("x")[countInstances(inputnumber, "x")] ? inputnumber.split("x")[countInstances(inputnumber, "x")] : "";
    var random_length = countInstances(inputnumber, "x");
    var randomxx;
    if (random_length == 1) {
      randomxx = 10;
    } else if (random_length == 2) {
      randomxx = 100;
    } else if (random_length == 3) {
      randomxx = 1000;
    } else if (random_length > 3) {
      return await citel.send("*Only 3(x) are Allowed in number*");
    }
    let count = 0;
    let sents = "";
    var last_user = "";
    for (let i = 0; i < randomxx; i++) {
      var anu = await Void.onWhatsApp("" + number0 + i + number1 + "@s.whatsapp.net");
      if (anu[0]) {
        last_user = anu[0].jid;
        if (sents.includes(last_user)) {
          continue;
        }
        await sleep(1500);
        await Void.sendMessage(last_user, {
          text: msg
        });
        sents = sents + "," + last_user;
        count += 1;
      }
    }
    return await citel.send("*_Advertisement of your Message is Done,_*\n\n*_Message Succesfully sent to " + count + " chats_*\n\tLast_User: " + last_user.split("@")[0] + "\n\tSearch_No: " + randomxx + " number seached\n\n\n" + Config.caption);
  
})




////=======================================================
const sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg = {}
let isAnnonyMsgAlive = '';
let cmdName = 'rcg';



class AnonymousMsg {
  constructor() {
    this.id = "";
    this.sender = "";
    this.reciever = "";
    this.senderMsg = "";
    this.tellinfo = 0;
    this.howmanyreply = 0;
  }
}
cmd({
  pattern: "anonymsg",
  alias: ["recognition", "anonymous", "anonychat"],
  desc: "send message to a number through bot number anonimously",
  category: "AI",
  use: "<Hii, Suhail Tech Info>",
  filename: __filename
}, async (_0x3f3bd3, _0x53872c, _0x3a968f, {
  cmdName: _0x4f405,
  isCreator: _0x32056c
}) => {
  if (!_0x3a968f) {
    return await _0x53872c.reply("*provide number with msg to send Anonymously.* \n*Example " + (prefix + _0x4f405) + " 2348039607375,your_Message*");
  }
  if (_0x32056c && _0x3a968f === "info") {
    return await _0x53872c.reply(isAnnonyMsgAlive == "" ? "*Theres no Anonymous Chat created yet*" : "*Anonymous Chat Recivers*\n_" + isAnnonyMsgAlive + "_");
  }
  const _0x21b6ef = _0x3a968f.indexOf(",");
  if (_0x21b6ef === -1) {
    return await _0x53872c.reply("*Invalid format. Please provide both number and Message separated by a comma.*");
  }
  let _0x1ebb12 = _0x3a968f.slice(0, _0x21b6ef).trim() + "@s.whatsapp.net";
  let _0x41b958 = _0x3a968f.slice(_0x21b6ef + 1).trim();
  let _0x1b5497 = await parsedJid(_0x1ebb12);
  if (_0x1b5497[0]) {
    if (_0x1b5497[0] === _0x53872c.sender) {
      return await _0x53872c.reply("*Provide another number instead of yours, Idiot*");
    }
    const {
      date: _0x2faccb,
      time: _0x4c9c08
    } = await getDateTime();
    const _0x3fc014 = "anony-msg-" + Math.floor(100000 + Math.random() * 900000);
    sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3fc014] = new AnonymousMsg();
    let _0x4a7cbd = sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3fc014];
    _0x4a7cbd.id = _0x3fc014;
    _0x4a7cbd.sender = _0x53872c.sender;
    _0x4a7cbd.reciever = _0x1b5497[0];
    _0x4a7cbd.msgStatus = true;
    _0x4a7cbd.senderMsg = _0x53872c;
    _0x41b958 = "*sᴜʜᴀɪʟ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ*\n        \n*Msg_Id:* " + _0x4a7cbd.id + "\n*Date:* _" + _0x2faccb + "_\n*Time:* _" + _0x4c9c08 + "_\n\n*Message:* " + _0x41b958 + "\n\n\n" + Config.caption;
    isAnnonyMsgAlive = isAnnonyMsgAlive + "," + _0x4a7cbd.reciever;
    await _0x3f3bd3.sendMessage(_0x4a7cbd.reciever, {
      text: _0x41b958
    });
    return await _0x53872c.reply("*_Anonymous message sent succesfully_*");
  } else {
    return await _0x53872c.reply("_Provided number is not valid, please give in format_");
  }
});
cmd({
  on: "text"
}, async (_0x26c792, _0x4e9817, _0x4c2c89) => {
  if (_0x4e9817.quoted && isAnnonyMsgAlive.includes(_0x4e9817.sender) && _0x4e9817.text.length > 2) {
    const _0x2c63ae = _0x4e9817.quoted.text.split("\n");
    if (_0x2c63ae.length < 3) {
      return;
    }
    if (_0x4e9817.quoted.text.includes("sᴜʜᴀɪʟ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x2c63ae[0].includes("sᴜʜᴀɪʟ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x2c63ae[2].includes("Msg_Id")) {
      let _0x4ec172 = "" + _0x2c63ae[2].replace("*Msg_Id:* ", "").trim();
      let _0xf03dfb = sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x4ec172];
      if (!_0xf03dfb) {
        return;
      }
      try {
        if (_0xf03dfb) {
          let _0x4d7eeb = _0x4e9817.text.split(",")[0].trim();
          if (_0x4d7eeb.toLowerCase().startsWith("reply")) {
            _0xf03dfb.howmanyreply += 1;
            const _0x13c455 = _0x4e9817.text.indexOf(",");
            let _0x76f73d = "*sᴜʜᴀɪʟ-ᴍᴅ • ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @" + _0xf03dfb.reciever.split("@")[0] + "_*\n*_Msg_Id: " + _0xf03dfb.id + "_*\n\n*Message:* " + _0x4e9817.text.slice(_0x13c455 + 1).trim() + "\n\n\n\n" + Config.caption;
            if (_0xf03dfb.howmanyreply >= 2) {
              isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + _0x4e9817.sender, "");
            }
            await _0x26c792.sendMessage(_0xf03dfb.sender, {
              text: _0x76f73d,
              mentions: [_0xf03dfb.reciever]
            }, {
              quoted: _0xf03dfb.senderMsg
            });
            if (_0xf03dfb.howmanyreply >= 2) {
              isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + _0x4e9817.sender, "");
              delete sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x4ec172];
            }
            return await _0x4e9817.reply("*_Your Message succesfully deliver to User_* " + (_0xf03dfb.howmanyreply == 1 ? "\n*you can reply 1 more time*" : "") + " ");
          } else if (_0xf03dfb.tellinfo === 0) {
            _0xf03dfb.tellinfo = 1;
            let _0x4175f0 = "*Basically, Its an Annonymous Message*\n\n_Msg_Id: " + _0xf03dfb.id + "_\n_Sended by '" + tlang().title + "' public Whatsapp bot_\n_User not wants to expose itself to send that msg_\n  \n  \n*if you wanna reply to that user,*\n*Send msg by replying to above message*\n*Type like:* reply, Type_your_Message_Here\n*Example:* reply, Can you text me from your number\n  \n  \n  " + Config.caption;
            return await _0x26c792.sendMessage(_0xf03dfb.reciever, {
              text: _0x4175f0
            }, {
              quoted: _0x4e9817
            });
          } else if (_0xf03dfb.tellinfo === 1) {
            _0xf03dfb.tellinfo = 2;
            return _0x4e9817.reply("*Please follow the format if reply to msg*\n*Type like: _reply, Type_your_Message_Here_*");
          } else {
            return;
          }
        }
      } catch (_0x1ecb74) {
        console.log("error : ", _0x1ecb74);
      }
    }
  }
});

//                  AI  CHAT  COMMAND

cmd({
        pattern: "chat",
        desc: "chat with an AI",
        category: "AI",
        use: '<Hii, Suhail Tech Info>',
        filename: __filename,
    },
    async(Void, citel,text) => 
    {
            let {data} = await axios.get(`http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[${citel.sender.split("@")[0]}]&msg=[${text}]`);
            return citel.reply(data.cnt);
    }
)



cmd({
        pattern: "gpt",
        desc: "chat with an AI",
        category: "AI",
        use: '<Hii, Suhail Tech Info>',
        filename: __filename,
    },
    async(Void, citel,text) => 
    {
  if (!Config.OPENAI_API_KEY || Config.OPENAI_API_KEY=='' ||  !Config.OPENAI_API_KEY.startsWith('sk') ) return citel.reply('You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var  ')
  if (!text) return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`); 
	
const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Specify the desired model here
      messages: [{ role: "system", content: "You" }, { role: "user", content: text }],
    }),
  });

  const data = await response.json();
  //console.log("GPT REPONCE : ",data); 
  if (!data.choices || data.choices.length === 0) {citel.reply("*Invalid ChatGPT API Key, Please Put New Key*"); }
  return await  citel.reply(data.choices[0].message.content)
    }
)



cmd({
        pattern: "dalle",
	alias : ['dall','dall-e'],
        desc: "chat with an AI",
        category: "AI",
        use: '<Hii, Suhail Tech Info>',
        filename: __filename,
    },
    async(Void, citel,text) => 
    {
      function _0x59a8(){const _0x1d63b7=['26881RiBTzD','POST','9FEXiSq','url','786249lJnBYr','Bearer\x20','5986580TDkKVm','783582jHPgfy','json','chat','reply','https://api.openai.com/v1/images/generations','70580pKHfkI','application/json','19518LWDQXM','caption','108QGlYIu','data','512x512','147IgJvgn','OPENAI_API_KEY','stringify','1565864LubHcG'];_0x59a8=function(){return _0x1d63b7;};return _0x59a8();}function _0x30d9(_0x4c83f1,_0x5f57db){const _0x59a899=_0x59a8();return _0x30d9=function(_0x30d9f4,_0x41b649){_0x30d9f4=_0x30d9f4-0x18a;let _0x361331=_0x59a899[_0x30d9f4];return _0x361331;},_0x30d9(_0x4c83f1,_0x5f57db);}const _0x4eaba9=_0x30d9;(function(_0x337e7f,_0x46f7cb){const _0x2fd393=_0x30d9,_0x37b782=_0x337e7f();while(!![]){try{const _0x2a2bb3=parseInt(_0x2fd393(0x190))/0x1+parseInt(_0x2fd393(0x197))/0x2+-parseInt(_0x2fd393(0x194))/0x3+parseInt(_0x2fd393(0x1a0))/0x4*(-parseInt(_0x2fd393(0x19c))/0x5)+parseInt(_0x2fd393(0x19e))/0x6*(parseInt(_0x2fd393(0x18c))/0x7)+-parseInt(_0x2fd393(0x18f))/0x8*(parseInt(_0x2fd393(0x192))/0x9)+parseInt(_0x2fd393(0x196))/0xa;if(_0x2a2bb3===_0x46f7cb)break;else _0x37b782['push'](_0x37b782['shift']());}catch(_0x120f23){_0x37b782['push'](_0x37b782['shift']());}}}(_0x59a8,0x3c3a7));if(Config[_0x4eaba9(0x18d)]=='')return citel['reply']('You\x20Dont\x20Have\x20OPENAI_API_KEY\x20\x0aPlease\x20Create\x20OPEN\x20API\x20KEY\x20from\x20Given\x20Link\x20\x0ahttps://platform.openai.com/account/api-keys');if(!text)return citel[_0x4eaba9(0x19a)]('*Give\x20Me\x20A\x20Query\x20To\x20Get\x20Dall-E\x20Reponce\x20?*');const OPENAI_API_KEY=Config[_0x4eaba9(0x18d)],imageSize=_0x4eaba9(0x18b),apiUrl=_0x4eaba9(0x19b),response=await fetch(apiUrl,{'method':_0x4eaba9(0x191),'headers':{'Content-Type':_0x4eaba9(0x19d),'Authorization':_0x4eaba9(0x195)+OPENAI_API_KEY},'body':JSON[_0x4eaba9(0x18e)]({'model':'image-alpha-001','prompt':text,'size':imageSize,'response_format':_0x4eaba9(0x193)})}),data=await response[_0x4eaba9(0x198)]();let buttonMessage={'image':{'url':data[_0x4eaba9(0x18a)][0x0][_0x4eaba9(0x193)]},'caption':'*---Your\x20DALL-E\x20Result---*\x0a'+Config[_0x4eaba9(0x19f)]};Void['sendMessage'](citel[_0x4eaba9(0x199)],{'image':{'url':data['data'][0x0][_0x4eaba9(0x193)]}});
    }
)



//                  RREPOSITORY  COMMAND

cmd({
        pattern: "repo",
        alias: ["git", "sc", "script"],
        desc: "Sends info about repo",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        let { data } = await axios.get('https://api.github.com/repos/SuhailTechInfo/Secktor-bot')
        let cap = `
*⭐ Total Stars:* ${data.stargazers_count} stars
*🍽️ Forks:* ${data.forks_count} forks
*🍁 Repo:* _https://github.com/SuhailTechInfo/Secktor-bot_
*🧩 Scan:* _https://replit.com/@SuhailTechInfo/Secktor-Bot_
\n*Visit For Tutorial :-*
 _https://www.Youtube.com/c/SuhailTechInfo_
\n\n${Config.caption}`
	
        let buttonMessaged = {   image: { url: await botpic() },    caption: cap,  };   
        return await Void.sendMessage(citel.chat, buttonMessaged, {   quoted: citel, });
  });


cmd({
        pattern: "link",
        alias: ["ytube", "yt", "myyt"],
        desc: "Sends info about My Ytube Channel __CheckOut :_ www.Youtube.com/c/SuhailTechInfo",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
       
	let cap = `
╔══════════════════════════╗
  ☞𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐂𝐇𝐀𝐍𝐍𝐄𝐋☜
╚══════════════════════════╝\n
*⭐ Youtube Content :* How To Create Whatsapp Bot
*🍽️ Total Subscriber:* 36 Subscribers
*🍁 Channel Link:* _https://youtube.com/suhailtechinfo?sub_confirmation=1_\n
╭━━━━━━━━━━━━━━━━━━━━╮
┇  ╔═╦╗╔╦╗╔═╦═╦╦╦╦╗╔═╗
┇  ║╚╣║║║╚╣╚╣╔╣╔╣║╚╣═╣
┇  ╠╗║╚╝║║╠╗║╚╣║║║║║═╣
┇  ╚═╩══╩═╩═╩═╩╝╚╩═╩═╝
╰━━━━━━━━━━━━━━━━━━━━╯
𝐏𝐋𝐄𝐀𝐒𝐄 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐌𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐂𝐇𝐀𝐍𝐍𝐄𝐋*`
	
	
        let buttonMessaged = 
            {
            image: { url: await botpic() },
            caption: cap,
            footer: tlang().footer,
            headerType: 4
            };
           
        return await Void.sendMessage(citel.chat, buttonMessaged, {   quoted: citel, });

    }
)


//                  BOT STATUS COMMAND

cmd({
        pattern: "status",
        alias: ["about" , "info"],
        desc: "To check bot status",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
 
 
        const uptime = process.uptime();
        timestampe = speed();
        latensie = speed() - timestampe;
        let ter = `
🔰 *${tlang().title}* 🔰

*🌟Description:* A WhatsApp bot with rich features, Created By *Suhail Tech Info*.\n
*⚡Speed:* ${latensie.toFixed(4)} ms
*🚦Uptime:* ${runtime(process.uptime())}
*🕸Version:* 1.0.0
*👤Owner:*  ${Config.ownername}\n\n
*Powered by 'Suhail Tech Info'*
*Youtube :* _youtube.com/c/SuhailTechInfo_
\n\n${Config.caption}`;
        let buttonMessaged = {
            image: { url: await botpic() },
            caption: ter,
            footer: tlang().footer,
            headerType: 4
            
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)
//========================================================================

cmd({
  pattern: "cpu",
  desc: "To check bot status",
  category: "general",
  filename: __filename,
},
async(Void, citel) => {
  const os = require('os')
  const speed = require('performance-now')
      const used = process.memoryUsage()
      const cpus = os.cpus().map(cpu => {
          cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
          return cpu
      })
      const cpu = cpus.reduce((last, cpu, _, { length }) => 
      {
          last.total += cpu.total
          last.speed += cpu.speed / length
          last.times.user += cpu.times.user
          last.times.nice += cpu.times.nice
          last.times.sys += cpu.times.sys
          last.times.idle += cpu.times.idle
          last.times.irq += cpu.times.irq
          return last
      },{ speed: 0,total: 0,times: {user: 0,nice: 0,sys: 0,idle: 0,irq: 0 } }
      )
    let timestamp = speed()
    let latensi = speed() - timestamp
    neww = performance.now()
    oldd = performance.now()
                  
    respon = `
  Response Speed ${latensi.toFixed(1)}Sec / ${(oldd - neww).toFixed(1)}ms
  Runtime : ${runtime(process.uptime())}`
  

  let resp2 = `💻 Info Server
  RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
  
  NodeJS Memory Usaage
  ${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
  
  ${cpus[0] ? `Total CPU Usage
  ${cpus[0].model.trim()} (${cpu.speed} MHZ)
  ${Object.keys(cpu.times).map(type => `- ${(type + '').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
  CPU Core(s) Usage (${cpus.length} Core CPU)
  ${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)
  ${Object.keys(cpu.times).map(type => `- ${(type + '').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
      `.trim()

      return await citel.reply(respon+resp2 )
})
 