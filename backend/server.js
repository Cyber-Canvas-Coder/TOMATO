import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
//app config
const app = express();
const port = 4000;

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is working");
});
//database connection
connectDB();

//api endpoints

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
//starting the server
app.listen(port, () => {
  console.log(`server is started on http://localhost:${port}`);
});
