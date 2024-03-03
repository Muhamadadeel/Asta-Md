//Astropeda
//free template to start your own bbot
/*
const { Client, Boom } = require('@adiwajshing/baileys')
const { Boom } = require('@hapi/boom')

// Create a new WhatsApp client
const client = new Client()

// Connect to WhatsApp
client.connect()

// Listen for incoming messages
client.on('message-new', async (message) => {
  // Extract the message content and the sender's number
  const { body, from } = message

  // Check if the message contains a specific keyword
  if (body.toLowerCase().includes('hello')) {
    // Send a response message
    await client.sendMessage(from, 'Hello there!')
  } else if (body.toLowerCase() === 'goodbye') {
    // End the session
    await client.logout()
  }
})
//cmd
const { MessageType } = require('@adiwajshing/baileys')
const jokes = require('./lib/template/jokes.json') // import jokes from a json file

async function handleMessage(conn, citel) {
    if (citel.message.conversation) {
        const text = citel.message.conversation.toLowerCase()
        if (text.includes('joke')) {
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
            await conn.sendMessage(citel.chat, { text: randomJoke }, { quoted: citel })
        }
    }
}
//
async function handleMessage(citel, message) {
    if (message.body.toLowerCase() === 'block') {
      // check if the user mentioned another user
      if (message.mentionedJid.length === 0) {
        await citel.sendMessage(message.chat, { text: 'Please mention the user you want to block.' }, { quoted: message });
        return;
      }
  
      // get the JID of the user you want to block
      const userJid = message.mentionedJid[0];
  
      // block the user
      await citel.conn.blockUser(userJid, 'add');
  
      // send a message to confirm the block
      await citel.sendMessage(message.chat, { text: 'User blocked successfully!' }, { quoted: message });
    }
  }
//
citel.onMessage(async (message) => {
    if (message.body.toLowerCase() === 'pin') {
      const chat = await conn.loadChat(message.chat)
      const pin = await chat.pin()
      await conn.sendMessage(message.chat, { text: 'Chat pinned successfully!' }, { quoted: message })
    }
  })
//
citel.on('chat-update', async (chatUpdate) => {
    const chat = chatUpdate.messages[0].message;
    const chatId = chatUpdate.messages[0].key.remoteJid;
  
    if (chat.body.toLowerCase() === 'unpin') {
      try {
        await conn.chat.unpin(chatId);
        await conn.sendMessage(chatId, { text: 'Chat unpinned successfully!' });
      } catch (err) {
        await conn.sendMessage(chatId, { text: 'This chat was not pinned before.' });
      }
    }
  });
//
conn.on('CB:Call', async (call) => {
    if (call.type === 'incoming') {
      await conn.sendMessage(call.peerJid, { text: 'Hello, I am a bot!' }, { quoted: call })
    }
  })
  
  conn.on('CB:Chat', async (chat) => {
    if (chat.isGroup) {
      // Handle group chat events here
    } else {
      // Handle personal chat events here
    }
  })
  
  conn.on('CB:Action', async (action) => {
    if (action.type === 'add') {
      await conn.sendMessage(action.chat, { text: 'Hello, I am a bot!' }, { quoted: action })
    }
  })
  
  conn.on('CB:message', async (message) => {
    if (message.type === 'chat') {
      let citel = await createCitel(conn, message)
      if (message.body.toLowerCase() === 'join') {
        await joinGroup(conn, citel)
      }
    }
  })
//
async function joinGroup(conn, citel) {
    let content = citel.message.conversation
    let groupLink = content.match(new RegExp(/(https?:\/\/)?(chat|groups)\.whatsapp\.com\/([\w\-]+)/))
    if (groupLink) {
      let response = await conn.groupInviteCode(groupLink[0])
      if (response.code) {
        await conn.joinGroupViaLink(groupLink[0])
        await citel.reply('Joined the group via the provided link.')
      } else {
        await citel.reply('Failed to join the group.')
      }
    } else if (content.toLowerCase() === 'join') {
      let groupLink = await citel.getQuotedObj()
      if (groupLink.message.conversation) {
        let response = await conn.groupInviteCode(groupLink.message.conversation)
        if (response.code) {
          await conn.joinGroupViaLink(groupLink.message.conversation)
          await citel.reply('Joined the group via the provided link.')
        } else {
          await citel.reply('Failed to join the group.')
        }
      } else {
        await citel.reply('Please reply to a group link or provide a valid group link.')
      }
    }
  }
//
//
citel.on('chat-update', async (chat) => {
    if (chat.messages.length === 0) return;
    let msg = chat.messages[chat.messages.length - 1];
    if (!msg.key.fromMe) return;
    if (msg.key.remoteJid === 'status@broadcast') return;
    if (msg.messageStubType === 32) {
      let chatId = msg.key.remoteJid;
      let chat = await conn.loadChat(chatId);
      if (chat.archive === true) {
        await conn.modifyChat(chatId, 'unarchive');
        await conn.sendMessage(chatId, { text: 'Chat has been unarchived.' }, { quoted: msg });
      } else {
        await conn.modifyChat(chatId, 'archive');
        await conn.sendMessage(chatId, { text: 'Chat has been archived.' }, { quoted: msg });
      }
    }
  });
//
//
// Listen for connection errors
client.on('error', (err) => {
  console.error(err)
})

// Listen for disconnections
client.on('disconnected', (reason) => {
  console.log(`Disconnected: ${reason}`)
})

*/