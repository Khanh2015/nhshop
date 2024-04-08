import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
  },
  gallery: {
    type: Array,
  },
  description: {
    type: String,
  },
  discount: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array,
  },
  attributes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attribute",
    },
  ],
});

productSchema.plugin(mongoosePaginate);
export default model("Product", productSchema);
