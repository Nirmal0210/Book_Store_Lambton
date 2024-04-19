import express from "express";
import { Customer } from "../Models/customer-model.js";
const router = express.Router();

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(201).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Customer.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    // Compare hashed passwords using bcrypt or similar library
    // For simplicity, assuming password comparison directly
    if (user.password !== password) {
      return res.status(404).send({
        message: "Password is Incorrect",
      });
    }
    res.status(200).send({
      message: "Login Successful",
      user: user,
      status: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});
// Get one customer

router.get("/:id", getCustomer, (req, res) => {
  res.json(res.customer);
});

// Create a customer
router.post("/signup", async (req, res) => {
  const customer = new Customer({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  // try {
  //   const valid = await validateEmailAccessibility(req.body.email);
  //   if (valid) {
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  //   } else {
  //     res.status(400).json({ message: "Email already exists" });
  //   }
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
});

// Update a customer
router.patch("/:id", getCustomer, async (req, res) => {
  if (req.body.username != null) {
    res.customer.username = req.body.username;
  }

  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }

  if (req.body.phoneNumber != null) {
    res.customer.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.password != null) {
    res.customer.password = req.body.password;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a customer
router.delete("/:id", getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: "Deleted Customer" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
}

function validateEmailAccessibility(email) {
  return User.findOne({ email: email }).then(function (result) {
    return result !== null;
  });
}
export default router;
