import dbConnect from "@/db/connect";
import Member from "@/db/models/Member";
import Family from "@/db/models/Family";
import Task from "@/db/models/Task";
import Comment from "@/db/models/Comment";
import Category from "@/db/models/Category";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

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

  if (request.method === "DELETE") {
    try {
      const { isOnlyMember, categoriesIdsWithOnlyThisMember } = request.body;
      const deletedMember = await Member.findById(id);
      if (!deletedMember) {
        return response.status(404).json({ error: "Member not found." });
      }
      if (isOnlyMember) {
        // if the member to delete is the only member of the family - delete all tasks, categories, comments, family
        const familyId = deletedMember.family;
        await Family.findByIdAndDelete(familyId);
        await Category.deleteMany({
          family: familyId,
        });
        const tasksToDelete = await Task.find({
          family: familyId,
        });
        deleteComments(tasksToDelete);
        await Task.deleteMany({
          family: familyId,
        });
      } else {
        //if there are categories with only this one selected member, delete the categories
        if (categoriesIdsWithOnlyThisMember.length) {
          await Category.deleteMany({
            _id: { $in: categoriesIdsWithOnlyThisMember },
          });
          await Task.updateMany(
            {
              category: { $in: categoriesIdsWithOnlyThisMember },
            },
            { $set: { category: null } }
          );
        }
        //delete member-id from other categories where he is not only member.
        await Category.updateMany(
          {
            selectedMembers: { $elemMatch: { $eq: id } },
          },
          { $pull: { selectedMembers: id } }
        );
        //delete all comments from the member
        await Comment.deleteMany({ member: id });
        //delete Member from all tasks (done and not) where he is assigned
        await Task.updateMany(
          {
            assignedTo: { $elemMatch: { $eq: id } },
          },
          { $pull: { assignedTo: id } }
        );
      }
      //delete the member
      await Member.findByIdAndDelete(id);
      response.status(200).json({ status: "Member deleted successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  async function deleteComments(tasksToDelete) {
    const commentIdsToDelete = [];
    for (const task of tasksToDelete) {
      commentIdsToDelete.push(...task.comments);
    }
    await Comment.deleteMany({ _id: { $in: commentIdsToDelete } });
  }
}
