const {
    tlang,
    ringtone,
    cmd,
    fetchJson,
    sleep,
    botpic,
    getBuffer,
    pinterest,
    prefix,
    Config
} = require('../lib')
const Config = require('../config');
const cheerio = require('cheerio');
const {
    Void,
    citel,
    text,
    isCreator
} = require('../lib');
const {
    mediafire
} = require("../lib/mediafire.js");
const {
    GDriveDl
} = require('../lib/scraper.js')
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const fs = require('fs-extra');
const axios = require('axios');
var videotime = 3600 // 30 min
var dlsize = 100 // 100mb

cmd({
    pattern: "instagram",
    alias: ["insta"],
    desc: "Download Instagram media.",
    category: "downloader",
    filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!text) {
        return citel.send("Please provide an Instagram post URL.");
    }
    try {
        const {
            data
        } = await axios.get(`https://api.maher-zubair.tech/download/instagram2?url=${text}`);
        if (data.status) {
            for (let i = 0; i < data.medias.length; i++) {
                await Void.sendFileUrl(citel.chat, data.medias[i], `Downloaded Media from Instagram.\n${Config.caption}`, citel);
            }
        } else {
            await citel.send("Error while downloading media.");
        }
    } catch (error) {
        console.log("Error while downloading Instagram media: ", error);
        await citel.send("Error while downloading media.");
    }
});

cmd({
    pattern: "ig",
    desc: "Download Instagram videos.",
    category: "downloader",
    filename: __filename,
    use: "<add ig url.>"
}, async (Void, citel, text) => {
    try {
        if (!text || !text.toLowerCase().startsWith("https://")) {
            return await citel.send("Please provide a valid Instagram video URL.");
        }
        const {
            data
        } = await axios.get(`https://api.maher-zubair.tech/download/instagram2?url=${text}`);
        if (data.status) {
            await Void.sendMessage(citel.chat, {
                video: {
                    url: data.video
                },
                caption: Config.caption
            }, {
                quoted: citel
            });
        } else {
            await citel.send("Error while downloading video.");
        }
    } catch (error) {
        console.log("Error while downloading Instagram video: ", error);
        await citel.send("Error while downloading video.");
    }
});

