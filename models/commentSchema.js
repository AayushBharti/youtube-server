const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: {
        type: String,
    },
    commentBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes:{
        type: Number,
        default: 0,
    },
});

const  Comment = mongoose.model("Comment",commentSchema);

export default Comment;