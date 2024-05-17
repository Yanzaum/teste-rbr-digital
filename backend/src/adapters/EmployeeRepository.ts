import Employee from "../domain/Employee";

export default interface EmployeeRepository {
    getAll(): Promise<Employee[]>;
    getById(id: string): Promise<Employee | null>;
    save(employee: Employee): Promise<void>;
    update(employee: Employee): Promise<void>;
    delete(id: string): Promise<void>;
}