cmd({
        pattern: "tgs",
        desc: "Downloads telegram stickers.",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>'
    },
    async (Void, citel, text) => {
        if (!text) return await citel.reply("*Enter a tg sticker url*\n`Keep in mind that there is a chance of ban if used frequently`");
        if (!text.includes("addstickers")) return await citel.reply("`Uhh Please Enter a Valid tg sticker url`");
        let tgUrl = text.split("|")[0];
        let find = tgUrl.split("/addstickers/")[1];
        let {
            result
        } = await fetchJson(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(find)} `);
        let check = text.split("|")[1] || "";
        let res = `Total stickers: ${result.stickers.length}\n*Estimated complete in:* ${result.stickers.length * 1.5} seconds\nKeep in mind that there is a chance of a ban if used frequently`.trim()
        if (result.is_animated) return await citel.reply("Animated stickers are not supported");
        else if (check.startsWith("info")) return await citel.reply(res);
        let limit = parseInt(check.split(",")[0]) || 10;
        let count = parseInt(check.split(",")[1]) || 0;
        let isCheckText = check.split(";")[1] || "Sticker"
        let isSticker = true;
        if (isCheckText.includes("photo")) {
            isSticker = false;
            isCheckText = "Photo"
        }
        if (limit > result.stickers.length) {
            limit = result.stickers.length
        }
        if (count > result.stickers.length) {
            count = result.stickers.length - 5
        }
        if (count > limit) {
            let temp = limit;
            limit = count;
            count = temp;
        }
        await citel.reply(`${res}\n\n_Downloading as ${isCheckText} From index *${count}* to *${limit}*._\nIf you wants more to download then use Like \n\n .tgs ${tgUrl} |  10 ,  20 ; photo`)
        for (count; count < limit; count++) {
            let file_path = await fetchJson(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${result.stickers[count].file_id}`);
            let sticUrl = `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file_path.result.file_path}`;
            if (isSticker) {
                let a = await getBuffer(sticUrl);
                await citel.reply(a, {
                    packname: Config.packname,
                    author: "Suhail-Md"
                }, "sticker");
            } else {
                await Void.sendMessage(citel.chat, {
                    image: {
                        url: sticUrl
                    },
                    caption: `*_Telegram Sticker At Index ${count+1} Downloaded_*`
                })
            }
        }
    })
    cmd({
        pattern: "twitter",
        alias: ["tw", "twt"],
        desc: "Download Twitter media.",
        category: "downloader",
        filename: __filename
    }, async (Void, citel, text, {
        isCreator
    }) => {
        if (!text) {
            return citel.send("Please provide a Twitter media URL.");
        }
        try {
            const { data } = await axios.get(`https://api.maher-zubair.tech/download/twitter?url=${text}`);
            if (data.status) {
                const $ = cheerio.load(data.media);
                const media = $('a').attr('href');
                if (media) {
                    await Void.sendFileUrl(citel.chat, media, `Downloaded Media from Twitter.\n${Config.caption}`, citel);
                } else {
                    await citel.send("Error while downloading media.");
                }
            } else {
                await citel.send("Error while downloading media.");
            }
        } catch (error) {
            console.log("Error while downloading Twitter media: ", error);
            await citel.send("Error while downloading media.");
        }
    });
    //==============================================================================
    cmd({
        pattern: "tiktokimg",
        alias: ["tti"],
        desc: "Download TikTok image.",
        category: "downloader",
        filename: __filename
    }, async (Void, citel, text, {
        isCreator
    }) => {
        if (!text) {
            return citel.send("Please provide a TikTok image URL.");
        }
        try {
            const { data } = await axios.get(`https://api.maher-zubair.tech/download/tiktokimg?url=${text}`);
            if (data.status) {
                const $ = cheerio.load(data.media);
                const img = $('img').attr('src');
                if (img) {
                    await Void.sendFileUrl(citel.chat, img, `Downloaded Media from TikTok.\n${Config.caption}`, citel);
                } else {
                    await citel.send("Error while downloading image.");
                }
            } else {
                await citel.send("Error while downloading image.");
            }
        } catch (error) {
            console.log("Error while downloading TikTok image: ", error);
            await citel.send("Error while downloading image.");
        }
    });
    //===================================================================================
    cmd({
        pattern: "threads",
        alias: ["thread"],
        desc: "Download threads videos, reels, and images.",
        category: "downloader",
        filename: __filename
    }, async (Void, citel, text, {
        isCreator
    }) => {
        if (!text) {
            return citel.send("Please provide a threads URL.");
        }
        try {
            const { data } = await axios.get(`https://api.maher-zubair.tech/download/threads?url=${text}`);
            if (data.status) {
                const $ = cheerio.load(data.media);
                const media = $('a').attr('href');
                if (media) {
                    await Void.sendFileUrl(citel.chat, media, `Downloaded Media from threads.\n${Config.caption}`, citel);
                } else {
                    await citel.send("Error while downloading media.");
                }
            } else {
                await citel.send("Error while downloading media.");
            }
        } catch (error) {
            console.log("Error while downloading threads media: ", error);
            await citel.send("Error while downloading media.");
        }
    });
//=========================================================================================

//==========================================================================================
cmd({
        pattern: "tiktok",
        alias: ["tt", "ttdl"],
        desc: "Downloads Tiktok Videos Via Url.",
        category: "downloader",
        filename: __filename,
        use: '<add tiktok url.>'
    },

    async (Void, citel, text) => {
        if (!text) return await citel.reply(`Uhh Please, Provide me tiktok Video Url*\n*_Ex .tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*`);
        let txt = text ? text.split(" ")[0] : '';
        if (!/tiktok/.test(txt)) return await citel.send(`*Uhh Please, Give me Valid Tiktok Video Url!*`);
        const url = `https://api.maher-zubair.tech/download/tiktok2?url=${txt}`;
        const {
            data
        } = await axios.get(url);
        if (data.status) return await Void.sendMessage(citel.chat, {
            video: {
                url: data.video
            },
            caption: Config.caption
        }, {
            quoted: citel
        });
        else return await citel.send("Error While Downloading Your Video")
    })
//---------------------------------------------------------------------------

