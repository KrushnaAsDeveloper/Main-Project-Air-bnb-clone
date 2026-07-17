import "dotenv/config"// this should be in the project first 
import dotenv from "dotenv";
dotenv.config(
  {
    path : "./.env"
  }
);
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import Listing from "./model/listing.model.js";
import User from "./model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { protect } from "./middlewares/user.middleware.js";
import { db_connection } from "./db/db.js";
const port = 5000;
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, // your exact Vercel URL, e.g. https://cosy-cloud.vercel.app
  credentials: true,
}));
app.use(express.static('public'));
app.use(cors({origin : "https://main-project-air-bnb-clone.vercel.app/", credentials :true}));
app.use(express.urlencoded({ extended: true, limit : "20kb" }));
app.use(express.json({limit : "20kb"}));
app.use(cookieParser())
db_connection().then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server is running on port ${process.env.PORT || 8000} http://localhost:${process.env.PORT || 8000}/api/v1/listings/`)
  })
}).catch((err)=>{
  console.log("mongodb connetion error", err)
})

import listingsRouter from "./routes/listings.routes.js";
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/listings", listingsRouter);
app.use("/api/v1/auth", userRouter)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors,
    stack : err.stack
  });
});