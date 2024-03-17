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




const Config = require('../config')
let { fancytext,sendGImages, lang, tiny, runtime, formatp, botpic, prefix, sck1, smd, } = require("../lib");
const axios = require('axios');
const fetch = require('node-fetch');
const { Anime, Manga } = require("@shineiichijo/marika");
const {  fetchJson, getBuffer} = require('../lib/')





async function sendAnime(Aviator,msg ,cmd , text='') {
function _0x232f(){const _0x59aa77=['Naruto','\x0a*More\x20on✨:*\x20','map','1736295xNxVMd','get','json','\x0a*Created\x20On☘️:*\x20','https://api.waifu.pics/sfw/','articles','sendMessage','https://api.waifu.pics/nsfw/','split','animenews','foxgirl','12896280WdEPAA','chat','log','url','publishedAt','/video.json','https://nekos.life/api/v2/img/fox_girl','floor','result','waifu','nsfw','\x0a\x0a*Content🧩:*\x20','trap','author','neko','loli','length','4267560Bkglyi','2301172sMBiSS','demon','12uzEKTO','title','naruto','data','./commands/Anime.js/sendAnime()\x0a','source','102969imHSeo','bot','1786770BYzQsB','megumin','*Title🔰:*\x20',',Here\x20we\x20go😊!!!!*','10vterwW','1894515XGwMrc','https://newsapi.org/v2/everything?q=','error','\x0a*Author📌:*\x20'];_0x232f=function(){return _0x59aa77;};return _0x232f();}const _0x444dea=_0x15b8;(function(_0x113be9,_0x51d416){const _0x5ab848=_0x15b8,_0x4134fc=_0x113be9();while(!![]){try{const _0x3dee47=-parseInt(_0x5ab848(0x14c))/0x1*(-parseInt(_0x5ab848(0x152))/0x2)+-parseInt(_0x5ab848(0x15a))/0x3+parseInt(_0x5ab848(0x144))/0x4+parseInt(_0x5ab848(0x14e))/0x5*(-parseInt(_0x5ab848(0x146))/0x6)+-parseInt(_0x5ab848(0x153))/0x7+-parseInt(_0x5ab848(0x143))/0x8+parseInt(_0x5ab848(0x165))/0x9;if(_0x3dee47===_0x51d416)break;else _0x4134fc['push'](_0x4134fc['shift']());}catch(_0xcf12ae){_0x4134fc['push'](_0x4134fc['shift']());}}}(_0x232f,0x67e17));function _0x15b8(_0x396f04,_0x495ae7){const _0x232fdd=_0x232f();return _0x15b8=function(_0x15b879,_0x194ad6){_0x15b879=_0x15b879-0x143;let _0x160cd1=_0x232fdd[_0x15b879];return _0x160cd1;},_0x15b8(_0x396f04,_0x495ae7);}try{if(cmd===_0x444dea(0x16e)||cmd===_0x444dea(0x173)||cmd===_0x444dea(0x14f)){let name1=text['split']('|')[0x0]||'',name2=text[_0x444dea(0x162)]('|')[0x1]||'1',cap=text[_0x444dea(0x162)]('|')[0x1]?'':'\x20*'+cmd+_0x444dea(0x151),url=name1==_0x444dea(0x16f)?_0x444dea(0x161)+(cmd==='megumin'?_0x444dea(0x171):_0x444dea(0x16e)):_0x444dea(0x15e)+cmd;for(let i=0x0;i<name2;i++){let res=await(await fetch(url))[_0x444dea(0x15c)]();await Aviator['bot']['sendMessage'](msg[_0x444dea(0x166)],{'image':{'url':res['url']},'caption':cap},{'quoted':msg});}}else{if(cmd===_0x444dea(0x174)||cmd===_0x444dea(0x164)){let url=cmd===_0x444dea(0x174)?'https://waifu.pics/api/sfw/shinobu':_0x444dea(0x16b),res=await axios[_0x444dea(0x15b)](url);await Aviator[_0x444dea(0x14d)][_0x444dea(0x160)](msg[_0x444dea(0x166)],{'image':{'url':res[_0x444dea(0x149)][_0x444dea(0x168)]}},{'quoted':msg});}else{if(cmd===_0x444dea(0x145)||cmd===_0x444dea(0x148)){let url='https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/'+(cmd==='demon'?'Demonslayer':_0x444dea(0x157))+_0x444dea(0x16a);const res=await fetchJson(url),urls=res['result'][Math[_0x444dea(0x16c)](Math['random']()*res[_0x444dea(0x16d)][_0x444dea(0x175)])]['url'];await Aviator[_0x444dea(0x14d)][_0x444dea(0x160)](msg[_0x444dea(0x166)],{'video':{'url':urls},'caption':'*Here\x20we\x20go😊!!!!*'});}else{if(cmd===_0x444dea(0x163)){let response=await axios['get'](_0x444dea(0x154)+text+'&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com&language=en&sortby=publishedat&apikey=cd4116be09ef4a0caceedf21b6258460&pageSize=8'),result=response[_0x444dea(0x149)][_0x444dea(0x15f)];result[_0x444dea(0x159)](async(_0xce837b,_0x1e9dc2)=>{const _0x518afb=_0x444dea;try{Aviator['bot']['sendMessage'](msg[_0x518afb(0x166)],{'image':{'url':_0xce837b['urlToImage']},'caption':_0x518afb(0x150)+_0xce837b[_0x518afb(0x147)]+_0x518afb(0x170)+_0xce837b['content']+_0x518afb(0x156)+_0xce837b[_0x518afb(0x172)]+'\x0a*Source♦️:*\x20'+_0xce837b[_0x518afb(0x14b)]['name']+_0x518afb(0x15d)+_0xce837b[_0x518afb(0x169)]+_0x518afb(0x158)+_0xce837b[_0x518afb(0x168)]+'\x0a\x0a'+Config['caption']+'*'},{'quoted':msg});}catch(_0x19b94c){}});}}}}}catch(_0xed8aa3){console[_0x444dea(0x167)](_0x444dea(0x14a),_0xed8aa3),await msg[_0x444dea(0x155)](_0xed8aa3);}
}


