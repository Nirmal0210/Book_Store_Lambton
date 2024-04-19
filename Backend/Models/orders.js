import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  books: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
