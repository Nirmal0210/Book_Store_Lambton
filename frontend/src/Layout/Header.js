import { React } from "react";
import Logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav className="py-2 border-bottom">
        <div className="container d-flex align-items-center justify-content-around">
          <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
          >
            <img src={Logo} alt="Logo" className="main-bg" />
          </Link>
          <div className="container d-flex justify-content-center">
            <ul className="nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link link-body-emphasis px-2 active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link link-body-emphasis px-2">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/inventory"
                  className="nav-link link-body-emphasis px-2"
                >
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/order" className="nav-link link-body-emphasis px-2">
                  Orders
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="#" className="nav-link link-body-emphasis px-2">
                  About
                </Link>
              </li> */}
            </ul>
            {/* <ul className="nav">
            <li className="nav-item">
              <Link to="#" className="nav-link nav-btn">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link nav-btn">
                Sign up
              </Link>
            </li>
          </ul> */}
          </div>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
            <input
              type="search"
              className="form-control nav-input"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
