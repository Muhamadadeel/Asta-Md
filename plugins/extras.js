const { UserFunction, tlang, prefix, amd } = require("../lib");
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
UserFunction(
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
amd(
  {
    cmdname: "freply",
    desc: "Create fake Reply by given texts!",
    type: "chats",
    use: " msg| reply_text | number ",
    usage: "generates fake messages of given text and number!",
    filename: __filename,
    public: true,
  },
  async (m, text) => {
    try {
      let types = ["text", "order", "contact", "image", "video"];
      let args = text.split("|");
      if (!text || args.length < 3)
        return await m.reply(
          `*Use ${prefix}fakereply text |Reply_text|2349027862116|type(text,order,contact,image,video)*`
        );
      let reply = args[0],
        msg = args[1],
        num = `${args[2].replace(/[^0-9]/g, "")}@s.whatsapp.net`,
        type = args[3] && types.includes(args[3]) ? args[3] : "text",
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        amds = "amd";
      for (let i = 0; i < 13; i++) {
        amds += charset[Math.floor(Math.random() * charset.length)];
      }
      let fak = await m.bot.fakeMessage(
        type,
        { id: amds, remoteJid: m.isGroup ? m.chat : num, participant: num },
        msg
      );
      try {
        if (type === "contact") {
          fak.message.contactMessage.jpegThumbnail = await m.getpp(num);
        }
      } catch (e) {
        console.log(e);
      }
      await m.bot.sendMessage(m.chat, { text: reply }, { quoted: fak });
    } catch (e) {
      m.error(`${e}\n\nCommand: fakereply`, e, false);
    }
  }
);