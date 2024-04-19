import React, { useEffect, useState } from "react";
import { URL } from "../../APIs/api";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);

  const getBooks = () => {
    axios
      .get(`${URL}/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (id) => {
    let bookToAdd = books.find((item) => item._id === id);
    if (bookToAdd && bookToAdd.quantity !== 0) {
      axios
        .patch(`${URL}/books/${id}`, { quantity: bookToAdd.quantity - 1 })
        .then(() => {
          getBooks();
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          let existingBookIndex = cart.findIndex((item) => item._id === id);
          if (existingBookIndex !== -1) {
            cart[existingBookIndex].quantity += 1;
          } else {
            bookToAdd.quantity = 1;
            cart.push(bookToAdd);
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        })
        .catch((err) => alert(err));
    } else {
      alert("We are running out of stock");
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="home">
      <h2>Enrich yourself with materials we have here...</h2>
      <div className="row">
        {books.length > 0 &&
          books.map((item, index) => (
            <div className="col-3" key={index}>
              <div className="box">
                <div className="img-div">
                  <img
                    alt="book"
                    src={require("../../Assets/Images/book.png")}
                  />
                </div>
                <h3>{item.title}</h3>
                <h5>Author : {item.author}</h5>
                <h6>Quantity : {item.quantity}</h6>
                <p>Price : ${item.price}</p>
                <div class="bag-buttons">
                  <button
                    class="add-bag"
                    type="button"
                    name="button"
                    onClick={() => addToCart(item._id)}
                  >
                    Add to Cart
                  </button>
                  {/* <button class="minus-btn" type="button" name="button">
                    -
                  </button>
                  <input type="text" name="name" value="0" />
                  <button class="plus-btn" type="button" name="button">
                    +
                  </button> */}
                </div>
              </div>
            </div>
          ))}

        {/* <div className="col-3">
          <div className="box">
            <div className="img-div">
              <img alt="book" src={require("../Assets/Images/book.png")} />
            </div>
            <h3>Title 1</h3>
            <h5>Quantity : 5</h5>
            <h6>Price : 50$</h6>
            <p>Desc : Hello This is a book</p>
            <div class="bag-buttons">
              <button class="add-bag" type="button" name="button">
                Add to Cart
              </button>
              <button class="minus-btn" type="button" name="button">
                -
              </button>
              <input type="text" name="name" value="0" />
              <button class="plus-btn" type="button" name="button">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="box">
            <div className="img-div">
              <img alt="book" src={require("../Assets/Images/book.png")} />
            </div>
            <h3>Title 1</h3>
            <h5>Quantity : 5</h5>
            <h6>Price : 50$</h6>
            <p>Desc : Hello This is a book</p>
            <div class="bag-buttons">
              <button class="add-bag" type="button" name="button">
                Add to Cart
              </button>
              <button class="minus-btn" type="button" name="button">
                -
              </button>
              <input type="text" name="name" value="0" />
              <button class="plus-btn" type="button" name="button">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="box">
            <div className="img-div">
              <img alt="book" src={require("../Assets/Images/book.png")} />
            </div>
            <h3>Title 1</h3>
            <h5>Quantity : 5</h5>
            <h6>Price : 50$</h6>
            <p>Desc : Hello This is a book</p>
            <div class="bag-buttons">
              <button class="add-bag" type="button" name="button">
                Add to Cart
              </button>
              <button class="minus-btn" type="button" name="button">
                -
              </button>
              <input type="text" name="name" value="0" />
              <button class="plus-btn" type="button" name="button">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="box">
            <div className="img-div">
              <img alt="book" src={require("../Assets/Images/book.png")} />
            </div>
            <h3>Title 1</h3>
            <h5>Quantity : 5</h5>
            <h6>Price : 50$</h6>
            <p>Desc : Hello This is a book</p>
            <div class="bag-buttons">
              <button class="add-bag" type="button" name="button">
                Add to Cart
              </button>
              <button class="minus-btn" type="button" name="button">
                -
              </button>
              <input type="text" name="name" value="0" />
              <button class="plus-btn" type="button" name="button">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="box">
            <div className="img-div">
              <img alt="book" src={require("../Assets/Images/book.png")} />
            </div>
            <h3>Title 1</h3>
            <h5>Quantity : 5</h5>
            <h6>Price : 50$</h6>
            <p>Desc : Hello This is a book</p>
            <div class="bag-buttons">
              <button class="add-bag" type="button" name="button">
                Add to Cart
              </button>
              <button class="minus-btn" type="button" name="button">
                -
              </button>
              <input type="text" name="name" value="0" />
              <button class="plus-btn" type="button" name="button">
                +
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
