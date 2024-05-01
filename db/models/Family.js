import mongoose from "mongoose";

const { Schema } = mongoose;

const familySchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, requred: true },
});

const Family = mongoose.models.Family || mongoose.model("Family", familySchema);

export default Family;
