const { smd } = require("../lib");
const ytdl = require("ytdl-secktor");
const yts = require("secktor-pack");
const fs = require("fs");
var videotime = 60000;
var dlsize = 250;
smd(
  {
    pattern: "playlist",
    desc: "Downloads video from playlist.",
    category: "downloader",
    filename: __filename,
    use: "<yt playlist url>",
  },
  async (citel, text, { Void }) => {
    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    if (!text) {
      citel.reply(`❌Please provide me a url`);
      return;
    }
    let urlYtt = text.split("=")[1];
    console.log(urlYtt);
    var opts = { listId: urlYtt };
    yts(opts, async function (err, playlist) {
      if (err) throw err;
      citel.reply("This Process will take a bit time.");
      for (let i = 0; i < playlist.videos.length; i++) {
        if (playlist.videos[i].videoId === undefined) continue;
        let urlYt = playlist.videos[i].videoId;
        try {
          let infoYt = await ytdl.getInfo(urlYt);
          if (infoYt.videoDetails.lengthSeconds >= videotime) continue;
          let titleYt = infoYt.videoDetails.title;
          let randomName = getRandom(".mp4");
          const stream = ytdl(urlYt, {
            filter: (info) => info.itag == 22 || info.itag == 18,
          }).pipe(fs.createWriteStream(`./${randomName}`));
          await new Promise((resolve, reject) => {
            stream.on("error", reject);
            stream.on("finish", resolve);
          });
          let stats = fs.statSync(`./${randomName}`);
          let fileSizeInBytes = stats.size;
          let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
          if (fileSizeInMegabytes <= dlsize) {
            let search = await yts(text);
            let buttonMessage = {
              video: fs.readFileSync(`./${randomName}`),
              mimetype: "video/mp4",
              caption: ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${fileSizeInMegabytes} MB`,
              headerType: 4,
              contextInfo: {
                externalAdReply: {
                  title: titleYt,
                  body: citel.pushName,
                  thumbnail: log0,
                  renderLargerThumbnail: true,
                  mediaType: 2,
                  mediaUrl: "https://www.youtube.com/@SuhailTechInfo0",
                  sourceUrl: "https://www.youtube.com/@SuhailTechInfo0",
                },
              },
            };
            Void.sendMessage(citel.chat, buttonMessage, { quoted: citel });
          } else {
            citel.reply(`❌ File size bigger than ${dlsize}mb.`);
          }
          fs.unlinkSync(`./${randomName}`);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
);
