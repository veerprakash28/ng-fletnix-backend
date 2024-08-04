const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum length for password
    },
    age: {
      type: Number,
      required: true,
      min: 1, // Age must be a positive number
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Creating an index on the email field to speed up queries
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
