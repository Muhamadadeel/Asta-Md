const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  prefix,
  smd,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const util = require("util");
const events = astro_patch;
const { commands } = require("../lib");
const { exec } = require("child_process");
const translatte = require("translatte");
const cron = require("node-cron");
var cronStart = false;
astro_patch.smd(
  {
    pattern: "ping",
    desc: "To check ping",
    category: "tools",
    filename: __filename,
  },
  async (message) => {
    const startTime = new Date().getTime();
    const { key } = await message.reply("*Testing Ping!!!*");
    const endTime = new Date().getTime();
    return await message.send(
      `*Pong*\n *${endTime - startTime} ms* `,
      { edit: key },
      "",
      message,
    );
  },
);