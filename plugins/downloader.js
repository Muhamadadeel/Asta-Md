const {
  UserFunction,
  fetchJson,
  amdJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  pinterest,
  prefix,
  Config,
  mediafire,
} = require("../lib");
const { search, download } = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const ytdl = require("ytdl-secktor");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
var videotime = 2000;
const { cmd } = require("../lib/plugins");
UserFunction(
  {
    pattern: "allsocial",
    desc: "Download media from various social platforms.",
    category: "downloader",
    filename: __filename,
    use: "<url>",
  },
  async (messsage, isUrl) => {
    try {
      if (!isUrl) {
        return await messsage.send("*`Hello Sir Give Me A Social Media Link To Download From`*\n\n"+prefix+"allsocial *`your link`*");
      }
      const apiUrl = `https://api.maher-zubair.tech/download/alldownload2?url=${encodeURIComponent(
        isUrl
      )}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return await messsage.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }
      const data = await response.json();
      const result = data.result;

      if (!result || !result.medias || !result.medias.length) {
        return await messsage.send("*_No media found!_*");
      }

      const { title, thumbnail, medias } = result;
      const caption = `*Title:* ${title}\n\n*Source:* ${medias[0].source}`;

      await messsage.bot.sendFromUrl(messsage.from, thumbnail, caption, messsage, {}, "image");

      for (const media of medias) {
        const { url, formattedSize, quality, extension } = media;
        const mediaCaption = `*Quality:* ${quality}\n*Size:* ${formattedSize}\n*Extension:* ${extension}`;
        await messsage.bot.sendFromUrl(messsage.from, url, mediaCaption, messsage, {}, "video");
      }
    } catch (e) {
      await messsage.error(`${e}\n\ncommand: allsocial`, e);
    }
  }
);
UserFunction(
  {
    pattern: "tg2",
    desc: "Downloads telegram stickers.",
    category: "downloader",
    filename: __filename,
    use: "<add sticker url.>",
  },
  async (message, isUrl) => {
    try {
      if (!isUrl) {
        return await message.reply(
          "*`Hello Sir Please Give Me A Vaild Telegram Sticker link`*\n\n"+prefix+"tg2 *`your link`*"
        );
      }
      if (!isUrl.includes("addstickers")) {
        return await message.reply(
          "*`Hello Sir Please Give Me A Vaild Telegram Sticker link`*\n\n"+prefix+"tg2 *`your link`*"
        );
      }
      let GivenUrl = isUrl.split("|")[0];
      let ExtrasUrl = GivenUrl.split("/addstickers/")[1];
      let { result: FetchedData } = await fetchJson(
        "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" +
          encodeURIComponent(ExtrasUrl) +
          " "
      );
      let ComURl = isUrl.split("|")[1] || "";
      let ResultData =
        "Total stickers: " +
        FetchedData.stickers.length +
        "\n*Estimated complete in:* " +
        FetchedData.stickers.length * 1.5 +
        " seconds\nKeep in mind that there is a chance of a ban if used frequently";
      if (FetchedData.is_animated) {
        return await message.reply("Animated stickers are not supported");
      } else if (ComURl.startsWith("info")) {
        return await message.reply(ResultData);
      }
      let FetchedJson = parseInt(ComURl.split(",")[0]) || 10;
      let OutputJson = parseInt(ComURl.split(",")[1]) || 0;
      let ConvGif = ComURl.split(";")[1] || "Sticker";
      let PhotGif = true;
      if (ConvGif.includes("photo")) {
        PhotGif = false;
        ConvGif = "Photo";
      }
      if (FetchedJson > FetchedData.stickers.length) {
        FetchedJson = FetchedData.stickers.length;
      }
      if (OutputJson > FetchedData.stickers.length) {
        OutputJson = FetchedData.stickers.length - 5;
      }
      if (OutputJson > FetchedJson) {
        let _0xe6592a = FetchedJson;
        FetchedJson = OutputJson;
        OutputJson = _0xe6592a;
      }
      await message.reply(
        ResultData +
          "\n\n_Downloading as " +
          ConvGif +
          " From index *" +
          OutputJson +
          "* to *" +
          FetchedJson +
          "*._\nIf you wants more to download then use Like \n\n .tgs " +
          GivenUrl +
          " |  10 ,  20 ; photo"
      );
      for (OutputJson; OutputJson < FetchedJson; OutputJson++) {
        let _0x4de16f = await fetchJson(
          "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" +
            FetchedData.stickers[OutputJson].file_id
        );
        let TotalData =
          "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" +
          _0x4de16f.result.file_path;
        if (PhotGif) {
          let _0x13ee38 = await getBuffer(TotalData);
          await message.reply(
            _0x13ee38,
            {
              packname: Config.packname,
              author: "Astro",
            },
            "sticker"
          );
        } else {
          await message.bot.sendMessage(message.chat, {
            image: {
              url: TotalData,
            },
            caption:
              "*_Telegram Sticker At Index " +
              (OutputJson + 1) +
              " Downloaded_*",
          });
        }
      }
    } catch (err) {
      await message.error(
        err + "\n\ncommand: tgs",
        err,
        "*_Error Sending telegram stickers!!!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "wiki2",
    desc: "Downloads wikimedia images.",
    category: "downloader",
    filename: __filename,
    use: "<text|search.>",
  },
  async (message, query) => {
    try {
      if (!query) {
        return await message.send("*`Sir you didn't give me anything to search for!`*\n\n"+prefix+"wiki2 elon musk");
      }
      let { wikimedia: requested } = require("../lib");
      let match = (await requested(query)) || [];
      if (!match || !match[0]) {
        return await message.send("*_No Results Found!_*");
      }
      let results =
        message.iscreator && query.split("|")[1] === "all"
          ? match.length
          : match.length > 5
          ? 5
          : match.length;
      for (let data = 0; data < results; data++) {
        try {
          message.bot.sendFromUrl(
            message.from,
            match[data].image,
            "Title: " +
              match[data].title +
              "\n*Source:* " +
              match[data].source,
            message,
            {},
            "image"
          );
        } catch {}
      }
    } catch (error) {
      await message.error(error + "\n\ncommand: wiki2", error);
    }
  }
);


UserFunction(
  {
    pattern: "gdrive",
    desc: "Download files from Google Drive.",
    category: "downloader",
    filename: __filename,
    use: "<url>",
  },
  async (message, isUrl) => {
    try {
      if (!isUrl) {
        return await message.send("*_Please provide a Google Drive URL!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/download/gdrive?url=${encodeURIComponent(
        isUrl
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await message.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await message.send(
          `*_Error: ${data.status} - ${data.result || "Unknown error"}_*`
        );
      }

      const { downloadUrl, fileName, fileSize, mimetype } = data.result;
      const caption = `*File:* ${fileName}\n*Size:* ${fileSize}\n*Type:* ${mimetype}`;

      await message.bot.sendFromUrl(message.from, downloadUrl, caption, message, {}, "file");
    } catch (e) {
      await message.error(`${e}\n\ncommand: gdrive`, e);
    }
  }
);
UserFunction(
  {
    pattern: "spotify",
    desc: "Downloads a Spotify song.",
    category: "downloader",
    filename: __filename,
    use: "<Spotify URL>",
  },
  async (message, input) => {
    try {
      const url = input.trim();
      if (!url || !isValidUrl(url)) {
        return await message.send("*_Please provide a valid Spotify URL._*");
      }

      const apiUrl = `https://api.maher-zubair.tech/download/spotify?url=${encodeURIComponent(
        url
      )}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || data.status !== 200) {
        return await message.reply("*Failed to download the Spotify song.*");
      }

      const {
        song,
        artist,
        album_name,
        release_date,
        cover_url,
        url: songUrl,
      } = data.result;

      let output = `*Song:* ${song}\n`;
      output += `*Artist:* ${artist.join(", ")}\n`;
      output += `*Album:* ${album_name}\n`;
      output += `*Release Date:* ${release_date}\n\n`;
      output += `*Cover Image:* ${cover_url}\n\n`;

      const buffer = await axios.get(songUrl, { responseType: "arraybuffer" });
      const fileName = `${song.replace(/\s/g, "_")}.mp3`;

      await message.bot.sendMessage(
        message.chat,
        {
          audio: buffer.data,
          fileName: fileName,
          mimetype: "audio/mpeg",
          caption: output,
        },
        { quoted: message }
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: spotify2",
        error,
        "*Failed to download the Spotify song.*"
      );
    }
  }
);

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
UserFunction(
  {
    pattern: "findspotify",
    alias: "findsp",
    desc: "Searches for Spotify tracks.",
    category: "search",
    filename: __filename,
    use: "<search query>",
  },
  async (message, input) => {
    try {
      const query = input.trim();
      if (!query) {
        return await message.send("*`Hey Sir Give Me Spotify Tracks To Find Informatiion About`*\n\n"+prefix+"findsp *`your link`*");
      }

      const apiUrl = `https://api.maher-zubair.tech/search/spotify?q=${encodeURIComponent(
        query
      )}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || data.status !== 200) {
        return await message.reply("*Failed to fetch Spotify tracks.*");
      }

      const tracks = data.result;
      if (!tracks || tracks.length === 0) {
        return await message.reply("*No Spotify tracks found.*");
      }

      let output = "*Spotify Search Results:*\n\n";
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        output += `*${i + 1}. ${track.title}*\n`;
        output += `Artist: ${track.artist}\n`;
        output += `Duration: ${formatDuration(track.duration)}\n`;
        output += `Popularity: ${track.popularity}\n`;
        output += `Preview: ${
          track.preview ? track.preview : "No preview available"
        }\n`;
        output += `URL: ${track.url}\n\n`;
      }

      return await message.send(output, { quoted: message });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: spotify",
        error,
        "*Failed to search Spotify.*"
      );
    }
  }
);

