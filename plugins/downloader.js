const {
   tlang,
   ringtone,
   smd,
   fetchJson,
   Insta,
   getRandom,
   tiny,
   fancytext,
   yt,
   sleep,
   botpic,
   getBuffer,
   smdBuffer,
   pinterest,
   prefix,
   Config,
   mediafire,
   GDriveDl
 } = require("../lib");
 const {
   search,
   download
 } = require("aptoide-scraper");
 const googleTTS = require("google-tts-api");
 const ytdl = require("ytdl-secktor");
 const yts = require("secktor-pack");
 const cheerio = require("cheerio");
 const fs = require("fs-extra");
 const axios = require("axios");
 const fetch = require("node-fetch");
 var videotime = 7000;
 var dlsize = 400;
 const {
   cmd
 } = require("../lib/plugins");
 smd({
   pattern: "tgs",
   desc: "Downloads telegram stickers.",
   category: "downloader",
   filename: __filename,
   use: "<add sticker url.>"
 }, async (_0x5f1cf5, _0x247d2f) => {
   try {
     if (!_0x247d2f) {
       return await _0x5f1cf5.reply("_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently");
     }
     if (!_0x247d2f.includes("addstickers")) {
       return await _0x5f1cf5.reply("_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal");
     }
     let _0x562776 = _0x247d2f.split("|")[0];
     let _0x1ab3b1 = _0x562776.split("/addstickers/")[1];
     let {
       result: _0x1617a8
     } = await fetchJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x1ab3b1) + " ");
     let _0x16baba = _0x247d2f.split("|")[1] || "";
     let _0x147d3f = "Total stickers: " + _0x1617a8.stickers.length + "\n*Estimated complete in:* " + _0x1617a8.stickers.length * 1.5 + " seconds\nKeep in mind that there is a chance of a ban if used frequently";
     if (_0x1617a8.is_animated) {
       return await _0x5f1cf5.reply("Animated stickers are not supported");
     } else if (_0x16baba.startsWith("info")) {
       return await _0x5f1cf5.reply(_0x147d3f);
     }
     let _0x11903f = parseInt(_0x16baba.split(",")[0]) || 10;
     let _0x2fb745 = parseInt(_0x16baba.split(",")[1]) || 0;
     let _0x55ac36 = _0x16baba.split(";")[1] || "Sticker";
     let _0x383601 = true;
     if (_0x55ac36.includes("photo")) {
       _0x383601 = false;
       _0x55ac36 = "Photo";
     }
     if (_0x11903f > _0x1617a8.stickers.length) {
       _0x11903f = _0x1617a8.stickers.length;
     }
     if (_0x2fb745 > _0x1617a8.stickers.length) {
       _0x2fb745 = _0x1617a8.stickers.length - 5;
     }
     if (_0x2fb745 > _0x11903f) {
       let _0x2f888f = _0x11903f;
       _0x11903f = _0x2fb745;
       _0x2fb745 = _0x2f888f;
     }
     await _0x5f1cf5.reply(_0x147d3f + "\n\n_Downloading as " + _0x55ac36 + " From index *" + _0x2fb745 + "* to *" + _0x11903f + "*._\nIf you wants more to download then use Like \n\n .tgs " + _0x562776 + " |  10 ,  20 ; photo");
     for (_0x2fb745; _0x2fb745 < _0x11903f; _0x2fb745++) {
       let _0x4d9ac7 = await fetchJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x1617a8.stickers[_0x2fb745].file_id);
       let _0x4334f3 = "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x4d9ac7.result.file_path;
       if (_0x383601) {
         let _0x23f86b = await getBuffer(_0x4334f3);
         await _0x5f1cf5.reply(_0x23f86b, {
           packname: Config.packname,
           author: "Suhail-Md"
         }, "sticker");
       } else {
         await _0x5f1cf5.bot.sendMessage(_0x5f1cf5.chat, {
           image: {
             url: _0x4334f3
           },
           caption: "*_Telegram Sticker At Index " + (_0x2fb745 + 1) + " Downloaded_*"
         });
       }
     }
   } catch (_0x513743) {
     await _0x5f1cf5.error(_0x513743 + "\n\ncommand: tgs", _0x513743, "*_Error Sending telegram stickers!!!_*");
   }
 });
 smd({
   pattern: "ig",
   desc: "download instagram post.",
   category: "downloader",
   filename: __filename
 }, async (_0x114414, _0x3076a7) => {
   try {
     if (!_0x3076a7) {
       return _0x114414.reply("Need post url.");
     }
     let _0x432eb6 = await Insta(_0x3076a7);
     if (!_0x432eb6) {
       return _0x114414.send("*_Video not found, Sorry!_*");
     }
     for (let _0x2d5b0a = 0; _0x2d5b0a < _0x432eb6.length; _0x2d5b0a++) {
       await _0x114414.bot.sendFileUrl(_0x114414.chat, _0x432eb6[_0x2d5b0a], "*Downloaded Media from instagram.*" + Config.caption, _0x114414);
     }
   } catch (_0x2e175e) {
     await _0x114414.error(_0x2e175e + "\n\ncommand: ig", _0x2e175e, "*_Error Sending instagram post!!!_*");
   }
 });
 smd({
   pattern: "insta",
   desc: "Downloads Instagram videos.",
   category: "downloader",
   filename: __filename,
   use: "<add fb url.>"
 }, async (_0x1bbbfe, _0x109f83) => {
   try {
     if (!_0x109f83 || !_0x109f83.startsWith("https://")) {
       return await _0x1bbbfe.send("*_Please Give me Insta Video Url_*\n*Example _" + prefix + "insta2 https://www.instagram.com/reel/Cmvj5aWJE56/?utm_source=ig_web_copy_link_*");
     }
     const {
       instagram: _0x31f23d
     } = require("mumaker");
     let _0x1c924c = await _0x31f23d(_0x109f83);
     if (!_0x1c924c) {
       return _0x1bbbfe.send("*_Video not found, Sorry!_*");
     }
     for (let _0x5d0f7e = 0; _0x5d0f7e < _0x1c924c.length; _0x5d0f7e++) {
       await _0x1bbbfe.bot.sendFileUrl(_0x1bbbfe.chat, _0x1c924c[_0x5d0f7e], Config.caption, _0x1bbbfe);
     }
   } catch (_0xe66ede) {
     await _0x1bbbfe.error(_0xe66ede + "\n\ncommand: insta", _0xe66ede, "*_Error Sending instagram post!!!_*");
   }
 });
 smd({
   pattern: "wikimedia",
   desc: "Downloads wikimedia images.",
   category: "downloader",
   filename: __filename,
   use: "<text|search.>"
 }, async (_0x5d8a37, _0x2e59d5) => {
   try {
     if (!_0x2e59d5) {
       return await _0x5d8a37.send("*_Please Give me search query!_*");
     }
     let {
       wikimedia: _0x488acb
     } = require("../lib");
     let _0x5da088 = (await _0x488acb(_0x2e59d5)) || [];
     if (!_0x5da088 || !_0x5da088[0]) {
       return await _0x5d8a37.send("*_No Results Found!_*");
     }
     let _0x5e1991 = _0x5d8a37.iscreator && _0x2e59d5.split("|")[1] === "all" ? _0x5da088.length : _0x5da088.length > 5 ? 5 : _0x5da088.length;
     for (let _0x1f04d6 = 0; _0x1f04d6 < _0x5e1991; _0x1f04d6++) {
       try {
         _0x5d8a37.bot.sendFromUrl(_0x5d8a37.from, _0x5da088[_0x1f04d6].image, "Title: " + _0x5da088[_0x1f04d6].title + "\n*Source:* " + _0x5da088[_0x1f04d6].source, _0x5d8a37, {}, "image");
       } catch {}
     }
   } catch (_0x3ef5be) {
     await _0x5d8a37.error(_0x3ef5be + "\n\ncommand: insta", _0x3ef5be);
   }
 });
 smd({
   pattern: "facebook",
   alias: ["fb", "fbdl"],
   desc: "Downloads fb videos.",
   category: "downloader",
   filename: __filename,
   use: "<add fb url.>"
 }, async (_0x1d03c5, _0x18eb67) => {
   try {
     if (!_0x18eb67 || !_0x18eb67.startsWith("https://")) {
       return await _0x1d03c5.send("*_Please Give me Facebook Video Url_*\n*Example _" + prefix + "fb https://www.facebook.com/watch/?v=2018727118289093_*");
     }
     const _0x22a3d8 = require("mumaker");
     let _0x34f970 = await _0x22a3d8.facebook(text);
     return await _0x1d03c5.bot.sendMessage(_0x1d03c5.chat, {
       video: {
         url: _0x34f970.urls[0].url
       },
       caption: Config.caption
     }, {
       quoted: _0x1d03c5
     });
   } catch (_0x3a5b0c) {
     await _0x1d03c5.error(_0x3a5b0c + "\n\ncommand: tgs", _0x3a5b0c, "*_video not Found!!!_*");
   }
 });
 smd({
   pattern: "apk",
   desc: "Downloads apks  .",
   category: "downloader",
   filename: __filename,
   use: "<add sticker url.>"
 }, async (_0x160c25, _0x19e775) => {
   try {
     if (!_0x19e775) {
       return _0x160c25.reply("*_Uhh dear, Give me App Name!_*");
     }
     let _0x5f3049 = await search(_0x19e775);
     let _0x53f338 = {};
     if (_0x5f3049.length) {
       _0x53f338 = await download(_0x5f3049[0].id);
     } else {
       return _0x160c25.reply("*_Apk not found, Try another name!!_*");
     }
     console.log(_0x5f3049[0]);
     const _0xbd1e11 = parseInt(_0x53f338.size);
     if (_0xbd1e11 > 100) {
       return _0x160c25.reply("❌ File size bigger than 150mb.");
     }
     const _0x2b9db4 = _0x53f338.dllink;
     let _0x38ca01 = await fancytext("『 *ᗩᑭᏦ ᗞᝪᗯᑎしᝪᗩᗞᗴᖇ* 』\n\n*APP Name :* " + _0x53f338.name + "\n*App Id :* " + _0x53f338.package + "\n*Last Up :* " + _0x53f338.lastup + "\n*App Size :* " + _0x53f338.size + "\n\n\n " + Config.caption, 26);
     const _0x5954cb = (_0x53f338?.name || "Downloader") + ".apk";
     const _0x38929d = "temp/" + _0x5954cb;
     axios.get(_0x2b9db4, {
       responseType: "stream"
     }).then(_0x145941 => {
       const _0x5185fb = fs.createWriteStream(_0x38929d);
       _0x145941.data.pipe(_0x5185fb);
       return new Promise((_0x3f7b18, _0x9a0287) => {
         _0x5185fb.on("finish", _0x3f7b18);
         _0x5185fb.on("error", _0x9a0287);
       });
     }).then(() => {
       let _0x4fd850 = {
         document: fs.readFileSync(_0x38929d),
         mimetype: "application/vnd.android.package-archive",
         fileName: _0x5954cb,
         caption: _0x38ca01
       };
       _0x160c25.bot.sendMessage(_0x160c25.jid, _0x4fd850, {
         quoted: _0x160c25
       });
       try {
         fs.unlink(_0x38929d);
       } catch {}
     }).catch(_0x1ffdfa => {
       try {
         fs.unlink(_0x38929d);
       } catch {}
       ;
       _0x160c25.reply("*_Apk not Found, Sorry_*");
     });
   } catch (_0x1bd957) {
     await _0x160c25.error(_0x1bd957 + "\n\ncommand: apk", _0x1bd957);
   }
 });
 cmd({
   pattern: "apks",
   desc: "Search App",
   category: "downloader",
   filename: __filename,
   use: "<Search Query>"
 }, async (_0x62730a, _0x36a86e) => {
   try {
     if (!_0x36a86e) {
       return await _0x62730a.reply("*_Uhh pLease, give me app name!_*");
     }
     const _0xd5dec3 = await search(_0x36a86e);
     if (_0xd5dec3.length) {
       let _0x5793f7 = await download(_0xd5dec3[0].id);
       let _0x191ca4 = "*ᴀsᴛᴀ-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ* \n*________________________________* \n\n*_Reply Any Number To Download._*\n_Results For : " + _0x36a86e + "_ \n";
       for (let _0x44960f = 0; _0x44960f < _0xd5dec3.length; _0x44960f++) {
         _0x191ca4 += "\n*" + (_0x44960f + 1) + " : " + _0xd5dec3[_0x44960f].name + "* \n*Id : " + _0xd5dec3[_0x44960f].id + "* \n";
       }
       return await _0x62730a.sendMessage(_0x62730a.chat, {
         image: {
           url: _0x5793f7.icon
         },
         caption: _0x191ca4
       }, {
         quoted: _0x62730a
       });
     } else {
       return _0x62730a.reply("*_APP not Found, Try Other Name_*");
     }
   } catch (_0x3dac7d) {
     _0x62730a.error(_0x3dac7d + "\n\ncommand: apks", _0x3dac7d);
   }
 });
 smd({
   pattern: "gdrive",
   desc: "Downloads telegram stickers.",
   category: "downloader",
   filename: __filename,
   use: "<add sticker url.>"
 }, async (_0x229dbd, _0x5ca180) => {
   try {
     if (!_0x5ca180 && !_0x5ca180.match(/drive\.google/i)) {
       _0x229dbd.reply("Uhh Please, Give me Valid Google Drive Url");
     }
     let _0x273d81 = (_0x5ca180.match(/\/?id=(.+)/i) || _0x5ca180.match(/\/d\/(.*?)\//))[1];
     if (!_0x273d81) {
       return _0x229dbd.reply("ID Not Found");
     }
     GDriveDl(_0x273d81).then(async _0x38aa96 => {
       let _0x3fcea9 = "*File Name :* " + _0x38aa96.fileName;
       _0x3fcea9 += "\n*File Size :* " + _0x38aa96.size + "Mb";
       _0x3fcea9 += "\n*File Type :* " + _0x38aa96.mimetype.split("/")[1] + "\n\n" + Config.caption;
       let _0x1ffe4d = {
         document: {
           url: _0x38aa96.downloadUrl
         },
         fileName: _0x38aa96.fileName,
         mimetype: _0x38aa96.mimetype,
         caption: await fancytext("『 *GOOGLE DRIVE DOWNLOADER* 』 \n\n " + _0x3fcea9, 26)
       };
       return await _0x229dbd.bot.sendMessage(_0x229dbd.chat, _0x1ffe4d, {
         quoted: _0x229dbd
       });
     });
   } catch (_0x4b7c05) {
     return _0x229dbd.error(_0x4b7c05 + "\n\ncommand: gdrive", _0x4b7c05, "*_File not found!!!_*");
   }
 });
 smd({
   pattern: "gitclone",
   desc: "Downloads apks  .",
   category: "downloader",
   filename: __filename,
   use: "<add sticker url.>"
 }, async (_0x4943bf, _0x2c3bb8) => {
   try {
     let _0x5ae056 = _0x2c3bb8 ? _0x2c3bb8 : _0x4943bf.reply_message ? _0x4943bf.reply_message.text : "";
     if (!_0x2c3bb8) {
       return await _0x4943bf.reply("*Provide Repo Url, Ex:- _.gitclone https://github.com/SuhailTechInfo/Secktor-bot_*");
     }
     const _0x1825f6 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
     if (!_0x1825f6.test(_0x2c3bb8)) {
       return await _0x4943bf.reply("*Uhh Please, Provide Valid Repositry Url*");
     }
     let [_0x4d854f, _0x5bff1c, _0xbefc3] = _0x2c3bb8.match(_0x1825f6) || [];
     _0xbefc3 = _0xbefc3.replace(/.git$/, "");
     let _0x525397 = "https://api.github.com/repos/" + _0x5bff1c + "/" + _0xbefc3 + "/zipball";
     let _0x1b3aa4 = (await fetch(_0x525397, {
       method: "HEAD"
     })).headers.get("content-disposition").match(/attachment; filename=(.*)/)[1];
     await _0x4943bf.bot.sendMessage(_0x4943bf.jid, {
       document: {
         url: _0x525397
       },
       fileName: _0x1b3aa4,
       mimetype: "application/zip"
     });
   } catch (_0x5d9c73) {
     return _0x4943bf.error(_0x5d9c73 + "\n\ncommand: gitclone", _0x5d9c73, "*_File not found!!!_*");
   }
 });
 const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
 smd({
   pattern: "tts",
   desc: "text to speech.",
   category: "downloader",
   filename: __filename,
   use: "<Hii,this is Suhail>"
 }, async (_0xd5e7a3, _0x2242c4) => {
   try {
     let _0x1d0435 = _0xd5e7a3.reply_text ? _0xd5e7a3.reply_text : _0x2242c4;
     if (!_0x1d0435) {
       return _0xd5e7a3.reply("*_Example : .tts Hi,I am Suhail-Md whatsapp bot._*");
     }
     let _0x4113f0 = _0x2242c4 ? _0x2242c4.split(" ")[0].toLowerCase() : "en";
     const _0x5c0224 = googleTTS.getAudioUrl(_0x1d0435, {
       lang: _0x4113f0,
       slow: true,
       host: "https://translate.google.com"
     });
     await _0xd5e7a3.bot.sendMessage(_0xd5e7a3.jid, {
       audio: {
         url: _0x5c0224
       },
       mimetype: "audio/mpeg",
       ptt: true,
       fileName: "Suhail-Md-tts.m4a"
     }, {
       quoted: _0xd5e7a3
     });
   } catch (_0x41c91a) {
     return _0xd5e7a3.error(_0x41c91a + "\n\ncommand: tts", _0x41c91a);
   }
 });
 smd({
   pattern: "downmp4",
   alias: ["mp4down", "mp4fromurl"],
   desc: "download mp4 from url.",
   category: "downloader",
   use: "<url>",
   filename: __filename
 }, async (_0x3e3ada, _0x5000a7) => {
   try {
     let _0x4ecb0e = (_0x5000a7 ? _0x5000a7 : _0x3e3ada.reply_text)?.toLowerCase()?.trim();
     ;
     if (!_0x4ecb0e || !_0x4ecb0e.startsWith()) {
       return _0x3e3ada.reply("*_give me Video Link ?_*");
     }
     await _0x3e3ada.bot.sendMessage(_0x3e3ada.chat, {
       video: {
         url: _0x4ecb0e.split(" ")[0]
       },
       caption: "*HERE WE GO*",
       contextInfo: {
         ...(await _0x3e3ada.bot.contextInfo(Config.botname, _0x3e3ada.senderName))
       }
     }, {
       quoted: _0x3e3ada
     });
   } catch (_0x47003d) {
     await _0x3e3ada.error(_0x47003d + "\n\ncommand : downmp4", _0x47003d, "*_Please, Give me valid video url!_*");
   }
 });
 smd({
   pattern: "video",
   desc: "Downloads video from yt.",
   category: "downloader",
   filename: __filename,
   use: "<faded-Alan Walker>"
 }, async (_0xa43c65, _0x216a38) => {
   let _0x5623a6 = _0x216a38 ? _0x216a38 : _0xa43c65.reply_text;
   if (!_0x5623a6) {
     return _0xa43c65.reply("Example : " + prefix + "video Back in black");
   }
   let _0x23aeb4 = ytIdRegex.exec(_0x216a38) || [];
   let _0x1db0b1 = _0x23aeb4[0] || false;
   try {
     if (!_0x1db0b1) {
       let _0x4482be = await yts(_0x5623a6);
       let _0x4db7fd = _0x4482be.videos[0];
       _0x1db0b1 = _0x4db7fd.url;
       _0x23aeb4 = ytIdRegex.exec(_0x1db0b1);
     }
   } catch {}
   try {
     let _0x18466a = await ytdl.getInfo(_0x1db0b1);
     let _0x5de460 = Math.floor(i.timestamp * 60);
     if (_0x5de460 >= videotime) {
       return await _0xa43c65.reply("*_Can't dowanload, video file too big_*");
     }
     let _0x404804 = _0x18466a.videoDetails.title;
     let _0x66931d = "./temp/" + _0x23aeb4[1] + ".mp4";
     const _0xa054a6 = ytdl(_0x1db0b1, {
       filter: _0x1e82dc => _0x1e82dc.itag == 22 || _0x1e82dc.itag == 18
     }).pipe(fs.createWriteStream(_0x66931d));
     await new Promise((_0x218eff, _0x1d7df6) => {
       _0xa054a6.on("error", _0x1d7df6);
       _0xa054a6.on("finish", _0x218eff);
     });
     var _0x5113a1 = {
       ...(await _0xa43c65.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
     };
     let _0x259704 = {
       video: fs.readFileSync(_0x66931d),
       mimetype: "video/mp4",
       caption: Config.caption,
       contextInfo: _0x5113a1
     };
     await _0xa43c65.bot.sendMessage(_0xa43c65.jid, _0x259704, {
       quoted: _0xa43c65
     });
     try {
       fs.unlinkSync(_0x66931d);
     } catch {}
     ;
   } catch (_0xe54725) {
     console.log("ytdl Download video error:", _0xe54725);
     try {
       let _0x11d4ce = await yt.getInfo(_0x23aeb4[1]);
       if (_0x11d4ce.duration >= videotime) {
         return await _0xa43c65.reply("*_Can't dowanload, video file too big_*");
       }
       let _0x1fcd10 = await yt.download(_0x23aeb4[1]);
       var _0x5113a1 = {
         ...(await _0xa43c65.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
       };
       if (_0x1fcd10) {
         await _0xa43c65.bot.sendMessage(_0xa43c65.chat, {
           video: {
             url: _0x1fcd10
           },
           caption: Config.caption,
           mimetype: "video/mp4",
           contextInfo: _0x5113a1
         });
       } else {
         await _0xa43c65.send("Video not Found");
       }
       try {
         fs.unlinkSync("" + _0x1fcd10);
       } catch {}
     } catch (_0x1f231c) {
       return _0xa43c65.error(_0x1f231c + "\n\ncommand: video", _0x1f231c, "*_Video not Found_*");
     }
   }
 });
 smd({
   pattern: "video2",
   desc: "Downloads video from yt.",
   category: "downloader",
   filename: __filename,
   use: "<faded-Alan Walker>"
 }, async (_0x5b3642, _0xd9c02f) => {
   let _0x408f41 = _0xd9c02f ? _0xd9c02f : _0x5b3642.reply_text;
   if (!_0x408f41) {
     return _0x5b3642.reply("Example : " + prefix + "video Back in black");
   }
   let _0x2dd942 = ytIdRegex.exec(_0xd9c02f) || [];
   let _0x54b8a3 = _0x2dd942[0] || false;
   try {
     if (!_0x54b8a3) {
       let _0x328962 = await yts(_0x408f41);
       let _0xf9a19f = _0x328962.videos[0];
       _0x54b8a3 = _0xf9a19f.url;
       _0x2dd942 = ytIdRegex.exec(_0x54b8a3);
     }
   } catch {}
   try {
     let _0x3e5f36 = await yt.getInfo(_0x2dd942[1]);
     if (_0x3e5f36.duration >= videotime) {
       return await _0x5b3642.reply("*_Can't dowanload, video file too big_*");
     }
     let _0x48d93b = await yt.download(_0x2dd942[1]);
     var _0x37d977 = {
       ...(await _0x5b3642.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
     };
     if (_0x48d93b) {
       await _0x5b3642.bot.sendMessage(_0x5b3642.chat, {
         video: {
           url: _0x48d93b
         },
         caption: Config.caption,
         mimetype: "video/mp4",
         contextInfo: _0x37d977
       });
     } else {
       await _0x5b3642.send("Video not Found");
     }
     try {
       fs.unlinkSync("" + _0x48d93b);
     } catch {}
   } catch (_0x18ecaa) {
     return _0x5b3642.error(_0x18ecaa + "\n\ncommand: video", _0x18ecaa, "*_Video not Found_*");
   }
 });
 smd({
   pattern: "play",
   alias: ["music"],
   desc: "Sends info about the query(of youtube video/audio).",
   category: "downloader",
   filename: __filename,
   use: "<faded-Alan walker.>"
 }, async (_0x490f9d, _0x8f293c) => {
   try {
     let _0x5e4722 = _0x8f293c ? _0x8f293c : _0x490f9d.reply_text;
     if (!_0x5e4722) {
       return _0x490f9d.reply("*" + prefix + "play back in black*");
     }
     let _0x26757d = ytIdRegex.exec(_0x5e4722) || [];
     let _0x5ccba2 = _0x26757d[0] || false;
     if (!_0x5ccba2) {
       let _0x1b69ce = await yts(_0x5e4722);
       let _0x1c2487 = _0x1b69ce.videos[0];
       _0x5ccba2 = _0x1c2487.url;
     }
     _0x26757d = ytIdRegex.exec(_0x5ccba2) || [];
     let _0x37056d = await yt.getInfo(_0x26757d[1]);
     if (_0x37056d && _0x37056d.duration >= videotime) {
       return await _0x490f9d.reply("*_Can't dowanload, file duration too big_*");
     }
     await _0x490f9d.send("_Downloading " + _0x37056d.title + "?_");
     let _0x56c1cd = await yt.download(_0x26757d[1], {
       type: "audio",
       quality: "best"
     });
     var _0x252bcc = {
       ...(await _0x490f9d.bot.contextInfo(Config.botname, "ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
     };
     if (_0x56c1cd) {
       await _0x490f9d.bot.sendMessage(_0x490f9d.jid, {
         audio: {
           url: _0x56c1cd
         },
         mimetype: "audio/mpeg",
         contextInfo: _0x252bcc
       });
     } else {
       _0x490f9d.send("*_Video not Found_*");
     }
     try {
       fs.unlinkSync(_0x56c1cd);
     } catch {}
   } catch (_0x264fbd) {
     return _0x490f9d.error(_0x264fbd + "\n\ncommand: play", _0x264fbd, "*_Video not Found_*");
   }
 });
 smd({
   pattern: "sound",
   desc: "Downloads ringtone.",
   category: "downloader",
   filename: __filename,
   use: "<Dowanload Tiktok Sounds>"
 }, async (_0x39cd7c, _0x5c93dc) => {
   try {
     if (!_0x5c93dc) {
       return _0x39cd7c.reply("*Give A Number Example: " + prefix + "sound 5*");
     }
     const _0x46b975 = parseInt(_0x5c93dc);
     if (_0x46b975.toString() == "NaN" || _0x46b975 < 1 || _0x46b975 > 160) {
       return _0x39cd7c.reply("*_❌ Give a number between 1 to 160_*");
     }
     let _0x4399c2 = "https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound" + _0x46b975.toString() + ".mp3";
     let _0x274e2b = await getBuffer(_0x4399c2);
     var _0x23267e = {
       ...(await _0x39cd7c.bot.contextInfo(Config.botname, "ᴛɪᴋᴛᴏᴋ ꜱᴏᴜɴᴅ " + _0x46b975))
     };
     let _0x477ca0 = {
       audio: _0x274e2b,
       fileName: "Suhail-Md tiktok Sound" + _0x46b975 + ".m4a",
       mimetype: "audio/mpeg",
       ptt: true,
       contextInfo: _0x23267e
     };
     return _0x39cd7c.bot.sendMessage(_0x39cd7c.chat, _0x477ca0, {
       quoted: _0x39cd7c
     });
   } catch (_0x460bf7) {
     return _0x39cd7c.error(_0x460bf7 + "\n\ncommand: sound", _0x460bf7, false);
   }
 });
 smd({
   pattern: "tiktok",
   alias: ["tt", "ttdl"],
   desc: "Downloads Tiktok Videos Via Url.",
   category: "downloader",
   filename: __filename,
   use: "<add tiktok url.>"
 }, async (_0x53698d, _0x25c725) => {
   try {
     if (!_0x25c725) {
       return await _0x53698d.reply("*Uhh Please, Provide me tiktok Video Url*\n*_Ex " + prefix + "tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*");
     }
     let _0x2c0b6e = _0x25c725 ? _0x25c725.split(" ")[0] : "";
     if (!/tiktok/.test(_0x2c0b6e)) {
       return await _0x53698d.reply("*Uhh Please, Give me Valid Tiktok Video Url!*");
     }
     const _0x332b5e = require("mumaker");
     let _0xd24df8 = await _0x332b5e.tiktok(_0x2c0b6e);
     const {
       thumbnail: _0xeeb035,
       media: _0x40cd8a,
       music: _0x4bf669,
       description: _0x2dfb22,
       author: _0x2ff99a,
       like: _0x22bb43,
       comment: _0xafa904
     } = _0xd24df8;
     await _0x53698d.send(_0xeeb035, {
       caption: _0x2dfb22 + "\n\n*Auther:* " + _0x2ff99a + "\n*Like:* " + _0x22bb43 + "\n*Comments:* " + _0xafa904 + "\n*Video:* " + _0x40cd8a + "\n*Audio:* " + _0x4bf669 + "\n\n\n" + Config.caption
     }, "image");
     if (_0xd24df8 && _0x40cd8a) {
       return await _0x53698d.sendMessage(_0x53698d.chat, {
         video: {
           url: _0x40cd8a
         },
         mimetype: "video/mp4",
         caption: _0x2dfb22 + "\n\n\n" + Config.caption
       }, {
         quoted: _0x53698d
       });
     } else {
       return await _0x53698d.reply("Error While Downloading Your Video");
     }
   } catch (_0x23d3c6) {
     return _0x53698d.error(_0x23d3c6 + "\n\ncommand: tiktok", _0x23d3c6);
   }
 });
 smd({
   pattern: "ringtone",
   desc: "Downloads ringtone.",
   category: "downloader",
   filename: __filename,
   use: "<ringtone name>"
 }, async (_0x3cdbaa, _0x4aec91) => {
   try {
     if (!_0x4aec91) {
       return _0x3cdbaa.reply("Example: " + prefix + "ringtone back in black");
     }
     const {
       ringtone: _0x4d929a
     } = require("../lib/scraper");
     let _0x881d22 = await _0x4d929a(_0x4aec91);
     var _0x52726c = {
       ...(await _0x3cdbaa.bot.contextInfo(Config.botname, "ʀɪɴɢᴛᴏɴᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
     };
     let _0xd0a072 = {
       audio: {
         url: _0x881d22[0].audio
       },
       caption: "*" + _0x881d22[0].title + "*",
       fileName: _0x881d22[0].title + ".mp3",
       mimetype: "audio/mpeg",
       contextInfo: _0x52726c
     };
     return _0x3cdbaa.bot.sendMessage(_0x3cdbaa.jid, _0xd0a072, {
       quoted: _0x3cdbaa
     });
   } catch (_0x3c10dc) {
     return _0x3cdbaa.error(_0x3c10dc + "\n\ncommand: ringtone", _0x3c10dc, "*_Ringtone not found with given name!!_*");
   }
 });
 smd({
   pattern: "pint",
   desc: "Downloads image from pinterest.",
   category: "downloader",
   filename: __filename,
   use: "<text|image name>"
 }, async (_0x46563b, _0x40387b) => {
   try {
     if (!_0x40387b) {
       return _0x46563b.reply("What picture are you looking for?");
     }
     let _0x154943 = (await pinterest(_0x40387b)) || [];
     if (!_0x154943 || !_0x154943[0]) {
       return await _0x46563b.send("*_No Result found!_*");
     }
     var _0x47f4b6 = {
       ...(await _0x46563b.bot.contextInfo(Config.botname, "ᴘɪɴᴛᴇʀᴇꜱᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
     };
     let _0x5c9c66 = _0x46563b.iscreator && text.split("|")[1] === "all" ? _0x154943.length : _0x154943.length > 5 ? 5 : _0x154943.length;
     for (let _0x4ae2dc = 0; _0x4ae2dc < _0x154943.length; _0x4ae2dc++) {
       await _0x46563b.bot.sendMessage(_0x46563b.chat, {
         image: {
           url: _0x154943[_0x4ae2dc]
         },
         contextInfo: _0x47f4b6
       });
     }
   } catch (_0xabd49d) {
     return _0x46563b.reply("Uhh Plese, Give me a Name. Ex .pint apple");
   }
 });
 smd({
   pattern: "mediafire",
   alias: ["mf", "mfire"],
   desc: "Downloads media from Mediafire.",
   category: "downloader",
   filename: __filename,
   use: "<url of mediafire>"
 }, async (_0x4b29d5, _0x5b033a) => {
   try {
     let _0x5aed8b = _0x5b033a.includes("mediafire.com") ? _0x5b033a : _0x4b29d5.reply_message ? _0x4b29d5.reply_message.text : "";
     if (!_0x5b033a.includes("mediafire.com")) {
       return _0x4b29d5.reply("*_Uhh please, Provide mediafire url!_*");
     }
     let _0x303123 = _0x5aed8b.split(" ")[0];
     const _0x2fba89 = await mediafire(_0x303123);
     if (!_0x2fba89.length) {
       return _0x4b29d5.reply("could not found anything");
     }
     const _0x2fca38 = parseInt(_0x2fba89[0].size);
     if (_0x2fca38 > dlsize) {
       return _0x4b29d5.reply("❌ File size bigger than 150mb.");
     }
     let _0x1c89e9 = "『 *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ* 』\n\n *Name* : " + _0x2fba89[0].nama + "\n *Size* :" + _0x2fba89[0].size + "\n *Mime* : " + _0x2fba89[0].mime + "\n \n\n" + Config.caption;
     _0x1c89e9 = await fancytext(_0x1c89e9, 26);
     var _0x5cf6e = {
       ...(await _0x4b29d5.bot.contextInfo(Config.botname, "ᴘɪɴᴛᴇʀᴇꜱᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
     };
     let _0xe18401 = {
       document: {
         url: _0x2fba89[0].link
       },
       caption: _0x1c89e9,
       fileName: _0x2fba89[0].nama,
       mimetype: _0x2fba89[0].mime,
       contextInfo: _0x5cf6e
     };
     return await _0x4b29d5.bot.sendMessage(_0x4b29d5.chat, _0xe18401);
   } catch (_0x5e2b9c) {
     return _0x4b29d5.error(_0x5e2b9c + "\n\ncommand: mediafire", _0x5e2b9c, "*_File not found!!_*");
   }
 });
 smd({
   pattern: "song",
   alias: ["audio"],
   desc: "Downloads audio from youtube.",
   category: "downloader",
   filename: __filename,
   use: "<give text>"
 }, async (_0x5344a7, _0x396c3d) => {
   try {
     if (!_0x396c3d) {
       return await _0x5344a7.reply("*_Ohh PLease, Give Me Song Name_*");
     }
     let _0x202f9a = await yts(_0x396c3d);
     let _0x4dbbcf = _0x202f9a.all[0];
     let _0x19bf3a = "\t *ᴀsᴛᴀ-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*   \n\nTitle : " + _0x4dbbcf.title + "\nUrl : " + _0x4dbbcf.url + "\nDescription : " + _0x4dbbcf.timestamp + "\nViews : " + _0x4dbbcf.views + "\nUploaded : " + _0x4dbbcf.ago + "\nAuthor : " + _0x4dbbcf.author.name + "\n\n\nReply 1 To Video \nReply 2 To Audio";
     let _0x224121 = await smdBuffer(_0x4dbbcf.thumbnail);
     var _0x17f3d6 = {
       ...(await _0x5344a7.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ", _0x224121))
     };
     await _0x5344a7.bot.sendMessage(_0x5344a7.jid, {
       image: _0x224121,
       caption: _0x19bf3a
     });
   } catch (_0x19fd64) {
     return _0x5344a7.error(_0x19fd64 + "\n\ncommand: mediafire", _0x19fd64, "*_File not found!!_*");
   }
 });
 cmd({
   pattern: "yts",
   alias: ["ytss"],
   desc: "Search Song From youtube",
   category: "downloader",
   filename: __filename,
   use: "<Yt Search Query>"
 }, async (_0x3d2c7b, _0x4d11cf) => {
   try {
     if (!_0x4d11cf) {
       return await _0x3d2c7b.reply("*_Ohh PLease, Give Me Song Name_*");
     }
     let _0x5d7470 = await yts(_0x4d11cf);
     let _0xa539f7 = "*ᴀsᴛᴀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ* \n*_______________________________* \n\n*_Reply Any Number To Download._*\n_Results For : " + _0x4d11cf + "_ \n";
     let _0x5c05ac = 1;
     for (let _0x4c1463 of _0x5d7470.all) {
       _0xa539f7 += " \n*" + _0x5c05ac++ + " : " + _0x4c1463.title + (_0x4c1463.timestamp ? "(" + _0x4c1463.timestamp + ")" : "") + "*\n*Url : " + _0x4c1463.url + "*";
     }
     return await _0x3d2c7b.sendMessage(_0x3d2c7b.chat, {
       image: {
         url: _0x5d7470.all[0].thumbnail
       },
       caption: _0xa539f7
     }, {
       quoted: _0x3d2c7b
     });
   } catch (_0x1e117a) {}
 });
 smd({
   pattern: "ytmp4",
   alias: ["ytv", "ytvid", "ytvideo"],
   desc: "Downloads video from youtube.",
   category: "downloader",
   filename: __filename,
   use: "<yt video url>"
 }, async (_0x46467f, _0x5bd692) => {
   let _0x2b71ee = _0x5bd692 ? _0x5bd692 : _0x46467f.reply_text;
   const _0x185c20 = ytIdRegex.exec(_0x2b71ee) || [];
   if (!_0x2b71ee || !_0x185c20[0]) {
     return await _0x46467f.reply("*_Uhh please, Provide youtube video url!_*");
   }
   try {
     let _0x2a3d4c = await ytdl.getInfo(_0x185c20[0]);
     if (_0x2a3d4c.videoDetails.lengthSeconds >= videotime) {
       return _0x46467f.reply("*_Can't dowanload, video file too big_*");
     }
     let _0x28bf5b = _0x2a3d4c.videoDetails.title;
     let _0x98f988 = "./temp/" + _0x185c20[1] + ".mp4";
     const _0x344fb9 = ytdl(_0x185c20[0], {
       filter: _0x4080eb => _0x4080eb.itag == 22 || _0x4080eb.itag == 18
     }).pipe(fs.createWriteStream(_0x98f988));
     await new Promise((_0x2ce750, _0xccdfff) => {
       _0x344fb9.on("error", _0xccdfff);
       _0x344fb9.on("finish", _0x2ce750);
     });
     var _0x40604b = {
       ...(await _0x46467f.bot.contextInfo(Config.botname, "ʏᴛᴅʟ ᴠɪᴅᴇᴏ"))
     };
     let _0x2759c1 = {
       video: fs.readFileSync(_0x98f988),
       mimetype: "video/mp4",
       caption: "  *Here's Your Video*\n" + Config.caption,
       height: 496,
       width: 640,
       contextInfo: _0x40604b
     };
     await _0x46467f.bot.sendMessage(_0x46467f.jid, _0x2759c1, {
       quoted: _0x46467f
     });
     try {
       return await fs.unlinkSync(_0x98f988);
     } catch {}
   } catch (_0x576216) {
     console.log("here now,ytdl-core : ", _0x576216);
     try {
       let _0x5b6bc7 = await yt.getInfo(_0x185c20[1]);
       if (_0x5b6bc7.duration >= videotime) {
         return await _0x46467f.reply("*_Can't dowanload, video file too big_*");
       }
       let _0x23e1ab = await yt.download(_0x185c20[1], {
         type: "video",
         quality: _0x5b6bc7.pref_Quality || "best"
       });
       var _0x40604b = {
         ...(await _0x46467f.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
       };
       if (_0x23e1ab) {
         await _0x46467f.bot.sendMessage(_0x46467f.chat, {
           video: {
             url: _0x23e1ab
           },
           mimetype: "video/mp4",
           contextInfo: _0x40604b
         });
       } else {
         await _0x46467f.send("*_Video not Found_*");
       }
       try {
         fs.unlinkSync("" + _0x23e1ab);
       } catch {}
       return;
     } catch (_0x328730) {
       return _0x46467f.error(_0x328730 + "\n\ncommand: ytmp4", _0x328730, "*_Uhh dear, Video not Found!!_*");
     }
   }
 });
 smd({
   pattern: "ytmp3",
   alias: ["yta"],
   desc: "Downloads audio by yt link.",
   category: "downloader",
   use: "<yt video url>"
 }, async (_0x3ffcba, _0x3c6ef) => {
   let _0x192054 = _0x3c6ef ? _0x3c6ef : _0x3ffcba.reply_text;
   const _0x2f88c6 = ytIdRegex.exec(_0x192054) || [];
   if (!_0x192054 || !_0x2f88c6[0]) {
     return await _0x3ffcba.reply("*_Uhh please, Provide youtube video url!_*");
   }
   try {
     let _0x5761ea = await ytdl.getInfo(_0x2f88c6[0]);
     if (_0x5761ea.videoDetails.lengthSeconds >= videotime) {
       return _0x3ffcba.reply("*_Can't dowanload, video file too big_*");
     }
     let _0x4a2ea7 = _0x5761ea.videoDetails.title;
     let _0x40ad2f = "./temp/" + _0x2f88c6[1] + ".mp3";
     const _0x1c6ac5 = ytdl(_0x2f88c6[0], {
       filter: _0x4cb17d => _0x4cb17d.audioBitrate == 160 || _0x4cb17d.audioBitrate == 128
     }).pipe(fs.createWriteStream(_0x40ad2f));
     await new Promise((_0x444ec3, _0x54dd65) => {
       _0x1c6ac5.on("error", _0x54dd65);
       _0x1c6ac5.on("finish", _0x444ec3);
     });
     var _0x5b04aa = {
       ...(await _0x3ffcba.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
     };
     let _0x35cbe3 = {
       audio: fs.readFileSync(_0x40ad2f),
       mimetype: "audio/mpeg",
       contextInfo: _0x5b04aa
     };
     try {
       return await fs.unlinkSync(_0x40ad2f);
     } catch {}
   } catch (_0x464e69) {
     console.log("here now,ytdl-core : ", _0x464e69);
     try {
       let _0x21d31b = await yt.download(_0x2f88c6[1], {
         type: "audio",
         quality: "best"
       });
       var _0x5b04aa = {
         ...(await _0x3ffcba.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
       };
       if (_0x21d31b) {
         await _0x3ffcba.bot.sendMessage(_0x3ffcba.jid, {
           audio: {
             url: _0x21d31b
           },
           mimetype: "audio/mpeg",
           contextInfo: _0x5b04aa
         });
       } else {
         await _0x3ffcba.send("*_Uhh dear, audio not Found!_*");
       }
       try {
         fs.unlinkSync(_0x21d31b);
       } catch {}
     } catch (_0x84103) {
       await _0x3ffcba.error(_0x84103 + "\n\ncommand: ytmp3", _0x84103, "*_Uhh dear, audio file not Found!!_*");
     }
   }
 });
 smd({
   pattern: "ytdoc",
   alias: ["ytd"],
   desc: "Downloads audio by yt link as document.",
   category: "downloader",
   use: "<ytdoc video url>"
 }, async (_0x2b6965, _0x43d1cd) => {
   try {
     let _0x301e55 = _0x43d1cd ? _0x43d1cd : _0x2b6965.reply_text;
     const _0x1222ff = ytIdRegex.exec(_0x301e55) || [];
     if (!_0x301e55 || !_0x1222ff[0]) {
       return await _0x2b6965.reply("❌Please provide me a url");
     }
     var _0x468cb1 = _0x1222ff[1];
     var _0x32f1f2 = false;
     try {
       let _0x5e58e4 = await ytdl.getInfo(_0x1222ff[0]);
       if (_0x5e58e4.videoDetails.lengthSeconds >= videotime) {
         return _0x2b6965.reply("*_Can't dowanload, video file too big_*");
       }
       _0x468cb1 = _0x5e58e4.videoDetails.title;
       let _0x77e98f = "./temp/Suhail-Md " + _0x1222ff[1] + ".mp3";
       const _0x32240c = ytdl(_0x1222ff[0], {
         filter: _0x5eba58 => _0x5eba58.audioBitrate == 160 || _0x5eba58.audioBitrate == 128
       }).pipe(fs.createWriteStream(_0x77e98f));
       _0x32f1f2 = _0x77e98f;
       await new Promise((_0x3d8c79, _0x319a11) => {
         _0x32240c.on("error", _0x319a11);
         _0x32240c.on("finish", _0x3d8c79);
       });
     } catch (_0xdc79ef) {
       console.log("here now,ytdl-core : ", _0xdc79ef);
       try {
         _0x32f1f2 = await yt.download(_0x1222ff[1], {
           type: "audio",
           quality: "best"
         });
       } catch (_0x3a3a63) {
         return await _0x2b6965.error(_0x3a3a63 + "\n\ncommand: ytdoc", _0x3a3a63, "*_Uhh dear, file not Found!!_*");
       }
     }
     if (!_0x32f1f2) {
       return await _0x2b6965.send("*_Uhh dear, video not found_*");
     }
     var _0x2f5064 = {
       ...(await _0x2b6965.bot.contextInfo(Config.botname, "ʏᴛᴅᴏᴄ ᴍᴘ3 ʏᴏᴜᴛᴜʙᴇ"))
     };
     let _0x2db131 = {
       document: {
         url: _0x32f1f2
       },
       mimetype: "audio/mpeg",
       fileName: "Suhail-Md " + _0x1222ff[1] + ".mp3",
       caption: Config.caption,
       contextInfo: _0x2f5064
     };
     await _0x2b6965.bot.sendMessage(_0x2b6965.jid, _0x2db131, {
       quoted: _0x2b6965
     });
     try {
       return await fs.unlinkSync(_0x32f1f2);
     } catch {}
   } catch (_0x428ee4) {
     await _0x2b6965.error(_0x428ee4 + "\n\ncommand: ytdoc", _0x428ee4, "*_Uhh dear, audio file not Found!!_*");
   }
 });
 cmd({
   on: "text"
 }, async (_0x4a18ed, _0x22acf4, {
   isCreator: _0x57b4b0
 }) => {
   if (_0x4a18ed.quoted && _0x4a18ed.text) {
     const _0x2d1ff5 = _0x4a18ed.quoted.text.split("\n");
     if (_0x2d1ff5[0].includes("ᴀsᴛᴀ-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")) {
       const _0x5baceb = _0x2d1ff5.find(_0x3c4460 => _0x3c4460.startsWith("Url :"));
       let _0x50d747 = _0x5baceb.replace("Url :", "").trim();
       try {
         await _0x4a18ed.sendMessage(_0x4a18ed.chat, {
           react: {
             text: "✨",
             key: _0x4a18ed.key
           }
         });
         let _0x41156e;
         if (_0x4a18ed.text.startsWith("1")) {
           _0x41156e = "./temp/ytsong.mp4";
           const _0x35df84 = ytdl(_0x50d747, {
             filter: _0x15c52e => _0x15c52e.itag == 22 || _0x15c52e.itag == 18
           }).pipe(fs.createWriteStream(_0x41156e));
           await new Promise((_0x373909, _0x10bec7) => {
             _0x35df84.on("error", _0x10bec7);
             _0x35df84.on("finish", _0x373909);
           });
           await _0x4a18ed.sendMessage(_0x4a18ed.chat, {
             video: fs.readFileSync(_0x41156e),
             mimetype: "video/mp4",
             caption: Config.caption
           }, {
             quoted: _0x4a18ed
           });
         } else if (_0x4a18ed.text.startsWith("2")) {
           _0x41156e = "./temp/ytsong.mp3";
           const _0x399e49 = ytdl(_0x50d747, {
             filter: _0x242072 => _0x242072.audioBitrate == 160 || _0x242072.audioBitrate == 128
           }).pipe(fs.createWriteStream(_0x41156e));
           await new Promise((_0x4a8a01, _0x57c39f) => {
             _0x399e49.on("error", _0x57c39f);
             _0x399e49.on("finish", _0x4a8a01);
           });
           await _0x4a18ed.sendMessage(_0x4a18ed.chat, {
             audio: fs.readFileSync(_0x41156e),
             mimetype: "audio/mpeg"
           }, {
             quoted: _0x4a18ed
           });
         }
         try {
           return fs.unlinkSync(_0x41156e);
         } catch (_0x3ce19a) {}
       } catch (_0x1b52e4) {
         return await _0x4a18ed.reply("Error While Downloading Video : " + _0x1b52e4);
       }
     } else if (_0x2d1ff5[0].includes("ᴀsᴛᴀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ")) {
       let _0x3c9b58 = "*" + _0x4a18ed.text.split(" ")[0] + " : ";
       const _0x4597a3 = _0x2d1ff5.find(_0x2109fb => _0x2109fb.startsWith(_0x3c9b58));
       if (_0x4597a3) {
         try {
           let _0x8a0100 = _0x4597a3.replace(_0x3c9b58, "").split("*")[0].trim();
           const _0x24440c = _0x2d1ff5[_0x2d1ff5.indexOf(_0x4597a3) + 1];
           const _0x1621c3 = _0x24440c.split("*")[1].replace("Url : ", "").trim();
           if (_0x1621c3.startsWith("http")) {
             await _0x4a18ed.sendMessage(_0x4a18ed.chat, {
               react: {
                 text: "✨",
                 key: _0x4a18ed.key
               }
             });
             let _0x1523bd = "./temp/Yts Download " + Math.floor(Math.random() * 10000) + ".mp4";
             const _0x1ccf7f = ytdl(_0x1621c3, {
               filter: _0x420609 => _0x420609.itag == 22 || _0x420609.itag == 18
             }).pipe(fs.createWriteStream(_0x1523bd));
             await new Promise((_0x5f3da6, _0xab103) => {
               _0x1ccf7f.on("error", _0xab103);
               _0x1ccf7f.on("finish", _0x5f3da6);
             });
             await _0x4a18ed.sendMessage(_0x4a18ed.chat, {
               video: fs.readFileSync(_0x1523bd),
               mimetype: "video/mp4",
               caption: _0x8a0100 + " \n " + Config.caption
             }, {
               quoted: _0x4a18ed
             });
             try {
               fs.unlink(_0x1523bd);
             } catch (_0x4ecb66) {}
           }
         } catch (_0x2dae10) {
           _0x4a18ed.reply("Error , Video Not Found : " + _0x2dae10);
         }
       }
     } else if (_0x2d1ff5[0].includes("ᴀsᴛᴀ-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ")) {
       let _0x3dbd05 = "*" + _0x4a18ed.text.split(" ")[0] + " : ";
       const _0x4d79db = _0x2d1ff5.find(_0x542d9f => _0x542d9f.startsWith(_0x3dbd05));
       if (_0x4d79db) {
         try {
           let _0x4b0233 = _0x4d79db.replace(_0x3dbd05, "").split("*")[0].trim();
           const _0x7cbe76 = _0x2d1ff5[_0x2d1ff5.indexOf(_0x4d79db) + 1];
           const _0x395a5f = _0x7cbe76.split("*")[1].replace("Id : ", "").trim();
           await _0x4a18ed.sendMessage(_0x4a18ed.chat, {
             react: {
               text: "✨",
               key: _0x4a18ed.key
             }
           });
           let _0x55cee4 = await download(_0x395a5f);
           let _0xd8c559 = "*App Name :* " + _0x55cee4.name;
           _0xd8c559 += "\n*App id        :* " + _0x55cee4.package;
           _0xd8c559 += "\n*Last Up       :* " + _0x55cee4.lastup;
           _0xd8c559 += "\n*App Size     :* " + _0x55cee4.size;
           _0xd8c559 += "\n               \n" + Config.caption;
           let _0x93ecfe = {
             document: {
               url: _0x55cee4.dllink
             },
             mimetype: "application/vnd.android.package-archive",
             fileName: _0x55cee4.name + ".apk",
             caption: _0xd8c559
           };
           return await _0x4a18ed.sendMessage(_0x4a18ed.chat, _0x93ecfe, {
             quoted: _0x4a18ed
           });
         } catch (_0xa41f50) {
           _0x4a18ed.reply("*_Can't Download, App Limit Exceed_*");
         }
       }
     }
   }
 });