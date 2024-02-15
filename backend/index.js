import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import userRoutes from "./routes/userRoutes.js";

//configuration
dotenv.config();
const app = express();
const port = process.env.PORT;

//middlewares
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

//route middlewares
app.use("/api/v1/user", userRoutes);
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// connecting to DB
connectDb(process.env.MONGO_URI, process.env.DB_NAME);

//starting the server
app.listen(port, () => {
  console.log(`listening on port: ${port} - http://localhost:${port}`);
});
