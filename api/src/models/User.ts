import mongoose from "mongoose";

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
    maxLength: 30,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
