import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-center text-white">
      <div className="container p-4">
        <section className="mb-4">
          <Link
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            to="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            to="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#dd4b39" }}
            to="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-google"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#ac2bac" }}
            to="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </Link>

          <Link
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#0082ca" }}
            to="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </Link>
          <Link
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#333333" }}
            to="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </Link>
        </section>
      </div>

      <div className="text-center p-3">
        <Link
          style={{ color: "#000" }}
          to="https://mdbootstrap.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MDBootstrap.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
