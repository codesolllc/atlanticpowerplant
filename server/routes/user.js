import express from "express";
import User from "../models/user.js";
import transporter from "../utils/nodemailerConfig.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res
        .status(403)
        .json({ message: "User With This Email Already Exists" });
    }

    const createUser = new User({
      email: req.body.email,
      password: req.body.password,
      role: "Admin",
    });

    // Send confirmation email
    const mailOptions = {
      from: "atlanticpowerandequipment@gmail.com",
      to: req.body.email,
      subject: "Welcome to Atlantic!",
      html: `Welcome`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const savedUser = await createUser.save();

    res.status(200).json({
      status: 200,
      message: "Registered successfully",

      user: savedUser,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }

    const otpCode = await Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save the OTP code to the user's record in the database
    const getOtpCode = otpCode;
    const getOtpExpire = Date.now() + 600000; // OTP expires in 10 minute

    user.otpCode = getOtpCode || user.otpCode;
    user.otpExpire = getOtpExpire || user.otpExpire;

    // Send confirmation email
    const mailOptions = {
      from: "atlanticpowerandequipment@gmail.com",
      to: req.body.email,
      subject: "Welcome to Atlantic!",
      html: `
      Your Verification Code Is : ${otpCode}
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await user.save();

    res
      .status(200)
      .json({ status: 200, message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.patch("/verify-otp", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (!userExist) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      if (userExist.otpCode === req.body.otpCode) {
        // Check if OTP has expired
        const currentTime = Date.now();
        const otpExpirationTime =
          new Date(userExist.otpExpire).getTime() + 10 * 60 * 1000; // Adding 10 minutes in milliseconds

        if (currentTime > otpExpirationTime) {
          await userExist.updateOne({ $unset: { otpCode: "", otpExpire: "" } });
          res.status(400).json({ message: "OTP has expired" });
        } else {
          // Send confirmation email
          const mailOptions = {
            from: "atlanticpowerandequipment@gmail.com",
            to: req.body.email,
            subject: "Welcome to Atlantic!",
            html: `Verified Successfully`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          res.status(200).json({
            status: 200,
            message: "Verified Successfully",
            user: userExist,
          });
        }
      } else {
        res.status(400).json({ message: "INCORRECT OTP" });
      }
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
    console.log(error);
  }
});

router.patch("/resend-otp", async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (!findUser) {
      return res
        .status(404)
        .json({ message: "User With This Email Not Found" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Save the OTP code to the user's record in the database
    findUser.otpCode = otpCode;
    findUser.otpExpire = Date.now() + 600000; // OTP expires in 10 minutes

    // Send confirmation email
    const mailOptions = {
      from: "atlanticpowerandequipment@gmail.com",
      to: req.body.email,
      subject: "Welcome to Atlantic!",
      html: `<h1>${otpCode}</h1>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const updateOtp = await findUser.save();

    res.status(200).json({ message: "Otp has been sent ", updateOtp });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

export default router;
