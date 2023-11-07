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

module.exports = videoRouter;