cmd({
    pattern: "facebook",
    alias: ["fb", "fbdl"],
    desc: "Downloads fb videos.",
    category: "downloader",
    filename: __filename,
    use: "<add fb url.>"
}, async (Void, citel, text) => {
    if (!text || !text.startsWith("https://")) {
        return await citel.send("*_Please Give me Facebook Video Url_*\n*Example _" + prefix + "fb https://www.facebook.com/watch/?v=2018727118289093_*");
    }
    try {
        const url = `https://api.maher-zubair.tech/download/fb2?url=${text}`;
        const {
            data
        } = await axios.get(url);
        if (data.status) return await Void.sendMessage(citel.chat, {
            video: {
                url: data.video
            },
            caption: Config.caption
        }, {
            quoted: citel
        });
    } catch (_0xb02f31) {
        return await citel.send("*_Error, Video Not Found_*");
        console.log("error while Fb Downloading : ", _0xb02f31);
    }
});
//---------------------------------------------------------------------------

cmd({
        pattern: "apk",
        desc: "Downloads apks  .",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>',
    },

    async (Void, citel, text) => {
        if (!text) return citel.reply("*_Give me App Name_*");

        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        let randomName = getRandom(".apk");
        const filePath = `./${randomName}`;
        const {
            search,
            download
        } = require('aptoide-scraper')
        let searc = await search(text);
        let data = {};
        if (searc.length) {
            data = await download(searc[0].id);
        } else return citel.send("*_APP not Found, Try Other Name_*");


        const apkSize = parseInt(data.size);
        if (apkSize > 100) return citel.send(`❌ File size bigger than 150mb.`);
        const url = data.dllink;
        let inf = "*App Name :* " + data.name;
        inf += "\n*App id        :* " + data.package;
        inf += "\n*Last Up       :* " + data.lastup;
        inf += "\n*App Size     :* " + data.size;
        inf += "\n\n " + Config.caption


        axios.get(url, {
                responseType: 'stream'
            })
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
                    fileName: data.name + `.apk`,
                    caption: inf

                }
                Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })

                console.log('File downloaded successfully');


                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            }).catch(error => {
                fs.unlink(filePath)
                return citel.send('*_Apk not Found, Sorry_*')
            });
    }
)
//---------------------------------------------------------------------------
cmd({
        pattern: "gdrive",
        desc: "Downloads google drive files.",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>'
    },

    async (Void, citel, text) => {
        if (!text) return citel.send('Uhh Please, Give me  Google Drive Url')
        if (!(text && text.match(/drive\.google/i))) citel.send('Uhh Please, Give me Valid Google Drive Url')
        let id = (text.match(/\/?id=(.+)/i) || text.match(/\/d\/(.*?)\//))[1]
        if (!id) return citel.reply('ID Not Found');
        try {
            GDriveDl(id).then(async (res) => {
                let data = "*File Name :* " + res.fileName;
                data += "\n*File Size :* " + res.size + "Mb";
                data += "\n*File Type :* " + res.mimetype.split('/')[1] + "\n" + Config.caption;
                let buttonMessage = {
                    document: {
                        url: res.downloadUrl
                    },
                    fileName: res.fileName,
                    mimetype: res.mimetype,
                    caption: "\t  *GOOGLE DRIVE DOWNLOADER*  \n" + data
                }
                return await Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })
            })
        } catch (error) {
            return citel.reply("```File Not Found```")
        }

    })
