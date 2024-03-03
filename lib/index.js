/*

This is a Node.js module that exports an object containing various functions, variables, and configurations. Here's a breakdown of what each part of the module does:

Importing modules: The module imports several other modules, including config, scraper, myfuncn, database/user, database/bgm, database/group, database/alive, database/xp, database/plugins, database/warn, database/notes, database/cards, commands, and chatbot.
Exporting variables and functions: The module exports several variables and functions as properties of an object, including:
alive: A database of alive messages for users.
bgms: A database of background music for users.
sck: A database of group information.
cmd: A function for defining and registering commands.
commands: An array of registered commands.
chatbot: A database of chatbot messages for users.
sck1: A database of user information.
RandomXP: A function for generating random XP values for users.
plugindb: A database for storing plugin configurations.
warndb: A database for storing warning logs for users.
notes: A database for storing notes for users.
haigu: A database for storing card information.
card: A database for storing card information.
unixTimestampSecond: A function for converting a date object to a Unix timestamp in seconds.
generateMessageTag: A function for generating a message tag for a given message object.
processTime: A function for calculating the processing time of a given function.
getBuffer: A function for converting a stream to a buffer.
fetchJson: A function for making an HTTP request and parsing the response as JSON.
runtime: A function for calculating the runtime of a given function.
clockString: A function for converting a number of seconds to a clock string format.
sleep: A function for pausing execution for a given number of milliseconds.
isUrl: A function for checking if a given string is a URL.
getTime: A function for getting the current time in a given format.
formatDate: A function for formatting a given date object in a given format.
formatp: A function for formatting a given phone number in international format.
jsonformat: A function for pretty-printing a given JSON object.
logic: A function for performing logical operations on given values.
generateProfilePicture: A function for generating a profile picture for a given user ID.
bytesToSize: A function for converting bytes to a human-readable file size.
getSizeMedia: A function for getting the size of a given media object.
parseMention: A function for parsing mentioned users from a given message object.
GIFBufferToVideoBuffer: A function for converting a GIF buffer to a video buffer.
smsg: A function for sending a message to a given chat ID with optional options.
pinterest: A function for scraping images from Pinterest.
iginfo: A function for getting information about an Instagram user or post.
adultvid: A function for scraping adult videos from a given URL.
hentai: A function for scraping hentai images from a given URL.
delallnote: A function for deleting all notes for a given user ID.
marry: A function for marrying two users by their IDs.
checkmarried: A function for checking if two users are married by their IDs.
divorce: A function for divorcing two users by their IDs.
addnote: A function for adding a note for a given user ID.
claim: A function for claiming a given note by a user ID.
install: A function for installing a given plugin by its name.
allnotes: A function for getting all notes for a given user ID.
remove: A function for removing a given plugin by its name.
plugins: A function for getting a list of installed plugins.

*/


const Config = require('../config')
const { 
    pinterest,
    iginfo,
    adultvid,
    hentai,
    delallnote,
    marry,
    checkmarried,
    divorce,
    addnote,
    claim,
    install,
    allnotes,
    remove,
    plugins,
    tlang,
    collection,
    checkcard,
    botpic,
    language,
    getString,
    wallpaper,
    delnote,
    wikimedia,
    aiovideodl,
    toAudio,
    toPTT,
    toVideo,
    sync,
    syncgit,
    updatedb,
    ffmpeg,
    TelegraPh,
    UploadFileUgu,
    webp2mp4File,
    fancy,
    randomfancy,
    Insta,
    GDriveDl
} = require('./scraper')
 
