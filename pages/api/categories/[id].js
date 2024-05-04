import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    await Category.findByIdAndDelete(id);
    await Task.updateMany({ category: id }, { $set: { category: null } });
    response.status(200).json({ status: "Product deleted successfully." });
  }
}
