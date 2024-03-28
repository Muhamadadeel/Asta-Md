


const DB = require('../lib/scraper')
const { Config,smd } = require('../lib')
const simpleGit = require('simple-git');
const git = simpleGit();
const fs = require('fs');


if (!fs.existsSync('./.git')) { throw "UPDATE COMMAND NOT WORKS B'COZ GIT NOT FOUND IN APP!" }
try{

const Heroku = require('heroku-client');
//---------------------------------------------------------------------------

 


async function updateHerokuApp() {
    try{
    const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
    await git.fetch();
    const commits = await git.log(['main..origin/main']);
    if (commits.total === 0) { return 'You already have latest version installed.'; } 
    else {
      const app = await heroku.get(`/apps/${process.env.HEROKU_APP_NAME}`);
      const gitUrl = app.git_url.replace('https://', `https://api:${process.env.HEROKU_API_KEY}@`);
      try { await git.addRemote('heroku', gitUrl); } catch(e) { print('Heroku remote adding error',e);  }
      await git.push('heroku', 'main');
      return 'Bot updated. Restarting.';
    }
}catch(e){
  print(e)
  return "Can't Update, Request Denied!"}
  }

  
//---------------------------------------------------------------------------
smd({
            pattern: "update",
            desc: "Shows repo\'s refreshed commits.",
            category: "tools",
            fromMe:true,
 react : "🍂",
            filename: __filename,
            use :  process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY ? "[ start ]" :  "",
        },
        async(citel, text) => {
 try{
//console.log("Calle update ")
            let commits = await DB.syncgit()
           // console.log("commits:  ", commits)
            if (commits.total === 0) return await citel.reply(`*BOT IS UPTO DATE...!!*`) 
            let update = await DB.sync()
            await citel.bot.sendMessage(citel.chat, { text: update.replace(/SuhailTechIMd/,"Suhail Tech Info"), },{ quoted : citel });


if(text == 'start' && process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY ){
          citel.reply('Build started...');
          const update = await updateHerokuApp();
          return await citel.reply(update);
}



 }catch(e){citel.error(`${e}\n\nCommand: update` , e, "ERROR!") }



})



  
//---------------------------------------------------------------------------
//                  UPDATE COMMANDS
//---------------------------------------------------------------------------

        
     smd({
                 pattern: "updatenow",
                 desc:  process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY ? "Temporary update for heroku app!" :  "update your bot by repo!.",
                 fromMe:true,
                 category: "tools",
                 filename: __filename
             },
        async(citel) => {
      try{
                let commits = await DB.syncgit()
                if (commits.total === 0) return await citel.reply(`*YOU HAVE LATEST VERSION INSTALLED!*`)
                let update = await DB.sync()
                let text = " *> Please Wait Updater Started...!*\n  *───────────────────────────*\n"+update +"\n  *───────────────────────────*";
                await citel.bot.sendMessage(citel.jid, {text});
                await require("simple-git")().reset("hard",["HEAD"])
                await require("simple-git")().pull()
                await citel.reply( process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY ? "*BOT Temporary Updated on `HEROKU`!\nIt'll reset when your bot restarts!*" : "*Successfully updated. Now You Have Latest Version Installed!*")
               // process.exit(1);
      
       }catch(e){citel.error(`${e}\n\nCommand: updatenow` , e, "ERROR!") }
       })


}catch(e){}