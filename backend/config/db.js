import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://user:8274057716@cluster0.qhvwggu.mongodb.net/food-del"
    )
    .then(() => console.log("database is connected successfully"));
};
