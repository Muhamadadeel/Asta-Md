const DB = require("../lib/scraper");
const { tlang, name, smd} = require("../lib");
const simpleGit = require("simple-git");
const git = simpleGit();
const Heroku = require("heroku-client");
//---------------------------------------------------------------------------

async function updateHerokuApp() {
  const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
  await git.fetch();
  const commits = await git.log(["main..origin/main"]);
  if (commits.total === 0) {
    return "Your Bot is Running on Latest Version.";
  } else {
    const app = await heroku.get(`/apps/${process.env.HEROKU_APP_NAME}`);
    const gitUrl = app.git_url.replace(
      "https://",
      `https://api:${process.env.HEROKU_API_KEY}@`
    );
    try {
      await git.addRemote("heroku", gitUrl);
    } catch (e) {
      console.log("Heroku remote adding error");
    }
    await git.push("heroku", "main");
    return "*_Bot Updated SuccessFully_*\n*_Wait While Restarting_*";
  }
}

//---------------------------------------------------------------------------
smd(
  {
    cmdname: "update",
    shortcut: ["ud"],
    infocmd: "Shows repo's refreshed commits.",
    category: "tools",
    filename: __filename,
  },
  async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner);
    let commits = await DB.syncgit();
    if (commits.total === 0)
      return await citel.reply(
        `*_HEY_* *_${name.ownername}_* *_Your Bot Is_*\n*_Running on Latest Version_*`
      );
    let update = await DB.sync();
    await Void.sendMessage(citel.chat, { text: update }, { quoted: citel });

    if (text == "all") {
      citel.reply(`*_Started Updating You Bot..._*\n*_Please Wait..._*`);
      const update = await updateHerokuApp();
      return await citel.reply(update);
    } else return;
  }
);

//---------------------------------------------------------------------------
//                  UPDATE COMMANDS
//---------------------------------------------------------------------------
if (name.HEROKU_APP_NAME && name.HEROKU_API_KEY) {
  smd(
    {
      cmdname: "updatebot",
      shortcut: ["ubot"],
      infocmd: "Shows repo's refreshed commits.",
      category: "tools",
      filename: __filename,
    },
    async (Void, citel, text, { isCreator }) => {
      if (!isCreator) return await citel.reply(tlang().owner);
      let commits = await DB.syncgit();
      if (commits.total === 0)
        return await citel.reply(
          `*_HEY_* *_${Config.ownername}_* *_Your Bot Is_*\n*_Running on Latest Version_*`
        );
      let update = await DB.sync();
      let buttonMessaged = {
        text:
          "*Updating Your Bot...!* \n" +
          update +
          "*",
        footer: "UPDATE",
        headerType: 4,
      };
      await Void.sendMessage(citel.chat, buttonMessaged);
      await require("simple-git")().reset("hard", ["HEAD"]);
      await require("simple-git")().pull();
      await citel.send(`*_Bot SuccessFully Updated_*`);
      process.exit(0);
    }
  );
}
