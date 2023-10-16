import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db.js";
import User from "./routes/user.js";
import Product from "./routes/product.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import category from "./routes/category.js";
import contact from "./routes/contact.js";

dotenv.config();
dbConnection();
const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/auth", User);
app.use("/product", Product);
app.use("/categories", category);
app.use("/contact", contact);

app.listen(port, () => {
  console.log(`App Listening To ${port}`);
});
