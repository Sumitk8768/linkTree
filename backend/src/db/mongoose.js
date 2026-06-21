import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async (req,res)=>{
   try {
    await mongoose.connect(config.MONGO_URI)
    console.log("Connected to MongoDB")
   } catch (error) {
    console.log("Erore in connecting mongoDB: ",error);
    process.exit(1)
   }
}

export default connectDB