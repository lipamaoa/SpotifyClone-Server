const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 255 },
    gender: { type: String, required: true },
    month: { type: Number, required: true },
    date: { type: Number, required: true },
    year: { type: Number, required: true },
    likedSongs: { type: [String], default: [] },
    playlists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Define a function for validating user data using Joi

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    email: Joi.string().required().email(),
    password: passwordComplexity().required(),
    month: Joi.number().required(),
    date: Joi.number().required(),
    year: Joi.number().required(),
    gender: Joi.string().valid("male", "female", "non-binary").required(),
  });
  return schema.validate(user);
};

const User = model("User", userSchema);

module.exports = { User, validate };
