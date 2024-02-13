import mongoose from "mongoose";

async function connectDb(connectionString, dbName) {
  try {
    await mongoose.connect(connectionString, { dbName });
    console.log("database connection established...");
  } catch (err) {
    console.log("failed to establish connection... : " + err);
  }
}

export { connectDb };
