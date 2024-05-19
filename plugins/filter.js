const { smd } = require(lib_dir);
const { filter } = require(lib_dir + "/astropeda.js");

smd(
  {
    pattern: "filter",
    category: "chats",
    desc: "set auto reply filter messages",
    use: "[ asta : how can i help you! ]",
    usage:
      "set filter message to specific text, so that bot replied user from chat by giving text!",
    fromMe: true,
    filename: __filename,
  },
  async (message, match) => {
    filter.set(message, match);
  }
);
