const {cmd,fetchJson, getBuffer, Config } = require('../lib')
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