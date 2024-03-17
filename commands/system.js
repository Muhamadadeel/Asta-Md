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
 **/



const { addnote,smd, userdb, delnote, allnotes, delallnote, tlang,fetchJson, botpic, runtime, prefix, Config ,sleep,alivedb  } = require('../lib')
const {TelegraPh} = require('../lib/scraper')
const util = require('util');
const fs = require('fs-extra');
const axios = require('axios')
const fetch = require('node-fetch');
 //---------------------------------------------------------------------------
let sck1 = userdb;
let alive = alivedb;


    //---------------------------------------------------------------------------

smd({
            pattern: "qr",
            category: "misc",
            filename: __filename,
            desc: "Sends Qr code to scan and get your session id."
        },
        async(Suhail, msg, text) => {
         try{
            if (!text) return msg.reply(`*Provide me Text To Get QR*`);
            let h =`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${text}`;
            return await Suhail.bot.sendMessage(msg.chat, {image: { url: h },caption: `*_Scan Qr To Get You Text_*`,  } );
         }catch(e){return await msg.error(`${e}\nCommand: qr `),console.log("error from qr" , e)      }
    })

//--------------------------------------------------------------------------- 
/*
smd({
    pattern: "rmbg",
    alias : ['removebg'],
    category: "misc",
    filename: __filename,
    desc: "Remove image Background."
},
async(Suhail, msg, text) => {
  const _0x16b89c=_0x49c2;function _0x5e60(){const _0x33515f=['log','post','unlinkSync','send','caption','reply','524478FLbaqg','671116swmKkp','Uhh\x20Please,\x20Reply\x20To\x20An\x20Image/Video','1030BtYSxu','https://api.remove.bg/v1.0/removebg','187699OYwNUd','93599mPRWgy','auto','data','3341514nVKyCN','225184Osvztc','downloadAndSaveMediaMessage','catch','imageMessage','*_Uhh\x20Dear,\x20Please\x20provide\x20Valid\x20RemoveBg\x20Key_*\x0a\x0a\x20_Get\x20RemoveBg\x20api\x20key\x20from\x20remove.bg_\x0a\x20_then\x20Put\x20it\x20in\x20var\x20\x22REMOVE_BG_KEY\x22_\x0a\x0a','25NTBVPR','sending\x20removebg\x20image...!','14IYDGua','4141704bMSerR','REMOVE_BG_KEY','quoted','477ZxuHEt'];_0x5e60=function(){return _0x33515f;};return _0x5e60();}(function(_0x3045c0,_0x56c7b6){const _0x146dc7=_0x49c2,_0x492ef5=_0x3045c0();while(!![]){try{const _0x1f6d31=-parseInt(_0x146dc7(0xf0))/0x1*(-parseInt(_0x146dc7(0xe0))/0x2)+parseInt(_0x146dc7(0xd8))/0x3+-parseInt(_0x146dc7(0xec))/0x4+-parseInt(_0x146dc7(0xde))/0x5*(-parseInt(_0x146dc7(0xeb))/0x6)+parseInt(_0x146dc7(0xe1))/0x7+-parseInt(_0x146dc7(0xd9))/0x8*(parseInt(_0x146dc7(0xe4))/0x9)+parseInt(_0x146dc7(0xee))/0xa*(-parseInt(_0x146dc7(0xd5))/0xb);if(_0x1f6d31===_0x56c7b6)break;else _0x492ef5['push'](_0x492ef5['shift']());}catch(_0x1a9a50){_0x492ef5['push'](_0x492ef5['shift']());}}}(_0x5e60,0xe0b62));if(!msg[_0x16b89c(0xe3)])return await msg[_0x16b89c(0xea)]('*Reply\x20Any\x20Image\x20To\x20Remove\x20Background*');let mime=msg[_0x16b89c(0xe3)]['mtype'];if(mime!=_0x16b89c(0xdc))return await msg[_0x16b89c(0xea)](_0x16b89c(0xed));let media=await Suhail.bot[_0x16b89c(0xda)](msg[_0x16b89c(0xe3)]),anu=await TelegraPh(media);try{await fs[_0x16b89c(0xe7)](media);}catch(_0x14f72d){}const formData={'image_url':anu,'size':_0x16b89c(0xd6)};function _0x49c2(_0x16a55d,_0x16a672){const _0x5e6049=_0x5e60();return _0x49c2=function(_0x49c2f0,_0x45b252){_0x49c2f0=_0x49c2f0-0xd5;let _0x43a2e2=_0x5e6049[_0x49c2f0];return _0x43a2e2;},_0x49c2(_0x16a55d,_0x16a672);}axios[_0x16b89c(0xe6)](_0x16b89c(0xef),formData,{'headers':{'X-Api-Key':Config[_0x16b89c(0xe2)]},'responseType':'arraybuffer'})['then'](_0x466f9f=>{const _0x441490=_0x16b89c;console[_0x441490(0xe5)](_0x441490(0xdf));const _0x5b34e5=Buffer['from'](_0x466f9f[_0x441490(0xd7)],'binary');return msg[_0x441490(0xe8)](_0x5b34e5,{'caption':Config[_0x441490(0xe9)]},'image');})[_0x16b89c(0xdb)](_0x46980f=>{const _0x3d5c75=_0x16b89c;return msg[_0x3d5c75(0xe8)](_0x3d5c75(0xdd)+Config[_0x3d5c75(0xe9)]);});

    
})
*/
//---------------------------------------------------------------------------

