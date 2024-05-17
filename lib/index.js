const Config = require("../config");
const fs = require("fs");
const {
  Insta,
  pinterest,
  adultvid,
  hentai,
  tlang,
  botpic,
  language,
  getString,
  wikimedia,
  toAudio,
  toPTT,
  toVideo,
  sync,
  syncgit,
  ffmpeg,
  TelegraPh,
  UploadFileUgu,
  webp2mp4File,
  fancy,
  randomfancy,
  ringtone,
  styletext,
  isAdmin,
  isBotAdmin,
  createUrl,
  mediafireDl,
  mediafire,
  dare,
  truth,
  random_question,
  amount_of_questions
} = require("./scraper");
const acrcloud = require(__dirname + "/class/init");
const {
  unixTimestampSecond,
  generateMessageTag,
  processTime,
  getBuffer,
  smdBuffer,
  fetchJson,
  smdJson,
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
  callsg
} = require("./serialized");
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
} = require("./stylish-font");
const {
  sck1
} = require(__dirname + "/database/user");
const {
  sck
} = require(__dirname + "/database/group");
const {
  alive
} = require(__dirname + "/database/alive");
const {
  pg,
  dbs,
  groupdb,
  userdb,
  alivedb,
  bot_
} = require(__dirname + "/schemes");
const {
  cmd,
  smd,
  amd,
  commands
} = require(__dirname + "/plugins");
const {
  sendAnimeReaction,
  yt,
  sendGImages,
  AudioToBlackVideo,
  textToLogoGenerator,
  photoEditor,
  updateProfilePicture,
  randomeFunfacts,
  getRandom,
  generateSticker,
  forwardMessage,
  plugins,
  audioEditor,
  send,
  react,
  note,
  sendWelcome,
  aitts
} = require("./astropeda.js");
module.exports = {
  yt: yt,
  plugins: plugins,
  forwardMessage: forwardMessage,
  updateProfilePicture: updateProfilePicture,
  sendAnimeReaction: sendAnimeReaction,
  sendGImages: sendGImages,
  textToLogoGenerator: textToLogoGenerator,
  photoEditor: photoEditor,
  updateProfilePicture: updateProfilePicture,
  randomeFunfacts: randomeFunfacts,
  AudioToBlackVideo: AudioToBlackVideo,
  getRandom: getRandom,
  generateSticker: generateSticker,
  audioEditor: audioEditor,
  send: send,
  react: react,
  note: note,
  sendWelcome: sendWelcome,
  aitts: aitts,
  pg: pg,
  dbs: dbs,
  bot_: bot_,
  alive: alive,
  sck: sck,
  smd: smd,
  amd: amd,
  commands: commands,
  sck1: sck1,
  Insta: Insta,
  pinterest: pinterest,
  adultvid: adultvid,
  hentai: hentai,
  tlang: tlang,
  botpic: botpic,
  language: language,
  getString: getString,
  wikimedia: wikimedia,
  toAudio: toAudio,
  toPTT: toPTT,
  toVideo: toVideo,
  sync: sync,
  syncgit: syncgit,
  ffmpeg: ffmpeg,
  TelegraPh: TelegraPh,
  UploadFileUgu: UploadFileUgu,
  webp2mp4File: webp2mp4File,
  fancy: fancy,
  randomfancy: randomfancy,
  ringtone: ringtone,
  styletext: styletext,
  isAdmin: isAdmin,
  isBotAdmin: isBotAdmin,
  createUrl: createUrl,
  mediafireDl: mediafireDl,
  mediafire: mediafire,
  dare: dare,
  truth: truth,
  random_question: random_question,
  amount_of_questions: amount_of_questions,
  unixTimestampSecond: unixTimestampSecond,
  generateMessageTag: generateMessageTag,
  processTime: processTime,
  getBuffer: getBuffer,
  smdBuffer: smdBuffer,
  fetchJson: fetchJson,
  smdJson: smdJson,
  runtime: runtime,
  clockString: clockString,
  sleep: sleep,
  isUrl: isUrl,
  getTime: getTime,
  formatDate: formatDate,
  formatp: formatp,
  jsonformat: jsonformat,
  logic: logic,
  generateProfilePicture: generateProfilePicture,
  bytesToSize: bytesToSize,
  getSizeMedia: getSizeMedia,
  parseMention: parseMention,
  GIFBufferToVideoBuffer: GIFBufferToVideoBuffer,
  smsg: smsg,
  callsg: callsg,
  pinterest: pinterest,
  tlang: tlang,
  botpic: botpic,
  language: language,
  getString: getString,
  wikimedia: wikimedia,
  toAudio: toAudio,
  toPTT: toPTT,
  toVideo: toVideo,
  sync: sync,
  syncgit: syncgit,
  ffmpeg: ffmpeg,
  TelegraPh: TelegraPh,
  UploadFileUgu: UploadFileUgu,
  webp2mp4File: webp2mp4File,
  fancy: fancy,
  randomfancy: randomfancy,
  listall: listall,
  strikeThrough: strikeThrough,
  wingdings: wingdings,
  vaporwave: vaporwave,
  typewriter: typewriter,
  analucia: analucia,
  tildeStrikeThrough: tildeStrikeThrough,
  underline: underline,
  doubleUnderline: doubleUnderline,
  slashThrough: slashThrough,
  sparrow: sparrow,
  heartsBetween: heartsBetween,
  arrowBelow: arrowBelow,
  crossAboveBelow: crossAboveBelow,
  creepify: creepify,
  bubbles: bubbles,
  mirror: mirror,
  squares: squares,
  roundsquares: roundsquares,
  flip: flip,
  tiny: tiny,
  createMap: createMap,
  serif_I: serif_I,
  manga: manga,
  ladybug: ladybug,
  runes: runes,
  serif_B: serif_B,
  serif_BI: serif_BI,
  serif_I: serif_I,
  fancy1: fancy1,
  fancy2: fancy2,
  fancy3: fancy3,
  fancy4: fancy4,
  fancy5: fancy5,
  fancy6: fancy6,
  fancy7: fancy7,
  fancy8: fancy8,
  fancy9: fancy9,
  fancy10: fancy10,
  fancy11: fancy11,
  fancy12: fancy12,
  fancy13: fancy13,
  fancy14: fancy14,
  fancy15: fancy15,
  fancy16: fancy16,
  fancy17: fancy17,
  fancy18: fancy18,
  fancy19: fancy19,
  fancy20: fancy20,
  fancy21: fancy21,
  fancy22: fancy22,
  fancy23: fancy23,
  fancy24: fancy24,
  fancy25: fancy25,
  fancy26: fancy26,
  fancy27: fancy27,
  fancy28: fancy28,
  fancy29: fancy29,
  fancy30: fancy30,
  fancy31: fancy31,
  fancy32: fancy32,
  fancy33: fancy33,
  randomStyle: randomStyle,
  Insta: Insta,
  addCommand: cmd,
  groupdb: groupdb,
  userdb: userdb,
  alivedb: alivedb,
  prefix: Config.HANDLERS.includes("null") ? "" : Config.HANDLERS[0],
  Config: Config,
  setting: Config,
  stor: async () => {
    return await JSON.parse(fs.readFileSync(__dirname + "/store.json", "utf8"));
  },
  fancytext: (text, index) => {
    index = index - 1;
    return listAll(text)[index];
  },
  
  parseJid : (jidString = "") => {
    return jidString.match(/\[0-9\]+(-\[0-9\]+|)(@g.us|@s.whatsapp.net)/g) || [];
  },
  
  getAdminIds: async (client, message) => {
    const groupMetadata = await client.groupMetadata(message.chat);
    let adminIds = [];
    for (let participant of groupMetadata.participants) {
      if (participant.admin == null) {
        continue;
      }
      adminIds.push(participant.id);
    }
    return adminIds;
  },
  
  isGroup:isGroup = chatId => {
    return chatId.endsWith("@g.us");
  },
  
  parsuUrl:parsuUrl = url => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/, "gi"));
  },
  
  isInstaUrl: url => {
    /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am|instagr\.com)\/(\w+)/gim.test(url);
  },
  
  isNumber: function isNumber() {
    const number = parseInt(this);
    return typeof number === "number" && !isNaN(number);
  },
  shazam: async function shazam(audioData) {
    const acrCloudClient = new acrcloud({
      host: "identify-eu-west-1.acrcloud.com",
      endpoint: "/v1/identify",
      signatureVersion: "1",
      dataType: "audio",
      secure: true,
      accessKey: "c816ad50a2bd6282e07b90447d93c38c",
      accessSecret: "ZpYSwmCFpRovcSQBCFCe1KArX7xt8DTkYx2XKiIP"
    });
  
    const identificationResult = await acrCloudClient.identify(audioData);
    const { code: statusCode, msg: statusMessage } = identificationResult.status;
  
    if (statusCode !== 0) {
      return statusMessage;
    }
  
    const { title, artists, album, genres, release_date, external_metadata } = identificationResult.metadata.music[0];
    const { youtube, spotify } = external_metadata;
  
    return {
      status: 200,
      title,
      artists: artists !== undefined ? artists.map(artist => artist.name).join(", ") : "",
      genres: genres !== undefined ? genres.map(genre => genre.name).join(", ") : "",
      release_date,
      album: album.name || "",
      data: identificationResult
    };
  }
}