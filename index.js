const {
  DisconnectReason,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const useMongoDBAuthState = require("./mongoAuthState");
const makeWASocket = require("@whiskeysockets/baileys").default;
const mongoURL = "mongodb+srv://astromedia0010:beka10beka10@cluster0.pxc8ulo.mongodb.net/";
const { MongoClient } = require("mongodb");

async function connectionLogic() {
  const mongoClient = new MongoClient(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoClient.connect();
  // const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const collection = mongoClient
    .db("whatsapp_api")
    .collection("auth_info_baileys");
  const { state, saveCreds } = await useMongoDBAuthState(collection);
  const sock = makeWASocket({
    // can provide additional config here
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update || {};

    if (qr) {
      console.log(qr);
      // write custom logic over here
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        connectionLogic();
      }
    }
  });

  sock.ev.on("messages.update", (messageInfo) => {
    console.log(messageInfo);
  });

  sock.ev.on("messages.upsert", (messageInfoUpsert) => {
    console.log(messageInfoUpsert);
  });
  sock.ev.on("creds.update", saveCreds);
}

connectionLogic();