const acrcloud = require(__dirname + '/class/init')
const {
    unixTimestampSecond,
    generateMessageTag,
    processTime,
    getBuffer,
    fetchJson,
    runtime,
    clockString,
    sleep,
    isUrl,
    getTime,
    formatDate,
    formatp,
    jsonformat,
    logic,
    generateProfilePicture,
    bytesToSize,
    getSizeMedia,
    parseMention,
    GIFBufferToVideoBuffer,
    smsg
} = require('./myfuncn')
const {
    listall,
    strikeThrough,
    wingdings,
    vaporwave,
    typewriter,
    analucia,
    tildeStrikeThrough,
    underline,
    doubleUnderline,
    slashThrough,
    sparrow,
    heartsBetween,
    arrowBelow,
    crossAboveBelow,
    creepify,
    bubbles,
    mirror,
    squares,
    roundsquares,
    flip,
    tiny,
    createMap,
    serif_I,
    manga,
    ladybug,
    runes,
    serif_B,
    serif_BI,
    fancy1,
    fancy2,
    fancy3,
    fancy4,
    fancy5,
    fancy6,
    fancy7,
    fancy8,
    fancy9,
    fancy10,
    fancy11,
    fancy12,
    fancy13,
    fancy14,
    fancy15,
    fancy16,
    fancy17,
    fancy18,
    fancy19,
    fancy20,
    fancy21,
    fancy22,
    fancy23,
    fancy24,
    fancy25,
    fancy26,
    fancy27,
    fancy28,
    fancy29,
    fancy30,
    fancy31,
    fancy32,
    fancy33,
    randomStyle
} = require('./stylish-font')
const { sck1 } = require(__dirname + '/database/user')
const { bgms } = require(__dirname + '/database/bgm')
const { sck } = require(__dirname + '/database/group')
const { alive } = require(__dirname + '/database/alive')
const { RandomXP } = require(__dirname + '/database/xp')
const { plugindb } = require(__dirname + '/database/plugins')
const { warndb } = require(__dirname + '/database/warn')
const { notes } = require(__dirname + '/database/notes')
const { haigu } = require(__dirname + '/database/cards')
const { card } = require(__dirname + '/database/cards')
const { cmd, commands } = require(__dirname + '/commands')
const { chatbot } = require(__dirname+'/database/chatbot')
module.exports = {
    alive,
    bgms,
    sck,
    cmd,
    commands,
    chatbot,
    sck1,
    RandomXP,
    plugindb,
    warndb,
    notes,
    haigu,
    card,
    unixTimestampSecond,
    generateMessageTag,
    processTime,
    getBuffer,
    fetchJson,
    runtime,
    clockString,
    sleep,
    isUrl,
    getTime,
    formatDate,
    formatp,
    jsonformat,
    logic,
    generateProfilePicture,
    bytesToSize,
    getSizeMedia,
    parseMention,
    GIFBufferToVideoBuffer,
    smsg,
    pinterest,
    iginfo,
    adultvid,
    hentai,
    delallnote,
    marry,
    checkmarried,
    divorce,
    addnote,
    claim,
    install,
    allnotes,
    remove,
    plugins,
    tlang,
    collection,
    checkcard,
    botpic,
    language,
    getString,
    wallpaper,
    delnote,
    wikimedia,
    aiovideodl,
    toAudio,
    toPTT,
    toVideo,
    sync,
    syncgit,
    updatedb,
    ffmpeg,
    TelegraPh,
    UploadFileUgu,
    webp2mp4File,
    fancy,
    randomfancy,
    listall,
    strikeThrough,
    wingdings,
    vaporwave,
    typewriter,
    analucia,
    tildeStrikeThrough,
    underline,
    doubleUnderline,
    slashThrough,
    sparrow,
    heartsBetween,
    arrowBelow,
    crossAboveBelow,
    creepify,
    bubbles,
    mirror,
    squares,
    roundsquares,
    flip,
    tiny,
    createMap,
    serif_I,
    manga,
    ladybug,
    runes,
    serif_B,
    serif_BI,
    serif_I,
    fancy1,
    fancy2,
    fancy3,
    fancy4,
    fancy5,
    fancy6,
    fancy7,
    fancy8,
    fancy9,
    fancy10,
    fancy11,
    fancy12,
    fancy13,
    fancy14,
    fancy15,
    fancy16,
    fancy17,
    fancy18,
    fancy19,
    fancy20,
    fancy21,
    fancy22,
    fancy23,
    fancy24,
    fancy25,
    fancy26,
    fancy27,
    fancy28,
    fancy29,
    fancy30,
    fancy31,
    fancy32,
    fancy33,
    randomStyle,
    Insta,
    GDriveDl,
    addCommand: cmd,
    groupdb: sck,
    userdb: sck1,
    prefix:  Config.HANDLERS.includes("null") ? '' : Config.HANDLERS[0],
    Config,
    fancytext: (text, index) => {
        index = index - 1;
        return listall(text)[index];
    },
    /*parseJid(text = "") {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
        );
    },
    parsedJid(text = "") {
        return [...text.matchAll(/([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
        );
    },
        parsedJidd(text = "") {
        return [...text.matchAll(/([0-9]{5,16}|0)/g)].map(
            (v) => v + "@s.whatsapp.net"
        );
    },
    
    */
  parsedJid(text='') {
  const jidPattern = /\b([0-9]{5,16}@s\.whatsapp\.net)\b/g;
  const groupJidPattern = /\b([0-9]{18}@g\.us)\b/g;
  const regex = new RegExp(`${jidPattern.source}|${groupJidPattern.source}`, 'g');
  const jids = text.match(regex) || [];
  return jids;
    },
    getAdmin: async(Void, citel) => {
        var adminn = await Void.groupMetadata(citel.chat);
        a = [];
        for (let i of adminn.participants) {
            if (i.admin == null) continue;
            a.push(i.id);
        }
        return a;
    },
    parseurl: (parseurl = (url) => { return url.match( new RegExp( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, "gi")); }),
    isInstaUrl: (url) => { /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim.test(url); },
    isNumber: function isNumber() {
        const int = parseInt(this);
        return typeof int === "number" && !isNaN(int);
    },
    shazam: async function shazam(buffer) {
        let acr = new acrcloud({
            host: "identify-eu-west-1.acrcloud.com",
            endpoint: '/v1/identify',
            signature_version: '1',
            data_type: 'audio',
            secure: true,
            access_key: "c816ad50a2bd6282e07b90447d93c38c",
            access_secret: "ZpYSwmCFpRovcSQBCFCe1KArX7xt8DTkYx2XKiIP",
        });

        let res = await acr.identify(buffer);
        let { code, msg } = res.status;
        if (code !== 0) return msg;
        let { title, artists, album, genres, release_date, external_metadata } =
        res.metadata.music[0];
        let { youtube, spotify } = external_metadata;

        return {
            status: 200,
            title: title,
            artists: artists !== undefined ? artists.map((v) => v.name).join(", ") : "",
            genres: genres !== undefined ? genres.map((v) => v.name).join(", ") : "",
            release_date: release_date,
            album: album.name || "",
        };
    },

}
