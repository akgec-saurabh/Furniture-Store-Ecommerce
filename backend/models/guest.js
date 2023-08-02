const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    name: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