smd({
            pattern: "url",
            alias : ['createurl'],
            category: "misc",
            filename: __filename,
            desc: "image to url."
        },
        async(Suhail, msg, text) => {
          try{
            if (!msg.quoted) return await msg.reply(`*Reply To Any Image/Video To Get Url*`)
            let mime = msg.quoted.mtype
            if(mime !='videoMessage' && mime !='imageMessage' ) return await msg.reply("Uhh Please, Reply To An Image/Video")
            let media = await Suhail.bot.downloadAndSaveMediaMessage(msg.quoted);
            let anu = await TelegraPh(media);
            await msg.reply(util.format(anu));
            return await fs.unlinkSync(media);
          }catch(e){return await msg.error(`${e}\nCommand: url `),console.log("error from url" , e)      }
        })

//---------------------------------------------------------------------------
smd({
            pattern: "trt",
            alias :['translate'],
            category: "misc",
            filename: __filename,
            desc: "Translate\'s given text in desird language."
        },
        async(Suhail, msg, text) => {
           try{
            if(!text && !msg.quoted) return await msg.reply(`*Please Give Me Text. Example: _${prefix}trt en Who are you_*`);
            const translatte = require("translatte");
            let lang = text ? text.split(" ")[0].toLowerCase() : 'en';
            if (!msg.quoted)  { text = text.replace( lang , "");  }
            else { text = msg.quoted.text; }
            var whole = await translatte(text, { from:"auto",  to: lang , });
            if ("text" in whole) { return await msg.reply(whole.text); }
          }catch(e){return await msg.error(`${e}\nCommand: trt `),console.log("error from trt" , e)}
        }
    )
    //---------------------------------------------------------------------------

/*
smd({
            pattern: "shell",
            category: "owner",
            filename: __filename,
            desc: "Runs command in Heroku(server) shell."
        },
        async(Suhail, msg, text,{ isCreator }) => {
             if (!isCreator) return msg.reply(tlang().owner)
             if(!text) return msg.reply("*Uhh PLease, Provide A Command to Run Heroku*")
             const { exec } = require("child_process")
             exec(text, (err, stdout) => {
                     if (err) return msg.reply(`----${tlang().title}----\n\n` + err)
                     if (stdout) { return msg.reply(`----${tlang().title}----\n\n` + stdout)  }
             })
        }) 
        

    //---------------------------------------------------------------------------


smd({
            pattern: "eval",
            category: "owner",
            filename: __filename,
            desc: "Runs js code on node server."
        },
        async(Suhail, msg, text,{ isCreator }) => {
               if (!isCreator)  return msg.reply(tlang().owner)
               if(!text) return msg.reply("*Uhh PLease, Provide A Query To Run Master*")
               try {
                   let resultTest = eval('const a = async()=>{\n' + text + '\n}\na()');
                   if (typeof resultTest === "object") await msg.reply(JSON.stringify(resultTest));
                   else await msg.reply(resultTest.toString());
               } catch (err) { return  await msg.reply(err.toString()); }
})

  */

//---------------------------------------------------------------------------
/*smd({
            pattern: "delnote",
            category: "owner",
            filename: __filename,
            desc: "Deletes note from db."
        },
        async(Suhail, msg, text,{ isCreator }) => {
            const { tlang } = require('../lib/scraper')
            if (!isCreator) return msg.reply(tlang().owner)
            if(!text) return msg.reply("*Uhh PLease, Provide A Note Id. Ex .delnote 1*")
            await delnote(text.split(" ")[0])
             return msg.reply(`Id: ${text.split(" ")[0]}\'s note has been deleted from mongodb.`)

        }
    )
  */
//---------------------------------------------------------------------------

/*smd({
            pattern: "delallnotes",
            category: "owner",
            filename: __filename,
            desc: "Deletes all notes from db."
        },
        async(Suhail, msg, text, isCreator) => {
            const { tlang } = require('../lib/scraper')
            if (!isCreator) return msg.reply(tlang().owner)


        }
    )
  
  */
  //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
//                  ADD NOTE  COMMANDS
//---------------------------------------------------------------------------
/*
smd({
            pattern: "addnote",
            category: "owner",
            desc: "Adds a note on db.",
            filename: __filename
        },
        async(Suhail, msg, text,{ isCreator }) => {
            if (!isCreator) return msg.reply(tlang().owner)
            if (!text) return msg.reply(`🔍 *Please Provide Text To Save In Notes*`)
 
 


        }
    )
 */
    //---------------------------------------------------------------------------


