const express = require('express');
const roomController = require('../controller/roomController.js');

const router = express.Router();

// CREATE: Add a new room
router.post('/', roomController.addRoom);

// READ: Get all rooms
router.get('/', roomController.getAllRooms);

// READ: Get a room by its ID
router.get('/:id', roomController.getRoomById);

// UPDATE: Update a room by its ID
router.put('/:id', roomController.updateRoom);

// DELETE: Delete a room by its ID
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
