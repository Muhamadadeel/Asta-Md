const { smd, tlang, prefix } = require("../lib");
async function loadMessages(msg, data, match = "") {
  try {
    match = (match ? match : data).split("@")[0];
    let output = await msg.loadMessages(data);
    let result = [];
    for (let mmp = 0; mmp < output.length; mmp++) {
      if (output[mmp].key.participant?.includes(match)) {
        result.push(output[mmp]);
      }
    }
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
smd(
  {
    pattern: "delspam",
    category: "chats",
    desc: "delete messages of user from chat",
    use: "[ 4/ 6/ 10 ]",
    usage:
      "delete messages of replied/@mentioned user from chat by giving number of messages!",
    filename: __filename,
  },
  async (message, match, { store: data }) => {
    try {
      if (!message.isGroup) {
        return await message.send(tlang("group"));
      }
      if (!message.isBotAdmin) {
        return await message.send("I am Not Admin!");
      }
      if (!message.isAdmin && !message.isCreator) {
        return await message.send(tlang("admin"));
      }
      let input = message.quoted
        ? message.quoted.senderNum
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : false;
      if (!input) {
        return await message.send(
          "*Please reply/@user to delete messages!*\n*Use '" +
            prefix +
            "delspam 5 @user' (delete 5 msgs)*"
        );
      }
      let chats = await loadMessages(data, message.chat, input);
      let history = parseInt(match.split(" ")[0]) || 5;
      let result = chats.length - history;
      for (let msgs = chats.length - 1; msgs >= result; msgs--) {
        try {
          if (chats[msgs]) {
            await message.delete(chats[msgs]);
          }
        } catch (err) {}
      }
    } catch (err) {
      console.log(err);
    }
  }
);
