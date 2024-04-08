import { Schema, model } from "mongoose";

const ValueAttributeSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ValueAttributeModel = model(
  "ValueAttribute",
  ValueAttributeSchema
);

const AttributeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      uniuqe: true,
    },
    values: [
      {
        type: Schema.Types.ObjectId,
        ref: "ValueAttribute",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Attribute", AttributeSchema);
