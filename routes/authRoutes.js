const express = require("express");

const authRouter = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

authRouter.post("/signup", async (req, res) => {
  const data = req.body;
  const newUser = new User(data);
  await newUser.save();
  const token = jwt.sign(
    {
      id: newUser._id,
    },
    "mysecretkey"
  );
  res.send({
    success: true,
    token: token,
  });
});

authRouter.post("/login", async (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  const user = await User.findOne({ email: email, password: password });
  if (user) {
    // create token
    const token = jwt.sign(
      {
        id: user._id,
      },
      "mysecretkey"
    );
    res.send({
      success: true,
      token: token,
    });
  } else {
    res.send({
      authorized: false,
    });
  }
});

authRouter.get('/profile',async(req,res)=>{
 try{ const user=req.user;
  const id=user.id;
  const userData=await User.findById(id);
  res.send(userData);
 }catch(error){
  res.send(error);
 }
});

videoRouter.get('/subscribe/:id',async(req,res)=>{
  try{const channelId=req.params.id;
  const channel=await User.findById(channelId);
  channel.subscribers++;
  await channel.save();
  res.send(channel);
  }catch(error){
    res.send(error);
  }
});

videoRouter.get('/like/:id',async(req,res)=>{
  try{
    const userID=req.user.id;
    const user=await User.findById(userID);
    const videoId=req.params.id;
  const video=await User.findById(videoId);
  videoId.likes++;
  user.likedVideos.push(video._id);
  await user.save();
  await video.save();
  res.send(video);
  }catch(error){
    res.send(error);
  }
});


module.exports = authRouter;