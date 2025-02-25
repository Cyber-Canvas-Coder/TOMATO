import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const itemCount = cartItems[id] || 0;
  console.log("Image URL:", `${url}/images/${image}`);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt={name}
        />
        {!itemCount ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt={`Add ${name} to cart`}
            aria-label={`Add ${name} to cart`}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt={`Remove one ${name} from cart`}
              aria-label={`Remove one ${name} from cart`}
            />
            <p>{itemCount}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt={`Add one more ${name} to cart`}
              aria-label={`Add one more ${name} to cart`}
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
      </div>
      <p className="food-item-description">{description}</p>
      <p className="food-item-price">${price.toFixed(2)}</p>
    </div>
  );
};

export default FoodItem;
