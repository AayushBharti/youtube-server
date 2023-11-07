const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: {
    type: String,
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
