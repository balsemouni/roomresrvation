const mongoose = require('mongoose');

// Define the Reservation schema
const reservationSchema = new mongoose.Schema({
    endtime: { type: Date, required: true },
    start_time: { type: Date, required: true },
    // date:{type: Date, required: true},
    // status: { type: String, required: true, enum: ['Pending', 'Confirmed', 'Cancelled'] },
    userId: { type: String, required: true },
    roomId: { type: String, required: true }
});

// Add a method to update status
reservationSchema.methods.updateStatus = function (newStatus) {
    this.status = newStatus;
    return this.save();
};

// Create and export the Reservation model
// module.exports = mongoose.model('Reservation', reservationSchema);
// module.exports = Reservation;
const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
