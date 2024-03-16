const fs = require('fs-extra')
const {
    DisconnectReason,
    useMultiFileAuthState
} = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys")
    .default;
const handleMessagesUpsert = require("./function.js"); // Import the function from function.js
async function connectionLogic() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("auth_info_baileys");
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        fireInitQueries: false,
        shouldSyncHistoryMessage: false,
        downloadHistory: false,
        syncFullHistory: false,
        generateHighQualityLinkPreview: true,
    });
    sock.ev.on("connection.update", async (update) => {
        const {
            connection,
            lastDisconnect,
            qr
        } = update || {};
        if (qr) {
            console.log(qr);
        }
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                connectionLogic();
            }
        }
    });
    handleMessagesUpsert(sock); // Call the function and pass the sock instance
    sock.ev.on("creds.update", saveCreds);
}
connectionLogic();