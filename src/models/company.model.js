import mongoose, { Schema } from "mongoose";
const companySchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            lowercase: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        contactNumber: {
            type: String,
            pattern: "^[0-9]{10}$"
        },
        remarks: {
            type: String,
          }

   },
    {
        timestamps:true
    }
)


export const Company = mongoose.model("Company", companySchema)