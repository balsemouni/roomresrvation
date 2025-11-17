const mongoose = require('mongoose');
const Room = require('../models/room'); // Assuming the schema is in Room.js

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/itCompany', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Data for 20 rooms
const rooms = [
    {
        name: "Conference Room 1",
        image: "path/to/conference1.jpg",
        capacity: 20,
        location: "1st Floor, West Wing",
        equipment: ["Projector", "Whiteboard", "Video Conferencing"],
        description: ["Ideal for team meetings and presentations"],
        wifi: "Available",
    },
    {
        name: "Conference Room 2",
        image: "path/to/conference2.jpg",
        capacity: 15,
        location: "1st Floor, East Wing",
        equipment: ["Smart TV", "Whiteboard"],
        description: ["Equipped for brainstorming sessions"],
        wifi: "Available",
    },
    {
        name: "Executive Office 1",
        image: "path/to/executive1.jpg",
        capacity: 3,
        location: "2nd Floor, West Wing",
        equipment: ["Desktop Computer", "Printer"],
        description: ["Reserved for top management"],
        wifi: "Available",
    },
    {
        name: "IT Lab",
        image: "path/to/itlab.jpg",
        capacity: 25,
        location: "Ground Floor, North Wing",
        equipment: ["Desktop PCs", "Servers"],
        description: ["Development and testing environment"],
        wifi: "Available",
    },
    {
        name: "Break Room",
        image: "path/to/breakroom.jpg",
        capacity: 10,
        location: "2nd Floor, Central",
        equipment: ["Coffee Machine", "Microwave"],
        description: ["Relaxation space for employees"],
        wifi: "Not Available",
    },
    {
        name: "Small Meeting Room A",
        image: "path/to/meetingA.jpg",
        capacity: 8,
        location: "2nd Floor, South Wing",
        equipment: ["Smartboard"],
        description: ["For small team discussions"],
        wifi: "Available",
    },
    {
        name: "Small Meeting Room B",
        image: "path/to/meetingB.jpg",
        capacity: 6,
        location: "1st Floor, North Wing",
        equipment: ["Whiteboard"],
        description: ["For quick discussions"],
        wifi: "Available",
    },
    {
        name: "Server Room",
        image: "path/to/serverroom.jpg",
        capacity: 2,
        location: "Basement",
        equipment: ["Servers", "Cooling Systems"],
        description: ["Restricted to IT staff"],
        wifi: "Not Available",
    },
    {
        name: "Training Room",
        image: "path/to/training.jpg",
        capacity: 30,
        location: "Ground Floor, East Wing",
        equipment: ["Projector", "Workstations"],
        description: ["Employee training and workshops"],
        wifi: "Available",
    },
    {
        name: "Open Workspace 1",
        image: "path/to/workspace1.jpg",
        capacity: 50,
        location: "3rd Floor, South Wing",
        equipment: ["Desks", "Chairs", "Power Strips"],
        description: ["Collaborative open space"],
        wifi: "Available",
    },
    {
        name: "Open Workspace 2",
        image: "path/to/workspace2.jpg",
        capacity: 40,
        location: "3rd Floor, North Wing",
        equipment: ["Desks", "Chairs", "Monitors"],
        description: ["Shared workspace for teams"],
        wifi: "Available",
    },
    {
        name: "Audio-Visual Studio",
        image: "path/to/studio.jpg",
        capacity: 5,
        location: "Ground Floor, South Wing",
        equipment: ["Recording Equipment", "Green Screen"],
        description: ["For video and audio production"],
        wifi: "Available",
    },
    {
        name: "Executive Office 2",
        image: "path/to/executive2.jpg",
        capacity: 2,
        location: "2nd Floor, East Wing",
        equipment: ["Desktop Computer", "Teleconferencing"],
        description: ["For executive use only"],
        wifi: "Available",
    },
    {
        name: "HR Interview Room",
        image: "path/to/hr.jpg",
        capacity: 4,
        location: "1st Floor, West Wing",
        equipment: ["Smartboard", "Seating Area"],
        description: ["For recruitment interviews"],
        wifi: "Available",
    },
    {
        name: "Quiet Room",
        image: "path/to/quiet.jpg",
        capacity: 5,
        location: "2nd Floor, Central Wing",
        equipment: ["Couches", "Bookshelves"],
        description: ["Stress-free environment"],
        wifi: "Available",
    },
    {
        name: "Storage Room 1",
        image: "path/to/storage1.jpg",
        capacity: 10,
        location: "Basement, West Wing",
        equipment: ["Shelves", "Storage Bins"],
        description: ["For office supplies"],
        wifi: "Not Available",
    },
    {
        name: "Storage Room 2",
        image: "path/to/storage2.jpg",
        capacity: 8,
        location: "Basement, East Wing",
        equipment: ["Shelves"],
        description: ["For archived documents"],
        wifi: "Not Available",
    },
    {
        name: "Design Studio",
        image: "path/to/designstudio.jpg",
        capacity: 12,
        location: "1st Floor, North Wing",
        equipment: ["Drawing Tablets", "High-Resolution Monitors"],
        description: ["For creative design teams"],
        wifi: "Available",
    },
    {
        name: "IT Support Room",
        image: "path/to/itsupport.jpg",
        capacity: 6,
        location: "Ground Floor, North Wing",
        equipment: ["Repair Tools", "Diagnostic Equipment"],
        description: ["For hardware and software support"],
        wifi: "Available",
    },
    {
        name: "Library",
        image: "path/to/library.jpg",
        capacity: 20,
        location: "2nd Floor, West Wing",
        equipment: ["Bookshelves", "Computers"],
        description: ["Resource center for employees"],
        wifi: "Available",
    },
];

// Insert rooms into the database
Room.insertMany(rooms)
    .then(() => {
        console.log('Rooms have been added successfully!');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error adding rooms:', err);
        mongoose.connection.close();
    });
mongoose.connect('mongodb://localhost:27017/romm_reservation')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
