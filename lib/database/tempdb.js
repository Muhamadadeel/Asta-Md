const mongoose = require("mongoose");
const TempDb = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: "astapatch@3.0.0_Md",
  },
  creator: { type: String, default: "astapatch@3.0.0" },
  data: { type: Object, default: {} },
});
const dbtemp = mongoose.model("dbtemp", TempDb);
module.exports = { dbtemp };
