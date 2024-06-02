import dbConnect from "@/db/connect";
import Family from "@/db/models/Family";
import Member from "@/db/models/Member";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
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
}
