import axios from "axios";
import React, { useState, useEffect } from "react";
import { URL } from "../../APIs/api";

const Order = () => {
  const [order, setOrder] = useState([]);

  const getOrders = () => {
    axios.get(`${URL}/orders`).then((res) => {
      console.log(res.data);
      setOrder(res.data);
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="px-2">
      {order.length > 0 ? (
        order.map((item, index) => (
          <div key={index} className="cart-item">
            <h4>
              Order Date: <b>{formatDate(item.createdAt)}</b>
            </h4>
            <p>
              Total: <b>{item.totalPrice}</b>
            </p>
            <p>
              Status: <b>{item.status}</b>
            </p>
          </div>
        ))
      ) : (
        <div>
          <h2 className="text-center">Nothing found in Order!!!</h2>
          <p className="text-center">
            Go boy!! Make some worthy orders for you
          </p>
        </div>
      )}
    </div>
  );
};
export default Order;