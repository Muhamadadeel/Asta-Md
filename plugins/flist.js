import { smd } from "../lib";
const { filter } = require(lib_dir + "/astropeda.js");
smd(
  {
    pattern: "flist",
    category: "chats",
    desc: "get list of auto reply word",
    use: "[ asta : how can i help you! ]",
    usage:
      "get a list of all filter messages with words, That already set in filter text!",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    filter.list(message);
  }
);
smd(
  {
    on: "text",
  },
  async (message, match) => {
    try {
      filter.check(message, match);
    } catch (error) {}
  }
);
