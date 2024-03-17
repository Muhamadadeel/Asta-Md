/**

//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                ＷＨＡＴＳＡＰＰ ＢＯＴ－ＭＤ ＢＥＴＡ                                   //
//                                                                                                      // 
//                                         Ｖ：１．０．１                                                // 
//                                                                                                      // 
//            ███████╗██╗   ██╗██╗  ██╗ █████╗ ██╗██╗         ███╗   ███╗██████╗                        //
//            ██╔════╝██║   ██║██║  ██║██╔══██╗██║██║         ████╗ ████║██╔══██╗                       //
//            ███████╗██║   ██║███████║███████║██║██║         ██╔████╔██║██║  ██║                       //
//            ╚════██║██║   ██║██╔══██║██╔══██║██║██║         ██║╚██╔╝██║██║  ██║                       //
//            ███████║╚██████╔╝██║  ██║██║  ██║██║███████╗    ██║ ╚═╝ ██║██████╔╝                       //
//            ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝╚═════╝                        //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//

CURRENTLY RUNNING ON BETA VERSION!!
*
   * @project_name : Suhail-Md
   * @author : Suhail Tech Info
   * @youtube : https://www.youtube.com/c/@SuhailTechInfo
   * @description : Suhail-Md ,A Multi-functional whatsapp user bot.
   * @version 1.0.9
*
   * Licensed under the  GPL-3.0 License;
* 
   * ┌┤Created By Suhail Tech Info.
   * © 2023 Suhail-Md ✭ ⛥.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
**/

 



const { formatp , formatDate ,TelegraPh, tlang, botpic,smd, prefix, runtime,Config , parsedJid ,sleep } = require('../lib')
const axios = require('axios')
const fetch = require('node-fetch');
 const os = require('os')
const speed = require('performance-now')
const API_KEY = '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'



