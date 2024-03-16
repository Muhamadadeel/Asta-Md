const { DisconnectReason, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys").default;

async function connectionLogic() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update || {};
    if (qr) {
      console.log(qr);
    }
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        connectionLogic();
      }
    }
  });

  sock.ev.on('messages.upsert', async (messageUpdate) => {
    const messages = messageUpdate.messages;
for (const message of messages) {
  if (!message.message || message.key.fromMe) continue;
  const text = message.message.conversation.toLowerCase(); // Convert the text to lowercase
  const prefix = /^[.!#/$,]/i; // Regular expression to match any of the prefixes, case-insensitive

  if (prefix.test(text)) {
    const command = text.split(' ')[0].slice(1); // No need to convert to lowercase again
    const args = text.slice(command.length + 2).trim();
            switch (command) {
                //menu
                case 'menu':
  const menuText = `ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴇɴᴜ

  1. Ping
  2. Echo
  3. Option 3

  *2024 ᴀꜱᴛʀᴏᴘᴇᴅᴀ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ*.`;

  sock.sendMessage(message.key.remoteJid, { text: menuText });
  break;

  case 'ping':
                    const pingStart = Date.now()
                    await sock.sendMessage(message.key.remoteJid, {
                        text: 'Pong!'
                    })
                    const pingEnd = Date.now()
                    const pingTime = pingEnd - pingStart
                    await sock.sendMessage(message.key.remoteJid, {
                        text: `Ping time: ${pingTime}ms`
                    })
                    break

                    case 'echo':
                      sock.sendMessage(message.key.remoteJid, {
                          text: args
                      })
                      break

case '3':
  sock.sendMessage(message.key.remoteJid, { text: 'You selected Option 3' });
  break;

default:
  sock.sendMessage(message.key.remoteJid, { text: 'Invalid option. Please try again.' });
  break
                
            }
        }
    }
})

  sock.ev.on("creds.update", saveCreds);
}

connectionLogic();