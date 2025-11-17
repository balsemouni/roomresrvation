import { describe, it, expect, vi, beforeEach } from 'vitest'; // Use Vitest for testing
import request from 'supertest'; // For making HTTP requests to your app
import app from '../app'; // Your Express app

describe('POST /reservations/create', () => {
    let currentDate;

    beforeEach(() => {
        currentDate = new Date();
        vi.clearAllMocks(); // Clear mocks to ensure no data leakage between tests
    });

    it('should create a reservation when valid data is provided', async () => {
        const start_time = new Date(currentDate.getTime() + 3600000).toISOString(); // 1 hour later
        const end_time = new Date(currentDate.getTime() + 7200000).toISOString(); // 2 hours later

        const res = await request(app)
            .post('/reservations/create')
            .send({
                start_time,
                endtime: end_time,
                userId: '12345',
                roomId: '67890',
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Reservation created successfully');
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app)
            .post('/reservations/create')
            .send({});  // Sending empty body

        expect(res.status).toBe(400); // Changed to 400 for bad request
        expect(res.body.error).toBe('start_time, endtime, userId, and roomId are required fields.'); // Adjusted error message
    });

    it('should return 400 if start_time is after end_time', async () => {
        const start_time = new Date(currentDate.getTime() + 3600000).toISOString(); // 1 hour later
        const end_time = new Date(currentDate.getTime()).toISOString(); // Current time

        const res = await request(app)
            .post('/reservations/create')
            .send({
                start_time,
                endtime: end_time,
                userId: '12345',
                roomId: '67890',
            });

        expect(res.status).toBe(400); // Expect 400 Bad Request
        expect(res.body.error).toBe('Start time must be before end time.');
    });
});
