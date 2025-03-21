import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
       
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    createdDate: {
        type: Date,
        
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
