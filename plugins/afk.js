const { smd, sendWelcome } = require(lib_dir);

let afk = false;
smd(
  {
    pattern: "afk",
    desc: "away from keyboard",
    category: "chats",
  },
  async (message, match) => {
    try {
      let users = await db.get();
      afk = users.afk || { users: {} };
      if (!match) {
        return message.reply(
          (
            "\n  *Example: My owner is AFK*\n  *Last seen before #lastseen*\n  *Also update status: " +
            prefix +
            "afk @time, @date, @line(pickupline), @quote(random quote), @user*\n  \n*To turn off use " +
            prefix +
            "unAfk.*\n  "
          ).trim()
        );
      }
      if (match === "get" && afk[message.sender]) {
        return message.reply(afk[message.sender].reason);
      }
      afk[message.sender] = {
        reason: match,
        lastseen: new Date(),
      };
      users.afk = {
        ...afk,
      };
      users = await db.update(users);
      if (users) {
        let result = (
          "@" +
          message.sender.split("@")[0] +
          " currently AFK.\nReason: " +
          afk[message.sender].reason.replace(
            "@lastseen",
            "\nlastseen : " +
              getTimeDifference(afk[message.sender].lastseen) +
              "\n"
          )
        ).trim();
        await sendWelcome(message, result, message, message.sender);
      } else {
        message.reply("*Request Denied!*");
      }
    } catch (error) {
      message.error(error + "\n\nCommand: AFKs", error);
    }
  }
);
smd(
  {
    pattern: "unafk",
    desc: "turn off away from keyboard",
    category: "chats",
  },
  async (label) => {
    try {
      let user = await db.get();
      afk = user.afk || {};
      if (!afk[label.sender]) {
        return label.reply("*You are not AFK.*");
      }
      delete afk[label.sender];
      user.afk = {
        ...afk,
      };
      user = await db.update(user);
      if (user) {
        await label.reply("Finally, You are back!");
      } else {
        label.reply("*Request Denied!*");
      }
    } catch (error) {
      label.error(error + "\n\nCommand: UnAFK", error, "ERROR");
    }
  }
);
let txt = {
  2: "*Hey i already inform you!*\n",
  3: "*Stop spamming!*",
};
function getTimeDifference(_0x47a53) {
  const date = new Date(_0x47a53);
  const time = new Date();
  const dt = time - date;
  const dt_result = Math.floor(dt / 86400000);
  const dts_result = Math.floor((dt % 86400000) / 3600000);
  const dtts_result = Math.floor((dt % 3600000) / 60000);
  return (
    (dt_result ? "Days " + dt_result + ", " : "") +
    "Hours " +
    (dts_result || 0) +
    ", Minutes " +
    (dtts_result || 0)
  );
}
smd(
  {
    on: "main",
  },
  async (message) => {
    if (message.fromMe || message.isBot) {
      return;
    }
    try {
      if (!afk) {
        let label = await db.get();
        afk = label.afk || {
          users: [],
        };
      }
      let _0x1a0460 =
        message.reply_message && message.reply_message.fromMe ? true : false;
      let users = message.mentionedJid[0] ? [...message.mentionedJid] : [];
      if (message.reply_message) {
        users.push(message.reply_message.sender);
      }
      for (let data = 0; data < users.length; data++) {
        if (afk[users[data]] && message.sender !== users[data]) {
          if (!afk[users[data]].users[message.sender]) {
            afk[users[data]].users[message.sender] = 0;
          }
          afk[users[data]].users[message.sender]++;
          if (afk[users[data]].users[message.sender] > 3) {
            continue;
          }
          let checked_data = txt[afk[users[data]].users[message.sender]];
          let overall = (
            (checked_data ? checked_data : "") +
            " *@" +
            users[data].split("@")[0] +
            " currently AFK.*\n*Reason:* " +
            afk[users[data]].reason.replace(
              "@lastseen",
              "\n*Lastseen:* " +
                getTimeDifference(afk[users[data]].lastseen) +
                "\n"
            )
          ).trim();
          await sendWelcome(message, overall, message, users[data]);
        }
      }
    } catch (error) {
      console.log("ERROR IN AFK MAIN\n", error);
    }
  }
);
