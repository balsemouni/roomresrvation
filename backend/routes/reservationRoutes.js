const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');

// Create a reservation
router.post('/create', reservationController.createReservation);

// Get all reservations
router.get('/', reservationController.getAllReservations);

// Update reservation status
router.patch('/:id/status', reservationController.updateReservationStatus);

// Delete a reservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