//-----------------------------------------------------------------------



//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
smd({pattern: "waifu",desc: "To get Waifu Random Pics",category: "Anime Pics",filename: __filename },async(Suhail, msg, text , {cmdName}) => { console.log("Cmd : " , cmdName);   return await sendAnime(Suhail,msg ,'waifu' , text);});
//-----------------------------------------------------------------------
smd({pattern: "neko", category: "Anime Pics",desc: "Sends a Neko Image in chat",filename: __filename },async(Suhail, msg, text , {cmdName}) => { return await sendAnime(Suhail,msg ,'neko' , text);});
//-----------------------------------------------------------------------
smd({ pattern: "megumin",desc: "To get Waifu Random Pics",category: "Anime Pics",filename: __filename },async(Suhail, msg, text , {cmdName}) => { return await sendAnime(Suhail,msg ,'megumin' , text);});
//-----------------------------------------------------------------------
smd({ pattern: "loli",category: "Anime Pics",filename: __filename,desc: "Sends image of loli."},async(Suhail, msg) => {  return await sendAnime(Suhail,msg ,'loli',);});
//-----------------------------------------------------------------------
smd({pattern: "foxgirl",category: "Anime Pics",desc: "Sends image of Fox Girl Anime.", filename: __filename},async(Suhail, msg) => {  return await sendAnime(Suhail,msg ,'foxgirl',); });
//-----------------------------------------------------------------------
smd({pattern: "demon",alias : ["ds"],desc: "To get Naruto Random Videos",category: "Anime Pics",filename: __filename},async(Suhail, msg) => {  return await sendAnime(Suhail,msg ,'demon',); });
//------------------------------------------------------------------------
smd({pattern: "naruto",desc: "To get Naruto Random Videos",category: "Anime Pics",filename: __filename},async(Suhail, msg) => {  return await sendAnime(Suhail,msg ,'naruto',); });
//-------------------------------------------------------------------------
smd({pattern: "pokepic",category: "Anime Pics",filename: __filename,desc: "Sends image of pokemon."},async(Suhail, msg, text) => { return await sendGImages(msg ,text+"Pokemon Pics only HD ", `*---「 Poke Pic 」---*`, text );});
//-------------------------------------------------------------------------
smd({pattern: "animepic",category: "Anime Pics",filename: __filename,desc: "Anime images"},async(Suhail, msg, text) => { return await sendGImages(msg ,text+"Anime Pics HD", `*-----「 Anime Image 」-----*`, text );});
//-----------------------------------------------------------------------
smd({ pattern: "animewall",category: "Anime Pics",desc: "Anime Wallpaper Random",filename: __filename},async(Suhail, msg, text) => {return await sendGImages(msg ,text+"anime wallpaper for desktop full hd", `*---「 Anime Wallpaper 」---*` , text );});
//-----------------------------------------------------------------------
let qq = ["Anime News Today","New Anime","Uocoming Anime News","New Anime Info","Whats news in Anime","Anime Series","Manga News today","Anime New News","Anime News today",];smd({ pattern: "animenews",category: "Anime Pics", desc: "Sends Anime News in chat",filename: __filename},async(Suhail,msg,text,{cmdName}) => {let q1=qq[Math.floor(Math.random()*qq.length)]+text;return await sendAnime(Suhail,msg,cmdName, q1);});
//---------------------------------------------------------------------------
smd({pattern: "pokemon",category: "Anime Pics", filename: __filename, desc: "Sends info of pokemon in current chat."},async(Suhail, msg, text) => { if(!text) return msg.reply("*Uhh Please Give Me Poki Name/num*");try {let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`);if (!data.name) return msg.reply(`❌ Could not found any pokemon with that name`);let poinfo = `*•Name: ${data.name}*\n*•Pokedex ID: ${data.id}*\n*•Height: ${data.height}*\n*•Weight: ${data.weight}*\n*•Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}*\n*•Base Experience: ${data.base_experience}*\n*•Type: ${data.types[0].type.name}*\n*•Base Stat: ${data.stats[0].base_stat}*\n*•Attack: ${data.stats[1].base_stat}*\n*•Defense: ${data.stats[2].base_stat}*\n*•Special Attack: ${data.stats[3].base_stat}*\n*•Special Defense:${data.stats[4].base_stat}*\n*•Speed: ${data.stats[5].base_stat}*\n`;return await Suhail.bot.sendMessage(msg.chat, { image: { url: data.sprites.front_default }, caption: poinfo }, { quoted: msg });} catch (err) {  msg.reply("*_Ahh,Couldn't found any pokemon._*") }})
//---------------------------------------------------------------------------




smd({
    pattern: "manga",
    category: "Anime Pics",
    filename: __filename,
    desc: "Sends info about asked manga."
},
async(Suhail, msg, text) => {
    if (!text) return msg.reply(`Which Manga do you want to Search? \n _Please give me a name._`);
    const { Manga } = require("@shineiichijo/marika");
    const manga = new Manga();
    let srh = await manga.searchManga(text);
    let mang = `*🎀Title: ${srh.data[0].title}*\n`;
    mang += `*📈Status: ${srh.data[0].status}*\n`;
    mang += `*🌸Total Volumes: ${srh.data[0].volumes}*\n`;
    mang += `*🎗Total Chapters: ${srh.data[0].chapters}*\n`;
    mang += `*🧧Genres:*\n`;
    for (let i = 0; i < srh.data[0].genres.length; i++) {  mang += `\t\t\t\t\t\t\t\t*${srh.data[0].genres[i].name}*\n`; }
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
    Suhail.bot.sendMessage(msg.chat, {  image: {  url: srh.data[0].images.jpg.large_image_url,  }, caption: mang, }, {  quoted: msg,  });

}
)
//----------------------------------------------------------------------------
smd({
    pattern: "anime",
    category: "Anime Pics",
    desc: "Searches Info about Anime and Provides result."
},
async(Suhail, msg, text) => {
    if (!text) return msg.reply(`Which Anime do you want to search?\n _Please give me a name._`);
    const client = new Anime();
    let anime = await client.searchAnime(text);
    let result = anime.data[0];
    //console.log(result);
    let details = `🎀Title: ${result.title}\n`;
    details += `🎋Format: ${result.type}\n`;
    details += `*📈Status: ${result.status.toUpperCase().replace(/\_/g, " ")}*\n`;
    details += `🍥Total episodes: ${result.episodes}\n`;
    details += `🎈Duration: ${result.duration}\n`;
    details += `🧧Genres:\n`;
    for (let i = 0; i < result.genres.length; i++) {  details += `\t\t\t\t\t\t\t\t*${result.genres[i].name}*\n`; }
    details += `✨Based on: ${result.source.toUpperCase()}\n`;
    details += `📍Studio:\n`;
    for (let i = 0; i < result.studios.length; i++) { details += `\t\t\t\t\t\t\t\t*${result.studios[i].name}*\n`;}
    details += `🎴Producers:\n`;
    for (let i = 0; i < result.producers.length; i++) {   details += `\t\t\t\t\t\t\t\t\t\t*${result.producers[i].name}*\n`; }
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

 Suhail.bot.sendMessage( msg.chat, { image: {  url: result.images.jpg.large_image_url, }, caption: details, }, { quoted: msg,});
}
   )
//---------------------------------------------------------------------------


