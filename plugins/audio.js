let Astro = "Owner";
const { tlang, smd, audioEditor } = require("../lib");
const fs = require("fs");

const handleAudioEdit = async (context, commandName, context) => {
 try {
   return await audioEditor(context, commandName, context);
 } catch (error) {
   return await context.error(`${error} \n\nCommand: ${commandName}`, error);
 }
};

smd({
 cmdname: "bass",
 info: "adds bass in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "blown",
 info: "adds blown in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "deep",
 info: "adds deep in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "earrape",
 info: "adds earrape in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "fast",
 info: "adds fast in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "fat",
 info: "adds fat in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "nightcore",
 info: "adds nightcore in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "reverse",
 info: "adds reverse in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "robot",
 info: "adds robot in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "slow",
 info: "adds slow in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "smooth",
 info: "adds smooth in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});

smd({
 cmdname: "tupai",
 info: "adds tupai in given sound",
 type: "audio",
 use: "<reply to any audio>"
}, async (context, _, { smd }) => {
 await handleAudioEdit(context, smd, context);
});