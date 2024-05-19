const amd = require("../lib")
const { filter } = require(lib_dir + "/astropeda.js");
amd(
  {
    pattern: "fstop",
    category: "chats",
    desc: "stop auto reply from a word",
    use: "[ asta : how can i help you! ]",
    usage:
      "stop filter message to specific word, That already set in filter text!",
    fromMe: true,
    filename: __filename,
  },
  async (message, match) => {
    filter.stop(message, match);
  }
);
