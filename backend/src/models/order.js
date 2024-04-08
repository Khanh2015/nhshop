import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  item: [orderItemSchema],
  orderNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered"],
    default: "pending",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Order", orderSchema);
