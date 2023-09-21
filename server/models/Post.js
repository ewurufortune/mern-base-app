import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    mainLogs: {
      type: Array, 
      required: true, 
    },
    participants: {
      type: Array, 
    },
    items: {
      type: Array, 
    },
    statPerception: {
      type: Array, 
    },
    published: {
      type: Boolean,
      default: false, // Default to false, indicating the post is not published initially
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);


const Post = mongoose.model("Post", PostSchema);

export default Post;
