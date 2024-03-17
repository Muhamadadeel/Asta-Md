
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
   * ┌┤Created By Suhail Tech Info.
   * © 2023 Suhail-Md ✭ ⛥.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
**/









const Config = require('../config')
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1,smd } = require("../lib");
const axios = require('axios');

const fetch = require('node-fetch');

if(Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY ){
  const appName = Config.HEROKU_APP_NAME.toLowerCase();
  const authToken = Config.HEROKU_API_KEY;
  
  
         smd({
             pattern: "setsudo",
             desc: "Makes wa me of quoted or mentioned user.",
             category: "tools",
             filename: __filename
         },
  async(Suhail, msg, text) => {
if(!msg.quoted) return await msg.reply(`*Please Reply A User*`);
let user = msg.quoted.sender.split('@')[0]
if (global.sudo.includes(user)) return msg.reply("Number Already Exist In Sudo");
    global.sudo += ',' + user ;
const headers = 
        {
                'Accept': 'application/vnd.heroku+json; version=3',
                 'Authorization': `Bearer ${authToken}`,
                 'Content-Type': 'application/json'
        };
const varName = 'SUDO'
const newVarValue = global.sudo        
fetch(`https://api.heroku.com/apps/${appName}/config-vars`,
        {
                  method: 'PATCH',
                  headers,
                  body: JSON.stringify({ [varName]: newVarValue })
        })
.then(response => response.json())
.then(data => { return msg.reply(`*${user} Added Succesfully.*\nSudo Numbers : ${newVarValue}`); })
.catch(error => msg.error(error));

         })

//--------------------------------------------------------------------
 smd({
             pattern: "getsudo",
             desc: "Makes wa me of quoted or mentioned user.",
             category: "tools",
             filename: __filename
         },
async(Suhail, msg, text) => {  return await  msg.reply(global.sudo);})
//-------------------------------------------------------------------------

 smd({
             pattern: "delsudo",
             desc: "Makes wa me of quoted or mentioned user.",
             category: "tools",
             filename: __filename
         },
  async(Suhail, msg, text) => {
    
if(!msg.quoted) return msg.reply(`*Please Reply A User*`);
let user = msg.quoted.sender.split('@')[0] ;
let  rm = ',' +user 
if (global.sudo.includes(rm)) global.sudo = global.sudo.replace(rm, '');
else return await msg.reply("User not found in the Sudo List\n Sudo Numbers : " + global.sudo );



const headers = 
        {
                'Accept': 'application/vnd.heroku+json; version=3',
                 'Authorization': `Bearer ${authToken}`,
                 'Content-Type': 'application/json'
        };

const varName = 'SUDO'
const newVarValue = global.sudo        
fetch(`https://api.heroku.com/apps/${appName}/config-vars`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ [varName]: newVarValue })
        })
.then(response => response.json())
.then(data => 
      { 
   console.log(data);
   return msg.reply(`*${user} Deleted Succesfully.*\nSudo Numbers : ${newVarValue}`);
      })
  
.catch(error => { return msg.error('Error While Adding new Sudo \n'+ error);      })
 
})     
    
 //------------------------------------------------------------------------       
        
        
