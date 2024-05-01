import mongoose from "mongoose";
import "./Category";
import "./Member";

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  assignedTo: { type: [Schema.Types.ObjectId], ref: "Member" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  priority: { type: String },
  dueDate: { type: String },
  isDone: { type: Boolean },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
