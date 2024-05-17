import EmployeeRepository from "../../adapters/EmployeeRepository";
import Employee from "../../domain/Employee";

export default class CreateEmployee {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute({ name, department, role, admissionDate }: CreateEmployeeDTO): Promise<void> {
        const employee = Employee.create(name, department, role, admissionDate);
        await this.employeeRepository.save(employee);
    }
}

type CreateEmployeeDTO = {
    name: string;
    department: string;
    role: string;
    admissionDate: Date;
}