function _0x2a0d(_0xb8a708,_0x40022f){const _0x29539c=_0x2953();return _0x2a0d=function(_0x2a0dcd,_0x42bea3){_0x2a0dcd=_0x2a0dcd-0xe9;let _0x4d503c=_0x29539c[_0x2a0dcd];return _0x4d503c;},_0x2a0d(_0xb8a708,_0x40022f);}function _0x2953(){const _0x4abe21=['json','choices','2KTKIiW','application/json','chat','http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[','4017447FwUKbt','2673069xtYnEg','REMOVE_BG_KEY','Bearer\x20','image-alpha-001','320668Kzvhym','data','then','message','1548910BYiCAA','error\x20in\x20aiResponce\x20:\x20','119490ILpvcx','system','sender','binary','from','log','dalle','https://api.remove.bg/v1.0/removebg','567277OBjzQH','length','get','POST','stringify','content','512x512','78qmNvDj','https://api.openai.com/v1/images/generations','Error\x20While\x20getting\x20Ai\x20responce\x20','url','catch',']&msg=[','split','8yTiNwA','You','gpt','1769427SEqioY'];_0x2953=function(){return _0x4abe21;};return _0x2953();}(function(_0x11b169,_0x1b2428){const _0x20c50b=_0x2a0d,_0x188d24=_0x11b169();while(!![]){try{const _0x8cceb3=parseInt(_0x20c50b(0x108))/0x1*(-parseInt(_0x20c50b(0xf1))/0x2)+parseInt(_0x20c50b(0xee))/0x3+-parseInt(_0x20c50b(0xfa))/0x4+-parseInt(_0x20c50b(0x100))/0x5*(parseInt(_0x20c50b(0x10f))/0x6)+parseInt(_0x20c50b(0xf6))/0x7*(parseInt(_0x20c50b(0xeb))/0x8)+parseInt(_0x20c50b(0xf5))/0x9+-parseInt(_0x20c50b(0xfe))/0xa;if(_0x8cceb3===_0x1b2428)break;else _0x188d24['push'](_0x188d24['shift']());}catch(_0x92d230){_0x188d24['push'](_0x188d24['shift']());}}}(_0x2953,0x4a79a));async function aiResponce(_0x39b0f3,_0x2d2abd,_0x1fd6f6=''){const _0x4f067f=_0x2a0d;let _0x592464='';try{if(_0x2d2abd===_0x4f067f(0xf3))_0x592464=await(await axios[_0x4f067f(0x10a)](_0x4f067f(0xf4)+_0x39b0f3[_0x4f067f(0x102)][_0x4f067f(0xea)]('@')[0x0]+_0x4f067f(0xe9)+_0x1fd6f6+']'))[_0x4f067f(0xfb)]['cnt'];else{if(_0x2d2abd===_0x4f067f(0xed)){const _0x26bb25=await fetch('https://api.openai.com/v1/chat/completions',{'method':'POST','headers':{'Content-Type':'application/json','Authorization':_0x4f067f(0xf8)+Config['OPENAI_API_KEY']},'body':JSON[_0x4f067f(0x10c)]({'model':'gpt-3.5-turbo','messages':[{'role':_0x4f067f(0x101),'content':_0x4f067f(0xec)},{'role':'user','content':_0x1fd6f6}]})}),_0x100221=await _0x26bb25[_0x4f067f(0xef)]();!_0x100221[_0x4f067f(0xf0)]||_0x100221[_0x4f067f(0xf0)][_0x4f067f(0x109)]===0x0?_0x592464="*Invalid ChatGPT API Key, Please Put New Key*":_0x592464=_0x100221[_0x4f067f(0xf0)][0x0][_0x4f067f(0xfd)][_0x4f067f(0x10d)];}else{if(_0x2d2abd===_0x4f067f(0x106)){const _0x6aca75=await fetch(_0x4f067f(0x110),{'method':_0x4f067f(0x10b),'headers':{'Content-Type':_0x4f067f(0xf2),'Authorization':_0x4f067f(0xf8)+Config['OPENAI_API_KEY']},'body':JSON[_0x4f067f(0x10c)]({'model':_0x4f067f(0xf9),'prompt':_0x1fd6f6,'size':_0x4f067f(0x10e),'response_format':_0x4f067f(0x112)})}),_0x41b76b=await _0x6aca75[_0x4f067f(0xef)]();_0x592464=_0x41b76b[_0x4f067f(0xfb)][0x0][_0x4f067f(0x112)];}}}if(_0x2d2abd==='rmbg'){const _0x2e22b4={'image_url':_0x1fd6f6,'size':'auto'};axios['post'](_0x4f067f(0x107),_0x2e22b4,{'headers':{'X-Api-Key':Config[_0x4f067f(0xf7)]},'responseType':'arraybuffer'})[_0x4f067f(0xfc)](_0x400eb6=>{const _0xa7c556=_0x4f067f;_0x592464=Buffer[_0xa7c556(0x104)](_0x400eb6[_0xa7c556(0xfb)],_0xa7c556(0x103));})[_0x4f067f(0x113)](_0xc7f000=>{_0x592464=![];});}return _0x592464;}catch(_0x2c7ef6){return console[_0x4f067f(0x105)](_0x4f067f(0xff),_0x2c7ef6),_0x4f067f(0x111);}};/*fgpt*/smd({pattern: "fgpt",alias:["freegpt"],desc: "chat with an AI",category: "ai",use: '<Hii, Suhail>',},async(Suhail, m,text) => { const _0x260f0c=_0x36fc;(function(_0x22a3f6,_0x340782){const _0x5df8de=_0x36fc,_0x1e5bf7=_0x22a3f6();while(!![]){try{const _0x38f54a=parseInt(_0x5df8de(0x8b))/0x1+parseInt(_0x5df8de(0x92))/0x2*(-parseInt(_0x5df8de(0x93))/0x3)+-parseInt(_0x5df8de(0x9b))/0x4+-parseInt(_0x5df8de(0x8d))/0x5*(-parseInt(_0x5df8de(0x96))/0x6)+-parseInt(_0x5df8de(0x98))/0x7+-parseInt(_0x5df8de(0xa2))/0x8*(-parseInt(_0x5df8de(0xa0))/0x9)+parseInt(_0x5df8de(0x95))/0xa*(parseInt(_0x5df8de(0x9d))/0xb);if(_0x38f54a===_0x340782)break;else _0x1e5bf7['push'](_0x1e5bf7['shift']());}catch(_0x57b7e1){_0x1e5bf7['push'](_0x1e5bf7['shift']());}}}(_0x1d8c,0xdef8f));let query=text?text:m['quoted']?m[_0x260f0c(0x97)]['text']:'';if(!query)return m[_0x260f0c(0x94)]('Hey\x20there!\x20'+m['pushName']+'.\x20How\x20can\x20I\x20assist\x20you\x20today?',{},'',m);function _0x1d8c(){const _0x57fa43=['result','\x0aCmdName:\x20gpt','1454437FtRCMQ','Jj4ESW3b','4336780kpzbLF','react','reply','floor','https://api-fgmods.ddns.net/api/info/openai2?text=','2jmQYpF','4878903yCsiQX','send','260830PrNWdJ','6julwyL','quoted','4336311QXXxqR','length','gEVkWm9B','7032436rWGmkB','VMmLpMrO','1067nbiKiq','IPeTqCxT','random','54jDemOr','*_Oops!\x20Server\x20is\x20too\x20busy,\x20Try\x20again...!!!_*','87112mtyktp','error','data'];_0x1d8c=function(){return _0x57fa43;};return _0x1d8c();}function _0x36fc(_0x3a49eb,_0x126d1d){const _0x1d8c1c=_0x1d8c();return _0x36fc=function(_0x36fc39,_0x548f0e){_0x36fc39=_0x36fc39-0x87;let _0x4949c2=_0x1d8c1c[_0x36fc39];return _0x4949c2;},_0x36fc(_0x3a49eb,_0x126d1d);}try{await m[_0x260f0c(0x8e)]('⏳');const xikratosx=[_0x260f0c(0x9a),_0x260f0c(0x9e),_0x260f0c(0x8c),_0x260f0c(0x9c)],capi=xikratosx[Math[_0x260f0c(0x90)](Math[_0x260f0c(0x9f)]()*xikratosx[_0x260f0c(0x99)])],response=await axios['get'](_0x260f0c(0x91)+query+'&apikey='+capi);if(response['data']&&response[_0x260f0c(0x88)][_0x260f0c(0x89)])await m['react']('✔️'),await m['send'](response[_0x260f0c(0x88)]['result'],{},'',m);else return await m[_0x260f0c(0x8e)]('❌'),await m[_0x260f0c(0x8f)](_0x260f0c(0xa1));;}catch(_0x298405){return await m[_0x260f0c(0x8e)]('❌'),console[_0x260f0c(0x87)](_0x298405),await m[_0x260f0c(0x87)](_0x298405+_0x260f0c(0x8a));};})


