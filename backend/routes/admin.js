const express = require('express');
const User = require('../models/user');
const Stock = require('../models/stock');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register
router.post('/register', async (req, res) => {
    // console.log(req.body)
    try {
        // Check if required fields are present in request body
        const { name, email, password, role, confirmPassword } = req.body;


        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check that the role is valid
        if (role !== 'admin' && role !== 'doctor' && role !== 'monitor') {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if email already exists in the database
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }



        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            active: false
        });

        console.log(user);

        // Save the user to the database
        await user.save().catch((err) => console.log(err));


        // Send a response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        // Check if required fields are present in request body
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find the user with the given email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Given user  is not yet Registered' });
        }

        // Check if user is activated
        if (!user.active) {
            return res.status(400).json({ message: 'User is not activated' });
        }

        // Compare the given password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }
        let secretKey = "165371566132632461543261543516426184721abghdghjsvdbn"

        const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: '1h'
        });

        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Stock Post API


router.post('/stock', async (req, res) => {
    try {
        const { ExpiryDate, PurchasePrice, ReceivedBy, Location, ReceivedDate, Description, supplier } = req.body;

        // Validate the request body
        if (!ExpiryDate || !PurchasePrice || !ReceivedBy || !Location || !ReceivedDate || !Description || !Supplier) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new Stock object
        const stock = new Stock({
            ExpiryDate,
            PurchasePrice,
            ReceivedBy,
            Location,
            ReceivedDate,
            Description,
            supplier
        });

        // Save the Stock object to the database
        await stock.save();

        res.status(201).json({ stock });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

