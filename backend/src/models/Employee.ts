import mongoose from 'mongoose';
import Employee from '../domain/Employee';

const EmployeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
}, {
    collection: 'employees'
});

export const EmployeeModel = mongoose.model('Employee', EmployeeSchema);