if(isMongodb){
smd({
        pattern: "notes",
        alias : ['note'],
        category: "owner",
        filename: __filename,
        desc: "Shows list of all notes."
    },
    async(Suhail, msg, text,{ isCreator }) => {
  const { tlang } = require('../lib')
if (!isCreator) return msg.reply(tlang().owner)
let txt = `╭───── *『 MONGODB NOTES 』* ───◆
┃ Here You Can Store Notes For Later Use
┃ *------------------------------------------*
┃  ┌┤  *✯---- ADD NEW NOTE ----⦿*
┃  │✭ *Cmd :* ${prefix}notes add 'Your Text'
┃  │✭ *Usage :* Save Text in MongoDb Server
┃  ╰───────────────────◆
┃
┃  ┌┤  *✯---- GET ALL NOTES ----⦿*
┃  │✭ *Cmd :* ${prefix}notes all
┃  │✭ *Usage :* Read/Get All Saved Notes 
┃  ╰───────────────────◆
┃
┃  ┌┤  *✯---- DELETE A NOTE ----⦿*
┃  │✭ *Cmd :* ${prefix}notes del 'note id'
┃  │✭ *Usage :* Delete A Single Note By ID Number 
┃  ╰───────────────────◆
┃
┃  ┌┤  *✯---- DELETE ALL NOTES ----⦿*
┃  │✭ *Cmd :* ${prefix}notes delall
┃  │✭ *Usage :* Delete All Saved Notes 
┃  ╰───────────────────◆
╰━━━━━━━━━━━━━━━━━━━━━━──⊷` ; 
 
 
 if (!text) return await msg.reply(txt);
 if(text.split(' ')[0].toLowerCase() === "add"  || text.split(' ')[0].toLowerCase() === "new" )
 {
             let txt = text.replace("add", "").replace("new", "")
             await addnote(txt)
            return await msg.reply(`New note "${txt}" added in mongodb.`)
 }
 else if(text.split(' ')[0].toLowerCase() === "all")
 {
            const note_store = new Array()
            let leadtext = `*All Available Notes are:-*\n\n`
            leadtext += await allnotes()
            return await msg.reply(leadtext)
 }
  else if(text.split(' ')[0].toLowerCase() === "delall")
  {
        await delallnote()
        return await msg.reply(`All notes deleted from mongodb.`)
  }
 else if(text.split(' ')[0].toLowerCase() === "del")
 {
      try 
      {
            let id = text.split(' ')[1];
            if (!id || isNaN(id)) { return msg.reply("Uhh Please, Provide a Numeric Note ID. Example: .delnote 1"); }
            await delnote(id)
            //return msg.reply(`Id: ${text.split(" ")[0]}\'s note has been deleted from mongodb.`)
            return await msg.reply(`Note with ID : ${id} has been deleted from MongoDB.`);
      } catch (error) {return msg.reply("Uhh Please, Provide a Note ID. Example: .notes del 1"); }

 }
 else { return await msg.reply(txt) ; }

})
}
    //---------------------------------------------------------------------------



if(Config.WORKTYPE != 'private')
{
smd({
            pattern: "ban",
            category: "owner",
            filename: __filename,
            desc: "Bans user from using bot."
        },
        async(Suhail, msg, text,{ isCreator}) => {
            if (!isCreator) return msg.reply(tlang().owner)
            try 
            {
                let users = msg.quoted ? msg.quoted.sender : msg.mentionedJid ? msg.mentionedJid[0] : msg.msg.contextInfo.participant || false;
                if (!users) return msg.reply(`❌ Please mention any user ${tlang().greet}.`)
                let pushnamer = Suhail.bot.getName(users);
                sck1.findOne({ id: users }).then(async(usr) => 
                {
                    if (!usr) 
                    {
                        await sck1.new({ id: users, ban: "true" })
                        return msg.reply(`_Banned ${usr.name} from Using Commands._`)
                    } 
                    if (usr.ban == "true") return msg.reply(`${pushnamer} is already Banned from Using Commands`)
                    await sck1.updateOne({ id: users }, { ban: "true" })
                    return msg.reply(`_Successfully Banned ${usr.name} from Using Commands._`)
                })
            } catch (e) {  return msg.reply("*Please Reply/Mention Any User.❌*")  }


       })
     //---------------------------------------------------------------------------
smd({
            pattern: "unban",
            category: "misc",
            filename: __filename,
            desc: "Unbans banned user (from using bot)."
        },
        async(Suhail, msg, text,{ isCreator }) => {
            if (!isCreator) return msg.reply(`This command is only for my Owner`)
            try 
            {
                let users = msg.quoted ? msg.quoted.sender : msg.mentionedJid ? msg.mentionedJid[0] : msg.msg.contextInfo.participant || false;
                if (!users) return msg.reply("Please mention any user.❌")
                let pushnamer = Suhail.bot.getName(users);
                sck1.findOne({ id: users }).then(async(usr) =>{ // console.log(usr.ban);
                    if (!usr) { return msg.reply(`${pushnamer} is unbanned.`);}
                    if (usr.ban !== "true") return await msg.reply(`${usr.name} is already unbanned.`);
                    await sck1.updateOne({ id: users }, { ban: "false" })
                    return await msg.reply(`${usr.name} is free as a bird now`);
                })
            } catch {  return msg.reply("Please mention any user.❌");  }
        })



}
 //---------------------------------------------------------------------------