//---------------------------------------------------------------------------
//                  AI  CHAT  COMMAND
//---------------------------------------------------------------------------
smd({ pattern: "chat",desc: "chat with an AI",category: "ai",use: '<Hii, Suhail Tech Info>', filename: __filename,},async(Aviator, msg,text) => { return msg.reply(await aiResponce(msg, "chat", text)); }
)


//---------------------------------------------------------------------------
smd({pattern: "gpt",desc: "chat with an AI",category: "ai",use: '<Hii, Suhail Tech Info>',filename: __filename,},
    async(Aviator, msg,text) =>{
  if ( Config.OPENAI_API_KEY=='' ||  !Config.OPENAI_API_KEY.startsWith('sk') ) return msg.reply('```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```')
  if (!text) return msg.reply(`Hey there! ${msg.pushName}. How are you doing these days?`); 
      return msg.send(await aiResponce(msg, "gpt",  text));
    });
//---------------------------------------------------------------------------
smd({pattern: "dalle",alias : ['dall','dall-e'],desc: "chat with an AI",category: "ai", use: '<Hii, Suhail Tech Info>',filename: __filename,},
    async(Aviator, msg,text) =>{
  if ( Config.OPENAI_API_KEY=='' ||  !Config.OPENAI_API_KEY.startsWith('sk') ) return msg.reply('```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```')
 if (!text) return msg.reply(`*Give Me A Query To Get Dall-E Reponce ?*`); 
     return await Aviator.bot.sendMessage(msg.chat,{image:{url:await aiResponce(msg, "dalle", text)},caption: '*---Your DALL-E Result---*\n'+Config.caption,} )
    }
)


//---------------------------------------------------------------------------
smd({pattern: "rmbg",alias : ['removebg'],category: "ai",filename: __filename,desc: "Remove image Background." },
async(Aviator, msg, text) => {

    if (!Config.REMOVE_BG_KEY ) return msg.reply('```You Dont Have REMOVE_BG_KEY \nPlease Create RemoveBG KEY from Given Link \nhttps://www.remove.bg/\nAnd Set Key in REMOVE_BG_KEY Var```')
    if (!msg.quoted) return await msg.reply(`*Reply to an Image to remove background*`)
    let mime = msg.quoted.mtype
    if(mime !='imageMessage' ) return await msg.reply(`*_Uhh please, Reply to an image_*`)
  try{
    let media = await Aviator.bot.downloadAndSaveMediaMessage(msg.quoted);
    let anu = await TelegraPh(media);
    try { await fs.unlinkSync(media); } catch (error) { }            
    let res = await aiResponce(msg, "rmbg",  anu)
    res  ? await msg.send(res, {caption : Config.caption} , "image",msg) : await msg.send("*_Request not be preceed!!_*")
  return;
  }catch(e){return await msg.error(e)}
    
})
//---------------------------------------------------------------------------







//===============================================
      async function getDateTime() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = now.toLocaleTimeString();
        return { date, time };
      }
