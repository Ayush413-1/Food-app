import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});

try {
    const result = await cloudinary.api.ping();
} catch (error) {
    console.log("Cloudinary error:", error.message);
}

};

export default connectCloudinary;
