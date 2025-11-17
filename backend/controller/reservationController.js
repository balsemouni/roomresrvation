const Reservation = require('../models/reservationSchema');

// Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const { endtime, start_time, userId, roomId } = req.body;

        // Check if required fields are missing
        if (!start_time || !endtime || !userId || !roomId) {
            return res.status(400).json({
                error: 'start_time, endtime, userId, and roomId are required fields.'
            });
        }

        // Get the current date and time
        const currentDate = new Date();

        // Convert start_time and endtime from string to Date objects
        const startDate = new Date(start_time);
        const endDate = new Date(endtime);

        // Check if the start_time is before the end_time
        if (startDate >= endDate) {
            return res.status(400).json({ error: 'Start time must be before end time.' });
        }

        // Check if both start_time and end_time are equal to or later than the current date
        if (startDate < currentDate || endDate < currentDate) {
            return res.status(400).json({ error: 'Start and end times must be equal to or later than the current date.' });
        }

        // If validation passes, create and save the reservation
        const reservation = new Reservation({ endtime, start_time, userId, roomId });
        await reservation.save();
        
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update reservation status
exports.updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.updateStatus(status);
        res.status(200).json({ message: 'Status updated successfully', reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
