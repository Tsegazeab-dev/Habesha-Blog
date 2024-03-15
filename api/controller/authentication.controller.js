import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { customError } from "../utils/customError.js";

export const signUp = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    next(customError(400, "All fields are required"));
  }

  const isEmailExisted = await User.findOne({ email });

  if (isEmailExisted)
    next(customError(400, "The email address is already in use"));
  // hash the password using bcryptjs before saving to database
  const hashedPassword = bcrypt.hashSync(password, 10);

  let newUser = new User({ username, password: hashedPassword, email });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password)
    return next(customError(400, "All fields are required"));
  try {
    // check if the email is in the database
    const validUser = await User.findOne({ email });
    if (!validUser) return next(customError(401, "User not found"));

    // check the password
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (!validPass) return next(customError(401, "Invalid Password"));

    // Tip := It is not a good practice to tell the user where he made a mistake during sign in. we should put general error message like "Invalid credential"

    // if both email and password passed we will generate a token
    // if we ignore expiresIn key as we did above the token will expires when the window closed
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    //  we filter out the password from the other user data
    const { password: pass, ...rest } = validUser._doc;
    
    // set the token on cookies and send the user data other than the  password to the client side
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
