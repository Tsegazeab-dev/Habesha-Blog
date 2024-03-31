import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
dotenv.config();

const app = express()

// to parse json data coming from the client
app.use(express.json())
// to parse the cookie from the browser
app.use(cookieParser());
// connect the mongodb atlas database using url
mongoose.connect(
  process.env.MONGODB
).then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err))


app.listen(5000, ()=>console.log("server listening to port 5000"))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

// Error handler middleware
app.use(function (err, req, res, next) {
 const message = err.message || "Internal server error"
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})