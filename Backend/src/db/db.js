import mongoose from "mongoose";

export function db_connection() {
  try {
    
    mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoose connected"))
  } catch (error) {
    console.log(error)
  }
}