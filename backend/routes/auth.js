const express = require("express");
const User = require("../models/User");
const { query, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "DeepanshuisG$$db$y";
const fetchuser=require('../middleware/fetchuser');

//Route1- Create a user using : POST "/api/auth/createUser". No login required doesn't require authentication"
router.post(
  "/createUser",
  [
    query("name", "Enter a valid name (Min 3char length)").isLength({ min: 3 }),
    query("email", "Enter a valid mail").isEmail(),
    query("password", "Password must be 5 char length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.json({ errors: result.array() });
    }

    //check whether user with email address exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      // console.log(jwtData);
      // res.json(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route2 - Authenticate a user using : POST "/api/auth/login". No login required"
router.post(
  "/login",
  [
    query("email", "Enter a valid mail").isEmail(),
    query("password", "Password must be 5 char length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3- Get logged in a user details using POST: "/api/auth/getuser". Login required
router.post("/getUser",fetchuser, async (req, res) => {
  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
