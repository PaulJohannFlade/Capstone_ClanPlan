import dbConnect from "@/db/connect";
import Member from "@/db/models/Member";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "GET") {
    const user = await Member.findOne({ email: session.user.email });
    const familyId = user?.family;
    const familyMember = await Member.findOne({ _id: id, family: familyId });
    if (!familyMember) {
      return response.status(404).json({ status: "Member not found" });
    }

    response.status(200).json(familyMember);
  }

  if (request.method === "PATCH") {
    const updatedMemberData = request.body;
    await Member.findByIdAndUpdate(id, updatedMemberData, { new: true });
    response
      .status(200)
      .json({ status: "Member profile updated successfully." });
  }

  if (request.method === "PUT") {
    try {
      const memberData = request.body;
      await Member.findByIdAndUpdate(id, memberData);
      response.status(200).json({ status: "Member updated successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
