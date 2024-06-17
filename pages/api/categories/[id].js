import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    try {
      await Category.findByIdAndDelete(id);
      await Task.updateMany(
        { category: id, isDone: { $ne: true } },
        { $set: { category: null } }
      );
      response.status(200).json({ status: "Category deleted successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      const updatedCategory = request.body;
      await Category.findByIdAndUpdate(id, updatedCategory);
      const selectedMembers = updatedCategory.selectedMembers;
      await Task.updateMany(
        {
          category: id,
          isDone: { $ne: true },
          assignedTo: { $elemMatch: { $not: { $in: selectedMembers } } },
        },
        { $set: { assignedTo: [] } }
      );
      response.status(200).json({ status: "Category updated successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
