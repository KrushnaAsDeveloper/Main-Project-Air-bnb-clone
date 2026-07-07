import mongoose from "mongoose";
import { db_name } from "../constant.js";

export const  db_connection = async () =>  {
  try {
    
   const connectionsInstence = await mongoose
  .connect(`${process.env.MONGO_URI}/${db_name}`)
    
  console.log(`MONGO CONNECTEC !! ~ DB HOST : ${connectionsInstence.connection.host}`)
  } catch (error) {
    console.log(error)
    
  }

}