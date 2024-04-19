import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Header from "./Header";
import Footer from "./Footer";
import Login from "../Pages/User/Login";
import PrivateRoute from "../Auth/PrivateRoute";
import Signup from "../Pages/User/Signup";
import Order from "../Pages/Order/Order";
import Cart from "../Pages/Cart/Cart";
import Inventory from "../Pages/Inventory/Inventory";

const RouterLayout = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />

      <Route
        element={
          <>
            <Header />
            <PrivateRoute />
            <Footer />
          </>
        }
      >
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/inventory" element={<Inventory />} />
      </Route>
    </Routes>
  );
};

export default RouterLayout;
