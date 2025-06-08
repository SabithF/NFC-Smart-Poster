import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
}