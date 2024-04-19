import React, { useEffect, useState } from "react";
import "../../Assets/Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../APIs/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/customers/login`, formData);
      console.log(res.data.user);
      if (res.data.status === true) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
      // Redirect to dashboard or desired page upon successful login
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/");
    }
  }, [navigate]); // Added navigate to the dependency array

  return (
    <div className="p-5 m-auto d-flex align-items-center justify-content-center">
      <div className="login-container row">
        <div className="col-6">
          <img
            src={require("../../Assets/Images/book.png")}
            alt=""
            className="image" // Removed "Image" from the alt attribute
          />
        </div>
        <div className="col-6">
          <form onSubmit={(e) => loginUser(e)}>
            <h1>Richbooks</h1>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChangeData}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChangeData}
            />
            <button className="submit-btn">Login</button>
          </form>
          <p className="text-center">
            Not a user?{" "}
            <Link style={{ color: "#658b6f" }} to={"/signup"}>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
