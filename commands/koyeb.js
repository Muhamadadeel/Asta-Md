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


/*
 
 const axios = require('axios');
const { tlang,smd } = require('../lib')
const { redeploy , getvar , delvar , getallvar , change_env , get_deployments} = require('../lib/koyeb')
const Config = require('../config')

if(Config.KOYEB_API && process.env.KOYEB_API){
//----------------------------------------------------------------------------------------------------------------------------------------------------
smd(
  {
    pattern: "updatenow",
    desc: "update bot with refreshed commit.",
    filename: __filename,
    category: "misc",
  },
  async (Suhail,msg,text,{isCreator}) => {
       if(!isCreator) return msg.reply(tlang().owner);
       let check = await get_deployments()
       if(check==='true') return msg.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
       let data = await redeploy();
       return msg.reply(data)
  })
//----------------------------------------------------------------------------------------------------------------------------------------------------
smd(
  {
    pattern: "koyebgetvar",
    desc: "get desired var from koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (Suhail,msg,text,{isCreator}) => {
       if(!isCreator) return msg.reply(tlang().owner);
       if(!text) return msg.reply('Please provide key.\n_Eg: .getvar PORT_')
       let data = await getvar(text);
       return msg.reply(data)
  })
//----------------------------------------------------------------------------------------------------------------------------------------------------
smd(
  {
    pattern: "getallvar",
    desc: "get all vars from koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (Suhail,msg,text,{isCreator}) => {
       if(!isCreator) return msg.reply(tlang().owner);
       let data = await getallvar();
       return msg.reply(data)
  })
//----------------------------------------------------------------------------------------------------------------------------------------------------
smd(
  {
    pattern: "koyebsetvar",
    desc: "set var in koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (Suhail,msg,text,{isCreator}) => {
       if(!isCreator) return msg.reply(tlang().owner);
       if(!text.split(':')[1]) return msg.reply('*Wrong Format.*\nPlease provide key and value.\n_Eg: .setvar THEME:SECKTOR_')
       let check = await get_deployments()
       if(check==='true') return msg.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
       let data = await change_env(text)
       return msg.reply(data)
  })

//----------------------------------------------------------------------------------------------------------------------------------------------------
smd(
  {
    pattern: "koyebdelvar",
    desc: "delete var from koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (Suhail,msg,text,{isCreator}) => {
       if(!isCreator) return msg.reply(tlang().owner);
       if(!text) return msg.reply('Please provide key.\n_Eg: .delvar PORT_')
       let check = await get_deployments()
       if(check==='true') return msg.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
       let data = await delvar(text)
       return msg.reply(data)
  })

}
*/