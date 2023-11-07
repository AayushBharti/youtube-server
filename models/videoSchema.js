const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  views: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
