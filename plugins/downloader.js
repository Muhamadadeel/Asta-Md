const {
  UserFunction,
  fetchJson,
  amdJson,
  fancytext,
  yt,
  getBuffer,
  amdBuffer,
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
        return await messsage.send(
          "*`Hello Sir Give Me A Social Media Link To Download From`*\n\n" +
            prefix +
            "allsocial *`your link`*"
        );
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

      await messsage.bot.sendFromUrl(
        messsage.from,
        thumbnail,
        caption,
        messsage,
        {},
        "image"
      );

      for (const media of medias) {
        const { url, formattedSize, quality, extension } = media;
        const mediaCaption = `*Quality:* ${quality}\n*Size:* ${formattedSize}\n*Extension:* ${extension}`;
        await messsage.bot.sendFromUrl(
          messsage.from,
          url,
          mediaCaption,
          messsage,
          {},
          "video"
        );
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
          "*`Hello Sir Please Give Me A Vaild Telegram Sticker link`*\n\n" +
            prefix +
            "tg2 *`your link`*"
        );
      }
      if (!isUrl.includes("addstickers")) {
        return await message.reply(
          "*`Hello Sir Please Give Me A Vaild Telegram Sticker link`*\n\n" +
            prefix +
            "tg2 *`your link`*"
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
        return await message.send(
          "*`Sir you didn't give me anything to search for!`*\n\n" +
            prefix +
            "wiki2 elon musk"
        );
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
            "Title: " + match[data].title + "\n*Source:* " + match[data].source,
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

      await message.bot.sendFromUrl(
        message.from,
        downloadUrl,
        caption,
        message,
        {},
        "file"
      );
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
        return await message.send(
          "*`Hey Sir Give Me Spotify Tracks To Find Informatiion About`*\n\n" +
            prefix +
            "findsp *`your link`*"
        );
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
let fb_api = "https://api-smd.onrender.com";
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
          "`*Hello Give Me A Vaild FaceBook Link`*\n\n" +
            prefix +
            "facebook *`your link`*"
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
          },
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
          "*`Give Me Git Repo`*\n\n" +
            prefix +
            "gitclone https://github.com/Astropeda/Asta-Md"
        );
      }
      const URl = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
      if (!URl.test(match)) {
        return await message.reply("*Provide Valid Repositry Url*");
      }
      let [URl_L, URL_M, URL_B] = match.match(URl) || [];
      URL_B = URL_B.replace(/.git$/, "");
      let resultFile =
        "https://api.github.com/repos/" + URL_M + "/" + URL_B + "/zipball";
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
          "*`Example : " + prefix + "tts Hi,I am Asta-Md whatsapp bot.`*"
        );
      }
      try {
        let data = query ? query.split(" ")[0].toLowerCase() : "en";
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
          "`*Hello Give Me A Vaild FaceBook Link`*\n\n" +
            prefix +
            "facebook *`your link`*"
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
          "`*Hello Give Me A Vaild FaceBook Link`*\n\n" +
            prefix +
            "facebook *`your link`*"
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
          "`*Hello Give Me A Video Link`*\n\n" +
            prefix +
            "downmp4 *`your link`*"
        );
      }
      var _0x1e4a34 = qury.toLowerCase().includes("doc") ? "document" : "video";
      await msg.bot.sendMessage(
        msg.chat,
        {
          [_0x1e4a34]: {
            url: match,
          },
          caption: "*HERE WE GO*",
          contextInfo: {
            ...(await msg.bot.contextInfo(Config.botname, msg.senderName)),
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
          "`*Hello Give Me A Vaild Tiktok Link`*\n\n" +
            prefix +
            "tiktok *`your link`*"
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
          "`*Hello Give Me A Vaild Tiktok Link`*\n\n" +
            prefix +
            "tiktok *`your link`*"
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
    var isDoc = query.toLowerCase().includes("doc") ? "document" : "video";
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
        ...(await meesage.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")),
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
    var TypeData = match.toLowerCase().includes("doc") ? "document" : "video";
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
      var TYPE = match.toLowerCase().includes("doc") ? "document" : "audio";
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
        return message.reply("*Give A Number Example: " + prefix + "sound 5*");
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
      return message.error(error + "\n\ncommand: sound", error, false);
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
        ...(await msg.bot.contextInfo(Config.botname, "ᴘɪɴᴛᴇʀᴇꜱᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")),
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
      return msg.reply("*`Sir Use " + prefix + "pinterest cars`*");
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
      let IMGTYPE = await amdBuffer(resukt.thumbnail);
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
  async (mesg, query) => {
    let match = query ? query : mesg.reply_text;
    var documtn = match.toLowerCase().includes("doc")
      ? "document"
      : match.toLowerCase().includes("mp3")
      ? "audio"
      : "video";
    const resultFile = ytIdRegex.exec(match) || [];
    if (!match || !resultFile[0]) {
      return await mesg.reply("*_provide youtube video url!_*");
    }
    try {
      let FileDetail = await ytdl.getInfo(resultFile[0]);
      if (FileDetail.videoDetails.lengthSeconds >= videotime) {
        documtn = "document";
      }
      let filename = FileDetail.videoDetails.title;
      let dir = "./temp/" + resultFile[1] + ".mp4";
      const loginfo = ytdl(resultFile[0], {
        filter: (_0x4c0ea7) => _0x4c0ea7.itag == 22 || _0x4c0ea7.itag == 18,
      }).pipe(fs.createWriteStream(dir));
      await new Promise((succes, failur) => {
        loginfo.on("error", failur);
        loginfo.on("finish", succes);
      });
      var contextInfoMsg = {
        ...(await mesg.bot.contextInfo(Config.botname, "ʏᴛᴅʟ ᴠɪᴅᴇᴏ")),
      };
      let MTYPE = {
        [documtn]: fs.readFileSync(dir),
        mimetype: "video/mp4",
        fileName: filename,
        caption: "  *Here's Your Video*\n" + Config.caption,
        contextInfo: contextInfoMsg,
      };
      await mesg.bot.sendMessage(mesg.jid, MTYPE, {
        quoted: mesg,
      });
      try {
        return await fs.unlinkSync(dir);
      } catch {}
    } catch (error) {
      console.log("here now,ytdl-core error: ", error);
      try {
        let fileDat = await yt.getInfo(resultFile[1]);
        let VIDTYPE = {
          type: "video",
          quality: fileDat.pref_Quality || "best",
          format: "mp4",
        };
        if (fileDat.duration >= videotime) {
          documtn = "document";
        }
        let RESULT = await yt.download(resultFile[1], VIDTYPE);
        var contextInfoMsg = {
          ...(await mesg.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ")),
        };
        let filename = fileDat.title || RESULT || resultFile[1];
        if (RESULT) {
          await mesg.bot.sendMessage(mesg.chat, {
            [documtn]: {
              url: RESULT,
            },
            fileName: filename,
            mimetype: "video/mp4",
            contextInfo: contextInfoMsg,
          });
        } else {
          await mesg.send("*_Video not Found_*");
        }
        try {
          fs.unlinkSync("" + RESULT);
        } catch {}
        return;
      } catch (error) {
        return mesg.error(
          error + "\n\ncommand: ytmp4",
          error,
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
  async (message, query) => {
    let match = query ? query : message.reply_text;
    var documtent = match.toLowerCase().includes("doc") ? "document" : "audio";
    const fileInfo = ytIdRegex.exec(match) || [];
    if (!match || !fileInfo[0]) {
      return await message.reply("*_Uhh please, Provide youtube video url!_*");
    }
    try {
      let VIDMETA = await ytdl.getInfo(fileInfo[0]);
      if (VIDMETA.videoDetails.lengthSeconds >= videotime) {
        documtent = "document";
      }
      let filename = VIDMETA.videoDetails.title;
      let dir = "./temp/" + fileInfo[1] + ".mp3";
      const indo = ytdl(fileInfo[0], {
        filter: (contentTYPE) =>
          contentTYPE.audioBitrate == 160 || contentTYPE.audioBitrate == 128,
      }).pipe(fs.createWriteStream(dir));
      await new Promise((success, failure) => {
        indo.on("error", failure);
        indo.on("finish", success);
      });
      var ContextInfo = {
        ...(await message.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ")),
      };
      let MTYPE = {
        [documtent]: fs.readFileSync(dir),
        mimetype: "audio/mpeg",
        fileName: filename,
        contextInfo: ContextInfo,
      };
      await message.bot.sendMessage(message.jid, MTYPE, {
        quoted: message,
      });
      try {
        return await fs.unlinkSync(dir);
      } catch {}
    } catch (error) {
      console.log("here now,ytdl-core : ", error);
      try {
        let FileDir = await yt.download(fileInfo[1], {
          type: "audio",
          quality: "best",
        });
        var ContextInfo = {
          ...(await message.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ")),
        };
        if (FileDir) {
          await message.bot.sendMessage(message.jid, {
            [documtent]: {
              url: FileDir,
            },
            mimetype: "audio/mpeg",
            fileName: Config.caption,
            contextInfo: ContextInfo,
          });
        } else {
          await message.send("*_audio not Found!_*");
        }
        try {
          fs.unlinkSync(FileDir);
        } catch {}
      } catch (error) {
        await message.error(
          error + "\n\ncommand: ytmp3",
          error,
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
  async (message, query) => {
    try {
      let match = query ? query : message.reply_text;
      const results = ytIdRegex.exec(match) || [];
      if (!match || !results[0]) {
        return await message.reply("❌Please provide me a url");
      }
      var VInfo = results[1];
      var Data = false;
      try {
        let _0x32b31a = await ytdl.getInfo(results[0]);
        VInfo = _0x32b31a.videoDetails.title;
        let dir = "./temp/Asta-Md " + results[1] + ".mp3";
        const logInfo = ytdl(results[0], {
          filter: (AudioType) =>
            AudioType.audioBitrate == 160 || AudioType.audioBitrate == 128,
        }).pipe(fs.createWriteStream(dir));
        Data = dir;
        await new Promise((succes, failur) => {
          logInfo.on("error", failur);
          logInfo.on("finish", succes);
        });
      } catch (error) {
        console.log("here now,ytdl-core : ", error);
        try {
          Data = await yt.download(results[1], {
            type: "audio",
            quality: "best",
          });
        } catch (error) {
          return await message.error(
            error + "\n\ncommand: ytdoc",
            error,
            "*_file not Found!!_*"
          );
        }
      }
      if (!Data) {
        return await message.send("*_Uhh dear, video not found_*");
      }
      var ContextInfo = {
        ...(await message.bot.contextInfo(Config.botname, "ʏᴛᴅᴏᴄ ᴍᴘ3 ʏᴏᴜᴛᴜʙᴇ")),
      };
      let MTYPE = {
        document: {
          url: Data,
        },
        mimetype: "audio/mpeg",
        fileName: "Asta-Md--" + results[1] + ".mp3",
        caption: Config.caption,
        contextInfo: ContextInfo,
      };
      await message.bot.sendMessage(message.jid, MTYPE, {
        quoted: message,
      });
      try {
        return await fs.unlinkSync(Data);
      } catch {}
    } catch (error) {
      await message.error(
        error + "\n\ncommand: ytdoc",
        error,
        "*_audio file not Found!!_*"
      );
    }
  }
);
cmd(
  {
    on: "text",
  },
  async (message, query, { isCreator: onText }) => {
    if (message.quoted && message.text) {
      const MenuOptions = message.quoted.text.split("\n");
      if (MenuOptions[0].includes("ᴀsᴛᴀ-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")) {
        const Chosen = MenuOptions.find((input) => input.startsWith("Url :"));
        let Inputeddata = Chosen.replace("Url :", "").trim();
        try {
          await message.sendMessage(message.chat, {
            react: {
              text: "✨",
              key: message.key,
            },
          });
          let dirPath;
          if (message.text.startsWith("1")) {
            let opt = query.toLowerCase().includes("doc")
              ? "document"
              : query.toLowerCase().includes("mp3")
              ? "audio"
              : "video";
            dirPath = "./temp/ytsong.mp4";
            const logInfo = ytdl(Inputeddata, {
              filter: (fileBuff) => fileBuff.itag == 22 || fileBuff.itag == 18,
            }).pipe(fs.createWriteStream(dirPath));
            await new Promise((succ, fail) => {
              logInfo.on("error", fail);
              logInfo.on("finish", succ);
            });
            await message.sendMessage(
              message.chat,
              {
                [opt]: fs.readFileSync(dirPath),
                mimetype: opt == "audio" ? "audio/mpeg" : "video/mp4",
                fileName: Config.caption,
                caption: Config.caption,
              },
              {
                quoted: message,
              }
            );
          } else if (message.text.startsWith("2")) {
            let IfDoc = query.toLowerCase().includes("doc")
              ? "document"
              : "audio";
            dirPath = "./temp/ytsong.mp3";
            const logInfo = ytdl(Inputeddata, {
              filter: (FileType) =>
                FileType.audioBitrate == 160 || FileType.audioBitrate == 128,
            }).pipe(fs.createWriteStream(dirPath));
            await new Promise((succs, fails) => {
              logInfo.on("error", fails);
              logInfo.on("finish", succs);
            });
            await message.sendMessage(
              message.chat,
              {
                [IfDoc]: fs.readFileSync(dirPath),
                mimetype: "audio/mpeg",
                fileName: Config.caption,
              },
              {
                quoted: message,
              }
            );
          }
          try {
            return fs.unlinkSync(dirPath);
          } catch (err) {}
        } catch (err) {
          return await message.reply("Error While Downloading Video : " + err);
        }
      } else if (MenuOptions[0].includes("ᴀsᴛᴀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ")) {
        let data = "*" + message.text.split(" ")[0] + " : ";
        const OPT2 = MenuOptions.find((options) => options.startsWith(data));
        if (OPT2) {
          try {
            let data_Result = OPT2.replace(data, "").split("*")[0].trim();
            const _0x4d9213 = MenuOptions[MenuOptions.indexOf(OPT2) + 1];
            const InputedQuery = _0x4d9213
              .split("*")[1]
              .replace("Url : ", "")
              .trim();
            if (InputedQuery.startsWith("http")) {
              await message.sendMessage(message.chat, {
                react: {
                  text: "✨",
                  key: message.key,
                },
              });
              let dirFilePath = query.toLowerCase().includes("doc")
                ? "document"
                : query.toLowerCase().includes("mp3")
                ? "audio"
                : "video";
              let datas =
                "./temp/Yts Download " +
                Math.floor(Math.random() * 10000) +
                ".mp4";
              const Res = ytdl(InputedQuery, {
                filter: (FFilePath) =>
                  FFilePath.itag == 22 || FFilePath.itag == 18,
              }).pipe(fs.createWriteStream(datas));
              await new Promise((scc, err) => {
                Res.on("error", err);
                Res.on("finish", scc);
              });
              await message.sendMessage(
                message.chat,
                {
                  [dirFilePath]: fs.readFileSync(datas),
                  mimetype: dirFilePath == "audio" ? "audio/mpeg" : "video/mp4",
                  fileName: "" + data_Result,
                  caption: data_Result + " \n " + Config.caption,
                },
                {
                  quoted: message,
                }
              );
              try {
                fs.unlink(datas);
              } catch (errr) {}
            }
          } catch (err) {
            message.error(
              err + "\n\nCommand yts Listener",
              err,
              "*Video Not Found!*"
            );
          }
        }
      } else if (MenuOptions[0].includes("ᴀsᴛᴀ-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ")) {
        let request = "*" + message.text.split(" ")[0] + " : ";
        const Options = MenuOptions.find((selected) =>
          selected.startsWith(request)
        );
        if (Options) {
          try {
            let _0x17567d = Options.replace(request, "").split("*")[0].trim();
            const DAT = MenuOptions[MenuOptions.indexOf(Options) + 1];
            const Reqeusts = DAT.split("*")[1].replace("Id : ", "").trim();
            await message.sendMessage(message.chat, {
              react: {
                text: "✨",
                key: message.key,
              },
            });
            let results = await download(Reqeusts);
            let CapData = "*App Name :* " + results.name;
            CapData += "\n*App id        :* " + results.package;
            CapData += "\n*Last Up       :* " + results.lastup;
            CapData += "\n*App Size     :* " + results.size;
            CapData += "\n               \n" + Config.caption;
            let DOCTYPE = {
              document: {
                url: results.dllink,
              },
              mimetype: "application/vnd.android.package-archive",
              fileName: results.name + ".apk",
              caption: CapData,
            };
            return await message.sendMessage(message.chat, DOCTYPE, {
              quoted: message,
            });
          } catch (err) {
            message.reply("*_Can't Download, App Limit Exceed_*");
          }
        }
      }
    }
  }
);
