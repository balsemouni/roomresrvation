const Room = require('../models/room');

// CREATE: Add a new room
exports.addRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body); // Create a new room with the data from the request body
        await newRoom.save(); // Save it to the database
        res.status(201).json(newRoom); // Return the newly created room as a response
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// READ: Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find(); // Get all rooms from the database
        res.status(200).json(rooms); // Return the list of rooms as a response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ: Get a room by its ID
exports.getRoomById = async (req, res) => {
    const { id } = req.params; // Get the room ID from the request parameters
    try {
        const room = await Room.findById(id); // Find the room by ID
        if (!room) {
            return res.status(404).json({ message: 'Room not found' }); // Return error if room is not found
        }
        res.status(200).json(room); // Return the room as a response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE: Update a room by its ID
exports.updateRoom = async (req, res) => {
    const { id } = req.params; // Get the room ID from the request parameters
    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true }); // Update the room data
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(updatedRoom); // Return the updated room
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE: Delete a room by its ID
exports.deleteRoom = async (req, res) => {
    const { id } = req.params; // Get the room ID from the request parameters
    try {
        const deletedRoom = await Room.findByIdAndDelete(id); // Delete the room from the database
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' }); // Return success message
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
