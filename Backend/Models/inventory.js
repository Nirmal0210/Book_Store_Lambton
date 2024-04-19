import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true },
});

export const Inventory= mongoose.model('Inventory', inventorySchema);