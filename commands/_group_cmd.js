const { sck, sck1, cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep, getAdmin, getBuffer, prefix } = require('../lib')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const moment = require("moment-timezone");
const Levels = require("discord-xp");
const fs = require('fs-extra')
const Jimp = require("jimp");
const astro_patch = require('../lib/commands')
cmd({
    pattern: "onlyadmin"
    , alias: ["antimessge"]
    , desc: "Only Admins Allow to Send Message, Others kick."
    , category: "group"
    , filename: __filename
}, async (Void, citel, text, {
    cmdName
    , isCreator
}) => {
    if (!citel.isGroup) {
        return citel.reply(tlang()
            .group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    if (!isAdmins && !isCreator) {
        return citel.reply(tlang()
            .admin);
    }
    let checkinfo = (await sck.findOne({
        id: citel.chat
    })) || (await new sck({
            id: citel.chat
        })
        .save());
    let textt = text ? text.toLowerCase()
        .trim() : false;
    let action = textt ? textt.split(" ")[0] : false;
    if (!action) {
        return await citel.send("*_" + cmdName + " " + (checkinfo.onlyadmin === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n *_Toggle: " + (prefix + cmdName) + " on/off_*");
    } else if (action.startsWith("off") || action.startsWith("deact") || action.startsWith("disable")) {
        if (checkinfo.onlyadmin === "false") {
            return await citel.reply("*_Onlyadmin Already Disabled in Current Chat_*");
        }
        await sck.updateOne({
            id: citel.chat
        }, {
            onlyadmin: "false"
        });
        return await citel.send("*" + cmdName + " Succesfully Disable in group!_*\n*_Now everyone Send Message in Group_*");
    } else if (action.startsWith("on") || action.startsWith("act") || action.startsWith("enable")) {
        if (checkinfo.onlyadmin === "true") {
            return await citel.reply("*_Onlyadmin Already Enabled in Current Chat_*");
        }
        if (isBotAdmins) {
            await sck.updateOne({
                id: citel.chat
            }, {
                onlyadmin: "true"
            });
            await Void.groupSettingUpdate(citel.chat, "announcement");
            return await citel.send("*" + cmdName + " Succesfully set to kick message senders!_*\n*_Now Only Admins Allow to Send Message in Group_*");
        } else {
            return await citel.reply("*_UHH Please, Provide Admin Role First_*");
        }
    } else {
        return await citel.reply("*_Uhh Dear, Please Provide Valid Instruction_*\n*Eg: _" + (prefix + cmdName) + " on/off_*");
    }
});
//---------------------------------------------------------------------------
cmd({
    pattern: "antibot"
    , desc: "kick Bot Users from Group!"
    , category: "group"
    , filename: __filename
}, async (Void, citel, text, {
    cmdName
    , isCreator
}) => {
    if (!citel.isGroup) {
        return citel.reply(tlang()
            .group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    if (!isAdmins && !isCreator) {
        return citel.reply(tlang()
            .admin);
    }
    let checkinfo = (await sck.findOne({
        id: citel.chat
    })) || (await new sck({
            id: citel.chat
        })
        .save());
    let textt = text ? text.toLowerCase()
        .trim() : false;
    let action = textt ? textt.split(" ")[0] : false;
    if (!action) {
        return await citel.send("*_Antibot Currently " + (checkinfo.antibot === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n *Toggle: _" + (prefix + cmdName) + " on/off_*");
    } else if (action.startsWith("off") || action.startsWith("deact") || action.startsWith("disable")) {
        if (checkinfo.antibot === "false") {
            return await citel.reply("*_Antibot Already Disabled in Current Chat_*");
        }
        await sck.updateOne({
            id: citel.chat
        }, {
            antibot: "false"
        });
        return await citel.send("*_Antibot Succesfully Disable in group!_*");
    } else if (action.startsWith("on") || action.startsWith("act") || action.startsWith("enable")) {
        if (checkinfo.antibot === "true") {
            return await citel.reply("*_Antibot Already Enabled in Current Chat_*");
        }
        if (isBotAdmins) {
            await sck.updateOne({
                id: citel.chat
            }, {
                antibot: "true"
            });
            return await citel.send("*_Antibot Succesfully set to kick Bot Users!_*");
        } else {
            return await citel.reply("*_UHH Please, Provide Admin Role First_*");
        }
    } else {
        return await citel.reply("*_Uhh Dear, Please Provide Valid Instruction_*\n*Eg: _" + (prefix + cmdName) + " on/off_*");
    }
});
cmd({
    pattern: "disable"
    , desc: "disable cmds in Group.!"
    , category: "group"
    , filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!citel.isGroup) {
        return citel.send(tlang()
            .group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    if (!isAdmins && !isCreator) {
        return citel.reply(tlang()
            .admin);
    }
    let checkinfo = (await sck.findOne({
        id: citel.chat
    })) || (await new sck({
            id: citel.chat
        })
        .save());
    let textt = text ? text.toLowerCase()
        .trim() : false;
    let cmdName = textt ? textt.split(" ")[0] : "";
    if (!cmdName) {
        return await citel.send("*Provide cmd name to disable in group*\n*Ex " + prefix + "disable tag(to disabled 'tag' cmd)/info*");
    } else if (cmdName.startsWith("info") || cmdName.startsWith("list") || cmdName.startsWith("cmds")) {
        return await citel.send(checkinfo.disablecmds === "false" ? "*_Uhh Dear, Theres no cmd disabled in current group_*" : "*_Disable cmds :_* ```" + checkinfo.disablecmds.replace("false,", "") + "```");
    } else if (cmdName.startsWith("enable") || cmdName.startsWith("disable")) {
        return await citel.reply("*_Uhh Dear, I can't disable that cmd_*");
    } else if (cmdName) {
        const cmds = astro_patch.commands.find(_0x3d1011 => _0x3d1011.pattern === cmdName) || astro_patch.commands.find(_0x2cf945 => _0x2cf945.alias && _0x2cf945.alias.includes(cmdName));
        if (cmds) {
            let newCmd = cmds.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            let regex = new RegExp("\\b" + newCmd + "\\b");
            if (regex.test(checkinfo.disablecmds)) {
                return await citel.send("*Uhh Dear, Provided cmd already in disable cmds*");
            }
            var newDisable_Cmd = checkinfo.disablecmds + "," + cmds.pattern;
            await sck.updateOne({
                id: citel.chat
            }, {
                disablecmds: newDisable_Cmd
            });
            let lists = newDisable_Cmd.replace("false,", "");
            return await citel.send("*_\"" + cmdName + "\" Succesfully added in disable cmds_*" + (lists === "" ? "" : "\n*_Disable cmds :_* ```" + lists + "```"));
        } else {
            return await citel.reply("*_'" + cmdName + "' is not a bot cmd, Provide valid cmd_*");
        }
    }
});
cmd({
    pattern: "enable"
    , desc: "enable a cmd in Group.!"
    , category: "group"
    , filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!citel.isGroup) {
        return citel.send(tlang()
            .group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    if (!isAdmins && !isCreator) {
        return citel.reply(tlang()
            .admin);
    }
    let checkinfo = (await sck.findOne({
        id: citel.chat
    })) || (await new sck({
            id: citel.chat
        })
        .save());
    let textt = text ? text.toLowerCase()
        .trim() : false;
    let cmdName = textt ? "," + textt.split(" ")[0] : "";
    let ReplaceCmd = cmdName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let regex = new RegExp("\\b" + ReplaceCmd + "\\b");
    if (!cmdName || cmdName === "") {
        return await citel.send("*Please provide disabled cmd name to enable it*\n*Ex " + prefix + "enable tag(if 'tag' cmd disabled)/all(reset disables)*");
    } else if (cmdName.startsWith(",all")) {
        await sck.updateOne({
            id: citel.chat
        }, {
            disablecmds: "false"
        });
        return await citel.send("*_All disable cmds succesfully enabled_*");
    } else if (regex.test(checkinfo.disablecmds) && checkinfo.disablecmds.includes(cmdName)) {
        let newCmds = checkinfo.disablecmds.replace(regex, "");
        await sck.updateOne({
            id: citel.chat
        }, {
            disablecmds: newCmds
        });
        return await citel.send("*_\"" + cmdName.replace(",", "") + "\" Succesfully removed from disable cmds_*");
    } else {
        return await citel.send("_There's no cmd disabled with *" + cmdName.replace(",", "") + "* name_");
    }
});
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
cmd({
    pattern: "join"
    , desc: "joins group by link"
    , category: "owner"
    , filename: __filename
    , use: '<group link.>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang()
        .owner);
    if (!text) return citel.reply(`Please give me Query ${tlang().greet}`);
    if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com")) return await citel.reply("Link Invalid, Please Send a valid whatsapp Group Link!");
    let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
    await Void.groupAcceptInvite(result)
        .then((res) => citel.reply("🟩Joined Group"))
        .catch((err) => citel.reply("Error in Joining Group"));
})
cmd({
    pattern: "support"
    , desc: "Sends official support group link."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text) => {
    citel.reply(`*Check your Pm ${tlang().greet}*`);
    await Void.sendMessage(`${citel.sender}`, {
        image: log0
        , caption: `*Group Name: Secktor-Support*\n*Group Link:* https://chat.whatsapp.com/Bl2F9UTVU4CBfZU6eVnrbC`
    , });
})
//===========================================================================
cmd({
    pattern: "gdesc"
    , alias: ['setgdesc', 'gdesc']
    , desc: "Set Description of Group"
    , category: "group"
    , filename: __filename
    , use: '<enter Description Text>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    if (!text) return await citel.reply("*Provide Description text, You wants to Set*")
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`);
    if (!isAdmins) return citel.reply(tlang()
        .admin);
    try {
        await Void.groupUpdateDescription(citel.chat, text);
        citel.reply('*_✅Group description Updated Successfuly.!_*')
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } });
    } catch (e) { return await Void.sendMessage(users, { text: "Error While Updating Group Description\nReason : " + e, }, { quoted: citel }) }
})
//---------------------------------------------------------------------------
cmd({
    pattern: "gname"
    , alias: ['setgname', 'gname']
    , desc: "Set Description of Group"
    , category: "group"
    , filename: __filename
    , use: '<enter Description Text>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    if (!text) return await citel.reply("*Uhh Dear, Give text to Update This Group Name*")
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`);
    if (!isAdmins) return citel.reply(tlang()
        .admin);
    try {
        await Void.groupUpdateSubject(citel.chat, text)
        citel.reply('*_✅Group Name Updated Successfuly.!_*')
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } });
    } catch (e) { return await Void.sendMessage(users, { text: "_Error While Updating Group Name_\nReason : " + e, }, { quoted: citel }) }
})
cmd({
    pattern: "antifake"
    , desc: "Allow to Join Group For Specific Country Code"
    , category: "group"
    , filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!citel.isGroup) {
        return citel.reply(tlang()
            .group);
    }
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch(_0x315e70 => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) {
        return citel.reply(tlang()
            .admin);
    }
    let checkinfo = (await sck.findOne({
        id: citel.chat
    })) || (await new sck({
            id: citel.chat
        })
        .save());
    if (text.toLowerCase()
        .startsWith("off") || text.toLowerCase()
        .startsWith("deact") || text.toLowerCase()
        .startsWith("disable")) {
        if (checkinfo.antifake == "false") {
            return await citel.send("*Anti_Fake Already Disabled In Current Chat!*");
        }
        await sck.updateOne({
            id: citel.chat
        }, {
            antifake: "false"
        });
        return await citel.send("*Anti_Fake Disable Succesfully!*");
    } else if (!text) {
        return await citel.send("*_Antifake " + (checkinfo.antifake === "false" ? "Not set to any" : "set to \"" + checkinfo.antifake + "\"") + " Country Code!_*\n *Provide Country code to Update Antifake Status*\n*Eg: _.antifake 92_*");
    }
    let country_code = text ? parseInt(text.split(" ")[0]) : false;
    if (!text || !country_code || isNaN(country_code) || country_code === 0) {
        return await citel.send("*_Please provide a country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
    } else if (country_code) {
        await sck.updateOne({
            id: citel.chat
        }, {
            antifake: "" + country_code
        });
        return await citel.send("*Anti_Fake Succesfully set to \"" + country_code + "\"!*\n*_Now People Joined Group Who's Number Start With " + country_code + "_*");
    } else {
        return await citel.send("*_Please provide a Valid country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
    }
});
cmd({
    pattern: "antidemote"
    , desc: "Detects Promote and Automaticaly demote promoted person."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) return citel.reply(tlang()
        .admin);
    let checkinfo = await sck.findOne({ id: citel.chat }) || await new sck({ id: citel.chat })
        .save();
    if (text.toLowerCase()
        .startsWith("on") || text.toLowerCase()
        .startsWith("act") || text.toLowerCase()
        .startsWith("enable")) {
        if (checkinfo.antidemote == 'true') return await citel.send("*Anti_Demote Already Enabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antidemote: 'true' });
        return await citel.send("*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*")
    } else if (text.toLowerCase()
        .startsWith("off") || text.toLowerCase()
        .startsWith("deact") || text.toLowerCase()
        .startsWith("disable")) {
        if (checkinfo.antidemote == 'false') return await citel.send("*Anti_Demote Already Disabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antidemote: 'false' });
        return await citel.send("*Anti_Demote Disable Succesfully!*")
    } else return await citel.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Enable & Disable Stop Demoting Peoples!_*`)
});
//---------------------------------------------------------------------------
cmd({
    pattern: "antipromote"
    , desc: "Detects Promote and Automaticaly demote promoted person."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) return citel.reply(tlang()
        .admin);
    let checkinfo = await sck.findOne({ id: citel.chat }) || await new sck({ id: citel.chat })
        .save();
    if (text.toLowerCase()
        .startsWith("on") || text.toLowerCase()
        .startsWith("act") || text.toLowerCase()
        .startsWith("enable")) {
        if (checkinfo.antipromote == 'true') return await citel.send("*Anti_Promote Already Enabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antipromote: 'true' });
        return await citel.send("*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*")
    } else if (text.toLowerCase()
        .startsWith("off") || text.toLowerCase()
        .startsWith("deact") || text.toLowerCase()
        .startsWith("disable")) {
        if (checkinfo.antipromote == 'false') return await citel.send("*Anti_Promote Already Disabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { antipromote: 'false' });
        return await citel.send("*Anti_Promote Disable Succesfully!*")
    } else return await citel.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Stop Promoting Peoples in Chat_*`)
});
//---------------------------------------------------------------------------
cmd({
    pattern: "pdm"
    , desc: "Detect Promote/Demote Users And Send Alerts in Chat "
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) return citel.reply(tlang()
        .admin);
    let checkinfo = await sck.findOne({ id: citel.chat }) || await new sck({ id: citel.chat })
        .save();
    if (text.toLowerCase()
        .startsWith("on") || text.toLowerCase()
        .startsWith("act") || text.toLowerCase()
        .startsWith("enable")) {
        if (checkinfo.pdm == 'true') return await citel.send("*Promote/Demote Alerts Already Enabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { pdm: 'true' });
        return await citel.send("*Promote/Demote Alerts Enable Succesfully!*")
    } else if (text.toLowerCase()
        .startsWith("off") || text.toLowerCase()
        .startsWith("deact") || text.toLowerCase()
        .startsWith("disable")) {
        if (checkinfo.pdm == 'false') return await citel.send("*Promote/Demote Alerts Already Disabled In Current Chat!*")
        await sck.updateOne({ id: citel.chat }, { pdm: 'false' });
        return await citel.send("*Promote/Demote Alerts Disable Succesfully!*")
    } else return await citel.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To get And Stop Promote/Demote Alerts_*`)
});
//---------------------------------------------------------------------------
cmd({
    pattern: "warn"
    , desc: "Warns user in Group."
    , category: "group"
    , filename: __filename
    , use: "<quote|reply|number>"
}, async (Void, citel, text, {
    isCreator
}) => {
    if (!citel.isGroup) {
        return citel.reply(`This Command is only for group.`);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) {
        return citel.reply("This command is only for Admin.");
    }
    if (!citel.quoted) {
        return citel.reply("Please quote a user master.");
    }
    const timesam = moment(moment())
        .format("HH:mm:ss");
    moment.tz.setDefault("Asia/KOLKATA")
        .locale("id");
    try {
        let metadata = await Void.groupMetadata(citel.chat);
        await new warndb({
                id: citel.quoted.sender.split("@")[0] + "warn"
                , reason: text
                , group: metadata.subject
                , warnedby: citel.pushName
                , date: timesam
            })
            .save();
        let ment = citel.quoted.sender;
        Void.sendMessage(citel.chat, {
            text: "*----Warn----*\nUser: @" + citel.quoted.sender.split("@")[0] + "\nWith Reason: " + text + "\nWarned by: " + citel.pushName
            , mentions: [citel.quoted.sender]
        }, {
            quoted: citel
        });
        let h = await warndb.find({
            id: citel.quoted.sender.split("@")[0] + "warn"
        });
        const Config = require("../config");
        if (h.length > Config.warncount) {
            teskd = "Removing User because Warn limit exceeded\n\n*All Warnings.*\n";
            let h = await warndb.find({
                id: citel.quoted.sender.split("@")[0] + "warn"
            });
            teskd += "*There are total " + h.length + "  warnings.*\n";
            for (let i = 0; i < h.length; i++) {
                teskd += "*" + (i + 1) + "*\n╭─────────────◆\n│ *🍁In Group:-* " + h[i].group + "\n";
                teskd += "│ *🔰Time:-* " + h[i].date + "\n";
                teskd += "│ *⚠️Warned by:-* " + h[i].warnedby + "\n";
                teskd += "│ _📍Reason: " + h[i].reason + "_\n╰─────────────◆\n\n";
            }
            citel.reply(teskd);
            await Void.groupParticipantsUpdate(citel.chat, [citel.quoted.sender], "remove");
        }
    } catch (Y) {
        console.log(Y);
    }
});
cmd({
    pattern: "common"
    , desc: "Get common participants in two groups, and kick using .common kick, jid"
    , category: "owner"
    , filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    let jids = await parsedJid(text);
    var group1;
    var group2;
    if (jids.length > 1) {
        group1 = jids[0].includes("@g.us") ? jids[0] : citel.chat;
        group2 = jids[1].includes("@g.us") ? jids[1] : citel.chat;
    } else if (jids.length == 1) {
        group1 = citel.chat;
        group2 = jids[0].includes("@g.us") ? jids[0] : citel.chat;
    } else {
        return await citel.send("*_Uhh Dear, Please Provide a Group Jid,_*\n*To Get common participants in two groups,*\n*Also kick using .common kick, jid*");
    }
    if (group2 === group1) {
        return await citel.send("Please Provide Valid Group Jid");
    }
    var g1 = await Void.groupMetadata(group1);
    var g2 = await Void.groupMetadata(group2);
    var common = g1.participants.filter(({
        id: _0x215617
    }) => g2.participants.some(({
        id: _0xa9d3a3
    }) => _0xa9d3a3 === _0x215617)) || [];
    if (common.length == 0) {
        return await citel.send("Theres no Common Users in Both Groups");
    }
    let kick = text.split(",")[0].trim() === "kick" ? true : false;
    let reason = false;
    var heading = "   *List Of Common Participants*";
    if (kick) {
        let chat = {
            chat: group1
        };
        heading = "  *Kicking Common Participants*";
        const groupAdmins = (await getAdmin(Void, chat)) || [];
        var botNumber = await Void.decodeJid(Void.user.id);
        var isBotAdmins = groupAdmins.includes(botNumber) || false;
        var isAdmins = groupAdmins.includes(citel.sender) || false;
        if (!isBotAdmins || !isAdmins) {
            kick = false;
            heading = "  *乂 Can't Kick Common Participants*";
        }
        if (!isBotAdmins) {
            reason = "*❲❒❳ Reason:* _I Can't Kick Common Participants Without Getting Admin Role,So Provide Admin Role First,_\n";
        }
        if (!isAdmins) {
            reason = "*❲❒❳ Reason:* _Uhh Dear, Only Group Admin Can Kick Common Users Through This Cmd_\n";
        }
    }
    var msg = " " + heading + "   \n" + (reason ? reason : "") + "\n*❲❒❳ Group1:* " + g1.subject + "\n*❲❒❳ Group2:* " + g2.subject + "\n*❲❒❳ Common Counts:* _" + common.length + "_Members_\n\n\n";
    var commons = [];
    common.map(async _0x5484ff => {
        msg += "  *⬡* @" + _0x5484ff.id.split("@")[0] + "\n";
        commons.push(_0x5484ff.id.split("@")[0] + "@s.whatsapp.net");
    });
    await citel.send(msg + ("\n\n\n©" + Config.caption), {
        mentions: commons
    });
    if (kick && !reason) {
        try {
            var botNumber = await Void.decodeJid(Void.user.id);
            for (const user of commons) {
                if (botNumber === user || user === "923004591719@s.whatsapp.net" || user === "923184474176@s.whatsapp.net") {
                    continue;
                }
                await new Promise(_0x5d963f => setTimeout(_0x5d963f, 1000));
                await Void.groupParticipantsUpdate(group1, [user], "remove");
            }
        } catch (_0x5636c1) {
            console.error("Error removing participants:", _0x5636c1);
        }
    }
    return;
});
cmd({
    pattern: "diff"
    , desc: "Get difference of participants in two groups"
    , category: "owner"
    , filename: __filename
}, async (Void, citel, text, {
    isCreator
}) => {
    let jids = await parsedJid(text);
    var group1;
    var group2;
    if (jids.length > 1) {
        group1 = jids[0].includes("@g.us") ? jids[0] : citel.chat;
        group2 = jids[1].includes("@g.us") ? jids[1] : citel.chat;
    } else if (jids.length == 1) {
        group1 = citel.chat;
        group2 = jids[0].includes("@g.us") ? jids[0] : citel.chat;
    } else {
        return await citel.send("*_Uhh Dear, Please Provide a Group Jid_*\n*_To Get Different participants with in group_*");
    }
    if (group2 === group1) {
        return await citel.send("Please Provide Valid Group Jid");
    }
    var g1 = await Void.groupMetadata(group1);
    var g2 = await Void.groupMetadata(group2);
    var diff = g1.participants.filter(({
        id: _0x240eaa
    }) => !g2.participants.some(({
        id: _0x5fe1e0
    }) => _0x5fe1e0 === _0x240eaa)) || [];
    if (diff.length == 0) {
        return await citel.send("Theres no Different Users in Both Groups");
    }
    var msg = "  *乂 List Of Different Participants* \n\n*❲❒❳ Group1:* " + g1.subject + "\n*❲❒❳ Group2:* " + g2.subject + "\n*❲❒❳ Differ Counts:* _" + diff.length + "_Members_\n\n\n";
    var diffs = [];
    diff.map(async _0x299f43 => {
        msg += "  *⬡* @" + _0x299f43.id.split("@")[0] + "\n";
        diffs.push(_0x299f43.id.split("@")[0] + "@s.whatsapp.net");
    });
    return await citel.send(msg + ("\n\n\n©" + Config.caption), {
        mentions: diffs
    });
});
//---------------------------------------------------------------------------
cmd({
    pattern: "block"
    , desc: "blocks that person"
    , fromMe: true
    , category: "owner"
    , filename: __filename
    , use: '<quote/reply user.>'
}, async (Void, citel, text, { isCreator }) => {
    if (!isCreator) citel.reply(tlang()
        .owner);
    let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : "";
    if (!users) return await citel.reply("*Uhh dear, reply/mention an User*")
    await Void.updateBlockStatus(users, "block")
        .then((res) => { return Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } }); }) //console.log(jsonformat(res))
        .catch((err) => console.log(jsonformat(err)));
})
//---------------------------------------------------------------------------
cmd({
    pattern: "unblock"
    , desc: "Unblocked to the quoted user."
    , category: "owner"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!isCreator) citel.reply(tlang()
        .owner);
    let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : false;
    if (!users) return await citel.reply("*Uhh dear, reply/mention an User*")
    let num = users.replace("@s.whatsapp.net", "")
    await Void.updateBlockStatus(users, "unblock")
        .then((res) => citel.send(`*@${num} Unblocked Succesfully..!*`, { mentions: [users, ] }))
        .catch((err) => console.log(jsonformat(err)));
})
//---------------------------------------------------------------------------
cmd({
    pattern: "invite"
    , desc: "get group link."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = groupAdmins.includes(botNumber)
    if (!isBotAdmins) return citel.reply("*_I'm Not Admin, So I can't Send Invite Link_*");
    var str1 = await Void.groupInviteCode(citel.chat)
    var str2 = "https://chat.whatsapp.com/"
    var mergedString = `${str2}${str1}`;
    return citel.reply("*Group Invite Link Is Here* \n*" + mergedString + "*");
})
//---------------------------------------------------------------------------
cmd({
    pattern: "revoke"
    , desc: "get group link."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = groupAdmins.includes(botNumber)
    if (!isBotAdmins) return citel.reply("*_I'm Not Admin, So I Can't ReSet Group Invite Link_*");
    var code = await Void.groupRevokeInvite(citel.chat)
    return citel.reply("*_Group Link Revoked SuccesFully_*");
})
//---------------------------------------------------------------------------
cmd({
    pattern: "jid"
    , desc: "get jid of all user in a group."
    , category: "owner"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (citel.quoted) return citel.reply(citel.quoted.sender)
    else return citel.reply(citel.chat)
})
//---------------------------------------------------------------------------
cmd({
    pattern: "tagall"
    , desc: "Tags every person of group."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) return citel.reply(tlang()
        .admin);
    let textt = `
══✪〘   *Tag All*   〙✪══

➲ *Message :* ${text ? text : "blank Message"} \n ${Config.caption} \n\n
➲ *Author:* ${citel.pushName} 🔖
`
    for (let mem of participants) { textt += `📍 @${mem.id.split("@")[0]}\n`; }
    Void.sendMessage(citel.chat, { text: textt, mentions: participants.map((a) => a.id) }, { quoted: citel });
})
//---------------------------------------------------------------------------
cmd({
    pattern: "kik"
    , desc: "Kick all numbers from a certain country"
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    if (!text) return await citel.reply("*Provide Me Country Code. Example: .kik 91*")
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const groupAdmins = await getAdmin(Void, citel)
    let isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) {
        if (isCreator) citel.reply("*Hey Owner, You Are not Admin Here*")
        else return citel.reply(tlang()
            .admin);
    }
    let find = text.split(" ")[0].replace('+', '');
    let error = '*These Users Not Kicked* \n\t';
    let users = await groupMetadata.participants
    let hmanykik = 0;
    let iskikstart = false;
    const botNumber = await Void.decodeJid(Void.user.id)
    for (let i of users) {
        let isuseradmin = groupAdmins.includes(i.id) || false
        if (i.id.startsWith(find) && !isuseradmin) {
            if (!iskikstart) {
                iskikstart = true;
                await citel.reply(`*_Kicking ALL the Users With ${find} Country Code_*`)
            }
            try {
                await Void.groupParticipantsUpdate(citel.chat, [i.id], "remove");
                hmanykik++;
            } catch (e) { console.log("Error While Kicking : ", e) }
        }
    }
    if (hmanykik == 0) return await citel.reply(`*_Ahh, There Is No User Found With ${find} Country Code_*`)
    else return await citel.reply(`*_Hurray, ${hmanykik.toString()} Users With ${find} Country Code kicked_*`)
})
//---------------------------------------------------------------------------
cmd({
    pattern: "num"
    , desc: "get all numbers from a certain country"
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    if (!text) return await citel.reply("*Provide Me Country Code. Example: .num 91*")
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) return citel.reply(tlang()
        .admin);
    let find = text.split(" ")[0];
    let users = await groupMetadata.participants
    let nums = `*List Of Users With ${find} Country Code*\n`
    let num = '';
    for (let i of users) { if (i.id.startsWith(find)) num += i.id.split("@")[0] + "\n"; }
    if (!num) { nums = `*There Is No Users With ${find} Country Code*` } else { nums += num + Config.caption }
    await citel.reply(nums)
})
cmd({
    pattern: "request"
    , desc: "Sends requst to main Bot developer."
    , category: "group"
    , filename: __filename
    , use: '<text>'
, }, async (Void, citel, text) => {
    if (!text) return reply(`Example : ${prefix}request hello dev please add a downloader feature`);
    textt = `*| REQUEST |*`;
    teks1 = `\n\n*User* : @${
    citel.sender.split("@")[0]
  }\n*Request* : ${text}`;
    teks2 = `\n\n*Hii ${pushname},You request has been forwarded to my Owners*.\n*Please wait.......*`;
    for (let i of owner) {
        Void.sendMessage(i + "@s.whatsapp.net", {
            text: textt + teks1
            , mentions: [citel.sender]
        , }, {
            quoted: citel
        , });
    }
    Void.sendMessage(citel.chat, {
        text: textt + teks2 + teks1
        , mentions: [citel.sender]
    , }, {
        quoted: citel
    , });
})
cmd({
    pattern: "recover"
    , alias: ["rc"]
    , desc: "Copies and Forwords viewonce message."
    , category: "group"
    , filename: __filename
    , use: '<reply to a viewonce message.>'
, }, async (Void, citel, text) => {
    if (!citel.quoted) return reply(`Please reply to any message Image or Video!`);
    let mime = citel.quoted.mtype
    if (/viewOnce/.test(mime)) {
        const mtype = Object.keys(quoted.message)[0];
        delete quoted.message[mtype].viewOnce;
        const msgs = proto.Message.fromObject({
            ...quoted.message
        , });
        const prep = generateWAMessageFromContent(citel.chat, msgs, { quoted: citel });
        await Void.relayMessage(citel.chat, prep.message, { messageId: prep.key.id });
    } else {
        await citel.reply("please, reply to viewOnceMessage");
    }
})
//---------------------------------------------------------------------------
cmd({
    pattern: "resetwarn"
    , desc: "Deletes all previously given warns to quoted user."
    , category: "group"
    , filename: __filename
    , use: '<quote|reply|number>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang()
        .owner)
    await warndb.deleteOne({ id: citel.quoted.sender.split('@')[0] + 'warn' });
    citel.reply('User is free as a bird.\nAll previously given warn has been deleted.')
})
//---------------------------------------------------------------------------
cmd({
    pattern: "poll"
    , desc: "Makes poll in group."
    , category: "group"
    , filename: __filename
    , use: `question;option1,option2,option3.....`
, }, async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang()
        .owner)
    let [poll, opt] = text.split(";");
    if (text.split(";") < 2) return await citel.reply(`${prefix}poll question;option1,option2,option3.....`);
    let options = [];
    for (let i of opt.split(',')) { options.push(i); }
    await Void.sendMessage(citel.chat, { poll: { name: poll, values: options } })
})
//---------------------------------------------------------------------------
cmd({
    pattern: "profile"
    , desc: "Shows profile of user."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text) => {
    var bio = await Void.fetchStatus(citel.sender);
    var bioo = bio.status;
    let meh = citel.sender;
    const timenow = moment(moment())
        .format('HH:mm:ss')
    moment.tz.setDefault('Asia/Karachi')
        .locale('id')
    let pfp;
    try {
        pfp = await Void.profilePictureUrl(citel.sender, "image");
    } catch (e) {
        pfp = await botpic();
    }
    const profile = `
*Hii ${citel.pushName},*
*Here is your profile information*
*👤Username:* ${citel.pushName}
*⚡Bio:* ${bioo}
*🧩Role:* ${role}
*🍁Level:* ${userq.level}
*📥Total Messages* ${ttms}
*Powered by ${tlang().title}*
`;
    let buttonMessage = {
        image: { url: pfp }
        , caption: profile
        , footer: tlang()
            .footer
        , headerType: 4
    , };
    Void.sendMessage(citel.chat, buttonMessage, { quoted: citel });
})
//---------------------------------------------------------------------------
cmd({
    pattern: "promote"
    , desc: "Provides admin role to replied/quoted user"
    , category: "group"
    , filename: __filename
    , use: '<quote|reply|number>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return citel.reply("*_I'm Not Admin Here, So I Can't Promote Someone_*");
    if (!isAdmins) return citel.reply(tlang()
        .admin);
    try {
        let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return await citel.send("*_Uhh Dear, Reply/Mention to an User_*");
        await Void.groupParticipantsUpdate(citel.chat, [users], "promote");
        await citel.send(`*User promoted Succesfully!*`)
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } });
    } catch (e) {
        console.log("Promote error : ", e)
        await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key } });
        return await citel.reply(tlang()
            .botAdmin);
    }
})
//---------------------------------------------------------------------------
cmd({
    pattern: "demote"
    , desc: "Demotes replied/quoted user from group"
    , category: "group"
    , filename: __filename
    , use: '<quote|reply|number>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`);
    if (!isAdmins) return citel.reply(tlang()
        .admin);
    try {
        let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return await citel.send("*_Uhh Dear, Reply/Mention to an User_*");
        await Void.groupParticipantsUpdate(citel.chat, [users], "demote");
        await citel.send(`*User demoted Succesfully!*`)
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } });
    } catch (e) {
        console.log("Demote error : ", e)
        await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key } });
        return await citel.reply(tlang()
            .botAdmin);
    }
})
//---------------------------------------------------------------------------
cmd({
    pattern: "kick"
    , desc: "Kicks replied/quoted user from group."
    , category: "group"
    , filename: __filename
    , use: '<quote|reply|number>'
, }, async (Void, citel, text, { isCreator }) => {
    //if (!isCreator) return citel.reply("*_Only My Owner Can Use This Command_*")
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`);
    if (!isAdmins) return citel.reply(tlang()
        .admin);
    try {
        let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return citel.send("*_Uhh Dear, Reply/Mention to an User_*");
        await Void.groupParticipantsUpdate(citel.chat, [users], "remove");
        await citel.send(`*Hurray, User Kicked Succesfully!*`)
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } });
    } catch (e) {
        console.log("Kick error : ", e)
        await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key } });
        return await citel.reply(tlang()
            .botAdmin);
    }
})
cmd({
    pattern: "group"
    , desc: "mute and unmute group."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text) => {
    //if (!citel.isGroup) return citel.reply(tlang().group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    //if (!citel.isGroup) return citel.reply(tlang().group);
    if (!isBotAdmins) return citel.reply(tlang()
        .botAdmin);
    if (!isAdmins) return citel.reply(tlang()
        .admin);
    let Group = await sck.findOne({ id: citel.chat });
    if (text.split(" ")[0] == "close" || text.split(" ")[0] == "mute") {
        await Void.groupSettingUpdate(citel.chat, "announcement")
            .then((res) => citel.reply(`Group Chat Muted`))
            .catch((err) => citel.reply("Error :" + err));
    } else if (text.split(" ")[0] === "open" || text.split(" ")[0] === "unmute") {
        await Void.groupSettingUpdate(citel.chat, "not_announcement")
            .then((res) => citel.reply(`Group Chat Unmuted`))
            .catch((err) => citel.reply("Error : " + err));
    } else if (text == "Detail" || text == "Info" || text == "info" || text == "details") {
        const pp = await Void.profilePictureUrl(citel.chat, 'image')
            .catch(_ => null) || ''
        const groupAdmins = participants.filter(p => p.admin)
        const listAdmin = groupAdmins.map((v, i) => `  ${i + 1}. wa.me/${v.id.split('@')[0]}`)
            .join('\n')
        const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')
            ?.id || citel.chat.split`-` [0] + '@s.whatsapp.net'
        let ginfos = `
      *「 INFO GROUP 」*
*▢ ID :*
   • ${groupMetadata.id}
*▢ NAME :* 
   • ${groupMetadata.subject}
*▢ Members :*
   • ${participants.length}
*▢ Group Owner :*
   • wa.me/${owner.split('@')[0]}
*▢ Admins :*
${listAdmin}
*▢ Description :*
   • ${groupMetadata.desc?.toString() || 'unknown'}
*▢ 🪢 Extra Group Configuration :*";
  • Group Nsfw :    ${Group.nsfw=='true'? '✅' : '❎'} 
  • Antilink        :    ${Group.antilink=='true'? '✅' : '❎'}
  • Economy      :    ${Group.economy=='true'? '✅' : '❎'}
  • Events         :     ${Group.events=='true'? '✅' : '❎'}
`.trim()
        if (Group.events == 'true') {
            ginfos += "\n*▢ Wellcome Message :* \n  • " + Group.welcome;
            ginfos += "\n\n*▢ Goodbye Message :* \n  • " + Group.goodbye;
        }
        return await Void.sendMessage(citel.chat, { image: { url: pp }, caption: ginfos }, { quoted: citel })
    } else {
        return await citel.send(`*_Uhh Dear Give me Query From Bellow Options_*
_1:- .group Mute_
_2:- .group Unmute_
_3:- .group Info_
`)
        //  let buttons = [{ buttonId: `${prefix}group open`, buttonText: { displayText: "📍Unmute",},type: 1,},{buttonId: `${prefix}group close`,buttonText: {displayText: "📍Mute",},type: 1, },];     await Void.sendButtonText(citel.chat,buttons,`Group Mode`, Void.user.name, citel);
    }
})
//---------------------------------------------------------------------------
cmd({
    pattern: "gpp"
    , alias: ["grouppic"]
    , desc: "Sets a profile pic in Group.."
    , category: "group"
    , filename: __filename
}, async (Void, citel, text) => {
    if (!citel.isGroup) {
        return await citel.reply(tlang()
            .group);
    }
    if (!citel.quoted) {
        return await citel.reply("*_Uhh Dear, Reply Any Image To Set Group Icon_*");
    }
    if (citel.quoted.mtype != "imageMessage") {
        return await citel.reply("*_Reply To An Image, Idiot_*");
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = groupAdmins.includes(botNumber) || false;
    const isAdmins = groupAdmins.includes(citel.sender) || false;
    if (!isBotAdmins) {
        return await citel.reply("*_I'm Not Admin In This Chat,_*\n*_Provide Admin Role To Update Group Icon_*");
    }
    if (!isAdmins) {
        return await citel.reply(tlang()
            .admin);
    }
    const media = await citel.quoted.download();
    try {
        const {
            query
        } = Void;
        const {
            preview
        } = await generateProfilePicture(media);
        await query({
            tag: "iq"
            , attrs: {
                to: citel.chat
                , type: "set"
                , xmlns: "w:profile:picture"
            }
            , content: [{
                tag: "picture"
                , attrs: {
                    type: "image"
                }
                , content: preview
            }]
        });
        return await citel.reply("*_Profile Icon Updated Successfully_*");
    } catch (_0x632d01) {
        return await citel.reply("```Error While Updating Group Profile :``` " + _0x632d01);
    }
    async function generateProfilePicture(_0x3da926) {
        const _0x462396 = await Jimp.read(_0x3da926);
        const _0x1c1f73 = _0x462396.getWidth();
        const _0x176031 = _0x462396.getHeight();
        const _0x887df7 = _0x462396.crop(0, 0, _0x1c1f73, _0x176031);
        return {
            img: await _0x887df7.scaleToFit(324, 720)
                .getBufferAsync(Jimp.MIME_JPEG)
            , preview: await _0x887df7.normalize()
                .getBufferAsync(Jimp.MIME_JPEG)
        };
    }
});
//---------------------------------------------------------------------------
cmd({
    pattern: "tag"
    , alias: ["hidetag"]
    , desc: "Tags everyperson of group without mentioning their numbers"
    , category: "group"
    , filename: __filename
    , use: '<text>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!text && !citel.quoted) return citel.reply(`*Example : ${prefix}tag Hi Everyone, How are you Doing*`)
    if (!text) { text = citel.quoted.text; }
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) return citel.reply(tlang()
        .admin);
    Void.sendMessage(citel.chat, { text: text, mentions: participants.map((a) => a.id) }, { quoted: citel });
})
//---------------------------------------------------------------------------
cmd({
    pattern: "tagadmin"
    , desc: "Tags only Admin numbers"
    , category: "group"
    , filename: __filename
    , use: '<text>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
        .catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = participants.filter(p => p.admin)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) return citel.reply(tlang()
        .admin);
    if (!isAdmins && !isCreator) return citel.reply(tlang()
        .admin);
    const listAdmin = groupAdmins.map((v, i) => ` |  @${v.id.split('@')[0]}`)
        .join('\n')
    let tag = `
Tag by : @${citel.sender.split("@")[0]}
${text ? "≡ Message :" + text : ""}

┌─⊷ ADMINS
${listAdmin}
└───────────
`.trim()
    return await Void.sendMessage(citel.chat, { text: tag, mentions: [citel.sender, ...groupAdmins.map(v => v.id), ] }, )
})
//---------------------------------------------------------------------------
cmd({
    pattern: "add"
    , desc: "Add that person in group"
    , fromMe: true
    , category: "group"
    , filename: __filename
    , use: '<number>'
, }, async (Void, citel, text, { isCreator }) => {
    //if (!isCreator) return citel.reply("```Only My Owner Can Use This Command```")
    if (!citel.isGroup) return citel.reply(tlang()
        .group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`);
    if (!isAdmins) return citel.reply(tlang()
        .admin)
    let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if (!users) return await citel.reply("*_Uhh Dear, Please Provide An User._*");
    if (citel.sender == botNumber) {
        await Void.groupParticipantsUpdate(citel.chat, [users], "add");
        await citel.send(`*User Added Succesfully!*`)
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } });
    } else {
        await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key } });
        await Void.sendMessage(users, { text: `Here's The Group Invite Link\n User @${citel.sender.split("@")[0]} Wants To Add You in bellow Group\n https://chat.whatsapp.com/${await Void.groupInviteCode(citel.chat)} _ \n ------------ Join If YOu Feel Free?`, mentions: [citel.sender, ] }, { quoted: citel })
        return await citel.reply(`_Can't Add User, Invite Sent_`)
    }
})
//--------------------------------------------------------------------------- 
cmd({
    pattern: "getjids"
    , alias: ['gjid', 'gjids']
    , desc: "Sends chat id of every groups."
    , category: "group"
    , filename: __filename
, }, async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang()
        .owner)
    n = await Void.groupFetchAllParticipating();
    const c = Object.entries(n)
        .slice(0)
        .map(t => t[1]);
    let a = "";
    let onlyJids = false;
    let onlyNames = false;
    if (text.includes("jid")) { onlyJids = true; } else if (text.includes("name")) { onlyNames = true; }
    await citel.reply(`Fetching ${onlyJids ? "Only jids" : ( onlyNames ? "Only Names" : "Names and Jids") } from ${c.length} Groups`);
    await sleep(2000);
    for (var i of c.map(t => t.id)) {
        a += onlyJids ? "" : `\n*Group:* ${n[i].subject} `;
        a += onlyNames ? "" : `\n*JID:* ${i}\n`;
    }
    return await citel.send(a)
})
//---------------------------------------------------------------------------------------
cmd({
    pattern: "del"
    , alias: ["delete", "dlt"]
    , desc: "Deletes message of any user"
    , category: "group"
    , filename: __filename
    , use: '<quote/reply message.>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup && isCreator) {
        const key = {
            remoteJid: citel.chat
            , fromMe: false
            , id: citel.quoted.id
            , participant: citel.quoted.sender
        }
        return await Void.sendMessage(citel.chat, { delete: key })
    }
    if (!citel.quoted.isBot) {
        if (!citel.isGroup) return citel.reply(tlang()
            .group)
        const groupAdmins = await getAdmin(Void, citel)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang()
            .admin)
        if (!isBotAdmins) return citel.reply('I can\'t delete anyones message without getting Admin Role.')
        if (!citel.quoted) return citel.reply(`Please reply to any message. ${tlang().greet}`);
        let { chat, fromMe, id } = citel.quoted;
        const key = {
            remoteJid: citel.chat
            , fromMe: false
            , id: citel.quoted.id
            , participant: citel.quoted.sender
        }
        await Void.sendMessage(citel.chat, { delete: key })
    }
})
//---------------------------------------------------------------------------
cmd({
    pattern: "checkwarn"
    , desc: "Check warns"
    , category: "group"
    , filename: __filename
    , use: '<quoted/reply user.>'
, }, async (Void, citel, text) => {
    if (!citel.isGroup) return citel.reply('This command is only for Group.')
    if (!citel.quoted) return citel.reply('Quote a user master.')
    teskd = `*All Warnings.*\n\n`
    let h = await warndb.find({ id: citel.quoted.sender.split('@')[0] + 'warn' })
    console.log(h)
    teskd += `*There are total ${h.length}  warnings.*\n`
    for (let i = 0; i < h.length; i++) {
        teskd += `*${i+1}*\n╭─────────────◆\n│ *🍁In Group:-* ${h[i].group}\n`
        teskd += `│ *🔰Time:-* ${h[i].date}\n`
        teskd += `│ *⚠️Warned by:-* ${h[i].warnedby}\n`
        teskd += `│ _📍Reason: ${h[i].reason}_\n╰─────────────◆\n\n`
    }
    citel.reply(teskd)
})
//---------------------------------------------------------------------------
cmd({
    pattern: "broadcast"
    , desc: "Bot makes a broadcast in all groups"
    , fromMe: true
    , category: "group"
    , filename: __filename
    , use: '<text for broadcast.>'
, }, async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang()
        .owner)
    if (!text) return await citel.reply(`*_Uhh Dear, Provide text to broadcast in all groups_*`)
    let getGroups = await Void.groupFetchAllParticipating();
    let groups = Object.entries(getGroups)
        .slice(0)
        .map((entry) => entry[1]);
    let anu = groups.map((v) => v.id);
    citel.send(`*_Send Broadcast To ${anu.length} Group Chat, Finish Time ${ anu.length * 1.5} second_*`);
    for (let i of anu) {
        await sleep(1500);
        let txt = `*--❗${tlang().title} Broadcast❗--*\n\n *🍀Author:* ${citel.pushName}\n\n${text}`;
        let buttonMessaged = {
            image: log0
            , caption: txt
            , footer: citel.pushName
            , headerType: 1
            , contextInfo: {
                forwardingScore: 999
                , isForwarded: false
                , externalAdReply: {
                    title: 'Broadcast by ' + citel.pushName
                    , body: tlang()
                        .title
                    , thumbnail: log0
                    , mediaUrl: ''
                    , mediaType: 2
                    , sourceUrl: gurl
                    , showAdAttribution: true
                , }
            , }
        , };
        await Void.sendMessage(i, buttonMessaged, { quoted: citel, });
    }
    return await citel.reply(`*Successful Sending Broadcast To ${anu.length} Group(s)*`);
})