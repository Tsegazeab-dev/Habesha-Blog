import jwt from 'jsonwebtoken'
import { customError } from '../utils/customError.js'
export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(customError(401, "unauthenticated user"))
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload)=>{
        if(err){
            return next(customError(401, "unauthenticated user"))
        }
        req.user = payload
    })
    next()
    
}