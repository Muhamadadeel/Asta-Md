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
   * @youtube : https://www.youtube.com/c/@SuhailTechInfo0
   * @description : Suhail-Md ,A Multi-functional whatsapp user bot.
   * @version 1.0.9
*
   * Licensed under the  GPL-3.0 License;
* 
   * Created By Suhail Tech Info.
   * © 2023 Suhail-Md.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.

 ⛥
 **/

 const moment = require("moment-timezone")
 const Config = require('../config')
 let { fancytext, tlang, tiny, botpic ,prefix,smd } = require("../lib");
 let sᴜʜᴀɪʟ_ᴍᴅ ;
 
const {updateProfilePicture,forwardMessage, getAdmin} = require("../lib")




///============================================================================================
smd({ pattern: "ptv", desc: "send ptv Message of video", category: "whatsapp",filename: __filename},async(Suhail, msg, text,{cmdName , isCreator}) => {
   if(!msg.quoted) return await msg.send("*Uhh please, reply to a video Message*")
   let mtype = msg.quoted.mtype 
   if(mtype !== "videoMessage") return await msg.send("*Replied Message is not a video, Idiot.*")
   return await forwardMessage(msg.chat, Suhail, msg, cmdName )
})////------------------------------------------------------------
smd({pattern: "#", desc: "Save whatsapp status",category: "whatsapp",filename: __filename},async(Suhail, msg, text,{cmdName , isCreator}) => {
   if(!msg.quoted) return await msg.send("*Uhh Please, reply to whatsapp status*")
   let sᴜʜᴀɪʟ_ᴍᴅ_num = await Suhail.bot.decodeJid(msg.user)
   return await forwardMessage(sᴜʜᴀɪʟ_ᴍᴅ_num, Suhail, msg, cmdName )
})//--------------------------------------------------------------------
smd({pattern: "save",desc: "Save Message to log number",category: "whatsapp",filename: __filename},async(Suhail, msg, text,{cmdName , isCreator}) => {
   if(!isCreator) return await msg.send(tlang().owner)
   if(!msg.quoted) return await msg.send("*Uhh Please, reply to a Message*")
   let sᴜʜᴀɪʟ_ᴍᴅ_num = await Suhail.bot.decodeJid(msg.user)
   return await forwardMessage(sᴜʜᴀɪʟ_ᴍᴅ_num, Suhail, msg, cmdName )
})///================================================================================
smd({ on: "text" }, async (Suhail,msg,text)=> {
   if(msg.quoted && msg.text.toLowerCase().includes("send") ){
       let sᴜʜᴀɪʟ_ᴍᴅ_num = await Suhail.bot.decodeJid(msg.user)
       if(msg.quoted.sender === sᴜʜᴀɪʟ_ᴍᴅ_num && msg.quoted.chat === 'status@broadcast' ){ return await forwardMessage(msg.chat, Suhail.bot, msg, 'send' ); }
   }
})//==================================================================

smd({pattern: "pp",desc: "Set profile picture",category: "whatsapp",use: '<reply to image>', filename: __filename,},
async(Suhail, msg,text) => {
   if (!msg.quoted) return await msg.reply("*Reply to an image, dear*");
   if(msg.quoted.mtype !='imageMessage') return await msg.reply("*_Uhh please, Reply to an image._*");    
   const sᴜʜᴀɪʟ_ᴍᴅ_num = await Suhail.bot.decodeJid(msg.user)
   return await updateProfilePicture(Suhail , sᴜʜᴀɪʟ_ᴍᴅ_num , msg , 'pp' );
 })
smd({ pattern: "fullpp", desc: "Set full screen profile picture", category: "whatsapp", use: '<reply to image>', filename: __filename,},
 async(Suhail, msg,text) => {
   if (!msg.quoted) return await msg.reply("*Reply to an image, dear*");
   if(msg.quoted.mtype !='imageMessage') return await msg.reply("*_Uhh please, Reply to an image._*");
   const sᴜʜᴀɪʟ_ᴍᴅ_num = await Suhail.bot.decodeJid(msg.user)
   return await updateProfilePicture(Suhail , sᴜʜᴀɪʟ_ᴍᴅ_num , msg , 'fullpp' );    
});




