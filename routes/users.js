const { default: axios } = require("axios");
const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const User = require("../models/user");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// CREATING ONE
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    contact: req.body.contact,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const users = await User.find();
  const products = await Product.find();
  const { username, password } = req.body;

  try {
    const user = users.find(
      (user) => username === user.username && user.password === password
    );
    const userInventory =
      user && products.filter((product) => product.user === username);

    res.status(201).json({ inventory: userInventory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATING ONE
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.contact != null) {
    res.user.contact = req.body.contact;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE ONE
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MIDDLEWARE FUNCTIONS
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

const getAllUsers = async () => {
  const response = await axios
    .get(`http://localhost:3001/users`)
    .catch((error) => console.log("Error: ", error));
  return response;
};

module.exports = router;
