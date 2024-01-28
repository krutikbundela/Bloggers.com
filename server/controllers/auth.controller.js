import User from "../models/user.models.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signUp = async(req, res,next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, password, and email are provided
    if (!username || !password || !email) {
    //   return res.status(400).json({ error: "All fields are required" });
      return next(errorHandler(400,"All Fields Are Required"));
    }
    
    // Check if username has at least 3 characters
    if (username.length < 3) {
      return next(errorHandler(400, "Username must be at least 3 characters long"));
    }
    
    // Check if password has at least 8 characters
    if (password.length < 8) {
      return next(errorHandler(400, "Password must be at least 8 characters long"  ));
    }
    
    // Check if email matches the regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(errorHandler(400, "Invalid email format"));
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User({
      username,
      email,
      password:hashedPassword,
    });

    await newUser.save();

    res.status(200).json("SignUp Successful");
} catch (error) {
    next(error)
  }
};


export const signIn = async(req,res,next) =>{
  const {username , password } = req.body;
  console.log("signIn ~ password:", password);

  if(!username || !password){
    return next(errorHandler(400,"All Fiellds Are Required"));
  }

  try {
    const validUser = await User.findOne({ username});

    if(!validUser){
      return next(errorHandler(400, "User Not Found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if(!validPassword){
      return next(errorHandler(400,"Invalid Username Or Password"))
    }

    const token = jwt.sign(
      {id:validUser._id}, process.env.JWT_SECRET, {expiresIn: '5d'}
    );

    const {password: pass , ...rest} = validUser._doc; 

    res.status(200).cookie('access_token',token,{
      httpOnly:true
    }).json(rest);


  } catch (error) {
    next(error);
  }
}