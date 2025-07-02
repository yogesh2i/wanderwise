import mongoose from 'mongoose';
import { mongoUri } from './constants';

const MONGO_URI = mongoUri;

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