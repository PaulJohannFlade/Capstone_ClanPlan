import mongoose from "mongoose";
import "./Member";

const { Schema } = mongoose;

const commentSchema = new Schema({
  message: { type: String, required: true },
  date: { type: Date, requred: true },
  updatedDate: { type: Date },
  member: { type: Schema.Types.ObjectId, ref: "Member" },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
