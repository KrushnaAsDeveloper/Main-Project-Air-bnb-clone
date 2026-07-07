import mongoose from "mongoose";

export function db_connection() {
    mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoose connected"))
}