const express = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET ALL
router.get("/", (req, res) => {});

// GET ONE
router.get("/:id", (req, res) => {});

// CREATING ONE
router.post("/", (req, res) => {});

// UPDATING ONE
router.patch("/:id", (req, res) => {});

// DELETE ONE
router.delete("/:id", (req, res) => {});

module.exports = router;
