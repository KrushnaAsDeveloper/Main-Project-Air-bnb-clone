import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Listing from "./model/listing.model.js";
import User from "./model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect } from "./middlewares/user.middleware.js";
import listingsRouter from "./routes/listings.routes.js";
import userRouter from "./routes/user.routes.js"
const port = 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit : "20kb" }));
app.use(express.json({limit : "20kb"}));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoose connected"));

app.use("/api/listings", listingsRouter);
app.use("/api/auth", userRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT || 3000}`);
});
