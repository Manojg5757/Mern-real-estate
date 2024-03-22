import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// for signUp
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created");
  } catch (error) {
    next(error);
  }
};

// for signin

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    //if the credentials are right create a jwt token
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};

// for google oauth authentication
export const google = async (req, res, next) => {

  try {
    const user = await User.findOne({ email:req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random(36).toString().slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar:req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({id:newUser._id},process.env.SECRET_KEY)
      const {password:pass,...rest} = newUser._doc;
      res.cookie("access_token",token,{httpOnly:true})
      .status(200)
      .json(rest);
    }
  } catch (error) {
    next(error)
  }
};
