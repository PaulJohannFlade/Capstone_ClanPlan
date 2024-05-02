import mongoose from "mongoose";
import "./Category";
import "./Member";

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  assignedTo: { type: [Schema.Types.ObjectId], ref: "Member" },
  priority: { type: String },
  dueDate: { type: String },
  isDone: { type: Boolean },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
