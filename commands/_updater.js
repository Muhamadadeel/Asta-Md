const DB = require('../lib/scraper')
const {
  tlang,
  Config,
  prefix,
  cmd,
  sleep
} = require('../lib')
const simpleGit = require('simple-git');
const git = simpleGit();
const Heroku = require('heroku-client');
async function updateHerokuApp(heroku = '') {
  if (heroku === "no") {
    try {
      await require("simple-git")()
        .reset("hard", ["HEAD"]);
      await require("simple-git")()
        .pull();
      return "*Successfully updated. Bot Restarting...!*";
    } catch (error) {
      return error;
    }
  } else if (heroku === "yes") {
    const herokuClient = new Heroku({
      token: process.env.HEROKU_API_KEY
    });
    await git.fetch();
    const commits = await git.log(["main..origin/main"]);
    if (commits.total === 0) {
      return "You already have the latest version installed.";
    } else {
      const app = await herokuClient.get("/apps/" + process.env.HEROKU_APP_NAME);
      const gitUrl = app.git_url.replace("https://", "https://api:" + process.env.HEROKU_API_KEY + "@");
      try {
        await git.addRemote("heroku", gitUrl);
      } catch (error) {
        console.log("Heroku remote adding error");
      }
      await git.push("heroku", "main");
      return "Bot updated. Restarting.";
    }
  }
}
cmd({
  pattern: "update",
  desc: "Shows repo\'s refreshed commits.",
  category: "tools",
  filename: __filename
}, async (Void, citel, text, {
  isCreator
}) => {
  if (!isCreator) return citel.reply(`This command is only for my owner`)
  let commits = await DB.syncgit()
  if (commits.total === 0) return await citel.reply(`*BOT IS UPTO DATE...!!*`)
  let update = `*ASTA New Updates:*\n\n${await DB.sync()}`
  await Void.sendMessage(citel.chat, {
    text: update,
  }, {
    quoted: citel
  });
  if (Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY && text == 'start') {
    citel.reply('Heroku Build started...');
    const update = await updateHerokuApp('yes');
    return await citel.reply(update);
  }
})
cmd({
  pattern: "updatenow",
  desc: "Shows repo\'s refreshed commits.",
  category: "tools",
  filename: __filename
}, async (Void, citel, text, {
  isCreator
}) => {
  if (!isCreator) return await citel.reply("Only Owner Can Use This Command")
  let commits = await DB.syncgit()
  if (commits.total === 0) return await citel.reply(`*YOU HAVE LATEST VERSION INSTALLED!*`)
  let update = await DB.sync()
  await citel.send(" *SUHAIL_MD Updater Started...!*\n\n*Please wait you have new updates*" + update + "\n\n\n" + Config.caption);
  await sleep(3000);
  const updater = await updateHerokuApp('no');
  await citel.reply(updater);
  process.exit(0);
})