import crypto from 'crypto';

export default class Employee {
    private constructor(
        readonly id: string,
        private name: string,
        private department: string,
        private role: string,
        private admissionDate: Date,
        readonly createdAt: Date,
        private updatedAt: Date
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
        this.name = name;
        this.department = department;
        this.role = role;
        this.admissionDate = admissionDate;
        this.updatedAt = new Date();
        return this;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDepartment(): string {
        return this.department;
    }

    getRole(): string {
        return this.role;
    }

    getAdmissionDate(): Date {
        return this.admissionDate;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
}