import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myDb";

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log("✅ Connected to MongoDB"))
     .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
     console.log(`🚀 Server running at http://localhost:${PORT}`);
});
