import User from "../models/user.models.js"
import bcryptjs from "bcryptjs"
export const SignUp = async(req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, password, and email are provided
    if (!username || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if username has at least 3 characters
    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters long" });
    }

    // Check if password has at least 8 characters
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Check if email matches the regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
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
      res.status(500).json({
        message: error.message
      });
    
  }
};