function formatDuration(durationMs) {
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
  return `${hours ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
}
UserFunction(
  {
    pattern: "twitter",
    alias: ["tw", "twdl"],
    desc: "Downloads Twitter videos.",
    category: "downloader",
    filename: __filename,
    use: "<add Twitter URL>",
  },
  async (message, input) => {
    try {
      let query = input.split(" ")[0].trim();
      if (!query || !query.startsWith("https://")) {
        return await message.send(
          "*_Please provide a valid Twitter Video URL._*\n*Example: " +
            prefix +
            "tw https://twitter.com/username/status/1234567890_*"
        );
      }

      let video = await fetchJson(
        "https://api.maher-zubair.tech/download/twitter?url=" + query
      );

      if (!video || !video.status === 200) {
        return await message.reply("*Invalid Video URL!*");
      }

      let caption = video.data.caption
        ? video.data.caption
        : `*Twitter Video Download*\n\n*Username:* ${video.data.username}`;

      return await message.bot.sendMessage(
        message.chat,
        {
          video: { url: video.data.HD },
          caption: caption,
        },
        { quoted: message }
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: twitter",
        error,
        "*_Video not found!_*"
      );
    }
  }
);
let fb_api = "https://api-smd.onrender.com"
UserFunction(
  {
    pattern: "facebook",
    alias: ["fb", "fbdl"],
    desc: "Downloads fb videos.",
    category: "downloader",
    filename: __filename,
    use: "<add fb url.>",
  },
  async (message, isUrl) => {
    try {
      let match = isUrl.split(" ")[0].trim();
      if (!match || !match.startsWith("https://")) {
        return await message.send(
          "`*Hello Give Me A Vaild FaceBook Link`*\n\n"+prefix+"facebook *`your link`*"
        );
      }
      let result = await amdJson(fb_api + "/api/fb?url=" + match);
      if (!result || !result.status) {
        return await message.reply("*Invalid Video Url!*");
      }
      return await message.bot.sendMessage(
        message.chat,
        {
          video: {
            url: result.result.urls[0].url,
          }
        },
        {
          quoted: message,
        }
      );
    } catch (error) {
      await message.error(
        error + "\n\ncommand: facebook",
        error,
        "*_video not Found!!!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "apk",
    alias: ["modapk"],
    desc: "Downloads apks  .",
    category: "downloader",
    filename: __filename,
    use: "<add sticker url.>",
  },
  async (message, query) => {
    try {
      if (!query) {
        return message.reply("*`Give me App Name`*");
      }
      let data = await search(query);
      let result = {};
      if (data.length) {
        result = await download(data[0].id);
      } else {
        return message.reply("*_Apk not found, Try another name!!_*");
      }
      const init = parseInt(result.size);
      if (init > 200) {
        return message.reply("❌ File size bigger than 200mb.");
      }
      const info = result.dllink;
      let _0x24f726 = await fancytext(
`『 *ᗩᑭᏦ  ᗞᝪᗯᑎしᝪᗩᗞᗴᖇ* 』
*APP Name :*  ${result.name}
*App Id :* ${result.package}
*Last Up :* ${result.lastup}
*App Size :* " ${result.size}`
);
      const ResultFile = (result?.name || "Downloader") + ".apk";
      const STORE = "temp/" + ResultFile;
      let asked = await message.reply(
        result.icon,
        {
          caption: _0x24f726,
        },
        "img",
        message
      );
      axios
        .get(info, {
          responseType: "stream",
        })
        .then((streamLike) => {
          const DL = fs.createWriteStream(STORE);
          streamLike.data.pipe(DL);
          return new Promise((file, file_err) => {
            DL.on("finish", file);
            DL.on("error", file_err);
          });
        })
        .then(() => {
          let _0x389371 = {
            document: fs.readFileSync(STORE),
            mimetype: "application/vnd.android.package-archive",
            fileName: ResultFile,
          };
          message.bot.sendMessage(message.jid, _0x389371, {
            quoted: asked,
          });
          try {
            fs.unlink(STORE);
          } catch {}
        })
        .catch((_0x2490b5) => {
          try {
            fs.unlink(STORE);
          } catch {}
          message.reply("*_Apk not Found, Sorry_*");
        });
    } catch (error) {
      await message.error(
        error + "\n\ncommand: apk",
        error,
        "*_Apk not Found!_*"
      );
    }
  }
);
cmd(
  {
    pattern: "apksearch",
    desc: "Search App",
    category: "downloader",
    filename: __filename,
    use: "<Search Query>",
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.reply("*`Give me app name`*");
      }
      const Request = await search(match);
      if (Request.length) {
        let files = await download(Request[0].id);
        let Info =
          "*ᴀsᴛᴀ-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ* \n*________________________________* \n\n*_Reply Any Number To Download._*\n_Results For : " +
          match +
          "_ \n";
        for (let results = 0; results < Request.length; results++) {
          Info +=
            "\n*" +
            (results + 1) +
            " : " +
            Request[results].name +
            "* \n*Id : " +
            Request[results].id +
            "* \n";
        }
        return await message.sendMessage(
          message.chat,
          {
            image: {
              url: files.icon,
            },
            caption: Info,
          },
          {
            quoted: message,
          }
        );
      } else {
        return message.reply("*_APP not Found, Try Other Name_*");
      }
    } catch (error) {
      message.error(error + "\n\ncommand: apks", error);
    }
  }
);
UserFunction(
  {
    pattern: "gitclone",
    desc: "Downloads apks  .",
    category: "downloader",
    filename: __filename,
    use: "<add sticker url.>",
  },
  async (message, match) => {
    try {
      let info = match
        ? match
        : message.reply_message
        ? message.reply_message.text
        : "";
      if (!match) {
        return await message.reply(
          "*`Give Me Git Repo`*\n\n"+prefix+"gitclone https://github.com/Astropeda/Asta-Md"
        );
      }
      const URl =
        /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
      if (!URl.test(match)) {
        return await message.reply("*Provide Valid Repositry Url*");
      }
      let [URl_L, URL_M, URL_B] = match.match(URl) || [];
      URL_B = URL_B.replace(/.git$/, "");
      let resultFile =
        "https://api.github.com/repos/" +
        URL_M +
        "/" +
        URL_B +
        "/zipball";
      let FetchedData = (
        await fetch(resultFile, {
          method: "HEAD",
        })
      ).headers
        .get("content-disposition")
        .match(/attachment; filename=(.*)/)[1];
      await message.bot.sendMessage(message.jid, {
        document: {
          url: resultFile,
        },
        fileName: FetchedData,
        mimetype: "application/zip",
      });
    } catch (error) {
      return message.error(
        error + "\n\ncommand: gitclone",
        error,
        "*_File not found!!!_*"
      );
    }
  }
);
const ytIdRegex =
  /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
