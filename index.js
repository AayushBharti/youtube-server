const express = require("express");
const videoRouter = require("./routes/videoRoutes");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");

mongoose
  .connect(
    "mongodb+srv://youtubeclone:1234@cluster0.5ofd4si.mongodb.net/youtubeclone_220240101004"
  )
  .then(() => {
    console.log("DB connected");
  });

const app = express();
app.use(express.json());

app.use(videoRouter);
app.use(authRouter);

app.listen(3000, myCallbackFunction);

function myCallbackFunction() {
  console.log("Server Started");
}
