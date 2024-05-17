import { Employee } from "../types/employee";

export type EmployeeData = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;

export interface EmployeeGateway {
    getEmployees(): Promise<Employee[]>;
    getEmployee(id: string): Promise<Employee>;
    createEmployee(employee: EmployeeData): Promise<void>;
    updateEmployee(id: string, employee: EmployeeData): Promise<void>;
    deleteEmployee(id: string): Promise<void>;
}