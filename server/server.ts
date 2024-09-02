import app from "./app";
import dotenv from "dotenv";
import connectDB from "./utils/db";
dotenv.config();
const PORT = process.env.VITE_BACKEND_PORT || 4001;

const startServer = async () => {
  try {
    await connectDB();
    console.log();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

startServer();
