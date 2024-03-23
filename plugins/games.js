let Asta_Md = "Asta";
const axios = require("axios");
const { Config, randomeFunfacts, smd } = require("../lib");
const fetch = require("node-fetch");

smd({
  cmdname: "question",
  info: "Random Question.",
  type: "games",
  filename: __filename
}, async (msg, text, { smd: cmd }) => {
  try {
    await msg.reply(await randomeFunfacts(cmd));
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmd, error);
  }
});

smd({
  cmdname: "truth",
  info: "truth and dare(truth game.).",
  type: "games",
  filename: __filename
}, async (msg, text, { smd: cmd }) => {
  try {
    await msg.reply(await randomeFunfacts(cmd));
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmd, error);
  }
});

smd({
  cmdname: "dare",
  info: "truth and dare(dare game.).",
  type: "games",
  filename: __filename
}, async (msg, text, { smd: cmd }) => {
  try {
    await msg.reply(await randomeFunfacts(cmd));
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmd, error);
  }
});

smd({
  cmdname: "joke",
  info: "Sends Joke in chat.",
  type: "games",
  filename: __filename
}, async (msg, text, { smd: cmd }) => {
  try {
    await msg.reply(await randomeFunfacts(cmd));
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmd, error);
  }
});

smd({
  cmdname: "joke2",
  info: "Sends Joke in chat.",
  type: "games",
  filename: __filename
}, async (msg, text, { smd: cmd }) => {
  try {
    await msg.reply(await randomeFunfacts(cmd));
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmd, error);
  }
});

smd({
  cmdname: "fact",
  info: "Sends fact in chat.",
  type: "games",
  filename: __filename
}, async (msg, text, { smd: cmd }) => {
  try {
    await msg.reply(await randomeFunfacts(cmd));
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmd, error);
  }
});

smd({
  cmdname: "quotes",
  info: "Sends quotes in chat.",
  type: "games",
  filename: __filename
}, async (msg, text, { smd: cmd }) => {
  try {
    await msg.reply(await randomeFunfacts(cmd));
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmd, error);
  }
});

smd({
  cmdname: "define",
  info: "urban dictionary.",
  type: "games",
  filename: __filename
}, async (msg, text) => {
  try {
    let term = text ? text : msg.reply_text;
    if (!term) {
      return await msg.send(`*_Hey ${msg.senderName}, please provide a text!_*`);
    }

    let { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${term}`);
    var definition = data
      ? `*Word:* \`\`\`${term}\`\`\` \n*Definition:* \`\`\`${data.list[0].definition.replace(/\\\[/g, "").replace(/\\\]/g, "")}\`\`\` \n*Example:* \`\`\`${data.list[0].example.replace(/\\\[/g, "").replace(/\\\]/g, "")}\`\`\``
      : `*_No results found for given word_*`;

    return msg.reply(definition);
  } catch (error) {
    await msg.error(error + "\n\ncommand: define", error, `*No result for:* \`\`\`${text}\`\`\``);
  }
});
