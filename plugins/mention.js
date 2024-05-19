const { smd } = require(lib_dir);
const { mention } = require(lib_dir + "/astropeda.js");
smd(
  {
    cmdname: "mention",
    fromMe: true,
    category: "chats",
    desc: "set auto reply for mention",
    use: "[ url type/audio ]",
    usage: "Create Reply if tagged",
    filename: __filename,
  },
  async (message, match) => {
    mention.cmd(message, match);
  }
);
smd(
  {
    on: "main",
    fromMe: false,
  },
  async (message, match = "") => {
    mention.check(message, match);
  }
);
