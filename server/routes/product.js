import express from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js";
import categorySchema from "../models/category.js";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dhuhpslek",
  api_key: 697996394419782,
  api_secret: "WEsvaQpRX84Uei25uP-_gtEBqbg",
});

router.post("/add-products", async (req, res) => {
  try {
    // Extract product information from request body
    const {
      name,
      description,
      price,
      category,
      additionaldescription,
      review,
      weight,
      height,
      width,
      ratings,
      cutoffprice,
      productstatus,
      brands,
    } = req.body;

    const findCat = await categorySchema.findOne({ _id: category });

    if (!findCat) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    const images = req.files.imageUrls;

    const featuredImage = req.files.featuredImage;

    const uploadFeatured = await cloudinary.uploader.upload(
      featuredImage.tempFilePath
    );

    const imageUrls = [];

    for (const image of images) {
      const uploadResult = await cloudinary.uploader.upload(image.tempFilePath);
      imageUrls.push(uploadResult.secure_url);
    }

    const createProduct = new Product({
      name,
      description,
      price,
      imageUrls,
      featureImage: uploadFeatured.secure_url,
      category: findCat._id,
      categoryName: findCat.categoryName,
      additionaldescription,
      review,
      weight,
      height,
      width,
      ratings,
      cutoffprice,
      productstatus,
      brands,
    });

    const saveProduct = await createProduct.save();

    res.status(200).json(saveProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/all-products", async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    res.status(200).json(getAllProducts);
  } catch (error) {
    res.status(500).json({ message: "All Products Here" });
  }
});

router.delete("/delete-product/:prodID", async (req, res) => {
  try {
    const { prodID } = req.params;
    const findProd = await Product.findByIdAndRemove(prodID);

    if (!findProd) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/update-product/:prodID", async (req, res) => {
  try {
    // Extract product information from request body
    const {
      name,
      description,
      price,
      category,
      additionaldescription,
      review,
      weight,
      height,
      width,
      ratings,
      cutoffprice,
      productstatus,
      brands,
    } = req.body;

    const { prodID } = req.params;

    const findProd = await Product.findById(prodID);

    if (!findProd) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const findCat = await categorySchema.findOne({ _id: category });

    if (!findCat) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    // Handle the case when there are no uploaded images
    let imageUrls = findProd.imageUrls;
    if (req.files.img) {
      const images = req.files.img;
      imageUrls = [];

      for (const image of images) {
        const uploadResult = await cloudinary.uploader.upload(
          image.tempFilePath
        );
        imageUrls.push(uploadResult.secure_url);
      }
    }

    // Handle the case when there is no featured image
    let featuredImage = findProd.featureImage;
    if (req.files.featured) {
      const featured = req.files.featured;
      const uploadResult = await cloudinary.uploader.upload(
        featured.tempFilePath
      );
      featuredImage = uploadResult.secure_url;
    }

    findProd.name = name || findProd.name;
    findProd.description = description || findProd.description;
    findProd.price = price || findProd.price;
    findProd.imageUrls = imageUrls || findProd.imageUrls;
    findProd.featureImage = featuredImage || findProd.featureImage;
    findProd.category = findCat._id || findCat._id;
    findProd.additionaldescription =
      additionaldescription || findProd.additionaldescription;
    findProd.review = review || findProd.review;
    findProd.weight = weight || findProd.weight;
    findProd.height = height || findProd.height;
    findProd.width = width || findProd.width;
    findProd.ratings = ratings || findProd.ratings;
    findProd.cutoffprice = cutoffprice || findProd.cutoffprice;
    findProd.productstatus = productstatus || findProd.productstatus;
    findProd.brands = brands || findProd.brands;

    const saveProduct = await findProd.save();

    res.status(200).json(saveProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/single-product/:prodID", async (req, res) => {
  try {
    const { prodID } = req.params;
    const findProduct = await Product.findById(prodID);
    res.status(200).json(findProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/update-status/:prodID", async (req, res) => {
  try {
    const { prodID } = req.params;
    const findProduct = await Product.findById(prodID);

    findProduct.productstatus =
      req.body.productstatus || findProduct.productstatus;

    const saveStatus = await findProduct.save();

    res
      .status(200)
      .json({ message: "Product Status Updated Successfully", saveStatus });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
