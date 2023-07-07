const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.user_signup = (req, res, next) => {
  const { name, email, phonenumber, address, gender, password } = req.body;
  console.log(name, email, phonenumber, address, gender, password);

  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = new User({
        name,
        email,
        phonenumber,
        address,
        gender,
        password,
      });

      user
        .save()
        .then((savedUser) => {
          sendWelcomeEmail(savedUser.email);

          const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
          res.status(201).json({
            success: true,
            token,
            user: savedUser,
          });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

function sendWelcomeEmail(email) {
  const testAccount = nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "i201761@nu.edu.pk",
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: "Provelopers",
    to: email,
    subject: "Welcome to Our Website",
    text: "Welcome to CarWorld! Thank you for signing up with us. We're excited to have you join our community of car enthusiasts and information seekers.At CarWorld, we provide a comprehensive platform dedicated to cars. You'll find a vast database of car models, expert reviews, captivating images, and a vibrant community of fellow car lovers. Stay updated with the latest news, trends, and exclusive offers.Get ready for an exhilarating journey through the world of cars. Start exploring CarWorld today! Best regards,The CarWorld Team",
    html: "<p>Welcome to CarWorld! Thank you for signing up with us. We're excited to have you join our community of car enthusiasts and information seekers.At CarWorld, we provide a comprehensive platform dedicated to cars. You'll find a vast database of car models, expert reviews, captivating images, and a vibrant community of fellow car lovers. Stay updated with the latest news, trends, and exclusive offers.Get ready for an exhilarating journey through the world of cars. Start exploring CarWorld today! Best regards,The CarWorld Team</p>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending welcome email:", error);
    } else {
      console.log("Welcome email sent to:", email);
    }
  });
}
exports.user_login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
