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
   * @youtube : https://www.youtube.com/SuhailTechInfo
   * @description : Suhail-Md ,A Multi-functional whatsapp user bot.
   * @version 1.0.6
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
    const { tlang,sck,prefix,smd } = require('../lib')
if(isMongodb){ let groupid = ''



    smd({
        pattern: "amute",
        desc: "sets auto mute time in group.",
        category: "moderation",
    },
    async(Suhail, msg, text,{ isCreator }) => {
        if (!isCreator) return msg.reply(tlang().owner)
        if(!msg.isGroup) return msg.reply(tlang().group)
        if(!text.split(':')[1]) return msg.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
        //if(!Number.isInteger(text.split(':')[0])) return msg.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`);
        //if(!Number.isInteger(text.split(':')[1])) return msg.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
              let Group = await sck.findOne({ id: msg.chat })
                if (!Group) {
                    await new sck({ id: msg.chat, mute: text }).save()
                    return msg.reply('Mute added.')
                } else {
                    await await sck.updateOne({ id: msg.chat }, { mute:text })
                    return msg.reply(`_Mute added for ${text} successfully._`)     
                }      
    }
    )
   
    //--------------------------------------------------------------------------------
    smd({
       pattern: "aunmute",
       desc: "sets unmute time in group.",
       category: "moderation",
   },
   async(Suhail, msg, text,{ isCreator }) => {
       if (!isCreator) return msg.reply(tlang().owner)
       if(!msg.isGroup) return msg.reply(tlang().group)
       if(!text.split(':')[0]) return msg.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
      // if(!Number.isInteger(text.split(':')[0])) return msg.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`);
      // if(!Number.isInteger(text.split(':')[1])) return msg.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
             let Group = await sck.findOne({ id: msg.chat })
               if (!Group) {
                   await new sck({ id: msg.chat, unmute: text }).save()
                   return msg.reply('Mute added.')
               } else {
                   await await sck.updateOne({ id: msg.chat }, { unmute:text })
                   return msg.reply(`_Unmute updated for ${text} successfully._`)
                   
               }      
   } 
   )
    //--------------------------------------------------------------------------------
    smd({
       pattern: "dunmute",
       desc: "Delete unmute from group.",
       category: "moderation",
   },
   async(Suhail, msg, text,{ isCreator }) => {
       if (!isCreator) return msg.reply(tlang().owner)
       if(!msg.isGroup) return msg.reply(tlang().group)
             let Group = await sck.findOne({ id: msg.chat })
               if (!Group) {
                   return msg.reply('There\'s no unmute set in group.')
               } else {
                   await await sck.updateOne({ id: msg.chat }, { unmute:'false' })
                   return msg.reply('Unmute deleted successfully.')
                   
               }      
   }
   )
    //--------------------------------------------------------------------------------
    smd({
       pattern: "dmute",
       desc: "Delete mute from group.",
       category: "moderation",
   },
   async(Suhail, msg, text,{ isCreator }) => {
       if (!isCreator) return msg.reply(tlang().owner)
       if(!msg.isGroup) return msg.reply(tlang().group)
             let Group = await sck.findOne({ id: msg.chat })
               if (!Group) {
                   return msg.reply('There\'s no mute set in group.')
               } else {
                   await await sck.updateOne({ id: msg.chat }, { mute:'false' })
                   return msg.reply('Mute deleted successfully.')
                   
               }      
   })
    //--------------------------------------------------------------------------------
   }