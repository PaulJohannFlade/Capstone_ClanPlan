import dbConnect from "@/db/connect";
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

  if (request.method === "GET") {
    try {
      const familyMember = await Member.findOne({
        email: session.user.email,
      }).populate("family");

      if (!familyMember) {
        return response.status(200).json({ status: "Member not found" });
      } else {
        response.status(200).json(familyMember);
      }
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
