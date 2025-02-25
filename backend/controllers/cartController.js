import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData exists

    cartData[itemId] = (cartData[itemId] || 0) + 1; // Increment item count

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
//remove items from user cart

const removeFromCart = async (req, res) => {};

// fetch user cart data

const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
