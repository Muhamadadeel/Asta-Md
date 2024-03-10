const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
id: { type: String,  unique: true ,required: true },
events: { type: String, default: "true" },
nsfw : { type: String, default: "false" },
pdm : { type: String, default: "false" },
antipromote  : { type: String, default: "false" },
antidemote  : { type: String, default: "false" },
welcome :{ type: String, default: `@user you are welcomed to @gname`},
goodbye :{ type: String, default: `@user is no longer @gname member` },
botenable : { type: String, default: "true" },
antilink : { type: String, default: "false" },
antiword : { type: String, default: "false" },
antifake : { type: String, default: "false" },
antispam : { type: String, default: "false" },
antibot : { type: String, default: "false" },
onlyadmin : { type: String , default: "false" },
economy : { type: String, default: "false" },
disablecmds : { type: String, default: "false" },
mute : { type: String },
unmute : { type: String }
})
const sck =mongoose.model("Sck", GroupSchema)
module.exports = { sck } 



 

