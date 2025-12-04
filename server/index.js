require('dotenv').config();
const bcrypt = require('bcrypt');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const User = require('./User');
const DonationCode = require('./models/DonationCode');
const DonationItem = require('./models/DonationItem');
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'vision-key.json' // Make sure this file is in the server directory
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Register route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Generate code
app.post('/generate-code', async (req, res) => {
  const { userId } = req.body;
  const code = 'DONATE' + Math.floor(1000 + Math.random() * 9000);

  try {
    const donationCode = new DonationCode({ code, userId });
    await donationCode.save();
    res.json({ success: true, code });
  } catch (err) {
    console.error('Error generating code:', err);
    res.status(500).json({ success: false, message: 'Error generating code' });
  }
});

// Validate code
app.post('/validate-code', async (req, res) => {
  const { code, userId } = req.body;

  try {
    const donationCode = await DonationCode.findOne({ code });

    if (!donationCode) {
      return res.status(400).json({ valid: false, message: 'Invalid code' });
    }

    if (donationCode.used) {
      return res.status(400).json({ valid: false, message: 'Code already used' });
    }

    if (donationCode.userId !== userId) {
      return res.status(400).json({ valid: false, message: 'Code not valid for this user' });
    }

    res.json({ valid: true, message: 'Code is valid' });
  } catch (err) {
    console.error('Code validation error:', err);
    res.status(500).json({ valid: false, message: 'Server error' });
  }
});

// Mark code used
app.post('/mark-code-used', async (req, res) => {
  const { code } = req.body;

  try {
    await DonationCode.findOneAndUpdate({ code }, { used: true });
    res.json({ success: true });
  } catch (err) {
    console.error('Mark used error:', err);
    res.status(500).json({ success: false });
  }
});

// Upload donation with AI clothing verification
app.post('/upload-donation', upload.single('image'), async (req, res) => {
  const { description, userId } = req.body;

  if (!req.file || !description || !userId) {
    return res.status(400).json({ success: false, message: 'Missing data' });
  }

  const imagePath = path.join(__dirname, req.file.path);

  // Use BASE_URL from env or fallback to localhost
  const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;

  try {
    // Call Vision API to detect labels
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations.map(label => label.description.toLowerCase());
    console.log("Detected labels:", labels);

    const clothKeywords = [
      'clothing', 'apparel', 'shirt', 'jeans', 'jacket', 't-shirt',
      'pants', 'sweater', 'trouser', 'skirt', 'dress'
    ];

    const isClothing = labels.some(label => clothKeywords.includes(label));

    if (!isClothing) {
      return res.status(400).json({
        success: false,
        message: 'Uploaded image does not appear to be clothing.'
      });
    }

    // Generate donation code
    const code = 'DONATE' + Math.floor(1000 + Math.random() * 9000);

    const newCode = new DonationCode({ code, userId });
    await newCode.save();

    const donation = new DonationItem({ imageUrl, description, userId, code });
    await donation.save();

    res.json({ success: true, code });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
