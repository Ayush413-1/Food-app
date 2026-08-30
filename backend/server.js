import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/User.route.js";
import sellerRouter from "./routes/seller.route.js";
import productRouter from "./routes/ProductRoute.js";
import addressRouter from "./routes/addressRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/OrderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "https://food-app-tunw.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      // Allow all Vercel deployments of your frontend
      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("food-app-tunw")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
