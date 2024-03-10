import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
dotenv.config()
const app = express()

// connect the mongodb atlas database using url

mongoose.connect(
  process.env.MONGODB
).then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err))


app.listen(3000, ()=>console.log("server listening to port 3000"))

app.use('/api/user', userRoutes)