//---------------------------------------------------------------------------
cmd({
        pattern: "gitclone",
        desc: "Downloads apks  .",
        category: "downloader",
        filename: __filename,
        use: '<add sticker url.>',
    },
    async (Void, citel, text) => {
        if (!text) return await citel.send('*Provide Repo Url, Ex:- .gitclone https://github.com/Astropeda/whatsapp-bot*')
        const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
        if (!regex.test(text)) return await citel.send('*Uhh Please, Provide Valid Repositry Url*');
        let [_, user, repo] = text.match(regex) || []
        repo = repo.replace(/.git$/, '')
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`
        let filename = (await fetch(url, {
            method: 'HEAD'
        })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
        await Void.sendMessage(citel.chat, {
            document: {
                url: url
            },
            fileName: filename,
            mimetype: 'application/zip',
        })

    })

//---------------------------------------------------------------------------
cmd({
        pattern: "tts",
        desc: "text to speech.",
        category: "downloader",
        filename: __filename,
        use: '<Hii,this is Suhail>',
    },
    async (Void, citel, text) => {
        if (!text && !citel.quoted) return citel.reply(`*Please give me Text*\n *_Example : .tts Hi,I am Suhail Tech._*`);
        if (!text) {
            text = citel.quoted.text;
        }
        let texttts = text
        const ttsurl = googleTTS.getAudioUrl(texttts, {
            lang: "en",
            slow: false,
            host: "https://translate.google.com",
        });
        return Void.sendMessage(citel.chat, {
            audio: {
                url: ttsurl
            },
            mimetype: "audio/mpeg",
            fileName: `ttsCitelVoid.m4a`
        }, {
            quoted: citel
        });
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
    async (Void, citel, text) => {
        if (!text) return citel.reply(`Example : ${prefix}video Back in black`)
        let yts = require("secktor-pack")
        let search = await yts(text)
        let i = search.all[1];

        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        try {
            let urlYt = i.url;
            let infoYt = await ytdl.getInfo(urlYt);

            let VidTime = Math.floor(i.timestamp * 60);
            if (VidTime >= videotime) return await citel.reply(`❌ Video file too big!`);
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

            let buttonMessage = {
                video: fs.readFileSync(`./${randomName}`),
                mimetype: 'video/mp4',
                caption: "  Here's Your Video" + Config.caption,
            }
            Void.sendMessage(citel.chat, buttonMessage, {
                quoted: citel
            })
            return fs.unlinkSync(`./${randomName}`);

        } catch (e) {
            return await citel.reply("Error While Downloading Video : " + e);
        }
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
    async (Void, citel, text) => {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if (text.length == 0 && !citel.quoted) return citel.reply(`Give Song Name, Ex ${prefix}play back in black*`);
        try {
            let urlYt = text;
            if (!text) {
                text = citel.quoted.text;
            }

            if (!urlYt.startsWith("http")) {
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

                await Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                citel.reply(`❌ File size bigger than 100mb.`);
            }
            return fs.unlinkSync(`./${randomName}`);

        } catch (e) {
            return citel.reply(`Error While Downloading Your Song`);
        }
    })


//---------------------------------------------------------------------------
cmd({
        pattern: "sound",
        desc: "Downloads ringtone.",
        category: "downloader",
        filename: __filename,
        use: '<Dowanload Tiktok Sounds>',
    },
    async (Void, citel, text) => {
        if (!text) return citel.send(`*Give A Number Example: ${prefix}sound 5*`)
        const n = parseInt(text);
        if (n.toString() == "NaN" || n < 1 || n > 160) return citel.reply('```❌ Give Me A Number From 1 to 160```');
        let url = `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${n.toString()}.mp3`
        let anu = await getBuffer(url)
        let buttonMessage = {
            audio: anu,
            fileName: url.toString(),
            mimetype: 'audio/mp4',
            ptt: true
        }
        return Void.sendMessage(citel.chat, buttonMessage, {
            quoted: citel
        })
    })

//---------------------------------------------------------------------------
cmd({
        pattern: "ringtone",
        desc: "Downloads ringtone.",
        category: "downloader",
        filename: __filename,
        use: '<ringtone name>',
    },
    async (Void, citel, text) => {
        if (!text) return citel.send(`Example: ${prefix}ringtone back in black`)
        const {
            ringtone
        } = require('../lib/scraper')
        let anu = await ringtone(text)
        let buttonMessage = {
            audio: {
                url: anu[0].audio
            },
            caption: `*${anu[0].title}*`,
            fileName: anu[0].title + '.mp3',
            mimetype: 'audio/mpeg',
        }
        return Void.sendMessage(citel.chat, buttonMessage, {
            quoted: citel
        })
    })
//---------------------------------------------------------------------------
cmd({
        pattern: "pinterest",
        desc: "Downloads image from pinterest.",
        category: "downloader",
        filename: __filename,
        use: '<text|image name>',
    },
    async (Void, citel, text) => {
        if (!text) return citel.send(`What picture are you looking for?`) && Void.sendMessage(citel.chat, {
            react: {
                text: '❌',
                key: citel.key
            }
        })
        try {
            let anu = await pinterest(text)
            let result = anu[Math.floor(Math.random() * anu.length)]
            let buttonMessage = {
                image: {
                    url: result
                },
                caption: Config.caption,
                headerType: 4,
                contextInfo: {
                    externalAdReply: {
                        title: `Here it is✨`,
                        body: `${Config.ownername}`,
                        thumbnail: log0,
                        mediaType: 2,
                        mediaUrl: ``,
                        sourceUrl: `youtube.com/c/Astro`
                    }
                }
            }
            return Void.sendMessage(citel.chat, buttonMessage, {
                quoted: citel
            })
        } catch (e) {
            return citel.reply("Uhh Plese, Give me a Name. Ex .pint apple")
        }
    })
//---------------------------------------------------------------------------
cmd({
        pattern: "mediafire",
        alias: ['mf', 'mfire'],
        desc: "Downloads media from Mediafire.",
        category: "downloader",
        filename: __filename,
        use: '<url of mediafire>',
    },
    async (Void, citel, text) => {
        if (!text) return citel.reply(`Give link ${tlang().greet}`);

        if (!text.includes("mediafire.com")) return citel.reply(`The link you provided is invalid`);
        let isUrl = text;
        const baby1 = await mediafire(isUrl);

        if (!baby1.length) return citel.reply(`could not found anything`);
        const apkSize = parseInt(baby1[0].size);
        if (apkSize > 100) return citel.reply(`❌ File size bigger than 150mb.`);

        let result4 = ` *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ*
*Nᴀᴍᴇ* : ${baby1[0].nama}
*Sɪᴢᴇ* :${baby1[0].size}
*Mɪᴍᴇ* : ${baby1[0].mime}

`;
        result4 += Config.caption;
        let buttonMessaged = {
            document: {
                url: baby1[0].link,
            },
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
    async (Void, citel, text) => {

        if (!text) return await citel.reply(`*_Ohh PLease, Give Me Song Name_*`);
        let yts = require("secktor-pack")
        let search = await yts(text);
        let i = search.all[1];
        let cap = "\t *---Yt Song Searched Data---*   \n\nTitle : " + i.title + "\nUrl : " + i.url + "\nDescription : " + i.timestamp + "\nViews : " + i.views + "\nUploaded : " + i.ago + "\nAuthor : " + i.author.name + "\n\n\nReply 1 To Video \nReply 2 To Audio";
        Void.sendMessage(citel.chat, {
            image: {
                url: i.thumbnail
            },
            caption: cap
        });
    })

//---------------------------------------------------------------------------
cmd({
        pattern: "yts",
        alias: ["ytsearch", "getyt"],
        desc: "Gives descriptive info of query from youtube..",
        category: "downloader",
        filename: __filename,
        use: '<yt search text>',
    },
    async (Void, citel, text) => {
        let yts = require("secktor-pack");
        if (!text) return citel.reply(`Example : ${prefix}yts WhatsApp Bot by Suhail Tech`);
        let search = await yts(text);
        let textt = "*YouTube Search*\n Result From " + text + "\n   ─────────────────── \n";
        let no = 1;
        for (let i of search.all) {
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
cmd({
        pattern: "ytmp4",
        alias: ["ytv", "ytvid", "ytvideo"],
        desc: "Downloads video from youtube.",
        category: "downloader",
        filename: __filename,
        use: '<yt video url>',
    },
    async (Void, citel, text) => {
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
            if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`);
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
                    caption: "  *Here's Your Video*" + Config.caption,
                    gifPlayback: false,
                    height: 496,
                    width: 640,
                    headerType: 4,
                    headerType: 4,

                }
                Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })
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
        alias: ["yta"],
        desc: "Downloads audio by yt link.",
        category: "downloader",
        use: '<yt video url>',
    },
    async (Void, citel, text) => {
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


                await Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })
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
    async (Void, citel, text) => {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };

        if (text.length === 0) return await citel.reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);

        try {
            let urlYt = text;
            if (!urlYt.startsWith("http")) return await citel.reply(`❌ Give youtube link!`);

            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= videotime) return await citel.reply(`❌ I can't download that long video!`);

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
                    document: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    caption: "  *Here's Your File*\n" + Config.caption,
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
                await Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                citel.reply(`❌ File size bigger than 200mb.`);
            }
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            console.log(e)
        }

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