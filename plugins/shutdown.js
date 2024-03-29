const { exec } = require("child_process");
const { smd } = require("../lib");
smd(
  {
    cmdname: "shutdown",
    info: "To shutdown bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (message) => {
    const { exec: childExec } = require("child_process");
    message.reply("Shutting Down...");
    childExec("pm2 stop all");
  },
);
