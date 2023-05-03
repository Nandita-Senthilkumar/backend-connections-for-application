const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
  },
  //timestamps is to get the time when it is created,updated,deleted etc...
  { timestamps: true }
);

module.exports = mongoose.model("album", albumSchema);