import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 13,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
});

userSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
    },
    config.get("jwtPrivateKey") as string,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

declare module 'mongoose' {
  interface Document {
    getAuthToken: () => string;
  }
}

const User = mongoose.model("User", userSchema);

export default User;
