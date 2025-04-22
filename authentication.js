const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({
      where: { [Sequelize.Op.or]: [{ username }, { email }] }
    });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create user
    const user = await User.create({ username, email, password });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).json({ token, userId: user.id });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Validate password
    const isValid = await user.validPassword(password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, userId: user.id });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;