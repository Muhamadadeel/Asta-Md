const moment = require("moment-timezone")
const Config = require('../config')
let {
    fancytext,
    tlang,
    tiny,
    botpic,
    prefix,
    cmd
} = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
let astro_patch;
const {
    useMultiFileAuthState,
    makeWALocation,
    downloadContentFromMessageId,
    DisconnectReason,
    delay,
    jidDecode,
    jidFormat,
} = require('@adiwajshing/baileys');



async function forwardMessage(jid, Void, citel, cmd = "") {
    let mtype = citel.quoted.mtype;
    let message;
    if (mtype === "videoMessage" && cmd === "ptv") {
        message = {
            ptvMessage: {
                ...citel.quoted
            }
        };
    } else if (mtype === "videoMessage") {
        message = {
            videoMessage: {
                ...citel.quoted
            }
        };
    } else if (mtype === "imageMessage") {
        message = {
            imageMessage: {
                ...citel.quoted
            }
        };
    } else if (mtype === "audioMessage") {
        message = {
            audioMessage: {
                ...citel.quoted
            }
        };
    } else if (mtype === "documentMessage") {
        message = {
            documentMessage: {
                ...citel.quoted
            }
        };
    } else if (mtype === "conversation" || mtype === "extendedTextMessage") {
        return await citel.send(citel.quoted.text);
    }
    if (message) {
        astro_patch = Void;
        try {
            await astro_patch.relayMessage(jid, message, {
                messageId: citel.key.id
            });
        } catch (_0x272ed5) {
            if (cmd === "ptv" || cmd === "save") {
                await citel.send("*Error, Request not be proceed*");
            }
            console.log("Error in " + cmd + "-cmd in forwardMessage \n", _0x272ed5);
        }
    }
}
///============================================================================================
cmd({
    pattern: "ptv",
    desc: "send ptv Message of video",
    category: "whatsapp",
    filename: __filename
}, async (Void, citel, text, {
    cmdName,
    isCreator
}) => {
    if (!citel.quoted) return await citel.send("*Uhh please, reply to a video Message*")
    let mtype = citel.quoted.mtype
    if (mtype !== "videoMessage") return await citel.send("*Replied Message is not a video, Idiot.*")
    return await forwardMessage(citel.chat, Void, citel, cmdName)
}) ////------------------------------------------------------------
cmd({
    pattern: "save",
    desc: "Save whatsapp status",
    category: "whatsapp",
    filename: __filename
}, async (Void, citel, text, {
    cmdName,
    isCreator
}) => {
    if (!citel.quoted) return await citel.send("*Uhh Please, reply to whatsapp status*")
    let astro_patch_num = await Void.decodeJid(Void.user.id)
    return await forwardMessage(astro_patch_num, Void, citel, cmdName)
}) //--------------------------------------------------------------------
cmd({
    pattern: "lognum",
    desc: "Save Message to log number",
    category: "whatsapp",
    filename: __filename
}, async (Void, citel, text, {
    cmdName,
    isCreator
}) => {
    if (!isCreator) return await citel.send(tlang().owner)
    if (!citel.quoted) return await citel.send("*Uhh Please, reply to a Message*")
    let astro_patch_num = await Void.decodeJid(Void.user.id)
    return await forwardMessage(astro_patch_num, Void, citel, cmdName)
}) ///================================================================================
cmd({
    on: "text"
}, async (Void, citel, text) => {
    if (citel.quoted && citel.text.toLowerCase().includes("send")) {
        let astro_patch_num = await Void.decodeJid(Void.user.id)
        if (citel.quoted.sender === astro_patch_num && citel.quoted.chat === 'status@broadcast') {
            return await forwardMessage(citel.chat, Void, citel, 'send');
        }
    }
}) //==================================================================


async function pinChat(jid, Void, citel, cmd = "") {
    try {
        await Void.sendMessage(jid, {
            action: 'pin'
        });
        await citel.reply('Chat pinned successfully.');
    } catch (error) {
        console.log(error);
        await citel.reply('Error while pinning chat.');
    }
}

