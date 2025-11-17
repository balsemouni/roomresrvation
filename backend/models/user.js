const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },  // Add role field with default value
});

// Pre-save middleware to hash the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Only hash if password is modified or new
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
});

// Compare the plain password with the hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare password
};

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
