const { smd, tlang, prefix, Config, sleep, getBuffer, smdJson, smdBuffer } = require("../lib");

async function loadMessages(store, chatId, userId = "") {
 try {
   userId = (userId ? userId : chatId).split("@")[0];
   let messages = await store.loadMessages(chatId);
   let userMessages = [];
   for (let i = 0; i < messages.length; i++) {
     if (messages[i].key.participant?.includes(userId)) {
       userMessages.push(messages[i]);
     }
   }
   return userMessages;
 } catch (error) {
   console.log(error);
   return [];
 }
}

smd({
 pattern: "delspam",
 alias: ["dlspam"],
 category: "tech",
 desc: "delete messages of user from chat",
 use: "[ 4/ 6/ 10 ]",
 usage: "delete messages of replied/@mentioned user from chat by giving number of messages!",
 filename: __filename
}, async (context, query, { store }) => {
 try {
   if (!context.isGroup) {
     return await context.send(tlang("group"));
   }
   if (!context.isBotAdmin) {
     return await context.send("I am Not Admin!");
   }
   if (!context.isAdmin && !context.isCreator) {
     return await context.send(tlang("admin"));
   }

   let targetUser = context.quoted ? context.quoted.senderNum : context.mentionedJid[0] ? context.mentionedJid[0] : false;
   if (!targetUser) {
     return await context.send(`*Please reply/@user to delete messages!*\n*Use '${prefix}delspam 5 @user' (delete 5 msgs)*`);
   }

   let userMessages = await loadMessages(store, context.chat, targetUser);
   let messagesToDelete = parseInt(query.split(" ")[0]) || 5;
   let startIndex = userMessages.length - messagesToDelete;

   for (let i = userMessages.length - 1; i >= startIndex; i--) {
     try {
       if (userMessages[i]) {
         await context.delete(userMessages[i]);
       }
     } catch (error) {}
   }
 } catch (error) {
   console.log(error);
 }
});