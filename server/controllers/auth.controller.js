const User = require('../models/auth.models.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token , msg: "User Logi Successfull"});
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
