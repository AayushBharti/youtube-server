const express = require("express");
const Video = require("../models/videoSchema");
const authMiddleware = require("./authMiddleware");
const User = require("../models/userSchema");

const videoRouter = express.Router();

videoRouter.get("/video", async (req, res) => {
  try {
    const videos = await Video.find();
    res.send(videos);
  } catch (error) {
    res.send(error);
  }
});

videoRouter.get("/video/:id", async (req, res) => {
  try {
    const data = req.params;
    const videoId = data.id;
    const video = await Video.findById(videoId);
    res.send(video);
  } catch (error) {
    res.send(error);
  }
});

videoRouter.post("/video", authMiddleware, async (req, res) => {
  try {
    const data = req.body;
    const video = new Video(data);
    await video.save();
    const user = req.user;
    const id = user.id;
    const userInDb = await User.findById(id);
    userInDb.videos.push(video._id);
    await userInDb.save();
    res.send(video);
  } catch (error) {
    res.send(error);
  }
});

videoRouter.get("/subscribe/:id", authMiddleware, async (req, res) => {
  try {
    const channelId = req.params.id;
    const channel = await User.findById(channelId);
    channel.subscribers++;
    await channel.save();
    res.send(channel);
  } catch (error) {
    res.send(error);
  }
});

videoRouter.get("/like/:id", authMiddleware, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID);
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    video.likes++;
    user.likedVideos.push(video._id);
    await user.save();
    await video.save();
    res.send(video);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

videoRouter.post("/comment", async (req, res) => {
  const data = req.body;
  const comment = new Comment(data);
  await comment.save();
  res.send(comment);
});

module.exports = videoRouter;