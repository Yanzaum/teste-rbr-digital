import crypto from 'crypto';

export default class Employee {
    private constructor(
        readonly id: string,
        readonly name: string,
        readonly department: string,
        readonly role: string,
        readonly admissionDate: Date,
        readonly createdAt: Date,
        readonly updatedAt: Date
    ) {}

    static create(name: string, department: string, role: string, admissionDate: Date): Employee {
        const employeeId = crypto.randomUUID()
        const createdAt = new Date();
        const updatedAt = new Date();
        return new Employee(employeeId, name, department, role, admissionDate, createdAt, updatedAt);
    }

    static restore(id: string, name: string, department: string, role: string, admissionDate: Date, createdAt: Date, updatedAt: Date): Employee {
        return new Employee(id, name, department, role, admissionDate, createdAt, updatedAt);
    }

    update(name: string, department: string, role: string, admissionDate: Date): Employee {
        return new Employee(this.id, name, department, role, admissionDate, this.createdAt, new Date());
    }
}