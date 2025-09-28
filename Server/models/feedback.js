const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
  likes: { type: String, required: true },
  Improve: { type: String, required: true },
  rating: { type: String, required: true },
  comments: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });

const Feedback = model("feedback", feedbackSchema);
module.exports = Feedback;
