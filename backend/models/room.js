const mongoose = require('mongoose');
const { type } = require('os');

// Define the Room schema
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Room name
    image: { type: String, required: true }, // Path or URL to the image
    capacity: { type: Number, required: true }, // Room capacity
    location: { type: String, required: true }, // Room location
    equipment: { type: [String], default: [] }, // List of equipment
    description: {type :[String],default:[]},
    wifi: { type: String, enum: ['Available', 'Not Available'], required: true }, // WiFi availability
});

// Create the Room model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
