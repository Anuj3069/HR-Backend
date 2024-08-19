import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Company } from "../models/company.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"


const CompanyUser = asyncHandler(async (req, res) => {
    const { firstname,lastName, email, contactNumber,remarks } = req.body;
    if ([firstname, lastName,, email,  contactNumber,remarks].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    console.log("Received data:", req.body);
    const user = await Company.findOneAndUpdate(
        { email },
        {
            $set: {
                firstname,
                lastName,
                contactNumber,
                remarks
            }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );


    if (!user) {
        throw new ApiError(500, "Something went wrong while registering/updating the user");
    }
    return res.status(200).json(
        new ApiResponse(200, user, "Data registered/updated successfully")
    );
  });
  export {CompanyUser}