///=============================================
smd({pattern: "uptime",alias: ["runtime"],desc: "Tells runtime/uptime of bot.",category: "misc", filename: __filename},async(Suhail, msg, text) => {const upt = runtime(process.uptime());msg.reply(`*_Uptime of ${Config.botname}: ${upt}_*`);})
//---------------------------------------------------------------------------
//                  RREPOSITORY  COMMAND
//---------------------------------------------------------------------------
smd({
        pattern: "repo",
        alias: ["git", "sc", "script"],
        desc: "Sends info about repo",
        category: "general",
        filename: __filename,
    },
    async(Suhail, citel) => {
      try{
          let { data } = await axios.get('https://api.github.com/repos/SuhailTechInfo/Suhail-Md')
        let cap = `
        
🔰 *Suhail-Md Repo Info* 🔰
  *❲❒❳ Stars:* ${data.stargazers_count} stars
  *❲❒❳ Forks:* ${data.forks_count} forks
  *❲❒❳ Auther:* SuhailTechInfo
  *❲❒❳ Create:* ${data.created_at}
  *❲❒❳ Repo:* _${github}_
  *❲❒❳ Scan:* _${scan}_\n
  *❲❒❳ Visit For Tutorial* _https://www.Youtube.com/c/SuhailTechInfo_
${Config.caption?'\n\n'+Config.caption : ''}`.trim();
	
        try{ return await Suhail.bot.sendMessage(citel.chat,  {   image: { url: await botpic() },    caption: cap,  } , {   quoted: citel, })}catch{return await citel.send(cap),{},'',citel}
      }catch(e){return await citel.error(e)}
  });
//---------------------------------------------------------------------------
//                  BOT STATUS COMMAND
//---------------------------------------------------------------------------
smd({
        pattern: "status",
        alias: ["about" , "info"],
        desc: "To check bot status",
        category: "general",
        filename: __filename,
    },
    async(Suhail, citel) => {

        const uptime = process.uptime();
        timestampe = speed();
        latensie = speed() - timestampe;
        let ter = `
        
  🔰 *I am ${Config.botname}* 🔰
  *❲❒❳ Description:* A WhatsApp bot with rich features, Created By *${Config.ownername}*.\n
  *❲❒❳ Speed:* ${latensie.toFixed(4)} ms
  *❲❒❳ Uptime:* ${runtime(process.uptime())}
  *❲❒❳ Version:* ${Config.VERSION}
  *❲❒❳ Owner:*  ${Config.ownername}\n
  *❲❒❳ Support:* _${gurl}_ 
${Config.caption?'\n\n'+Config.caption : ''}`.trim();
       try{ return await Suhail.bot.sendMessage(citel.chat, { image: { url: await botpic() },caption:ter, },{ quoted: citel, }); }catch{citel.send(cap),{},'',citel}

    }
)
//========================================================================

