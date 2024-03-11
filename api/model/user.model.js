import mongoose from "mongoose";

// set a schema(rule) for user model

const userSchema = new  mongoose.Schema({
    username: {
        type: String,
        required: true, // this means that the field is required to be filled out when creating an instance of the User Model
        unique: true // means no same username isnot  allowed in the database
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password: {
        type : String,
        require: true
    }
}, {timestamps: true})

// timeStamp: true record the create and update time of the data

// create a model using the schema above

const User = mongoose.model("User", userSchema)
export default User;