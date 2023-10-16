import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  additionaldescription: {
    type: String,
    require: true,
  },
  review: {
    type: String,
  },
  weight: {
    type: Number,
    require: true,
  },
  height: {
    type: Number,
    require: true,
  },
  width: {
    type: Number,
    require: true,
  },
  ratings: {
    type: Number,
    require: true,
  },
  cutoffprice: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  productstatus: {
    type: String,
    require: true,
  },
  imageUrls: {
    type: [String],
    require: true,
  },
  featureImage: {
    type: String,
    require: true,
  },
  brands: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // reference to Category model in another file
    ref: "Category",
  },
  categoryName: {
    type: String,
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
