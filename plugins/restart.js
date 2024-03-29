const { exec } = require("child_process");
const { smd } = require("../lib");
let s_ser = true
smd(
  {
    cmdname: "restart",
    info: "To restart bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (message) => {
    const { exec: childExec } = require("child_process");
    message.reply("Restarting");
    childExec("pm2 restart all");
  },
);
