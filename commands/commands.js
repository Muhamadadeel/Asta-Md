const os = require('os');
let menus = false;
const moment = require("moment-timezone");
const fs = require("fs-extra");
const Config = require('../config');
let { fancytext, tlang, runtime, formatp, botpic, getBuffer, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const sᴜʜᴀɪʟ_ᴍᴅ= require('../lib/commands');
const mediafire = require("../lib/mediafire.js");
const GDriveDl = require('../lib/scraper.js')
const fbInfoVideo = require('fb-info-video'); 
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const cheerio = require('cheerio')
const axios= require('axios');
const videotime = 3600; // 30 min
const dlsize = 100; // 100mb
const { tlang, ringtone, cmd, fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('../lib')
const { dare, truth, random_question, Config } = require('../lib/truth-dare.js')
const { TelegraPh } = require('../lib/scraper')
const { eco } = require('discord-mongoose-economy')
const ty = eco.connect(mongodb);
const { Insta } = require('../lib');
const { redeploy, getvar, delvar, getallvar, change_env, get_deployments } = require('../lib/koyeb')
const { addnote, delnote, allnotes, delallnote, tlang, fetchJson, botpic, runtime, prefix, Config, alive } = require('../lib')
const { stickers } = require('../config')
const { Anime, Manga } = require("@shineiichijo/marika");
const {  fetchJson, getBuffer} = require('../lib/')
const { ffmpeg, cmd } = require('../lib')
const { TelegraPh , bgms  } = require('../lib/')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const Jimp = require("../lib/jimp");
const { plugins, plugindb, remove } = require('../lib')

//
const {cmd,tlang} = require('../lib')
cmd({   pattern: "restart", desc: "To restart bot",category: "tools", filename: __filename }, async(Void, citel,text,{ isCreator }) => {  if (!isCreator) return citel.reply(tlang().owner);  const { exec } = require("child_process"); citel.reply('Restarting'); exec('pm2 restart all'); });

 //

 const DB = require('../lib/scraper')
const simpleGit = require('simple-git');
const Heroku = require('heroku-client');
const git = simpleGit();