async function unpinChat(jid, Void, citel, cmd = "") {
    try {
        await Void.sendMessage(jid, {
            action: 'unpin'
        });
        await citel.reply('Chat unpinned successfully.');
    } catch (error) {
        console.log(error);
        await citel.reply('Error while unpinning chat.');
    }
}

cmd({
    pattern: "pin",
    desc: "Pin a chat.",
    category: "whatsapp",
    filename: __filename
}, async () => {
    if (!citel.isGroup) {
        return citel.reply(Config.notInGroup);
    }
    const jid = citel.chat;
    await pinChat(jid);
});

cmd({
    pattern: "unpin",
    desc: "Unpin a chat.",
    category: "whatsapp",
    filename: __filename
}, async () => {
    if (!citel.isGroup) {
        return citel.reply(Config.notInGroup);
    }
    const jid = citel.chat;
    await unpinChat(jid);
});
///=====
async function archiveChat(jid, Void, citel, cmd = "") {
    try {
        await client.catchUp();
        await client.chatArchive(jid);
        await citel.reply('Chat archived successfully.');
    } catch (error) {
        console.log(error);
        await citel.reply('Error while archiving chat.');
    }
}

async function unarchiveChat(jid, Void, citel, cmd = "") {
    try {
        await client.catchUp();
        await client.chatUnarchive(jid);
        await citel.reply('Chat unarchived successfully.');
    } catch (error) {
        console.log(error);
        await citel.reply('Error while unarchiving chat.');
    }
}

cmd({
    pattern: "archive",
    desc: "Archive a chat.",
    category: "whatsapp",
    filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!isCreator) {
        return citel.reply(Config.notAllowed);
    }
    if (!text) {
        return citel.reply('Please provide a chat ID or mention a chat to archive.');
    }
    const jid = text.includes('@') ? text.split('@')[0] + '@c.us' : text;
    await archiveChat(jid);
});

cmd({
    pattern: "unarchive",
    desc: "Unarchive a chat.",
    category: "whatsapp",
    filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!isCreator) {
        return citel.reply(Config.notAllowed);
    }
    if (!text) {
        return citel.reply('Please provide a chat ID or mention a chat to unarchive.');
    }
    const jid = text.includes('@') ? text.split('@')[0] + '@c.us' : text;
    await unarchiveChat(jid);
});

async function archiveChat(jid) {
    try {
        const chat = await Void.context.query({
            chatId: jidDecode(jid),
            messageId: '0@broadcast'
        });
        await Void.sendMessage(jid, {
            delete: {
                remoteJid: jid,
                fromMe: false,
                id: chat.messages[0].key.id,
                participant: jidDecode(jid),
            }
        });
        await citel.reply('Chat archived successfully.');
    } catch (error) {
        console.log(error);
        await citel.reply('Error while archiving chat.');
    }
}

async function unarchiveChat(jid) {
    try {
        const chat = await Void.context.query({
            chatId: jidDecode(jid),
            messageId: '0@broadcast'
        });
        await Void.sendMessage(jid, {
            addToGroupCall: {
                remoteJid: jid,
                sessionId: chat.messages[0].key.id,
                groupCallId: chat.messages[0].key.id,
                inviteCode: '',
            }
        });
        await citel.reply('Chat unarchived successfully.');
    } catch (error) {
        console.log(error);
        await citel.reply('Error while unarchiving chat.');
    }
}

cmd({
    pattern: "archive",
    desc: "Archive a chat.",
    category: "whatsapp",
    filename: __filename
}, async () => {
    if (!citel.isGroup) {
        return citel.reply(Config.notInGroup);
    }
    const jid = citel.chat;
    await archiveChat(jid);
});

cmd({
    pattern: "unarchive",
    desc: "Unarchive a chat.",
    category: "whatsapp",
    filename: __filename
}, async () => {
    if (!citel.isGroup) {
        return citel.reply(Config.notInGroup);
    }
    const jid = citel.chat;
    await unarchiveChat(jid);
});