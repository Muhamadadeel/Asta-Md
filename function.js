// function.js
function handleMessagesUpsert(sock) {
    sock.ev.on("messages.upsert", async (messageUpdate) => {
        const messages = messageUpdate.messages;
        for (const message of messages) {
            if (!message.message || message.key.fromMe) continue;
            const text = message.message.conversation.toLowerCase(); // Convert the text to lowercase
            const prefix = /^[/]/i; // Regular expression to match any of the prefixes, case-insensitive
            if (prefix.test(text)) {
                const command = text.split(" ")[0].slice(1); // No need to convert to lowercase again
                const args = text.slice(command.length + 2)
                    .trim();
                switch (command) {
                    // menu case
                    case "menu":
                        const menuText = `ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴇɴᴜ\n\nPing\nEcho\nAlive\ndisapperingmessages\ncpu\clearchat\n\n*2024 ᴀꜱᴛʀᴏᴘᴇᴅᴀ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ*.`;
                        sock.sendMessage(message.key.remoteJid, {
                            text: menuText
                        });
                        break;


                        case "cpu":
                            try {
                              const cpuStat = require('cpu-stat');
                              const stats = await cpuStat.usagePercent();
                              sock.sendMessage(message.key.remoteJid, {
                                text: `CPU Usage: ${stats.system.toFixed(2)}%`,
                              });
                            } catch (error) {
                              console.error(error);
                              sock.sendMessage(message.key.remoteJid, {
                                text: "Error: Failed to fetch CPU usage",
                              });
                            }
                            break;


                            case "ram":
                                try {
                                    const os = require('os');
                                    const usedMemory = os.totalmem() - os.freemem();
                                    const totalMemory = os.totalmem();
                                    const ramUsagePercent = (usedMemory / totalMemory) * 100;
                                    sock.sendMessage(message.key.remoteJid, {
                                        text: `RAM Usage: ${ramUsagePercent.toFixed(2)}%`,
                                    });
                                } catch (error) {
                                    console.error(error);
                                    sock.sendMessage(message.key.remoteJid, {
                                        text: "Error: Failed to fetch RAM usage",
                                    });
                                }
                                break;
                    case "ping":
                        const pingStart = Date.now();
                        await sock.sendMessage(message.key.remoteJid, {
                            text: "Pong!"
                        });
                        const pingEnd = Date.now();
                        const pingTime = pingEnd - pingStart;
                        await sock.sendMessage(message.key.remoteJid, {
                            text: `Ping time: ${pingTime}ms`,
                        });
                        break;
                    case "echo":
                        sock.sendMessage(message.key.remoteJid, {
                            text: args
                        });
                        break;
                    case "3":
                        sock.sendMessage(message.key.remoteJid, {
                            text: "You selected Option 3",
                        });
                        break;
                        case "alive":
  const aliveMessage = `*Bot is alive!* 🤖\n\nServer Uptime: ${formatUptime(process.uptime())}`;
  sock.sendMessage(message.key.remoteJid, { text: aliveMessage });
  break;
  function formatUptime(uptime) {
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
  
    const formattedUptime = [];
    if (days > 0) formattedUptime.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) formattedUptime.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) formattedUptime.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0) formattedUptime.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  
    return formattedUptime.join(', ');
  }
  
                    default:
                        sock.sendMessage(message.key.remoteJid, {
                            text: "Invalid option. Please try again.",
                        });
                        break;
                }
            }
        }
    });
}
module.exports = handleMessagesUpsert;