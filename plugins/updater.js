const DB = require("../lib/scraper");
const { AdminFunction } = require("../lib");
const Config = require("../config");
const simpleGit = require("simple-git");
const git = simpleGit();

try {
  const Heroku = require("heroku-client");
  async function updateHerokuApp() {
    try {
      const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
      await git.fetch();
      const commits = await git.log(["main..origin/main"]);
      if (commits.total === 0) {
        return "You already have latest version installed.";
      } else {
        console.log("Update Detected, trying to update your bot!");
        const app = await heroku.get(`/apps/${process.env.HEROKU_APP_NAME}`);
        const gitUrl = app.git_url.replace(
          "https://",
          `https://api:${process.env.HEROKU_API_KEY}@`
        );
        try {
          await git.addRemote("heroku", gitUrl);
        } catch (e) {
          print("Heroku remote adding error", e);
        }
        await git.push("heroku", "main");
        return "Bot updated. Restarting.";
      }
    } catch (e) {
      print(e);
      return "Can't Update, Request Denied!";
    }
  }

  //---------------------------------------------------------------------------
  AdminFunction(
    {
      pattern: "updates",
      desc: "Shows repo's refreshed commits.",
      category: "tools",
      fromMe: true,
      react: "⬇️",
      filename: __filename,
      use: process.env.HEROKU_API_KEY ? "[ redeploy ]" : "",
    },
    async (citel, text) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0)
          return await citel.reply(
            "*`Hello " + Config.ownername + " You are on the Latest Version`*"
          );
        let update = await DB.sync();
        await citel.bot.sendMessage(
          citel.chat,
          { text: update.replace(/Astropeda/, "Astropeda") },
          { quoted: citel }
        );

        if (
          text == "redeploy" &&
          process.env.HEROKU_APP_NAME &&
          process.env.HEROKU_API_KEY
        ) {
          citel.reply("*`Redeploying Bot`*");
          const update = await updateHerokuApp();
          return await citel.reply(update);
        }
      } catch (e) {
        citel.error(`${e}\n\nCommand: update`, e, "ERROR!");
      }
    }
  );
  AdminFunction(
    {
      pattern: "update",
      desc: process.env.HEROKU_API_KEY
        ? "Temporary update for heroku app!"
        : "update your bot by repo!.",
      fromMe: true,
      category: "tools",
      filename: __filename,
    },
    async (citel) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0)
          return await citel.reply(
            "*`Hello " +
            Config.ownername +
            " " +
            Config.botname +
            " is on the latest version.`*"
          );
        let update = await DB.sync();
        let text = " *`> Update Started`*\n" + update + "";
        await citel.bot.sendMessage(citel.jid, { text });
        await require("simple-git")().reset("hard", ["HEAD"]);
        await require("simple-git")().pull();
        await citel.reply(
          process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY
            ? "*`Successfully Updated Your Botto`*"
            : "*Successfully updated. Now You Have Latest Version Installed!*"
        );
      } catch (e) {
        citel.error(`${e}\n\nCommand: updatenow`, e, "ERROR!");
      }
    }
  );
} catch (e) { }