smd({
        pattern: "allvar",
        alias:['getallvar','allvars'],
        desc: "To get All  Heroku Vars",
        category: "tools",
        filename: __filename
    },
    
async(Suhail, msg , text,{ isCreator }) => {
        
  if (!isCreator) return msg.reply(tlang().owner);
const headers = {
  'Accept': 'application/vnd.heroku+json; version=3',
  'Authorization': `Bearer ${authToken}`
};
fetch(`https://api.heroku.com/apps/${appName}/config-vars`, { headers })
  .then(response => response.json())
  .then(data => {
    let allVars = `     *${appName}* Vars \n*________________________________________*\n`;
    Object.keys(data).forEach(key => {
                                         allVars += `*${key} :*  ${data[key]}\n` ;
                                     });
                                     return msg.reply(allVars);
  })        
.catch(error => msg.error('Error retrieving app variable\n'+ error));
  
});
//----------------------------------------------------------------------------------
smd({
        pattern: "addvar",
        desc: "To Set Heroku Vars",
        category: "tools",
        filename: __filename
    },
    
async(Suhail, msg , text,{ isCreator }) => {

     if (!isCreator) return msg.reply(tlang().owner);
if (!text) return msg.reply (`give me Variable Name\n*E.x : ${prefix}setvar CAPTION: Powered By Suhail Tech*`);
const headers = 
        {
                 'Accept': 'application/vnd.heroku+json; version=3',
                 'Authorization': `Bearer ${authToken}`,
                 'Content-Type': 'application/json'
        };
        const commaIndex = text.indexOf(':');
        const varName = text.slice(0, commaIndex).toUpperCase().trim();
        const newVarValue = text.slice(commaIndex + 1).trim();
        
if (!newVarValue) return msg.reply (`Please give me Value After ':' \n*Example : ${prefix}setvar AUTO_READ_STATUS:true*`);   
fetch(`https://api.heroku.com/apps/${appName}/config-vars`,
        {
                   method: 'PATCH',
                   headers,
                   body: JSON.stringify({ [varName.toUpperCase()]: newVarValue })
        })
  .then(response => response.json())
  .then(data => {  return msg.reply(`*${varName} updated Succesfully.*\n${varName}  :  ${newVarValue}`);   })
  .catch(error => msg.error('Error Adding app variable\n'+error));
  });
//-----------------------------------------------------------------------------------

smd({
        pattern: "getvar",
        desc: "To Get A Heroku Var",
        category: "tools",
        filename: __filename
    },
    
async(Suhail, msg , text,{ isCreator }) => {
   if (!isCreator) return msg.reply(tlang().owner);
if (!text) return msg.reply (`give me Variable Name\nExample : ${prefix}getvar AUTO_READ_STATUS`);
const headers = {
  'Accept': 'application/vnd.heroku+json; version=3',
  'Authorization': `Bearer ${authToken}`
};
const varName = text.toUpperCase().split(" ")
fetch(`https://api.heroku.com/apps/${appName}/config-vars`, { headers })
  .then(response => response.json())
  .then(data => {
  const variableValue = data[varName];
  if (variableValue) {return msg.reply(`*${varName} :* ${variableValue}`);} 
  else { return msg.reply(`*${varName}* does not exist in *${appName}* app.`);  }
  })
  .catch(error => msg.error('Error retrieving app variable\n'+ error));
  
});


//----------------------------------------------------------------------------------
smd({
        pattern: "setvar",
        desc: "To Set Heroku Vars",
        category: "tools",
        filename: __filename
    },
    async(Suhail, msg , text,{ isCreator }) => {
 if (!isCreator) return msg.reply(tlang().owner);
if (!text) return msg.reply (`give me Variable Name\n*Example : ${prefix}setvar CAPTION: Powered By Suhail Tech*`);
const headers = {
  'Accept': 'application/vnd.heroku+json; version=3',
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': 'application/json'
};
const commaIndex = text.indexOf(':');
const varName = text.slice(0, commaIndex).toUpperCase().trim();
const newVarValue = text.slice(commaIndex + 1).trim();

if (!newVarValue) return msg.reply (`Please give me Value After ':' \n*Example : ${prefix}setvar AUTO_READ_STATUS:true*`);       
fetch(`https://api.heroku.com/apps/${appName}/config-vars`, {
  method: 'GET',
  headers 
}) 
  .then(response => {
            if (response.ok) { return response.json(); } 
            else { throw new Error(`Failed to fetch app variables. Status: ${response.status}`); }
  })
  .then(data => {
        if (data.hasOwnProperty(varName)) 
        {
                const updatedConfig = { ...data };
                updatedConfig[varName] = newVarValue;
                return fetch(`https://api.heroku.com/apps/${appName}/config-vars`, 
                        {
                        method: 'PATCH',
                        headers,
                        body: JSON.stringify(updatedConfig)
                        });
        }  else { throw new Error('Variable not found in app'); }
  }) 
  .then(response => { if (response.ok) return msg.reply(`${varName} updated successfully.\n${varName}: ${newVarValue}`);  })
  .catch(error => {   return msg.send("```Uhh Please, Give me Valid Variable Name```") });
    
    
        
}
   )
    
    } // If Statements End Here FOr Heroku App and Heroku APP Key to Update App Variable 
