import mongoose from 'mongoose';

const MONGO_URI = "mongodb://localhost:27017";

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

let isConnected = 0; // Track the connection status

export async function dbConnect() {
    if (isConnected) {
        // Use existing database connection
        return;
    }

    try {
        const db = await mongoose.connect(MONGO_URI);

        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}