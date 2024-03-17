/**

//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                ＷＨＡＴＳＡＰＰ ＢＯＴ－ＭＤ ＢＥＴＡ                                   //
//                                                                                                      // 
//                                         Ｖ：１．０．１                                                // 
//                                                                                                      // 
//            ███████╗██╗   ██╗██╗  ██╗ █████╗ ██╗██╗         ███╗   ███╗██████╗                        //
//            ██╔════╝██║   ██║██║  ██║██╔══██╗██║██║         ████╗ ████║██╔══██╗                       //
//            ███████╗██║   ██║███████║███████║██║██║         ██╔████╔██║██║  ██║                       //
//            ╚════██║██║   ██║██╔══██║██╔══██║██║██║         ██║╚██╔╝██║██║  ██║                       //
//            ███████║╚██████╔╝██║  ██║██║  ██║██║███████╗    ██║ ╚═╝ ██║██████╔╝                       //
//            ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝╚═════╝                        //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//

CURRENTLY RUNNING ON BETA VERSION!!
*
   * @project_name : Suhail-Md
   * @author : Suhail Tech Info
   * @youtube : https://www.youtube.com/c/@SuhailTechInfo0
   * @description : Suhail-Md ,A Multi-functional whatsapp user bot.
   * @version 1.0.9
*
   * Licensed under the  GPL-3.0 License;
* 
   * Created By Suhail Tech Info.
   * © 2023 Suhail-Md.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
 **/


const { groupdb,smd, getAdmin, tlang, prefix } = require('../lib')
const Config = require('../config')

let sck = groupdb;
    //---------------------------------------------------------------------------
smd({
        pattern: "deact",
 alias : ['deactive','deactivate'],
        desc: "Switches for varios works.",
        category: "group",
        filename: __filename
    },
    async(Suhail, msg, text,{ isCreator }) => {
        //-----------------------------------------	
        if (!msg.isGroup) return msg.reply(tlang().group);
        const groupAdmins = await getAdmin(Suhail.bot, msg)
        const botNumber = await Suhail.bot.decodeJid(msg.user)
        const isBotAdmins = msg.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = msg.isGroup ? groupAdmins.includes(msg.sender) : false;
        //-----------------------------------------  
        if (!msg.isGroup) return msg.reply("This feature in only for Group.")
        if (!text) return msg.reply(`❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-economy`)
        if (isCreator){console.log("this is a Bot Number in Deact Functions")}
       else if (!isAdmins) return msg.reply("❌ This command is only for admin")
        switch (text.split(" ")[0]) {
           case 'antilink':
               {
                   let checkgroup = await sck.findOne({ id: msg.chat })
                   if (!checkgroup) {
                       await sck.new({ id: msg.chat, antilink: "false" })
                       return msg.reply(' Antilink disabled Successfully')
                   } else {
                       if (checkgroup.antilink == "false") return msg.reply("Antilink was alredy disabled.")
                       await sck.updateOne({ id: msg.chat }, { antilink: "false" })
                       msg.reply('disabled antilink in current chat.')
                       return
                   }
               }
               break
                      case 'economy':
               {
                   let checkgroup = await sck.findOne({ id: msg.chat })
                   if (!checkgroup) {
                       await sck.new({ id: msg.chat, economy: "false" })
                       return msg.reply(' Economy disabled Successfully')
                   } else {
                       if (checkgroup.economy == "false") return msg.reply("Economy was alredy disabled.")
                       await sck.updateOne({ id: msg.chat }, { economy: "false" })
                       msg.reply('disabled Economy in current chat.')
                       return
                   }
               }
               break
               case 'events':
                   {
                       let checkgroup = await sck.findOne({ id: msg.chat })
                       if (!checkgroup) {
                           await sck.new({ id: msg.chat, events: "false" })
                           return msg.reply("Successfully disabled *Events*")
                       } else {
                           if (checkgroup.events == "false") return msg.reply("*Events* are already disabled")
                           await sck.updateOne({ id: msg.chat }, { events: "false" })
                           return msg.reply("Successfully disabled *Events*")
                       }
                   }
                   break
               case 'nsfw':
                   {
                       let checkgroup = await sck.findOne({ id: msg.chat })
                       if (!checkgroup) {
                           await sck.new({ id: msg.chat, nsfw: "false" })
                           return msg.reply("Successfully disabled *NSFW*")
                       } else {
                           if (checkgroup.nsfw == "false") return msg.reply("*NSFW* is already disabled")
                           await sck.updateOne({ id: msg.chat }, { nsfw: "false" })
                           msg.reply("Successfully disabled *NSFW*")
                           return
                       }
                   }
                   break
               default:
                   {
                       msg.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-economy")
                   }
        }
    }
)


