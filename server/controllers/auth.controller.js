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
  const {email , password } = req.body;

  if(!email || !password){
    return next(errorHandler(400,"All Fiellds Are Required"));
  }

  try {
    const validUser = await User.findOne({ email});

    if(!validUser){
      return next(errorHandler(400, "User Not Found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if(!validPassword){
      return next(errorHandler(400,"Invalid Email Or Password"))
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

export const googleAuth = async (req,res,next) =>{
  const {email , name , googlePhotoUrl} = req.body;
  console.log("googleAuth ~  req.body",  req.body);

  try {
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });

      const { password: pass, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }else{
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      const newUser = new User({
        username:name.toLowerCase().split(" ").join('') + Math.random().toString(9).slice(-4),
        email,
        password:hashedPassword,
        profilePicture:googlePhotoUrl,

      });
      await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });

      const { password: pass, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);

    }
  } catch (error) {
    next(error)    
  }
}