const _0x49af65=_0x5217;function _0x5217(_0x2ac705,_0x414c84){const _0xcfd375=_0xcfd3();return _0x5217=function(_0x5217b5,_0x50b6ad){_0x5217b5=_0x5217b5-0x142;let _0x46e770=_0xcfd375[_0x5217b5];return _0x46e770;},_0x5217(_0x2ac705,_0x414c84);}function _0xcfd3(){const _0x20a299=['owner','*Message\x20you\x20replied\x20does\x20not\x20contain\x20a\x20reply\x20Message*','sendMessage','serializeM','405104eeZWQC','chat','20tvuDUy','location\x2024.121231,55.1121221','25821XQagms','END:VCARD','└───────────','\x0a\x20Latitude\x20\x20\x20\x20\x20:\x20\x20','location','50KcapPB',':-\x20wa.me/','_\x0a\x0a┌─⊷\x20\x09*BLOCKED\x20USERS*\x0a','```Cordinates\x20Not\x20In\x20Formate,\x20Try\x20Again```','vcard','split','caption','vcard\x20Suhail\x20Tech\x20Info*\x20','error\x20while\x20geting\x20Quoted\x20Message\x20:\x20','*Please\x20Reply\x20to\x20User\x20With\x20Name*','35973uOXNpL','user','\x0a\x20Longitude\x20\x20:\x20\x20','reply','3624UGzuOA','Create\x20Contact\x20by\x20given\x20name.','send','getQuotedObj','BEGIN:VCARD\x0a','444999BlKiwp','sender','blocklist','ORG:;\x0a','slice','26683500PNNkdj','15uAJSoQ','Give\x20Coordinates\x20To\x20Send\x20Location\x0a\x20*Example:*\x20','21205HISCIB','bot','log','*----------LOCATION------------*','654IuGhBV','whatsapp','join','Please\x20Give\x20Me\x20User\x20Name,\x20\x0a\x20*Example\x20:\x20','copyNForward','error','FN:','2319537iFWrEA','length','VERSION:3.0\x0a','quoted','```\x20\x0a\x20Sending\x20Location\x20Of\x20Given\x20Data:\x20'];_0xcfd3=function(){return _0x20a299;};return _0xcfd3();}(function(_0x2dd1f9,_0x24e43d){const _0x11d3b5=_0x5217,_0x53abec=_0x2dd1f9();while(!![]){try{const _0x248c32=parseInt(_0x11d3b5(0x165))/0x1*(parseInt(_0x11d3b5(0x143))/0x2)+-parseInt(_0x11d3b5(0x15d))/0x3+-parseInt(_0x11d3b5(0x179))/0x4*(-parseInt(_0x11d3b5(0x163))/0x5)+-parseInt(_0x11d3b5(0x169))/0x6*(-parseInt(_0x11d3b5(0x154))/0x7)+-parseInt(_0x11d3b5(0x158))/0x8*(parseInt(_0x11d3b5(0x145))/0x9)+-parseInt(_0x11d3b5(0x14a))/0xa*(parseInt(_0x11d3b5(0x170))/0xb)+parseInt(_0x11d3b5(0x162))/0xc;if(_0x248c32===_0x24e43d)break;else _0x53abec['push'](_0x53abec['shift']());}catch(_0x42af59){_0x53abec['push'](_0x53abec['shift']());}}}(_0xcfd3,0xc2a91),smd({'pattern':'quoted','desc':'get\x20reply\x20Message\x20from\x20Replied\x20Message','category':_0x49af65(0x155),'filename':__filename},async(_0xee7bd2,_0x191822,_0x1202a6)=>{const _0xa30a3e=_0x49af65;if(!_0x191822[_0xa30a3e(0x173)])return await _0x191822[_0xa30a3e(0x15a)]('*_Uhh\x20Dear,\x20Reply\x20to\x20a\x20Message_*');var _0x637d73;try{_0x637d73=await _0xee7bd2[_0xa30a3e(0x166)][_0xa30a3e(0x178)](await _0x191822[_0xa30a3e(0x15b)]());}catch(_0x17c536){return console[_0xa30a3e(0x167)](_0xa30a3e(0x152),_0x17c536);}if(!_0x637d73['quoted'])return await _0x191822['replay'](_0xa30a3e(0x176));else await _0xee7bd2[_0xa30a3e(0x166)][_0xa30a3e(0x177)](_0x191822['chat'],{'react':{'text':'✨','key':_0x191822['key']}});try{let _0x8465b1=await _0xee7bd2[_0xa30a3e(0x166)][_0xa30a3e(0x178)](await _0x637d73['getQuotedObj']());return await _0xee7bd2[_0xa30a3e(0x166)][_0xa30a3e(0x16d)](_0x191822[_0xa30a3e(0x142)],_0x8465b1,![]);}catch(_0x2f5e88){const _0x4746f3={};_0xee7bd2[_0xa30a3e(0x166)]['forward'](_0x191822[_0xa30a3e(0x142)],_0x637d73[_0xa30a3e(0x173)],_0x4746f3,_0x191822);}}),smd({'pattern':_0x49af65(0x15f),'desc':'get\x20list\x20of\x20all\x20Blocked\x20Numbers','category':_0x49af65(0x16a),'filename':__filename,'use':'<text>'},async(_0x317178,_0x5a8601,_0x1039cb,{isCreator:_0x2e42e2})=>{const _0xe4f378=_0x49af65;if(!_0x2e42e2)return await _0x5a8601[_0xe4f378(0x157)](tlang()[_0xe4f378(0x175)]);try{const _0x4b3b6f=await _0x317178[_0xe4f378(0x166)]['fetchBlocklist']();if(_0x4b3b6f['length']===0x0)return await _0x5a8601[_0xe4f378(0x157)]('*Uhh\x20Dear,\x20You\x20don\x27t\x20have\x20any\x20Blocked\x20Numbers.*');let _0x27e7b3='\x0a*≡\x20List*\x0a\x0a*_Total\x20Users:*\x20'+_0x4b3b6f[_0xe4f378(0x171)]+_0xe4f378(0x14c);for(let _0x7b6791=0x0;_0x7b6791<_0x4b3b6f['length'];_0x7b6791++){_0x27e7b3+='▢\x20'+(_0x7b6791+0x1)+_0xe4f378(0x14b)+_0x4b3b6f[_0x7b6791][_0xe4f378(0x14f)]('@')[0x0]+'\x0a';}return _0x27e7b3+=_0xe4f378(0x147),await _0x317178[_0xe4f378(0x166)][_0xe4f378(0x177)](_0x5a8601['chat'],{'text':_0x27e7b3});}catch(_0x40961b){return console[_0xe4f378(0x16e)](_0x40961b),await _0x5a8601[_0xe4f378(0x16e)](_0x40961b);}}),smd({'pattern':_0x49af65(0x149),'desc':'Adds\x20*readmore*\x20in\x20given\x20text.','category':_0x49af65(0x16a),'filename':__filename},async(_0x433828,_0x4c63a9,_0x241dfd)=>{const _0x2a6c63=_0x49af65;if(!_0x241dfd)return await _0x4c63a9['reply'](_0x2a6c63(0x164)+prefix+_0x2a6c63(0x144));let _0xe78590=parseFloat(_0x241dfd[_0x2a6c63(0x14f)](',')[0x0])||'',_0x14423b=parseFloat(_0x241dfd[_0x2a6c63(0x14f)](',')[0x1])||'';if(!_0xe78590||isNaN(_0xe78590)||!_0x14423b||isNaN(_0x14423b))return await _0x4c63a9[_0x2a6c63(0x157)](_0x2a6c63(0x14d));let _0x2ebe57=_0x2a6c63(0x168);return _0x2ebe57+=_0x2a6c63(0x174),_0x2ebe57+=_0x2a6c63(0x148)+_0xe78590,_0x2ebe57+=_0x2a6c63(0x156)+_0x14423b+'```\x0a'+Config[_0x2a6c63(0x150)],await _0x4c63a9[_0x2a6c63(0x157)](_0x2ebe57),await _0x433828[_0x2a6c63(0x166)][_0x2a6c63(0x177)](_0x4c63a9['chat'],{'location':{'degreesLatitude':_0xe78590,'degreesLongitude':_0x14423b}},{'quoted':_0x4c63a9});}),smd({'pattern':_0x49af65(0x14e),'desc':_0x49af65(0x159),'category':_0x49af65(0x16a),'filename':__filename},async(_0x168ad2,_0x27b6a6,_0x562df1)=>{const _0x1fc475=_0x49af65;if(!_0x27b6a6['quoted'])return _0x27b6a6[_0x1fc475(0x157)](_0x1fc475(0x153));if(!_0x562df1)return _0x27b6a6[_0x1fc475(0x157)](_0x1fc475(0x16c)+prefix+_0x1fc475(0x151));var _0x33ee17=_0x562df1['split']('\x20');_0x33ee17[_0x1fc475(0x171)]>0x3&&(_0x562df1=_0x33ee17[_0x1fc475(0x161)](0x0,0x3)[_0x1fc475(0x16b)]('\x20'));const _0x4a1e23=_0x1fc475(0x15c)+_0x1fc475(0x172)+_0x1fc475(0x16f)+_0x562df1+'\x0a'+_0x1fc475(0x160)+'TEL;type=CELL;type=VOICE;waid='+_0x27b6a6[_0x1fc475(0x173)][_0x1fc475(0x15e)][_0x1fc475(0x14f)]('@')[0x0]+':+'+owner[0x0]+'\x0a'+_0x1fc475(0x146);let _0x1f2633={'contacts':{'displayName':_0x562df1,'contacts':[{'vcard':_0x4a1e23}]}};return await _0x168ad2[_0x1fc475(0x166)][_0x1fc475(0x177)](_0x27b6a6[_0x1fc475(0x142)],_0x1f2633,{'quoted':_0x27b6a6});}));