import express, { response } from "express";
import category from "../models/category.js";
import Product from "../models/product.js";

const router = express.Router();

router.post("/add-category", async (req, res) => {
  try {
    const findCat = await category.findOne({
      categoryName: req.body.categoryName,
    });

    if (findCat) {
      return res.status(400).json({ message: "This Category Already Exists" });
    }

    const addCategory = new category({
      categoryName: req.body.categoryName,
    });

    if (req.body.categoryName === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    const saveCat = await addCategory.save();
    res.status(200).json({ success: true, category: saveCat });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/all-categories", async (req, res) => {
  try {
    const getCategories = await category.find();
    res.status(200).json(getCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/delete-category/:catID", async (req, res) => {
  try {
    const { catID } = req.params;
    const findProd = await category.findByIdAndRemove(catID);

    if (!findProd) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    res
      .status(200)
      .json({ message: "Category Deleted Successfully", findProd });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
