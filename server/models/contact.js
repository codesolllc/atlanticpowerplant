import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  message: {
    type: String,
    require: true,
  },

  name: {
    type: String,
    require: true,
  },
 
  email: {
    type: String,
    require: true,
  },

  phone: {
    type: Number,
    require: true,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
});

const contact = mongoose.model("contact", contactSchema);

export default contact;
