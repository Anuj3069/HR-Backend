import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/users.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, lastName, contactNumber } = req.body;
    if ([username, email, lastName, contactNumber].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
  
    // Check for existing email
    // const existedUser = await User.findOne({ email });
    // if (existedUser) {
    //     throw new ApiError(400, "User with this email already exists");
    // }
  
    const resumeLocalPath = req.files?.resume[0]?.path;
    console.log(resumeLocalPath);
  
    if (!resumeLocalPath) {
        throw new ApiError(400, "Resume file is required");
    }
  
    const resume = await uploadOnCloudinary(resumeLocalPath);
    if (!resume) {
        throw new ApiError(500, "Error uploading resume file");
    }
  
    // const user = await User.create({
    //     username: username.toLowerCase(),
    //     email,
    //     lastName,
    //     contactNumber,
    //     resume: resume.url
    // });
  
    // const createdUser = await User.findById(user._id);
  
    // if (!createdUser) {
    //     throw new ApiError(500, "Something went wrong while registering the user");
    // }
    const user = await User.findOneAndUpdate(
        { email },
        {
            username: username.toLowerCase(),
            lastName,
            contactNumber,
            // resume: resume.url
            resume: resume.display_name
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    console.log(resume)

    if (!user) {
        throw new ApiError(500, "Something went wrong while registering/updating the user");
    }
    // return res.status(201).json(
    //     new ApiResponse(200, createdUser, "User added successfully")
    // );
    return res.status(200).json(
        new ApiResponse(200, user, "Data registered/updated successfully")
    );
  });
  export {registerUser}
