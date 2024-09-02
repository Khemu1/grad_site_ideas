import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState > 1) return;
  try {
    mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "ideas",
      autoIndex: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
