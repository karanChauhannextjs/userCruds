const mongoose = require("mongoose");

const hobbySchema = new mongoose.Schema(
  {
    hobby: {
      type: String,
    },
  },
  { timestamps: true }
);

const HOBBY = mongoose.model("hobby", hobbySchema);

module.exports = HOBBY;
