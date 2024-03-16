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

  sock.ev.on("messages.upsert", async (messageInfoUpsert) => {
    const messageInfo = messageInfoUpsert.messages[0];
    if (messageInfo.key.remoteJid === "status@broadcast") return;

    // Check if the message is a text message and contains "hello"
    if (messageInfo.message?.conversation?.toLowerCase().includes("hello")) {
      const chatId = messageInfo.key.remoteJid;
      await sock.sendMessage(chatId, { text: "Hello, there!" });
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

connectionLogic();