import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// User Login
router.post("/login", async (req, res) => {
     try {
          const { username, password } = req.body;

          const user = await User.findOne({ username });
          if (!user) return res.status(400).json({ message: "Invalid username or password" });

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) return res.status(400).json({ message: "Invalid username or password" });

          // Generate JWT token
          const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

          res.status(200).json({ message: "Login successful", token });
     } catch (error) {
          console.error("Login Error:", error);
          res.status(500).json({ message: "Error logging in" });
     }
});

// Register New User
router.post("/register", async (req, res) => {
     try {
          const { username, password } = req.body;

          if (!username || !password) {
               return res.status(400).json({ message: "Username and Password Required" });
          }

          const existingUser = await User.findOne({ username });
          if (existingUser) return res.status(400).json({ message: "Username already exists" });

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({ username, password: hashedPassword });
          await newUser.save();

          res.status(201).json({ message: "User registered successfully" });
     } catch (error) {
          console.error("Registration Error:", error);
          res.status(500).json({ message: "Error registering user" });
     }
});

export default router;