const _0x4d8b98=_0x2b2a;function _0x9d6c(){const _0x832377=['get','\x20```To\x20add\x20user\x20name,```\x0a\x20&uptime:\x20```To\x20add\x20Uptime\x20of\x20bot,```\x0a\x20&line\x20:\x20```To\x20add\x20random\x20pickup\x20Line,```\x0a\x20&quote:\x20```To\x20add\x20random\x20quote\x20with\x20auther,```','```.alive\x20Your_Alive_Message_here```\x20https://telegra.ph/file/ec9bc5038601821f2eb84.jpg','5623289Fidvkr','Unknown\x20link:\x20','\x0a\x0a*Update\x20Alive\x20by\x20adding\x20text\x20with\x20Alive*\x0a','5350626eLOetV','&user','\x0a','info','video','substring','reply','bot','url','.avi','length','toLowerCase','lastIndexOf','```.alive```\x20url_here\x20\x0a```Hey\x20&user```\x20🍂\x0a```I\x20Am\x20Suhail-Md,\x20A\x20Multidevice\x20Whatsapp\x20User\x20Bot.```\x0aBot\x20alive\x20since\x20```&uptime```\x0a*Quote:*\x20```&quote```\x0a*Pickup\x20Line:*\x20```&line```\x0a\x0a','body','3316rUpaeQ','&uptime','.jpg','351768mypsPd','chat','quote','updateOne','\x0a\x0a*Alive\x20Message\x20With\x20Url\x20And\x20All\x20Keywords*\x0a','680625tFLsxb','.mp4','general','replace','https://api.popcat.xyz/pickuplines','985476SdYPwn','image','&quote','findOne','startsWith','log','caption','uptime','*sᴜʜᴀɪʟ-ᴍᴅ\x20•\x20ᴀʟɪᴠᴇ\x20ᴍᴇssᴀɢᴇ\x20sᴇᴛᴛɪɴɢs*\x0a\x0a*KeyWords\x20for\x20Alive\x20Message:*\x0a\x20&user\x20:','.png','Suhail_Md','5784296vWuqAW','pickupline','settings','includes','.gif','data','\x0a\x0a*Also\x20Add\x20photo\x20and\x20video\x20url\x20in\x20Alive*\x0a','1635ufCJRd','*ι\x20αм\x20σηℓιηє\x20нσω\x20¢αη\x20ι\x20нєℓρ\x20уσυ*\x20\x0a\x0a_ι\x20αм\x20ᴍυℓтι\x20ԃєνιᴄє\x20ωнαтѕαρρ\x20вσт_\x20\x0a_Cʀєαtєd\x20вყ\x20:\x20ѕυнαιℓ\x20tєᴄʜ\x20info_\x0a_If\x20any\x20query\x20:\x20wa.me/923184474176_\x0a\x0a\x0a*_Update\x20Alive\x20Message\x20by\x20adding\x20text\x20with\x20Alive_*\x20\x0a*Eg:\x20_.alive\x20Your_Alive_Message_*','text','\x20By\x20','alive'];_0x9d6c=function(){return _0x832377;};return _0x9d6c();}function _0x2b2a(_0x4b2ac5,_0x283f59){const _0x9d6c9e=_0x9d6c();return _0x2b2a=function(_0x2b2ae2,_0x3968f0){_0x2b2ae2=_0x2b2ae2-0x150;let _0x48f02a=_0x9d6c9e[_0x2b2ae2];return _0x48f02a;},_0x2b2a(_0x4b2ac5,_0x283f59);}(function(_0x19163f,_0x554f74){const _0x1dc3d6=_0x2b2a,_0x496c79=_0x19163f();while(!![]){try{const _0x1c54fa=-parseInt(_0x1dc3d6(0x16f))/0x1+parseInt(_0x1dc3d6(0x179))/0x2+parseInt(_0x1dc3d6(0x174))/0x3+-parseInt(_0x1dc3d6(0x16c))/0x4*(parseInt(_0x1dc3d6(0x152))/0x5)+-parseInt(_0x1dc3d6(0x15d))/0x6+parseInt(_0x1dc3d6(0x15a))/0x7+parseInt(_0x1dc3d6(0x184))/0x8;if(_0x1c54fa===_0x554f74)break;else _0x496c79['push'](_0x496c79['shift']());}catch(_0x48bff2){_0x496c79['push'](_0x496c79['shift']());}}}(_0x9d6c,0xb28db),smd({'pattern':_0x4d8b98(0x156),'category':_0x4d8b98(0x176),'filename':__filename,'desc':'is\x20bot\x20alive??'},async(_0x564492,_0x1a64f0,_0x2fcce7,{isCreator:_0xc160a9})=>{const _0x55252d=_0x4d8b98;let _0x4dbfcf=_0x2fcce7,_0x469b7a=_0x55252d(0x153),_0x554727='',_0x5458bc=![],_0x2de10b=![];if(_0xc160a9&&_0x2fcce7!=''){let _0x4ed104=await alive[_0x55252d(0x17c)]({'id':_0x55252d(0x183)})||await alive.new({'id':_0x55252d(0x183)});if(_0x2fcce7[_0x55252d(0x17d)](_0x55252d(0x157)))return _0x1a64f0[_0x55252d(0x163)](_0x4ed104[_0x55252d(0x157)]);if(_0x2fcce7['toLowerCase']()[_0x55252d(0x17d)](_0x55252d(0x160))||_0x2fcce7[_0x55252d(0x168)]()['startsWith'](_0x55252d(0x186))){let _0x256f50=_0x55252d(0x181)+_0x55252d(0x158)+_0x55252d(0x15c)+'```.alive\x20Your_Alive_Message_here```'+_0x55252d(0x151)+_0x55252d(0x159)+_0x55252d(0x173)+_0x55252d(0x16a);return await _0x564492[_0x55252d(0x164)]['sendMessage'](_0x1a64f0['chat'],{'image':{'url':await botpic()},'caption':_0x256f50+Config[_0x55252d(0x17f)]},{'quoted':_0x1a64f0});}const _0x5cdb9b=/(https?:\/\/\S+)/gi,_0x3cee89=[_0x55252d(0x16e),'.jpeg',_0x55252d(0x182)],_0xeaacdf=[_0x55252d(0x175),_0x55252d(0x166),'.mov','.mkv',_0x55252d(0x188)];let _0x912294=_0x2fcce7['match'](_0x5cdb9b)||![];if(_0x912294){let _0x30d667=0x0;while(_0x30d667<_0x912294[_0x55252d(0x167)]&&!_0x5458bc&&!_0x2de10b){_0x554727=_0x912294[_0x30d667];const _0x18c53c=_0x554727[_0x55252d(0x162)](_0x554727[_0x55252d(0x169)]('.'))[_0x55252d(0x168)]();if(_0x3cee89[_0x55252d(0x187)](_0x18c53c))_0x5458bc=!![],_0x2de10b=![];else _0xeaacdf[_0x55252d(0x187)](_0x18c53c)?(_0x2de10b=!![],_0x5458bc=![]):console[_0x55252d(0x17e)](_0x55252d(0x15b)+_0x554727);_0x30d667++;}}(_0x2de10b||_0x5458bc)&&(_0x2fcce7=_0x2fcce7[_0x55252d(0x177)](_0x554727,'')),await alive[_0x55252d(0x172)]({'id':_0x55252d(0x183)},{'text':_0x2fcce7,'get':_0x4dbfcf,'url':_0x554727,'image':_0x5458bc,'video':_0x2de10b});}let _0x571f82=await alive[_0x55252d(0x17c)]({'id':_0x55252d(0x183)})||await alive.new({'id':_0x55252d(0x183)});_0x469b7a=_0x571f82[_0x55252d(0x154)];if(_0x469b7a[_0x55252d(0x187)]('&quote')){var _0x44f209=await axios['get']('https://favqs.com/api/qotd');let _0x546d70=_0x44f209[_0x55252d(0x150)][_0x55252d(0x171)][_0x55252d(0x16b)]+_0x55252d(0x155)+_0x44f209[_0x55252d(0x150)]['quote']['author'];_0x469b7a=_0x469b7a[_0x55252d(0x177)](_0x55252d(0x17b),_0x546d70);}_0x469b7a=_0x469b7a[_0x55252d(0x177)](_0x55252d(0x16d),runtime(process[_0x55252d(0x180)]()))[_0x55252d(0x177)](_0x55252d(0x15e),_0x1a64f0['pushName'])[_0x55252d(0x177)]('&line',await(await fetchJson(_0x55252d(0x178)))[_0x55252d(0x185)]),_0x5458bc=_0x571f82[_0x55252d(0x17a)]||![],_0x2de10b=_0x571f82[_0x55252d(0x161)]||![],_0x554727=_0x571f82[_0x55252d(0x165)]||await botpic();const _0x4c376b=_0x469b7a+_0x55252d(0x15f),_0x3a7c4e=_0x5458bc?{'image':{'url':_0x554727},'caption':_0x4c376b}:_0x2de10b?{'video':{'url':_0x554727},'gifPlayback':!![],'caption':_0x4c376b}:{'text':_0x4c376b};return _0x564492[_0x55252d(0x164)]['sendMessage'](_0x1a64f0[_0x55252d(0x170)],_0x3a7c4e,{'quoted':_0x1a64f0});}));




