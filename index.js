import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";
dotenv.config();
// dotenv.config({
//     path: './env'
// });
// console.log("MONGODB_URI:", process.env.MONGODB_URI);
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });
