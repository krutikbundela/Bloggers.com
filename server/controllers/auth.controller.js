import User from "../models/user.models.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
export const SignUp = async(req, res,next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, password, and email are provided
    if (!username || !password || !email) {
    //   return res.status(400).json({ error: "All fields are required" });
        next(errorHandler(400,"All Fields Are Required"));
    }
    
    // Check if username has at least 3 characters
    if (username.length < 3) {
        next(errorHandler(400, "Username must be at least 3 characters long"));
    }
    
    // Check if password has at least 8 characters
    if (password.length < 8) {
        next(errorHandler(400, "Password must be at least 8 characters long"  ));
    }
    
    // Check if email matches the regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        next(errorHandler(400, "Invalid email format"));
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User({
      username,
      email,
      password:hashedPassword,
    });

    await newUser.save();

    res.json("SignUp Successful");
} catch (error) {
      next(error)
  }
};
