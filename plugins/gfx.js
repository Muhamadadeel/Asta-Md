const { smd, prefix, Config } = require("../lib");
const done = "✳️";
const rwait = "✳️";

const gfxFunc = async (cld, { Void, text, smd: cmdName }, sendError = true) => {
 try {
   text += ": ser";
   let exampleText = `Example  : *${prefix + cmdName}* Suhail`;
   let infoText = `*Separate the text with ':' sign*\n*Example : ${prefix + cmdName} Suhail : Bot*`;
   let name = text.split(":")[0];
   let command = cmdName.toLowerCase();

   switch (command) {
     case "gfx1":
       if (!name) {
         throw exampleText;
       }
       let url = `https://api.caliph.biz.id/api/kaneki?nama=${encodeURIComponent(name)}&apikey=caliphkey`;
       cld.send(url, { caption: Config.caption }, "img", cld);
       break;

     case "gfx2":
       if (!text) {
         throw infoText;
       }
       if (!text.includes(":")) {
         throw infoText;
       }
       let [name1, name2] = text.split(":");
       let url2 = `https://api.caliph.biz.id/api/girlneko?nama=${encodeURIComponent(name1.trim())}&nama2=${encodeURIComponent(name2.trim())}&apikey=caliphkey`;
       cld.send(url2, { caption: Config.caption }, "img", cld);
       break;

     case "gfx3":
       if (!name) {
         throw exampleText;
       }
       let url3 = `https://api.caliph.biz.id/api/rem?nama=${encodeURIComponent(name)}&apikey=caliphkey`;
       cld.send(url3, { caption: Config.caption }, "img", cld);
       break;
       case "gfx4":
        if (!name) {
          throw exampleText;
        }
        let url4 = `https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(name)}&apikey=caliphkey`;
        cld.send(url4, { caption: Config.caption }, "img", cld);
        break;

      case "gfx5":
        if (!name) {
          throw exampleText;
        }
        let url5 = `https://api.lolhuman.xyz/api/textprome/jokerlogo?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url5, { caption: Config.caption }, "img", cld);
        break;

      case "gfx6":
        if (!text) {
          throw infoText;
        }
        if (!text.includes(":")) {
          throw infoText;
        }
        let url6 = `https://api.lolhuman.xyz/api/textprome2/lionlogo?apikey=${lolkeysapi}&text1=${encodeURIComponent(name1)}&text2=${encodeURIComponent(name2)}`;
        cld.send(url6, { caption: Config.caption }, "img", cld);
        break;

      case "gfx7":
        if (!text) {
          throw infoText;
        }
        if (!text.includes(":")) {
          throw infoText;
        }
        let [text1, text2] = text.split(":");
        let url7 = `https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1.trim())}&text2=${encodeURIComponent(text2.trim())}`;
        cld.send(url7, { caption: Config.caption }, "img", cld);
        break;

      case "gfx8":
        if (!name) {
          throw exampleText;
        }
        let url8 = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url8, { caption: Config.caption }, "img", cld);
        break;

      case "gfx9":
        if (!name) {
          throw exampleText;
        }
        let url9 = `https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url9, { caption: Config.caption }, "img", cld);
        break;

      case "gfx10":
        if (!name) {
          throw exampleText;
        }
        let url10 = `https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url10, { caption: Config.caption }, "img", cld);
        break;

      case "gfx11":
        if (!text) {
          throw infoText;
        }
        if (!text.includes(":")) {
          throw infoText;
        }
        let [text3, text4] = text.split(":");
        let url11 = `https://api.lolhuman.xyz/api/ephoto2/codwarzone?apikey=${lolkeysapi}&text1=${encodeURIComponent(text3.trim())}&text2=${encodeURIComponent(text4.trim())}`;
        cld.send(url11, { caption: Config.caption }, "img", cld);
        break;

      case "gfx12":
        if (!name) {
          throw exampleText;
        }
        let url12 = `https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url12, { caption: Config.caption }, "img", cld);
        break;

      case "gfx13":
        if (!text.includes(":")) {
          throw infoText;
        }
        let [text5, text6] = text.split(":");
        let url13 = `https://api.caliph.biz.id/api/sadboy?nama=${encodeURIComponent(text5.trim())}&nama2=${encodeURIComponent(text6.trim())}&apikey=caliphkey`;
        cld.send(url13, { caption: Config.caption }, "img", cld);
        break;

      case "gfx14":
        if (!text) {
          throw infoText;
        }
        let [text7, text8] = text.split(":");
        let url14 = `https://api.caliph.biz.id/api/lolimaker?nama=${encodeURIComponent(text7.trim())}&nama2=${encodeURIComponent(text8.trim())}&apikey=caliphkey`;
        cld.send(url14, { caption: Config.caption }, "img", cld);
        break;

     default:
       break;
   }
 } catch (err) {
   console.log(err);
   if (sendError) {
     return cld.send(`${err}`);
   }
 }
};

const gfxx = [
 "gfx1",
 "gfx2",
 "gfx3",
 "gfx4",
 "gfx5",
 "gfx6",
 "gfx7",
 "gfx8",
 "gfx9",
 "gfx10",
 "gfx11",
 "gfx12",
 "gfx13",
 "gfx14",
];
const lolkeysapi = "GataDios";

for (let i = 0; i < gfxx.length; i++) {
 smd(
   {
     cmdname: gfxx[i],
     infocmd: "create a gfx logo for text",
     type: "gfx",
   },
   async (cld, text, { smd: cmdName, Void }) => {
     try {
       gfxFunc(cld, { text, Void, smd: cmdName });
     } catch (err) {
       console.log(err);
     }
   }
 );
}

smd(
 {
   cmdname: "gfx",
   infocmd: "create gfx logo for text",
   type: "gfx",
 },
 async (cld, text, { smd: cmdName, Void }) => {
   try {
     let exampleText = `*Separate the text with _:_ sign!*\n*Example : ${prefix + cmdName} Suhail _:_ Bot*`;
     if (!text) {
       let menu = `┌───〈 *ɢꜰx ᴍᴇɴᴜ*  〉───◆\n│╭─────────────···▸\n┴│▸\n⬡│▸ ${gfxx.join(" \n⬡│▸ ")} \n┬│▸\n│╰────────────···▸▸\n└───────────────···▸\n\n\t *USE: ${prefix + cmdName} Suhail:Md*\n_To get All Results with single Cmd!_\n`;
       return await cld.sendUi(cld.chat, { caption: menu });
     }

     if (!text.includes(":")) {
       return cld.send(exampleText);
     }

     for (let i = 0; i < gfxx.length; i++) {
       gfxFunc(cld, { text, Void, smd: `gfx${i + 1}` }, false);
     }
   } catch (err) {
     cld.error(`${err}\n\nCommand: ${cmdName}`, err, false);
   }
 }
);