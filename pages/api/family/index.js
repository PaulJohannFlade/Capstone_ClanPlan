import dbConnect from "@/db/connect";
import Family from "@/db/models/Family";
import Member from "@/db/models/Member";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }
  const { family } = request.query;

  if (request.method === "GET") {
    const familyName = await Family.findById(family);

    if (!familyName) {
      return response.status(404).json({ status: "Family not found" });
    }
    response.status(200).json(familyName);
  }

  if (request.method === "POST") {
    try {
      const { name, role } = request.body;
      const family = await Family.create({ name });

      await Member.create({
        name: session.user.name,
        email: session.user.email,
        family: family._id,
        role: role,
      });

      return response
        .status(201)
        .json({ status: "Family  added successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PATCH") {
    try {
      const updatedFamily = request.body;
      const id = updatedFamily._id;
      await Family.findByIdAndUpdate(id, updatedFamily, { new: true });
      response
        .status(200)
        .json({ status: "Family Name updated successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
