const { formatp , formatDate , tlang, botpic,cmd, prefix, runtime,Config , parsedJid ,sleep } = require('../lib')
const axios = require('axios')
const fetch = require('node-fetch');
let astro_patch
let api
let vercel

cmd({
    pattern: "bardai",
    desc: "bard.",
    category: "ai",
    filename: __filename,
},
async(Void, citel, text) => {
    try{
         await axios.get(`https://api.maher-zubair.tech/ai/bard?q=${text}`)
        var textt = `
        > Bard Ai ${text}`
        return citel.reply(textt)
                } catch {
                    return citel.reply(`No result for ${text}`)
                }
}
)