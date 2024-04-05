// asta
const axios = require("axios");
const fs = require("fs-extra");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Jimp = require("jimp");
const {
  fetchJson,
  isUrl,
  GIFBufferToVideoBuffer
} = require("./serialized");
let sides = "*";
const {
  tlang,
  TelegraPh,
  dare,
  truth,
  random_question
} = require("./scraper");
const {
  bot_
} = require("./schemes");
const Config = require("../config.js");
const {
  Innertube,
  UniversalCache,
  Utils
} = require("youtubei.js");
const {
  existsSync,
  mkdirSync,
  createWriteStream
} = require("fs");
let yt = {};
yt.getInfo = async (r, u = {}) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    const H = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true
    });
    let o = await H.getInfo(r, u);
    let z = [];
    for (let f = 0; f < o.streaming_data.formats.length; f++) {
      await z.push(o.streaming_data.formats[f].quality_label);
    }
    let h = z.includes("360p") ? "360p" : "best";
    let j = {
      status: true,
      title: o.basic_info.title,
      id: o.basic_info.id,
      quality: z,
      pref_Quality: h,
      duration: o.basic_info.duration,
      description: o.basic_info.short_description,
      keywords: o.basic_info.keywords,
      thumbnail: o.basic_info.thumbnail[0].url,
      author: o.basic_info.author,
      views: o.basic_info.view_count,
      likes: o.basic_info.like_count,
      category: o.basic_info.category,
      channel: o.basic_info.channel,
      basic_info: o
    };
    return j;
  } catch (E) {
    console.log("./lib/Asta/yt.getInfo()\n", E.message);
    return {
      status: false
    };
  }
};
yt.download = async (r, u = {
  type: "video",
  quality: "best",
  format: "mp4"
}) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    const o = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true
    });
    let z = u.type ? u.type : "video";
    let h = z === "audio" ? "best" : u.quality ? u.quality : "best";
    let j = u.format ? u.format : "mp4";
    const f = await o.download(r, {
      type: z,
      quality: h,
      format: j
    });
    const E = "./assets";
    if (!existsSync(E)) {
      mkdirSync(E);
    }
    let b = z === "video" ? "mp4" : "m4a";
    let K = E + "/Asta-Md " + r + "." + b;
    var H = createWriteStream(K);
    for await (const F of Utils.streamToIterable(f)) {
      H.write(F);
    }
    return K;
  } catch (Q) {
    console.log("./lib/Asta/yt.dowanload()\n", Q.message);
    return false;
  }
};
async function sendAnimeReaction(r, u = "punch", H = "", o = "") {
  try {
    var z = await fetchJson("https://api.waifu.pics/sfw/" + u);
    const h = await axios.get(z.url, {
      responseType: "arraybuffer"
    });
    const j = Buffer.from(h.data, "utf-8");
    let f = r.mentionedJid ? r.mentionedJid[0] : r.msg.contextInfo.participant || false;
    let E = await GIFBufferToVideoBuffer(j);
    let b = f ? sides + "@" + r.sender.split("@")[0] + " " + H + " @" + f.split("@")[0] + sides : sides + "@" + r.sender.split("@")[0] + " " + o + sides;
    if (f) {
      return await r.bot.sendMessage(r.chat, {
        video: E,
        gifPlayback: true,
        mentions: [f, r.sender],
        caption: b
      }, {
        quoted: r,
        messageId: r.bot.messageId()
      });
    } else {
      return await r.bot.sendMessage(r.chat, {
        video: E,
        gifPlayback: true,
        mentions: [r.sender],
        caption: b
      }, {
        quoted: r,
        messageId: r.bot.messageId()
      });
    }
  } catch (K) {
    await r.error(K);
    return console.log("./lib/Asta.js/sendAnimeReaction()\n", K);
  }
}
async function sendGImages(r, u, H = Config.caption, o = "") {
  try {
    let z = require("async-g-i-s");
    let h = await z(u);
    let j = h[Math.floor(Math.random() * h.length)].url;
    let f = {
      image: {
        url: j
      },
      caption: H,
      contextInfo: {
        externalAdReply: {
          title: tlang().title,
          body: o,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: gurl,
          sourceUrl: gurl
        }
      }
    };
    return await r.bot.sendMessage(r.chat, f, {
      quoted: r,
      messageId: r.bot.messageId()
    });
  } catch (E) {
    await r.error(E);
    return console.log("./lib/Asta.js/sendGImages()\n", E);
  }
}
async function AudioToBlackVideo(r, u) {
  try {
    try {
      fs.unlinkSync(u);
    } catch (E) {}
    const H = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " + r;
    const {
      stdout: o
    } = await exec(H);
    const z = parseFloat(o);
    let h = "./assets/blackScreen.mp4";
    try {
      fs.unlinkSync(h);
    } catch (b) {}
    const j = "ffmpeg -f lavfi -i color=c=black:s=1280x720:d=" + z + " -vf \"format=yuv420p\" " + h;
    await exec(j);
    const f = "ffmpeg -i " + h + " -i " + r + " -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 " + u;
    await exec(f);
    console.log("Audio converted to black screen video successfully!");
    return {
      result: true
    };
  } catch (K) {
    console.error("./lib/Aviator.js/AudioToBlackVideo()\n", K);
    return {
      result: false
    };
  }
}
async function textToLogoGenerator(r, u = "", H = "", o = "ser", z = "") {
  const {
    textpro: h
  } = require("mumaker");
  try {
    let f;
    let E = ["1", "ephoto", "ephoto360"].includes(z) ? "https://ephoto360.com/" + u + ".html" : ["2", "photooxy", "potoxy"].includes(z) ? "https://photooxy.com/" + u + ".html" : "https://textpro.me/" + u + ".html";
    if (H) {
      f = await h(E, [H, o]);
    }
    var j = {
      ...(await r.bot.contextInfo(Config.botname, "ᴛᴇxᴛ ᴛᴏ ʟᴏɢᴏ"))
    };
    return await r.bot.sendMessage(r.jid, {
      image: {
        url: f.image
      },
      caption: Config.caption,
      contextInfo: j
    }, {
      messageId: r.bot.messageId()
    });
  } catch (b) {
    return await r.error(b + "\n\nfileName: textToLogoGenerator->s.js", b);
  }
}
async function photoEditor(r, u = "ad", H = "") {
  let o = ["imageMessage"];
  try {
    let z = o.includes(r.mtype) ? r : r.reply_message;
    if (!z || !o.includes(z?.mtype || "null")) {
      return await r.send("*_Uhh Dear, Reply to an image_*");
    }
    let h = await r.bot.downloadAndSaveMediaMessage(z);
    let j = await TelegraPh(h);
    try {
      await fs.unlinkSync(h);
    } catch (f) {}
    return await r.bot.sendMessage(r.chat, {
      image: {
        url: "https://api.popcat.xyz/" + u + "?image=" + j
      },
      caption: H
    }, {
      quoted: r,
      messageId: r.bot.messageId()
    });
  } catch (E) {
    await r.error(E + "\n\ncommand: " + u + "\nfileName: photoEditor->s.js", E);
  }
}
async function plugins(r, u, H = "", o = "") {
  let z = "";
  try {
    let f = (await bot_.findOne({
      id: "bot_" + r.user
    })) || (await bot_.new({
      id: "bot_" + r.user
    }));
    let E = f.plugins;
    if (u.toLowerCase() === "install") {
      let b = "";
      for (let K of isUrl(H)) {
        var j = new URL(K.replace(/[_*]+$/, ""));
        j = j.href.includes("raw") ? j.href : j.href + "/raw";
        const {
          data: F
        } = await axios.get(j);
        let Q = /pattern: ["'](.*)["'],/g.exec(F) || /cmdname: ["'](.*)["'],/g.exec(F) || /name: ["'](.*)["'],/g.exec(F);
        if (!Q) {
          z += "*gist not found:* _" + j + "_ \n";
          continue;
        }
        let v = Q[1].split(" ")[0] || Math.random().toString(36).slice(-5);
        let P = v.replace(/[^A-Za-z]/g, "");
        if (b.includes(P)) {
          continue;
        } else {
          b = b + "[\"" + P + "\"] ";
        }
        if (E[P]) {
          z += "*Plugin _'" + P + "'_ already installed!*\n";
          continue;
        }
        let s = o + "/" + P + ".smd";
        await fs.writeFileSync(s, F, "utf8");
        try {
          require(s);
        } catch (B) {
          fs.unlinkSync(s);
          z += "*Invalid :* _" + j + "_\n ```" + B + "```\n\n ";
          continue;
        }
        if (!E[P]) {
          E[P] = j;
          await bot_.updateOne({
            id: "bot_" + r.user
          }, {
            plugins: E
          });
          z += "*Plugin _'" + P + "'_ Succesfully installed!*\n";
        }
      }
    } else if (u.toLowerCase() === "remove") {
      if (H === "all") {
        let a = "";
        for (const U in E) {
          try {
            fs.unlinkSync(o + "/" + U + ".smd");
            a = "" + a + U + ",";
          } catch (A) {
            console.log("❌ " + U + " ❌ NOT BE REMOVED", A);
          }
        }
        await bot_.updateOne({
          id: "bot_" + r.user
        }, {
          plugins: {}
        });
        z = "*External plugins " + (a ? a : "all") + " removed!!!*";
      } else {
        try {
          if (E[H]) {
            try {
              fs.unlinkSync(o + "/" + H + ".smd");
            } catch {}
            delete E[H];
            await bot_.updateOne({
              id: "bot_" + r.user
            }, {
              plugins: E
            });
            z += "*Plugin _'" + H + "'_ Succesfully removed!*";
          } else {
            z += "*_plugin not exist in " + Config.botname + "_*";
          }
        } catch (O) {
          console.log("Error while removing plugins \n ", O);
        }
      }
    } else if (u.toLowerCase() === "plugins") {
      if (H) {
        z = E[H] ? "*_" + H + ":_* " + E[H] : false;
      } else {
        let t = 0;
        for (const W in E) {
          z += "*" + (t + 1) + ":-* " + W + " \n*Url:* " + E[W] + "\n\n";
        }
      }
    }
    return z;
  } catch (X) {
    console.log("Plugins : ", X);
    return (z + " \n\nError: " + X).trim();
  }
}
async function updateProfilePicture(r, u, H, o = "pp") {
  try {
    if (o === "pp" || o === "gpp") {
      let z = await r.bot.downloadAndSaveMediaMessage(H);
      await r.bot.updateProfilePicture(u, {
        url: z
      });
    } else {
      async function h(j) {
        const f = await Jimp.read(j);
        const E = f.getWidth();
        const b = f.getHeight();
        const K = f.crop(0, 0, E, b);
        return {
          img: await K.scaleToFit(324, 720).getBufferAsync(Jimp.MIME_JPEG),
          preview: await K.normalize().getBufferAsync(Jimp.MIME_JPEG)
        };
      }
      try {
        const j = await H.download();
        const {
          query: f
        } = r.bot;
        const {
          preview: E
        } = await h(j);
        await f({
          tag: "iq",
          attrs: {
            to: u,
            type: "set",
            xmlns: "w:profile:picture"
          },
          content: [{
            tag: "picture",
            attrs: {
              type: "image"
            },
            content: E
          }]
        });
      } catch (b) {
        let K = await r.bot.downloadAndSaveMediaMessage(H);
        await r.bot.updateProfilePicture(u, {
          url: K
        });
        return await r.error(b + " \n\ncommand: update pp", b, false);
      }
    }
    return await r.reply("*_Profile icon updated Succesfully!!_*");
  } catch (F) {
    return await r.error(F + " \n\ncommand: " + (o ? o : "pp"), F);
  }
}
async function forwardMessage(r, u, H = "") {
  let o = u.quoted.mtype;
  let z;
  if (o === "videoMessage" && H === "ptv") {
    z = {
      ptvMessage: {
        ...u.quoted
      }
    };
  } else if (o === "videoMessage") {
    z = {
      videoMessage: {
        ...u.quoted
      }
    };
  } else if (o === "imageMessage") {
    z = {
      imageMessage: {
        ...u.quoted
      }
    };
  } else if (o === "audioMessage") {
    z = {
      audioMessage: {
        ...u.quoted
      }
    };
  } else if (o === "documentMessage") {
    z = {
      documentMessage: {
        ...u.quoted
      }
    };
  } else if (o === "conversation" || o === "extendedTextMessage") {
    return await u.send(u.quoted.text, {}, "", u, r);
  }
  if (z) {
    try {
      await Asta.bot.relayMessage(r, z, {
        messageId: u.key.id
      });
    } catch (h) {
      if (H === "ptv" || H === "save") {
        await u.error(h);
      }
      console.log("Error in " + H + "-cmd in forwardMessage \n", h);
    }
  }
}
async function generateSticker(r, u, H = {
  pack: Config.packname,
  author: Config.author
}) {
  try {
    const {
      Sticker: o,
      createSticker: z,
      StickerTypes: h
    } = require("wa-sticker-formatter");
    let j = new o(u, {
      ...H
    });
    return await r.bot.sendMessage(r.chat, {
      sticker: await j.toBuffer()
    }, {
      quoted: r,
      messageId: r.bot.messageId()
    });
  } catch (f) {
    return await r.error(f + "\n\nfileName: generateSticker->s.js\n");
  }
}
async function getRandom(r = ".jpg", u = 10000) {
  return "" + Math.floor(Math.random() * u) + r;
}
async function randomeFunfacts(r) {
  try {
    if (r === "question") {
      return await random_question();
    } else if (r === "truth") {
      return await truth();
    } else if (r === "dare") {
      return await dare();
    } else if (r === "joke") {
      const u = await (await fetch("https://official-joke-api.appspot.com/random_joke")).json();
      return "*Joke :* " + u.setup + "\n*Punchline:*  " + u.punchline;
    } else if (r === "joke2") {
      const H = await (await fetch("https://v2.jokeapi.dev/joke/Any?type=single")).json();
      return "*joke :* " + H.joke;
    } else if (r === "fact") {
      const {
        data: o
      } = await axios.get("https://nekos.life/api/v2/fact");
      return "*Fact:* " + o.fact;
    } else if (r === "quotes") {
      const {
        data: z
      } = await axios.get("https://favqs.com/api/qotd");
      return "╔════◇\n║ *🎗️Content:* " + z.quote.body + "\n║ *👤Author:* " + z.quote.author + "\n║\n╚════════════╝";
    }
  } catch (h) {
    await msg.error(h);
    return console.log("./lib/Asta.js/randomeFunfacts()\n", h);
  }
}
async function audioEditor(r, u = "bass", H = "") {
  if (!r.quoted) {
    return await r.send("*_Uhh Dear, Reply to audio!!!_*");
  }
  let o = r.quoted.mtype || r.mtype;
  if (!/audio/.test(o)) {
    return await r.send("*_Reply to the audio you want to change with_*", {}, "", H);
  }
  try {
    let z = "-af equalizer=f=54:width_type=o:width=2:g=20";
    if (/bass/.test(u)) {
      z = "-af equalizer=f=54:width_type=o:width=2:g=20";
    }
    if (/blown/.test(u)) {
      z = "-af acrusher=.1:1:64:0:log";
    }
    if (/deep/.test(u)) {
      z = "-af atempo=4/4,asetrate=44500*2/3";
    }
    if (/earrape/.test(u)) {
      z = "-af volume=12";
    }
    if (/fast/.test(u)) {
      z = "-filter:a \"atempo=1.63,asetrate=44100\"";
    }
    if (/fat/.test(u)) {
      z = "-filter:a \"atempo=1.6,asetrate=22100\"";
    }
    if (/nightcore/.test(u)) {
      z = "-filter:a atempo=1.06,asetrate=44100*1.25";
    }
    if (/reverse/.test(u)) {
      z = "-filter_complex \"areverse\"";
    }
    if (/robot/.test(u)) {
      z = "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
    }
    if (/slow/.test(u)) {
      z = "-filter:a \"atempo=0.7,asetrate=44100\"";
    }
    if (/smooth/.test(u)) {
      z = "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
    }
    if (/tupai/.test(u)) {
      z = "-filter:a \"atempo=0.5,asetrate=65100\"";
    }
    let h = await r.bot.downloadAndSaveMediaMessage(r.quoted);
    let j = "assets/" + (r.sender.slice(6) + u) + ".mp3";
    exec("ffmpeg -i " + h + " " + z + " " + j, async (f, E, b) => {
      try {
        fs.unlinkSync(h);
      } catch {}
      ;
      if (f) {
        return r.error(f);
      } else {
        let F = fs.readFileSync(j);
        try {
          fs.unlinkSync(j);
        } catch {}
        ;
        var K = {
          ...(await r.bot.contextInfo(Config.botname, "⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆"))
        };
        return r.bot.sendMessage(r.chat, {
          audio: F,
          mimetype: "audio/mpeg",
          ptt: true,
          contextInfo: K
        }, {
          quoted: r,
          messageId: r.bot.messageId()
        });
      }
    });
  } catch (f) {
    await r.error(f + "\n\ncmdName : " + u + "\n");
    return console.log("./lib/Asta.js/audioEditor()\n", f);
  }
}
async function send(r, u, H = {
  packname: "",
  author: "Asta-Md"
}, o = "", z = "", h = "") {
  if (!u || !r) {
    return;
  }
  try {
    let j = h ? h : r.chat;
    return await r.send(u, H, o, z, j);
  } catch (f) {
    return console.log("./lib/Asta.js/send()\n", f);
  }
}
async function react(r, u, H = "") {
  try {
    if (!u || !r) {
      return;
    }
    let o = H && H.key ? H.key : r.key;
    return await r.bot.sendMessage(r.chat, {
      react: {
        text: u,
        key: o
      }
    }, {
      messageId: r.bot.messageId()
    });
  } catch (z) {
    return console.log("./lib/Asta.js/react()\n", z);
  }
}
let note = {
  info: "make sure to provide 1st parameter of bot number as {user:botNumber} ,and 2nd as note text|id"
};
note.addnote = async (r, u) => {
  try {
    let H = (await bot_.findOne({
      id: "bot_" + r.user
    })) || (await bot_.new({
      id: "bot_" + r.user
    }));
    let o = H.notes;
    let z = 0;
    while (o[z] !== undefined) {
      z++;
    }
    o[z] = u;
    await bot_.updateOne({
      id: "bot_" + r.user
    }, {
      notes: o
    });
    return {
      status: true,
      id: z,
      msg: "*New note added at ID: " + z + "*"
    };
  } catch (h) {
    console.log("note.addnote ERROR :  ", h);
    return {
      status: false,
      error: h,
      msg: "*Can't add new notes due to error!!*"
    };
  }
};
note.delnote = async (r, u) => {
  try {
    let H = (await bot_.findOne({
      id: "bot_" + r.user
    })) || (await bot_.new({
      id: "bot_" + r.user
    }));
    let o = H.notes;
    let z = "*Please provide valid note id!*";
    if (o[u]) {
      delete o[u];
      await bot_.updateOne({
        id: "bot_" + r.user
      }, {
        notes: o
      });
      z = "*Note with Id:" + u + " deleted successfully!*";
    }
    return {
      status: true,
      msg: z
    };
  } catch (h) {
    console.log("note.delnote  ERROR :  ", h);
    return {
      status: false,
      error: h,
      msg: "*Can't delete notes due to error!!*"
    };
  }
};
note.delallnote = async (r, u = "") => {
  try {
    await bot_.updateOne({
      id: "bot_" + r.user
    }, {
      notes: {}
    });
    return {
      status: true,
      msg: "*All saved notes deleted from server!*"
    };
  } catch (H) {
    console.log("note.delnote  ERROR :  ", H);
    return {
      status: false,
      error: H,
      msg: "*Request not be proceed, Sorry!*"
    };
  }
};
note.allnotes = async (r, u = "") => {
  try {
    let H = (await bot_.findOne({
      id: "bot_" + r.user
    })) || (await bot_.new({
      id: "bot_" + r.user
    }));
    let o = H.notes;
    let z = "*Please provide valid note id!*";
    if (u == "all" || !u) {
      let h = "";
      for (const j in o) {
        h += "*NOTE " + j + ":* " + o[j] + "\n\n";
      }
      z = h ? h : "*No notes found!*";
    } else if (u && o[u]) {
      z = "*Note " + u + ":* " + o[u];
    }
    return {
      status: true,
      msg: z
    };
  } catch (f) {
    console.log("note.delnote  ERROR :  ", f);
    return {
      status: false,
      error: f,
      msg: "*Can't delete notes due to error!!*"
    };
  }
};
async function sendWelcome(r, u = "", H = "", o = "", z = "msg", h = true) {
  try {
    if (!global.AstaOfficial) {
      return "Get Ouut";
    }
    if (u) {
      if (r.isGroup) {
        u = u.replace(/@gname/gi, r.metadata.subject).replace(/@desc/gi, r.metadata.desc).replace(/@count/gi, r.metadata.participants.length);
      }
      let j = u.replace(/@user/gi, "@" + r.senderNum).replace(/@name/gi, r.senderName || "_").replace(/@gname/gi, "").replace(/@desc/gi, "").replace(/@count/gi, "1").replace(/@pp/g, "").replace(/@gpp/g, "").replace(/@time/gi, r.time).replace(/@date/gi, r.date).replace(/@line/gi, (await fetchJson("https://api.popcat.xyz/pickuplines"))?.pickupline || "").replace(/@quote/gi, (await axios.get("https://favqs.com/api/qotd")).data?.quote?.body || "").replace(/@bot/gi, "" + Config.botname).replace(/@owner/gi, "" + Config.ownername).trim();
      if (!z || z === "msg") {
        try {
          if (typeof o === "string") {
            o = o.split(",");
          }
          if (/@user/g.test(u) && !o.includes(r.sender)) {
            o.push(r.sender);
          }
        } catch (f) {
          console.log("ERROR : ", f);
        }
        if (/@pp/g.test(u)) {
          return await r.send(await r.getpp(), {
            caption: j,
            mentions: o
          }, "image", H);
        } else if (r.jid && /@gpp/g.test(u)) {
          return await r.send(await r.getpp(r.jid), {
            caption: j,
            mentions: o
          }, "image", H);
        } else {
          return await r.send(j, {
            mentions: o
          }, "Asta", H);
        }
      } else {
        console.log("RETURN ");
      }
      return j;
    }
  } catch (E) {
    return console.log("./lib/Asta.js/sendWelcome()\n", E);
  }
}
async function aitts(r, u = "") {
  try {
    if (!global.AstaOfficial || global.AstaOfficial !== "yes") {
      return "u bloody, Get out from here!!";
    }
    if (!Config.ELEVENLAB_API_KEY || !Config.ELEVENLAB_API_KEY.length > 8) {
      return r.reply("Dear, You Dont Have ELEVENLAB_API_KEY \nCreate ELEVENLAB KEY from below Link \nhttps://elevenlabs.io/\n\nAnd Set it in ELEVENLAB_API_KEY Var\n\n" + Config.caption);
    }
    const o = ["21m00Tcm4TlvDq8ikWAM", "2EiwWnXFnvU5JabPnv8n", "AZnzlk1XvdvUeBnXmlld", "CYw3kZ02Hs0563khs1Fj", "D38z5RcWu1voky8WS1ja", "EXAVITQu4vr4xnSDxMaL", "ErXwobaYiN019PkySvjV", "GBv7mTt0atIp3Br8iCZE", "IKne3meq5aSn9XLyUdCD", "LcfcDJNUP1GQjkzn1xUU", "MF3mGyEYCl7XYWbV9V6O", "N2lVS1w4EtoT3dr4eOWO", "ODq5zmih8GrVes37Dizd", "SOYHLrjzK2X1ezoPC6cr", "TX3LPaxmHKxFdv7VOQHJ", "ThT5KcBeYPX3keUQqHPh", "TxGEqnHWrfWFTfGW9XjX", "VR6AewLTigWG4xSOukaG", "XB0fDUnXU5powFXDhCwa", "XrExE9yKIg1WjnnlVkGX", "Yko7PKHZNXotIFUBG7I9", "ZQe5CZNOzWyzPSCn5a3c", "Zlb1dXrM653N07WRdFW3", "bVMeCyTHy58xNoL34h3p", "flq6f7yk4E4fJM5XTYuZ", "g5CIjZEefAph4nQFvHAz", "jBpfuIE2acCO8z3wKNLl", "jsCqWAovK2LkecY7zXl4", "oWAxZDx7w5VEj9dCyTzz", "onwK4e9ZLuTAKqWW03F9", "pMsXgVXv3BLzUgSXRplE", "pNInz6obpgDQGcFmaJgB", "piTKgcLEGmPE4e6mEKli", "t0jbNlBVZ17f02VDIeMI", "wViXBPUzp2ZZixB1xQuM", "yoZ06aMxZJJ28mfd3POQ", "z9fAnlkpzviPz146aGWa", "zcAOhNBS3c14rBihAFp1", "zrHiDhphv9ZnVXBqCLjz"];
    const z = parseInt(Config.aitts_Voice_Id);
    if (!u && !r.isCreator) {
      return r.reply("*Uhh Dear, Please Provide text..!*\n*Example: _.aitts i am " + r.pushName + "._*");
    } else if (!u && r.isCreator || u === "setting" || u === "info") {
      return r.bot.sendMessage(r.jid, {
        text: "*Hey " + r.pushName + "!.*\n  _Please provide text!_\n  *Example:* _.aitts i am " + r.pushName + "._\n\n  *You Currently " + (!isNaN(z) && z > 0 && z <= 39 ? "set Voice Id: " + z + "*\nUpdate" : "not set any Specific Voice*\nAdd Specific") + " Voice: _.addvar AITTS_ID:35/4/32,etc._\n\n\n  *Also use available voices*```\n\n  1: Rachel\n  2: Clyde\n  3: Domi\n  4: Dave\n  5: Fin\n  6: Bella\n  7: Antoni\n  8: Thomas\n  9: Charlie\n  10: Emily\n  11: Elli\n  12: Callum\n  13: Patrick\n  14: Harry\n  15: Liam\n  16: Dorothy\n  17: Josh\n  18: Arnold\n  19: Charlotte\n  20: Matilda\n  21: Matthew\n  22: James\n  23: Joseph\n  24: Jeremy\n  25: Michael\n  26: Ethan\n  27: Gigi\n  28: Freya\n  29: Grace\n  30: Daniel\n  31: Serena\n  32: Adam\n  33: Nicole\n  34: Jessie\n  35: Ryan\n  36: Asta\n  37: Glinda\n  38: Giovanni\n  39: Mimi\n  ```" + ("\n\n  *Example:* _.aitts i am " + r.pushName + "_:36 \n  *OR:* _.aitts i am " + r.pushName + "_:Asta     \n\n\n  " + Config.caption)
      }, {
        messageId: r.bot.messageId()
      });
    }
    let h = u;
    var H = 0 || Math.floor(Math.random() * o.length);
    let j = false;
    if (!isNaN(z) && z > 0 && z < 39) {
      j = true;
      H = z;
    }
    if (u && u.includes(":")) {
      let b = u.split(":");
      let K = b[b.length - 1].trim() || "";
      h = b.slice(0, b.length - 1).join(":");
      if (K.toLowerCase() === "richel" || K === "1") {
        H = 0;
      } else if (K.toLowerCase() === "clyde" || K === "2") {
        H = 1;
      } else if (K.toLowerCase() === "domi" || K === "3") {
        H = 2;
      } else if (K.toLowerCase() === "dave" || K === "4") {
        H = 3;
      } else if (K.toLowerCase() === "fin" || K === "5") {
        H = 4;
      } else if (K.toLowerCase() === "bella" || K === "6") {
        H = 5;
      } else if (K.toLowerCase() === "antoni" || K === "7") {
        H = 6;
      } else if (K.toLowerCase() === "thomas" || K === "8") {
        H = 7;
      } else if (K.toLowerCase() === "charlie" || K === "9") {
        H = 8;
      } else if (K.toLowerCase() === "emily" || K === "10") {
        H = 9;
      } else if (K.toLowerCase() === "elli" || K === "11") {
        H = 10;
      } else if (K.toLowerCase() === "callum" || K === "12") {
        H = 11;
      } else if (K.toLowerCase() === "patrick" || K === "13") {
        H = 12;
      } else if (K.toLowerCase() === "harry" || K === "14") {
        H = 13;
      } else if (K.toLowerCase() === "liam" || K === "15") {
        H = 14;
      } else if (K.toLowerCase() === "dorothy" || K === "16") {
        H = 15;
      } else if (K.toLowerCase() === "josh" || K === "17") {
        H = 16;
      } else if (K.toLowerCase() === "arnold" || K === "18") {
        H = 17;
      } else if (K.toLowerCase() === "charlotte" || K === "19") {
        H = 18;
      } else if (K.toLowerCase() === "matilda" || K === "20") {
        H = 19;
      } else if (K.toLowerCase() === "matthew" || K === "21") {
        H = 20;
      } else if (K.toLowerCase() === "james" || K === "22") {
        H = 21;
      } else if (K.toLowerCase() === "joseph" || K === "23") {
        H = 22;
      } else if (K.toLowerCase() === "jeremy" || K === "24") {
        H = 23;
      } else if (K.toLowerCase() === "michael" || K === "25") {
        H = 24;
      } else if (K.toLowerCase() === "ethan" || K === "26") {
        H = 25;
      } else if (K.toLowerCase() === "gigi" || K === "27") {
        H = 26;
      } else if (K.toLowerCase() === "freya" || K === "28") {
        H = 27;
      } else if (K.toLowerCase() === "grace" || K === "29") {
        H = 28;
      } else if (K.toLowerCase() === "daniel" || K === "30") {
        H = 29;
      } else if (K.toLowerCase() === "serena" || K === "31") {
        H = 30;
      } else if (K.toLowerCase() === "adam" || K === "32") {
        H = 31;
      } else if (K.toLowerCase() === "nicole" || K === "33") {
        H = 32;
      } else if (K.toLowerCase() === "jessie" || K === "34") {
        H = 33;
      } else if (K.toLowerCase() === "ryan" || K === "35") {
        H = 34;
      } else if (K.toLowerCase() === "Asta" || K === "36") {
        H = 35;
      } else if (K.toLowerCase() === "glinda" || K === "37") {
        H = 36;
      } else if (K.toLowerCase() === "giovanni" || K === "38") {
        H = 37;
      } else if (K.toLowerCase() === "mimi" || K === "39") {
        H = 38;
      } else {
        h = u;
        H = H;
      }
    }
    const f = {
      method: "POST",
      url: "https://api.elevenlabs.io/v1/text-to-speech/" + o[H],
      headers: {
        accept: "audio/mpeg",
        "content-type": "application/json",
        "xi-api-key": "" + Config.ELEVENLAB_API_KEY
      },
      data: {
        text: h
      },
      responseType: "arraybuffer"
    };
    const {
      data: E
    } = await axios.request(f);
    if (!E) {
      return await r.send("*_Request not be proceed!_*");
    }
    await r.sendMessage(r.from, {
      audio: E,
      mimetype: "audio/mpeg",
      ptt: true
    }, {
      quoted: r,
      messageId: r.bot.messageId()
    });
  } catch (F) {
    await r.error(F + "\n\ncommand: aitts", F);
  }
}
module.exports = {
  yt: yt,
  sendAnimeReaction: sendAnimeReaction,
  sendGImages: sendGImages,
  AudioToBlackVideo: AudioToBlackVideo,
  textToLogoGenerator: textToLogoGenerator,
  photoEditor: photoEditor,
  updateProfilePicture: updateProfilePicture,
  randomeFunfacts: randomeFunfacts,
  plugins: plugins,
  getRandom: getRandom,
  generateSticker: generateSticker,
  forwardMessage: forwardMessage,
  audioEditor: audioEditor,
  send: send,
  react: react,
  note: note,
  sendWelcome: sendWelcome,
  aitts: aitts
};