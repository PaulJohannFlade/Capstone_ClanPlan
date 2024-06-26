import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Member from "@/db/models/Member";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "GET") {
    try {
      const user = await Member.findOne({ email: session.user.email });
    if (!user || !user.family) {
      return response.status(200).json([]);
    }
    const familyId = user?.family;
    const category = await Category.find({ family: familyId })
      .populate("selectedMembers")
      .sort({ title: "asc" });
    return response.status(200).json(category);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const categoryData = request.body;
      await Category.create({ ...categoryData });

      return response
        .status(201)
        .json({ status: "Category added successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
