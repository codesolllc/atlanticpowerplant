import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Category", categorySchema);
