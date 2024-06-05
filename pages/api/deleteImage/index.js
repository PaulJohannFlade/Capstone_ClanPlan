import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

export default async function handler(request, response) {
  if (request.method === "DELETE") {
    const { imageUrl } = request.body;

    if (!imageUrl) {
      response.status(400).json({ message: "Missing required parameters" });
      return;
    }

    const publicId = imageUrl.split("/").pop().split(".")[0];

    try {
      await cloudinary.v2.uploader.destroy(publicId);
      response
        .status(200)
        .json({ message: "Profile image deleted successfully" });
    } catch (error) {
      response
        .status(500)
        .json({ message: "Failed to delete profile image", error });
    }
  } else {
    response.setHeader("Allow", ["DELETE"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