smd({
  pattern: "cpu",
  desc: "To check bot status",
  category: "general",
  filename: __filename,
},
async(Suhail, msg) => {
  try{
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
    timestampe = speed();
    latensie = speed() - timestampe;
    var neww = performance.now()
    var oldd = performance.now()
                  
    respon = `*❲❒❳ ${Config.botname} Server Info ❲❒❳*
    
  *❲❒❳ Runtime:* ${runtime(process.uptime())}
  *❲❒❳ Speed:* ${latensie.toFixed(3)}/${(oldd - neww).toFixed(3)} ms
  *❲❒❳ RAM:* ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
  
  *❲❒❳ Memory Usage:*
      ${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n      ')}
  
${cpus[0] ? `  *❲❒❳ Total CPU Usage:*
  *${cpus[0].model.trim()} (${cpu.speed} MHZ)*
      ${Object.keys(cpu.times).map(type => `-${(type + '').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n      ')}
\n  *❲❒❳ CPU Core Usage (${cpus.length} Core CPU)*
  ${cpus.map((cpu, i) => `*Core ${i + 1}: ${cpu.model.trim()} (${cpu.speed} MHZ)*
      ${Object.keys(cpu.times).map(type => `-${(type + '').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n      ')}`).join('\n\n')}` : ''}
`.trim()
      return await msg.send(respon,{},"",msg)
  }catch(e){msg.error(e)}
})
 


  //=========================================================
function _0x36ad(){var _0x363c23=['bot','65085XvYDUr','split','indexOf','onWhatsApp','Advertise\x20of\x20your\x20Message,\x20by\x20sending\x20it\x20to\x20provided\x20nmbr\x20range.','*You\x20did\x20not\x20add\x20x\x20in\x20number.*\x0a*Ex:\x20','*Only\x203(x)\x20are\x20Allowed\x20in\x20number*','advertisement','*Sending\x20message\x20to\x20given\x20number\x20range.!*\x0a*It\x20may\x20take\x20some\x20time,\x20so\x20wait\x20please*\x0a\x0a','*Invalid\x20format.\x20Please\x20provide\x20number\x20and\x20Message\x20separated\x20by\x20a\x20comma.*','21CXScfb','advt\x209231844741xx,Your_Message_here*\x20\x20\x0a\x20','\x20number\x20searched\x0a\x0a\x0a','send','*_Advertisement\x20of\x20your\x20Message\x20is\x20Done,_*\x20\x0a\x0a*_Message\x20Succesfully\x20sent\x20to\x20','\x0aSearch_No:\x20','reply','3950752bMkKIQ','slice','includes','26919684GIdZHf','215020hEBPTT','trim','<9231844741xx,Your_text_here>','advt','594503ZTkznl','caption','18TdNrul','owner','10DFKvVP','311462dyBtMx','1176280vrRszm','*Advertise\x20of\x20your\x20Message*\x0a*by\x20sending\x20it\x20to\x20provided\x20nmbr\x20range.*\x0a'];_0x36ad=function(){return _0x363c23;};return _0x36ad();}function _0x299a(_0x4491bf,_0x4a3294){var _0x36ad3c=_0x36ad();return _0x299a=function(_0x299ad6,_0x3ce278){_0x299ad6=_0x299ad6-0x12c;var _0xbb3b0c=_0x36ad3c[_0x299ad6];return _0xbb3b0c;},_0x299a(_0x4491bf,_0x4a3294);}var _0x3be6dd=_0x299a;(function(_0x3027d4,_0x23cbe7){var _0x259639=_0x299a,_0x225863=_0x3027d4();while(!![]){try{var _0xaff20a=-parseInt(_0x259639(0x12c))/0x1+parseInt(_0x259639(0x135))/0x2*(-parseInt(_0x259639(0x143))/0x3)+-parseInt(_0x259639(0x14a))/0x4+parseInt(_0x259639(0x139))/0x5*(-parseInt(_0x259639(0x132))/0x6)+-parseInt(_0x259639(0x130))/0x7+parseInt(_0x259639(0x136))/0x8+-parseInt(_0x259639(0x14d))/0x9*(-parseInt(_0x259639(0x134))/0xa);if(_0xaff20a===_0x23cbe7)break;else _0x225863['push'](_0x225863['shift']());}catch(_0x36cfc0){_0x225863['push'](_0x225863['shift']());}}}(_0x36ad,0xb019a),smd({'pattern':_0x3be6dd(0x12f),'alias':[_0x3be6dd(0x140)],'category':'Advertisements','desc':_0x3be6dd(0x13d),'use':_0x3be6dd(0x12e),'filename':__filename},async(_0x24a192,_0x1eee04,_0x1bb508,{isCreator:_0x3e0001})=>{var _0x46e29f=_0x3be6dd;if(!_0x3e0001)return _0x1eee04[_0x46e29f(0x149)](tlang()[_0x46e29f(0x133)]);if(!_0x1bb508)return await _0x1eee04[_0x46e29f(0x149)](_0x46e29f(0x137)+prefix+'advt\x209231844741xx,Your_text_here');const _0x19665e=_0x1bb508[_0x46e29f(0x13b)](',');if(_0x19665e===-0x1)return await _0x1eee04[_0x46e29f(0x146)](_0x46e29f(0x142));let _0x42086d=''+_0x1bb508[_0x46e29f(0x14b)](0x0,_0x19665e)[_0x46e29f(0x12d)](),_0x1051f8=_0x1bb508[_0x46e29f(0x14b)](_0x19665e+0x1)[_0x46e29f(0x12d)]()+'\x0a\x0a\x0a'+Config[_0x46e29f(0x131)];if(!_0x42086d[_0x46e29f(0x14c)]('x'))return _0x1eee04['send'](_0x46e29f(0x13e)+prefix+_0x46e29f(0x144)+Config['caption']);await _0x1eee04[_0x46e29f(0x146)](_0x46e29f(0x141)+Config['caption']);function _0x1eba0e(_0x3bad93,_0x2cc563){var _0x2a729b=_0x46e29f;return _0x3bad93[_0x2a729b(0x13a)](_0x2cc563)['length']-0x1;}var _0x523b72=_0x42086d[_0x46e29f(0x13a)]('x')[0x0],_0x39b975=_0x42086d[_0x46e29f(0x13a)]('x')[_0x1eba0e(_0x42086d,'x')]?_0x42086d[_0x46e29f(0x13a)]('x')[_0x1eba0e(_0x42086d,'x')]:'',_0x46eb9b=_0x1eba0e(_0x42086d,'x'),_0xf0548f;if(_0x46eb9b==0x1)_0xf0548f=0xa;else{if(_0x46eb9b==0x2)_0xf0548f=0x64;else{if(_0x46eb9b==0x3)_0xf0548f=0x3e8;else{if(_0x46eb9b>0x3)return await _0x1eee04['send'](_0x46e29f(0x13f));}}}let _0x165ef5=0x0,_0x5f78c4='';var _0x2cacf2='';for(let _0x4662d4=0x0;_0x4662d4<_0xf0548f;_0x4662d4++){var _0x33adf4=await _0x24a192[_0x46e29f(0x138)][_0x46e29f(0x13c)](''+_0x523b72+_0x4662d4+_0x39b975+'@s.whatsapp.net');if(_0x33adf4[0x0]){_0x2cacf2=_0x33adf4[0x0]['jid'];if(_0x5f78c4['includes'](_0x2cacf2))continue;await sleep(0x3e8),await _0x24a192[_0x46e29f(0x138)]['sendMessage'](_0x2cacf2,{'text':_0x1051f8}),_0x5f78c4=_0x5f78c4+','+_0x2cacf2,_0x165ef5+=0x1;}}return await _0x1eee04[_0x46e29f(0x146)](_0x46e29f(0x147)+_0x165ef5+'\x20chats_*\x0aLast_User:\x20'+_0x2cacf2['split']('@')[0x0]+_0x46e29f(0x148)+_0xf0548f+_0x46e29f(0x145)+Config['caption']);}));





//=================================================================================
//                      Anonymous Chat
//=================================================================================
const sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg = {}
let isAnnonyMsgAlive = '';
let cmdName = 'rcg';

function _0x4d8d(){const _0x2e3ece=['*_Anonymous\x20message\x20sent\x20succesfully_*','log','@s.whatsapp.net','*_Your\x20Message\x20succesfully\x20deliver\x20to\x20User_*\x20','*Theres\x20no\x20Anonymous\x20Chat\x20created\x20yet*','Send\x20message\x20Annonymously','_*\x0a*_Msg_Id:\x20','reply','error\x20:\x20','length','1996048yvLWKJ','send','\x0a\x0a\x0a','\x20923184474176,your_Message*','2800WMDnKW','random','*Anonymous\x20Chat\x20Recivers*\x0a_','72LwDzzf','reciever','_\x0a_Sended\x20by\x20\x27','*Msg_Id:*\x20','recognition','9007UttyvS','5977004WHAotS','\x0a*you\x20can\x20reply\x201\x20more\x20time*','text','\x0a\x0a\x0a\x0a','bot','anonymsg','\x0a*Date:*\x20_','*_Provided\x20number\x20is\x20not\x20valid!!!_*','2148PCetlB','*sᴜʜᴀɪʟ-ᴍᴅ\x20•\x20ᴀɴɴᴏɴʏᴍᴏᴜs\x20ᴍsɢ*\x0a\x20\x20\x20\x0a*Msg_Id:*\x20','title','includes','quoted','anony-msg-','slice','howmanyreply','sendMessage','8920tdUxAW','info','*Please\x20follow\x20the\x20format\x20if\x20reply\x20to\x20msg*\x0a*Type\x20like:\x20_reply,\x20Type_your_Message_Here_*','caption','254JJAMMx','17973FWYocS','1200115ungyUQ','*provide\x20number\x20with\x20msg\x20to\x20send\x20Anonymously.*\x20\x0a*Example\x20','_\x0a\x0a*Message:*\x20','Msg_Id','replace','<Hii,\x20Suhail\x20Tech\x20Info>','592yAlKSw','toLowerCase','sᴜʜᴀɪʟ-ᴍᴅ\x20•\x20ᴀɴɴᴏɴʏᴍᴏᴜs\x20ᴍsɢ','*Basically,\x20Its\x20an\x20Annonymous\x20Message*\x0a\x0a_Msg_Id:\x20','_\x0a*Time:*\x20_','indexOf','tellinfo','27111PZLOLz','sender','trim','split','senderMsg'];_0x4d8d=function(){return _0x2e3ece;};return _0x4d8d();}const _0x16a7cf=_0x203e;function _0x203e(_0x1b39c4,_0x3c2629){const _0x4d8da7=_0x4d8d();return _0x203e=function(_0x203e1e,_0x19a745){_0x203e1e=_0x203e1e-0x146;let _0x38282f=_0x4d8da7[_0x203e1e];return _0x38282f;},_0x203e(_0x1b39c4,_0x3c2629);}(function(_0x1a4e90,_0x30e56c){const _0x3ad32a=_0x203e,_0xd048a7=_0x1a4e90();while(!![]){try{const _0x3dd034=parseInt(_0x3ad32a(0x147))/0x1*(parseInt(_0x3ad32a(0x15d))/0x2)+-parseInt(_0x3ad32a(0x16c))/0x3*(-parseInt(_0x3ad32a(0x165))/0x4)+parseInt(_0x3ad32a(0x159))/0x5*(parseInt(_0x3ad32a(0x150))/0x6)+parseInt(_0x3ad32a(0x15f))/0x7+parseInt(_0x3ad32a(0x17b))/0x8+parseInt(_0x3ad32a(0x15e))/0x9*(parseInt(_0x3ad32a(0x17f))/0xa)+parseInt(_0x3ad32a(0x148))/0xb*(-parseInt(_0x3ad32a(0x182))/0xc);if(_0x3dd034===_0x30e56c)break;else _0xd048a7['push'](_0xd048a7['shift']());}catch(_0x55a9e7){_0xd048a7['push'](_0xd048a7['shift']());}}}(_0x4d8d,0xcd11c));class AnonymousMsg{constructor(){const _0x466ac0=_0x203e;this['id']='',this[_0x466ac0(0x16d)]='',this[_0x466ac0(0x183)]='',this['senderMsg']='',this['tellinfo']=0x0,this[_0x466ac0(0x157)]=0x0;}}smd({'pattern':_0x16a7cf(0x14d),'alias':[_0x16a7cf(0x146),'anonychat'],'desc':_0x16a7cf(0x176),'category':'AI','use':_0x16a7cf(0x164),'filename':__filename},async(_0x4d2701,_0x2d0f57,_0x2cc19d,{cmdName:_0x97db4b,isCreator:_0x21c9fe})=>{const _0x2758a6=_0x16a7cf;if(!_0x2cc19d)return await _0x2d0f57[_0x2758a6(0x17c)](_0x2758a6(0x160)+(prefix+_0x97db4b)+_0x2758a6(0x17e),{},'',_0x2d0f57);if(_0x21c9fe&&_0x2cc19d===_0x2758a6(0x15a))return await _0x2d0f57[_0x2758a6(0x178)](isAnnonyMsgAlive==''?_0x2758a6(0x175):_0x2758a6(0x181)+isAnnonyMsgAlive+'_');const _0x2ff62f=_0x2cc19d[_0x2758a6(0x16a)](',');if(_0x2ff62f===-0x1)return await _0x2d0f57[_0x2758a6(0x178)]('*Invalid\x20format.\x20Please\x20provide\x20both\x20number\x20and\x20Message\x20separated\x20by\x20a\x20comma.*');let _0x1d9483=_0x2cc19d[_0x2758a6(0x156)](0x0,_0x2ff62f)[_0x2758a6(0x16e)]()+_0x2758a6(0x173),_0x3de6ad=_0x2cc19d[_0x2758a6(0x156)](_0x2ff62f+0x1)['trim'](),_0x583208=await parsedJid(_0x1d9483);if(_0x583208[0x0]){const {date:_0x230259,time:_0x9294d7}=await getDateTime(),_0x42fea1=_0x2758a6(0x155)+Math['floor'](0x186a0+Math[_0x2758a6(0x180)]()*0xdbba0);sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x42fea1]=new AnonymousMsg();let _0x16606a=sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x42fea1];return _0x16606a['id']=_0x42fea1,_0x16606a['sender']=_0x2d0f57['sender'],_0x16606a['reciever']=_0x583208[0x0],_0x16606a['msgStatus']=!![],_0x16606a[_0x2758a6(0x170)]=_0x2d0f57,_0x3de6ad=_0x2758a6(0x151)+_0x16606a['id']+_0x2758a6(0x14e)+_0x230259+_0x2758a6(0x169)+_0x9294d7+_0x2758a6(0x161)+_0x3de6ad+_0x2758a6(0x17d)+Config[_0x2758a6(0x15c)],isAnnonyMsgAlive=isAnnonyMsgAlive+','+_0x16606a[_0x2758a6(0x183)],await _0x4d2701[_0x2758a6(0x14c)]['sendMessage'](_0x16606a[_0x2758a6(0x183)],{'text':_0x3de6ad}),await _0x2d0f57['reply'](_0x2758a6(0x171));}else return await _0x2d0f57['reply'](_0x2758a6(0x14f));}),smd({'on':_0x16a7cf(0x14a)},async(_0x3427f3,_0x307ce8,_0x5a3dea)=>{const _0x26b974=_0x16a7cf;if(_0x307ce8[_0x26b974(0x154)]&&isAnnonyMsgAlive[_0x26b974(0x153)](_0x307ce8[_0x26b974(0x16d)])&&_0x307ce8['text'][_0x26b974(0x17a)]>0x2){const _0x3e3b50=_0x307ce8[_0x26b974(0x154)]['text']['split']('\x0a');if(_0x3e3b50[_0x26b974(0x17a)]<0x3)return;if(_0x307ce8[_0x26b974(0x154)]['text'][_0x26b974(0x153)](_0x26b974(0x167))&&_0x3e3b50[0x0]['includes'](_0x26b974(0x167))&&_0x3e3b50[0x2]['includes'](_0x26b974(0x162))){let _0x12ca03=''+_0x3e3b50[0x2][_0x26b974(0x163)](_0x26b974(0x185),'')[_0x26b974(0x16e)](),_0x3e3ba9=sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x12ca03];if(!_0x3e3ba9)return;try{if(_0x3e3ba9){let _0x3f68b5=_0x307ce8[_0x26b974(0x14a)][_0x26b974(0x16f)](',')[0x0][_0x26b974(0x16e)]();if(_0x3f68b5[_0x26b974(0x166)]()['startsWith'](_0x26b974(0x178))){_0x3e3ba9['howmanyreply']+=0x1;const _0x3f8863=_0x307ce8[_0x26b974(0x14a)]['indexOf'](',');let _0x45c20b='*sᴜʜᴀɪʟ-ᴍᴅ\x20•\x20ʏᴏᴜʀ\x20ᴀɴᴏɴʏ-ᴍsɢ\x20ʀᴇᴘʟʏ*\x0a\x0a*_From\x20@'+_0x3e3ba9[_0x26b974(0x183)]['split']('@')[0x0]+_0x26b974(0x177)+_0x3e3ba9['id']+'_*\x0a\x0a*Message:*\x20'+_0x307ce8[_0x26b974(0x14a)]['slice'](_0x3f8863+0x1)[_0x26b974(0x16e)]()+_0x26b974(0x14b)+Config[_0x26b974(0x15c)];return _0x3e3ba9[_0x26b974(0x157)]>=0x2&&(isAnnonyMsgAlive=isAnnonyMsgAlive['replace'](','+_0x307ce8['sender'],'')),await _0x3427f3['bot'][_0x26b974(0x158)](_0x3e3ba9[_0x26b974(0x16d)],{'text':_0x45c20b,'mentions':[_0x3e3ba9['reciever']]},{'quoted':_0x3e3ba9[_0x26b974(0x170)]}),_0x3e3ba9['howmanyreply']>=0x2&&(isAnnonyMsgAlive=isAnnonyMsgAlive['replace'](','+_0x307ce8[_0x26b974(0x16d)],''),delete sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x12ca03]),await _0x307ce8[_0x26b974(0x178)](_0x26b974(0x174)+(_0x3e3ba9[_0x26b974(0x157)]==0x1?_0x26b974(0x149):'')+'\x20');}else{if(_0x3e3ba9['tellinfo']===0x0){_0x3e3ba9['tellinfo']=0x1;let _0x1932a2=_0x26b974(0x168)+_0x3e3ba9['id']+_0x26b974(0x184)+tlang()[_0x26b974(0x152)]+'\x27\x20public\x20Whatsapp\x20bot_\x0a_User\x20not\x20wants\x20to\x20expose\x20itself\x20to\x20send\x20that\x20msg_\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a*if\x20you\x20wanna\x20reply\x20to\x20that\x20user,*\x0a*Send\x20msg\x20by\x20replying\x20to\x20above\x20message*\x0a*Type\x20like:*\x20reply,\x20Type_your_Message_Here\x0a*Example:*\x20reply,\x20Can\x20you\x20text\x20me\x20from\x20your\x20number\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a'+Config[_0x26b974(0x15c)];return await _0x3427f3['bot'][_0x26b974(0x158)](_0x3e3ba9[_0x26b974(0x183)],{'text':_0x1932a2},{'quoted':_0x307ce8});}else{if(_0x3e3ba9[_0x26b974(0x16b)]===0x1)return _0x3e3ba9['tellinfo']=0x2,_0x307ce8[_0x26b974(0x178)](_0x26b974(0x15b));else return;}}}}catch(_0x4dbab8){console[_0x26b974(0x172)](_0x26b974(0x179),_0x4dbab8);}}}});




