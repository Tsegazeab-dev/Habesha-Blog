import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import { customError } from "../utils/customError.js";
export const signUp = async (req, res, next) => {
  const {username, password, email} = req.body
   if(!username || !password || !email){
      next(customError(400, 'All fields are required'))
   }
// hash the password using bcryptjs before saving to database
   const hashedPassword = bcrypt.hashSync(password, 10)

   let newUser = new User ({username, password:  hashedPassword , email})
    try{
        await newUser.save()
        res.status(201).json('User created successfully')
      }
      catch(err) {
          console.log(err)
          next(err)
      }
};
