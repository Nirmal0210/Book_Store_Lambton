import express from "express";
import { Inventory } from "../Models/inventory.js";

const router = express.Router();

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.json(inventoryItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new inventory item
router.post("/", async (req, res) => {
  const inventoryItem = new Inventory({
    book: req.body.book,
    quantity: req.body.quantity,
  });

  try {
    const newInventoryItem = await inventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one inventory item
router.get("/:id", getInventoryItem, (req, res) => {
  res.json(res.inventoryItem);
});

// Update an inventory item
router.patch("/:id", getInventoryItem, async (req, res) => {
  if (req.body.quantity != null) {
    res.inventoryItem.quantity = req.body.quantity;
  }

  try {
    const updatedInventoryItem = await res.inventoryItem.save();
    res.json(updatedInventoryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an inventory item
router.delete("/:id", getInventoryItem, async (req, res) => {
  try {
    await res.inventoryItem.remove();
    res.json({ message: "Deleted Inventory Item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getInventoryItem(req, res, next) {
  let inventoryItem;
  try {
    inventoryItem = await Inventory.findById(req.params.id);
    if (inventoryItem == null) {
      return res.status(404).json({ message: "Cannot find inventory item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.inventoryItem = inventoryItem;
  next();
}

export default router;
