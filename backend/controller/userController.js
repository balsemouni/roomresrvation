const { console } = require('inspector');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Get all users (restricted to admin role)
exports.getAllUsers = async (req, res) => {
    try {
        console.log()

        if (req.user.role !== "admin") {
                return res.status(403).json({ error: 'Permission denied, admin only' });
        }

        const users = await User.find();
        // const id=users[0].role
        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};
exports.getuser = async (req, res) => {
    try {
       

        const users = await User.findById(req.params.id);
        // const id=users[0].role
        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};
// Create a new user
exports.createUser = async (req, res) => {
    try {
        console.log('hi');
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(201).json({ user: newUser, token });  // Return the user and token
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        console.log("hii");
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        // Compare the entered password with the hashed password in the database
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ user, token });  // Return the user and token
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user by ID (restricted to admin role)
exports.deleteUser = async (req, res) => {
    try {
        if (req.body.user.role !== 'admin') {
            return res.status(403).json({ error: 'Permission denied, admin only' });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
