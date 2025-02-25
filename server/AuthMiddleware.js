import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export const authenticateToken = (req, res, next) => {
     const authHeader = req.header("Authorization");
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ message: "Access Denied: No Token Provided" });
     }
     const token = authHeader.split(" ")[1];

     jwt.verify(token, SECRET_KEY, (err, user) => {
          if (err) return res.status(403).json({ message: "Invalid Token" });
          req.user = user;
          next();
     });
};
