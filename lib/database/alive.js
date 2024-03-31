const mongoose = require("mongoose");
const Alive = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: "Asta_Md"
  },
  alive_text: {
    type: String,
    default: "&user i am alive."
  },
  alive_get: {
    type: String,
    default: "you did'nt set alive message yet\nType [.alive info] to get alive message information"
  },
  alive_url: {
    type: String,
    default: ""
  },
  alive_image: {
    type: Boolean,
    default: false
  },
  alive_video: {
    type: Boolean,
    default: false
  },
  antiviewonce: {
    type: String,
    default: "false"
  },
  antidelete: {
    type: String,
    default: "false"
  },
  autobio: {
    type: String,
    default: "false"
  },
  levelup: {
    type: String,
    default: "false"
  },
  anticall: {
    type: String,
    default: "false"
  },
  autoreaction: {
    type: String,
    default: "false"
  },
  permit: {
    type: Boolean,
    default: false
  },
  permit_values: {
    type: String,
    default: "all"
  },
  chatbot: {
    type: String,
    default: "false"
  },
  bgm: {
    type: Boolean,
    default: false
  },
  bgmarray: {
    type: Object,
    default: {}
  },
  mention: {
    type: Object,
    default: {}
  },
  plugins: {
    type: Object,
    default: {}
  },
  notes: {
    type: Object,
    default: {}
  }
});
const alive = mongoose.model("alive", Alive);
module.exports = {
  alive: alive
};
const path = require("path");