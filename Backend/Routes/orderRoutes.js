import express from "express";
import { Order } from "../Models/orders.js";

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: err.message });
  }
});

// Get one order
router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

// Create a new order
router.post("/", async (req, res) => {
  console.log(req.body);
  const { customer, books, totalPrice, status } = req.body;

  // Validate required fields
  if (!customer || !books || !totalPrice || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const order = new Order({
    customer,
    books,
    totalPrice,
    status,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create order", error: err.message });
  }
});

// Update an order
router.patch("/:id", getOrder, async (req, res) => {
  const { status } = req.body;

  if (status != null) {
    res.order.status = status;
  }

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update order", error: err.message });
  }
});

// Delete an order
router.delete("/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: "Deleted Order" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: err.message });
  }
});

async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error retrieving order", error: err.message });
  }

  res.order = order;
  next();
}

export default router;
