import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      undefined: true,
      lowercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("Category", categorySchema);