UserFunction(
  {
    pattern: "fbmp3",
    desc: "Downloads Facebook videos in audio.",
    category: "downloader",
    filename: __filename,
    use: "<add Facebook URL>",
  },
  async (message, input) => {
    try {
      let query = input.split(" ")[0].trim();
      if (!query || !query.startsWith("https://")) {
        return await message.send(
          "*_Please provide a valid Facebook Video URL._"
        );
      }
      let video = await astroJson(
        "https://api-smd.onrender.com/api/fbdown?url=" + query
      );
      if (!video || !video.status) {
        return await message.reply("*Invalid Video URL!*");
      }
      return await message.bot.sendMessage(
        message.chat,
        {
          video: {
            url: video.result.audio, // Assuming you want the audio quality
          },
        },
        {
          quoted: message,
        }
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: facebook",
        error,
        "*_Video not found!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "insta2",
    desc: "Download media from Instagram.",
    category: "downloader",
    filename: __filename,
    use: "<url>",
  },
  async (m, providedUrl = "") => {
    try {
      const url = providedUrl.trim(); // Trim any leading/trailing whitespace
      if (!url) {
        return await m.send("*_Please provide an Instagram URL!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/download/instagram?url=${encodeURIComponent(
        url
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send(
          `*_Error: ${data.status} - ${data.result || "Unknown error"}_*`
        );
      }

      const mediaData = data.result[0];

      if (!mediaData) {
        return await m.send("*_No media found!_*");
      }

      const { thumbnail, url: mediaUrl, wm } = mediaData;
      const caption = `*Watermark:* ${wm}\n\n_Note: This media may have a watermark._`;

      await m.bot.sendFromUrl(m.from, thumbnail, caption, m, {}, "image");
      await m.bot.sendFromUrl(m.from, mediaUrl, "", m, {}, "video");
    } catch (e) {
      await m.error(`${e}\n\ncommand: instagram2`, e);
    }
  }
);
UserFunction(
  {
    pattern: "tts",
    desc: "text to speech.",
    category: "downloader",
    filename: __filename,
    use: "<Hii,this is Asta>",
  },
  async (message, query) => {
    try {
      let isVoice = message.reply_text ? message.reply_text : query;
      if (!isVoice) {
        return message.reply(
          "*`Example : "+prefix+"tts Hi,I am Asta-Md whatsapp bot.`*"
        );
      }
      try {
        let data = query
          ? query.split(" ")[0].toLowerCase()
          : "en";
        const _0x18d003 = googleTTS.getAudioUrl(isVoice, {
          lang: data,
          slow: true,
          host: "https://translate.google.com",
        });
        await message.bot.sendMessage(
          message.jid,
          {
            audio: {
              url: _0x18d003,
            },
            mimetype: "audio/mpeg",
            ptt: true,
            fileName: "Asta-Md-tts.m4a",
          },
          {
            quoted: message,
          }
        );
      } catch (err) {
        const result = googleTTS.getAudioUrl(isVoice, {
          lang: "en",
          slow: true,
          host: "https://translate.google.com",
        });
        await message.bot.sendMessage(
          message.jid,
          {
            audio: {
              url: result,
            },
            mimetype: "audio/mpeg",
            ptt: true,
            fileName: "Asta-Md-tts.m4a",
          },
          {
            quoted: message,
          }
        );
      }
    } catch (error) {
      return message.error(error + "\n\ncommand: tts", error, false);
    }
  }
);
UserFunction(
  {
    pattern: "snack",
    desc: "Downloads Snack videos.",
    category: "downloader",
    filename: __filename,
    use: "<snack video url>",
  },
  async (message, url) => {
    try {
      if (!url) {
        return await message.reply("*Please provide a Snack video URL.*");
      }

      const apiUrl = `https://api.maher-zubair.tech/download/snack?url=${encodeURIComponent(
        url
      )}`;
      const response = await fetchJson(apiUrl);

      if (response.status !== 200) {
        return await message.reply(`*Error: ${response.result}*`);
      }

      const { caption, url: videoUrl } = response.result;
      await message.send(videoUrl, { caption }, "video", message);
    } catch (error) {
      console.error(error);
      await message.reply("*An error occurred while downloading the video.*");
    }
  }
);
UserFunction(
  {
    pattern: "wiki",
    desc: "Downloads wikimedia images.",
    category: "downloader",
    filename: __filename,
    use: "<text|search.>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return await m.send("*_Please Give me search query!_*");
      }

      const { wikimedia } = require("../lib");
      const results = (await wikimedia(query)) || [];

      if (!results || !results[0]) {
        return await m.send("*_No Results Found!_*");
      }

      const maxResults =
        m.iscreator && query.split("|")[1] === "all"
          ? results.length
          : results.length > 5
          ? 5
          : results.length;

      for (let i = 0; i < maxResults; i++) {
        try {
          m.bot.sendFromUrl(
            m.from,
            results[i].image,
            `Title: ${results[i].title}\n*Source:* ${results[i].source}`,
            m,
            {},
            "image"
          );
        } catch {}
      }
    } catch (e) {
      await m.error(`${e}\n\ncommand: insta`, e);
    }
  }
);
UserFunction(
  {
    pattern: "fb2",
    alias: ["fb", "fbdl"],
    desc: "Downloads Facebook videos.",
    category: "downloader",
    filename: __filename,
    use: "<add Facebook URL>",
  },
  async (message, input) => {
    try {
      let query = input.split(" ")[0].trim();
      if (!query || !query.startsWith("https://")) {
        return await message.send(
          "`*Hello Give Me A Vaild FaceBook Link`*\n\n"+prefix+"facebook *`your link`*"
        );
      }
      let video = await fetch(
        "https://api-smd.onrender.com/api/fbdown?url=" + query
      );
      if (!video || !video.status) {
        return await message.reply("*Invalid Video URL!*");
      }
      return await message.bot.sendMessage(
        message.chat,
        {
          video: {
            url: video.result.Normal_video, // Assuming you want the normal quality video
          },
        },
        {
          quoted: message,
        }
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: facebook",
        error,
        "*_Video not found!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "fb3",
    alias: ["fbhd"],
    desc: "Downloads Facebook videos in HD.",
    category: "downloader",
    filename: __filename,
    use: "<add Facebook URL>",
  },
  async (message, input) => {
    try {
      let query = input.split(" ")[0].trim();
      if (!query || !query.startsWith("https://")) {
        return await message.send(
          "`*Hello Give Me A Vaild FaceBook Link`*\n\n"+prefix+"facebook *`your link`*"
        );
      }
      let video = await fetch(
        "https://api-smd.onrender.com/api/fbdown?url=" + query
      );
      if (!video || !video.status) {
        return await message.reply("*Invalid Video URL!*");
      }
      return await message.bot.sendMessage(
        message.chat,
        {
          video: {
            url: video.result.HD, // Assuming you want the HD quality video
          },
          caption: Config.caption,
        },
        {
          quoted: message,
        }
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: facebook",
        error,
        "*_Video not found!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "downmp4",
    desc: "download mp4 from url.",
    category: "downloader",
    use: "<url>",
    filename: __filename,
  },
  async (msg, qury) => {
    try {
      let match = ("" + (qury ? qury : msg.reply_text))
        .split(" ")[0]
        .toLowerCase()
        .trim();
      if (!match || !match.toLowerCase().startsWith("http")) {
        return msg.reply(
          "`*Hello Give Me A Video Link`*\n\n"+prefix+"downmp4 *`your link`*"
        );
      }
      var _0x1e4a34 = qury.toLowerCase().includes("doc")
        ? "document"
        : "video";
      await msg.bot.sendMessage(
        msg.chat,
        {
          [_0x1e4a34]: {
            url: match,
          },
          caption: "*HERE WE GO*",
          contextInfo: {
            ...(await msg.bot.contextInfo(
              Config.botname,
              msg.senderName
            )),
          },
        },
        {
          quoted: msg,
        }
      );
    } catch (error) {
      await msg.error(
        error + "\n\ncommand : downmp4",
        error,
        "*_Please, Give me valid video url!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "scloud",
    alias: ["scdl", "scdownload"],
    desc: "Download audio from SoundCloud.",
    category: "downloader",
    filename: __filename,
    use: "<SoundCloud audio URL>",
  },
  async (msg, query) => {
    try {
      const url = query.trim();
      if (!url) {
        return await msg.reply("*Please provide a SoundCloud audio URL.*");
      }

      const apiUrl = `https://api.maher-zubair.tech/download/soundcloud?url=${encodeURIComponent(
        url
      )}`;
      const response = await fetch(apiUrl).then((res) => res.json());

      if (!response || response.status !== 200) {
        return await msg.reply(
          "*An error occurred while downloading the SoundCloud audio.*"
        );
      }

      const result = response.result;
      const audioUrl = result.link;
      const thumbnailUrl = result.thumb;
      const title = result.title;
      const downloadCount = result.download_count;

      await msg.bot.sendAudio(
        msg.chat,
        audioUrl,
        title,
        downloadCount,
        thumbnailUrl,
        { quoted: msg }
      );
    } catch (err) {
      await msg.error(
        err + "\n\ncommand: soundcloud",
        err,
        "*An error occurred while downloading the SoundCloud audio.*"
      );
    }
  }
);
UserFunction(
    {
      pattern: "tiktok",
      desc: "Downloads Tiktok Videos Via Url.",
      category: "downloader",
      filename: __filename,
      use: "<add tiktok url.>",
    },
    async (message, url) => {
      try {
        if (!url) {
          return await message.reply(
            "`*Hello Give Me A Vaild Tiktok Link`*\n\n"+prefix+"tiktok *`your link`*"
          );
        }
  
        const tiktokUrl = url.split(" ")[0];
        if (!/tiktok/.test(tiktokUrl)) {
          return await message.reply(
            "*Uhh Please, Give me Valid Tiktok Video Url!*"
          );
        }
  
        const apiUrl = `https://api.maher-zubair.tech/download/tiktok?url=${encodeURIComponent(
          tiktokUrl
        )}`;
        const response = await fetchJson(apiUrl);
  
        if (response.status !== 200) {
          return await message.reply(`*Error: ${response.result}*`);
        }
  
        const videoUrl = response.result;
        const fileType = videoUrl.toLowerCase().includes("mp4")
          ? "video"
          : "document";
  
        await message.send(
          videoUrl,
          { caption: Config.caption },
          fileType,
          message
        );
      } catch (error) {
        console.error(error);
        return message.error(`${error}\n\ncommand: tiktok`, error);
      }
    }
  );
UserFunction(
  {
    pattern: "tiktok2",
    alias: ["tt2", "ttdl2"],
    desc: "Downloads Tiktok Videos Via Url.",
    category: "downloader",
    filename: __filename,
    use: "<add tiktok url.>",
  },
  async (message, url) => {
    try {
      const fileType = url.toLowerCase().includes("doc")
        ? "document"
        : url.toLowerCase().includes("mp3")
        ? "audio"
        : "video";

      if (!url) {
        return await message.reply(
          "`*Hello Give Me A Vaild Tiktok Link`*\n\n"+prefix+"tiktok *`your link`*"
        );
      }

      const tiktokUrl = url ? url.split(" ")[0] : "";

      if (!/tiktok/.test(tiktokUrl)) {
        return await message.reply(
          "*Uhh Please, Give me Valid Tiktok Video Url!*"
        );
      }

      const apiUrl = "https://api-smd.onrender.com/api/ttdl2";
      const response = await fetch(`${apiUrl}?url=${tiktokUrl}`);
      const data = await response.json();

      if (data && data.video && data.video.noWatermark) {
        return await message.send(
          data.video.noWatermark,
          { caption: Config.caption },
          fileType,
          message
        );
      } else {
        return await message.reply("Error While Downloading Your Video");
      }
    } catch (error) {
      return message.error(`${error}\n\ncommand: tiktok`, error);
    }
  }
);

UserFunction(
  {
    pattern: "pint2",
    desc: "Downloads images from Pinterest.",
    category: "downloader",
    filename: __filename,
    use: "<text|image name>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return m.reply("What picture are you looking for?");
      }

      const apiUrl = `https://api.maher-zubair.tech/search/pinterest?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return m.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();
      const results = data.result;

      if (!results || !results.length) {
        return await m.send("*_No Result found!_*");
      }

      const contextInfo = {
        ...(await m.bot.contextInfo(Config.botname, "ᴘɪɴᴛᴇʀᴇꜱᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")),
      };

      const maxResults = results.length < 5 ? results.length : 5;
      for (let i = 0; i < maxResults; i++) {
        await m.bot.sendMessage(m.chat, {
          image: { url: results[i] },
          contextInfo,
        });
      }
    } catch (e) {
      return m.reply("Uhh Please, Give me a Name. Ex .pintrest apple");
    }
  }
);
UserFunction(
  {
    pattern: "mediafire2",
    alias: ["mf", "mfire"],
    desc: "Downloads media from Mediafire.",
    category: "downloader",
    filename: __filename,
    use: "<url of mediafire>",
  },
  async (m, url) => {
    try {
      if (!url || !url.includes("mediafire.com")) {
        return m.reply(
          `*_Provide mediafire url, Use: ${prefix}mf https://www.mediafire.com/file/i33wo2xvgvid05m/muezzaverse_2221749531_musicaldown.com.mp4/file!_*`
        );
      }

      const apiUrl = `https://api.maher-zubair.tech/download/mediafire?url=${encodeURIComponent(
        url
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return m.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();
      const result = data.result;

      if (!result || !result.link) {
        return m.reply("*_Could not find the file!_*");
      }

      const caption = `『 *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ* 』\n\n *Name* : ${result.name}\n *Size* : ${result.size}\n *Mime* : ${result.mime}\n\n\n${Config.caption}`;
      const fancyCaption = await fancytext(caption, 25);
      const contextInfo = {
        ...(await m.bot.contextInfo(Config.botname, "MEDIAFIRE")),
      };

      const mediaInfo = {
        document: {
          url: result.link,
        },
        caption: fancyCaption,
        fileName: result.name,
        mimetype: result.mime,
        contextInfo: contextInfo,
      };

      await m.bot.sendMessage(m.chat, mediaInfo);
    } catch (e) {
      m.error(`${e}\n\ncommand: mediafire`, e, "*_File not found!!_*");
    }
  }
);
UserFunction(
  {
    pattern: "video",
    desc: "Downloads video from yt.",
    category: "downloader",
    filename: __filename,
  },
  async (meesage, query) => {
    let match = query ? query : meesage.reply_text;
    var isDoc = query.toLowerCase().includes("doc")
      ? "document"
      : "video";
    if (!match) {
      return meesage.reply("*Use : " + prefix + "video Moon Men*");
    }
    let DResult = ytIdRegex.exec(query) || [];
    let elseMatch = DResult[0] || false;
    try {
      if (!elseMatch) {
        let Vdata = await yts(match);
        let RVdata = Vdata.videos[0];
        elseMatch = RVdata.url;
        DResult = ytIdRegex.exec(elseMatch);
      }
    } catch {}
    try {
      let DetailInfo = await ytdl.getInfo(elseMatch);
      let incase = Math.floor(i.timestamp * 60);
      if (incase >= videotime) {
        isDoc = "document";
      }
      let resultFile = DetailInfo.videoDetails.title;
      let SaveDir = "./temp/" + DResult[1] + ".mp4";
      const EndResult = ytdl(elseMatch, {
        filter: (SelectRan) => SelectRan.itag == 22 || SelectRan.itag == 18,
      }).pipe(fs.createWriteStream(SaveDir));
      await new Promise((Success, Failure) => {
        EndResult.on("error", Failure);
        EndResult.on("finish", Success);
      });
      var EndRsultMsg = {
        ...(await meesage.bot.contextInfo(
          Config.botname,
          "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"
        )),
      };
      let MetaData = {
        [isDoc]: fs.readFileSync(SaveDir),
        mimetype: "video/mp4",
        fileName: resultFile,
        caption: Config.caption,
        contextInfo: EndRsultMsg,
      };
      await meesage.bot.sendMessage(meesage.jid, MetaData, {
        quoted: meesage,
      });
      try {
        fs.unlinkSync(SaveDir);
      } catch {}
    } catch (error) {
      console.log("ytdl Download video error:", error);
      try {
        let InfoVidMeta = await yt.getInfo(DResult[1]);
        if (InfoVidMeta.duration >= videotime) {
          isDoc = "document";
        }
        let FTYPE = {
          type: "video",
          quality: InfoVidMeta.pref_Quality || "best",
          format: "mp4",
        };
        let DocMsgMeta = await yt.download(DResult[1], FTYPE);
        var EndRsultMsg = {
          ...(await meesage.bot.contextInfo(
            Config.botname,
            "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"
          )),
        };
        let DocFileData =
          InfoVidMeta.title ||
          DocMsgMeta ||
          DResult[1] ||
          "Asta MD -- YT Video";
        if (DocMsgMeta) {
          await meesage.bot.sendMessage(meesage.chat, {
            [isDoc]: {
              url: DocMsgMeta,
            },
            fileName: DocFileData,
            caption: Config.caption,
            mimetype: "video/mp4",
            contextInfo: EndRsultMsg,
          });
        } else {
          await meesage.send("Video not Found");
        }
        try {
          fs.unlinkSync("" + DocMsgMeta);
        } catch {}
      } catch (err) {
        return meesage.error(
          err + "\n\ncommand: video",
          err,
          "*_Video not Found_*"
        );
      }
    }
  }
);
UserFunction(
  {
    pattern: "video2",
    desc: "Downloads video from yt.",
    category: "downloader",
    filename: __filename,
    use: "<faded-Alan Walker>",
  },
  async (message, results) => {
    let match = results ? results : message.reply_text;
    if (!match) {
      return message.reply("Example : " + prefix + "video2 hello world");
    }
    var TypeData = match.toLowerCase().includes("doc")
      ? "document"
      : "video";
    let ElseCheckedReee = ytIdRegex.exec(results) || [];
    let Matched = ElseCheckedReee[0] || false;
    try {
      if (!Matched) {
        let results = await yts(match);
        let RESULT = results.videos[0];
        Matched = RESULT.url;
        ElseCheckedReee = ytIdRegex.exec(Matched);
      }
    } catch {}
    try {
      let FILE_TYPE = await yt.getInfo(ElseCheckedReee[1]);
      let _0x355f66 = {
        type: "video",
        quality: FILE_TYPE.pref_Quality || "best",
        format: "mp4",
      };
      if (FILE_TYPE.duration >= videotime) {
        TypeData = "document";
      }
      let InitDat = await yt.download(ElseCheckedReee[1], _0x355f66);
      let Output = FILE_TYPE.title || InitDat || ElseCheckedReee[1];
      var DocsVdFileType = {
        ...(await message.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")),
      };
      if (InitDat) {
        await message.bot.sendMessage(message.chat, {
          [TypeData]: {
            url: InitDat,
          },
          fileName: Output,
          caption: Config.caption,
          mimetype: "video/mp4",
          contextInfo: DocsVdFileType,
        });
      } else {
        await message.send("Video not Found");
      }
      try {
        fs.unlinkSync("" + InitDat);
      } catch {}
    } catch (err) {
      return message.error(
        err + "\n\ncommand: video",
        err,
        "*_Video not Found_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "play",
    alias: ["music"],
    desc: "Sends info about the query(of youtube video/audio).",
    category: "downloader",
    filename: __filename,
    use: "<faded-Alan walker.>",
  },
  async (message, query) => {
    try {
      let match = query ? query : message.reply_text;
      var TYPE = match.toLowerCase().includes("doc")
        ? "document"
        : "audio";
      if (!match) {
        return message.reply("*" + prefix + "play back in black*");
      }
      let result = ytIdRegex.exec(match) || [];
      let Rmatch = result[0] || false;
      if (!Rmatch) {
        let file = await yts(match);
        let endResult = file.videos[0];
        Rmatch = endResult.url;
      }
      result = ytIdRegex.exec(Rmatch) || [];
      let data = await yt.getInfo(result[1]);
      let filename = data.title || resulted || result[1];
      if (data && data.duration >= videotime) {
        return await message.reply(
          "*_Can't dowanload, file duration too big_*"
        );
      }
      await message.send("_Downloading " + data.title + "?_");
      let resulted = await yt.download(result[1], {
        type: "audio",
        quality: "best",
      });
      var MTYPE = {
        ...(await message.bot.contextInfo(Config.botname, "ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")),
      };
      if (resulted) {
        await message.bot.sendMessage(message.jid, {
          [TYPE]: {
            url: resulted,
          },
          fileName: filename,
          mimetype: "audio/mpeg",
          contextInfo: MTYPE,
        });
      } else {
        message.send("*_Video not Found_*");
      }
      try {
        fs.unlinkSync(resulted);
      } catch {}
    } catch (error) {
      return message.error(
        error + "\n\ncommand: play",
        error,
        "*_Video not Found_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "sound",
    desc: "Downloads ringtone.",
    category: "downloader",
    filename: __filename,
    use: "<Dowanload Tiktok Sounds>",
  },
  async (message, match) => {
    try {
      if (!match) {
        return message.reply(
          "*Give A Number Example: " + prefix + "sound 5*"
        );
      }
      const data = parseInt(match);
      if (data.toString() == "NaN" || data < 1 || data > 160) {
        return message.reply("*_❌ Give a number between 1 to 160_*");
      }
      let F =
        "https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound" +
        data.toString() +
        ".mp3";
      let AFILE = await getBuffer(F);
      var MTYPE = {
        ...(await message.bot.contextInfo(
          Config.botname,
          "ᴛɪᴋᴛᴏᴋ ꜱᴏᴜɴᴅ " + data
        )),
      };
      let FTYPE = {
        audio: AFILE,
        fileName: "Asta-Md tiktok Sound" + data + ".m4a",
        mimetype: "audio/mpeg",
        ptt: true,
        contextInfo: MTYPE,
      };
      return message.bot.sendMessage(message.chat, FTYPE, {
        quoted: message,
      });
    } catch (error) {
      return message.error(
        error + "\n\ncommand: sound",
        error,
        false
      );
    }
  }
);
UserFunction(
  {
    pattern: "threads",
    category: "downloader",
    filename: __filename,
    desc: "Download media from Threads.",
  },
  async (m, text) => {
    try {
      if (!text) return await m.send("*_Please provide a Threads link_*");

      let apiUrl = `https://api.maher-zubair.tech/download/threads?url=${text}`;
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        let result = jsonResponse.result;
        let imageUrls = result.image_urls;
        let videoUrls = result.video_urls;

        if (imageUrls.length > 0) {
          for (let imageUrl of imageUrls) {
            await m.send(imageUrl, { caption: Config.caption }, "image", m);
          }
        }

        if (videoUrls.length > 0) {
          for (let videoUrl of videoUrls) {
            await m.send(videoUrl, { caption: Config.caption }, "video", m);
          }
        }
      } else {
        await m.send("*_Request not be preceed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: threads",
        error,
        "*_No responce from API, Sorry!!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "ringtone",
    desc: "Downloads ringtone.",
    category: "downloader",
    filename: __filename,
    use: "<ringtone name>",
  },
  async (message, match) => {
    try {
      if (!match) {
        return message.reply("Example: " + prefix + "ringtone back in black");
      }
      const { ringtone: query } = require("../lib/scraper");
      let data = await query(match);
      var MTYPE = {
        ...(await message.bot.contextInfo(
          Config.botname,
          "ʀɪɴɢᴛᴏɴᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"
        )),
      };
      let ATYPE = {
        audio: {
          url: data[0].audio,
        },
        caption: "*" + data[0].title + "*",
        fileName: data[0].title + ".mp3",
        mimetype: "audio/mpeg",
        contextInfo: MTYPE,
      };
      return message.bot.sendMessage(message.jid, ATYPE, {
        quoted: message,
      });
    } catch (error) {
      return message.error(
        error + "\n\ncommand: ringtone",
        error,
        "*_Ringtone not found with given name!!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "pinterest",
    desc: "Downloads image from pinterest.",
    category: "downloader",
    filename: __filename,
    use: "<text|image name>",
  },
  async (msg, query) => {
    try {
      if (!query) {
        return msg.reply("What picture are you looking for?");
      }
      let request = (await pinterest(query)) || [];
      if (!request || !request[0]) {
        return await msg.send("*_No Result found!_*");
      }
      var MTYPE = {
        ...(await msg.bot.contextInfo(
          Config.botname,
          "ᴘɪɴᴛᴇʀᴇꜱᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"
        )),
      };
      let data = request.length < 5 ? request.length : 5;
      for (let result = 0; result < data; result++) {
        await msg.bot.sendMessage(msg.chat, {
          image: {
            url: request[result],
          },
          contextInfo: MTYPE,
        });
      }
    } catch (err) {
      return msg.reply("*`Sir Use "+prefix+"pinterest cars`*");
    }
  }
);
UserFunction(
  {
    pattern: "mediafire",
    alias: ["mf", "mfire"],
    desc: "Downloads media from Mediafire.",
    category: "downloader",
    filename: __filename,
    use: "<url of mediafire>",
  },
  async (message, query) => {
    try {
      let request = query.includes("mediafire.com")
        ? query
        : message.reply_text || "";
      if (!request.includes("mediafire.com")) {
        return message.reply(
          "*_Provide mediafire url, Use: " +
            prefix +
            "mf https://www.mediafire.com/file/i33wo2xvgvid05m/muezzaverse_2221749531_musicaldown.com.mp4/file!_*"
        );
      }
      let asked = request.split(" ")[0];
      const result = await mediafire(asked);
      if (!result || !result[0]) {
        return message.reply("could not found anything");
      }
      let _0x504ec3 =
        "『 *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ* 』\n\n *Name* : " +
        result[0].nama +
        "\n *Size* :" +
        result[0].size +
        "\n *Mime* : " +
        result[0].mime +
        "\n \n\n" +
        Config.caption;
      _0x504ec3 = await fancytext(_0x504ec3, 25);
      var MTYPE = {
        ...(await message.bot.contextInfo(Config.botname, "MEDIAFIRE")),
      };
      let DTYPE = {
        document: {
          url: result[0].link,
        },
        caption: _0x504ec3,
        fileName: result[0].nama,
        mimetype: result[0].mime,
        contextInfo: MTYPE,
      };
      return await message.bot.sendMessage(message.chat, DTYPE);
    } catch (err) {
      return message.error(
        err + "\n\ncommand: mediafire",
        err,
        "*_File not found!!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "song",
    alias: ["audio"],
    desc: "Downloads audio from youtube.",
    category: "downloader",
    filename: __filename,
    use: "<give text>",
  },
  async (mesage, match) => {
    try {
      if (!match) {
        return await mesage.reply("*_Give Me Search Query_*");
      }
      let q = await yts(match);
      let resukt = q.all[0];
      let RTYPE =
        "\t *ᴀsᴛᴀ-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*   \n\n*Title :* " +
        resukt.title +
        "\nUrl : " +
        resukt.url +
        "\n*Description :* " +
        resukt.timestamp +
        "\n*Views :* " +
        resukt.views +
        "\n*Uploaded :* " +
        resukt.ago +
        "\n*Author :* " +
        resukt.author.name +
        "\n\n\n_Reply 1 To Video_ Or _1 document_\n_Reply 2 To Audio_ Or _2 document_";
      let IMGTYPE = await smdBuffer(resukt.thumbnail);
      var CTYPE = {
        ...(await mesage.bot.contextInfo(
          Config.botname,
          "ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ",
          IMGTYPE
        )),
      };
      await mesage.bot.sendMessage(mesage.jid, {
        image: IMGTYPE,
        caption: RTYPE,
        contextInfo: CTYPE,
      });
    } catch (errr) {
      return mesage.error(
        errr + "\n\ncommand: mediafire",
        errr,
        "*_File not found!!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "yts",
    alias: ["yt", "ytsearch"],
    desc: "Search Song From youtube",
    category: "downloader",
    filename: __filename,
    use: "<Yt Search Query>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return await m.reply("*_Give Me Search Query!_*");
      }
      let resulr = await yts(query);
      let MTYPE =
        "*ᴀsᴛᴀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ* \n\n\n_Reply Any Number To Download._\n  _For Audio: 1 mp3._\n  _For Video: 1 video._\n  _For document: 1 document._\n\n_Results For : " +
        query +
        "_ \n\n";
      let DAT = 1;
      for (let resulted of resulr.all) {
        MTYPE +=
          " \n*" +
          DAT++ +
          " : " +
          resulted.title +
          (resulted.timestamp ? "(" + resulted.timestamp + ")" : "") +
          "*\n*Url : " +
          resulted.url +
          "*";
      }
      return await m.sendMessage(
        m.chat,
        {
          image: {
            url: resulr.all[0].thumbnail,
          },
          caption: MTYPE,
        },
        {
          quoted: m,
        }
      );
    } catch (err) {}
  }
);
UserFunction(
  {
    pattern: "ytmp4",
    alias: ["ytv", "ytvid", "ytvideo"],
    desc: "Downloads video from youtube.",
    category: "downloader",
    filename: __filename,
    use: "<yt video url>",
  },
  async (_0x1d4717, _0x3716fd) => {
    let _0x2d4f04 = _0x3716fd ? _0x3716fd : _0x1d4717.reply_text;
    var _0x58ceb6 = _0x2d4f04.toLowerCase().includes("doc")
      ? "document"
      : _0x2d4f04.toLowerCase().includes("mp3")
      ? "audio"
      : "video";
    const _0x4a3f32 = ytIdRegex.exec(_0x2d4f04) || [];
    if (!_0x2d4f04 || !_0x4a3f32[0]) {
      return await _0x1d4717.reply("*_provide youtube video url!_*");
    }
    try {
      let _0x5c93a9 = await ytdl.getInfo(_0x4a3f32[0]);
      if (_0x5c93a9.videoDetails.lengthSeconds >= videotime) {
        _0x58ceb6 = "document";
      }
      let _0x1a3a4c = _0x5c93a9.videoDetails.title;
      let _0x1c86b6 = "./temp/" + _0x4a3f32[1] + ".mp4";
      const _0x1f15ef = ytdl(_0x4a3f32[0], {
        filter: (_0x4c0ea7) => _0x4c0ea7.itag == 22 || _0x4c0ea7.itag == 18,
      }).pipe(fs.createWriteStream(_0x1c86b6));
      await new Promise((_0x517788, _0x429bfa) => {
        _0x1f15ef.on("error", _0x429bfa);
        _0x1f15ef.on("finish", _0x517788);
      });
      var _0x3b1bff = {
        ...(await _0x1d4717.bot.contextInfo(Config.botname, "ʏᴛᴅʟ ᴠɪᴅᴇᴏ")),
      };
      let _0x4d676e = {
        [_0x58ceb6]: fs.readFileSync(_0x1c86b6),
        mimetype: "video/mp4",
        fileName: _0x1a3a4c,
        caption: "  *Here's Your Video*\n" + Config.caption,
        contextInfo: _0x3b1bff,
      };
      await _0x1d4717.bot.sendMessage(_0x1d4717.jid, _0x4d676e, {
        quoted: _0x1d4717,
      });
      try {
        return await fs.unlinkSync(_0x1c86b6);
      } catch {}
    } catch (_0x15d510) {
      console.log("here now,ytdl-core error: ", _0x15d510);
      try {
        let _0x5a46ec = await yt.getInfo(_0x4a3f32[1]);
        let _0x257939 = {
          type: "video",
          quality: _0x5a46ec.pref_Quality || "best",
          format: "mp4",
        };
        if (_0x5a46ec.duration >= videotime) {
          _0x58ceb6 = "document";
        }
        let _0x588c42 = await yt.download(_0x4a3f32[1], _0x257939);
        var _0x3b1bff = {
          ...(await _0x1d4717.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ")),
        };
        let _0x13be6f = _0x5a46ec.title || _0x588c42 || _0x4a3f32[1];
        if (_0x588c42) {
          await _0x1d4717.bot.sendMessage(_0x1d4717.chat, {
            [_0x58ceb6]: {
              url: _0x588c42,
            },
            fileName: _0x13be6f,
            mimetype: "video/mp4",
            contextInfo: _0x3b1bff,
          });
        } else {
          await _0x1d4717.send("*_Video not Found_*");
        }
        try {
          fs.unlinkSync("" + _0x588c42);
        } catch {}
        return;
      } catch (_0x363775) {
        return _0x1d4717.error(
          _0x363775 + "\n\ncommand: ytmp4",
          _0x363775,
          "*_Uhh dear, Video not Found!!_*"
        );
      }
    }
  }
);
UserFunction(
  {
    pattern: "ytmp3",
    alias: ["yta"],
    desc: "Downloads audio by yt link.",
    category: "downloader",
    use: "<yt video url>",
  },
  async (_0x3f8930, _0x5834bb) => {
    let _0x4fe91c = _0x5834bb ? _0x5834bb : _0x3f8930.reply_text;
    var _0x540f68 = _0x4fe91c.toLowerCase().includes("doc")
      ? "document"
      : "audio";
    const _0x2758ec = ytIdRegex.exec(_0x4fe91c) || [];
    if (!_0x4fe91c || !_0x2758ec[0]) {
      return await _0x3f8930.reply(
        "*_Uhh please, Provide youtube video url!_*"
      );
    }
    try {
      let _0x4b5067 = await ytdl.getInfo(_0x2758ec[0]);
      if (_0x4b5067.videoDetails.lengthSeconds >= videotime) {
        _0x540f68 = "document";
      }
      let _0xaca4bd = _0x4b5067.videoDetails.title;
      let _0x24816a = "./temp/" + _0x2758ec[1] + ".mp3";
      const _0x2591f0 = ytdl(_0x2758ec[0], {
        filter: (_0x4e89f2) =>
          _0x4e89f2.audioBitrate == 160 || _0x4e89f2.audioBitrate == 128,
      }).pipe(fs.createWriteStream(_0x24816a));
      await new Promise((_0x401b5b, _0x3d90fd) => {
        _0x2591f0.on("error", _0x3d90fd);
        _0x2591f0.on("finish", _0x401b5b);
      });
      var _0x29af08 = {
        ...(await _0x3f8930.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ")),
      };
      let _0x4c646c = {
        [_0x540f68]: fs.readFileSync(_0x24816a),
        mimetype: "audio/mpeg",
        fileName: _0xaca4bd,
        contextInfo: _0x29af08,
      };
      await _0x3f8930.bot.sendMessage(_0x3f8930.jid, _0x4c646c, {
        quoted: _0x3f8930,
      });
      try {
        return await fs.unlinkSync(_0x24816a);
      } catch {}
    } catch (_0x345ce7) {
      console.log("here now,ytdl-core : ", _0x345ce7);
      try {
        let _0x5b9011 = await yt.download(_0x2758ec[1], {
          type: "audio",
          quality: "best",
        });
        var _0x29af08 = {
          ...(await _0x3f8930.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ")),
        };
        if (_0x5b9011) {
          await _0x3f8930.bot.sendMessage(_0x3f8930.jid, {
            [_0x540f68]: {
              url: _0x5b9011,
            },
            mimetype: "audio/mpeg",
            fileName: Config.caption,
            contextInfo: _0x29af08,
          });
        } else {
          await _0x3f8930.send("*_audio not Found!_*");
        }
        try {
          fs.unlinkSync(_0x5b9011);
        } catch {}
      } catch (_0x2cd979) {
        await _0x3f8930.error(
          _0x2cd979 + "\n\ncommand: ytmp3",
          _0x2cd979,
          "*_Uhh dear, audio file not Found!!_*"
        );
      }
    }
  }
);
UserFunction(
  {
    pattern: "ytdoc",
    alias: ["ytd"],
    desc: "Downloads audio by yt link as document.",
    category: "downloader",
    use: "<ytdoc video url>",
  },
  async (_0x17c662, _0x429696) => {
    try {
      let _0x5696a7 = _0x429696 ? _0x429696 : _0x17c662.reply_text;
      const _0x1d542b = ytIdRegex.exec(_0x5696a7) || [];
      if (!_0x5696a7 || !_0x1d542b[0]) {
        return await _0x17c662.reply("❌Please provide me a url");
      }
      var _0x43c5ac = _0x1d542b[1];
      var _0x59bbaa = false;
      try {
        let _0x32b31a = await ytdl.getInfo(_0x1d542b[0]);
        _0x43c5ac = _0x32b31a.videoDetails.title;
        let _0x4b47c3 = "./temp/Asta-Md " + _0x1d542b[1] + ".mp3";
        const _0x212389 = ytdl(_0x1d542b[0], {
          filter: (_0xd2371a) =>
            _0xd2371a.audioBitrate == 160 || _0xd2371a.audioBitrate == 128,
        }).pipe(fs.createWriteStream(_0x4b47c3));
        _0x59bbaa = _0x4b47c3;
        await new Promise((_0x1506ab, _0x26e243) => {
          _0x212389.on("error", _0x26e243);
          _0x212389.on("finish", _0x1506ab);
        });
      } catch (_0x18c033) {
        console.log("here now,ytdl-core : ", _0x18c033);
        try {
          _0x59bbaa = await yt.download(_0x1d542b[1], {
            type: "audio",
            quality: "best",
          });
        } catch (_0x4122cc) {
          return await _0x17c662.error(
            _0x4122cc + "\n\ncommand: ytdoc",
            _0x4122cc,
            "*_file not Found!!_*"
          );
        }
      }
      if (!_0x59bbaa) {
        return await _0x17c662.send("*_Uhh dear, video not found_*");
      }
      var _0x10e2fa = {
        ...(await _0x17c662.bot.contextInfo(
          Config.botname,
          "ʏᴛᴅᴏᴄ ᴍᴘ3 ʏᴏᴜᴛᴜʙᴇ"
        )),
      };
      let _0x300d1a = {
        document: {
          url: _0x59bbaa,
        },
        mimetype: "audio/mpeg",
        fileName: "Asta-Md--" + _0x1d542b[1] + ".mp3",
        caption: Config.caption,
        contextInfo: _0x10e2fa,
      };
      await _0x17c662.bot.sendMessage(_0x17c662.jid, _0x300d1a, {
        quoted: _0x17c662,
      });
      try {
        return await fs.unlinkSync(_0x59bbaa);
      } catch {}
    } catch (_0xbed50) {
      await _0x17c662.error(
        _0xbed50 + "\n\ncommand: ytdoc",
        _0xbed50,
        "*_audio file not Found!!_*"
      );
    }
  }
);
cmd(
  {
    on: "text",
  },
  async (_0xb75e78, _0x221e78, { isCreator: _0xfbeec5 }) => {
    if (_0xb75e78.quoted && _0xb75e78.text) {
      const _0x5b8ee5 = _0xb75e78.quoted.text.split("\n");
      if (_0x5b8ee5[0].includes("ᴀsᴛᴀ-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")) {
        const _0x1724ba = _0x5b8ee5.find((_0x525632) =>
          _0x525632.startsWith("Url :")
        );
        let _0x43a95e = _0x1724ba.replace("Url :", "").trim();
        try {
          await _0xb75e78.sendMessage(_0xb75e78.chat, {
            react: {
              text: "✨",
              key: _0xb75e78.key,
            },
          });
          let _0x4cd3b2;
          if (_0xb75e78.text.startsWith("1")) {
            let _0x3edf2a = _0x221e78.toLowerCase().includes("doc")
              ? "document"
              : _0x221e78.toLowerCase().includes("mp3")
              ? "audio"
              : "video";
            _0x4cd3b2 = "./temp/ytsong.mp4";
            const _0x5e7871 = ytdl(_0x43a95e, {
              filter: (_0x145c7e) =>
                _0x145c7e.itag == 22 || _0x145c7e.itag == 18,
            }).pipe(fs.createWriteStream(_0x4cd3b2));
            await new Promise((_0x540130, _0xf6b8ae) => {
              _0x5e7871.on("error", _0xf6b8ae);
              _0x5e7871.on("finish", _0x540130);
            });
            await _0xb75e78.sendMessage(
              _0xb75e78.chat,
              {
                [_0x3edf2a]: fs.readFileSync(_0x4cd3b2),
                mimetype: _0x3edf2a == "audio" ? "audio/mpeg" : "video/mp4",
                fileName: Config.caption,
                caption: Config.caption,
              },
              {
                quoted: _0xb75e78,
              }
            );
          } else if (_0xb75e78.text.startsWith("2")) {
            let _0x5d9956 = _0x221e78.toLowerCase().includes("doc")
              ? "document"
              : "audio";
            _0x4cd3b2 = "./temp/ytsong.mp3";
            const _0x39ddb9 = ytdl(_0x43a95e, {
              filter: (_0xa5f832) =>
                _0xa5f832.audioBitrate == 160 || _0xa5f832.audioBitrate == 128,
            }).pipe(fs.createWriteStream(_0x4cd3b2));
            await new Promise((_0x4790a8, _0x9a005b) => {
              _0x39ddb9.on("error", _0x9a005b);
              _0x39ddb9.on("finish", _0x4790a8);
            });
            await _0xb75e78.sendMessage(
              _0xb75e78.chat,
              {
                [_0x5d9956]: fs.readFileSync(_0x4cd3b2),
                mimetype: "audio/mpeg",
                fileName: Config.caption,
              },
              {
                quoted: _0xb75e78,
              }
            );
          }
          try {
            return fs.unlinkSync(_0x4cd3b2);
          } catch (_0x51cca7) {}
        } catch (_0x189dd8) {
          return await _0xb75e78.reply(
            "Error While Downloading Video : " + _0x189dd8
          );
        }
      } else if (_0x5b8ee5[0].includes("ᴀsᴛᴀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ")) {
        let _0x307bb6 = "*" + _0xb75e78.text.split(" ")[0] + " : ";
        const _0x56275d = _0x5b8ee5.find((_0x3b5e74) =>
          _0x3b5e74.startsWith(_0x307bb6)
        );
        if (_0x56275d) {
          try {
            let _0x3e1826 = _0x56275d
              .replace(_0x307bb6, "")
              .split("*")[0]
              .trim();
            const _0x4d9213 = _0x5b8ee5[_0x5b8ee5.indexOf(_0x56275d) + 1];
            const _0x37a579 = _0x4d9213
              .split("*")[1]
              .replace("Url : ", "")
              .trim();
            if (_0x37a579.startsWith("http")) {
              await _0xb75e78.sendMessage(_0xb75e78.chat, {
                react: {
                  text: "✨",
                  key: _0xb75e78.key,
                },
              });
              let _0x1d3325 = _0x221e78.toLowerCase().includes("doc")
                ? "document"
                : _0x221e78.toLowerCase().includes("mp3")
                ? "audio"
                : "video";
              let _0x26cc84 =
                "./temp/Yts Download " +
                Math.floor(Math.random() * 10000) +
                ".mp4";
              const _0x104b4c = ytdl(_0x37a579, {
                filter: (_0x31a431) =>
                  _0x31a431.itag == 22 || _0x31a431.itag == 18,
              }).pipe(fs.createWriteStream(_0x26cc84));
              await new Promise((_0x45b31c, _0x5b6595) => {
                _0x104b4c.on("error", _0x5b6595);
                _0x104b4c.on("finish", _0x45b31c);
              });
              await _0xb75e78.sendMessage(
                _0xb75e78.chat,
                {
                  [_0x1d3325]: fs.readFileSync(_0x26cc84),
                  mimetype: _0x1d3325 == "audio" ? "audio/mpeg" : "video/mp4",
                  fileName: "" + _0x3e1826,
                  caption: _0x3e1826 + " \n " + Config.caption,
                },
                {
                  quoted: _0xb75e78,
                }
              );
              try {
                fs.unlink(_0x26cc84);
              } catch (_0x338800) {}
            }
          } catch (_0x3de0e2) {
            _0xb75e78.error(
              _0x3de0e2 + "\n\nCommand yts Listener",
              _0x3de0e2,
              "*Video Not Found!*"
            );
          }
        }
      } else if (_0x5b8ee5[0].includes("ᴀsᴛᴀ-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ")) {
        let _0x35d668 = "*" + _0xb75e78.text.split(" ")[0] + " : ";
        const _0x205a5f = _0x5b8ee5.find((_0x304058) =>
          _0x304058.startsWith(_0x35d668)
        );
        if (_0x205a5f) {
          try {
            let _0x17567d = _0x205a5f
              .replace(_0x35d668, "")
              .split("*")[0]
              .trim();
            const _0x14618c = _0x5b8ee5[_0x5b8ee5.indexOf(_0x205a5f) + 1];
            const _0x2407a8 = _0x14618c
              .split("*")[1]
              .replace("Id : ", "")
              .trim();
            await _0xb75e78.sendMessage(_0xb75e78.chat, {
              react: {
                text: "✨",
                key: _0xb75e78.key,
              },
            });
            let _0x37b3a4 = await download(_0x2407a8);
            let _0x478b37 = "*App Name :* " + _0x37b3a4.name;
            _0x478b37 += "\n*App id        :* " + _0x37b3a4.package;
            _0x478b37 += "\n*Last Up       :* " + _0x37b3a4.lastup;
            _0x478b37 += "\n*App Size     :* " + _0x37b3a4.size;
            _0x478b37 += "\n               \n" + Config.caption;
            let _0x5032aa = {
              document: {
                url: _0x37b3a4.dllink,
              },
              mimetype: "application/vnd.android.package-archive",
              fileName: _0x37b3a4.name + ".apk",
              caption: _0x478b37,
            };
            return await _0xb75e78.sendMessage(_0xb75e78.chat, _0x5032aa, {
              quoted: _0xb75e78,
            });
          } catch (_0x12fd88) {
            _0xb75e78.reply("*_Can't Download, App Limit Exceed_*");
          }
        }
      }
    }
  }
);
/** PLAYLIST */
const _0xf3b3b9 = _0xc1f2;
function _0xe8a3() {
  const _0x1872b6 = [
    "audio",
    "random",
    "length",
    ".mp4",
    "6710240SkWnCZ",
    "readFileSync",
    "Downloads video from playlist.",
    "<yt playlist url>",
    "title",
    "videos",
    "sendMessage",
    "2179701ijsDnM",
    "botname",
    "4565025fjxWjZ",
    "pushName",
    "168uBIxwJ",
    "document",
    "includes",
    "216vVeWdZ",
    "itag",
    "\n ⿻ File Size : ",
    "reply",
    "chat",
    "11410952QXDvWH",
    "mp3",
    " MB",
    "614495gBYQxj",
    "split",
    "toLowerCase",
    "floor",
    "downloader",
    "videoDetails",
    "audio/mpeg",
    "videoId",
    "This Process will take a bit time.",
    "2487090FcjOyi",
    "❌ File size bigger than ",
    "pipe",
    "statSync",
    "mb.",
    "test",
    "log",
    "lengthSeconds",
    "getInfo",
    "61665AJJjOP",
    "./temp/",
    "unlinkSync",
  ];
  _0xe8a3 = function () {
    return _0x1872b6;
  };
  return _0xe8a3();
}
function _0xc1f2(_0x44febb, _0x412500) {
  const _0xe8a308 = _0xe8a3();
  _0xc1f2 = function (_0xc1f20d, _0x460a50) {
    _0xc1f20d = _0xc1f20d - 214;
    let _0x14f3b6 = _0xe8a308[_0xc1f20d];
    return _0x14f3b6;
  };
  return _0xc1f2(_0x44febb, _0x412500);
}
(function (_0x131f7c, _0x3f6081) {
  const _0x3b3c98 = _0xc1f2;
  const _0x165db2 = _0x131f7c();
  while (true) {
    try {
      const _0x538451 =
        -parseInt(_0x3b3c98(249)) / 1 +
        -parseInt(_0x3b3c98(258)) / 2 +
        parseInt(_0x3b3c98(236)) / 3 +
        -parseInt(_0x3b3c98(227)) / 4 +
        (-parseInt(_0x3b3c98(220)) / 5) * (parseInt(_0x3b3c98(241)) / 6) +
        -parseInt(_0x3b3c98(246)) / 7 +
        (-parseInt(_0x3b3c98(238)) / 8) * (-parseInt(_0x3b3c98(234)) / 9);
      if (_0x538451 === _0x3f6081) {
        break;
      } else {
        _0x165db2.push(_0x165db2.shift());
      }
    } catch (_0x1c3a5e) {
      _0x165db2.push(_0x165db2.shift());
    }
  }
})(_0xe8a3, 997920);
UserFunction(
  {
    pattern: "playlist",
    desc: _0xf3b3b9(229),
    category: _0xf3b3b9(253),
    filename: __filename,
    use: _0xf3b3b9(230),
  },
  async (_0x1283e0, _0x45d2ef, { Void: _0xc34be3 }) => {
    const _0x38a391 = _0xf3b3b9;
    try {
      var _0x5d6154 = 2000;
      var _0x1a03f5 = 400;
      var _0x3ef119 = _0x45d2ef[_0x38a391(251)]().includes("doc")
        ? "document"
        : _0x45d2ef[_0x38a391(251)]()[_0x38a391(240)](_0x38a391(247)) ||
          _0x45d2ef[_0x38a391(251)]().includes(_0x38a391(223))
        ? _0x38a391(223)
        : "video";
      const _0x5c2288 = (_0x5202bc) => {
        const _0x2d6457 = _0x38a391;
        return (
          "" + Math[_0x2d6457(252)](Math[_0x2d6457(224)]() * 10000) + _0x5202bc
        );
      };
      if (
        !_0x45d2ef ||
        !_0x45d2ef.includes("=") ||
        !/http/gi[_0x38a391(216)](_0x45d2ef)
      ) {
        return await _0x1283e0[_0x38a391(244)](
          "*Use Playlist URL, Like: " +
            prefix +
            "playlist https://www.youtube.com/playlist?list=PLZeei0S6_unh-jTeWsJI1mOI6snxeHn5c*"
        );
      }
      let _0x1c2a7e = _0x45d2ef[_0x38a391(250)]("=")[1][_0x38a391(250)](" ")[0];
      console[_0x38a391(217)](_0x1c2a7e);
      var _0x20ebc9 = {
        listId: _0x1c2a7e,
      };
      yts(_0x20ebc9, async function (_0x594f1f, _0x2548a3) {
        const _0x5c8996 = _0x38a391;
        if (_0x594f1f) {
          throw _0x594f1f;
        }
        _0x1283e0.reply(_0x5c8996(257));
        for (
          let _0x1492ac = 0;
          _0x1492ac < _0x2548a3[_0x5c8996(232)][_0x5c8996(225)];
          _0x1492ac++
        ) {
          if (_0x2548a3.videos[_0x1492ac][_0x5c8996(256)] === undefined) {
            continue;
          }
          let _0xdaf4e3 = _0x2548a3[_0x5c8996(232)][_0x1492ac][_0x5c8996(256)];
          try {
            let _0x48a6df = await ytdl[_0x5c8996(219)](_0xdaf4e3);
            if (_0x48a6df[_0x5c8996(254)][_0x5c8996(218)] >= _0x5d6154) {
              _0x3ef119 = "document";
            }
            let _0x5ec28d = _0x48a6df[_0x5c8996(254)][_0x5c8996(231)];
            let _0x1a85a9 = _0x5c2288(_0x5c8996(226));
            const _0x55ba81 = ytdl(_0xdaf4e3, {
              filter: (_0x1df4a7) =>
                _0x1df4a7.itag == 22 || _0x1df4a7[_0x5c8996(242)] == 18,
            })[_0x5c8996(260)](
              fs.createWriteStream(_0x5c8996(221) + _0x1a85a9)
            );
            await new Promise((_0x1e87e2, _0x352753) => {
              _0x55ba81.on("error", _0x352753);
              _0x55ba81.on("finish", _0x1e87e2);
            });
            let _0x5e17d6 = fs[_0x5c8996(214)](_0x5c8996(221) + _0x1a85a9);
            let _0x1e47e6 = _0x5e17d6.size;
            let _0x4a0671 = _0x1e47e6 / 1048576;
            if (_0x4a0671 <= _0x1a03f5) {
              let _0x3eab5e = {
                [_0x3ef119]: fs[_0x5c8996(228)](_0x5c8996(221) + _0x1a85a9),
                mimetype: _0x3ef119 == "audio" ? _0x5c8996(255) : "video/mp4",
                fileName: "" + _0x5ec28d,
                caption:
                  _0x3ef119 == _0x5c8996(239)
                    ? ""
                    : " ⿻ Title : " +
                      _0x5ec28d +
                      _0x5c8996(243) +
                      _0x4a0671 +
                      _0x5c8996(248),
                headerType: 4,
                contextInfo: {
                  externalAdReply: {
                    title: Config[_0x5c8996(235)],
                    body: _0x1283e0[_0x5c8996(237)],
                    thumbnail: log0,
                    renderLargerThumbnail: true,
                    mediaType: 2,
                    mediaUrl: gurl,
                    sourceUrl: gurl,
                  },
                },
              };
              _0xc34be3[_0x5c8996(233)](_0x1283e0[_0x5c8996(245)], _0x3eab5e, {
                quoted: _0x1283e0,
              });
            } else {
              _0x1283e0[_0x5c8996(244)](
                _0x5c8996(259) + _0x1a03f5 + _0x5c8996(215)
              );
            }
            try {
              fs[_0x5c8996(222)](_0x5c8996(221) + _0x1a85a9);
            } catch (_0x492195) {}
          } catch (_0x312da2) {
            console[_0x5c8996(217)](_0x312da2);
          }
        }
      });
    } catch (_0x4bcd8f) {
      console[_0x38a391(217)](_0x4bcd8f);
    }
  }
);
