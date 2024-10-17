import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  // Log the incoming request for debugging
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  // Clean up request body (trim keys)
  const cleanedBody = {};
  Object.keys(req.body).forEach((key) => {
    const cleanKey = key.trim(); // Remove spaces from keys
    cleanedBody[cleanKey] = req.body[key]; // Assign the original values to cleaned keys
  });

  // Check if image file is provided
  if (!req.file || !req.file.filename) {
    return res
      .status(400)
      .json({ success: false, message: "Image is required" });
  }

  const { name, description, price, category } = cleanedBody;
  const image_filename = req.file.filename;
  // Validate required fields
  if (!name || !description || !price || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Parse price to ensure it's a number
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return res
      .status(400)
      .json({ success: false, message: "Price must be a valid number" });
  }

  // Create new food item
  const food = new foodModel({
    name,
    description,
    price: parsedPrice, // Ensure price is a number
    category,
    image: image_filename,
  });

  try {
    // Save the food item to the database
    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

export { addFood };
