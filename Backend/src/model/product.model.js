import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product description is required'],
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    quantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: 0,
    },
    images: {
      type: [String], // array of strings
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
