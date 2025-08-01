import mongoose from "mongoose";

export const connection = async () => {
   await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("some error occur while connecting to the database",err.message);
    });
};