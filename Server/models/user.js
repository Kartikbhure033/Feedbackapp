const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  Fullname: { type: String, required: true },
  Email: { type: String, required: true, unique: true, lowercase: true },
  Phoneno: { type: String },
  Semester: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

UserSchema.statics.matchedPasswordAndGenerateToken = async function (Email, password) {
  const user = await this.findOne({ Email: Email.toLowerCase() });
  if (!user) throw new Error("user not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("password is not correct");

  // create token payload but keep token logic in service or return user here
  return user;
};

const User = model("user", UserSchema);
module.exports = User;
