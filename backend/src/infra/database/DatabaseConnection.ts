import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL_MONGO as string);
        console.log('MongoDB connected');
    } catch (error: any) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default DatabaseConnection;