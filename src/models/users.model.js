import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        contactNumber: {
            type: String,
            pattern: "^[0-9]{10}$"
        },
        resume: {   //cloudinary url
            type: String,
            required: true
        },
        message: {
            type: String,
          }

   },
    {
        timestamps:true
    }
)


export const User = mongoose.model("User", userSchema)