import express from "express";
import contact from "../models/contact.js";
import Product from "../models/product.js";
import transporter from "../utils/nodemailerConfig.js";

const router = express.Router();

router.post("/send-message", async (req, res) => {
  try {
    const findProduct = await Product.findOne({ _id: req.body.productId });

    if (!findProduct) {
      return res.status(404).json();
    }

    const contactData = new contact({
      name: req.body.name,
      message: req.body.message,
      email: req.body.email,
      phone: req.body.phone,
      productId: findProduct._id,
    });

    const saveData = await contactData.save();

    // Send confirmation email
    const mailOptions = {
      from: req.body.email,
      to: "atlanticpowerandequipment@gmail.com",
      subject: "Welcome to Atlantic!",
      html: `
      <h3>
        Contacts 
        </h3>
    <a href='http://localhost:3000/single-product/${findProduct._id}' >
      <img src=${findProduct.featureImage} alt="Product Image" style="display: block; max-width: 30%;" />
      <h5>
      ${findProduct.description}
      </h5>
      <h3>Customer Details</h3>
      <h4>
      ${req.body.name}
      </h4>
      <h4>
      ${req.body.email}
      </h4>
      <h4>
      ${req.body.phone}
      </h4>
     
      </a>
      <h3>Message From Customer</h3>
        <p>
        ${req.body.message}
        </p>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      message: "Your Message Has Been Sent Successfully",
      data: saveData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
