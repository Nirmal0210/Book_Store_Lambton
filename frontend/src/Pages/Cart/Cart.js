import React, { useEffect, useState } from "react";
import "../../Assets/Styles/Cart.css";
import axios from "axios";
import { URL } from "../../APIs/api";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  const removeItem = (item, index) => {
    const id = item._id;
    axios
      .get(`${URL}/books/${id}`)
      .then((res) => {
        const temp = res.data;
        temp.quantity += 1;
        axios
          .patch(`${URL}/books/${id}`, temp)
          .then(() => {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
  };

  const placeOrder = () => {
    const customerID = JSON.parse(localStorage.getItem("user"))._id;
    const orderData = {
      customer: customerID,
      books: cart.map((item) => item._id),
      totalPrice: total,
      status: "pending",
    };

    axios
      .post(`${URL}/orders`, orderData)
      .then((res) => {
        setCart([]);
        localStorage.removeItem("cart");
        alert("Order placed successfully!");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    let totalPrice = 0;
    storedCart.forEach((item) => {
      totalPrice += item.price * item.quantity; // Assuming each item has a quantity property
    });
    setTotal(totalPrice);
  }, []);

  return (
    <div className="px-2">
      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h4>
                Title :<b> {item.title}</b>
              </h4>
              <p>
                Quantity :<b> {item.quantity}</b>
              </p>
              <p>
                Price :<b> {item.price}</b>
              </p>
              <div className="cart-btn" onClick={() => removeItem(item, index)}>
                Delete
              </div>
            </div>
          ))}
          <h1>Total: ${total}</h1>
          <div className="text-center mt-4">
            <button className="cart-btn" onClick={() => placeOrder()}>
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-center">Nothing found in cart!!!</h2>
          <p className="text-center">
            Go boy!! Make some worthy purchase for you
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
