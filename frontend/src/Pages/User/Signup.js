import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Assets/Styles/Login.css";
import { URL } from "../../APIs/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/customers/signup`, formData)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/");
    }
  }, [navigate]); // Added navigate to the dependency array

  return (
    <div className="p-5 m-auto d-flex align-items-center justify-content-center">
      <div className="login-container row">
        <div className="col-6 d-flex align-items-center">
          <img
            src={require("../../Assets/Images/book.png")}
            alt="book"
            className="image" // Removed "Image" from the alt attribute
          />
        </div>
        <div className="col-6">
          <form>
            <h1>Richbooks</h1>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.name}
              onChange={(e) => onChangeData(e)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => onChangeData(e)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => onChangeData(e)}
            />
            <button className="submit-btn" onClick={(e) => registerUser(e)}>
              Register
            </button>
          </form>
          <p className="text-center">
            {"Already a user? "}
            <Link style={{ color: "#658b6f" }} to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
