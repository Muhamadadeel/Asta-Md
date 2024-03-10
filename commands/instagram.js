//IG
const { MessageType } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');

const downloadInstagram = async (url) => {
    try {
        const response = await axios.get(`https://api.maher-zubair.tech/download/instagram?url=${encodeURIComponent(url)}`);
        const data = response.data;
        if (data.status === "success") {
            return data.data;
        } else {
            throw new Error("Error, Media Not Found");
        }
    } catch (error) {
        console.log("insta err: ", error);
        throw new Error("Error, Media Not Found");
    }
}

const sendInstagramMedia = async (citel, mediaList) => {
    for (let i = 0; i < mediaList.length; i++) {
        await citel.sendFileUrl(citel.chat, mediaList[i], `*Downloaded Media from Instagram.*${Config.caption}`, citel);
    }
}

const downloadInstagramVideo = async (citel, url) => {
    try {
        const response = await axios.get(`https://api.maher-zubair.tech/download/instagram?url=${encodeURIComponent(url)}`);
        const data = response.data;
        if (data.status === "success") {
            citel.send(data.data[0], {
                caption: Config.caption
            }, "image");
        } else {
            throw new Error("Error, Video Not Found");
        }
    } catch (error) {
        console.log("insta err: ", error);
        citel.send("*Error, Video Not Found*");
    }
}

module.exports = {
    downloadInstagram,
    sendInstagramMedia,
    downloadInstagramVideo
};

cmd({
    pattern: "instagramP",
    alias: ["instagram"],
    desc: "Downloads Instagram posts.",
    category: "downloader",
    filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!text) {
        return citel.send("Need Instagram post URL.");
    }
    try {
        const mediaList = await downloadInstagram(text);
        await sendInstagramMedia(citel, mediaList);
    } catch (error) {
        citel.send(error.message);
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
        return citel.send("*Provide Instagram video URL, Dear*");
    }
    try {
        await downloadInstagramVideo(citel, text);
    } catch (error) {
        citel.send(error.message);
    }
});














/*
const { Insta } = require('../lib');
const { MessageType } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');


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
*/