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





const axios = require('axios')
const {Config, randomeFunfacts ,smd } = require('../lib')
const fetch = require('node-fetch');
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
smd({pattern: "question", desc: "Random Question.", category: "fun",filename: __filename, },async(Void, citel, text , {cmdName}) => { return await citel.reply(await randomeFunfacts(cmdName)); });
//---------------------------------------------------------------------------
smd({pattern: "truth",desc: "truth and dare(truth game.).",category: "fun",filename: __filename, },async(Void, citel, text , {cmdName}) => { return await citel.reply(await randomeFunfacts(cmdName)); });
//---------------------------------------------------------------------------
smd({pattern: "dare",desc: "truth and dare(dare game.).",category: "fun",filename: __filename, },async(Void, citel, text , {cmdName}) => { return await citel.reply(await randomeFunfacts(cmdName)); });
//--------------------------------------------------------------------------------
smd({pattern: "joke",desc: "Sends Joke in chat.",category: "fun",filename: __filename, },async(Void, citel, text , {cmdName}) => { return await citel.reply(await randomeFunfacts(cmdName)); });
//---------------------------------------------------------------------------
smd({pattern: "joke2",desc: "Sends Joke in chat.",category: "fun",filename: __filename, },async(Void, citel, text , {cmdName}) => { return await citel.reply(await randomeFunfacts(cmdName)); });
//---------------------------------------------------------------------------
smd({pattern: "fact",desc: "Sends fact in chat.",category: "fun",filename: __filename, },async(Void, citel, text , {cmdName}) => { return await citel.reply(await randomeFunfacts(cmdName)); });
//---------------------------------------------------------------------------
smd({pattern: "quotes",desc: "Sends quotes in chat.",category: "fun",filename: __filename, },async(Void, citel, text , {cmdName}) => { return await citel.reply(await randomeFunfacts(cmdName)); });
//---------------------------------------------------------------------------
smd({pattern: "define",desc: "urban dictionary.",category: "fun",filename: __filename,},async(Void, citel, text) =>{try{let { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${text}`);var textt = `Word: ${text}\nDefinition: ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}\nExample: ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`;return citel.reply(textt);} catch {return citel.reply(`No result for ${text}`) }});