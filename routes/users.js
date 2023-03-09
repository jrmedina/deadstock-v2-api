const express = require("express");
const router = express.Router();
const User = require("./users");

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

// UPDATING ONE
router.patch("/:id", (req, res) => {});

// DELETE ONE
router.delete("/:id", (req, res) => {});

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

module.exports = router;
