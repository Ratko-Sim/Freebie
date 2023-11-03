import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/bbbrrriii/image/upload/v1633521219/avatar/avatar-profile_wwlmhk.jpg",
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
