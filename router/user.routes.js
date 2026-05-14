const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.get("/register", (req, res) => {
  res.render("cdn.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Register
router.post("/registers",
  body('gmail').isEmail().withMessage('Please enter a valid email address'),
  body('username').trim().isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, gmail, password } = req.body;
    const hashpass = await bcrypt.hash(password, 10);
    const newuser = await User.create({
      username,
      gmail,
      password: hashpass,
    });
    res.redirect('/user/login');
  });

// Login
router.post("/login",
  body('gmail').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { gmail, password } = req.body;
    const user = await User.findOne({ gmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }   // fix: add expiry
    );
    res.cookie("token", token, { httpOnly: true });
    res.render("main.ejs", { username: user.username });
  });

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.redirect('/home');
});

module.exports = router;