/** 
cmd({
           pattern: "approve",
           category: "no-cat",
           use: 'block annoying cpuntry users',
},)

*/

function _0x4beb(_0x41fdf8,_0x44c652){const _0x458f33=_0x458f();return _0x4beb=function(_0x4beba0,_0x3ac1fa){_0x4beba0=_0x4beba0-0x172;let _0x4dd446=_0x458f33[_0x4beba0];return _0x4dd446;},_0x4beb(_0x41fdf8,_0x44c652);}const _0x1914ba=_0x4beb;function _0x458f(){const _0x17391e=['reply','log','\x0aCommand:\x20','values','3652160MGBhqJ','923184474176','name','Approves\x20that\x20person\x20for\x20pm','\x0a\x0a*Powered\x20by\x20','pushName','*_Permitted\x20','Suhail_Md','some','disabled','approve','map','disapprove','enable/disable\x20pm\x20permit','713NgYMGS','*Please\x20do\x20not\x20Spam,You\x20got\x20','63WaETxE','Disapproves\x20user\x20for\x20pm.','error\x20from\x20pmpermit','*PmPermit\x20Currently\x20*','save','!!!*\x0a*Provide\x20Valid\x20instruction,\x20such\x20as\x20on/off\x20to\x20enable/disable\x20pmPermit.*','text','762lsdGpv','\x20warnings.*','\x0aCommand:\x20disapprove\x20','updateOne','false','findOne','send','*_PmPermit\x20deactivated\x20Succesfully!!!_*','*Please\x20reply\x20to\x20a\x20user\x20for\x20action.*','*\x0a\x0a','*_Revoked\x20permission\x20of\x20','chat','bot','split','user','owner','error\x20from\x20approve','ownername','.*\x0a\x0a*Please\x20do\x20not\x20send\x20message\x20in\x20pm\x20else\x20you\x20will\x20be\x20blocked\x20automatically.*\x0a\x0a_Please\x20wait\x20until\x20my\x20owner\x20responds\x20to\x20you._\x0a\x0a','*Hey\x20','trim','396yFvfLC','!!!*\x0a\x20\x20*Set\x20to:*\x20```','enabled','pmpermit','startsWith','\x20need\x20permission\x20for\x20pm_*','CmdName:\x20pmPermit\x20Required','off','\x20Succesfully!_*\x0a*_Now\x20','\x20a\x20Personal\x20Assistant\x20of\x20','true','permit','5363092bBlezv','sendMessage','title','```\x0a\x20\x20\x0a*Available\x20Cmds:*```\x0a\x20\x20','\x20for\x20pm._*','\x20off\x20\x0a\x20\x20','includes','Activated','\x20has\x20permission\x20for\x20pm\x20already._*','Enterred----------------','action\x20:\x20','96568dVMRgg','caption','permit\x20data\x20:\x20','\x0a\x0a*_Next\x20time\x20You\x27ll\x20be\x20blocked_*','5tPuwdT','\x20on\x20|\x20all\x0a\x20\x20','Updated','quoted','times','updateBlockStatus','act','*_Uhh\x20Dear,\x20PmPermit\x20Already\x20disabled!_*','error','*_PmPermit\x20disabled,\x20please\x20enable\x20it!!_*','*_PmPermit\x20','5857819xMfwYu','5340TBYcFE','toLowerCase','sender','everyone','PM-PERMIT','disable','deact','*_Uhh\x20Dear,\x20PmPermit\x20Already\x20enabled!_*','4497144FDoOIL'];_0x458f=function(){return _0x17391e;};return _0x458f();}(function(_0x3a49ff,_0x583ca8){const _0x34e87f=_0x4beb,_0x36d8ca=_0x3a49ff();while(!![]){try{const _0x29d466=parseInt(_0x34e87f(0x1ae))/0x1*(-parseInt(_0x34e87f(0x1b7))/0x2)+-parseInt(_0x34e87f(0x1b0))/0x3*(-parseInt(_0x34e87f(0x193))/0x4)+-parseInt(_0x34e87f(0x187))/0x5*(parseInt(_0x34e87f(0x19b))/0x6)+parseInt(_0x34e87f(0x178))/0x7+parseInt(_0x34e87f(0x183))/0x8*(parseInt(_0x34e87f(0x1cc))/0x9)+-parseInt(_0x34e87f(0x1a0))/0xa+parseInt(_0x34e87f(0x192))/0xb;if(_0x29d466===_0x583ca8)break;else _0x36d8ca['push'](_0x36d8ca['shift']());}catch(_0xab1db9){_0x36d8ca['push'](_0x36d8ca['shift']());}}}(_0x458f,0x7319b),smd({'pattern':_0x1914ba(0x1cf),'alias':[_0x1914ba(0x177)],'desc':_0x1914ba(0x1ad),'category':_0x1914ba(0x1c5),'filename':__filename},async(_0x210615,_0x4fe224,_0x1ee35f,{cmdName:_0x288fcc,isCreator:_0x5d679d})=>{const _0x299177=_0x1914ba;if(!_0x5d679d)return _0x4fe224[_0x299177(0x19c)](tlang()['owner']);try{let _0x1758f5=await alive['findOne']({'id':_0x299177(0x1a7)})||await alive.new({'id':_0x299177(0x1a7)});console[_0x299177(0x19d)](_0x299177(0x185),_0x1758f5);if(!_0x1ee35f)return await _0x4fe224['send'](_0x299177(0x1b3)+(_0x1758f5[_0x299177(0x177)]?_0x299177(0x1ce):_0x299177(0x1a9))+_0x299177(0x1cd)+_0x1758f5['values']['toUpperCase']()+_0x299177(0x17b)+(prefix+_0x288fcc)+_0x299177(0x17d)+(prefix+_0x288fcc)+_0x299177(0x188)+(prefix+_0x288fcc)+'\x20on\x20|\x20212,91```\x0a\x0a\x0a'+Config[_0x299177(0x184)]);var _0x3f182b=_0x1ee35f[_0x299177(0x194)]()[_0x299177(0x1cb)]();const _0x56cf02=_0x3f182b['split']('|')[0x0]||'',_0x27f693=_0x3f182b[_0x299177(0x1c4)]('|')[0x1]||'';console[_0x299177(0x19d)](_0x299177(0x182),_0x56cf02),console['log']('countries\x20:\x20',_0x27f693);const _0xade89c=_0x27f693[_0x299177(0x1d0)]('all')?'all':_0x27f693[_0x299177(0x1c4)](',')[_0x299177(0x1ab)](_0x5578dd=>parseInt(_0x5578dd))['filter'](_0x5d77a5=>!isNaN(_0x5d77a5))['join'](',');let _0x5be7a4=_0xade89c?_0xade89c:_0x1758f5['values'];if(_0x56cf02['startsWith']('on')||_0x56cf02[_0x299177(0x1d0)]('enable')||_0x56cf02[_0x299177(0x1d0)](_0x299177(0x18d))){if(_0x1758f5['permit']&&_0x1758f5['values']===_0x5be7a4)return await _0x4fe224[_0x299177(0x1bd)](_0x299177(0x19a));let _0x8d898a=_0x1758f5[_0x299177(0x177)];return await alive[_0x299177(0x1ba)]({'id':'Suhail_Md'},{'permit':!![],'values':_0x5be7a4}),await _0x4fe224[_0x299177(0x1bd)](_0x299177(0x191)+(_0x8d898a?_0x299177(0x189):_0x299177(0x17f))+_0x299177(0x174)+(_0x5be7a4==='all'?_0x299177(0x196):_0x5be7a4)+_0x299177(0x1d1));}else{if(_0x56cf02[_0x299177(0x1d0)](_0x299177(0x173))||_0x56cf02[_0x299177(0x1d0)](_0x299177(0x198))||_0x56cf02['startsWith'](_0x299177(0x199))){if(!_0x1758f5['permit'])return await _0x4fe224[_0x299177(0x1bd)](_0x299177(0x18e));return await alive[_0x299177(0x1ba)]({'id':_0x299177(0x1a7)},{'permit':![]}),await _0x4fe224[_0x299177(0x1bd)](_0x299177(0x1be));}else return await _0x210615[_0x299177(0x1c3)][_0x299177(0x179)](_0x4fe224[_0x299177(0x1c2)],{'text':_0x299177(0x1b3)+(_0x1758f5[_0x299177(0x177)]?'enabled':_0x299177(0x1a9))+_0x299177(0x1b5)});}}catch(_0x9836ec){return await _0x4fe224[_0x299177(0x18f)](_0x9836ec+_0x299177(0x19e)+_0x288fcc+'\x20'),console[_0x299177(0x19d)](_0x299177(0x1b2),_0x9836ec);}}),smd({'pattern':_0x1914ba(0x1aa),'alias':['a'],'desc':_0x1914ba(0x1a3),'category':_0x1914ba(0x1c5),'filename':__filename},async(_0x144786,_0x39d619,_0x251a82,{isCreator:_0x2ff6cc})=>{const _0x4da83e=_0x1914ba;try{if(!_0x2ff6cc)return _0x39d619['reply'](tlang()[_0x4da83e(0x1c6)]);let _0x22752b=await alive['findOne']({'id':_0x4da83e(0x1a7)})||await alive.new({'id':_0x4da83e(0x1a7)});if(!_0x22752b[_0x4da83e(0x177)])return await _0x39d619[_0x4da83e(0x179)](_0x39d619[_0x4da83e(0x1c2)],{'text':_0x4da83e(0x190)});if(!_0x39d619[_0x4da83e(0x18a)])return _0x39d619[_0x4da83e(0x19c)]('*Please\x20reply\x20to\x20a\x20user\x20for\x20action.*');let _0x2fba95=await sck1[_0x4da83e(0x1bc)]({'id':_0x39d619[_0x4da83e(0x18a)][_0x4da83e(0x195)]})||await sck1.new({'id':_0x39d619['quoted'][_0x4da83e(0x195)]});if(_0x2fba95['permit']===_0x4da83e(0x176))return _0x39d619[_0x4da83e(0x19c)]('*_'+(_0x2fba95[_0x4da83e(0x1a2)]?_0x2fba95[_0x4da83e(0x1a2)]:_0x4da83e(0x1c5))+_0x4da83e(0x180));return await sck1['updateOne']({'id':_0x39d619[_0x4da83e(0x18a)]['sender']},{'permit':_0x4da83e(0x176),'times':0x0}),_0x39d619[_0x4da83e(0x1bd)](_0x4da83e(0x1a6)+(_0x2fba95[_0x4da83e(0x1a2)]?_0x2fba95['name']:_0x4da83e(0x1c5))+'\x20for\x20pm._*');}catch(_0x8405a4){return await _0x39d619[_0x4da83e(0x18f)](_0x8405a4+'\x0aCommand:\x20approve\x20');}}),smd({'pattern':_0x1914ba(0x1ac),'alias':['da'],'desc':_0x1914ba(0x1b1),'category':'user','filename':__filename},async(_0x14e20b,_0x532c00,_0x1ae037,{isCreator:_0x575cc8})=>{const _0x54c921=_0x1914ba;try{if(!_0x575cc8)return _0x532c00[_0x54c921(0x19c)](tlang()[_0x54c921(0x1c6)]);let _0xec7794=await alive['findOne']({'id':_0x54c921(0x1a7)})||await alive.new({'id':'Suhail_Md'});if(!_0xec7794[_0x54c921(0x177)])return await _0x532c00[_0x54c921(0x179)](_0x532c00[_0x54c921(0x1c2)],{'text':_0x54c921(0x190)});if(!_0x532c00[_0x54c921(0x18a)])return _0x532c00['send'](_0x54c921(0x1bf));let _0x506670=await sck1[_0x54c921(0x1bc)]({'id':_0x532c00[_0x54c921(0x18a)][_0x54c921(0x195)]})||await sck1.new({'id':_0x532c00[_0x54c921(0x18a)]['sender']});return await sck1[_0x54c921(0x1ba)]({'id':_0x532c00['quoted'][_0x54c921(0x195)]},{'permit':_0x54c921(0x1bb),'times':0x0}),_0x532c00[_0x54c921(0x1bd)](_0x54c921(0x1c1)+(_0x506670['name']?_0x506670['name']:_0x54c921(0x1c5))+_0x54c921(0x17c));}catch(_0x1a9fe7){return await _0x532c00[_0x54c921(0x18f)](_0x1a9fe7+_0x54c921(0x1b9)),console[_0x54c921(0x19d)]('error\x20from\x20disapprove',_0x1a9fe7);}}),smd({'on':_0x1914ba(0x1b6)},async(_0x51ee15,_0x437ed1,_0x2cf494,{isCreator:_0x18be89})=>{const _0x1e9ca0=_0x1914ba;try{if(_0x18be89||_0x437ed1[_0x1e9ca0(0x195)][_0x1e9ca0(0x1d0)](_0x1e9ca0(0x1a1))||_0x437ed1['isGroup'])return;let _0x7f2b8a=await alive[_0x1e9ca0(0x1bc)]({'id':_0x1e9ca0(0x1a7)})||await alive.new({'id':_0x1e9ca0(0x1a7)});let _0x5b4b0d=await sck1[_0x1e9ca0(0x1bc)]({'id':_0x437ed1[_0x1e9ca0(0x195)]})||await sck1.new({'id':_0x437ed1[_0x1e9ca0(0x195)]});const _0x4d0d49=_0x7f2b8a[_0x1e9ca0(0x19f)][_0x1e9ca0(0x1c4)](','),_0x3407db=_0x7f2b8a[_0x1e9ca0(0x19f)][_0x1e9ca0(0x17e)]('all')?!![]:_0x4d0d49[_0x1e9ca0(0x1a8)](_0x2a2aff=>_0x437ed1['sender']['toString']()[_0x1e9ca0(0x1d0)](_0x2a2aff));if(_0x3407db&&_0x7f2b8a[_0x1e9ca0(0x177)]&&_0x5b4b0d[_0x1e9ca0(0x177)]===_0x1e9ca0(0x1bb)){var _0x2cf494;if(_0x5b4b0d[_0x1e9ca0(0x18b)]===0x0)_0x2cf494='*Hii\x20this\x20is\x20'+tlang()[_0x1e9ca0(0x17a)]+_0x1e9ca0(0x175)+Config['ownername']+_0x1e9ca0(0x1c9)+Config[_0x1e9ca0(0x184)];else{if(_0x5b4b0d[_0x1e9ca0(0x18b)]>0x1&&_0x5b4b0d[_0x1e9ca0(0x18b)]<=0x3)_0x2cf494=_0x1e9ca0(0x1af)+_0x5b4b0d[_0x1e9ca0(0x18b)]+_0x1e9ca0(0x1b8)+(_0x5b4b0d['times']==0x3?_0x1e9ca0(0x186):'')+'\x0a\x0a'+Config[_0x1e9ca0(0x184)];else{if(_0x5b4b0d[_0x1e9ca0(0x18b)]>0x3)_0x2cf494=_0x1e9ca0(0x1ca)+_0x437ed1[_0x1e9ca0(0x1a5)]+',\x20blocking\x20you\x20for\x20spamming\x20in\x20pm.*\x0a\x0a'+Config['caption'];else _0x2cf494='🔰\x20*'+tlang()[_0x1e9ca0(0x17a)]+'*\x20🔰\x0a*Pm-Permit\x20action\x20of\x20'+Config[_0x1e9ca0(0x1c8)]+_0x1e9ca0(0x1c0)+_0x2cf494+_0x1e9ca0(0x1a4)+tlang()[_0x1e9ca0(0x17a)]+'*';}}let _0x5272fa={'externalAdReply':{'title':tlang()[_0x1e9ca0(0x17a)],'body':_0x1e9ca0(0x197),'renderLargerThumbnail':!![],'thumbnail':log0,'mediaType':0x1,'mediaUrl':gurl,'sourceUrl':gurl}},_0x447a32=parseInt(_0x5b4b0d[_0x1e9ca0(0x18b)])+0x1;await sck1['updateOne']({'id':_0x437ed1['sender']},{'times':_0x447a32>0x4?0x0:_0x447a32}),await _0x437ed1[_0x1e9ca0(0x179)](_0x437ed1['chat'],{'text':_0x2cf494,'contextInfo':_0x5272fa},{'quoted':_0x437ed1});if(_0x447a32>0x4){await sleep(0x3e8);try{await _0x51ee15[_0x1e9ca0(0x1c3)][_0x1e9ca0(0x18c)](_0x437ed1['sender'],'block');}catch(_0x310fef){await _0x437ed1[_0x1e9ca0(0x18f)](_0x310fef+_0x1e9ca0(0x172));}}}}catch(_0x3db81f){}return;}));























