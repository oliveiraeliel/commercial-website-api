const mongoose = require("mongoose");
// const

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowecase: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
