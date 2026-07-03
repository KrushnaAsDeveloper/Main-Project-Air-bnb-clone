import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose, { get } from "mongoose";
import Listing from "./model/listing.js";
import User from "./model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect } from "./middlewares/middleware.js";
import listingsRouter from "./routes/Listings.js";
import userRouter from "./routes/User.js"
const port = 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoose connected"));

app.use("/api/listings", listingsRouter);
app.use("/api/auth", userRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT || 3000}`);
});
