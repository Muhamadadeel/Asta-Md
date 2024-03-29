const { exec } = require("child_process");
const { smd } = require("../lib");

// Set the s_ser variable to true (assuming it's a boolean flag)
let s_ser = true;

// Restart command
smd(
  {
    cmdname: "restart",
    info: "To restart bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename
  },
  async (message) => {
    const { exec: childExec } = require("child_process");
    message.reply("Restarting");
    childExec("pm2 restart all");
  }
);