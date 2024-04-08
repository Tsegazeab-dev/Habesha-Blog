import bcrypt from 'bcryptjs'
import { customError } from "../utils/customError.js"
import User from '../model/user.model.js'

export const updateUser = async (req, res, next)=>{
    console.log(req.body.username)
    if(req.params.id !== req.user.id){
        return next(customError(403, "Access Denied"))
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(
          customError(400, "Password must be at least 6 characters")
        );
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          customError(400, "Username must be between 7 and 20 characters")
        );
      }
      if (req.body.username.includes(" ")) {
        return next(customError(400, "Username cannot contain spaces"));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(customError(400, "Username must be lowercase"));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          customError(400, "Username can only contain letters and numbers")
        );
      }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}